import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getSafePath = (relativePath: string) => {
  const cwd = process.cwd();
  const pathsToTry = [
    path.join(cwd, relativePath),
    path.join(cwd, 'shark-next', relativePath),
  ];

  for (const p of pathsToTry) {
    if (fs.existsSync(p)) return p;
  }
  return path.join(cwd, relativePath);
};

export interface DocItem {
  type: 'file' | 'directory';
  name: string;
  slug: string;
  title: string;
  order: number;
  children?: DocItem[];
}

export interface BlogItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
  description: string;
  author: string;
  content: string;
}

function getMetadata(filePath: string, defaultName: string) {
  try {
    if (!fs.existsSync(filePath)) return { title: defaultName, order: 99 };
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    return {
      title: data.title || defaultName,
      order: data.order ?? 99,
    };
  } catch {
    return { title: defaultName, order: 99 };
  }
}

export function getDocsTree(dir?: string, baseSlug: string = ''): DocItem[] {
  try {
    const targetDir = dir || getSafePath('src/content/docs');
    if (!fs.existsSync(targetDir)) return [];
    const entries = fs.readdirSync(targetDir, { withFileTypes: true });
    
    const items: DocItem[] = entries.map(entry => {
      const fullPath = path.join(targetDir, entry.name);
      const relativeSlug = entry.name.replace(/\.mdx$/, '');
      const currentSlug = baseSlug ? `${baseSlug}/${relativeSlug}` : relativeSlug;

      if (entry.isDirectory()) {
        const children = getDocsTree(fullPath, currentSlug);
        const indexPath = path.join(fullPath, 'index.mdx');
        const meta = getMetadata(indexPath, entry.name);
        
        return {
          type: 'directory',
          name: entry.name,
          slug: currentSlug,
          title: meta.title,
          order: meta.order,
          children: children.sort((a, b) => a.order - b.order)
        };
      } else {
        if (!entry.name.endsWith('.mdx') || entry.name === 'index.mdx') return null;
        const meta = getMetadata(fullPath, relativeSlug);
        
        return {
          type: 'file',
          name: entry.name,
          slug: currentSlug,
          title: meta.title,
          order: meta.order,
        };
      }
    }).filter(Boolean) as DocItem[];

    return items.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(`Error generating docs tree:`, error);
    return [];
  }
}

export async function getDocBySlug(slug: string) {
  try {
    if (!slug) return null;
    
    // Normalize slug to prevent directory traversal
    const safeSlug = slug.replace(/\.+/g, '.').replace(/^\/+/, '');
    const cwd = process.cwd();
    
    // Check both standard root and shark-next subdirectory (for Vercel monorepo setups)
    const basePaths = [
      path.join(cwd, 'src/content/docs'),
      path.join(cwd, 'shark-next/src/content/docs')
    ];

    let fullPath = '';
    let found = false;

    for (const base of basePaths) {
      const fileAttempt = path.join(base, `${safeSlug}.mdx`);
      const indexAttempt = path.join(base, safeSlug, 'index.mdx');

      if (fs.existsSync(fileAttempt)) {
        fullPath = fileAttempt;
        found = true;
        break;
      }
      if (fs.existsSync(indexAttempt)) {
        fullPath = indexAttempt;
        found = true;
        break;
      }
    }

    if (!found) return null;
    
    const source = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(source);
    
    return {
      content,
      frontmatter: data,
      slug
    };
  } catch (error) {
    console.error(`Error getting doc by slug ${slug}:`, error);
    return null;
  }
}

export function getAllBlogs(): BlogItem[] {
  const blogsPath = getSafePath('src/content/blogs');
  if (!fs.existsSync(blogsPath)) return [];
  const files = fs.readdirSync(blogsPath);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const source = fs.readFileSync(path.join(blogsPath, file), 'utf8');
      const { data, content } = matter(source);
      return { 
        slug: file.replace('.mdx', ''), 
        title: data.title || 'Untitled Post',
        date: data.date || '2026-04-01',
        tag: data.tag || 'ENGINEERING',
        description: data.description || '',
        author: data.author || 'SharkAuth Team',
        content
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogBySlug(slug: string): Promise<BlogItem | null> {
  const blogsPath = getSafePath('src/content/blogs');
  const fullPath = path.join(blogsPath, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  
  const source = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(source);
  
  return {
    slug,
    title: data.title || 'Untitled Post',
    date: data.date || '2026-04-01',
    tag: data.tag || 'ENGINEERING',
    description: data.description || '',
    author: data.author || 'SharkAuth Team',
    content
  };
}

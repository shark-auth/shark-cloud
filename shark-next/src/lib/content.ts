import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_PATH = path.join(process.cwd(), 'src/content/docs');
const BLOGS_PATH = path.join(process.cwd(), 'src/content/blogs');

export interface DocItem {
  type: 'file' | 'directory';
  name: string;
  slug: string;
  title: string;
  order: number;
  children?: DocItem[];
}

function getMetadata(filePath: string, defaultName: string) {
  try {
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

export function getDocsTree(dir: string = DOCS_PATH, baseSlug: string = ''): DocItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  const items: DocItem[] = entries.map(entry => {
    const fullPath = path.join(dir, entry.name);
    const relativeSlug = entry.name.replace(/\.mdx$/, '');
    const currentSlug = baseSlug ? `${baseSlug}/${relativeSlug}` : relativeSlug;

    if (entry.isDirectory()) {
      const children = getDocsTree(fullPath, currentSlug);
      // Try to find an index.mdx or folder.json for folder metadata, else use name
      const indexPath = path.join(fullPath, 'index.mdx');
      const meta = fs.existsSync(indexPath) ? getMetadata(indexPath, entry.name) : { title: entry.name, order: 99 };
      
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
}

export async function getDocBySlug(slug: string) {
  const fullPath = path.join(DOCS_PATH, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  
  const source = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(source);
  
  return {
    content,
    frontmatter: data,
    slug
  };
}

export function getAllBlogs() {
  const files = fs.readdirSync(BLOGS_PATH);
  return files.map(file => {
    const source = fs.readFileSync(path.join(BLOGS_PATH, file), 'utf8');
    return { 
      slug: file.replace('.mdx', ''), 
      title: 'Blog Post',
      date: '2026-04-24',
      tag: 'BLOG',
      content: source
    };
  });
}

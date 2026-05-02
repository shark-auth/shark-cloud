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

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface DocContent {
  slug: string;
  content: string;
  frontmatter: Record<string, unknown>;
  headings: Heading[];
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
      const relativeSlug = entry.name.replace(/\.mdx?$/, '');
      const currentSlug = baseSlug ? `${baseSlug}/${relativeSlug}` : relativeSlug;

      if (entry.isDirectory()) {
        const children = getDocsTree(fullPath, currentSlug);
        const indexPathMdx = path.join(fullPath, 'index.mdx');
        const indexPathMd = path.join(fullPath, 'index.md');
        const meta = getMetadata(indexPathMdx, entry.name).order !== 99
          ? getMetadata(indexPathMdx, entry.name)
          : getMetadata(indexPathMd, entry.name);

        return {
          type: 'directory',
          name: entry.name,
          slug: currentSlug,
          title: meta.title,
          order: meta.order,
          children: children.sort((a, b) => a.order - b.order),
        };
      } else {
        if (!/\.mdx?$/.test(entry.name) || /^index\.mdx?$/.test(entry.name)) return null;
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

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getDocBySlug(slug: string): DocContent | null {
  try {
    if (!slug) return null;
    const safeSlug = slug.replace(/\.+/g, '.').replace(/^\/+/, '');
    const cwd = process.cwd();

    const basePaths = [
      path.join(cwd, 'src/content/docs'),
      path.join(cwd, 'shark-next/src/content/docs'),
    ];

    let fullPath = '';
    let found = false;

    for (const base of basePaths) {
      const fileAttemptMdx = path.join(base, `${safeSlug}.mdx`);
      const fileAttemptMd = path.join(base, `${safeSlug}.md`);
      const indexAttemptMdx = path.join(base, safeSlug, 'index.mdx');
      const indexAttemptMd = path.join(base, safeSlug, 'index.md');

      if (fs.existsSync(fileAttemptMdx)) { fullPath = fileAttemptMdx; found = true; break; }
      if (fs.existsSync(fileAttemptMd)) { fullPath = fileAttemptMd; found = true; break; }
      if (fs.existsSync(indexAttemptMdx)) { fullPath = indexAttemptMdx; found = true; break; }
      if (fs.existsSync(indexAttemptMd)) { fullPath = indexAttemptMd; found = true; break; }
    }

    if (!found) return null;

    const source = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(source);

    const headings: Heading[] = [];
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(source)) !== null) {
      const text = match[2].replace(/[*_`]/g, '').trim();
      headings.push({
        level: match[1].length,
        text,
        id: slugifyHeading(text),
      });
    }

    return { content, frontmatter: data, slug, headings };
  } catch (error) {
    console.error(`Error getting doc by slug ${slug}:`, error);
    return null;
  }
}

export function getAdjacentDocs(slug: string): { prev: DocItem | null; next: DocItem | null } {
  const flat = flattenDocsTree(getDocsTree());
  const idx = flat.findIndex(d => d.slug === slug);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

function flattenDocsTree(tree: DocItem[]): DocItem[] {
  const result: DocItem[] = [];
  for (const item of tree) {
    if (item.type === 'file') result.push(item);
    if (item.children) result.push(...flattenDocsTree(item.children));
  }
  return result;
}

export interface SearchItem {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content?: string;
}

export function generateSearchIndex(): SearchItem[] {
  const docsDir = getSafePath('src/content/docs');
  if (!fs.existsSync(docsDir)) return [];

  const items: SearchItem[] = [];
  const walkDir = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (/\.mdx?$/.test(entry.name) && !/^index\.mdx?$/.test(entry.name)) {
        try {
          const source = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(source);
          const slug = entry.name.replace(/\.mdx?$/, '');
          const relative = path.relative(docsDir, fullPath).replace(/\\/g, '/').replace(/\.mdx?$/, '').replace(/index$/, '');
          const stripped = content
            .replace(/```[\s\S]*?```/g, '')
            .replace(/`[^`]*`/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[#*_~>`]/g, '')
            .replace(/\n+/g, ' ')
            .trim();
          const excerpt = stripped.slice(0, 200);
          const searchContent = stripped.slice(0, 2000);
          items.push({
            title: data.title || slug,
            slug: relative,
            category: data.category || '',
            excerpt,
            content: searchContent,
          });
        } catch { /* skip bad files */ }
      }
    }
  };
  walkDir(docsDir);
  return items;
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
        content,
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
    content,
  };
}
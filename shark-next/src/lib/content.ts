import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOGS_PATH = path.join(process.cwd(), 'src/content/blogs');

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

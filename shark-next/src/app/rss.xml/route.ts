import { NextResponse } from 'next/server';
import { getAllBlogs } from '@/lib/content';

export async function GET() {
  const baseUrl = 'https://sharkauth.com';
  const blogs = getAllBlogs();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SharkAuth Engineering Journal</title>
    <link>${baseUrl}/blogs</link>
    <description>Technical deep dives, protocol updates, and engineering logs from the team building the future of agent auth.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${blogs.map(blog => `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${baseUrl}/blogs/${blog.slug}</link>
      <guid>${baseUrl}/blogs/${blog.slug}</guid>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      <description>${escapeXml(blog.description)}</description>
      <author>${escapeXml(blog.author)}</author>
      <category>${escapeXml(blog.tag)}</category>
    </item>
    `.trim()).join('\n    ')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

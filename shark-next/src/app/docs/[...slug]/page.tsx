import React from 'react';
import type { Metadata } from 'next';
import { getDocBySlug } from '@/lib/content';
import { MDXComponents } from '@/components/MDXComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import { DocsPrevNext } from '@/components/DocsPrevNext';

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug: slugArray } = await props.params;
  const slug = slugArray.join('/');
  const doc = getDocBySlug(slug);
  if (!doc) return { title: 'Not Found — SharkAuth' };

  const title = typeof doc.frontmatter.title === 'string' ? doc.frontmatter.title : slug;
  const category = typeof doc.frontmatter.category === 'string' ? doc.frontmatter.category : 'Documentation';

  return {
    title: `${title} — ${category} — SharkAuth`,
    description: `SharkAuth documentation: ${title}. OAuth 2.1, agent delegation, DPoP, and identity protocols.`,
    alternates: { canonical: `https://sharkauth.com/docs/${slug}` },
  };
}

export default async function DocPage(props: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArray } = await props.params;
  const slug = slugArray.join('/');
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="mdx-content">
      <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--docs-fg-muted)' }}>
        {typeof doc.frontmatter.category === 'string' ? doc.frontmatter.category : 'Documentation'}
      </div>

      <MDXRemote
        source={doc.content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />

      <DocsPrevNext slug={slug} />
    </article>
  );
}
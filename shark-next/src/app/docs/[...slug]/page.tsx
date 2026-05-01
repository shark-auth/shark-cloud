import React from 'react';
import { getDocBySlug } from '@/lib/content';
import { MDXComponents } from '@/components/MDXComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import { DocsPrevNext } from '@/components/DocsPrevNext';

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
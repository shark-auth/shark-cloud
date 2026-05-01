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

  const githubEditUrl = `https://github.com/shark-auth/shark/edit/main/src/content/docs/${slug}.mdx`;

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

      <div style={{
        marginTop: 48,
        paddingTop: 24,
        borderTop: '1px solid var(--docs-border)',
        fontSize: 13,
        color: 'var(--docs-fg-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        <a
          href={githubEditUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--docs-fg-muted)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'color .15s',
          }}
        >
          Edit this page
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
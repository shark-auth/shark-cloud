import React from 'react';
import Link from 'next/link';
import { getAdjacentDocs } from '@/lib/content';

interface DocsPrevNextProps {
  slug: string;
}

export function DocsPrevNext({ slug }: DocsPrevNextProps) {
  const { prev, next } = getAdjacentDocs(slug);

  if (!prev && !next) return null;

  return (
    <div className="prevnext" style={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      marginTop: 64,
      paddingTop: 32,
      borderTop: '1px solid var(--docs-border)',
    }}>
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          style={{
            display: 'flex', flexDirection: 'column', gap: 6,
            padding: '14px 20px',
            maxWidth: '50%',
            height: 'auto',
            textDecoration: 'none',
            flex: '1 1 auto',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--docs-fg-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Previous
          </span>
          <span style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--docs-fg-heading)' }}>
            {prev.title}
          </span>
        </Link>
      ) : <div style={{ flex: 1 }} />}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          style={{
            display: 'flex', flexDirection: 'column', gap: 6,
            padding: '14px 20px',
            maxWidth: '50%',
            height: 'auto',
            textDecoration: 'none',
            flex: '1 1 auto',
            alignItems: 'flex-end',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--docs-fg-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            Next
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          <span style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--docs-fg-heading)' }}>
            {next.title}
          </span>
        </Link>
      ) : <div style={{ flex: 1 }} />}
    </div>
  );
}
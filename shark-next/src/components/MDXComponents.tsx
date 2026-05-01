'use client';

import React from 'react';
import { DocCallout } from './DocsCallout';
import { DocsCodeBlock } from './DocsCodeBlock';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return getTextContent(el.props.children);
  }
  return '';
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function HeadingWithSlug({ level, children, ...props }: { level: number; children: React.ReactNode; [key: string]: unknown }) {
  const text = getTextContent(children);
  const id = slugify(text) || `heading-${level}`;

  if (level === 1) {
    return (
      <h1
        id={id}
        style={{
          fontSize: 38, fontWeight: 600, letterSpacing: '-0.035em',
          color: 'var(--docs-fg-heading)',
          marginBottom: 24, marginTop: 0, lineHeight: 1.2,
        }}
        {...props}
      >
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2
        id={id}
        style={{
          fontSize: 26, fontWeight: 600, letterSpacing: '-0.025em',
          color: 'var(--docs-fg-heading)',
          marginTop: 48, marginBottom: 16,
          paddingBottom: 14,
          borderBottom: '1px solid var(--docs-border)',
        }}
        {...props}
      >
        {children}
      </h2>
    );
  }

  if (level === 3) {
    return (
      <h3
        id={id}
        style={{
          fontSize: 18, fontWeight: 600, letterSpacing: '-0.015em',
          color: 'var(--docs-fg-heading)',
          marginTop: 32, marginBottom: 12,
        }}
        {...props}
      >
        {children}
      </h3>
    );
  }

  return <h4 id={id} {...props}>{children}</h4>;
}

export const MDXComponents = {
  h1: (props: any) => <HeadingWithSlug level={1} {...props} />,
  h2: (props: any) => <HeadingWithSlug level={2} {...props} />,
  h3: (props: any) => <HeadingWithSlug level={3} {...props} />,
  h4: (props: any) => <h4 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8, color: 'var(--docs-fg-heading)' }} {...props} />,

  p: (props: any) => (
    <p style={{
      fontSize: 15.5, lineHeight: 1.75,
      color: 'var(--docs-fg)',
      marginBottom: 16,
    }} {...props} />
  ),

  a: (props: any) => {
    const href = props.href || '';
    const isExternal = href.startsWith('http') || href.startsWith('https');
    return (
      <a
        {...props}
        style={{
          color: 'var(--docs-fg-heading)',
          textDecoration: 'underline',
          textDecorationColor: 'var(--docs-border)',
          textUnderlineOffset: '3px',
          transition: 'text-decoration-color .2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.textDecorationColor = 'var(--docs-fg-muted)'; }}
        onMouseLeave={e => { e.currentTarget.style.textDecorationColor = 'var(--docs-border)'; }}
      >
        {props.children}
        {isExternal && (
          <span style={{ marginLeft: 3, display: 'inline-flex', alignItems: 'center', opacity: 0.5 }}>
            <ExternalIcon />
          </span>
        )}
      </a>
    );
  },

  ul: (props: any) => (
    <ul style={{
      marginBottom: 16, paddingLeft: 24,
      color: 'var(--docs-fg)',
    }} {...props} />
  ),

  ol: (props: any) => (
    <ol style={{
      marginBottom: 16, paddingLeft: 24,
      color: 'var(--docs-fg)',
    }} {...props} />
  ),

  li: (props: any) => (
    <li style={{ marginBottom: 8, lineHeight: 1.7, color: 'var(--docs-fg)' }} {...props} />
  ),

  hr: () => (
    <hr style={{
      border: 'none', height: 1,
      background: 'var(--docs-border)',
      margin: '40px 0',
    }} />
  ),

  blockquote: (props: any) => (
    <blockquote style={{
      margin: '24px 0',
      paddingLeft: 20,
      borderLeft: '3px solid var(--docs-fg-muted)',
      color: 'var(--docs-fg-muted)',
      fontStyle: 'italic',
      lineHeight: 1.7,
    }} {...props} />
  ),

  table: (props: any) => (
    <div style={{ overflowX: 'auto', marginBottom: 24, borderRadius: 10, border: '1px solid var(--docs-border)' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }} {...props} />
    </div>
  ),

  thead: (props: any) => (
    <thead style={{ background: 'var(--docs-surface)' }} {...props} />
  ),

  tbody: (props: any) => <tbody {...props} />,

  tr: (props: any) => (
    <tr style={{ transition: 'background .15s' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--docs-surface)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      {...props}
    />
  ),

  th: (props: any) => (
    <th style={{
      padding: '14px 18px',
      textAlign: 'left',
      fontSize: 12, fontWeight: 600,
      color: 'var(--docs-fg-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: '1px solid var(--docs-border)',
    }} {...props} />
  ),

  td: (props: any) => (
    <td style={{
      padding: '14px 18px',
      textAlign: 'left',
      fontSize: 14,
      color: 'var(--docs-fg)',
      borderBottom: '1px solid var(--docs-border)',
      lineHeight: 1.6,
    }} {...props} />
  ),

  pre: ({ children }: any) => <>{children}</>,

  code: ({ children, className }: any) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code style={{
          background: 'var(--docs-surface)',
          padding: '2px 6px',
          borderRadius: 5,
          fontSize: '0.9em',
          color: 'var(--docs-fg-heading)',
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          border: '1px solid var(--docs-border)',
        }}>
          {children}
        </code>
      );
    }

    const lang = className.replace('language-', '') || 'bash';
    const code = typeof children === 'string' ? children.trim() : String(children).trim();

    return (
      <DocsCodeBlock
        lang={lang}
        code={code}
      />
    );
  },

  // Callout components usable in MDX
  Note: (props: any) => <DocCallout type="note" {...props} />,
  Warning: (props: any) => <DocCallout type="warning" {...props} />,
  Tip: (props: any) => <DocCallout type="tip" {...props} />,
};

export { DocsCodeBlock, DocCallout };

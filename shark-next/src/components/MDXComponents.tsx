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
        className="mdx-h1"
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
        className="mdx-h2"
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
        className="mdx-h3"
        {...props}
      >
        {children}
      </h3>
    );
  }

  return <h4 id={id} className="mdx-h4" {...props}>{children}</h4>;
}

export const MDXComponents = {
  h1: (props: any) => <HeadingWithSlug level={1} {...props} />,
  h2: (props: any) => <HeadingWithSlug level={2} {...props} />,
  h3: (props: any) => <HeadingWithSlug level={3} {...props} />,
  h4: (props: any) => <h4 className="mdx-h4" {...props} />,

  p: (props: any) => <p className="mdx-p" {...props} />,

  a: (props: any) => {
    const href = props.href || '';
    const isExternal = href.startsWith('http') || href.startsWith('https');
    return (
      <a {...props} className="mdx-a">
        {props.children}
        {isExternal && (
          <span className="mdx-external-icon">
            <ExternalIcon />
          </span>
        )}
      </a>
    );
  },

  ul: (props: any) => <ul className="mdx-ul" {...props} />,
  ol: (props: any) => <ol className="mdx-ol" {...props} />,
  li: (props: any) => <li className="mdx-li" {...props} />,

  hr: () => <hr className="mdx-hr" />,

  blockquote: (props: any) => <blockquote className="mdx-blockquote" {...props} />,

  table: (props: any) => (
    <div className="mdx-table-wrap">
      <table className="mdx-table" {...props} />
    </div>
  ),

  thead: (props: any) => <thead className="mdx-thead" {...props} />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => <tr className="mdx-tr" {...props} />,
  th: (props: any) => <th className="mdx-th" {...props} />,
  td: (props: any) => <td className="mdx-td" {...props} />,

  pre: ({ children }: any) => <>{children}</>,

  code: ({ children, className }: any) => {
    const isInline = !className;
    if (isInline) {
      return <code className="mdx-code-inline">{children}</code>;
    }
    const lang = className.replace('language-', '') || 'bash';
    const code = typeof children === 'string' ? children.trim() : String(children).trim();
    return <DocsCodeBlock lang={lang} code={code} />;
  },

  // Callout components usable in MDX
  Note: (props: any) => <DocCallout type="note" {...props} />,
  Warning: (props: any) => <DocCallout type="warning" {...props} />,
  Tip: (props: any) => <DocCallout type="tip" {...props} />,
};

export { DocsCodeBlock, DocCallout };
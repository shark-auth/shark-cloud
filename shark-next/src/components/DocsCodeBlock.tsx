'use client';

import React, { useState } from 'react';

interface DocsCodeBlockProps {
  lang?: string;
  code: string;
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 012-2h9" />
    </svg>
  );
}

function TerminalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17l5-5-5-5M12 19h8" />
    </svg>
  );
}

export function DocsCodeBlock({ lang = 'bash', code }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      marginBottom: 24,
      borderRadius: 10,
      border: '1px solid var(--docs-border)',
      overflow: 'hidden',
      background: 'var(--docs-code-bg)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: '1px solid var(--docs-border)',
        background: 'var(--docs-code-header)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--docs-fg-muted)' }}>
            <TerminalIcon size={13} />
          </span>
          <span style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 11.5, color: 'var(--docs-fg-muted)',
            textTransform: 'lowercase',
            letterSpacing: '0.02em',
          }}>
            {lang}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '4px 8px',
            color: copied ? 'hsl(0 0% 80%)' : 'var(--docs-fg-muted)',
            fontSize: 12,
            transition: 'color .2s',
            fontFamily: 'var(--font-mono), monospace',
          }}
          onMouseEnter={e => { if (!copied) e.currentTarget.style.color = 'var(--docs-fg)'; }}
          onMouseLeave={e => { if (!copied) e.currentTarget.style.color = 'var(--docs-fg-muted)'; }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <pre style={{
        margin: 0, padding: '20px 24px',
        overflowX: 'auto',
        fontFamily: 'var(--font-mono), ui-monospace, monospace',
        fontSize: 13.5,
        lineHeight: 1.65,
        color: 'hsl(0 0% 92%)',
        tabSize: 2,
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
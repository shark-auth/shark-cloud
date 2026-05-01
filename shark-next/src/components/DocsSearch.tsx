'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { DocItem, SearchItem } from '@/lib/content';

interface DocsSearchProps {
  searchIndex: SearchItem[];
  tree: DocItem[];
}

export function DocsSearch({ searchIndex, tree }: DocsSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setQuery('');
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleInput = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const q = value.toLowerCase();
    const filtered = searchIndex
      .filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
    setResults(filtered);
    setIsOpen(true);
  }, [searchIndex]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '9px 14px',
          background: 'var(--docs-surface)',
          border: '1px solid var(--docs-border)',
          borderRadius: 999,
          cursor: 'text',
          transition: 'border-color .2s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--docs-fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <span style={{ flex: 1, fontSize: 13.5, color: 'var(--docs-fg-muted)' }}>
          Search docs...
        </span>
        <span style={{
          fontSize: 11, color: 'var(--docs-fg-muted)',
          background: 'var(--docs-surface-2)',
          padding: '2px 6px', borderRadius: 5,
          border: '1px solid var(--docs-border)',
          fontFamily: 'var(--font-mono), monospace',
        }}>
          ⌘K
        </span>
      </div>

      <input
        ref={inputRef}
        value={query}
        onChange={e => handleInput(e.target.value)}
        onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
        placeholder="Search docs..."
        aria-label="Search documentation"
        style={{
          position: 'absolute', inset: 0,
          opacity: 0, cursor: 'text', width: '100%',
          background: 'transparent', border: 'none', outline: 'none',
          padding: '9px 14px',
        }}
      />

      {isOpen && results.length > 0 && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
            background: 'var(--docs-surface)',
            border: '1px solid var(--docs-border)',
            borderRadius: 12,
            overflow: 'hidden',
            zIndex: 100,
            boxShadow: '0 20px 60px hsla(0,0%,0%,0.6)',
          }}
        >
          {results.map(item => (
            <Link
              key={item.slug}
              href={`/docs/${item.slug}`}
              onClick={() => { setQuery(''); setIsOpen(false); }}
              style={{
                display: 'flex', flexDirection: 'column', gap: 2,
                padding: '12px 16px',
                borderBottom: '1px solid var(--docs-border)',
                textDecoration: 'none', color: 'inherit',
                transition: 'background .15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--docs-surface-2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--docs-fg-heading)' }}>
                {item.title}
              </span>
              <span style={{ fontSize: 12, color: 'var(--docs-fg-muted)' }}>
                {item.category || 'Documentation'}
              </span>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim().length >= 2 && results.length === 0 && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
            background: 'var(--docs-surface)',
            border: '1px solid var(--docs-border)',
            borderRadius: 12, padding: '16px',
            textAlign: 'center', fontSize: 13, color: 'var(--docs-fg-muted)',
            zIndex: 100,
          }}
        >
          No results for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
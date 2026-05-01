'use client';

import React, { useState } from 'react';
import { DocItem, SearchItem } from '@/lib/content';
import { DocsSidebar } from './DocsSidebar';

interface DocsMobileNavProps {
  searchIndex: Pick<SearchItem, 'title' | 'slug' | 'category'>[];
  tree: DocItem[];
}

interface ResultItem {
  title: string;
  slug: string;
  category: string;
}

export function DocsMobileNav({ searchIndex, tree }: DocsMobileNavProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ResultItem[]>([]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const lower = q.toLowerCase();
    setSearchResults(
      (searchIndex as ResultItem[])
        .filter(i =>
          i.title.toLowerCase().includes(lower) ||
          i.category.toLowerCase().includes(lower)
        )
        .slice(0, 6)
    );
  };

  return (
    <>
      {/* Hamburger trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open docs navigation"
        style={{
          display: 'none',
          position: 'fixed', bottom: 24, right: 24,
          width: 48, height: 48, borderRadius: '50%',
          background: 'var(--docs-surface)', border: '1px solid var(--docs-border)',
          color: 'var(--docs-fg)', cursor: 'pointer',
          zIndex: 40,
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px hsla(0,0%,0%,0.5)',
        }}
        className="docs-mobile-trigger"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay + drawer */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50,
          display: 'flex',
        }}>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', inset: 0,
              background: 'hsla(0,0%,0%,0.7)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 'min(360px, 90vw)',
            background: 'var(--docs-bg)',
            borderRight: '1px solid var(--docs-border)',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid var(--docs-border)',
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--docs-fg-heading)' }}>
                Documentation
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--docs-fg-muted)', padding: 4,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--docs-border)' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 12px',
                background: 'var(--docs-surface)',
                border: '1px solid var(--docs-border)',
                borderRadius: 8,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--docs-fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  value={searchQuery}
                  onChange={e => handleSearch(e.target.value)}
                  placeholder="Search docs..."
                  aria-label="Search documentation"
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    fontSize: 14, color: 'var(--docs-fg)',
                  }}
                />
              </div>

              {/* Results */}
              {searchResults.length > 0 && (
                <div style={{
                  marginTop: 8, borderRadius: 8,
                  background: 'var(--docs-surface)',
                  border: '1px solid var(--docs-border)',
                  overflow: 'hidden',
                }}>
                  {searchResults.map(item => (
                    <a
                      key={item.slug}
                      href={`/docs/${item.slug}`}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'flex', flexDirection: 'column', gap: 2,
                        padding: '10px 14px',
                        borderBottom: '1px solid var(--docs-border)',
                        textDecoration: 'none', color: 'inherit',
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--docs-fg-heading)' }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--docs-fg-muted)' }}>
                        {item.category || 'Documentation'}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar nav */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              <DocsSidebar tree={tree} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .docs-mobile-trigger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
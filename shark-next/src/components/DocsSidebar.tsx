'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DocItem } from '@/lib/content';
import { usePathname } from 'next/navigation';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface SidebarItemProps {
  item: DocItem;
  depth?: number;
}

function SidebarItem({ item, depth = 0 }: SidebarItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const isActive = pathname === `/docs/${item.slug}` || pathname === `/docs/${item.slug}/`;
  const isDirectory = item.type === 'directory';

  return (
    <div style={{ marginBottom: depth === 0 ? 20 : 0 }}>
      {isDirectory ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              width: '100%',
              padding: '6px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--docs-fg-muted)',
              letterSpacing: '0.02em',
              transition: 'color .2s',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--docs-fg)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--docs-fg-muted)'; }}
          >
            <svg
              width="8" height="8"
              viewBox="0 0 8 8"
              fill="none"
              style={{
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform .25s cubic-bezier(.2,.7,.2,1)',
                flexShrink: 0,
              }}
            >
              <path d="M2 1l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item.title}
          </button>

          <div style={{
            overflow: 'hidden',
            paddingLeft: depth === 0 ? 14 : 20,
            marginTop: 4,
            borderLeft: '1px solid var(--docs-border)',
            marginLeft: 4,
            maxHeight: isOpen ? 3000 : 0,
            opacity: isOpen ? 1 : 0,
            transition: 'max-height 0.3s cubic-bezier(.2,.7,.2,1), opacity 0.25s ease',
          }}>
            {item.children?.map(child => (
              <SidebarItem key={child.slug} item={child} depth={depth + 1} />
            ))}
          </div>
        </div>
      ) : (
        <Link
          href={`/docs/${item.slug}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '6px 0',
            fontSize: 14,
            color: isActive ? 'var(--docs-fg-heading)' : 'var(--docs-fg-muted)',
            textDecoration: 'none',
            fontWeight: isActive ? 500 : 400,
            transition: 'color .2s, transform .2s',
            transform: isActive ? 'translateX(4px)' : 'none',
            position: 'relative',
          }}
          onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--docs-fg)'; e.currentTarget.style.transform = 'translateX(2px)'; } }}
          onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--docs-fg-muted)'; e.currentTarget.style.transform = 'none'; } }}
        >
          {isActive && (
            <span style={{
              position: 'absolute', left: -13,
              width: 2, height: 16,
              background: 'white',
              borderRadius: 99,
            }} />
          )}
          {item.title}
        </Link>
      )}
    </div>
  );
}

export function DocsSidebar({ tree }: { tree: DocItem[] }) {
  return (
    <nav aria-label="Documentation navigation">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {tree.map(item => (
          <SidebarItem key={item.slug} item={item} depth={0} />
        ))}
      </div>
    </nav>
  );
}
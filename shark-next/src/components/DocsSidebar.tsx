'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DocItem } from '@/lib/content';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  item: DocItem;
  depth?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, depth = 0 }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const isActive = pathname === `/docs/${item.slug}`;
  const isDirectory = item.type === 'directory';

  return (
    <div style={{ position: 'relative' }}>
      {isDirectory ? (
        <div style={{ marginBottom: 12 }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '10px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'var(--fg)',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              opacity: 0.9,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.9'}
          >
            <span style={{ 
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', 
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              fontSize: 8,
              display: 'inline-block',
              color: 'var(--muted-2)'
            }}>
              ▶
            </span>
            {item.title}
          </button>
          
          <div style={{ 
            height: isOpen ? 'auto' : 0,
            overflow: 'hidden',
            opacity: isOpen ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            paddingLeft: 14,
            borderLeft: '1px solid var(--border)',
            marginLeft: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
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
            padding: '8px 0',
            fontSize: 14,
            color: isActive ? 'var(--fg)' : 'var(--muted)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            fontWeight: isActive ? 500 : 400,
            transform: `translateX(${isActive ? '4px' : '0'})`,
            position: 'relative'
          }}
          onMouseEnter={e => {
            if (!isActive) {
              e.currentTarget.style.color = 'var(--fg)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }
          }}
          onMouseLeave={e => {
            if (!isActive) {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.transform = 'translateX(0)';
            }
          }}
        >
          {isActive && (
            <span style={{
              position: 'absolute',
              left: -15,
              width: 2,
              height: 14,
              background: 'var(--fg)',
              borderRadius: 99
            }} />
          )}
          {item.title}
        </Link>
      )}
    </div>
  );
};

export const DocsSidebar: React.FC<{ tree: DocItem[] }> = ({ tree }) => {
  return (
    <aside className="hide-md" style={{ position: 'sticky', top: 120, height: 'calc(100vh - 160px)', minWidth: 240 }}>
      <div className="docs-scroll" style={{ height: '100%', overflowY: 'auto', paddingRight: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {tree.map(item => (
            <SidebarItem key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};


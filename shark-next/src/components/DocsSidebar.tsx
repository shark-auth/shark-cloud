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
    <div style={{ marginLeft: depth > 0 ? 12 : 0 }}>
      {isDirectory ? (
        <div style={{ marginBottom: 8 }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              padding: '8px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'white',
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              opacity: 0.8
            }}
          >
            <span style={{ 
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', 
              transition: 'transform 0.2s ease',
              fontSize: 8,
              display: 'inline-block'
            }}>
              ▶
            </span>
            {item.title}
          </button>
          {isOpen && item.children && (
            <div style={{ 
              borderLeft: '1px solid var(--border)', 
              marginLeft: 4, 
              paddingLeft: 8,
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              {item.children.map(child => (
                <SidebarItem key={child.slug} item={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          href={`/docs/${item.slug}`}
          style={{
            display: 'block',
            padding: '6px 0',
            fontSize: 14,
            color: isActive ? 'white' : 'var(--muted)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            fontWeight: isActive ? 500 : 400
          }}
        >
          {item.title}
        </Link>
      )}
    </div>
  );
};

export const DocsSidebar: React.FC<{ tree: DocItem[] }> = ({ tree }) => {
  return (
    <aside className="hide-md" style={{ position: 'sticky', top: 120, height: 'calc(100vh - 160px)' }}>
      <div className="docs-scroll" style={{ height: '100%', overflowY: 'auto', paddingRight: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {tree.map(item => (
            <SidebarItem key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

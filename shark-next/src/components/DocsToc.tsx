'use client';

import React, { useEffect, useState } from 'react';
import { Heading } from '@/lib/content';

interface DocsTocProps {
  headings: Heading[];
}

export function DocsToc({ headings }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    );

    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div>
      <div style={{
        fontSize: 11, fontWeight: 500, color: 'var(--docs-fg-muted)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        marginBottom: 16, paddingBottom: 12,
        borderBottom: '1px solid var(--docs-border)',
      }}>
        On this page
      </div>
      <nav aria-label="Table of contents">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {headings.map(h => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                style={{
                  display: 'block',
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: activeId === h.id ? 'var(--docs-fg-heading)' : 'var(--docs-fg-muted)',
                  textDecoration: 'none',
                  paddingLeft: h.level === 3 ? 16 : 0,
                  transition: 'color .2s',
                  paddingTop: 4,
                  paddingBottom: 4,
                  borderLeft: activeId === h.id ? '2px solid white' : '2px solid transparent',
                  marginLeft: -2,
                }}
                onClick={e => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveId(h.id);
                  }
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
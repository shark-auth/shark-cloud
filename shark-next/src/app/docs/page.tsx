import React from 'react';
import { getDocsTree } from '@/lib/content';
import Link from 'next/link';

export default async function DocsIndexPage() {
  const tree = getDocsTree();

  return (
    <article>
      <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--docs-fg-muted)' }}>Documentation</div>
      <h1 style={{
        fontSize: 'clamp(32px, 5vw, 48px)',
        fontWeight: 600,
        letterSpacing: '-0.04em',
        color: 'var(--docs-fg-heading)',
        marginBottom: 24,
        lineHeight: 1.15,
      }}>
        SharkAuth Docs
      </h1>

      <p style={{
        fontSize: 17, lineHeight: 1.65,
        color: 'var(--docs-fg)',
        maxWidth: 600,
        marginBottom: 56,
      }}>
        Everything you need to integrate SharkAuth into your application.
        From installation to advanced delegation patterns.
      </p>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{
          fontSize: 20, fontWeight: 600,
          color: 'var(--docs-fg-heading)',
          marginBottom: 20,
          paddingBottom: 14,
          borderBottom: '1px solid var(--docs-border)',
        }}>
          Getting Started
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {tree.slice(0, 3).map(section => (
            <div key={section.slug} style={{
              padding: 24,
              background: 'var(--docs-surface)',
              border: '1px solid var(--docs-border)',
              borderRadius: 12,
            }}>
              <h3 style={{
                fontSize: 13, fontWeight: 600,
                color: 'var(--docs-fg-muted)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: 14,
              }}>
                {section.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {section.children?.slice(0, 4).map(child => (
                  <Link
                    key={child.slug}
                    href={`/docs/${child.slug}`}
                    style={{
                      fontSize: 14, color: 'var(--docs-fg)',
                      textDecoration: 'none',
                    }}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{
          fontSize: 20, fontWeight: 600,
          color: 'var(--docs-fg-heading)',
          marginBottom: 20,
          paddingBottom: 14,
          borderBottom: '1px solid var(--docs-border)',
        }}>
          All Sections
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {tree.map(section => (
            <div key={section.slug} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              background: 'var(--docs-surface)',
              border: '1px solid var(--docs-border)',
              borderRadius: 10,
            }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--docs-fg-heading)' }}>
                  {section.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--docs-fg-muted)', marginTop: 2 }}>
                  {section.children?.length || 0} pages
                </div>
              </div>
              <Link
                href={`/docs/${section.children?.[0]?.slug || section.slug}`}
                className="btn btn-ghost"
                style={{ height: 34, padding: '0 14px', fontSize: 13 }}
              >
                Browse
              </Link>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
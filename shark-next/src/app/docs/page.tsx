import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { getDocsTree } from '@/lib/content';
import { DocsSidebar } from '@/components/DocsSidebar';
import Link from 'next/link';

export default async function DocsPage() {
  const tree = getDocsTree();

  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />
      
      <main style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, padding: '120px 56px 80px' }}>
        <DocsSidebar tree={tree} />

        <article style={{ maxWidth: 800 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Documentation</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 500, marginBottom: 32, letterSpacing: '-0.04em' }}>
            Built for the <span className="serif" style={{ fontStyle: 'italic' }}>Agent Era</span>
          </h1>
          
          <p className="text-muted" style={{ fontSize: 20, lineHeight: 1.6, marginBottom: 48 }}>
            SharkAuth is the first authorization server designed from the ground up to handle 
            agents-acting-on-behalf-of-users. High performance, invisible, and absolute.
          </p>

          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Why SharkAuth?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              <div>
                <h3 className="mono" style={{ fontSize: 13, color: 'white', marginBottom: 12 }}>TECHNICAL SUPREMACY</h3>
                <p className="text-muted" style={{ fontSize: 15, lineHeight: 1.6 }}>
                  Strict adherence to OAuth 2.1 and OIDC. No legacy baggage, just clean, modern protocol implementation.
                </p>
              </div>
              <div>
                <h3 className="mono" style={{ fontSize: 13, color: 'white', marginBottom: 12 }}>AGENT-FIRST DESIGN</h3>
                <p className="text-muted" style={{ fontSize: 15, lineHeight: 1.6 }}>
                  Native support for delegated agent permissions without compromising user security or visibility.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Explore the Docs
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {tree.map(section => (
                <div key={section.slug} className="ring-soft" style={{ padding: 24, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--surface)' }}>
                  <h3 className="mono" style={{ fontSize: 14, color: 'white', marginBottom: 12, textTransform: 'uppercase' }}>{section.title}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {section.children?.map(child => (
                      <Link 
                        key={child.slug} 
                        href={`/docs/${child.slug}`}
                        className="btn btn-ghost"
                        style={{ padding: '6px 16px', fontSize: 13 }}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

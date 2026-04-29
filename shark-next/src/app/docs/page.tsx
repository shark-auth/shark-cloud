'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { useReveal } from '@/hooks/useReveal';
import { Icon } from '@/components/Primitives';

const CATEGORIES = [
  {
    title: 'Getting Started',
    items: ['Quickstart', 'Installation', 'Architecture', 'Basic Concepts']
  },
  {
    title: 'Core Features',
    items: ['Authorization', 'Identity Providers', 'Agent Permissions', 'Audit Logs']
  },
  {
    title: 'SDKs & Tools',
    items: ['Node.js SDK', 'Go SDK', 'CLI Reference', 'Management API']
  },
  {
    title: 'Protocols',
    items: ['OAuth 2.1', 'OIDC', 'DPoP', 'PKCE / PAR']
  }
];

export default function DocsPage() {
  useReveal();

  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />
      
      <main style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, padding: '120px 56px 80px' }}>
        {/* Sidebar */}
        <aside className="hide-md" style={{ position: 'sticky', top: 120, height: 'calc(100vh - 160px)' }}>
          <div className="docs-scroll" style={{ height: '100%', overflowY: 'auto', paddingRight: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {CATEGORIES.map(cat => (
                <div key={cat.title}>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>{cat.title}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {cat.items.map(item => (
                      <a 
                        key={item} 
                        href="#" 
                        style={{ 
                          fontSize: 14, 
                          color: 'hsl(0 0% 60%)', 
                          textDecoration: 'none',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'white'}
                        onMouseLeave={e => e.currentTarget.style.color = 'hsl(0 0% 60%)'}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <article className="reveal" style={{ maxWidth: 800 }}>
          <div className="eyebrow reveal" style={{ marginBottom: 12 }}>Documentation</div>
          <h1 className="display reveal" style={{ marginBottom: 32 }}>Built for the <span className="serif-italic">Agent Era</span></h1>
          
          <p className="text-muted reveal" style={{ fontSize: 20, lineHeight: 1.6, marginBottom: 48 }}>
            SharkAuth is the first authorization server designed from the ground up to handle 
            agents-acting-on-behalf-of-users. High performance, invisible, and absolute.
          </p>

          <section className="reveal" style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Why SharkAuth?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
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

          <section className="reveal" style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Quickstart
            </h2>
            <div className="liquid-glass" style={{ padding: 24, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Icon.terminal size={14} />
                <span className="mono" style={{ fontSize: 12, color: 'hsl(0 0% 50%)' }}>bash — install</span>
              </div>
              <code className="mono" style={{ fontSize: 14, color: 'white' }}>
                curl -sSf https://sharkauth.dev/install.sh | sh
              </code>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

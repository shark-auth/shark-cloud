'use client';

import React from 'react';
import { Icon } from '@/components/Primitives';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';

const POSTS = [
  { t: 'Zero-Code Auth Proxy: The Performance Gap', d: 'APR 24, 2026', tag: 'ARCH' },
  { t: 'Designing for the Agent Era', d: 'APR 12, 2026', tag: 'DESIGN' },
  { t: 'Shark v0.9.0: Now Shipping', d: 'MAR 28, 2026', tag: 'RELEASE' },
];

export default function BlogsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <section style={{ padding: '160px clamp(20px, 4vw, 56px) 100px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 64 }}>
            <div>
              <span className="eyebrow">Blogs · /blogs</span>
              <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 24, lineHeight: 1.05 }}>
                Engineering <span className="serif" style={{ color: 'var(--muted)' }}>Trust.</span>
              </h2>
              <p className="text-muted" style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6 }}>
                Technical deep dives into delegated auth, identity proxies, and agentic security.
              </p>
            </div>
            <div style={{ background: 'hsl(0 0% 3%)', aspectRatio: '16/10', borderRadius: 8, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.cube size={48} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
            {POSTS.map((post, idx) => (
              <a key={idx} href="#" style={{
                display: 'flex', flexDirection: 'column', padding: '32px',
                background: 'linear-gradient(180deg, hsla(0,0%,100%,0.03), transparent)',
                border: '1px solid var(--border)', borderRadius: 14, textDecoration: 'none', color: 'inherit',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted-2)' }}>{post.d}</span>
                  <span className="chip" style={{ fontSize: 10 }}>{post.tag}</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.3 }}>{post.t}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

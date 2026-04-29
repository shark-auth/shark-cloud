'use client';

import React from 'react';
import { Icon } from '../Primitives';

const ITEMS = [
  {
    t: 'Zero-Code Auth Proxy',
    desc: 'High-performance gateway to inject identity headers into any upstream app without changing a line of code.',
    status: 'IN PROGRESS',
  },
  {
    t: 'Visual Flow Builder',
    desc: 'Drag-and-drop customization for complex auth flows (MFA → SSO → Org Select).',
    status: 'UPCOMING',
  },
  {
    t: 'Advanced Revocation Patterns',
    desc: 'Pattern-based bulk revocation (e.g., "kill all tokens for this agent template").',
    status: 'UPCOMING',
  },
  {
    t: 'Shark Email',
    desc: 'Email delivery service for magic links, MFA codes, and notifications.',
    status: 'PLANNED',
  },
  {
    t: 'Shark Agentic',
    desc: 'Management layer designed for AI agents to integrate your app with SharkAuth. Inspired by InsForge.',
    status: 'PLANNED',
  },
  {
    t: 'Shark Cloud',
    desc: 'Managed global infrastructure with plans ranging from free to enterprise.',
    status: 'PLANNED',
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 80 }}>
          <div>
            <span className="eyebrow">Roadmap · Future</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 820 }}>
              The trajectory of <span className="serif">agentic trust.</span> <br />
              <span className="text-muted" style={{ fontSize: '0.75em' }}>From zero-code proxies to global cloud infrastructure.</span>
            </h2>
          </div>
          <a href="/roadmap" className="btn btn-ghost" style={{ height: 40 }}>
            Full roadmap <Icon.arrow size={12} />
          </a>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
          {ITEMS.map((item, i) => (
            <div key={i} style={{ padding: '48px 40px', background: 'hsl(0 0% 2%)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted-2)', letterSpacing: '0.1em' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', padding: '4px 10px', borderRadius: 999,
                  background: item.status === 'IN PROGRESS' ? 'hsla(0,0%,100%,0.08)' : 'transparent',
                  border: '1px solid ' + (item.status === 'IN PROGRESS' ? 'var(--border-2)' : 'var(--border)'),
                  color: item.status === 'IN PROGRESS' ? 'white' : 'var(--muted-2)',
                }}>{item.status}</div>
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.3 }}>{item.t}</h3>
              <p className="text-muted" style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 80, padding: 48, borderRadius: 24, background: 'linear-gradient(180deg, hsla(0,0%,100%,0.04), transparent)', border: '1px solid var(--border)', textAlign: 'center' }}>
          <h3 className="serif" style={{ fontSize: 28, color: 'white' }}>Have a feature request?</h3>
          <p className="text-muted" style={{ marginTop: 12, fontSize: 16 }}>We&apos;re building SharkAuth with the community. Join the discussion on GitHub.</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <a href="#" className="btn btn-primary">Open an Issue</a>
            <a href="#" className="btn btn-ghost">GitHub Discussions</a>
          </div>
        </div>
      </div>
    </section>
  );
}

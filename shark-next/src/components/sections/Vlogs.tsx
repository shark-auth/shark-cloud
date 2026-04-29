'use client';

import React from 'react';
import { Icon } from '../Primitives';

const DEVLOGS = [
  {
    date: 'APR 24, 2026',
    title: 'Zero-Code Auth Proxy: The Performance Gap',
    tag: 'ARCHITECTURE',
    excerpt: 'Benchmarking the new Go-based identity proxy against existing OIDC gateways. We achieved <2ms overhead on the hot path.',
  },
  {
    date: 'APR 12, 2026',
    title: 'Designing for the Agent Era',
    tag: 'PHILOSOPHY',
    excerpt: 'Why standard OAuth 2.1 isn’t enough for autonomous agents. Exploring DPoP and token exchange at scale.',
  },
  {
    date: 'MAR 28, 2026',
    title: 'Shark v0.9.0: Now Shipping',
    tag: 'RELEASE',
    excerpt: 'Our biggest release yet. Embedded SQLite, RFC 9449 compliance, and the new cascade revocation engine.',
  },
];

export function Vlogs() {
  return (
    <section id="vlogs" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="eyebrow">Devlogs · /vlogs</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 720 }}>
              Building in the <span className="serif">open.</span> <br />
              <span className="text-muted" style={{ fontSize: '0.75em' }}>Bi-weekly write-ups on the future of agentic auth.</span>
            </h2>
          </div>
          <a href="/vlogs" className="btn btn-ghost" style={{ height: 40 }}>
            View all logs <Icon.arrow size={12} />
          </a>
        </div>

        <div className="reveal" style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {DEVLOGS.map((log, i) => (
            <a key={i} href={`/vlogs/${log.title.toLowerCase().replace(/\s+/g, '-')}`} style={{
              display: 'flex', flexDirection: 'column', padding: '40px',
              background: 'linear-gradient(180deg, hsla(0,0%,100%,0.02), hsla(0,0%,100%,0.005))',
              border: '1px solid var(--border)', borderRadius: 20, transition: 'all .4s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none', color: 'inherit', position: 'relative', overflow: 'hidden',
            }} className="vlog-card">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.15em' }}>{log.date}</span>
                  <span className="chip" style={{ fontSize: 10, padding: '4px 10px', background: 'hsla(0,0%,100%,0.03)' }}>{log.tag}</span>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 16 }}>{log.title}</h3>
                <p className="text-muted" style={{ fontSize: 15, lineHeight: 1.7 }}>{log.excerpt}</p>
              </div>
              <div style={{ marginTop: 32, fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8, color: 'white', opacity: 0, transition: 'opacity .4s' }} className="read-more">
                Read log <Icon.arrow size={11} />
              </div>
              <div style={{
                position: 'absolute', inset: 0, opacity: 0, transition: 'opacity .4s',
                background: 'radial-gradient(circle at 50% 100%, hsla(0,0%,100%,0.05), transparent 70%)',
              }} className="vlog-glow" />
            </a>
          ))}
        </div>
      </div>
      <style jsx>{`
        .vlog-card:hover {
          border-color: var(--border-2);
          background: hsla(0,0%,100%,0.05);
          transform: translateY(-8px);
        }
        .vlog-card:hover .read-more { opacity: 1; }
        .vlog-card:hover .vlog-glow { opacity: 1; }
      `}</style>
    </section>
  );
}

'use client';

import React from 'react';
import { Icon } from '../Primitives';

const ITEMS = [
  { t: 'Zero-Code Auth Proxy', desc: 'High-performance gateway for identity injection.', status: 'IN PROGRESS' },
  { t: 'Visual Flow Builder', desc: 'Drag-and-drop orchestration for complex auth flows.', status: 'UPCOMING' },
  { t: 'Advanced Revocation Patterns', desc: 'Pattern-based bulk revocation and cleanup.', status: 'UPCOMING' },
  { t: 'Shark Email', desc: 'Native delivery service for magic links & notifications.', status: 'PLANNED' },
  { t: 'Shark Agentic', desc: 'Management layer designed for AI agents.', status: 'PLANNED' },
  { t: 'Shark Cloud', desc: 'Managed global infrastructure.', status: 'PLANNED' },
];

export function Roadmap() {
  return (
    <section id="roadmap" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ marginBottom: 120 }}>
          <span className="eyebrow">Roadmap · The Trajectory</span>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginTop: 24, lineHeight: 1.05 }}>
            Forging the <span className="serif" style={{ color: 'var(--muted)' }}>Agentic Trust.</span>
          </h2>
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Timeline line */}
          <div style={{ 
            position: 'absolute', left: '20px', top: 24, bottom: 24, 
            width: '1px', background: 'linear-gradient(180deg, var(--border), var(--border-2), transparent)' 
          }} />

          {ITEMS.map((item, i) => (
            <div key={i} className="reveal" style={{ 
              display: 'flex', gap: 48, paddingBottom: 80,
              transitionDelay: `${i * 100}ms`
            }}>
              {/* Node */}
              <div style={{ 
                width: 40, height: 40, borderRadius: 999, background: 'var(--bg)', 
                border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, zIndex: 1, position: 'relative'
              }}>
                <div style={{ width: 8, height: 8, borderRadius: 999, background: item.status === 'IN PROGRESS' ? 'white' : 'var(--border-2)' }} />
              </div>

              {/* Content */}
              <div style={{ paddingTop: 8 }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--muted-2)', marginBottom: 12 }}>
                  {item.status}
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 12 }}>{item.t}</h3>
                <p className="text-muted" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 560 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

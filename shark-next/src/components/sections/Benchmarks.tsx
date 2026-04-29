'use client';

import React from 'react';
import { Icon } from '../Primitives';

const METRICS = [
  { label: 'Signup', val: '359', unit: 'RPS', p99: '40ms' },
  { label: 'Login', val: '622', unit: 'RPS', p99: '49ms' },
  { label: 'Client Credentials', val: '896', unit: 'RPS', p99: '38ms' },
  { label: 'DPOP', val: '617', unit: 'RPS', p99: '50ms' },
  { label: 'Cascade Revoke', val: '10,600', unit: 'RPS', p99: '11ms' },
];

export function Benchmarks() {
  return (
    <section id="benchmarks" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', background: 'hsl(0 0% 1%)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Performance · Verified</span>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05 }}>
            Built for <span className="serif">speed.</span> <br />
            <span className="text-muted" style={{ fontSize: '0.6em' }}>Optimized for high-density agent environments.</span>
          </h2>
          <p className="text-muted" style={{ marginTop: 24, fontSize: 15, maxWidth: 640, marginInline: 'auto', lineHeight: 1.6 }}>
            Benchmarks executed in Railway hobby tier (30s, 16MB). <br />
            <span className="mono" style={{ fontSize: 13, color: 'var(--muted-2)' }}>Production recommendation: 19-32MB, 2 ITER.</span>
          </p>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{
              padding: '48px 24px', border: '1px solid var(--border)', borderRadius: 24,
              background: 'linear-gradient(180deg, hsla(0,0%,100%,0.02), hsla(0,0%,100%,0.01))',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.15em', color: 'var(--muted-2)', marginBottom: 16, textTransform: 'uppercase' }}>{m.label}</div>
              <div style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>
                {m.val}<span style={{ fontSize: 18, color: 'var(--muted-2)', marginLeft: 6 }}>{m.unit}</span>
              </div>
              <div className="chip" style={{ marginTop: 20, fontSize: 11, padding: '6px 12px', background: 'hsla(0,0%,100%,0.03)', borderColor: 'var(--border)' }}>
                p99: {m.p99}
              </div>
              {/* Subtle visual flare */}
              <div style={{
                position: 'absolute', bottom: '-40%', left: '50%', transform: 'translateX(-50%)',
                width: '180px', height: '180px', background: 'radial-gradient(circle, hsla(0,0%,100%,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 64, textAlign: 'center' }}>
          <div className="mono" style={{ fontSize: 12, color: 'var(--muted-2)', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <span style={{ width: 40, height: 1, background: 'var(--border)' }} />
            INSPIRED BY POCKETBASE PERFORMANCE
            <span style={{ width: 40, height: 1, background: 'var(--border)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

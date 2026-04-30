'use client';

import React, { useState } from 'react';

const METRICS = [
  { 
    label: 'Signup', 
    val: '359', 
    unit: 'RPS', 
    p99: '40ms',
    desc: 'Simulated high-concurrency registration flow with Argon2 hashing.',
    details: [
      { key: 'Concurrency', val: '100' },
      { key: 'Duration', val: '30s' },
      { key: 'Error Rate', val: '0.0%' }
    ]
  },
  { 
    label: 'Login', 
    val: '622', 
    unit: 'RPS', 
    p99: '49ms',
    desc: 'Standard password authentication and session establishment.',
    details: [
      { key: 'Concurrency', val: '200' },
      { key: 'Auth Method', val: 'OAuth2' },
      { key: 'JWT Size', val: '1.2KB' }
    ]
  },
  { 
    label: 'Client Credentials', 
    val: '896', 
    unit: 'RPS', 
    p99: '38ms',
    desc: 'Machine-to-machine authentication for high-speed agent services.',
    details: [
      { key: 'Validation', val: 'DPoP' },
      { key: 'Keys', val: 'ECDSA' },
      { key: 'Cache Hit', val: '98%' }
    ]
  },
  { 
    label: 'DPOP', 
    val: '617', 
    unit: 'RPS', 
    p99: '50ms',
    desc: 'Demonstrating Proof-of-Possession for every request.',
    details: [
      { key: 'Latency Overhead', val: '+12ms' },
      { key: 'Key Rotation', val: '1h' },
      { key: 'Compliance', val: 'RFC 9449' }
    ]
  },
  { 
    label: 'Cascade Revoke', 
    val: '10,600', 
    unit: 'RPS', 
    p99: '11ms',
    desc: 'Recursive token revocation across complex agent hierarchies.',
    details: [
      { key: 'Depth', val: '5 levels' },
      { key: 'Strategy', val: 'Bloom' },
      { key: 'Memory', val: '4MB' }
    ]
  },
];

export function Benchmarks() {
  const [activeTab, setActiveTab] = useState(0);
  const m = METRICS[activeTab];

  return (
    <section id="benchmarks" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 80 }}>
          <span className="eyebrow">Performance · Verified</span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginTop: 24, lineHeight: 1, letterSpacing: '-0.04em' }}>
            Built for <span className="serif">speed.</span>
          </h2>
          <p className="text-muted" style={{ marginTop: 24, fontSize: 16, maxWidth: 540, lineHeight: 1.6 }}>
            Benchmarks executed in resource-constrained environments to guarantee high-density performance.
          </p>
        </div>

        <div className="reveal" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: 64,
          alignItems: 'start'
        }}>
          {/* Vertical Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 12, letterSpacing: '0.1em' }}>SELECT TEST CASE</div>
            {METRICS.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="btn"
                style={{
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 12,
                  background: activeTab === i ? 'var(--surface-2)' : 'transparent',
                  borderColor: activeTab === i ? 'var(--border-2)' : 'transparent',
                  color: activeTab === i ? 'var(--fg)' : 'var(--muted)',
                  transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <span className="mono" style={{ fontSize: 13, fontWeight: activeTab === i ? 600 : 400 }}>{item.label}</span>
                <span className="mono" style={{ fontSize: 12, opacity: activeTab === i ? 1 : 0.4 }}>{item.val} {item.unit}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ position: 'relative' }}>
            {/* Value Display */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ 
                fontSize: 'clamp(80px, 10vw, 140px)', 
                lineHeight: 0.9, 
                letterSpacing: '-0.06em',
                marginBottom: 24
              }}>
                <span className="serif" style={{ fontStyle: 'italic' }}>{m.val}</span>
                <span style={{ fontSize: '0.25em', color: 'var(--muted-2)', marginLeft: 16, verticalAlign: 'baseline' }}>{m.unit}</span>
              </div>
              <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="chip" style={{ fontSize: 13, padding: '6px 14px' }}>
                  p99: {m.p99}
                </div>
                <div className="text-muted" style={{ fontSize: 14, maxWidth: 360 }}>
                  {m.desc}
                </div>
              </div>
            </div>

            {/* Technical Detail Table */}
            <div style={{ 
              padding: '32px', 
              background: 'linear-gradient(180deg, var(--surface-2), transparent)', 
              border: '1px solid var(--border)',
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div className="noise" style={{ opacity: 0.1 }} />
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 24, letterSpacing: '0.1em', position: 'relative' }}>TECHNICAL RUNTIME SPECS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 32, position: 'relative' }}>
                {m.details.map((detail, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 8, textTransform: 'uppercase' }}>{detail.key}</div>
                    <div className="mono" style={{ fontSize: 15, fontWeight: 500 }}>{detail.val}</div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--border)', position: 'relative' }}>
                <div className="mono" style={{ fontSize: 12, color: 'var(--muted-2)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="dot live" />
                  VERIFIED BY RAILWAY PROMETHEUS SCRAPER
                </div>
              </div>
            </div>

            {/* Subtle aesthetic touch */}
            <div style={{
              position: 'absolute', top: -100, right: -100, width: 400, height: 400,
              background: 'radial-gradient(circle, hsla(0,0%,100%,0.04) 0%, transparent 70%)',
              pointerEvents: 'none', zIndex: -1
            }} />
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 96, textAlign: 'center' }}>
          <p className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.05em' }}>
            PRODUCTION RECOMMENDATION: <span style={{ color: 'var(--fg)' }}>19-32MB, 2 ITER</span> · INSPIRED BY POCKETBASE PERFORMANCE
          </p>
        </div>
      </div>
    </section>
  );
}


'use client';

import React, { useState, useEffect, useRef } from 'react';

const METRICS = [
  { 
    label: 'Signup', 
    val: 359, 
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
    val: 622, 
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
    val: 896, 
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
    val: 617, 
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
    val: 10600, 
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
  const [activeIdx, setActiveIdx] = useState(4);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const m = METRICS[activeIdx];
  const maxVal = Math.max(...METRICS.map(x => x.val));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="benchmarks" 
      style={{ 
        padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', 
        background: 'var(--bg)', 
        borderTop: '1px solid var(--border)',
        overflow: 'hidden'
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes barFill {
          from { height: 0; opacity: 0; }
          to { opacity: 1; }
        }
        .benchmark-bar {
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .benchmark-bar:hover {
          background: var(--fg) !important;
          box-shadow: 0 0 20px hsla(0,0%,100%,0.1);
        }
        .grid-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border);
          opacity: 0.4;
          pointer-events: none;
        }
        .y-label {
          position: absolute;
          left: -54px;
          font-size: 10px;
          color: var(--muted-2);
          font-family: var(--font-mono), monospace;
          text-align: right;
          width: 44px;
        }
        .chart-container {
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 20px;
        }
        .chart-container::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 800px) {
          .chart-inner {
            min-width: 700px;
          }
        }
      `}} />

      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className={`reveal ${isVisible ? 'in' : ''}`} style={{ marginBottom: 80 }}>
          <span className="eyebrow">Performance · Verified</span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginTop: 24, lineHeight: 1, letterSpacing: '-0.04em' }}>
            Built for <span className="serif">speed.</span>
          </h2>
          <p className="text-muted" style={{ marginTop: 24, fontSize: 16, maxWidth: 540, lineHeight: 1.6 }}>
            Benchmarks executed in resource-constrained environments to guarantee high-density performance.
          </p>
        </div>

        <div className={`reveal ${isVisible ? 'in' : ''}`} style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: 64,
          alignItems: 'start'
        }}>
          
          {/* Main Chart Area */}
          <div className="chart-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.1em' }}>
                THROUGHPUT COMPARISON (RPS)
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted-2)' }}>
                SCALE: LINEAR_VERIFIED
              </div>
            </div>
            
            <div className="chart-inner" style={{ 
              height: 400, 
              borderLeft: '1px solid var(--border)', 
              borderBottom: '1px solid var(--border)',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              padding: '0 40px',
              marginLeft: 60,
              marginBottom: 60
            }}>
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((p) => (
                <div key={p} className="grid-line" style={{ bottom: `${p * 100}%` }}>
                  <span className="y-label">{Math.round(maxVal * p).toLocaleString()}</span>
                </div>
              ))}

              {/* Bars */}
              {METRICS.map((item, i) => {
                const height = (item.val / maxVal) * 100;
                const isActive = activeIdx === i;
                return (
                  <div 
                    key={i} 
                    onClick={() => setActiveIdx(i)}
                    style={{ 
                      width: 'clamp(30px, 6vw, 80px)',
                      height: isVisible ? `${height}%` : '0%',
                      background: isActive ? 'var(--fg)' : 'var(--surface-2)',
                      border: isActive ? '1px solid var(--fg)' : '1px solid var(--border-2)',
                      cursor: 'pointer',
                      position: 'relative',
                      animation: isVisible ? `barFill 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards ${i * 0.12}s` : 'none',
                    }}
                    className="benchmark-bar"
                  >
                    {/* Peak Indicator Line */}
                    <div style={{ 
                      position: 'absolute', 
                      top: -16, 
                      left: '50%', 
                      transform: 'translateX(-50%)',
                      width: 1, 
                      height: 12, 
                      background: isActive ? 'var(--fg)' : 'var(--muted-2)',
                      opacity: isActive ? 1 : 0.4
                    }} />
                    
                    {/* Label below bar */}
                    <div className="mono" style={{ 
                      position: 'absolute', 
                      bottom: -40, 
                      left: '50%', 
                      transform: 'translateX(-50%) rotate(-45deg)',
                      transformOrigin: 'top right',
                      fontSize: 10,
                      whiteSpace: 'nowrap',
                      color: isActive ? 'var(--fg)' : 'var(--muted-2)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      transition: 'color 0.3s ease'
                    }}>
                      {item.label}
                    </div>

                    {/* Value floating above bar on hover/active */}
                    {isActive && (
                      <div className="mono" style={{ 
                        position: 'absolute', 
                        top: -40, 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        fontSize: 11,
                        color: 'var(--fg)',
                        fontWeight: 600
                      }}>
                        {item.val.toLocaleString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Section */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 48,
            marginTop: 20
          }}>
            {/* Active Metric Info */}
            <div style={{ transition: 'opacity 0.3s ease', opacity: isVisible ? 1 : 0 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', marginBottom: 16, letterSpacing: '0.1em' }}>METRIC_ANALYSIS</div>
              <div style={{ 
                fontSize: 'clamp(48px, 6vw, 92px)', 
                lineHeight: 0.85, 
                letterSpacing: '-0.06em',
                marginBottom: 20
              }}>
                <span className="serif" style={{ fontStyle: 'italic' }}>{m.val.toLocaleString()}</span>
                <span style={{ fontSize: '0.22em', color: 'var(--muted-2)', marginLeft: 16, verticalAlign: 'baseline' }}>{m.unit}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div className="chip" style={{ background: 'var(--surface-2)', borderColor: 'var(--border-2)' }}>p99: {m.p99}</div>
                <div className="text-muted" style={{ fontSize: 15, lineHeight: 1.5, maxWidth: 400 }}>{m.desc}</div>
              </div>
            </div>

            {/* Technical Detail Table */}
            <div style={{ 
              padding: '32px', 
              background: 'linear-gradient(180deg, var(--surface-2), transparent)', 
              border: '1px solid var(--border)',
              borderRadius: 20,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div className="noise" style={{ opacity: 0.1 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
                {m.details.map((detail, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: 10, color: 'var(--muted-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{detail.key}</div>
                    <div className="mono" style={{ fontSize: 15, fontWeight: 500 }}>{detail.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="dot live" />
                  RUNTIME: PROMETHEUS_NODE_EXPORTER_V2
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`reveal ${isVisible ? 'in' : ''}`} style={{ marginTop: 96, textAlign: 'center' }}>
          <div className="divider-x" style={{ marginBottom: 48, opacity: 0.5 }} />
          <p className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.05em' }}>
            PRODUCTION_GUIDE: <span style={{ color: 'var(--fg)' }}>19-32MB, 2 ITER</span> · INSPIRED_BY: POCKETBASE_ARCH
          </p>
        </div>
      </div>
    </section>
  );
}

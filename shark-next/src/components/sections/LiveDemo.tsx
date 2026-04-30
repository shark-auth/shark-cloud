'use client';

import React from 'react';

export function LiveDemo() {
  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr', justifyItems: 'center', textAlign: 'center' }}>
          <span className="eyebrow">The flow</span>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, maxWidth: 760, lineHeight: 1.06 }}>
            Watch delegation flows live
          </h2>
        </div>

        <div className="reveal" style={{
          marginTop: 56,
          width: '100%',
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: 'hsl(0 0% 4%)',
            borderRadius: 20,
            border: '1px solid var(--border)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center', color: 'var(--muted-2)' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'hsla(0,0%,100%,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid white', marginLeft: 6 }}></div>
              </div>
              <p className="mono" style={{ fontSize: 13, letterSpacing: '0.05em' }}>VIDEO PLACEHOLDER</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

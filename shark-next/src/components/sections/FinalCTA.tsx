'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Icon } from '../Icons';

export function FinalCTA() {
  const [stars, setStars] = useState('4,200');

  useEffect(() => {
    fetch('https://api.github.com/repos/shark-auth/shark')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count.toLocaleString('en-US'));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="waitlist" style={{ padding: 'clamp(100px, 14vw, 200px) clamp(20px, 4vw, 56px)', position: 'relative', overflow: 'hidden', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="grid-overlay" style={{
          position: 'absolute', inset: 0, opacity: .45,
          maskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, black, transparent 80%)'
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: 720, opacity: 0.05,
        }}>
          <Image
            src="/assets/sharky-glyph.png"
            alt=""
            width={720}
            height={720}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div style={{
          position: 'absolute', left: '50%', top: '40%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse at center, hsla(0,0%,100%,0.08), transparent 60%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <div className="reveal" style={{ position: 'relative', maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(36px, 5.4vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.04em', fontWeight: 500 }}>
          Read the source. <br />
          <span className="serif" style={{ color: 'hsl(0 0% 75%)' }}>Verify the binary. Ship with confidence.</span>
        </h2>

        <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div className="codeblock" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 20px', fontSize: 13 }}>
            <span style={{ color: 'hsl(0 0% 45%)' }}>$</span>
            <span className="mono">go install github.com/shark-auth/shark@latest</span>
          </div>
          <span className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 40%)', letterSpacing: '0.02em' }}>
            sha256: 4f5a 8b21 19e6 …  ·  v0.1.0  ·  MIT
          </span>
        </div>

        <div style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/shark-auth/shark" className="btn btn-primary" style={{ height: 44 }}>
            <Icon.github size={14} /> Star on GitHub <span className="mono" style={{ color: 'hsl(0 0% 40%)', marginLeft: 4 }}>{stars}</span>
          </a>
          <a href="https://discord.gg/zq9t6VSt5r" className="btn btn-ghost" style={{ height: 44 }}>
            Join Discord
          </a>
          <a href="/docs/api/oauth" className="btn btn-ghost" style={{ height: 44 }}>
            Read the Specs <Icon.arrow size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}

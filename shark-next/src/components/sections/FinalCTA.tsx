import React from 'react';
import Image from 'next/image';
import { Pill, CopyCmd, Icon } from '../Primitives';

const INSTALL_CMD = 'curl -fsSL get.sharkauth.dev | sh';

export function FinalCTA() {
  return (
    <section id="waitlist" style={{ padding: 'clamp(100px, 14vw, 200px) clamp(20px, 4vw, 56px)', position: 'relative', overflow: 'hidden', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="grid-overlay" style={{
          position: 'absolute', inset: 0, opacity: .5,
          maskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, black, transparent 80%)'
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: 720, opacity: 0.06,
        }}>
          <Image
            src="/assets/sharky-glyph.png"
            alt=""
            width={720}
            height={720}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
      <div className="reveal" style={{ position: 'relative', maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <Pill live>Open source · AGPL-3.0 · Self-hostable today</Pill>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 84px)', marginTop: 24, lineHeight: 1.02, letterSpacing: '-0.04em', fontWeight: 500 }}>
          Ship agent auth that <br />
          <span className="serif" style={{ color: 'hsl(0 0% 75%)' }}>holds up under audit.</span>
        </h2>
        <p className="text-muted" style={{ marginTop: 22, fontSize: 17, lineHeight: 1.55, maxWidth: 560, margin: '22px auto 0' }}>
          One binary. One SQLite file. One curl command. Stay open-source forever, or get on the
          managed Cloud waitlist for a hosted issuer with the same primitives.
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <CopyCmd cmd={INSTALL_CMD} />
          <a href="#github" className="btn btn-ghost" style={{ height: 44 }}>
            <Icon.github size={14} /> Star on GitHub
          </a>
          <a href="/waitlist" className="btn btn-ghost" style={{ height: 44 }}>
            Cloud Waitlist <Icon.arrow size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Icon } from '../Icons';
import { CopyCmd } from '../Primitives';

export function Pricing() {
  return (
    <section id="pricing" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 80 }}>
          <span className="eyebrow reveal">Pricing</span>
          <h2 className="reveal" style={{ fontSize: 'clamp(34px, 4.6vw, 60px)', lineHeight: 1.05, marginTop: 16, maxWidth: 720 }}>
            Self-host is the product. <br />
            <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>Cloud is a convenience.</span>
          </h2>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 1, background: 'hsl(0 0% 12%)', border: '1px solid hsl(0 0% 12%)', borderRadius: 20, overflow: 'hidden' }}>
          {/* Self-Host — dominant */}
          <div style={{
            background: 'hsl(0 0% 2.5%)',
            padding: 'clamp(40px, 5vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <span className="mono" style={{ fontSize: 13, color: 'hsl(0 0% 60%)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Self-Host</span>
                <span className="tok yes" style={{ fontSize: 11 }}>Recommended</span>
              </div>
              <div style={{ fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.04em' }}>
                $0<span style={{ fontSize: 20, color: 'hsl(0 0% 45%)', marginLeft: 8, fontWeight: 400 }}>forever</span>
              </div>
              <p className="text-muted" style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.6, maxWidth: 480 }}>
                The complete engine. MIT licensed. Unlimited MAI, unlimited depth, unlimited vaults. No telemetry, no vendor lock-in, no "free until we change our mind."
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <CopyCmd cmd="curl -fsSL sharkauth.com/get | sh" label="Get the Binary" />
              <a href="https://github.com/shark-auth/shark" className="btn btn-ghost" style={{ height: 44 }}>
                <Icon.github size={14} /> View source
              </a>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '14px 24px',
              paddingTop: 28,
              borderTop: '1px solid hsl(0 0% 10%)',
            }}>
              {[
                { label: 'Binary size', val: '~29 MB' },
                { label: 'License', val: 'MIT' },
                { label: 'Protocols', val: 'OAuth 2.1 · OIDC' },
                { label: 'Token exchange', val: 'RFC 8693' },
                { label: 'Key binding', val: 'RFC 9449 DPoP' },
                { label: 'Database', val: 'SQLite WAL' },
                { label: 'MAI limit', val: 'Unlimited' },
                { label: 'Act chain depth', val: 'Unlimited' },
                { label: 'Vaults', val: 'Unlimited' },
                { label: 'Support', val: 'Community / GitHub' },
              ].map(spec => (
                <div key={spec.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'hsl(0 0% 45%)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{spec.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'hsl(0 0% 90%)' }}>{spec.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud tiers */}
          <div style={{
            background: 'hsl(0 0% 3%)',
            padding: 'clamp(40px, 5vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 32,
          }}>
            <div>
              <span className="mono" style={{ fontSize: 13, color: 'hsl(0 0% 60%)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Shark Cloud</span>
              <p className="text-muted" style={{ marginTop: 18, fontSize: 15, lineHeight: 1.6 }}>
                Managed infrastructure for teams that prefer not to run their own issuer. Same binary, same spec compliance, zero ops. Pricing scales by MAI — Monthly Active Identities.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { name: 'Cloud Free', price: '$0/mo', specs: '20K MAI · depth 2 · 3 vaults' },
                { name: 'Cloud Pro', price: '$49/mo', specs: '50K MAI · depth 4 · 10 vaults' },
                { name: 'Cloud Team', price: '$199/mo', specs: '200K MAI · depth 7 · 25 vaults' },
                { name: 'Enterprise', price: 'Custom', specs: 'Unlimited · SLA · from $25K/yr' },
              ].map(tier => (
                <div key={tier.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 12, borderBottom: '1px solid hsl(0 0% 10%)' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'hsl(0 0% 90%)' }}>{tier.name}</div>
                    <div className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 45%)', marginTop: 2 }}>{tier.specs}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'hsl(0 0% 75%)', whiteSpace: 'nowrap', marginLeft: 12 }}>{tier.price}</div>
                </div>
              ))}
            </div>

            <a href="/waitlist" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
              Join Cloud Waitlist <Icon.arrow size={12} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #pricing > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

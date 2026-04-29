'use client';

import React, { useState } from 'react';
import { DelegationCanvas } from '../DelegationCanvas';

export function AdminShowcase() {
  const [revoked, setRevoked] = useState('none');
  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">Admin UI</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 760 }}>
              The console is <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>embedded.</span> The surface is small. The depth is real.
            </h2>
          </div>
          <p className="text-muted" style={{ maxWidth: 360, fontSize: 14, lineHeight: 1.6 }}>
            Every screen is a thin shell over the same admin API your CI/CD already calls. Nothing is &quot;console-only.&quot;
          </p>
        </div>

        <div className="reveal" style={{ marginTop: 56 }}>
          <DelegationCanvas revoked={revoked} setRevoked={setRevoked} />
        </div>

        {/* Sub-screens */}
        <div className="reveal" style={{
          marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
        }}>
          <ApplicationsPanel />
          <AuditPanel />
        </div>
      </div>
    </section>
  );
}

function ApplicationsPanel() {
  const apps = [
    { n: 'research-orchestrator', t: 'agent', kid: 'ec-p256-7Hx', g: 4, sc: 'read:gmail · read:calendar · web:fetch' },
    { n: 'web-fetcher', t: 'agent', kid: 'ec-p256-2Mn', g: 1, sc: 'web:fetch' },
    { n: 'acme-web', t: 'spa', kid: 'rsa-2048-bX1', g: 0, sc: 'openid profile email' },
    { n: 'acme-mobile', t: 'native', kid: 'rsa-2048-cY9', g: 0, sc: 'openid profile email' },
    { n: 'invoice-bot', t: 'agent', kid: 'ec-p256-9Lm', g: 2, sc: 'read:invoices · write:invoices' },
  ];
  return (
    <div className="ring-soft" style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(180deg, hsl(0 0% 4.5%), hsl(0 0% 2.5%))', border: '1px solid hsl(0 0% 12%)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid hsl(0 0% 10%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="mono" style={{ fontSize: 12, color: 'hsl(0 0% 70%)' }}>shark://admin / applications</div>
        <span className="chip">5 clients</span>
      </div>
      <div style={{ padding: '8px 4px' }}>
        {apps.map((a, i) => (
          <div key={a.n} style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr 60px',
            gap: 14, padding: '14px 18px',
            borderBottom: i < apps.length - 1 ? '1px solid hsl(0 0% 8%)' : 'none',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' }}>{a.n}</div>
              <div className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 55%)', marginTop: 3 }}>kid {a.kid}</div>
            </div>
            <div>
              <span className="chip" style={{ marginRight: 6 }}>{a.t}</span>
              <div className="mono" style={{ fontSize: 11, color: 'hsl(0 0% 50%)', marginTop: 6 }}>{a.sc}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="tok partial" style={{ fontWeight: 500 }}>{a.g} grants</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditPanel() {
  const lines = [
    { t: '16:42:11.084', k: 'token.issue', m: 'jane@acme.dev → research-orchestrator', s: 'OK' },
    { t: '16:42:11.219', k: 'token.exchange', m: 'research-orchestrator → web-fetcher', s: 'OK' },
    { t: '16:42:11.681', k: 'introspect', m: 'web-fetcher  active=true', s: 'OK' },
    { t: '16:43:05.102', k: 'grant.revoke', m: 'g_8FaQ4tR7L  (cascade=true)', s: 'OK' },
    { t: '16:43:05.144', k: 'token.deny', m: 'web-fetcher  reason=revoked', s: '401' },
    { t: '16:43:05.601', k: 'introspect', m: 'web-fetcher  active=false', s: 'OK' },
  ];
  return (
    <div className="ring-soft" style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(180deg, hsl(0 0% 4.5%), hsl(0 0% 2.5%))', border: '1px solid hsl(0 0% 12%)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid hsl(0 0% 10%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="mono" style={{ fontSize: 12, color: 'hsl(0 0% 70%)' }}>shark://admin / audit  ·  grant_id g_8FaQ4tR7L</div>
        <span className="chip"><span className="dot live" style={{ width: 5, height: 5 }} /> live</span>
      </div>
      <div className="mono" style={{ fontSize: 12, padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '92px 124px 1fr 50px', gap: 14, alignItems: 'center' }}>
            <span style={{ color: 'hsl(0 0% 45%)' }}>{l.t}</span>
            <span style={{ color: 'hsl(0 0% 80%)' }}>{l.k}</span>
            <span style={{ color: 'hsl(0 0% 65%)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.m}</span>
            <span className={l.s === 'OK' ? 'tok yes' : 'tok no'} style={{ minWidth: 0, padding: '0 8px', height: 22, fontSize: 11 }}>{l.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

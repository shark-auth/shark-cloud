'use client';

import React from 'react';
import { Icon } from '../Icons';

export function Differentiators() {
  const cards = [
    {
      icon: <Icon.shield size={20} />,
      tag: 'may_act_grants',
      title: 'Authorization that knows who you are and who you brought.',
      body: 'Express delegation policy as structured data. Scope every grant by action, resource, and expiry. Revoke or expire automatically when conditions change.',
      kicker: 'spec: act / actor / may_act',
    },
    {
      icon: <Icon.key size={20} />,
      tag: 'RFC 9449 DPoP',
      title: 'Tokens bound to keys, not bearers.',
      body: "Every access token is cryptographically bound to the agent's private key via RFC 9449 DPoP. A stolen token is useless without the key. Replay-resistant by design.",
      kicker: 'replay-resistant by default',
    },
    {
      icon: <Icon.layers size={20} />,
      tag: 'Full act chain',
      title: 'Provable provenance across every agent hop.',
      body: "Preserve the complete delegation chain across every agent hop. Surface full provenance in token introspection. Eliminate 'the agent did it' dead ends.",
      kicker: 'chain depth observed: up to 7',
    },
    {
      icon: <Icon.link size={20} />,
      tag: 'Cascade revocation',
      title: 'Pull one thread, the whole graph unravels.',
      body: 'Revoke any grant and every downstream token invalidates automatically. Indexed by grant_id and propagated through introspection in under 12 ms p99.',
      kicker: 'p99 propagation < 12 ms',
    },
    {
      icon: <Icon.cube size={20} />,
      tag: '~29 MB binary',
      title: 'One binary. Zero dependencies. Anywhere.',
      body: 'Static Go binary with embedded SQLite WAL. Run it next to your app, in a container, on a corporate VM, or an air-gapped Raspberry Pi. Backup is a single file copy.',
      kicker: 'cold start: 38 ms',
    },
    {
      icon: <Icon.terminal size={20} />,
      tag: 'Audit by grant_id',
      title: 'Every action attributable by grant_id.',
      body: 'Structured JSON audit logs, indexed by grant_id, subject, actor, and grant. Stream directly to your SIEM via events websocket. Compliance-ready out of the box.',
      kicker: 'append-only · hash-chained',
    },
  ];

  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
          <div>
            <span className="eyebrow">What makes it different</span>
            <h2 style={{ fontSize: 'clamp(34px, 4.6vw, 60px)', marginTop: 16, lineHeight: 1.05, maxWidth: 760 }}>
              Six primitives that nobody else <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>actually ships.</span>
            </h2>
          </div>
        </div>

        <div className="reveal" style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 1, background: 'hsl(0 0% 12%)', border: '1px solid hsl(0 0% 12%)', borderRadius: 18, overflow: 'hidden',
        }}>
          {cards.map((c, idx) => (
            <article
              key={c.tag}
              className="diff-card"
              data-reveal-delay={`${idx * 80}ms`}
              style={{
                background: 'hsl(0 0% 2.5%)',
                padding: 28,
                minHeight: 260,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative',
                transition: 'transform .35s cubic-bezier(.2,.7,.2,1), border-color .35s ease',
                border: '1px solid transparent',
                borderRadius: 2,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 36, height: 36, borderRadius: 10,
                    background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 14%)', color: 'white',
                  }}>{c.icon}</span>
                  <span className="chip">{c.tag}</span>
                </div>
                <h3 style={{ marginTop: 22, fontSize: 19, lineHeight: 1.25, letterSpacing: '-0.02em', fontWeight: 500 }}>
                  {c.title}
                </h3>
                <p style={{ marginTop: 10, color: 'hsl(0 0% 65%)', fontSize: 14, lineHeight: 1.6 }}>{c.body}</p>
              </div>
              <div className="mono" style={{ marginTop: 22, fontSize: 11.5, color: 'hsl(0 0% 45%)', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'hsl(0 0% 35%)' }} />
                {c.kicker}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .diff-card:hover {
          transform: translateY(-3px);
          border-color: hsl(0 0% 18%) !important;
        }
        @media (max-width: 640px) {
          .diff-card { min-height: auto !important; }
        }
      `}</style>
    </section>
  );
}

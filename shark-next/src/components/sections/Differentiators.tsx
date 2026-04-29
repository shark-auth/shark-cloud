import React from 'react';
import { Icon } from '../Primitives';

export function Differentiators() {
  const cards = [
    {
      icon: <Icon.shield size={20} />,
      tag: 'may_act_grants',
      title: 'Authorization that knows who you are and who you brought.',
      body: 'Express delegation policy as data. "research-orchestrator may act on behalf of jane@acme.dev for read:gmail when actor presents DPoP key kid=ec-p256-7Hx." Granted, scoped, expirable, revocable.',
      kicker: 'spec: act / actor / may_act',
    },
    {
      icon: <Icon.key size={20} />,
      tag: 'RFC 9449 DPoP',
      title: 'Tokens bound to keys, not bearers.',
      body: 'Every access token is cryptographically pinned to the agent\'s key. Steal the token, you get nothing. Steal the key on a TPM-protected device — also nothing.',
      kicker: 'replay-resistant by default',
    },
    {
      icon: <Icon.layers size={20} />,
      tag: 'Full act chain',
      title: 'Provable provenance up to depth N.',
      body: 'When agent A delegates to agent B who calls API C, the act chain is preserved end-to-end and surfaced in introspection. No more "the agent did it" with nothing else to go on.',
      kicker: 'chain depth observed: up to 7',
    },
    {
      icon: <Icon.link size={20} />,
      tag: 'Cascade revocation',
      title: 'Pull one thread, the whole graph unravels.',
      body: 'Revoke a grant, a session, an actor — and every downstream token derived from it goes with it. Indexed by grant_id, propagated through the introspection endpoint in single-digit ms.',
      kicker: 'p99 propagation < 12 ms',
    },
    {
      icon: <Icon.cube size={20} />,
      tag: '~40 MB binary',
      title: 'Embedded SQLite. Zero deps. Anywhere.',
      body: 'Static Go binary with WAL-mode SQLite inside. Run it next to your app, in a Fly.io machine, in a corporate VM, on an air-gapped Pi. Backup is cp shark.db.',
      kicker: 'cold start: 38 ms',
    },
    {
      icon: <Icon.terminal size={20} />,
      tag: 'Audit by grant_id',
      title: 'Every byte that left the building, attributable.',
      body: 'Audit log is structured JSON, addressable by grant_id, subject, actor, or grant. Stream to your SIEM via the events websocket. Compliance team will not believe their eyes.',
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
          {cards.map((c) => (
            <article key={c.tag} style={{
              background: 'hsl(0 0% 2.5%)',
              padding: 28,
              minHeight: 260,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative',
            }}>
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
              <div className="mono" style={{ marginTop: 22, fontSize: 11.5, color: 'hsl(0 0% 45%)', letterSpacing: '0.04em' }}>
                ◆ {c.kicker}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

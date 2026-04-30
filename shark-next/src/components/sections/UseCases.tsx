import React from 'react';

export function UseCases() {
  const cases = [
    {
      tag: '01',
      h: 'Personal AI assistant with real keys to your kingdom.',
      b: 'Your assistant reads your inbox because you said it could — bound to one DPoP key, scoped to one label, expiring at 5pm.',
    },
    {
      tag: '02',
      h: 'Multi-agent orchestrator with provable provenance.',
      b: 'Orchestrator fans out to a fetcher, a summarizer, a writer. Each link in the chain is signed, scoped, and revocable independently.',
    },
    {
      tag: '03',
      h: 'Embedded auth for OSS SaaS.',
      b: 'Drop the binary next to your app. Get OAuth 2.1, OIDC, SCIM, and an admin UI without a vendor on the critical path.',
    },
    {
      tag: '04',
      h: 'Internal platforms that need real audit.',
      b: 'Every agent action attributable to a human, indexed by grant_id, hash-chained, replayable into your SIEM.',
    },
    {
      tag: '05',
      h: 'Edge & air-gapped deployments.',
      b: 'A 40 MB binary on a Pi, talking to a SQLite file. No outbound calls. No phone-home. No "free until we change our mind."',
    },
    {
      tag: '06',
      h: 'Compliance teams who have seen too much.',
      b: 'MIT, hash-chained audit, deterministic config in shark.toml. Auditors get receipts. You get to sleep.',
    },
  ];
  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="eyebrow">Use cases</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 720 }}>
              The shape of <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>agent infrastructure</span> people are actually shipping.
            </h2>
          </div>
        </div>
        <div className="reveal" style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 1, background: 'hsl(0 0% 12%)', border: '1px solid hsl(0 0% 12%)', borderRadius: 18, overflow: 'hidden' }}>
          {cases.map((c) => (
            <div key={c.tag} style={{ background: 'hsl(0 0% 2.5%)', padding: 28, minHeight: 200 }}>
              <div className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 45%)', letterSpacing: '0.1em' }}>{c.tag}</div>
              <div style={{ marginTop: 12, fontSize: 18, lineHeight: 1.3, letterSpacing: '-0.02em', fontWeight: 500 }}>{c.h}</div>
              <p style={{ marginTop: 10, color: 'hsl(0 0% 65%)', fontSize: 13.5, lineHeight: 1.6 }}>{c.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';

export function UseCases() {
  const cases = [
    {
      n: '01',
      h: 'Personal AI assistant with real keys to your kingdom.',
      b: 'Your assistant reads your inbox because you said it could — bound to one DPoP key, scoped to one label, expiring at 5pm.',
    },
    {
      n: '02',
      h: 'Multi-agent orchestrator with provable provenance.',
      b: 'Orchestrator fans out to a fetcher, a summarizer, a writer. Each link in the chain is signed, scoped, and revocable independently.',
    },
    {
      n: '03',
      h: 'Embedded auth for OSS SaaS.',
      b: 'Drop the binary next to your app. Get OAuth 2.1, OIDC, SCIM, and an admin UI without a vendor on the critical path.',
    },
    {
      n: '04',
      h: 'Internal platforms that need real audit.',
      b: 'Every agent action attributable to a human, indexed by grant_id, hash-chained, replayable into your SIEM.',
    },
    {
      n: '05',
      h: 'Edge & air-gapped deployments.',
      b: 'A 29 MB binary on a Pi, talking to a SQLite file. No outbound calls. No phone-home. No "free until we change our mind."',
    },
    {
      n: '06',
      h: 'Compliance teams who have seen too much.',
      b: 'MIT, hash-chained audit, deterministic config in shark.toml. Auditors get receipts. You get to sleep.',
    },
  ];

  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 64 }}>
          <span className="eyebrow">Use cases</span>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 720 }}>
            The shape of <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>agent infrastructure</span> people are actually shipping.
          </h2>
        </div>

        <div className="reveal">
          {cases.map((c, i) => (
            <div
              key={c.n}
              className="narrative-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: 'clamp(16px, 3vw, 40px)',
                alignItems: 'baseline',
                padding: 'clamp(32px, 4vw, 48px) 0',
                borderTop: i === 0 ? '1px solid hsl(0 0% 12%)' : 'none',
                borderBottom: '1px solid hsl(0 0% 12%)',
                transition: 'transform .35s cubic-bezier(.2,.7,.2,1)',
              }}
            >
              <span className="mono" style={{
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                fontWeight: 500,
                color: 'hsl(0 0% 22%)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                transition: 'color .35s ease',
              }}>{c.n}</span>
              <div>
                <div style={{
                  fontSize: 'clamp(17px, 1.6vw, 20px)',
                  fontWeight: 500,
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                }}>{c.h}</div>
                <p style={{
                  marginTop: 8,
                  color: 'hsl(0 0% 60%)',
                  fontSize: 15,
                  lineHeight: 1.6,
                  maxWidth: 640,
                }}>{c.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .narrative-row:hover {
          transform: translateX(6px);
        }
        .narrative-row:hover .mono {
          color: hsl(0 0% 55%) !important;
        }
      `}</style>
    </section>
  );
}

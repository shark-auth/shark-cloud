import React from 'react';

export function Quickstart() {
  const lines = [
    { p: '$', t: 'curl -fsSL get.sharkauth.dev | sh', muted: false },
    { p: '', t: '✓ downloaded shark-0.9.0-linux-amd64 (39.8 MB)', muted: true },
    { p: '$', t: 'shark init --issuer https://auth.acme.dev', muted: false },
    { p: '', t: '✓ wrote shark.toml  ✓ generated EC P-256 signing key', muted: true },
    { p: '$', t: 'shark serve', muted: false },
    { p: '', t: 'listening on :4444  ·  admin on :4445  ·  sqlite at ./shark.db', muted: true },
    { p: '', t: 'discovery → /.well-known/oauth-authorization-server', muted: true },
  ];
  const sdk = `import { Shark } from "@sharkauth/sdk";

const shark = new Shark({ issuer: "https://auth.acme.dev" });

// Exchange the user's id_token for an agent token bound to a DPoP key
const agentToken = await shark.tokenExchange({
  subject_token: userIdToken,
  actor_token: agentJwk,            // RFC 9449 DPoP-bound
  scope: "read:gmail read:calendar",
  may_act: { client_id: "research-orchestrator" },
});`;

  return (
    <section id="install" style={{ padding: 'clamp(60px, 9vw, 120px) clamp(20px, 4vw, 56px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          <div>
            <span className="eyebrow">60-second quickstart</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05 }}>
              From zero to <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>token exchange</span> in three commands.
            </h2>
          </div>
          <div className="text-muted" style={{ fontSize: 14, maxWidth: 380 }}>
            No Postgres. No Helm chart. No identity vendor SDK with 18 transitive dependencies. One binary, one SQLite file, zero excuses.
          </div>
        </div>

        <div className="reveal" style={{
          display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24,
        }}>
          {/* Terminal */}
          <div className="codeblock" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid hsl(0 0% 12%)', background: 'hsl(0 0% 4%)' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: 99, background: 'hsl(0 0% 18%)' }} />
                <span style={{ width: 9, height: 9, borderRadius: 99, background: 'hsl(0 0% 18%)' }} />
                <span style={{ width: 9, height: 9, borderRadius: 99, background: 'hsl(0 0% 18%)' }} />
              </div>
              <span className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 55%)' }}>~/acme · zsh</span>
              <span style={{ width: 30 }} />
            </div>
            <div style={{ padding: '18px 22px' }}>
              {lines.map((l, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, padding: '2px 0',
                  color: l.muted ? 'hsl(0 0% 55%)' : 'hsl(0 0% 95%)',
                }}>
                  <span style={{ color: l.p ? 'hsl(0 0% 38%)' : 'transparent', width: 10, flex: '0 0 10px' }}>{l.p || '·'}</span>
                  <span>{l.t}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, color: 'hsl(0 0% 60%)' }}>
                <span style={{ color: 'hsl(0 0% 38%)', marginRight: 14 }}>$</span>
                <span style={{ borderRight: '2px solid white', paddingRight: 2, animation: 'pulse 1.2s steps(1) infinite' }}> </span>
              </div>
            </div>
          </div>

          {/* SDK */}
          <div className="codeblock" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid hsl(0 0% 12%)', background: 'hsl(0 0% 4%)' }}>
              <div className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 70%)' }}>agent.ts</div>
              <span className="chip" style={{ fontSize: 10.5 }}>@sharkauth/sdk · v0.9.0</span>
            </div>
            <pre style={{ margin: 0, padding: '18px 22px', whiteSpace: 'pre-wrap', color: 'hsl(0 0% 88%)', fontSize: 13 }}>
              {sdk}
            </pre>
          </div>
        </div>

        {/* Steps */}
        <div className="reveal" style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { n: '01', t: 'Drop the binary', d: 'Single Go binary, ~40 MB. macOS, Linux, ARM. No runtime, no daemon.' },
            { n: '02', t: 'Configure once', d: 'shark.toml. Issuers, clients, may_act_grants. Or POST to the admin API.' },
            { n: '03', t: 'Mint agent tokens', d: 'OAuth 2.1, OIDC, Token Exchange, DPoP. Audit by grant_id. Done.' },
          ].map(s => (
            <div key={s.n} className="glass-card" style={{ padding: 22, borderRadius: 14 }}>
              <div className="mono" style={{ color: 'hsl(0 0% 45%)', fontSize: 12, letterSpacing: '0.1em' }}>STEP {s.n}</div>
              <div style={{ fontSize: 18, fontWeight: 500, marginTop: 8, letterSpacing: '-0.02em' }}>{s.t}</div>
              <div style={{ marginTop: 6, color: 'hsl(0 0% 65%)', fontSize: 13.5, lineHeight: 1.55 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

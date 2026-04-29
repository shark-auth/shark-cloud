'use client';

import React, { useState } from 'react';
import { Icon } from '../Primitives';

export function Docs() {
  const [active, setActive] = useState(0);
  const sections = [
    { id: 'install', t: 'Install', sub: 'getting-started' },
    { id: 'config', t: 'Configure', sub: 'shark.toml' },
    { id: 'clients', t: 'Clients & agents', sub: 'register, kid, may_act' },
    { id: 'exchange', t: 'Token Exchange', sub: 'RFC 8693' },
    { id: 'dpop', t: 'DPoP key binding', sub: 'RFC 9449' },
    { id: 'revoke', t: 'Revocation & cascade', sub: 'grant_id semantics' },
    { id: 'audit', t: 'Audit log', sub: 'streaming + replay' },
    { id: 'sdk', t: 'SDKs', sub: 'Node · Go · Python' },
  ];
  const snippets = [
    `# install (verified by sha256)
curl -fsSL get.sharkauth.dev | sh
shark --version
# shark 0.9.0 (4f5a8b21) linux/amd64`,
    `# shark.toml
issuer = "https://auth.acme.dev"
listen = ":4444"
admin  = ":4445"

[storage]
sqlite = "./shark.db"

[keys]
signing = "auto"        # generates EC P-256 on first boot`,
    `shark clients add research-orchestrator \\
  --type agent \\
  --jwks-uri https://orch.acme.dev/.well-known/jwks.json \\
  --may-act-of jane@acme.dev \\
  --scope "read:gmail read:calendar"`,
    `POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&subject_token=<user id_token>
&subject_token_type=urn:ietf:params:oauth:token-type:id_token
&actor_token=<agent jwt>
&scope=read:gmail`,
    `# Client must prove possession of the private key on every call:
DPoP: eyJhbGciOiJFUzI1NiIsImp3ayI6ey…
Authorization: DPoP eyJhbGciOi…

# Server verifies htu, htm, jti, and binds cnf.jkt to the access_token.`,
    `# Cascade: revoke a grant and every downstream token dies with it.
DELETE /admin/grants/g_8FaQ4tR7L?cascade=true

# 200 OK
# { "revoked": 4, "depth": 2, "took_ms": 8 }`,
    `# Tail audit, structured JSON, hash-chained.
shark audit tail --grant g_8FaQ4tR7L --follow

# {"ts":"…","kind":"token.exchange","sub":"jane@acme.dev",
#  "act":"research-orchestrator","grant_id":"g_8FaQ4tR7L","ok":true}`,
    `import { Shark } from "@sharkauth/sdk";
const shark = new Shark({ issuer: "https://auth.acme.dev" });
const tok = await shark.tokenExchange({
  subject_token: userIdToken,
  actor_token:   agentJwk,
  scope: "read:gmail"
});`,
  ];

  return (
    <section id="docs" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="eyebrow">Docs · /docs</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 720 }}>
              Eight pages. <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>Zero fluff.</span> One read-through and you ship.
            </h2>
          </div>
          <a href="#" className="btn btn-ghost" style={{ height: 40 }}>
            Open full docs <Icon.arrow size={12} />
          </a>
        </div>

        <div className="reveal" style={{
          marginTop: 48,
          display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24,
          border: '1px solid hsl(0 0% 12%)', borderRadius: 18, overflow: 'hidden', background: 'hsl(0 0% 2.5%)',
        }}>
          {/* Sidebar */}
          <nav className="docs-scroll" style={{ borderRight: '1px solid hsl(0 0% 10%)', padding: '18px 14px', background: 'hsl(0 0% 3.5%)', overflowY: 'auto' }}>
            <div className="mono" style={{ fontSize: 11, color: 'hsl(0 0% 45%)', letterSpacing: '0.1em', padding: '0 10px 10px' }}>CONTENTS</div>
            {sections.map((s, i) => (
              <button key={s.id} onClick={() => setActive(i)} style={{
                width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 10,
                border: '1px solid ' + (active === i ? 'hsl(0 0% 22%)' : 'transparent'),
                background: active === i ? 'hsla(0,0%,100%,0.05)' : 'transparent',
                color: active === i ? 'white' : 'hsl(0 0% 70%)',
                cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 2,
                fontFamily: 'inherit', fontSize: 13.5, marginBottom: 2,
                transition: 'all .2s',
              }}>
                <span style={{ fontWeight: 500, letterSpacing: '-0.01em' }}>{s.t}</span>
                <span className="mono" style={{ fontSize: 11, color: 'hsl(0 0% 50%)' }}>{s.sub}</span>
              </button>
            ))}
          </nav>
          {/* Content */}
          <div className="docs-scroll" style={{ padding: '32px 36px 36px', minHeight: 420, overflowY: 'auto' }}>
            <div className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 45%)', letterSpacing: '0.1em' }}>
              {String(active + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}  ·  /docs/{sections[active].id}
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.025em', marginTop: 14, lineHeight: 1.15 }}>
              {sections[active].t}
            </h3>
            <p className="text-muted" style={{ fontSize: 14.5, lineHeight: 1.6, marginTop: 10, maxWidth: 620 }}>
              The {sections[active].t.toLowerCase()} reference page. Every primitive lands inside two pages, every snippet is copy-pasteable, every example runs against a fresh <span className="mono">shark serve</span>.
            </p>
            <div className="codeblock" style={{ marginTop: 22, padding: '20px 22px', whiteSpace: 'pre-wrap', fontSize: 13 }}>
              {snippets[active]}
            </div>
            <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
              <button onClick={() => setActive((active - 1 + sections.length) % sections.length)} className="btn btn-ghost" style={{ height: 36 }}>← Prev</button>
              <button onClick={() => setActive((active + 1) % sections.length)} className="btn btn-ghost" style={{ height: 36 }}>Next →</button>
              <span style={{ flex: 1 }} />
              <a href="#" className="btn btn-ghost" style={{ height: 36 }}><Icon.github size={12} /> Edit on GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

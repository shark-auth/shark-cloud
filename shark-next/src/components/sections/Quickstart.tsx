import React from 'react';

export function Quickstart() {
  const cliText = `shark ❯ shark serve  main    

  ▄▄▄▄▄                             
 ██▀▀▀▀█▄ █▄                          
 ▀██▄  ▄▀ ██          ▄     ▄▄      
   ▀██▄▄  ████▄ ▄▀▀█▄ ████▄ ██ ▄█▀  
 ▄   ▀██▄ ██ ██ ▄█▀██ ██    ████    
 ▀██████▀▄██ ██▄▀█▄██▄█▀   ▄██ ▀█▄  
                                    
                                                                                                       
SharkAuth — Open Source Auth for Agents and Humans
Binary: 29 MB · Version: 0.1.0
Docs:   https://sharkauth.com/docs
Repo:   https://github.com/shark-auth/shark
13:17:42 INFO  database schema up to date
13:17:42 INFO  email: provider=dev — using in-db dev inbox for capture
13:17:42 INFO  oauth: loaded existing ES256 signing key  kid=uLHp-sa54BeWehkO

  Dashboard   http://localhost:8080/admin

13:17:42 INFO  SharkAuth starting  addr=:8080  dev_mode=false
13:17:42 INFO  admin dashboard  url=http://localhost:8080/admin
13:17:42 INFO  health check  url=http://localhost:8080/healthz`;

  return (
    <section id="install" style={{ padding: 'clamp(60px, 9vw, 120px) clamp(20px, 4vw, 56px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          <div>
            <span className="eyebrow">60-second quickstart</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05 }}>
              Simple ops.
            </h2>
          </div>
          <div className="text-muted" style={{ fontSize: 14, maxWidth: 380 }}>
            No Postgres. No Helm chart. No identity vendor SDK with 18 transitive dependencies. One binary, one SQLite file, zero excuses.
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 40 }}>
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
            <pre className="cli-demo-pre" style={{ margin: 0, padding: '24px 32px', whiteSpace: 'pre', overflowX: 'auto', color: 'hsl(0 0% 88%)', fontSize: 14, lineHeight: 1.6, WebkitOverflowScrolling: 'touch' }}>
              {cliText}
            </pre>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { n: '01', t: 'Drop the binary', d: 'Single Go binary, ~29 MB. macOS, Linux, ARM. No runtime, no daemon.' },
            { n: '02', t: 'Configure once', d: 'Environment variables or the admin API. Issuers, clients, may_act_grants.' },
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

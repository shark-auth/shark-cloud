'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '../Primitives';

export function LiveDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 4), 2400);
    return () => clearInterval(id);
  }, []);
  const steps = [
    { l: 'Authenticated user', s: 'jane@acme.dev', d: 'OIDC code+PKCE  ·  iss https://auth.acme.dev' },
    { l: 'Agent A presents DPoP', s: 'research-orchestrator', d: 'kid ec-p256-7Hx  ·  htu /token  ·  htm POST' },
    { l: 'Token Exchange', s: 'subject + actor', d: 'grant_type token-exchange  ·  scope read:gmail' },
    { l: 'Audit, scoped, bound', s: 'access_token (DPoP-bound)', d: 'grant_id g_8FaQ•••  ·  exp 5m  ·  act_chain depth 2' },
  ];

  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr', justifyItems: 'center', textAlign: 'center' }}>
          <span className="eyebrow">The flow</span>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, maxWidth: 760, lineHeight: 1.06 }}>
            Watch a delegated request <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>cross the wire.</span>
          </h2>
        </div>

        <div className="reveal" style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch',
        }}>
          {/* Diagram */}
          <div className="glass-card" style={{ borderRadius: 18, padding: 28 }}>
            <div className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 50%)', letterSpacing: '0.06em' }}>
              POST /oauth/token  ·  RFC 8693
            </div>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {steps.map((s, i) => (
                <li key={i} style={{
                  display: 'grid', gridTemplateColumns: '34px 1fr',
                  gap: 14, alignItems: 'flex-start',
                  padding: 14, borderRadius: 12,
                  border: '1px solid ' + (step === i ? 'hsla(0,0%,100%,0.22)' : 'hsl(0 0% 10%)'),
                  background: step === i ? 'hsla(0,0%,100%,0.04)' : 'hsl(0 0% 3%)',
                  transition: 'all .4s',
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 8,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: step >= i ? 'white' : 'hsl(0 0% 6%)',
                    color: step >= i ? 'black' : 'hsl(0 0% 60%)',
                    border: '1px solid ' + (step >= i ? 'white' : 'hsl(0 0% 16%)'),
                    fontSize: 12, fontWeight: 600,
                  }}>
                    {step > i ? <Icon.check size={11} /> : i + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: '-0.01em' }}>{s.l}</div>
                    <div className="mono" style={{ fontSize: 12, color: 'hsl(0 0% 80%)', marginTop: 2 }}>{s.s}</div>
                    <div className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 50%)', marginTop: 4 }}>{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Response */}
          <div className="codeblock" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid hsl(0 0% 12%)' }}>
              <div className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 70%)' }}>← 200 OK · application/json</div>
              <span className="chip">DPoP-bound · 5m</span>
            </div>
            <pre style={{ margin: 0, padding: '20px 22px', color: 'hsl(0 0% 88%)', fontSize: 12.5, lineHeight: 1.7 }}>
              {`{
  "access_token": "eyJhbGciOi…",
  "token_type":   "DPoP",
  "expires_in":   300,
  "scope":        "read:gmail read:calendar",
  "grant_id":     "g_8FaQ4tR7L",
  "act": {
    "sub": "research-orchestrator",
    "act": { "sub": "jane@acme.dev" }
  },
  "cnf": {
    "jkt": "Bf9c…ec-p256-7Hx"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

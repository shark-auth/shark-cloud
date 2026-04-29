import React from 'react';
import { LogoMark } from '../Primitives';

export function Footer() {
  const cols = [
    { h: 'Product', items: ['Overview', 'Comparison', 'Pricing', 'Changelog', 'Roadmap'] },
    { h: 'Developers', items: ['Quickstart', 'Reference', 'SDK · Node', 'SDK · Go', 'Audit log schema'] },
    { h: 'Specs', items: ['OAuth 2.1', 'OIDC', 'RFC 8693', 'RFC 9449 DPoP', 'PKCE / PAR'] },
    { h: 'Company', items: ['Blog', 'Security', 'License (AGPL-3.0)', 'Contact'] },
  ];
  return (
    <footer style={{ padding: '80px clamp(20px, 4vw, 56px) 40px', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 32, alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LogoMark size={28} />
            <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.025em' }}>SharkAuth</span>
          </div>
          <p className="text-muted" style={{ fontSize: 13.5, marginTop: 14, lineHeight: 1.55, maxWidth: 280 }}>
            OAuth 2.1 + OIDC authorization server for the agent-on-behalf-of-user era. Open source, AGPL-3.0.
          </p>
          <div className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 40%)', marginTop: 22 }}>
            sha256: 4f5a 8b21 19e6 …  ·  v0.9.0
          </div>
        </div>
        {cols.map(c => (
          <div key={c.h}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>{c.h}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.items.map(it => (
                <li key={it}>
                  <a href="#" style={{ color: 'hsl(0 0% 75%)', textDecoration: 'none', fontSize: 13.5, letterSpacing: '-0.005em' }}>{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1240, margin: '60px auto 0', paddingTop: 24, borderTop: '1px solid hsl(0 0% 8%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 45%)' }}>© 2026 SharkAuth Labs · An honest piece of software.</span>
        <span className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 45%)' }}>Built with ☼ care, not vibes.</span>
      </div>
    </footer>
  );
}

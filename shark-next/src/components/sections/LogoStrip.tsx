import React from 'react';

export function LogoStrip() {
  const items = [
    'OAUTH 2.1', 'OPENID CONNECT', 'RFC 8693', 'RFC 9449 DPoP',
    'PKCE', 'PAR', 'JWT-SECURED AR', 'mTLS BINDING',
    'SQLITE EMBEDDED', 'GO 1.23', 'AGPL 3.0',
  ];
  return (
    <section style={{ borderTop: '1px solid hsl(0 0% 8%)', borderBottom: '1px solid hsl(0 0% 8%)', overflow: 'hidden', background: 'hsl(0 0% 1.5%)' }}>
      <div className="marquee-track" style={{ padding: '22px 0' }}>
        {[...items, ...items].map((it, i) => (
          <span key={i} className="mono" style={{ fontSize: 13, color: 'hsl(0 0% 45%)', letterSpacing: '0.18em', whiteSpace: 'nowrap' }}>
            ◆ &nbsp; {it}
          </span>
        ))}
      </div>
    </section>
  );
}

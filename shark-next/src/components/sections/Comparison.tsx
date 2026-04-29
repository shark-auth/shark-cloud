import React from 'react';
import { Icon, LogoMark } from '../Primitives';

export function Comparison() {
  const rows = [
    { feat: 'Agent as first-class identity', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no' },
    { feat: 'RFC 8693 Token Exchange', shark: 'yes', auth0: 'partial', clerk: 'no', kc: 'partial' },
    { feat: 'Full act / actor chain (depth ≥ 4)', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no' },
    { feat: 'may_act_grants & granular policy', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no' },
    { feat: 'RFC 9449 DPoP key binding', shark: 'yes', auth0: 'partial', clerk: 'no', kc: 'no' },
    { feat: 'Cascade revocation', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no' },
    { feat: 'Audit indexed by grant_id', shark: 'yes', auth0: 'partial', clerk: 'partial', kc: 'partial' },
    { feat: 'Single ~40 MB binary', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no' },
    { feat: 'Self-hostable & open-source', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'yes' },
    { feat: 'Runs on a Raspberry Pi', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no' },
  ];
  const Tok = ({ kind }: { kind: string }) => {
    if (kind === 'yes') return <span className="tok yes"><Icon.check size={11} /></span>;
    if (kind === 'no') return <span className="tok no"><Icon.x size={10} /></span>;
    return <span className="tok partial">Partial</span>;
  };

  return (
    <section id="comparison" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">Honest comparison</span>
            <h2 style={{ fontSize: 'clamp(34px, 4.6vw, 60px)', lineHeight: 1.05, marginTop: 16 }}>
              Built for the world that <br />
              <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>actually exists in 2026.</span>
            </h2>
          </div>
          <p className="text-muted" style={{ maxWidth: 420, fontSize: 15.5, lineHeight: 1.6 }}>
            Identity vendors were built for users clicking buttons. SharkAuth was built for
            agents calling agents calling APIs — with the same RFC-grade rigor.
          </p>
        </div>

        <div className="reveal hscroll" style={{ marginTop: 56, border: '1px solid hsl(0 0% 12%)', borderRadius: 18, background: 'hsl(0 0% 2.5%)', overflow: 'hidden' }}>
          <table className="cmp-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left', paddingLeft: 28 }}>Feature</th>
                <th className="cmp-shark-col first" style={{ width: 180 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'white' }}>
                    <LogoMark size={20} /> SharkAuth
                  </div>
                </th>
                <th style={{ width: 140 }}>Auth0</th>
                <th style={{ width: 140 }}>Clerk</th>
                <th style={{ width: 140 }}>Keycloak</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.feat}>
                  <td className="feat" style={{ paddingLeft: 28, textAlign: 'left' }}>{r.feat}</td>
                  <td className={`cmp-shark-col ${i === rows.length - 1 ? 'last' : ''}`}><Tok kind={r.shark} /></td>
                  <td><Tok kind={r.auth0} /></td>
                  <td><Tok kind={r.clerk} /></td>
                  <td><Tok kind={r.kc} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="reveal" style={{ marginTop: 22, fontSize: 12.5, color: 'hsl(0 0% 50%)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="dot" /> Comparison reflects publicly documented features as of April 2026.
        </div>
      </div>
    </section>
  );
}

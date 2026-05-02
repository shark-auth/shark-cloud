'use client';

import React, { useState, useMemo } from 'react';
import { Icon, LogoMark } from '../Icons';

interface Row {
  group: string;
  feat: string;
  shark: string;
  auth0: string;
  clerk: string;
  kc: string;
  ory: string;
  authelia: string;
  zitadel: string;
  authentik: string;
}

const ALL_ROWS: Row[] = [
  { group: 'Agent Era', feat: 'Agent as first-class identity', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no', ory: 'no', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Agent Era', feat: 'RFC 8693 Token Exchange (full)', shark: 'yes', auth0: 'partial', clerk: 'no', kc: 'partial', ory: 'partial', authelia: 'no', zitadel: 'partial', authentik: 'no' },
  { group: 'Agent Era', feat: 'Act / actor chain (depth ≥ 4)', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no', ory: 'no', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Agent Era', feat: 'may_act_grants & granular policy', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no', ory: 'no', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Agent Era', feat: 'RFC 9449 DPoP key binding', shark: 'yes', auth0: 'partial', clerk: 'no', kc: 'no', ory: 'no', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Agent Era', feat: 'Cascade revocation (< 12 ms)', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no', ory: 'no', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Agent Era', feat: 'Audit indexed by grant_id', shark: 'yes', auth0: 'partial', clerk: 'partial', kc: 'partial', ory: 'partial', authelia: 'no', zitadel: 'partial', authentik: 'partial' },
  { group: 'Standard Auth', feat: 'Passkeys / FIDO2', shark: 'yes', auth0: 'yes', clerk: 'yes', kc: 'yes', ory: 'partial', authelia: 'yes', zitadel: 'yes', authentik: 'yes' },
  { group: 'Standard Auth', feat: 'Magic links', shark: 'yes', auth0: 'yes', clerk: 'yes', kc: 'no', ory: 'partial', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Standard Auth', feat: 'MFA / TOTP', shark: 'yes', auth0: 'yes', clerk: 'yes', kc: 'yes', ory: 'partial', authelia: 'yes', zitadel: 'yes', authentik: 'yes' },
  { group: 'Standard Auth', feat: 'Enterprise SSO (SAML 2.0, OIDC)', shark: 'yes', auth0: 'yes', clerk: 'yes', kc: 'yes', ory: 'partial', authelia: 'yes', zitadel: 'yes', authentik: 'yes' },
  { group: 'Standard Auth', feat: 'Multi-tenant organizations', shark: 'yes', auth0: 'yes', clerk: 'yes', kc: 'yes', ory: 'partial', authelia: 'no', zitadel: 'yes', authentik: 'no' },
  { group: 'Standard Auth', feat: 'Wildcard RBAC', shark: 'yes', auth0: 'yes', clerk: 'yes', kc: 'yes', ory: 'partial', authelia: 'partial', zitadel: 'yes', authentik: 'yes' },
  { group: 'Platform', feat: 'HMAC-signed webhooks', shark: 'yes', auth0: 'yes', clerk: 'yes', kc: 'partial', ory: 'partial', authelia: 'no', zitadel: 'yes', authentik: 'yes' },
  { group: 'Platform', feat: 'Zero-config admin UI', shark: 'yes', auth0: 'yes', clerk: 'yes', kc: 'no', ory: 'no', authelia: 'partial', zitadel: 'yes', authentik: 'yes' },
  { group: 'Deployment', feat: 'Single binary, zero deps', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no', ory: 'no', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Deployment', feat: 'Self-hostable & open-source', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'yes', ory: 'yes', authelia: 'yes', zitadel: 'yes', authentik: 'yes' },
  { group: 'Deployment', feat: 'Runs on a $5 VPS', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'no', ory: 'partial', authelia: 'yes', zitadel: 'no', authentik: 'partial' },
  { group: 'Deployment', feat: 'Air-gapped / no outbound calls', shark: 'yes', auth0: 'no', clerk: 'no', kc: 'yes', ory: 'yes', authelia: 'yes', zitadel: 'yes', authentik: 'yes' },
  { group: 'Pricing', feat: 'Free tier self-host limit', shark: 'Unlimited', auth0: '25K MAU', clerk: '50K MRU', kc: 'Unlimited', ory: 'Unlimited', authelia: 'Unlimited', zitadel: 'Unlimited', authentik: 'Unlimited' },
  { group: 'Pricing', feat: 'First paid tier', shark: '$49/mo (Cloud)', auth0: '$35/mo (B2C)', clerk: '$20/mo (Pro)', kc: 'Free', ory: 'Free', authelia: 'Free', zitadel: 'Free', authentik: 'Free' },
  { group: 'Ecosystem (Shark gaps)', feat: 'Native iOS / Android SDKs', shark: 'no', auth0: 'yes', clerk: 'yes', kc: 'no', ory: 'yes', authelia: 'no', zitadel: 'yes', authentik: 'no' },
  { group: 'Ecosystem (Shark gaps)', feat: 'LDAP / Active Directory native', shark: 'no', auth0: 'yes', clerk: 'no', kc: 'yes', ory: 'no', authelia: 'yes', zitadel: 'no', authentik: 'yes' },
  { group: 'Ecosystem (Shark gaps)', feat: 'SCIM user provisioning', shark: 'no', auth0: 'yes', clerk: 'no', kc: 'partial', ory: 'no', authelia: 'no', zitadel: 'yes', authentik: 'yes' },
  { group: 'Ecosystem (Shark gaps)', feat: 'Push notification MFA', shark: 'no', auth0: 'yes', clerk: 'yes', kc: 'no', ory: 'partial', authelia: 'partial', zitadel: 'yes', authentik: 'no' },
  { group: 'Ecosystem (Shark gaps)', feat: 'Breach / leaked password detection', shark: 'no', auth0: 'yes', clerk: 'no', kc: 'no', ory: 'no', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Ecosystem (Shark gaps)', feat: 'GeoIP & impossible-travel alerts', shark: 'no', auth0: 'yes', clerk: 'no', kc: 'no', ory: 'no', authelia: 'partial', zitadel: 'no', authentik: 'yes' },
  { group: 'Ecosystem (Shark gaps)', feat: 'FIPS 140-2 / compliance certs', shark: 'no', auth0: 'yes', clerk: 'no', kc: 'partial', ory: 'no', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Ecosystem (Shark gaps)', feat: 'Global multi-region managed cloud', shark: 'no', auth0: 'yes', clerk: 'yes', kc: 'no', ory: 'yes', authelia: 'no', zitadel: 'yes', authentik: 'no' },
  { group: 'Ecosystem (Shark gaps)', feat: 'Terraform / Pulumi provider', shark: 'no', auth0: 'yes', clerk: 'yes', kc: 'yes', ory: 'yes', authelia: 'partial', zitadel: 'yes', authentik: 'yes' },
  { group: 'Ecosystem (Shark gaps)', feat: 'SIEM connectors (Splunk, Datadog)', shark: 'no', auth0: 'yes', clerk: 'no', kc: 'partial', ory: 'no', authelia: 'no', zitadel: 'no', authentik: 'no' },
  { group: 'Ecosystem (Shark gaps)', feat: 'Custom claims scripting engine', shark: 'no', auth0: 'yes', clerk: 'no', kc: 'partial', ory: 'partial', authelia: 'no', zitadel: 'yes', authentik: 'yes' },
];

export function Comparison() {
  const groups = useMemo(() => {
    const map = new Map<string, Row[]>();
    ALL_ROWS.forEach(r => {
      const list = map.get(r.group) || [];
      list.push(r);
      map.set(r.group, list);
    });
    return Array.from(map.entries()).map(([name, rows]) => ({ name, rows }));
  }, []);

  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(['Agent Era', 'Standard Auth'])
  );

  const toggle = (name: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const expandAll = () => setExpanded(new Set(groups.map(g => g.name)));
  const collapseAll = () => setExpanded(new Set());

  const Tok = ({ kind }: { kind: string }) => {
    if (kind === 'yes') return <span className="tok yes"><Icon.check size={11} /></span>;
    if (kind === 'no') return <span className="tok no"><Icon.x size={10} /></span>;
    if (kind === 'partial') return <span className="tok partial">Partial</span>;
    return <span className="mono" style={{ fontSize: 12, color: 'hsl(0 0% 75%)' }}>{kind}</span>;
  };

  return (
    <section id="comparison" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">Agent-auth comparison</span>
            <h2 style={{ fontSize: 'clamp(34px, 4.6vw, 60px)', lineHeight: 1.05, marginTop: 16 }}>
              Built for the world that <br />
              <span className="serif" style={{ color: 'hsl(0 0% 70%)' }}>actually exists in 2026.</span>
            </h2>
          </div>
          <div style={{ maxWidth: 420 }}>
            <p className="text-muted" style={{ fontSize: 15.5, lineHeight: 1.6, margin: 0 }}>
              Identity vendors were built for users clicking buttons. SharkAuth was built for
              agents calling agents calling APIs — with the same RFC-grade rigor.
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: 'hsl(0 0% 45%)', marginTop: 12 }}>
              Some competitors support adjacent pieces — token exchange, token vaults,
              or machine identities. SharkAuth is the only system where agent delegation
              is the core model.
            </p>
          </div>
        </div>

        {/* Table controls */}
        <div className="reveal" style={{ marginTop: 40, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={expandAll} className="btn btn-ghost" style={{ height: 32, fontSize: 12, padding: '0 14px' }}>
              Expand all
            </button>
            <button onClick={collapseAll} className="btn btn-ghost" style={{ height: 32, fontSize: 12, padding: '0 14px' }}>
              Collapse all
            </button>
          </div>
          <span className="mono" style={{ fontSize: 11.5, color: 'hsl(0 0% 40%)' }}>
            {expanded.size} of {groups.length} groups open
          </span>
        </div>

        {/* Table */}
        <div className="reveal hscroll" style={{ marginTop: 16, border: '1px solid hsl(0 0% 12%)', borderRadius: 18, background: 'hsl(0 0% 2.5%)', overflow: 'hidden' }}>
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
                <th style={{ width: 140 }}>Ory Hydra</th>
                <th style={{ width: 140 }}>Authelia</th>
                <th style={{ width: 140 }}>Zitadel</th>
                <th style={{ width: 140 }}>Authentik</th>
              </tr>
            </thead>
            {groups.map((group, gi) => {
              const isOpen = expanded.has(group.name);
              const isLastGroup = gi === groups.length - 1;
              return (
                <tbody key={group.name}>
                  {/* Group header row */}
                  <tr
                    onClick={() => toggle(group.name)}
                    style={{
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'hsla(0,0%,100%,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td
                      colSpan={9}
                      style={{
                        padding: '16px 28px',
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'hsl(0 0% 55%)',
                        borderTop: gi > 0 ? '1px solid hsl(0 0% 12%)' : 'none',
                        borderBottom: isOpen ? '1px solid hsl(0 0% 10%)' : '1px solid hsl(0 0% 12%)',
                        userSelect: 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 18,
                              height: 18,
                              transition: 'transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1)',
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              color: 'hsl(0 0% 45%)',
                            }}
                          >
                            <Icon.chevron size={14} />
                          </span>
                          <span style={{ fontWeight: 500, color: 'hsl(0 0% 70%)' }}>{group.name}</span>
                          <span
                            className="mono"
                            style={{
                              fontSize: 10,
                              color: 'hsl(0 0% 35%)',
                              background: 'hsl(0 0% 8%)',
                              padding: '2px 8px',
                              borderRadius: 999,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {group.rows.length}
                          </span>
                        </div>
                        {!isOpen && (
                          <span className="mono" style={{ fontSize: 10, color: 'hsl(0 0% 30%)', letterSpacing: '0.04em' }}>
                            Click to expand
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Data rows */}
                  {group.rows.map((r, i) => {
                    const isLastRow = i === group.rows.length - 1 && isLastGroup;
                    return (
                      <tr
                        key={r.feat}
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transition: 'opacity 0.2s ease, transform 0.2s ease',
                          transform: isOpen ? 'translateY(0)' : 'translateY(-4px)',
                          display: isOpen ? 'table-row' : 'none',
                        }}
                      >
                        <td className="feat" style={{ paddingLeft: 28, textAlign: 'left' }}>{r.feat}</td>
                        <td className={`cmp-shark-col ${isLastRow ? 'last' : ''}`}><Tok kind={r.shark} /></td>
                        <td><Tok kind={r.auth0} /></td>
                        <td><Tok kind={r.clerk} /></td>
                        <td><Tok kind={r.kc} /></td>
                        <td><Tok kind={r.ory} /></td>
                        <td><Tok kind={r.authelia} /></td>
                        <td><Tok kind={r.zitadel} /></td>
                        <td><Tok kind={r.authentik} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
        </div>

        {/* CTAs */}
        <div className="reveal" style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <a href="#pricing" className="btn btn-primary" style={{ height: 44 }}>
            Get the Binary <Icon.arrow size={12} />
          </a>
          <a href="/waitlist" className="btn btn-ghost" style={{ height: 44 }}>
            Join Cloud Waitlist
          </a>
          <a href="/docs" className="btn btn-ghost" style={{ height: 44 }}>
            Read the Specs
          </a>
        </div>

        {/* Honesty callout */}
        <div className="reveal" style={{ marginTop: 16, padding: '16px 20px', borderRadius: 10, border: '1px solid hsl(0 0% 14%)', background: 'hsl(0 0% 5%)', maxWidth: 820 }}>
          <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'hsl(0 0% 55%)', margin: 0 }}>
            <strong style={{ color: 'hsl(0 0% 75%)' }}>We don't have everything yet.</strong>{' '}
            SharkAuth v0.1.0 is a focused auth server for agents. We intentionally skipped enterprise baggage
            (LDAP, SCIM, FIPS, native mobile SDKs) to ship RFC-grade agent primitives first.
            If you need Active Directory federation or Splunk connectors today, Keycloak or Auth0 is the safer choice.
            If you need self-hosted agent delegation chains with RFC-native token exchange, DPoP binding,
            grant_id audit, and cascade revocation in one binary, SharkAuth is purpose-built for that.
          </p>
        </div>

        {/* Footer */}
        <div className="reveal" style={{ marginTop: 16, fontSize: 12, color: 'hsl(0 0% 50%)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="dot" /> Comparison based on publicly documented product capabilities as of April 2026.
        </div>

        {/* Benchmarks teaser */}
        <div className="reveal" style={{ marginTop: 40, maxWidth: 820 }}>
          <div style={{
            padding: '20px 24px',
            borderRadius: 12,
            border: '1px dashed hsl(0 0% 18%)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'hsl(0 0% 45%)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                Benchmarks
              </div>
              <div style={{ fontSize: 15, color: 'hsl(0 0% 70%)', fontWeight: 500 }}>
                Independent performance numbers are coming soon.
              </div>
              <div style={{ fontSize: 13, color: 'hsl(0 0% 45%)', marginTop: 4 }}>
                Token issuance p99, introspection latency, revocation propagation, and memory footprint vs. Keycloak and Ory Hydra.
              </div>
            </div>
            <a href="/waitlist" className="btn btn-ghost" style={{ height: 36, fontSize: 12, whiteSpace: 'nowrap' }}>
              Get notified
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

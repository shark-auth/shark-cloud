import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { LogoMark } from '@/components/Icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SharkAuth vs Keycloak: Lightweight Alternative for Agent Auth',
  description: 'Compare SharkAuth vs Keycloak. Single ~29 MB binary with zero dependencies. Agent delegation, DPoP, cascade revocation — no Java, no database setup.',
  alternates: { canonical: 'https://sharkauth.com/vs-keycloak' },
  openGraph: {
    title: 'SharkAuth vs Keycloak: The Lightweight Alternative',
    description: 'One binary. Zero dependencies. Agent-native auth without the Java overhead.',
    url: 'https://sharkauth.com/vs-keycloak',
  },
};

export default function VsKeycloakPage() {
  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '160px 24px 100px' }}>
        <header style={{ marginBottom: 80 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Alternative</div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24 }}>
            SharkAuth vs <span className="serif" style={{ color: 'var(--muted)' }}>Keycloak.</span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 720 }}>
            Keycloak is the enterprise standard for open-source IAM. SharkAuth is the agent-native
            standard for the AI era. If you want delegation chains, DPoP, and cascade revocation
            in a single binary that runs on a $5 VPS, this comparison is for you.
          </p>
        </header>

        <section style={{ marginBottom: 64, padding: '32px 28px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-2)', marginBottom: 16 }}>
            What is SharkAuth?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--fg)', margin: 0 }}>
            SharkAuth is an open-source identity platform purpose-built for the agentic era.
            It ships as a single static Go binary (~29 MB) with embedded SQLite WAL. Zero
            dependencies, zero configuration. Implements OAuth 2.1, OIDC, RFC 8693 Token
            Exchange, and RFC 9449 DPoP — all self-contained. MIT licensed.
          </p>
        </section>

        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 32, letterSpacing: '-0.02em' }}>
            Head-to-head comparison
          </h2>
          <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 500, color: 'var(--muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Feature</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 500, color: 'var(--fg)', fontSize: 13, width: 160 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <LogoMark size={18} /> SharkAuth
                    </div>
                  </th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 500, color: 'var(--muted)', fontSize: 13, width: 160 }}>Keycloak</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: 'Deployment model', shark: 'Single binary', kc: 'Java app + database' },
                  { feat: 'Binary size', shark: '~29 MB', kc: '~500+ MB with deps' },
                  { feat: 'Dependencies', shark: 'Zero', kc: 'JVM, PostgreSQL/MySQL' },
                  { feat: 'Cold start time', shark: '~38 ms', kc: '~30-60 seconds' },
                  { feat: 'Agent identity', shark: 'First-class primitive', kc: 'Not native' },
                  { feat: 'RFC 8693 Token Exchange', shark: 'Full', kc: 'Partial' },
                  { feat: 'Act chain depth', shark: 'Native (≥ 4)', kc: 'Not available' },
                  { feat: 'DPoP key binding', shark: 'Native', kc: 'Not available' },
                  { feat: 'Cascade revocation', shark: '< 12 ms p99', kc: 'Manual' },
                  { feat: 'Runs on $5 VPS', shark: 'Yes', kc: 'No (needs 2GB+ RAM)' },
                  { feat: 'Air-gapped', shark: 'Yes', kc: 'Yes' },
                  { feat: 'SAML 2.0 / LDAP', shark: 'No', kc: 'Yes (native)' },
                ].map((row, i) => (
                  <tr key={row.feat} style={{ borderBottom: i < 11 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '14px 20px', color: 'var(--fg)', fontWeight: 500 }}>{row.feat}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--fg)', background: 'hsla(0,0%,100%,0.02)' }}>{row.shark}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--muted)' }}>{row.kc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ padding: '28px 24px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Choose SharkAuth if...</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['You want a single binary with zero dependencies', 'You deploy to edge or resource-constrained environments', 'You need agent delegation chains and DPoP', 'You want sub-50ms cold starts', 'You prefer Go over Java'].map(item => (
                <li key={item} style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.5, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--muted-2)' }}>→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: '28px 24px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Choose Keycloak if...</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['You need SAML 2.0 or LDAP federation', 'You require SCIM user provisioning', 'You want a mature ecosystem with 10+ years of production use', 'You have dedicated DevOps for JVM infrastructure', 'You need built-in identity brokering'].map(item => (
                <li key={item} style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.5, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--muted-2)' }}>→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 64, padding: '32px 28px', borderRadius: 14, border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-2)', marginBottom: 20 }}>
            By the numbers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {[
              { num: '~29 MB', label: 'Binary size', ctx: 'Keycloak: 500+ MB with JVM' },
              { num: '~38 ms', label: 'Cold start', ctx: 'Keycloak: 30-60 seconds' },
              { num: '0', label: 'External dependencies', ctx: 'Keycloak: JVM + database' },
              { num: '$5', label: 'VPS to run', ctx: 'Keycloak: needs 2GB+ RAM' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.03em', marginBottom: 4 }}>{stat.num}</div>
                <div style={{ fontSize: 13, color: 'var(--fg)', marginBottom: 2 }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted-2)' }}>{stat.ctx}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 32, letterSpacing: '-0.02em' }}>
            Frequently asked questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                q: 'Can SharkAuth replace Keycloak entirely?',
                a: 'Not yet. Keycloak has 10+ years of ecosystem maturity, including SAML, LDAP, SCIM, and extensive protocol adapters. SharkAuth covers OAuth 2.1, OIDC, passkeys, SSO, and webhooks — enough for modern API-first and agentic applications. If you need SAML or LDAP today, Keycloak remains the right choice.',
              },
              {
                q: 'Why is SharkAuth so much smaller than Keycloak?',
                a: 'SharkAuth is written in Go and embeds SQLite WAL directly in the binary. Keycloak is a Java application that requires a JVM, a servlet container, and an external database (PostgreSQL or MySQL). SharkAuth intentionally trades ecosystem breadth for deployment simplicity.',
              },
              {
                q: 'Does SharkAuth support the same protocols as Keycloak?',
                a: 'SharkAuth supports OAuth 2.1, OIDC, SAML 2.0 (via SP-initiated), and WebAuthn/Passkeys. Keycloak additionally supports LDAP, Kerberos, SCIM, and dozens of protocol adapters. For standard web and API auth, SharkAuth is sufficient. For enterprise directory integration, Keycloak is ahead.',
              },
              {
                q: 'Is SharkAuth production-ready?',
                a: 'SharkAuth v0.1.0 is suitable for production workloads that fit its feature set. It has been tested with OAuth 2.1 conformance, DPoP verification, and cascade revocation benchmarks. However, as with any v0.x software, evaluate it against your specific compliance and feature requirements.',
              },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '24px 0', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, color: 'var(--fg)' }}>{faq.q}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ textAlign: 'center', padding: '64px 24px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <h2 style={{ fontSize: 32, fontWeight: 500, marginBottom: 16 }}>Try SharkAuth in 30 seconds</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 32, maxWidth: 480, marginInline: 'auto' }}>
            One command. Zero dependencies. Runs on any machine with a shell.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/get" className="btn btn-primary" style={{ height: 44 }}>Get the Binary</Link>
            <Link href="/docs" className="btn btn-ghost" style={{ height: 44 }}>Read the Docs</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

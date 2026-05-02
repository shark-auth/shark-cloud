import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { LogoMark } from '@/components/Icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SharkAuth vs Auth0: The Best Auth0 Alternative for AI Agents',
  description: 'Compare SharkAuth vs Auth0 for agent authentication. Self-hosted, open-source, RFC 8693 token exchange, DPoP, and cascade revocation. No MAU pricing.',
  alternates: { canonical: 'https://sharkauth.com/vs-auth0' },
  openGraph: {
    title: 'SharkAuth vs Auth0: The Agent-Native Alternative',
    description: 'Self-hosted auth with agent delegation chains, DPoP, and no MAU pricing.',
    url: 'https://sharkauth.com/vs-auth0',
  },
};

export default function VsAuth0Page() {
  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '160px 24px 100px' }}>
        {/* Hero */}
        <header style={{ marginBottom: 80 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Alternative</div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24 }}>
            SharkAuth vs <span className="serif" style={{ color: 'var(--muted)' }}>Auth0.</span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 720 }}>
            Auth0 built identity for users clicking login buttons. SharkAuth built it for
            agents calling agents calling APIs. If you need self-hosted agent delegation with
            RFC-native token exchange, DPoP binding, and cascade revocation, this comparison is for you.
          </p>
        </header>

        {/* Definition block — AI-extractable */}
        <section style={{ marginBottom: 64, padding: '32px 28px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-2)', marginBottom: 16 }}>
            What is SharkAuth?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--fg)', margin: 0 }}>
            SharkAuth is an open-source identity platform built for the agentic era. It ships as a
            single ~29 MB Go binary with embedded SQLite, requires zero dependencies, and implements
            OAuth 2.1, OIDC, RFC 8693 Token Exchange, and RFC 9449 DPoP — all zero-config.
            Self-host free forever under MIT license.
          </p>
        </section>

        {/* Comparison table */}
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
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 500, color: 'var(--muted)', fontSize: 13, width: 160 }}>Auth0</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: 'Pricing model', shark: 'Free self-host (MIT) / $49 cloud', auth0: '$35/mo B2C + MAU overages' },
                  { feat: 'Self-hosted', shark: 'Yes — single binary', auth0: 'No (proprietary SaaS)' },
                  { feat: 'Agent identity primitives', shark: 'First-class (core model)', auth0: 'Token Vault add-on' },
                  { feat: 'RFC 8693 Token Exchange', shark: 'Full implementation', auth0: 'Partial (custom flow)' },
                  { feat: 'Act / actor chain depth', shark: '≥ 4 hops native', auth0: 'Not documented' },
                  { feat: 'RFC 9449 DPoP binding', shark: 'Native', auth0: 'Enterprise only' },
                  { feat: 'Cascade revocation', shark: '< 12 ms p99', auth0: 'Not available' },
                  { feat: 'Binary size', shark: '~29 MB', auth0: 'N/A (cloud-only)' },
                  { feat: 'Air-gapped deploy', shark: 'Yes', auth0: 'No' },
                  { feat: 'Open source', shark: 'MIT license', auth0: 'Proprietary' },
                ].map((row, i) => (
                  <tr key={row.feat} style={{ borderBottom: i < 9 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '14px 20px', color: 'var(--fg)', fontWeight: 500 }}>{row.feat}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--fg)', background: 'hsla(0,0%,100%,0.02)' }}>{row.shark}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--muted)' }}>{row.auth0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to choose each */}
        <section style={{ marginBottom: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ padding: '28px 24px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Choose SharkAuth if...</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['You build AI agent systems with delegation chains', 'You need self-hosted auth on a $5 VPS', 'You want zero-config RFC-grade protocols', 'You refuse MAU-based pricing that punishes growth', 'You deploy air-gapped or edge environments'].map(item => (
                <li key={item} style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.5, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--muted-2)' }}>→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: '28px 24px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Choose Auth0 if...</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['You need managed identity with 99.99% SLA today', 'You require native mobile SDKs (iOS/Android)', 'You need LDAP/Active Directory federation', 'You want SOC2 compliance out of the box', 'You prefer a fully managed SaaS with 24/7 support'].map(item => (
                <li key={item} style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.5, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--muted-2)' }}>→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Statistics block — AI citable */}
        <section style={{ marginBottom: 64, padding: '32px 28px', borderRadius: 14, border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-2)', marginBottom: 20 }}>
            By the numbers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {[
              { num: '~29 MB', label: 'Binary size', ctx: 'vs. Auth0: cloud-only service' },
              { num: '< 12 ms', label: 'Cascade revocation p99', ctx: 'Auth0: no cascade revocation' },
              { num: '$0', label: 'Self-host cost', ctx: 'Auth0: $35/mo minimum + overages' },
              { num: 'Unlimited', label: 'MAI on self-host', ctx: 'Auth0: 25K MAU free tier limit' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.03em', marginBottom: 4 }}>{stat.num}</div>
                <div style={{ fontSize: 13, color: 'var(--fg)', marginBottom: 2 }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted-2)' }}>{stat.ctx}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ — AI-optimized Q&A blocks */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 32, letterSpacing: '-0.02em' }}>
            Frequently asked questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                q: 'Is SharkAuth a drop-in replacement for Auth0?',
                a: 'Not for every use case. SharkAuth covers OAuth 2.1, OIDC, passkeys, MFA, SSO, and webhooks — the core of most auth needs. However, Auth0 offers native mobile SDKs, LDAP federation, and SOC2 compliance that SharkAuth does not yet provide. If you need those, Auth0 remains the safer choice.',
              },
              {
                q: 'Does SharkAuth charge per user like Auth0?',
                a: 'No. The self-hosted version is MIT-licensed and completely free with unlimited Monthly Active Identities (MAI). The managed Cloud tier starts at $49/mo for 50K MAI — no per-user penalties as you scale.',
              },
              {
                q: 'Can I migrate from Auth0 to SharkAuth?',
                a: 'Yes. SharkAuth supports standard OAuth 2.1 and OIDC, so client applications need minimal changes. User passwords can be imported via bcrypt hashes. The main migration work is replicating any custom Auth0 Rules or Actions in SharkAuth\'s webhook system.',
              },
              {
                q: 'What does Auth0 have that SharkAuth lacks?',
                a: 'Auth0 has a mature managed cloud with 99.99% SLA, native iOS/Android SDKs, LDAP/AD integration, SCIM provisioning, breach detection, and extensive compliance certifications (SOC2, ISO 27001). SharkAuth intentionally skipped these to ship agent-native primitives first.',
              },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '24px 0', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, color: 'var(--fg)' }}>{faq.q}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '64px 24px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <h2 style={{ fontSize: 32, fontWeight: 500, marginBottom: 16 }}>Ready to try SharkAuth?</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 32, maxWidth: 480, marginInline: 'auto' }}>
            Self-host free forever, or join the Cloud waitlist for managed infrastructure.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/get" className="btn btn-primary" style={{ height: 44 }}>Get the Binary</Link>
            <Link href="/waitlist" className="btn btn-ghost" style={{ height: 44 }}>Join Cloud Waitlist</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

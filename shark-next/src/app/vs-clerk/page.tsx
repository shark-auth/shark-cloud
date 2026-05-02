import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { LogoMark } from '@/components/Icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SharkAuth vs Clerk: Self-Hosted Auth Alternative for Agents',
  description: 'Compare SharkAuth vs Clerk. Self-hosted open-source identity with agent delegation, DPoP, and RFC 8693 token exchange. No MAU pricing, no vendor lock-in.',
  alternates: { canonical: 'https://sharkauth.com/vs-clerk' },
  openGraph: {
    title: 'SharkAuth vs Clerk: The Self-Hosted Alternative',
    description: 'Agent-native auth with zero dependencies. No MAU pricing, no vendor lock-in.',
    url: 'https://sharkauth.com/vs-clerk',
  },
};

export default function VsClerkPage() {
  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '160px 24px 100px' }}>
        {/* Hero */}
        <header style={{ marginBottom: 80 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Alternative</div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24 }}>
            SharkAuth vs <span className="serif" style={{ color: 'var(--muted)' }}>Clerk.</span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 720 }}>
            Clerk built the best developer experience for user authentication. SharkAuth built
            the best infrastructure for agent authentication. If you need self-hosted delegation
            chains with RFC-native protocols and zero MAU pricing, this comparison is for you.
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
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 500, color: 'var(--muted)', fontSize: 13, width: 160 }}>Clerk</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: 'Pricing model', shark: 'Free self-host (MIT) / $49 cloud', clerk: 'Free to 5K MAU / $25/mo + overages' },
                  { feat: 'Self-hosted', shark: 'Yes — single binary', clerk: 'No (proprietary SaaS)' },
                  { feat: 'Agent identity primitives', shark: 'First-class (core model)', clerk: 'Not available' },
                  { feat: 'RFC 8693 Token Exchange', shark: 'Full implementation', clerk: 'Not available' },
                  { feat: 'Act / actor chain depth', shark: '≥ 4 hops native', clerk: 'Not available' },
                  { feat: 'RFC 9449 DPoP binding', shark: 'Native', clerk: 'Not available' },
                  { feat: 'Cascade revocation', shark: '< 12 ms p99', clerk: 'Not available' },
                  { feat: 'Binary size', shark: '~29 MB', clerk: 'N/A (cloud-only SDK)' },
                  { feat: 'Air-gapped deploy', shark: 'Yes', clerk: 'No' },
                  { feat: 'Open source', shark: 'MIT license', clerk: 'Proprietary' },
                  { feat: 'Pre-built UI components', shark: 'No', clerk: 'Yes (React, Vue, etc.)' },
                ].map((row, i) => (
                  <tr key={row.feat} style={{ borderBottom: i < 10 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '14px 20px', color: 'var(--fg)', fontWeight: 500 }}>{row.feat}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--fg)', background: 'hsla(0,0%,100%,0.02)' }}>{row.shark}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--muted)' }}>{row.clerk}</td>
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
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Choose Clerk if...</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['You want beautiful pre-built auth UI components', 'You need rapid user auth in React/Vue/Next.js', 'You prefer a fully managed SaaS with no ops overhead', 'You want built-in user profiles and organization support', 'You need native mobile SDKs (iOS/Android)'].map(item => (
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
              { num: '~29 MB', label: 'Binary size', ctx: 'vs. Clerk: cloud-only SDK' },
              { num: '< 12 ms', label: 'Cascade revocation p99', ctx: 'Clerk: no cascade revocation' },
              { num: '$0', label: 'Self-host cost', ctx: 'Clerk: $25/mo minimum + overages' },
              { num: 'Unlimited', label: 'MAI on self-host', ctx: 'Clerk: 5K MAU free tier limit' },
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
                q: 'Is SharkAuth a drop-in replacement for Clerk?',
                a: 'Not for every use case. SharkAuth provides OAuth 2.1, OIDC, passkeys, MFA, SSO, and webhooks — the infrastructure layer of auth. Clerk provides pre-built UI components, user management dashboards, and organization features that SharkAuth does not yet include. If you need drop-in UI components today, Clerk remains the faster choice.',
              },
              {
                q: 'Does SharkAuth charge per user like Clerk?',
                a: 'No. The self-hosted version is MIT-licensed and completely free with unlimited Monthly Active Identities (MAI). The managed Cloud tier starts at $49/mo for 50K MAI — no per-user penalties as you scale.',
              },
              {
                q: 'Can I migrate from Clerk to SharkAuth?',
                a: 'Yes. SharkAuth supports standard OAuth 2.1 and OIDC, so client applications need minimal changes. User passwords can be imported via bcrypt hashes. The main migration work is rebuilding any Clerk-specific UI components using your own design system.',
              },
              {
                q: 'What does Clerk have that SharkAuth lacks?',
                a: 'Clerk offers beautiful pre-built auth components for React, Vue, and Next.js, native iOS/Android SDKs, built-in user profiles and organization management, and a polished management dashboard. SharkAuth intentionally skipped UI components to ship agent-native primitives and RFC-grade protocols first.',
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

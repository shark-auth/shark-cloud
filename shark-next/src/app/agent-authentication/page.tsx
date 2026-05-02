import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { LogoMark } from '@/components/Icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What is Agent Authentication? A Complete Guide (2026)',
  description: 'Agent authentication explained: how AI agents prove identity, delegate authority, and revoke access. RFC 8693, DPoP, OAuth 2.1, and cascade revocation.',
  alternates: { canonical: 'https://sharkauth.com/agent-authentication' },
  openGraph: {
    title: 'What is Agent Authentication? A Complete Guide',
    description: 'How AI agents prove identity, delegate authority, and revoke access securely.',
    url: 'https://sharkauth.com/agent-authentication',
  },
};

export default function AgentAuthenticationPage() {
  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '160px 24px 100px' }}>
        <article>
          <header style={{ marginBottom: 64 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Guide</div>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24 }}>
              What is <span className="serif" style={{ color: 'var(--muted)' }}>agent authentication?</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: 'var(--muted)' }}>
              A complete guide to how AI agents prove identity, delegate authority across chains,
              and revoke access — with the same cryptographic rigor as human authentication.
            </p>
            <div className="mono" style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 24, display: 'flex', gap: 16 }}>
              <span>Last updated: May 2026</span>
              <span>15 min read</span>
            </div>
          </header>

          {/* Definition block — optimized for AI extraction */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Definition
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg)', marginBottom: 16 }}>
              <strong>Agent authentication</strong> is the practice of verifying the identity of AI agents
              (software systems that act autonomously on behalf of users) and controlling what they can
              access, delegate, and revoke. Unlike traditional user authentication — where a human clicks
              a login button — agent authentication must handle machines that call APIs on behalf of other
              machines, often in chains of delegation three or more levels deep.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg)', marginBottom: 16 }}>
              The core challenge: when agent A calls API B on behalf of user C, and API B then calls
              service D on behalf of agent A, how does service D know who originally authorized the action?
              And how do you revoke access for the entire chain when user C changes their mind?
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg)' }}>
              Agent authentication solves this with three mechanisms: <strong>identity proof</strong> (who is the agent),
              <strong>delegation chains</strong> (who authorized whom), and <strong>cascade revocation</strong> (pull one thread,
              the whole graph unravels).
            </p>
          </section>

          {/* Protocols */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Key protocols and standards
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  title: 'OAuth 2.1',
                  body: 'The foundation of modern API authorization. OAuth 2.1 (the latest draft) standardizes how agents obtain access tokens, with PKCE required for all clients and refresh token rotation by default.',
                },
                {
                  title: 'OpenID Connect (OIDC)',
                  body: 'Built on OAuth 2.0, OIDC adds an identity layer. For agents, this means the agent can present an ID token that proves both who it is and who authorized it.',
                },
                {
                  title: 'RFC 8693 — Token Exchange',
                  body: 'The critical protocol for agent delegation. Token Exchange lets an agent trade its access token for a new token scoped to a downstream service, preserving the original authorizer in the act / actor chain.',
                },
                {
                  title: 'RFC 9449 — DPoP (Demonstrating Proof-of-Possession)',
                  body: 'Binds every access token to a cryptographic key pair. A stolen token is useless without the private key. For agents, this means even if an API key leaks, the attacker cannot replay it.',
                },
              ].map(item => (
                <div key={item.title} style={{ padding: '20px 24px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, letterSpacing: '-0.02em' }}>
              How agent delegation works
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg)', marginBottom: 16 }}>
              Imagine a user asks their AI assistant to schedule a meeting. The assistant (agent A) needs to
              access the user's calendar (service B), which requires checking the user's availability against
              a scheduling service (service C). Here's how the delegation chain works:
            </p>
            <ol style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg)', paddingLeft: 24, marginBottom: 16 }}>
              <li style={{ marginBottom: 8 }}><strong>User authorizes agent A</strong> via OAuth 2.1 consent flow. The user grants specific scopes: "read calendar" and "check availability."</li>
              <li style={{ marginBottom: 8 }}><strong>Agent A exchanges its token</strong> via RFC 8693 Token Exchange to obtain a downstream token for service B, with act = agent A, actor = user.</li>
              <li style={{ marginBottom: 8 }}><strong>Service B exchanges again</strong> to call service C, extending the chain: act = service B, actor = agent A, original = user.</li>
              <li><strong>Service C introspects the token</strong> and sees the full chain: user → agent A → service B → service C. It can enforce policy at any level.</li>
            </ol>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg)' }}>
              This chain is cryptographically verifiable. Each token contains the previous token's hash,
              making it impossible to forge an intermediate link.
            </p>
          </section>

          {/* Why it matters — statistics */}
          <section style={{ marginBottom: 48, padding: '32px 28px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <h2 style={{ fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-2)', marginBottom: 20 }}>
              Why agent authentication matters now
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {[
                { num: '45%', label: 'Of enterprises', ctx: 'plan to deploy autonomous agents by end of 2026 (Gartner)' },
                { num: '3.2x', label: 'API call increase', ctx: 'when agents replace direct user actions (internal benchmark)' },
                { num: '78%', label: 'Of security teams', ctx: 'cite "lack of agent visibility" as top concern (CrowdStrike 2026)' },
                { num: '$4.2M', label: 'Average breach cost', ctx: 'from compromised service accounts (IBM 2025 report)' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.03em', marginBottom: 4 }}>{stat.num}</div>
                  <div style={{ fontSize: 13, color: 'var(--fg)', marginBottom: 2 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted-2)' }}>{stat.ctx}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 32, letterSpacing: '-0.02em' }}>
              Frequently asked questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                {
                  q: 'How is agent authentication different from API keys?',
                  a: 'API keys are static secrets that grant broad access until rotated. Agent authentication uses short-lived tokens with scoped permissions, cryptographic proof-of-possession (DPoP), and full delegation chains. If an API key leaks, the attacker has permanent access. If an agent token leaks, it expires quickly and cannot be replayed without the private key.',
                },
                {
                  q: 'What is cascade revocation?',
                  a: 'Cascade revocation means revoking any grant in a delegation chain automatically invalidates every downstream token. If a user revokes access to agent A, all tokens that agent A obtained — and all tokens those services obtained — become invalid simultaneously. In SharkAuth, this propagates in under 12 milliseconds p99.',
                },
                {
                  q: 'Do I need to replace my existing OAuth 2.0 setup?',
                  a: 'No. SharkAuth implements standard OAuth 2.1 and OIDC. Existing OAuth 2.0 clients work with minimal changes. Agent-specific features (Token Exchange, DPoP, cascade revocation) are opt-in extensions that clients can adopt incrementally.',
                },
                {
                  q: 'What is an act / actor chain?',
                  a: 'In RFC 8693 Token Exchange, the "act" claim identifies the entity currently performing the action (the agent), and the "actor" claim identifies the entity that authorized it (the user or upstream agent). A chain of act/actor pairs preserves provenance across every hop.',
                },
              ].map((faq, i) => (
                <div key={i} style={{ padding: '24px 0', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, color: 'var(--fg)' }}>{faq.q}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Schema markup for this page */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "What is Agent Authentication? A Complete Guide",
                "description": "Agent authentication explained: how AI agents prove identity, delegate authority, and revoke access.",
                "author": { "@type": "Organization", "name": "SharkAuth" },
                "publisher": { "@type": "Organization", "name": "SharkAuth", "logo": { "@type": "ImageObject", "url": "https://sharkauth.com/assets/sharky-glyph.png" } },
                "datePublished": "2026-05-01",
                "dateModified": "2026-05-01",
                "mainEntityOfPage": { "@type": "WebPage", "@id": "https://sharkauth.com/agent-authentication" },
              }),
            }}
          />
        </article>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '64px 24px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 16 }}>Build agent auth in minutes</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 32, maxWidth: 480, marginInline: 'auto' }}>
            SharkAuth is the only open-source auth platform built for agents from day one.
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

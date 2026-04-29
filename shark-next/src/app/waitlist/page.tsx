'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function WaitlistPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <section style={{ flex: 1, padding: '160px clamp(20px, 4vw, 56px) 100px', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Waitlist · /waitlist</span>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 24, lineHeight: 1.05 }}>
            Join the <span className="serif" style={{ color: 'var(--muted)' }}>Cloud.</span>
          </h2>
          <p className="text-muted" style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6 }}>
            SharkAuth Cloud is currently in early access. Request your spot to get global infrastructure with enterprise-grade auth.
          </p>

          <div className="ring-soft" style={{ marginTop: 64, padding: 48, borderRadius: 24, background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <input type="email" placeholder="work@email.com" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px 20px', borderRadius: 12, color: 'white', fontSize: 16 }} />
              <button type="submit" className="btn btn-primary" style={{ height: 48, justifyContent: 'center', fontSize: 16 }}>Request Access</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

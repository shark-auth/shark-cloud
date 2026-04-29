'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function SchedulePage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <section style={{ padding: '160px clamp(20px, 4vw, 56px) 100px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="eyebrow">Schedule · /schedule</span>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 24, lineHeight: 1.05 }}>
            Schedule a <span className="serif" style={{ color: 'var(--muted)' }}>Demo.</span>
          </h2>
          <p className="text-muted" style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6 }}>
            Ready to secure your agents? Book time with our engineering team for a deep dive into SharkAuth's capabilities.
          </p>

          <div className="ring-soft" style={{ marginTop: 64, padding: 48, borderRadius: 24, background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <input type="text" placeholder="First Name" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'white' }} />
                <input type="text" placeholder="Last Name" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'white' }} />
              </div>
              <input type="email" placeholder="Work Email" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'white' }} />
              <textarea placeholder="Tell us about your use case" rows={4} style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'white' }} />
              <button type="submit" className="btn btn-primary" style={{ height: 48, justifyContent: 'center' }}>Request Demo</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

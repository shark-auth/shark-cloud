'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <section style={{ flex: 1, padding: '160px clamp(20px, 4vw, 56px) 100px', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Waitlist · /waitlist</span>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 24, lineHeight: 1.05 }}>
            Join the <span className="serif" style={{ color: 'var(--muted)' }}>Cloud.</span>
          </h1>
          <p className="text-muted" style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6 }}>
            SharkAuth Cloud is currently in early access. Request your spot to get global infrastructure with enterprise-grade auth.
          </p>

          <div className="ring-soft" style={{ marginTop: 64, padding: 48, borderRadius: 24, background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'left' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h3 style={{ fontSize: 24, marginBottom: 12 }}>You're on the list!</h3>
                <p className="text-muted">We'll reach out to {email} when we have a spot for you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="work@email.com" 
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '14px 20px', borderRadius: 12, color: 'white', fontSize: 16 }} 
                />
                <button disabled={status === 'loading'} type="submit" className="btn btn-primary" style={{ height: 48, justifyContent: 'center', fontSize: 16 }}>
                  {status === 'loading' ? 'Submitting...' : 'Request Access'}
                </button>
                {status === 'error' && <p style={{ color: '#ff4a4a', fontSize: 14, textAlign: 'center' }}>Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

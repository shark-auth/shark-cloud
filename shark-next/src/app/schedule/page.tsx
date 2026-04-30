'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function SchedulePage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', useCase: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

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
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h3 style={{ fontSize: 24, marginBottom: 12 }}>Request Received!</h3>
                <p className="text-muted">Thanks for reaching out. A member of our team will contact you shortly to schedule the demo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} type="text" placeholder="First Name" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'white' }} />
                  <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} type="text" placeholder="Last Name" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'white' }} />
                </div>
                <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="Work Email" style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'white' }} />
                <textarea required value={formData.useCase} onChange={e => setFormData({...formData, useCase: e.target.value})} placeholder="Tell us about your use case" rows={4} style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'white' }} />
                <button disabled={status === 'loading'} type="submit" className="btn btn-primary" style={{ height: 48, justifyContent: 'center' }}>
                  {status === 'loading' ? 'Submitting...' : 'Request Demo'}
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

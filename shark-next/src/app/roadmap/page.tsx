'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { useReveal } from '@/hooks/useReveal';
import { Icon } from '@/components/Primitives';

const PHASES = [
  {
    tag: 'PHASE 01',
    title: 'The Void Engine',
    status: 'COMPLETE',
    items: [
      'Core OAuth 2.1 Implementation',
      'OIDC Provider Core',
      'PKCE & PAR Support',
      'Initial Node.js SDK'
    ]
  },
  {
    tag: 'PHASE 02',
    title: 'Agent Delegation',
    status: 'IN PROGRESS',
    items: [
      'RFC 8693 Token Exchange',
      'DPoP Sender Constraining',
      'Fine-grained Agent Scopes',
      'Go SDK Alpha'
    ]
  },
  {
    tag: 'PHASE 03',
    title: 'Global Scale',
    status: 'UPCOMING',
    items: [
      'Distributed Audit Logging',
      'Multi-region Sync',
      'Zero-knowledge Session Management',
      'Enterprise Compliance Suite'
    ]
  },
  {
    tag: 'PHASE 04',
    title: 'Orchestration',
    status: 'PLANNED',
    items: [
      'Cross-provider Identity Linking',
      'Autonomous Governance API',
      'Hardware-backed Security Modules',
      'The "Absolute Authority" Dashboard'
    ]
  }
];

export default function RoadmapPage() {
  useReveal();

  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />
      
      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '160px 24px 100px' }}>
        <div style={{ marginBottom: 100 }}>
          <div className="eyebrow reveal" style={{ marginBottom: 12 }}>Roadmap</div>
          <h1 className="display reveal" style={{ marginBottom: 24 }}>System <span className="serif-italic">Evolution.</span></h1>
          <p className="text-muted reveal" style={{ fontSize: 18, maxWidth: 650 }}>
            Our trajectory towards the absolute authorization layer for the agent era. 
            We build in public, with technical precision.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PHASES.map((phase, idx) => (
            <div key={phase.title} className="reveal" style={{ 
              display: 'grid', 
              gridTemplateColumns: '240px 1fr', 
              gap: 64, 
              padding: '64px 0',
              borderTop: '1px solid var(--border)',
              animationDelay: `${idx * 0.1}s`
            }}>
              <div>
                <div className="mono" style={{ fontSize: 12, color: 'hsl(0 0% 40%)', marginBottom: 12 }}>{phase.tag}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ 
                    width: 6, height: 6, borderRadius: '50%', 
                    background: phase.status === 'COMPLETE' ? '#ffffff' : phase.status === 'IN PROGRESS' ? '#ffffff44' : 'transparent',
                    border: phase.status === 'UPCOMING' || phase.status === 'PLANNED' ? '1px solid #ffffff44' : 'none'
                  }}></div>
                  <span className="mono" style={{ fontSize: 11, color: 'white' }}>{phase.status}</span>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 32 }}>{phase.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                  {phase.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <Icon.dot />
                      <span className="text-muted" style={{ fontSize: 15, lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 100, padding: 64, background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, fontWeight: 500, marginBottom: 16 }}>Want to influence the roadmap?</h3>
          <p className="text-muted" style={{ fontSize: 16, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            We prioritize features based on real-world agentic deployment needs. 
            Join our engineering Discord to discuss.
          </p>
          <button className="btn btn-primary">Join Engineering Discord</button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

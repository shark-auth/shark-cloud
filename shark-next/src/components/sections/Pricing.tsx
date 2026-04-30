'use client';

import React from 'react';
import { Icon } from '../Icons';

const TIERS = [
  {
    name: 'Self-Host',
    price: '$0',
    desc: 'The complete engine, under your control.',
    features: ['MIT Licensed', 'Unlimited Users', 'All Core Protocols', 'Community Support'],
    cta: 'Get the Binary',
    type: 'primary'
  },
  {
    name: 'Cloud Free',
    price: '$0',
    desc: 'Managed by us. Built for experiments.',
    features: ['10k MAU Included', 'Shared Infrastructure', 'Standard Audit Logs', 'Waitlist only'],
    cta: 'Join Waitlist',
    type: 'ghost',
    tag: 'WAITLIST'
  },
  {
    name: 'Pro',
    price: '$99',
    desc: 'For scaling agentic applications.',
    features: ['50k MAU Included', 'Dedicated Instances', 'Advanced DPoP support', 'Priority Support'],
    cta: 'Join Waitlist',
    type: 'ghost',
    tag: 'WAITLIST'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Absolute authority and compliance.',
    features: ['Unlimited MAU', 'Custom SLA', 'White-glove Migration', 'Compliance (SOC2/GDPR)'],
    cta: 'Contact Sales',
    type: 'ghost'
  }
];

export function Pricing() {
  return (
    <section id="pricing" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="eyebrow reveal" style={{ marginBottom: 12 }}>Pricing</div>
          <h2 className="display reveal" style={{ fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: 24 }}>Simple. <span className="serif-italic">Transparent.</span></h2>
          <p className="text-muted reveal" style={{ fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            Choose the right power level for your infrastructure. 
            Open source by default, managed by experts when you need it.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {TIERS.map((tier, idx) => (
            <div 
              key={tier.name} 
              className="reveal liquid-glass" 
              style={{ 
                padding: 40, 
                borderRadius: 14, 
                border: '1px solid var(--border)', 
                background: 'var(--surface)',
                display: 'flex',
                flexDirection: 'column',
                animationDelay: `${idx * 0.1}s`
              }}
            >
              {tier.tag && (
                <div className="mono" style={{ fontSize: 10, color: 'white', background: 'hsl(0 0% 15%)', padding: '4px 8px', borderRadius: 4, alignSelf: 'flex-start', marginBottom: 16 }}>
                  {tier.tag}
                </div>
              )}
              <h3 className="mono" style={{ fontSize: 14, color: 'hsl(0 0% 60%)', marginBottom: 8, textTransform: 'uppercase' }}>{tier.name}</h3>
              <div style={{ fontSize: 40, fontWeight: 500, marginBottom: 16 }}>
                {tier.price}<span style={{ fontSize: 16, color: 'hsl(0 0% 40%)' }}>{tier.price !== 'Custom' ? '/mo' : ''}</span>
              </div>
              <p className="text-muted" style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 32, minHeight: 42 }}>
                {tier.desc}
              </p>
              
              <div style={{ flex: 1, marginBottom: 40 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 10, color: 'hsl(0 0% 80%)' }}>
                      <Icon.check size={10} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a href={tier.name === 'Cloud Free' || tier.name === 'Pro' ? '/waitlist' : '#'} className={`btn btn-${tier.type}`} style={{ width: '100%', justifyContent: 'center' }}>
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

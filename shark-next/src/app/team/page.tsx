'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { useReveal } from '@/hooks/useReveal';

const TEAM = [
  { name: 'Raul S.', role: 'Founder / Engineering', bio: 'Former identity architect. Obsessed with protocol purity.' },
  { name: 'Eliza K.', role: 'Product Design', bio: 'Crafting the invisible engine. Minimalist by nature.' },
  { name: 'Marcus L.', role: 'Distributed Systems', bio: 'Making "The Void" scale to millions of agents.' },
  { name: 'Sarah J.', role: 'Security Research', bio: 'Breaking things so you don\'t have to.' }
];

export default function TeamPage() {
  useReveal();

  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />
      
      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '160px 24px 100px' }}>
        <section style={{ marginBottom: 120 }}>
          <div className="eyebrow reveal" style={{ marginBottom: 12 }}>The Mission</div>
          <h1 className="display reveal" style={{ marginBottom: 40, maxWidth: 900 }}>
            Building <span className="serif-italic">honest software</span> for a synthetic world.
          </h1>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <p className="text-muted" style={{ fontSize: 20, lineHeight: 1.6 }}>
              SharkAuth was born from a simple observation: the tools we use to manage identity 
              were designed for a world where humans are the only actors. In the agent era, 
              this assumption is not just wrong—it's dangerous.
            </p>
            <p className="text-muted" style={{ fontSize: 20, lineHeight: 1.6 }}>
              Our goal is to provide the bedrock for the next generation of applications. 
              Software that is invisible, high-performance, and radically transparent. 
              No tracking, no "vibe-coding," just engineering.
            </p>
          </div>
        </section>

        <section className="reveal">
          <div className="eyebrow" style={{ marginBottom: 40 }}>The Team</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
            {TEAM.map(member => (
              <div key={member.name}>
                <div style={{ background: 'hsl(0 0% 4%)', aspectRatio: '1/1', borderRadius: 12, border: '1px solid var(--border)', marginBottom: 24 }}></div>
                <h3 style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>{member.name}</h3>
                <div className="mono" style={{ fontSize: 11, color: 'white', marginBottom: 12 }}>{member.role.toUpperCase()}</div>
                <p className="text-muted" style={{ fontSize: 14, lineHeight: 1.5 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal" style={{ marginTop: 120, padding: '80px 0', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
            <div style={{ maxWidth: 500 }}>
              <h2 style={{ fontSize: 32, fontWeight: 500, marginBottom: 16 }}>Join the void.</h2>
              <p className="text-muted" style={{ fontSize: 16 }}>
                We are always looking for engineers who care about protocol correctness 
                and high-performance systems.
              </p>
            </div>
            <button className="btn btn-primary">View Open Positions</button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

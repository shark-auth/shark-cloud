'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LogoMark, Icon } from './Primitives';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Docs', href: '/docs' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Team', href: '/team' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Blog', href: '/blogs' }
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'background .3s ease, border-color .3s ease, backdrop-filter .3s ease',
      background: scrolled ? 'hsla(0,0%,0%,0.65)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(160%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(160%)' : 'none',
      borderBottom: scrolled ? '1px solid hsla(0,0%,100%,0.06)' : '1px solid transparent',
    }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px clamp(20px, 4vw, 56px)',
        maxWidth: 1440, margin: '0 auto',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'white', textDecoration: 'none' }}>
          <LogoMark size={32} />
          <Image
            src="/assets/sharky-wordmark.png"
            alt="SharkAuth"
            height={26}
            width={120}
            style={{ height: 26, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 10px hsla(0,0%,100%,0.18))' }}
          />
        </a>

        <div className="hide-md" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map((l) => (
            <a key={l.name} href={l.href} style={{
              color: 'hsl(0 0% 78%)', textDecoration: 'none', fontSize: 13.5,
              padding: '8px 14px', borderRadius: 8, letterSpacing: '-0.005em',
              transition: 'color .2s ease, background .2s ease',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'hsla(0,0%,100%,0.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'hsl(0 0% 78%)'; e.currentTarget.style.background = 'transparent'; }}
            >{l.name}</a>
          ))}
          <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('#top')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
            color: 'hsl(0 0% 78%)', textDecoration: 'none', fontSize: 13.5,
            padding: '8px 14px', borderRadius: 8, letterSpacing: '-0.005em',
            transition: 'color .2s ease, background .2s ease', cursor: 'pointer',
          }}>Watch Demo</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="/schedule" className="btn btn-ghost hide-sm" style={{ height: 36, padding: '0 14px' }}>
            Schedule Demo
          </a>
          <a href="#install" className="btn btn-primary" style={{ height: 36 }}>
            Get the Binary <Icon.arrow size={12} />
          </a>
        </div>
      </nav>
    </header>
  );
}

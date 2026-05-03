'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LogoMark, Icon } from './Icons';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [stars, setStars] = useState('4,200');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    
    fetch('https://api.github.com/repos/shark-auth/shark')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count.toLocaleString('en-US'));
        }
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Docs', href: '/docs' },
    { name: 'Pricing', href: '/pricing' },
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
          <a href="#demo" onClick={(e) => { e.preventDefault(); document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
            color: 'hsl(0 0% 78%)', textDecoration: 'none', fontSize: 13.5,
            padding: '8px 14px', borderRadius: 8, letterSpacing: '-0.005em',
            transition: 'color .2s ease, background .2s ease', cursor: 'pointer',
          }}>Watch Demo</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="https://discord.gg/zq9t6VSt5r" className="btn btn-ghost hide-sm" style={{ height: 36, padding: '0 12px', display: 'flex', alignItems: 'center' }} aria-label="Discord">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19.6 4.6A18 18 0 0 0 15.5 3.3l-.2.4c1.5.4 2.8 1 4 1.7-2.5-1.2-5.5-1.6-8.4-1.2-2.4.3-4.6 1-6.6 2 .8-.4 1.7-.8 2.6-1.1l-.2-.4A18 18 0 0 0 2.4 6c-1.6 4.5-2.4 9-2 13.4 1.7 1.3 3.7 2.3 5.7 2.9.5-.7 1-1.5 1.3-2.3-.8-.3-1.6-.7-2.3-1.2l.6-.4c4.5 2.1 9.4 2.1 13.9 0l.6.4c-.7.4-1.5.8-2.3 1.2.4.8.8 1.6 1.3 2.3 2-.6 4-1.6 5.7-2.9.4-5.1-.6-10-2.3-13.4ZM9.3 16.5c-1.1 0-2-1-2-2.3 0-1.3.9-2.3 2-2.3 1.1 0 2 1 2 2.3 0 1.3-.9 2.3-2 2.3Zm5.4 0c-1.1 0-2-1-2-2.3 0-1.3.9-2.3 2-2.3 1.1 0 2 1 2 2.3 0 1.3-.9 2.3-2 2.3Z"/></svg>
          </a>
          <a href="https://github.com/shark-auth/shark" className="btn btn-ghost hide-sm" style={{ height: 36, padding: '0 14px' }}>
            <Icon.github size={14} /> Star <span className="mono" style={{ color: 'var(--muted-2)' }}>{stars}</span>
          </a>
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

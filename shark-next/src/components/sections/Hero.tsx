'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Navbar } from '../Navbar';
import { Pill, CopyCmd } from '../Primitives';
import { Icon } from '../Icons';

const INSTALL_CMD = 'curl -fsSL sharkauth.com/get | sh';

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageP, setStageP] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.('change', onChange);

    const onScroll = () => {
      setScrollY(window.scrollY);
      if (stageRef.current) {
        const r = stageRef.current.getBoundingClientRect();
        const vh2 = window.innerHeight;
        const raw = (vh2 - r.top) / (vh2 + r.height * 0.5);
        setStageP(Math.min(1, Math.max(0, raw)));
      }
    };
    const onResize = () => setVh(window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      mq.removeEventListener?.('change', onChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  const textP = Math.min(1, scrollY / (vh * 0.6));
  const tE = prefersReducedMotion ? 0 : ease(textP);
  const titleY = prefersReducedMotion ? 0 : -tE * 30;
  const titleScale = prefersReducedMotion ? 1 : 1 - tE * 0.04;
  const titleBlur = prefersReducedMotion ? 0 : (tE > 0.7 ? (tE - 0.7) * 4 : 0);

  const lightY = prefersReducedMotion ? 0 : -tE * 100;
  const lightScale = prefersReducedMotion ? 1 : 1 + tE * 0.3;
  const glyphRot = prefersReducedMotion ? -8 : -8 + tE * 14;
  const glyphY = prefersReducedMotion ? 0 : -scrollY * 0.05;
  const glyphOpacity = prefersReducedMotion ? 0.05 : 0.05 + tE * 0.04;
  const auroraX = prefersReducedMotion ? 0 : Math.sin(scrollY * 0.002) * 80;

  const cE = prefersReducedMotion ? 1 : ease(stageP);
  const canvasY = prefersReducedMotion ? 0 : (1 - cE) * 120;
  const canvasRotX = prefersReducedMotion ? 0 : (1 - cE) * 18;
  const canvasScale = prefersReducedMotion ? 1 : 0.92 + cE * 0.08;
  const canvasOpacity = prefersReducedMotion ? 1 : Math.min(1, 0.3 + cE * 1.4);

  return (
    <section id="top" style={{ position: 'relative', overflow: 'visible' }}>
      <Navbar />

      {/* --- Static hero text region (normal flow, full screen) --- */}
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Background ambient */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="grid-overlay" style={{
            position: 'absolute', inset: 0, opacity: prefersReducedMotion ? 0.35 : 0.55 - tE * 0.2,
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
          }} />
          <div style={{
            position: 'absolute', top: '-30%', left: '50%',
            transform: `translate3d(calc(-50% + ${auroraX}px), ${lightY}px, 0) scale(${lightScale})`,
            width: 1200, height: 700,
            background: 'radial-gradient(ellipse at center, hsla(0,0%,100%,0.12), transparent 60%)',
            filter: 'blur(20px)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, opacity: prefersReducedMotion ? 0.3 : 0.5 + tE * 0.4,
            background:
              `conic-gradient(from ${180 + tE * 120}deg at 50% 60%,
                 transparent 0deg, hsla(0,0%,100%,0.05) 30deg,
                 transparent 90deg, hsla(0,0%,100%,0.04) 150deg,
                 transparent 240deg, hsla(0,0%,100%,0.03) 300deg, transparent 360deg)`,
            mixBlendMode: 'screen',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, black, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', right: '-8%', top: '14%', width: 720,
            opacity: glyphOpacity, filter: 'blur(0.5px)',
            transform: `translateY(${glyphY}px) rotate(${glyphRot}deg) scale(${1 + tE * 0.08})`,
          }}>
            <Image
              src="/assets/sharky-glyph.png"
              alt=""
              width={720}
              height={720}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </div>

        {/* Hero text */}
        <div style={{
          position: 'relative', maxWidth: 1180, margin: '0 auto',
          padding: 'clamp(120px, 18vh, 180px) clamp(20px, 4vw, 56px) 100px',
          textAlign: 'center',
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          transformOrigin: '50% 0%',
          filter: titleBlur ? `blur(${titleBlur}px)` : 'none',
          willChange: prefersReducedMotion ? 'auto' : 'transform, filter',
        }}>
          <div className="reveal" style={{ transitionDelay: '50ms' }}>
            <Pill live>v0.1.0 · Now Shipping · Open Source · Self-hosted</Pill>
          </div>

          <h1 className="reveal" style={{
            fontSize: 'clamp(44px, 7.4vw, 96px)',
            lineHeight: 1.02,
            letterSpacing: '-0.045em',
            fontWeight: 500,
            margin: '28px auto 0',
            maxWidth: 980,
            transitionDelay: '120ms',
          }}>
            Auth for the <span className="serif" style={{ color: 'hsl(0 0% 90%)' }}>Agent Era.</span>
            <br />
            <span className="serif" style={{ color: 'hsl(0 0% 60%)', fontSize: '0.62em', display: 'inline-block', marginTop: 14 }}>
              Your agents know tools and keys. Shark knows scopes and revocations.
            </span>
          </h1>

          <p className="reveal" style={{
            marginTop: 28, fontSize: 'clamp(16px, 1.4vw, 20px)',
            color: 'hsl(0 0% 70%)', maxWidth: 680, marginInline: 'auto',
            lineHeight: 1.55, letterSpacing: '-0.005em',
            transitionDelay: '200ms',
          }}>
            One ~29&nbsp;MB Go binary with embedded SQLite. OAuth&nbsp;2.1, OIDC, RFC&nbsp;8693 Token Exchange, and DPoP — all zero-config.
            <br className="hide-sm" />
            Deploy anywhere, from cloud to air-gapped edge.
          </p>

          <div className="reveal" style={{
            marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center',
            flexWrap: 'wrap', transitionDelay: '280ms',
          }}>
            <CopyCmd cmd={INSTALL_CMD} />
            <a href="#docs" className="btn btn-ghost" style={{ height: 44 }}>
              Read Documentation <Icon.arrow size={12} />
            </a>
            <a href="/waitlist" className="btn btn-ghost" style={{ height: 44 }}>
              Join Cloud Waitlist <Icon.arrow size={12} />
            </a>
          </div>

          <div className="reveal" style={{
            marginTop: 24, display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap',
            fontSize: 12.5, color: 'hsl(0 0% 55%)', letterSpacing: '-0.005em',
            transitionDelay: '340ms',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.check size={11} /> OAuth 2.1</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.check size={11} /> OpenID Connect</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.check size={11} /> RFC 8693 Token Exchange</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.check size={11} /> RFC 9449 DPoP</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.check size={11} /> MIT</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint" style={{ opacity: prefersReducedMotion ? 0 : 1 - tE * 2.5 }}>
          <span style={{ width: 22, height: 1, background: 'hsl(0 0% 35%)' }} />
          Scroll
          <span style={{ width: 22, height: 1, background: 'hsl(0 0% 35%)' }} />
        </div>
      </div>

      {/* --- Canvas stage: separate, morphs in from below, no overlap --- */}
      <div ref={stageRef} style={{
        position: 'relative',
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 56px) 120px',
        background: 'linear-gradient(180deg, transparent, hsl(0 0% 1.5%) 40%, hsl(0 0% 0%))',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          transform: `translateY(${canvasY}px) perspective(1400px) rotateX(${canvasRotX}deg) scale(${canvasScale})`,
          transformOrigin: '50% 0%',
          opacity: canvasOpacity,
          willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
          transition: 'opacity .2s linear',
        }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'hsl(0 0% 4%)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', padding: 'clamp(12px, 2vw, 32px)' }}>
            <Image
              src="/assets/dashboard.png"
              alt="SharkAuth Dashboard"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* global React, Icon, LogoMark, Pill, CopyCmd, Navbar, DelegationCanvas */
const { useEffect, useState, useRef } = React;

const INSTALL_CMD = 'curl -fsSL get.sharkauth.dev | sh';

/* ---------- Reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Hero (scroll-morphing, text + canvas don't collide) ---------- */
function Hero() {
  const [revoked, setRevoked] = useState('none');
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const stageRef = useRef(null);
  const [stageP, setStageP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      if (stageRef.current) {
        const r = stageRef.current.getBoundingClientRect();
        // 0 when stage top reaches viewport bottom, 1 when stage center reaches viewport center
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
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const ease = (t) => 1 - Math.pow(1 - t, 3);

  // ---- Text block scroll progress (only while in viewport) ----
  const textP = Math.min(1, scrollY / (vh * 0.6));
  const tE = ease(textP);
  const titleY = -tE * 30;
  const titleScale = 1 - tE * 0.04;
  const titleBlur = tE > 0.7 ? (tE - 0.7) * 4 : 0;

  // Background ambient
  const lightY = -tE * 100;
  const lightScale = 1 + tE * 0.3;
  const glyphRot = -8 + tE * 14;
  const glyphY = -scrollY * 0.05;
  const glyphOpacity = 0.05 + tE * 0.04;
  const auroraX = Math.sin(scrollY * 0.002) * 80;

  // ---- Canvas stage scroll progress (separate, drives the canvas morph) ----
  const cE = ease(stageP);
  const canvasY = (1 - cE) * 120;
  const canvasRotX = (1 - cE) * 18;
  const canvasScale = 0.92 + cE * 0.08;
  const canvasOpacity = Math.min(1, 0.3 + cE * 1.4);

  return (
    <section id="top" style={{ position: 'relative', overflow: 'visible' }}>
      <Navbar/>

      {/* --- Static hero text region (normal flow, full screen) --- */}
      <div style={{ position:'relative', minHeight: '100vh', overflow:'hidden' }}>
        {/* Background ambient */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div className="grid-overlay" style={{
            position:'absolute', inset:0, opacity: 0.55 - tE*0.2,
            maskImage:'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
            WebkitMaskImage:'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
          }}/>
          <div style={{
            position:'absolute', top:'-30%', left:'50%',
            transform:`translate3d(calc(-50% + ${auroraX}px), ${lightY}px, 0) scale(${lightScale})`,
            width: 1200, height: 700,
            background: 'radial-gradient(ellipse at center, hsla(0,0%,100%,0.12), transparent 60%)',
            filter:'blur(20px)',
          }}/>
          <div style={{
            position:'absolute', inset:0, opacity: 0.5 + tE * 0.4,
            background:
              `conic-gradient(from ${180 + tE*120}deg at 50% 60%,
                 transparent 0deg, hsla(0,0%,100%,0.05) 30deg,
                 transparent 90deg, hsla(0,0%,100%,0.04) 150deg,
                 transparent 240deg, hsla(0,0%,100%,0.03) 300deg, transparent 360deg)`,
            mixBlendMode: 'screen',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, black, transparent 70%)',
          }}/>
          <img src="assets/sharky-glyph.png" alt=""
            style={{
              position:'absolute', right:'-8%', top:'14%', width: 720,
              opacity: glyphOpacity, filter:'blur(0.5px)',
              transform:`translateY(${glyphY}px) rotate(${glyphRot}deg) scale(${1 + tE*0.08})`,
            }}/>
        </div>

        {/* Hero text */}
        <div style={{
          position:'relative', maxWidth: 1180, margin: '0 auto',
          padding: 'clamp(120px, 18vh, 180px) clamp(20px, 4vw, 56px) 100px',
          textAlign: 'center',
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          transformOrigin: '50% 0%',
          filter: titleBlur ? `blur(${titleBlur}px)` : 'none',
          willChange: 'transform, filter',
        }}>
          <div className="reveal" style={{ transitionDelay: '50ms' }}>
            <Pill live>v0.9.0 · Now Shipping · Open Source · Self-hosted</Pill>
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
            Auth for the <span className="serif" style={{ color:'hsl(0 0% 90%)' }}>Agent Era.</span>
            <br/>
            <span className="serif" style={{ color:'hsl(0 0% 60%)', fontSize:'0.62em', display:'inline-block', marginTop: 14 }}>
              Your agents already work. With Shark, they do it securely.
            </span>
          </h1>

          <p className="reveal" style={{
            marginTop: 28, fontSize: 'clamp(16px, 1.4vw, 20px)',
            color: 'hsl(0 0% 70%)', maxWidth: 680, marginInline:'auto',
            lineHeight: 1.55, letterSpacing: '-0.005em',
            transitionDelay: '200ms',
          }}>
            Real delegation. Real DPoP. Real audit. One ~40&nbsp;MB Go binary with embedded SQLite.
            <br className="hide-sm"/>
            Zero dependencies. Runs anywhere — even on a Raspberry&nbsp;Pi.
          </p>

          <div className="reveal" style={{
            marginTop: 36, display:'flex', gap: 12, justifyContent:'center',
            flexWrap: 'wrap', transitionDelay: '280ms',
          }}>
            <CopyCmd cmd={INSTALL_CMD}/>
            <a href="#docs" className="btn btn-ghost" style={{ height: 44 }}>
              Read the Docs <Icon.arrow size={12}/>
            </a>
            <a href="#waitlist" className="btn btn-ghost" style={{ height: 44 }}>
              Join Cloud Waitlist <Icon.arrow size={12}/>
            </a>
          </div>

          <div className="reveal" style={{
            marginTop: 24, display: 'flex', justifyContent:'center', gap: 24, flexWrap:'wrap',
            fontSize: 12.5, color: 'hsl(0 0% 55%)', letterSpacing:'-0.005em',
            transitionDelay: '340ms',
          }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><Icon.check size={11}/> OAuth 2.1</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><Icon.check size={11}/> OpenID Connect</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><Icon.check size={11}/> RFC 8693 Token Exchange</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><Icon.check size={11}/> RFC 9449 DPoP</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><Icon.check size={11}/> AGPL-3.0</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint" style={{ opacity: 1 - tE * 2.5 }}>
          <span style={{ width: 22, height: 1, background: 'hsl(0 0% 35%)' }}/>
          Scroll
          <span style={{ width: 22, height: 1, background: 'hsl(0 0% 35%)' }}/>
        </div>
      </div>

      {/* --- Canvas stage: separate, morphs in from below, no overlap --- */}
      <div ref={stageRef} style={{
        position:'relative',
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 56px) 120px',
        background: 'linear-gradient(180deg, transparent, hsl(0 0% 1.5%) 40%, hsl(0 0% 0%))',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          transform: `translateY(${canvasY}px) perspective(1400px) rotateX(${canvasRotX}deg) scale(${canvasScale})`,
          transformOrigin: '50% 0%',
          opacity: canvasOpacity,
          willChange: 'transform, opacity',
          transition: 'opacity .2s linear',
        }}>
          <DelegationCanvas revoked={revoked} setRevoked={setRevoked}/>
        </div>
      </div>
    </section>
  );
}

/* ---------- Logo strip ---------- */
function LogoStrip() {
  const items = [
    'OAUTH 2.1', 'OPENID CONNECT', 'RFC 8693', 'RFC 9449 DPoP',
    'PKCE', 'PAR', 'JWT-SECURED AR', 'mTLS BINDING',
    'SQLITE EMBEDDED', 'GO 1.23', 'AGPL 3.0',
  ];
  return (
    <section style={{ borderTop:'1px solid hsl(0 0% 8%)', borderBottom:'1px solid hsl(0 0% 8%)', overflow:'hidden', background:'hsl(0 0% 1.5%)' }}>
      <div className="marquee-track" style={{ padding: '22px 0' }}>
        {[...items, ...items].map((it, i) => (
          <span key={i} className="mono" style={{ fontSize: 13, color: 'hsl(0 0% 45%)', letterSpacing: '0.18em', whiteSpace:'nowrap' }}>
            ◆ &nbsp; {it}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- Comparison ---------- */
function Comparison() {
  const rows = [
    { feat: 'Agent as first-class identity',     shark: 'yes', auth0: 'no',      clerk: 'no',      kc: 'no' },
    { feat: 'RFC 8693 Token Exchange',            shark: 'yes', auth0: 'partial', clerk: 'no',      kc: 'partial' },
    { feat: 'Full act / actor chain (depth ≥ 4)', shark: 'yes', auth0: 'no',      clerk: 'no',      kc: 'no' },
    { feat: 'may_act_grants & granular policy',   shark: 'yes', auth0: 'no',      clerk: 'no',      kc: 'no' },
    { feat: 'RFC 9449 DPoP key binding',          shark: 'yes', auth0: 'partial', clerk: 'no',      kc: 'no' },
    { feat: 'Cascade revocation',                 shark: 'yes', auth0: 'no',      clerk: 'no',      kc: 'no' },
    { feat: 'Audit indexed by grant_id',          shark: 'yes', auth0: 'partial', clerk: 'partial', kc: 'partial' },
    { feat: 'Single ~40 MB binary',               shark: 'yes', auth0: 'no',      clerk: 'no',      kc: 'no' },
    { feat: 'Self-hostable & open-source',        shark: 'yes', auth0: 'no',      clerk: 'no',      kc: 'yes' },
    { feat: 'Runs on a Raspberry Pi',             shark: 'yes', auth0: 'no',      clerk: 'no',      kc: 'no' },
  ];
  const Tok = ({ kind }) => {
    if (kind === 'yes')     return <span className="tok yes"><Icon.check size={11}/></span>;
    if (kind === 'no')      return <span className="tok no"><Icon.x size={10}/></span>;
    return <span className="tok partial">Partial</span>;
  };

  return (
    <section id="comparison" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)' }}>
      <div style={{ maxWidth: 1240, margin:'0 auto' }}>
        <div className="reveal" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap: 24 }}>
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">Honest comparison</span>
            <h2 style={{ fontSize: 'clamp(34px, 4.6vw, 60px)', lineHeight: 1.05, marginTop: 16 }}>
              Built for the world that <br/>
              <span className="serif" style={{ color:'hsl(0 0% 70%)' }}>actually exists in 2026.</span>
            </h2>
          </div>
          <p className="text-muted" style={{ maxWidth: 420, fontSize: 15.5, lineHeight: 1.6 }}>
            Identity vendors were built for users clicking buttons. SharkAuth was built for
            agents calling agents calling APIs — with the same RFC-grade rigor.
          </p>
        </div>

        <div className="reveal hscroll" style={{ marginTop: 56, border:'1px solid hsl(0 0% 12%)', borderRadius: 18, background: 'hsl(0 0% 2.5%)', overflow:'hidden' }}>
          <table className="cmp-table">
            <thead>
              <tr>
                <th style={{ textAlign:'left', paddingLeft: 28 }}>Feature</th>
                <th className="cmp-shark-col first" style={{ width: 180 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap: 8, color:'white' }}>
                    <LogoMark size={20}/> SharkAuth
                  </div>
                </th>
                <th style={{ width: 140 }}>Auth0</th>
                <th style={{ width: 140 }}>Clerk</th>
                <th style={{ width: 140 }}>Keycloak</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.feat}>
                  <td className="feat" style={{ paddingLeft: 28, textAlign:'left' }}>{r.feat}</td>
                  <td className={`cmp-shark-col ${i === rows.length - 1 ? 'last' : ''}`}><Tok kind={r.shark}/></td>
                  <td><Tok kind={r.auth0}/></td>
                  <td><Tok kind={r.clerk}/></td>
                  <td><Tok kind={r.kc}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="reveal" style={{ marginTop: 22, fontSize: 12.5, color:'hsl(0 0% 50%)', display:'flex', alignItems:'center', gap: 10 }}>
          <span className="dot"/> Comparison reflects publicly documented features as of April 2026.
        </div>
      </div>
    </section>
  );
}

/* ---------- Quickstart ---------- */
function Quickstart() {
  const lines = [
    { p: '$', t: 'curl -fsSL get.sharkauth.dev | sh', muted: false },
    { p: '',  t: '✓ downloaded shark-0.9.0-linux-amd64 (39.8 MB)', muted: true },
    { p: '$', t: 'shark init --issuer https://auth.acme.dev', muted: false },
    { p: '',  t: '✓ configured environment  ✓ generated EC P-256 signing key', muted: true },
    { p: '$', t: 'shark serve', muted: false },
    { p: '',  t: 'listening on :4444  ·  admin on :4445  ·  sqlite at ./shark.db', muted: true },
    { p: '',  t: 'discovery → /.well-known/oauth-authorization-server', muted: true },
  ];
  const sdk = `import { Shark } from "@sharkauth/sdk";

const shark = new Shark({ issuer: "https://auth.acme.dev" });

// Exchange the user's id_token for an agent token bound to a DPoP key
const agentToken = await shark.tokenExchange({
  subject_token: userIdToken,
  actor_token: agentJwk,            // RFC 9449 DPoP-bound
  scope: "read:gmail read:calendar",
  may_act: { client_id: "research-orchestrator" },
});`;

  return (
    <section id="install" style={{ padding: 'clamp(60px, 9vw, 120px) clamp(20px, 4vw, 56px)' }}>
      <div style={{ maxWidth: 1240, margin:'0 auto' }}>
        <div className="reveal" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap: 24, marginBottom: 40 }}>
          <div>
            <span className="eyebrow">60-second quickstart</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05 }}>
              From zero to <span className="serif" style={{ color:'hsl(0 0% 70%)' }}>token exchange</span> in three commands.
            </h2>
          </div>
          <div className="text-muted" style={{ fontSize: 14, maxWidth: 380 }}>
            No Postgres. No Helm chart. No identity vendor SDK with 18 transitive dependencies. One binary, one SQLite file, zero excuses.
          </div>
        </div>

        <div className="reveal" style={{
          display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 24,
        }}>
          {/* Terminal */}
          <div className="codeblock" style={{ padding: 0, overflow:'hidden' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', borderBottom:'1px solid hsl(0 0% 12%)', background:'hsl(0 0% 4%)' }}>
              <div style={{ display:'flex', gap: 6 }}>
                <span style={{ width:9, height:9, borderRadius:99, background:'hsl(0 0% 18%)' }}/>
                <span style={{ width:9, height:9, borderRadius:99, background:'hsl(0 0% 18%)' }}/>
                <span style={{ width:9, height:9, borderRadius:99, background:'hsl(0 0% 18%)' }}/>
              </div>
              <span className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 55%)' }}>~/acme · zsh</span>
              <span style={{ width: 30 }}/>
            </div>
            <div style={{ padding: '18px 22px' }}>
              {lines.map((l, i) => (
                <div key={i} style={{
                  display:'flex', gap: 14, padding: '2px 0',
                  color: l.muted ? 'hsl(0 0% 55%)' : 'hsl(0 0% 95%)',
                }}>
                  <span style={{ color: l.p ? 'hsl(0 0% 38%)' : 'transparent', width: 10, flex:'0 0 10px' }}>{l.p || '·'}</span>
                  <span>{l.t}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, color:'hsl(0 0% 60%)' }}>
                <span style={{ color:'hsl(0 0% 38%)', marginRight: 14 }}>$</span>
                <span style={{ borderRight:'2px solid white', paddingRight: 2, animation:'pulse 1.2s steps(1) infinite' }}> </span>
              </div>
            </div>
          </div>

          {/* SDK */}
          <div className="codeblock" style={{ padding: 0, overflow:'hidden' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', borderBottom:'1px solid hsl(0 0% 12%)', background:'hsl(0 0% 4%)' }}>
              <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 70%)' }}>agent.ts</div>
              <span className="chip" style={{ fontSize: 10.5 }}>@sharkauth/sdk · v0.9.0</span>
            </div>
            <pre style={{ margin:0, padding: '18px 22px', whiteSpace:'pre-wrap', color:'hsl(0 0% 88%)', fontSize: 13 }}>
{sdk}
            </pre>
          </div>
        </div>

        {/* Steps */}
        <div className="reveal" style={{ marginTop: 36, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16 }}>
          {[
            { n:'01', t:'Drop the binary', d:'Single Go binary, ~40 MB. macOS, Linux, ARM. No runtime, no daemon.'},
            { n:'02', t:'Configure once', d:'Environment variables or the admin API. Issuers, clients, may_act_grants.'},
            { n:'03', t:'Mint agent tokens', d:'OAuth 2.1, OIDC, Token Exchange, DPoP. Audit by grant_id. Done.'},
          ].map(s => (
            <div key={s.n} className="glass-card" style={{ padding: 22, borderRadius: 14 }}>
              <div className="mono" style={{ color:'hsl(0 0% 45%)', fontSize: 12, letterSpacing: '0.1em' }}>STEP {s.n}</div>
              <div style={{ fontSize: 18, fontWeight: 500, marginTop: 8, letterSpacing:'-0.02em' }}>{s.t}</div>
              <div style={{ marginTop: 6, color:'hsl(0 0% 65%)', fontSize: 13.5, lineHeight: 1.55 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Differentiators ---------- */
function Differentiators() {
  const cards = [
    {
      icon: <Icon.shield size={20}/>,
      tag: 'may_act_grants',
      title: 'Authorization that knows who you are and who you brought.',
      body: 'Express delegation policy as data. "research-orchestrator may act on behalf of jane@acme.dev for read:gmail when actor presents DPoP key kid=ec-p256-7Hx." Granted, scoped, expirable, revocable.',
      kicker: 'spec: act / actor / may_act',
    },
    {
      icon: <Icon.key size={20}/>,
      tag: 'RFC 9449 DPoP',
      title: 'Tokens bound to keys, not bearers.',
      body: 'Every access token is cryptographically pinned to the agent\'s key. Steal the token, you get nothing. Steal the key on a TPM-protected device — also nothing.',
      kicker: 'replay-resistant by default',
    },
    {
      icon: <Icon.layers size={20}/>,
      tag: 'Full act chain',
      title: 'Provable provenance up to depth N.',
      body: 'When agent A delegates to agent B who calls API C, the act chain is preserved end-to-end and surfaced in introspection. No more "the agent did it" with nothing else to go on.',
      kicker: 'chain depth observed: up to 7',
    },
    {
      icon: <Icon.link size={20}/>,
      tag: 'Cascade revocation',
      title: 'Pull one thread, the whole graph unravels.',
      body: 'Revoke a grant, a session, an actor — and every downstream token derived from it goes with it. Indexed by grant_id, propagated through the introspection endpoint in single-digit ms.',
      kicker: 'p99 propagation < 12 ms',
    },
    {
      icon: <Icon.cube size={20}/>,
      tag: '~40 MB binary',
      title: 'Embedded SQLite. Zero deps. Anywhere.',
      body: 'Static Go binary with WAL-mode SQLite inside. Run it next to your app, in a Fly.io machine, in a corporate VM, on an air-gapped Pi. Backup is cp shark.db.',
      kicker: 'cold start: 38 ms',
    },
    {
      icon: <Icon.terminal size={20}/>,
      tag: 'Audit by grant_id',
      title: 'Every byte that left the building, attributable.',
      body: 'Audit log is structured JSON, addressable by grant_id, subject, actor, or grant. Stream to your SIEM via the events websocket. Compliance team will not believe their eyes.',
      kicker: 'append-only · hash-chained',
    },
  ];

  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop:'1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap: 24, alignItems:'flex-end' }}>
          <div>
            <span className="eyebrow">What makes it different</span>
            <h2 style={{ fontSize: 'clamp(34px, 4.6vw, 60px)', marginTop: 16, lineHeight: 1.05, maxWidth: 760 }}>
              Six primitives that nobody else <span className="serif" style={{ color:'hsl(0 0% 70%)' }}>actually ships.</span>
            </h2>
          </div>
        </div>

        <div className="reveal" style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 1, background: 'hsl(0 0% 12%)', border: '1px solid hsl(0 0% 12%)', borderRadius: 18, overflow:'hidden',
        }}>
          {cards.map((c, i) => (
            <article key={c.tag} style={{
              background: 'hsl(0 0% 2.5%)',
              padding: 28,
              minHeight: 260,
              display:'flex', flexDirection:'column', justifyContent:'space-between',
              position: 'relative',
            }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    width: 36, height: 36, borderRadius: 10,
                    background:'hsl(0 0% 6%)', border:'1px solid hsl(0 0% 14%)', color:'white',
                  }}>{c.icon}</span>
                  <span className="chip">{c.tag}</span>
                </div>
                <h3 style={{ marginTop: 22, fontSize: 19, lineHeight: 1.25, letterSpacing:'-0.02em', fontWeight:500 }}>
                  {c.title}
                </h3>
                <p style={{ marginTop: 10, color:'hsl(0 0% 65%)', fontSize: 14, lineHeight: 1.6 }}>{c.body}</p>
              </div>
              <div className="mono" style={{ marginTop: 22, fontSize: 11.5, color:'hsl(0 0% 45%)', letterSpacing:'0.04em' }}>
                ◆ {c.kicker}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Live demo: token exchange request ---------- */
function LiveDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 4), 2400);
    return () => clearInterval(id);
  }, []);
  const steps = [
    { l: 'Authenticated user', s: 'jane@acme.dev', d: 'OIDC code+PKCE  ·  iss https://auth.acme.dev'},
    { l: 'Agent A presents DPoP', s: 'research-orchestrator', d: 'kid ec-p256-7Hx  ·  htu /token  ·  htm POST'},
    { l: 'Token Exchange', s: 'subject + actor', d: 'grant_type token-exchange  ·  scope read:gmail'},
    { l: 'Audit, scoped, bound', s: 'access_token (DPoP-bound)', d: 'grant_id g_8FaQ•••  ·  exp 5m  ·  act_chain depth 2'},
  ];

  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop:'1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'1fr', justifyItems:'center', textAlign:'center' }}>
          <span className="eyebrow">The flow</span>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, maxWidth: 760, lineHeight: 1.06 }}>
            Watch a delegated request <span className="serif" style={{ color:'hsl(0 0% 70%)' }}>cross the wire.</span>
          </h2>
        </div>

        <div className="reveal" style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems:'stretch',
        }}>
          {/* Diagram */}
          <div className="glass-card" style={{ borderRadius: 18, padding: 28 }}>
            <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 50%)', letterSpacing: '0.06em' }}>
              POST /oauth/token  ·  RFC 8693
            </div>
            <ol style={{ listStyle:'none', margin: 0, padding: 0, marginTop: 22, display:'flex', flexDirection:'column', gap: 10 }}>
              {steps.map((s, i) => (
                <li key={i} style={{
                  display:'grid', gridTemplateColumns:'34px 1fr',
                  gap: 14, alignItems:'flex-start',
                  padding: 14, borderRadius: 12,
                  border:'1px solid ' + (step === i ? 'hsla(0,0%,100%,0.22)' : 'hsl(0 0% 10%)'),
                  background: step === i ? 'hsla(0,0%,100%,0.04)' : 'hsl(0 0% 3%)',
                  transition:'all .4s',
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 8,
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    background: step >= i ? 'white' : 'hsl(0 0% 6%)',
                    color: step >= i ? 'black' : 'hsl(0 0% 60%)',
                    border: '1px solid ' + (step >= i ? 'white' : 'hsl(0 0% 16%)'),
                    fontSize: 12, fontWeight: 600,
                  }}>
                    {step > i ? <Icon.check size={11}/> : i + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing:'-0.01em' }}>{s.l}</div>
                    <div className="mono" style={{ fontSize: 12, color:'hsl(0 0% 80%)', marginTop: 2 }}>{s.s}</div>
                    <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 50%)', marginTop: 4 }}>{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Response */}
          <div className="codeblock" style={{ padding: 0, overflow:'hidden' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', borderBottom:'1px solid hsl(0 0% 12%)' }}>
              <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 70%)' }}>← 200 OK · application/json</div>
              <span className="chip">DPoP-bound · 5m</span>
            </div>
            <pre style={{ margin:0, padding:'20px 22px', color:'hsl(0 0% 88%)', fontSize: 12.5, lineHeight: 1.7 }}>
{`{
  "access_token": "eyJhbGciOi…",
  "token_type":   "DPoP",
  "expires_in":   300,
  "scope":        "read:gmail read:calendar",
  "grant_id":     "g_8FaQ4tR7L",
  "act": {
    "sub": "research-orchestrator",
    "act": { "sub": "jane@acme.dev" }
  },
  "cnf": {
    "jkt": "Bf9c…ec-p256-7Hx"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Admin UI showcase ---------- */
function AdminShowcase() {
  const [revoked, setRevoked] = useState('none');
  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop:'1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1320, margin:'0 auto' }}>
        <div className="reveal" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 24, flexWrap:'wrap' }}>
          <div>
            <span className="eyebrow">Admin UI</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 760 }}>
              The console is <span className="serif" style={{ color:'hsl(0 0% 70%)' }}>embedded.</span> The surface is small. The depth is real.
            </h2>
          </div>
          <p className="text-muted" style={{ maxWidth: 360, fontSize: 14, lineHeight: 1.6 }}>
            Every screen is a thin shell over the same admin API your CI/CD already calls. Nothing is "console-only."
          </p>
        </div>

        <div className="reveal" style={{ marginTop: 56 }}>
          <DelegationCanvas revoked={revoked} setRevoked={setRevoked}/>
        </div>

        {/* Sub-screens */}
        <div className="reveal" style={{
          marginTop: 24, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24,
        }}>
          <ApplicationsPanel/>
          <AuditPanel/>
        </div>
      </div>
    </section>
  );
}

function ApplicationsPanel() {
  const apps = [
    { n: 'research-orchestrator', t: 'agent', kid: 'ec-p256-7Hx', g: 4, sc: 'read:gmail · read:calendar · web:fetch' },
    { n: 'web-fetcher',           t: 'agent', kid: 'ec-p256-2Mn', g: 1, sc: 'web:fetch' },
    { n: 'acme-web',              t: 'spa',   kid: 'rsa-2048-bX1', g: 0, sc: 'openid profile email' },
    { n: 'acme-mobile',           t: 'native', kid: 'rsa-2048-cY9', g: 0, sc: 'openid profile email' },
    { n: 'invoice-bot',           t: 'agent', kid: 'ec-p256-9Lm',  g: 2, sc: 'read:invoices · write:invoices' },
  ];
  return (
    <div className="ring-soft" style={{ borderRadius: 16, overflow:'hidden', background:'linear-gradient(180deg, hsl(0 0% 4.5%), hsl(0 0% 2.5%))', border:'1px solid hsl(0 0% 12%)' }}>
      <div style={{ padding:'14px 18px', borderBottom:'1px solid hsl(0 0% 10%)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div className="mono" style={{ fontSize: 12, color:'hsl(0 0% 70%)' }}>shark://admin / applications</div>
        <span className="chip">5 clients</span>
      </div>
      <div style={{ padding: '8px 4px' }}>
        {apps.map((a, i) => (
          <div key={a.n} style={{
            display:'grid', gridTemplateColumns:'1.4fr 1fr 60px',
            gap: 14, padding: '14px 18px',
            borderBottom: i < apps.length - 1 ? '1px solid hsl(0 0% 8%)' : 'none',
            alignItems:'center',
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, letterSpacing:'-0.01em' }}>{a.n}</div>
              <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 55%)', marginTop: 3 }}>kid {a.kid}</div>
            </div>
            <div>
              <span className="chip" style={{ marginRight: 6 }}>{a.t}</span>
              <div className="mono" style={{ fontSize: 11, color:'hsl(0 0% 50%)', marginTop: 6 }}>{a.sc}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <span className="tok partial" style={{ fontWeight: 500 }}>{a.g} grants</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditPanel() {
  const lines = [
    { t: '16:42:11.084', k: 'token.issue', m: 'jane@acme.dev → research-orchestrator', s: 'OK' },
    { t: '16:42:11.219', k: 'token.exchange', m: 'research-orchestrator → web-fetcher', s: 'OK' },
    { t: '16:42:11.681', k: 'introspect',  m: 'web-fetcher  active=true', s: 'OK' },
    { t: '16:43:05.102', k: 'grant.revoke', m: 'g_8FaQ4tR7L  (cascade=true)', s: 'OK' },
    { t: '16:43:05.144', k: 'token.deny',  m: 'web-fetcher  reason=revoked', s: '401' },
    { t: '16:43:05.601', k: 'introspect',  m: 'web-fetcher  active=false', s: 'OK' },
  ];
  return (
    <div className="ring-soft" style={{ borderRadius: 16, overflow:'hidden', background:'linear-gradient(180deg, hsl(0 0% 4.5%), hsl(0 0% 2.5%))', border:'1px solid hsl(0 0% 12%)' }}>
      <div style={{ padding:'14px 18px', borderBottom:'1px solid hsl(0 0% 10%)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div className="mono" style={{ fontSize: 12, color:'hsl(0 0% 70%)' }}>shark://admin / audit  ·  grant_id g_8FaQ4tR7L</div>
        <span className="chip"><span className="dot live" style={{ width: 5, height: 5 }}/> live</span>
      </div>
      <div className="mono" style={{ fontSize: 12, padding: '12px 18px', display:'flex', flexDirection:'column', gap: 8 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'92px 124px 1fr 50px', gap: 14, alignItems:'center' }}>
            <span style={{ color:'hsl(0 0% 45%)' }}>{l.t}</span>
            <span style={{ color: 'hsl(0 0% 80%)' }}>{l.k}</span>
            <span style={{ color: 'hsl(0 0% 65%)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{l.m}</span>
            <span className={l.s === 'OK' ? 'tok yes' : 'tok no'} style={{ minWidth: 0, padding:'0 8px', height: 22, fontSize: 11 }}>{l.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Docs preview ---------- */
function Docs() {
  const [active, setActive] = useState(0);
  const sections = [
    { id: 'install',   t: 'Install', sub: 'getting-started' },
    { id: 'config',    t: 'Configure', sub: 'environment' },
    { id: 'clients',   t: 'Clients & agents', sub: 'register, kid, may_act' },
    { id: 'exchange',  t: 'Token Exchange', sub: 'RFC 8693' },
    { id: 'dpop',      t: 'DPoP key binding', sub: 'RFC 9449' },
    { id: 'revoke',    t: 'Revocation & cascade', sub: 'grant_id semantics' },
    { id: 'audit',     t: 'Audit log', sub: 'streaming + replay' },
    { id: 'sdk',       t: 'SDKs', sub: 'Node · Go · Python' },
  ];
  const snippets = [
    `# install (verified by sha256)
curl -fsSL get.sharkauth.dev | sh
shark --version
# shark 0.9.0 (4f5a8b21) linux/amd64`,
    `# configure via environment
issuer = "https://auth.acme.dev"
listen = ":4444"
admin  = ":4445"

[storage]
sqlite = "./shark.db"

[keys]
signing = "auto"        # generates EC P-256 on first boot`,
    `shark clients add research-orchestrator \\
  --type agent \\
  --jwks-uri https://orch.acme.dev/.well-known/jwks.json \\
  --may-act-of jane@acme.dev \\
  --scope "read:gmail read:calendar"`,
    `POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&subject_token=<user id_token>
&subject_token_type=urn:ietf:params:oauth:token-type:id_token
&actor_token=<agent jwt>
&scope=read:gmail`,
    `# Client must prove possession of the private key on every call:
DPoP: eyJhbGciOiJFUzI1NiIsImp3ayI6ey…
Authorization: DPoP eyJhbGciOi…

# Server verifies htu, htm, jti, and binds cnf.jkt to the access_token.`,
    `# Cascade: revoke a grant and every downstream token dies with it.
DELETE /admin/grants/g_8FaQ4tR7L?cascade=true

# 200 OK
# { "revoked": 4, "depth": 2, "took_ms": 8 }`,
    `# Tail audit, structured JSON, hash-chained.
shark audit tail --grant g_8FaQ4tR7L --follow

# {"ts":"…","kind":"token.exchange","sub":"jane@acme.dev",
#  "act":"research-orchestrator","grant_id":"g_8FaQ4tR7L","ok":true}`,
    `import { Shark } from "@sharkauth/sdk";
const shark = new Shark({ issuer: "https://auth.acme.dev" });
const tok = await shark.tokenExchange({
  subject_token: userIdToken,
  actor_token:   agentJwk,
  scope: "read:gmail"
});`,
  ];

  return (
    <section id="docs" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop:'1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin:'0 auto' }}>
        <div className="reveal" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap: 24 }}>
          <div>
            <span className="eyebrow">Docs · /docs</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 720 }}>
              Eight pages. <span className="serif" style={{ color:'hsl(0 0% 70%)' }}>Zero fluff.</span> One read-through and you ship.
            </h2>
          </div>
          <a href="#" className="btn btn-ghost" style={{ height: 40 }}>
            Open full docs <Icon.arrow size={12}/>
          </a>
        </div>

        <div className="reveal" style={{
          marginTop: 48,
          display:'grid', gridTemplateColumns:'260px 1fr', gap: 24,
          border:'1px solid hsl(0 0% 12%)', borderRadius: 18, overflow:'hidden', background:'hsl(0 0% 2.5%)',
        }}>
          {/* Sidebar */}
          <nav style={{ borderRight:'1px solid hsl(0 0% 10%)', padding: '18px 14px', background:'hsl(0 0% 3.5%)' }}>
            <div className="mono" style={{ fontSize: 11, color:'hsl(0 0% 45%)', letterSpacing:'0.1em', padding: '0 10px 10px' }}>CONTENTS</div>
            {sections.map((s, i) => (
              <button key={s.id} onClick={() => setActive(i)} style={{
                width:'100%', textAlign:'left', padding: '10px 12px', borderRadius: 10,
                border:'1px solid ' + (active === i ? 'hsl(0 0% 22%)' : 'transparent'),
                background: active === i ? 'hsla(0,0%,100%,0.05)' : 'transparent',
                color: active === i ? 'white' : 'hsl(0 0% 70%)',
                cursor:'pointer', display:'flex', flexDirection:'column', gap: 2,
                fontFamily: 'inherit', fontSize: 13.5, marginBottom: 2,
                transition: 'all .2s',
              }}>
                <span style={{ fontWeight: 500, letterSpacing:'-0.01em' }}>{s.t}</span>
                <span className="mono" style={{ fontSize: 11, color:'hsl(0 0% 50%)' }}>{s.sub}</span>
              </button>
            ))}
          </nav>
          {/* Content */}
          <div style={{ padding: '32px 36px 36px', minHeight: 420 }}>
            <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 45%)', letterSpacing:'0.1em' }}>
              {String(active + 1).padStart(2,'0')} / {String(sections.length).padStart(2,'0')}  ·  /docs/{sections[active].id}
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 500, letterSpacing:'-0.025em', marginTop: 14, lineHeight: 1.15 }}>
              {sections[active].t}
            </h3>
            <p className="text-muted" style={{ fontSize: 14.5, lineHeight: 1.6, marginTop: 10, maxWidth: 620 }}>
              The {sections[active].t.toLowerCase()} reference page. Every primitive lands inside two pages, every snippet is copy-pasteable, every example runs against a fresh <span className="mono">shark serve</span>.
            </p>
            <div className="codeblock" style={{ marginTop: 22, padding: '20px 22px', whiteSpace:'pre-wrap', fontSize: 13 }}>
{snippets[active]}
            </div>
            <div style={{ marginTop: 22, display:'flex', gap: 10 }}>
              <button onClick={()=>setActive((active - 1 + sections.length) % sections.length)} className="btn btn-ghost" style={{ height: 36 }}>← Prev</button>
              <button onClick={()=>setActive((active + 1) % sections.length)} className="btn btn-ghost" style={{ height: 36 }}>Next →</button>
              <span style={{ flex: 1 }}/>
              <a href="#" className="btn btn-ghost" style={{ height: 36 }}><Icon.github size={12}/> Edit on GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Use cases ---------- */
function UseCases() {
  const cases = [
    {
      tag: '01',
      h: 'Personal AI assistant with real keys to your kingdom.',
      b: 'Your assistant reads your inbox because you said it could — bound to one DPoP key, scoped to one label, expiring at 5pm.',
    },
    {
      tag: '02',
      h: 'Multi-agent orchestrator with provable provenance.',
      b: 'Orchestrator fans out to a fetcher, a summarizer, a writer. Each link in the chain is signed, scoped, and revocable independently.',
    },
    {
      tag: '03',
      h: 'Embedded auth for OSS SaaS.',
      b: 'Drop the binary next to your app. Get OAuth 2.1, OIDC, SCIM, and an admin UI without a vendor on the critical path.',
    },
    {
      tag: '04',
      h: 'Internal platforms that need real audit.',
      b: 'Every agent action attributable to a human, indexed by grant_id, hash-chained, replayable into your SIEM.',
    },
    {
      tag: '05',
      h: 'Edge & air-gapped deployments.',
      b: 'A 40 MB binary on a Pi, talking to a SQLite file. No outbound calls. No phone-home. No "free until we change our mind."',
    },
    {
      tag: '06',
      h: 'Compliance teams who have seen too much.',
      b: 'AGPL-3.0, hash-chained audit, deterministic config. No hidden state. Auditors get receipts. You get to sleep.',
    },
  ];
  return (
    <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop:'1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin:'0 auto' }}>
        <div className="reveal" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap: 24 }}>
          <div>
            <span className="eyebrow">Use cases</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 720 }}>
              The shape of <span className="serif" style={{ color:'hsl(0 0% 70%)' }}>agent infrastructure</span> people are actually shipping.
            </h2>
          </div>
        </div>
        <div className="reveal" style={{ marginTop: 56, display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap: 1, background:'hsl(0 0% 12%)', border:'1px solid hsl(0 0% 12%)', borderRadius: 18, overflow:'hidden' }}>
          {cases.map((c) => (
            <div key={c.tag} style={{ background:'hsl(0 0% 2.5%)', padding: 28, minHeight: 200 }}>
              <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 45%)', letterSpacing:'0.1em' }}>{c.tag}</div>
              <div style={{ marginTop: 12, fontSize: 18, lineHeight: 1.3, letterSpacing:'-0.02em', fontWeight:500 }}>{c.h}</div>
              <p style={{ marginTop: 10, color:'hsl(0 0% 65%)', fontSize: 13.5, lineHeight: 1.6 }}>{c.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section id="waitlist" style={{ padding: 'clamp(100px, 14vw, 200px) clamp(20px, 4vw, 56px)', position:'relative', overflow:'hidden', borderTop:'1px solid hsl(0 0% 8%)' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <div className="grid-overlay" style={{ position:'absolute', inset:0, opacity:.5,
          maskImage:'radial-gradient(ellipse 60% 70% at 50% 50%, black, transparent 80%)',
          WebkitMaskImage:'radial-gradient(ellipse 60% 70% at 50% 50%, black, transparent 80%)' }}/>
        <img src="assets/sharky-glyph.png" alt="" style={{
          position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)',
          width: 720, opacity: 0.06,
        }}/>
      </div>
      <div className="reveal" style={{ position:'relative', maxWidth: 880, margin:'0 auto', textAlign:'center' }}>
        <Pill live>Open source · AGPL-3.0 · Self-hostable today</Pill>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 84px)', marginTop: 24, lineHeight: 1.02, letterSpacing:'-0.04em', fontWeight:500 }}>
          Ship agent auth that <br/>
          <span className="serif" style={{ color:'hsl(0 0% 75%)' }}>holds up under audit.</span>
        </h2>
        <p className="text-muted" style={{ marginTop: 22, fontSize: 17, lineHeight: 1.55, maxWidth: 560, margin: '22px auto 0' }}>
          One binary. One SQLite file. One curl command. Stay open-source forever, or get on the
          managed Cloud waitlist for a hosted issuer with the same primitives.
        </p>
        <div style={{ marginTop: 36, display:'flex', gap: 12, justifyContent:'center', flexWrap:'wrap' }}>
          <CopyCmd cmd={INSTALL_CMD}/>
          <a href="#github" className="btn btn-ghost" style={{ height: 44 }}>
            <Icon.github size={14}/> Star on GitHub
          </a>
          <a href="#waitlist" className="btn btn-ghost" style={{ height: 44 }}>
            Cloud Waitlist <Icon.arrow size={12}/>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const cols = [
    { h: 'Product', items: ['Overview', 'Comparison', 'Pricing', 'Changelog', 'Roadmap'] },
    { h: 'Developers', items: ['Quickstart', 'Reference', 'SDK · Node', 'SDK · Go', 'Audit log schema'] },
    { h: 'Specs',    items: ['OAuth 2.1', 'OIDC', 'RFC 8693', 'RFC 9449 DPoP', 'PKCE / PAR'] },
    { h: 'Company',  items: ['Blog', 'Security', 'License (AGPL-3.0)', 'Contact'] },
  ];
  return (
    <footer style={{ padding: '80px clamp(20px, 4vw, 56px) 40px', borderTop:'1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin:'0 auto', display:'grid', gridTemplateColumns:'1.4fr repeat(4, 1fr)', gap: 32, alignItems:'flex-start' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
            <LogoMark size={28}/>
            <span style={{ fontSize: 17, fontWeight: 600, letterSpacing:'-0.025em' }}>SharkAuth</span>
          </div>
          <p className="text-muted" style={{ fontSize: 13.5, marginTop: 14, lineHeight: 1.55, maxWidth: 280 }}>
            OAuth 2.1 + OIDC authorization server for the agent-on-behalf-of-user era. Open source, AGPL-3.0.
          </p>
          <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 40%)', marginTop: 22 }}>
            sha256: 4f5a 8b21 19e6 …  ·  v0.9.0
          </div>
        </div>
        {cols.map(c => (
          <div key={c.h}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>{c.h}</div>
            <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap: 10 }}>
              {c.items.map(it => (
                <li key={it}>
                  <a href="#" style={{ color:'hsl(0 0% 75%)', textDecoration:'none', fontSize: 13.5, letterSpacing:'-0.005em' }}>{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1240, margin: '60px auto 0', paddingTop: 24, borderTop:'1px solid hsl(0 0% 8%)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap: 12 }}>
        <span className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 45%)' }}>© 2026 SharkAuth Labs · An honest piece of software.</span>
        <span className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 45%)' }}>Built with ☼ care, not vibes.</span>
      </div>
    </footer>
  );
}

/* ---------- App ---------- */
function App() {
  useReveal();
  return (
    <>
      <Hero/>
      <LogoStrip/>
      <Comparison/>
      <Quickstart/>
      <Differentiators/>
      <LiveDemo/>
      <AdminShowcase/>
      <Docs/>
      <UseCases/>
      <FinalCTA/>
      <Footer/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

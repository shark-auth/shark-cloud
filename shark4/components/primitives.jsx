/* global React */
const { useEffect, useRef, useState } = React;

/* ----- Icons (minimal, monochrome) ----- */
const Icon = {
  github: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  ),
  copy: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||12} height={p.size||12} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4 10-10"/></svg>
  ),
  x: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||12} height={p.size||12} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
  ),
  dot: () => <span className="dot"></span>,
  shield: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9-4.6-.5-8-4.5-8-9V6l8-3z"/></svg>
  ),
  key: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/></svg>
  ),
  link: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/></svg>
  ),
  layers: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></svg>
  ),
  cube: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z"/><path d="M3 7l9 5 9-5M12 12v10"/></svg>
  ),
  terminal: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l5-5-5-5M12 19h8"/></svg>
  ),
  star: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.95 6.36 6.95.66-5.2 4.7 1.51 6.84L12 17.77l-6.21 3.29 1.51-6.84-5.2-4.7 6.95-.66L12 2.5z"/></svg>
  ),
  chevron: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
  ),
  user: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
  ),
  bot: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M9 13h.01M15 13h.01M9 17h6"/></svg>
  ),
};

/* ----- Pill / brand ----- */
function LogoMark({ size = 28 }) {
  return (
    <img src="assets/sharky-glyph.png" alt=""
      style={{
        width: size, height: size, objectFit: 'contain',
        filter: 'drop-shadow(0 0 12px hsla(0,0%,100%,0.25))',
        display: 'block',
      }}/>
  );
}

function Pill({ children, live }) {
  return (
    <span className="liquid-glass" style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '7px 14px 7px 12px', fontSize: 12.5, color: 'hsl(0 0% 88%)',
      letterSpacing: '-0.005em',
    }}>
      <span className={live ? 'dot live' : 'dot'}></span>
      {children}
    </span>
  );
}

/* ----- CopyButton ----- */
function CopyCmd({ cmd, label='Get the Binary' }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        navigator.clipboard?.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      style={{ padding: '0 4px 0 18px', height: 44, gap: 0 }}
    >
      <span style={{ display:'inline-flex', alignItems:'center', gap:8, paddingRight: 14 }}>
        {label}
      </span>
      <span
        className="mono"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'hsl(0 0% 8%)',
          color: 'hsl(0 0% 88%)',
          height: 36, padding: '0 14px', borderRadius: 999, marginRight: 4,
          fontSize: 12, fontWeight: 500,
          border: '1px solid hsl(0 0% 14%)',
        }}
        aria-live="polite"
      >
        <Icon.terminal size={12}/>
        <span style={{ maxWidth: 220, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {copied ? 'Copied to clipboard' : cmd}
        </span>
      </span>
    </button>
  );
}

Object.assign(window, { Icon, LogoMark, Pill, CopyCmd });

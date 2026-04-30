'use client';

import React, { useState } from 'react';
import { Icon } from './Icons';

/* ----- Pill / brand ----- */
export function Pill({ children, live }: { children: React.ReactNode, live?: boolean }) {
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
export function CopyCmd({ cmd, label = 'Get the Binary' }: { cmd: string, label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        if (typeof navigator !== 'undefined') {
          navigator.clipboard?.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }
      }}
      style={{ padding: '0 4px 0 18px', height: 44, gap: 0 }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, paddingRight: 14 }}>
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
        <Icon.terminal size={12} />
        <span style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {copied ? 'Copied to clipboard' : cmd}
        </span>
      </span>
    </button>
  );
}

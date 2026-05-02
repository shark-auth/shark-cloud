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
      className="btn btn-primary copy-cmd-btn"
      onClick={() => {
        if (typeof navigator !== 'undefined') {
          navigator.clipboard?.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }
      }}
    >
      <span className="copy-cmd-label">
        {label}
      </span>
      <span
        className="mono copy-cmd-inner"
        aria-live="polite"
      >
        <Icon.terminal size={12} />
        <span className="copy-cmd-text">
          {copied ? 'Copied to clipboard' : cmd}
        </span>
      </span>
    </button>
  );
}

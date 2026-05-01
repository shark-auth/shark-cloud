import React from 'react';

type CalloutType = 'note' | 'warning' | 'tip';

interface DocCalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 019 14" />
    </svg>
  );
}

const configs = {
  note: {
    borderColor: 'hsl(0 0% 70%)',
    bg: 'hsla(0,0%,100%,0.03)',
    icon: <InfoIcon />,
    defaultTitle: 'Note',
  },
  warning: {
    borderColor: 'hsl(0 0% 55%)',
    bg: 'hsla(0,0%,100%,0.02)',
    icon: <AlertIcon />,
    defaultTitle: 'Warning',
  },
  tip: {
    borderColor: 'hsl(0 0% 75%)',
    bg: 'hsla(0,0%,100%,0.03)',
    icon: <LightbulbIcon />,
    defaultTitle: 'Tip',
  },
};

export function DocCallout({ type = 'note', title, children }: DocCalloutProps) {
  const config = configs[type];

  return (
    <div style={{
      display: 'flex', gap: 12,
      padding: '16px 20px',
      background: config.bg,
      borderLeft: `3px solid ${config.borderColor}`,
      borderRadius: '0 8px 8px 0',
      marginBottom: 20,
    }}>
      <div style={{ color: config.borderColor, flexShrink: 0, marginTop: 2 }}>
        {config.icon}
      </div>
      <div>
        {title && (
          <div style={{
            fontSize: 14, fontWeight: 600,
            color: 'var(--docs-fg-heading)',
            marginBottom: 6,
          }}>
            {title || config.defaultTitle}
          </div>
        )}
        <div style={{
          fontSize: 14.5,
          color: 'var(--docs-fg)',
          lineHeight: 1.65,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
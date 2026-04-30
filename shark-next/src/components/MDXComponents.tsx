import React from 'react';

const TerminalIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l5-5-5-5M12 19h8" /></svg>
);

export const MDXComponents = {
  h1: (props: any) => <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500, marginBottom: '1.5rem', letterSpacing: '-0.04em' }} {...props} />,
  h2: (props: any) => <h2 style={{ fontSize: '24px', fontWeight: 500, marginTop: '3rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }} {...props} />,
  h3: (props: any) => <h3 className="mono" style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} {...props} />,
  p: (props: any) => <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--muted)', marginBottom: '1.5rem' }} {...props} />,
  ul: (props: any) => <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--muted)' }} {...props} />,
  li: (props: any) => <li style={{ marginBottom: '0.5rem', lineHeight: '1.6' }} {...props} />,
  table: (props: any) => (
    <div style={{ overflowX: 'auto', marginBottom: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <table className="cmp-table glass-card" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, overflow: 'hidden', margin: 0 }} {...props} />
    </div>
  ),
  thead: (props: any) => <thead style={{ background: 'var(--surface-2)' }} {...props} />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => <tr style={{ transition: 'background 0.2s ease' }} {...props} />,
  th: (props: any) => <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }} {...props} />,
  td: (props: any) => <td style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14.5px', color: 'var(--fg)', borderBottom: '1px solid var(--border)', lineHeight: '1.6' }} {...props} />,
  code: ({ children, className }: any) => {
    const isInline = !className;
    if (isInline) {
      return <code className="mono" style={{ background: 'var(--surface-2)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em', color: 'var(--fg)' }}>{children}</code>;
    }
    
    const lang = className.replace('language-', '');
    return (
      <div className="liquid-glass" style={{ margin: '2rem 0', padding: '24px', borderRadius: '14px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', color: 'var(--muted-2)' }}>
            <TerminalIcon size={14} />
          </span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{lang || 'bash'}</span>
        </div>
        <pre className="mono" style={{ fontSize: 14, color: 'white', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
          <code>{children}</code>
        </pre>
      </div>
    );
  },
};

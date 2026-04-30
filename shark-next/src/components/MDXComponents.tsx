import React from 'react';
import { Icon } from '@/components/Primitives';

export const MDXComponents = {
  h1: (props: any) => <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500, marginBottom: '1.5rem', letterSpacing: '-0.04em' }} {...props} />,
  h2: (props: any) => <h2 style={{ fontSize: '24px', fontWeight: 500, marginTop: '3rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }} {...props} />,
  h3: (props: any) => <h3 className="mono" style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} {...props} />,
  p: (props: any) => <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--muted)', marginBottom: '1.5rem' }} {...props} />,
  ul: (props: any) => <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--muted)' }} {...props} />,
  li: (props: any) => <li style={{ marginBottom: '0.5rem', lineHeight: '1.6' }} {...props} />,
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
            <Icon.terminal size={14} />
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

import React from 'react';
import { Icon } from '../Icons';
import { getAllBlogs } from '@/lib/content';

export async function Vlogs() {
  const blogs = await getAllBlogs();
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section id="vlogs" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="eyebrow">Engineering Journal · /blogs</span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, lineHeight: 1.05, maxWidth: 720 }}>
              Building in the <span className="serif">open.</span> <br />
              <span className="text-muted" style={{ fontSize: '0.75em' }}>Technical deep dives from the team building the future of agent auth.</span>
            </h2>
          </div>
          <a href="/blogs" className="btn btn-ghost" style={{ height: 40 }}>
            View all entries <Icon.arrow size={12} />
          </a>
        </div>

        <div className="reveal" style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {latestBlogs.map((log, i) => (
            <a key={i} href={`/blogs/${log.slug}`} style={{
              display: 'flex', flexDirection: 'column', padding: '40px',
              background: 'linear-gradient(180deg, hsla(0,0%,100%,0.02), hsla(0,0%,100%,0.005))',
              border: '1px solid var(--border)', borderRadius: 20, transition: 'all .4s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none', color: 'inherit', position: 'relative', overflow: 'hidden',
            }} className="vlog-card">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.15em' }}>
                    {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="chip" style={{ fontSize: 10, padding: '4px 10px', background: 'hsla(0,0%,100%,0.03)' }}>{log.tag}</span>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 16 }}>{log.title}</h3>
                <p className="text-muted" style={{ fontSize: 15, lineHeight: 1.7 }}>{log.description}</p>
              </div>
              <div style={{ marginTop: 32, fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8, color: 'white', opacity: 0, transition: 'opacity .4s' }} className="read-more">
                Read log <Icon.arrow size={11} />
              </div>
              <div style={{
                position: 'absolute', inset: 0, opacity: 0, transition: 'opacity .4s',
                background: 'radial-gradient(circle at 50% 100%, hsla(0,0%,100%,0.05), transparent 70%)',
              }} className="vlog-glow" />
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .vlog-card:hover {
          border-color: var(--border-2) !important;
          background: hsla(0,0%,100%,0.05) !important;
          transform: translateY(-8px) !important;
        }
        .vlog-card:hover .read-more { opacity: 1 !important; }
        .vlog-card:hover .vlog-glow { opacity: 1 !important; }
      `}</style>
    </section>
  );
}

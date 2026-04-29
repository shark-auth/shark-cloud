import { getAllBlogs } from '@/lib/content';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <section style={{ padding: '160px clamp(20px, 4vw, 56px) 100px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <span className="eyebrow">Blogs · /blogs</span>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 24 }}>Engineering <span className="serif" style={{ color: 'var(--muted)' }}>Trust.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
            {blogs.map((post: any) => (
              <a key={post.slug} href={`/blogs/${post.slug}`} style={{
                display: 'flex', flexDirection: 'column', padding: '32px',
                background: 'linear-gradient(180deg, hsla(0,0%,100%,0.03), transparent)',
                border: '1px solid var(--border)', borderRadius: 14, textDecoration: 'none', color: 'inherit',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted-2)' }}>
                    {post.date instanceof Date ? post.date.toLocaleDateString() : String(post.date)}
                  </span>
                  <span className="chip" style={{ fontSize: 10 }}>{post.tag}</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 500 }}>{post.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { getAllBlogs } from '@/lib/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Engineering Journal — SharkAuth',
  description: 'Technical deep dives, protocol updates, and engineering logs on agent authentication, OAuth 2.1, and DPoP.',
  alternates: { canonical: 'https://sharkauth.com/blogs' },
  openGraph: {
    title: 'Engineering Journal — SharkAuth',
    description: 'Technical deep dives on agent auth, OAuth 2.1, and DPoP.',
    url: 'https://sharkauth.com/blogs',
  },
};

export default async function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />
      
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '160px 24px 80px' }}>
        <header style={{ marginBottom: 80 }}>
          <span className="eyebrow">Engineering Journal</span>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 500, letterSpacing: '-0.04em', marginTop: 24 }}>
            The <span className="serif" style={{ fontStyle: 'italic' }}>Shark</span> Logs.
          </h1>
          <p className="text-muted" style={{ fontSize: 20, marginTop: 24, maxWidth: 600, lineHeight: 1.5 }}>
            Technical deep dives, protocol updates, and internal engineering logs from the team building the future of agent auth.
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {blogs.map((blog, idx) => (
            <Link 
              key={blog.slug} 
              href={`/blogs/${blog.slug}`}
              style={{ 
                display: 'block', 
                padding: '48px 0', 
                borderTop: '1px solid var(--border)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
              className="blog-card"
            >
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 200px', gap: 48, alignItems: 'start' }}>
                <div className="mono" style={{ fontSize: 13, color: 'var(--muted-2)' }}>
                  {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span className="chip" style={{ fontSize: 10, padding: '2px 8px' }}>{blog.tag}</span>
                  </div>
                  <h2 style={{ fontSize: 28, fontWeight: 500, color: 'white', marginBottom: 12, letterSpacing: '-0.02em' }}>{blog.title}</h2>
                  <p className="text-muted" style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 540 }}>{blog.description}</p>
                </div>

                <div style={{ textAlign: 'right', alignSelf: 'center' }}>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Read Entry →</span>
                </div>
              </div>
            </Link>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

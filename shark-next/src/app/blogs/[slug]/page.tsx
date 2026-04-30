import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { getBlogBySlug } from '@/lib/content';
import { MDXComponents } from '@/components/MDXComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />
      
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '160px 24px 80px' }}>
        <Link 
          href="/blogs" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 8, 
            fontSize: 12, 
            color: 'var(--muted)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            marginBottom: 48,
            textDecoration: 'none'
          }}
        >
          ← Back to Journal
        </Link>

        <header style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span className="chip" style={{ background: 'white', color: 'black', fontWeight: 600 }}>{blog.tag}</span>
            <span className="mono" style={{ fontSize: 13, color: 'var(--muted-2)' }}>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 24 }}>
            {blog.title}
          </h1>
          
          <p style={{ fontSize: 20, color: 'var(--muted)', lineHeight: 1.5, maxWidth: 640 }}>
            {blog.description}
          </p>

          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface-2)', border: '1px solid var(--border)' }} />
            <span className="mono" style={{ fontSize: 13, color: 'white' }}>{blog.author}</span>
          </div>
        </header>

        <article className="blog-content">
          <MDXRemote 
            source={blog.content} 
            components={MDXComponents} 
          />
        </article>

        <div className="divider-x" style={{ margin: '80px 0' }} />
        
        <section style={{ textAlign: 'center' }}>
          <h3 className="mono" style={{ fontSize: 13, marginBottom: 24 }}>WANT MORE UPDATES?</h3>
          <Link href="/waitlist" className="btn btn-primary">Join the Waitlist</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { getBlogBySlug } from '@/lib/content';
import { MDXComponents } from '@/components/MDXComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: 'Not Found — SharkAuth' };

  return {
    title: `${blog.title} — SharkAuth Engineering Journal`,
    description: blog.description,
    authors: [{ name: blog.author }],
    alternates: { canonical: `https://sharkauth.com/blogs/${slug}` },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://sharkauth.com/blogs/${slug}`,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);

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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": blog.title,
              "description": blog.description,
              "url": `https://sharkauth.com/blogs/${slug}`,
              "datePublished": blog.date,
              "dateModified": blog.date,
              "author": {
                "@type": "Person",
                "name": blog.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "SharkAuth",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://sharkauth.com/assets/sharky-glyph.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://sharkauth.com/blogs/${slug}`
              }
            })
          }}
        />

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

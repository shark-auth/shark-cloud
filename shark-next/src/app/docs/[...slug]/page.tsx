import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { getDocsTree, getDocBySlug } from '@/lib/content';
import { DocsSidebar } from '@/components/DocsSidebar';
import { MDXComponents } from '@/components/MDXComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

export default async function DocPage(props: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArray } = await props.params;
  const slug = slugArray.join('/');
  const doc = await getDocBySlug(slug);
  const tree = getDocsTree();

  if (!doc) {
    notFound();
  }

  return (
    <div className="bg-void text-white min-h-screen">
      <Navbar />
      
      <main style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, padding: '120px 56px 80px' }}>
        <DocsSidebar tree={tree} />

        <article style={{ maxWidth: 800 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            {doc.frontmatter.category || 'Documentation'}
          </div>
          
          <div style={{ minHeight: '60vh' }}>
            <MDXRemote 
              source={doc.content} 
              components={MDXComponents} 
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

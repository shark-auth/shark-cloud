import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { getDocsTree, generateSearchIndex } from '@/lib/content';
import { DocsSidebar } from '@/components/DocsSidebar';
import { DocsSearch } from '@/components/DocsSearch';
import { DocsTocInjector } from '@/components/DocsTocInjector';
import { DocsMobileNav } from '@/components/DocsMobileNav';

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = getDocsTree();
  const searchIndex = generateSearchIndex();

  return (
    <div className="docs-theme">
      <Navbar />
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px minmax(0, 1fr) 220px',
        gap: '0 48px',
        maxWidth: 1320,
        margin: '0 auto',
        padding: '120px clamp(20px, 4vw, 56px) 80px',
        minHeight: '100vh',
      }}>
        {/* Left sidebar */}
        <aside className="docs-sidebar" style={{ position: 'sticky', top: 120, alignSelf: 'start', height: 'calc(100vh - 160px)' }}>
          <DocsSearch searchIndex={searchIndex} tree={tree} />
          <div className="docs-scroll" style={{ marginTop: 24, height: 'calc(100vh - 260px)', overflowY: 'auto', paddingRight: 16 }}>
            <DocsSidebar tree={tree} />
          </div>
        </aside>

        {/* Main content */}
        <main className="docs-content">
          {children}
        </main>

        {/* Right TOC */}
        <aside className="docs-toc" style={{ position: 'sticky', top: 120, alignSelf: 'start', height: 'calc(100vh - 160px)', overflowY: 'auto' }}>
          <DocsTocInjector />
        </aside>
      </div>
      <Footer />
      <DocsMobileNav searchIndex={searchIndex} tree={tree} />
    </div>
  );
}
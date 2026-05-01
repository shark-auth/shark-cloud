'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function DocsTocInjector() {
  const pathname = usePathname();

  useEffect(() => {
    const tocEl = document.querySelector('.docs-toc');
    if (!tocEl) return;

    const existing = tocEl.querySelector('.toc-content');
    if (existing) existing.remove();

    const headings = Array.from(document.querySelectorAll('.docs-content h2, .docs-content h3'));
    if (headings.length === 0) return;

    const content = document.createElement('div');
    content.className = 'toc-content';

    const label = document.createElement('div');
    label.style.cssText = 'font-size:11px;font-weight:500;color:var(--docs-fg-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--docs-border)';
    label.textContent = 'On this page';
    content.appendChild(label);

    const list = document.createElement('ul');
    list.style.cssText = 'list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px';

    headings.forEach(h => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.style.cssText = `display:block;font-size:13.5px;line-height:1.5;color:var(--docs-fg-muted);text-decoration:none;padding:4px 0;padding-left:${h.tagName === 'H3' ? '16px' : '0'};transition:color .2s;border-left:2px solid transparent;margin-left:-2px`;

      a.addEventListener('mouseenter', function() { this.style.color = 'var(--docs-fg-heading)'; });
      a.addEventListener('mouseleave', function() { this.style.color = 'var(--docs-fg-muted)'; });
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const el = document.getElementById(h.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });

      li.appendChild(a);
      list.appendChild(li);
    });

    content.appendChild(list);
    tocEl.appendChild(content);
  }, [pathname]);

  return null;
}
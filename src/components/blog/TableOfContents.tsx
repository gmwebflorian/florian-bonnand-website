'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Extraire uniquement les titres H2 du contenu HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2');

    const items: TocItem[] = Array.from(headings).map((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1));

      // Créer un ID slugifié pour l'ancre
      const id = `heading-${index}-${text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}`;

      // Ajouter l'ID au heading dans le DOM réel (sera fait côté client)
      return { id, text, level };
    });

    setTocItems(items);

    // Ajouter les IDs aux vrais headings H2 dans le DOM
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const realHeadings = document.querySelectorAll('.blog-content h2');
        realHeadings.forEach((heading, index) => {
          if (items[index]) {
            heading.id = items[index].id;
          }
        });
      }, 100);
    }
  }, [content]);

  if (tocItems.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Ajuster pour le header fixe (si nécessaire)
      window.scrollBy(0, -80);
    }
  };

  return (
    <div className="mb-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
      {/* Header cliquable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-blue-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <h2 className="text-lg font-bold text-slate-900">
            📑 Sommaire de l'article
          </h2>
          <span className="text-sm text-slate-500">
            ({tocItems.length} {tocItems.length > 1 ? 'sections' : 'section'})
          </span>
        </div>

        {/* Icône toggle */}
        <svg
          className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Contenu du sommaire */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <nav className="px-5 pb-5">
          <ul className="space-y-2">
            {tocItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleClick(item.id)}
                  className="w-full text-left py-2 px-3 rounded-lg transition-all duration-200
                    hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1
                    flex items-start gap-2 group font-semibold text-slate-800"
                >
                  <span className="text-blue-500 group-hover:text-blue-700 flex-shrink-0 mt-0.5">
                    ▸
                  </span>
                  <span className="flex-1">{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

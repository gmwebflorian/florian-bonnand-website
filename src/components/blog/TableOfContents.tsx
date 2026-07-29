'use client';

import { useState } from 'react';

interface Heading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Calculer la position avec offset pour le header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;

      // Scroll direct vers la position calculée
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
            ({headings.length} {headings.length > 1 ? 'sections' : 'section'})
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
            {headings.map((heading, index) => (
              <li key={index}>
                <button
                  onClick={(e) => handleClick(heading.id, e)}
                  className="w-full text-left py-2 px-3 rounded-lg transition-all duration-200
                    hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1
                    flex items-start gap-2 group font-semibold text-slate-800"
                >
                  <span className="text-blue-500 group-hover:text-blue-700 flex-shrink-0 mt-0.5">
                    ▸
                  </span>
                  <span className="flex-1">{heading.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

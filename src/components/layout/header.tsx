'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CompassIcon } from '@/components/icons/maritime-icons';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'À propos', href: '#about' },
    { label: 'Expertises', href: '#expertises' },
    { label: 'Méthode', href: '#method' },
    { label: 'Références', href: '#references' },
    { label: 'Blog', href: '/blog' },  
    { label: 'Contact', href: '#contact' },
  ];

  // Fonction pour gérer le scroll smooth sur la homepage
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si on est sur la homepage ET que c'est un lien avec ancre (#)
    if (pathname === '/' && href.startsWith('#')) {
      e.preventDefault(); // Empêche le comportement par défaut du lien
      setIsMobileMenuOpen(false);
      
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Sinon, on laisse le lien fonctionner normalement
      setIsMobileMenuOpen(false);
    }
  };

  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20" />
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            onClick={(e) => handleSmoothScroll(e, '#')}
          >
            <CompassIcon
              className={`w-10 h-10 transition-colors ${
                isScrolled || isMobileMenuOpen ? 'text-[hsl(var(--ocean-primary))]' : 'text-white'
              }`}
            />
            <div className="hidden sm:block">
              <div
                className={`font-bold text-lg transition-colors ${
                  isScrolled || isMobileMenuOpen ? 'text-[hsl(var(--ocean-deep))]' : 'text-white'
                }`}
              >
                Florian Bonnand
              </div>
              <div
                className={`text-xs transition-colors ${
                  isScrolled || isMobileMenuOpen ? 'text-gray-600' : 'text-white/80'
                }`}
              >
                Consultant Amazon
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href === '/blog' ? item.href : `/${item.href}`}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`font-medium transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-[hsl(var(--ocean-primary))]' 
                    : 'text-white hover:text-gray-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className={`hidden md:block px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
              isScrolled
                ? 'bg-[hsl(var(--ocean-primary))] text-white hover:bg-[hsl(var(--ocean-deep))]'
                : 'bg-[hsl(var(--gold))] text-[hsl(var(--ocean-deep))] hover:bg-[hsl(var(--copper))]'
            }`}
          >
            Prendre contact
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <svg
              className={`w-6 h-6 ${isScrolled || isMobileMenuOpen ? 'text-gray-700' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href === '/blog' ? item.href : `/${item.href}`}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-left font-medium text-gray-700 hover:text-[hsl(var(--ocean-primary))] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="mt-2 px-6 py-2.5 rounded-lg font-semibold bg-[hsl(var(--ocean-primary))] text-white hover:bg-[hsl(var(--ocean-deep))] transition-colors"
              >
                Prendre contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
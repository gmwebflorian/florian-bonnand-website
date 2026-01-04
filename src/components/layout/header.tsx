'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CompassIcon } from '@/components/icons/maritime-icons';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
  { label: 'Blog', href: '/blog' },  // ← Ajouté
  { label: 'Contact', href: '#contact' },
];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <button
            onClick={() => scrollToSection('#')}
            className="flex items-center gap-3 group"
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
          </button>

          {/* Desktop Navigation */}
<nav className="hidden md:flex gap-8">
{navItems.map((item) => {
  if (item.href === '/blog') {
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`font-medium transition-colors ${
          isScrolled 
            ? 'text-gray-700 hover:text-[hsl(var(--ocean-primary))]' 
            : 'text-white hover:text-gray-200'
        }`}
      >
        {item.label}
      </Link>
    );
  }
  
  return (
    <button
      key={item.href}
      onClick={() => scrollToSection(item.href)}
      className={`font-medium transition-colors ${
        isScrolled 
          ? 'text-gray-700 hover:text-[hsl(var(--ocean-primary))]' 
          : 'text-white hover:text-gray-200'
      }`}
    >
      {item.label}
    </button>
  );
})}
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('#contact')}
            className={`hidden md:block px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
              isScrolled
                ? 'bg-[hsl(var(--ocean-primary))] text-white hover:bg-[hsl(var(--ocean-deep))]'
                : 'bg-[hsl(var(--gold))] text-[hsl(var(--ocean-deep))] hover:bg-[hsl(var(--copper))]'
            }`}
          >
            Prendre contact
          </button>

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
{navItems.map((item) => {
  // Si c'est le lien Blog, on utilise Link
  if (item.href === '/blog') {
    return (
      <Link
        key={item.href}
        href={item.href}
        className="text-left font-medium text-gray-700 hover:text-[hsl(var(--ocean-primary))] transition-colors"
      >
        {item.label}
      </Link>
    );
  }
  
  // Sinon, c'est un bouton avec scrollToSection
  return (
    <button
      key={item.href}
      onClick={() => scrollToSection(item.href)}
      className="text-left font-medium text-gray-700 hover:text-[hsl(var(--ocean-primary))] transition-colors"
    >
      {item.label}
    </button>
  );
})}
              <button
                onClick={() => scrollToSection('#contact')}
                className="mt-2 px-6 py-2.5 rounded-lg font-semibold bg-[hsl(var(--ocean-primary))] text-white hover:bg-[hsl(var(--ocean-deep))] transition-colors"
              >
                Prendre contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

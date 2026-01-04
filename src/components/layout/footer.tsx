'use client';

import { CompassIcon, WaveIcon } from '@/components/icons/maritime-icons';

export function Footer() {
  return (
    <footer className="bg-[hsl(var(--ocean-deep))] text-white">
      {/* Waves decoration */}
      <div className="text-white/10 rotate-180">
        <WaveIcon className="w-full h-16" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CompassIcon className="w-12 h-12 text-[hsl(var(--gold))]" />
              <div>
                <div className="font-bold text-xl">Florian Bonnand</div>
                <div className="text-sm text-white/70">Consultant Amazon</div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Accompagnement expert des marques françaises sur Amazon.
              Vision terrain, résultats concrets, stratégies sur-mesure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[hsl(var(--gold))]">Navigation</h3>
            <nav className="space-y-2">
              {[
                { label: 'À propos', href: '#about' },
                { label: 'Expertises', href: '#expertises' },
                { label: 'Méthode', href: '#method' },
                { label: 'Références', href: '#references' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <button
                  key={item.href}
                  onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-white/70 hover:text-[hsl(var(--gold))] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[hsl(var(--gold))]">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@florianbonnand.fr" className="text-white/80 hover:text-white transition-colors">
                  contact@florian-bonnand.eu
                </a>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--copper))] text-[hsl(var(--ocean-deep))] font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Demander un diagnostic
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Florian Bonnand - Consultant Amazon. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <span>SIRET : 852 599 802</span>
              <span>|</span>
              <span>Mentions légales</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

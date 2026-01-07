'use client';
import Image from 'next/image';
import { Anchor3DIcon } from '@/components/icons/maritime-icons-3d';

export function About() {
  return (
    <section id="about" className="py-24 bg-[hsl(var(--cream))]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
{/* Left: Image placeholder */}
<div className="relative">
  <div className="aspect-[6/5] bg-gradient-to-br from-[hsl(var(--ocean-primary))] to-[hsl(var(--ocean-light))] rounded-lg shadow-2xl relative overflow-hidden">
    <div className="absolute inset-0">
      <Image
        src="/images/Expert Amazon Marketplace.webp"
        alt="Florian Bonnand - Expert Amazon Marketplace"
        fill
        className="object-cover object-center"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
      <p className="text-white font-semibold text-lg">Florian Bonnand</p>
      <p className="text-white/80">Expert Amazon & Consultant Marketplace</p>
    </div>
  </div>
  {/* Decorative rope element */}
  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-32 border-l-4 border-dashed border-[hsl(var(--sand-dark))] opacity-30" />
</div>
          {/* Right: Content */}
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[hsl(var(--ocean-primary))]" />
              <span className="text-[hsl(var(--ocean-primary))] font-semibold uppercase tracking-wider text-sm">
                À propos
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--ocean-deep))] mb-6">
              D'ancien vendeur à expert Amazon
            </h2>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Ma différence ? <strong className="text-[hsl(var(--ocean-deep))]">Je ne suis pas un ancien d'Amazon</strong>,
                mais un <strong className="text-[hsl(var(--ocean-deep))]">ancien vendeur Amazon</strong>.
                Cette expérience terrain m'a donné une vision unique : celle des marques qui naviguent
                réellement sur la marketplace.
              </p>

              <p>
                Pendant des années, j'ai piloté mes propres ventes, optimisé mes campagnes,
                géré les aléas de la plateforme. J'ai connu les défis, les victoires et les
                obstacles que rencontrent aujourd'hui mes clients.
              </p>

              <p>
                Aujourd'hui, je mets cette expertise pragmatique au service des marques françaises
                qui souhaitent <strong className="text-[hsl(var(--ocean-deep))]">tenir le cap</strong> sur Amazon :
                développer leurs ventes, optimiser leur rentabilité et structurer leur stratégie marketplace
                avec un accompagnement <strong className="text-[hsl(var(--ocean-deep))]">sur-mesure</strong>.
              </p>

              <p className="text-[hsl(var(--ocean-primary))] font-semibold italic pt-4">
                "Proximité, résultats concrets et vision orientée ROI :
                voilà ce qui guide mon accompagnement."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

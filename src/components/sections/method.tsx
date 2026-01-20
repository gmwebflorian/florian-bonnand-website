'use client';

import { useState } from 'react';

export function Method() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Analyse',
      subtitle: 'Diagnostic personnalisé de la marque',
      description: `Comme un capitaine étudie les cartes avant de prendre la mer, je commence par analyser en profondeur votre situation actuelle sur Amazon : performances de vente, positionnement produits, structure publicitaire, qualité du catalogue, présence concurrentielle. Un audit complet pour identifier vos forces, vos opportunités et les obstacles à franchir.`,
      icon: '🧭',
    },
    {
      number: '02',
      title: 'Cap',
      subtitle: 'Définition de la stratégie sur-mesure',
      description: `Une fois le diagnostic établi, je trace avec vous la route vers vos objectifs. Définition du cap stratégique, priorisation des actions, planification du déploiement : chaque marque est unique, chaque stratégie est personnalisée. Roadmap détaillée, KPI précis, ressources nécessaires. Vous savez exactement où vous allez et comment y arriver.`,
      icon: '⚓',
    },
    {
      number: '03',
      title: 'Navigation',
      subtitle: 'Accompagnement opérationnel & suivi mensuel',
      description: `La stratégie définie, place à l'action. Je pilote avec vous l'exécution opérationnelle : optimisation continue des campagnes, ajustements du catalogue, suivi de la performance, adaptation aux évolutions du marché. Reporting mensuel transparent, échanges réguliers, corrections de trajectoire si nécessaire. Ensemble, nous tenons le cap vers la croissance.`,
      icon: '🚢',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  const StepCard = ({ step, index, showConnector }: { step: typeof steps[0]; index: number; showConnector?: boolean }) => (
    <div className="relative">
      <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 hover:bg-white/15 transition-all duration-500 border border-white/20 hover:border-[hsl(var(--gold))] h-full">
        <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl md:text-8xl font-bold text-white/10 group-hover:text-[hsl(var(--gold))]/20 transition-colors duration-500">
              {step.number}
            </div>
            <div className="text-5xl">{step.icon}</div>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-3 text-[hsl(var(--gold))]">
              {step.title}
            </h3>

            <p className="text-lg font-semibold mb-4 text-white/90 uppercase tracking-wide">
              {step.subtitle}
            </p>

            <p className="text-lg text-white/80 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>

      {showConnector && (
        <div className="hidden md:block absolute left-[88px] bottom-0 translate-y-full h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
      )}
    </div>
  );

  return (
    <section id="method" className="py-24 bg-gradient-to-br from-[hsl(var(--ocean-deep))] via-[hsl(var(--ocean-primary))] to-[hsl(var(--ocean-light))] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-white/50" />
            <span className="text-[hsl(var(--gold))] font-semibold uppercase tracking-wider text-sm">
              Méthode de travail
            </span>
            <div className="h-px w-12 bg-white/50" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Un Cap Clair, Une Navigation Maîtrisée
          </h2>

          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Mon approche s'articule autour de 3 étapes clés, pensées pour vous mener
            du diagnostic initial à la performance durable
          </p>
        </div>

        {/* Desktop Vertical Layout - Hidden on mobile */}
        <div className="hidden md:block space-y-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              showConnector={index < steps.length - 1}
            />
          ))}
        </div>

        {/* Mobile Carousel - Visible only on mobile */}
        <div className="md:hidden">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {steps.map((step, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <StepCard step={step} index={index} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-2 rounded-full shadow-md transition-all z-10"
              aria-label="Étape précédente"
            >
              <svg className="w-5 h-5 text-[hsl(var(--ocean-deep))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-2 rounded-full shadow-md transition-all z-10"
              aria-label="Étape suivante"
            >
              <svg className="w-5 h-5 text-[hsl(var(--ocean-deep))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-8 bg-[hsl(var(--gold))]'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Aller à l'étape ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-white/90 mb-6">
            Prêt à embarquer pour une croissance maîtrisée ?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--copper))] text-[hsl(var(--ocean-deep))] font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Commençons par un diagnostic
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
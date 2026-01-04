'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const expertises = [
  {
    iconPath: '/images/icons/amazon-ads.png', // Remplacez par le chemin de votre image
    title: `Amazon Ads`,
    subtitle: `Optimisation & Pilotage de Campagnes`,
    description: `Maximisez votre retour sur investissement publicitaire avec une stratégie Amazon Ads sur-mesure. Expert en Sponsored Products, Sponsored Brands et Sponsored Display, je pilote vos campagnes avec une approche data-driven : analyse de la performance, optimisation du TACOS, ciblage précis des mots-clés à forte conversion. Mon objectif : propulser vos produits en première page tout en maîtrisant vos coûts publicitaires. Accompagnement opérationnel mensuel, reporting détaillé et ajustements stratégiques pour garantir une croissance rentable de vos ventes Amazon.`,
    keywords: `Amazon Ads, Sponsored Products, campagnes sponsorisées, optimisation TACOS, publicité Amazon`,
  },
  {
    iconPath: '/images/icons/catalogue.png',
    title: `Création & Optimisation de Catalogue`,
    subtitle: `SEO Amazon, Fiches Produits & Brand Store`,
    description: `Transformez vos fiches produits en véritables leviers de conversion. Je structure et optimise votre catalogue Amazon selon les meilleures pratiques SEO marketplace : recherche de mots-clés pertinents, rédaction de titres et descriptions orientés conversion, création de contenus A+ attractifs et création de Brand Store immersifs. Chaque élément est pensé pour améliorer votre visibilité organique, renforcer votre image de marque et maximiser votre taux de transformation. Un catalogue bien optimisé, c'est la garantie de performances durables sur Amazon.`,
    keywords: `SEO Amazon, optimisation catalogue, fiches produits, Brand Store, A+ Content`,
  },
  {
    iconPath: '/images/icons/conseil-strategie.png',
    title: `Conseil Stratégique Global`,
    subtitle: `Audit, Roadmap & Accompagnement Direction E-commerce`,
    description: `Définissez une stratégie Amazon cohérente et ambitieuse avec un accompagnement de direction e-commerce dédié. J'interviens auprès des marques pour auditer leur présence Amazon, identifier les opportunités de croissance et structurer une roadmap actionnables. Positionnement produits, pricing, gestion de la concurrence, stratégie omnicanale : je vous aide à prendre les bonnes décisions pour développer durablement vos ventes. Idéal pour les marques en structuration ou en phase de scale-up souhaitant un regard expert et une vision à 360° de leur performance marketplace.`,
    keywords: `consultant Amazon, stratégie marketplace, audit Amazon, roadmap e-commerce, direction marketplace`,
  },
  {
    iconPath: '/images/icons/international.png',
    title: `Développement International`,
    subtitle: `Lancement EU, US, UK – Adaptation & Logistique`,
    description: `Développez votre marque sur les marketplaces Amazon européennes, américaines et britanniques avec un accompagnement complet. Je vous guide dans le lancement international : adaptation linguistique et culturelle des fiches produits, configuration logistique (FBA, Pan-European FBA), gestion des devises et fiscalité transfrontalière, mise en place de stratégies publicitaires locales. Chaque marché Amazon présente ses spécificités : je vous aide à les maîtriser pour maximiser vos chances de succès à l'international et éviter les erreurs coûteuses.`,
    keywords: `expansion internationale Amazon, Amazon EU, Amazon US, FBA Europe, marketplace internationale`,
  },
  {
    iconPath: '/images/icons/reglementaire.png',
    title: `Accompagnement Réglementaire`,
    subtitle: `Conformité RGPD, TVA, DEEE & Fiscalité`,
    description: `Naviguez sereinement dans la complexité réglementaire d'Amazon. Je vous accompagne sur tous les aspects de conformité : mise en conformité RGPD et protection des données clients, gestion de la TVA intracommunautaire et déclarations fiscales, enregistrement DEEE (équipements électriques et électroniques), respect des normes CE et obligations légales par catégorie de produits. Un accompagnement réglementaire rigoureux vous protège des sanctions Amazon (suspension de compte, blocage de ventes) et sécurise votre activité marketplace sur le long terme.`,
    keywords: `conformité Amazon, RGPD marketplace, TVA Amazon, DEEE, réglementation e-commerce`,
  },
  {
    iconPath: '/images/icons/gestion-compte.png',
    title: `Gestion de Compte & Performance`,
    subtitle: `Pilotage Quotidien & Optimisation Continue`,
    description: `Déléguez la gestion opérationnelle de votre compte Amazon à un expert pour vous concentrer sur votre cœur de métier. Je prends en charge le pilotage quotidien : suivi des stocks et coordination logistique, gestion des avis clients et service après-vente, monitoring des performances et des KPIs, résolution des problématiques techniques et litiges, veille concurrentielle et ajustements tarifaires. Un suivi proactif et une réactivité maximale pour maintenir votre compte Amazon en parfaite santé et saisir toutes les opportunités de croissance.`,
    keywords: `gestion compte Amazon, pilotage marketplace, optimisation performance, suivi Amazon, account management`,
  },
];

function ExpertiseCard({ expertise, index }: { expertise: typeof expertises[0]; index: number }) {
  return (
    <div
      className="group relative bg-gradient-to-br from-white via-[hsl(var(--cream))] to-white rounded-2xl p-8 shadow-xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 border-2 border-[hsl(var(--sand))]/50 hover:border-[hsl(var(--gold))]/80 hover:-translate-y-3 overflow-hidden h-full"
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-6 inline-block p-6 bg-gradient-to-br from-[hsl(var(--ocean-deep))] via-[hsl(var(--ocean-primary))] to-[hsl(var(--ocean-light))] rounded-2xl shadow-lg group-hover:shadow-[0_10px_40px_rgba(0,70,140,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <div className="relative w-16 h-16">
            <Image
              src={expertise.iconPath}
              alt={expertise.title}
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-[hsl(var(--ocean-deep))] mb-2">
          {expertise.title}
        </h3>

        <p className="text-sm font-semibold text-[hsl(var(--gold))] mb-4 uppercase tracking-wide">
          {expertise.subtitle}
        </p>

        <p className="text-gray-700 leading-relaxed text-sm mb-4">
          {expertise.description}
        </p>

        <div className="pt-4 border-t border-[hsl(var(--sand))]/50">
          <p className="text-xs text-gray-500 italic">
            {expertise.keywords}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Expertises() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % expertises.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + expertises.length) % expertises.length);
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

  return (
    <section id="expertises" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[hsl(var(--ocean-primary))]" />
            <span className="text-[hsl(var(--ocean-primary))] font-semibold uppercase tracking-wider text-sm">
              Expertises
            </span>
            <div className="h-px w-12 bg-[hsl(var(--ocean-primary))]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--ocean-deep))] mb-6">
            6 Domaines d'Excellence Amazon
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un accompagnement complet pour développer, optimiser et sécuriser votre présence sur Amazon
          </p>
        </div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertises.map((expertise, index) => (
            <ExpertiseCard key={index} expertise={expertise} index={index} />
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
              {expertises.map((expertise, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <ExpertiseCard expertise={expertise} index={index} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-2 rounded-full shadow-md transition-all z-10"
              aria-label="Slide précédent"
            >
              <svg className="w-5 h-5 text-[hsl(var(--ocean-deep))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-2 rounded-full shadow-md transition-all z-10"
              aria-label="Slide suivant"
            >
              <svg className="w-5 h-5 text-[hsl(var(--ocean-deep))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {expertises.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-8 bg-[hsl(var(--ocean-primary))]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Besoin d'un accompagnement personnalisé sur un ou plusieurs de ces domaines ?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-[hsl(var(--ocean-primary))] hover:bg-[hsl(var(--ocean-deep))] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Parlons de vos objectifs Amazon
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

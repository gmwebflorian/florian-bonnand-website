'use client';

const caseStudies = [
  {
    category: 'Aides culinaires',
    challenge: 'CA en baisse, Faible visibilité organique, TACOS trop élevé pour assurer une marge suffisante.',
    results: [
      { label: 'CA', value: 'Stabilisé', trend: 'up' },
      { label: 'TACOS', value: '-8%', trend: 'down' },
      { label: '% des ventes Organiques', value: '+12%', trend: 'up' },
    ],
    actions: [
      'Refonte complète du catalogue avec SEO optimisé',
      'Restructuration des campagnes Amazon Ads',
      'Création de visuels produits et contenus A+',
      'Stratégie de mots-clés longue traîne',
    ],
    duration: '8 mois',
  },
  {
    category: 'Compléments Alimentaires',
    challenge: 'Développement du canal de vente marketplace pour consolider la présence en ligne de la marque',
    results: [
      { label: 'Nouveaux marchés', value: '4 pays', trend: 'up' },
      { label: 'CA Global', value: '+5M€', trend: 'up' },
      { label: 'Largeur de catalogue', value: '1200 ASINS', trend: 'up' },
    ],
    actions: [
      'Mise en place de la stratégie commerciale',
      'Optimisation du catalogue et des assets visuels',
      'Pilotage des campagnes Ads',
      'Suivi du P&L et de la rentabilité',
    ],
    duration: '5 ans',
  },
  {
    category: 'Produits évenementiels B2B',
    challenge: 'Catalogue non optimisé, difficultés à développer les ventes et le CA',
    results: [
      { label: 'Evolution du CA', value: '+19%', trend: 'up' },
      { label: 'Quality Score Moyen des fiches', value: '+4,1/10', trend: 'up' },
      { label: 'Marge opérationnelle', value: 'Maintenue', trend: 'up' },
    ],
    actions: [
      'Audit complet du catalogue et restructuration',
      'Optimisation des visuels et SEO',
      'Création des variations',
      'Suivi et résolutions des blocages produits / compte',
    ],
    duration: '1 an',
  },
];

export function References() {
  return (
    <section id="references" className="py-24 bg-[hsl(var(--cream))]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[hsl(var(--ocean-primary))]" />
            <span className="text-[hsl(var(--ocean-primary))] font-semibold uppercase tracking-wider text-sm">
              Références
            </span>
            <div className="h-px w-12 bg-[hsl(var(--ocean-primary))]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--ocean-deep))] mb-6">
            Résultats Concrets, Marques Accompagnées
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment j'ai aidé des marques à atteindre leurs objectifs Amazon
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-[hsl(var(--sand))]"
            >
              <div className="grid md:grid-cols-[300px_1fr] gap-0">
                <div className="bg-gradient-to-br from-[hsl(var(--ocean-primary))] to-[hsl(var(--ocean-light))] p-8 text-white">
                  <div className="mb-4">
                    <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                      Étude de cas #{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {study.category}
                  </h3>

                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider text-white/70 mb-2">Défi initial</p>
                    <p className="text-sm leading-relaxed text-white/90">
                      {study.challenge}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <p className="text-xs uppercase tracking-wider text-white/70 mb-1">Durée</p>
                    <p className="font-semibold">{study.duration}</p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="text-sm uppercase tracking-wider text-[hsl(var(--ocean-primary))] font-semibold mb-4">
                      Résultats obtenus
                    </h4>
                    <div className="reference-results-container">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="reference-result-item text-center px-4 py-3">
                          <div className={`text-3xl font-bold mb-2 ${
                            result.trend === 'up' ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {result.value}
                          </div>
                          <div className="text-xs text-gray-600 uppercase leading-tight">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-[hsl(var(--ocean-primary))] font-semibold mb-3">
                      Actions menées
                    </h4>
                    <ul className="space-y-2">
                      {study.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <svg className="w-5 h-5 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white rounded-xl p-8 shadow-lg">
          <p className="text-lg text-gray-700 mb-2">
            Votre marque mérite aussi des résultats exceptionnels
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Confidentialité oblige, certains détails ont été anonymisés
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-[hsl(var(--ocean-primary))] hover:bg-[hsl(var(--ocean-deep))] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Parlons de vos objectifs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import Image from 'next/image';

export function ArticleCTA() {
  return (
    <div className="my-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-10 shadow-2xl border border-blue-500/30 relative">
      {/* Photo de profil en pastille - positionnée à droite */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-12">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-1.5 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <Image
                src="/images/florian-bonnand-profile.png"
                alt="Florian Bonnand - Consultant Amazon"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badge "Offre gratuite" */}
      <div className="inline-block bg-[#FFD700] text-blue-900 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
        🎁 OFFRE GRATUITE
      </div>

      {/* Titre principal */}
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
        Votre fiche produit est-elle optimisée à 100% ?
      </h3>

      {/* Sous-titre */}
      <p className="text-lg text-white/90 mb-6">
        Je vous offre un <strong className="text-[#FFD700]">audit gratuit</strong> de votre listing Amazon :
      </p>

      {/* Liste des bénéfices */}
      <ul className="space-y-3 mb-8">
        <li className="flex items-start text-white/95">
          <svg className="w-6 h-6 text-[#FFD700] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span><strong className="text-white font-semibold">Analyse du produit de votre choix</strong> – diagnostic complet</span>
        </li>
        <li className="flex items-start text-white/95">
          <svg className="w-6 h-6 text-[#FFD700] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span><strong className="text-white font-semibold">Points d'amélioration prioritaires</strong> – actions concrètes</span>
        </li>
      </ul>

      {/* Bouton CTA */}
      <Link
        href="https://florian-bonnand.eu/#contact"
        className="inline-block w-full md:w-auto bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-blue-900 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-center"
      >
        🚀 Demander mon audit gratuit
      </Link>

      {/* Note de réassurance */}
      <p className="text-sm text-white/70 mt-4 text-center md:text-left">
        Sans engagement • Réponse sous 24h • Confidentiel
      </p>
    </div>
  );
}

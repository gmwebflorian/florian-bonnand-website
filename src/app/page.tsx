import Script from 'next/script';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Expertises } from '@/components/sections/expertises';
import { Method } from '@/components/sections/method';
import { References } from '@/components/sections/references';
import { LatestBlogPost } from '@/components/sections/latest-blog-post';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  // Schema WebSite avec SearchAction pour la barre de recherche Google
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Florian Bonnand - Consultant Amazon Marketplace",
    "alternateName": "Florian Bonnand Consulting",
    "url": "https://florian-bonnand.eu",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://florian-bonnand.eu/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Schema Organization pour l'identité de l'entreprise
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Florian Bonnand Consulting",
    "legalName": "Florian Bonnand - Consultant Amazon Marketplace",
    "url": "https://florian-bonnand.eu",
    "logo": "https://florian-bonnand.eu/images/florian-bonnand-profile.png",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Florian Bonnand",
      "jobTitle": "Consultant Amazon Marketplace",
      "image": "https://florian-bonnand.eu/images/florian-bonnand-profile.png"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-6-34-87-70-67",
      "contactType": "Customer Service",
      "email": "contact@florian-bonnand.eu",
      "areaServed": "FR",
      "availableLanguage": "French"
    },
    "sameAs": [
      "https://www.linkedin.com/in/florian-bonnand"
    ]
  };

  // Schema ProfessionalService détaillé
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Florian Bonnand - Consultant Amazon",
    "description": "Expert Amazon freelance spécialisé dans l'accompagnement des marques françaises sur Amazon Marketplace",
    "url": "https://florian-bonnand.eu",
    "telephone": "+33634877067",
    "email": "contact@florian-bonnand.eu",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressLocality": "France"
    },
    "founder": {
      "@type": "Person",
      "name": "Florian Bonnand",
      "jobTitle": "Consultant Amazon Marketplace",
      "description": "Ancien vendeur Amazon devenu expert consultant freelance"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "serviceType": [
      "Consultant Amazon",
      "Amazon Ads",
      "Optimisation catalogue Amazon",
      "Stratégie marketplace",
      "Développement international Amazon"
    ],
    "priceRange": "€€",
    "knowsAbout": [
      "Amazon Marketplace",
      "Amazon Ads",
      "SEO Amazon",
      "E-commerce",
      "Marketplace Strategy"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de conseil Amazon",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Amazon Ads - Gestion de campagnes",
            "description": "Optimisation et pilotage de vos campagnes publicitaires Amazon"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Optimisation de catalogue Amazon",
            "description": "SEO Amazon, fiches produits, Brand Store et A+ Content"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Conseil stratégique marketplace",
            "description": "Audit, roadmap et accompagnement direction e-commerce"
          }
        }
      ]
    }
  };

  return (
    <>
      {/* Schema WebSite pour la recherche Google */}
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Schema Organization pour l'identité */}
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Schema ProfessionalService pour les services */}
      <Script
        id="structured-data-professional"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Expertises />
        <Method />
        <References />
        <LatestBlogPost />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

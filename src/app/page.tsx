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
    ]
  };

  return (
    <>
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

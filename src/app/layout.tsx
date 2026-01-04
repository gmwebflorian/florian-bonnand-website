import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Florian Bonnand - Consultant Amazon Freelance | Expert Marketplace E-commerce",
  description: "Expert Amazon freelance, j'accompagne les marques françaises vers le succès sur Amazon : optimisation catalogue, Amazon Ads, stratégie marketplace et développement international. Vision terrain d'ancien vendeur.",
  keywords: [
    "consultant Amazon freelance",
    "expert Amazon France",
    "accompagnement marketplace B2B",
    "optimisation catalogue Amazon",
    "Amazon Ads",
    "stratégie marketplace",
    "consultant e-commerce",
    "expert marketplace",
    "développement Amazon international",
    "SEO Amazon",
  ],
  authors: [{ name: "Florian Bonnand" }],
  openGraph: {
    title: "Florian Bonnand - Consultant Amazon Freelance",
    description: "Accompagnement expert des marques sur Amazon. Vision terrain, résultats concrets, stratégie sur-mesure.",
    type: "website",
    locale: "fr_FR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NTJSXG76');
            `,
          }}
        />
      </head>
      <ClientBody className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NTJSXG76"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </ClientBody>
    </html>
  );
}
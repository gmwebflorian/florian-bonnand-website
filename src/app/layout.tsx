import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <ClientBody className={inter.className}>{children}</ClientBody>
    </html>
  );
}

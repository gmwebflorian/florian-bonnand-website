/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],
  async redirects() {
    return [
      {
        source: '/blog/fiche-produit-amazon-checklist-optimiser-listings',
        destination: '/blog/fiche-produit-amazon-checklist',
        permanent: true,
      },
      // Redirections des anciens sitemaps WordPress vers le nouveau sitemap Next.js
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/post-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/page-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "wp.florian-bonnand.eu",  // ← Ajouté pour WordPress
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      // ← Ajouté pour WordPress
      {
        protocol: "https",
        hostname: "wp.florian-bonnand.eu",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
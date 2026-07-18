import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://florian-bonnand.eu'

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // TODO: Ajouter les articles de blog dynamiquement via GraphQL
  // Pour l'instant, on retourne les pages statiques
  // Dans la Phase 3, on pourra ajouter les posts du blog automatiquement

  return staticPages
}

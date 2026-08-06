import { MetadataRoute } from 'next'
import createApolloClient from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        slug
        modified
      }
    }
  }
`

interface PostNode {
  slug: string
  modified: string
}

interface PostsData {
  posts: {
    nodes: PostNode[]
  }
}

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

  // Pages de catégories
  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/categorie/catalogue`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/categorie/amazon-ads`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/categorie/conformite`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/categorie/logistique-fba`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Récupérer les articles de blog dynamiquement
  try {
    const client = createApolloClient()

    // Timeout de 5 secondes pour éviter de bloquer le sitemap
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('GraphQL timeout')), 5000)
    )

    const queryPromise = client.query<PostsData>({
      query: GET_ALL_POSTS,
    })

    const { data } = await Promise.race([queryPromise, timeoutPromise]) as any

    if (!data || !data.posts || !data.posts.nodes) {
      console.warn('No blog posts found, returning static pages only')
      return [...staticPages, ...categoryPages]
    }

    const blogPosts: MetadataRoute.Sitemap = data.posts.nodes.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...categoryPages, ...blogPosts]
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    // Retourner au minimum les pages statiques et catégories
    return [...staticPages, ...categoryPages]
  }
}

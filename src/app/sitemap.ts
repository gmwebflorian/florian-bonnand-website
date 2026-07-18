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

  // Récupérer les articles de blog dynamiquement
  try {
    const client = createApolloClient()
    const { data } = await client.query<PostsData>({
      query: GET_ALL_POSTS,
    })

    if (!data || !data.posts || !data.posts.nodes) {
      return staticPages
    }

    const blogPosts: MetadataRoute.Sitemap = data.posts.nodes.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...blogPosts]
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    return staticPages
  }
}

import createApolloClient from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import Link from 'next/link';

const GET_LATEST_POST = gql`
  query GetLatestPost {
    posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        excerpt
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
    }>;
  };
}

export async function LatestBlogPost() {
  const client = createApolloClient();

  let post: Post | null = null;

  try {
    const { data } = await client.query<{ posts: { nodes: Post[] } }>({
      query: GET_LATEST_POST,
    });

    post = data?.posts?.nodes?.[0] || null;
  } catch (error) {
    console.error('Error fetching latest blog post:', error);
    return null;
  }

  if (!post) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[hsl(var(--ocean-primary))] to-[hsl(var(--ocean-deep))]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[hsl(var(--gold))]" />
            <span className="text-[hsl(var(--gold))] font-semibold uppercase tracking-wider text-sm">
              Dernier Article
            </span>
            <div className="h-px w-12 bg-[hsl(var(--gold))]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nouveau sur le blog
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 max-w-3xl mx-auto">
          <div className="p-8 md:p-12 text-center">
            {post.categories?.nodes?.[0] && (
              <span className="inline-block bg-[hsl(var(--ocean-primary))] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                {post.categories.nodes[0].name}
              </span>
            )}

            <h3 className="text-2xl md:text-3xl font-bold text-[hsl(var(--ocean-deep))] mb-4 leading-tight">
              {post.title}
            </h3>

            <div
              className="text-gray-600 mb-6 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 bg-[hsl(var(--ocean-primary))] hover:bg-[hsl(var(--ocean-deep))] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Lire l'article
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Lien vers tous les articles */}
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white hover:text-[hsl(var(--gold))] font-semibold transition-colors"
          >
            Voir tous les articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

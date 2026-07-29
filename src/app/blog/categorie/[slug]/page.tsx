import createApolloClient from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Mapping des slugs de catégories
const CATEGORIES = {
  'catalogue': {
    name: 'Catalogue',
    slug: 'catalogue',
    icon: '🎯',
    description: 'SEO & fiches produits'
  },
  'amazon-ads': {
    name: 'Amazon Ads',
    slug: 'amazon-ads',
    icon: '📊',
    description: 'Stratégies publicitaires'
  },
  'conformite': {
    name: 'Conformité',
    slug: 'conformite',
    icon: '✅',
    description: 'Règles & réglementations'
  },
  'logistique-fba': {
    name: 'Logistique FBA',
    slug: 'logistique-fba',
    icon: '📦',
    description: 'Gestion stocks & expéditions'
  }
} as const;

type CategorySlug = keyof typeof CATEGORIES;

const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($categoryName: String!) {
    posts(where: { categoryName: $categoryName }, first: 100) {
      nodes {
        id
        title
        slug
        excerpt
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: {
    node: {
      name: string;
    };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = CATEGORIES[slug as CategorySlug];

  if (!categoryData) {
    return { title: 'Catégorie non trouvée' };
  }

  return {
    title: `${categoryData.name} - Blog Amazon Marketplace`,
    description: `Découvrez tous nos articles sur ${categoryData.name} : ${categoryData.description}`,
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categoryData = CATEGORIES[slug as CategorySlug];

  if (!categoryData) {
    notFound();
  }

  const client = createApolloClient();

  const { data } = await client.query<{ posts: { nodes: Post[] } }>({
    query: GET_POSTS_BY_CATEGORY,
    variables: { categoryName: categoryData.name },
  });

  const posts: Post[] = data?.posts?.nodes || [];

  return (
    <>
      <Header />

      <main className="relative min-h-screen py-20 overflow-x-hidden">
        <div className="absolute inset-0 ocean-gradient opacity-95" />

        <div className="relative z-10 container mx-auto px-4 max-w-full">
          <div className="max-w-4xl mx-auto mb-16">
            <Link
              href="/blog"
              className="inline-flex items-center text-white hover:text-[#FFD700] mb-6 transition-colors"
            >
              ← Retour au blog
            </Link>

            {/* En-tête de catégorie */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{categoryData.icon}</span>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    {categoryData.name}
                  </h1>
                  <p className="text-lg text-white/80 mt-2">{categoryData.description}</p>
                </div>
              </div>
              <p className="text-white/70 mt-4">
                {posts.length} {posts.length > 1 ? 'articles' : 'article'}
              </p>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-12 text-center max-w-2xl mx-auto">
              <p className="text-white/90 text-lg mb-6">
                Aucun article dans cette catégorie pour le moment.
              </p>
              <Link
                href="/blog"
                className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-[hsl(var(--ocean-deep))] font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Voir tous les articles →
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {post.featuredImage && (
                    <div className="relative h-56 w-full bg-slate-200">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <div
                      className="text-slate-600 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />

                    <div className="flex items-center justify-between text-sm text-slate-500 border-t pt-4">
                      <span className="font-medium">{post.author.node.name}</span>
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
                      className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Lire l'article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

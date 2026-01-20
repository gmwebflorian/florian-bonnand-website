import createApolloClient from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// ✅ REQUÊTE POUR RÉCUPÉRER UN ARTICLE
const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      date
      slug
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
      seo {
        title
        metaDesc
      }
    }
  }
`;

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
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
  seo?: {
    title?: string;
    metaDesc?: string;
  };
}

interface Props {
  params: {
    slug: string;
  };
}

// ✅ GÉNÉRATION DES METADATA SEO DYNAMIQUES
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createApolloClient();
  
  try {
    const { data } = await client.query<{ post: Post }>({
      query: GET_POST_BY_SLUG,
      variables: { slug: params.slug },
    });

    const post = data?.post;

    if (!post) {
      return {
        title: 'Article non trouvé',
      };
    }

    return {
      title: post.seo?.title || post.title,
      description: post.seo?.metaDesc || post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
      openGraph: {
        title: post.seo?.title || post.title,
        description: post.seo?.metaDesc || post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
        images: post.featuredImage ? [post.featuredImage.node.sourceUrl] : [],
        type: 'article',
      },
    };
  } catch (error) {
    return {
      title: 'Article non trouvé',
    };
  }
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const client = createApolloClient();

  let post: Post | null = null;

  try {
    const { data } = await client.query<{ post: Post }>({
      query: GET_POST_BY_SLUG,
      variables: { slug: params.slug },
    });

    post = data?.post;
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="relative min-h-screen py-20">
        {/* ✅ FOND BLEU IDENTIQUE */}
        <div className="absolute inset-0 ocean-gradient opacity-95" />

        {/* ✅ CONTENU */}
        <div className="relative z-10 container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            {/* ✅ BREADCRUMB / RETOUR */}
            <Link
              href="/blog"
              className="inline-flex items-center text-white hover:text-[#FFD700] mb-8 transition-colors"
            >
              ← Retour aux articles
            </Link>

            {/* ✅ IMAGE MISE EN AVANT */}
            {post.featuredImage && (
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8 shadow-2xl">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* ✅ HEADER ARTICLE */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="font-medium">{post.author.node.name}</span>
                <span>•</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </header>

            {/* ✅ CONTENU DE L'ARTICLE */}
            <div
              className="prose prose-lg prose-invert max-w-none
                prose-headings:text-white
                prose-p:text-white/90
                prose-a:text-[#FFD700] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-bold
                prose-ul:text-white/90
                prose-ol:text-white/90
                prose-li:text-white/90
                prose-blockquote:border-l-[#FFD700] prose-blockquote:text-white/80
                prose-code:text-[#FFD700] prose-code:bg-white/10 prose-code:px-1 prose-code:rounded
                prose-pre:bg-white/10 prose-pre:border prose-pre:border-white/20
                prose-img:rounded-lg prose-img:shadow-xl
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ✅ FOOTER ARTICLE - RETOUR */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <Link
                href="/blog"
                className="inline-flex items-center text-white hover:text-[#FFD700] transition-colors font-semibold"
              >
                ← Voir tous les articles
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
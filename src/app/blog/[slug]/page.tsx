import createApolloClient from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getRankMathSEO(url: string) {
  try {
    const response = await fetch(
      `https://wp.florian-bonnand.eu/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.error('RankMath API error:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (!data.success || !data.head) {
      return null;
    }

    const head = data.head;
    
    const titleMatch = head.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : null;

    const descMatch = head.match(/<meta name="description" content="(.*?)"/);
    const description = descMatch ? descMatch[1] : null;

    const ogTitleMatch = head.match(/<meta property="og:title" content="(.*?)"/);
    const ogTitle = ogTitleMatch ? ogTitleMatch[1] : null;

    const ogDescMatch = head.match(/<meta property="og:description" content="(.*?)"/);
    const ogDescription = ogDescMatch ? ogDescMatch[1] : null;

    const ogImageMatch = head.match(/<meta property="og:image" content="(.*?)"/);
    const ogImage = ogImageMatch ? ogImageMatch[1] : null;

    const canonicalMatch = head.match(/<link rel="canonical" href="(.*?)"/);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;

    return {
      title,
      description,
      ogTitle,
      ogDescription,
      ogImage,
      canonical,
    };
  } catch (error) {
    console.error('Error fetching RankMath SEO:', error);
    return null;
  }
}

// ✅ AWAIT params avant de l'utiliser
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = createApolloClient();
  
  try {
    const { data } = await client.query<{ post: Post }>({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });

    const post = data?.post;

    if (!post) {
      return {
        title: 'Article non trouvé',
      };
    }

    const postUrl = `https://florian-bonnand.eu/blog/${post.slug}`;
    const seoData = await getRankMathSEO(postUrl);

    return {
      title: seoData?.title || post.title,
      description: seoData?.description || post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
      openGraph: {
        title: seoData?.ogTitle || seoData?.title || post.title,
        description: seoData?.ogDescription || seoData?.description || post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
        images: seoData?.ogImage || post.featuredImage?.node.sourceUrl ? [seoData?.ogImage || post.featuredImage?.node.sourceUrl] : [],
        type: 'article',
        locale: 'fr_FR',
        publishedTime: post.date,
        authors: [post.author.node.name],
      },
      alternates: {
        canonical: seoData?.canonical || postUrl,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article non trouvé',
    };
  }
}

export const revalidate = 60;

// ✅ AWAIT params avant de l'utiliser
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const client = createApolloClient();

  let post: Post | null = null;

  try {
    const { data } = await client.query<{ post: Post }>({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });

    post = data?.post || null;
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
        <div className="absolute inset-0 ocean-gradient opacity-95" />

        <div className="relative z-10 container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-white hover:text-[#FFD700] mb-8 transition-colors"
            >
              ← Retour aux articles
            </Link>

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

<div
  className="prose prose-lg prose-invert max-w-none
    [&>*]:text-white/90
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
  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
  dangerouslySetInnerHTML={{ __html: post.content }}
/>

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
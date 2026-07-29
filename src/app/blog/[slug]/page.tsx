import createApolloClient from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
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

  // Structured Data pour l'article
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.featuredImage?.node.sourceUrl,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.node.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Florian Bonnand Consulting",
      "logo": {
        "@type": "ImageObject",
        "url": "https://florian-bonnand.eu/images/Expert Amazon Marketplace.webp"
      }
    },
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://florian-bonnand.eu/blog/${post.slug}`
    }
  };

  return (
    <>
      <Script
        id="structured-data-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <Header />

      <main className="relative min-h-screen py-20">
        <div className="absolute inset-0 ocean-gradient opacity-95" />

        <div className="relative z-10 container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-white hover:text-[#FFD700] mb-4 transition-colors"
            >
              ← Retour aux articles
            </Link>

            {/* Breadcrumbs with structured data */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol
                itemScope
                itemType="https://schema.org/BreadcrumbList"
                className="flex items-center space-x-2 text-sm text-white/80"
              >
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/" itemProp="item" className="hover:text-[#FFD700] transition-colors">
                    <span itemProp="name">Accueil</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <span className="text-white/50">/</span>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/blog" itemProp="item" className="hover:text-[#FFD700] transition-colors">
                    <span itemProp="name">Blog</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <span className="text-white/50">/</span>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span itemProp="name" className="text-white font-medium truncate max-w-md">
                    {post.title}
                  </span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

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

            {/* En-tête de l'article */}
            <header className="mb-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{post.author.node.name}</span>
                </div>
                <span className="text-white/50">•</span>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </header>

            {/* Contenu de l'article avec effet vitré */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mb-4 prose-headings:mt-8
                  prose-h2:text-3xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:text-blue-900 prose-h3:mt-8 prose-h3:mb-4
                  prose-h4:text-xl prose-h4:text-slate-800 prose-h4:mt-6 prose-h4:mb-3
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                  prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-800
                  prose-strong:text-slate-900 prose-strong:font-bold
                  prose-em:text-slate-800 prose-em:italic
                  prose-ul:my-6 prose-ul:space-y-2 prose-ul:text-slate-700
                  prose-ol:my-6 prose-ol:space-y-2 prose-ol:text-slate-700
                  prose-li:text-slate-700 prose-li:leading-relaxed prose-li:text-lg
                  prose-li::marker:text-blue-600 prose-li::marker:font-bold
                  prose-blockquote:border-l-4 prose-blockquote:border-[#FFD700] prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-700 prose-blockquote:my-8
                  prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-base prose-code:before:content-[''] prose-code:after:content-['']
                  prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:shadow-lg
                  prose-img:rounded-xl prose-img:shadow-xl prose-img:my-8 prose-img:border prose-img:border-slate-200
                  prose-table:border-collapse prose-table:my-8 prose-table:w-full
                  prose-thead:bg-blue-600 prose-thead:text-white
                  prose-th:p-4 prose-th:text-left prose-th:font-bold
                  prose-td:p-4 prose-td:border prose-td:border-slate-200
                  prose-tr:even:bg-slate-50
                  prose-hr:my-12 prose-hr:border-slate-300
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

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
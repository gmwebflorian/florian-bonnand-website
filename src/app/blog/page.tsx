import createApolloClient from '@/lib/apollo-client';
import { GET_ALL_POSTS } from '@/lib/queries';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';

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

// ✅ BALISES SEO OPTIMISÉES pour "actualités Amazon"
export const metadata: Metadata = {
  title: "Actualités Amazon Marketplace | News & Conseils Vendeurs Amazon",
  description: "Suivez les dernières actualités Amazon marketplace : mises à jour vendeurs, nouveautés Amazon Ads, stratégies e-commerce et conseils d'expert pour optimiser vos ventes sur Amazon.",
  keywords: [
    "actualités Amazon",
    "actualités vendeurs Amazon",
    "news marketplace Amazon",
    "actualités Amazon Ads",
    "mises à jour Amazon",
    "conseils vendeurs Amazon",
    "blog Amazon marketplace",
    "nouveautés Amazon France",
  ],
  openGraph: {
    title: "Actualités Amazon Marketplace | Blog Expert Vendeurs",
    description: "Les dernières actualités et conseils pour vendeurs Amazon : mises à jour, stratégies et tips d'expert marketplace.",
    type: "website",
    locale: "fr_FR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const client = createApolloClient();
  
  const { data } = await client.query<{ posts: { nodes: Post[] } }>({
    query: GET_ALL_POSTS,
  });

  const posts: Post[] = data?.posts?.nodes || [];

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-20">
        <div className="container mx-auto px-4">
          {/* ✅ SECTION INTRO SEO - Riche en mots-clés */}
          <div className="max-w-4xl mx-auto mb-16">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
            >
              ← Retour à l'accueil
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Actualités Amazon Marketplace & Conseils Vendeurs
            </h1>
            
            <div className="text-lg text-slate-700 space-y-4 leading-relaxed">
              <p>
                Bienvenue sur mon blog dédié aux <strong>actualités Amazon marketplace</strong>. 
                En tant que consultant Amazon freelance, je partage ici les dernières 
                <strong> mises à jour pour les vendeurs Amazon</strong>, mes analyses des 
                nouveautés Amazon Ads, et mes conseils pratiques pour optimiser vos performances 
                sur la plateforme.
              </p>
              
              <p>
                Que vous cherchiez des <strong>actualités vendeurs Amazon</strong>, des stratégies 
                pour améliorer votre catalogue, ou des tips sur Amazon Ads, vous trouverez ici 
                des articles basés sur mon expérience terrain et ma veille quotidienne du marketplace.
              </p>
            </div>

            {/* ✅ SECTION CATÉGORIES - Bon pour le SEO */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-1">📰 Actualités</h3>
                <p className="text-sm text-slate-600">News & mises à jour</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-1">💡 Conseils</h3>
                <p className="text-sm text-slate-600">Tips & stratégies</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-1">📊 Amazon Ads</h3>
                <p className="text-sm text-slate-600">Optimisation pub</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-1">🎯 Catalogue</h3>
                <p className="text-sm text-slate-600">SEO & fiches produits</p>
              </div>
            </div>
          </div>

          {/* ✅ H2 OPTIMISÉ pour structure SEO */}
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Derniers articles du blog Amazon
          </h2>

          {posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-2xl mx-auto">
              <p className="text-slate-600 text-lg mb-6">
                Aucun article pour le moment.
              </p>
              <a 
                href="https://wp.florian-bonnand.eu/wp-admin" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Créer un article →
              </a>
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
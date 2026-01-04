import createApolloClient from '@/lib/apollo-client';
import { GET_ALL_POSTS } from '@/lib/queries';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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
          <div className="text-center mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              ← Retour à l'accueil
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Blog Maritime
            </h1>
            <p className="text-xl text-slate-600">
              Actualités et analyses du secteur maritime
            </p>
          </div>

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
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

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
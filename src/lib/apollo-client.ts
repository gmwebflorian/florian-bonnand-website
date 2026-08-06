import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
      fetchOptions: {
        timeout: 8000, // 8 secondes timeout pour toutes les requêtes
      },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache', // Éviter les problèmes de cache
        errorPolicy: 'all',
      },
    },
  });
};

export default createApolloClient;
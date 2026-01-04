import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
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
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      excerpt
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
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export const GET_ALL_POSTS_SLUGS = gql`
  query GetAllPostsSlugs {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;
import axios from 'axios';

import Settings from 'settings';
import { Post } from 'types';

const POSTDATA = (size: string) => `
  id
  title
  date
  modified
  slug
  featuredImage {
    node {
      altText
      mediaType
      uri
      sourceUrl(size: ${size})
    }
  }
  author {
    node {
      id
      name
      description
    }
  }
  excerpt
  content
`;

export const getFeaturedPost = async (): Promise<Post> => {
  const response = await axios.request({
    url: `${Settings.WORDPRESS_URL}graphql`,
    method: 'post',
    data: {
      query: `
            query Post {
              posts (first:1) {
                nodes {
                  ${POSTDATA('LARGE')}
                }
              }
            }\
      `,
    },
  });

  return response.data.data.posts.nodes[0];
};

export const getPosts = async (limit?: number): Promise<Post[]> => {
  const response = await axios.request({
    url: `${Settings.WORDPRESS_URL}graphql`,
    method: 'post',
    data: {
      query: `
            query Posts {
              posts (first:${limit || 10}, where:{ orderby: { field:DATE, order:DESC } }) {
                nodes {
                  ${POSTDATA('THUMBNAIL')}
                }
              }
            }\
      `,
    },
  });

  return response.data.data.posts.nodes;
};

export const getPost = async (slug: string): Promise<Post | null> => {
  try {
    const response = await axios.request({
      url: `${Settings.WORDPRESS_URL}graphql`,
      method: 'post',
      data: {
        query: `
            query Post {
              post(id:"${slug}", idType:SLUG) {
                ${POSTDATA('LARGE')}
              }
            }
      `,
      },
    });

    const post: Post = response.data.data.post;

    post.excerpt = post.excerpt.replace(/\s/g, ' ');
    post.content = post.content.replace(/\s/g, ' ');
    post.content = post.content.replace(/&nbsp;/g, ' ');

    return post;
  } catch (e) {
    return null;
  }
};

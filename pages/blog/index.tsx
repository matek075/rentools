import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import Settings from 'settings';
import { Post } from 'types';
import { getFeaturedPost, getPosts } from 'utils/blog/posts';
import Blog from 'containers/Blog';

interface OwnProps {
  featuredPost: Post;
  posts: Post[];
}

export const getStaticProps: GetStaticProps<OwnProps> = async () => {
  const featuredPost = await getFeaturedPost();
  const posts = await getPosts(900);

  return {
    props: {
      featuredPost,
      posts,
    },
  };
};

const BlogPage: React.FC<OwnProps> = ({ posts, featuredPost }) => {
  const title = 'Blog | rentools.pl';
  const description = 'Dawka informacji dla każdego majsterkowicza';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={Settings.BASE_URL + 'blog'}
        openGraph={{
          title,
          description,
          images: [
            {
              url: 'https://rentools-files.s3.eu-central-1.amazonaws.com/files/opengraph.jpg',
              alt: 'Rentools logo',
            },
          ],
        }}
      />
      <Blog posts={posts} featuredPost={featuredPost} />
    </>
  );
};

export default BlogPage;

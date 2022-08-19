import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { Post } from 'types';
import { getPost, getPosts } from 'utils/blog/posts';
import { removeTags } from 'utils/text';
import BlogPost from 'containers/BlogPost';
import Settings from 'settings';

interface OwnProps {
  post: Post;
}

export const getStaticProps: GetStaticProps<OwnProps> = async (ctx) => {
  const slug = ctx.params?.slug as string;

  const post = await getPost(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 100000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: 'blocking',
  };
};

const PostPage: React.FC<OwnProps> = ({ post }) => {
  return (
    <>
      <NextSeo
        title={post.title + ' | Rentools Blog'}
        description={removeTags(post.excerpt)}
        canonical={`${Settings.BASE_URL}blog/${post.slug}`}
        openGraph={{
          url: `${Settings.BASE_URL}blog/${post.slug}`,
          locale: 'pl',
          images: [
            {
              url: post.featuredImage.node.sourceUrl,
              alt: post.featuredImage.node.altText,
            },
          ],
          article: {
            publishedTime: (post.date as any) as string,
            modifiedTime: (post.modified as any) as string,
          },
        }}
      />
      <BlogPost post={post} />
    </>
  );
};

export default PostPage;

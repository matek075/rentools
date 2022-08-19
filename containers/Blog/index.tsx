import React from 'react';

import { Post } from 'types';
import Default from 'components/layouts/Landing';
import FeaturedPost from 'containers/Blog/components/FeaturedPost';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Container from 'components/ui/Container';
import PostCard from 'containers/Blog/components/PostCard';

import css from './styles.module.scss';

interface OwnProps {
  featuredPost: Post;
  posts: Post[];
}

const Blog: React.FC<OwnProps> = ({ posts, featuredPost }) => {
  return (
    <Default>
      <Container>
        <Breadcrumbs
          items={[
            {
              name: 'Blog',
              url: '/blog',
            },
          ]}
        />
      </Container>
      <FeaturedPost post={featuredPost} />
      <Container className={css.blog}>
        <div className={css.posts}>
          {posts.map((post) => (
            <div className={css.post} key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </Default>
  );
};

export default Blog;

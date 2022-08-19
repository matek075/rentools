import React from 'react';
import Link from 'next/link';

import Button from 'components/ui/Button';
import PostCard from 'containers/Blog/components/PostCard';
import { Post } from 'types';

import css from './styles.module.scss';

interface OwnProps {
  posts: Post[];
}

const BlogPosts: React.FC<OwnProps> = ({ posts }) => {
  return (
    <div>
      <h3>Ciekawostki z naszego bloga</h3>
      <div className={css.posts}>
        {posts.map((post) => (
          <div key={post.id} className={css.post}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
      <div className={css.cta}>
        <Link href="/blog">
          <Button as="a" color="tertiary" size="md" className="mt-8">
            Przejdź do bloga
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogPosts;

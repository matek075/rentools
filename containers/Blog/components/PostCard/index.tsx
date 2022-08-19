import React from 'react';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';
import Image from 'next/image';

import { Post } from 'types';

import css from './styles.module.scss';

interface OwnProps {
  post: Post;
}

const PostCard: React.FC<OwnProps> = ({ post }) => {
  return (
    <div className={css.container}>
      <Link href={`/blog/${post.slug}`}>
        <a>
          <Image
            src={post.featuredImage.node.sourceUrl}
            width={300}
            unoptimized
            height={150}
            layout="responsive"
            alt={post.title}
            className={css.image}
          />
          <h4 className={css.title}>{post.title}</h4>
          <div className={css.date}>
            <FormattedDate value={post.date} year="numeric" month="long" day="2-digit" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PostCard;

import React from 'react';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';
import Image from 'next/image';

import { Post } from 'types';

import css from './styles.module.scss';

interface OwnProps {
  post: Post;
}

const FeaturedPost: React.FC<OwnProps> = ({ post }) => {
  return (
    <div className={css.wrapper}>
      <Image
        src={post.featuredImage.node.sourceUrl}
        className={css.image}
        layout="fill"
        unoptimized
        objectFit="cover"
        objectPosition="center"
      />
      <div className={css.container}>
        <div className={css.box}>
          <div className={css.content}>
            <Link href={`/blog/${post.slug}`}>
              <a>
                <h4 className={css.title}>{post.title}</h4>
              </a>
            </Link>
            <div className={css.date}>
              <FormattedDate value={post.date} year="numeric" month="long" day="2-digit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;

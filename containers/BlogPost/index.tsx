import React from 'react';
import Image from 'next/image';
import { FormattedDate, FormattedMessage } from 'react-intl';

import Template from 'components/layouts/Landing';
import Container from 'components/ui/Container';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Post } from 'types';

import css from './styles.module.scss';

const POST_CONTAINER_WIDTH = 900;

interface OwnProps {
  post: Post;
}

const BlogPost: React.FC<OwnProps> = ({ post }) => {
  return (
    <Template>
      <Container width={POST_CONTAINER_WIDTH}>
        <Breadcrumbs
          items={[
            {
              name: 'Blog',
              url: '/blog',
            },
            {
              name: post.title,
              url: `/blog/${post.slug}`,
            },
          ]}
        />
      </Container>

      <div className={css.top}>
        <Image
          src={post.featuredImage.node.sourceUrl}
          className={css.image}
          layout="fill"
          unoptimized
          objectFit="cover"
          objectPosition="center"
        />
        <div className={css.titleWrapper}>
          <Container width={POST_CONTAINER_WIDTH}>
            <h1 className={css.title}>{post.title}</h1>
          </Container>
        </div>
      </div>
      <div className={css.bottom}>
        <Container width={POST_CONTAINER_WIDTH}>
          <div className={css.meta}>
            <div className={css.date}>
              <FormattedMessage id="blog.post.added" />{' '}
              <FormattedDate value={post.date} year="numeric" month="long" day="2-digit" />
            </div>
          </div>
          <div className={css.excerpt} dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <div className={css.content} dangerouslySetInnerHTML={{ __html: post.content }} />
        </Container>
      </div>
    </Template>
  );
};

export default BlogPost;

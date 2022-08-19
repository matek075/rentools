import React from 'react';
import { FormattedMessage, FormattedRelativeTime } from 'react-intl';
import clsx from 'clsx';

import { CompanyReview } from 'types';
import Card from 'components/ui/Card';
import Rating from 'components/business/Rating';

import css from './styles.module.scss';

interface OwnProps {
  review: CompanyReview;
}

const Review: React.FC<OwnProps> = ({ review }) => {
  const secondsAgo = React.useMemo(() => {
    const today = new Date();
    const dateCreated = new Date(review.createdAt);

    return (dateCreated.getTime() - today.getTime()) / 1000 / 60 / 60 / 24;
  }, [review.createdAt]);

  return (
    <Card className={css.review}>
      <Rating rating={review.rating} />
      <div className={clsx(css.content, { [css.noReview]: !review.review })}>
        {review.review || <FormattedMessage id="review.noReview" />}
      </div>
      <div className={css.author}>{review.user.name}</div>
      <div className={css.created}>
        <FormattedRelativeTime value={Math.floor(secondsAgo)} unit="day" />
      </div>
    </Card>
  );
};

export default Review;

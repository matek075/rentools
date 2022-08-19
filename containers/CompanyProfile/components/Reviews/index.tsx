import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CompanyReview } from 'types';
import ReviewForm from 'components/form/forms/Review';
import Review from 'components/business/Review';
import { userContext } from 'context/user';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';

import css from './styles.module.scss';

interface OwnProps {
  reviews: CompanyReview[];
  companyId: number;
}

const Reviews: React.FC<OwnProps> = ({ reviews, companyId }) => {
  const router = useRouter();
  const user = React.useContext(userContext);
  const [formOpen, setFormOpen] = React.useState(false);

  return (
    <div className={css.reviews}>
      <h2>
        <FormattedMessage id="products.reviews" />
      </h2>

      {!formOpen ? (
        <div>
          {!user.authenticated ? (
            <div className={css.login}>
              <FormattedMessage
                id="review.logIn"
                values={{
                  login: (
                    <Link href={`/auth/signin?r=${router.asPath}`}>
                      <a className={css.link}>
                        <FormattedMessage id="review.loginText" />
                      </a>
                    </Link>
                  ),
                }}
              />
            </div>
          ) : (
            <Button size="md" onClick={() => setFormOpen(true)}>
              <FormattedMessage id="review.addNew" />
            </Button>
          )}
        </div>
      ) : null}
      {formOpen ? (
        <div className={css.form}>
          <ReviewForm companyId={companyId} />
        </div>
      ) : null}
      {reviews.length ? (
        reviews.map((review) => <Review key={`review-${review.id}`} review={review} />)
      ) : (
        <Card className="mt-5">
          <h6>
            <FormattedMessage id="reviews.noReviews" />
          </h6>
        </Card>
      )}
    </div>
  );
};

export default Reviews;

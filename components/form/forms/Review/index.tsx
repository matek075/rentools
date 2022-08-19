import React from 'react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { FormattedMessage } from 'react-intl';

import Button from 'components/ui/Button';
import Row from 'components/form/fields/Row';
import { applyErrors } from 'utils/formik';
import Rating from 'components/form/fields/Rating';
import Card from 'components/ui/Card';
import Textarea from 'components/form/fields/Textarea';
import { createReview, CreateReviewDto } from 'utils/reviews';

interface OwnProps {
  companyId: number;
}

const Review: React.FC<OwnProps> = ({ companyId }) => {
  const [done, setDone] = React.useState(false);
  const initialValues: CreateReviewDto = {
    rating: null,
    review: '',
    companyId,
  };

  const handleSubmit = async (values: CreateReviewDto, helpers: FormikHelpers<CreateReviewDto>) => {
    try {
      await createReview(values);
      setDone(true);
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  return (
    <Card className="mt-5">
      {!done ? (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(form) => (
            <Form>
              <h5 className="mt-0">Wystaw opinię</h5>
              <Row>
                <Field name="rating" component={Rating} label={<FormattedMessage id="ui.rating" />} />
              </Row>
              <Row>
                <Field name="review" component={Textarea} label={<FormattedMessage id="review.content" />} />
              </Row>
              <Row>
                <Button type="submit" color="primary" block loading={form.isSubmitting} disabled={form.isSubmitting}>
                  <FormattedMessage id="ui.confirm" />
                </Button>
              </Row>
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <strong>
            <FormattedMessage id="reviews.created" />
          </strong>
        </div>
      )}
    </Card>
  );
};

export default Review;

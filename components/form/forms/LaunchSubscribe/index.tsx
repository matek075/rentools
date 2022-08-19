import React from 'react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Input from 'components/form/fields/Input';
import Button from 'components/ui/Button';
import { applyErrors } from 'utils/formik';
import { subscribe } from 'utils/mail';
import Alert from 'components/ui/Alert';

import css from './styles.module.scss';

interface SubscribeDto {
  email: string;
}

const LaunchSubscribe: React.FC = () => {
  const [subscribed, setSubscribed] = React.useState(false);

  const initialValues: SubscribeDto = {
    email: '',
  };

  const handleSubmit = async (values: SubscribeDto, helpers: FormikHelpers<SubscribeDto>) => {
    try {
      await subscribe(values.email);
      setSubscribed(true);
    } catch (e) {
      helpers.setErrors({
        email: ' ',
      });
      applyErrors(e, helpers);
    }
  };

  if (subscribed) {
    return (
      <div>
        <Alert type="success" text="Dzięki, będziemy w kontakcie. 👋" />
      </div>
    );
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(form) => (
        <Form className={css.form}>
          <div className={css.field}>
            <Field name="email" borderless bold shadowed component={Input} placeholder="Podaj adres email" />
          </div>
          <div className={css.button}>
            <Button shadowed round type="submit" color="primary" block loading={form.isSubmitting}>
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LaunchSubscribe;

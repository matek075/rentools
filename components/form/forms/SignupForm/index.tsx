import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import Input from 'components/form/fields/Input';
import Button from 'components/ui/Button';
import Row from 'components/form/fields/Row';
import { signup, SignupPayload } from 'utils/user/signup';
import { applyErrors } from 'utils/formik';
import { UserType } from 'context/user/types';

interface OwnProps {
  userType?: UserType;
}

const SignupForm: React.FC<OwnProps> = ({ userType }) => {
  const router = useRouter();
  const intl = useIntl();

  const initialValues: SignupPayload = {
    email: '',
    password: '',
    name: '',
    surname: '',
    type: userType || UserType.User,
  };

  const handleSubmit = async (values: SignupPayload, helpers: FormikHelpers<SignupPayload>) => {
    helpers.setErrors;
    try {
      await signup(values);
      window.notyf.success({
        message: intl.formatMessage({ id: 'auth.accountCreated' }),
        dismissible: true,
        duration: 0,
      });
      await router.push('/auth/signin');
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
      {(form) => (
        <Form>
          <Row>
            <Field name="email" component={Input} label={<FormattedMessage id="ui.email" />} />
          </Row>
          <Row>
            <Field name="name" component={Input} label={<FormattedMessage id="ui.name" />} />
          </Row>
          <Row>
            <Field name="surname" component={Input} label={<FormattedMessage id="ui.surname" />} />
          </Row>
          <Row>
            <Field name="password" type="password" component={Input} label={<FormattedMessage id="ui.password" />} />
          </Row>
          <Row>
            <Button type="submit" color="primary" block loading={form.isSubmitting}>
              <FormattedMessage id="auth.signup.title" />
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

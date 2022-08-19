import React from 'react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';

import Input from 'components/form/fields/Input';
import Button from 'components/ui/Button';
import Row from 'components/form/fields/Row';
import { signin } from 'utils/user/signin';
import { applyErrors } from 'utils/formik';
import { userContext } from 'context/user';
import { companyContext } from 'context/company';

interface SigninDto {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const user = React.useContext(userContext);
  const company = React.useContext(companyContext);

  const router = useRouter();

  const redirectUrl = typeof router.query.r === 'string' ? router.query.r : undefined;

  const initialValues: SigninDto = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: SigninDto, helpers: FormikHelpers<SigninDto>) => {
    try {
      const result = await signin(values.email, values.password);
      user.signIn(result.data.accessToken);
      await company.loadCompany();

      await router.push(redirectUrl || '/user/dashboard');
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(form) => (
        <Form>
          <Row>
            <Field name="email" component={Input} label={<FormattedMessage id="ui.email" />} />
          </Row>
          <Row>
            <Field name="password" type="password" component={Input} label={<FormattedMessage id="ui.password" />} />
          </Row>
          <Row>
            <Button type="submit" color="primary" block loading={form.isSubmitting} disabled={form.isSubmitting}>
              <FormattedMessage id="auth.signin.title" />
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default SigninForm;

import React from 'react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';

import Input from 'components/form/fields/Input';
import Button from 'components/ui/Button';
import Row from 'components/form/fields/Row';
import { signin } from 'utils/admin/signin';
import { applyErrors } from 'utils/formik';
import { adminContext } from 'context/admin';

interface AdminSigninDto {
  name: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const admin = React.useContext(adminContext);

  const router = useRouter();

  const redirectUrl = typeof router.query.r === 'string' ? router.query.r : undefined;

  const initialValues: AdminSigninDto = {
    name: '',
    password: '',
  };

  const handleSubmit = async (values: AdminSigninDto, helpers: FormikHelpers<AdminSigninDto>) => {
    try {
      const result = await signin(values.name, values.password);
      console.log('res', result);
      admin.signIn(result.data.accessToken);
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  React.useEffect(() => {
    console.log('ADM', admin);
    if (admin.authenticated) {
      router.push(redirectUrl || '/admin');
    }
  }, [admin.authenticated]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(form) => (
        <Form>
          <Row>
            <Field name="name" component={Input} label={<FormattedMessage id="ui.login" />} />
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

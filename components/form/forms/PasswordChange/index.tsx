import React from 'react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';

import Input from 'components/form/fields/Input';
import Button from 'components/ui/Button';
import Row from 'components/form/fields/Row';
import { applyErrors } from 'utils/formik';
import { changePassword, ChangePasswordPayload } from 'utils/user/update';

const PasswordChange: React.FC = () => {
  const intl = useIntl();

  const initialValues: ChangePasswordPayload = {
    oldPassword: '',
    newPassword: '',
    passwordConfirm: '',
  };

  const handleSubmit = async (values: ChangePasswordPayload, helpers: FormikHelpers<ChangePasswordPayload>) => {
    helpers.setErrors;
    try {
      await changePassword(values);
      window.notyf.success(intl.formatMessage({ id: 'auth.accountUpdated' }));
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Row>
            <Field
              name="oldPassword"
              type="password"
              component={Input}
              label={<FormattedMessage id="auth.password" />}
            />
          </Row>
          <Row>
            <Field
              name="newPassword"
              type="password"
              component={Input}
              label={<FormattedMessage id="auth.newPassword" />}
            />
          </Row>
          <Row>
            <Field
              name="passwordConfirm"
              type="password"
              component={Input}
              label={<FormattedMessage id="auth.passwordConfirm" />}
            />
          </Row>
          <Row>
            <Button type="submit" color="primary" block>
              <FormattedMessage id="settings.changePassword" />
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordChange;

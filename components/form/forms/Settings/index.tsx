import React from 'react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';

import Input from 'components/form/fields/Input';
import Button from 'components/ui/Button';
import Row from 'components/form/fields/Row';
import { applyErrors } from 'utils/formik';
import { updateUser, UpdateUserPayload } from 'utils/user/update';
import { User } from 'types';
import { userContext } from 'context/user';

interface OwnProps {
  user: User;
}

const SettingsForm: React.FC<OwnProps> = ({ user }) => {
  const userState = React.useContext(userContext);
  const intl = useIntl();

  const initialValues: UpdateUserPayload = {
    email: user.email,
    name: user.name,
    surname: user.surname,
  };

  const handleSubmit = async (values: UpdateUserPayload, helpers: FormikHelpers<UpdateUserPayload>) => {
    helpers.setErrors;
    try {
      await updateUser(values);
      userState.refresh();
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
            <Field name="email" type="text" component={Input} disabled label={<FormattedMessage id="ui.email" />} />
          </Row>
          <Row>
            <Field name="name" component={Input} label={<FormattedMessage id="ui.name" />} />
          </Row>
          <Row>
            <Field name="surname" component={Input} label={<FormattedMessage id="ui.surname" />} />
          </Row>
          <Row>
            <Button type="submit" color="primary" block>
              <FormattedMessage id="ui.submit" />
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsForm;

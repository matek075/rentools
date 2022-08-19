import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Auth from 'components/layouts/Auth';
import SigninForm from 'components/form/forms/SigninForm';
import Card from 'components/ui/Card';
import OnlyNotAuthenticated from 'components/navigation/routes/OnlyNotAuthenticated';

const Signin: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <OnlyNotAuthenticated>
      <Auth title={formatMessage({ id: 'auth.signin.title' })} isLogin>
        <h1>
          <FormattedMessage id="auth.signin.title" />
        </h1>
        <Card className="mt-7">
          <SigninForm />
        </Card>
      </Auth>
    </OnlyNotAuthenticated>
  );
};

export default Signin;

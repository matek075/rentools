import React from 'react';
import { FormattedMessage } from 'react-intl';

import SigninForm from 'components/form/forms/AdminSigninForm';
import Card from 'components/ui/Card';

const Signin: React.FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{ maxWidth: '400px', position: 'relative', left: '50%', top: '200px', transform: 'translateX(-50%)' }}>
        <h1>
          <FormattedMessage id="auth.signin.title" />
        </h1>
        <Card className="mt-7">
          <SigninForm />
        </Card>
      </div>
    </div>
  );
};

export default Signin;

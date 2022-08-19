import React from 'react';
import { FormattedMessage } from 'react-intl';

import Settings from 'containers/Settings';
import Card from 'components/ui/Card';
import SettingsForm from 'components/form/forms/Settings';
import PasswordChange from 'components/form/forms/PasswordChange';
import { userContext } from 'context/user';

const SettingsPage = () => {
  const userState = React.useContext(userContext);
  return (
    <Settings>
      <div style={{ maxWidth: '550px' }}>
        <h5 className="mt-8">
          <FormattedMessage id="settings.user" />
        </h5>
        <Card>{userState.data ? <SettingsForm user={userState.data} /> : null}</Card>
        <h5 className="mt-8">
          <FormattedMessage id="settings.password" />
        </h5>
        <Card>{userState.data ? <PasswordChange /> : null}</Card>
      </div>
    </Settings>
  );
};

export default SettingsPage;

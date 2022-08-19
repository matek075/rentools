import React from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';

import OnlyAuthenticated from 'components/navigation/routes/OnlyAuthenticated';
import Dashboard from 'components/layouts/Dashboard';
import { Breadcrumb } from 'components/navigation/Breadcrumbs';
import css from 'containers/Settings/styles.module.scss';

interface OwnProps {}

const Settings: React.FC<OwnProps> = ({ children }) => {
  const router = useRouter();
  const intl = useIntl();

  const breadcrumbs: Breadcrumb[] = [
    {
      name: intl.formatMessage({ id: 'settings.title' }),
      url: router.pathname,
    },
  ];

  return (
    <OnlyAuthenticated>
      <Dashboard breadcrumbs={breadcrumbs}>
        <div className={css.form}>
          <h5>
            <FormattedMessage id="settings.userSettings" />
          </h5>
          {children}
        </div>
      </Dashboard>
    </OnlyAuthenticated>
  );
};

export default Settings;

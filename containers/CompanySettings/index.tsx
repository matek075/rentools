import React from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';

import OnlyAuthenticated from 'components/navigation/routes/OnlyAuthenticated';
import Dashboard from 'components/layouts/Dashboard';
import { Breadcrumb } from 'components/navigation/Breadcrumbs';
import Tabs from 'components/navigation/Tabs';
import css from 'containers/Settings/styles.module.scss';

interface OwnProps {
  tab: 'settings' | 'questions' | 'opening-hours';
}

const CompanySettings: React.FC<OwnProps> = ({ tab, children }) => {
  const router = useRouter();
  const intl = useIntl();
  const breadcrumbs: Breadcrumb[] = [
    {
      name: intl.formatMessage({ id: 'settings.company' }),
      url: router.pathname,
    },
  ];

  const tabs = [
    {
      name: <FormattedMessage id="settings.companyDetails" />,
      href: '/user/company',
      selected: tab === 'settings',
    },
    {
      name: <FormattedMessage id="settings.qa" />,
      href: '/user/company/questions',
      selected: tab === 'questions',
    },
    {
      name: <FormattedMessage id="settings.openingHours" />,
      href: '/user/company/opening-hours',
      selected: tab === 'opening-hours',
    },
  ];

  return (
    <OnlyAuthenticated>
      <Dashboard breadcrumbs={breadcrumbs}>
        <div className={css.form}>
          <h5>
            <FormattedMessage id="settings.userSettings" />
          </h5>
          <Tabs tabs={tabs} />
          {children}
        </div>
      </Dashboard>
    </OnlyAuthenticated>
  );
};

export default CompanySettings;

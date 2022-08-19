import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from 'components/ui/Card';
import CompanyUpdate from 'components/form/forms/CompanyUpdate';
import { companyContext } from 'context/company';
import CompanySettings from 'containers/CompanySettings';
import CompanyDescriptions from 'components/form/forms/CompanyDescriptions';

import css from './styles.module.scss';

const SettingsPage = () => {
  const companyState = React.useContext(companyContext);

  return (
    <CompanySettings tab="settings">
      <div className={css.wrapper}>
        <div className={css.left}>
          <h5>
            <FormattedMessage id="settings.companyDetails" />
          </h5>
          <Card>{companyState.data ? <CompanyUpdate company={companyState.data} /> : null}</Card>
        </div>
        <div className={css.right}>
          <h5>
            <FormattedMessage id="settings.descriptions" />
          </h5>
          <Card>{companyState.data ? <CompanyDescriptions company={companyState.data} /> : null}</Card>
        </div>
      </div>
    </CompanySettings>
  );
};

export default SettingsPage;

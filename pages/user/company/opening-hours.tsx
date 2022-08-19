import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from 'components/ui/Card';
import { companyContext } from 'context/company';
import CompanySettings from 'containers/CompanySettings';
import OpeningHoursUpdate from 'components/form/forms/OpeningHours';
import Loading from 'components/layouts/Loading';

const SettingsPage = () => {
  const companyState = React.useContext(companyContext);

  if (!companyState.data) {
    return <Loading />;
  }

  return (
    <CompanySettings tab="opening-hours">
      <div className="max-w-xl">
        <h5>
          <FormattedMessage id="settings.openingHours" />
        </h5>
        <Card>
          <OpeningHoursUpdate openingHours={companyState.data?.openingHours} />
        </Card>
      </div>
    </CompanySettings>
  );
};

export default SettingsPage;

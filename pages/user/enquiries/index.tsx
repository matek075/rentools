import React from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import OnlyAuthenticated from 'components/navigation/routes/OnlyAuthenticated';
import Dashboard from 'components/layouts/Dashboard';
import { Breadcrumb } from 'components/navigation/Breadcrumbs';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const intl = useIntl();

  const breadcrumbs: Breadcrumb[] = [
    {
      name: intl.formatMessage({ id: 'enquiries.title' }),
      url: router.pathname,
    },
  ];

  return (
    <OnlyAuthenticated>
      <Dashboard breadcrumbs={breadcrumbs}>
        <div>
          <h1>Zapytania</h1>
          <p>Brak zapytań</p>
        </div>
      </Dashboard>
    </OnlyAuthenticated>
  );
};

export default IndexPage;

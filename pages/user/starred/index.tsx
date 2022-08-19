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
      name: intl.formatMessage({ id: 'starred.title' }),
      url: router.pathname,
    },
  ];

  return (
    <OnlyAuthenticated>
      <Dashboard breadcrumbs={breadcrumbs}>
        <div>
          <h1>Ulubione</h1>
          <p>Brak polubionych produktów</p>
        </div>
      </Dashboard>
    </OnlyAuthenticated>
  );
};

export default IndexPage;

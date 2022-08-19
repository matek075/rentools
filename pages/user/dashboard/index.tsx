import React from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import OnlyAuthenticated from 'components/navigation/routes/OnlyAuthenticated';
import Dashboard from 'components/layouts/Dashboard';
import OnlyPlan from 'components/navigation/routes/OnlyPlan';
import { Breadcrumb } from 'components/navigation/Breadcrumbs';
import { UserType } from 'context/user/types';
import { CompanyPlan } from 'context/company/types';
import { companyContext } from 'context/company';
import { userContext } from 'context/user';
import UserDashboard from 'containers/dashboard/UserDashboard';
import CounterTiles from 'containers/dashboard/CounterTiles';
import PartnerDashboard from 'containers/dashboard/PartnerDashboard';
import PublicProfileScore from 'containers/dashboard/PublicProfileScore';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const intl = useIntl();
  const { data } = React.useContext(userContext);

  const company = React.useContext(companyContext);

  const breadcrumbs: Breadcrumb[] = [
    {
      name: intl.formatMessage({ id: 'home.title' }),
      url: router.pathname,
    },
  ];
  return (
    <OnlyAuthenticated>
      <Dashboard breadcrumbs={breadcrumbs}>
        {data && data.type === UserType.User ? <UserDashboard /> : null}
        {company.data && (
          <>
            <OnlyPlan type={UserType.Partner} plan={CompanyPlan.Standard}>
              <PartnerDashboard company={company.data} />
            </OnlyPlan>
            <OnlyPlan type={UserType.Partner} plan={CompanyPlan.Basic}>
              <CounterTiles />
            </OnlyPlan>
            <PublicProfileScore company={company.data} questionsCount={company.data.questionsCount || 0} />
          </>
        )}
      </Dashboard>
    </OnlyAuthenticated>
  );
};

export default IndexPage;

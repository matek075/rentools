import React from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import OnlyAuthenticated from 'components/navigation/routes/OnlyAuthenticated';
import Dashboard from 'components/layouts/Dashboard';
import ProductForm from 'components/form/forms/Product';
import { Breadcrumb } from 'components/navigation/Breadcrumbs';
import OnlyPlan from 'components/navigation/routes/OnlyPlan';
import { UserType } from 'context/user/types';
import { CompanyPlan } from 'context/company/types';
import BasicView from 'containers/dashboard/BasicView';

import css from './new.module.scss';

const NewProduct: React.FC = () => {
  const router = useRouter();
  const intl = useIntl();

  const breadcrumbs: Breadcrumb[] = [
    {
      name: intl.formatMessage({ id: 'products.title' }),
      url: '/user/products',
    },
    {
      name: intl.formatMessage({ id: 'products.addNew' }),
      url: router.pathname,
    },
  ];

  return (
    <OnlyAuthenticated>
      <OnlyPlan type={UserType.Partner} plan={CompanyPlan.Basic}>
        <Dashboard>
          <BasicView />
        </Dashboard>
      </OnlyPlan>
      <OnlyPlan type={UserType.Partner} plan={CompanyPlan.Standard}>
        <Dashboard breadcrumbs={breadcrumbs}>
          <div>
            <div className={css.container}>
              <div className={css.form}>
                <ProductForm />
              </div>
            </div>
          </div>
        </Dashboard>
      </OnlyPlan>
    </OnlyAuthenticated>
  );
};

export default NewProduct;

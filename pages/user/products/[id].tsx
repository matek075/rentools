import React from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import settings from 'settings';
import OnlyAuthenticated from 'components/navigation/routes/OnlyAuthenticated';
import Dashboard from 'components/layouts/Dashboard';
import ProductForm from 'components/form/forms/Product';
import { Breadcrumb } from 'components/navigation/Breadcrumbs';
import { getProduct } from 'utils/product/getProduct';
import { getCookieForString } from 'utils/cookies';
import { Product } from 'types';
import OnlyPlan from 'components/navigation/routes/OnlyPlan';
import { UserType } from 'context/user/types';
import { CompanyPlan } from 'context/company/types';
import BasicView from 'containers/dashboard/BasicView';

import css from './new.module.scss';

interface OwnProps {
  data: Product;
}

export const getServerSideProps: GetServerSideProps<OwnProps> = async (ctx) => {
  try {
    const product = await getProduct(
      Number(ctx.params?.id),
      getCookieForString(ctx.req.headers.cookie || '', settings.AUTH_COOKIE_NAME) || '',
    );
    return {
      props: {
        data: product,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/user/products',
        permanent: false,
      },
    };
  }
};

const EditProduct: React.FC<OwnProps> = ({ data }) => {
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
          <div className={css.container}>
            <div className={css.form}>
              <ProductForm data={data} />
            </div>
          </div>
        </Dashboard>
      </OnlyPlan>
    </OnlyAuthenticated>
  );
};

export default EditProduct;

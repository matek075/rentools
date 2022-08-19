import React from 'react';
import { faPlus } from '@fortawesome/pro-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import Button from 'components/ui/Button';
import OnlyAuthenticated from 'components/navigation/routes/OnlyAuthenticated';
import Dashboard from 'components/layouts/Dashboard';
import { Breadcrumb } from 'components/navigation/Breadcrumbs';
import ProductList from 'components/products/ProductList';
import OnlyPlan from 'components/navigation/routes/OnlyPlan';
import { UserType } from 'context/user/types';
import { CompanyPlan } from 'context/company/types';
import BasicView from 'containers/dashboard/BasicView';
import { getProducts } from 'utils/product/getProducts';
import { ProductPage } from 'types';
import Pagination from 'components/navigation/Pagination';

import css from './products.module.scss';

const ProductsEmpty: React.FC = () => (
  <div>
    <div className={css.noProducts}>
      <h2 className={css.title}>
        <FormattedMessage id="products.empty.title" />
      </h2>
      <p className={css.subtitle}>
        <FormattedMessage id="products.empty.subtitle" />
      </p>
    </div>
  </div>
);

const ShowProducts: React.FC = () => {
  const [total, setTotal] = React.useState<number>(0);
  const [perPage] = React.useState(12);
  const { query, push, asPath } = useRouter();
  const [items, setItems] = React.useState<ProductPage[]>([]);

  let totalPages = 1;
  if (total > perPage) {
    totalPages = total % perPage !== 0 ? Math.floor(total / perPage) + 1 : Math.round(total / perPage);
  }

  const handlePageChange = (page: number) => {
    let path = asPath;
    if (path.includes('?')) {
      path = path.split('?')[0];
    };

    push(path + '?page=' + page, '', {
      shallow: true,
    });

    loadProducts(page);

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const loadProducts = (newPage: number) => {
    const response = getProducts({
      take: perPage,
      skip: (newPage - 1 || 0) * perPage,
    });

    response.then((data) => {
      setItems(data.data);
      setTotal(data.total);
    });
  }

  React.useEffect(() => {
    loadProducts(+query.page || 1)
  }, [query.page]);

  return (
    <>
      <h1>
        <FormattedMessage id="products.title" />
        <Link href="/user/products/new">
          <Button as="a" size="sm" icon={<FontAwesomeIcon icon={faPlus} />} className={css.button}>
            <FormattedMessage id="products.addNew" />
          </Button>
        </Link>
      </h1>
      {items.length ? (
        <>
          <ProductList items={items} />
          <Pagination page={+query.page || 1} total={totalPages} onChangePage={handlePageChange} />
        </>
      ) : <ProductsEmpty />}
    </>
  );
};

const Products: React.FC = () => {
  const router = useRouter();
  const intl = useIntl();

  const breadcrumbs: Breadcrumb[] = [
    {
      name: intl.formatMessage({ id: 'products.title' }),
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
            <ShowProducts />
          </div>
        </Dashboard>
      </OnlyPlan>
    </OnlyAuthenticated>
  );
};

export default Products;

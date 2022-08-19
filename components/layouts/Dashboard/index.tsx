import React from 'react';
import { NextSeo } from 'next-seo';

import Navbar from 'components/navigation/Navbar';
import Menu from 'components/navigation/Menu';
import CompanyCreate from 'components/modals/CreateCompany';
import Breadcrumbs, { Breadcrumb } from 'components/navigation/Breadcrumbs';

import css from './styles.module.scss';

interface OwnProps {
  breadcrumbs?: Breadcrumb[];
}

const Dashboard: React.FC<OwnProps> = ({ breadcrumbs, children }) => {
  return (
    <>
      <Navbar />
      <NextSeo title={'Dashboard | rentools.pl'} />
      <div className={css.page}>
        <Menu />
        <div className={css.content}>
          <div className="mb-5">
            {breadcrumbs && breadcrumbs.length ? <Breadcrumbs items={breadcrumbs || []} /> : null}
          </div>
          {children}
        </div>
      </div>
      <CompanyCreate />
    </>
  );
};

export default Dashboard;

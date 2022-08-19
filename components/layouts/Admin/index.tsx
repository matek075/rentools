import React from 'react';
import { NextSeo } from 'next-seo';

import Navbar from 'components/navigation/AdminNavbar';
import Menu from 'components/navigation/Menu/AdminMenu';
import CompanyCreate from 'components/modals/CreateCompany';
import Breadcrumbs, { Breadcrumb } from 'components/navigation/Breadcrumbs';
import OnlyAdmin from 'components/navigation/routes/OnlyAdmin';

import css from './styles.module.scss';

interface OwnProps {
  breadcrumbs?: Breadcrumb[];
}

const Admin: React.FC<OwnProps> = ({ breadcrumbs, children }) => {
  return (
    <OnlyAdmin>
      <Navbar />
      <NextSeo title={'Admin | Rentools.pl'} />
      <div className={css.page}>
        <Menu />
        <div className={css.content}>
          <div>{breadcrumbs && breadcrumbs.length ? <Breadcrumbs items={breadcrumbs || []} /> : null}</div>
          {children}
        </div>
      </div>
      <CompanyCreate />
    </OnlyAdmin>
  );
};

export default Admin;

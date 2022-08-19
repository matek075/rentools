import React from 'react';

import Admin from 'components/layouts/Admin';
import { AdminStats } from 'utils/admin/stats';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Cards from 'containers/admin/Dashboard/components/Cards';
import Categories from 'containers/admin/Dashboard/components/Categories';
import Companies from 'containers/admin/Dashboard/components/Companies';

import css from './styles.module.scss';

export interface OwnProps {
  stats: AdminStats;
}

const Dashboard: React.FC<OwnProps> = ({ stats }) => {
  return (
    <Admin>
      <Breadcrumbs items={[{ name: 'Dashboard', url: '/admin' }]} />
      <h1>Admin dashboard</h1>
      <Cards stats={stats} />
      <div className={css.wrapper}>
        <div className={css.left}>
          <h4>Kategorie</h4>
          <Categories stats={stats} />
        </div>
        <div className={css.right}>
          <h4>Ostatnio dodane firmy</h4>
          <Companies stats={stats} />
        </div>
      </div>
    </Admin>
  )
}

export default Dashboard;

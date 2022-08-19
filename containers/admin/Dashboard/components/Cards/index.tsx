import React from 'react';

import { AdminStats } from 'utils/admin/stats';
import Card from 'components/ui/Card';
import ActionLink from 'components/navigation/ActionLink';

import css from '../../styles.module.scss';

export interface OwnProps {
  stats: AdminStats;
}

const Cards: React.FC<OwnProps> = ({ stats }) => {
  return (
    <div className={css.cards}>
      <div className={css.card}>
        <Card>
          <div className={css.label}>{ stats.usersCount }</div>
          <div className={css.caption}>użytkowników</div>
          <ActionLink href="/admin/users" className={css.link}>Zobacz wszystkich</ActionLink>
        </Card>
      </div>
      <div className={css.card}>
        <Card>
          <div className={css.label}>{ stats.companiesCount }</div>
          <div className={css.caption}>firm</div>
          <ActionLink href="/admin/companies" className={css.link}>Zobacz wszystkie</ActionLink>
        </Card>
      </div>
      <div className={css.card}>
        <Card>
          <div className={css.label}>{ stats.productsCount }</div>
          <div className={css.caption}>produktów</div>
        </Card>
      </div>
    </div>
  )
}

export default Cards;

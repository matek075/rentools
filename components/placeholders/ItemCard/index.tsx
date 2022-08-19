import React from 'react';
import clsx from 'clsx';

import css from './styles.module.scss';

const ItemCard: React.FC = () => {
  return (
    <div className={clsx(css.item, css.card)}>
      <div className={css.thumbnail}></div>
      <div className={css.content}>
        <div className={css.name} />
        <div className={css.category} />
      </div>
    </div>
  );
};

export default ItemCard;

import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/pro-solid-svg-icons';

import Card from 'components/ui/Card';
import { companyContext } from 'context/company';

import css from './style.module.scss';

const CounterTiles: React.FC = () => {
  const company = React.useContext(companyContext);

  return (
    <>
      <div>
        <div className={css.cards}>
          <Card className={clsx(css.headerCard, css.mainHeaderCard)} shadow={false}>
            <div className={clsx(css.counter, 'text-center')}>{company.data?.visits}</div>
            <div className={clsx(css.counterName, 'text-center')}>Wyświetleń profilu</div>
          </Card>
          <Card className={css.headerCard} shadow={false}>
            <FontAwesomeIcon icon={faLock} className={css.icon} />
            <div className={clsx(css.counterName, 'text-center')}>Aktywnych produktów</div>
          </Card>
          <Card className={css.headerCard} shadow={false}>
            <FontAwesomeIcon icon={faLock} className={css.icon} />
            <div className={clsx(css.counterName, 'text-center')}>Zapytań</div>
          </Card>
          <Card className={css.headerCard} shadow={false}>
            <FontAwesomeIcon icon={faLock} className={css.icon} />
            <div className={clsx(css.counterName, 'text-center')}>Dodane do ulubionych</div>
          </Card>
          <Card className={css.headerCard} shadow={false}>
            <FontAwesomeIcon icon={faLock} className={css.icon} />
            <div className={clsx(css.counterName, 'text-center')}>Wydanych egzemplarzy</div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CounterTiles;

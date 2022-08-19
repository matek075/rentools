import React from 'react';
import { faCopyright } from '@fortawesome/pro-regular-svg-icons/faCopyright';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './styles.module.scss';

const SmallFooter: React.FC = () => {
  return (
    <div className={css.footer}>
      <FontAwesomeIcon icon={faCopyright} /> Rentools 2021
    </div>
  );
};

export default SmallFooter;

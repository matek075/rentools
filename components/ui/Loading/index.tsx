import React from 'react';
import { faCog } from '@fortawesome/pro-solid-svg-icons/faCog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './styles.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={css.loading}>
      <FontAwesomeIcon icon={faCog} spin className={css.icon} size="2x" />
    </div>
  );
};

export default Loading;

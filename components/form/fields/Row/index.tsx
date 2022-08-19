import React from 'react';

import css from './styles.module.scss';

const Row: React.FC = ({ children }) => {
  return <div className={css.row}>{children}</div>;
};

export default Row;

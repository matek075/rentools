import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';

import css from './styles.module.scss';

interface OwnProps {
  icon: IconProp;
  text: string | React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}

const SelectCard: React.FC<OwnProps> = (props) => {
  return (
    <div
      className={clsx(css.card, { [css.selected]: props.selected })}
      onClick={props.onClick}
      role="button"
      tabIndex={-1}>
      <FontAwesomeIcon icon={props.icon} size="2x" className={css.icon} />
      <div className={css.text}>{props.text}</div>
    </div>
  );
};

export default SelectCard;

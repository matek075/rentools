import React from 'react';
import clsx from 'clsx';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons/faCircleExclamation';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons/faCircleCheck';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons/faInfoCircle';
import { faTriangleExclamation } from '@fortawesome/pro-solid-svg-icons/faTriangleExclamation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './styles.module.scss';

type AlertType = 'success' | 'danger' | 'warning' | 'info';

interface OwnProps {
  type: AlertType;
  text: string | React.ReactNode;
  className?: string;
}

const AlertLogo: React.FC<{ type: AlertType }> = ({ type }) => {
  if (type === 'success') {
    return <FontAwesomeIcon icon={faCircleCheck} className={css.icon} />;
  }

  if (type === 'warning') {
    return <FontAwesomeIcon icon={faTriangleExclamation} className={css.icon} />;
  }

  if (type === 'info') {
    return <FontAwesomeIcon icon={faInfoCircle} className={css.icon} size="3x" />
  }

  return <FontAwesomeIcon icon={faCircleExclamation} size="2x" className={css.icon} />;
};

const Alert: React.FC<OwnProps> = ({ type, text, className }) => {
  const classes = clsx(
    {
      [css.alert]: true,
      [css[type]]: true,
    },
    className,
  );

  return (
    <div className={classes}>
      <div className={css.icon}>
        <AlertLogo type={type} />
      </div>
      <div className={css.text}>{text}</div>
    </div>
  );
};

export default Alert;

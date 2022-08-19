import React from 'react';
import clsx from 'clsx';

import css from './styles.module.scss';

export interface OwnProps extends React.HTMLAttributes<HTMLElement> {
  padding?: number;
  shadow?: boolean;
}

const Card: React.FC<OwnProps> = ({ padding, shadow, children, className, ...props }) => {
  return (
    <div
      className={clsx(className, {
        [css.card]: true,
        [css.shadow]: shadow || true,
      })}
      style={{ padding: padding ? `${padding}px` : undefined }}
      {...props}>
      {children}
    </div>
  );
};

export default Card;

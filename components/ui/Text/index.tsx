import React from 'react';
import clsx from 'clsx';

import css from './styles.module.scss';

interface OwnProps {
  as?: 'a' | 'span' | 'div' | 'p';
  type?: 'dark' | 'dimmed' | 'link' | 'focused';
  size?: 'small' | 'medium' | 'large' | 'normal';
  [id: string]: any;
}

const Text: React.FC<OwnProps> = ({ size = 'medium', as = 'span', type = 'dark', children, className, ...props }) => {
  const classes = clsx(className, {
    [css.sizeMedium]: size === 'medium',
    [css.sizeLarge]: size === 'large',
    [css.sizeSmall]: size === 'small',
    [css.sizeNormal]: size === 'normal',
    [css[type] || 'dark']: !!type,
  });

  const Component = as || 'div';
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Text;

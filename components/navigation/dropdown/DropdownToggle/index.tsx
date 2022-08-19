import React from 'react';
import clsx from 'clsx';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DropdownOrientation } from '../Dropdown/Dropdown.types';

import css from './styles.module.scss';

interface OwnProps {
  as?: React.ReactNode;
  onClick?: () => void;
  open?: boolean;
  className?: string;
  isSubMenu?: boolean;
  [id: string]: any;
  orientation?: DropdownOrientation;
}

const DropdownToggle: React.FC<OwnProps> = ({ as = 'a', open, children, className, isSubMenu, ...props }) => {
  const classes = clsx(className, {
    [css.toggle]: true,
    [css.open]: open && isSubMenu,
  });
  const Component = (as || 'a') as React.FC<any> | 'a';

  return (
    <Component className={classes} href={Component === 'a' ? '#' : undefined} {...props}>
      {children}
      {isSubMenu && <FontAwesomeIcon icon={faChevronRight} className={css.toggleArrow} />}
    </Component>
  );
};

DropdownToggle.displayName = 'DropdownToggle';

export default DropdownToggle;

// Generated with util/create-component.js
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { DropdownOrientation } from '../Dropdown/Dropdown.types';

import css from './styles.module.scss';

interface OwnProps {
  as?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  onMouseOver?: (e: React.MouseEvent) => void;
  onClose?: () => void;
  menuLeft?: number;
  menuRight?: number;
  menuTop?: number;
  menuBottom?: number;
  className?: string;
  dropdownOrientation?: DropdownOrientation;
  selected?: boolean;
  [id: string]: any;
}

const DropdownItem: React.FC<OwnProps> = ({
  as,
  children,
  menuLeft,
  menuRight,
  menuTop,
  menuBottom,
  className,
  onClick,
  onClose,
  selected,
  href,
  ...props
}) => {
  const [hasSubMenu, setHasSubMenu] = React.useState(false);
  const Component = (hasSubMenu ? 'div' : as || Link) as React.FC<any>;

  const rootTriggerClasses = clsx(className, {
    [css.item]: true,
    [css.withSubmenu]: hasSubMenu,
    [css.selected]: selected,
  });

  const submenuTriggerClasses = clsx(className);

  /*
   If another Dropdown is used within the DropdownItem, we need to pass the 'subMenu'
   prop with submenu sizes so we can correctly offset the submenu position
  */
  const mappedChildren = React.useMemo(() => {
    return React.Children.map(children, (child: any) => {
      if (React.isValidElement(child)) {
        // @ts-ignore
        const { displayName } = { ...child.type };
        if (displayName === 'Dropdown') {
          setHasSubMenu(true);
          // @ts-ignore
          return React.cloneElement(child, {
            // @ts-ignore
            subMenu: {
              left: menuLeft,
              right: menuRight,
              top: menuTop,
              bottom: menuBottom,
            },
            className: css.subMenu,
          });
        }
      }
      return child;
    });
  }, [children, menuLeft, menuRight]);

  const closeAndClick = (e: React.MouseEvent) => {
    if (!href || href === '#') {
      e.preventDefault();
    }

    if (!hasSubMenu && onClose) {
      onClose();
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      role={hasSubMenu ? 'menu' : 'menuitem'}
      href={as === 'div' ? undefined : href || '#'}
      className={hasSubMenu ? submenuTriggerClasses : rootTriggerClasses}
      onClick={as === 'div' ? onClick : closeAndClick}
      {...props}>
      {Component === Link ? (
        <a className={hasSubMenu ? submenuTriggerClasses : rootTriggerClasses}>{mappedChildren}</a>
      ) : (
        mappedChildren
      )}
    </Component>
  );
};

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;

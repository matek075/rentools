// Generated with util/create-component.js
import React, { Children, isValidElement } from 'react';
import clsx from 'clsx';

import useOnClickOutside from 'hooks/browser/useOnClickOutside';
import useElementPosition from 'hooks/browser/useElementPosition';
import { isMobileSize } from 'utils/browser/mobile';

import { DropdownProps } from './Dropdown.types';
import css from './styles.module.scss';

const Dropdown: React.FC<DropdownProps> = ({ children, orientation = 'bottom_right', subMenu, hover, className }) => {
  // Ref used to handle clicks outside of the dropdown
  const dropdownRef = React.useRef(null);

  // Position of the dropdown toggle, to attach the menu to
  const elementPosition = useElementPosition(dropdownRef);

  // Open and close state for the dropdown
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen(!open);

  React.useEffect(() => {
    if (hover && dropdownRef.current) {
      // @ts-ignore
      dropdownRef.current.addEventListener('mouseenter', handleOpen);
      // @ts-ignore
      dropdownRef.current.addEventListener('mouseleave', handleClose);
    }

    return () => {
      if (dropdownRef.current) {
        // @ts-ignore
        dropdownRef.current.removeEventListener('mouseenter', handleOpen);
        // @ts-ignore
        dropdownRef.current.removeEventListener('mouseleave', handleClose);
      }
    };
  }, [hover]);

  useOnClickOutside(dropdownRef, handleClose);

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleToggle();
  };

  const dropdownClasses = clsx(className, {
    [css.dropdown]: true,
  });

  const handleKeyToggle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === ' ' || key === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  };

  /*
    Since we'll be relying on specific React components in children, we need to
    inject onClick to the DropdownToggle component and open to DropdownMenu component
    so we can rely on the internal open/close state
   */
  const mappedChildren = React.useMemo(() => {
    return Children.map(children, (child: any) => {
      if (isValidElement(child)) {
        // @ts-ignore
        const { displayName } = { ...child.type };
        // @ts-ignore
        if (displayName === 'DropdownToggle') {
          return React.cloneElement(child, {
            // @ts-ignore
            onClick:
              !hover || isMobileSize()
                ? handleToggleClick
                : (e: React.MouseEvent) => {
                    e.preventDefault();
                  },
            onMouseEnter: hover ? handleOpen : undefined,
            onKeyDown: subMenu ? handleKeyToggle : undefined,
            open,
            isSubMenu: !!subMenu,
            orientation,
          });
        } else if (displayName === 'DropdownMenu') {
          if (!open) {
            return undefined;
          }
          return React.cloneElement(child, {
            // @ts-ignore
            open,
            x: elementPosition.left,
            y: elementPosition.bottom,
            togglePosition: elementPosition,
            onClose: handleClose,
            orientation,
            subMenu,
          });
        }
      }
      return child;
    });
  }, [children, open, handleToggleClick, elementPosition.left, elementPosition.top, orientation]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <>
      <div data-testid="Dropdown" className={dropdownClasses} ref={dropdownRef} onKeyDown={handleKeyDown} role="none">
        {mappedChildren}
      </div>
    </>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;

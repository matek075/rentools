import React from 'react';
import clsx from 'clsx';

import useElementPosition, { ElementPosition } from 'hooks/browser/useElementPosition';
import { isMobileSize } from 'utils/browser/mobile';

import { DropdownOrientation } from '../Dropdown/Dropdown.types';

import css from './styles.module.scss';

const GAP_MARGIN = 16;

interface OwnProps {
  open?: boolean;
  x?: number;
  y?: number;
  togglePosition?: ElementPosition;
  orientation?: DropdownOrientation;
  onClose?: () => void;
  offsetTop?: number;
  direction?: 'row-2' | 'row-4' | 'column';
  maxWidth?: number;
  subMenu?: {
    left: number;
    right: number;
    width: number;
    height: number;
  };
}

const DropdownMenu: React.FC<OwnProps> = ({
  open,
  x,
  y,
  children,
  togglePosition,
  orientation,
  subMenu,
  onClose,
  maxWidth,
  offsetTop,
  direction = 'column',
}) => {
  const menuRef = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  const [dropdownTimeout, setDropdownTimeout] = React.useState<any>(undefined);

  const position = useElementPosition(menuRef);

  const classes = clsx({
    [css.menu]: true,
    [css.rendering]: !menuRef.current,
    [css.top]: orientation && orientation.startsWith('top'),
    [css.row]: direction.startsWith('row'),
    [css.row2]: direction === 'row-2',
    [css.row4]: direction === 'row-4',
    [css.column]: direction === 'column',
  });

  // This is a "hack fix" to prevent the "slide" side effect when we
  // render a dropdown and don't know the absolute positioning
  React.useEffect(() => {
    if (open) {
      clearTimeout(dropdownTimeout);

      setDropdownTimeout(
        setTimeout(() => {
          setShown(true);
        }, 80),
      );
    } else {
      setShown(false);
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(undefined);
    }

    return () => {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(undefined);
    };
  }, [open, setShown]);

  // Right X
  let fixedX = (x || 0) - GAP_MARGIN;

  // Bottom Y
  let fixedY = y || 0;

  if (!(isMobileSize() && subMenu)) {
    if (togglePosition && orientation && position) {
      if (orientation.endsWith('left')) {
        // Left X
        // @ts-ignore
        fixedX = (x || 0) + togglePosition.width - position.width;
      }

      if (orientation.startsWith('top')) {
        // Top Y
        // @ts-ignore
        fixedY = y - position.height - togglePosition.height;
      }
    }

    if (subMenu && position) {
      // @ts-ignore
      fixedX = subMenu.left + position.width;
      // @ts-ignore
      fixedY = y - togglePosition.height;

      // @ts-ignore
      if (orientation.endsWith('left')) {
        // Left X
        // @ts-ignore
        fixedX = subMenu.left - position.width - GAP_MARGIN;
      }

      // @ts-ignore
      if (orientation.startsWith('top')) {
        // Top Y
        // @ts-ignore
        fixedY = fixedY - position.height + togglePosition.height;
      }
    }
  }

  /*
   If there's another Dropdown used within the DropdownItem component,
   we need to pass the width to properly offset it
  */
  const mappedChildren = React.useMemo(() => {
    return React.Children.map(children, (child: any) => {
      if (React.isValidElement(child)) {
        // @ts-ignore
        const { displayName } = { ...child.type };
        if (displayName === 'DropdownItem') {
          // @ts-ignore
          return React.cloneElement<React.FC<any>>(child, {
            menuLeft: position.left,
            menuRight: position.right,
            menuTop: position.top,
            menuBottom: position.bottom,
            onClose,
          });
        }
      }
      return child;
    });
  }, [children, position]);

  const containerClasses = clsx({
    [css.container]: true,
    [css.shown]: shown,
  });

  return (
    <div
      className={containerClasses}
      style={{
        left: fixedX,
        top: fixedY,
        marginTop: offsetTop ? `${offsetTop}px` : undefined,
      }}>
      <div className={css.wrapper} ref={menuRef} style={maxWidth ? { maxWidth: `${maxWidth}px` } : {}}>
        <div className={classes} aria-haspopup="listbox">
          {mappedChildren}
        </div>
      </div>
    </div>
  );
};

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;

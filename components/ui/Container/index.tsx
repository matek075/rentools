import React from 'react';
import clsx from 'clsx';

import css from './styles.module.scss';

interface OwnProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  paddingTop?: number;
  paddingBottom?: number;
  width?: number;
}

const Container: React.FC<OwnProps> = (props) => {
  return (
    <div
      className={clsx({
        [css.container]: true,
        [props.className || '']: !!props.className,
      })}
      style={{
        paddingTop: props.paddingTop,
        paddingBottom: props.paddingBottom,
        maxWidth: props.width ? `${props.width}px` : undefined,
      }}>
      {props.children}
    </div>
  );
};

export default Container;

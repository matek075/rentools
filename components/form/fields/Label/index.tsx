import React from 'react';
import clsx from 'clsx';

import css from 'components/form/fields/Input/styles.module.scss';

interface OwnProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
  className?: string;
}

const Label: React.FC<OwnProps> = ({ error, children, ...props }) => {
  const labelClasses = clsx(
    {
      [css.label]: true,
      [css.invalid]: error,
    },
    props.className,
  );

  return (
    <label className={labelClasses} htmlFor={props.htmlFor}>
      {children}
    </label>
  );
};

export default Label;

import React from 'react';
import { FieldProps } from 'formik';
import clsx from 'clsx';

import Label from 'components/form/fields/Label';

import css from '../Input/styles.module.scss';

interface OwnProps {
  label?: string | React.ReactNode;
  id?: string;
  type?: string;
  placeholder?: string;
  borderless?: boolean;
  bold?: boolean;
  shadowed?: boolean;
}

const Textarea: React.FC<FieldProps & OwnProps> = (props) => {
  const error = props.form.errors[props.field.name];

  const classes = clsx({
    [css.field]: true,
    [css.invalid]: !!error,
    [css.borderless]: !!props.borderless,
    [css.bold]: !!props.bold,
    [css.shadowed]: !!props.shadowed,
  });

  return (
    <>
      {props.label && (
        <Label error={!!error} htmlFor={props.id || props.field.name}>
          {props.label}
        </Label>
      )}
      <textarea
        aria-invalid={!!error}
        placeholder={props.placeholder}
        id={props.id || props.field.name}
        className={classes}
        {...props.field}
      />
      {error && <div className={css.error}>{error}</div>}
    </>
  );
};

export default Textarea;

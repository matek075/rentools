import React from 'react';
import { FieldProps } from 'formik';
import clsx from 'clsx';

import Label from 'components/form/fields/Label';

import css from './styles.module.scss';

interface OwnProps {
  label?: string | React.ReactNode;
  id?: string;
  type?: string;
  placeholder?: string;
  borderless?: boolean;
  bold?: boolean;
  shadowed?: boolean;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
}

const Input: React.FC<FieldProps & OwnProps> = (props) => {
  const [focused, setFocused] = React.useState(false);

  const error = props.form.errors[props.field.name];

  const classes = clsx({
    [css.field]: true,
    [css.invalid]: !!error,
    [css.borderless]: !!props.borderless,
    [css.bold]: !!props.bold,
    [css.shadowed]: !!props.shadowed,
    [css.hasPrefix]: !!props.prefix,
    [css.hasSuffix]: !!props.suffix,
  });

  return (
    <>
      {props.label && (
        <Label error={!!error} htmlFor={props.id || props.field.name}>
          {props.label}
        </Label>
      )}
      <div
        className={clsx(css.wrapper, {
          [css.hasFocus]: focused,
          [css.hasError]: error,
        })}>
        {props.prefix && <div className={clsx(css.prefix, css.xfix)}>{props.prefix}</div>}
        <input
          type={props.type || 'text'}
          aria-invalid={!!error}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onFocus={() => setFocused(true)}
          id={props.id || props.field.name}
          className={classes}
          {...props.field}
          onBlur={(e) => {
            setFocused(false);
            props.field.onBlur(e);
          }}
        />
        {props.suffix && <div className={clsx(css.suffix, css.xfix)}>{props.suffix}</div>}
      </div>
      {error && <div className={css.error}>{error}</div>}
    </>
  );
};

export default Input;

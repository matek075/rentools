import React from 'react';
import { FieldProps } from 'formik';
import clsx from 'clsx';

import Label from 'components/form/fields/Label';

import css from './styles.module.scss';

interface OwnProps {
  id?: string;
  label?: string | React.ReactNode;
}

const Checkbox: React.FC<FieldProps & OwnProps> = (props) => {
  const name = props.field.name;
  const error = props.form.errors[name];

  return (
    <>
      {props.label && (
        <Label error={!!error} htmlFor={props.id || name} className={css.label}>
          <div className={css.labelValue}>{props.label}</div>
          <div
            className={clsx(css.wrapper, {
              [css.hasError]: error,
            })}>
            <input id={props.id} className="mr-2" type="checkbox" {...props.field} checked={!!props.field.value} />
          </div>
        </Label>
      )}
      {error && <div className={css.error}>{error}</div>}
    </>
  );
};

export default Checkbox;

import React from 'react';
import { faStar } from '@fortawesome/pro-solid-svg-icons/faStar';
import { faStar as faStarEmpty } from '@fortawesome/pro-regular-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldProps } from 'formik';
import clsx from 'clsx';

import Label from 'components/form/fields/Label';

import css from './styles.module.scss';

const MAX_RATING = 5;

interface OwnProps {
  label?: string;
}

const Rating: React.FC<OwnProps & FieldProps> = (props) => {
  const rating = props.field.value;
  const error = props.form.errors[props.field.name];
  const handleClick = (value: number) => {
    props.form.setFieldValue(props.field.name, value);
  };

  return (
    <div>
      {props.label ? <Label error={!!error}>{props.label}</Label> : null}
      <div className={css.rating}>
        {typeof rating === 'number'
          ? [...Array(rating)].map((_v, index) => (
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => handleClick(index + 1)}
                className={clsx(css.star)}
                key={`rating-${index}`}
              />
            ))
          : null}
        {MAX_RATING - rating > 0
          ? [...Array(MAX_RATING - rating)].map((_v, index) => (
              <FontAwesomeIcon
                onClick={() => handleClick(rating + index + 1)}
                key={`empty-${index}`}
                icon={faStarEmpty}
                className={clsx(css.star)}
              />
            ))
          : null}
      </div>
      {!!error ? <div className={css.error}>{error}</div> : null}
    </div>
  );
};

export default Rating;

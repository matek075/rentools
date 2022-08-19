import React from 'react';
import { FieldProps } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/pro-regular-svg-icons/faSquarePlus';
import { faSquareMinus } from '@fortawesome/pro-regular-svg-icons/faSquareMinus';
import clsx from 'clsx';

import Label from 'components/form/fields/Label';
import { Category as ICategory } from 'utils/product/categories';
import useCategories from 'hooks/products/useCategories';

import inputCss from '../Input/styles.module.scss';

import css from './styles.module.scss';

interface OwnProps {
  label?: string | React.ReactNode;
  id?: string;
  placeholder?: string;
}

interface CategoryProps {
  data: ICategory;
  value: string | number;
  onClick: (id: number) => void;
  name: string;
}

const Category: React.FC<CategoryProps> = ({ name, data, onClick, value }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={css.category}>
      {!data.children.length && (
        <>
          <input
            type="radio"
            name={name}
            id={`radio-${data.id}`}
            className={css.input}
            checked={data.id === value}
            onChange={() => {
              onClick(data.id);
            }}
          />
          <label htmlFor={`radio-${data.id}`} className={css.radio}>
            <span className={css.button} /> <span className={css.label}>{data.name}</span>
          </label>
        </>
      )}
      {data.children.length ? (
        <div>
          <div role="button" tabIndex={0} className={css.expandButton} onClick={toggleExpand}>
            <FontAwesomeIcon icon={expanded ? faSquareMinus : faSquarePlus} size="lg" />
            {data.name}
          </div>
        </div>
      ) : null}
      <div
        className={clsx({
          [css.children]: true,
          [css.open]: expanded,
        })}>
        {data.children.map((child) => (
          <Category key={child.id} data={child} onClick={onClick} value={value} name={name} />
        ))}
      </div>
    </div>
  );
};

const CategoryPicker: React.FC<FieldProps & OwnProps> = (props) => {
  const categories = useCategories();

  const error = props.form.errors[props.field.name];

  const handleClick = (id: number) => {
    props.form.setFieldValue(props.field.name, id);
  };

  return (
    <div>
      {props.label && (
        <Label error={!!error} htmlFor={props.id || props.field.name}>
          {props.label}
        </Label>
      )}
      <div className={clsx({ [css.wrapper]: true, [css.invalid]: !!error })}>
        {categories.map((category) => (
          <Category key={category.id} data={category} {...props.field} onClick={handleClick} />
        ))}
      </div>
      {error && <div className={inputCss.error}>{error}</div>}
    </div>
  );
};

export default CategoryPicker;

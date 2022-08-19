import React from 'react';

import { ProductCategory } from 'types';
import Label from 'components/form/fields/Label';
import ActionLink from 'components/navigation/ActionLink';

import css from './styles.module.scss';

interface OwnProps {
  categories: ProductCategory[];
  category: number;
  onSelect: (categoryId: number) => void;
}

const Sidebar: React.FC<OwnProps> = ({ categories, category, onSelect }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      <h6 className={css.title}>Kategorie</h6>
      {(expanded ? categories : categories.slice(0, 10)).map((cat) => (
        <div className={css.wrapper} key={cat.id}>
          <Label>
            <input
              className={css.checkbox}
              type="checkbox"
              name="category"
              value={cat.id}
              checked={category === cat.id}
              onChange={() => onSelect(cat.id)}
            />
            {cat.name}
          </Label>
        </div>
      ))}
      {
        categories.length > 10 && (
          <ActionLink onClick={() => { setExpanded(!expanded) }}>{ expanded ? 'Ukryj' : 'Pokaż wszystkie' }</ActionLink>
        )
      }
    </div>
  );
};

export default Sidebar;

import React from 'react';

import { Product } from 'types';
import ProductItem from 'components/products/ProductList/components/ProductItem';

interface OwnProps {
  items: Product[];
}

const ProductList: React.FC<OwnProps> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductList;

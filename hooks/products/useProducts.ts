import React from 'react';

import { getProducts, GetProductsDto } from 'utils/product/getProducts';
import { Product } from 'types';

export const useProducts = (dto: GetProductsDto): Product[] => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    let products: Product[] = [];
    (async () => {
      try {
        const response = await getProducts(dto);
        products = response.data;
      } catch (e) {
        products = [];
      }

      if (products) {
        setProducts(products);
      }
    })();
  }, [dto]);

  return products;
};

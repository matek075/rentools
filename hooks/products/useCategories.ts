import React from 'react';

import { Category, getCategories } from 'utils/product/categories';

const useUser = (): Category[] => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (async () => {
      const categories = await getCategories();

      if (categories) {
        setCategories(categories);
      }
    })();
  }, []);

  return categories;
};

export default useUser;

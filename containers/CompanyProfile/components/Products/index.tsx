import React from 'react';
import clsx from 'clsx';
import { faThLarge } from '@fortawesome/pro-regular-svg-icons/faThLarge';
import { faList } from '@fortawesome/pro-regular-svg-icons/faList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import { CompanyReview, Product, ProfileCategory } from 'types';
import Card from 'components/ui/Card';
import ProductCard, { ItemLayout } from 'components/business/ProductCard';
import Sidebar from 'containers/CompanyProfile/components/Products/components/Sidebar';
import { getCompanyProducts } from 'utils/product/getProducts';
import { ResultItem } from 'utils/product/search';
import Pagination from 'components/navigation/Pagination';

import css from './styles.module.scss';

interface OwnProps {
  companyId: number;
  location: string;
  products: Product[];
  total: number;
  categories: ProfileCategory[];
  reviews: CompanyReview[];
}

const Products: React.FC<OwnProps> = ({ products, categories, companyId,location, ...props }) => {
  const { query, push, asPath } = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState<number | undefined>(undefined);
  const [total, setTotal] = React.useState<number>(props.total || 0);
  const [perPage] = React.useState(12);
  const [layout, setLayout] = React.useState<ItemLayout>('card');
  const [items, setItems] = React.useState(products);

  let totalPages = 1;
  if (total > perPage) {
    totalPages = total % perPage !== 0 ? Math.floor(total / perPage) + 1 : Math.round(total / perPage);
  }

  const handleChangeCategory = (categoryId: number) => {
    const newCategory = categoryId === category ? undefined : categoryId;
    setCategory(newCategory);
    changePage(1);
    loadProducts(1, newCategory);
  };

  const loadProducts = (newPage: number, newCategory: number|undefined) => {
    setLoading(true);
    const response = getCompanyProducts(companyId, {
      take: perPage,
      skip: (newPage - 1 || 0) * perPage,
      categoryId: newCategory,
    });

    response.then((data) => {
      setItems(data.data);
      setTotal(data.total);
      setLoading(false);
    });
  }

  const changePage = (page: number) => {
    let path = asPath;
    if (path.includes('?')) {
      path = path.split('?')[0];
    };

    push(path + '?page=' + page, '', {
      shallow: true,
    });
  }

  const handlePageChange = (page: number) => {
    changePage(page);

    loadProducts(page, category);

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <h2>Sprzęt</h2>
      <div className={css.content}>
        <div className={css.sidebar}>
          <Card>
            <Sidebar categories={categories} category={category || 0} onSelect={handleChangeCategory} />
          </Card>
        </div>
        <div className={css.items}>
          <div className={css.icons}>
            <FontAwesomeIcon
              role="button"
              tabIndex={0}
              onClick={() => setLayout('card')}
              icon={faThLarge}
              className={clsx(css.icon, { [css.selected]: layout === 'card' })}
            />
            <FontAwesomeIcon
              role="button"
              tabIndex={0}
              onClick={() => setLayout('list')}
              icon={faList}
              className={clsx(css.icon, { [css.selected]: layout === 'list' })}
            />
          </div>
          <>
            <div
              className={clsx(css.inner, {
                [css.list]: layout === 'list',
                [css.cards]: layout === 'card',
                [css.loading]: loading,
              })}>
              {items.map((item) => {
                const prices = item.prices.sort((a, b) => (a.price < b.price ? -1 : 1));

                const data: ResultItem = {
                  price: prices && prices[0],
                  id: item.id,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                  brand: item.brand,
                  model: item.model,
                  city: location,
                  companyName: '',
                  categoryName: item.category.name,
                  files: item.files,
                };

                return <ProductCard key={`product-${item.id}`} data={data} layout={layout} />;
              })}
            </div>
            <Pagination page={+query.page || 1} total={totalPages} onChangePage={handlePageChange} />
          </>
        </div>
      </div>
    </div>
  );
};

export default Products;

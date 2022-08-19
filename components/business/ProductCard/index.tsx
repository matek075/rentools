import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/pro-solid-svg-icons';

import ImagePlaceholder from 'components/ui/ImagePlaceholder';
import { getSlugForProduct } from 'utils/product/slug';
import { ResultItem } from 'utils/product/search';

import css from './styles.module.scss';

export type ItemLayout = 'card' | 'list';

interface OwnProps {
  data: ResultItem;
  layout: ItemLayout;
}

const ENTER = 'Enter';

const ItemCard: React.FC<OwnProps> = ({ data, layout }) => {
  const router = useRouter();

  return (
    <div
      className={clsx(css.item, {
        [css.card]: layout === 'card',
        [css.list]: layout === 'list',
      })}
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/products/${data.id}/${getSlugForProduct(data.brand, data.model)}`)}
      onKeyUp={(e) => {
        if (e.key === ENTER) {
          router.push(`/products/${data.id}/${getSlugForProduct(data.brand, data.model)}`);
        }
      }}>
      <div className={css.thumbnail}>
        {data.files && data.files.length ? (
          <img
            alt={`${data.brand} ${data.model} product`}
            src={data.files.find((file) => file.order === 1)?.path}
            className={css.img}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className={css.content}>
        <div className={css.name}>
          {data.brand} {data.model}
        </div>
        <div className={css.category}>{data.categoryName}</div>
        <div className={css.companyName}>{data.companyName}</div>
        <div className={css.location}>
          <FontAwesomeIcon icon={faMapPin} /> {data.city}
        </div>
        {data.price ? (
          <div className={css.price}>{data.price.price}zł</div>
        ) : (
          <div className={css.askForPrice}>
            <FormattedMessage id="products.askForPrice" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;

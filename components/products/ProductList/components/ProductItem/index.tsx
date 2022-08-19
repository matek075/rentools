import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/pro-regular-svg-icons/faEdit';
import { FormattedMessage } from 'react-intl';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';
import { faComment } from '@fortawesome/pro-regular-svg-icons/faComment';
import { faStar } from '@fortawesome/pro-regular-svg-icons/faStar';

import ImagePlaceholder from 'components/ui/ImagePlaceholder';
import css from 'components/products/ProductList/components/ProductItem/styles.module.scss';
import { getSlugForProduct } from 'utils/product/slug';
import { Product } from 'types';

interface OwnProps {
  item: Product;
}

interface LinkProps {
  icon: IconProp;
  href: string;
}

const ActionLink: React.FC<LinkProps> = ({ href, children, icon }) => {
  return (
    <Link href={href}>
      <a className={css.action}>
        <FontAwesomeIcon icon={icon} className={css.icon} />
        {children}
      </a>
    </Link>
  );
};

const ProductItem: React.FC<OwnProps> = ({ item }) => {
  return (
    <div className={css.item}>
      <div className={css.image}>
        <div className={css.thumbnail}>
          {item.files.length ? (
            <img
              alt={`${item.brand} ${item.model} product`}
              src={item.files.find((file) => file.order === 1)?.path}
              className={css.img}
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </div>
      <div className={css.content}>
        <div className={css.name}>
          {item.brand} {item.model}
        </div>
        <div className={css.category}>{item.category.name}</div>
        <div className={css.bottom}>
          <a href="#" className={css.blob}>
            <FontAwesomeIcon icon={faEye} className={css.blobIcon} />
            1234
          </a>
          <a href="#" className={css.blob}>
            <FontAwesomeIcon icon={faComment} className={css.blobIcon} />
            12
          </a>
          <a href="#" className={css.blob}>
            <FontAwesomeIcon icon={faStar} className={css.blobIcon} />3
          </a>
        </div>
      </div>
      <div className={css.actions}>
        <ActionLink href={'/user/products/' + item.id} icon={faEdit}>
          <FormattedMessage id="ui.edit" />
        </ActionLink>
        <ActionLink href={`/products/${item.id}/${getSlugForProduct(item.brand, item.model)}`} icon={faEye}>
          <FormattedMessage id="ui.preview" />
        </ActionLink>
      </div>
    </div>
  );
};

export default ProductItem;

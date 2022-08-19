import React from 'react';
import ImageGallery from 'react-image-gallery';

import { Product } from 'types';

import css from './styles.module.scss';
interface OwnProps {
  product: Product;
}

const Gallery: React.FC<OwnProps> = (props) => {
  return (
    <div className={css.wrapper}>
      <h1>
        {props.product.brand} {props.product.model}
      </h1>
      <div className={css.gallery}>
        <ImageGallery
          infinite={false}
          showPlayButton={false}
          showNav={false}
          showFullscreenButton={false}
          items={props.product.files
            .sort((a, b) => (a.order > b.order ? 1 : -1))
            .map((file) => ({
              original: file.path,
              thumbnail: file.path,
            }))}
        />
      </div>
    </div>
  );
};

export default Gallery;

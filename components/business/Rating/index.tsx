import React from 'react';
import { faStar } from '@fortawesome/pro-solid-svg-icons/faStar';
import { faStar as faStarEmpty } from '@fortawesome/pro-regular-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './styles.module.scss';

interface OwnProps {
  rating: number;
}

const MAX_RATING = 5;

const Rating: React.FC<OwnProps> = ({ rating }) => {
  return (
    <div className={css.rating}>
      {[...Array(rating)].map((_v, index) => (
        <FontAwesomeIcon role="button" tabIndex={0} icon={faStar} className={css.star} key={`rating-${index}`} />
      ))}
      {MAX_RATING - rating > 0
        ? [...Array(MAX_RATING - rating)].map((_v, index) => (
            <FontAwesomeIcon
              role="button"
              tabIndex={0}
              key={`empty-${index}`}
              icon={faStarEmpty}
              className={css.star}
            />
          ))
        : null}
    </div>
  );
};

export default Rating;

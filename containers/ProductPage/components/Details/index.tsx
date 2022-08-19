import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/pro-regular-svg-icons/faTruck';
import { faHammer } from '@fortawesome/pro-regular-svg-icons/faHammer';
import { faCalendarRange } from '@fortawesome/pro-regular-svg-icons/faCalendarRange';
import { faMoneyFromBracket } from '@fortawesome/pro-regular-svg-icons/faMoneyFromBracket';

import ActionLink from 'components/navigation/ActionLink';
import Label from 'components/form/fields/Label';
import { Product } from 'types';

import css from './styles.module.scss';
interface OwnProps {
  product: Product;
}

const Details: React.FC<OwnProps> = (props) => {
  const [showPrices, setShowPrices] = React.useState(false);

  const sortedPrices = props.product.prices.sort((a, b) => (a.price < b.price ? -1 : 1));
  return (
    <>
      {sortedPrices.length ? (
        <>
          <Label>
            <FormattedMessage id="ui.netPrice" />
          </Label>
          <div className={css.price}>
            <div className={css.value}>{sortedPrices[0].price}zł</div>
            <div className={css.range}>
              / <FormattedMessage id={`range.${sortedPrices[0].range}`} />
            </div>
          </div>
          {!showPrices && sortedPrices.length > 1 && (
            <ActionLink onClick={() => setShowPrices(true)}>
              + <FormattedMessage id="products.showAllPrices" />
            </ActionLink>
          )}
          {showPrices &&
            sortedPrices.length > 1 &&
            sortedPrices.slice(1, sortedPrices.length).map((price) => (
              <div key={price.range} className={css.secondaryPrice}>
                <div className={css.value}>{price.price}zł</div>
                <div className={css.range}>
                  / <FormattedMessage id={`range.${price.range}`} />
                </div>
              </div>
            ))}
        </>
      ) : null}

      <div className={css.infos}>
        <div className={css.info}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className={css.text}>Dostepna dostawa lub odbior osobisty</div>
        </div>
        <div className={css.info}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faMoneyFromBracket} />
          </div>
          <div className={css.text}>
            Depozyt: <strong>{props.product.deposit || 0}zł</strong>
          </div>
        </div>
        <div className={css.info}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faHammer} />
          </div>
          <div className={css.text}>
            Stan: <strong>bardzo dobry</strong>
          </div>
        </div>
        {props.product.minRentalValue > 0 && (
          <div className={css.info}>
            <div className={css.icon}>
              <FontAwesomeIcon icon={faCalendarRange} />
            </div>

            <div className={css.text}>
              Minimalny okres wynajmu:{' '}
              <strong>
                {props.product.minRentalValue}{' '}
                <FormattedMessage id={`products.range.${props.product.minRentalRange}`} />
              </strong>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;

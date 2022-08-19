import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/ui/Button';
import { CompanyPlan } from 'context/company/types';

import css from './styles.module.scss';

interface OwnProps {
  plan: CompanyPlan;
}

const Buttons: React.FC<OwnProps> = ({ plan }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.links}>
        {plan !== CompanyPlan.Basic && (
          <Button
            color="link"
            size="lg"
            className={css.link}
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}>
            Sprzęt
          </Button>
        )}
        <Button
          color="link"
          size="lg"
          className={css.link}
          onClick={() => {
            document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
          }}>
          O firmie
        </Button>
        <Button
          color="link"
          size="lg"
          className={css.link}
          onClick={() => {
            document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
          }}>
          Opinie
        </Button>
      </div>
      <div className={css.reviewButton}>
        <Button
          size="md"
          onClick={() => {
            document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
          }}>
          <FormattedMessage id="profile.writeReview" />
        </Button>
      </div>
    </div>
  );
};

export default Buttons;

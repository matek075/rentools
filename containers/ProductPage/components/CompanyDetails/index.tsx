import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

import Settings from 'settings';
import Label from 'components/form/fields/Label';
import { Company } from 'context/company/types';
import Button from 'components/ui/Button';

import css from './styles.module.scss';
interface OwnProps {
  company: Company;
}

const CompanyDetails: React.FC<OwnProps> = ({ company }) => {
  return (
    <div>
      <Label>
        <FormattedMessage id="ui.rentalCompany" />
      </Label>
      {company.logo?.path ? <img src={company.logo.path} alt={`${company.name} logo`} className={css.logo} /> : null}

      <div className={css.company}>
        <div className={css.name}>{company.name}</div>
        <div className={css.map}>
          <img
            src={`${Settings.API_URL}geolocation/map/${company.geolocation.id}`}
            width="100%"
            alt={`${company.geolocation.fullName} mapa`}
          />
          <div className={css.cityName}>
            {company.geolocation.fullName}, {company.postCode}
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <Link href={`/wypozyczalnia/${company.slug}`}>
          <Button color="link-secondary" size="sm" as="a">
            <FormattedMessage id="products.visitCompany" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyDetails;

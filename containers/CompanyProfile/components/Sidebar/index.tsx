import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/pro-solid-svg-icons/faMapPin';
import { faPhone } from '@fortawesome/pro-solid-svg-icons/faPhone';
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons/faEnvelope';

import Card from 'components/ui/Card';
import Settings from 'settings';
import css from 'containers/CompanyProfile/components/Details/styles.module.scss';
import Button from 'components/ui/Button';
import { Company } from 'context/company/types';
import { hasOpeningHours } from 'utils/company/common';

import OpeningHoursComponent from '../OpeningHours';

interface OwnProps {
  data: Company;
}

const Sidebar: React.FC<OwnProps> = ({ data }) => {
  const [showEmail, setShowEmail] = React.useState(false);
  const [showPhone, setShowPhone] = React.useState(false);

  return (
    <>
      <Card>
        <h6 className="mt-0">{data.name}</h6>
        <img
          src={`${Settings.API_URL}geolocation/map/${data.geolocation.id}`}
          width="100%"
          alt={`${data.geolocation.fullName} mapa`}
        />
        <div className={css.detail}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faMapPin} transform="right-7" />
          </div>
          <div className={css.content}>
            <div className={css.city}>{data.geolocation.fullName}</div>
            <div className={css.address}>{data.address}</div>
            <div className={css.address}>
              {data.postCode}, {data.geolocation.name}
            </div>
          </div>
        </div>
        <div className={css.detail}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faPhone} transform="right-4" />
          </div>
          <div className={css.content}>
            {showPhone ? (
              <div className={css.contact}>{data.phone}</div>
            ) : (
              <Button color="link" className={css.revealButton} onClick={() => setShowPhone(true)}>
                Pokaż numer telefonu
              </Button>
            )}
          </div>
        </div>
        <div className={css.detail}>
          <div className={css.icon}>
            <FontAwesomeIcon icon={faEnvelope} transform="right-4" />
          </div>
          <div className={css.content}>
            {showEmail ? (
              <div className={css.contact}>{data.email}</div>
            ) : (
              <Button color="link" className={css.revealButton} onClick={() => setShowEmail(true)}>
                Pokaż adres e-mail
              </Button>
            )}
          </div>
        </div>
      </Card>
      {hasOpeningHours(data.openingHours) ? (
        <Card className="mt-5">
          <h6 className="mt-0">Godziny otwarcia</h6>
          <OpeningHoursComponent openingHours={data.openingHours} />
        </Card>
      ) : null}
    </>
  );
};

export default Sidebar;

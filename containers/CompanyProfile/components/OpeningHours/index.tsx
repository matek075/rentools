import React from 'react';

import { OpeningHours as OpeningHoursType } from 'types';

import css from './styles.module.scss';
import OpeningHour from './components/OpeningHour';

interface OwnProps {
  openingHours: OpeningHoursType;
}

const OpeningHourRow: React.FC<{ from: string | null; to: string | null }> = ({ from, to }) => {
  if (!from || !to) {
    return <>Nieczynne</>;
  }

  return (
    <>
      <OpeningHour value={from} />
      {' - '}
      <OpeningHour value={to} />
    </>
  );
};

const OpeningHours: React.FC<OwnProps> = ({ openingHours }) => {
  return (
    <div className={css.openingHours}>
      <div className={css.day}>
        Poniedziałek:
        <div className={css.hours}>
          <OpeningHourRow from={openingHours.mondayFrom} to={openingHours.mondayTo} />
        </div>
      </div>
      <div className={css.day}>
        Wtorek:
        <div className={css.hours}>
          <OpeningHourRow from={openingHours.tuesdayFrom} to={openingHours.tuesdayTo} />
        </div>
      </div>
      <div className={css.day}>
        Środa:
        <div className={css.hours}>
          <OpeningHourRow from={openingHours.wednesdayFrom} to={openingHours.wednesdayTo} />
        </div>
      </div>
      <div className={css.day}>
        Czwartek:
        <div className={css.hours}>
          <OpeningHourRow from={openingHours.thursdayFrom} to={openingHours.thursdayTo} />
        </div>
      </div>
      <div className={css.day}>
        Piątek:
        <div className={css.hours}>
          <OpeningHourRow from={openingHours.fridayFrom} to={openingHours.fridayTo} />
        </div>
      </div>
      <div className={css.day}>
        Sobota:
        <div className={css.hours}>
          <OpeningHourRow from={openingHours.saturdayFrom} to={openingHours.saturdayTo} />
        </div>
      </div>
      <div className={css.day}>
        Niedziela:
        <div className={css.hours}>
          <OpeningHourRow from={openingHours.sundayFrom} to={openingHours.sundayTo} />
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;

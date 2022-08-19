import { OpeningHours } from 'types';


export const hasOpeningHours = (hours: OpeningHours): boolean => {
  if (
    !hours.mondayFrom &&
    !hours.tuesdayFrom &&
    !hours.wednesdayFrom &&
    !hours.thursdayFrom &&
    !hours.fridayFrom &&
    !hours.saturdayFrom &&
    !hours.sundayFrom
  ) {
    return false;
  }

  return true;
};

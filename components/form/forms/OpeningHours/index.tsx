import React from 'react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';

import { OpeningHours, ParseOpeningHours } from 'types';
import Row from 'components/form/fields/Row';
import Checkbox from 'components/form/fields/Checkbox';
import Button from 'components/ui/Button';
import { applyErrors } from 'utils/formik';
import { updateOpeningHours, UpdateOpeningHoursDto } from 'utils/company/update';
import Select from 'components/form/fields/Select';
import Label from 'components/form/fields/Label';
import { companyContext } from 'context/company';

import css from './styles.module.scss';

interface OwnProps {
  openingHours: OpeningHours;
}

const OpeningHoursUpdate: React.FC<OwnProps> = ({ openingHours }) => {
  const companyState = React.useContext(companyContext);
  const intl = useIntl();

  const initialValues: UpdateOpeningHoursDto = {
    mondayFrom: openingHours.mondayFrom != null ? openingHours.mondayFrom : null,
    mondayTo: openingHours.mondayTo != null ? openingHours.mondayTo : null,
    tuesdayFrom: openingHours.tuesdayFrom != null ? openingHours.tuesdayFrom : null,
    tuesdayTo: openingHours.tuesdayTo != null ? openingHours.tuesdayTo : null,
    wednesdayFrom: openingHours.wednesdayFrom != null ? openingHours.wednesdayFrom : null,
    wednesdayTo: openingHours.wednesdayTo != null ? openingHours.wednesdayTo : null,
    thursdayFrom: openingHours.thursdayFrom != null ? openingHours.thursdayFrom : null,
    thursdayTo: openingHours.thursdayTo != null ? openingHours.thursdayTo : null,
    fridayFrom: openingHours.fridayFrom != null ? openingHours.fridayFrom : null,
    fridayTo: openingHours.fridayTo != null ? openingHours.fridayTo : null,
    saturdayFrom: openingHours.saturdayFrom != null ? openingHours.saturdayFrom : null,
    saturdayTo: openingHours.saturdayTo != null ? openingHours.saturdayTo : null,
    sundayFrom: openingHours.sundayFrom != null ? openingHours.sundayFrom : null,
    sundayTo: openingHours.sundayTo != null ? openingHours.sundayTo : null,
  };

  interface FormValues extends ParseOpeningHours {
    mondayClosed: boolean;
    tuesdayClosed: boolean;
    wednesdayClosed: boolean;
    thursdayClosed: boolean;
    fridayClosed: boolean;
    saturdayClosed: boolean;
    sundayClosed: boolean;
  }

  const parsedInitialValues: FormValues = {
    mondayFromHours: initialValues.mondayFrom != null ? initialValues.mondayFrom.split(':')[0] : '08',
    mondayFromMinutes: initialValues.mondayFrom != null ? initialValues.mondayFrom.split(':')[1] : '00',
    mondayToHours: initialValues.mondayTo != null ? initialValues.mondayTo.split(':')[0] : '16',
    mondayToMinutes: initialValues.mondayTo != null ? initialValues.mondayTo.split(':')[1] : '00',
    tuesdayFromHours: initialValues.tuesdayFrom != null ? initialValues.tuesdayFrom.split(':')[0] : '08',
    tuesdayFromMinutes: initialValues.tuesdayFrom != null ? initialValues.tuesdayFrom.split(':')[1] : '00',
    tuesdayToHours: initialValues.tuesdayTo != null ? initialValues.tuesdayTo.split(':')[0] : '16',
    tuesdayToMinutes: initialValues.tuesdayTo != null ? initialValues.tuesdayTo.split(':')[1] : '00',
    wednesdayFromHours: initialValues.wednesdayFrom != null ? initialValues.wednesdayFrom.split(':')[0] : '08',
    wednesdayFromMinutes: initialValues.wednesdayFrom != null ? initialValues.wednesdayFrom.split(':')[1] : '00',
    wednesdayToHours: initialValues.wednesdayTo != null ? initialValues.wednesdayTo.split(':')[0] : '16',
    wednesdayToMinutes: initialValues.wednesdayTo != null ? initialValues.wednesdayTo.split(':')[1] : '00',
    thursdayFromHours: initialValues.thursdayFrom != null ? initialValues.thursdayFrom.split(':')[0] : '08',
    thursdayFromMinutes: initialValues.thursdayFrom != null ? initialValues.thursdayFrom.split(':')[1] : '00',
    thursdayToHours: initialValues.thursdayTo != null ? initialValues.thursdayTo.split(':')[0] : '16',
    thursdayToMinutes: initialValues.thursdayTo != null ? initialValues.thursdayTo.split(':')[1] : '00',
    fridayFromHours: initialValues.fridayFrom != null ? initialValues.fridayFrom.split(':')[0] : '08',
    fridayFromMinutes: initialValues.fridayFrom != null ? initialValues.fridayFrom.split(':')[1] : '00',
    fridayToHours: initialValues.fridayTo != null ? initialValues.fridayTo.split(':')[0] : '16',
    fridayToMinutes: initialValues.fridayTo != null ? initialValues.fridayTo.split(':')[1] : '00',
    saturdayFromHours: initialValues.saturdayFrom != null ? initialValues.saturdayFrom.split(':')[0] : '08',
    saturdayFromMinutes: initialValues.saturdayFrom != null ? initialValues.saturdayFrom.split(':')[1] : '00',
    saturdayToHours: initialValues.saturdayTo != null ? initialValues.saturdayTo.split(':')[0] : '16',
    saturdayToMinutes: initialValues.saturdayTo != null ? initialValues.saturdayTo.split(':')[1] : '00',
    sundayFromHours: initialValues.sundayFrom != null ? initialValues.sundayFrom.split(':')[0] : '08',
    sundayFromMinutes: initialValues.sundayFrom != null ? initialValues.sundayFrom.split(':')[1] : '00',
    sundayToHours: initialValues.sundayTo != null ? initialValues.sundayTo.split(':')[0] : '16',
    sundayToMinutes: initialValues.sundayTo != null ? initialValues.sundayTo.split(':')[1] : '00',
    mondayClosed: initialValues.mondayFrom != null ? false : true,
    tuesdayClosed: initialValues.tuesdayFrom != null ? false : true,
    wednesdayClosed: initialValues.wednesdayFrom != null ? false : true,
    thursdayClosed: initialValues.thursdayFrom != null ? false : true,
    fridayClosed: initialValues.fridayFrom != null ? false : true,
    saturdayClosed: initialValues.saturdayFrom != null ? false : true,
    sundayClosed: initialValues.sundayFrom != null ? false : true,
  };

  const handleSubmit = async (values: ParseOpeningHours, helpers: FormikHelpers<ParseOpeningHours>) => {
    helpers.setErrors;
    try {
      console.log('baluess', values);
      await updateOpeningHours(values);
      await companyState.loadCompany();
      window.notyf.success(intl.formatMessage({ id: 'ui.updateSuccess' }));
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  const hoursOptions = [
    '',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ].map((v) => ({ label: v, value: v }));

  const minutesOptions = ['', '00', '15', '30', '45'].map((v) => ({ label: v, value: v }));

  return (
    <Formik initialValues={parsedInitialValues} onSubmit={handleSubmit} enableReinitialize>
      {(form) => (
        <Form>
          <div className={css.days}>
            <div className={css.day}>
              <div className={css.dayTop}>
                <h6>Poniedzialek</h6>
                <div className={css.field}>
                  <Field
                    name="mondayClosed"
                    id="mondayClosed"
                    component={Checkbox}
                    label={<FormattedMessage id="form.closed" />}
                  />
                </div>
              </div>

              <Label className={css.fromLabel}>
                <FormattedMessage id="form.from" />
              </Label>
              <Label className={css.toLabel}>
                <FormattedMessage id="form.to" />
              </Label>
              <div className={css.fromInputs}>
                <Field
                  name="mondayFromHours"
                  component={Select}
                  options={hoursOptions}
                  disabled={form.values.mondayClosed}
                />
                <Field
                  name="mondayFromMinutes"
                  component={Select}
                  options={minutesOptions}
                  disabled={form.values.mondayClosed}
                />
              </div>
              <div className={css.toInputs}>
                <Field
                  name="mondayToHours"
                  component={Select}
                  options={hoursOptions}
                  disabled={form.values.mondayClosed}
                />
                <Field
                  name="mondayToMinutes"
                  component={Select}
                  options={minutesOptions}
                  disabled={form.values.mondayClosed}
                />
              </div>
            </div>
            <div className={css.day}>
              <div className={css.dayTop}>
                <h6>Wtorek</h6>
                <div className={css.field}>
                  <Field
                    name="tuesdayClosed"
                    id="tuesdayClosed"
                    component={Checkbox}
                    label={<FormattedMessage id="form.closed" />}
                  />
                </div>
              </div>
              <>
                <Label className={css.fromLabel}>
                  <FormattedMessage id="form.from" />
                </Label>
                <Label className={css.toLabel}>
                  <FormattedMessage id="form.to" />
                </Label>
                <div className={css.fromInputs}>
                  <Field
                    name="tuesdayFromHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.tuesdayClosed}
                  />
                  <Field
                    name="tuesdayFromMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.tuesdayClosed}
                  />
                </div>
                <div className={css.toInputs}>
                  <Field
                    name="tuesdayToHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.tuesdayClosed}
                  />
                  <Field
                    name="tuesdayToMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.tuesdayClosed}
                  />
                </div>
              </>
            </div>
            <div className={css.day}>
              <div className={css.dayTop}>
                <h6>Środa</h6>
                <div className={css.field}>
                  <Field
                    name="wednesdayClosed"
                    id="wednesdayClosed"
                    component={Checkbox}
                    label={<FormattedMessage id="form.closed" />}
                  />
                </div>
              </div>
              <>
                <Label className={css.fromLabel}>
                  <FormattedMessage id="form.from" />
                </Label>
                <Label className={css.toLabel}>
                  <FormattedMessage id="form.to" />
                </Label>
                <div className={css.fromInputs}>
                  <Field
                    name="wednesdayFromHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.wednesdayClosed}
                  />
                  <Field
                    name="wednesdayFromMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.wednesdayClosed}
                  />
                </div>
                <div className={css.toInputs}>
                  <Field
                    name="wednesdayToHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.wednesdayClosed}
                  />
                  <Field
                    name="wednesdayToMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.wednesdayClosed}
                  />
                </div>
              </>
            </div>
            <div className={css.day}>
              <div className={css.dayTop}>
                <h6>Czwartek</h6>
                <div className={css.field}>
                  <Field
                    name="thursdayClosed"
                    id="thursdayClosed"
                    component={Checkbox}
                    label={<FormattedMessage id="form.closed" />}
                  />
                </div>
              </div>
              <>
                <Label className={css.fromLabel}>
                  <FormattedMessage id="form.from" />
                </Label>
                <Label className={css.toLabel}>
                  <FormattedMessage id="form.to" />
                </Label>
                <div className={css.fromInputs}>
                  <Field
                    name="thursdayFromHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.thursdayClosed}
                  />
                  <Field
                    name="thursdayFromMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.thursdayClosed}
                  />
                </div>
                <div className={css.toInputs}>
                  <Field
                    name="thursdayToHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.thursdayClosed}
                  />
                  <Field
                    name="thursdayToMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.thursdayClosed}
                  />
                </div>
              </>
            </div>
            <div className={css.day}>
              <div className={css.dayTop}>
                <h6>Piątek</h6>
                <div className={css.field}>
                  <Field
                    name="fridayClosed"
                    id="fridayClosed"
                    component={Checkbox}
                    label={<FormattedMessage id="form.closed" />}
                  />
                </div>
              </div>
              <>
                <Label className={css.fromLabel}>
                  <FormattedMessage id="form.from" />
                </Label>
                <Label className={css.toLabel}>
                  <FormattedMessage id="form.to" />
                </Label>
                <div className={css.fromInputs}>
                  <Field
                    name="fridayFromHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.fridayClosed}
                  />
                  <Field
                    name="fridayFromMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.fridayClosed}
                  />
                </div>
                <div className={css.toInputs}>
                  <Field
                    name="fridayToHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.fridayClosed}
                  />
                  <Field
                    name="fridayToMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.fridayClosed}
                  />
                </div>
              </>
            </div>
            <div className={css.day}>
              <div className={css.dayTop}>
                <h6>Sobota</h6>
                <div className={css.field}>
                  <Field
                    name="saturdayClosed"
                    id="saturdayClosed"
                    component={Checkbox}
                    label={<FormattedMessage id="form.closed" />}
                  />
                </div>
              </div>
              <>
                <Label className={css.fromLabel}>
                  <FormattedMessage id="form.from" />
                </Label>
                <Label className={css.toLabel}>
                  <FormattedMessage id="form.to" />
                </Label>
                <div className={css.fromInputs}>
                  <Field
                    name="saturdayFromHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.saturdayClosed}
                  />
                  <Field
                    name="saturdayFromMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.saturdayClosed}
                  />
                </div>
                <div className={css.toInputs}>
                  <Field
                    name="saturdayToHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.saturdayClosed}
                  />
                  <Field
                    name="saturdayToMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.saturdayClosed}
                  />
                </div>
              </>
            </div>
            <div className={css.day}>
              <div className={css.dayTop}>
                <h6>Niedziela</h6>
                <div className={css.field}>
                  <Field
                    name="sundayClosed"
                    id="sundayClosed"
                    component={Checkbox}
                    label={<FormattedMessage id="form.closed" />}
                  />
                </div>
              </div>
              <>
                <Label className={css.fromLabel}>
                  <FormattedMessage id="form.from" />
                </Label>
                <Label className={css.toLabel}>
                  <FormattedMessage id="form.to" />
                </Label>
                <div className={css.fromInputs}>
                  <Field
                    name="sundayFromHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.sundayClosed}
                  />
                  <Field
                    name="sundayFromMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.sundayClosed}
                  />
                </div>
                <div className={css.toInputs}>
                  <Field
                    name="sundayToHours"
                    component={Select}
                    options={hoursOptions}
                    disabled={form.values.sundayClosed}
                  />
                  <Field
                    name="sundayToMinutes"
                    component={Select}
                    options={minutesOptions}
                    disabled={form.values.sundayClosed}
                  />
                </div>
              </>
            </div>
          </div>
          <Row>
            <Button type="submit" color="primary" block>
              <FormattedMessage id="ui.updateData" />
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default OpeningHoursUpdate;

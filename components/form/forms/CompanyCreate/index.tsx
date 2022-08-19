import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { FormattedMessage } from 'react-intl';

import { companyContext } from 'context/company';
import Button from 'components/ui/Button';
import { applyErrors } from 'utils/formik';
import StepZero from 'components/form/forms/CompanyCreate/components/StepZero';
import StepOne from 'components/form/forms/CompanyCreate/components/StepOne';
import { createCompany, CreateCompanyDto } from 'utils/user/user';

import css from './styles.module.scss';

type FormData = CreateCompanyDto;

interface OwnProps {
  handleFinish?: () => void;
}

const CompanyCreate: React.FC<OwnProps> = () => {
  const [step, setStep] = React.useState(0);
  const companyState = React.useContext(companyContext);

  const initialValues: FormData = {
    name: '',
    vatId: '',
    address: '',
    geolocationId: '',
    postCode: '',
    slug: '',
  };

  const handleSubmit = async (values: FormData, helpers: FormikHelpers<FormData>) => {
    try {
      const company = await createCompany(values);
      companyState.setCompany(company);
      await companyState.loadCompany();
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  const onNext = () => async () => {
    if (step === 0) {
      setStep(1);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(form) => (
        <Form>
          {step === 0 && <StepZero />}
          {step === 1 && <StepOne form={form} />}
          <div className={css.footer}>
            <div className={css.next}>
              {step === 0 && (
                <Button type="button" block color="primary" onClick={onNext()}>
                  <FormattedMessage id="ui.start" />
                </Button>
              )}
              {step === 1 && (
                <Button type="submit" block color="primary">
                  <FormattedMessage id="ui.confirm" />
                </Button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyCreate;

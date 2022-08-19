import React from 'react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from 'components/ui/Button';
import Row from 'components/form/fields/Row';
import { applyErrors } from 'utils/formik';
import { updateCompany, UpdateCompanyDto } from 'utils/company/update';
import { Company } from 'context/company/types';
import Textarea from 'components/form/fields/Textarea';
import { companyContext } from 'context/company';
import Editor from 'components/form/fields/Editor';

interface OwnProps {
  company: Company;
}

const CompanyDescriptions: React.FC<OwnProps> = ({ company }) => {
  const companyState = React.useContext(companyContext);
  const intl = useIntl();

  const initialValues: UpdateCompanyDto = {
    description: company.description,
    information: company.information,
  };

  const handleSubmit = async (values: UpdateCompanyDto, helpers: FormikHelpers<UpdateCompanyDto>) => {
    helpers.setErrors;
    try {
      await updateCompany(company.id, values);
      await companyState.loadCompany();
      window.notyf.success(intl.formatMessage({ id: 'ui.updateSuccess' }));
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
      {() => (
        <Form>
          <Row>
            <Field name="description" component={Textarea} label={<FormattedMessage id="ui.description" />} />
          </Row>
          <Row>
            <Field name="information" component={Editor} label={<FormattedMessage id="account.companyInformation" />} />
          </Row>
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

export default CompanyDescriptions;

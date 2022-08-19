import React from 'react';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';

import Input from 'components/form/fields/Input';
import Button from 'components/ui/Button';
import Row from 'components/form/fields/Row';
import { applyErrors } from 'utils/formik';
import { updateCompany, UpdateCompanyDto } from 'utils/company/update';
import { Company } from 'context/company/types';
import GeoCityAutocomplete from 'components/form/fields/GeoCityAutocomplete';
import { companyContext } from 'context/company';
import Image from 'components/form/fields/Image';

interface OwnProps {
  company: Company;
}

const CompanyUpdate: React.FC<OwnProps> = ({ company }) => {
  const companyState = React.useContext(companyContext);
  const intl = useIntl();

  const initialValues: UpdateCompanyDto = {
    name: company.name,
    address: company.address,
    geolocationId: company.geolocation.id,
    slug: company.slug,
    email: company.email || '',
    phone: company.phone || '',
    postCode: company.postCode,
    vatId: company.vatId,
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
            <Field name="name" component={Input} label={<FormattedMessage id="ui.companyName" />} />
          </Row>
          <Row>
            <Field
              name="logoId"
              component={Image}
              initialImage={company.logo?.path}
              label={<FormattedMessage id="ui.logo" />}
            />
          </Row>
          <Row>
            <Field name="vatId" component={Input} label={<FormattedMessage id="ui.vatId" />} />
          </Row>
          <Row>
            <Field name="address" component={Input} label={<FormattedMessage id="ui.address" />} />
          </Row>
          <Row>
            <Field
              name="geolocationId"
              component={GeoCityAutocomplete}
              label={<FormattedMessage id="ui.city" />}
              initialInputValue={company.geolocation.name}
            />
          </Row>
          <Row>
            <Field name="email" component={Input} label={<FormattedMessage id="ui.companyEmail" />} />
          </Row>
          <Row>
            <Field name="phone" component={Input} label={<FormattedMessage id="ui.phoneNumber" />} />
          </Row>
          <Row>
            <Field name="postCode" component={Input} label={<FormattedMessage id="ui.postCode" />} />
          </Row>
          <Row>
            <Field
              name="slug"
              component={Input}
              prefix="rentools.pl/wypozyczalnia/"
              label={<FormattedMessage id="ui.slug" />}
              placeholder="twoj-adres"
            />
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

export default CompanyUpdate;

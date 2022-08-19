import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { UpdateCompanyDto } from 'utils/company/update';
import { Company } from 'context/company/types';
import { applyErrors } from 'utils/formik';
import Row from 'components/form/fields/Row';
import Input from 'components/form/fields/Input';
import { updateCompany } from 'utils/admin/companies';
import GeoCityAutocomplete from 'components/form/fields/GeoCityAutocomplete';
import Button from 'components/ui/Button';
import Card from 'components/ui/Card';
import Select from 'components/form/fields/Select';

import css from './styles.module.scss';

interface OwnProps {
  company: Company;
}

const CompanyEdit: React.FC<OwnProps> = ({ company }) => {
  const intl = useIntl();

  const initialValues: UpdateCompanyDto = {
    name: company.name,
    address: company.address,
    geolocationId: company.geolocation?.id,
    slug: company.slug,
    email: company.email || '',
    phone: company.phone || '',
    postCode: company.postCode,
    vatId: company.vatId,
    plan: company.plan,
  };

  const handleSubmit = async (values: UpdateCompanyDto, helpers: FormikHelpers<UpdateCompanyDto>) => {
    helpers.setErrors;
    try {
      await updateCompany(company.id, values);
      window.notyf.success(intl.formatMessage({ id: 'ui.updateSuccess' }));
    } catch (e) {
      applyErrors(e, helpers);
    }
  };

  const plans = [
    {
      value: 1,
      label: 'Basic',
    },
    {
      value: 2,
      label: 'Standard'
    }
  ]

  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <h1>Firma &quot;{ company.name }&quot;</h1>
        <h5>ID: {company.id}</h5>
        <Card>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
            {() => (
              <Form>
                <Row>
                  <Field name="name" component={Input} label={<FormattedMessage id="ui.companyName" />} />
                </Row>
                <Row>
                  <Field name="plan" component={Select} options={plans} label={<FormattedMessage id="ui.company.plan" />} />
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
                    initialInputValue={company.geolocation?.name}
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
        </Card>
      </div>
    </div>
  )
}

export default CompanyEdit;

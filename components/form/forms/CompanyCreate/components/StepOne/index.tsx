import React from 'react';
import { Field, FormikProps } from 'formik';
import { FormattedMessage } from 'react-intl';

import Input from 'components/form/fields/Input';
import Row from 'components/form/fields/Row';
import GeoCityAutocomplete from 'components/form/fields/GeoCityAutocomplete';

const StepOne: React.FC<{ form: FormikProps<any> }> = () => {
  return (
    <div>
      <h1>Dane firmy</h1>
      <p className="mb-4 text-gray-400">
        Wypełnij poniższe dane o swojej firmie, które zostaną wyświetlone na Twojej wizytówce
      </p>
      <Row>
        <Field name="name" component={Input} label={<FormattedMessage id="ui.companyName" />} />
      </Row>
      <Row>
        <Field name="vatId" component={Input} label={<FormattedMessage id="ui.vatId" />} />
      </Row>
      <Row>
        <Field name="address" component={Input} label={<FormattedMessage id="ui.address" />} />
      </Row>
      <Row>
        <Field name="geolocationId" component={GeoCityAutocomplete} label={<FormattedMessage id="ui.city" />} />
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
    </div>
  );
};

export default StepOne;

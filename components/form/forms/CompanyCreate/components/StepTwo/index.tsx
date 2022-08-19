import React from 'react';
import { Field } from 'formik';

import Image from 'components/form/fields/Image';

const StepTwo: React.FC = () => {
  return (
    <div>
      <h1>2. Dane profilowe</h1>
      <Field name="logoId" fileType="logo" component={Image} label="Logo firmy" />
    </div>
  );
};

export default StepTwo;

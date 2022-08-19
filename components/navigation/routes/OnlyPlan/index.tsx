import React from 'react';

import { userContext } from 'context/user';
import { companyContext } from 'context/company';
import { UserType } from 'context/user/types';
import { CompanyPlan } from 'context/company/types';

interface OwnProps {
  plan?: CompanyPlan;
  type?: UserType;
}

const OnlyPlan: React.FC<OwnProps> = ({ type = 'user', plan = 1, children }) => {
  const user = React.useContext(userContext);
  const company = React.useContext(companyContext);

  if (!user.data || !company.data) {
    return null;
  }

  if (type && user.data.type !== type) {
    return null;
  }

  if (plan && company.data.plan !== plan) {
    return null;
  }

  return <>{children}</>;
};

export default OnlyPlan;

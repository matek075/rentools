import React from 'react';

import { getCompany } from 'utils/user/user';
import { userContext } from 'context/user';
import { UserType } from 'context/user/types';

import { Company, CompanyState } from './types';

import { companyContext } from './index';

const CompanyProvider: React.FC = ({ children }) => {
  const user = React.useContext(userContext);

  const setCompany = React.useCallback((newCompany: Company) => {
    setState({
      ...state,
      data: newCompany,
    });
  }, []);

  const loadCompanyMethod = React.useCallback(async () => {
    const response = await getCompany();
    if (response) {
      setState({
        ...state,
        loading: false,
        data: {
          ...response.company,
          questionsCount: response.questionsCount
        },
      });
    } else {
      setState({
        ...state,
        loading: false,
        data: undefined,
      });
    }
  }, []);

  const [state, setState] = React.useState<CompanyState>({
    loading: true,
    setCompany,
    loadCompany: loadCompanyMethod,
  });

  React.useEffect(() => {
    if (user.loading) {
      return;
    }

    if (user && user.data?.type === UserType.Partner && !state.data) {
      loadCompanyMethod();
    }
  }, [user.authenticated, user.loading]);

  return <companyContext.Provider value={state}>{children}</companyContext.Provider>;
};

export default CompanyProvider;

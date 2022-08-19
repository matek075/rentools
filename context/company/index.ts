import { createContext } from 'react';

import { CompanyState } from './types';

const initialState: CompanyState = {
  loading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCompany: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loadCompany: () => {},
};

const companyContext = createContext(initialState);

export { companyContext };

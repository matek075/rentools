import { createContext } from 'react';

import { AdminState } from 'context/user/types';

const initialState: AdminState = {
  authenticated: false,
  loading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
};

const adminContext = createContext(initialState);

export { adminContext };

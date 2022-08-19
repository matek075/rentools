import { createContext } from 'react';

import { UserState } from 'context/user/types';

const initialState: UserState = {
  authenticated: false,
  loading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh: () => {},
};

const userContext = createContext(initialState);

export { userContext };

import React from 'react';
import jwtDecode from 'jwt-decode';

import settings from 'settings';
import { getCookie } from 'utils/cookies';
import { User } from 'types';

const useUser = (): User | undefined => {
  const [user, setUser] = React.useState<User | undefined>();

  React.useEffect(() => {
    const accessToken = getCookie(settings.AUTH_COOKIE_NAME);

    if (accessToken) {
      const payload: User = jwtDecode(accessToken);
      if (payload) {
        setUser(payload);
      }
    }
  }, []);

  return user;
};

export default useUser;

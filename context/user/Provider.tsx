import React from 'react';
import jwtDecode from 'jwt-decode';

import { UserState } from 'context/user/types';
import { eraseCookie, getCookie, setCookie } from 'utils/cookies';
import settings from 'settings';
import { UserJWT } from 'types';
import { refresh } from 'utils/user/refresh';

import { userContext } from './index';

const validateToken = (accessToken: string): UserJWT | null => {
  const data: UserJWT = jwtDecode(accessToken);
  const timeStamp = new Date().getTime() / 1000;

  if (!data) {
    return null;
  }

  if (timeStamp > data.exp) {
    eraseCookie(settings.AUTH_COOKIE_NAME);
    return null;
  }

  return data;
};

const UserProvider: React.FC = ({ children }) => {
  const refreshUser = async () => {
    try {
      const {
        data: { accessToken },
      } = await refresh();
      if (accessToken) {
        const data = validateToken(accessToken);
        if (data) {
          setCookie(settings.AUTH_COOKIE_NAME, accessToken);
          setState({
            ...state,
            loading: false,
            authenticated: true,
            data,
          });
        }
      }
    } catch (e) {}
  };

  const signIn = React.useCallback(
    (accessToken: string) => {
      if (accessToken) {
        try {
          const data = validateToken(accessToken);
          if (data) {
            setCookie(settings.AUTH_COOKIE_NAME, accessToken);
            setState({
              ...state,
              loading: false,
              authenticated: true,
              data,
            });
          }
        } catch (e) {
          setState({
            ...state,
            loading: false,
            data: undefined,
          });
        }
      } else {
        setState({
          ...state,
          loading: false,
          data: undefined,
        });
      }
    },
    [jwtDecode],
  );

  const signOut = React.useCallback(() => {
    eraseCookie(settings.AUTH_COOKIE_NAME);
    setState({
      ...state,
      loading: false,
      authenticated: false,
      data: undefined,
    });
  }, []);

  const [state, setState] = React.useState<UserState>({
    authenticated: false,
    loading: true,
    signIn,
    signOut,
    refresh: refreshUser,
  });

  React.useEffect(() => {
    const accessToken = getCookie(settings.AUTH_COOKIE_NAME);
    if (accessToken) {
      signIn(accessToken);
    } else {
      eraseCookie(settings.AUTH_COOKIE_NAME);
      setState({
        ...state,
        loading: false,
        data: undefined,
      });
    }
  }, []);

  return <userContext.Provider value={state}>{children}</userContext.Provider>;
};

export default UserProvider;

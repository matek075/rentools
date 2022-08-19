import React from 'react';
import jwtDecode from 'jwt-decode';

import { AdminState, AdminJWT } from 'context/user/types';
import { eraseCookie, getCookie, setCookie } from 'utils/cookies';
import settings from 'settings';

import { adminContext } from './index';

const validateToken = (accessToken: string): AdminJWT | null => {
  const data: AdminJWT = jwtDecode(accessToken);
  const timeStamp = new Date().getTime() / 1000;

  if (!data) {
    return null;
  }

  if (timeStamp > data.exp) {
    eraseCookie(settings.AUTH_ADMIN_COOKIE_NAME);
    return null;
  }

  return data;
};

const AdminProvider: React.FC = ({ children }) => {
  const signIn = React.useCallback(
    (accessToken: string) => {
      if (accessToken) {
        try {
          const data = validateToken(accessToken);
          if (data) {
            setCookie(settings.AUTH_ADMIN_COOKIE_NAME, accessToken);
            setState({
              ...state,
              loading: false,
              authenticated: true,
              data,
            });
          }
        } catch (e) {
          console.log(':(');
          setState({
            ...state,
            loading: false,
            data: undefined,
          });
        }
      } else {
        console.log('?');
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
    eraseCookie(settings.AUTH_ADMIN_COOKIE_NAME);
    setState({
      ...state,
      authenticated: false,
      data: undefined,
    });
  }, []);

  const [state, setState] = React.useState<AdminState>({
    authenticated: false,
    loading: true,
    signIn,
    signOut,
  });

  React.useEffect(() => {
    const accessToken = getCookie(settings.AUTH_ADMIN_COOKIE_NAME);
    if (accessToken) {
      signIn(accessToken);
    } else {
      eraseCookie(settings.AUTH_ADMIN_COOKIE_NAME);
      setState({
        ...state,
        loading: false,
        data: undefined,
      });
    }
  }, []);

  return <adminContext.Provider value={state}>{children}</adminContext.Provider>;
};

export default AdminProvider;

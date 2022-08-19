import axios from 'axios';

import Settings from 'settings';
import { ApiResponse } from 'types';
import { getCookie } from 'utils/cookies';

export const refresh = async (): Promise<ApiResponse<{ accessToken: string }>> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  const response = await axios.request({
    url: Settings.API_URL + 'auth/refresh',
    method: 'post',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

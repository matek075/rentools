import axios from 'axios';

import Settings from 'settings';
import { ApiResponse } from 'types';

export const signin = async (email: string, password: string): Promise<ApiResponse<{ accessToken: string }>> => {
  const response = await axios.request({
    url: Settings.API_URL + 'auth/signin',
    method: 'post',
    data: {
      email,
      password,
    },
  });

  return response.data;
};

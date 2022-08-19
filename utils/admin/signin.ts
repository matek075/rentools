import axios from 'axios';

import Settings from 'settings';
import { ApiResponse } from 'types';

export const signin = async (name: string, password: string): Promise<ApiResponse<{ accessToken: string }>> => {
  const response = await axios.request({
    url: Settings.API_URL + 'admin/signin',
    method: 'post',
    data: {
      name,
      password,
    },
  });

  return response.data;
};

import axios from 'axios';

import Settings from 'settings';
import { ApiResponse } from 'types';

interface ActivateResponse {
  activated: boolean;
  accessToken: string;
}

export const activate = async (token: string): Promise<ApiResponse<ActivateResponse>> => {
  const response = await axios.request<ApiResponse<ActivateResponse>>({
    url: Settings.API_URL + 'auth/activate/' + token,
    method: 'post',
  });

  return response.data;
};

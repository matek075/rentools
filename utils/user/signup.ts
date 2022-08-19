import axios from 'axios';

import Settings from 'settings';
import { ApiResponse } from 'types';
import { UserType } from 'context/user/types';

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
  surname: string;
  type: UserType;
}

export const signup = async (payload: SignupPayload): Promise<ApiResponse> => {
  const response = await axios.request({
    url: Settings.API_URL + 'auth/signup',
    method: 'post',
    data: {
      ...payload,
    },
  });

  return response.data;
};

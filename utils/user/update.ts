import axios from 'axios';

import { ApiResponse, User } from 'types';
import Settings from 'settings';
import { getCookie } from 'utils/cookies';

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

export const changePassword = async (payload: ChangePasswordPayload): Promise<ApiResponse<{ success: boolean }>> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  const response = await axios.request({
    url: Settings.API_URL + 'user/password',
    method: 'post',
    data: payload,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

export interface UpdateUserPayload {
  email: string;
  name: string;
  surname: string;
}

export const updateUser = async (payload: UpdateUserPayload): Promise<ApiResponse<User>> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  const response = await axios.request({
    url: Settings.API_URL + 'user',
    method: 'put',
    data: payload,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

import axios from 'axios';

import Settings from 'settings';
import { ApiResponsePromise, SearchResponse } from 'types';
import { getCookie } from 'utils/cookies';
import { UserType } from 'context/user/types';

export interface AdminListUser {
  id: number;
  companyId: number;
  name: string;
  surname: string;
  email: string;
  active: boolean;
  createdAt: string;
  type: UserType;
  company: {
    name: string;
    id: number;
  };
}

export const getUsers = async (take: number, skip: number): ApiResponsePromise<SearchResponse<AdminListUser[]>> => {
  const accessToken = getCookie(Settings.AUTH_ADMIN_COOKIE_NAME);

  const response = await axios.request({
    url: Settings.API_URL + 'admin/users',
    method: 'get',
    params: {
      take,
      skip,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

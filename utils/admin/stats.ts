import axios from 'axios';

import Settings from 'settings';
import { getCookie } from 'utils/cookies';

export interface AdminStats {
  usersCount: number;
  companiesCount: number;
  categoriesCount: {
    id: number;
    name: string;
    total: number;
  }[];
  productsCount: number;
  lastCompanies: {
    name: string;
    slug: string;
    id: number;
  }[];
}

export const fetchAdminStats = async (token?: string): Promise<AdminStats> => {
  const accessToken = token || getCookie(Settings.AUTH_ADMIN_COOKIE_NAME);

  const response = await axios.request({
    url: Settings.API_URL + 'admin/stats',
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.data;
}

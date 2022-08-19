import axios from 'axios';

import { getCookie } from 'utils/cookies';
import Settings from 'settings';

export interface Category {
  id: number;
  name: string;
  description: string;
  active: boolean;
  children: Category[];
}

export const getCategories = async (): Promise<Category[]> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);
  const response = await axios.request<Category[]>({
    url: Settings.API_URL + 'categories',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

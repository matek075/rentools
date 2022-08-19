import axios from 'axios';

import { Product } from 'types';
import Settings from 'settings';
import { ApiResponse } from 'types';

export const getProduct = async (id: number, jwt: string): Promise<Product> => {
  const response = await axios.request<ApiResponse<Product>>({
    url: Settings.API_URL + 'products/' + id,
    method: 'get',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data.data;
};

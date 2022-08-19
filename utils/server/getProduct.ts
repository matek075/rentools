import axios from 'axios';

import config from 'settings/build';
import Settings from 'settings';
import { ApiResponse, ProductPage } from 'types';

export const getProduct = async (id: number | string): Promise<ProductPage> => {
  const response = await axios.request<ApiResponse<ProductPage>>({
    url: Settings.API_URL + 'products/public/' + id,
    method: 'get',
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  });

  return response.data.data;
};

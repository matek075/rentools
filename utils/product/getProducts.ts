import axios from 'axios';

import { getCookie } from 'utils/cookies';
import Settings from 'settings';
import { Product, ProductPage, SearchResponse } from 'types';

export interface GetProductsDto {
  search?: string;
  take?: number;
  skip?: number;
  active?: boolean;
  categoryId?: number;
}

export const getProducts = async (payload: GetProductsDto): Promise<SearchResponse<ProductPage[]>> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  const response = await axios.request({
    url: `${Settings.API_URL}products/company`,
    method: 'get',
    params: payload,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getCompanyProducts = async (companyId: number, payload: GetProductsDto): Promise<SearchResponse<Product[]>> => {
  const response = await axios.request({
    url: `${Settings.API_URL}products`,
    params: {
      ...payload,
      companyId,
    },
    method: 'get',
  });

  return response.data.data;
};

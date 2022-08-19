import axios from 'axios';

import settings from 'settings';
import { getCookie, setCookie } from 'utils/cookies';
import { ApiResponse, File } from 'types';
import { PriceRange } from 'components/form/forms/Product';

export interface SearchProduct {
  id: number;
  createdAt: number;
  updatedAt: number;
  brand: string;
  model: string;
  city: string;
}

export interface SearchDto {
  query: string;
  categoryIds: number[];
  geolocationId?: string;
  range: number;
}

export interface ResultItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  brand: string;
  model: string;
  city: string;
  price?: ResultPrice;
  companyName: string;
  categoryName: string;
  files: File[];
}

export interface SearchResults {
  total: number;
  results: ResultItem[];
}

export interface ResultPrice {
  price: number;
  range: PriceRange;
}

export const search = async (payload: SearchDto): Promise<ApiResponse<SearchResults>> => {
  const response = await axios.request<ApiResponse<SearchResults>>({
    method: 'post',
    url: `${settings.API_URL}search`,
    data: {
      ...payload,
      range: +payload.range,
    },
  });

  return response.data;
};

interface CookieLocation {
  geolocationId?: string;
  cityName?: string;
  range?: number;
}

export const getCookiesLocation = (): CookieLocation => {
  if (typeof document === 'undefined') {
    return {};
  }

  const cookie = getCookie('rentools.search');

  if (!cookie) {
    return {};
  }

  return JSON.parse(cookie);
};

export const setCookiesLocation = (payload: CookieLocation) => {
  setCookie('rentools.search', JSON.stringify(payload));
};

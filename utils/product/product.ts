import axios from 'axios';

import { getCookie } from 'utils/cookies';
import Settings from 'settings';
import { PriceRange, RentalRange } from 'components/form/forms/Product';
import { Category } from 'utils/product/categories';
import { ApiResponse, File } from 'types';

export interface ProductDto {
  brand: string;
  model: string;
  description: string;
  prices: {
    price: number;
    range: PriceRange;
  }[];
  categoryId?: number;
  templateId?: number;
  fileIds: number[];
  deposit?: number;
  minRentalValue?: number;
  minRentalRange?: RentalRange;
}

export interface CreateProductResult {
  id: number;
  brand: string;
  model: string;
  description: string;
  active: boolean;
  price: number;
  range: PriceRange;
  category: Category;
  files: File[];
  template?: never;
}

export const createProduct = async (data: ProductDto): Promise<CreateProductResult> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  const response = await axios.request<ApiResponse<CreateProductResult>>({
    url: Settings.API_URL + 'products',
    method: 'post',
    data,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data.data;
};

export const updateProduct = async (id: number, data: ProductDto): Promise<CreateProductResult> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  const response = await axios.request<ApiResponse<CreateProductResult>>({
    url: Settings.API_URL + 'products/' + id,
    method: 'put',
    data,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data.data;
};

import axios from 'axios';

import Settings from 'settings';
import { ApiResponse } from 'types';
import { getCookie } from 'utils/cookies';

export interface CreateReviewDto {
  rating: number | null;
  review: string;
  companyId: number;
}

export const createReview = async (dto: CreateReviewDto): Promise<ApiResponse<any>> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);
  const response = await axios.request({
    url: Settings.API_URL + 'reviews',
    method: 'POST',
    data: dto,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

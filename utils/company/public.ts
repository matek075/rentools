import axios from 'axios';

import Settings from 'settings';
import { CompanyProfileResponse, CompanyReview } from 'types';

export const getCompany = async (slug: string): Promise<CompanyProfileResponse> => {
  const response = await axios.request({
    url: Settings.API_URL + 'companies/public/' + slug,
  });

  return response.data;
};

export const getReviews = async (id: number): Promise<CompanyReview[]> => {
  const response = await axios.request({
    url: Settings.API_URL + 'reviews',
    params: {
      companyId: id,
    },
  });

  return response.data;
};

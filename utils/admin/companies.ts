import axios from 'axios';

import Settings from 'settings';
import { ApiResponsePromise, SearchResponse } from 'types';
import { getCookie } from 'utils/cookies';
import { UpdateCompanyDto } from 'utils/company/update';
import { Company } from 'context/company/types';



export interface AdminListCompany {
  id: number;
  name: string;
  geolocationId: string;
  phone: string;
  visits: number;
  slug: string;
  geolocation: {
    name: string;
  };
}

export const getCompanies = async (take: number, skip: number): ApiResponsePromise<SearchResponse<AdminListCompany[]>> => {
  const accessToken = getCookie(Settings.AUTH_ADMIN_COOKIE_NAME);

  const response = await axios.request({
    url: Settings.API_URL + 'admin/companies',
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

export const getCompany = async (id: number, token?: string): Promise<Company> => {

  const accessToken = token || getCookie(Settings.AUTH_ADMIN_COOKIE_NAME);

  const response = await axios.request({
    url: Settings.API_URL + 'admin/companies/' + id,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  return response.data.data;
}

export const updateCompany = async (id: number, dto: UpdateCompanyDto): Promise<Company> => {
  const accessToken = getCookie(Settings.AUTH_ADMIN_COOKIE_NAME);

  const response = await axios.request({
    url: Settings.API_URL + 'admin/companies/' + id,
    method: 'PATCH',
    data: {
      ...dto,
      email: dto.email || undefined,
      phone: dto.phone || undefined,
      description: dto.description || undefined,
      plan: dto.plan ? Number(dto.plan) : undefined,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.data;
}

import axios from 'axios';

import Settings from 'settings';
import { ParseOpeningHours } from 'types';
import { ApiResponse } from 'types';
import { Company, CompanyPlan } from 'context/company/types';
import { getCookie } from 'utils/cookies';

export interface UpdateCompanyDto {
  name?: string;
  description?: string;
  address?: string;
  slug?: string;
  postCode?: string;
  logoId?: number;
  information?: string;
  geolocationId?: string;
  vatId?: string;
  email?: string;
  phone?: string;
  plan?: CompanyPlan;
}

export interface UpdateOpeningHoursDto {
  mondayFrom: string | null;
  mondayTo: string | null;
  tuesdayFrom: string | null;
  tuesdayTo: string | null;
  wednesdayFrom: string | null;
  wednesdayTo: string | null;
  thursdayFrom: string | null;
  thursdayTo: string | null;
  fridayFrom: string | null;
  fridayTo: string | null;
  saturdayFrom: string | null;
  saturdayTo: string | null;
  sundayFrom: string | null;
  sundayTo: string | null;
}

export const updateCompany = async (id: number, dto: UpdateCompanyDto) => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);
  const response = await axios.request<ApiResponse<Company>>({
    url: Settings.API_URL + 'companies/' + id,
    method: 'PATCH',
    data: {
      ...dto,
      email: dto.email || undefined,
      phone: dto.phone || undefined,
      description: dto.description || undefined,
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

export const updateOpeningHours = async (dto: ParseOpeningHours) => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  const payload: any = {};

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  for (const day of days) {
    // @ts-ignore
    if (!dto[`${day}Closed`]) {
      // @ts-ignore
      payload[`${day}FromHours`] = dto[`${day}FromHours`];
      // @ts-ignore
      payload[`${day}ToHours`] = dto[`${day}ToHours`];
      // @ts-ignore
      payload[`${day}FromMinutes`] = dto[`${day}FromMinutes`];
      // @ts-ignore
      payload[`${day}ToMinutes`] = dto[`${day}ToMinutes`];
    } else {
      payload[`${day}FromHours`] = null;
      payload[`${day}ToHours`] = null;
      payload[`${day}FromMinutes`] = null;
      payload[`${day}ToMinutes`] = null;
    }
  }

  const response = await axios.request<ApiResponse<Company>>({
    url: Settings.API_URL + 'companies/opening-hours',
    method: 'PUT',
    data: payload,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

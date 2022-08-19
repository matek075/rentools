import axios, { CancelToken } from 'axios';

import Settings from 'settings';
import { ApiResponse, File } from 'types';
import { getCookie } from 'utils/cookies';
import { Company } from 'context/company/types';

interface UserCompanyResponse {
  company: Company;
  questionsCount: number;
}

export const getCompany = async (): Promise<UserCompanyResponse | undefined> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  try {
    const response = await axios.request({
      url: Settings.API_URL + 'user/company',
      method: 'get',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data.data;
  } catch (e) {
    return undefined;
  }
};

export const createCompany = async (payload: CreateCompanyDto): Promise<Company> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  const response = await axios.request({
    url: Settings.API_URL + 'companies',
    method: 'post',
    data: {
      ...payload,
      vatId: `${payload.vatId}`,
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data.data;
};

export interface CreateCompanyDto {
  name: string;
  vatId: string;
  address: string;
  geolocationId: string;
  postCode: string;
  slug: string;
  logo?: {
    id: number;
    path: string;
    type: FileType;
  };
}

export const validateCompany = async (payload: CreateCompanyDto): Promise<any> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);

  const response = await axios.request<ApiResponse<any>>({
    url: Settings.API_URL + 'companies/validate',
    method: 'post',
    data: {
      ...payload,
      vatId: `${payload.vatId}`,
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

export type FileType = 'logo' | 'product';

type UploadProgress = ({ total, loaded }: { total: number; loaded: number }) => void;

export const uploadFile = async (
  file: any,
  type: FileType,
  onUploadProgress?: UploadProgress,
  cancelToken?: CancelToken,
): Promise<File> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.request<File>({
    url: Settings.API_URL + `files/${type}`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${jwt}`,
    },
    onUploadProgress,
    cancelToken,
    data: formData,
  });

  return response.data;
};

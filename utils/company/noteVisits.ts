import axios from 'axios';

import Settings from 'settings';
import { ApiResponse } from 'types';
import { Company } from 'context/company/types';
import { getCookie } from 'utils/cookies';


export const noteVisits = async (slug: string) => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);
  const response = await axios.request<ApiResponse<Company>>({
    url: Settings.API_URL + 'companies/public/' + slug + '/visits',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

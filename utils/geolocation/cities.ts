import axios from 'axios';

import Settings from 'settings';
import { ApiResponse, Geolocation } from 'types';
import { removeAccents } from 'utils/text';

export const searchGeolocations = async (text: string): Promise<Geolocation[]> => {
  const result = await axios.request<ApiResponse<Geolocation[]>>({
    method: 'get',
    url: `${Settings.API_URL}geolocation/city/${removeAccents(text)}`,
  });

  return result.data.data;
};

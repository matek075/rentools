import axios from 'axios';

import Settings from 'settings';

export const subscribe = async (email: string): Promise<boolean> => {
  const response = await axios.request({
    url: Settings.API_URL + 'mail/subscribe',
    method: 'post',
    data: {
      email,
    },
  });

  return response.data;
};

import axios from 'axios';

import Settings from 'settings';
import { getCookie } from 'utils/cookies';

export interface QuestionAnswer {
  id: number;
  title: string;
  answer: string;
  order: number;
}

export const getQuestions = async (): Promise<QuestionAnswer[]> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);
  const response = await axios.request<QuestionAnswer[]>({
    method: 'get',
    url: Settings.API_URL + 'companies/questions',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

export type QuestionAnswerDto = Omit<QuestionAnswer, 'id' | 'order'>[];

export const putQuestions = async (data: QuestionAnswerDto): Promise<QuestionAnswer[]> => {
  const jwt = getCookie(Settings.AUTH_COOKIE_NAME);
  const response = await axios.request({
    method: 'put',
    url: `${Settings.API_URL}companies/questions`,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: {
      questions: data.map((d, index) => ({ ...d, order: index + 1 })),
    },
  });

  return response.data;
};

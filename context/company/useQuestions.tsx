import React from 'react';

import { getQuestions, QuestionAnswer } from 'utils/company/questions';

export const useQuestions = (): [QuestionAnswer[], React.Dispatch<QuestionAnswer[]>] => {
  const [questions, setQuestions] = React.useState<QuestionAnswer[]>([]);

  React.useEffect(() => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
  }, []);

  return [questions, setQuestions];
};

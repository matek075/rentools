import React from 'react';

import Card from 'components/ui/Card';
import { CompanyQuestion } from 'types';

import css from './styles.module.scss';

interface OwnProps {
  questions: CompanyQuestion[];
}

const Questions: React.FC<OwnProps> = ({ questions }) => {
  return (
    <Card className={css.questions}>
      {questions.map((question) => (
        <div key={question.title} className={css.question}>
          <h6 className={css.title}>{question.title}</h6>
          <p className={css.answer}>{question.answer}</p>
        </div>
      ))}
    </Card>
  )
}


export default Questions;

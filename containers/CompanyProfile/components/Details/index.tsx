import React from 'react';

import { Company } from 'context/company/types';
import Card from 'components/ui/Card';
import { CompanyQuestion } from 'types';
import Questions from 'components/landing/Questions';

import css from './styles.module.scss';

interface OwnProps {
  data: Company;
  questions: CompanyQuestion[];
}

const Details: React.FC<OwnProps> = ({ data, questions }) => {
  return (
    <div>
      <h2>O Firmie</h2>
      <Card>
        {data.information ? (
          <div className={css.information} dangerouslySetInnerHTML={{ __html: data.information }} />
        ) : (
          <div className="text-gray-400">Firma nie dodała żadnych informacji</div>
        )}
      </Card>
      {questions.length ? (
        <div className="mt-10">
          <h2>Pytania i odpowiedzi</h2>
          <Questions questions={questions} />
        </div>
      ) : null}
    </div>
  );
};

export default Details;

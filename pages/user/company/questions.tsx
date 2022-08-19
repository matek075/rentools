import React from 'react';
import { FormattedMessage } from 'react-intl';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons/faInfoCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from 'components/ui/Card';
import CompanySettings from 'containers/CompanySettings';
import CompanyQuestions from 'components/form/forms/CompanyQuestions';

const CompanyQuestionsPage = () => {
  return (
    <CompanySettings tab="questions">
      <div className="max-w-xl">
        <h5>
          <FormattedMessage id="settings.qa" />
        </h5>
        <Card>
          <p className="text-sm text-gray-400">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
            Możesz wybrać jedno z przygotowanych pytań, lub napisać własne
          </p>
          <CompanyQuestions />
        </Card>
      </div>
    </CompanySettings>
  );
};

export default CompanyQuestionsPage;

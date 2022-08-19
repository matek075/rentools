import React from 'react';
import { FormattedMessage } from 'react-intl';

const NoResults: React.FC = () => {
  return (
    <h3>
      <FormattedMessage id="search.noResults" />
    </h3>
  );
};

export default NoResults;

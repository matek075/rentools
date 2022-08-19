import React from 'react';

const OpeningHour: React.FC<{ value: string | null }> = ({ value }) => {
  if (value == null) {
    return <>Nieczynne</>;
  }
  if (value.split(':').includes('null')) {
    return <>Nieczynne</>;
  }

  return <>{value}</>;
};

export default OpeningHour;

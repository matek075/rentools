import React from 'react';

import { Company } from 'context/company/types';
import Alert from 'components/ui/Alert';

interface OwnProps {
  company: Company;
}

const PartnerDashboard: React.FC<OwnProps> = () => {
  return (
    <>
      <div className="mb-4">
        <h1>Dashboard</h1>
        <Alert
          type="success"
          text="Możesz już dodawać swoje produkty w Rentools. Kliknij w zakładkę 'Sprzęt' w menu po lewej stronie, i
              podziel się ze światą swoją ofertą."
        />
      </div>
    </>
  );
};

export default PartnerDashboard;

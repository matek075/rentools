import React from 'react';

import { companyContext } from 'context/company';
import Modal from 'components/ui/Modal';
import CompanyCreateForm from 'components/form/forms/CompanyCreate';
import { userContext } from 'context/user';
import { UserType } from 'context/user/types';

const CompanyCreate: React.FC = () => {
  const company = React.useContext(companyContext);
  const user = React.useContext(userContext);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!company.loading && !company.data && user.authenticated && user.data?.type === UserType.Partner) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [company, user.authenticated]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} closable={false}>
      <CompanyCreateForm handleFinish={() => setOpen(false)} />
    </Modal>
  );
};

export default CompanyCreate;

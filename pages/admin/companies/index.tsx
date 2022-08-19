import React from 'react';

import Admin from 'components/layouts/Admin';
import Companies from 'containers/admin/Companies';

const AdminCompanies: React.FC = () => {
  return (
    <Admin>
      <Companies />
    </Admin>
  );
};

export default AdminCompanies;

import React from 'react';

import Admin from 'components/layouts/Admin';
import { adminContext } from 'context/admin';
import { AdminRole } from 'context/user/types';

const roles = {
  [AdminRole.READER]: 'ODCZYT',
  [AdminRole.MODERATOR]: 'MODERATOR',
  [AdminRole.ADMIN]: 'ADMIN',
};

const AdminSettings: React.FC = () => {
  const admin = React.useContext(adminContext);

  return (
    <Admin>
      <h5>Nazwa użytkownika</h5>
      <p>{admin.data?.name}</p>
      <h5>Rodzaj konta</h5>
      <p>{admin.data?.role ? roles[admin.data?.role] : '-'}</p>
    </Admin>
  );
};

export default AdminSettings;

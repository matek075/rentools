import React from 'react';

import Admin from 'components/layouts/Admin';
import Users from 'containers/admin/Users';

const AdminUsers: React.FC = () => {
  return (
    <Admin>
      <Users />
    </Admin>
  );
};

export default AdminUsers;

import React from 'react';
import { useRouter } from 'next/router';

import Loading from 'components/layouts/Loading';
import { adminContext } from 'context/admin';

const LogoutPage: React.FC = () => {
  const admin = React.useContext(adminContext);
  const router = useRouter();

  React.useEffect(() => {
    admin.signOut();
    router.push('/');
  }, [admin.signOut]);

  return <Loading />;
};

export default LogoutPage;

import React from 'react';
import { useRouter } from 'next/router';

import { adminContext } from 'context/admin';
import Loading from 'components/layouts/Loading';

const OnlyAdmin: React.FC = (props) => {
  const router = useRouter();
  const admin = React.useContext(adminContext);

  React.useEffect(() => {
    if (!admin.loading && (!admin.authenticated || !admin.data)) {
      router.push('/admin/signin');
    }
  }, [router, admin]);

  if (admin.loading || !admin.data) {
    return <Loading />;
  }

  return <>{props.children}</>;
};

export default OnlyAdmin;

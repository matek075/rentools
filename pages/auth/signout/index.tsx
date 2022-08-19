import React from 'react';
import { useRouter } from 'next/router';

import Loading from 'components/layouts/Loading';
import { userContext } from 'context/user';

const LogoutPage: React.FC = () => {
  const user = React.useContext(userContext);
  const router = useRouter();

  React.useEffect(() => {
    user.signOut();
    router.push('/');
  }, [user.signOut]);

  return <Loading />;
};

export default LogoutPage;

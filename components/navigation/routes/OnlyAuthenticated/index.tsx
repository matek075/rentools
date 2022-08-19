import React from 'react';
import { useRouter } from 'next/router';

import { userContext } from 'context/user';

const OnlyAuthenticated: React.FC = (props) => {
  const router = useRouter();

  return (
    <userContext.Consumer>
      {(user) => {
        if (user.loading) {
          return <div>loading</div>;
        }

        if (!user.authenticated) {
          router.push('/auth/signin');
          return <div />;
        }

        return props.children;
      }}
    </userContext.Consumer>
  );
};

export default OnlyAuthenticated;

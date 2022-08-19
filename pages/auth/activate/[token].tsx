import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import Auth from 'components/layouts/Auth';
import { activate } from 'utils/user/activate';
import { userContext } from 'context/user';

interface OwnProps {
  token: string;
}

export const getServerSideProps: GetServerSideProps<OwnProps> = async (ctx) => {
  return {
    props: {
      token: ctx.params?.token as string,
    },
  };
};

const ActivateAccount: React.FC<OwnProps> = ({ token }) => {
  const [loading, setLoading] = React.useState(true);
  const user = React.useContext(userContext);
  const intl = useIntl();
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      try {
        const {
          data: { activated, accessToken },
        } = await activate(token);
        if (activated && accessToken) {
          user.signIn(accessToken);
          window.notyf.success(intl.formatMessage({ id: 'auth.activate.success' }));
          return router.push('/user/dashboard');
        }
      } catch (e) {}
      setLoading(false);
    })();
  }, [token]);

  return (
    <Auth title={intl.formatMessage({ id: 'auth.activate.title' })}>
      <h6>{loading ? <FormattedMessage id="ui.loading" /> : <FormattedMessage id="auth.activate.incorrect" />}</h6>
    </Auth>
  );
};

export default ActivateAccount;

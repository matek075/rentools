import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Text from 'components/ui/Text';

import css from './styles.module.scss';

interface OwnProps {
  title: string | React.ReactNode;
  isLogin?: boolean;
}

const Auth: React.FC<OwnProps> = ({ title, isLogin, children }) => {
  return (
    <div className={css.page}>
      <NextSeo title={title + ' | rentools.pl'} />
      <div className={css.centerArea}>
        <div className={css.cardWrapper}>
          <Link href="/">
            <a className={css.logo}>
              <img src="/identity/logo_black.svg" alt="logo" />
            </a>
          </Link>
          <div className={css.dot} />
          <div className={css.card}>{children}</div>
        </div>
        <div className="mt-3 text-center">
          {isLogin ? (
            <>
              <Text type="dimmed">
                <FormattedMessage id="auth.haveNoAccount" />
              </Text>
              <Link href="/auth/signup">
                <Text as="a" href="/auth/signup" type="link" className="ml-2">
                  <FormattedMessage id="auth.register" />
                </Text>
              </Link>
            </>
          ) : (
            <>
              <Text type="dimmed">
                <FormattedMessage id="auth.haveAccount" />
              </Text>
              <Link href="/auth/signin">
                <Text as="a" href="/auth/signin" type="link" className="ml-2">
                  <FormattedMessage id="auth.signin.title" />
                </Text>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

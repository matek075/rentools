import React from 'react';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import '../scss/globals.scss';
import '../scss/main.scss';
import { AppProps } from 'next/app';
import { Notyf } from 'notyf';

import UserProvider from 'context/user/Provider';
import pl from 'messages/pl.json';
import CompanyProvider from 'context/company/Provider';
import ScriptLoader from 'components/business/ScriptLoader';
import AdminProvider from 'context/admin/Provider';

if (process.browser) {
  window.notyf = new Notyf({
    duration: 4000,
    ripple: true,
    dismissible: true,
    position: {
      x: 'right',
      y: 'bottom',
    },
  });
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const { locale, defaultLocale } = router;

  return (
    <>
      <UserProvider>
        <CompanyProvider>
          <AdminProvider>
            <IntlProvider locale={locale || 'pl'} defaultLocale={defaultLocale} messages={pl}>
              <Component {...pageProps} />
            </IntlProvider>
          </AdminProvider>
        </CompanyProvider>
        <ScriptLoader />
      </UserProvider>
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps };
// };

export default App;

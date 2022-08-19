module.exports = {
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',

    domains: [
      {
        domain: 'rentools.pl',
        defaultLocale: 'pl',
      },
    ],
  },
  typescript: {
    // REMOVE THIS LINE WHEN FONTAWESOME BUG WITH ALIASES IS FIXED
    // ignoreBuildErrors: true,
  },
  images: {
    domains: ['rentools.vxm.pl', 'rentools-blog.s3.eu-central-1.amazonaws.com'],
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
};

const axios = require('axios');

module.exports = {
  siteUrl: 'https://rentools.pl',
  generateRobotsTxt: true,
  exclude: ['/auth/*', '/user/*', '/en/*', '/admin/*', '/admin'],
  transform: async (config, path) => {
    if (path === '/pl' || path === '/en') {
      return null;
    }

    if (path.startsWith('/pl/')) {
      path = path.slice(4, path.length);
    }

    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async () => {
    const response = await axios.request({
      url: 'https://api.rentools.pl/seo/sitemap',
      method: 'get',
    });

    return response.data.data;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin', '/admin/*', '/auth/*', '/user/*'],
      },
    ],
  },
};

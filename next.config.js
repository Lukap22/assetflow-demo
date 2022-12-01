
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    emotion: true
  },
};

module.exports = nextConfig;

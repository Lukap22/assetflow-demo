
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    emotion: true
  },
};

module.exports = nextConfig;

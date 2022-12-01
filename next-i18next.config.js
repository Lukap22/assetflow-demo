const path = require('path')
module.exports = {
    i18n: {
        defaultLocale: 'nl',
        locales: ['en', 'nl'],
        ...(typeof window === undefined
            ? { localePath: path.resolve('./public/locales') }
            : {}),
    },
}
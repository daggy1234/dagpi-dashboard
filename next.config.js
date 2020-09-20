/* eslint-disable @typescript-eslint/no-var-requires */
const withSass = require('@zeit/next-sass');

module.exports = withSass({
    cssModules: true,
    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./lib/generate-sitemap');
        }

        return config;
    }
});

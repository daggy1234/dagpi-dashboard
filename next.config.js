/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
    cssModules: true,
    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./lib/generate-sitemap');
        }

        return config;
    }
};

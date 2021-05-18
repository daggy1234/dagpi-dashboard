/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
    cssModules: true,
    future: {
        webpack5: true
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./lib/generate-sitemap');
        }

        return config;
    }
};

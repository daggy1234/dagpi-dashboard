const siteConfig = {
    copyright: `Copyright © ${new Date().getFullYear()} Daggy1234. All Rights Reserved.`,
    discord: {
        url: 'https://sever.daggy.tech'
    },
    seo: {
        title: 'Dagpi',
        titleTemplate: '%s | Dagpi',
        description: 'A fast, and easy to use API.',
        siteUrl: 'https://dagpi.tk',
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dagpi.tk',
            title: 'Dagpi',
            description: 'A fast, and easy to use API.',
            site_name: 'Dagpi: A fast and easy to use API',
            images: [
                {
                    url: '/dagpi.png',
                    alt: 'Dagpi: A simple,fast and easy to use API'
                },
                {
                    url: '/dagpi.png',
                    width: 1012,
                    height: 506,
                    alt: 'Dagpi: A simple,fast and easy to use API'
                }
            ]
        }
    }
};

export default siteConfig;

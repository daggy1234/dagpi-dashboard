const siteConfig = {
    copyright: `Copyright © ${new Date().getFullYear()} Daggy1234. All Rights Reserved.`,
    discord: {
        url: 'https://sever.daggy.tech'
    },
    seo: {
        title: 'Dagpi',
        titleTemplate: '%s | Dagpi',
        description:
            'A fast, and easy to use API. Enjoy powerful image manipulation and high quality datasets with reliability and security.',
        siteUrl: 'https://dagpi.xyz',
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://dagpi.xyz',
            title: 'Dagpi',
            description:
                'A fast, and easy to use API. Enjoy powerful image manipulation and high quality datasets with reliability and security.',
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

import { NextSeo } from 'next-seo';

import siteConfig from '../seo-config';

const SEO = ({ title, description, url }: { title: string; description: string; url: string }) => (
    <NextSeo
        title={title}
        description={description}
        openGraph={{
            type: 'website',
            locale: 'en_US',
            url,
            title,
            description,
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
        }}
        titleTemplate={siteConfig.seo.titleTemplate}
    />
);

export default SEO;

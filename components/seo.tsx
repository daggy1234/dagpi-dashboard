import { NextSeo } from 'next-seo';
import React from 'react';

import siteConfig from '../config/site-config';

const SEO = ({ title, description, url }) => (
    <NextSeo
        title={title}
        description={description}
        openGraph={{
            type: 'website',
            locale: 'en_US',
            url: url,
            title: title,
            description: description,
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

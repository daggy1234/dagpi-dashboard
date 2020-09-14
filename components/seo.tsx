import { NextSeo } from 'next-seo';
import React from 'react';

import siteConfig from '../config/site-config';

const SEO = ({ title, description }) => (
    <NextSeo title={title} description={description} titleTemplate={siteConfig.seo.titleTemplate} />
);

export default SEO;

import { ColorModeScript } from '@chakra-ui/core';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import GAScript from '../lib/analytics';
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                    <meta content="A fast,accesible and easy to use api" name="description" />
                    <meta name="theme-color" content="#9F7AEA" />
                    <link rel="icon" type="image/png" href="/dagpi.png" />
                    <link rel="apple-touch-icon" href="/dagpi.png" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://static.cloudflareinsights.com" />
                </Head>
                <body>
                    <ColorModeScript />
                    <Main />
                    <NextScript />
                    <GAScript />
                </body>
            </Html>
        );
    }
}

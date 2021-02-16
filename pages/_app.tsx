import './styles.scss';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { Provider } from 'next-auth/client';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';

import siteConfig from '../config/site-config';
import * as gtag from '../lib/analytics';

// interface BaseBreakpointConfig extends Record<string, string> {
//     sm: string;
//     md: string;
//     lg: string;
//     xl: string;
// }

// function createBreakpoints<T extends BaseBreakpointConfig>(config: T): Breakpoints<T> {
//     return Object.assign(Object.values(config), config);
// }

// type Breakpoints<T = BaseBreakpointConfig> = string[] & T;

// const breakpoint = ['360px', '768px', '1024px', '1440px'];

// const breakpoints = createBreakpoints({
//     sm: breakpoint[0],
//     md: breakpoint[1],
//     lg: breakpoint[2],
//     xl: breakpoint[3]
// });

// const newTheme = {
//     ...theme,
//     breakpoints,
//     sixes: {
//         container: 100
//     }
// };

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        Router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    return (
        <>
            <Head>
                <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                <meta content="A fast,accesible and easy to use api" name="description" />
                <meta name="theme-color" content="#9F7AEA" />
                <meta charSet="utf-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <link rel="icon" type="image/png" href="/dagpi.png" />
                <link rel="apple-touch-icon" href="/dagpi.png" />
                <link rel="shortcut icon" type="image/png" href="/dagpi.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            </Head>
            <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
                <ChakraProvider>
                    <DefaultSeo {...siteConfig.seo} />
                    <Component {...pageProps} />
                </ChakraProvider>
            </Provider>
        </>
    );
}

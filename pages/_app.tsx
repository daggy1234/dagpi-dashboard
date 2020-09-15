import './styles.scss';

import { ChakraProvider, theme } from '@chakra-ui/core';
import { Provider } from 'next-auth/client';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

import siteConfig from '../config/site-config';
import { trackPageview } from '../lib/track';
interface BaseBreakpointConfig extends Record<string, string> {
    sm: string;
    md: string;
    lg: string;
    xl: string;
}

function createBreakpoints<T extends BaseBreakpointConfig>(config: T): Breakpoints<T> {
    return Object.assign(Object.values(config), config);
}

type Breakpoints<T = BaseBreakpointConfig> = string[] & T;

const breakpoint = ['360px', '768px', '1024px', '1440px'];

const breakpoints = createBreakpoints({
    sm: breakpoint[0],
    md: breakpoint[1],
    lg: breakpoint[2],
    xl: breakpoint[3]
});

const newTheme = {
    ...theme,
    breakpoints,
    sixes: {
        container: 100
    }
};

Router.events.on('routeChangeComplete', (url) => {
    trackPageview(url);
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>
            <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
                <ChakraProvider theme={newTheme}>
                    <DefaultSeo {...siteConfig.seo} />
                    <Component {...pageProps} />
                </ChakraProvider>
            </Provider>
        </>
    );
}

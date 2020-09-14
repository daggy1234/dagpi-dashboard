import './styles.scss';

import { ChakraProvider, theme } from '@chakra-ui/core';
import { Provider } from 'next-auth/client';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';

import siteConfig from '../config/site-config';
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

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <link rel="icon" type="image/png" sizes="96x96" href="/dagpi.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://static.cloudflareinsights.com" />
                <meta name="theme-color" content="#9F7AEA" />
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

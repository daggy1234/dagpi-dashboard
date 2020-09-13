import './styles.scss';

import { ChakraProvider, theme } from '@chakra-ui/core';
import { Provider } from 'next-auth/client';

const breakpoints = ['360px', '768px', '1024px', '1440px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
    ...theme,
    breakpoints,
    sixes: {
        container: 100
    }
};

export default function App({ Component, pageProps }) {
    return (
        <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
            <ChakraProvider ResetCSS theme={newTheme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    );
}

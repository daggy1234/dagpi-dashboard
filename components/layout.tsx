import { Box } from '@chakra-ui/core';

import Footer from './footer';
import Header from './header/header';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Box>
                <main>{children}</main>
            </Box>
            <Footer />
        </>
    );
}

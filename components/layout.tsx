import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './footer';
import Header from './header/header';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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

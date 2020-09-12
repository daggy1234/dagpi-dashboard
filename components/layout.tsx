import { Container } from '@chakra-ui/core';

import Footer from './footer.jsx';
import Header from './header/header.tsx';
import Indicator from './signed_in.jsx';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Container>
                <main>{children}</main>
            </Container>
            <Footer />
        </>
    );
}

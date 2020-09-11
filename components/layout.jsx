import Footer from './footer.jsx';
//import Header from './header/header.jsx';
import Indicator from './signed_in.jsx';

export default function Layout({ children }) {
    return (
        <>
            <Indicator />
            <main>{children}</main>
            <Footer />
        </>
    );
}

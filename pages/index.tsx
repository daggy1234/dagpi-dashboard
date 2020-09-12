import Head from 'next/head';

import Layout from '../components/layout.tsx';

export default function Page() {
    return (
        <Layout>
            <Head>
                <title>Dagpi</title>
                <meta property="og:title" content="Dagpi" key="title" />
            </Head>
            <h1>NextAuth.js Example</h1>
            <p>
                This is an example site to demonstrate how to use{' '}
                <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
            </p>
        </Layout>
    );
}

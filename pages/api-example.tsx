import { Box, Text } from '@chakra-ui/core';

import Layout from '../components/layout';
//
import SEO from '../components/seo';

export default function Page() {
    return (
        <Layout>
            <SEO title="API" description="Dagpi Testing API Routes" />
            <Box>
                <h1>API Examples</h1>
                <p>The examples below show responses from the example API endpoints.</p>
                <p>
                    <em>You must be signed in to see responses.</em>
                </p>
                <Text>SOME TEXT</Text>
                <h2>Session</h2>
                <p>/api/examples/session</p>
                <iframe title="Session" src="/api/routes/session" />
                <h2>JSON Web Token</h2>
                <p>/api/examples/jwt</p>
                <iframe title="jwt" src="/api/routes/jwt" />
            </Box>
        </Layout>
    );
}

import { Text } from '@chakra-ui/core';

//
import Layout from '../components/layout.jsx';

export default function Page() {
    return (
        <Layout>
            <h1>API Example</h1>
            <p>The examples below show responses from the example API endpoints.</p>
            <p>
                <em>You must be signed in to see responses.</em>
            </p>
            <Text>SOME TEXT</Text>
            <h2>Session</h2>
            <p>/api/examples/session</p>
            <iframe title="Session" src="/api/examples/session" />
            <h2>JSON Web Token</h2>
            <p>/api/examples/jwt</p>
            <iframe title="jwt" src="/api/examples/jwt" />
        </Layout>
    );
}

import { Box, Heading } from '@chakra-ui/react';

import Layout from '../components/layout';
import SEO from '../components/seo';
export default function Page() {
    return (
        <Layout>
            <SEO
                title="Premium"
                description="Dagpi Premium dashbaord. View pricing, billing and deals."
            />
            <Box padding="5%" textAlign="center" alignContent="center" alignItems="center">
                <Heading>Coming Soon</Heading>
            </Box>
        </Layout>
    );
}

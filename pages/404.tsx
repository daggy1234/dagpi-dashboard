import { Box, Heading, Text } from '@chakra-ui/react';

import SEO from '../components/seo';

const NotFoundPage = () => (
    <>
        <SEO title="404: Not found" description="Does Not exist" />
        <Box textAlign="center" padding="10%" color="black">
            <Heading as="h1" size="xl">
                404: NOT FOUND
            </Heading>
            <Text>Stop poking around, smh. This does not exist you looser.</Text>
        </Box>
    </>
);

export default NotFoundPage;

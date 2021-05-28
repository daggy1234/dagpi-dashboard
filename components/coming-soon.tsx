import { Box, Button, Heading } from '@chakra-ui/react';
import {useRouter} from 'next/router';

import SEO from './seo';
export default function ComingSoon() {
    const router = useRouter();
    return (
        <Box textAlign="center">
            <SEO
                url="https://dagpi.xyz"
                title="Coming Soon"
                description="This page is under maintanence. Stay tuned for more!"
            />
            <Heading my={10} size="lg">Coming Soon</Heading>

            <Button
                size="lg"
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                    router.push('/dashboard')
                }}>
                Dashboard
            </Button>
        </Box>
    );
}

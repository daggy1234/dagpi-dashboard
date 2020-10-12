import { Box, Button, Heading } from '@chakra-ui/core';
import { signIn } from 'next-auth/client';

import SEO from './seo';
export default function AccessDenied() {
    return (
        <Box textAlign="center">
            <SEO title="Access Denied" description="Please login to continue" />
            <Heading size="lg">Access Denied</Heading>

            <Button
                size="lg"
                colorScheme="teal"
                variant="outline"
                onClick={(e) => {
                    e.preventDefault();
                    signIn('discord');
                }}>
                Sign In
            </Button>
        </Box>
    );
}

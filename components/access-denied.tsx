import { Box, Button, Heading } from '@chakra-ui/react';
import { signIn } from 'next-auth/client';

import SEO from './seo';
export default function AccessDenied() {
    return (
        <Box textAlign="center">
            <SEO
                url="https://dagpi.xyz"
                title="Access Denied"
                description="Please login to continue and access your portal"
            />
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

import { Box, Button, Heading } from '@chakra-ui/core';
import { signIn } from 'next-auth/client';
export default function AccessDenied() {
    return (
        <Box textAlign="center">
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

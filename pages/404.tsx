import { Box, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';

import SEO from '../components/seo';

const NotFoundPage = () => {
    const router = useRouter();
    const color = useColorModeValue('black', 'white');
    return (
        <>
            <SEO url="https://dagpi.xyz" title="404: Not found" description="Does Not exist" />
            <Box
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                padding="10%"
                color={color}>
                <Heading py={4} as="h1" size="xl">
                    404: NOT FOUND
                </Heading>
                <Text py={4}>Stop poking around, smh. This does not exist you loser.</Text>
                <Button
                    onClick={() => {
                        router.push('/');
                    }}
                    py={4}
                    size="lg"
                    leftIcon={<AiFillHome />}
                    colorScheme="purple">
                    Home
                </Button>
            </Box>
        </>
    );
};

export default NotFoundPage;

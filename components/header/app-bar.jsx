import { Box, Button, Flex, Heading, Text } from '@chakra-ui/core';

const MenuItems = ({ children }) => (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        {children}
    </Text>
);

export default function AppBar({ onOpen, ...rest }) {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="teal.500"
            color="white"
            {...rest}>
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
                    Chakra UI
                </Heading>
            </Flex>
            <Box display={{ sm: 'block', md: 'none' }} onClick={onOpen}>
                <svg
                    fill="white"
                    width="12px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </Box>
            <Box
                display={{ sm: 'none', md: 'flex' }}
                width={{ sm: 'full', md: 'auto' }}
                alignItems="center"
                flexGrow={1}>
                <MenuItems>Docs</MenuItems>
                <MenuItems>Examples</MenuItems>
                <MenuItems>Blog</MenuItems>
            </Box>
            <Box display={{ sm: 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
                <Button bg="transparent" border="1px">
                    Create account
                </Button>
            </Box>
        </Flex>
    );
}

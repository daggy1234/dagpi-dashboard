import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import {
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList
} from '@chakra-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

import ExtLink from '../Link';
import NextLink from '../NextLink';
const MenuItems = ({ children }) => (
    <Heading
        as="h2"
        size="md"
        mt={{ base: 4, md: 0 }}
        mr={6}
        display="block"
        textAlign="center"
        color="white">
        {children}
    </Heading>
);

export default function AppBar({ onOpen, ...rest }) {
    const [session, loading] = useSession();
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            alignItems="center"
            padding="1.5rem"
            bg="purple.500"
            color="white"
            {...rest}>
            <Flex align="left" mr={5}>
                <Heading as="h1" size="xl" letterSpacing={'-.1rem'}>
                    Dagpi
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
                flexShrink={1}>
                <NextLink url="/">
                    <MenuItems>Home</MenuItems>
                </NextLink>
                <ExtLink url="https://dagpi.tk">
                    <MenuItems>Docs</MenuItems>
                </ExtLink>
                <ExtLink url="https://server.daggy.tech">
                    <MenuItems>Discord</MenuItems>
                </ExtLink>
                <ExtLink url="https://github.com/Daggy1234/dagpi">
                    <MenuItems>Docs</MenuItems>
                </ExtLink>
                <MenuItems>
                    <Box display={{ sm: 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
                        <Link href="/protected">
                            <Button
                                variant="outline"
                                borderColor="white"
                                leftIcon={<MdDashboard />}
                                color="purple.500"
                                border="1px">
                                Dashboard
                            </Button>
                        </Link>
                    </Box>
                </MenuItems>

                {session && (
                    <MenuItems>
                        <Menu>
                            <MenuButton
                                as={Button}
                                borderColor="purple.500"
                                variant="outline"
                                color="white"
                                colorScheme="purple"
                                rightIcon={<FaChevronDown />}>
                                <Image
                                    boxSize="2rem"
                                    borderRadius="full"
                                    src={session.user.image}
                                    alt={session.user.name}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuGroup textAlign="left" color="black" title="Profile">
                                    <MenuItem bg="transparent" color="black" borderColor="white">
                                        {session.user.name}
                                    </MenuItem>
                                </MenuGroup>
                                <MenuGroup textAlign="left" color="black" title="Email">
                                    <MenuItem bg="transparent" color="black" borderColor="white">
                                        {session.user.email}
                                    </MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuItem
                                    as={Button}
                                    colorScheme="pink"
                                    variant="solid"
                                    border="1px"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut();
                                    }}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </MenuItems>
                )}
                {!session && (
                    <MenuItems>
                        <Box display={{ sm: 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
                            <Button
                                bg="transparent"
                                border="1px"
                                onClick={(e) => {
                                    e.preventDefault();
                                    signIn('discord');
                                }}>
                                Login
                            </Button>
                        </Box>
                    </MenuItems>
                )}
            </Box>
        </Flex>
    );
}

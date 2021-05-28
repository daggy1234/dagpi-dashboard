import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image as CImage,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { FaChevronDown } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

import ExtLink from '../Link';
import styles from '../link.module.scss';
import NextLink from '../NextLink';
const MenuItems = ({ children }) => (
    <Heading
        as="h2"
        size="md"
        mt={{ base: 4, md: 0 }}
        display="block"
        textAlign="center"
        color="white">
        {children}
    </Heading>
);

export default function AppBar({ onOpen, ...rest }) {
    const [session, loading] = useSession();
    const { toggleColorMode: toggleMode } = useColorMode();
    const text = useColorModeValue('dark', 'light');
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);
    const bw = useColorModeValue('black', 'white');
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            alignItems="center"
            padding="1.5rem"
            bg={useColorModeValue('purple.500', 'purple.900')}
            color="white"
            {...rest}>
            <Flex align="left" mr={5}>
                <Box mt={{ base: '0px', sm: '0px' }} boxSize="20">
                    <Image priority={true} height={120} width={100} alt="Dagpi" src="/dagpi.png" />
                </Box>
                <Heading
                    ml="-10px"
                    mt={{ base: '20px', md: '20px' }}
                    as="h1"
                    size="xl"
                    letterSpacing={'-.1rem'}>
                    <Link href="/">
                        <a className={styles.nodec}>agpi</a>
                    </Link>
                </Heading>
            </Flex>
            <IconButton
                size="md"
                fontSize="lg"
                _hover={{}}
                _selected={{}}
                _highlighted={{}}
                _focus={{}}
                mr="-75px"
                display={{ base: 'inline-flex', lg: 'none' }}
                aria-label={`Switch to ${text} mode`}
                variant="solid"
                color={useColorModeValue('white', 'yellow.400')}
                bg={useColorModeValue('gray.600', 'blue.400')}
                onClick={toggleMode}
                icon={<SwitchIcon />}
            />
            <Box display={{ sm: 'block', lg: 'none' }} onClick={onOpen}>
                <svg
                    fill="white"
                    width="12px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </Box>
            <HStack
                display={{ base: 'none', lg: 'flex' }}
                width={{ base: 'full', lg: 'auto' }}
                alignItems="center"
                spacing={4}
                flexShrink={1}>
                <IconButton
                    size="md"
                    _hover={{}}
                    _selected={{}}
                    _highlighted={{}}
                    _focus={{}}
                    fontSize="lg"
                    display={{ base: 'none', lg: 'inline-flex' }}
                    aria-label={`Switch to ${text} mode`}
                    variant="solid"
                    mr={3}
                    color={useColorModeValue('white', 'yellow.400')}
                    bg={useColorModeValue('gray.600', 'blue.400')}
                    onClick={toggleMode}
                    icon={<SwitchIcon />}
                />
                <NextLink url="/">
                    <MenuItems>Home</MenuItems>
                </NextLink>
                <NextLink url="/playground">
                    <MenuItems>Playground</MenuItems>
                </NextLink>
                <NextLink url="/premium">
                    <MenuItems>Premium</MenuItems>
                </NextLink>
                <ExtLink url="https://dagpi.docs.apiary.io">
                    <MenuItems>Docs</MenuItems>
                </ExtLink>
                <ExtLink url="https://server.daggy.tech">
                    <MenuItems>Discord</MenuItems>
                </ExtLink>
                <ExtLink url="https://github.com/Daggy1234/dagpi">
                    <MenuItems>Github</MenuItems>
                </ExtLink>
                <MenuItems>
                    <Box display={{ sm: 'none', lg: 'block' }} mt={{ base: 4, md: 0 }}>
                        <Link href="/dashboard">
                            <Button
                                variant="outline"
                                borderColor="white"
                                leftIcon={<MdDashboard />}
                                color="white"
                                _hover={{ color: 'purple.500', bg: 'white' }}
                                border="1px">
                                Dashboard
                            </Button>
                        </Link>
                    </Box>
                </MenuItems>

                {session && !loading ?   (
                    <MenuItems>
                        <Menu>
                            <MenuButton
                                as={Button}
                                borderColor="transparent"
                                variant="outline"
                                _focus={{}}
                                _hover={{}}
                                color="white"
                                colorScheme="purple"
                                rightIcon={<FaChevronDown />}>
                                <CImage
                                    boxSize="2rem"
                                    borderRadius="full"
                                    src={session.user.image}
                                    alt={session.user.name}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuGroup isTruncated textAlign="left" color={bw} title="Id">
                                    <MenuItem color={bw}>{session.user.id}</MenuItem>
                                </MenuGroup>
                                <MenuGroup textAlign="left" color={bw} title="Name">
                                    <MenuItem color={bw}>{session.user.name}</MenuItem>
                                </MenuGroup>
                                <MenuGroup textAlign="left" color={bw} title="Email">
                                    <MenuItem color={bw}>{session.user.email}</MenuItem>
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
                ) : (
                    <MenuItems>
                        <Box display={{ sm: 'none', lg: 'block' }} mt={{ base: 4, lg: 0 }}>
                            <Button
                                bg="transparent"
                                border="1px"
                                color="white"
                                borderColor="white"
                                onClick={(e) => {
                                    e.preventDefault();
                                    signIn('discord');
                                }}>
                                Login
                            </Button>
                        </Box>
                    </MenuItems>
                )}
            </HStack>
        </Flex>
    );
}

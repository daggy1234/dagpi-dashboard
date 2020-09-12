import { Box, Button, Flex, Heading, Text } from '@chakra-ui/core';
import {FaChevronDown} from "react-icons/fa";
import {
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuItemOption,
    MenuList,
    MenuOptionGroup
} from '@chakra-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';

const MenuItems = ({ children }) => (
    <Heading as="h2" size="md" mt={{ base: 4, md: 0 }} mr={6} display="block" textAlign="center">
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
            bg="#9F7AEA"
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
                <MenuItems>Home</MenuItems>
                <MenuItems>Docs</MenuItems>
                <MenuItems>Discord</MenuItems>
                <MenuItems>Github</MenuItems>
                <MenuItems>
                    <Box display={{ sm: 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
                        <Button variant="outline" borderColor="white" color="#9F7AEA" border="1px">
                            Dashboard
                        </Button>
                    </Box>
                </MenuItems>

                {session && (
                    
                        <Menu>
                            <MenuButton as={Button} borderColor="purple.400" variant="outline" color="white" colorScheme="purple" rightIcon={<FaChevronDown />}>
                                <Image
                                    boxSize="2rem"
                                    borderRadius="full"
                                    src={session.user.image}
                                    alt={session.user.name}
                                    
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>{session.user.name}</MenuItem>
                                <MenuItem>{session.user.email}</MenuItem>
                                <MenuItem>
                                    <Button
                                        colorScheme="pink"
                                        variant="solid"
                                        bg="transparent"
                                        border="1px"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            signOut();
                                        }}>
                                        Logout
                                    </Button>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                   
                )}
                {!session && (
                    <MenuItems>
                        <Box display={{ sm: 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
                            <Button
                                bg="transparent"
                                border="1px"
                                onClick={(e) => {
                                    e.preventDefault();
                                    signIn();
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

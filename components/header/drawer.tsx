import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Image,
    StackDivider,
    Text,
    useColorMode,
    useColorModeValue,
    VStack
} from '@chakra-ui/core';
import { Collapse } from '@chakra-ui/transition';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

import ExtLink from '../Link';
import NextLink from '../NextLink';

export default function MyDrawer({ isOpen, onClose }) {
    const btnRef = React.useRef();
    const [session, loading] = useSession();
    const [show, setShow] = React.useState(false);
    const { toggleColorMode: toggleMode } = useColorMode();
    const text = useColorModeValue('dark', 'light');
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);
    const handleToggle = () => {
        setShow(!show);
    };
    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} placement="right" finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>NavBar</DrawerHeader>

                    <DrawerBody mr="30px">
                        <VStack
                            divider={<StackDivider borderColor="gray.200" />}
                            spacing={4}
                            align="stretch"
                            textAlign="center">
                            <IconButton
                                size="md"
                                fontSize="lg"
                                aria-label={`Switch to ${text} mode`}
                                variant="solid"
                                color={useColorModeValue('white', 'yellow.400')}
                                bg={useColorModeValue('gray.600', 'blue.400')}
                                mr="3"
                                onClick={toggleMode}
                                icon={<SwitchIcon />}
                            />
                            <NextLink url="/">Home</NextLink>
                            <ExtLink url="https://docs.dagpi.apiary.io">Docs</ExtLink>
                            <ExtLink url="https://server.daggy.tech">Discord</ExtLink>
                            <ExtLink url="https://github.com/Daggy1234/dagpi">Github</ExtLink>

                            <Link href="/dashboard">
                                <Button
                                    variant="outline"
                                    borderColor="white"
                                    leftIcon={<MdDashboard />}
                                    color="purple.500"
                                    bg="purple.100"
                                    _hover={{ bg: 'purple.500', color: 'white' }}
                                    border="1px">
                                    Dashboard
                                </Button>
                            </Link>

                            {session && (
                                <>
                                    <Button colorScheme="purple" onClick={handleToggle}>
                                        <Image
                                            boxSize="2rem"
                                            borderRadius="full"
                                            src={session.user.image}
                                            alt={session.user.name}
                                            mr="60px"
                                        />
                                        {show ? <FaChevronUp /> : <FaChevronDown />}
                                    </Button>
                                    <Collapse in={show} animateOpacity>
                                        <VStack spacing="30px">
                                            <Box>User: {session.user.name}</Box>
                                            <Box>Email: {session.user.email}</Box>
                                        </VStack>
                                        <Button
                                            mt="50px"
                                            colorScheme="pink"
                                            variant="solid"
                                            border="1px"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                signOut();
                                            }}>
                                            Logout
                                        </Button>
                                    </Collapse>
                                </>
                            )}
                            {!session && (
                                <Button
                                    border="1px"
                                    colorScheme="purple"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signIn('discord');
                                    }}>
                                    Login
                                </Button>
                            )}
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

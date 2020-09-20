import {
    Box,
    Button,
    Collapse,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Image,
    StackDivider,
    VStack
} from '@chakra-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

import ExtLink from '../Link';
import NextLink from '../NextLink';

export default function MyDrawer({ isOpen, onClose }) {
    const btnRef = React.useRef();
    const [session, loading] = useSession();
    const [show, setShow] = React.useState(false);
    const handleToggle = () => {
        console.log('click');
        setShow(!show);
    };
    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} placement="right" finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>NavBar</DrawerHeader>

                    <DrawerBody>
                        <VStack
                            divider={<StackDivider borderColor="gray.200" />}
                            spacing={4}
                            align="stretch"
                            textAlign="center">
                            <NextLink url="/">Home</NextLink>
                            <ExtLink url="https://dagpi.tk">Docs</ExtLink>
                            <ExtLink url="https://server.daggy.tech">Discord</ExtLink>
                            <ExtLink url="https://github.com/Daggy1234/dagpi">Github</ExtLink>

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

                            {session && (
                                <>
                                    <Button
                                        borderColor="white"
                                        variant="outline"
                                        color="purple"
                                        colorScheme="white"
                                        rightIcon={<FaChevronDown />}
                                        onClick={handleToggle}>
                                        <Image
                                            boxSize="2rem"
                                            borderRadius="full"
                                            src={session.user.image}
                                            alt={session.user.name}
                                            mr="50px"
                                        />
                                    </Button>
                                    <Collapse isOpen={show}>
                                        <VStack spacing="30px" bg="gray.50" textAlign="left">
                                            <Box mt="30px">User: {session.user.name}</Box>
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

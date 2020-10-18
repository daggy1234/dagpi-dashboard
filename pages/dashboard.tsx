import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Input,
    Text,
    useClipboard,
    useToast,
    VStack
} from '@chakra-ui/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import fromUnixTime from 'date-fns/fromUnixTime';
import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import React from 'react';
import { AiFillDollarCircle, AiOutlineEnter } from 'react-icons/ai';
import { BiGitMerge } from 'react-icons/bi';
import { BsGraphUp, BsPencilSquare } from 'react-icons/bs';
import { FaClipboard, FaMousePointer } from 'react-icons/fa';
import { TiTick, TiTimes } from 'react-icons/ti';

import AccessDenied from '../components/access-denied';
import Layout from '../components/layout';
import Link from '../components/Link';
import Loading from '../components/loading';
import NextLink from '../components/NextLink';
import SEO from '../components/seo';
import styles from '../styles/table.model.scss';

const StatBox = (props) => {
    return (
        <Box
            w={{ base: '75%', md: '20%' }}
            h={{ base: '40%', md: '100%' }}
            bg={props.color}
            textAlign="center"
            marginTop={{ base: '3rem', md: '1rem' }}>
            {props.children}
        </Box>
    );
};

function isContrib(id: string) {
    return ['491174779278065689'].includes(id);
}

const Alert = ({ isOpen, cancelRef, onClose, isSuccess, setdes }) => {
    return (
        <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {isSuccess
                            ? 'Are you sure you want to Reset?'
                            : 'Are you SURE you wnat to DELETE?'}
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        {isSuccess
                            ? 'This is an irreversible reaction. Your token will be reset and will not be useable. The old token will not work.'
                            : 'Post deleteion you will loose all of your data INCLUDING Apps and Tokens. You will have to redo all of our application process and all of you data will be DELETED.'}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose} colorScheme="white" ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setdes(true);
                                onClose();
                            }}
                            colorScheme="red">
                            Proceed
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default function Page() {
    const [session, loading] = useSession();
    const [data, SetData] = useState(null);
    const [app, SetApp] = useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(true);
    const [destruction, setdes] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();
    const isFirstRender = React.useRef(true);
    const toast = useToast();
    const { hasCopied, onCopy } = useClipboard(data ? data.apikey : 'Waiting');
    // Fetch content from protected route
    useEffect(() => {
        const json = async () => {
            const appd = await fetch('/api/routes/app-get');
            const appobj = await appd.json();
            if (appobj.data != undefined) {
                SetApp(appobj);
                const resp = await fetch('/api/routes/token');
                const obj = await resp.json();
                if (obj.data != undefined) {
                    SetData(obj);
                }
            }
        };
        json();
    }, [session]);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (!isOpen && isFirstRender) {
            if (destruction) {
                if (success) {
                    const ResetTok = async () => {
                        const res = await fetch('/api/routes/token-reset');
                        if (res.status) {
                            window.location.reload();
                        } else {
                            toast({
                                title: 'An error occurred.',
                                description: 'Unable to Reset Token.',
                                status: 'error',
                                duration: 9000,
                                isClosable: true
                            });
                        }
                    };
                    ResetTok();
                } else {
                    const DeleteTok = async () => {
                        const res = await fetch('/api/routes/delete-all');
                        if (res.status === 200) {
                            window.location.reload();
                        } else {
                            toast({
                                title: 'An error occurred.',
                                description: `Unable to Reset Token. ${res.status}`,
                                status: 'error',
                                duration: 9000,
                                isClosable: true
                            });
                        }
                    };
                    DeleteTok();
                }
            }
        }
    }, [isOpen]);
    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null;

    // If no session exists, display access denied message

    if (!session) {
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        );
    }

    // If session exists, display content
    if (!app) {
        return (
            <Layout>
                <Flex padding="5%" justifyContent="center">
                    <Loading />
                </Flex>
            </Layout>
        );
    }
    if (app.data === false) {
        return (
            <Layout>
                <Flex padding="5%" justifyContent="center">
                    <VStack spacing={3}>
                        <Heading>Please create an application</Heading>
                        <NextLink url="/form">
                            <Button variant="outline" colorScheme="pink">
                                Create App
                            </Button>
                        </NextLink>
                    </VStack>
                </Flex>
            </Layout>
        );
    } else {
        if (!data) {
            return (
                <Layout>
                    <Flex justifyContent="center">
                        <Loading />
                    </Flex>
                </Layout>
            );
        } else {
            const Table = () => {
                return (
                    <div className={styles.tablediv}>
                        <table className={styles.apptable}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Url</th>
                                    <th>Approved</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{app.uu}</td>
                                    <td>{app.appname}</td>
                                    <td>{app.appurl}</td>
                                    <td>
                                        {app.approved ? (
                                            <IconButton
                                                aria-label="approved"
                                                colorScheme="green"
                                                icon={<TiTick />}
                                            />
                                        ) : (
                                            <IconButton
                                                aria-label="approved"
                                                colorScheme="red"
                                                icon={<TiTimes />}
                                            />
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            };
            if (data.data === false) {
                return (
                    <Layout>
                        <Flex padding="5%" justifyContent="center" textAlign="left">
                            <VStack spacing={3}>
                                <Heading size="lg">
                                    We are in the process of approving your app. Join the discord
                                    for updates
                                </Heading>
                                <Link url="https://server.daggy.tech">
                                    <Button size="lg" variant="outline" colorScheme="pink">
                                        Discord
                                    </Button>
                                </Link>
                                <Heading size="lg" alignSelf="left">
                                    Your Apps
                                </Heading>
                                <Table />
                            </VStack>
                        </Flex>
                    </Layout>
                );
            }
            return (
                <>
                    <SEO title="Dashboard" description="Your Dagpi Management Console" />
                    <Alert
                        isOpen={isOpen}
                        onClose={onClose}
                        cancelRef={cancelRef}
                        isSuccess={success}
                        setdes={setdes}
                    />
                    <Layout>
                        <Box padding="5%">
                            <Heading size="2xl">Dashboard</Heading>
                            <Heading size="lg">Token</Heading>
                            <Flex mb={2}>
                                <Input
                                    variant="filled"
                                    bg="gray.300"
                                    color="red"
                                    value={data.apikey}
                                    isReadOnly
                                    placeholder="Welcome"
                                />
                                <Button
                                    colorScheme="purple"
                                    leftIcon={<FaClipboard />}
                                    onClick={onCopy}
                                    size="lg"
                                    ml={2}>
                                    {hasCopied ? 'Copied' : 'Copy'}
                                </Button>
                            </Flex>
                            <Flex
                                direction={{ base: 'column', md: 'row' }}
                                align="center"
                                justify="space-between"
                                wrap="wrap"
                                alignItems="center"
                                marginTop="5%">
                                <StatBox color="blue.300">
                                    <VStack padding="1.5rem">
                                        <Heading size="sm">
                                            <AiOutlineEnter /> Created
                                        </Heading>
                                        <Heading color="white" size="md">
                                            {formatDistanceToNow(Date.parse(app.createdAt))} ago
                                        </Heading>
                                        <Heading size="sm">
                                            <BsPencilSquare /> Approved
                                        </Heading>
                                        <Heading color="white" size="md">
                                            {formatDistanceToNow(Date.parse(data.createdAt))} ago
                                        </Heading>
                                    </VStack>
                                </StatBox>
                                <StatBox color="green.300">
                                    <VStack padding="1.5rem">
                                        <Heading size="sm">
                                            <AiFillDollarCircle /> Premium User?
                                        </Heading>
                                        <Heading color="white" size="md">
                                            {data.enhanced ? 'Yes!' : 'NO'}
                                        </Heading>
                                        <Heading size="sm">
                                            <BiGitMerge /> Contributor
                                        </Heading>
                                        <Heading color="white" size="md">
                                            {isContrib(session.user.id) ? 'Yes!' : 'NO'}
                                        </Heading>
                                    </VStack>
                                </StatBox>
                                <StatBox color="red.300">
                                    <VStack padding="1.5rem">
                                        <Heading size="sm">
                                            <FaMousePointer /> Total Uses
                                        </Heading>
                                        <Heading color="white" size="md">
                                            {data.totaluses}
                                        </Heading>
                                        <Heading size="sm">
                                            <BsGraphUp /> Detailed Stats
                                        </Heading>
                                        <Heading color="white" size="md">
                                            Coming Soon
                                        </Heading>
                                    </VStack>
                                </StatBox>
                                <StatBox color="gray.200" spacing={4}>
                                    <VStack padding="1.5rem">
                                        <Heading size="md">Danger Zone</Heading>
                                        <Button
                                            variant="outline"
                                            colorScheme="orange"
                                            onClick={() => {
                                                setIsOpen(true);
                                            }}>
                                            Reset Token
                                        </Button>
                                        <Button
                                            variant="outline"
                                            colorScheme="red"
                                            onClick={() => {
                                                setSuccess(false);
                                                setIsOpen(true);
                                            }}>
                                            Delete App
                                        </Button>
                                    </VStack>
                                </StatBox>
                            </Flex>
                            <br />
                            <Heading size="lg">Apps</Heading>
                            <Table />
                        </Box>
                    </Layout>
                </>
            );
        }
    }
}

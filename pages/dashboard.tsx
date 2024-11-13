/* eslint-disable complexity */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-console */
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Divider,
    Spinner,
    Flex,
    Heading,
    Icon,
    IconButton,
    Input,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useClipboard,
    useColorModeValue,
    useToast,
    VStack
} from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import * as NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiFillDollarCircle, AiFillWarning, AiOutlineEnter } from 'react-icons/ai';
import { BiGitMerge } from 'react-icons/bi';
import { BsGraphUp, BsPencilSquare } from 'react-icons/bs';
import { FaClipboard, FaMousePointer, FaTerminal, FaWallet } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';
import { TiTick, TiTimes } from 'react-icons/ti';

import AccessDenied from '../components/access-denied';
import Layout from '../components/layout';
import Link from '../components/Link';
import Loading from '../components/loading';
import SEO from '../components/seo';
import DiscordLogo from '../components/svg/discord-logo';
import UseCard from '../components/user-card';
import styles from '../styles/table.module.scss';

const StatBox = (props: { color: string; children: React.ReactNode; padding: string }) => {
    const { color, children, padding } = props;
    return (
        <Box
            w={{ base: '75%', md: '20%' }}
            h={{ base: '40%', md: '100%' }}
            bg={color}
            padding={padding}
            textAlign="center"
            marginTop={{ base: '3rem', md: '1rem' }}>
            {children}
        </Box>
    );
};

function isContrib(id: string) {
    return ['491174779278065689'].includes(id);
}

interface AppData {
    data: boolean;
    premium?: boolean;
    appname?: string;
    appurl?: string;
    uu?: string;
    created_at?: string;
    id?: string;
    token?: string;
}
interface UserData {
    data: boolean;
    apikey?: string;
    created_at?: string;
    ratelimit?: number;
}

export default function Page() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [data, SetData] = useState<UserData | null>(null);
    const [app, SetApp] = useState<AppData | null>(null);
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [isShown, setIsShown] = useState(false);
    const toast = useToast();
    const [isSuccess, setSuccess] = React.useState(false);
    const { hasCopied, onCopy } = useClipboard(data ? data.apikey || '' : 'Waiting');
    const iconContextValue = React.useMemo(
        () => ({ style: { display: 'inline' }, size: '1.5em' }),
        []
    );
    // Fetch content from protected route
    console.log(data);
    const DeleteTok = async () => {
        const res = await fetch('/api/routes/delete-all', {
            method: 'POST',
            body: JSON.stringify(app)
        });
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
    useEffect(() => {
        const json = async () => {
            const appd = await fetch('/api/routes/user-profile');
            console.log(appd.status);
            const appobj = await appd.json();
            if (appobj.app != null) {
                SetApp({
                    data: true,
                    ...appobj.app
                });
                if (appobj.token != null) {
                    SetData({
                        data: true,
                        ...appobj.token
                    });
                } else {
                    SetData({
                        data: false
                    });
                }
            } else {
                SetApp({
                    data: false
                });
            }
        };
        json();
    }, [session]);
    // When rendering client side don't display anything until loading is complete
    if (loading) {
        return <Spinner />;
    }

    // If no session exists, display access denied message

    if (!session) {
        console.log('NO SESSIon');
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        );
    }

    console.log(session);
    // If session exists, display content
    if (!app) {
        console.log('NO APP');
        return (
            <Layout>
                <Flex padding="5%" justifyContent="center">
                    <Loading />
                </Flex>
            </Layout>
        );
    }
    if (!app.data) {
        console.log('NO APP DATA');
        return (
            <Layout>
                <Flex padding="5%" m="5%" justifyContent="center">
                    <VStack spacing={3}>
                        <Heading>Please create an application</Heading>
                        <Link url="/form">
                            <Button variant="outline" size="lg" colorScheme="pink">
                                Create App
                            </Button>
                        </Link>
                    </VStack>
                </Flex>
            </Layout>
        );
    }
    if (!data) {
        return (
            <Layout>
                <Flex justifyContent="center">
                    <Loading />
                </Flex>
            </Layout>
        );
    }
    const TableComp = () => {
        return (
            <div className={styles.tablediv}>
                <Table variant="simple" style={{ overflowX: 'auto' }}>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Name</Th>
                            <Th>Url</Th>
                            <Th>Approved</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{app.uu}</Td>
                            <Td>{app.appname}</Td>
                            <Td>{app.appurl}</Td>
                            <Td>
                                {data.data ? (
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
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
        );
    };
    if (!data.data) {
        return (
            <Layout>
                <Box padding="5%">
                    <VStack spacing={3}>
                        <Box m={3} justifyContent="center" textAlign="center">
                            <Heading size="lg" m={2}>
                                We are in the process of approving your app.
                            </Heading>
                            <Text m={2}> Join the Discord for news, and answering updates.</Text>
                            <Link url="https://server.daggy.tech">
                                <Button size="lg" variant="outline" colorScheme="pink">
                                    Discord
                                </Button>
                            </Link>
                        </Box>
                        <Divider mt={10} />
                        <Box>
                            <Heading size="lg" marginY={2}>
                                Your Apps
                            </Heading>
                            <TableComp />
                        </Box>
                    </VStack>
                </Box>
            </Layout>
        );
    }
    return (
        <>
            <SEO
                title="Dashboard"
                url="https://dagpi.xyz/dashboard"
                description="Your Dagpi Management Console"
            />
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {isSuccess
                                ? 'Are you sure you want to Reset?'
                                : 'Are you SURE you want to DELETE?'}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {isSuccess
                                ? 'This is an irreversible reaction. Your token will be reset and will not be useable. The old token will not work.'
                                : 'Post deleteion you will loose all of your data INCLUDING Apps and Tokens. You will have to redo all of our application process and all of your data will be DELETED.'}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={cancelRef} colorScheme="whatsapp">
                                Cancel
                            </Button>
                            <Button
                                onClick={async () => {
                                    if (isSuccess) {
                                        await ResetTok();
                                    } else {
                                        await DeleteTok();
                                    }
                                    onClose();
                                }}
                                colorScheme="red">
                                Proceed
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Layout>
                <Box padding="5%">
                    <Heading size="2xl">Dashboard</Heading>
                    <Divider mt={10} mb={7} />
                    <Flex direction={{ base: 'column', md: 'row' }}>
                        <Box w={{ base: '100%', md: '25%', lg: '40%' }}>
                            <Box py="14" px={{ base: '12', md: '24' }}>
                                <Stack spacing={3} maxW="md" direction="column">
                                    <Button
                                        leftIcon={<Icon as={FaTerminal} />}
                                        colorScheme="blue"
                                        onClick={() => router.push('/tokens')}
                                        size="lg">
                                        CLI Tokens
                                    </Button>
                                    <Button
                                        leftIcon={<Icon as={FaWallet} />}
                                        onClick={() => router.push('/billing')}
                                        colorScheme="green"
                                        size="lg">
                                        Billing
                                    </Button>
                                    <Button
                                        bg="#5865F2"
                                        color="white"
                                        leftIcon={<DiscordLogo color="#fff" size="1.5em" />}
                                        onClick={() => router.push('https://server.daggy.tech')}
                                        size="lg">
                                        Discord Server
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                        <Box>
                            <UseCard
                                name={session?.user?.name || ''}
                                created={formatDistanceToNow(
                                    // @ts-expect-error joined id does exist
                                    Date.parse(session?.joined_dagpi || '')
                                )}
                                image={session?.user?.image || ''}
                                // @ts-expect-error client id does exist
                                client_id={session?.client_id || ''}
                                // @ts-expect-error id does exist
                                discord_id={session?.user?.id || ''}
                                email={session?.user?.email || ''}
                            />
                        </Box>
                    </Flex>
                    <Divider mt={10} mb={7} />
                    <Heading size="lg">Token</Heading>
                    <Flex mb={5} mt={5}>
                        <Input
                            variant="filled"
                            bg={useColorModeValue('gray.300', 'gray.700')}
                            value={isShown ? data.apikey : '[Hover to reveal API token]'}
                            isReadOnly
                            placeholder="Welcome"
                            onMouseEnter={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}
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

                    <IconContext.Provider value={iconContextValue}>
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            align="center"
                            justify="space-between"
                            wrap="wrap"
                            alignItems="center"
                            marginTop="5%">
                            <StatBox color="blue.300" padding="2em">
                                <VStack padding="2rem">
                                    <Heading size="sm">
                                        <AiOutlineEnter /> Created
                                    </Heading>
                                    <Heading color="white" size="md">
                                        {`${formatDistanceToNow(Date.parse(app.created_at || ''))} ago`}
                                    </Heading>
                                    <Heading size="sm">
                                        <BsPencilSquare /> Approved
                                    </Heading>
                                    <Heading color="white" size="md">
                                        {formatDistanceToNow(Date.parse(data.created_at || ''))} ago
                                    </Heading>
                                </VStack>
                            </StatBox>
                            <StatBox color="green.300" padding="2em">
                                <VStack padding="2em">
                                    <Heading size="sm">
                                        <AiFillDollarCircle /> Premium User?
                                    </Heading>
                                    <Heading color="white" size="md">
                                        {app.premium ? (
                                            <NextLink.default href="/billing">
                                                <Button colorScheme="blackAlpha">Billing</Button>
                                            </NextLink.default>
                                        ) : (
                                            <NextLink.default href="/premium">
                                                <Button colorScheme="blackAlpha">
                                                    Get Premium
                                                </Button>
                                            </NextLink.default>
                                        )}
                                    </Heading>
                                    <Heading size="sm">
                                        <BiGitMerge /> Contributor
                                    </Heading>
                                    <Heading color="white" size="md">
                                        {/* @ts-expect-error id exists */}
                                        {isContrib(session?.user?.id) ? 'Yes!' : 'NO'}
                                    </Heading>
                                </VStack>
                            </StatBox>
                            <StatBox color="red.300" padding="2em">
                                <VStack padding="2em">
                                    <Heading size="sm">
                                        <FaMousePointer /> Ratelimit
                                    </Heading>
                                    <Heading color="white" size="md">
                                        {data.ratelimit}
                                    </Heading>
                                    <Heading size="sm">
                                        <BsGraphUp /> Detailed Stats
                                    </Heading>
                                    <NextLink.default
                                        href={{
                                            pathname: '/stats/[token]',
                                            query: { token: data.apikey, tp: 1 }
                                        }}>
                                        <Button colorScheme="blackAlpha">Stat Dashboard</Button>
                                    </NextLink.default>
                                </VStack>
                            </StatBox>
                            <StatBox
                                color={useColorModeValue('gray.200', 'gray.700')}
                                padding="2em">
                                <VStack padding="2em">
                                    <Heading size="lg">Danger Zone</Heading>
                                    <Button
                                        size="lg"
                                        variant="solid"
                                        leftIcon={<FiRefreshCcw />}
                                        colorScheme="orange"
                                        onClick={() => {
                                            setSuccess(true);
                                            setIsOpen(true);
                                        }}>
                                        Reset Token
                                    </Button>
                                    <Button
                                        variant="solid"
                                        size="lg"
                                        colorScheme="red"
                                        leftIcon={<AiFillWarning />}
                                        onClick={() => {
                                            setSuccess(false);
                                            setIsOpen(true);
                                        }}>
                                        Delete App
                                    </Button>
                                </VStack>
                            </StatBox>
                        </Flex>
                    </IconContext.Provider>
                    <br />
                    <Divider mt={10} mb={7} />
                    <Heading mb={4} size="lg">
                        Apps
                    </Heading>
                    <TableComp />
                </Box>
            </Layout>
        </>
    );
}

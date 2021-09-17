import {
    Alert,
    AlertDescription,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    chakra,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    SimpleGrid,
    Spacer,
    Stack,
    Text,
    Tooltip,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Field, Form, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import React from 'react';
import { AiFillEdit, AiTwotoneLock } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTerminalFill, BsFillTrashFill } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import * as Yup from 'yup';

import AccessDenied from '../components/access-denied';
import Layout from '../components/layout';
import Loading from '../components/loading';
import SEO from '../components/seo';

interface CliToken {
    id: number;
    client_id: string;
    token: string;
    created_at: string;
    name: string;
}

interface TableProps {
    items: CliToken[];
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    SetnumToProcess: React.Dispatch<number>;
    cli_button: boolean;
}

interface CreateTokenModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    user: string;
}

interface CliForm {
    name: string;
    consent: true;
}

const validation = Yup.object().shape({
    name: Yup.string().required('Required'),
    consent: Yup.boolean().required().oneOf([true], 'Please agree to create the token.')
});

const CreateTokenModal: React.FC<CreateTokenModalProps> = (props) => {
    const initialRef = React.useRef();
    const { isOpen, onClose, user } = props;
    const toast = useToast();
    return (
        <>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Cli Token</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            validationSchema={validation}
                            onSubmit={(values: CliForm, actions) => {
                                setTimeout(async () => {
                                    const resp = await fetch('/api/routes/cli-create', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            name: values.name,
                                            user: user
                                        })
                                    });
                                    const js = await resp.json();
                                    if (js.status == 200) {
                                        actions.setSubmitting(false);
                                        onClose();
                                        window.location.reload();
                                    } else {
                                        toast({
                                            title: 'Error Creating Token',
                                            description: `Unable to create a new token. HTTP Status ${js.status}`,
                                            status: 'error',
                                            duration: 9000,
                                            isClosable: true
                                        });
                                    }
                                }, 1000);
                            }}
                            initialValues={{
                                name: '',
                                consent: false
                            }}>
                            {(props) => (
                                <Form>
                                    <Stack direction="column" spacing={3}>
                                        <Field name="name">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={
                                                        form.errors.name && form.touched.name
                                                    }
                                                    isRequired>
                                                    <FormLabel htmlFor="name">Token Name</FormLabel>
                                                    <Input
                                                        ref={initialRef}
                                                        {...field}
                                                        id="name"
                                                        placeholder="name"
                                                    />
                                                    <FormHelperText>
                                                        The name for the cli token being created.
                                                    </FormHelperText>
                                                    <FormErrorMessage>
                                                        {form.errors.name}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="consent">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={
                                                        form.errors.consent && form.touched.consent
                                                    }>
                                                    <Flex>
                                                        <Checkbox {...field} id="consent" />
                                                        <FormLabel ml={3} htmlFor="consent">
                                                            Agree to Token Creation
                                                        </FormLabel>
                                                    </Flex>
                                                    <FormHelperText>
                                                        This token will allow someone to control
                                                        applications, edit tokens and delete data.
                                                        Make sure it is secure.{' '}
                                                    </FormHelperText>
                                                    <FormErrorMessage>
                                                        {form.errors.consent}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Box>
                                            <Button
                                                isLoading={props.isSubmitting}
                                                size="lg"
                                                colorScheme="blackAlpha"
                                                type="submit">
                                                Submit
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const Table: React.FC<TableProps> = (props) => {
    const data = props.items;
    const [buttonText, setButtonText] = useState('Copy');
    const router = useRouter();
    const toast = useToast();
    function handleClick() {
        if (buttonText === 'Copy') {
            setButtonText('Copied');
        } else {
            setButtonText('Copy');
        }
    }
    return (
        <Flex w="full" p={{ base: 5, md: 50 }} alignItems="center" justifyContent="center">
            <Stack
                direction={{ base: 'column' }}
                w="full"
                spacing={{ base: 6, md: 0 }}
                borderStyle="solid"
                borderWidth={data.length == 0 ? null : { base: null, md: '1px' }}
                borderColor={useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.16)')}
                bg={{ sm: useColorModeValue('white', 'gray.800') }}>
                {data.length == 0 ? (
                    <Box textAlign="center">
                        <Heading>You Have no tokens</Heading>
                        <Text>
                            To Create a new token click on the Create Token button in the top right
                        </Text>
                    </Box>
                ) : (
                    data.map((token, pid) => {
                        return (
                            <Flex
                                key={pid}
                                direction={{ base: 'row', sm: 'column' }}
                                bg={useColorModeValue('white', 'gray.800')}>
                                {useBreakpointValue({ base: true, sm: pid === 0 }) && (
                                    <SimpleGrid
                                        spacingY={3}
                                        borderStyle="solid"
                                        borderBottom="1px"
                                        borderRight={{ base: '1px', md: null }}
                                        borderLeft={{ base: '1px', md: null }}
                                        borderTop={{ base: '1px', md: null }}
                                        borderColor={useColorModeValue('gray.200', 'gray.700')}
                                        columns={{ base: 1, sm: 4 }}
                                        w={{ base: 100, sm: 'full' }}
                                        color={useColorModeValue('gray.500', 'gray.400')}
                                        bg={useColorModeValue('gray.50', 'inherit')}
                                        py={{ base: 1, sm: 4 }}
                                        px={{ base: 2, sm: 10 }}>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="sm">
                                            Name
                                        </Text>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="sm">
                                            Created
                                        </Text>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="sm">
                                            Token
                                        </Text>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="sm">
                                            Actions
                                        </Text>
                                    </SimpleGrid>
                                )}
                                <SimpleGrid
                                    spacingY={{ base: 3, md: 0 }}
                                    columns={{ base: 1, sm: 4 }}
                                    borderStyle="solid"
                                    borderBottom="1px"
                                    borderRight={{ base: '1px', md: null }}
                                    borderTop={{ base: '1px', md: null }}
                                    color={useColorModeValue(
                                        'gray.800',
                                        'rgba(255, 255, 255, 0.92)'
                                    )}
                                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                                    py={4}
                                    px={10}>
                                    <span>
                                        <Text>{token.name}</Text>
                                    </span>

                                    <span>
                                        <Text>
                                            {formatDistanceToNow(Date.parse(token.created_at))} ago
                                        </Text>
                                    </span>
                                    <span>
                                        <Popover placement="top">
                                            <PopoverTrigger>
                                                <Button
                                                    size="md"
                                                    variant="solid"
                                                    leftIcon={<Icon as={AiTwotoneLock} />}
                                                    colorScheme="purple">
                                                    Show Token
                                                </Button>
                                            </PopoverTrigger>
                                            <Portal>
                                                <PopoverContent>
                                                    <PopoverArrow />
                                                    <PopoverHeader>Token</PopoverHeader>
                                                    <PopoverCloseButton />
                                                    <PopoverBody>
                                                        <Input
                                                            isDisabled
                                                            variant="filled"
                                                            value={token.token}
                                                            placeholder="Basic usage"
                                                        />
                                                    </PopoverBody>
                                                    <PopoverFooter textAlign="right">
                                                        <Button
                                                            onClick={() => {
                                                                copy(token.token);
                                                                handleClick();
                                                            }}
                                                            size="sm">
                                                            {buttonText}
                                                        </Button>
                                                    </PopoverFooter>
                                                </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    </span>
                                    <span>
                                        <Stack direction="row" spacing={3}>
                                            <Tooltip label="Export to JSON" aria-label="A tooltip">
                                                <Button
                                                    onClick={() => {
                                                        router.push(
                                                            `/api/json/${JSON.stringify(token)}`
                                                        );
                                                    }}
                                                    variant="solid"
                                                    colorScheme="blue"
                                                    size="sm">
                                                    <Icon as={BsBoxArrowUpRight} />
                                                </Button>
                                            </Tooltip>

                                            <Tooltip label="Edit Token" aria-label="A tooltip">
                                                <Button
                                                    onClick={() => {
                                                        props.SetnumToProcess(pid);
                                                        props.setEdit(true);
                                                        props.setIsOpen(true);
                                                    }}
                                                    variant="solid"
                                                    colorScheme="green"
                                                    size="sm">
                                                    <Icon as={AiFillEdit} />
                                                </Button>
                                            </Tooltip>

                                            <Tooltip label="Delete Token" aria-label="A tooltip">
                                                <Button
                                                    onClick={() => {
                                                        props.SetnumToProcess(pid);
                                                        props.setEdit(false);
                                                        props.setIsOpen(true);
                                                    }}
                                                    variant="solid"
                                                    colorScheme="red"
                                                    size="sm">
                                                    <Icon as={BsFillTrashFill} />
                                                </Button>
                                            </Tooltip>
                                            {props.cli_button && (
                                                <Tooltip
                                                    label="CLI Export Token"
                                                    aria-label="A tooltip">
                                                    <Button
                                                        onClick={async () => {
                                                            try {
                                                                const out = await fetch(
                                                                    'http://127.0.0.1:3127/cli_token',
                                                                    {
                                                                        method: 'POST',
                                                                        body: JSON.stringify(token)
                                                                    }
                                                                );
                                                                console.log(out.status);
                                                                if (out.status == 200) {
                                                                    toast({
                                                                        title: `Successfully added token to CLI.`,
                                                                        status: 'success',
                                                                        isClosable: true,
                                                                        description:
                                                                            'Token was posted to CLI succesfully'
                                                                    });
                                                                } else {
                                                                    toast({
                                                                        title: `http ${out.status} returned`,
                                                                        status: 'error',
                                                                        isClosable: true,
                                                                        description:
                                                                            'Error returned by CLI server. Pleace check terminal.'
                                                                    });
                                                                }
                                                            } catch (err) {
                                                                toast({
                                                                    title: `Request Failed`,
                                                                    status: 'error',
                                                                    isClosable: true,
                                                                    description:
                                                                        'Unable to make request, if your terminal shows no error please report.'
                                                                });
                                                            }
                                                        }}
                                                        variant="solid"
                                                        colorScheme="pink"
                                                        size="sm">
                                                        <Icon as={BsFillTerminalFill} />
                                                    </Button>
                                                </Tooltip>
                                            )}
                                        </Stack>
                                    </span>
                                </SimpleGrid>
                            </Flex>
                        );
                    })
                )}
            </Stack>
        </Flex>
    );
};

const AlertWindow = ({ isOpen, cancelRef, onClose, isSuccess, setdes }) => {
    return (
        <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
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
                        <Button onClick={onClose} colorScheme="whatsapp" ref={cancelRef}>
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

export default function Page({ cli_redirect }) {
    console.log(cli_redirect);
    const big = useBreakpointValue({ base: false, md: true });
    const [session, loading] = useSession();
    const isFirstRender = React.useRef(true);
    const cancelRef = React.useRef();
    const toast = useToast();
    const [isOpen, setIsOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(true);
    const [destruction, setDes] = React.useState(false);
    const [data, SetData] = useState(null);
    const discolosure = useDisclosure();
    const [numToProcess, SetnumToProcess] = useState(99999999999);

    const onClose = () => setIsOpen(false);

    useEffect(() => {
        const json = async () => {
            const tokens = await fetch('/api/routes/cli-get');
            const tok_obj = await tokens.json();
            SetData(tok_obj);
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
                if (edit) {
                    alert(JSON.stringify(data.items[numToProcess]));
                    window.location.reload();
                } else {
                    const DeleteTok = async () => {
                        const res = await fetch('/api/routes/cli-delete', {
                            method: 'POST',
                            body: JSON.stringify(data.items[numToProcess])
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
                    DeleteTok();
                }
            }
        }
    }, [isOpen]);

    if (typeof window !== 'undefined' && loading) return null;

    if (!session) {
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <Flex padding="5%" justifyContent="center">
                    <Loading />
                </Flex>
            </Layout>
        );
    }

    return (
        <>
            <SEO
                title="Tokens"
                url="https://dagpi.xyz/tokens"
                description="Manage your Dagpi admin tokens here."
            />
            <CreateTokenModal
                user={session.user.id}
                isOpen={discolosure.isOpen}
                onClose={discolosure.onClose}
                onOpen={discolosure.onOpen}
            />
            <AlertWindow
                isOpen={isOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                isSuccess={edit}
                setdes={setDes}
            />
            <Layout>
                <Box padding="5%">
                    <Flex>
                        <Box width={{ base: '50%', md: '75%' }}>
                            <Heading>Tokens</Heading>
                            <chakra.p>
                                These are admin tokens. Keep these safe. Use these tokens to
                                programatically control dagpi.
                            </chakra.p>
                        </Box>
                        {big && <Spacer />}
                        <Button
                            onClick={discolosure.onOpen}
                            colorScheme="blue"
                            leftIcon={<Icon as={GrAdd} />}>
                            Create Token
                        </Button>
                    </Flex>
                    <Divider mt={10} mb={7} />
                    {cli_redirect.cli_redirect && (
                        <Alert status="info">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Information</AlertTitle>
                                <AlertDescription>
                                    Looks&apos;s like you&apos;ve been brought here by the cli.
                                    Create a token, delete edit and view them and more. When you
                                    want to export your token to the CLI click on a button that
                                    looks like this for your corresponding token.
                                    <Button
                                        onClick={() =>
                                            alert('For the matching token, not this one :)')
                                        }
                                        variant="solid"
                                        colorScheme="pink"
                                        size="sm">
                                        <Icon as={BsFillTerminalFill} />
                                    </Button>
                                </AlertDescription>
                            </Box>
                        </Alert>
                    )}
                    <Table
                        SetnumToProcess={SetnumToProcess}
                        items={data.items}
                        setIsOpen={setIsOpen}
                        setEdit={setEdit}
                        cli_button={cli_redirect.cli_redirect}
                    />
                    {cli_redirect.cli_redirect
                        ? 'This will result in CLI redirect'
                        : 'Just stay here'}
                </Box>
            </Layout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let q = context.query.cli_redirect;
    console.log(q);
    let redirect: boolean;
    q = q ? q : null;
    if (q === 'true') {
        redirect = true;
    } else {
        redirect = false;
    }
    console.log(q);
    const cli_redirect = {
        cli_redirect: redirect
    };

    return {
        props: {
            cli_redirect
        }
    };
};

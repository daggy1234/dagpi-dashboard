import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    Heading,
    HStack,
    Icon,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import { ReactElement, useState } from 'react';
import { FaRegCreditCard } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';
import {
    IoAnalyticsSharp,
    IoChatboxEllipses,
    IoCodeSlashOutline,
    IoConstructSharp,
    IoGitBranchSharp,
    IoLogoBitcoin,
    IoSearchSharp
} from 'react-icons/io5';

import Layout from '../components/layout';
import SEO from '../components/seo';
import styles from '../styles/paypal.module.scss';

interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
        <Stack py={2} direction={'row'} align={'center'}>
            <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};

function SplitWithImage() {
    return (
        <Container maxW={'5xl'} py={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <Text
                        textTransform={'uppercase'}
                        color={'blue.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('blue.50', 'blue.900')}
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}>
                        Donate to Dagpi
                    </Text>
                    <Heading>Running an api is hard</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        We love running dagpi! But running it is time consuming and expensive.
                        Although premium exists, if you want to support my work please do donate
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 0, md: 6 }}>
                        <Flex direction="column">
                            <Feature
                                icon={
                                    <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
                                }
                                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                                text={'Statistic Collection'}
                            />
                            <Feature
                                icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
                                iconBg={useColorModeValue('green.100', 'green.900')}
                                text={'Server Costs'}
                            />
                            <Feature
                                icon={
                                    <Icon as={IoConstructSharp} color={'purple.500'} w={5} h={5} />
                                }
                                iconBg={useColorModeValue('purple.100', 'purple.900')}
                                text={'Constant Updates'}
                            />
                        </Flex>
                        <Flex direction="column" spacing={4}>
                            <Feature
                                icon={
                                    <Icon
                                        as={IoCodeSlashOutline}
                                        color={'orange.500'}
                                        w={5}
                                        h={5}
                                    />
                                }
                                iconBg={useColorModeValue('orange.100', 'orange.900')}
                                text={'Sdk maintanence'}
                            />
                            <Feature
                                icon={<Icon as={IoGitBranchSharp} color={'pink.500'} w={5} h={5} />}
                                iconBg={useColorModeValue('pink.100', 'pink.900')}
                                text={'Open Sourcing'}
                            />
                            <Feature
                                icon={
                                    <Icon as={IoChatboxEllipses} color={'blue.500'} w={5} h={5} />
                                }
                                iconBg={useColorModeValue('blue.100', 'blue.900')}
                                text={'Chat Support'}
                            />
                        </Flex>
                    </Stack>
                </Stack>
                <Flex>
                    <Image rounded={'md'} alt={'feature image'} src={'/svg/donate.svg'} />
                </Flex>
            </SimpleGrid>
        </Container>
    );
}

export default function Page() {
    const [state, setState] = useState('');
    const [ppa, sppa] = useState(false);
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const CheckoutDonation = async (url: string, amount: number) => {
        alert(`${amount}$ to be donated!`);
        // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB);
        // const response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         amount: amount
        //     })
        // });
        // if (response.status === 401) {
        //     signIn('discord');
        // } else {
        //     const session = await response.json();
        //     console.log(session);
        //     const result = await stripe.redirectToCheckout({
        //         sessionId: session.session
        //     });

        //     if (result.error) {
        //         alert(result.error.message);
        //     }
        // }
    };

    return (
        <Layout>
            <SEO
                title="Donate"
                url="https://dagpi.xyz/donate"
                description="Dagpi Donation dashbaord. Help donate to keep dagpi running smoothly <3"
            />
            <PayPalScriptProvider options={{ 'client-id': 'sb' }}>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Proceed With Payment of ${state}. This is a non refundable donation
                        </ModalHeader>
                        <ModalBody mx="auto">
                            <Box mx="auto" justifySelf="center" justify="center">
                                <Button
                                    leftIcon={<Icon as={FaRegCreditCard} />}
                                    bgGradient="linear(to-r, #a960ee, #90e0ff)"
                                    color="white"
                                    mx="auto"
                                    my={4}
                                    _hover={{ opacity: '0.8' }}
                                    size="lg"
                                    onClick={() =>
                                        CheckoutDonation('/api/routes/donation', parseFloat(state))
                                    }>
                                    Secure Checkout
                                </Button>
                                <Box my={4}>
                                    {ppa ? (
                                        <Button className={styles.paypalButton} isLoading />
                                    ) : (
                                        ''
                                    )}
                                    <PayPalButtons
                                        className={styles.paypalButton}
                                        style={{
                                            shape: 'rect',
                                            layout: 'horizontal',
                                            color: 'gold',
                                            tagline: false
                                        }}
                                        onApprove={async (data, actions) => {
                                            const order = await actions.order.capture();
                                            sppa(false);
                                            if (
                                                order.status == 'COMPLETED' &&
                                                order.intent == 'CAPTURE'
                                            ) {
                                                console.log(order);
                                                console.log(data);
                                                const out = await fetch(
                                                    '/api/routes/donate-paypal',
                                                    {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify(order)
                                                    }
                                                );
                                                console.log(out);
                                                router.push('/success');
                                            } else {
                                                alert('Error');
                                            }
                                        }}
                                        createOrder={(data, actions) => {
                                            sppa(true);
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        description: 'Dagpi Donation',
                                                        amount: {
                                                            currency_code: 'USD',
                                                            value: state
                                                        }
                                                    }
                                                ]
                                            });
                                        }}
                                    />
                                </Box>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <SplitWithImage />
                <Box mx="auto" my={5} py="3rem">
                    <Box
                        mx="auto"
                        bg={useColorModeValue('purple.500', 'purple.700')}
                        color="white"
                        borderRadius="1rem"
                        px="2rem"
                        maxWidth="64rem">
                        <VStack mx="auto" maxWidth="36rem" px={5} py={10}>
                            <Text
                                fontSize="1.125rem"
                                fontWeight="600"
                                color="rgba(255, 255, 255, 0.8)">
                                Help dagpi
                            </Text>
                            <Heading size="xl" fontWeight="800" letterSpacing="-0.025em">
                                Donate to help dagpi continue providing high quality services.
                            </Heading>
                            <form
                                onSubmit={(event) => {
                                    onOpen();
                                    event.preventDefault();
                                }}>
                                <Flex w="100%" py={8}>
                                    <Box position="relative" width="100%" px={2}>
                                        <FormControl id="amount" color="black">
                                            <InputGroup>
                                                <InputLeftAddon bg="#E2E8F0">$</InputLeftAddon>
                                                <Input
                                                    isRequired
                                                    bg="#fff"
                                                    _focus={{
                                                        backgroundColor: '#fff'
                                                    }}
                                                    onChange={(event) => {
                                                        setState(event.target.value);
                                                    }}
                                                    value={state}
                                                    type="number"
                                                    variant="filled"
                                                    max={10}
                                                    min={1}
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    </Box>
                                    <Button
                                        display="inline-flex"
                                        position="relative"
                                        type="submit"
                                        px={10}
                                        colorScheme="yellow">
                                        Donate
                                    </Button>
                                </Flex>
                            </form>
                            <Flex justify="space-between" alignItems="center">
                                <Box mr="0.5rem" fontWeight="600" textAlign="center">
                                    <Icon fontSize="lg" color="yellow" as={HiCheckCircle} /> Premium
                                    Role
                                </Box>
                                <Box ml="0.5rem" fontWeight="600" textAlign="center">
                                    <Icon fontSize="lg" color="yellow" as={HiCheckCircle} />{' '}
                                    Donation {state ? `of $${state}` : ''} Announcement
                                </Box>
                            </Flex>
                        </VStack>
                    </Box>
                </Box>
            </PayPalScriptProvider>
        </Layout>
    );
}

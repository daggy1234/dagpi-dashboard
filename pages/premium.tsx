import {
    Box,
    Button,
    ButtonProps,
    Flex,
    FormControl,
    Heading,
    Icon,
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
    Text,
    useColorModeValue,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import { useState } from 'react';
import React from 'react';
import { BsBarChart, BsBarChartFill } from 'react-icons/bs';
import { FaRegCreditCard } from 'react-icons/fa';
import { GiNetworkBars } from 'react-icons/gi';
import { HiCheckCircle } from 'react-icons/hi';

import Layout from '../components/layout';
import { PricingCard } from '../components/price';
import SEO from '../components/seo';
import styles from '../styles/paypal.module.scss';
const ActionButton = (props: ButtonProps) => (
    <Button colorScheme="purple" size="lg" w="full" fontWeight="extrabold" py="8" {...props} />
);

function Page() {
    const [state, setState] = useState('');
    const [ppa, sppa] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    const CheckoutDonation = async (url: string, amount: number) => {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount
            })
        });
        if (response.status === 401) {
            signIn('discord');
        } else {
            const session = await response.json();
            console.log(session);
            const result = await stripe.redirectToCheckout({
                sessionId: session.session
            });

            if (result.error) {
                alert(result.error.message);
            }
        }
    };
    return (
        <PayPalScriptProvider options={{ 'client-id': 'sb' }}>
            <Layout>
                <SEO
                    title="Premium"
                    description="Dagpi Premium dashbaord. View pricing, billing and deals."
                />
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
                <Box padding="5%" textAlign="center" alignContent="center" alignItems="center">
                    <Heading m={10} size="4xl">
                        A tier for everyone....
                    </Heading>
                    <Box as="section" bg={useColorModeValue('white', 'gray.800')} py="14">
                        <SimpleGrid
                            columns={{ base: 1, lg: 3 }}
                            spacing={{ base: '4', lg: '0' }}
                            maxW="7xl"
                            mx="auto"
                            justifyItems="center"
                            alignItems="center">
                            <PricingCard
                                data={{
                                    price: '$1',
                                    name: 'Base',
                                    features: [
                                        'Premium Role',
                                        'Premium Support',
                                        'Early access',
                                        "Exclusive Beta's"
                                    ]
                                }}
                                icon={BsBarChart}
                                button={
                                    <ActionButton
                                        onClick={() =>
                                            CheckoutDonation('/api/routes/stripe-sub', 1)
                                        }
                                        variant="outline"
                                        borderWidth="2px">
                                        Buy now
                                    </ActionButton>
                                }
                            />
                            <PricingCard
                                zIndex={1}
                                isPopular
                                transform={{ lg: 'scale(1.10)' }}
                                data={{
                                    price: '$2',
                                    name: 'Growth',
                                    features: [
                                        'For apps that need more',
                                        'Api Ratelimit of 90 reqs/s',
                                        'Exclusive api analytics',
                                        'Premium Growth role',
                                        'Premium Support',
                                        'Early access',
                                        "Exclusive Beta's"
                                    ]
                                }}
                                icon={BsBarChartFill}
                                button={
                                    <ActionButton
                                        onClick={() =>
                                            CheckoutDonation('/api/routes/stripe-sub', 1)
                                        }>
                                        Buy now
                                    </ActionButton>
                                }
                            />
                            <PricingCard
                                data={{
                                    price: '$4',
                                    name: 'Power',
                                    features: [
                                        'For apps that need a lot',
                                        'Api Ratelimit of 120 reqs/s',
                                        'Exclusive api analytics',
                                        'Premium Power role',
                                        'Premium Support',
                                        'Early access',
                                        "Exclusive Beta's"
                                    ]
                                }}
                                icon={GiNetworkBars}
                                button={
                                    <ActionButton
                                        onClick={() =>
                                            CheckoutDonation('/api/routes/stripe-sub', 1)
                                        }
                                        variant="outline"
                                        borderWidth="2px">
                                        Buy now
                                    </ActionButton>
                                }
                            />
                        </SimpleGrid>
                    </Box>
                    <Box mx="auto" my={5} py="3rem">
                        <Box
                            mx="auto"
                            bg="purple.500"
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
                                        <Icon fontSize="lg" color="yellow" as={HiCheckCircle} />{' '}
                                        Premium Role
                                    </Box>
                                    <Box ml="0.5rem" fontWeight="600" textAlign="center">
                                        <Icon fontSize="lg" color="yellow" as={HiCheckCircle} />{' '}
                                        Donation {state ? `of $${state}` : ''} Announcement
                                    </Box>
                                </Flex>
                            </VStack>
                        </Box>
                    </Box>
                </Box>
            </Layout>
        </PayPalScriptProvider>
    );
}

export default function Temp() {
    return (
        <Layout>
            <SEO
                title="Premium"
                description="Dagpi Premium dashbaord. View pricing, billing and deals."
            />
            <Box padding="5%" textAlign="center" alignContent="center" alignItems="center">
                <Heading>Coming Soon</Heading>
            </Box>
        </Layout>
    );
}

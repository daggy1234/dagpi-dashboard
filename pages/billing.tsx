/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StatLabelProps, StatNumberProps, StatProps } from '@chakra-ui/react';
import {
    Box,
    Button,
    chakra,
    Divider,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Spacer,
    Stack,
    Stat as ChakraStat,
    StatLabel as ChakraStatLabel,
    StatNumber as ChakraStatNumber,
    Text,
    useBreakpointValue,
    useColorModeValue,
    VStack,
    Spinner
} from '@chakra-ui/react';
import { formatDistanceToNow, subDays, format } from 'date-fns';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { BsArrowLeftShort, BsFillBriefcaseFill } from 'react-icons/bs';
import { FaCcStripe, FaPaypal } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';

import AccessDenied from '../components/access-denied';
import FancyCard from '../components/card-box';
import Layout from '../components/layout';
import Loading from '../components/loading';
import SEO from '../components/seo';
import CODES from '../lib/curr';

interface Donation {
    usdp: number;
    created_at: string;
}

interface TableProps {
    items: Donation[];
}

export const StatLabel = (props: StatLabelProps) => (
    <ChakraStatLabel
        fontWeight="medium"
        isTruncated
        color={useColorModeValue('gray.500', 'gray.400')}
        {...props}
    />
);

export const StatNumber = (props: StatNumberProps) => (
    <ChakraStatNumber
        fontSize="3xl"
        fontWeight="medium"
        color={useColorModeValue('gray.900', 'white')}
        {...props}
    />
);

export const Stat = (props: StatProps) => (
    <ChakraStat
        px={{ base: 4, sm: 6 }}
        py="5"
        bg={useColorModeValue('gray.100', 'gray.700')}
        rounded="lg"
        {...props}
    />
);

const Table: React.FC<TableProps> = (props) => {
    const { items: data } = props;
    const router = useRouter();
    return (
        <Flex w="full" p={{ base: 5, md: 50 }} alignItems="center" justifyContent="center">
            <Stack
                direction={{ base: 'column' }}
                w="full"
                spacing={{ base: 6, md: 0 }}
                borderStyle="solid"
                borderWidth={data.length === 0 ? '0px' : { base: '0px', md: '1px' }}
                borderColor={useColorModeValue('gray.200', 'rgba(255, 255, 255, 0.16)')}
                bg={{ sm: useColorModeValue('white', 'gray.800') }}>
                {data.length === 0 ? (
                    <VStack m={3} textAlign="center" spacing={3}>
                        <Heading fontSize={{ base: 'lg', md: '2xl' }}>
                            You haven&apos;t purchased premium
                        </Heading>
                        <Text>Check out premium!</Text>
                        <Button
                            colorScheme="purple"
                            size="lg"
                            onClick={() => router.push('/donate')}>
                            Donate
                        </Button>
                    </VStack>
                ) : (
                    data.map((donation, pid) => {
                        return (
                            <Flex
                                key={donation.id}
                                direction={{ base: 'row', sm: 'column' }}
                                bg={useColorModeValue('white', 'gray.800')}>
                                {useBreakpointValue({ base: true, sm: pid === 0 }) && (
                                    <SimpleGrid
                                        spacingY={3}
                                        borderStyle="solid"
                                        borderBottom="1px"
                                        borderRight={{ base: '1px', md: '0px' }}
                                        borderLeft={{ base: '1px', md: '0px' }}
                                        borderTop={{ base: '1px', md: '0px' }}
                                        borderColor={useColorModeValue('gray.200', 'gray.700')}
                                        columns={{ base: 1, sm: 5 }}
                                        w={{ base: 100, sm: 'full' }}
                                        color={useColorModeValue('gray.500', 'gray.400')}
                                        bg={useColorModeValue('gray.50', 'inherit')}
                                        py={{ base: 1, sm: 4 }}
                                        px={{ base: 2, sm: 10 }}>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="sm">
                                            Id
                                        </Text>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="sm">
                                            Donated
                                        </Text>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="sm">
                                            Amount
                                        </Text>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="sm">
                                            Provider
                                        </Text>
                                        <Text
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="sm">
                                            Reciept
                                        </Text>
                                    </SimpleGrid>
                                )}
                                <SimpleGrid
                                    spacingY={{ base: 3, md: 0 }}
                                    columns={{ base: 1, sm: 5 }}
                                    borderStyle="solid"
                                    borderBottom="1px"
                                    borderRight={{ base: '1px', md: '0px' }}
                                    borderTop={{ base: '1px', md: '0px' }}
                                    color={useColorModeValue(
                                        'gray.800',
                                        'rgba(255, 255, 255, 0.92)'
                                    )}
                                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                                    py={4}
                                    px={10}>
                                    <span>
                                        <Text>{donation.id}</Text>
                                    </span>

                                    <span>
                                        <Text>
                                            {formatDistanceToNow(Date.parse(donation.created_at))}{' '}
                                            ago
                                        </Text>
                                    </span>
                                    <span>
                                        <Text>
                                            {
                                                CODES[
                                                    donation.currency.toUpperCase() as keyof typeof CODES
                                                ]
                                            }
                                            {donation.amount}.00
                                        </Text>
                                    </span>
                                    <span>
                                        {donation.provider !== 'stripe' ? (
                                            <Button
                                                fontWeight="bold"
                                                leftIcon={<Icon as={FaPaypal} color="#253b80" />}
                                                bg="#ffc439"
                                                _active={{}}
                                                _focus={{}}
                                                _hover={{}}>
                                                <chakra.span color="#222d65">Pay</chakra.span>
                                                <chakra.span color="#169bd7">Pal</chakra.span>
                                            </Button>
                                        ) : (
                                            <Button
                                                fontWeight="bold"
                                                color="white"
                                                leftIcon={<Icon as={FaCcStripe} />}
                                                bgGradient="linear(to-r, #a960ee, #90e0ff)"
                                                _active={{}}
                                                _focus={{}}
                                                _hover={{}}>
                                                Stripe
                                            </Button>
                                        )}
                                    </span>
                                    <span>
                                        <Button
                                            colorScheme="green"
                                            rightIcon={<Icon as={RiBillFill} />}
                                            onClick={() =>
                                                router.push(
                                                    donation.provider === 'stripe'
                                                        ? donation.receipt?.toString() || ''
                                                        : `https://www.paypal.com/myaccount/transactions/print-details/${donation.charge_id}`
                                                )
                                            }>
                                            Reciept
                                        </Button>
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

function makeDateFancy(date: Date): string {
    return `${format(date, 'eee, PPPpp')} (${formatDistanceToNow(date, { addSuffix: true })})`;
}

const GenPortal = async (customer: any) => {
    // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB);
    //

    if (!customer) {
        alert('no customer :(');
    } else {
        const response = await fetch('/api/payments/stripe-customer-portal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: customer.customer_id
            })
        });
        const session = await response.json();
        const { url } = session;
        window.location.href = url;
    }
};

interface Subscription {
    customer: string;
    subscription: {
        subscription_id: string;
        subscription_start: string;
        subscription_end: string;
        active: boolean;
        cancelled: boolean;
        ratelimit: number;
        price_id: string;
    };
}

interface Price {
    id: string;
    unit_amount: number;
    product: {
        name: string;
        description: string;
    };
    price: {
        id: string;
        active: boolean;
        type: string;
        unit_amount: number;
        currency: string;
    };
}

interface Donation {
    id: number;
    client_id: string;
    charge_id: string;
    amount: number;
    currency: string;
    provider: string;
    created_at: string;
    receipt?: string;
}
interface Donations {
    items: Donation[];
}

export default function Page() {
    const big = useBreakpointValue({ base: false, md: true });
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const router = useRouter();
    const [data, SetData] = useState<Donations | null>(null);
    const [subscription, SetSubscription] = useState<Subscription | null>(null);
    const [price, priceData] = useState<Price | null>(null);

    useEffect(() => {
        const json = async () => {
            const tokens = await fetch('/api/payments/get-donations');
            const tok_obj = await tokens.json();
            SetData(tok_obj);
        };
        const subscription_data = async () => {
            const tokens = await fetch('/api/payments/get-subscription');
            const tok_obj = await tokens.json();
            SetSubscription(tok_obj);
            if (tok_obj.subscription) {
                const product = await fetch('/api/payments/fetch-price', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: tok_obj.subscription.price_id
                    })
                });
                const prod_obj = await product.json();
                priceData(prod_obj);
            }
        };

        json();
        subscription_data();
    }, [session]);

    if (loading) return <Spinner />;

    if (!session) {
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        );
    }

    if (!data || !subscription) {
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
            <SEO title="Billing" url="https://dagpi.xyz/tokens" description="Billing Information" />
            <Layout>
                <Box padding="5%">
                    <Flex>
                        <Box width={{ base: '50%', md: '75%' }}>
                            <Heading>Billing</Heading>
                        </Box>
                        {big && <Spacer />}
                        <Button
                            onClick={() => router.push('/dashboard')}
                            colorScheme="purple"
                            leftIcon={<Icon as={BsArrowLeftShort} />}>
                            Dashboard
                        </Button>
                    </Flex>
                    <Divider mt={10} mb={7} />
                    <Box rounded="md" p={6} bg={useColorModeValue('gray.100', 'inherit')}>
                        <Heading ml={{ base: 0, md: 12 }}>Premium</Heading>
                        {subscription.customer && subscription.subscription && price ? (
                            <Flex
                                direction={{ base: 'column', md: 'row' }}
                                py={{ base: 0, md: 10 }}
                                px={{ base: 0, md: 20 }}>
                                <Box
                                    w={{ base: '100%', md: '35%' }}
                                    bg={useColorModeValue('white', 'gray.800')}
                                    alignItems="center"
                                    rounded="lg"
                                    overflow="hidden"
                                    my={3}>
                                    <Box py={6} px={6}>
                                        <chakra.h1
                                            fontSize="xl"
                                            fontWeight="bold"
                                            color={useColorModeValue('gray.800', 'white')}>
                                            {price.product.name}
                                        </chakra.h1>

                                        <chakra.p
                                            py={2}
                                            color={useColorModeValue('gray.700', 'gray.400')}>
                                            {price.product.description}
                                        </chakra.p>

                                        <Flex
                                            alignItems="center"
                                            mt={4}
                                            color={useColorModeValue('gray.700', 'gray.200')}>
                                            <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

                                            <chakra.h1 px={2} fontSize="md">
                                                {subscription.subscription.ratelimit} req/s
                                            </chakra.h1>
                                        </Flex>

                                        <Flex
                                            alignItems="center"
                                            mt={4}
                                            color={useColorModeValue('gray.700', 'gray.200')}>
                                            <Icon as={RiBillFill} h={6} w={6} mr={2} />

                                            <chakra.h1 px={2} fontSize="medium">
                                                {`${price.price.unit_amount / 100}.00$ per month`}
                                            </chakra.h1>
                                        </Flex>
                                        <Button
                                            m="5%"
                                            size="lg"
                                            onClick={() => GenPortal(subscription.customer)}
                                            colorScheme="purple">
                                            Manage Subscription
                                        </Button>
                                    </Box>
                                </Box>
                                <FancyCard
                                    title="Subscription Info"
                                    properties={[
                                        [
                                            'Subscription Id',
                                            subscription.subscription.subscription_id
                                        ],
                                        [
                                            'Subscribed from',
                                            makeDateFancy(
                                                new Date(
                                                    subscription.subscription.subscription_start
                                                )
                                            )
                                        ],
                                        [
                                            'Billing End',
                                            makeDateFancy(
                                                subDays(
                                                    new Date(
                                                        subscription.subscription.subscription_end
                                                    ),
                                                    2
                                                )
                                            )
                                        ],
                                        [
                                            'Subscription End',
                                            makeDateFancy(
                                                new Date(subscription.subscription.subscription_end)
                                            )
                                        ],
                                        [
                                            'Status',
                                            subscription.subscription.active
                                                ? 'Active'
                                                : subscription.subscription.cancelled
                                                  ? 'Cancelled'
                                                  : 'Inactive'
                                        ]
                                    ]}
                                />
                            </Flex>
                        ) : (
                            <VStack m={5} textAlign="center">
                                <Heading fontSize={{ base: 'lg', md: '2xl' }}>
                                    You Have made no donations
                                </Heading>
                                <Text>Click on the button below to donate</Text>
                                <Button
                                    colorScheme="purple"
                                    size="lg"
                                    onClick={() => router.push('/premium')}>
                                    Buy Premium
                                </Button>
                            </VStack>
                        )}
                    </Box>
                    <Box px={{ base: 1, md: 8 }}>
                        <Divider mt={10} mb={7} />
                        <Flex>
                            <Heading>Donations</Heading>
                            {big && <Spacer />}
                            <Button
                                onClick={() => router.push('/donate')}
                                colorScheme="purple"
                                leftIcon={<Icon as={BsArrowLeftShort} />}>
                                Donate
                            </Button>
                        </Flex>
                        {data.items.length !== 0 && (
                            <Box as="section" p="10">
                                <Box maxW="7xl" mx="auto" px={{ base: '1', md: '12' }}>
                                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
                                        <Stat>
                                            <StatLabel>Total Donations</StatLabel>
                                            <StatNumber>{data.items.length}</StatNumber>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Total Amount</StatLabel>
                                            <StatNumber>
                                                $
                                                {data.items
                                                    .reduce((sum, donation) => {
                                                        return sum + donation.usdp;
                                                    }, 0)
                                                    .toFixed(2)}
                                            </StatNumber>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Most Recent Donation</StatLabel>
                                            <StatNumber>
                                                {new Date(data.items[0].created_at).toDateString()}
                                            </StatNumber>
                                        </Stat>
                                    </SimpleGrid>
                                </Box>
                            </Box>
                        )}
                        <Table items={data.items} />
                    </Box>
                </Box>
            </Layout>
        </>
    );
}

// import ComingSoon from '../components/coming-soon';
// import Layout from '../components/layout';

// export default function Page() {
//     return(
//         <Layout>
//             <ComingSoon />
//         </Layout>
//         )
// }

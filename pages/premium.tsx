/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ButtonProps } from '@chakra-ui/react';
import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { BsBarChart, BsBarChartFill } from 'react-icons/bs';
import { FcBullish, FcDoughnutChart, FcFlashOn, FcSalesPerformance } from 'react-icons/fc';
import { GiNetworkBars } from 'react-icons/gi';

import Layout from '../components/layout';
import { PricingCard } from '../components/price';
import SEO from '../components/seo';

const ActionButton = (props: ButtonProps) => (
    <Button colorScheme="purple" size="lg" w="full" fontWeight="extrabold" py="8" {...props} />
);

interface FeatureProps {
    title: string;
    children: React.ReactNode;
    icon: React.ReactElement;
}

export const Feature = (props: FeatureProps) => {
    const { title, children, icon } = props;
    return (
        <Stack spacing={{ base: '0', md: '6' }} direction="row">
            <Box fontSize="6xl">{icon}</Box>
            <Stack>
                <Text color="white" fontWeight="extrabold" fontSize="xl">
                    {title}
                </Text>
                <Box textAlign="center" color={useColorModeValue('gray.200', 'gray.400')}>
                    {children}
                </Box>
            </Stack>
        </Stack>
    );
};

export default function Page() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [subscription, SetSubscription] = useState(null);
    const router = useRouter();

    const CheckoutDonation = async (url: string, amount: number) => {
        // alert(`Item with id: ${amount} to be checked out!`);
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB || '');
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount
            })
        });
        console.log(response);
        if (response.status === 401) {
            signIn('discord');
        } else {
            if (!stripe) {
                return alert('error creating stripe object, please try again later or contact us');
            }
            const sessionResp = await response.json();
            console.log(sessionResp);
            const result = await stripe.redirectToCheckout({
                sessionId: sessionResp.session
            });

            if (result.error) {
                alert(result.error.message);
            }
        }
    };

    function isThereNoSub(inp: any): boolean {
        if (!inp) {
            return true;
        }
        if (inp.error) {
            return true;
        }
        return inp.data === false;
    }

    useEffect(() => {
        const subscription_data = async () => {
            const tokens = await fetch('/api/payments/get-subscription');
            const tok_obj = await tokens.json();
            console.log(tok_obj);
            SetSubscription(tok_obj);
        };
        subscription_data();
    }, [session]);

    if (loading) return <Spinner />;

    return (
        <Layout>
            <SEO
                title="Premium"
                url="https://dagpi.xyz/premium"
                description="Dagpi Premium . View pricing, billing and deals."
            />
            <Box padding="5%" textAlign="center" alignContent="center" alignItems="center">
                {!session || isThereNoSub(subscription) ? (
                    <>
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
                                            'Api Ratelimit of 60 reqs/m',
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
                                                CheckoutDonation('/api/payments/stripe-sub', 0)
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
                                    transform={{ lg: 'scale(1.05)' }}
                                    data={{
                                        price: '$3',
                                        name: 'Growth',
                                        features: [
                                            'For apps that need more',
                                            'Api Ratelimit of 90 reqs/m',
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
                                                CheckoutDonation('/api/payments/stripe-sub', 1)
                                            }>
                                            Buy now
                                        </ActionButton>
                                    }
                                />
                                <PricingCard
                                    data={{
                                        price: '$5',
                                        name: 'Power',
                                        features: [
                                            'For apps that need a lot',
                                            'Api Ratelimit of 120 reqs/m',
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
                                                CheckoutDonation('/api/payments/stripe-sub', 2)
                                            }
                                            variant="outline"
                                            borderWidth="2px">
                                            Buy now
                                        </ActionButton>
                                    }
                                />
                            </SimpleGrid>
                        </Box>
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            bg={useColorModeValue('purple.500', 'gray.700')}
                            px={8}
                            rounded="lg"
                            py={12}
                            mx="auto">
                            <Box
                                w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
                                mx="auto"
                                textAlign="left"
                                py={12}
                                pr={{ md: 20 }}>
                                <chakra.h2
                                    fontSize={{ base: '3xl', sm: '4xl' }}
                                    fontWeight="extrabold"
                                    lineHeight="shorter"
                                    color={useColorModeValue('white', 'gray.100')}
                                    mb={6}>
                                    <chakra.span display="block">Not convinced?</chakra.span>
                                    <chakra.span
                                        display="block"
                                        color={useColorModeValue('white', 'purple.200')}>
                                        Try dagpi free tier!
                                    </chakra.span>
                                </chakra.h2>
                                <chakra.p
                                    mb={6}
                                    fontSize="lg"
                                    color={useColorModeValue('gray.200', 'gray.300')}>
                                    Completely free with no credit card required, start using dagpi
                                    with some great features! When you&apos;re ready you can always
                                    update!
                                </chakra.p>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    mb={{ base: 4, md: 8 }}
                                    spacing={2}
                                />
                            </Box>
                            <Box
                                as="section"
                                maxW="5xl"
                                mx="auto"
                                py="12"
                                px={{ base: '0', md: '8' }}>
                                <SimpleGrid
                                    columns={{ base: 1, md: 2 }}
                                    spacingX="10"
                                    spacingY={{ base: '8', md: '14' }}>
                                    <Feature title="Performant and easy api" icon={<FcFlashOn />}>
                                        Enjoy the ease of dagpi! Use any of our amazing sdk&apos;s
                                        to easily inetgrate
                                    </Feature>
                                    <Feature title="Starter Limits of 45r/m" icon={<FcBullish />}>
                                        At 45 api requests per minute, dagpi gives you breathing
                                        room
                                    </Feature>
                                    <Feature
                                        title="Incredible statistics"
                                        icon={<FcDoughnutChart />}>
                                        Enjoy amazing free user statistics at no additional cost!
                                        Right from the dashboard
                                    </Feature>
                                    <Feature
                                        title="0$, no credit card"
                                        icon={<FcSalesPerformance />}>
                                        Enjoy free tier at an incredibly low cost! No credit card
                                        required
                                    </Feature>
                                </SimpleGrid>
                            </Box>
                        </Flex>
                    </>
                ) : (
                    <Box textAlign="center">
                        <Heading my={10} size="lg">
                            You aldready have a subscription!
                        </Heading>

                        <Button
                            size="lg"
                            colorScheme="purple"
                            variant="outline"
                            onClick={() => {
                                router.push('/billing');
                            }}>
                            Billing for Subscription
                        </Button>
                    </Box>
                )}
            </Box>
        </Layout>
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

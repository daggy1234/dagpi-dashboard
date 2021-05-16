import { Box, Button, ButtonProps, Heading, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { signIn } from 'next-auth/client';
import React from 'react';
import { BsBarChart, BsBarChartFill } from 'react-icons/bs';
import { GiNetworkBars } from 'react-icons/gi';

import Layout from '../components/layout';
import { PricingCard } from '../components/price';
import SEO from '../components/seo';
const ActionButton = (props: ButtonProps) => (
    <Button colorScheme="purple" size="lg" w="full" fontWeight="extrabold" py="8" {...props} />
);

export default function Page() {
    const CheckoutDonation = async (url: string, amount: number) => {
        alert(`Item with id: ${amount} to be checked out!`);
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
                title="Premium"
                description="Dagpi Premium dashbaord. View pricing, billing and deals."
            />
            <Box padding="5%" textAlign="center" alignContent="center" alignItems="center">
                <Heading m={10} size="3xl">
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
                                    onClick={() => CheckoutDonation('/api/routes/stripe-sub', 0)}
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
                                    onClick={() => CheckoutDonation('/api/routes/stripe-sub', 1)}>
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
                                    onClick={() => CheckoutDonation('/api/routes/stripe-sub', 2)}
                                    variant="outline"
                                    borderWidth="2px">
                                    Buy now
                                </ActionButton>
                            }
                        />
                    </SimpleGrid>
                </Box>
            </Box>
        </Layout>
    );
}

function Temp() {
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

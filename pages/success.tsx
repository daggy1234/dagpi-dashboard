import { Button, Container, Heading, Icon, Text } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';

import Layout from '../components/layout';
export default function Page({ id }) {
    const BilUrl = async () => {
        // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB);
        const response = await fetch('/api/routes/billing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id.id
            })
        });
        const session = await response.json();
        console.log(session);
        const url = session.url;
        window.location.href = url;
        console.log(url);
    };
    console.log(id);
    return (
        <Layout>
            <Container my="5%" mx="auto" textAlign="center" justifySelf="center">
                <Heading size="2xl" m="2%">
                    <Icon color="green" as={HiCheckCircle} /> <br />
                    Thank you for your payment!
                </Heading>
                <Text m="2%">Your support goes a long way!</Text>
                <Link href="/dashboard">
                    <Button m="2%" size="lg" colorScheme="green">
                        Dashboard
                    </Button>
                </Link>
                {id.id && (
                    <Button m="2%" size="lg" onClick={() => BilUrl()} colorScheme="blue">
                        Manage Billing
                    </Button>
                )}
            </Container>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let q = context.query.session_id;
    q = q ? q : null;
    const id = {
        id: q
    };

    return {
        props: {
            id
        }
    };
};

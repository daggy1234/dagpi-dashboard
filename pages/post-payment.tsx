import { Button, Container, Heading, Icon, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';
import { RiErrorWarningFill } from 'react-icons/ri';
import { TiCancel } from 'react-icons/ti';

import Layout from '../components/layout';
import SEO from '../components/seo';

export default function Page({ props }) {
    const BilUrl = async () => {
        // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB);
        const response = await fetch('/api/payments/billing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.id
            })
        });
        const session = await response.json();
        const url = session.url;
        window.location.href = url;
    };
    console.log(props);
    return (
        <Layout>
            <SEO
                title={`Payment ${props.status}`}
                description={`Dagpi Payment currently ${props.status}`}
                url="https://dagpi.xyz/dashboard"
            />
            <Container my="5%" maxW={null} mx="auto" textAlign="center" justifySelf="center">
                {props.status == 'success' ? (
                    <>
                        <Icon as={HiCheckCircle} color="green" fontSize="10em" />
                        <Heading size="2xl" m="2%">
                            Thank you for your payment!
                        </Heading>
                        <Text m="2%">Your support goes a long way!</Text>
                    </>
                ) : props.status === 'cancel' ? (
                    <>
                        <Heading size="2xl" m="2%">
                            <Icon color="yellow" as={TiCancel} fontSize="5em" /> <br />
                            Your payment was cancelled
                        </Heading>
                        <Text m="2%">
                            That&apos;s okay. Whenever you would like to donate again, just visit
                            the donate page.
                        </Text>
                    </>
                ) : (
                    <>
                        <Heading size="2xl" m="2%">
                            <Icon color="red" as={RiErrorWarningFill} fontSize="5em" /> <br />
                            An Error Occured
                        </Heading>
                        <Text m="2%">
                            Something happened on our end. Do report it on our Discord, especially
                            if you were debited.
                        </Text>
                    </>
                )}

                <Link href="/dashboard">
                    <Button m="2%" size="lg" colorScheme="purple">
                        Dashboard
                    </Button>
                </Link>
                {props.id && (
                    <Button m="2%" size="lg" onClick={() => BilUrl()} colorScheme="blue">
                        Manage Billing
                    </Button>
                )}
            </Container>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const status = context.query.status ? context.query.status : '';
    let q = context.query.session_id;
    q = q ? q : null;
    const props = {
        id: q,
        status: status
    };
    if (!['success', 'cancel', 'error'].includes(status.toString())) {
        return {
            redirect: {
                destination: '/'
            },
            props: {
                props
            }
        };
    }
    return {
        props: {
            props
        }
    };
};

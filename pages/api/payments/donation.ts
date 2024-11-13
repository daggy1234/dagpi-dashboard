/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY || 'OOPS', {
    apiVersion: '2024-04-10',
    appInfo: {
        name: 'dagpi',
        url: 'https://dagpi.xyz'
    }
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const bod = req.body;
    const nreq = req;
    nreq.method = 'GET';
    nreq.body = null;
    // eslint-disable-next-line prettier/prettier
    // @ts-expect-error the typing is not returning right sessioN???
    const session: Session | null = await getSession({ req: nreq });
    const { amount, currency } = bod;
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Not Posted' });
    }
    if (!session) {
        return res.status(401).send({ message: 'Not signed in' });
    }

    const customers = await stripe.customers.list({
        email: session?.user?.email || '',
        limit: 1
    });

    const customer = {};
    if (customers.data.length === 0) {
        // @ts-ignore
        customer.customer_email = session.user.email;
    } else {
        // @ts-ignore
        customer.customer = customers.data[0].id;
    }
    const pi = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        submit_type: 'donate',
        payment_intent_data: {
            metadata: {
                ...session.user,
                client_id: session.client_id,
                donate: 'true'
            }
        },
        line_items: [
            {
                // name: 'Dagpi Donation',

                // currency: currency,
                // images: ['https://dagpi.xyz/dagpi.png'],
                // price: Math.floor(amount * 100),
                price_data: {
                    unit_amount: Math.floor(amount * 100),
                    currency,
                    product_data: {
                        name: 'Dagpi Donation',
                        description:
                            'A donation to help Dagpi continue to run and provide high quality services. This is a one time payment.',
                        images: ['https://dagpi.xyz/dagpi.png']
                    }
                },
                quantity: 1
            }
        ],

        success_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/post-payment?status=success&session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/post-payment?status=cancel`,
        ...customer
    });
    return res.status(200).send({ session: pi.id });
    // res.send({
    //     message: 'soon'
    // });
};

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const { amount, currency } = req.body;
    if (req.method != 'POST') {
        return res.status(405).send({ message: 'Not Posted' });
    }
    if (!session) {
        return res.status(401).send({ message: 'Not signed in' });
    }
    const customers = await stripe.customers.list({
        email: session.user.email,
        limit: 1
    });
    const customer = {};
    if (customers['data'].length === 0) {
        customer['customer_email'] = session.user.email;
    } else {
        customer['customer'] = customers['data'][0].id;
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
                name: 'Dagpi Donation',
                description:
                    'A donation to help Dagpi continue to run and provide high quality services. This is a one time payment.',
                currency: currency,
                images: ['https://dagpi.xyz/dagpi.png'],
                amount: Math.floor(amount * 100),
                quantity: 1
            }
        ],

        success_url: `${process.env.NEXTAUTH_URL}/post-payment?status=success&session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${process.env.NEXTAUTH_URL}/post-payment?status=cancel`,
        ...customer
    });
    res.status(200).send({ session: pi.id });
    // res.send({
    //     message: 'soon'
    // });
};

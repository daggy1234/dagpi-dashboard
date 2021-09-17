import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const { amount } = req.body;
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
    console.log(customers);
    const sp = [
        process.env.BASE_PREMIUM_PROD,
        process.env.MID_PREMIUM_PROD,
        process.env.HIG_PREMIUM_PROD
    ][amount];

    const rl = [60, 90, 120];

    console.log(sp);
    const customer = {};
    if (customers['data'].length === 0) {
        customer['customer_email'] = session.user.email;
    } else {
        customer['customer'] = customers['data'][0].id;
    }
    const pi = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        subscription_data: {
            metadata: {
                ...session.user,
                client_id: session.client_id,
                donate: 'false',
                plan: amount + 1,
                rl: rl[amount]
            }
        },
        line_items: [
            {
                quantity: 1,
                price: sp
            }
        ],

        success_url: `${process.env.NEXTAUTH_URL}/post-payment?session_id={CHECKOUT_SESSION_ID}&=status=success`,

        cancel_url: `${process.env.NEXTAUTH_URL}/post-payment?status=cancel`,
        ...customer
    });
    res.status(200).send({ session: pi.id });
    // res.send({
    //     message: 'soon'
    // });
};

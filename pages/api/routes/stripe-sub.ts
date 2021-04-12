import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
// import Stripe from 'stripe';

// const stripe = Stripe(process.env.STRIPE_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({ req });
    // const { amount } = req.body;
    // if (req.method != 'POST') {
    //     return res.status(405).send({ message: 'Not Posted' });
    // }
    // if (!session) {
    //     return res.status(401).send({ message: 'Not signed in' });
    // }
    // const customers = await stripe.customers.list({
    //     email: session.user.email,
    //     limit: 1
    // });
    // console.log(customers);
    // const sp = [
    //     'price_1IGh3zBUcmOIcKdwXadqVAhd',
    //     'price_1IMud0BUcmOIcKdwN3GnzSHV',
    //     'price_1IMuf3BUcmOIcKdwepFmFdXg'
    // ][amount];
    // console.log(sp);
    // const customer = {};
    // if (customers['data'].length === 0) {
    //     customer['customer_email'] = session.user.email;
    // } else {
    //     customer['customer'] = customers['data'][0].id;
    // }
    // const pi = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     mode: 'subscription',
    //     line_items: [
    //         {
    //             quantity: 1,
    //             price: sp
    //         }
    //     ],

    //     success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,

    //     cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
    //     ...customer
    // });
    // res.status(200).send({ session: pi.id });
    res.send({
        message: 'soon'
    });
};

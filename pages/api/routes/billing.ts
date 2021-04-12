import { NextApiRequest, NextApiResponse } from 'next';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(405).send({ message: 'Not Posted' });
    }
    const { id } = req.body;
    // const session = await stripe.checkout.sessions.retrieve(id);
    // const portalsession = await stripe.billingPortal.sessions.create({
    //     customer: session.customer,
    //     return_url: `${process.env.NEXTAUTH_URL}/dashboard`
    // });
    // res.send({
    //     url: portalsession.url
    // });
    res.send({
        message: 'soon'
    });
};

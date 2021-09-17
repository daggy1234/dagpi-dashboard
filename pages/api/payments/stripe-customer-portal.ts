import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(405).send({ message: 'Not Posted' });
    }
    const { id } = req.body;
    const portalsession = await stripe.billingPortal.sessions.create({
        customer: id,
        return_url: `${process.env.NEXTAUTH_URL}/billing`
    });
    res.send({
        url: portalsession.url
    });
};

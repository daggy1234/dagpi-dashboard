import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY || 'A', {
    apiVersion: '2024-04-10'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Not Posted' });
    }
    const { id } = req.body;
    const portalsession = await stripe.billingPortal.sessions.create({
        customer: id,
        return_url: `${process.env.NEXTAUTH_URL}/billing`
    });
    return res.send({
        url: portalsession.url
    });
};

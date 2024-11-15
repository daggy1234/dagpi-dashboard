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
    const session = await stripe.checkout.sessions.retrieve(id);
    if (!session || session.customer === null) {
        return res.status(404).send({ message: 'Not found' });
    }
    const portalsession = await stripe.billingPortal.sessions.create({
        customer: session.customer.toString(),
        return_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard`
    });
    return res.send({
        url: portalsession.url
    });
};

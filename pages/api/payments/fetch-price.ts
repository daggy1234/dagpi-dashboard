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
    const price = await stripe.prices.retrieve(id);
    const prod_id = price.product.toString();
    const product = await stripe.products.retrieve(prod_id);
    res.send({
        price: price,
        product: product
    });
};

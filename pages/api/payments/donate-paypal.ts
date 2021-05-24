import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const payload = {
        client_id: session.client_id,
        amount: parseInt(req.body.purchase_units[0].amount.value),
        customer_id: req.body.payer.payer_id,
        capture_id: req.body.purchase_units[0].payments.captures[0].id,
        email: session.user.email
    }
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/payments/paypal`, {
        method: 'POST',
        headers: {
            Authorization: process.env.TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    res.send({status: resp.status})
   
    // Post this payload to Central Server
};

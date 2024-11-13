import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const bod = req.body;
    const nreq = req;
    nreq.method = 'GET';
    nreq.body = null;
    // eslint-disable-next-line prettier/prettier
    // @ts-expect-error the typing is not returning right sessioN???
    const session: Session | null = await getSession({ req: nreq });
    if (!session) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const payload = {
        client_id: session.client_id,
        amount: parseInt(bod.purchase_units[0].amount.value, 10),
        currency: bod.purchase_units[0].amount.currency_code,
        customer_id: bod.payer.payer_id,
        capture_id: bod.purchase_units[0].payments.captures[0].id,
        email: session.user.email
    };
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/payments/paypal`, {
        method: 'POST',
        headers: {
            Authorization: process.env.TOKEN || 'A',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    return res.send({ status: resp.status });

    // Post this payload to Central Server
};

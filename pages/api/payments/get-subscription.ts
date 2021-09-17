import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.send(JSON.stringify({ error: 'Not signed in' }, null, 2));
    }
    const id = session.client_id;
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/payments/subscription/${id}`, {
        method: 'GET',
        headers: { Authorization: process.env.TOKEN }
    });
    const js = await resp.json();
    let response;
    if (js.customer == null && js.subscription == null) {
        response = { data: false, customer: null, subscription: null };
    } else {
        response = { data: true, customer: js.customer, subscription: js.subscription };
    }
    res.send(JSON.stringify(response, null, 2));
};

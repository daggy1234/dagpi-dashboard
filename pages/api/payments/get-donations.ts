import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // eslint-disable-next-line prettier/prettier
    // @ts-expect-error the typing is not returning right sessioN???
    const session: Session | null = await getSession({ req });
    if (!session) {
        return res.send(JSON.stringify({ Error: 'Not signed in' }, null, 2));
    }
    const id = session.client_id;
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/payments/donations/${id}`, {
        method: 'GET',
        headers: { Authorization: process.env.TOKEN || 'A' }
    });
    const js = await resp.json();
    let response;
    if (js.data) {
        const items = js.data;
        const currData = await fetch('https://api.exchangerate-api.com/v4/latest/usd');
        const currJson = await currData.json();
        for (let i = 0; i < items.length; i += 1) {
            const item = items[i];
            if (item.currency.toLowerCase() === 'usd') {
                items[i].usdp = item.amount;
            } else {
                items[i].usdp = item.amount / currJson.rates[item.currency.toUpperCase()];
            }
        }
        response = { data: true, items };
    } else {
        response = { data: false, items: [] };
    }
    return res.send(JSON.stringify(response, null, 2));
};

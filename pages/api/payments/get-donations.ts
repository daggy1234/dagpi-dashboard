import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.send(JSON.stringify({ Error: 'Not signed in' }, null, 2));
    }
    const id = session.client_id;
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/payments/donations/${id}`, {
        method: 'GET',
        headers: { Authorization: process.env.TOKEN }
    });
    const js = await resp.json();
    let response;
    if (js.data) {
        const items = js.data;
        const curr_data = await fetch('https://api.exchangerate.host/latest?base=USD');
        const curr_json = await curr_data.json();
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.currency.toLowerCase() == 'usd') {
                items[i].usdp = item.amount;
            } else {
                items[i].usdp = item.amount / curr_json.rates[item.currency.toUpperCase()];
            }
        }
        console.log(items);
        response = { data: true, items: items };
    } else {
        response = { data: false, items: [] };
    }
    res.send(JSON.stringify(response, null, 2));
};

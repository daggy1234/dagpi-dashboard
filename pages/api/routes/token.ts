import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.send(JSON.stringify({ Error: 'Not signed in' }, null, 2));
    }
    const id = session.user.id;
    const resp = await fetch(`https://central.dagpi.tk/usertoken/${id}/`, {
        method: 'GET',
        headers: { Authorization: process.env.TOKEN }
    });
    const js = await resp.json();
    const fjs = js.data[0];
    try {
        fjs.data = true;
    } catch (err) {
        js.data[0] = { data: false };
    }
    res.send(JSON.stringify(js.data[0], null, 2));
};

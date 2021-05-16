import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.send(JSON.stringify({ Error: 'Not signed in' }, null, 2));
    }
    const id = session.user.id;
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/user/profile/${id}`, {
        method: 'GET',
        headers: { Authorization: process.env.TOKEN }
    });
    const js = await resp.json();
    let response;
    if (js.user) {
        response = { data: true, ...js };
    } else {
        response = { data: false };
    }
    res.send(JSON.stringify(response, null, 2));
};

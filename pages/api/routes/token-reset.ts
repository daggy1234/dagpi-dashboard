import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const secret = process.env.SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.send(JSON.stringify({ Error: 'Not signed in' }, null, 2));
    }
    const id = session.user.id;
    const resp = await fetch(`https://central.dagpi.xyz/updatetoken/${id}/`, {
        method: 'PATCH',
        headers: { Authorization: process.env.TOKEN }
    });
    const js = await resp.json();
    return res.send(JSON.stringify({ status: resp.status }, null, 2));
};

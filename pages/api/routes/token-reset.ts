import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import sendEmailText from '../../../lib/email';
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
    await resp.json();
    sendEmailText(
        session.user.email,
        'Dagpi Token Reset',
        `Dear ${session.user.name}\n\nYour dagpi token has been reset. Please login to the dashboard to view your new token .Join the discord server for updates: https://server.daggy.tech\n\nFrom:\nDagpi team`
    );
    return res.send(JSON.stringify({ status: resp.status }, null, 2));
};

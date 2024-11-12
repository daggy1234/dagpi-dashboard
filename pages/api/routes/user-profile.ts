import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // eslint-disable-next-line prettier/prettier
    // @ts-expect-error the typing is not returning right sessioN???
    const session: Session | null = await getSession({ req });
    if (!session) {
        return res.send(JSON.stringify({ Error: 'Not signed in' }, null, 2));
    }
    const { id } = session.user;
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/user/profile/${id}`, {
        method: 'GET',
        headers: { Authorization: process.env.TOKEN || 'SEX' }
    });
    const js = await resp.json();
    let response;
    if (js.user) {
        response = { data: true, ...js };
    } else {
        response = { data: false };
    }
    return res.send(JSON.stringify(response, null, 2));
};

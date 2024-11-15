import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const bod = req.body;
    const nreq = req;
    nreq.method = 'GET';
    nreq.body = null;
    console.log(bod);
    // eslint-disable-next-line prettier/prettier
    // @ts-expect-error the typing is not returning right sessioN???
    const session: Session | null = await getSession({ req: nreq });
    if (!session) {
        return res.send({ status: 400 });
    }
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/cli/`, {
        method: 'POST',
        headers: {
            Authorization: process.env.TOKEN || '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bod)
    });
    return res.send({ data: 'kk', status: resp.status });
};

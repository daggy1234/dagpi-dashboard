import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // eslint-disable-next-line prettier/prettier
    // @ts-expect-error the typing is not returning right sessioN???
    const session: Session | null = await getSession({ req });
    const bod = JSON.parse(req.body);
    if (!session) {
        return res.send({ status: 400 });
    }
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/cli/`, {
        method: 'DELETE',
        headers: {
            Authorization: process.env.TOKEN || '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: session.client_id,
            name: bod.name
        })
    });
    const js = await resp.json();
    console.log(js);
    return res.send({ status: resp.status });
};

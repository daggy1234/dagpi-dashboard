import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.send({ status: 400 });
    }
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/cli/`, {
        method: 'POST',
        headers: {
            Authorization: process.env.TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    return res.send({ data: 'kk', status: resp.status });
};

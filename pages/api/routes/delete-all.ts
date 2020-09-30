import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const secret = process.env.SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.send({ status: 400 });
    }
    const resp = await fetch(`https://central.dagpi.tk/deleteapp/${req.body.appid}/`, {
        method: 'DELETE',
        headers: {
            Authorization: process.env.TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    if (resp.status === 200) {
        const respa = await fetch(`https://central.dagpi.tk/deletetoken/${session.user.id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: process.env.TOKEN,
                'Content-Type': 'application/json'
            }
        });
        res.send({ status: respa.status });
    } else {
        res.send({ status: resp.status });
    }
};

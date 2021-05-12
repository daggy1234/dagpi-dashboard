import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const bod = JSON.parse(req.body);
    if (!session) {
        return res.send({ status: 400 });
    }
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/tokens/${session.user.id}/`, {
        method: 'DELETE',
        headers: {
            Authorization: process.env.TOKEN,
            'Content-Type': 'application/json'
        }
    });
    console.log(resp.status === 200);
    if (resp.status === 200) {
        const respa = await fetch(`${process.env.CENTRAL_SERVER}/app/${bod.uu}`, {
            method: 'DELETE',
            headers: {
                Authorization: process.env.TOKEN,
                'Content-Type': 'application/json'
            }
        });
        console.log(respa);
        console.log(await respa.text());
        res.send({ status: respa.status });
    } else {
        res.send({ status: resp.status });
    }
};

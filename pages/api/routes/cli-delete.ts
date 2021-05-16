import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const bod = JSON.parse(req.body);
    if (!session) {
        return res.send({ status: 400 });
    }
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/cli/`, {
        method: 'DELETE',
        headers: {
            Authorization: process.env.TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: session.client_id,
            name: bod.name
        })
    });
    const js = await resp.json();
    console.log(js);
    res.send({ status: resp.status });
};

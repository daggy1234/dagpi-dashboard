import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/user/`, {
        method: 'POST',
        headers: {
            Authorization: process.env.TOKEN || '',
            'Content-Type': 'application/json'
        },
        body: req.body
    });
    console.log(resp);
    if (resp.status === 500) {
        const resa = await fetch(
            `${process.env.CENTRAL_SERVER}/user/${JSON.parse(req.body).user}`,
            {
                method: 'GET',
                headers: {
                    Authorization: process.env.TOKEN || '',
                    'Content-Type': 'application/json'
                }
            }
        );
        const js = await resa.json();
        return res.send({ data: js.data, status: true });
    }
    if (resp.status !== 200) {
        return res.send({ data: 'kk', status: false });
    }
    const t = await resp.json();
    return res.send({ data: t.app, status: true });
};

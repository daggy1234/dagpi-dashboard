import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    console.log(session.user);
    console.log(req.body.purchase_units);
    console.log(req.body.update_time);
    console.log(req.body.id);
    res.send({ saved: true });
};

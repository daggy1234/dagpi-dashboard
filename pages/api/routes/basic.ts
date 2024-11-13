// import { auth } from "../../auth"
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const session = await auth(req, res)
    // const session = await getSession({ req });
    const url = `http://localhost:3000/api/auth/session`;

    // // TODO: Test while working on other methods
    const sessionRes = await fetch(url);
    const session = await sessionRes.json();
    console.log(session);
    if (session) {
        return res.json(session);
    }

    return res.status(401).json({ message: 'Not authenticated' });
}

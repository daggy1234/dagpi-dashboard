/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from 'dagpijs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);
    const { method }: { method: string } = body;
    let dc: Client;
    try {
        if (body.token) {
            dc = new Client(body.token);
        } else {
            dc = new Client(process.env.DAGPI_TOKEN || '');
        }
        // @ts-expect-error poor typing
        const json: any = await dc[method]();
        res.send({
            json
        });
    } catch (error: any) {
        res.send({
            response: error.toString(),
            status: error.status,
            token: body.token || 'autogenerated'
        });
    }
};

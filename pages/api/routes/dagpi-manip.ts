/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from 'dagpijs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);
    try {
        let dc;
        if (body.token) {
            dc = new Client(body.token);
        } else {
            dc = new Client(process.env.DAGPI_TOKEN || '');
        }
        const img = await dc.image_process(body.method, {
            url: body.url
        });
        res.send({
            format: img.format,
            image: `data:image/${img.format};base64,${img.image.toString('base64')}`,
            time: img.process_time
        });
    } catch (error: any) {
        res.send({ response: error.toString(), status: error.status });
    }
};

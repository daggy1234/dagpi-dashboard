import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import sendEmailText from '../../../lib/email';
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.send({ status: 400 });
    }
    const resp = await fetch('https://central.dagpi.xyz/addapp', {
        method: 'POST',
        headers: {
            Authorization: process.env.TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    if (resp.status !== 200) {
        return res.send({ data: 'kk', status: resp.status });
    }
    const t = await resp.json();
    const pjso = {
        content: 'New app submitted',
        embeds: [
            {
                title: `App: ${t.app.appname}`,
                description: t.app.appdescription,
                color: 3092790,
                fields: [
                    {
                        name: 'UUID',
                        value: t.app.uu,
                        inline: true
                    },
                    {
                        name: 'Url',
                        value: `[Link](${t.app.appurl})`,
                        inline: true
                    },
                    {
                        name: 'email',
                        value: session.user.email,
                        inline: true
                    },
                    {
                        name: 'prefix',
                        value: t.app.prefix ? t.app.prefix : 'Nan',
                        inline: true
                    }
                ],
                author: {
                    name: session.user.name,
                    icon_url: session.user.image
                },
                footer: {
                    text: session.user.id
                },
                timestamp: t.app.createdAt
            }
        ]
    };
    await fetch(process.env.APPHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pjso)
    });
    sendEmailText(
        session.user.email,
        'Dagpi app Created',
        `Dear ${session.user.name}\n\nYour dagpi app was created. We succesfully managed to create a dagpi app for your token.Your App will be approved soon.Join the discord server for updates: https://server.daggy.tech\n\nFrom:\nDagpi team`
    );
    res.send({ data: 'kk', status: resp.status });
};

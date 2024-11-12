import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // eslint-disable-next-line prettier/prettier
    // @ts-expect-error the typing is not returning right sessioN???
    const session: Session | null = await getSession({ req });
    if (!session) {
        return res.send({ status: 400 });
    }
    const resp = await fetch(`${process.env.CENTRAL_SERVER}/app/`, {
        method: 'POST',
        headers: {
            Authorization: process.env.TOKEN || 'A',
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
                        value: req.body.prefix ? req.body.prefix : 'Nan',
                        inline: true
                    }
                ],
                author: {
                    name: session.user.name,
                    icon_url: session.user.image
                },
                footer: {
                    text: `daggy dagpi approve ${session.user.id} ${t.app.uu}`
                },
                timestamp: t.app.createdAt
            }
        ]
    };
    await fetch(process.env.APPHOOK || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pjso)
    });
    return res.send({ data: 'kk', status: resp.status });
};

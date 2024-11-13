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

    const resp_token_add = await fetch(`https://central.dagpi.xyz/tokens/${session.user.id}`, {
        method: 'POST',
        headers: {
            Authorization: process.env.TOKEN || 'A',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: process.env.TOKEN || '' })
    });

    if (resp_token_add.status !== 200) {
        console.error(`Error adding token.`);
        return res.send({ data: 'kk', status: resp_token_add.status });
    }

    console.log(`Token successfully added.`);
    const patchResp = await fetch(`https://central.dagpi.xyz/app/${t.app.uu}`, {
        method: 'PATCH',
        headers: {
            Authorization: process.env.TOKEN || 'A',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: process.env.TOKEN || '' })
    });

    if (patchResp.status !== 200) {
        console.error(`Error patching app.`);
        return res.send({ data: 'kk', status: patchResp.status });
    }

    console.log(`App successfully patched.`);
    await fetch(process.env.APPHOOK || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pjso)
    });

    res.send({ data: 'kk', status: resp.status });
};

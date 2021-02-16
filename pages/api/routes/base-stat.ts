import { NextApiRequest, NextApiResponse } from 'next';

const sample = 600000;

function genAll() {
    const n = new Date().getTime();
    const fut = n - 24 * 60 * 60 * 1000;
    const ts = [];
    let lts = fut;
    let i;
    for (i = 0; lts < n; i += sample) {
        lts = fut + i;
        ts.push(lts);
    }
    return ts;
}

function GenCounter(data) {
    const unique = [...new Set(data)];
    const uas = [];
    unique.map((elm) => uas.push([elm, data.filter((el) => el == elm).length]));
    return uas;
}

function GenCounterBub(data, obj) {
    const unique = [...new Set(data)];
    const uas = [];
    unique.map((elm) => {
        const newa = [];
        obj.map((ob) => {
            if (ob.route == elm) {
                newa.push(Math.round((ob.timestamp * 1000) / sample) * sample);
            }
        });
        const fd = GenCounter(newa).map((elm) => [elm[0], elm[1], elm[1]]);
        uas.push({
            name: elm,
            data: fd
        });
    });
    return uas;
}

function GenSplit(data) {
    const out = GenCounter(data);
    if (out.length == 1) {
        if (out[0][0] == 'image') {
            out.push(['data', 0]);
        } else {
            out.push(['image', 0]);
        }
    }
    return out;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const bod = JSON.parse(req.body);
    const resp = await fetch(`https://api.dagpi.xyz/auth/stats/${bod.token}`, {
        headers: {
            Authorization: process.env.TOKEN,
            'Content-Type': 'application/json'
        }
    });
    // const resp = {
    //     status: 200
    // };
    // const js = {
    //     total: 4,
    //     data: [
    //         {
    //             user_agent:
    //                 'AsyncDagpi v{__version__} Python/Python/         {sys.version_info[0]}.{sys.version_info[1]} aiohttp/{2}',
    //             route: '/obama/',
    //             api: 'image',
    //             timestamp: 1613092658
    //         },
    //         {
    //             user_agent:
    //                 'AsyncDagpi v{__version__} Python/Python/         {sys.version_info[0]}.{sys.version_info[1]} aiohttp/{2}',
    //             route: '/motiv/',
    //             api: 'image',
    //             timestamp: 1613089101
    //         },
    //         {
    //             user_agent: 'dagpi',
    //             route: '/roast',
    //             api: 'data',
    //             timestamp: 1613089101
    //         },
    //         {
    //             user_agent: 'dagpi',
    //             route: '/roast',
    //             api: 'data',
    //             timestamp: 1613089101
    //         }
    //     ]
    // };
    if (resp.status == 200) {
        const js = await resp.json();
        if (js.data.length == 0) {
            return res.send({ data: 'no data', got: true, present: false });
        }
        const arr = js.data;
        const timea = arr.map((elm) =>
            new Date(Math.round((elm.timestamp * 1000) / sample) * sample).getTime()
        );
        const uas = GenCounter(arr.map((elm) => elm.user_agent));
        const routc = GenCounter(arr.map((elm) => elm.route));
        const bubd = GenCounterBub(
            arr.map((elm) => elm.route),
            arr
        );
        const routpref = GenSplit(arr.map((elm) => elm.api));
        let times = GenCounter(timea.concat(genAll()));
        const routes = [];
        const rout_num = [];
        const tarr = routc.map((elm) => {
            routes.push(elm[0]);
            rout_num.push(elm[1]);
            return {
                x: elm[0],
                y: elm[1]
            };
        });
        times = times.map((elm) => [elm[0], elm[1] - 1]);
        res.send({
            data: {
                raw: js,
                pie: {
                    series: [routpref[0][1], routpref[1][1]],
                    labels: [routpref[0][0], routpref[1][0]]
                },
                ua: uas,
                routes: { labels: routes, series: rout_num },
                tree: tarr,
                bubbles: bubd,
                times: times
            },
            got: true,
            present: true
        });
    } else {
        res.send({ data: 'no data', got: false, present: false });
    }
};

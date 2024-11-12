/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';

interface elmType {
    user_agent: string;
    timestamp: number;
    route: string;
    api: string;
}

function genAll(sample: number, tp: number) {
    const n = new Date().getTime();
    const fut = n - tp;
    const ts = [];
    let lts = fut;
    let i;
    for (i = 0; lts < n; i += sample) {
        lts = fut + i;
        ts.push(lts);
    }
    return ts;
}

function GenCounter<T>(data: T[]): [T, number][] {
    const unique = [...new Set(data)];
    const uas: [T, number][] = [];
    unique.map((elm) => uas.push([elm, data.filter((el: T) => el === elm).length]));
    return uas;
}

function GenCounterBub(sample: number, data, obj) {
    const unique = [...new Set(data)];
    const uas = [];
    unique.map((elm) => {
        const newa = [];
        obj.map((ob) => {
            if (ob.route === elm) {
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

function GenSplit(data: string[]) {
    const out = GenCounter(data);
    if (out.length === 1) {
        if (out[0][0] === 'image') {
            out.push(['data', 0]);
        } else {
            out.push(['image', 0]);
        }
    }
    return out;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const bod = JSON.parse(req.body);
    let tp: number;
    let url: string;
    let sample: number;
    const case_s: number = parseInt(bod.tp, 10);
    switch (case_s) {
        case 1:
            tp = 24 * 60 * 60 * 1000;
            sample = 600000;
            url = `https://api.dagpi.xyz/auth/stats/${bod.token}`;
            break;
        case 2:
            tp = 7 * 24 * 60 * 60 * 1000;
            sample = 3600000;
            url = `https://api.dagpi.xyz/auth/stats/week/${bod.token}`;
            break;
        case 3:
            tp = 30 * 24 * 60 * 60 * 1000;
            sample = 21600000;
            url = `https://api.dagpi.xyz/auth/stats/month/${bod.token}`;
            break;
        default:
            tp = 4;
            url = '';
            break;
    }

    if (tp === 4) {
        return res.send({ data: 'no data', got: false, present: false });
    }
    const resp = await fetch(url, {
        headers: {
            Authorization: process.env.TOKEN || '',
            'Content-Type': 'application/json'
        }
    });
    if (resp.status === 200) {
        const js = await resp.json();
        if (js.data.length === 0) {
            return res.send({
                tp: bod.tp,
                token: bod.token,
                data: 'no data',
                got: true,
                present: false
            });
        }
        const arr = js.data;
        const timea = arr.map((elm: elmType) =>
            new Date(Math.round((elm.timestamp * 1000) / sample) * sample).getTime()
        );
        const uas = GenCounter(arr.map((elm: elmType) => elm.user_agent));
        const routc = GenCounter(arr.map((elm: elmType) => elm.route));
        const bubd = GenCounterBub(
            sample,
            arr.map((elm: elmType) => elm.route),
            arr
        );
        const routpref = GenSplit(arr.map((elm: elmType) => elm.api));
        let times = GenCounter(timea.concat(genAll(sample, tp)));
        const routes: string[] = [];
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
            tp: bod.tp,
            token: bod.token,
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
                times
            },
            got: true,
            present: true
        });
    } else {
        res.send({
            data: 'no data',
            got: false,
            present: false
        });
    }
};

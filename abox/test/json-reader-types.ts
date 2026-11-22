import type { Kv } from '#kebab/lib/kv.js';
import { getResponseJson, postResponseJson, postJsonResponseJson } from '#kebab/lib/undici.js';
import type { Response } from '#kebab/lib/undici/response.js';

interface IJsonUser {
    'uid': string;
}

export async function checkJsonReaderTypes(kv: Kv, response: Response, url: string): Promise<void> {
    const contextual: IJsonUser[] = [
        await getResponseJson(url),
        await postResponseJson(url, {}),
        await postJsonResponseJson(url, []),
        await response.getJson(),
        await kv.getJson('user'),
        await kv.getDelJson('user'),
        await kv.hGetJson('users', 'first'),
    ];
    void contextual;

    const typed = [
        await getResponseJson<IJsonUser>(url),
        await postResponseJson<IJsonUser>(url, {}),
        await postJsonResponseJson<IJsonUser>(url, []),
        await response.getJson<IJsonUser>(),
        await kv.getJson<IJsonUser>('user'),
        await kv.getDelJson<IJsonUser>('user'),
        await kv.hGetJson<IJsonUser>('users', 'first'),
    ];
    for (const user of typed) {
        // @ts-expect-error 显式指定类型后必须处理失败和缺失结果。
        void user.uid;
        if (user !== false && user !== null) {
            user.uid.toUpperCase();
            // @ts-expect-error 未声明的字段不能通过类型检查。
            void user.name;
        }
    }

    const users = await postJsonResponseJson<IJsonUser[]>(url, []);
    if (users !== false && users !== null) {
        void users[0]?.uid;
    }
    const count = await kv.getJson<number>('count');
    if (count !== false && count !== null) {
        count.toFixed();
    }
}

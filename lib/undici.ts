import * as undici from 'undici';
import * as stream from 'stream';
import * as http from 'http';
import * as http2 from 'http2';
import * as dns from 'dns';
// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as lFs from '#kebab/lib/fs.js';
import * as lText from '#kebab/lib/text.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as lCore from '#kebab/lib/core.js';
import * as lCookie from '#kebab/lib/cookie.js';
import * as sCtr from '#kebab/sys/ctr.js';
// --- 自己 ---
import * as lFd from './undici/formdata.js';
import * as lRequest from './undici/request.js';
import * as lResponse from './undici/response.js';

/** --- 获取代理 agent --- */
export function getProxyAgent(url: string): undici.ProxyAgent {
    return new undici.ProxyAgent(url);
}

/** --- 获取 mproxy 的 URL --- */
function getMproxyUrl(u: string, mproxy: {
    'url': string;
    'auth': string;
    'data'?: kebab.Json;
    'hosts'?: Record<string, string> | string;
}): string {
    return mproxy.url + (mproxy.url.includes('?') ? '&' : '?') + lText.queryStringify({
        'url': u,
        'auth': mproxy.auth,
        'data': mproxy.data ? lText.stringifyJson(mproxy.data) : '{}',
        'hosts': mproxy.hosts ? lText.stringifyJson(mproxy.hosts) : 'null',
    });
}

/** --- 复用的 undici.agent 对象列表 --- */
const agents = new Map<string, undici.Agent>();

/** --- 获取或创建 undici.agent 对象 --- */
function getAgent(opt: IRequestOptions = {}): undici.Agent | undici.ProxyAgent {
    let k = opt.reuse ?? 'default';
    if (typeof k !== 'string') {
        return k;
    }
    if (k === 'default') {
        // --- hosts/local/keep 均会影响 agent 行为，需生成独立的 key ---
        const features: string[] = [];
        if (opt.hosts) {
            features.push(`h:${lCrypto.hashHmac('md5', lText.stringifyJson(opt.hosts))}`);
        }
        if (opt.local) {
            features.push(`l:${opt.local}`);
        }
        if (opt.keep === false) {
            features.push('k:0');
        }
        if (features.length > 0) {
            k = features.join('|');
        }
    }
    if (!agents.has(k)) {
        agents.set(k, new undici.Agent({
            'connect': {
                'localAddress': opt.local,
                lookup: buildDnsLookup(opt.hosts),
            },
            'pipelining': opt.keep === false ? 0 : 1,
        }));
    }
    return agents.get(k)!;
}

/**
 * --- 创建一个请求对象 ---
 * @param u
 */
export function open(u: string): lRequest.Request {
    return new lRequest.Request(u);
}

/**
 * --- 发起一个 get 请求 ---
 * @param u 请求的 URL
 * @param opt 参数
 */
export async function get(u: string, opt: IRequestOptions = {}): Promise<lResponse.Response> {
    return request(u, undefined, opt);
}

/**
 * --- 发起一个 post 请求 ---
 * @param u 请求的 URL
 * @param data 要发送的数据
 * @param opt 参数
 */
export async function post(
    u: string,
    data: Record<string, kebab.Json> | Buffer | string | stream.Readable,
    opt: IRequestOptions = {}
): Promise<lResponse.Response> {
    opt.method = 'POST';
    return request(u, data, opt);
}

/**
 * --- 发起 JSON 请求 ---
 * @param u 网址
 * @param data 数据
 * @param opt 选项
 */
export async function postJson(
    u: string,
    data: kebab.Json[] | Record<string, kebab.Json>,
    opt: IRequestOptions = {}
): Promise<lResponse.Response> {
    opt.method = 'POST';
    opt.type = 'json';
    return request(u, data, opt);
}

/**
 * --- 发起 JSON 请求并解析 JSON 响应，失败时返回 null ---
 * @param u 网址
 * @param data 数据
 * @param opt 选项
 */
export async function postJsonResponseJson(
    u: string, data: kebab.Json[] | Record<string, kebab.Json>, opt: IRequestOptions = {}
): Promise<kebab.Json | null> {
    opt.method = 'POST';
    opt.type = 'json';
    const res = await request(u, data, opt);
    const rtn = await res.getContent();
    if (!rtn) {
        return null;
    }
    const json = lText.parseJson(rtn.toString());
    if (!json) {
        return null;
    }
    return json;
}

/**
 * --- 发起 GET 请求并解析 JSON 响应 ---
 * @param u 网址
 * @param opt 选项
 * @returns JSON 数据，失败时返回 null
 */
export async function getResponseJson(
    u: string,
    opt: IRequestOptions = {}
): Promise<kebab.Json | null> {
    const res = await request(u, undefined, opt);
    const rtn = await res.getContent();
    if (!rtn) {
        return null;
    }
    const json = lText.parseJson(rtn.toString());
    if (!json) {
        return null;
    }
    return json;
}

/**
 * --- 发起一个完全兼容 fetch 的请求 ---
 * @param input 请求的 URL 或 Request 对象
 * @param init 增加 mproxy、hosts
 */
export async function fetch(
    input: string | URL | Request,
    init: RequestInit & {
        /** --- 正向 mproxy 代理，url 如 https://xxx/abc --- */
        'mproxy'?: {
            'url': string;
            'auth': string;
            'data'?: kebab.Json;
        };
        /** --- 自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host --- */
        'hosts'?: Record<string, string> | string;
    } = {},
): Promise<Response> {
    // --- 解析 URL ---
    let u: string;
    let method: IRequestOptions['method'] = 'GET';
    let headers: THttpHeaders = {};
    let body: Record<string, kebab.Json> | Buffer | string | stream.Readable | undefined;
    // --- 处理 input 参数 ---
    if (input instanceof Request) {
        u = input.url;
        method = input.method.toUpperCase() as IRequestOptions['method'];
        for (const [key, value] of input.headers) {
            headers[key.toLowerCase()] = value;
        }
        if (input.body) {
            body = Buffer.from(await input.arrayBuffer());
        }
    }
    else {
        u = input instanceof URL ? input.toString() : input;
    }
    // --- 处理 init 参数 ---
    if (init.method) {
        method = init.method.toUpperCase() as IRequestOptions['method'];
    }
    // --- 处理 headers ---
    if (init.headers) {
        if (init.headers instanceof Headers) {
            for (const [key, value] of init.headers) {
                headers[key.toLowerCase()] = value;
            }
        }
        else if (Array.isArray(init.headers)) {
            for (const [key, value] of init.headers) {
                headers[key.toLowerCase()] = value;
            }
        }
        else {
            for (const key in init.headers) {
                headers[key.toLowerCase()] = init.headers[key];
            }
        }
    }
    // --- 处理 body ---
    if (init.body !== undefined && init.body !== null) {
        if (typeof init.body === 'string') {
            body = init.body;
        }
        else if (init.body instanceof ArrayBuffer) {
            body = Buffer.from(init.body);
        }
        else if (init.body instanceof URLSearchParams) {
            body = init.body.toString();
            headers['content-type'] ??= 'application/x-www-form-urlencoded';
        }
        else if (init.body instanceof Blob) {
            body = Buffer.from(await init.body.arrayBuffer());
        }
        else if (init.body instanceof FormData) {
            // --- 原生 FormData 转为框架 FormData ---
            const fd = getFormData();
            for (const [key, value] of init.body.entries()) {
                if (typeof value === 'string') {
                    fd.putString(key, value);
                }
                else {
                    fd.putBuffer(key, Buffer.from(await value.arrayBuffer()), value.name);
                }
            }
            body = fd as unknown as stream.Readable;
            headers['content-type'] = 'multipart/form-data; boundary=' + fd.getBoundary();
            headers['content-length'] = fd.getLength().toString();
        }
        else if (init.body instanceof ReadableStream) {
            body = stream.Readable.fromWeb(init.body as Parameters<typeof stream.Readable.fromWeb>[0]);
        }
        else if (ArrayBuffer.isView(init.body)) {
            // --- ArrayBufferView (Uint8Array 等 TypedArray) ---
            body = Buffer.from(init.body.buffer, init.body.byteOffset, init.body.byteLength);
        }
    }
    // --- 构建请求选项 ---
    const opt: IRequestOptions = {
        'method': method,
        'headers': headers,
        'hosts': init.hosts,
        'mproxy': init.mproxy,
        'follow': init.redirect === 'follow' ? 10 : 0,
    };
    // --- 检查是否已中止（注意：请求发起后无法中止） ---
    if (init.signal?.aborted) {
        return new Response(null, {
            'status': 0,
            'statusText': 'Aborted',
        });
    }
    // --- 发起请求 ---
    const res = await request(u, body, opt);
    // --- 转换为原生 Response ---
    const resStream = res.getStream();
    const resHeaders = new Headers();
    if (res.headers) {
        for (const key in res.headers) {
            if (key.startsWith('http-')) {
                continue;
            }
            const value = res.headers[key];
            if (value === undefined) {
                continue;
            }
            if (Array.isArray(value)) {
                for (const v of value) {
                    resHeaders.append(key, v);
                }
            }
            else {
                resHeaders.set(key, value.toString());
            }
        }
    }
    const status = res.headers?.['http-code'] ?? (res.error ? 0 : 200);
    if (res.error || !resStream) {
        return new Response(null, {
            'status': status,
            'statusText': res.error?.message ?? 'Unknown Error',
            'headers': resHeaders,
        });
    }
    return new Response(stream.Readable.toWeb(resStream) as BodyInit, {
        'status': status,
        'statusText': '',
        'headers': resHeaders,
    });
}

/** --- 构建自定义 DNS 查询函数 --- */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function buildDnsLookup(hosts?: Record<string, string> | string) {
    if (!hosts) {
        return undefined;
    }
    return (hostname: string, opts: dns.LookupOptions, cb: (
        err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family?: number) => void
    ) => {
        const override = typeof hosts === 'string' ? hosts : hosts[hostname];
        if (override) {
            cb(null, [{ 'address': override, 'family': lText.isIPv4(override) ? 4 : 6 }]);
        }
        else {
            dns.lookup(hostname, opts, cb);
        }
    };
}

/**
 * --- 发起一个请求 ---
 * @param opt 配置项
 */
export async function request(
    u: string,
    data?: Record<string, kebab.Json> | Buffer | string | stream.Readable,
    opt: IRequestOptions = {}
): Promise<lResponse.Response> {
    const uri = lText.parseUrl(u);
    /** --- 正向代理的地址 --- */
    const puri = opt.mproxy ? lText.parseUrl(opt.mproxy.url) : null;
    const method = opt.method ?? 'GET';
    const type = opt.type ?? 'form';
    const timeout = opt.timeout ?? 10;
    /** --- 追踪 location 次数，0 为不追踪，默认为 0 --- */
    const follow = opt.follow ?? 0;
    const hosts = opt.hosts ?? {};
    const headers: Record<string, kebab.Json> = {};
    if (opt.headers) {
        for (const key in opt.headers) {
            headers[key.toLowerCase()] = opt.headers[key];
        }
    }
    headers['user-agent'] ??= 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36';
    // --- DATA ---
    if (method === 'GET') {
        if (data && !(data instanceof stream.Readable) && !Buffer.isBuffer(data)) {
            u += (u.includes('?') ? '&' : '?') +
                (typeof data === 'string' ? data : lText.queryStringify(data));
            data = undefined;
        }
    }
    else {
        // --- POST ---
        if (data && !(data instanceof stream.Readable) && !Buffer.isBuffer(data) && typeof data !== 'string') {
            if (type === 'form') {
                data = lText.queryStringify(data);
                headers['content-type'] = 'application/x-www-form-urlencoded';
            }
            else {
                data = lText.stringifyJson(data);
                headers['content-type'] = 'application/json; charset=utf-8';
            }
        }
        else if (data instanceof lFd.FormData) {
            headers['content-type'] = 'multipart/form-data; boundary=' + data.getBoundary();
            headers['content-length'] = data.getLength();
        }
    }
    headers['accept-encoding'] = 'gzip, deflate';
    // --- cookie 托管 ---
    if (opt.cookie) {
        headers['cookie'] = lCookie.buildCookieQuery(opt.cookie, uri);
    }
    // --- 发起请求 ---
    let req: undici.Dispatcher.ResponseData;
    try {
        /** --- 定义请求 host --- */
        const hostname = (puri ? puri.hostname : uri.hostname) ?? '';
        if (!hostname) {
            const res = new lResponse.Response(null);
            res.error = {
                'name': 'Possible mProxy error',
                'message': 'hostname not found',
            };
            if (opt.log === undefined || opt.log) {
                lCore.log({}, `[UNDICI][REQUEST] ${res.error.message}`, '-neterror');
            }
            return res;
        }
        if (typeof hosts === 'string' ?
            !hosts :
            (hosts[hostname] !== undefined && !hosts[hostname])
        ) {
            const res = new lResponse.Response(null);
            res.error = {
                'name': 'hosts error',
                'message': 'hosts param error',
            };
            if (opt.log === undefined || opt.log) {
                lCore.log({}, `[UNDICI][REQUEST] ${res.error.message}`, '-neterror');
            }
            return res;
        }
        const agent = getAgent(opt);
        req = await undici.request(opt.mproxy ? getMproxyUrl(u, opt.mproxy) : u, {
            'method': method,
            'body': data,
            'headers': headers,
            'headersTimeout': timeout * 1_000,
            'bodyTimeout': timeout * 1_000,
            'dispatcher': agent,
        });
    }
    catch (err: kebab.Json) {
        const res = new lResponse.Response(null);
        res.error = err;
        if (opt.log === undefined || opt.log) {
            lCore.log({}, `[UNDICI][REQUEST] ${err.message}`, '-neterror');
        }
        return res;
    }
    // --- 处理返回值 ---
    // --- 是否追踪 cookie ---
    if (opt.cookie) {
        // --- 提取 cookie ---
        await lCookie.buildCookieObject(opt.cookie, (req.headers['set-cookie'] ?? []) as string[], uri);
    }
    // --- 创建 Response 对象 ---
    const res = new lResponse.Response(req);
    res.headers = req.headers as THttpHeaders;
    res.headers['http-code'] = req.statusCode;
    res.headers['http-url'] = u;
    // --- 直接下载到文件 ---
    /** --- 已下载文件的 size --- */
    let total: number = 0;
    if (opt.save && (!req.headers['location'] || follow === 0)) {
        const save = opt.save;
        const stream = res.getStream();
        if (stream) {
            await new Promise<void>(resolve => {
                const ws = lFs.createWriteStream(save);
                stream.on('error', () => {
                    resolve();
                }).pipe(ws);
                ws.on('finish', () => {
                    lFs.stats(save).then((stat) => {
                        total = stat?.size ?? 0;
                        resolve();
                    }).catch(() => {
                        resolve();
                    });
                }).on('error', () => {
                    resolve();
                });
            });
        }
    }
    if (total) {
        res.setContent(total.toString());
    }
    // --- 判断 follow 追踪 ---
    if (follow === 0) {
        return res;
    }
    if (!res.headers['location']) {
        return res;
    }
    // --- 哦，要追踪 ---
    headers['referer'] = u;
    let nextMethod = method;
    let nextData = data;
    const status = res.headers['http-code'];
    if (status === 303 || ((status === 301 || status === 302) && method === 'POST')) {
        nextMethod = 'GET';
        nextData = undefined;
    }
    return request(lText.urlResolve(u, req.headers['location'] as string), nextData, {
        ...opt,
        ...{
            'method': nextMethod,
            'type': type,
            'timeout': timeout,
            'follow': follow - 1,
            'hosts': hosts,
            'headers': headers,
        },
    });
}

/**
 * --- 创建 FormData 对象 ---
 */
export function getFormData(): lFd.FormData {
    return new lFd.FormData();
}

/** --- proxy 要剔除的基础头部 --- */
const proxyContinueHeaders = [
    'host', 'connection', 'keep-alive', 'http-code', 'http-url',
    'transfer-encoding', 'upgrade', 'proxy-connection'
];

/**
 * --- 剔除不代理的 header，返回新的 header ---
 * @param headers 剔除前的 header
 * @param res 直接设置头部而不返回，可置空
 * @param filter 返回 true 则留下
 */
export function filterHeaders(
    headers: http.IncomingHttpHeaders | http2.IncomingHttpHeaders | THttpHeaders,
    res?: http2.Http2ServerResponse | http.ServerResponse,
    filter?: (h: string) => boolean
): Record<string, string | string[]> {
    const heads: Record<string, string | string[]> = {};
    for (const h in headers) {
        if (proxyContinueHeaders.includes(h)) {
            continue;
        }
        if (h.includes(':') || h.includes('(')) {
            continue;
        }
        const v = headers[h];
        if (v === undefined) {
            continue;
        }
        if (filter && !filter(h)) {
            continue;
        }
        if (res) {
            res.setHeader(h, v);
            continue;
        }
        heads[h] = v;
    }
    return heads;
}

/**
 * --- 正向 mproxy 代理，注意提前处理不要自动处理 post 数据，读取 get 的 url 为实际请求地址 ---
 * --- get: url, auth ---
 * @param ctr 当前控制器
 * @param auth 校验字符串，读取 get 的 auth 和本参数做比对
 * @param opt 参数
 */
export async function mproxy(
    ctr: sCtr.Ctr,
    auth: string,
    opt: IMproxyOptions = {}
): Promise<number> {
    const req = ctr.getPrototype('_req');
    const res = ctr.getPrototype('_res');
    /** --- 客户端请求中的 get 的数据 --- */
    const get = ctr.getPrototype('_get');
    if (req.readableEnded) {
        return -4;
    }
    if (get['auth'] !== auth) {
        return 0;
    }
    if (!get['url']) {
        return -1;
    }
    (opt as kebab.Json).method = req.method ?? 'GET';
    opt.headers ??= {};
    /** --- 传来的 hosts --- */
    const hosts = lText.parseJson<any>(get['hosts']);
    const headers = Object.assign(filterHeaders(req.headers, undefined, opt.filter), opt.headers);
    // --- 发起请求 ---
    const rres = await request(get['url'], req, {
        ...opt,
        'hosts': lText.logicalOr(hosts, opt.hosts),
        headers,
    });
    const stream = rres.getRawStream();
    if (!stream) {
        lCore.log({}, `[UNDICI][MPROXY] ${rres.error?.message ?? 'null'}, ${get['url']}`, '-neterror');
        return -3;
    }
    if (rres.error) {
        return -2;
    }
    if (rres.headers) {
        filterHeaders(rres.headers, res, opt.filter);
    }
    lCore.writeHead(res, rres.headers?.['http-code'] ?? 200);
    await new Promise<void>((resolve) => {
        stream.pipe(res).on('finish', () => {
            resolve();
        });
    });
    return 1;
}

/**
 * --- 获取 mproxy 的附加数据 ---
 * @param ctr 当前控制器
 */
export function mproxyData(ctr: sCtr.Ctr): kebab.Json {
    const get = ctr.getPrototype('_get');
    if (!get['data']) {
        return {};
    }
    const data = lText.parseJson(get['data']);
    if (!data) {
        return {};
    }
    return data;
}

/**
 * --- 反向代理，注意提前处理不要自动处理 post 数据，将本服务器的某个路由反代到其他网址 ---
 * @param ctr 当前控制器
 * @param route 要反代的路由
 * @param opt 参数
 */
export async function rproxy(
    ctr: sCtr.Ctr,
    route: Record<string, string>,
    opt: IRproxyOptions = {}
): Promise<boolean> {
    const req = ctr.getPrototype('_req');
    const res = ctr.getPrototype('_res');
    const config = ctr.getPrototype('_config');
    const path = config.const.path + (config.const.qs ? '?' + config.const.qs : '');
    if (req.readableEnded) {
        return false;
    }
    for (const key in route) {
        if (!path.startsWith(key)) {
            continue;
        }
        // --- 找到了，做转发 ---
        // --- key 类似：test/net-rproxy/ ---
        // --- 值类似：https://cdn.jsdelivr.net/npm/deskrt@2.0.10/ ---
        /** --- 要拼接的地址 --- */
        const lpath = path.slice(key.length);
        (opt as kebab.Json).method = req.method ?? 'GET';
        opt.headers ??= {};
        const headers = Object.assign(filterHeaders(req.headers, undefined, opt.filter), opt.headers);
        // --- 发起请求 ---
        const rres = await request(route[key] + lpath, req, {
            ...opt,
            headers,
        });
        const stream = rres.getRawStream();
        if (!stream) {
            return false;
        }
        if (rres.error) {
            return false;
        }
        if (rres.headers) {
            filterHeaders(rres.headers, res, opt.filter);
        }
        lCore.writeHead(res, rres.headers?.['http-code'] ?? 200);
        await new Promise<void>((resolve) => {
            stream.pipe(res).on('finish', () => {
                resolve();
            });
        });
        return true;
    }
    return false;
}

// --- 类型 ---

/** --- 请求的传入参数选项 --- */
export interface IRequestOptions {
    'method'?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
    'type'?: 'form' | 'json';
    /** --- 秒数，默认 10 秒 --- */
    'timeout'?: number;
    /** --- 追踪 location 次数，0 为不追踪，默认为 0 --- */
    'follow'?: number;
    /** --- 自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host --- */
    'hosts'?: Record<string, string> | string;
    'save'?: string;
    'local'?: string;
    'headers'?: THttpHeaders;
    /** --- 正向 mproxy 代理，url 如 https://xxx/abc --- */
    'mproxy'?: {
        'url': string;
        'auth': string;
        'data'?: kebab.Json;
        /** --- 落地端自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host --- */
        'hosts'?: Record<string, string> | string;
    };
    /** --- 连接是否保持长连接（即是否允许复用），默认为 true --- */
    'keep'?: boolean;
    /** --- 复用池名/Agent，默认为 default --- */
    'reuse'?: string | undici.ProxyAgent | undici.Agent;
    /** --- cookie 托管对象 --- */
    'cookie'?: Record<string, lCookie.ICookie>;
    /** --- 若有异常写入文件日志，默认为 true --- */
    'log'?: boolean;
}

/** --- 正向代理请求的传入参数选项 --- */
export interface IMproxyOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    'follow'?: number;
    /** --- 自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host --- */
    'hosts'?: Record<string, string> | string;
    'local'?: string;
    'headers'?: THttpHeaders;
    /** --- 过滤 header，返回 true 则留下 --- */
    filter?: (h: string) => boolean;
    /** --- 默认为 default --- */
    'reuse'?: string | undici.ProxyAgent | undici.Agent;
}

/** --- 反向代理请求的传入参数选项 --- */
export interface IRproxyOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    'follow'?: number;
    /** --- 自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host --- */
    'hosts'?: Record<string, string> | string;
    'local'?: string;
    'headers'?: THttpHeaders;
    /** --- 过滤 header，返回 true 则留下 --- */
    filter?: (h: string) => boolean;
    /** --- 正向 mproxy 代理，url 如 https://xxx/abc --- */
    'mproxy'?: {
        'url': string;
        'auth': string;
        'data'?: kebab.Json;
        /** --- 落地端自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host --- */
        'hosts'?: Record<string, string> | string;
    };
    /** --- 默认为 default --- */
    'reuse'?: string | undici.ProxyAgent | undici.Agent;
}

/** --- http headers --- */
/* eslint-disable @typescript-eslint/naming-convention */
export type THttpHeaders = http.IncomingHttpHeaders & {
    'http-code'?: number;
    'http-url'?: string;
};
/* eslint-enable */

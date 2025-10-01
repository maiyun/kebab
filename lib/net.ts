/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-15 22:47
 * CA: https://curl.haxx.se/ca/cacert.pem
 * Last: 2020-4-9 20:11:02, 2022-09-22 14:30:13, 2024-1-1 21:32:26, 2024-1-12 13:01:54, 2025-6-13 13:20:52
 */
import * as stream from 'stream';
import * as http from 'http';
import * as http2 from 'http2';
// --- 第三方 ---
import * as hc from '@litert/http-client';
// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as lFs from '#kebab/lib/fs.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';
import * as sCtr from '#kebab/sys/ctr.js';
// --- 自己 ---
import * as fd from './net/formdata.js';
import * as lRequest from './net/request.js';
import * as lResponse from './net/response.js';

/** --- ca 根证书内容 --- */
let ca: string = '';

/** --- 获取 CA 证书 --- */
export async function getCa(): Promise<string> {
    if (ca) {
        return ca;
    }
    ca = (await lFs.getContent(kebab.LIB_PATH + 'net/cacert.pem', 'utf8')) ?? '';
    return ca;
}

/** --- 复用的 hc 对象列表 --- */
const reuses: Record<string, hc.IClient> = {
    'default': hc.createHttpClient(),
};

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
 * @param u
 * @param data
 * @param opt
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
    const follow = opt.follow ?? 0;
    const hosts = opt.hosts ?? {};
    const save = opt.save;
    const local = opt.local;
    const reuse = opt.reuse ?? 'default';
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
        else if (data instanceof fd.FormData) {
            headers['content-type'] = 'multipart/form-data; boundary=' + data.getBoundary();
            headers['content-length'] = data.getLength();
        }
    }
    headers['accept-encoding'] = 'gzip, deflate';
    // --- ssl ---
    if (uri.protocol === 'https:') {
        await getCa();
    }
    // --- cookie 托管 ---
    if (opt.cookie) {
        headers['cookie'] = buildCookieQuery(opt.cookie, uri);
    }
    // --- 发起请求 ---
    let req: hc.IResponse;
    try {
        // --- 重定义 IP ---
        const host = (puri ? puri.hostname : uri.hostname) ?? '';
        if (!host) {
            const res = new lResponse.Response(null);
            res.error = {
                'name': 'Possible mProxy error',
                'message': 'host not found'
            };
            return res;
        }
        if (hosts[host] !== undefined && !hosts[host]) {
            const res = new lResponse.Response(null);
            res.error = {
                'name': 'hosts error',
                'message': 'hosts param error'
            };
            return res;
        }
        if (!reuses[reuse]) {
            reuses[reuse] = hc.createHttpClient();
        }
        req = await reuses[reuse].request({
            'url': opt.mproxy ? opt.mproxy.url + (opt.mproxy.url.includes('?') ? '&' : '?') + lText.queryStringify({
                'url': u,
                'auth': opt.mproxy.auth,
                'data': opt.mproxy.data ? lText.stringifyJson(opt.mproxy.data) : '{}'
            }) : u,
            'method': method,
            'data': data,
            'headers': headers,
            'timeout': timeout * 1000,
            'localAddress': local,
            'ca': ca,
            'connectionOptions': {
                'remoteHost': hosts[host],
            },
        });
    }
    catch (err: kebab.Json) {
        const res = new lResponse.Response(null);
        res.error = err;
        return res;
    }
    // --- 处理返回值 ---
    // --- 是否追踪 cookie ---
    if (opt.cookie) {
        // --- 提取 cookie ---
        await buildCookieObject(opt.cookie, (req.headers['set-cookie'] ?? []) as string[], uri);
    }
    // --- 直接下载到文件 ---
    /** --- 已下载文件的 size --- */
    let total: number = 0;
    if (save && (!req.headers['location'] || follow === 0)) {
        await new Promise<void>(function(resolve) {
            req.getStream().on('end', () => {
                lFs.stats(save).then((stat) => {
                    total = stat?.size ?? 0;
                    resolve();
                }).catch(() => {
                    resolve();
                });
            }).on('error', function() {
                resolve();
            }).pipe(lFs.createWriteStream(save));
        });
    }
    // --- 创建 Response 对象 ---
    const res = new lResponse.Response(req);
    if (total) {
        res.setContent(total.toString());
    }
    res.headers = req.headers as THttpHeaders;
    switch (req.protocol) {
        case hc.EProtocol.HTTPS_2:
        case hc.EProtocol.HTTP_2: {
            req.headers['http-version'] = '2.0';
            break;
        }
        default: {
            res.headers['http-version'] = '1.1';
        }
    }
    res.headers['http-code'] = req.statusCode;
    res.headers['http-url'] = u;
    // --- 判断 follow 追踪 ---
    if (follow === 0) {
        return res;
    }
    if (!res.headers['location']) {
        return res;
    }
    // --- 哦，要追踪 ---
    headers['referer'] = u;
    return request(lText.urlResolve(u, req.headers['location'] as string), data, {
        'method': method,
        'type': type,
        'timeout': timeout,
        'follow': follow - 1,
        'hosts': hosts,
        'save': save,
        'local': local,
        'headers': headers,
        'mproxy': opt.mproxy,
        'reuse': reuse
    });
}

/**
 * --- 对 cookie 对象进行操作 ---
 * @param cookie 要操作的对象
 * @param name 名
 * @param value 值
 * @param domain 应用网址，如 .xxx.com
 * @param opt 选项 ttl, path, ssl, httponly
 */
export function setCookie(cookie: Record<string, ICookie>, name: string, value: string, domain: string, opt: {
    'ttl'?: number;
    'path'?: string;
    'ssl'?: boolean;
    'httponly'?: boolean;
} = {}): void {
    const tim = lTime.stamp();
    const ttl = opt.ttl ?? 0;
    domain = domain.split(':')[0];
    const domainN = domain.startsWith('.') ? domain.slice(1) : domain;

    let exp = -1992199400;
    if (ttl) {
        exp = tim + ttl;
    }

    cookie[name + '-' + domainN] = {
        'name': name,
        'value': value,
        'exp': exp,
        'path': opt['path'] ?? '/',
        'domain': domainN,
        'secure': opt['ssl'] ? true : false,
        'httponly': opt['httponly'] ? true : false
    };
}

/**
 * --- 根据 Set-Cookie 头部转换到 cookie 对象 ---
 * @param cookie cookie 对象
 * @param setCookies 头部的 set-cookie 数组
 * @param uri 请求的 URI 对象
 */
async function buildCookieObject(
    cookie: Record<string, ICookie>,
    setCookies: string[],
    uri: kebab.IUrlParse
): Promise<void> {
    const tim = lTime.stamp();
    uri.path ??= '/';
    for (const setCookie of setCookies) {
        const cookieTmp: Record<string, string> = {};
        const list = setCookie.split(';');
        // --- 提取 set-cookie 中的定义信息 ---
        for (let index = 0; index < list.length; ++index) {
            const item = list[index];
            const arr = item.split('=');
            const key = arr[0].trim();
            const val = arr[1] ?? '';
            if (index === 0) {
                // --- 用户定义的信息 ---
                cookieTmp['name'] = key;
                cookieTmp['value'] = decodeURIComponent(val);
            }
            else {
                // --- cookie 配置信息，可转小写方便读取 ---
                cookieTmp[key.toLowerCase()] = val;
            }
        }
        // --- 获取定义的 domain ---
        let domain = '', domainN = '';
        if (cookieTmp['domain']) {
            cookieTmp['domain'] = cookieTmp['domain'].split(':')[0];
            if (!(cookieTmp['domain'].startsWith('.'))) {
                domain = '.' + cookieTmp['domain'];
                domainN = cookieTmp['domain'];
            }
            else {
                domain = cookieTmp['domain'];
                domainN = cookieTmp['domain'].slice(1);
            }
        }
        else {
            domain = '.' + (uri.hostname ?? '');
            domainN = uri.hostname ?? '';
        }
        // --- 判断有没有设置 domain 的权限 ---
        // --- uri.hostname vs  domain(domainN) ---
        // --- ok.xxx.com   vs  .ok.xxx.com: true ---
        // --- ok.xxx.com   vs  .xxx.com: true ---
        // --- z.ok.xxx.com vs  .xxx.com: true ---
        // --- ok.xxx.com   vs  .zz.ok.xxx.com: false ---
        if (uri.hostname !== domainN) {
            // --- 设置的域名和当前 host 不相等，如果是 IP、无 . 域名，则直接失败 ---
            if (!lText.isDomain(uri.hostname ?? '')) {
                continue;
            }
            const parseDomain: lText.IDomain = await lText.parseDomain(domainN);
            if (parseDomain.tld === domainN.toLowerCase()) {
                // --- 不能给 tld 设置 cookie ---
                continue;
            }
            // --- 判断访问路径 (uri['host']) 是不是设置域名 (domain) 的孩子，domain 必须是 uriHost 的同级或者父辈 ---
            if (!((uri.hostname ?? '').endsWith(domain))) {
                // --- false 代表进入了，代表失败 ---
                // --- ok.xxx.com, .xxx.com: true ---
                // --- ok.xxx.com, .ppp.com: false ---
                // --- ok.xxx.com, .p.ok.xxx.com: false ---
                continue;
            }
        }
        const cookieKey = cookieTmp['name'] + '-' + domainN;
        if (cookieTmp['max-age'] && (Number(cookieTmp['max-age']) <= 0)) {
            if (cookie[cookieKey]) {
                delete cookie[cookieKey];
                continue;
            }
        }
        let exp = -1992199400;
        if (cookieTmp['max-age']) {
            exp = tim + Number(cookieTmp['max-age']);
        }
        // --- path ---
        let path = cookieTmp['path'] ?? '';
        if (path === '') {
            const srp = (uri.pathname ?? '').lastIndexOf('/');
            path = (uri.pathname ?? '').slice(0, srp + 1);
        }
        else if (!path.startsWith('/')) {
            path = '/' + path;
        }
        cookie[cookieKey] = {
            'name': cookieTmp['name'],
            'value': cookieTmp['value'],
            'exp': exp,
            'path': path,
            'domain': domainN,
            'secure': cookieTmp['secure'] !== undefined ? true : false,
            'httponly': cookieTmp['httponly'] !== undefined ? true : false
        };
    }
}

/**
 * --- 对象转换为 Cookie 拼接字符串（会自动筛掉不能发送的 cookie） ---
 * @param cookie cookie 对象
 * @param uri 请求的 URI 对象
 */
export function buildCookieQuery(cookie: Record<string, ICookie>, uri: kebab.IUrlParse): string {
    const tim = lTime.stamp();
    let cookieStr: string = '';
    for (const key in cookie) {
        const item: ICookie = cookie[key];
        if ((item.exp < tim) && (item.exp !== -1992199400)) {
            delete cookie[key];
            continue;
        }
        uri.path ??= '/';
        if (item.secure && (uri.protocol === 'https')) {
            continue;
        }
        // --- 判断 path 是否匹配 ---
        if (!uri.path.startsWith(item.path)) {
            continue;
        }
        const domain: string = '.' + item.domain;
        // --- 判断 $uri['host'] 必须是 $domain 的同级或子级 ---
        // --- $uri['host']     vs      $domain ---
        // --- ok.xxx.com       vs      .ok.xxx.com: true ---
        // --- ok.xxx.com       vs      .xxx.com: true ---
        // --- z.ok.xxx.com     vs      .xxx.com: true ---
        // --- ok.xxx.com       vs      .zz.ok.xxx.com: false ---
        if ('.' + (uri.hostname ?? '') !== domain) {
            // --- 域名不相等，那么判断当前域名 host 是不是 domain 的孩子 ---
            if (!(uri.hostname!.endsWith(domain))) {
                // --- false 代表进入，被排除了，因为 cookie 的 domain 和当前 host 后半部分，代表不是 domain 的孩子 ---
                // --- ok.xxx.com, .zz.ok.xxx.com: false ---
                // --- pp.ok.xxx.com, .zz.ok.xxx.com: false ---
                // --- q.b.ok.xx.com, .zz.ok.xxx.com: false ---
                // --- z.ok.xxx.com, .xxx.com: true ---
                // --- xx.xxx.com, .ok.xxx.com: false ---
                continue;
            }
        }
        cookieStr += item.name + '=' + encodeURIComponent(item.value) + '; ';
    }
    if (cookieStr !== '') {
        return cookieStr.slice(0, -2);
    }
    else {
        return '';
    }
}

/**
 * --- 模拟重启浏览器后的状态 ---
 * @param cookie cookie 对象
 */
export function resetCookieSession(cookie: Record<string, ICookie>): void {
    for (const key in cookie) {
        const item = cookie[key];
        if (item.exp === -1992199400000) {
            delete cookie[key];
        }
    }
}

/**
 * --- 创建 FormData 对象 ---
 */
export function getFormData(): fd.FormData {
    return new fd.FormData();
}

/** --- proxy 要剔除的基础头部 --- */
const proxyContinueHeaders = [
    'host', 'connection', 'http-version', 'http-code', 'http-url',
    'transfer-encoding'
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
        return -3;
    }
    if (get['auth'] !== auth) {
        return 0;
    }
    if (!get['url']) {
        return -1;
    }
    (opt as kebab.Json).method = req.method ?? 'GET';
    opt.headers ??= {};
    const headers = Object.assign(filterHeaders(req.headers, undefined, opt.filter), opt.headers);
    // --- 发起请求 ---
    const rres = await request(get['url'], req, {
        ...opt,
        headers
    });
    if (rres.error) {
        return -2;
    }
    if (rres.headers) {
        filterHeaders(rres.headers, res, opt.filter);
    }
    res.writeHead(rres.headers?.['http-code'] ?? 200);
    await new Promise<void>((resolve) => {
        rres.getRawStream().pipe(res).on('finish', () => {
            resolve();
        });
    });
    return 1;
}

/**
 * --- 获取 mproxy 的附加数据 ---
 * @param ctr 当前控制器
 */
export function mproxyData(ctr: sCtr.Ctr): any {
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
            headers
        });
        if (rres.error) {
            return false;
        }
        if (rres.headers) {
            filterHeaders(rres.headers, res, opt.filter);
        }
        res.writeHead(rres.headers?.['http-code'] ?? 200);
        await new Promise<void>((resolve) => {
            rres.getRawStream().pipe(res).on('finish', () => {
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
    /** --- 秒数 --- */
    'timeout'?: number;
    'follow'?: number;
    'hosts'?: Record<string, string>;
    'save'?: string;
    'local'?: string;
    'headers'?: THttpHeaders;
    /** --- 正向 mproxy 代理，url 如 https://xxx/abc --- */
    'mproxy'?: {
        'url': string;
        'auth': string;
        'data'?: any;
    };
    /** --- 默认为 default --- */
    'reuse'?: string;
    /** --- cookie 托管对象 --- */
    'cookie'?: Record<string, ICookie>;
}

/** --- 正向代理请求的传入参数选项 --- */
export interface IMproxyOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    'follow'?: number;
    'hosts'?: Record<string, string>;
    'local'?: string;
    'headers'?: THttpHeaders;
    /** --- 过滤 header，返回 true 则留下 --- */
    filter?: (h: string) => boolean;
    /** --- 默认为 default --- */
    'reuse'?: string;
}

/** --- 反向代理请求的传入参数选项 --- */
export interface IRproxyOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    'follow'?: number;
    'hosts'?: Record<string, string>;
    'local'?: string;
    'headers'?: THttpHeaders;
    /** --- 过滤 header，返回 true 则留下 --- */
    filter?: (h: string) => boolean;
    /** --- 正向 mproxy 代理，url 如 https://xxx/abc --- */
    'mproxy'?: {
        'url': string;
        'auth': string;
        'data'?: any;
    };
    /** --- 默认为 default --- */
    'reuse'?: string;
}

/** --- http headers --- */
/* eslint-disable @typescript-eslint/naming-convention */
export type THttpHeaders = http.IncomingHttpHeaders & {
    'http-version'?: '1.1' | '2.0';
    'http-code'?: number;
    'http-url'?: string;
};
/* eslint-enable */

/** --- Net Cookie 对象 --- */
export interface ICookie {
    'name': string;
    'value': string;
    /** --- 有效期秒级时间戳 --- */
    'exp': number;
    'path': string;
    'domain': string;
    'secure': boolean;
    'httponly': boolean;
}

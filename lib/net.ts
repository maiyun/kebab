/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-15 22:47
 * CA: https://curl.haxx.se/ca/cacert.pem
 * Last: 2020-4-9 20:11:02, 2022-09-22 14:30:13
 */
import * as url from 'url';
import * as stream from 'stream';
// --- 第三方 ---
import * as hc from '@litert/http-client';
// --- 库和定义 ---
import * as fs from '~/lib/fs';
import * as text from '~/lib/text';
import * as time from '~/lib/time';
import * as def from '~/sys/def';
import * as types from '~/types';
// --- 自己 ---
import * as fd from './net/formdata';
import * as lRequest from './net/request';
import * as response from './net/response';

/** --- ca 根证书内容 --- */
let ca: string = '';

/** --- http 请求对象 --- */
const hcli = hc.createHttpClient();

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
export async function get(u: string, opt: types.INetOptions = {}): Promise<response.Response> {
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
    data: Record<string, any> | Buffer | string | stream.Readable,
    opt: types.INetOptions = {}
): Promise<response.Response> {
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
    data: any[] | Record<string, any>,
    opt: types.INetOptions = {}
): Promise<response.Response> {
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
    data?: Record<string, any> | Buffer | string | stream.Readable,
    opt: types.INetOptions = {}
): Promise<response.Response> {
    const uri = url.parse(u);
    // let isSsl: boolean = false;
    const method = opt.method ?? 'GET';
    const type = opt.type ?? 'form';
    const timeout = opt.timeout ?? 10;
    const follow = opt.follow ?? 0;
    const hosts = opt.hosts ?? {};
    const save = opt.save;
    const local = opt.local;
    const headers: Record<string, any> = {};
    if (opt.headers) {
        for (const key in opt.headers) {
            headers[key.toLowerCase()] = opt.headers[key];
        }
    }
    if (!headers['user-agent']) {
        headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36';
    }
    // --- DATA ---
    if (method === 'GET') {
        if (data && !(data instanceof stream.Readable) && !Buffer.isBuffer(data)) {
            u += '?' + (typeof data === 'string' ? data : text.queryStringify(data));
            data = undefined;
        }
    }
    else {
        // --- POST ---
        if (data && !(data instanceof stream.Readable) && !Buffer.isBuffer(data) && typeof data !== 'string') {
            if (type === 'form') {
                data = text.queryStringify(data);
                headers['content-type'] = 'application/x-www-form-urlencoded';
            }
            else {
                data = JSON.stringify(data);
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
    let tca: string | undefined = undefined;
    if (uri.protocol === 'https:') {
        // isSsl = true;
        if (ca === '') {
            tca = (await fs.getContent(def.LIB_PATH + 'net/cacert.pem', 'utf8')) ?? '';
            ca = tca;
        }
        else {
            tca = ca;
        }
    }
    // --- cookie 托管 ---
    if (opt.cookie) {
        headers['cookie'] = buildCookieQuery(opt.cookie, uri);
    }
    // --- 发起请求 ---
    let req: hc.IResponse;
    try {
        req = await hcli.request({
            'url': u,
            'method': method,
            'data': data,
            'headers': headers,
            'timeout': timeout * 1000,
            'localAddress': local,
            'ca': ca
        });
    }
    catch (err: any) {
        const res = new response.Response(null);
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
                fs.stats(save).then((stat) => {
                    total = stat?.size ?? 0;
                    resolve();
                }).catch(() => {
                    resolve();
                });
            }).on('error', function() {
                resolve();
            }).pipe(fs.createWriteStream(save));
        });
    }
    // --- 创建 Response 对象 ---
    const res = new response.Response(req);
    if (total) {
        res.setContent(total.toString());
    }
    res.headers = req.headers as types.THttpHeaders;
    res.headers.httpVersion = '';
    res.headers.httpCode = req.statusCode;
    res.headers.httpUrl = u;
    // --- 判断 follow 追踪 ---
    if (follow === 0) {
        return res;
    }
    if (!res.headers['location']) {
        return res;
    }
    // --- 哦，要追踪 ---
    headers['referer'] = u;
    return request(text.urlResolve(u, req.headers['location'] as string), data, {
        'method': method,
        'type': type,
        'timeout': timeout,
        'follow': follow - 1,
        'hosts': hosts,
        'save': save,
        'headers': headers
    });
}

/**
 * --- 根据 Set-Cookie 头部转换到 cookie 对象 ---
 * @param cookie cookie 对象
 * @param setCookies 头部的 set-cookie 数组
 * @param uri 请求的 URI 对象
 */
async function buildCookieObject(
    cookie: Record<string, types.INetCookie>,
    setCookies: string[],
    uri: url.UrlWithStringQuery
): Promise<void> {
    const tim = time.stamp();
    if (!uri.path) {
        uri.path = '/';
    }
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
            if (!text.isDomain(uri.hostname ?? '')) {
                continue;
            }
            const parseDomain: text.IDomain = await text.parseDomain(domainN);
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
            'secure': cookieTmp['secure'] !== undefined ? true : false
        };
    }
}

/**
 * --- 对象转换为 Cookie 拼接字符串（会自动筛掉不能发送的 cookie） ---
 * @param cookie cookie 对象
 * @param uri 请求的 URI 对象
 */
function buildCookieQuery(cookie: Record<string, types.INetCookie>, uri: url.UrlWithStringQuery): string {
    const tim = time.stamp();
    let cookieStr: string = '';
    for (const key in cookie) {
        const item: types.INetCookie = cookie[key];
        if ((item.exp < tim) && (item.exp !== -1992199400)) {
            delete cookie[key];
            continue;
        }
        if (!uri.path) {
            uri.path = '/';
        }
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
        return cookieStr.slice(0, -1);
    }
    else {
        return '';
    }
}

/**
 * --- 模拟重启浏览器后的状态 ---
 * @param cookie cookie 对象
 */
export function resetCookieSession(cookie: Record<string, types.INetCookie>): void {
    for (const key in cookie) {
        const item = cookie[key];
        if (item.exp === -1992199400000) {
            delete cookie[key];
        }
    }
}

/**
 * --- 创建 FormData 对象, Mutton: false, Kebab: true ---
 */
export function getFormData(): fd.FormData {
    return new fd.FormData();
}

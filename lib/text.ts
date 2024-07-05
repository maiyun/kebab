/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-15 16:49:39
 * Last: 2020-04-06 20:51:06, 2022-9-29 15:18:16, 2022-12-29 00:01:30, 2024-3-6 17:53:14, 2024-5-31 17:29:52
 */
import * as def from '~/sys/def';
import * as fs from './fs';
import * as types from '~/types';

/**
 * --- 将文件大小格式化为带单位的字符串 ---
 * @param size 文件大小
 * @param spliter 分隔符
 */
export function sizeFormat(size: number, spliter: string = ' '): string {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let i = 0;
    for (; i < 6 && size >= 1024.0; ++i) {
        size /= 1024.0;
    }
    return (Math.round(size * 100) / 100).toString() + spliter + units[i];
}

/**
 * --- 格式化一段 URL ---
 * @param url
 */
export function parseUrl(url: string): types.IUrlParse {
    // --- test: https://ab-3dc:aak9()$@github.com:80/nodejs/node/blob/master/lib/url.js?mail=abc@def.com#223 ---
    const rtn: types.IUrlParse = {
        'protocol': null,
        'auth': null,
        'user': null,
        'pass': null,
        'host': null,
        'hostname': null,
        'port': null,
        'pathname': '/',
        'path': null,
        'query': null,
        'hash': null
    };
    const hash = url.indexOf('#');
    if (hash > -1) {
        rtn['hash'] = url.slice(hash + 1);
        url = url.slice(0, hash);
    }
    const query = url.indexOf('?');
    if (query > -1) {
        rtn['query'] = url.slice(query + 1);
        url = url.slice(0, query);
    }
    const protocol = url.indexOf(':');
    if (protocol > -1) {
        rtn['protocol'] = url.slice(0, protocol + 1).toLowerCase();
        url = url.slice(protocol + 1);
        if (url.startsWith('//')) {
            url = url.slice(2);
        }
        let path = url.indexOf('/');
        if (path === -1) {
            path = url.indexOf('\\');
        }
        if (path > -1) {
            rtn['pathname'] = url.slice(path);
            url = url.slice(0, path);
        }
        const auth = url.indexOf('@');
        if (auth > -1) {
            const authStr = url.slice(0, auth);
            const authSplit = authStr.indexOf(':');
            if (authSplit > -1) {
                // --- 有密码 ---
                rtn['user'] = authStr.slice(0, authSplit);
                rtn['pass'] = authStr.slice(authSplit + 1);
                rtn['auth'] = rtn['user'] + ':' + rtn['pass'];
            }
            else {
                rtn['user'] = authStr;
                rtn['auth'] = authStr;
            }
            url = url.slice(auth + 1);
        }
        if (url) {
            const port = url.indexOf(':');
            if (port > -1) {
                rtn['hostname'] = url.slice(0, port).toLowerCase();
                rtn['port'] = url.slice(port + 1);
                rtn['host'] = rtn['hostname'] + (rtn['port'] ? ':' + rtn['port'] : '');
            }
            else {
                rtn['hostname'] = url.toLowerCase();
                rtn['host'] = rtn['hostname'];
            }
        }
    }
    else {
        // --- 没有 protocol ---
        rtn['pathname'] = url;
    }
    // --- 组合 ---
    rtn['path'] = rtn['pathname'] + (rtn['query'] ? '?' + rtn['query'] : '');
    return rtn;
}

/**
 * --- 将相对路径根据基准路径进行转换 ---
 * @param from 基准路径
 * @param to 相对路径
 */
export function urlResolve(from: string, to: string): string {
    from = from.replace('\\', '/');
    to = to.replace('\\', '/');
    // --- to 为空，直接返回 form ---
    if (to === '') {
        return urlAtom(from);
    }
    // --- 获取 from 的 scheme, host, path ---
    const f = parseUrl(from);
    // --- 以 // 开头的，加上 from 的 protocol 返回 ---
    if (to.startsWith('//')) {
        return urlAtom(f.protocol ? f.protocol + to : to);
    }
    if (f.protocol) {
        // --- 获取小写的 protocol ---
        from = f.protocol + from.slice(f.protocol.length);
    }
    // --- 获取 to 的 scheme, host, path ---
    const t = parseUrl(to);
    // --- 已经是绝对路径，直接返回 ---
    if (t.protocol) {
        // --- 获取小写的 protocol ---
        return urlAtom(t.protocol + to.slice(t.protocol.length));
    }
    // --- # 或 ? 替换后返回 ---
    if (to.startsWith('#') || to.startsWith('?')) {
        const sp = from.indexOf(to[0]);
        if (sp !== -1) {
            return urlAtom(from.slice(0, sp) + to);
        }
        else {
            return urlAtom(from + to);
        }
    }
    // --- 处理后面的尾随路径 ---
    let abs = (f.auth ? f.auth + '@' : '') + (f.host ? f.host : '');
    if (to.startsWith('/')) {
        // -- abs 类似是 /xx/xx ---
        abs += to;
    }
    else {
        // --- to 是 xx/xx 这样的 ---
        // --- 移除基准 path 不是路径的部分，如 /ab/c 变成了 /ab，/ab 变成了 空 ---
        const path = f.pathname.replace(/\/[^/]*$/g, '');
        // --- abs 是 /xx/xx 了，因为如果 path 是空，则跟上了 /，如果 path 不为空，也是 / 开头 ---
        abs += path + '/' + to;
    }
    // --- 返回最终结果 ---
    if (f.protocol && (f.protocol !== 'file:') && !f.host) {
        // --- 类似 c:/ ---
        return urlAtom(f.protocol + abs);
    }
    else {
        // --- 类似 http:// ---
        return urlAtom((f.protocol ? f.protocol + '//' : '') + abs);
    }
}

/**
 * --- 将路径中的 ../ ./ 都按规范妥善处理 ---
 * @param url 要处理的地址
 */
export function urlAtom(url: string): string {
    // --- 删掉 ./ ---
    while (url.includes('/./')) {
        url = url.replace(/\/\.\//g, '/');
    }
    // --- 删掉 ../ ---
    while (/\/(?!\.\.)[^/]+\/\.\.\//.test(url)) {
        url = url.replace(/\/(?!\.\.)[^/]+\/\.\.\//g, '/');
    }
    url = url.replace(/\.\.\//g, '');
    return url;
}

/**
 * --- 是否是邮件地址 ---
 * @param email
 */
export function isEMail(email: string): boolean {
    return /^[-_\w.]+@[-_\w.]+\.([a-zA-Z]+)$/i.test(email);
}

/**
 * --- 是否是 IPv4 ---
 * @param ip
 */
export function isIPv4(ip: string): boolean {
    return /^[0-9]{1,3}(\.[0-9]{1,3}){3}$/.test(ip);
}

/**
 * --- 是否是 IPv6 ---
 * @param ip
 */
export function isIPv6(ip: string): boolean {
    return /^(\w*?:){2,7}[\w.]*$/.test(ip + ':');
}

/**
 * --- 判断是否是域名 ---
 * @param string $domain
 * @return bool
 */
export function isDomain(domain: string): boolean {
    return /^.+?\.((?![0-9]).)+$/i.test(domain);
}

/**
 * --- 换行替换为别的 ---
 * @param str 要替换的字符串
 * @param to 换行替换符
 */
export function nlReplace(str: string, to: string = '\n'): string {
    str = str.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (to !== '\n') {
        str = str.replace(/\n/g, to);
    }
    return str;
}

/** Tld 列表 */
let tldList: string[];

/** 解析后的 domain */
export interface IDomain {
    tld: string | null;
    sld: string | null;
    domain: string | null;
    sub: string | null;
}

/**
 * --- 解析域名并获取 tld/sld/domain/sub ---
 * @param domain 域名
 */
export async function parseDomain(domain: string): Promise<IDomain> {
    const rtn: IDomain = {
        tld: null,
        sld: null,
        domain: null,
        sub: null
    };
    if (!isDomain(domain)) {
        return rtn;
    }
    const arr = domain.split('.');
    if (arr.length === 1) {
        rtn.tld = arr[0].toLowerCase();
        rtn.domain = rtn.tld;
    }
    else {
        if (!tldList) {
            tldList = JSON.parse(await fs.getContent(def.LIB_PATH + 'text/tld.json', 'utf8') ?? '[]');
        }
        const last2 = (arr[arr.length - 2] + '.' + arr[arr.length - 1]).toLowerCase();
        if (tldList.includes(last2)) {
            // --- last2 就是 tld ---
            rtn.tld = last2;
            if (arr.length === 2) {
                // --- 没有 sld ---
                rtn.domain = last2;
                return rtn;
            }
            rtn.sld = arr[arr.length - 3].toLowerCase();
            rtn.domain = rtn.sld + '.' + rtn.tld;
            // --- 判断是否有 sub ---
            if (arr.length === 3) {
                return rtn;
            }
            arr.splice(-3);
            rtn.sub = arr.join('.').toLowerCase();
        }
        else {
            rtn.tld = arr[arr.length - 1].toLowerCase();
            rtn.sld = arr[arr.length - 2].toLowerCase();
            rtn.domain = rtn.sld + '.' + rtn.tld;
            // --- 判断是否有 sub ---
            if (arr.length === 2) {
                return rtn;
            }
            arr.splice(-2);
            rtn.sub = arr.join('.').toLowerCase();
        }
    }
    return rtn;
}

/**
 * --- 传入正则进行匹配 str 是否有一项满足 ---
 * @param str 要检测的字符串
 * @param regs 正则列表
 */
export function match(str: string, regs: RegExp[]): boolean {
    for (const reg of regs) {
        if (reg.test(str)) {
            return true;
        }
    }
    return false;
}

// --- 以下是适用于中国大陆的方法 ---

/**
 * --- 判断手机号是否是 11 位，不做真实性校验 ---
 * @param p 手机号
 */
export function isPhoneCN(p: string): boolean {
    return /^1[0-9]{10}$/.test(p);
}

/**
 * --- 是否是中国大陆身份证号码 ---
 * @param idcard 身份证号
 */
export function isIdCardCN(idcard: string): boolean {
    if (idcard.length !== 18) {
        return false;
    }
    // --- 取出本码 ---
    const idcardBase = idcard.slice(0, 17);
    // --- 取出校验码 ---
    const verifyCode = idcard.slice(17, 18);
    // --- 加权因子 ---
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // --- 校验码对应值 ---
    const verifyCodeList = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    // --- 根据前17位计算校验码 ---
    let total = BigInt(0);
    for (let i = 0; i < 17; i++) {
        total += BigInt(idcardBase.slice(i, i + 1)) * BigInt(factor[i]);
    }
    // --- 取模 ---
    const mod = total % BigInt(11);
    // --- 比较校验码 ---
    if (verifyCode === verifyCodeList[Number(mod)]) {
        return true;
    }
    else {
        return false;
    }
}

// --- 以下 Mutton: false, Kebab: true ---

/**
 * --- 将对象转换为 query string ---
 * @param query 要转换的对象
 */
export function queryStringify(query: Record<string, any>): string {
    return Object.entries(query).map(([k, v]) => {
        if (Array.isArray(v)) {
            return v.map((i) => `${encodeURIComponent(k)}=${encodeURIComponent(`${i}`)}`).join('&');
        }
        return `${encodeURIComponent(k)}=${encodeURIComponent(`${v}`)}`;
    }).join('&');
}

/**
 * --- 将 query string 转换为对象 ---
 * @param query 要转换的字符串
 */
export function queryParse(query: string): Record<string, string | string[]> {
    const ret: Record<string, string | string[]> = {};
    const arrayKeys: Record<string, boolean> = {};
    const arr = query.split('&');
    for (const i of arr) {
        if (!i.length) {
            continue;
        }
        const pos = i.indexOf('=');

        const key = decodeURIComponent(pos === -1 ? i : i.slice(0, pos));
        let value = '';
        try {
            value = pos === -1 ? '' : decodeURIComponent(i.slice(pos + 1));
        }
        catch {
            value = pos === -1 ? '' : i.slice(pos + 1);
        }

        if (arrayKeys[key]) {
            (ret[key] as string[]).push(value);
        }
        else if (undefined === ret[key]) {
            ret[key] = value;
        }
        else {
            ret[key] = [ret[key] as string, value];
            arrayKeys[key] = true;
        }
    }
    return ret;
}

/**
 * --- HTML 特殊字符转换为实体字符 ---
 * @param html 待转换的 HTML
 */
export function htmlescape(html: string): string {
    const type = typeof html;
    if (type !== 'string') {
        return '[' + type + ']';
    }
    return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');
}

/**
 * --- 判断是否是绝对路径，是返回 true，相对路径返回 false ---
 * @param path 要判断的路径字符串
 */
export function isRealPath(path: string): boolean {
    path = path.replace(/\\/g, '/');
    if (path.startsWith('/')) {
        return true;
    }
    return /[a-z]+:/i.test(path.split('/')[0]) ? true : false;
}

/**
 * --- 获取文件名 ---
 * @param path 文件路径
 */
export function getFilename(path: string): string {
    path = path.replace(/\\/g, '/');
    const lio = path.lastIndexOf('/');
    if (lio === -1) {
        return path;
    }
    return path.slice(lio + 1);
}

/**
 * --- 将普通的返回 JSON 对象序列化为字符串，Mutton 不能使用 ---
 * @param o 返回 JSON 对象
 */
export function stringifyResult(rtn: types.Json): string {
    if (Array.isArray(rtn)) {
        // --- [0, 'xxx'] 模式 ---
        if (rtn.length === 0) {
            return JSON.stringify({
                'result': 0,
                'msg': 'ERROR'
            });
        }
        if (typeof rtn[0] === 'number') {
            // --- 1. ---
            const json: Record<string, types.Json> = { 'result': rtn[0] };
            if (rtn[1] !== undefined) {
                if (typeof rtn[1] === 'object') {
                    // --- [0, ...{'xx': 'xx'}] ---
                    for (let i = 1; i < rtn.length; ++i) {
                        Object.assign(json, rtn[i]);
                    }
                }
                else {
                    // --- [0, 'xxx'], [0, 'xxx', ...{'xx': 'xx'}] ---
                    json['msg'] = rtn[1];
                    for (let i = 2; i < rtn.length; ++i) {
                        Object.assign(json, rtn[i]);
                    }
                }
            }
            return JSON.stringify(json);
        }
        // --- 直接是个 json 对象 ---
        return JSON.stringify(rtn);
    }
    // --- 直接是个 json 对象 ---
    return JSON.stringify(rtn);
}

/**
 * --- 将字符串解析为对象，返回 false 代表解析失败，支持 BigInt，Kebab true, Mutton false ---
 * @param str 要解析的 json 字符串
 */
export function parseJson(str: string): any {
    try {
        str = str.replace(/("[\w-]+?" *: *)([-+0-9]+)([ \r\n]*[,}]|$)/g, (v, v1, v2, v3) => {
            return v1 + '"-mybigint-' + v2 + '"' + v3;
        });
        return JSON.parse(str, (k, v) => {
            if (typeof v !== 'string') {
                return v;
            }
            if (!v.startsWith('-mybigint-')) {
                return v;
            }
            const ints = v.slice(10);
            const int = parseInt(ints);
            if (int <= Number.MAX_SAFE_INTEGER) {
                return int;
            }
            return BigInt(ints);
        });
    }
    catch {
        return false;
    }
}

/**
 * --- 将对象转换为 json 字符串，返回 false 代表解析失败，支持 BigInt，Kebab true, Mutton false ---
 * @param obj 要转换的 json 对象
 */
export function stringifyJson(obj: types.Json): string {
    return JSON.stringify(obj, (k, v) => {
        if (typeof v === 'bigint') {
            return '-mybigint-' + v.toString();
        }
        return v;
    }).replace(/"-mybigint-([-+0-9]+?)"/g, '$1');
}

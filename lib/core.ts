/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-3 23:54
 * Last: 2020-4-11 22:34:58, 2022-10-2 14:13:06, 2022-12-28 20:33:24, 2023-12-15 11:49:02, 2024-7-2 15:23:35, 2025-6-13 19:45:53
 */
import * as cp from 'child_process';
import * as http from 'http';
import * as http2 from 'http2';
import * as stream from 'stream';
import * as os from 'os';
import * as kebab from '#kebab/index.js';
import * as lTime from '#kebab/lib/time.js';
import * as lFs from '#kebab/lib/fs.js';
import * as lText from '#kebab/lib/text.js';
import * as lNet from '#kebab/lib/net.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as lResponse from '#kebab/lib/net/response.js';
import * as sCtr from '#kebab/sys/ctr.js';

/** --- 全局参数 --- */
export const globalConfig: kebab.IConfig & {
    'httpPort': number;
    'httpsPort': number;
    'rpcPort': number;
    'rpcSecret': string;
    'debug': boolean;
    'max': number;
    'hosts': string[];
    'ind': string[];
} = {} as kebab.Json;

/** --- Cookie 设置的选项 --- */
export interface ICookieOptions {
    'ttl'?: number;
    'path'?: string;
    'domain'?: string;
    'ssl'?: boolean;
    'httponly'?: boolean;
    'samesite'?: 'None' | 'Lax' | 'Strict';
}

/**
 * --- 设置 cookie ---
 * @param ctr ctr 实例
 * @param name 名
 * @param value 值
 * @param opt 选项，ttl, 默认和 undefined 为关闭浏览器失效
 */
export function setCookie(ctr: sCtr.Ctr, name: string, value: string, opt: ICookieOptions = {}): void {
    const res = ctr.getPrototype('_res');
    if (!res) {
        return;
    }

    /*
    const expires =  lTime.get(ctr, {
        'data': lTime.stamp() + ttl
    }).toUTCString();
    */
    const maxAge = opt.ttl === undefined ? '' : `; Max-Age=${opt.ttl}`;
    const path = `; path=${opt.path ?? '/'}`;
    const domain = opt.domain ? `; domain=${opt.domain}` : '';
    const secure = opt.ssl ? '; secure' : '';
    const httpOnly = opt.httponly ? '; HttpOnly' : '';
    const sameSite = opt.samesite ? '; SameSite=' + opt.samesite : '';
    const cookies: string[] = res.getHeader('set-cookie') as string[] | undefined ?? [];
    // cookies.push(`${name}=${encodeURIComponent(value)}; expires=${expires}; Max-Age=${ttl}${path}${domain}${secure}${httpOnly}`);
    cookies.push(`${name}=${encodeURIComponent(value)}${maxAge}${path}${domain}${secure}${httpOnly}${sameSite}`);
    res.setHeader('set-cookie', cookies);
}

/**
 * --- 生成基础的范围随机数 ---
 * @param min >= 最小值
 * @param max <= 最大值
 * @param prec 保留几位小数
 */
export function rand(min: number, max: number, prec: number = 0): number {
    if (prec < 0) {
        prec = 0;
    }
    const p = Math.pow(10, prec);
    min = min * p;
    max = max * p;
    return Math.round(Math.random() * (max - min) + min) / p;
}

// --- 随机 ---
export const RANDOM_N = '0123456789';
export const RANDOM_U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const RANDOM_L = 'abcdefghijklmnopqrstuvwxyz';

export const RANDOM_UN = RANDOM_U + RANDOM_N;
export const RANDOM_LN = RANDOM_L + RANDOM_N;
export const RANDOM_LU = RANDOM_L + RANDOM_U;
export const RANDOM_LUN = RANDOM_L + RANDOM_U + RANDOM_N;
export const RANDOM_V = 'ACEFGHJKLMNPRSTWXY34567';
export const RANDOM_LUNS = RANDOM_LUN + '()`~!@#$%^&*-+=_|{}[]:;"<>,.?/]"';

/**
 * --- 生成随机字符串 ---
 * @param length 长度
 * @param source 采样值
 * @param block 排除的字符
 */
export function random(length: number = 8, source: string = RANDOM_LN, block: string = ''): string {
    // --- 剔除 block 字符 ---
    let len = block.length;
    if (len > 0) {
        for (let i = 0; i < len; ++i) {
            source = source.replace(block[i], '');
        }
    }
    len = source.length;
    if (len === 0) {
        return '';
    }
    let temp = '';
    for (let i = 0; i < length; ++i) {
        temp += source[rand(0, len - 1)];
    }
    return temp;
}

export const CONVERT62_CHAR = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * --- 将 10 进制转换为 62 进制 ---
 * @param n 10 进制数字最大 9223372036854775807n
 */
export function convert62(n: bigint | number | string): string {
    if (typeof n !== 'bigint') {
        n = BigInt(n);
    }
    let res = '';
    while (n > 0) {
        res = CONVERT62_CHAR[Number(n % 62n)] + res;
        n = n / 62n;
    }
    return res;
}

/**
 * --- 将 62 进制转换为 10 进制 ---
 * @param n 62 进制数字最大 aZl8N0y58M7
 */
export function unconvert62(n: string): bigint {
    let res = 0n;
    const nl = n.length;
    for (let i = 1; i <= nl; ++i) {
        res += BigInt(CONVERT62_CHAR.indexOf(n[i - 1])) * (62n ** BigInt(nl - i));
    }
    return res;
}

/**
 * --- 去除 html 的空白符、换行以及注释 ---
 * @param text 要纯净的字符串
 */
export function purify(text: string): string {
    text = '>' + text + '<';
    const keepScripts: string[] = [];
    const keepPres: string[] = [];
    let nums: number = -1;
    let nump: number = -1;
    text = text.replace(/<!--([\s\S]*?)-->/g, '').replace(/<script[\s\S]+?<\/script>/g, function(t: string): string {
        keepScripts.push(t);
        return '[SCRIPT]';
    }).replace(/<pre[\s\S]+?<\/pre>/g, function(t: string): string {
        keepPres.push(t);
        return '[PRE]';
    }).replace(/>([\s\S]*?)</g, function(t: string, t1: string): string {
        return '>' + t1.replace(/\t|\r\n| {2}/g, '').replace(/\n|\r/g, '') + '<';
    }).replace(/\[SCRIPT\]/g, function(): string {
        ++nums;
        return keepScripts[nums];
    }).replace(/\[PRE\]/g, function(): string {
        ++nump;
        return keepPres[nump];
    });
    return text.slice(1, -1);
}

/**
 * --- 判断一个对象是否符合示例组，返回空字符串代表校验通过，返回：应该的类型:位置:传入的类型 ---
 * @param val 对象
 * @param type 示例组
 * @param tree 当前树，无需传入
 */
export function checkType(val: any, type: any, tree: string = 'root'): string {
    /** --- 要校验的对象类型 --- */
    const vtype = typeof val;
    if (Array.isArray(type)) {
        // --- 数组的话 ---
        if (!Array.isArray(val)) {
            return 'array:' + tree + ':' + vtype;
        }
        for (let i = 0; i < val.length; ++i) {
            const res = checkType(val[i], type[0], tree + '.' + i.toString());
            if (res) {
                return res;
            }
        }
        return '';
    }
    /** --- 要符合的类型 --- */
    const ttype = typeof type;
    if (type instanceof RegExp) {
        // --- 正则 ---
        if (vtype !== 'string') {
            return 'regexp:' + tree + ':' + vtype;
        }
        return type.test(val) ? '' : 'regexp:' + tree + ':' + vtype;
    }
    if (ttype === 'string') {
        // --- 示例组在是字符串的前提下，判断是否是必填项 ---
        if (vtype !== 'string' && val !== undefined && val !== null) {
            // --- 用户值不是字符串，也不是未填，那直接失败 ---
            return 'string:' + tree + ':' + vtype;
        }
        // --- 是字符串 或 undefined 或 null ---
        if (type) {
            // --- 示例组有值，必然必填 ---
            return val ?
                '' :    // --- 有值，直接成功 ---
                'string:' + tree + ':' + vtype;
        }
        // --- 示例组无值，用户值有没有值都成功 ---
        return '';
    }
    if (val === undefined || val === null) {
        return ttype + ':' + tree + ':' + (val === undefined ? 'undefined' : 'null');
    }
    if (ttype === 'object') {
        if (vtype !== 'object') {
            return 'object:' + tree + ':' + vtype;
        }
        if (Array.isArray(val)) {
            return 'object:' + tree + ':array';
        }
        if (!Object.keys(type).length) {
            return '';
        }
        // --- 先判断每个值是否相等 ---
        for (const key in type) {
            // --- 先判断是否是可选值 ---
            /** --- 示例组的 key 可能是 x? --- */
            let k = key;
            if (key.endsWith('?')) {
                k = key.slice(0, -1);
                if (val[k] === undefined || val[k] === null) {
                    // --- 示例允许为空且用户值为空，则跳过 ---
                    continue;
                }
            }
            const res = checkType(val[k], type[key], tree + '.' + k);
            if (res) {
                return res;
            }
        }
        // --- 再判断是否传了类型限定中没有的值 ---
        for (const key in val) {
            if (type[key] !== undefined || type[key + '?'] !== undefined) {
                continue;
            }
            return `undefined:${tree}.${key}:${typeof val[key]}`;
        }
        return '';
    }
    return vtype === ttype ? '' : ttype + ':' + tree + ':' + vtype;
}

/**
 * --- 获取 MUID ---
 * @param ctr Ctr 对象
 * @param opt len: 8 - 32, 默认 8; bin: 是否含有大小写, 默认 true; key: 多样性混合, 默认空; insert: 插入指定字符, 最好不超过 2 字符，默认空，num: 是否含有数字，默认 true
 */
export function muid(ctr: sCtr.Ctr, opt: {
    'len'?: number;
    'bin'?: boolean;
    'key'?: string;
    'insert'?: string;
    'num'?: boolean;
} = {}): string {
    const len = opt.len ?? 8;
    const bin = opt.bin ?? true;
    const key = opt.key ?? '';
    const insert = opt.insert ?? '';
    const ilen = insert.length;
    const num = opt.num ?? true;

    const headers = ctr.getPrototype('_headers');
    const req = ctr.getPrototype('_req');
    const char = lCrypto.hashHmac('sha1', (headers['user-agent'] ?? '') +
    (headers['referer'] ?? '') +
    (headers['accept-language'] ?? '') +
    (req.socket.remoteAddress ?? '') +
    ((headers['x-forwarded-for'] as string | undefined) ?? '') +
    ((headers['cf-connecting-ip'] as string | undefined) ?? '') + 'muid' + key + rand(0, 1000000000).toString(), 'muid');
    if (!char) {
        return '';
    }

    // --- 生成随机数 ---
    const over = random(len - 1 - ilen, bin ? (num ? RANDOM_LUN : RANDOM_LU) : (num ? RANDOM_LN : RANDOM_L)) + char[20];
    return over[0] + insert + over.slice(1);
}

/**
 * --- 获取 IP（非安全 IP）---
 * @param ctr
 */
export function ip(
    ctr: sCtr.Ctr | http.IncomingHttpHeaders,
    req?: http2.Http2ServerRequest | http.IncomingMessage
): string {
    const headers: http.IncomingHttpHeaders = ctr instanceof sCtr.Ctr ? ctr.getPrototype('_headers') : ctr;
    if (typeof headers['cf-connecting-ip'] === 'string') {
        return headers['cf-connecting-ip'];
    }
    else if (typeof headers['x-forwarded-for'] === 'string') {
        return headers['x-forwarded-for'];
    }
    else {
        if (!req) {
            if (ctr instanceof sCtr.Ctr) {
                req = ctr.getPrototype('_req');
            }
            else {
                return '';
            }
        }
        return req.socket.remoteAddress ?? '';
    }
}

export const REAL_IP_X = 'x-forwarded-for';
export const REAL_IP_CF = 'cf-connecting-ip';

/**
 * --- 获取直连 IP（安全 IP） ---
 * @param ctr
 * @param name 输入安全的 header
 */
export function realIP(ctr: sCtr.Ctr, name: string = ''): string {
    const headers: http.IncomingHttpHeaders = ctr.getPrototype('_headers');
    if (name !== '') {
        const value = headers[name];
        if (typeof value === 'string') {
            return value;
        }
    }
    const req: http2.Http2ServerRequest | http.IncomingMessage = ctr.getPrototype('_req');
    return req.socket.remoteAddress ?? '';
}

/**
 * --- 间隔一段时间 ---
 * @param ms 间隔毫秒
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, ms);
    });
}

/**
 * --- 将对象进行升序排列 ---
 * @param o 要重排的对象
 */
export function objectSort<T extends Record<string, any>>(o: T): T {
    const ordered: kebab.Json = {};
    const list = Object.keys(o).sort();
    for (const key of list) {
        if ((typeof o[key] === 'object') && (!Array.isArray(o[key]))) {
            ordered[key] = objectSort(o[key]);
        }
        else {
            ordered[key] = o[key];
        }
    }
    return ordered;
}

/**
 * --- 将对象的所有属性清除包括键，不会破坏引用关系，对象变量依然保证是引用状态 ---
 * @param obj 要清除的对象
 * @patam deep 也将子项都清空，如果子项有独立引用的话也要清空的话则要设置为 true
 */
export function emptyObject(obj: Record<string, kebab.Json>, deep: boolean = false): void {
    const keys = Object.keys(obj);
    for (const key of keys) {
        if (deep) {
            const value = obj[key];
            if (typeof value === 'object') {
                emptyObject(value);
            }
        }
        delete obj[key];
    }
}

/**
 * --- 调用前自行创建 passThrough，并且调用 pipe 绑定到应该绑定的对象，然后再调用本函数 ---
 * @param passThrough passThrough 对象
 * @param data 数组
 * @param end 是否关闭写入，默认是，关闭后 passThrough 不能被写入，但仍然可读
 */
export async function passThroughAppend(
    passThrough: stream.PassThrough,
    data: Array<stream.Readable | lResponse.Response | string | Buffer>,
    end: boolean = true
): Promise<void> {
    for (const item of data) {
        if (item instanceof stream.Readable || item instanceof lResponse.Response) {
            const stm = item instanceof stream.Readable ? item : item.getStream();
            if (!stm) {
                continue;
            }
            // --- 读取流、Net 库 Response 对象 ---
            stm.pipe(passThrough, {
                'end': false
            });
            await new Promise<void>((resolve) => {
                stm.on('end', () => {
                    resolve();
                });
            });
        }
        else {
            // --- 字符串、Buffer ---
            await new Promise<void>((resolve) => {
                passThrough.write(item, () => {
                    resolve();
                });
            });
        }
    }
    if (end) {
        passThrough.end();
    }
}

/**
 * --- 执行命令行 ---
 * @param command 命令字符串
 */
export function exec(command: string): Promise<string | false> {
    return new Promise(function(resolve) {
        cp.exec(command, function(err, stdout) {
            if (err) {
                resolve(false);
                return;
            }
            resolve(stdout);
        });
    });
}

/**
 * --- 向主进程（或局域网同代码机子）发送广播将进行 reload 操作，等待回传 ---
 * --- 主要作用除代码热更新以外的其他情况 ---
 */
export async function sendReload(hosts?: string[] | 'config'): Promise<string[]> {
    if (!hosts) {
        // --- 本地模式 ---
        // eslint-disable-next-line no-console
        console.log('[ Child] Sending reload request...');
        process.send!({
            'action': 'reload'
        });
        return [];
    }
    if (hosts === 'config') {
        hosts = globalConfig.hosts;
    }
    // --- 局域网模式 ---
    const time = lTime.stamp();
    /** --- 返回成功的 host --- */
    const rtn: string[] = [];
    for (const host of hosts) {
        const res = await lNet.get('http://' + host + ':' + globalConfig.rpcPort.toString() + '/' + lCrypto.aesEncrypt(lText.stringifyJson({
            'action': 'reload',
            'time': time
        }), globalConfig.rpcSecret), {
            'timeout': 2
        });
        const content = await res.getContent();
        if (!content) {
            continue;
        }
        const str = content.toString();
        if (str === 'Done') {
            rtn.push(host);
        }
    }
    return rtn;
}

/**
 * --- 向主进程（或局域网同代码机子）发送广播将进行 restart 操作，停止监听并启动新进程，老进程在连接全部断开后自行销毁 ---
 * --- 主要用作不间断的代码热更新 ---
 */
export async function sendRestart(hosts?: string[] | 'config'): Promise<string[]> {
    if (!hosts) {
        // --- 本地模式 ---
        // eslint-disable-next-line no-console
        console.log('[ Child] Sending restart request...');
        process.send!({
            'action': 'restart'
        });
        return [];
    }
    if (hosts === 'config') {
        hosts = globalConfig.hosts;
    }
    // --- 局域网模式 ---
    const time = lTime.stamp();
    /** --- 返回成功的 host --- */
    const rtn: string[] = [];
    for (const host of hosts) {
        const res = await lNet.get('http://' + host + ':' + globalConfig.rpcPort.toString() + '/' + lCrypto.aesEncrypt(lText.stringifyJson({
            'action': 'restart',
            'time': time
        }), globalConfig.rpcSecret), {
            'timeout': 2
        });
        const content = await res.getContent();
        if (!content) {
            continue;
        }
        const str = content.toString();
        if (str === 'Done') {
            rtn.push(host);
        }
    }
    return rtn;
}

/** --- 跨进程全局变量 --- */
export const global: Record<string, any> = {};

/**
 * --- 设置跨线程/跨内网服务器的全局变量 ---
 * @param key 变量名
 * @param data 变量值
 * @param hosts 局域网列表
 */
export async function setGlobal(key: string, data: kebab.Json, hosts?: string[] | 'config'): Promise<string[]> {
    if (!hosts) {
        // --- 本地模式 ---
        process.send!({
            'action': 'global',
            'key': key,
            'data': data
        });
        return [];
    }
    if (hosts === 'config') {
        hosts = globalConfig.hosts;
    }
    // --- 局域网模式 ---
    const time = lTime.stamp();
    /** --- 返回成功的 host --- */
    const rtn: string[] = [];
    for (const host of hosts) {
        const res = await lNet.get('http://' + host + ':' + globalConfig.rpcPort.toString() + '/' + lCrypto.aesEncrypt(lText.stringifyJson({
            'action': 'global',
            'time': time
        }), globalConfig.rpcSecret), {
            'timeout': 2
        });
        const content = await res.getContent();
        if (!content) {
            continue;
        }
        const str = content.toString();
        if (str === 'Done') {
            rtn.push(host);
        }
    }
    return rtn;
}

/**
 * --- 移除某个跨线程/跨内网服务器全局变量 ---
 * @param key 变量名
 * @param hosts 局域网列表
 */
export async function removeGlobal(key: string, hosts?: string[]): Promise<string[]> {
    return setGlobal(key, null, hosts);
}

/**
 * --- 上传并覆盖代码文件，config.json、kebab.json、.js.map、.ts, .gitignore 不会被覆盖和新建 ---
 * @param sourcePath zip 文件
 * @param path 要覆盖到的路径，无所谓是否 / 开头 / 结尾，是对方 kebab 的根据路开始算起
 * @param hosts 局域网多机部署，不设置默认本机部署
 * @param config 是否自动更新 config 的 set.staticVer 为最新，默认更新
 * @param strict 严格模式，只有存在的文件才会被覆盖，不存在则中途直接报错，默认为 true
 */
export async function updateCode(
    sourcePath: string, path: string, hosts?: string[] | 'config', config: boolean = true,
    strict: boolean = true
): Promise<Record<string, {
        'result': boolean;
        'return': string;
    }>> {
    if (hosts === 'config') {
        hosts = globalConfig.hosts;
    }
    hosts ??= ['127.0.0.1'];
    /** --- 返回成功的 host --- */
    const rtn: Record<string, {
        'result': boolean;
        'return': string;
    }> = {};
    for (const host of hosts) {
        const fd = lNet.getFormData();
        if (!await fd.putFile('file', sourcePath)) {
            continue;
        }
        fd.putString('path', path);
        fd.putString('config', config ? '1' : '0');
        fd.putString('strict', strict ? '1' : '0');
        const res = await lNet.post('http://' + host + ':' + globalConfig.rpcPort.toString() + '/' + lCrypto.aesEncrypt(lText.stringifyJson({
            'action': 'code',
            'time': lTime.stamp()
        }), globalConfig.rpcSecret), fd, {
            'timeout': 4
        });
        const content = await res.getContent();
        if (!content) {
            rtn[host] = {
                'result': false,
                'return': 'Network error'
            };
            continue;
        }
        const str = content.toString();
        rtn[host] = {
            'result': str === 'Done' ? true : false,
            'return': str
        };
    }
    return rtn;
}

/** --- log 设置的选项 --- */
export interface ILogOptions {
    'path'?: string;
    'urlFull'?: string;
    'hostname'?: string;
    'req'?: http2.Http2ServerRequest | http.IncomingMessage | null;
    'get'?: Record<string, kebab.Json>;
    'cookie'?: Record<string, string>;
    'jwt'?: Record<string, any>;
    'session'?: Record<string, any>;
    'headers'?: http.IncomingHttpHeaders;
}

/**
 * --- 写入文件日志 ---
 * @param msg 自定义内容
 * @param fend 文件名追加
 * @param opt 选项
 */
export function log(opt: sCtr.Ctr | ILogOptions, msg: string, fend: string = ''): void {
    (async () => {
        let req: http2.Http2ServerRequest | http.IncomingMessage | null;
        let headers: http.IncomingHttpHeaders;
        let get: Record<string, kebab.Json>;
        let cookie: Record<string, string>;
        let jwt: Record<string, any>;
        let session: Record<string, any>;
        let wpath: string;
        let urlFull: string;
        let hostname: string;
        if (opt instanceof sCtr.Ctr) {
            req = opt.getPrototype('_req');
            headers = opt.getPrototype('_headers');
            get = opt.getPrototype('_get');
            cookie = opt.getPrototype('_cookie');
            jwt = opt.getPrototype('_jwt');
            session = opt.getPrototype('_session');
            const config = opt.getPrototype('_config');
            wpath = config.const.path;
            urlFull = config.const.urlFull;
            hostname = config.const.hostname;
        }
        else {
            req = opt.req ?? null;
            headers = opt.headers ?? {};
            get = opt.get ?? {};
            cookie = opt.cookie ?? {};
            jwt = opt.jwt ?? {};
            session = opt.session ?? {};
            wpath = opt.path ?? '';
            urlFull = opt.urlFull ?? '';
            hostname = opt.hostname ?? '';
        }
        if (hostname === '') {
            hostname = 'system';
        }

        const realIp = req?.socket.remoteAddress ?? '';
        const clientIp = req ? ip(headers, req) : '';

        const [y, m, d, h] = lTime.format(null, 'Y-m-d-H').split('-');
        let path = kebab.LOG_CWD + hostname + fend + '/' + y + '/' + m + '/' + d + '/';
        const rtn = await lFs.mkdir(path, 0o777);
        if (!rtn) {
            return;
        }
        path += h + '.csv';
        if (!await lFs.isFile(path)) {
            if (!await lFs.putContent(path, 'TIME,UNIX,URL,COOKIE,SESSION,JWT,USER_AGENT,REALIP,CLIENTIP,OS,PROCESS,MESSAGE\n', {
                'encoding': 'utf8',
                'mode': 0o777
            })) {
                return;
            }
        }
        await lFs.putContent(path, '"' +
            lTime.format(null, 'H:i:s') + '","' +
            lTime.stamp().toString() + '","' +
            urlFull + wpath + (Object.keys(get).length ? '?' + lText.queryStringify(get).replace(/"/g, '""') : '') + '","' +
            lText.queryStringify(cookie).replace(/"/g, '""') + '","' +
            lText.stringifyJson(jwt).replace(/"/g, '""') + '","' +
            lText.stringifyJson(session).replace(/"/g, '""') + '","' +
            (headers['user-agent']?.replace(/"/g, '""') ?? 'No HTTP_USER_AGENT') + '","' +
            realIp.replace(/"/g, '""') + '","' +
            clientIp.replace(/"/g, '""') + '","' +
            lText.sizeFormat(os.totalmem() - os.freemem(), '') + '","' +
            lText.sizeFormat(process.memoryUsage().rss, '') + '","' +
            JSON.stringify(msg).slice(1, -1).replace(/"/g, '""') + '"\n', {
            'encoding': 'utf8',
            'mode': 0o777,
            'flag': 'a'
        });
    })().catch((e) => {
        display('[CORE] [log]', e);
    });
}

/**
 * --- 获取日志内容为一个数组 ---
 * @param opt 参数
 */
export async function getLog(opt: {
    /** --- 如 127.0.0.1 --- */
    'hostname': string;
    /** --- 如 2024/08/01/22 --- */
    'path': string;
    /** --- 如 -error --- */
    'fend'?: string;
    /** --- 仅显示被搜索到的行 --- */
    'search'?: string;
    /** --- 跳过的字节数，默认不跳过 --- */
    'start'?: number;
    /** --- 跳过条数 --- */
    'offset'?: number;
    /** --- 最大限制，默认 100 --- */
    'limit'?: number;
    /** --- 获取局域网服务器的日志，为空代表获取本机的 --- */
    'host'?: string;
}): Promise<string[][] | null | false> {
    opt.host ??= '127.0.0.1';
    // --- 局域网模式 ---
    const time = lTime.stamp();
    const res = await lNet.get('http://' + opt.host + ':' + globalConfig.rpcPort.toString() + '/' + lCrypto.aesEncrypt(lText.stringifyJson({
        'action': 'log',
        'time': time,
        'hostname': opt.hostname,
        'path': opt.path,
        'fend': opt.fend,
        'search': opt.search,
        'start': opt.start,
        'offset': opt.offset,
        'limit': opt.limit,
    }), globalConfig.rpcSecret), {
        'timeout': 2
    });
    const content = await res.getContent();
    if (!content) {
        return false;
    }
    const str = content.toString();
    const j = lText.parseJson(str);
    if (!j) {
        return false;
    }
    return j.data;
}

/**
 * --- 获取目录内文件/文件夹列表 ---
 * @param opt 参数
 */
export async function ls(opt: {
    /** --- 如 2024/08/01/22，无所谓开头结尾 --- */
    'path': string;
    'encoding'?: BufferEncoding;
    /** --- 获取局域网服务器的目录列表，为空代表获取本机的 --- */
    'host'?: string;
}): Promise<Array<{
        'isFile': boolean;
        'isDirectory': boolean;
        'isSymbolicLink': boolean;
        'name': string;
    }>> {
    opt.host ??= '127.0.0.1';
    // --- 局域网模式 ---
    const time = lTime.stamp();
    const res = await lNet.get('http://' + opt.host + ':' + globalConfig.rpcPort.toString() + '/' + lCrypto.aesEncrypt(lText.stringifyJson({
        'action': 'ls',
        'time': time,
        'path': opt.path,
        'encoding': opt.encoding,
    }), globalConfig.rpcSecret), {
        'timeout': 2
    });
    const content = await res.getContent();
    if (!content) {
        return [];
    }
    const str = content.toString();
    const j = lText.parseJson(str);
    if (!j) {
        return [];
    }
    return j.data;
}

/**
 * --- 完整的克隆一份数组/对象 ---
 * @param obj 要克隆的对象
 */
export function clone<T>(obj: T): T {
    let newObj: any = {};
    if (obj instanceof Array) {
        newObj = [];
        for (let i = 0; i < obj.length; ++i) {
            if (obj[i] instanceof Date) {
                newObj[i] = new Date(obj[i].getTime());
            }
            else if (obj[i] instanceof FormData) {
                const fd = new FormData();
                for (const item of obj[i]) {
                    fd.append(item[0], item[1]);
                }
                newObj[i] = fd;
            }
            else if (obj[i] === null) {
                newObj[i] = null;
            }
            else if (typeof obj[i] === 'object') {
                newObj[i] = clone(obj[i]);
            }
            else {
                newObj[i] = obj[i];
            }
        }
    }
    else {
        for (const key in obj) {
            if (obj[key] instanceof Date) {
                newObj[key] = new Date(obj[key].getTime());
            }
            else if (obj[key] instanceof FormData) {
                const fd = new FormData();
                for (const item of obj[key]) {
                    fd.append(item[0], item[1]);
                }
                newObj[key] = fd;
            }
            else if (obj[key] === null) {
                newObj[key] = null;
            }
            else if (typeof obj[key] === 'object') {
                newObj[key] = clone(obj[key]);
            }
            else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}

/**
 * --- 打印调试信息，线上环境不会打印 ---
 * @param message 参数
 * @param optionalParams 参数
 */
export function debug(message?: any, ...optionalParams: any[]): void {
    if (!globalConfig.debug) {
        return;
    }
    // eslint-disable-next-line no-console
    console.debug(message, ...optionalParams);
}

/**
 * --- 向控制台直接显示内容，一般情况下禁止使用 ---
 * @param message 参数
 * @param optionalParams 参数
 */
export function display(message?: any, ...optionalParams: any[]): void {
    // eslint-disable-next-line no-console
    console.log(message, ...optionalParams);
}

/**
 * --- 让 res 发送头部（前提是头部没有被发送才能调用本方法 ---
 * @param res 响应对象
 * @param statusCode 状态码
 * @param headers 头部
 */
export function writeHead(
    res: http2.Http2ServerResponse | http.ServerResponse, statusCode: number, headers?: http.OutgoingHttpHeaders
): void {
    if (res instanceof http2.Http2ServerResponse) {
        res.writeHead(statusCode, headers);
    }
    else {
        res.writeHead(statusCode, headers);
    }
}

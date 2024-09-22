/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-3 23:54
 * Last: 2020-4-11 22:34:58, 2022-10-2 14:13:06, 2022-12-28 20:33:24, 2023-12-15 11:49:02, 2024-7-2 15:23:35
 */
import * as cp from 'child_process';
import * as http from 'http';
import * as http2 from 'http2';
import * as stream from 'stream';
import * as lTime from '~/lib/time';
import * as lFs from '~/lib/fs';
import * as lText from '~/lib/text';
import * as lNet from '~/lib/net';
import * as lCrypto from '~/lib/crypto';
import * as lResponse from '~/lib/net/response';
import * as sCtr from '~/sys/ctr';
import * as def from '~/sys/def';
import * as types from '~/types';

/** --- 全局参数 --- */
export const globalConfig: types.IConfig & {
    'httpPort': number;
    'httpsPort': number;
    'rpcPort': number;
    'rpcSecret': string;
    'irpPort': number;
    'irpSecret': string;
    'irpEnabled': boolean;
    'irp': Array<{
        'name': string;
        'host': string;
        'port': number;
        'secret': string;
        'enabled': boolean;
    }>;
} = {} as types.Json;

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
    /** --- 要校验的对象 --- */
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
        if (vtype !== 'string' && val !== undefined && val !== null) {
            return 'string:' + tree + ':' + vtype;
        }
        // --- 是字符串、undefined、null ---
        if (type) {
            return val ? '' : 'require:' + tree + ':' + vtype;
        }
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
        for (const key in type) {
            const res = checkType(val[key], type[key], tree + '.' + key);
            if (res) {
                return res;
            }
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

// --- 以下 Mutton 没有 ---

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
export function objectSort(o: Record<string, types.Json>): types.Json {
    const ordered: types.Json = {};
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
export function emptyObject(obj: Record<string, types.Json>, deep: boolean = false): void {
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
export async function sendReload(hosts?: string[]): Promise<string[]> {
    if (!hosts) {
        // --- 本地模式 ---
        // eslint-disable-next-line no-console
        console.log('[ Child] Sending reload request...');
        process.send!({
            'action': 'reload'
        });
        return [];
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
export async function sendRestart(hosts?: string[]): Promise<string[]> {
    if (!hosts) {
        // --- 本地模式 ---
        // eslint-disable-next-line no-console
        console.log('[ Child] Sending restart request...');
        process.send!({
            'action': 'restart'
        });
        return [];
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
 * --- 设置跨线程的全局变量 ---
 * @param key 变量名
 * @param data 变量值
 * @param hosts 局域网列表
 */
export async function setGlobal(key: string, data: types.Json, hosts?: string[]): Promise<string[]> {
    if (!hosts) {
        // --- 本地模式 ---
        process.send!({
            'action': 'global',
            'key': key,
            'data': data
        });
        return [];
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
 * --- 移除某个跨线程全局变量 ---
 * @param key 变量名
 * @param hosts 局域网列表
 */
export async function removeGlobal(key: string, hosts?: string[]): Promise<string[]> {
    return setGlobal(key, null, hosts);
}

/**
 * --- 上传并覆盖代码文件，config.json、kebab.json、.js.map、.ts, .gitignore 不会被覆盖和新建 ---
 * @param sourcePath zip 文件
 * @param path 要覆盖的路径，无所谓是否 / 开头 / 结尾
 * @param hosts 局域网多机部署，不设置默认本机部署
 */
export async function updateCode(sourcePath: string, path: string, hosts?: string[]): Promise<string[]> {
    if (!hosts) {
        hosts = ['127.0.0.1'];
    }
    const time = lTime.stamp();
    /** --- 返回成功的 host --- */
    const rtn: string[] = [];
    for (const host of hosts) {
        const fd = lNet.getFormData();
        if (!await fd.putFile('file', sourcePath)) {
            continue;
        }
        fd.putString('path', path);
        const res = await lNet.post('http://' + host + ':' + globalConfig.rpcPort.toString() + '/' + lCrypto.aesEncrypt(lText.stringifyJson({
            'action': 'code',
            'time': time
        }), globalConfig.rpcSecret), fd, {
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

/** --- log 设置的选项 --- */
export interface ILogOptions {
    'path': string;
    'urlFull': string;
    'hostname': string;
    'req': http2.Http2ServerRequest | http.IncomingMessage | null;
    'get': Record<string, types.Json>;
    'cookie': Record<string, string>;
    'headers': http.IncomingHttpHeaders;
}

/**
 * --- 写入文件日志 ---
 * @param msg 自定义内容
 * @param fend 文件名追加
 * @param opt 选项
 */
export async function log(opt: sCtr.Ctr | ILogOptions, msg: string, fend: string = ''): Promise<void> {
    let req: http2.Http2ServerRequest | http.IncomingMessage | null;
    let headers: http.IncomingHttpHeaders;
    let get: Record<string, types.Json>;
    let cookie: Record<string, string>;
    let wpath: string;
    let urlFull: string;
    let hostname: string;
    if (opt instanceof sCtr.Ctr) {
        req = opt.getPrototype('_req');
        headers = opt.getPrototype('_headers');
        get = opt.getPrototype('_get');
        cookie = opt.getPrototype('_cookie');
        const config = opt.getPrototype('_config');
        wpath = config.const.path;
        urlFull = config.const.urlFull;
        hostname = config.const.hostname;
    }
    else {
        req = opt.req;
        headers = opt.headers;
        get = opt.get;
        cookie = opt.cookie;
        wpath = opt.path;
        urlFull = opt.urlFull;
        hostname = opt.hostname;
    }
    if (hostname === '') {
        hostname = 'system';
    }

    const realIp = req?.socket.remoteAddress ?? '';
    const clientIp = req ? ip(headers, req) : '';

    const [y, m, d, h] = lTime.format(null, 'Y-m-d-H').split('-');
    let path = def.LOG_PATH + hostname + fend + '/' + y + '/' + m + '/' + d + '/';
    const rtn = await lFs.mkdir(path, 0o777);
    if (!rtn) {
        return;
    }
    path += h + '.csv';
    if (!await lFs.isFile(path)) {
        if (!await lFs.putContent(path, 'TIME,UNIX,URL,COOKIE,USER_AGENT,REALIP,CLIENTIP,MESSAGE\n', {
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
        (headers['user-agent']?.replace(/"/g, '""') ?? 'No HTTP_USER_AGENT') + '","' +
        realIp.replace(/"/g, '""') + '","' +
        clientIp.replace(/"/g, '""') + '",' +
        JSON.stringify(msg.replace(/"/g, '""')) + '\n', {
        'encoding': 'utf8',
        'mode': 0o777,
        'flag': 'a'
    });
}

/**
 * --- 获取日志内容为一个数组 ---
 * @param opt 参数
 */
export async function getLog(opt: {
    /** --- 如 127.0.0.1 --- */
    'host': string;
    /** --- 如 2024/08/01/22 --- */
    'path': string;
    /** --- 如 -error --- */
    'fend'?: string;
    /** --- 仅显示被搜索到的行 --- */
    'search'?: string;
    /** --- 跳过条数 --- */
    'offset'?: number;
    /** --- 最大限制，默认 100 --- */
    'limit'?: number;
}): Promise<string[][] | null | false> {
    const path = def.LOG_PATH + opt.host + (opt.fend ?? '') + '/' + opt.path + '.csv';
    if (!await lFs.isFile(path)) {
        return null;
    }
    /** --- 剩余 limit --- */
    let limit = opt.limit ?? 100;
    /** --- 剩余 offset --- */
    let offset = opt.offset ?? 0;
    return new Promise<string[][] | null | false>((resolve) => {
        const list: string[][] = [];
        /** --- 当前行号 --- */
        let line = 0;
        /** --- 当前行数据 --- */
        let packet = '';
        lFs.createReadStream(path, {
            'encoding': 'utf8'
        }).on('data', (buf: string) => {
            while (true) {
                // --- 分包 ---
                const index = buf.indexOf('\n');
                if (index === -1) {
                    // --- 本次包还没有结束 ---
                    packet += buf;
                    break;
                }
                // --- 本次行结束了 ---
                if (limit === 0) {
                    break;
                }
                packet += buf.slice(0, index);
                buf = buf.slice(index + 1);
                ++line;
                // --- 先执行下本次完成的 ---
                if (line > 1) {
                    if (offset === 0) {
                        if (!opt.search || packet.includes(opt.search)) {
                            const result: string[] = [];
                            let currentField = '';
                            let inQuotes = false;
                            for (let i = 0; i < packet.length; ++i) {
                                const char = packet[i];
                                if (char === '"') {
                                    if (inQuotes && packet[i + 1] === '"') {
                                        currentField += '"';
                                        ++i;
                                    }
                                    else {
                                        inQuotes = !inQuotes;
                                    }
                                }
                                else if (char === ',' && !inQuotes) {
                                    result.push(currentField);
                                    currentField = '';
                                }
                                else {
                                    currentField += char;
                                }
                            }
                            result.push(currentField);
                            list.push(result);
                            --limit;
                        }
                    }
                    else {
                        --offset;
                    }
                }
                // --- 处理结束 ---
                packet = '';
                // --- 看看还有没有后面的粘连包 ---
                if (!buf.length) {
                    // --- 没粘连包 ---
                    break;
                }
                // --- 有粘连包 ---
            }
        }).on('end', () => {
            resolve(list);
        }).on('error', () => {
            resolve(false);
        });
    });
}

/**
 * --- 完整的克隆一份数组/对象，Kebab: yes, Mutton: no ---
 * @param obj 要克隆的对象
 */
export function clone(obj: Record<string, any> | any[]): any[] | any {
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

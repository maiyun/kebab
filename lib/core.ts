/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-3 23:54
 * Last: 2020-4-11 22:34:58, 2022-10-2 14:13:06, 2022-12-28 20:33:24
 */
import * as cp from 'child_process';
import * as http from 'http';
import * as http2 from 'http2';
import * as lTime from '~/lib/time';
import * as lFs from '~/lib/fs';
import * as lText from '~/lib/text';
import * as lCrypto from '~/lib/crypto';
import * as sCtr from '~/sys/ctr';
import * as def from '~/sys/def';
import * as types from '~/types';

/** --- 全局参数 --- */
export const config: types.IConfig & {
    'httpPort': number;
    'httpsPort': number;
} = {
    'httpPort': 0
} as any;

/** --- Cookie 设置的选项 --- */
export interface ICookieOptions {
    'ttl'?: number;
    'path'?: string;
    'domain'?: string;
    'ssl'?: boolean;
    'httponly'?: boolean;
}

/**
 * --- 设置 cookie ---
 * @param ctr ctr 实例
 * @param name 名
 * @param value 值
 * @param opt 选项
 */
export function setCookie(ctr: sCtr.Ctr, name: string, value: string, opt: ICookieOptions = {}): void {
    const res = ctr.getPrototype('_res');
    if (!res) {
        return;
    }
    const ttl = opt.ttl === undefined ? 0 : opt.ttl;

    const expires = lTime.get(ctr, {
        'data': lTime.stamp() + ttl
    }).toUTCString();
    const path = `; path=${opt.path ?? '/'}`;
    const domain = opt.domain ? `; domain=${opt.domain}` : '';
    const secure = opt.ssl ? '; secure' : '';
    const httpOnly = opt.httponly ? '; HttpOnly' : '';
    const cookies: string[] = res.getHeader('set-cookie') as string[] | undefined ?? [];
    cookies.push(`${name}=${encodeURIComponent(value)}; expires=${expires}; Max-Age=${ttl}${path}${domain}${secure}${httpOnly}`);
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
export const RANDOM_LUNS = RANDOM_LUN + '()`~!@#$%^&*-+=_|{}[]:;"<>,.?/]';

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
 * --- 获取 MUID ---
 * @param ctr Ctr 对象
 * @param opt len: 8 - 32, 默认 8; bin: 是否含有大小写, 默认 true; key: 多样性混合, 默认空; insert: 插入指定字符, 不超过 2 字符，默认空
 */
export function muid(ctr: sCtr.Ctr, opt: {
    'len'?: number;
    'bin'?: boolean;
    'key'?: string;
    'insert'?: string;
} = {}): string {
    const len = opt.len ?? 8;
    const bin = opt.bin ?? true;
    const key = opt.key ?? '';
    const insert = opt.insert ?? '';
    const ilen = insert.length;

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
    const over = random(len - 1 - ilen, bin ? RANDOM_LUN : RANDOM_LN) + char[20];
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
    if ((name !== '') && (typeof headers[name] === 'string')) {
        return headers[name] as string;
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
export function objectSort(o: Record<string, any>): any {
    const ordered: any = {};
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
 * --- 向主进程发送广播将进行 reload 操作，等待回传 ---
 * --- 主要作用除代码热更新以外的其他情况 ---
 */
export function sendReload(): void {
    console.log('[ Child] Sending reload request...');
    process.send!({
        action: 'reload'
    });
}

/**
 * --- 向主进程发送广播将进行 restart 操作，停止监听并启动新进程，老进程在连接全部断开后自行销毁 ---
 * --- 主要用作不间断的代码热更新 ---
 */
export function sendRestart(): void {
    console.log('[ Child] Sending restart request...');
    process.send!({
        action: 'restart'
    });
}

/** --- log 设置的选项 --- */
export interface ILogOptions {
    'path': string;
    'urlFull': string;
    'hostname': string;
    'req': http2.Http2ServerRequest | http.IncomingMessage;
    'get': Record<string, any>;
    'post': Record<string, any>;
    'cookie': Record<string, string>;
    'headers': http.IncomingHttpHeaders;
    'input': string;
}

/**
 * --- 写入文件日志 ---
 * @param msg 自定义内容
 * @param fend 文件名追加
 * @param opt 选项
 */
export async function log(opt: sCtr.Ctr | ILogOptions, msg: string, fend: string = ''): Promise<void> {
    let req: http2.Http2ServerRequest | http.IncomingMessage;
    let headers: http.IncomingHttpHeaders;
    let get: Record<string, any>;
    let post: Record<string, any>;
    let cookie: Record<string, string>;
    let input: string;
    let wpath: string;
    let urlFull: string;
    let hostname: string;
    if (opt instanceof sCtr.Ctr) {
        req = opt.getPrototype('_req');
        headers = opt.getPrototype('_headers');
        get = opt.getPrototype('_get');
        post = opt.getPrototype('_post');
        cookie = opt.getPrototype('_cookie');
        input = opt.getPrototype('_input');
        const config = opt.getPrototype('_config');
        wpath = config.const.path;
        urlFull = config.const.urlFull;
        hostname = config.const.hostname;
    }
    else {
        req = opt.req;
        headers = opt.headers;
        get = opt.get;
        post = opt.post;
        cookie = opt.cookie;
        input = opt.input;
        wpath = opt.path;
        urlFull = opt.urlFull;
        hostname = opt.hostname;
    }

    const realIp = req.socket.remoteAddress ?? '';
    const clientIp = ip(headers, req);

    const [y, m, d, h] = lTime.format(null, 'Y-m-d-H').split('-');
    let path = def.LOG_PATH + hostname + '/' + y + '/' + m + '/' + d + '/';
    const rtn = await lFs.mkdir(path, 0o777);
    if (!rtn) {
        return;
    }
    path += h + fend + '.csv';
    if (!await lFs.isFile(path)) {
        if (!await lFs.putContent(path, 'TIME,UNIX,URL,RAWPOST,POST,COOKIE,USER_AGENT,REALIP,CLIENTIP,MESSAGE\n', {
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
        input.replace(/"/g, '""') + '","' +
        JSON.stringify(post).replace(/"/g, '""') + '","' +
        lText.queryStringify(cookie).replace(/"/g, '""') + '","' +
        (headers['user-agent']?.replace(/"/g, '""') ?? 'No HTTP_USER_AGENT') + '","' +
        realIp.replace(/"/g, '""') + '","' +
        clientIp.replace(/"/g, '""') + '","' +
        msg.replace(/"/g, '""') + '"\n', {
        'encoding': 'utf8',
        'mode': 0o777,
        'flag': 'a'
    });
}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-2 20:42
 * Last: 2020-4-9 22:33:11, 2022-09-13 13:32:01, 2022-12-30 19:13:07, 2024-2-6 23:53:45, 2024-12-23 01:33:16, 2025-1-28 21:05:51, 2025-9-23 12:27:48
 */
import * as http from 'http';
import * as net from 'net';
// --- 第三方 ---
import * as liws from '@litert/websocket';
// --- 库 ---
import * as kebab from '#index.js';
import * as lText from '#lib/text.js';
import * as lNet from '#lib/net.js';
import * as sCtr from '#sys/ctr.js';

/** --- 一般用 SIMPLE --- */
export enum EFrameReceiveMode {
    STANDARD,
    LITE,
    SIMPLE
}

/** --- OPCODE --- */
export enum EOpcode {
    CONTINUATION = 0x0,
    TEXT = 0x1,
    BINARY = 0x2,
    CLOSE = 0x8,
    PING = 0x9,
    PONG = 0xA
}

/** --- 请求的传入参数选项 --- */
export interface IConnectOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    'hosts'?: Record<string, string>;
    'local'?: string;
    'headers'?: lNet.THttpHeaders;
    /** --- cookie 托管对象 --- */
    'cookie'?: Record<string, lNet.ICookie>;
    /** --- 小帧模式，默认 false --- */
    'mode'?: EFrameReceiveMode;
    /** --- 加密模式，默认 true --- */
    'masking'?: boolean;
    /** --- 正向 mproxy 代理，url 如 wss://xxx/abc --- */
    'mproxy'?: {
        'url': string;
        'auth': string;
    };
}

/** --- 正向代理请求的传入参数选项 --- */
export interface IMproxyOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    'hosts'?: Record<string, string>;
    'local'?: string;
    'headers'?: lNet.THttpHeaders;
    /** --- 小帧模式，默认 false --- */
    'mode'?: EFrameReceiveMode;
    /** --- 加密模式，默认 true --- */
    'masking'?: boolean;
}

/** --- 反向代理请求的传入参数选项 --- */
export interface IRproxyOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    'hosts'?: Record<string, string>;
    'local'?: string;
    'headers'?: lNet.THttpHeaders;
    /** --- 小帧模式，默认 false --- */
    'mode'?: EFrameReceiveMode;
    /** --- 加密模式，默认 true --- */
    'masking'?: boolean;
    /** --- 正向 mproxy 代理，url 如 wss://xxx/abc --- */
    'mproxy'?: {
        'url': string;
        'auth': string;
    };
}

const liwsServer = liws.createServer();

export class Socket {

    /** --- 当前的 ws 对象 --- */
    private _ws!: liws.IWebSocket | liws.IClient;

    public constructor(request?: http.IncomingMessage, socket?: net.Socket, options: {
        'headers'?: http.OutgoingHttpHeaders;
        'timeout'?: number;
    } = {}) {
        if (!request || !socket) {
            return;
        }
        // --- 一定是 server 模式 ---
        this._ws = liwsServer.accept({
            'request': request,
            'socket': socket,
            'headers': options.headers,
            'timeout': options.timeout,
        });
        this._bindEvent();
    }

    /**
     * --- 以客户端形式发起链接 ---
     * @param u 以 ws, wss 开头的地址
     * @param opt 参数
     */
    public async connect(u: string, opt: IConnectOptions = {}): Promise<this | null> {
        const uri = lText.parseUrl(u);
        if (!uri.hostname) {
            return null;
        }
        /** --- 正向代理的地址 --- */
        const puri = opt.mproxy ? lText.parseUrl(opt.mproxy.url) : null;
        const timeout = opt.timeout ?? 10;
        const hosts = opt.hosts ?? {};
        const local = opt.local;
        const mode = opt.mode ?? EFrameReceiveMode.SIMPLE;
        const masking = opt.masking ?? true;
        const headers: Record<string, kebab.Json> = {};
        if (opt.headers) {
            for (const key in opt.headers) {
                headers[key.toLowerCase()] = opt.headers[key];
            }
        }
        headers['user-agent'] ??= 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36';
        // --- cookie 托管 ---
        if (opt.cookie) {
            headers['cookie'] = lNet.buildCookieQuery(opt.cookie, uri);
        }
        // --- ssl ---
        const ca: string | null = puri ?
            puri.protocol === 'wss:' ? await lNet.getCa() : null :
            uri.protocol === 'wss:' ? await lNet.getCa() : null;
        if (!ca && hosts[uri.hostname]) {
            // --- 没有 ca，但是要设置 额外的 host ---
            headers['host'] = uri.hostname + (uri.port ? ':' + uri.port : '');
        }
        try {
            // --- 重定义 IP ---
            const host = puri?.hostname ?? uri.hostname ?? '';
            const port = (puri ? puri.port : uri.port) ?? 443;
            const path = puri ? puri.path + (puri.path?.includes('?') ? '&' : '?') + lText.queryStringify({
                'url': u,
                'auth': opt.mproxy?.auth ?? ''
            }) : uri.path;
            const cli = ca ?
                await liws.wssConnect({
                    'hostname': hosts[host] ?? host,
                    'port': port,
                    'path': path,
                    'servername': host,
                    'headers': headers,
                    'connectTimeout': timeout * 1000,
                    'frameReceiveMode': mode,
                    'localAddress': local,
                    'ca': ca
                }) :
                await liws.wsConnect({
                    'hostname': hosts[host] ?? host,
                    'port': port,
                    'path': path,
                    'headers': headers,
                    'connectTimeout': timeout * 1000,
                    'frameReceiveMode': mode,
                    'localAddress': local
                });
            cli.setMasking(masking);
            this._ws = cli;
            this._bindEvent();
            return this;
        }
        catch {
            return null;
        }
    }

    /** --- 创建成功后第一时间绑定事件 --- */
    private _bindEvent(): void {
        this._ws.on('message', (msg): void => {
            (async (): Promise<void> => {
                if (msg.opcode === EOpcode.CLOSE) {
                    return;
                }
                let data: Buffer | string = '';
                if ('data' in msg) {
                    data = Buffer.concat(msg.data);
                    if (msg.opcode === EOpcode.TEXT) {
                        data = data.toString();
                    }
                }
                else {
                    data = await (msg.opcode === EOpcode.TEXT ? msg.toString() : msg.toBuffer());
                }
                this._on.message({
                    'opcode': msg.opcode,
                    'data': data
                }) as any;
            })().catch(() => {
                // --- nothing ---
            });
        }).on('drain', () => {
            this._on.drain() as any;
        }).on('error', (e) => {
            this._on.error(e) as any;
        }).on('end', () => {
            this._on.end() as any;
        }).on('close', () => {
            this._on.close() as any;
        });
    }

    /** --- 还未开启监听时来的数据将存在这里 --- */
    private readonly _waitMsg: Array<{
        'opcode': EOpcode;
        'data': Buffer | string;
    }> = [];

    /** --- 还未开启 error 监听时产生的 error 错误对象 --- */
    private _error: any = null;

    /** --- 还未开启 close 监听时是不是就已经 close --- */
    private _close: boolean = false;

    /** --- 未绑定自定义监听事件的默认执行函数 --- */
    private _on = {
        message: (msg: {
            'opcode': EOpcode;
            'data': Buffer | string;
        }): void | Promise<void> => {
            this._waitMsg.push(msg);
        },
        drain: (): void | Promise<void> => {
            // --- nothing ---
        },
        error: (e: any): void | Promise<void> => {
            this._error = e;
        },
        close: (): void | Promise<void> => {
            this._close = true;
        },
        end: (): void | Promise<void> => {
            // --- nothing ---
        }
    };

    /** --- 绑定监听 --- */
    public on(event: 'message', cb: (msg: {
        'opcode': EOpcode;
        'data': Buffer | string;
    }) => void | Promise<void>): this;
    public on(event: 'error', cb: (error: any) => void | Promise<void>): this;
    public on(event: 'drain' | 'close' | 'end', cb: () => void | Promise<void>): this;
    public on(event: keyof typeof this._on, cb: (param?: any) => void | Promise<void>): this {
        this._on[event] = cb;
        switch (event) {
            case 'message': {
                for (const item of this._waitMsg) {
                    cb(item) as any;
                }
                break;
            }
            case 'error': {
                if (!this._error) {
                    break;
                }
                cb(this._error) as any;
                break;
            }
            case 'end': {
                cb() as any;
                break;
            }
            default: {
                // --- close ---
                if (!this._close) {
                    break;
                }
                cb() as any;
            }
        }
        return this;
    }

    public end(): void {
        this._ws.end();
    }

    public destroy(): void {
        this._ws.destroy();
    }

    /** --- 发送文本 --- */
    public writeText(data: string): boolean {
        if (!this._ws.writable) {
            return false;
        }
        return this._ws.writeText(data);
    }

    /** --- 发送结果对象字符串 --- */
    public writeResult(data: kebab.Json): boolean {
        if (!this._ws.writable) {
            return false;
        }
        return this._ws.writeText(lText.stringifyResult(data));
    }

    /** --- 发送二进制 --- */
    public writeBinary(data: string | Buffer | Array<string | Buffer>): boolean {
        if (!this._ws.writable) {
            return false;
        }
        return this._ws.writeBinary(data);
    }

    /** --- 当前是否是可写状态 --- */
    public get writable(): boolean {
        return this._ws.writable;
    }

    /** --- 当前是否已经结束读取，并且无法继续读取 --- */
    public get ended(): boolean {
        return this._ws.ended;
    }

    /** --- 当前是否已经结束写入，并且无法继续写入 --- */
    public get finished(): boolean {
        return this._ws.finished;
    }

    /**
     * --- 当前连接是不是服务器连接 ---
     */
    public get isServer(): boolean {
        return this._ws.isServer;
    }

    /** --- 发送 ping --- */
    public ping(data?: Buffer | string): boolean {
        try {
            this._ws.ping(data);
            return true;
        }
        catch {
            return false;
        }
    }

    /** --- 发送 ping --- */
    public pong(data?: Buffer | string): boolean {
        try {
            this._ws.pong(data);
            return true;
        }
        catch {
            return false;
        }
    }

}

/**
 * --- 创建一个 ws 客户端发起 ws 请求 ---
 * @param u 以 ws, wss 开头的地址
 * @param opt 参数
 */
export function connect(u: string, opt: IConnectOptions = {}): Promise<Socket | null> {
    const s = new Socket();
    return s.connect(u, opt);
}

/**
 * --- 创建一个 ws 服务器接收处理器 ---
 * @param request Http 请求端
 * @param socket 响应双向 socket
 */
export function createServer(request: http.IncomingMessage, socket: net.Socket, options: {
    'headers'?: http.OutgoingHttpHeaders;
    'timeout'?: number;
} = {}): Socket {
    return new Socket(request, socket, options);
}

/**
 * --- 绑定 socket 管道 ---
 * @param s1 第一个 socket
 * @param s2 第二个 socket
 */
function bindPipe(s1: Socket, s2: Socket): Promise<void> {
    return new Promise<void>((resolve) => {
        // --- 监听发送端的 ---
        s1.on('message', (msg) => {
            switch (msg.opcode) {
                case EOpcode.TEXT:
                case EOpcode.BINARY: {
                    if (typeof msg.data === 'string') {
                        s2.writeText(msg.data);
                        break;
                    }
                    s2.writeBinary(msg.data);
                    break;
                }
                case EOpcode.CLOSE: {
                    s2.end();
                    resolve();
                    break;
                }
                case EOpcode.PING: {
                    s2.ping(msg.data);
                    break;
                }
                case EOpcode.PONG: {
                    s2.pong(msg.data);
                    break;
                }
                default: {
                    // --- EOpcode.CONTINUATION ---
                }
            }
        }).on('close', () => {
            s2.end();
            resolve();
        });
        // --- 监听远程端的 ---
        s2.on('message', (msg) => {
            switch (msg.opcode) {
                case EOpcode.TEXT:
                case EOpcode.BINARY: {
                    if (typeof msg.data === 'string') {
                        s1.writeText(msg.data);
                        break;
                    }
                    s1.writeBinary(msg.data);
                    break;
                }
                case EOpcode.CLOSE: {
                    s1.end();
                    resolve();
                    break;
                }
                case EOpcode.PING: {
                    s1.ping(msg.data);
                    break;
                }
                case EOpcode.PONG: {
                    s1.pong(msg.data);
                    break;
                }
                default: {
                    // --- EOpcode.CONTINUATION ---
                }
            }
        }).on('close', () => {
            s1.end();
            resolve();
        });
    });
}

/**
 * --- 正向 mproxy 代理，读取 get 的 url 为实际请求地址 ---
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
    /** --- 请求端产生的双向 socket --- */
    const socket = ctr.getPrototype('_socket');
    /** --- 客户端请求中的 get 的数据 --- */
    const get = ctr.getPrototype('_get');
    if (get['auth'] !== auth) {
        return 0;
    }
    if (!get['url']) {
        return -1;
    }
    opt.headers ??= {};
    Object.assign(opt.headers, lNet.filterProxyHeaders(req.headers));
    // --- 发起请求 ---
    /** --- 远程端的双向 socket --- */
    const rsocket = await connect(get['url'], opt);
    if (!rsocket) {
        return -2;
    }
    await bindPipe(socket, rsocket);
    return 1;
}

/**
 * --- 反向代理，将本 socket 连接反代到其他网址，在 ws 的 onLoad 事件中使用 ---
 * @param ctr 当前控制器
 * @param url 反代真实请求地址，如有 get 需要自行添加
 * @param opt 参数
 */
export async function rproxy(
    ctr: sCtr.Ctr,
    url: string,
    opt: IRproxyOptions = {}
): Promise<boolean> {
    const req = ctr.getPrototype('_req');
    /** --- 请求端产生的双向 socket --- */
    const socket = ctr.getPrototype('_socket');
    opt.headers ??= {};
    Object.assign(opt.headers, lNet.filterProxyHeaders(req.headers));
    // --- 发起请求 ---
    /** --- 远程端的双向 socket --- */
    const rsocket = await connect(url, opt);
    if (!rsocket) {
        return false;
    }
    await bindPipe(socket, rsocket);
    return true;
}

/**
 * --- 反向代理，将本 websocket 连接反代到其他真正的 socket，在 ws 的 onLoad 事件中使用 ---
 * @param ctr 当前控制器
 * @param host 反代真实请求地址
 * @param port 反代真实请求端口
 * @param opt 参数
 */
export async function rsocket(
    ctr: sCtr.Ctr,
    host: string,
    port: number
): Promise<boolean> {
    return new Promise<boolean>(resolve => {
        /** --- 请求端产生的双向 ws --- */
        const ws = ctr.getPrototype('_socket');
        /** --- 对端真实 tcp socket --- */
        const socket = new net.Socket();
        socket.connect(port, host, () => {
            // --- 连接成功 ---
            // --- 监听发送端的 ---
            ws.on('message', msg => {
                switch (msg.opcode) {
                    case EOpcode.TEXT:
                    case EOpcode.BINARY: {
                        socket.write(msg.data);
                        break;
                    }
                    case EOpcode.CLOSE: {
                        socket.end();
                        resolve(true);
                        break;
                    }
                    case EOpcode.PING: {
                        ws.pong();
                        break;
                    }
                    case EOpcode.PONG: {
                        break;
                    }
                    default: {
                        // --- EOpcode.CONTINUATION ---
                    }
                }
            }).on('close', () => {
                socket.end();
                resolve(true);
            });
            // --- 监听远程端的 ---
            socket.on('data', data => {
                ws.writeBinary(data);
            }).on('close', () => {
                ws.end();
                resolve(true);
            });
        }).on('error', () => {
            resolve(false);
        });
    });
}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-2 20:42
 * Last: 2020-4-9 22:33:11, 2022-09-13 13:32:01, 2022-12-30 19:13:07, 2024-2-6 23:53:45, 2024-12-23 01:33:16, 2025-1-28 21:05:51, 2025-9-23 12:27:48, 2025-10-4 23:20:32
 */
import * as http from 'http';
import * as net from 'net';
// --- 第三方 ---
import WebSocket, { WebSocketServer } from 'ws';
// --- 库 ---
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';
import * as lUndici from '#kebab/lib/undici.js';
import * as lCookie from '#kebab/lib/cookie.js';
import * as sCtr from '#kebab/sys/ctr.js';

/** --- 一般用 SIMPLE --- */
export enum EFrameReceiveMode {
    STANDARD,
    LITE,
    SIMPLE,
}

/** --- OPCODE --- */
export enum EOpcode {
    CONTINUATION = 0x0,
    TEXT = 0x1,
    BINARY = 0x2,
    CLOSE = 0x8,
    PING = 0x9,
    PONG = 0xA,
}

/** --- 请求的传入参数选项 --- */
export interface IConnectOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    /** --- 自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host --- */
    'hosts'?: Record<string, string> | string;
    'local'?: string;
    'headers'?: lUndici.THttpHeaders;
    /** --- cookie 托管对象 --- */
    'cookie'?: Record<string, lCookie.ICookie>;
    /** --- 小帧模式，默认 false --- */
    'mode'?: EFrameReceiveMode;
    /** --- 加密模式，默认 true --- */
    'masking'?: boolean;
    /** --- 正向 mproxy 代理，url 如 wss://xxx/abc --- */
    'mproxy'?: {
        'url': string;
        'auth': string;
    };
    /** --- WebSocket 握手失败回调 --- */
    onConnectError?: (error: unknown) => void;
}

/** --- WebSocket 管道首先结束的一侧 --- */
export type TPipeSide = 'source' | 'target';

/** --- WebSocket 管道结束前最后收到的底层事件 --- */
export type TPipeCloseEvent = 'close' | 'end' | 'timeout' | 'error';

/** --- WebSocket 管道关闭信息 --- */
export interface IPipeCloseInfo {
    'side': TPipeSide;
    'event': TPipeCloseEvent;
    'error'?: unknown;
    'code'?: number;
    'reason'?: string;
}

/** --- WebSocket 关闭信息 --- */
export interface ISocketCloseInfo {
    'code': number;
    'reason': string;
}

/** --- 正向代理请求的传入参数选项 --- */
export interface IMproxyOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    /** --- 自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host --- */
    'hosts'?: Record<string, string> | string;
    'local'?: string;
    'headers'?: lUndici.THttpHeaders;
    /** --- 过滤 header，返回 true 则留下 --- */
    filter?: (h: string) => boolean;
    /** --- 小帧模式，默认 false --- */
    'mode'?: EFrameReceiveMode;
    /** --- 加密模式，默认 true --- */
    'masking'?: boolean;
}

/** --- 反向代理请求的传入参数选项 --- */
export interface IRproxyOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    /** --- 自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host --- */
    'hosts'?: Record<string, string> | string;
    'local'?: string;
    'headers'?: lUndici.THttpHeaders;
    /** --- 过滤 header，返回 true 则留下 --- */
    filter?: (h: string) => boolean;
    /** --- 小帧模式，默认 false --- */
    'mode'?: EFrameReceiveMode;
    /** --- 加密模式，默认 true --- */
    'masking'?: boolean;
    /** --- 正向 mproxy 代理，url 如 wss://xxx/abc --- */
    'mproxy'?: {
        'url': string;
        'auth': string;
    };
    /** --- 连接目标 WebSocket 失败回调 --- */
    onConnectError?: (error: unknown) => void;
    /** --- 管道关闭回调，返回首先关闭的一侧及其底层事件 --- */
    onClose?: (info: IPipeCloseInfo) => void;
}

/** --- 单条 WebSocket 消息最大 64 MiB，与原实现保持一致 --- */
const MAX_MESSAGE_BYTES = 64 * 1024 * 1024;

/** --- 服务端 Upgrade 响应头，按请求隔离以支持并发握手 --- */
const upgradeHeaders = new WeakMap<http.IncomingMessage, http.OutgoingHttpHeaders>();

/** --- Kebab 复用的无监听端口 WebSocket 服务端 --- */
const wsServer = new WebSocketServer({
    'allowSynchronousEvents': false,
    'autoPong': false,
    'clientTracking': false,
    'maxPayload': MAX_MESSAGE_BYTES,
    'noServer': true,
    'perMessageDeflate': false,
});

wsServer.on('headers', (headers, request) => {
    const extra = upgradeHeaders.get(request);
    if (!extra) {
        return;
    }
    for (const [name, value] of Object.entries(extra)) {
        if (value === undefined) {
            continue;
        }
        for (const item of Array.isArray(value) ? value : [value]) {
            headers.push(`${name}: ${item}`);
        }
    }
});

/** --- 未能及时转发的 WebSocket 消息最大缓存量，超过后关闭连接保护进程内存 --- */
const MAX_PENDING_MESSAGE_BYTES = 8 * 1024 * 1024;
/** --- 未能及时转发的 WebSocket 消息最大条数，防止大量小帧占满内存 --- */
const MAX_PENDING_MESSAGES = 4_096;

interface IMessage {
    'opcode': EOpcode;
    'data': Buffer;
}

export class Socket {

    /** --- 当前的 ws 对象 --- */
    private _ws!: WebSocket;

    /** --- 当前是否为服务端接入的连接 --- */
    private readonly _isServer: boolean = false;

    /** --- 客户端发出的帧是否掩码 --- */
    private _masking: boolean = true;

    /** --- 等待底层写入回调的消息数量 --- */
    private _pendingWrites: number = 0;

    /** --- 是否已经因发送缓存触发背压 --- */
    private _writeBlocked: boolean = false;

    /** --- 是否已由本端主动结束写入 --- */
    private _finished: boolean = false;

    /** --- 是否已由对端结束读取 --- */
    private _ended: boolean = false;

    /** --- 底层 TCP Socket，用于设置和清理空闲超时 --- */
    private _transport?: net.Socket;

    /** --- 底层 TCP Socket 的超时监听器 --- */
    private _transportTimeout?: () => void;

    public constructor(request?: http.IncomingMessage, socket?: net.Socket, head?: Buffer, options: {
        'headers'?: http.OutgoingHttpHeaders;
        'timeout'?: number;
    } = {}) {
        if (!request || !socket) {
            return;
        }
        // --- 一定是 server 模式 ---
        this._isServer = true;
        this._masking = false;
        const accepted: { 'socket'?: WebSocket; } = {};
        upgradeHeaders.set(request, options.headers ?? {});
        try {
            wsServer.handleUpgrade(request, socket, head ?? Buffer.alloc(0), client => {
                accepted.socket = client;
            });
        }
        finally {
            upgradeHeaders.delete(request);
        }
        if (!accepted.socket) {
            throw new Error('WebSocket upgrade failed.');
        }
        this._ws = accepted.socket;
        this._bindTransport(socket, options.timeout ?? 0);
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
        this._masking = opt.masking ?? true;
        const headers: Record<string, string> = {};
        if (opt.headers) {
            for (const key in opt.headers) {
                const value = opt.headers[key];
                if (value === undefined) {
                    continue;
                }
                headers[key.toLowerCase()] = Array.isArray(value) ? value.join(', ') : value.toString();
            }
        }
        headers['user-agent'] ??= 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36';
        // --- cookie 托管 ---
        if (opt.cookie) {
            headers['cookie'] = lCookie.buildCookieQuery(opt.cookie, uri);
        }
        try {
            /** --- 实际建立连接的 URL --- */
            const connectUrl = new URL(puri ? opt.mproxy?.url ?? '' : u);
            if (puri) {
                connectUrl.searchParams.set('url', u);
                connectUrl.searchParams.set('auth', opt.mproxy?.auth ?? '');
            }
            const host = puri?.hostname ?? uri.hostname ?? '';
            /** --- 真正的连接远程 IP / HOST --- */
            const rhost = typeof hosts === 'string' ? hosts : hosts[host];
            if (rhost) {
                headers['host'] ??= connectUrl.host;
                connectUrl.hostname = lText.isIPv6(rhost) ? `[${rhost}]` : rhost;
            }
            const clientOptions: WebSocket.ClientOptions & { 'servername'?: string; } = {
                'allowSynchronousEvents': false,
                'autoPong': false,
                'handshakeTimeout': timeout * 1000,
                'headers': headers,
                'localAddress': local,
                'maxPayload': MAX_MESSAGE_BYTES,
                'perMessageDeflate': false,
                'servername': connectUrl.protocol === 'wss:' ? host : undefined,
            };
            const cli = new WebSocket(connectUrl, clientOptions);
            this._ws = cli;
            this._bindEvent();
            await new Promise<void>((resolve, reject) => {
                let onOpen: () => void;
                let onError: (error: Error) => void;
                let onUnexpectedResponse: (
                    request: http.ClientRequest,
                    response: http.IncomingMessage
                ) => void;
                const clean = (): void => {
                    cli.off('open', onOpen);
                    cli.off('error', onError);
                    cli.off('unexpected-response', onUnexpectedResponse);
                };
                onOpen = (): void => {
                    clean();
                    resolve();
                };
                onError = (error: Error): void => {
                    clean();
                    reject(error);
                };
                onUnexpectedResponse = (
                    _request: http.ClientRequest,
                    response: http.IncomingMessage
                ): void => {
                    clean();
                    response.resume();
                    cli.terminate();
                    reject(new Error(
                        `WebSocket handshake failed: ${response.statusCode ?? 0} ${response.statusMessage ?? ''}`.trim()
                    ));
                };
                cli.once('open', onOpen);
                cli.once('error', onError);
                cli.once('unexpected-response', onUnexpectedResponse);
            });
            return this;
        }
        catch (e: unknown) {
            opt.onConnectError?.(e);
            return null;
        }
    }

    /** --- 创建成功后第一时间绑定事件 --- */
    private _bindEvent(): void {
        this._ws.on('message', (data, isBinary) => {
            this._receive({
                'opcode': isBinary ? EOpcode.BINARY : EOpcode.TEXT,
                'data': this._toBuffer(data),
            });
        }).on('ping', data => {
            this._receive({
                'opcode': EOpcode.PING,
                'data': data,
            });
        }).on('pong', data => {
            this._receive({
                'opcode': EOpcode.PONG,
                'data': data,
            });
        }).on('error', (e) => {
            this._emitError(e);
        }).on('close', (code, reason) => {
            if (!this._finished) {
                this._ended = true;
                this._on.end?.() as any;
            }
            this._finished = true;
            this._ended = true;
            this._waitMsg.length = 0;
            this._waitMsgBytes = 0;
            this._unbindTransport();
            const info: ISocketCloseInfo = {
                'code': code,
                'reason': reason.toString(),
            };
            if (this._on.close) {
                this._on.close(info) as any;
            }
            else {
                this._close = info;
            }
        });
    }

    /**
     * --- 绑定底层 TCP Socket 的空闲超时 ---
     * @param socket 底层 TCP Socket
     * @param timeout 超时毫秒数，0 为不超时
     */
    private _bindTransport(socket: net.Socket, timeout: number): void {
        this._transport = socket;
        socket.setTimeout(timeout);
        if (!timeout) {
            return;
        }
        this._transportTimeout = (): void => {
            this._on.timeout?.() as any;
            this.destroy();
        };
        socket.once('timeout', this._transportTimeout);
    }

    /** --- 清理底层 TCP Socket 监听器 --- */
    private _unbindTransport(): void {
        if (this._transport && this._transportTimeout) {
            this._transport.off('timeout', this._transportTimeout);
        }
        this._transport = undefined;
        this._transportTimeout = undefined;
    }

    /**
     * --- 将 ws 的消息数据统一转换为 Buffer ---
     * @param data ws 原始消息数据
     * @returns Buffer
     */
    private _toBuffer(data: WebSocket.RawData): Buffer {
        if (Buffer.isBuffer(data)) {
            return data;
        }
        if (Array.isArray(data)) {
            return Buffer.concat(data);
        }
        return Buffer.from(data);
    }

    /**
     * --- 接收并派发消息；上层未就绪或主动暂停时同步暂停底层 TCP 读取 ---
     * @param msg 消息
     */
    private _receive(msg: IMessage): void {
        if (this._paused || !this._on.message) {
            this._queueMessage(msg);
            this._ws.pause();
            return;
        }
        this._on.message(msg) as any;
    }

    /**
     * --- 派发错误，监听器尚未绑定时暂存 ---
     * @param error 错误对象
     */
    private _emitError(error: unknown): void {
        if (this._on.error) {
            this._on.error(error) as any;
        }
        else {
            this._error = error;
        }
    }

    /** --- 还未开启监听时来的数据将存在这里 --- */
    private readonly _waitMsg: IMessage[] = [];

    /** --- 尚未交给消息监听器的数据量 --- */
    private _waitMsgBytes: number = 0;

    /** --- 是否暂停向上层派发消息 --- */
    private _paused: boolean = false;

    /** --- 还未开启 error 监听时产生的 error 错误对象 --- */
    private _error: any = null;

    /** --- 还未开启 close 监听时是不是就已经 close --- */
    private _close?: ISocketCloseInfo;

    /** --- 绑定的自定义监听事件（未绑定则默认在 _bindEvent 执行） --- */
    private _on: {
        /** --- 消息 --- */
        message?: (msg: IMessage) => void | Promise<void>;
        drain?: () => void | Promise<void>;
        error?: (e: any) => void | Promise<void>;
        close?: (info: ISocketCloseInfo) => void | Promise<void>;
        end?: () => void | Promise<void>;
        timeout?: () => void | Promise<void>;
    } = {
            /** --- 消息 --- */
            message: undefined,
            drain: undefined,
            error: undefined,
            close: undefined,
            end: undefined,
            timeout: undefined,
        };

    /**
     * --- 暂存尚不能交给上层处理的消息 ---
     * @param msg 消息
     */
    private _queueMessage(msg: IMessage): void {
        this._waitMsgBytes += msg.data.length;
        if (
            (this._waitMsgBytes > MAX_PENDING_MESSAGE_BYTES) ||
            (this._waitMsg.length >= MAX_PENDING_MESSAGES)
        ) {
            const error = new Error(
                `WebSocket pending message queue overflow: ${this._waitMsgBytes} bytes, ${this._waitMsg.length + 1} messages.`
            );
            this._waitMsg.length = 0;
            this._waitMsgBytes = 0;
            if (this._on.error) {
                this._on.error(error) as any;
            }
            else {
                this._error = error;
            }
            this.destroy();
            return;
        }
        this._waitMsg.push(msg);
    }

    /** --- 依次派发缓存消息，若再次发生背压则停止 --- */
    private _flushMessages(): void {
        if (this._paused || !this._on.message || !this._waitMsg.length) {
            return;
        }
        const messages = this._waitMsg.splice(0);
        this._waitMsgBytes = 0;
        for (let i = 0; i < messages.length; ++i) {
            if (this._paused) {
                for (; i < messages.length; ++i) {
                    this._waitMsg.push(messages[i]);
                    this._waitMsgBytes += messages[i].data.length;
                }
                return;
            }
            this._on.message(messages[i]) as any;
        }
    }

    /** --- 绑定监听 --- */
    public on(event: 'message', cb: (msg: {
        'opcode': EOpcode;
        'data': Buffer;
    }) => void | Promise<void>): this;
    public on(event: 'error', cb: (error: any) => void | Promise<void>): this;
    public on(event: 'close', cb: (info: ISocketCloseInfo) => void | Promise<void>): this;
    public on(event: 'drain' | 'end' | 'timeout', cb: () => void | Promise<void>): this;
    public on(event: keyof typeof this._on, cb: (param?: any) => void | Promise<void>): this {
        this._on[event] = cb;
        switch (event) {
            case 'message': {
                this._flushMessages();
                if (!this._paused) {
                    this._ws.resume();
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
                if (!this._ended) {
                    break;
                }
                cb() as any;
                break;
            }
            case 'close': {
                if (!this._close) {
                    break;
                }
                cb(this._close) as any;
                break;
            }
            default: {
                // --- drain, timeout ---
            }
        }
        return this;
    }

    /** --- 取消监听 --- */
    public off(event: 'message' | 'drain' | 'error' | 'close' | 'end' | 'timeout'): this {
        this._on[event] = undefined;
        return this;
    }

    public end(): void {
        if (this._ws.readyState !== WebSocket.OPEN) {
            return;
        }
        this._finished = true;
        this._ws.close(1000);
    }

    public destroy(): void {
        this._finished = true;
        this._ws.terminate();
    }

    /** --- 暂停向消息监听器派发数据，并暂停底层 TCP 读取 --- */
    public pause(): void {
        this._paused = true;
        this._ws.pause();
    }

    /** --- 恢复派发缓存消息，并恢复底层 TCP 读取 --- */
    public resume(): void {
        this._paused = false;
        this._flushMessages();
        if (!this._paused) {
            this._ws.resume();
        }
    }

    /** --- 发送文本 --- */
    public writeText(data: Buffer | string | Array<Buffer | string>): boolean {
        return this._send(data, false);
    }

    /** --- 发送结果对象字符串 --- */
    public writeResult(data: kebab.Json): boolean {
        return this._send(lText.stringifyResult(data), false);
    }

    /** --- 发送二进制 --- */
    public writeBinary(data: string | Buffer | Array<string | Buffer>): boolean {
        return this._send(data, true);
    }

    /**
     * --- 发送消息并将 ws 的发送缓存转换为 Kebab 的背压布尔值 ---
     * @param data 消息数据
     * @param binary 是否为二进制消息
     * @returns 是否已直接写入底层 Socket 缓存
     */
    private _send(data: Buffer | string | Array<Buffer | string>, binary: boolean): boolean {
        if (!this.writable) {
            return false;
        }
        const content = Array.isArray(data) ? Buffer.concat(data.map(item => Buffer.from(item))) : data;
        ++this._pendingWrites;
        try {
            this._ws.send(content, {
                'binary': binary,
                'compress': false,
                'fin': true,
                'mask': this._masking,
            }, error => {
                --this._pendingWrites;
                if (error) {
                    this._emitError(error);
                }
                this._emitDrain();
            });
        }
        catch (error: unknown) {
            --this._pendingWrites;
            this._emitError(error);
            return false;
        }
        if (this._ws.bufferedAmount > 0) {
            this._writeBlocked = true;
            return false;
        }
        return true;
    }

    /** --- 发送缓存完全排空后派发 drain --- */
    private _emitDrain(): void {
        if (!this._writeBlocked || this._pendingWrites || this._ws.bufferedAmount) {
            return;
        }
        this._writeBlocked = false;
        this._on.drain?.() as any;
    }

    /** --- 当前是否是可写状态 --- */
    public get writable(): boolean {
        return !this._finished && (this._ws.readyState === WebSocket.OPEN);
    }

    /** --- 当前是否已经结束读取，并且无法继续读取 --- */
    public get ended(): boolean {
        return this._ended;
    }

    /** --- 当前是否已经结束写入，并且无法继续写入 --- */
    public get finished(): boolean {
        return this._finished || (this._ws.readyState >= WebSocket.CLOSING);
    }

    /**
     * --- 当前连接是不是服务器连接 ---
     */
    public get isServer(): boolean {
        return this._isServer;
    }

    /** --- 发送 ping --- */
    public ping(data?: Buffer | string): boolean {
        return this._sendControl('ping', data);
    }

    /** --- 发送 ping --- */
    public pong(data?: Buffer | string): boolean {
        return this._sendControl('pong', data);
    }

    /**
     * --- 发送控制帧 ---
     * @param method 控制帧类型
     * @param data 控制帧数据
     * @returns 是否已直接写入底层 Socket 缓存
     */
    private _sendControl(method: 'ping' | 'pong', data?: Buffer | string): boolean {
        if (!this.writable) {
            return false;
        }
        ++this._pendingWrites;
        try {
            this._ws[method](data, this._masking, error => {
                --this._pendingWrites;
                if (error) {
                    this._emitError(error);
                }
                this._emitDrain();
            });
        }
        catch (error: unknown) {
            --this._pendingWrites;
            this._emitError(error);
            return false;
        }
        if (this._ws.bufferedAmount > 0) {
            this._writeBlocked = true;
            return false;
        }
        return true;
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
export function createServer(request: http.IncomingMessage, socket: net.Socket, head?: Buffer, options: {
    'headers'?: http.OutgoingHttpHeaders;
    'timeout'?: number;
} = {}): Socket {
    return new Socket(request, socket, head, options);
}

/**
 * --- 绑定 socket 管道 ---
 * @param s1 第一个 socket
 * @param s2 第二个 socket
 */
function bindPipe(s1: Socket, s2: Socket): Promise<IPipeCloseInfo> {
    return new Promise<IPipeCloseInfo>(resolve => {
        /** --- 是否已经完成关闭，防止双向 close 重复处理 --- */
        let closed: boolean = false;
        /** --- 来源侧关闭前最后收到的底层事件 --- */
        let sourceEvent: TPipeCloseEvent = 'close';
        /** --- 目标侧关闭前最后收到的底层事件 --- */
        let targetEvent: TPipeCloseEvent = 'close';
        /** --- 来源侧最后一个错误 --- */
        let sourceError: unknown;
        /** --- 目标侧最后一个错误 --- */
        let targetError: unknown;
        /** --- 来源侧 WebSocket 关闭信息 --- */
        let sourceCloseInfo: ISocketCloseInfo | undefined;
        /** --- 目标侧 WebSocket 关闭信息 --- */
        let targetCloseInfo: ISocketCloseInfo | undefined;
        /** --- 两端一起销毁，避免半开连接继续占用资源 --- */
        const close = (side: TPipeSide): void => {
            if (closed) {
                return;
            }
            closed = true;
            const info: IPipeCloseInfo = side === 'source' ? {
                'side': side,
                'event': sourceEvent,
                'error': sourceError,
                ...sourceCloseInfo,
            } : {
                'side': side,
                'event': targetEvent,
                'error': targetError,
                ...targetCloseInfo,
            };
            s1.destroy();
            s2.destroy();
            resolve(info);
        };
        // --- 监听发送端的 ---
        s1.on('message', (msg) => {
            switch (msg.opcode) {
                case EOpcode.TEXT: {
                    if (!s2.writeText(msg.data.toString())) {
                        s1.pause();
                    }
                    break;
                }
                case EOpcode.BINARY: {
                    if (!s2.writeBinary(msg.data)) {
                        s1.pause();
                    }
                    break;
                }
                case EOpcode.CLOSE: {
                    close('source');
                    break;
                }
                case EOpcode.PING: {
                    if (!s2.ping(msg.data)) {
                        s1.pause();
                    }
                    break;
                }
                case EOpcode.PONG: {
                    if (!s2.pong(msg.data)) {
                        s1.pause();
                    }
                    break;
                }
                default: {
                    // --- EOpcode.CONTINUATION ---
                }
            }
        }).on('error', (error: unknown) => {
            if (sourceEvent !== 'timeout') {
                sourceEvent = 'error';
            }
            sourceError = error;
        }).on('end', () => {
            if (sourceEvent === 'close') {
                sourceEvent = 'end';
            }
        }).on('timeout', () => {
            sourceEvent = 'timeout';
        }).on('close', (info) => {
            sourceCloseInfo = info;
            close('source');
        }).on('drain', () => {
            s2.resume();
        });
        // --- 监听远程端的 ---
        s2.on('message', (msg) => {
            switch (msg.opcode) {
                case EOpcode.TEXT: {
                    if (!s1.writeText(msg.data.toString())) {
                        s2.pause();
                    }
                    break;
                }
                case EOpcode.BINARY: {
                    if (!s1.writeBinary(msg.data)) {
                        s2.pause();
                    }
                    break;
                }
                case EOpcode.CLOSE: {
                    close('target');
                    break;
                }
                case EOpcode.PING: {
                    if (!s1.ping(msg.data)) {
                        s2.pause();
                    }
                    break;
                }
                case EOpcode.PONG: {
                    if (!s1.pong(msg.data)) {
                        s2.pause();
                    }
                    break;
                }
                default: {
                    // --- EOpcode.CONTINUATION ---
                }
            }
        }).on('error', (error: unknown) => {
            if (targetEvent !== 'timeout') {
                targetEvent = 'error';
            }
            targetError = error;
        }).on('end', () => {
            if (targetEvent === 'close') {
                targetEvent = 'end';
            }
        }).on('timeout', () => {
            targetEvent = 'timeout';
        }).on('close', (info) => {
            targetCloseInfo = info;
            close('target');
        }).on('drain', () => {
            s1.resume();
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
    const headers = Object.assign(lUndici.filterHeaders(req.headers, undefined, opt.filter), opt.headers);
    // --- 发起请求 ---
    /** --- 远程端的双向 socket --- */
    const rsocket = await connect(get['url'], {
        ...opt,
        headers
    });
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
    const headers = Object.assign(lUndici.filterHeaders(req.headers, undefined, opt.filter), opt.headers);
    // --- 发起请求 ---
    /** --- 远程端的双向 socket --- */
    /** --- 目标连接的握手错误 --- */
    let connectError: unknown;
    const rsocket = await connect(url, {
        ...opt,
        headers,
        'onConnectError': (error: unknown): void => {
            connectError = error;
            opt.onConnectError?.(error);
        },
    });
    if (!rsocket) {
        const target = lText.parseUrl(url);
        const endpoint = `${target.protocol ?? 'ws:'}//${target.hostname ?? 'unknown'}${target.port ? `:${target.port}` : ''}`;
        lCore.log(ctr, `[WS][RPROXY][TARGET CONNECT ERROR] ${endpoint}: ${lText.stringifyError(connectError)}`, '-error');
        return false;
    }
    const info = await bindPipe(socket, rsocket);
    opt.onClose?.(info);
    if ((info.side === 'target') || (info.event === 'error') || (info.event === 'timeout')) {
        const target = lText.parseUrl(url);
        const endpoint = `${target.protocol ?? 'ws:'}//${target.hostname ?? 'unknown'}${target.port ? `:${target.port}` : ''}`;
        const error = info.error === undefined ? '' : `: ${lText.stringifyError(info.error)}`;
        const close = info.code === undefined ? '' : ` code=${info.code}${info.reason ? ` reason=${info.reason}` : ''}`;
        lCore.log(ctr, `[WS][RPROXY][${info.side.toUpperCase()} ${info.event.toUpperCase()}] ${endpoint}${close}${error}`, '-error');
    }
    return true;
}

/**
 * --- 反向代理，将本 websocket 连接反代到其他真正的 socket，在 ws 的 onLoad 事件中使用 ---
 * @param ctr 当前控制器
 * @param host 反代真实请求地址
 * @param port 反代真实请求端口
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
            socket.setKeepAlive(true);
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

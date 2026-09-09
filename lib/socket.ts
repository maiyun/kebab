/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-9-25 16:49:45
 * Last: 2025-9-25 16:49:48
 */
import net from 'net';
import * as lUndici from '#kebab/lib/undici.js';
import * as lTime from '#kebab/lib/time.js';
import * as lWs from '#kebab/lib/ws.js';
import * as lCore from '#kebab/lib/core.js';
import * as lCokie from '#kebab/lib/cookie.js';

export interface IRwebsocketOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    'hosts'?: Record<string, string>;
    'local'?: string;
    'headers'?: lUndici.THttpHeaders;
    /** --- cookie 托管对象 --- */
    'cookie'?: Record<string, lCokie.ICookie>;
    /** --- 小帧模式，默认 false --- */
    'mode'?: lWs.EFrameReceiveMode;
    /** --- 加密模式，默认 true --- */
    'masking'?: boolean;
    /** --- 正向 mproxy 代理，url 如 wss://xxx/abc --- */
    'mproxy'?: {
        'url': string;
        'auth': string;
    };
}

/**
 * --- 创建一个 Socket 服务器并反代到 WebSocket ---
 * @param port 监听端口
 * @param url 反代到的 WebSocket
 * @param opt 选项
 */
export function rwebsocket(
    port: number,
    url: string,
    opt: IRwebsocketOptions = {}
): net.Server {
    /** --- 请求端产生的双向 socket --- */
    const server = net.createServer(socket => {
        socket.setKeepAlive(true);
        /** --- 远程端的双向 WebSocket --- */
        let rws: lWs.Socket | null = null;
        /** --- 心跳定时器 --- */
        let timer: NodeJS.Timeout | null = null;
        /** --- 是否已开始清理 --- */
        let closed: boolean = false;
        /** --- 同时清理 TCP、WebSocket 与心跳 --- */
        const close = (): void => {
            if (closed) {
                return;
            }
            closed = true;
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            socket.destroy();
            rws?.destroy();
        };
        // --- 必须在异步连接前监听，避免本地先断开后留下远端连接 ---
        socket.on('close', close).on('error', err => {
            lCore.display('[' + lTime.format(null, 'Y-m-d H:i:s') + '] Client error: ' + socket.remoteAddress + ':' + socket.remotePort + ', ' + err.message);
            close();
        });
        (async () => {
            // --- 每次进一个新连接都反代到一个新 WebSocket ---
            lCore.display('[' + lTime.format(null, 'Y-m-d H:i:s') + '] New client: ' + socket.remoteAddress + ':' + socket.remotePort);
            rws = await lWs.connect(url, opt);
            if (!rws) {
                close();
                return false;
            }
            if (closed) {
                rws.destroy();
                return false;
            }
            timer = setInterval(() => {
                rws?.ping();
            }, 10_000);
            rws.on('message', msg => {
                switch (msg.opcode) {
                    case lWs.EOpcode.TEXT:
                    case lWs.EOpcode.BINARY: {
                        if (!socket.write(msg.data)) {
                            rws?.pause();
                        }
                        break;
                    }
                    case lWs.EOpcode.CLOSE: {
                        close();
                        break;
                    }
                    case lWs.EOpcode.PING: {
                        rws?.pong();
                        break;
                    }
                    case lWs.EOpcode.PONG: {
                        break;
                    }
                    default: {
                        // --- EOpcode.CONTINUATION ---
                    }
                }
            }).on('drain', () => {
                socket.resume();
            }).on('close', close);
            socket.on('data', data => {
                if (rws && !rws.writeBinary(data)) {
                    socket.pause();
                }
            }).on('drain', () => {
                rws?.resume();
            }).on('end', () => {
                lCore.display('[' + lTime.format(null, 'Y-m-d H:i:s') + '] Client disconnected: ' + socket.remoteAddress + ':' + socket.remotePort);
                close();
            });
        })().catch(() => {});
    }).listen(port, () => {
        lCore.display('[' + lTime.format(null, 'Y-m-d H:i:s') + '] Listening: ' + port);
    });
    return server;
}

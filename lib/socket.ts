/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-9-25 16:49:45
 * Last: 2025-9-25 16:49:48
 */
import net from 'net';
import * as lNet from '#kebab/lib/net.js';
import * as lWs from '#kebab/lib/ws.js';
import * as lCore from '#kebab/lib/core.js';

export interface IRwebsocketOptions {
    /** --- 秒数 --- */
    'timeout'?: number;
    'hosts'?: Record<string, string>;
    'local'?: string;
    'headers'?: lNet.THttpHeaders;
    /** --- cookie 托管对象 --- */
    'cookie'?: Record<string, lNet.ICookie>;
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
        (async () => {
            // --- 每次进一个新连接都反代到一个新 WebSocket ---
            lCore.display('New client: ' + socket.remoteAddress + ':' + socket.remotePort);
            /** --- 远程端的双向 websocket --- */
            const rws = await lWs.connect(url, opt);
            if (!rws) {
                return false;
            }
            rws.on('message', msg => {
                switch (msg.opcode) {
                    case lWs.EOpcode.TEXT:
                    case lWs.EOpcode.BINARY: {
                        socket.write(msg.data);
                        break;
                    }
                    case lWs.EOpcode.CLOSE: {
                        socket.end();
                        break;
                    }
                    case lWs.EOpcode.PING: {
                        rws.pong();
                        break;
                    }
                    case lWs.EOpcode.PONG: {
                        break;
                    }
                    default: {
                        // --- EOpcode.CONTINUATION ---
                    }
                }
            }).on('close', () => {
                socket.end();
            });
            socket.on('data', data => {
                rws.writeBinary(data);
            }).on('end', () => {
                rws.end();
                lCore.display('Client disconnected: ' + socket.remoteAddress + ':' + socket.remotePort);
            }).on('error', err => {
                lCore.display('Client error: ' + socket.remoteAddress + ':' + socket.remotePort + ', ' + err.message);
            });
        })().catch(() => {});
    }).listen(port, () => {
        lCore.display('Listening:' + port);
    });
    return server;
}

import net from 'node:net';
import { once } from 'node:events';

function encodeResp(value) {
    if (value === null) return '$-1\r\n';
    if (value instanceof Error) return `-${value.message}\r\n`;
    if (typeof value === 'number') return `:${value}\r\n`;
    if (typeof value === 'string') {
        return `$${Buffer.byteLength(value)}\r\n${value}\r\n`;
    }
    if (value && typeof value === 'object' && 'simple' in value) {
        return `+${value.simple}\r\n`;
    }
    if (Array.isArray(value)) {
        return `*${value.length}\r\n${value.map(encodeResp).join('')}`;
    }
    throw new Error(`Unsupported RESP value: ${String(value)}`);
}

export async function createMockRedis(handler) {
    const sockets = new Set();
    const connections = [];
    const server = net.createServer(socket => {
        sockets.add(socket);
        const history = [];
        const connState = { socket, history };
        connections.push(connState);
        let buf = Buffer.alloc(0);
        socket.on('data', chunk => {
            buf = Buffer.concat([buf, chunk]);
            while (buf.length > 0) {
                const nl = buf.indexOf('\r\n');
                if (nl === -1) return;
                const count = Number.parseInt(buf.subarray(1, nl).toString('utf8'), 10);
                let pos = nl + 2;
                const args = [];
                let complete = true;
                for (let i = 0; i < count; ++i) {
                    const lenEnd = buf.indexOf('\r\n', pos);
                    if (lenEnd === -1) { complete = false; break; }
                    const byteLen = Number.parseInt(buf.subarray(pos + 1, lenEnd).toString('utf8'), 10);
                    const valStart = lenEnd + 2;
                    const valEnd = valStart + byteLen;
                    if (buf.length < valEnd + 2) { complete = false; break; }
                    args.push(buf.subarray(valStart, valEnd).toString('utf8'));
                    pos = valEnd + 2;
                }
                if (!complete) return;
                buf = buf.subarray(pos);
                history.push(args);
                const reply = handler(args, connState);
                if (reply && typeof reply.then === 'function') {
                    reply.then(r => {
                        if (!socket.destroyed) socket.write(encodeResp(r));
                    });
                }
                else {
                    socket.write(encodeResp(reply));
                }
            }
        });
    });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const port = server.address().port;
    return {
        port,
        connections,
        async close(clients = []) {
            for (const c of clients) {
                c?.destroy();
            }
            for (const s of sockets) s.destroy();
            await new Promise(resolve => server.close(resolve));
        },
    };
}

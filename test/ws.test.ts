import * as assert from 'node:assert/strict';
import * as http from 'node:http';
import type * as net from 'node:net';
import * as nodeTest from 'node:test';
import WebSocket from 'ws';

import * as lWs from '#kebab/lib/ws.js';
import type * as sCtr from '#kebab/sys/ctr.js';

await nodeTest.test('WebSocket supports upgrade, host mapping, backpressure and transport pause', async () => {
    const server = http.createServer();
    let serverSocket: lWs.Socket | undefined;
    let serverClose: lWs.ISocketCloseInfo | undefined;
    let requestHost = '';

    server.on('upgrade', (request, socket, head) => {
        if (request.url === '/reject') {
            socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\nContent-Length: 0\r\n\r\n');
            return;
        }
        requestHost = request.headers.host ?? '';
        serverSocket = lWs.createServer(request, socket as net.Socket, head, {
            'headers': {
                'x-kebab-ws': 'ws',
            },
            'timeout': 5_000,
        });
        serverSocket.on('message', message => {
            switch (message.opcode) {
                case lWs.EOpcode.TEXT: {
                    serverSocket?.writeText(message.data);
                    break;
                }
                case lWs.EOpcode.BINARY: {
                    serverSocket?.writeBinary(message.data);
                    break;
                }
                case lWs.EOpcode.PING: {
                    serverSocket?.pong(message.data);
                    break;
                }
                default: {
                    break;
                }
            }
        }).on('close', info => {
            serverClose = info;
        });
    });

    await new Promise<void>((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', resolve);
    });

    try {
        const address = server.address();
        assert.ok(address && typeof address === 'object');
        const client = await lWs.connect(`ws://kebab.test:${address.port}/test`, {
            'hosts': {
                'kebab.test': '127.0.0.1',
            },
            'timeout': 5,
        });
        assert.ok(client);
        assert.strictEqual(requestHost, `kebab.test:${address.port}`);

        const received: Buffer[] = [];
        let pong = '';
        let drainCount = 0;
        const completed = new Promise<void>((resolve, reject) => {
            const timer = setTimeout(() => { reject(new Error('Timed out waiting for WebSocket data.')); }, 10_000);
            client.on('message', message => {
                if (message.opcode === lWs.EOpcode.PONG) {
                    pong = message.data.toString();
                }
                else {
                    received.push(message.data);
                }
                if ((received.length === 2) && (pong === 'heartbeat')) {
                    clearTimeout(timer);
                    resolve();
                }
            }).on('drain', () => {
                ++drainCount;
            }).on('error', reject);
        });

        client.pause();
        const textWritable = client.writeText('hello');
        const large = Buffer.alloc(4 * 1024 * 1024, 0x5a);
        const binaryWritable = client.writeBinary(large);
        const pingWritable = client.ping('heartbeat');
        assert.ok(!textWritable || !binaryWritable || !pingWritable);
        setTimeout(() => { client.resume(); }, 100);

        await completed;
        assert.strictEqual(received[0].toString(), 'hello');
        assert.deepStrictEqual(received[1], large);
        assert.strictEqual(pong, 'heartbeat');
        assert.ok(drainCount >= 1);

        const closeReason = 'temporary server error';
        client.end(1011, closeReason);
        await new Promise<void>((resolve, reject) => {
            const timer = setTimeout(() => { reject(new Error('Timed out waiting for close.')); }, 5_000);
            client.on('close', info => {
                clearTimeout(timer);
                assert.strictEqual(info.code, 1011);
                assert.strictEqual(info.reason, closeReason);
                resolve();
            });
        });
        assert.strictEqual(serverClose?.code, 1011);
        assert.strictEqual(serverClose.reason, closeReason);

        let upgradeHeader = '';
        const nativeClient = new WebSocket(`ws://127.0.0.1:${address.port}/headers`, {
            'perMessageDeflate': false,
        });
        nativeClient.once('upgrade', response => {
            const value = response.headers['x-kebab-ws'];
            upgradeHeader = Array.isArray(value) ? value[0] ?? '' : value ?? '';
        });
        await new Promise<void>((resolve, reject) => {
            nativeClient.once('open', resolve);
            nativeClient.once('error', reject);
        });
        assert.strictEqual(upgradeHeader, 'ws');
        nativeClient.close(1000);
        await new Promise<void>(resolve => nativeClient.once('close', () => { resolve(); }));

        let connectError: unknown;
        const rejected = await lWs.connect(`ws://127.0.0.1:${address.port}/reject`, {
            'onConnectError': error => {
                connectError = error;
            },
            'timeout': 5,
        });
        assert.strictEqual(rejected, null);
        assert.match(String(connectError), /403 Forbidden/);
    }
    finally {
        serverSocket?.destroy();
        await new Promise<void>(resolve => server.close(() => { resolve(); }));
    }
});

await nodeTest.test('WebSocket pipe forwards explicit reasons without exposing transport errors', async () => {
    const targetServer = http.createServer();
    const proxyServer = http.createServer();
    const expectedReason = 'target temporarily unavailable';
    let targetSocket: lWs.Socket | undefined;
    let proxySocket: lWs.Socket | undefined;
    const proxyTasks: Array<Promise<number>> = [];

    targetServer.on('upgrade', (request, socket, head) => {
        targetSocket = lWs.createServer(request, socket as net.Socket, head);
        if (request.url === '/transport-error') {
            setTimeout(() => targetSocket?.destroy(), 20);
        }
        else {
            setTimeout(() => targetSocket?.end(1011, expectedReason), 20);
        }
    });
    await new Promise<void>((resolve, reject) => {
        targetServer.once('error', reject);
        targetServer.listen(0, '127.0.0.1', resolve);
    });
    const targetAddress = targetServer.address();
    assert.ok(targetAddress && typeof targetAddress === 'object');

    proxyServer.on('upgrade', (request, socket, head) => {
        proxySocket = lWs.createServer(request, socket as net.Socket, head);
        const targetPath = request.url === '/proxy-transport-error' ? 'transport-error' : 'explicit-close';
        const values = {
            '_req': request,
            '_socket': proxySocket,
            '_get': {
                'auth': 'test',
                'url': `ws://127.0.0.1:${targetAddress.port}/${targetPath}`,
            },
        };
        const ctr = {
            getPrototype(name: keyof typeof values): typeof values[keyof typeof values] {
                return values[name];
            },
        } as unknown as sCtr.Ctr;
        proxyTasks.push(lWs.mproxy(ctr, 'test'));
    });
    await new Promise<void>((resolve, reject) => {
        proxyServer.once('error', reject);
        proxyServer.listen(0, '127.0.0.1', resolve);
    });

    try {
        const proxyAddress = proxyServer.address();
        assert.ok(proxyAddress && typeof proxyAddress === 'object');
        const client = await lWs.connect(`ws://127.0.0.1:${proxyAddress.port}/proxy`);
        assert.ok(client);
        const info = await new Promise<lWs.ISocketCloseInfo>((resolve, reject) => {
            const timer = setTimeout(() => { reject(new Error('Timed out waiting for piped close reason.')); }, 5_000);
            client.on('close', closeInfo => {
                clearTimeout(timer);
                resolve(closeInfo);
            });
        });
        assert.strictEqual(info.code, 1011);
        assert.strictEqual(info.reason, expectedReason);

        const transportErrorClient = await lWs.connect(
            `ws://127.0.0.1:${proxyAddress.port}/proxy-transport-error`
        );
        assert.ok(transportErrorClient);
        const transportErrorInfo = await new Promise<lWs.ISocketCloseInfo>((resolve, reject) => {
            const timer = setTimeout(() => { reject(new Error('Timed out waiting for transport error close.')); }, 5_000);
            transportErrorClient.on('close', closeInfo => {
                clearTimeout(timer);
                resolve(closeInfo);
            });
        });
        assert.strictEqual(transportErrorInfo.code, 1011);
        assert.strictEqual(transportErrorInfo.reason, '');
    }
    finally {
        await Promise.all(proxyTasks);
        proxySocket?.destroy();
        targetSocket?.destroy();
        await new Promise<void>(resolve => proxyServer.close(() => { resolve(); }));
        await new Promise<void>(resolve => targetServer.close(() => { resolve(); }));
    }
});

import * as assert from 'node:assert/strict';
import * as http from 'node:http';
import type { AddressInfo } from 'node:net';
import * as nodeTest from 'node:test';
import * as timers from 'node:timers/promises';

import * as lUndici from '#kebab/lib/undici.js';

/**
 * --- 启动记录客户端端口的临时 HTTP 服务 ---
 * @returns 服务、访问地址和收到请求的客户端端口列表
 */
async function listen(): Promise<{
    'server': http.Server;
    'url': string;
    'ports': number[];
}> {
    const ports: number[] = [];
    const server = http.createServer((req, res) => {
        ports.push(req.socket.remotePort ?? 0);
        res.setHeader('Keep-Alive', 'timeout=60');
        res.end('ok');
    });
    await new Promise<void>((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', () => {
            server.off('error', reject);
            resolve();
        });
    });
    const address = server.address() as AddressInfo;
    return {
        server,
        'url': `http://127.0.0.1:${address.port}`,
        ports,
    };
}

/**
 * --- 发起请求并完整读取响应，确保连接返回复用池 ---
 * @param url 请求地址
 * @param opt 请求选项
 */
async function request(url: string, opt: lUndici.IRequestOptions): Promise<void> {
    const res = await lUndici.get(url, {
        ...opt,
        'log': false,
    });
    assert.strictEqual((await res.getContent())?.toString(), 'ok');
}

/**
 * --- 关闭临时 HTTP 服务 ---
 * @param server HTTP 服务
 */
async function close(server: http.Server): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        server.close((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}

await nodeTest.test('keepAliveTimeout caps the idle reuse time despite a longer server hint', async () => {
    const { server, url, ports } = await listen();
    try {
        const opt = { 'keepAliveTimeout': 0.05 };
        await request(url, opt);
        await timers.setTimeout(150);
        await request(url, opt);
        assert.strictEqual(ports.length, 2);
        assert.notStrictEqual(ports[0], ports[1]);
    }
    finally {
        await close(server);
    }
});

await nodeTest.test('reuseTimeout retires an aged connection before the idle timeout', async () => {
    const { server, url, ports } = await listen();
    try {
        const opt = {
            'keepAliveTimeout': 1,
            'reuseTimeout': 0.1,
        };
        await request(url, opt);
        /** --- 等待响应连接完成回池，避免同一事件循环内并行创建新连接 --- */
        await timers.setTimeout(20);
        await request(url, opt);
        assert.strictEqual(ports[0], ports[1]);
        await timers.setTimeout(150);
        await request(url, opt);
        assert.notStrictEqual(ports[1], ports[2]);
    }
    finally {
        await close(server);
    }
});

await nodeTest.test('invalid reuse timeouts fall back to Undici defaults', async () => {
    const { server, url, ports } = await listen();
    try {
        await request(url, {
            'keepAliveTimeout': Number.NaN,
            'reuseTimeout': 0,
        });
        assert.strictEqual(ports.length, 1);
    }
    finally {
        await close(server);
    }
});

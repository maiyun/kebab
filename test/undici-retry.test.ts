import * as assert from 'node:assert/strict';
import * as http from 'node:http';
import type { AddressInfo } from 'node:net';
import * as nodeTest from 'node:test';

import * as lUndici from '#kebab/lib/undici.js';

/**
 * --- 启动临时 HTTP 服务 ---
 * @param handler 请求处理方法
 * @returns 服务和访问地址
 */
async function listen(handler: http.RequestListener): Promise<{
    'server': http.Server;
    'url': string;
}> {
    const server = http.createServer(handler);
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
    };
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

await nodeTest.test('Undici does not retry network errors by default', async () => {
    let count = 0;
    const { server, url } = await listen((_req, res) => {
        ++count;
        res.destroy();
    });
    try {
        const res = await lUndici.get(url, { 'log': false });
        assert.strictEqual(await res.getContent(), null);
        assert.strictEqual(count, 1);
        assert.notStrictEqual(res.error, null);
    }
    finally {
        await close(server);
    }
});

await nodeTest.test('Undici retries configured network errors', async () => {
    let count = 0;
    const { server, url } = await listen((_req, res) => {
        ++count;
        if (count < 3) {
            res.destroy();
            return;
        }
        res.end('ok');
    });
    try {
        const res = await lUndici.get(url, { 'log': false, 'retry': 2 });
        assert.strictEqual((await res.getContent())?.toString(), 'ok');
        assert.strictEqual(count, 3);
        assert.strictEqual(res.error, null);
    }
    finally {
        await close(server);
    }
});

await nodeTest.test('Undici retries a network error while reading response content', async () => {
    let count = 0;
    let range = '';
    let ifMatch = '';
    const { server, url } = await listen((req, res) => {
        ++count;
        if (count === 1) {
            res.writeHead(200, {
                'content-length': '2',
                'etag': '"v1"',
            });
            res.flushHeaders();
            res.write('o');
            setImmediate(() => {
                res.destroy();
            });
            return;
        }
        range = req.headers['range'] ?? '';
        ifMatch = req.headers['if-match'] ?? '';
        res.writeHead(206, {
            'content-length': '1',
            'content-range': 'bytes 1-1/2',
            'etag': '"v1"',
        });
        res.end('k');
    });
    try {
        const res = await lUndici.open(url).retry().request();
        const content = await res.getContent();
        assert.strictEqual(count, 2);
        assert.strictEqual(range, 'bytes=1-1');
        assert.strictEqual(ifMatch, '"v1"');
        assert.strictEqual(content?.toString(), 'ok');
        assert.strictEqual(res.error, null);
    }
    finally {
        await close(server);
    }
});

await nodeTest.test('Undici does not retry HTTP error statuses', async () => {
    let count = 0;
    const { server, url } = await listen((_req, res) => {
        ++count;
        res.writeHead(503);
        res.end('busy');
    });
    try {
        const res = await lUndici.get(url, { 'log': false, 'retry': 2 });
        assert.strictEqual((await res.getContent())?.toString(), 'busy');
        assert.strictEqual(res.headers?.['http-code'], 503);
        assert.strictEqual(count, 1);
    }
    finally {
        await close(server);
    }
});

await nodeTest.test('ResponseJson does not retry JSON parse errors by default', async () => {
    let count = 0;
    const { server, url } = await listen((_req, res) => {
        ++count;
        res.end(count === 1 ? 'invalid json' : '{"result":1}');
    });
    try {
        const json = await lUndici.getResponseJson(url, { 'log': false });
        assert.strictEqual(json, false);
        assert.strictEqual(count, 1);
    }
    finally {
        await close(server);
    }
});

await nodeTest.test('ResponseJson retries configured JSON parse errors', async () => {
    let count = 0;
    const { server, url } = await listen((_req, res) => {
        ++count;
        res.end(count === 1 ? 'invalid json' : '{"result":1}');
    });
    try {
        const json = await lUndici.getResponseJson(url, { 'log': false, 'retryJson': 1 });
        assert.deepStrictEqual(json, { 'result': 1 });
        assert.strictEqual(count, 2);
    }
    finally {
        await close(server);
    }
});

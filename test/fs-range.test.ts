import * as assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import * as http from 'node:http';
import * as http2 from 'node:http2';
import type { AddressInfo } from 'node:net';
import * as os from 'node:os';
import * as path from 'node:path';
import * as nodeTest from 'node:test';
import * as zlib from 'node:zlib';

import * as lFs from '#kebab/lib/fs.js';

/** --- 实际 HTTP 响应，正文保持字节形式 --- */
interface IFileResponse {
    'status': number;
    'headers': http.IncomingHttpHeaders | http2.IncomingHttpHeaders;
    'body': Buffer;
}

/** --- 测试文件内容及临时服务 --- */
const content = Buffer.from('0123456789');
const text = Buffer.from('Kebab 文件范围检查\n'.repeat(200));
let directory = '';
let httpPort = 0;
let http2Port = 0;
let completeLarge: (() => void) | undefined;

/**
 * --- 将临时文件交给实际文件输出函数 ---
 * @param req 请求
 * @param res 响应
 * @returns 无返回值
 */
function handle(
    req: http.IncomingMessage | http2.Http2ServerRequest,
    res: http.ServerResponse | http2.Http2ServerResponse
): void {
    const filename = req.url === '/text' || req.url === '/vary' ? 'fixture.txt' :
        req.url === '/empty' ? 'empty.bin' : req.url === '/large' ? 'large.bin' :
        req.url === '/missing' ? 'missing.bin' : 'fixture.bin';
    if (req.url === '/vary') {
        res.setHeader('vary', 'Origin');
    }
    void lFs.readToResponse(path.join(directory, filename), req, res).catch(() => {
        res.destroy();
    }).finally(() => {
        if (req.url === '/large') {
            completeLarge?.();
        }
    });
}

const server = http.createServer(handle);
const server2 = http2.createServer(handle);

/**
 * --- 使用临时端口启动隔离测试服务 ---
 * @param target HTTP 服务
 * @returns 监听端口
 */
async function listen(target: http.Server | http2.Http2Server): Promise<number> {
    await new Promise<void>((resolve, reject) => {
        target.once('error', reject);
        target.listen(0, '127.0.0.1', () => {
            target.off('error', reject);
            resolve();
        });
    });
    return (target.address() as AddressInfo).port;
}

/**
 * --- 发起真实 HTTP/1.1 请求，检查线上传输的字节 ---
 * @param headers 请求头
 * @param url 文件地址
 * @param method 请求方法
 * @returns 状态、响应头和正文
 */
function request(headers: http.OutgoingHttpHeaders = {}, url = '/', method = 'GET'): Promise<IFileResponse> {
    return new Promise((resolve, reject) => {
        const req = http.request({
            'hostname': '127.0.0.1', 'port': httpPort, 'path': url, method, headers, 'agent': false,
        }, (res) => {
            const chunks: Buffer[] = [];
            res.on('data', (chunk: Buffer) => chunks.push(chunk));
            res.once('error', reject);
            res.once('end', () => {
                resolve({ 'status': res.statusCode ?? 0, 'headers': res.headers, 'body': Buffer.concat(chunks) });
            });
        });
        req.once('error', reject);
        req.setTimeout(5_000, () => req.destroy(new Error('File response timeout')));
        req.end();
    });
}

/**
 * --- 发起真实 HTTP/2 请求 ---
 * @param headers 请求头
 * @returns 状态、响应头和正文
 */
function request2(headers: http2.OutgoingHttpHeaders = {}): Promise<IFileResponse> {
    return new Promise((resolve, reject) => {
        const client = http2.connect(`http://127.0.0.1:${http2Port}`);
        client.once('error', reject);
        const req = client.request({ ':path': '/', ...headers });
        let responseHeaders: http2.IncomingHttpHeaders = {};
        const chunks: Buffer[] = [];
        req.once('response', (value) => { responseHeaders = value; });
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.once('error', (error) => {
            client.destroy();
            reject(error);
        });
        req.once('end', () => {
            client.close();
            resolve({
                'status': Number(responseHeaders[':status']), 'headers': responseHeaders, 'body': Buffer.concat(chunks),
            });
        });
        req.setTimeout(5_000, () => req.destroy(new Error('HTTP/2 file response timeout')));
        req.end();
    });
}

/**
 * --- 验证 multipart 的完整边界、逐段头部与长度 ---
 * @param response 文件响应
 * @param ranges 预期区间，按响应顺序
 * @returns 无返回值
 */
function checkMultipart(response: IFileResponse, ranges: Array<[number, number]>): void {
    assert.strictEqual(response.status, 206);
    assert.strictEqual(response.headers['content-range'], undefined);
    const match = /^multipart\/byteranges; boundary=(.+)$/.exec(String(response.headers['content-type']));
    assert.ok(match);
    const boundary = match[1];
    const parts = ranges.map(([start, end]) =>
        `--${boundary}\r\nContent-Type: application/octet-stream\r\nContent-Range: bytes ${start}-${end}/10\r\n\r\n${content.subarray(start, end + 1).toString()}\r\n`
    );
    const expected = Buffer.from(`${parts.join('')}--${boundary}--\r\n`);
    assert.deepStrictEqual(response.body, expected);
    assert.strictEqual(Number(response.headers['content-length']), expected.length);
}

await nodeTest.describe('readToResponse', async () => {
    nodeTest.before(async () => {
        directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-fs-range-'));
        await fs.writeFile(path.join(directory, 'fixture.bin'), content);
        await fs.writeFile(path.join(directory, 'fixture.txt'), text);
        await fs.writeFile(path.join(directory, 'empty.bin'), '');
        await fs.writeFile(path.join(directory, 'large.bin'), '');
        await fs.truncate(path.join(directory, 'large.bin'), 32 * 1024 * 1024);
        // --- 固定修改时间，避免条件请求用例依赖运行时钟 ---
        const date = new Date('2025-01-01T00:00:00Z');
        await fs.utimes(path.join(directory, 'fixture.bin'), date, date);
        httpPort = await listen(server);
        http2Port = await listen(server2);
    });

    nodeTest.after(async () => {
        for (const target of [server, server2]) {
            if (target.listening) {
                await new Promise<void>((resolve) => {
                    target.close(() => { resolve(); });
                });
            }
        }
        if (directory !== '') {
            await fs.rm(directory, { 'recursive': true, 'force': true });
        }
    });

    await nodeTest.test('normal GET and HEAD advertise ranges and preserve full response metadata', async () => {
        const response = await request();
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.headers['accept-ranges'], 'bytes');
        assert.strictEqual(Number(response.headers['content-length']), 10);
        assert.strictEqual(response.headers['content-range'], undefined);
        assert.deepStrictEqual(response.body, content);
        const head = await request({ 'range': 'bytes=2-5' }, '/', 'HEAD');
        assert.strictEqual(head.status, 200);
        assert.strictEqual(Number(head.headers['content-length']), 10);
        assert.strictEqual(head.headers['content-range'], undefined);
        assert.strictEqual(head.headers['etag'], response.headers['etag']);
        assert.strictEqual(head.headers['last-modified'], response.headers['last-modified']);
        assert.strictEqual(head.body.length, 0);
    });

    await nodeTest.test('single ranges return exactly the requested bytes with inclusive offsets', async () => {
        const cases: Array<[string, number, number]> = [
            ['bytes=2-5', 2, 5], ['bytes=5-', 5, 9], ['bytes=-3', 7, 9], ['bytes=0-0', 0, 0],
            ['bytes=9-9', 9, 9], ['bytes=0-', 0, 9], ['bytes=8-100', 8, 9], ['bytes=-100', 0, 9],
            ['bytes=0002-0005', 2, 5], ['BYTES= 2-5', 2, 5], ['bytes=,2-5,', 2, 5],
            ['bytes=8-999999999999999999999999999999999', 8, 9],
            ['bytes=-999999999999999999999999999999999', 0, 9],
        ];
        for (const [range, start, end] of cases) {
            const response = await request({ range });
            assert.strictEqual(response.status, 206, range);
            assert.strictEqual(response.headers['content-range'], `bytes ${start}-${end}/10`, range);
            assert.strictEqual(Number(response.headers['content-length']), end - start + 1, range);
            assert.deepStrictEqual(response.body, content.subarray(start, end + 1), range);
        }
    });

    await nodeTest.test('unsatisfiable or excessive ranges return 416 and the complete file size', async () => {
        for (const range of [
            'bytes=10-', 'bytes=100-200', 'bytes=-0', 'bytes=10-20,-0',
            'bytes=999999999999999999999999999999999-',
            `bytes=${Array<string>(17).fill('0-0').join(',')}`,
            `bytes=0-${'9'.repeat(8192)}`,
        ]) {
            const response = await request({ range });
            assert.strictEqual(response.status, 416, range.slice(0, 80));
            assert.strictEqual(response.headers['content-range'], 'bytes */10');
            assert.strictEqual(Number(response.headers['content-length']), 0);
            assert.strictEqual(response.body.length, 0);
        }
    });

    await nodeTest.test('unknown units and invalid syntax fall back to a complete 200 response', async () => {
        for (const range of [
            'items=0-1', 'bytes=', 'bytes=-', 'bytes=5-2', 'bytes=2.0-5', 'bytes=+2-5',
            'bytes=2 - 5', 'bytes=a-b', 'bytes=0-1,5-2', 'bytes=0-1,garbage', 'bytes=,,,',
            'bytes=999999999999999999999999999999999-999999999999999999999999999999998',
        ]) {
            const response = await request({ range });
            assert.strictEqual(response.status, 200, range);
            assert.strictEqual(response.headers['content-range'], undefined, range);
            assert.deepStrictEqual(response.body, content, range);
        }
    });

    await nodeTest.test('multiple ranges preserve request order and return multipart bytes', async () => {
        checkMultipart(await request({ 'range': 'bytes=0-1,8-9' }), [[0, 1], [8, 9]]);
        checkMultipart(await request({ 'range': 'bytes=8-9, 0-1,100-' }), [[8, 9], [0, 1]]);
    });

    await nodeTest.test('adjacent and overlapping ranges coalesce and unsatisfiable parts are omitted', async () => {
        for (const range of ['bytes=0-2,2-5', 'bytes=3-5,0-2', 'bytes=0-5,1-2', 'bytes=0-5,100-']) {
            const response = await request({ range });
            assert.strictEqual(response.status, 206, range);
            assert.strictEqual(response.headers['content-range'], 'bytes 0-5/10', range);
            assert.deepStrictEqual(response.body, content.subarray(0, 6), range);
        }
        const response = await request({ 'range': `bytes=${Array<string>(16).fill('0-0').join(',')}` });
        assert.strictEqual(response.status, 206);
        assert.strictEqual(response.body.toString(), '0');
    });

    await nodeTest.test('empty files, missing files and non-GET requests retain their response semantics', async () => {
        for (const range of ['bytes=0-', 'bytes=-1']) {
            const response = await request({ range }, '/empty');
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.length, 0);
        }
        for (const method of ['GET', 'HEAD']) {
            const response = await request({ 'range': 'bytes=0-1' }, '/missing', method);
            assert.strictEqual(response.status, 404);
            assert.strictEqual(response.headers['content-range'], undefined);
            if (method === 'HEAD') {
                assert.strictEqual(response.body.length, 0);
            }
        }
        const response = await request({ 'range': 'bytes=0-1' }, '/', 'POST');
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.body, content);
    });

    await nodeTest.test('If-Range accepts the exact modification date and rejects stale or weak validators', async () => {
        const initial = await request();
        const response = await request({
            'range': 'bytes=5-', 'if-range': String(initial.headers['last-modified']),
        });
        assert.strictEqual(response.status, 206);
        assert.strictEqual(response.body.toString(), '56789');
        for (const ifRange of [
            'Tue, 31 Dec 2024 00:00:00 GMT', 'Thu, 02 Jan 2025 00:00:00 GMT',
            String(initial.headers['etag']), String(initial.headers['etag']).slice(2), 'invalid', '',
        ]) {
            const full = await request({ 'range': 'bytes=5-', 'if-range': ifRange });
            assert.strictEqual(full.status, 200, ifRange);
            assert.strictEqual(full.headers['content-range'], undefined);
            assert.deepStrictEqual(full.body, content);
        }
    });

    await nodeTest.test('cache validators take precedence over Range and If-None-Match overrides dates', async () => {
        const initial = await request();
        for (const headers of [
            { 'if-none-match': String(initial.headers['etag']) },
            { 'if-none-match': String(initial.headers['etag']).slice(2) },
            { 'if-none-match': `"different", ${String(initial.headers['etag'])}` },
            { 'if-none-match': '*' },
            { 'if-modified-since': String(initial.headers['last-modified']) },
        ]) {
            const response = await request({ ...headers, 'range': 'bytes=100-' });
            assert.strictEqual(response.status, 304);
            assert.strictEqual(response.headers['content-range'], undefined);
            assert.strictEqual(response.body.length, 0);
        }
        const response = await request({
            'if-none-match': '"different"', 'if-modified-since': String(initial.headers['last-modified']), 'range': 'bytes=0-1',
        });
        assert.strictEqual(response.status, 206);
        assert.strictEqual(response.body.toString(), '01');
    });

    await nodeTest.test('failed preconditions cannot produce partial file responses', async () => {
        const initial = await request();
        for (const headers of [
            { 'if-match': String(initial.headers['etag']) },
            { 'if-match': '"different"' },
            { 'if-unmodified-since': 'Tue, 31 Dec 2024 00:00:00 GMT' },
        ]) {
            const response = await request({ ...headers, 'range': 'bytes=0-1' });
            assert.strictEqual(response.status, 412);
            assert.strictEqual(response.headers['content-range'], undefined);
            assert.strictEqual(response.body.length, 0);
        }
        const response = await request({
            'if-match': '*', 'if-unmodified-since': 'Tue, 31 Dec 2024 00:00:00 GMT', 'range': 'bytes=0-1',
        });
        assert.strictEqual(response.status, 206);
        assert.strictEqual(response.body.toString(), '01');
    });

    await nodeTest.test('ranges use original bytes while full responses retain gzip and HEAD metadata', async () => {
        const full = await request({ 'accept-encoding': 'gzip' }, '/text');
        assert.strictEqual(full.status, 200);
        assert.strictEqual(full.headers['content-encoding'], 'gzip');
        assert.strictEqual(full.headers['vary'], 'Accept-Encoding');
        assert.deepStrictEqual(zlib.gunzipSync(full.body), text);
        const partial = await request({ 'accept-encoding': 'gzip', 'range': 'bytes=5-19' }, '/text');
        assert.strictEqual(partial.status, 206);
        assert.strictEqual(partial.headers['content-encoding'], undefined);
        assert.strictEqual(partial.headers['vary'], 'Accept-Encoding');
        assert.deepStrictEqual(partial.body, text.subarray(5, 20));
        const head = await request({ 'accept-encoding': 'gzip', 'range': 'bytes=5-19' }, '/text', 'HEAD');
        assert.strictEqual(head.status, 200);
        assert.strictEqual(head.headers['content-encoding'], 'gzip');
        assert.strictEqual(head.headers['content-length'], full.headers['content-length']);
        assert.strictEqual(head.body.length, 0);
        const fallback = await request({ 'accept-encoding': 'gzip', 'range': 'bytes=5-19', 'if-range': '"stale"' }, '/text');
        assert.strictEqual(fallback.status, 200);
        assert.deepStrictEqual(zlib.gunzipSync(fallback.body), text);
        // --- 同一日期覆盖压缩和原始内容，不能据此拼接两个不同编码的字节序列 ---
        const dateFallback = await request({
            'accept-encoding': 'gzip', 'range': 'bytes=5-', 'if-range': String(full.headers['last-modified']),
        }, '/text');
        assert.strictEqual(dateFallback.status, 200);
        assert.strictEqual(dateFallback.headers['content-encoding'], 'gzip');
        assert.deepStrictEqual(zlib.gunzipSync(dateFallback.body), text);
        const varied = await request({ 'range': 'bytes=0-1' }, '/vary');
        assert.strictEqual(varied.headers['vary'], 'Origin, Accept-Encoding');
    });

    await nodeTest.test('HTTP/2 serves single, multipart, unsatisfiable and HEAD responses', async () => {
        const single = await request2({ 'range': 'bytes=2-5' });
        assert.strictEqual(single.status, 206);
        assert.strictEqual(single.headers['content-range'], 'bytes 2-5/10');
        assert.strictEqual(single.body.toString(), '2345');
        checkMultipart(await request2({ 'range': 'bytes=0-1,8-9' }), [[0, 1], [8, 9]]);
        const invalid = await request2({ 'range': 'bytes=100-' });
        assert.strictEqual(invalid.status, 416);
        assert.strictEqual(invalid.headers['content-range'], 'bytes */10');
        assert.strictEqual(invalid.body.length, 0);
        const head = await request2({ ':method': 'HEAD', 'range': 'bytes=0-1' });
        assert.strictEqual(head.status, 200);
        assert.strictEqual(Number(head.headers['content-length']), 10);
        assert.strictEqual(head.body.length, 0);
    });

    await nodeTest.test('separate range requests reconstruct a resumed download byte for byte', async () => {
        const first = await request({ 'range': 'bytes=0-3' });
        const remainder = await request({ 'range': 'bytes=4-', 'if-range': String(first.headers['last-modified']) });
        assert.strictEqual(first.status, 206);
        assert.strictEqual(remainder.status, 206);
        assert.deepStrictEqual(Buffer.concat([first.body, remainder.body]), content);
    });

    await nodeTest.test('aborting a partial download completes the file pipeline', { 'timeout': 5_000 }, async () => {
        const completed = new Promise<void>((resolve) => { completeLarge = resolve; });
        await new Promise<void>((resolve, reject) => {
            const req = http.get({
                'hostname': '127.0.0.1', 'port': httpPort, 'path': '/large', 'agent': false,
                'headers': { 'range': 'bytes=0-16777215,25165824-' },
            }, (res) => {
                let received = 0;
                res.on('data', (chunk: Buffer) => {
                    received += chunk.length;
                    // --- 等文件内容开始传输再取消，不能只收到 multipart 头就结束 ---
                    if (received >= 64 * 1024) {
                        res.destroy();
                        resolve();
                    }
                });
                res.once('error', reject);
            });
            req.once('error', reject);
        });
        await completed;
        completeLarge = undefined;
    });
});

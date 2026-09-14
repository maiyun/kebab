import * as assert from 'node:assert/strict';
import * as http from 'node:http';
import * as http2 from 'node:http2';
import * as stream from 'node:stream';
import * as nodeTest from 'node:test';

import * as sCtr from '#kebab/sys/ctr.js';
import * as sRoute from '#kebab/sys/route.js';

interface IRequestMock extends stream.PassThrough {
    'aborted': boolean;
    'complete': boolean;
    'headers': http.IncomingHttpHeaders;
}

/**
 * --- 创建普通 POST 请求流测试对象 ---
 * @param contentType 请求内容类型
 * @returns 请求流测试对象
 */
function createRequest(contentType: string): IRequestMock {
    const req = new stream.PassThrough() as IRequestMock;
    req.aborted = false;
    req.complete = false;
    req.headers = {
        'content-type': contentType,
    };
    return req;
}

await nodeTest.test('HTTP request availability rejects a closed HTTP/2 stream while the connection stays writable', () => {
    const req = {
        'aborted': false,
        'complete': true,
        'destroyed': false,
        'socket': {
            'destroyed': false,
            'writable': true,
        },
        'stream': {
            'closed': true,
            'destroyed': false,
        },
    } as unknown as http2.Http2ServerRequest;
    const res = {
        'closed': false,
        'destroyed': false,
        'writable': true,
        'writableEnded': false,
    } as http2.Http2ServerResponse;

    assert.strictEqual(sCtr.isHttpRequestAvailable(req, res), false);
});

await nodeTest.test('HTTP request availability accepts a completed request body while the response stays writable', () => {
    const req = {
        'aborted': false,
        'complete': true,
        'destroyed': true,
        'socket': {
            'destroyed': false,
            'writable': true,
        },
    } as http.IncomingMessage;
    const res = {
        'closed': false,
        'destroyed': false,
        'writable': true,
        'writableEnded': false,
    } as http.ServerResponse;

    assert.strictEqual(sCtr.isHttpRequestAvailable(req, res), true);
});

await nodeTest.test('getPost parses JSON and form bodies normally', async () => {
    const jsonReq = createRequest('application/json');
    const jsonPromise = sRoute.getPost(jsonReq as unknown as http.IncomingMessage);
    jsonReq.complete = true;
    jsonReq.end('{"name":"Kebab"}');
    assert.deepStrictEqual(await jsonPromise, {
        'input': '{"name":"Kebab"}',
        'raw': { 'name': 'Kebab' },
        'post': { 'name': 'Kebab' },
    });

    const formReq = createRequest('application/x-www-form-urlencoded');
    const formPromise = sRoute.getPost(formReq as unknown as http.IncomingMessage);
    formReq.complete = true;
    formReq.end('name=Kebab');
    assert.deepStrictEqual(await formPromise, {
        'input': 'name=Kebab',
        'raw': { 'name': 'Kebab' },
        'post': { 'name': 'Kebab' },
    });
});

await nodeTest.test('getPost resolves false when an incomplete body aborts, errors or closes', async () => {
    const events: Array<'aborted' | 'error' | 'close'> = ['aborted', 'error', 'close'];
    for (const event of events) {
        const req = createRequest('application/json');
        const post = sRoute.getPost(req as unknown as http.IncomingMessage);
        if (event === 'error') {
            req.emit(event, new Error('request failed'));
        }
        else {
            req.emit(event);
        }
        assert.strictEqual(await post, false);
        assert.strictEqual(req.listenerCount('data'), 0);
        assert.strictEqual(req.listenerCount('end'), 0);
        assert.strictEqual(req.listenerCount('error'), 0);
        assert.strictEqual(req.listenerCount('aborted'), 0);
        assert.strictEqual(req.listenerCount('close'), 0);
    }
});

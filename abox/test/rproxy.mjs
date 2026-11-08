import assert from 'node:assert/strict';
import http from 'node:http';
import http2 from 'node:http2';
import { once } from 'node:events';
import test from 'node:test';
import WebSocket from 'ws';
import * as undiciProxy from '../../lib/undici.js';
import * as wsProxy from '../../lib/ws.js';
import { getProxyHeaders } from '../../lib/undici/proxy.js';

const incoming = {
    host: 'public.example.test:8443',
    'x-forwarded-for': '192.0.2.2',
    'x-forwarded-host': 'forged.example.test',
    'x-forwarded-proto': 'https',
    forwarded: 'for=192.0.2.2;proto=https',
    via: '1.1 proxy',
    'x-real-ip': '192.0.2.2',
    'cf-connecting-ip': '192.0.2.2',
    'eo-token': 'test-only-token',
    'true-client-ip': '192.0.2.2',
    origin: 'https://public.example.test:8443',
    referer: 'https://public.example.test:8443/page',
    cookie: 'session=test',
    authorization: 'Bearer test',
    'accept-encoding': 'identity',
};
const identityHeaders = Object.keys(incoming).filter(key => /^(x-forwarded-|cf-|eo-)/.test(key) || ['forwarded', 'via', 'x-real-ip', 'true-client-ip'].includes(key));

await test('request and reverse clean metadata; default and passthrough preserve it', () => {
    const req = { headers: { ...incoming, ':authority': '[2001:db8::1]:8443' }, socket: { encrypted: true, remoteAddress: '2001:db8::2' } };
    Object.freeze(req.headers);
    const filtered = Object.freeze(undiciProxy.filterProxyHeaders(incoming));
    const ordinary = getProxyHeaders(req, {proxyMode: 'request'});
    assert.equal(ordinary.host, undefined);
    for (const key of identityHeaders) assert.equal(ordinary[key], undefined, key);
    for (const key of ['origin', 'referer', 'cookie', 'authorization']) assert.equal(ordinary[key], incoming[key]);
    const reverse = getProxyHeaders(req, {proxyMode: 'reverse'});
    assert.equal(reverse.host, '[2001:db8::1]:8443');
    assert.equal(reverse['x-forwarded-host'], reverse.host);
    assert.equal(reverse['x-forwarded-proto'], 'https');
    assert.equal(reverse['x-forwarded-for'], '2001:db8::2');
    assert.equal(reverse['x-real-ip'], '2001:db8::2');
    assert.equal(reverse.forwarded, undefined);
    const overrides = Object.freeze({'Host': 'custom.example.test', 'X-Forwarded-Proto': 'http', 'X-Forwarded-For': '192.0.2.3'});
    const custom = getProxyHeaders(req, {proxyMode: 'reverse', headers: overrides});
    assert.equal(custom.host, 'custom.example.test');
    assert.equal(custom['x-forwarded-proto'], 'http');
    assert.equal(custom['x-forwarded-for'], '192.0.2.3');
    const requestCustom = getProxyHeaders(req, {proxyMode: 'request', headers: overrides});
    assert.equal(requestCustom.host, 'custom.example.test');
    assert.equal(requestCustom['x-forwarded-for'], '192.0.2.3');
    assert.equal(requestCustom['cf-connecting-ip'], undefined);
    const selected = getProxyHeaders(req, {filter: name => name !== 'authorization', headers: {'authorization': 'Bearer override'}});
    assert.equal(selected.authorization, 'Bearer override');
    assert.equal(filtered['x-forwarded-for'], incoming['x-forwarded-for']);
    const legacy = getProxyHeaders(req, {});
    assert.deepEqual(legacy, filtered);
    assert.notEqual(legacy, filtered);
    const passthrough = getProxyHeaders(req, {proxyMode: 'passthrough'});
    assert.deepEqual(passthrough, legacy);
    assert.notEqual(passthrough, filtered);
    const passthroughOverrides = {'x-forwarded-for': '192.0.2.3'};
    assert.deepEqual(
        getProxyHeaders(req, {proxyMode: 'passthrough', headers: passthroughOverrides}),
        getProxyHeaders(req, {headers: passthroughOverrides})
    );
    assert.equal(undiciProxy.filterProxyHeaders(incoming)['eo-token'], incoming['eo-token']);
    const mixed = getProxyHeaders({headers: {'Forwarded': 'for=bad', 'CF-Connecting-IP': 'bad', 'HOST': 'bad'}}, {proxyMode: 'request'});
    assert.deepEqual(mixed, {});
});

await test('base filtering preserves response metadata and supports direct response writes', () => {
    const headers = Object.freeze({
        host: 'upstream.example.test', connection: 'close', 'keep-alive': 'timeout=1',
        'transfer-encoding': 'chunked', upgrade: 'websocket', 'proxy-connection': 'close',
        'http-code': 201, 'http-url': 'https://upstream.example.test/', ':status': 201,
        '(internal)': 'drop', 'x-absent': undefined, 'x-drop': 'drop',
        'content-type': 'application/json', 'set-cookie': ['a=1', 'b=2'],
        'x-forwarded-response': 'keep',
    });
    const expected = {'content-type': 'application/json', 'set-cookie': ['a=1', 'b=2'], 'x-forwarded-response': 'keep'};
    const filter = name => name !== 'x-drop';
    assert.deepEqual(undiciProxy.filterProxyHeaders(headers, undefined, filter), expected);
    const written = {};
    const response = {headersSent: false, setHeader: (name, value) => {written[name] = value;}};
    assert.deepEqual(undiciProxy.filterProxyHeaders(headers, response, filter), {});
    assert.deepEqual(written, expected);
    response.headersSent = true;
    response.setHeader = () => assert.fail('headers already sent');
    assert.deepEqual(undiciProxy.filterProxyHeaders(headers, response, filter), {});
});

await test('mproxy rejects invalid auth or missing targets before forwarding', async () => {
    const req = {headers: incoming, readableEnded: false};
    for (const lib of [undiciProxy, wsProxy]) {
        assert.equal(await lib.mproxy(controller(req, undefined, undefined, {auth: 'wrong', url: 'http://unused.example.test/'}), 'test', {proxyMode: 'request'}), 0);
        assert.equal(await lib.mproxy(controller(req, undefined, undefined, {auth: 'test'}), 'test', {proxyMode: 'request'}), -1);
    }
});

function controller(req, res, socket, get = {}) {
    return {getPrototype: name => ({_req: req, _res: res, _socket: socket, _get: get, _config: {const: {path: 'a%2Fb', qs: 'x=1'}}})[name]};
}
async function listen(server) {
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    return server.address().port;
}
async function close(server) {
    server.closeAllConnections?.();
    await new Promise(resolve => server.close(resolve));
}
function options(mode) {
    return {
        ...(mode === 'legacy' ? {} : {proxyMode: mode === 'override' ? 'reverse' : mode}),
        hosts: '127.0.0.1', timeout: 3,
        filter: name => name !== 'x-drop',
        ...(mode === 'override' ? {headers: {'X-Forwarded-Proto': 'https'}} : {}),
    };
}
function verify(headers, mode, targetHost) {
    assert.equal(headers.host, ['legacy', 'passthrough', 'request'].includes(mode) ? targetHost : incoming.host);
    for (const key of ['cookie', 'authorization', 'origin', 'referer']) assert.equal(headers[key], incoming[key]);
    assert.equal(headers['x-drop'], undefined);
    if (mode === 'legacy' || mode === 'passthrough') {
        for (const key of identityHeaders) assert.equal(headers[key], incoming[key], key);
    }
    else if (mode === 'request') {
        for (const key of identityHeaders) assert.equal(headers[key], undefined, key);
    }
    else {
        assert.equal(headers['x-forwarded-host'], incoming.host);
        assert.equal(headers['x-forwarded-proto'], mode === 'override' ? 'https' : 'http');
        assert.equal(headers['x-forwarded-for'], '127.0.0.1');
        assert.equal(headers['x-real-ip'], '127.0.0.1');
        for (const key of ['forwarded', 'via', 'cf-connecting-ip', 'eo-token', 'true-client-ip']) assert.equal(headers[key], undefined, key);
    }
}

for (const kind of ['rproxy', 'mproxy']) {
    await test(`undici ${kind} relays HTTP/1 and HTTP/2 requests and response headers`, async () => {
        const upstream = http.createServer(async (req, res) => {
            let body = ''; for await (const chunk of req) body += chunk;
            res.statusCode = 201;
            res.setHeader('content-type', 'application/json');
            res.setHeader('x-forwarded-response', 'keep-response');
            res.end(JSON.stringify({headers: req.headers, body, url: req.url}));
        });
        const upstreamPort = await listen(upstream);
        const targetHost = `target.example.test:${upstreamPort}`;
        try {
            for (const protocol of ['h1', 'h2']) {
                let mode;
                const errors = [];
                const handler = (req, res) => {
                    const ctr = controller(req, res, undefined, {url: `http://${targetHost}/a%2Fb?x=1`, auth: 'test'});
                    const task = kind === 'rproxy'
                        ? undiciProxy.rproxy(ctr, {'': `http://${targetHost}/`}, options(mode))
                        : undiciProxy.mproxy(ctr, 'test', options(mode));
                    task.then(handled => {
                        assert.equal(handled, kind === 'rproxy' ? true : 1);
                    }).catch(error => { errors.push(error); res.destroy(error); });
                };
                const front = protocol === 'h1' ? http.createServer(handler) : http2.createServer(handler);
                const port = await listen(front);
                const agent = new http.Agent({keepAlive: true, maxSockets: 1});
                const session = protocol === 'h2' ? http2.connect(`http://127.0.0.1:${port}`) : null;
                try {
                    for (mode of kind === 'rproxy' ? ['legacy', 'passthrough', 'request', 'reverse', 'override'] : ['legacy', 'passthrough', 'request']) {
                        let body = '', status, headers;
                        if (protocol === 'h1') {
                            const req = http.request({host: '127.0.0.1', port, method: 'POST', path: '/', agent, headers: {...incoming, 'x-drop': 'drop'}});
                            req.end('payload');
                            const [res] = await once(req, 'response');
                            headers = res.headers; status = res.statusCode;
                            for await (const chunk of res) body += chunk;
                        }
                        else {
                            const req = session.request({...incoming, ':authority': incoming.host, host: 'ignored.example.test', ':method': 'POST', ':path': '/', 'content-length': '7', 'x-drop': 'drop'});
                            req.end('payload');
                            [headers] = await once(req, 'response'); status = headers[':status'];
                            for await (const chunk of req) body += chunk;
                        }
                        assert.equal(status, 201);
                        assert.equal(headers['x-forwarded-response'], 'keep-response');
                        const result = JSON.parse(body);
                        verify(result.headers, mode, targetHost);
                        assert.equal(result.body, 'payload');
                        assert.equal(result.url, '/a%2Fb?x=1');
                        console.log(`undici ${kind} ${protocol} ${mode}: OK`);
                    }
                    assert.deepEqual(errors, []);
                }
                finally { session?.destroy(); agent.destroy(); await close(front); }
            }
        }
        finally { await close(upstream); }
    });
}

for (const kind of ['rproxy', 'mproxy']) {
    await test(`WebSocket ${kind} applies modes to handshake headers and relays messages`, async () => {
        const tasks = [], errors = [];
        const upstream = http.createServer();
        upstream.on('upgrade', (req, socket, head) => {
            const ws = wsProxy.createServer(req, socket, head);
            ws.on('message', message => ws.writeText(JSON.stringify({headers: req.headers, body: message.data.toString()})));
        });
        const upstreamPort = await listen(upstream);
        const targetHost = `target.example.test:${upstreamPort}`;
        let mode;
        const front = http.createServer();
        front.on('upgrade', (req, socket, head) => {
            const ws = wsProxy.createServer(req, socket, head);
            const ctr = controller(req, undefined, ws, {url: `ws://${targetHost}/`, auth: 'test'});
            const task = kind === 'rproxy' ? wsProxy.rproxy(ctr, `ws://${targetHost}/`, options(mode)) : wsProxy.mproxy(ctr, 'test', options(mode));
            tasks.push(task.then(handled => assert.equal(handled, kind === 'rproxy' ? true : 1)).catch(error => errors.push(error)));
        });
        const port = await listen(front);
        try {
            for (mode of kind === 'rproxy' ? ['legacy', 'passthrough', 'request', 'reverse', 'override'] : ['legacy', 'passthrough', 'request']) {
                const client = new WebSocket(`ws://127.0.0.1:${port}/`, {perMessageDeflate: false, headers: {...incoming, 'x-drop': 'drop'}});
                await once(client, 'open');
                client.send('payload');
                const [data] = await once(client, 'message');
                const result = JSON.parse(data.toString());
                verify(result.headers, mode, targetHost);
                assert.equal(result.body, 'payload');
                client.close(); await once(client, 'close');
            }
            await Promise.all(tasks);
            assert.deepEqual(errors, []);
        }
        finally { await close(front); await close(upstream); }
    });
}

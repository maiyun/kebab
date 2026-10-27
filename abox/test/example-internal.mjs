import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import https from 'node:https';
import tls from 'node:tls';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import ts from '../../node_modules/typescript/lib/typescript.js';
import * as lUndici from '../../lib/undici.js';
import * as lWs from '../../lib/ws.js';
import * as lText from '../../lib/text.js';
import * as lCookie from '../../lib/cookie.js';
import * as core from '../../lib/core.js';

// Execute methods from the final generated example, without importing unrelated demos.
async function loadExample(file, methods) {
    const source = ts.createSourceFile(file, await fs.readFile(new URL(file, import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true);
    const klass = source.statements.find(ts.isClassDeclaration);
    const selected = klass.members.filter(m => methods.includes(m.name?.getText(source)));
    assert.equal(selected.length, methods.length);
    return new Function('lUndici', 'lWs', 'lText', 'lCookie', 'lCore', `return class {
        getPrototype(name) { return this[name]; }
        _getEnd() { return ''; }
        ${selected.map(m => m.getText(source)).join('\n')}
    };`)(lUndici, lWs, lText, lCookie, { ...core, debug() {}, display() {} });
}
const methods = ['onLoad', 'undiciPost', 'undiciPostString', 'undiciOpen', 'undiciCookie', 'undiciFollow', 'undiciRetry', 'undiciHosts', 'undiciMproxy', 'undiciMproxy1', 'undiciFetch', 'undiciGetResponseJson', 'wsClient'];
const Demo = await loadExample('../../www/example/ctr/test.js', methods);
const WsProxy = await loadExample('../../www/example/ws/mproxy.js', ['onLoad']);
const WsReverse = await loadExample('../../www/example/ws/rproxy.js', ['onLoad']);
const WsHandler = await loadExample('../../www/example/ws/handler.js', ['onLoad']);
const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-self-request-'));
const hostname = 'example.local.brc-app.com';
const certPath = path.join(temp, 'cert.pem');
const keyPath = path.join(temp, 'key.pem');
const trusted = tls.getCACertificates('default');
let checks = 0;
const listeners = [];
const sockets = new Set();
function config(host, secure, urlBase = '/nested/') {
    return { set: { cacheTtl: 0 }, const: {
        host, hostname: lText.parseHost(host).hostname, https: secure,
        urlBase, urlFull: `https://${host}${urlBase}`, path: 'test',
        uri: { protocol: secure ? 'https:' : 'http:' },
    } };
}
function controller(Type, cfg, req, res) {
    return Object.assign(new Type(), { _config: cfg, _req: req, _res: res, _get: Object.fromEntries(new URL(req.url || '/', 'http://example.test').searchParams) });
}
try {
    execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-keyout', keyPath, '-out', certPath, '-days', '1', '-subj', `/CN=${hostname}`, '-addext', `subjectAltName=DNS:${hostname}`, '-addext', 'basicConstraints=critical,CA:TRUE'], { stdio: 'ignore' });
    const cert = await fs.readFile(certPath, 'utf8');
    tls.setDefaultCACertificates([...trusted, cert]);
    for (const secure of [false, true]) {
        const seen = [];
        let retries = 0;
        const handler = async (req, res) => {
            try {
                const url = new URL(req.url, 'http://example.test');
                seen.push({ path: url.pathname, host: req.headers.host, localPort: req.socket.localPort });
                if (url.pathname.endsWith('/undici-mproxy1')) {
                    const demo = controller(Demo, config(req.headers.host, secure), req, res);
                    assert.equal(demo.onLoad(), true);
                    await demo.undiciMproxy1();
                    return;
                }
                if (url.pathname.endsWith('/undici-retry-source') && ++retries % 2 === 1) {
                    req.socket.destroy(); return;
                }
                for await (const chunk of req) { void chunk; }
                if (url.pathname.endsWith('/undici-follow1')) {
                    res.writeHead(302, { location: './undici-post1' }); res.end(); return;
                }
                res.setHeader('content-type', 'application/json');
                res.setHeader('set-cookie', 'sample=ok; Path=/');
                res.end(JSON.stringify({ result: 1, data: 'self-request-ok' }));
            } catch (e) { res.destroy(e); }
        };
        const server = secure ? https.createServer({ key: await fs.readFile(keyPath), cert }, handler) : http.createServer(handler);
        listeners.push(server);
        server.on('connection', socket => { sockets.add(socket); socket.on('close', () => sockets.delete(socket)); });
        server.on('upgrade', (req, socket, head) => {
            const url = new URL(req.url, 'http://example.test');
            seen.push({ path: url.pathname, host: req.headers.host, localPort: socket.localPort });
            const ws = lWs.createServer(req, socket, head);
            if (url.pathname.endsWith('/test')) {
                ws.on('message', frame => ws.writeText(frame.data.toString()));
                return;
            }
            const Type = url.pathname.endsWith('/mproxy') ? WsProxy : url.pathname.endsWith('/rproxy2') ? WsHandler : WsReverse;
            const cfg = config(req.headers.host, secure);
            cfg.const.path = url.pathname.endsWith('/rproxy2') ? 'rproxy2' : 'rproxy';
            cfg.const.uri.protocol = secure ? 'wss:' : 'ws:';
            // route.const.https has historically been false for WebSocket requests.
            cfg.const.https = false;
            const demo = controller(Type, cfg, req);
            demo._socket = ws;
            demo.onLoad().catch(e => socket.destroy(e));
        });
        await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
        const port = server.address().port;
        for (const publicHost of [hostname, `${hostname}:8443`]) {
            const cfg = config(publicHost, secure);
            const original = structuredClone(cfg);
            const demo = controller(Demo, cfg, { url: '/', socket: { localAddress: '127.0.0.1', localPort: port } });
            assert.equal(demo.onLoad(), true);
            assert.deepEqual(cfg, original);
            const internal = new URL(demo._internalUrl);
            assert.equal(internal.protocol, secure ? 'https:' : 'http:');
            assert.equal(Number(internal.port), port);
            for (const method of ['undiciPost', 'undiciPostString', 'undiciOpen', 'undiciCookie', 'undiciFollow', 'undiciHosts', 'undiciMproxy', 'undiciFetch', 'undiciGetResponseJson']) {
                const before = seen.length;
                const html = await demo[method]();
                assert.ok(html.includes('self-request-ok'), `${secure ? 'TLS' : 'HTTP'} ${method}: ${html}`);
                assert.ok(seen.length > before);
                assert.ok(seen.slice(before).every(r => r.localPort === port && r.path.startsWith('/nested/')));
                checks++;
            }
            checks++;
        }
        const demo = controller(Demo, config(hostname, secure), { url: '/', socket: { localAddress: '127.0.0.1', localPort: port } });
        assert.equal(demo.onLoad(), true);
        assert.ok((await demo.undiciRetry()).includes('self-request-ok')); checks++;
        for (const ac of ['', 'hosts', 'mproxy']) {
            demo._get = { ac };
            const html = await demo.wsClient();
            assert.ok(html.includes('Server: Hello: clientws'), html); checks++;
        }
        for (const route of ['rproxy', 'rproxy2']) {
            const client = await lWs.connect(`${secure ? 'wss' : 'ws'}://${hostname}:${port}/nested/${route}`, { hosts: '127.0.0.1', timeout: 3 });
            assert.ok(client);
            await new Promise((resolve, reject) => {
                const timer = setTimeout(() => { client.destroy(); reject(new Error('WS echo timeout')); }, 3000);
                client.on('message', frame => { clearTimeout(timer); assert.equal(frame.data.toString(), 'reverse-ok'); client.end(); resolve(); });
                client.writeText('reverse-ok');
            });
            checks++;
        }
        console.log(`${secure ? 'HTTPS/WSS (trusted certificate, domain/SNI preserved)' : 'HTTP/WS'}: self calls, DNS override, forward/reverse proxy, fetch, cookie, redirect, retry: PASS`);
    }
    const unavailable = controller(Demo, config(hostname, false), { url: '/', socket: {} });
    assert.deepEqual(unavailable.onLoad(), [0, 'Request socket is unavailable.']); checks++;
    console.log(`Example internal request checks: ${checks} passed`);
} finally {
    for (const socket of sockets) socket.destroy();
    await Promise.all(listeners.map(server => new Promise(resolve => server.close(resolve))));
    tls.setDefaultCACertificates(trusted);
    await fs.rm(temp, { recursive: true, force: true });
}

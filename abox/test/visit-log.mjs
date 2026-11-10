import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import test from 'node:test';
import ts from '../../node_modules/typescript/lib/typescript.js';
import * as text from '../../lib/text.js';
import * as time from '../../lib/time.js';
import * as core from '../../lib/core.js';
import { parseCsvLine } from '../master-log.js';

async function declarations(file, names) {
    const src = ts.createSourceFile(file, await fs.readFile(new URL(`../../${file}`, import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true);
    return names.map(name => {
        const node = src.statements.find(item => ts.isFunctionDeclaration(item) && item.name?.text === name);
        assert.ok(node, `Missing ${name}`);
        return node.getText(src).replace(/^export /, '');
    }).join('\n');
}

const childFunctions = await declarations('sys/child.js', ['requestHandler', 'upgradeHandler', 'getVhostReal', 'getVhostByHostname', 'rejectExample']);
const logFunction = await declarations('lib/core.js', ['log']);
const routeCode = await fs.readFile(new URL('../../sys/route.js', import.meta.url), 'utf8');

test('visit logging occurs once at matched HTTP and WS vhosts', async () => {
    assert.doesNotMatch(routeCode, /['"]-visit['"]/);
    const calls = [];
    const lCore = { globalConfig: { debug: true }, log(...args) { calls.push(args); }, writeHead(res, status) { res.status = status; } };
    const file = { isDirectory: () => false, isSymbolicLink: () => false };
    const state = { mode: 'route' };
    const lFs = {
        async stats(path) { if (path.endsWith('kebab.json')) return state.mode === 'route' ? file : null; if (path.endsWith('asset') && state.mode !== 'missing') return file; return null; },
        async isFile() { return false; },
        async isDir() { return true; },
        async readToResponse(_path, _req, res) { res.end('static'); },
    };
    const routes = [];
    const handlers = new Function('lText', 'lCore', 'sCtr', 'lFs', 'sRoute', 'kebab', 'http', 'stopping', 'isExamplePath', 'vhosts', 'setTimeout',
        `${childFunctions}\nreturn { requestHandler, upgradeHandler };`)(text, lCore, {}, lFs,
        { async run(data) { routes.push(data); return true; } },
        { ROOT_PATH: '/framework/', WWW_CWD: '/www/', VER: 'test' }, { ServerResponse: class {} }, false,
        async () => state.mode === 'blocked', [{ domains: ['example.test'], root: '/fixture' }], () => ({}));
    async function run(mode, ws = false, host = 'example.test:8080', authority = false) {
        state.mode = mode; calls.length = 0; routes.length = 0;
        lCore.globalConfig.debug = mode !== 'blocked';
        const req = { headers: { host, ...(authority ? { ':authority': 'example.test:8443' } : {}), 'user-agent': 'fixture-agent' }, url: '/asset?q=one', socket: { remoteAddress: '192.0.2.1' }, on() { throw new Error('body read'); } };
        const res = { setHeader() {}, end(body) { this.body = body; } };
        const socket = { removeAllListeners() {}, end() { this.ended = true; } };
        if (ws) await handlers.upgradeHandler(req, socket, false, Buffer.alloc(0));
        else await handlers.requestHandler(req, res, authority);
        return { req, res, socket };
    }
    for (const mode of ['route', 'static', 'missing', 'blocked']) {
        const result = await run(mode);
        assert.equal(calls.length, 1, mode);
        if (mode === 'missing') assert.equal(result.res.status, 404);
        if (mode === 'static') assert.equal(result.res.body, 'static');
        if (mode === 'blocked') assert.equal(result.res.status, 403);
        if (mode === 'route') assert.equal(routes.length, 1);
        assert.equal(calls[0][2], '-visit');
        assert.equal(calls[0][0].req, result.req);
        assert.equal(calls[0][0].hostname, 'example.test');
        assert.equal(calls[0][0].urlFull + calls[0][0].path, 'http://example.test:8080/asset?q=one');
    }
    await run('route', true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0][0].urlFull + calls[0][0].path, 'ws://example.test:8080/asset?q=one');
    await run('route', false, 'ignored.test', true);
    assert.equal(calls[0][0].urlFull + calls[0][0].path, 'https://example.test:8443/asset?q=one');
    await run('route', false, 'unknown.test');
    assert.equal(calls.length, 0);
});

for (const [format, existing] of [['jsonl', false], ['csv', false], ['csv', true]]) test(`${format} log excludes cookie and session values (existing=${existing})`, async () => {
    const writes = [];
    let finish;
    const done = new Promise(resolve => { finish = resolve; });
    const lFs = { async mkdir() { return true; }, async isFile() { return existing; }, async putContent(path, value, options) { writes.push([path, value]); if (options.flag === 'a') finish(); return true; } };
    class Ctr {
        getPrototype(key) {
            if (key === '_cookie' || key === '_session') throw new Error(`Unexpected read of ${key}`);
            return { _req: { socket: { remoteAddress: '192.0.2.1' } }, _headers: headers, _get: {}, _config: { const: { path: '/asset?q=one', urlFull: 'http://example.test:8080', hostname: 'example.test' } } }[key];
        }
    }
    const log = new Function('sCtr', 'lText', 'lTime', 'lFs', 'kebab', 'globalConfig', 'os', 'ips', 'display',
        `${logFunction}\nreturn log;`)({ Ctr }, text, time, lFs, { LOG_CWD: '/fixture/' }, { logFormat: format }, os, core.ips, (...args) => { throw new Error(String(args)); });
    const headers = { 'user-agent': 'fixture-agent', 'cf-connecting-ip': '192.0.2.2', 'x-forwarded-for': '192.0.2.3', cookie: 'secret-cookie' };
    log({ hostname: 'example.test', urlFull: 'http://example.test:8080', path: '/asset?q=one', headers,
        req: { socket: { remoteAddress: '192.0.2.1' } }, cookie: { token: 'secret-cookie' }, session: { token: 'secret-session' } }, '', '-visit');
    await done;
    finish = undefined;
    const doneCtr = new Promise(resolve => { finish = resolve; });
    log(new Ctr(), '', '-visit');
    await doneCtr;
    const content = writes.map(item => item[1]).join('');
    assert.doesNotMatch(content, /secret-cookie|secret-session/);
    const row = writes.at(-1)[1];
    if (format === 'jsonl') {
        const entry = JSON.parse(row);
        assert.equal(entry.url, 'http://example.test:8080/asset?q=one');
        assert.equal(entry.userAgent, 'fixture-agent');
        assert.equal(entry.realIp, '192.0.2.1');
        assert.equal(entry.cfIp, '192.0.2.2');
        assert.equal(entry.xIp, '192.0.2.3');
        assert.ok(!('cookie' in entry) && !('session' in entry));
    }
    else {
        const fields = parseCsvLine(row.trimEnd());
        assert.equal(fields.length, 10);
        assert.deepEqual(fields.slice(2, 7), ['http://example.test:8080/asset?q=one', 'fixture-agent', '192.0.2.1', '192.0.2.2', '192.0.2.3']);
    }
});

test('real route controller and reverse proxy retain one visit and the POST body', async () => {
    const http = await import('node:http');
    const path = await import('node:path');
    const { once } = await import('node:events');
    const route = await import('../../sys/route.js');
    const frameworkFs = await import('../../lib/fs.js');
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-visit-route-'));
    const rootPath = `${root}/`;
    const ctrUrl = new URL('../../sys/ctr.js', import.meta.url).href;
    const proxyUrl = new URL('../../lib/undici.js', import.meta.url).href;
    let upstream;
    let front;
    try {
        upstream = http.createServer(async (req, res) => {
            const chunks = [];
            for await (const chunk of req) chunks.push(chunk);
            res.end(Buffer.concat(chunks));
        });
        upstream.listen(0, '127.0.0.1');
        await once(upstream, 'listening');
        const upstreamPort = upstream.address().port;
        await fs.mkdir(path.join(root, 'ctr'));
        await fs.writeFile(path.join(root, 'package.json'), '{"type":"module"}');
        await fs.writeFile(path.join(root, 'kebab.json'), JSON.stringify({ set: { cacheTtl: 0 }, route: { '@': 'main' } }));
        await fs.writeFile(path.join(root, 'ctr/middle.js'), `
            import { Ctr } from ${JSON.stringify(ctrUrl)};
            import { rproxy } from ${JSON.stringify(proxyUrl)};
            export default class extends Ctr {
                async onReqStart() {
                    if (this._config.const.path === 'proxy') {
                        if (!await rproxy(this, { 'proxy': 'http://127.0.0.1:${upstreamPort}/' })) throw new Error('Proxy failed');
                        return -1;
                    }
                    return 1;
                }
            }
        `);
        await fs.writeFile(path.join(root, 'ctr/main.js'), `
            import { Ctr } from ${JSON.stringify(ctrUrl)};
            export default class extends Ctr { index() { return 'controller-ok'; } }
        `);
        const logs = [];
        const handler = new Function('lText', 'lCore', 'sCtr', 'getVhostByHostname', 'lFs', 'sRoute', 'kebab', 'http', 'stopping', 'isExamplePath', 'rejectExample',
            `${(await declarations('sys/child.js', ['requestHandler']))}\nreturn requestHandler;`)(
            text, { globalConfig: {}, log(...args) { logs.push(args); }, writeHead(res, status) { res.writeHead(status); } }, {},
            async host => host === 'example.test' ? { real: rootPath } : null, frameworkFs,
            { async run(data) { clearTimeout(data.timer.timer); return route.run(data); } }, { VER: 'test' }, http, false,
            async () => false, () => { throw new Error('Unexpected rejection'); });
        front = http.createServer((req, res) => { handler(req, res, false).catch(error => res.destroy(error)); });
        front.listen(0, '127.0.0.1');
        await once(front, 'listening');
        async function request(pathname, body) {
            const req = http.request({ host: '127.0.0.1', port: front.address().port, path: pathname, method: body ? 'POST' : 'GET', headers: { host: 'example.test:8080', 'content-type': 'application/octet-stream', 'accept-encoding': 'identity' } });
            req.end(body);
            const [res] = await once(req, 'response');
            const chunks = [];
            for await (const chunk of res) chunks.push(chunk);
            return { status: res.statusCode, body: Buffer.concat(chunks).toString() };
        }
        const controller = await request('/');
        assert.equal(controller.status, 200);
        assert.equal(controller.body, 'controller-ok');
        assert.equal(logs.length, 1);
        const payload = 'raw POST payload: \u0000 & = 中文';
        const proxy = await request('/proxy?x=1', payload);
        assert.equal(proxy.status, 200);
        assert.equal(proxy.body, payload);
        assert.equal(logs.length, 2);
        assert.equal(logs[1][0].path, '/proxy?x=1');
        assert.ok(logs.every(entry => entry[2] === '-visit'));
    }
    finally {
        if (front?.listening) await new Promise(resolve => front.close(resolve));
        if (upstream?.listening) await new Promise(resolve => upstream.close(resolve));
        route.clearKebabConfigs();
        await fs.rm(root, { recursive: true, force: true });
    }
});

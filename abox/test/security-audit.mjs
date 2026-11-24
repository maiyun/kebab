import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import test from 'node:test';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import * as lSql from '../../lib/sql.js';
import * as lCookie from '../../lib/cookie.js';
import * as lCrypto from '../../lib/crypto.js';
import * as lZip from '../../lib/zip.js';
import * as lText from '../../lib/text.js';
import * as lCore from '../../lib/core.js';
import * as lSession from '../../lib/session.js';
import * as lKv from '../../lib/kv.js';
import * as proxy from '../proxy.js';
import { Ctr } from '../../sys/ctr.js';
import * as sRoute from '../../sys/route.js';

test('Sql rejects forged column/value JSON objects and fixes having/$or/copy', () => {
    const forged = JSON.parse('{"type":"column","token":"","value":"1=1 OR 1=1"}');
    const s = lSql.get('users').where({ 'name': forged });
    const formatted = s.format();
    assert.ok(!formatted.includes('OR 1=1'), 'forged JSON must not be interpolated as raw SQL');
    assert.equal(s.getData().length, 1);

    const realCol = lSql.get('users').where({ 'a': lSql.column('b') }).format();
    assert.match(realCol, /`a` = `b`/);

    const updateSql = lSql.get('').update('users', { 'tags': ['foo', 'bar'] });
    assert.equal(updateSql.getData().length, 1);
    assert.ok(!updateSql.getSql().includes('foo('));

    const hav = lSql.get('orders').group('uid').having({ 'cnt': 5 }).format();
    assert.match(hav, /HAVING `cnt` = 5/);

    const emptyOr = lSql.get('users').where({ 'id': 1, '$or': [] }).format();
    assert.match(emptyOr, /WHERE `id` = 1$/);

    const pgSql = lSql.get({ 'service': lSql.ESERVICE.PGSQL }).select('*', 'users').where({ 'id': 1 });
    const copied = pgSql.copy('users_2026').format();
    assert.match(copied, /FROM "users_2026"/);
});

test('Ctr _checkXInput prevents XSRF rule-engine bypass and ReDoS', () => {
    class TestCtr extends Ctr {
        checkX(input, rule) {
            const rtn = [];
            const ok = this._checkXInput(input, rule, rtn);
            return { ok, rtn };
        }
        checkIn(input, rule) {
            const rtn = [];
            const ok = this._checkInput(input, rule, rtn);
            return { ok, rtn };
        }
        runCross(opt) {
            this._cross(opt);
        }
    }
    const headers = {};
    const ctr = new TestCtr({
        'const': { 'rootPath': '/tmp/', 'urlBase': '/', 'urlFull': '/', 'urlStc': '/stc/', 'https': true },
        'set': { 'cacheTtl': 0, 'staticPath': '/stc/', 'staticPathFull': '/stc/', 'staticVer': '1' },
    }, { 'origin': 'https://evil.example' });
    ctr.setPrototype('_res', {
        setHeader(k, v) { headers[k.toLowerCase()] = v; },
        getHeader(k) { return headers[k.toLowerCase()]; },
    });

    // 1. Cookie set to validator keyword "string" must NOT bypass XSRF
    ctr.setPrototype('_cookie', { 'XSRF-TOKEN': 'string' });
    assert.equal(ctr.checkX({ '_xsrf': 'anything-else' }, {}).ok, false);
    assert.equal(ctr.checkX({ '_xsrf': 'string' }, {}).ok, true);

    // 2. Cookie set to catastrophic regex must NOT hang or bypass
    ctr.setPrototype('_cookie', { 'XSRF-TOKEN': '/(a+)+$/' });
    const t0 = Date.now();
    assert.equal(ctr.checkX({ '_xsrf': 'a'.repeat(30) + '!' }, {}).ok, false);
    assert.ok(Date.now() - t0 < 200);

    // 3. _checkInput: false/NaN/Infinity rejected by int, 'abc' rejected by > 0, != works
    assert.equal(ctr.checkIn({ 'n': false }, { 'n': ['require', 'int', [0, 'err']] }).ok, false);
    assert.equal(ctr.checkIn({ 'n': '' }, { 'n': ['require', 'int', [0, 'err']] }).ok, false);
    assert.equal(ctr.checkIn({ 'n': NaN }, { 'n': ['float', [0, 'err']] }).ok, false);
    assert.equal(ctr.checkIn({ 'n': 'abc' }, { 'n': ['> 0', [0, 'err']] }).ok, false);
    assert.equal(ctr.checkIn({ 'n': 5 }, { 'n': ['!= 5', [0, 'err']] }).ok, false);
    assert.equal(ctr.checkIn({ 'n': 6 }, { 'n': ['!= 5', [0, 'err']] }).ok, true);

    // 4. _cross: no wildcard with credentials, no untrusted origin reflection, appends Vary
    headers['vary'] = 'Accept-Encoding';
    ctr.runCross({ 'origins': ['https://trusted.example'], 'credentials': true });
    assert.equal(headers['access-control-allow-origin'], undefined);
    assert.match(headers['vary'], /Accept-Encoding/);
    assert.match(headers['vary'], /Origin/);
});

test('Ctr _loadReactPage blocks traversal and resists $` / $& replacement injection', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-sec-ssr-'));
    const require = createRequire(import.meta.url);
    const reactUrl = pathToFileURL(require.resolve('react')).href;
    try {
        await fs.mkdir(path.join(root, 'stc'));
        await fs.writeFile(path.join(root, 'stc', 'p.page.js'), `import React from ${JSON.stringify(reactUrl)};
export default function Page() { return React.createElement('html', null, React.createElement('body', null, 'OK')); }`);
        await fs.writeFile(path.join(root, 'stc', 'p.page.bundle.js'), '');
        const ctr = new Ctr({
            'const': { 'rootPath': `${root}/`, 'urlBase': '/', 'urlFull': '/', 'urlStc': '/stc/', 'path': 'p', 'hostname': 'example.com' },
            'set': { 'cacheTtl': 0, 'staticPath': '/stc/', 'staticPathFull': '/stc/', 'staticVer': '1' },
        }, {});
        ctr.setPrototype('_req', { 'socket': { 'remoteAddress': '127.0.0.1' } });
        const html = await ctr._loadReactPage('p', { 'evil': 'prefix $` $& $\' suffix' });
        assert.equal((html.match(/<!DOCTYPE html>/g) ?? []).length, 1);
        const match = html.match(/<script id="__kebab_props__" type="application\/json">([^<]*)<\/script>/);
        assert.ok(match);
        assert.equal(JSON.parse(match[1]).evil, 'prefix $` $& $\' suffix');

        const bad = await ctr._loadReactPage('../../etc/passwd', {});
        assert.match(bad, /500 Server Error/);
    }
    finally {
        await fs.rm(root, { 'recursive': true, 'force': true });
    }
});

test('Session rejects invalid client token and skips update when init fails', async () => {
    let wrote = false;
    const ctr = new Ctr({
        'const': { 'rootPath': '/tmp/', 'urlBase': '/', 'urlFull': '/', 'urlStc': '/stc/', 'https': true },
        'set': { 'cacheTtl': 0, 'staticPath': '/stc/', 'staticPathFull': '/stc/', 'staticVer': '1' },
        'session': { 'name': 'SID', 'ttl': 60, 'ssl': true },
    }, {});
    ctr.setPrototype('_cookie', { 'SID': '../../evil' });
    ctr.setPrototype('_res', { setHeader() {}, getHeader() { return undefined; } });
    class FakeKv extends lKv.Kv {
        constructor() { super({ 'host': '127.0.0.1' }); }
        async get() { return null; }
        async set() { wrote = true; return false; }
        async expire() { return true; }
    }
    const sess = new lSession.Session();
    assert.equal(await sess.init(ctr, new FakeKv(), false), false);
    assert.equal(sess.getToken(), '');
    wrote = false;
    await sess.update();
    assert.equal(wrote, false);
});

test('Cookie hostOnly isolation, path boundary, and resetCookieSession', async () => {
    const store = {};
    const uri = lText.parseUrl('https://example.com/admin/panel');
    await lCookie.buildCookieObject(store, ['sid=hostonly; Path=/admin', 'sess=1; Path=/'], uri);
    assert.equal(lCookie.buildCookieQuery(store, lText.parseUrl('https://sub.example.com/admin/panel')), '');
    assert.equal(lCookie.buildCookieQuery(store, lText.parseUrl('https://example.com/administrator')), 'sess=1');
    assert.match(lCookie.buildCookieQuery(store, lText.parseUrl('https://example.com/admin/panel')), /sid=hostonly/);
    lCookie.resetCookieSession(store);
    assert.equal(lCookie.buildCookieQuery(store, lText.parseUrl('https://example.com/admin/panel')), '');
});

test('Crypto SM4 string keys and empty-key HMAC', () => {
    const enc16 = lCrypto.sm4Encrypt('hello sm4', '1234567890abcdef');
    assert.equal(lCrypto.sm4Decrypt(enc16, '1234567890abcdef'), 'hello sm4');
    const encAny = lCrypto.sm4Encrypt('hello any key', 'my-passphrase');
    assert.equal(lCrypto.sm4Decrypt(encAny, 'my-passphrase'), 'hello any key');

    const expectedHmac = crypto.createHmac('sha256', '').update('msg').digest('hex');
    const plainSha = crypto.createHash('sha256').update('msg').digest('hex');
    assert.equal(lCrypto.hashHmac('sha256', 'msg', ''), expectedHmac);
    assert.notEqual(lCrypto.hashHmac('sha256', 'msg', ''), plainSha);
});

test('Zip blocks prototype pollution, handles empty archives and 0-byte files', async () => {
    const zEmpty = await lZip.get();
    assert.ok(zEmpty);
    assert.deepEqual(await zEmpty.getList(), {});

    const z = await lZip.get();
    assert.ok(z);
    z.putContent('__proto__/polluted.txt', 'x');
    z.putContent('empty.txt', '');
    const buf = await z.generate({ 'type': 'nodebuffer' });
    const z2 = await lZip.get(buf);
    assert.ok(z2);
    assert.equal(({}).polluted, undefined);
    assert.equal(z2.stats('constructor'), null);
    const list = await z2.getList();
    assert.equal(list['/empty.txt'], '');
});

test('Text isDomain avoids ReDoS, isIdCardCN blocks spaces, trimJson/int2str safe', () => {
    const t0 = Date.now();
    assert.equal(lText.isDomain('.'.repeat(20_000) + '0'), false);
    assert.ok(Date.now() - t0 < 100);
    assert.equal(lText.isDomain('example.com'), true);
    assert.equal(lText.isDomain('example.xn--fiqs8s'), true);

    assert.equal(lText.isIdCardCN('110105 19491231002'), false);
    assert.equal(lText.isIdCardCN('11010519491231002A'), false);
    assert.equal(lText.trimJson(null), null);
    assert.equal(lText.int2str(100, 0, 0), '100');
    assert.equal(lText.int2str(12345, 2, 0), '123');
});

test('Core setCookie blocks header/attribute injection', () => {
    const headers = {};
    const ctr = {
        getPrototype() {
            return {
                getHeader(k) { return headers[k.toLowerCase()]; },
                setHeader(k, v) { headers[k.toLowerCase()] = v; },
            };
        },
    };
    lCore.setCookie(ctr, 'bad;name', '1');
    lCore.setCookie(ctr, 'ok', '1', { 'path': '/\r\nSet-Cookie: evil=1' });
    lCore.setCookie(ctr, 'ok', '1', { 'domain': 'example.com; Secure' });
    assert.equal(headers['set-cookie'], undefined);
    lCore.setCookie(ctr, 'good', 'v', { 'path': '/', 'samesite': 'Lax' });
    assert.ok(Array.isArray(headers['set-cookie']) && headers['set-cookie'].length === 1);
});

test('Proxy strips RFC 9110 hop-by-hop headers and deduplicates passthrough casing', () => {
    const filtered = proxy.filterProxyHeaders({
        'Connection': 'keep-alive, X-Custom-Hop',
        'X-Custom-Hop': 'secret',
        'TE': 'trailers',
        'Proxy-Authorization': 'Basic abc',
        'X-Keep': 'ok',
    });
    assert.equal(filtered['x-custom-hop'], undefined);
    assert.equal(filtered['X-Custom-Hop'], undefined);
    assert.equal(filtered['TE'], undefined);
    assert.equal(filtered['Proxy-Authorization'], undefined);
    assert.equal(filtered['X-Keep'], 'ok');

    const built = proxy.buildProxyHeaders(
        { 'headers': { 'authorization': 'Bearer old', 'x-a': '1' }, 'socket': {} },
        { 'headers': { 'Authorization': 'Bearer new' }, 'proxyMode': 'passthrough' }
    );
    assert.equal(built['authorization'], 'Bearer new');
    assert.equal(built['Authorization'], undefined);
});

test('Route blocks mustHttps open redirect and sub/middle direct access', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-sec-route-'));
    const ctrUrl = new URL('../../sys/ctr.js', import.meta.url).href;
    try {
        await fs.mkdir(path.join(root, 'ctr', 'sub'), { 'recursive': true });
        await fs.writeFile(path.join(root, 'package.json'), '{"type":"module"}');
        await fs.writeFile(path.join(root, 'ctr', 'middle.js'), `import { Ctr } from ${JSON.stringify(ctrUrl)};
export default class extends Ctr {}`);
        await fs.writeFile(path.join(root, 'ctr', 'main.js'), `import { Ctr } from ${JSON.stringify(ctrUrl)};
export default class extends Ctr { index() { return 'ok'; } }`);
        await fs.writeFile(path.join(root, 'kebab.json'), JSON.stringify({
            'set': { 'mustHttps': true, 'cacheTtl': 0 },
            'route': { '/evil.com/phish': 'main' },
        }));
        await fs.writeFile(path.join(root, 'ctr', 'sub', 'middle.js'), 'export default class {}');

        const resHeaders = {};
        let status = 0;
        const req = Object.assign(Readable.from([]), {
            'method': 'GET',
            'url': '//evil.com/phish',
            'headers': { 'host': 'example.com' },
            'socket': { 'remoteAddress': '127.0.0.1' },
        });
        const res = {
            'headersSent': false,
            'writableEnded': false,
            setHeader(k, v) { resHeaders[k.toLowerCase()] = v; },
            writeHead(code) { status = code; this.headersSent = true; },
            end() { this.writableEnded = true; },
        };
        const timer1 = setTimeout(() => {}, 1000);
        await sRoute.run({
            'req': req,
            'res': res,
            'uri': lText.parseUrl('http://example.com//evil.com/phish'),
            'rootPath': `${root}/`,
            'urlBase': '/',
            'path': '/evil.com/phish',
            'timer': { 'timer': timer1, 'timeout': 1000, 'callback': () => {} },
        });
        clearTimeout(timer1);
        assert.equal(status, 302);
        assert.equal(resHeaders['location'], 'https://example.com/evil.com/phish');

        // Test sub/middle direct access blocked (404)
        await fs.writeFile(path.join(root, 'kebab.json'), JSON.stringify({ 'set': { 'mustHttps': false, 'cacheTtl': 0 } }));
        sRoute.clearKebabConfigs();
        let status2 = 0;
        const req2 = Object.assign(Readable.from([]), {
            'method': 'GET',
            'url': '/sub/middle',
            'headers': { 'host': 'example.com' },
            'socket': { 'remoteAddress': '127.0.0.1' },
        });
        const res2 = {
            'headersSent': false,
            'writableEnded': false,
            setHeader() {},
            writeHead(code) { status2 = code; this.headersSent = true; },
            end() { this.writableEnded = true; },
        };
        const timer2 = setTimeout(() => {}, 1000);
        await sRoute.run({
            'req': req2,
            'res': res2,
            'uri': lText.parseUrl('https://example.com/sub/middle'),
            'rootPath': `${root}/`,
            'urlBase': '/',
            'path': 'sub/middle',
            'timer': { 'timer': timer2, 'timeout': 1000, 'callback': () => {} },
        });
        clearTimeout(timer2);
        assert.equal(status2, 404);
    }
    finally {
        sRoute.clearKebabConfigs();
        await fs.rm(root, { 'recursive': true, 'force': true });
    }
});

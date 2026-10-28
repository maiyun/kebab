import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import ts from '../../node_modules/typescript/lib/typescript.js';

import * as route from '../../sys/route.js';
import * as text from '../../lib/text.js';

const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-url-host-'));
const rootPath = `${root}/`;
const ctrUrl = new URL('../../sys/ctr.js', import.meta.url).href;
const reactUrl = new URL('../../node_modules/react/index.js', import.meta.url).href;
await fs.mkdir(path.join(root, 'ctr'));
await fs.mkdir(path.join(root, 'stc/view'), { recursive: true });
await fs.writeFile(path.join(root, 'package.json'), '{"type":"module"}');
await fs.writeFile(path.join(root, 'kebab.json'), JSON.stringify({
    set: { cacheTtl: 0, staticVer: 'test' }, route: {},
}));
await fs.writeFile(path.join(root, 'ctr/middle.js'), `
    import { Ctr } from ${JSON.stringify(ctrUrl)};
    export default class extends Ctr {
        onReqStart() { this._res.config = this._config; return -1; }
        render() { return this._loadReactPage('view/app'); }
    }
`);
await fs.writeFile(path.join(root, 'stc/view/app.page.js'), `
    import { createElement as h } from ${JSON.stringify(reactUrl)};
    export default function Page(props) {
        return h('html', null,
            h('head', null,
                h('link', { rel: 'canonical', href: props._urlFull + 'docs' }),
                ...['en', 'ja'].map(locale => h('link', {
                    key: locale, rel: 'alternate', hrefLang: locale, href: props._urlFull + locale + '/docs',
                }))),
            h('body', null));
    }
`);
await fs.writeFile(path.join(root, 'stc/view/app.page.bundle.js'), '');
const Controller = (await import(path.join(root, 'ctr/middle.js'))).default;

async function getConfig(url, urlBase = '/', headers = {}) {
    const uri = text.parseUrl(url);
    const originalUri = { ...uri };
    const req = { headers, url: uri.path };
    const res = {};
    assert.equal(await route.run({ req, res, uri, rootPath, urlBase, path: 'docs' }), true);
    assert.deepEqual(uri, originalUri, 'normalization must not change the original URI');
    return { config: res.config, req, res };
}

try {
    for (const [url, expectedHost, expectedPort] of [
        ['https://example.com:443/docs', 'example.com', 443],
        ['http://example.com:80/docs', 'example.com', 80],
        ['https://example.com:8443/docs', 'example.com:8443', 8443],
        ['http://example.com:8080/docs', 'example.com:8080', 8080],
        ['https://example.com:80/docs', 'example.com:80', 80],
        ['http://example.com:443/docs', 'example.com:443', 443],
        ['https://example.com/docs', 'example.com', 443],
        ['http://example.com/docs', 'example.com', 80],
        ['https://[2001:db8::1]:443/docs', '[2001:db8::1]', 443],
        ['http://[2001:db8::1]:80/docs', '[2001:db8::1]', 80],
        ['https://[2001:db8::1]:8443/docs', '[2001:db8::1]:8443', 8443],
        ['http://[2001:db8::1]:8080/docs', '[2001:db8::1]:8080', 8080],
        ['https://[2001:db8::1]/docs', '[2001:db8::1]', 443],
        ['wss://example.com:443/docs', 'example.com:443', 443],
        ['ws://example.com:80/docs', 'example.com:80', 80],
    ]) {
        await test(`route and SSR normalize ${url}`, async () => {
            const { config, req, res } = await getConfig(url);
            const original = text.parseUrl(url);
            const origin = `${original.protocol}//${expectedHost}`;
            assert.equal(config.const.hostCanonical, expectedHost);
            assert.equal(config.const.host, original.host);
            assert.equal(config.const.hostname, original.hostname);
            assert.equal(config.const.hostport, expectedPort);
            assert.equal(config.const.urlOrigin, origin);
            assert.equal(config.const.urlFull, `${origin}/`);
            assert.equal(config.const.urlStcFull, `${origin}/stc/`);
            assert.equal(config.set.staticPathFull, `${origin}/stc/`);
            const html = await new Controller(config, req, res).render();
            assert.ok(html.includes(`rel="canonical" href="${origin}/docs"`), html);
            const props = JSON.parse(html.match(/<script id="__kebab_props__" type="application\/json">(.*?)<\/script>/s)[1]);
            assert.equal(props._urlFull, `${origin}/`);
            assert.equal(props._staticPathFull, `${origin}/stc/`);
        });
    }
    await test('nested application URLs and explicit CDN configuration are preserved', async () => {
        const { config, req, res } = await getConfig('https://example.com:443/app/docs', '/app/');
        assert.equal(config.const.urlFull, 'https://example.com/app/');
        assert.equal(config.const.urlStcFull, 'https://example.com/app/stc/');
        config.set = { ...config.set, staticPathFull: 'https://cdn.example.com:443/assets/' };
        const html = await new Controller(config, req, res).render();
        const props = JSON.parse(html.match(/<script id="__kebab_props__" type="application\/json">(.*?)<\/script>/s)[1]);
        assert.equal(props._staticPathFull, 'https://cdn.example.com:443/assets/');
    });

    for (const [name, url, headers, origin] of [
        ['HTTPS visitor over HTTP origin', 'http://example.com/docs', { 'x-forwarded-proto': 'https' }, 'https://example.com'],
        ['HTTP visitor over TLS origin', 'https://example.com/docs', { 'x-forwarded-proto': 'http' }, 'http://example.com'],
        ['Forwarded cannot override XFP', 'http://example.com/docs', { forwarded: 'proto=http', 'x-forwarded-proto': 'https' }, 'https://example.com'],
        ['Forwarded cannot upgrade XFP', 'https://example.com/docs', { forwarded: 'proto=https', 'x-forwarded-proto': 'http' }, 'http://example.com'],
        ['case-insensitive XFP with whitespace', 'http://example.com/docs', { 'x-forwarded-proto': ' HTTPS ' }, 'https://example.com'],
        ['first X-Forwarded-Proto hop', 'http://example.com/docs', { 'x-forwarded-proto': 'https, http' }, 'https://example.com'],
        ['explicit public port stays', 'http://example.com:8443/docs', { 'x-forwarded-proto': 'https' }, 'https://example.com:8443'],
        ['explicit port 80 is not silently removed for HTTPS', 'http://example.com:80/docs', { 'x-forwarded-proto': 'https' }, 'https://example.com:80'],
        ['IPv6 authority stays', 'http://[2001:db8::1]/docs', { 'x-forwarded-proto': 'https' }, 'https://[2001:db8::1]'],
        ['forwarded authority and port cannot replace Host', 'http://example.com/docs', { forwarded: 'host=attacker.example:1234;proto=http', 'x-forwarded-proto': 'https', 'x-forwarded-host': 'attacker.example', 'x-forwarded-port': '1234' }, 'https://example.com'],
    ]) {
        await test(name, async () => {
            const { config, req, res } = await getConfig(url, '/', headers);
            const raw = text.parseUrl(url);
            assert.equal(config.const.urlOrigin, origin);
            assert.equal(config.const.urlFull, origin + '/');
            assert.equal(config.const.urlStcFull, origin + '/stc/');
            assert.equal(config.set.staticPathFull, origin + '/stc/');
            assert.equal(config.const.https, raw.protocol === 'https:');
            assert.equal(config.const.host, raw.host);
            assert.equal(config.const.hostname, raw.hostname);
            assert.equal(config.const.hostport, raw.port ? Number(raw.port) : (raw.protocol === 'https:' ? 443 : 80));
            const html = await new Controller(config, req, res).render();
            const props = JSON.parse(html.match(/<script id="__kebab_props__"[^>]*>(.*?)<\/script>/s)[1]);
            assert.equal(props._urlFull, origin + '/');
            assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
            assert.ok(html.includes(`rel="canonical" href="${props._urlFull}docs"`));
            for (const locale of ['en', 'ja']) {
                assert.equal((html.match(new RegExp(`hrefLang="${locale}"`, 'g')) ?? []).length, 1);
                assert.ok(html.includes(`href="${props._urlFull}${locale}/docs"`));
            }
        });
    }

    for (const headers of [
        {},
        { 'x-forwarded-proto': '' },
        { 'x-forwarded-proto': '   ' },
        { 'x-forwarded-proto': 'javascript:alert(1)' },
        { 'x-forwarded-proto': 'https://attacker.example' },
        { 'x-forwarded-proto': '"https"' },
        { 'x-forwarded-proto': 'ftp, https' },
        { 'x-forwarded-proto': ', https' },
        { 'x-forwarded-proto': ['https', 'http'] },
        { 'x-forwarded-proto': 'x'.repeat(4097) },
        { forwarded: 'proto=https' },
        { forwarded: 'proto=http' },
        { forwarded: 'proto=https', 'x-forwarded-proto': 'invalid' },
        { forwarded: 'proto=http', 'x-forwarded-proto': 'invalid' },
    ]) {
        for (const protocol of ['http', 'https']) {
            await test(`missing or invalid XFP keeps ${protocol}: ${JSON.stringify(headers).slice(0, 90)}`, async () => {
                const { config } = await getConfig(`${protocol}://example.com/docs`, '/', headers);
                assert.equal(config.const.urlFull, `${protocol}://example.com/`);
                assert.equal(config.set.staticPathFull, `${protocol}://example.com/stc/`);
                assert.equal(config.const.https, protocol === 'https');
            });
        }
    }

    // Exercise the actual compiled request entry without starting framework workers.
    const child = ts.createSourceFile('child.js', await fs.readFile(new URL('../../sys/child.js', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true);
    const handler = child.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'requestHandler');
    assert.ok(handler);
    const requestHandler = new Function('lText', 'lCore', 'sCtr', 'getVhostByHostname', 'lFs', 'sRoute', 'kebab', 'http', 'stopping', `${handler.getText(child)};return requestHandler;`)(
        text, { log(...args) { throw new Error(JSON.stringify(args)); } }, { isHttpRequestAvailable: () => false },
        async () => ({ real: rootPath }), { stats: async () => ({ isDirectory: () => true }) },
        { run: async data => { clearTimeout(data.timer.timer); return route.run(data); } },
        { VER: 'test' }, { ServerResponse: class {} }, false,
    );
    for (const [host, origin] of [
        ['example.com', 'https://example.com'],
        ['example.com:443', 'https://example.com'],
        ['example.com:8443', 'https://example.com:8443'],
        ['[2001:db8::1]', 'https://[2001:db8::1]'],
    ]) {
        await test(`HTTP entry keeps public authority ${host} over internal port 8080`, async () => {
            const req = { headers: { host, 'x-forwarded-proto': 'https' }, url: '/docs', socket: { localPort: 8080 } };
            const res = { setHeader() {} };
            await requestHandler(req, res, false);
            assert.equal(res.config.const.host, host);
            assert.equal(res.config.const.urlOrigin, origin);
            assert.equal(res.config.const.https, false);
            assert.ok(!res.config.const.urlFull.includes(':8080'));
        });
    }
    await test('WebSocket URLs ignore HTTP forwarding hints', async () => {
        const { config } = await getConfig('wss://example.com:443/docs', '/', { forwarded: 'proto=http', 'x-forwarded-proto': 'https' });
        assert.equal(config.const.urlFull, 'wss://example.com:443/');
    });
}
finally {
    route.clearKebabConfigs();
    await fs.rm(root, { recursive: true, force: true });
}

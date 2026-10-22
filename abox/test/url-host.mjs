import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

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
            h('head', null, h('link', { rel: 'canonical', href: props._urlFull + 'docs' })),
            h('body', null));
    }
`);
await fs.writeFile(path.join(root, 'stc/view/app.page.bundle.js'), '');
const Controller = (await import(path.join(root, 'ctr/middle.js'))).default;

async function getConfig(url, urlBase = '/') {
    const uri = text.parseUrl(url);
    const originalUri = { ...uri };
    const req = { headers: {}, url: uri.path };
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
}
finally {
    route.clearKebabConfigs();
    await fs.rm(root, { recursive: true, force: true });
}

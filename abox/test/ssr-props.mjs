import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { Ctr } from '../../sys/ctr.js';

const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-ssr-'));
const require = createRequire(import.meta.url);
const reactUrl = pathToFileURL(require.resolve('react')).href;

try {
    await fs.mkdir(path.join(root, 'stc'));
    await fs.writeFile(path.join(root, 'stc', 'test.page.js'), `import React from ${JSON.stringify(reactUrl)};
export default function Page() {
    return React.createElement('html', null, React.createElement('body', null, 'SSR'));
}`);
    await fs.writeFile(path.join(root, 'stc', 'test.page.bundle.js'), '');
    const ctr = new Ctr({
        const: { rootPath: `${root}/`, urlBase: '/', urlFull: '/', urlStc: '/stc/' },
        set: { cacheTtl: 0, staticPath: '/stc/', staticPathFull: '/stc/', staticVer: '1' },
    }, {});
    const props = {
        values: ['</script>', '</ScRiPt >', '</script\t>', '<!--', '<img src=x onerror=alert(1)>', 'a < b', '\\u003c'],
        nested: { '<key>': '</script\n><script>alert(1)</script>' },
    };
    const html = await ctr._loadReactPage('test', props);
    const match = html.match(/<script id="__kebab_props__" type="application\/json">([^<]*)<\/script>/);
    assert.ok(match, 'props script must contain no literal <');
    const parsed = JSON.parse(match[1]);
    assert.deepEqual(parsed.values, props.values);
    assert.deepEqual(parsed.nested, props.nested);
    assert.equal((html.match(/<script\b/gi) ?? []).length, 2);
    assert.match(html, /<script type="module">import'\/stc\/test\.page\.bundle\.js\?v=1';<\/script>/);

    const noHydrate = await ctr._loadReactPage('test', props, { hydrate: false });
    assert.match(noHydrate, /<body>SSR<\/body>/);
    assert.doesNotMatch(noHydrate, /<script\b/i);
    console.log('SSR props escaping and hydration regression passed.');
}
finally {
    await fs.rm(root, { recursive: true, force: true });
}

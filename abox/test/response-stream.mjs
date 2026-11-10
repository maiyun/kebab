import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Readable, Transform, Writable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { createGzip, gunzipSync } from 'node:zlib';
import { pipeResponse } from '../response.js';

function sink() {
    const chunks = [];
    const output = new Writable({ write(chunk, encoding, callback) { chunks.push(Buffer.from(chunk)); callback(); } });
    output.content = () => Buffer.concat(chunks);
    return output;
}

for (const compress of [false, true]) {
    const output = sink();
    const complete = finished(output);
    pipeResponse(['one', Readable.from(['two']), Buffer.from('three')], output, compress ? createGzip() : undefined);
    await complete;
    assert.equal((compress ? gunzipSync(output.content()) : output.content()).toString(), 'onetwothree');
}
{
    const source = new Readable({ read() { this.destroy(new Error('source failure')); } });
    const output = sink();
    const complete = finished(output).catch(() => {});
    pipeResponse([source], output);
    await complete;
    assert.equal(output.destroyed, true);
}
{
    const pending = new Readable({ read() {} });
    const output = sink();
    const done = finished(output).catch(() => {});
    pipeResponse([pending], output, createGzip());
    output.destroy();
    await done;
    assert.equal(pending.destroyed, true);
}
{
    const first = new Readable({ read() {} });
    const later = new Readable({ read() {} });
    const output = sink();
    const done = finished(output).catch(() => {});
    pipeResponse([first, later], output);
    later.destroy(new Error('future part failure'));
    await done;
    assert.equal(first.destroyed, true);
    assert.equal(output.destroyed, true);
}
{
    const source = Readable.from(['data']);
    const output = sink();
    const broken = new Transform({ transform(chunk, encoding, callback) { callback(new Error('compression failure')); } });
    const complete = finished(output).catch(() => {});
    pipeResponse([source], output, broken);
    await complete;
    assert.equal(output.destroyed, true);
}
for (const trigger of ['source', 'close']) {
    const first = new Readable({ read() {} });
    const later = new Readable({
        read() {},
        destroy(error, callback) { setTimeout(() => callback(new Error('late destroy failure')), 15); },
    });
    const output = sink();
    const closed = new Promise(resolve => later.once('close', resolve));
    pipeResponse([first, later], output);
    if (trigger === 'source') first.destroy(new Error('first failure'));
    else output.destroy();
    await closed;
    assert.equal(later.listenerCount('error'), 0);
}
{
    let release;
    const output = new Writable({ write(chunk, encoding, callback) { release = callback; } });
    const inputDone = new Promise(resolve => pipeResponse(['data'], output, undefined, resolve));
    await inputDone;
    assert.equal(output.writableFinished, false);
    release();
    await finished(output);
}
const fixture = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-response-route-'));
try {
    const route = await import('../../sys/route.js');
    const text = await import('../../lib/text.js');
    const ctrUrl = new URL('../../sys/ctr.js', import.meta.url).href;
    await fs.mkdir(path.join(fixture, 'ctr'));
    await fs.writeFile(path.join(fixture, 'package.json'), '{"type":"module"}');
    await fs.writeFile(path.join(fixture, 'kebab.json'), JSON.stringify({ set: { cacheTtl: 0 }, session: { name: 'sid' }, route: {} }));
    await fs.writeFile(path.join(fixture, 'ctr/middle.js'), `import { Ctr } from ${JSON.stringify(ctrUrl)}; export default class extends Ctr {}`);
    await fs.writeFile(path.join(fixture, 'ctr/demo.js'), `import { Ctr } from ${JSON.stringify(ctrUrl)}; export default class extends Ctr { index() { return globalThis.__responseTestValue; } }`);
    async function request(value) {
        globalThis.__responseTestValue = value;
        const req = Readable.from([]);
        req.method = 'GET';
        req.headers = {};
        req.url = '/demo';
        req.socket = { remoteAddress: '127.0.0.1' };
        const res = sink();
        const headers = new Map();
        res.getHeader = name => headers.get(name.toLowerCase());
        res.setHeader = (name, val) => headers.set(name.toLowerCase(), val);
        res.removeHeader = name => headers.delete(name.toLowerCase());
        res.writeHead = status => { res.statusCode = status; res.headersSent = true; };
        await route.run({ req, res, uri: text.parseUrl('http://example.test/demo'), rootPath: fixture + '/', urlBase: '/', path: 'demo' });
        return res;
    }
    const normal = await request(Readable.from(['normal']));
    await finished(normal);
    assert.equal(normal.content().toString(), 'normal');
    const combined = await request(['first', Readable.from(['second'])]);
    await finished(combined);
    assert.equal(combined.content().toString(), 'firstsecond');
    const broken = await request(new Readable({ read() { this.destroy(new Error('route source failure')); } }));
    await finished(broken).catch(() => {});
    assert.equal(broken.destroyed, true);
}
finally {
    delete globalThis.__responseTestValue;
    await fs.rm(fixture, { recursive: true, force: true });
}
console.log('response stream checks passed');

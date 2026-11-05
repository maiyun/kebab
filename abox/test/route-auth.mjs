import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import * as route from '../../sys/route.js';
import * as text from '../../lib/text.js';

const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-route-auth-'));
const ctrUrl = new URL('../../sys/ctr.js', import.meta.url).href;
const kvUrl = new URL('../../lib/kv.js', import.meta.url).href;
try {
    await fs.mkdir(path.join(root, 'ctr'));
    await fs.writeFile(path.join(root, 'package.json'), '{"type":"module"}');
    await fs.writeFile(path.join(root, 'kebab.json'), JSON.stringify({ set: { cacheTtl: 0 }, session: { name: 'sid' }, route: {} }));
    await fs.writeFile(path.join(root, 'ctr/middle.js'), `
        import { Ctr } from ${JSON.stringify(ctrUrl)};
        import { Kv } from ${JSON.stringify(kvUrl)};
        export default class extends Ctr {
            async onReqStart() {
                const kv = Object.create(Kv.prototype);
                kv.getJson = async key => key === 'sid_legacy-id' ? { identity: 'legacy' } : null;
                kv.set = async () => true;
                this._cookie = { sid: 'cookie-id' };
                await this._startSession(kv, true);
                this._res.result = { headers: this._headers, auth: this.getAuthorization(), identity: this._session.identity, token: this._sess.getToken() };
                return -1;
            }
        }
    `);
    const run = async headers => {
        const req = { headers, url: '/test' };
        const res = { getHeader() {}, setHeader() {} };
        await route.run({ req, res, uri: text.parseUrl('http://example.test/test?_auth=Bearer%20legacy-id'), rootPath: `${root}/`, urlBase: '/', path: 'test' });
        return res.result;
    };
    const absent = await run({});
    assert.equal(Object.hasOwn(absent.headers, 'authorization'), false);
    assert.deepEqual(absent.auth, { type: 'bearer', token: 'legacy-id' });
    assert.equal(absent.identity, 'legacy');
    assert.equal(absent.token, 'legacy-id');
    const empty = await run({ authorization: '' });
    assert.equal(empty.headers.authorization, '');
    assert.equal(empty.auth, false);
    assert.equal(empty.identity, undefined);
    assert.notEqual(empty.token, 'cookie-id');
    assert.notEqual(empty.token, 'legacy-id');
    console.log('Route preserves absent and empty Authorization semantics');
}
finally {
    await fs.rm(root, { recursive: true, force: true });
}
process.exit(0);

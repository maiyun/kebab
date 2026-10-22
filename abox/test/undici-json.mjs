import assert from 'node:assert/strict';
import test from 'node:test';
import { MockAgent } from 'undici';
import * as undici from '../../lib/undici.js';

const origin = 'https://upstream.example';
const methods = [
    ['getResponseJson', 'GET', (options) => undici.getResponseJson(`${origin}/data`, options)],
    ['postResponseJson', 'POST', (options) => undici.postResponseJson(`${origin}/data`, { query: 'test' }, options)],
    ['postJsonResponseJson', 'POST', (options) => undici.postJsonResponseJson(`${origin}/data`, { query: 'test' }, options)],
];

for (const [name, method, request] of methods) {
    async function run(bodies, options = {}) {
        const agent = new MockAgent();
        agent.disableNetConnect();
        const pool = agent.get(origin);
        for (const body of bodies) {
            const scope = pool.intercept({ path: '/data', method });
            if (body instanceof Error) {
                scope.replyWithError(body);
            }
            else {
                scope.reply(200, body, { headers: { 'content-type': 'application/json' } });
            }
        }
        try {
            const result = await request({ reuse: agent, log: false, ...options });
            agent.assertNoPendingInterceptors();
            return result;
        }
        finally {
            await agent.close();
        }
    }

    test(`${name}: exhausted validation returns the last response`, async () => {
        let calls = 0;
        const result = await run(['{"error":"first"}', '{"error":"last"}'], {
            retryJson: 1,
            retryJsonHandler: () => { ++calls; return false; },
        });
        assert.deepEqual(result, { error: 'last' });
        assert.equal(calls, 2);
    });

    test(`${name}: no retry budget still preserves rejected JSON`, async () => {
        assert.deepEqual(await run(['{"error":"rejected"}'], {
            retryJsonHandler: () => false,
        }), { error: 'rejected' });
    });

    test(`${name}: validation success stops retrying`, async () => {
        let calls = 0;
        const result = await run(['{"ok":false}', '{"ok":true}'], {
            retryJson: 2,
            retryJsonHandler: (json) => { ++calls; return json.ok; },
        });
        assert.deepEqual(result, { ok: true });
        assert.equal(calls, 2);
    });

    test(`${name}: last parse failure does not return an earlier rejected response`, async () => {
        let calls = 0;
        assert.equal(await run(['{"error":"earlier"}', 'invalid JSON'], {
            retryJson: 1,
            retryJsonHandler: () => { ++calls; return false; },
        }), false);
        assert.equal(calls, 1);
    });

    test(`${name}: request failure after rejection returns null`, async () => {
        assert.equal(await run(['{"error":"earlier"}', new Error('mock request failure')], {
            retryJson: 1,
            retryJsonHandler: () => false,
        }), null);
    });

    test(`${name}: parsing retries and calls without a validator keep working`, async () => {
        assert.deepEqual(await run(['invalid JSON', '{"ok":true}'], { retryJson: 1 }), { ok: true });
        assert.deepEqual(await run(['{"ok":true}']), { ok: true });
        assert.equal(await run(['invalid JSON']), false);
    });
}

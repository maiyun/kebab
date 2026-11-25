import assert from 'node:assert/strict';
import test from 'node:test';
import { Kv } from '../../lib/kv.js';

test('Kv JSON reads preserve missing and failure results and getDelJson consumes the value', async () => {
    const kv = new Kv({ pre: 'test:' });
    const values = new Map([['test:user', '{"uid":"user"}'], ['test:malformed', '{invalid']]);
    kv._getConnection = async () => ({
        get: async key => values.get(key) ?? null,
        getDel: async key => {
            const value = values.get(key) ?? null;
            values.delete(key);
            return value;
        },
    });
    assert.deepEqual(await kv.getJson('user'), { uid: 'user' });
    assert.deepEqual(await kv.getDelJson('user'), { uid: 'user' });
    assert.equal(await kv.getDelJson('user'), null);
    assert.equal(await kv.getJson('malformed'), false);
    assert.equal(await kv.getDelJson('malformed'), false);
    assert.equal(await kv.getJson('malformed'), null);

    kv._getConnection = async () => null;
    assert.equal(await kv.getJson('user'), null);
    assert.equal(await kv.getDelJson('user'), false);
});

test('Kv.hGetJson returns parsed hash values and preserves missing and failure results', async () => {
    const kv = new Kv({ pre: 'test:' });
    const fields = new Map([
        ['object', '{"uid":"user"}'],
        ['array', '[9007199254740993]'],
        ['zero', '0'],
        ['empty', '""'],
        ['false', 'false'],
        ['null', 'null'],
        ['malformed', '{invalid'],
    ]);
    kv._getConnection = async () => ({
        hGet: async (key, field) => {
            assert.equal(key, 'test:users');
            if (field === 'failed') {
                throw new Error('mock read failure');
            }
            return fields.get(field) ?? null;
        },
    });
    assert.deepEqual(await kv.hGetJson('users', 'object'), { uid: 'user' });
    assert.deepEqual(await kv.hGetJson('users', 'array'), [9_007_199_254_740_993n]);
    assert.equal(await kv.hGetJson('users', 'zero'), 0);
    assert.equal(await kv.hGetJson('users', 'empty'), '');
    assert.equal(await kv.hGetJson('users', 'false'), null);
    assert.equal(await kv.hGetJson('users', 'null'), null);
    assert.equal(await kv.hGetJson('users', 'malformed'), null);
    assert.equal(await kv.hGetJson('users', 'missing'), null);
    assert.equal(await kv.hGetJson('users', 'failed'), false);
});

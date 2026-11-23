import assert from 'node:assert/strict';
import test from 'node:test';
import { ProtocolClient } from '@litert/redis/lib/ProtocolClient.js';
import { get } from '../../lib/kv.js';

const config = { host: 'pool.test.invalid', port: 6379, index: 0, pre: 'a:', user: 'test', pwd: 'example' };

test('concurrent first use shares initialized Redis clients only across matching database and credentials', async t => {
    const history = new Map();
    t.mock.method(ProtocolClient.prototype, '_command', async function(cmd, args) {
        if (!history.has(this)) history.set(this, []);
        history.get(this).push([cmd, ...args]);
        return cmd === 'PING' ? 'PONG' : 'OK';
    });
    const first = get(config);
    const second = get({ ...config, pre: 'b:' });
    const otherDb = get(config, { index: 2 });
    const otherUser = get(config, { user: 'second' });
    const otherPassword = get(config, { pwd: 'rotated' });
    assert.deepEqual(await Promise.all([first, second, otherDb, otherUser, otherPassword].map(kv => kv.ping())),
        Array(5).fill('PONG'));
    assert.equal(await first.ping(), 'PONG');
    const sequence = (user, pwd, db, pings) =>
        [['AUTH', user, pwd], ['SELECT', db], ...Array.from({ length: pings }, () => ['PING'])];
    assert.deepEqual([...history.values()], [
        sequence('test', 'example', 0, 3),
        sequence('test', 'example', 2, 1),
        sequence('second', 'example', 0, 1),
        sequence('test', 'rotated', 0, 1),
    ]);
});

for (const failure of ['AUTH', 'SELECT']) {
    test(`shared ${failure} failure closes the client once and a new attempt can succeed`, async t => {
        const clients = new Set();
        const closed = [];
        let failing = true;
        t.mock.method(ProtocolClient.prototype, '_command', async function(cmd) {
            clients.add(this);
            if (failing && cmd === failure) throw new Error(failure);
            return cmd === 'PING' ? 'PONG' : 'OK';
        });
        t.mock.method(ProtocolClient.prototype, 'close', function() { closed.push(this); });
        const kv = get({ ...config, host: `${failure}.test.invalid` });
        assert.deepEqual(await Promise.all([kv.ping(), kv.ping()]), [false, false]);
        assert.equal(clients.size, 1);
        assert.deepEqual(closed, [...clients]);
        failing = false;
        assert.deepEqual(await Promise.all([kv.ping(), kv.ping()]), ['PONG', 'PONG']);
        assert.equal(clients.size, 2);
        assert.equal(closed.length, 1);
    });
}

import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { access, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { setTimeout as delay } from 'node:timers/promises';
import { createClient } from 'redis';
import { check, checkFixed } from '../../lib/ratelimit.js';

test('rate limit key construction, option normalization, script compatibility and unavailable fallback', async () => {
    const calls = [];
    const kv = {
        getPre: () => 'kv:',
        eval: async (script, keys, args) => {
            calls.push({ script, keys, args });
            return [2, 1700000060];
        },
    };
    const fixed = await checkFixed(kv, 'user1', { window: 30, max: 5, pre: 'api:' });
    assert.deepEqual(fixed, { allowed: true, remaining: 3, limit: 5, reset: 1700000060 });
    assert.deepEqual(calls.at(-1).keys, ['kv:api:user1']);
    assert.deepEqual(calls.at(-1).args, ['30000']);

    const sliding = await check(kv, 'subject', { window: 1, max: 4, pre: 'cluster:{same}:' });
    assert.deepEqual(sliding, { allowed: true, remaining: 2, limit: 4, reset: 1700000060 });
    assert.deepEqual(calls.at(-1).keys, ['kv:cluster:{same}:subject:sliding:1']);
    assert.deepEqual(calls.at(-1).args, ['1000', '4']);
    assert.match(calls.at(-1).script, /redis\.replicate_commands/);

    const malformed = await checkFixed(kv, 'bad', { window: Number.NaN, max: Infinity });
    assert.equal(malformed.limit, 60);
    assert.deepEqual(calls.at(-1).args, ['60000']);

    const unavailable = { getPre: () => 'kv:', eval: async () => false };
    for (const method of [checkFixed, check]) {
        const open = await method(unavailable, 'offline', { max: 3 });
        assert.equal(open.allowed, true);
        assert.equal(open.remaining, 3);
        assert.equal(open.unavailable, true);
        const closed = await method(unavailable, 'offline', { failClosed: true, max: 2 });
        assert.deepEqual({ ...closed, reset: 0 }, { allowed: false, remaining: 0, limit: 2, reset: 0, unavailable: true });
    }
});

test('rate limiting on an isolated Redis server', { timeout: 10000 }, async (t) => {
    const dir = await mkdtemp(join(tmpdir(), 'kebab-rate-'));
    const socket = join(dir, 'redis.sock');
    const server = spawn(process.env.KEBAB_TEST_REDIS_SERVER || 'redis-server', [
        '--port', '0', '--unixsocket', socket, '--unixsocketperm', '700',
        '--dir', dir, '--save', '', '--appendonly', 'no',
    ]);
    let output = '';
    server.stderr.on('data', chunk => { output += chunk; });
    const ready = new Promise((resolve, reject) => {
        server.once('error', reject);
        server.once('exit', (code) => reject(new Error(`Redis exited before startup (${code}): ${output}`)));
        server.stdout.on('data', (chunk) => {
            output += chunk;
            if (output.toLowerCase().includes('ready to accept connections')) resolve();
        });
    });
    const client = createClient({ socket: { path: socket, reconnectStrategy: false } });
    t.after(async () => {
        if (client.isOpen) client.destroy();
        if (server.pid && server.exitCode === null && server.signalCode === null) {
            const closed = once(server, 'exit');
            server.kill();
            await closed;
        }
        await rm(dir, { recursive: true, force: true });
    });
    await ready;
    await access(socket);
    await client.connect();

    const prefix = 'kv:';
    let usedKey;
    const kv = {
        getPre: () => prefix,
        eval: async (script, keys, args) => {
            assert.equal(keys.length, 1);
            usedKey = keys[0];
            try {
                return await client.eval(script, { keys, arguments: args });
            }
            catch {
                return false;
            }
        },
    };

    await t.test('fixed window admits only the quota under concurrency and keeps the original reset', async () => {
        const opt = { window: 5, max: 3, pre: 'fixed:' };
        const results = await Promise.all(Array.from({ length: 24 }, () => checkFixed(kv, 'same', opt)));
        assert.equal(usedKey, 'kv:fixed:same');
        assert.equal(results.filter(result => result.allowed).length, 3);
        assert.equal(new Set(results.map(result => result.reset)).size, 1);
        assert.deepEqual(results.filter(result => result.allowed).map(result => result.remaining).sort(), [0, 1, 2]);
        assert.ok(await client.pTTL(usedKey) > 0);
        const expiredAt = await client.pExpireTime(usedKey);
        await delay(40);
        assert.equal((await checkFixed(kv, 'same', opt)).reset, Math.ceil(expiredAt / 1000));
        assert.equal(await client.pExpireTime(usedKey), expiredAt);
    });

    await t.test('repairs a leaked fixed counter and rejects malformed options safely', async () => {
        await client.set('kv:rl:legacy', '42');
        const repaired = await checkFixed(kv, 'legacy', { window: 1, max: 1 });
        assert.equal(repaired.allowed, true);
        assert.equal(await client.get(usedKey), '1');
        assert.ok(await client.pTTL(usedKey) > 0);
        assert.equal((await checkFixed(kv, 'legacy', { window: 1, max: 1 })).allowed, false);
        await delay(await client.pTTL(usedKey) + 20);
        assert.equal((await checkFixed(kv, 'legacy', { window: 1, max: 1 })).allowed, true);
        const malformed = await checkFixed(kv, 'invalid-options', { window: Number.NaN, max: Infinity });
        assert.equal(malformed.limit, 60);
        assert.ok(await client.pTTL(usedKey) > 59_000);
    });

    await t.test('sliding window supports concurrent requests and isolates its key from the fixed window', async () => {
        const opt = { window: 1, max: 4, pre: 'cluster:{same}:' };
        assert.equal((await checkFixed(kv, 'subject', opt)).allowed, true);
        const fixedKey = usedKey;
        const results = await Promise.all(Array.from({ length: 20 }, () => check(kv, 'subject', opt)));
        assert.equal(usedKey, 'kv:cluster:{same}:subject:sliding:1');
        assert.notEqual(usedKey, fixedKey);
        assert.equal(results.filter(result => result.allowed).length, 4);
        const ttl = await client.pTTL(usedKey);
        assert.ok(ttl > 0 && ttl <= 1166);
        await delay(ttl + 20);
        assert.equal((await check(kv, 'subject', opt)).allowed, true);
    });

    await t.test('counts the segment intersecting the start of the window and reports when quota returns', async () => {
        const opt = { window: 60, max: 3 };
        await check(kv, 'old-segment', opt);
        const redisMilliseconds = async () => {
            const [seconds, micros] = await client.sendCommand(['TIME']);
            return Number(seconds) * 1000 + Math.floor(Number(micros) / 1000);
        };
        let now = await redisMilliseconds();
        if (now % 10000 > 9700) {
            await delay(10030 - now % 10000);
            now = await redisMilliseconds();
        }
        const oldest = Math.floor((now - 60000) / 10000);
        await client.set(usedKey, JSON.stringify({ [oldest]: 3, [oldest - 1]: 40 }));
        const result = await check(kv, 'old-segment', opt);
        assert.equal(result.allowed, false);
        assert.equal(result.reset, (oldest + 1) * 10 + 60);
        assert.equal(JSON.parse(await client.get(usedKey))[oldest - 1], undefined);
    });

    await t.test('reports Redis errors with a backwards-compatible default and opt-in rejection', async () => {
        await client.set('kv:rl:foreign', 'unrelated string');
        const rejected = await checkFixed(kv, 'foreign', { failClosed: true });
        assert.equal(rejected.allowed, false);
        assert.equal(rejected.unavailable, true);
        assert.equal(await client.get('kv:rl:foreign'), 'unrelated string');
        await client.set('kv:rl:corrupt:sliding:60', 'not-json');
        const corrupt = await check(kv, 'corrupt', { failClosed: true });
        assert.equal(corrupt.allowed, false);
        assert.equal(corrupt.unavailable, true);
        assert.equal(await client.get('kv:rl:corrupt:sliding:60'), 'not-json');
        const unavailable = { getPre: () => prefix, eval: async () => false };
        for (const method of [checkFixed, check]) {
            assert.equal((await method(unavailable, 'offline')).allowed, true);
            const failed = await method(unavailable, 'offline', { failClosed: true, max: 2 });
            assert.deepEqual({ ...failed, reset: 0 }, { allowed: false, remaining: 0, limit: 2, reset: 0, unavailable: true });
        }
    });
});

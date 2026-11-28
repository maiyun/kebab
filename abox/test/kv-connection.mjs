import assert from 'node:assert/strict';
import test from 'node:test';
import { get } from '../../lib/kv.js';
import { createMockRedis } from './fixtures/redis.mjs';

test('concurrent first use shares initialized Redis clients only across matching database and credentials', async () => {
    const server = await createMockRedis(args => {
        const cmd = args[0].toUpperCase();
        if (cmd === 'PING') return { simple: 'PONG' };
        if (cmd === 'INFO') return '# Server\r\nredis_version:7.2.0\r\n';
        return { simple: 'OK' };
    });
    const config = { host: '127.0.0.1', port: server.port, index: 0, pre: 'a:', user: 'test', pwd: 'example' };
    const first = get(config);
    const second = get({ ...config, pre: 'b:' });
    const otherDb = get(config, { index: 2 });
    const otherUser = get(config, { user: 'second' });
    const otherPassword = get(config, { pwd: 'rotated' });
    try {
        assert.deepEqual(
            await Promise.all([first, second, otherDb, otherUser, otherPassword].map(kv => kv.ping())),
            Array(5).fill('PONG')
        );
        assert.equal(await first.ping(), 'PONG');
        assert.equal(server.connections.length, 4);
        // Verify RESP2 AUTH + SELECT (no HELLO, no CLIENT SETINFO)
        for (const conn of server.connections) {
            const cmds = conn.history.map(a => a[0].toUpperCase());
            assert.equal(cmds.includes('HELLO'), false);
            assert.equal(cmds.includes('CLIENT'), false);
        }
        const db2Conn = server.connections.find(c => c.history.some(a => a[0] === 'SELECT' && a[1] === '2'));
        assert.ok(db2Conn, 'index 2 must send SELECT 2');
        assert.ok(db2Conn.history.some(a => a[0] === 'INFO' && a[1] === 'server'));
    }
    finally {
        await server.close(await Promise.all([first, otherDb, otherUser, otherPassword].map(k => k.getClient())));
    }
});

for (const failure of ['AUTH', 'SELECT']) {
    test(`shared ${failure} failure closes the client once and a new attempt can succeed`, async () => {
        let failing = true;
        const server = await createMockRedis(args => {
            const cmd = args[0].toUpperCase();
            if (failing && cmd === failure) return new Error(`ERR ${failure} failed`);
            if (cmd === 'PING') return { simple: 'PONG' };
            if (cmd === 'INFO') return '# Server\r\nredis_version:7.2.0\r\n';
            return { simple: 'OK' };
        });
        const kv = get({ host: '127.0.0.1', port: server.port, index: failure === 'SELECT' ? 1 : 0, pre: 'f:', user: '', pwd: 'secret' });
        try {
            assert.deepEqual(await Promise.all([kv.ping(), kv.ping()]), [false, false]);
            assert.equal(server.connections.length, 1);
            failing = false;
            assert.deepEqual(await Promise.all([kv.ping(), kv.ping()]), ['PONG', 'PONG']);
            assert.equal(server.connections.length, 2);
        }
        finally {
            await server.close([await kv.getClient()]);
        }
    });
}

test('Kvrocks multi-db safety check rejects index > 0 when redis-databases=0 and accepts when enabled or dbPre=true', async () => {
    let redisDatabases = '0';
    let configDisabled = false;
    let clientNamespace = '__namespace';
    const kvStore = new Map();
    const server = await createMockRedis(args => {
        const cmd = args[0].toUpperCase();
        if (cmd === 'INFO') return '# Server\r\nkvrocks_version:2.17.0\r\n';
        if (cmd === 'CONFIG' && args[1]?.toUpperCase() === 'GET' && args[2] === 'redis-databases') {
            if (configDisabled) return new Error('ERR unknown command CONFIG');
            return ['redis-databases', redisDatabases];
        }
        if (cmd === 'CLIENT' && args[1]?.toUpperCase() === 'INFO') {
            return `id=1 addr=127.0.0.1:1234 namespace=${clientNamespace}\n`;
        }
        if (cmd === 'PING') return { simple: 'PONG' };
        if (cmd === 'SET') {
            kvStore.set(args[1], args[2]);
            return { simple: 'OK' };
        }
        if (cmd === 'GET') return kvStore.get(args[1]) ?? null;
        return { simple: 'OK' };
    });
    const clientsToClose = [];
    try {
        // 1. Kvrocks default redis-databases=0 + index=1 => rejected!
        const kvBlocked = get({ host: '127.0.0.1', port: server.port, index: 1, pre: 'app:', user: '', pwd: '' });
        assert.equal(await kvBlocked.ping(), false);

        // 2. Kvrocks dbPre=true + index=1 => uses DB 0 + db1:app: prefix, succeeds!
        const kvPrefix = get({ host: '127.0.0.1', port: server.port, index: 1, pre: 'app:', user: '', pwd: '', dbPre: true });
        assert.equal(kvPrefix.getPre(), 'db1:app:');
        assert.equal(await kvPrefix.set('k', 'v1'), true);
        assert.equal(kvStore.get('db1:app:k'), 'v1');
        assert.equal(await kvPrefix.get('k'), 'v1');
        clientsToClose.push(await kvPrefix.getClient());

        // 3. Kvrocks redis-databases=16 + index=1 => accepted, index=16 => rejected!
        redisDatabases = '16';
        const kvOk = get({ host: '127.0.0.1', port: server.port, index: 1, pre: 'app:', user: '', pwd: '' });
        assert.equal(await kvOk.ping(), 'PONG');
        clientsToClose.push(await kvOk.getClient());

        const kvOutOfRange = get({ host: '127.0.0.1', port: server.port, index: 16, pre: 'app:', user: '', pwd: '' });
        assert.equal(await kvOutOfRange.ping(), false);

        // 4. CONFIG disabled fallback via CLIENT INFO namespace
        configDisabled = true;
        clientNamespace = '__namespace';
        const kvFallbackReject = get({ host: '127.0.0.1', port: server.port, index: 2, pre: 'app:', user: '', pwd: '' });
        assert.equal(await kvFallbackReject.ping(), false);

        clientNamespace = 'db2';
        const kvFallbackOk = get({ host: '127.0.0.1', port: server.port, index: 2, pre: 'app:', user: '', pwd: '' });
        assert.equal(await kvFallbackOk.ping(), 'PONG');
        clientsToClose.push(await kvFallbackOk.getClient());
    }
    finally {
        await server.close(clientsToClose);
    }
});

test('redis v6 command bridging: scan string cursor, pipeline, mGet/hMGet, floats, zAdd/zRangeWithScores, and isolated blocking', async () => {
    let blockingRelease;
    const blockingStarted = new Promise(resolve => { blockingRelease = resolve; });
    let brpopCalls = 0;
    const server = await createMockRedis(args => {
        const cmd = args[0].toUpperCase();
        if (cmd === 'PING') return { simple: 'PONG' };
        if (cmd === 'SET') return args.includes('NX') && args[1] === 'p:exists' ? null : { simple: 'OK' };
        if (cmd === 'MGET') return ['v1', null];
        if (cmd === 'HMGET') return ['hv1', null];
        if (cmd === 'INCRBYFLOAT') return '3.5';
        if (cmd === 'HINCRBYFLOAT') return '2.25';
        if (cmd === 'EXPIRE') return 1;
        if (cmd === 'HEXISTS') return 1;
        if (cmd === 'HSETNX') return 0;
        if (cmd === 'HSET') return 1;
        if (cmd === 'SCAN') {
            if (args[1] === '0') return ['k_next_cursor', ['p:k1', 'p:k2']];
            return ['0', ['p:k3']];
        }
        if (cmd === 'ZADD') {
            if (args.includes('INCR')) return '15.5';
            return 2;
        }
        if (cmd === 'ZRANGE') return ['m1', '10', 'm2', '20.5'];
        if (cmd === 'BRPOP') {
            ++brpopCalls;
            blockingRelease();
            return new Promise(resolve => {
                setTimeout(() => resolve(['p:q', 'job-1']), 40);
            });
        }
        return { simple: 'OK' };
    });
    const kv = get({ host: '127.0.0.1', port: server.port, index: 0, pre: 'p:', user: '', pwd: '' });
    try {
        assert.equal(await kv.set('a', '1', 60), true);
        assert.equal(await kv.add('exists', '1'), false);
        assert.deepEqual(await kv.mGet(['a', 'missing']), { a: '1' === '1' ? 'v1' : '', missing: null });
        assert.deepEqual(await kv.hMGet('h', ['f1', 'f2']), { f1: 'hv1', f2: null });
        assert.equal(await kv.incr('c', 1.5), 3.5);
        assert.equal(await kv.hIncr('h', 'c', 0.25), 2.25);
        assert.equal(await kv.expire('a', 30), true);
        assert.equal(await kv.hExists('h', 'f1'), true);
        assert.equal(await kv.hSet('h', 'f1', 'v', 'nx'), false);
        assert.equal(await kv.hSet('h', 'f1', 'v'), true);

        // Kvrocks native string cursor scan
        const page1 = await kv.scan('0', '*', 2);
        assert.deepEqual(page1, { cursor: 'k_next_cursor', items: ['k1', 'k2'] });
        const page2 = await kv.scan(page1.cursor, '*', 2);
        assert.deepEqual(page2, { cursor: '0', items: ['k3'] });

        // Native pipeline via multi().execAsPipeline()
        const pipe = await kv.pipeline();
        assert.ok(pipe);
        pipe.ping();
        pipe.set(kv.getPre() + 'x', '1');
        assert.deepEqual(await pipe.execAsPipeline(), ['PONG', 'OK']);

        // ZSet member <-> value mapping
        assert.equal(await kv.zAdd('z', [{ score: 1, member: 'a' }, { score: 2, member: 'b' }]), 2);
        assert.equal(await kv.zAdd('z', [{ score: 5.5, member: 'a' }], { INCR: true }), 15.5);
        assert.deepEqual(await kv.zRangeWithScores('z', 0, -1, { rev: true, offset: 0, count: 2 }), [
            { member: 'm1', score: 10 },
            { member: 'm2', score: 20.5 },
        ]);

        // Blocking bRPop runs on duplicate connection and does not block shared ping()
        const brpopPromise = kv.bRPop('q', 10);
        await blockingStarted;
        assert.equal(await kv.ping(), 'PONG');
        assert.deepEqual(await brpopPromise, { q: 'job-1' });
        assert.equal(brpopCalls, 1);
        assert.equal(server.connections.length, 2, 'blocking command must use an isolated duplicate connection');
    }
    finally {
        await server.close([await kv.getClient()]);
    }
});

test('kv.eval loads via EVAL on first run, uses EVALSHA thereafter, falls back on NOSCRIPT, and does not retry script errors', async () => {
    let flushed = false;
    const seen = [];
    const server = await createMockRedis(args => {
        const cmd = args[0].toUpperCase();
        if (cmd === 'EVAL') {
            seen.push([cmd, args[1]]);
            flushed = false;
            return [1, 1700000060];
        }
        if (cmd === 'EVALSHA') {
            seen.push([cmd, args[1]]);
            if (args[3] === 'p:err') return new Error('ERR invalid counter');
            if (flushed) return new Error('NOSCRIPT No matching script. Please use EVAL.');
            return [2, 1700000060];
        }
        return { simple: 'OK' };
    });
    const kv = get({ host: '127.0.0.1', port: server.port, index: 0, pre: 'p:', user: '', pwd: '' });
    try {
        const lua = 'return {1, 1700000060}';
        // 1. 首次调用直接走 EVAL 加载（1 次 RTT）
        assert.deepEqual(await kv.eval(lua, ['p:k'], ['1000']), [1, 1700000060]);
        // 2. 第二次命中本地缓存，直接走 EVALSHA
        assert.deepEqual(await kv.eval(lua, ['p:k'], ['1000']), [2, 1700000060]);
        // 3. 服务端清缓存/重启后返回 NOSCRIPT，自动回退 EVAL 重新加载
        flushed = true;
        assert.deepEqual(await kv.eval(lua, ['p:k'], ['1000']), [1, 1700000060]);
        // 4. 非 NOSCRIPT 错误直接返回 false，不回退 EVAL
        assert.equal(await kv.eval(lua, ['p:err'], ['1000']), false);
        assert.deepEqual(seen.map(item => item[0]), ['EVAL', 'EVALSHA', 'EVALSHA', 'EVAL', 'EVALSHA']);
        assert.match(seen[1][1], /^[0-9a-f]{40}$/);
    }
    finally {
        await server.close([await kv.getClient()]);
    }
});

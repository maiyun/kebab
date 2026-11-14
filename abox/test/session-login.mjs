import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash, randomBytes } from 'node:crypto';
import { Login } from '../../lib/session.js';
import { Ctr } from '../../sys/ctr.js';
import { Kv } from '../../lib/kv.js';

const token = () => randomBytes(32).toString('hex');
const uid = '0123456789abcdef0123456789abcdef';
const invalidKv = { getPre: () => 'mock:', pipeline: async () => false };

for (const [name, kv] of [
    ['connection unavailable', invalidKv],
    ['pipeline throws', { ...invalidKv, pipeline: async () => { throw new Error('offline'); } }],
    ['execution throws', { ...invalidKv, pipeline: async () => ({ eval() {}, exec: async () => { throw new Error('offline'); } }) }],
    ['Redis command error', { ...invalidKv, pipeline: async () => ({ eval() {}, exec: async () => [new Error('redis')] }) }],
]) {
    test(`storage error: ${name}`, async () => {
        const login = (token => new Login(kv, token, { name: 'TEST' }));
        assert.equal(await login('token').create({ subject: 'subject' }), false, 'create');
        assert.equal(await login('token').get(), false, 'get');
        assert.equal(await login('token').touch(uid), false, 'touch');
        assert.equal(await login('token').remove(uid), false, 'remove');
        assert.equal(await login('token').list(uid), false, 'list');
        assert.equal(await login('token').revoke(uid), false, 'revoke');
    });
}

test('invalid inputs return false without throwing', async () => {
    const login = (token => new Login(invalidKv, token, { name: 'TEST' }));
    assert.equal(await new Login(invalidKv, 'token').get(), false, 'explicit token requires name');
    const circular = {}; circular.self = circular;
    for (const [name, call] of [
        ['empty token', () => login('').create({ subject: 'subject' })],
        ['missing subject', () => login('token').create({})],
        ['empty subject', () => login('token').create({ subject: '' })],
        ['non-string subject', () => login('token').create({ subject: 1 })],
        ['non-string scope', () => login('token').create({ subject: 's', scope: 1 })],
        ['non-string version', () => login('token').create({ subject: 's', version: 1 })],
        ['array data', () => login('token').create({ subject: 's', data: [] })],
        ['circular data', () => login('token').create({ subject: 's', data: circular })],
        ['bigint data', () => login('token').create({ subject: 's', data: { x: 1n } })],
        ['invalid ttl', () => new Login(invalidKv, 'token', { name: 'TEST', ttl: -1 }).create({ subject: 's' })],
        ['fractional ttl', () => new Login(invalidKv, 'token', { name: 'TEST', ttl: 0.5 }).create({ subject: 's' })],
        ['oversized ttl', () => new Login(invalidKv, 'token', { name: 'TEST', ttl: 2147483648 }).create({ subject: 's' })],
    ]) assert.equal(await call(), false, name);
});

test('data toJSON must return a JSON object before storage is accessed', async () => {
    let calls = 0;
    const kv = { getPre: () => 'mock:', pipeline: async () => { ++calls; return false; } };
    const login = (token => new Login(kv, token, { name: 'TEST' }));
    for (const [name, value] of [['array', []], ['string', 'text'], ['null', null]]) {
        assert.equal(await login('token').create({ subject: 'subject', data: { toJSON: () => value } }), false,
            `top-level toJSON ${name} rejected`);
    }
    assert.equal(calls, 0, 'invalid serialized data must not reach Redis');
});

test('script receives hashed token and default namespace and ttl', async () => {
    const calls = [];
    const kv = { getPre: () => 'project:', pipeline: async () => ({
        eval(script, keys, args) { calls.push({ keys, args }); },
        exec: async () => [new Error('mock')],
    }) };
    const login = (token => new Login(kv, token, { name: 'TEST' }));
    const secret = token();
    await login(secret).create({ subject: 'alice' });
    await login(secret).get();
    await login(secret).touch(uid);
    await login(secret).remove(uid);
    await login(secret).list(uid);
    await login(secret).revoke(uid);
    assert.equal(calls.length, 6);
    const digest = createHash('sha256').update(secret).digest('hex');
    for (const { keys, args } of calls) {
        assert.deepEqual(keys, ['project:TEST:login:']);
        assert.equal(args[1], digest);
        assert.ok(!JSON.stringify({ keys, args }).includes(secret), `${args[0]} must not receive raw token`);
    }
    assert.equal(calls[0].args[5], '172800', 'default create ttl');
    assert.equal(calls[2].args.at(-1), '172800', 'default touch ttl');
});


test('controller binding captures initialized Session token and rejects missing Session', async () => {
    const keysSeen = [];
    const calls = [];
    const kv = { getPre: () => 'binding:', pipeline: async () => ({
        eval(script, keys, args) { calls.push(args); keysSeen.push(keys); },
        exec: async () => [null],
    }) };
    const ctr = Object.create(Ctr.prototype);
    ctr.setPrototype('_sess', null);
    const missing = new Login(kv, ctr);
    assert.equal(await missing.get(), false);
    assert.equal(await missing.create({ subject: 'alice' }), false);
    assert.equal(calls.length, 0, 'uninitialized Session must not access Redis');
    let currentToken = 'first-server-token';
    ctr.setPrototype('_sess', { getToken: () => currentToken, getName: () => 'TEST' });
    const bound = new Login(kv, ctr, { name: 'IGNORED' });
    const explicit = new Login(kv, currentToken, { name: 'TEST' });
    currentToken = 'replacement-server-token';
    await bound.get();
    await explicit.get();
    assert.deepEqual(keysSeen, [['binding:TEST:login:'], ['binding:TEST:login:']]);
    assert.deepEqual(calls[0], calls[1], 'controller and explicit token bind the same credential');
    assert.equal(calls[0][1], createHash('sha256').update('first-server-token').digest('hex'));
    assert.equal(await missing.get(), false, 'initially invalid manager cannot acquire a later Session');
    const methods = [() => bound.touch(uid), () => bound.remove(uid), () => bound.list(uid), () => bound.revoke(uid)];
    for (const call of methods) assert.equal(await call(), null);
    for (const args of calls) assert.equal(args[1], calls[0][1], 'all methods retain bound credential');
});

const host = process.env.KEBAB_LOGIN_REDIS_HOST;
test('isolated Redis login lifecycle', { skip: !host && 'set KEBAB_LOGIN_REDIS_HOST to run integration tests' }, async () => {
    const pre = `${process.env.KEBAB_LOGIN_REDIS_PRE ?? ''}kebab-login-test:${randomBytes(12).toString('hex')}:`;
    const kv = new Kv({ host, port: Number(process.env.KEBAB_LOGIN_REDIS_PORT ?? 6379), index: Number(process.env.KEBAB_LOGIN_REDIS_INDEX ?? 0), user: process.env.KEBAB_LOGIN_REDIS_USER ?? '', pwd: process.env.KEBAB_LOGIN_REDIS_PASSWORD ?? '', pre });
    const login = (token => new Login(kv, token, { name: 'TEST', ttl: 60 }));
    const a = token(), b = token(), c = token(), other = token();
    try {
        assert.equal(await kv.ping(), 'PONG', 'Redis connection');
        const now = Math.floor(Date.now() / 1000);
        const data = { empty: [], nested: { array: [null, [], { x: true }], nil: null } };
        const first = await login(a).create({ subject: 'alice', scope: 'tenant', version: 'v1', data });
        assert.ok(first && typeof first === 'object', 'create first login');
        assert.match(first.uid, /^[0-9a-f]{32}$/);
        assert.equal(first.subject, 'alice');
        assert.equal(first.scope, 'tenant');
        assert.equal(first.version, 'v1');
        assert.ok(Number.isInteger(first.timeAdd) && Math.abs(first.timeAdd - now) < 30, 'Redis time in seconds');
        assert.deepEqual(first.data, data, 'create preserves nested JSON and empty arrays');
        const otherName = new Login(kv, a, { name: 'OTHER', ttl: 60 });
        assert.equal(await otherName.get(), null, 'same token in other Session name is isolated');
        const otherAuth = await otherName.create({ subject: 'alice', scope: 'tenant' }, { single: true });
        assert.ok(otherAuth && otherAuth.uid);
        assert.deepEqual(await login(a).get(), first, 'single login in other Session name cannot revoke original');
        assert.equal(await otherName.remove(otherAuth.uid), true);
        assert.deepEqual(await login(a).get(), first, 'get preserves complete record');
        const second = await login(b).create({ subject: 'alice', scope: 'tenant', version: 'v1' });
        const older = await login(c).create({ subject: 'alice', scope: 'tenant', version: 'old' });
        const outsider = await login(other).create({ subject: 'alice', scope: 'other', version: 'v1' });
        for (const [name, record] of [['second', second], ['older', older], ['outsider', outsider]]) assert.ok(record && record.uid, name);
        assert.deepEqual(second.data, {}, 'default data');
        const listed = await login(a).list(first.uid);
        assert.ok(Array.isArray(listed), 'list');
        assert.deepEqual(new Set(listed.map(x => x.uid)), new Set([first.uid, second.uid]), 'list filters scope and version');
        assert.equal(listed.find(x => x.uid === first.uid).current, true);
        assert.equal(listed.find(x => x.uid === second.uid).current, false);
        assert.equal(await login(a).touch(second.uid), null, 'wrong uid cannot touch');
        assert.equal(await login(a).remove(second.uid), null, 'wrong uid cannot remove');
        assert.equal(await login(a).list(second.uid), null, 'wrong uid cannot list');
        assert.equal(await login(a).revoke(second.uid), null, 'wrong uid cannot revoke');
        assert.equal(await login(a).revoke(first.uid, outsider.uid), null, 'cannot revoke another scope');
        const short = (token => new Login(kv, token, { name: 'TEST', ttl: 1 }));
        const expiringToken = token();
        const expiring = await short(expiringToken).create({ subject: 'alice', scope: 'tenant', version: 'v1' });
        assert.ok(expiring && expiring.uid, 'create expiring login');
        await new Promise(resolve => setTimeout(resolve, 1300));
        assert.equal(await login(expiringToken).get(), null, 'expired login is absent');
        const afterExpiry = await login(a).list(first.uid);
        assert.ok(Array.isArray(afterExpiry) && !afterExpiry.some(x => x.uid === expiring.uid), 'expired login omitted from list');
        assert.equal(await login(a).touch(first.uid), true);
        assert.equal(await login(a).revoke(first.uid), true, 'revoke other sessions');
        assert.equal(await login(b).get(), null, 'same-version session revoked');
        assert.equal(await login(c).get(), null, 'old-version session revoked');
        assert.deepEqual(await login(other).get(), outsider, 'other scope remains');
        const replacement = await login(a).create({ subject: 'bob' });
        assert.ok(replacement && replacement.uid !== first.uid, 'same token replaced');
        assert.equal(replacement.scope, ''); assert.equal(replacement.version, '');
        assert.equal(await login(a).touch(first.uid), null, 'stale request cannot touch replacement');
        assert.equal(await login(a).remove(first.uid), null, 'stale request cannot remove replacement');
        assert.equal(await login(a).revoke(first.uid), null, 'stale request cannot revoke replacement');
        assert.deepEqual(await login(a).get(), replacement);
        const keys = await kv.keys('*');
        assert.ok(Array.isArray(keys) && keys.length > 0, 'test namespace has keys');
        for (const key of keys) {
            for (const secret of [a, b, c, other]) assert.ok(!key.includes(secret), 'key must not expose token');
            const value = await kv.get(key);
            if (typeof value === 'string') for (const secret of [a, b, c, other]) assert.ok(!value.includes(secret), 'value must not expose token');
        }
        // Concurrent requests must preserve the final binding and its identity index.
        const raceToken = token();
        const races = await Promise.all(Array.from({ length: 8 }, (_, i) =>
            login(raceToken).create({ subject: `race-${i}` })));
        assert.ok(races.every(x => x && x.uid), 'concurrent creates succeed');
        const winner = await login(raceToken).get();
        assert.ok(winner && races.some(x => x.uid === winner.uid), 'one concurrent create remains');
        for (const stale of races.filter(x => x.uid !== winner.uid)) {
            assert.equal(await login(raceToken).touch(stale.uid), null, 'stale concurrent uid cannot touch');
            assert.equal(await login(raceToken).remove(stale.uid), null, 'stale concurrent uid cannot remove');
        }
        assert.deepEqual(await login(raceToken).get(), winner, 'winner survives stale operations');
        assert.equal((await login(raceToken).list(winner.uid)).length, 1, 'winner indexed once');
        const manyTokens = Array.from({ length: 8 }, token);
        const many = await Promise.all(manyTokens.map(t => login(t).create({ subject: 'parallel' })));
        assert.ok(many.every(x => x && x.uid), 'parallel distinct tokens created');
        assert.deepEqual(new Set((await login(manyTokens[0]).list(many[0].uid)).map(x => x.uid)),
            new Set(many.map(x => x.uid)), 'parallel same-subject tokens indexed');

        const otherKv = new Kv({ host, port: Number(process.env.KEBAB_LOGIN_REDIS_PORT ?? 6379), index: Number(process.env.KEBAB_LOGIN_REDIS_INDEX ?? 0), user: process.env.KEBAB_LOGIN_REDIS_USER ?? '', pwd: process.env.KEBAB_LOGIN_REDIS_PASSWORD ?? '', pre: `${pre}other-project:` });
        const otherProject = (token => new Login(otherKv, token, { name: 'TEST', ttl: 60 }));
        assert.equal(await otherProject(raceToken).get(), null, 'Kv project prefix isolated');
        const projectRecord = await otherProject(raceToken).create({ subject: winner.subject });
        assert.ok(projectRecord && projectRecord.uid, 'other project create');
        assert.deepEqual(await login(raceToken).get(), winner, 'other project cannot replace default');
        const alternate = (token => new Login(kv, token, { name: 'TEST', pre: 'alternate:', ttl: 60 }));
        assert.equal(await alternate(raceToken).get(), null, 'custom namespace cannot see default');
        const alt = await alternate(raceToken).create({ subject: winner.subject });
        assert.ok(alt && alt.uid, 'custom namespace create');
        assert.deepEqual(await login(raceToken).get(), winner, 'custom namespace cannot replace default');
        assert.equal((await alternate(raceToken).list(alt.uid)).length, 1, 'custom namespace index isolated');
        assert.equal(await alternate(raceToken).revoke(alt.uid, alt.uid), true);
        assert.deepEqual(await login(raceToken).get(), winner, 'custom namespace revoke isolated');

        // Verify lifetime from Redis PTTL; reads must not refresh it, touch must.
        const ttlLogin = (token => new Login(kv, token, { name: 'TEST', pre: 'ttl:', ttl: 3 }));
        const ttlToken = token();
        const ttlRecord = await ttlLogin(ttlToken).create({ subject: 'lifetime' });
        assert.ok(ttlRecord && ttlRecord.uid, 'create finite login');
        const binding = `TEST:ttl:record:${createHash('sha256').update(ttlToken).digest('hex')}`;
        const before = await kv.pttl(binding);
        assert.ok(before > 0, 'finite binding has expiration');
        await new Promise(resolve => setTimeout(resolve, 1100));
        assert.deepEqual(await ttlLogin(ttlToken).get(), ttlRecord, 'read finite login');
        const afterGet = await kv.pttl(binding);
        assert.ok(afterGet > 0 && afterGet < before - 700, 'get does not extend ttl');
        assert.equal(await ttlLogin(ttlToken).touch(ttlRecord.uid), true);
        const afterTouch = await kv.pttl(binding);
        assert.ok(afterTouch > afterGet + 700, 'touch extends ttl');

        // Both insertion orders must retain the index for a permanent member.
        for (const permanentFirst of [true, false]) {
            const ns = `mixed:${permanentFirst}:`;
            const permanent = (token => new Login(kv, token, { name: 'TEST', pre: ns, ttl: 0 }));
            const finite = (token => new Login(kv, token, { name: 'TEST', pre: ns, ttl: 1 }));
            const permToken = token(), finiteToken = token();
            let permRecord, finiteRecord;
            if (permanentFirst) {
                permRecord = await permanent(permToken).create({ subject: 'mixed' });
                finiteRecord = await finite(finiteToken).create({ subject: 'mixed' });
            }
            else {
                finiteRecord = await finite(finiteToken).create({ subject: 'mixed' });
                permRecord = await permanent(permToken).create({ subject: 'mixed' });
            }
            assert.ok(permRecord && finiteRecord, 'create mixed lifetime logins');
            await new Promise(resolve => setTimeout(resolve, 1300));
            assert.equal(await permanent(finiteToken).get(), null, 'finite login expires');
            assert.deepEqual(await permanent(permToken).get(), permRecord, 'permanent login survives');
            assert.deepEqual((await permanent(permToken).list(permRecord.uid)).map(x => x.uid),
                [permRecord.uid], 'permanent member remains indexed');
        }
        // A lost permanent member must not leave an immortal index after lazy cleanup.
        for (const [operation, missing] of [['list', 'record'], ['revoke', 'record']]) {
            const ns = `eviction:${operation}:`;
            const finite = (token => new Login(kv, token, { name: 'TEST', pre: ns, ttl: 60 }));
            const permanent = (token => new Login(kv, token, { name: 'TEST', pre: ns, ttl: 0 }));
            const currentToken = token(), lostToken = token();
            const identity = { scope: 'eviction-scope', subject: `eviction-${operation}` };
            const current = await finite(currentToken).create(identity);
            const lost = await permanent(lostToken).create(identity);
            assert.ok(current && current.uid && lost && lost.uid, `${operation}: create records`);
            const lostKey = `TEST:${ns}record:${createHash('sha256').update(lostToken).digest('hex')}`;
            assert.equal(await kv.del(lostKey), true, `${operation}: simulate ${missing} eviction`);
            const indexHash = createHash('sha256').update(JSON.stringify([identity.scope, identity.subject])).digest('hex');
            const indexKey = `TEST:${ns}index:${indexHash}`;
            assert.equal(await kv.ttl(indexKey), -1, `${operation}: index initially persistent`);
            if (operation === 'list') {
                const result = await finite(currentToken).list(current.uid);
                assert.ok(Array.isArray(result), 'list after eviction');
                assert.deepEqual(result.map(row => row.uid), [current.uid], 'list removes invalid permanent member');
            }
            else {
                assert.equal(await finite(currentToken).revoke(current.uid), true, 'revoke after eviction');
            }
            const remainingTtl = await kv.ttl(indexKey);
            assert.ok(remainingTtl > 0 && remainingTtl <= 61,
                `${operation}: finite remaining member must give index a finite TTL, got ${remainingTtl}`);
        }
        assert.equal(await login(a).revoke(replacement.uid, replacement.uid), true, 'explicit revoke self');
        assert.equal(await login(a).get(), null);
        // Atomic single-login creation covers repeat login, scope/version isolation and races.
        const single = t => new Login(kv, t, { name: 'TEST', pre: 'single:', ttl: 60 });
        const sa = token(), sb = token(), sc = token(), sd = token();
        const identity = { subject: 'single-user', scope: 'shop', version: '1' };
        const [oldA, oldB, separate] = await Promise.all([
            single(sa).create(identity),
            single(sb).create({ ...identity, version: 'old' }),
            single(sc).create({ ...identity, scope: 'other' }),
        ]);
        assert.ok(oldA && oldB && separate);
        const layout = await kv.keys('TEST:single:*');
        assert.equal(layout.length, 5, 'three clients across two scopes use three records and two indexes');
        assert.equal(layout.filter(k => k.includes(':record:')).length, 3);
        assert.equal(layout.filter(k => k.includes(':index:')).length, 2);
        assert.ok(layout.every(k => !k.includes(':binding:')), 'no binding keys');

        const repeated = await single(sa).create(identity, { single: true });
        assert.ok(repeated && repeated.uid !== oldA.uid, 'same account and token get a fresh login UID');
        assert.equal(await single(sb).get(), null, 'single login clears old versions');
        assert.deepEqual(await single(sc).get(), separate, 'other scope survives');
        assert.equal(await single(sa).remove(oldA.uid), null, 'old logout cannot remove repeated login');
        const switched = await single(sa).create({ subject: 'different-user' }, { single: true });
        assert.ok(switched && switched.subject === 'different-user', 'same token can switch accounts');
        const racesSingle = await Promise.all([sb, sd].map(t => single(t).create(identity, { single: true })));
        assert.ok(racesSingle.every(r => r && r.uid));
        const activeSingle = await Promise.all([sb, sd].map(t => single(t).get()));
        assert.equal(activeSingle.filter(Boolean).length, 1, 'concurrent single login has exactly one survivor');
        const winnerIndex = activeSingle.findIndex(Boolean);
        const winnerSingle = activeSingle[winnerIndex];
        const winnerToken = [sb, sd][winnerIndex];
        assert.equal((await single(winnerToken).list(winnerSingle.uid)).length, 1, 'only winner indexed');
        assert.deepEqual(await single(sa).get(), switched, 'other account survives');
        assert.equal(await single(sa).create(identity, { single: 'yes' }), false, 'invalid option cannot mutate login');
        assert.deepEqual(await single(sa).get(), switched);
        // A stale index member must not expose or remove the token's new account.
        const oldIndex = 'TEST:single:index:' + createHash('sha256').update(JSON.stringify(['shop', 'single-user'])).digest('hex');
        const pipe = await kv.pipeline();
        pipe.eval("return redis.call('ZADD', KEYS[1], ARGV[1], ARGV[2])",
            [kv.getPre() + oldIndex], [String(Math.floor(Date.now() / 1000) + 60), createHash('sha256').update(sa).digest('hex')]);
        await pipe.exec();
        await single(winnerToken).revoke(winnerSingle.uid);
        assert.deepEqual(await single(sa).get(), switched, 'stale index cannot revoke token after account switch');


        assert.equal(await login(other).remove(outsider.uid), true);
        assert.equal(await login(other).remove(outsider.uid), null);
    }
    finally {
        const keys = await kv.keys('*');
        if (Array.isArray(keys) && keys.length) assert.equal(await kv.del(keys), true, 'remove only isolated test keys');
    }
});

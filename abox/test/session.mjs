import assert from 'node:assert/strict';
import { Ctr } from '../../sys/ctr.js';
import { Session } from '../../lib/session.js';
import { Kv } from '../../lib/kv.js';

const basic = value => `Basic ${Buffer.from(`token:${value}`).toString('base64')}`;
let checks = 0;

function fixture({ headers = {}, get = {}, post = {}, cookie = { sid: 'cookie-id' } } = {}) {
    const config = { session: { name: 'sid', ttl: 600 }, set: { cacheTtl: 0 } };
    const responseHeaders = new Map();
    const ctr = new Ctr(config, { headers }, {
        getHeader: name => responseHeaders.get(name),
        setHeader: (name, value) => responseHeaders.set(name, value),
    });
    for (const [key, value] of Object.entries({ _headers: headers, _get: get, _post: post, _cookie: cookie })) {
        ctr.setPrototype(key, value);
    }
    const records = new Map(['cookie-id', 'header-id', 'explicit-id'].map(id => [`sid_${id}`, { identity: id }]));
    const reads = [];
    const writes = [];
    const kv = Object.create(Kv.prototype);
    kv.getJson = async key => {
        reads.push(key);
        return structuredClone(records.get(key) ?? null);
    };
    kv.set = async (key, value, ttl, mode) => {
        writes.push({ key, value: structuredClone(value), ttl, mode });
        if (mode === 'nx' && records.has(key)) return false;
        records.set(key, structuredClone(value));
        return true;
    };
    return { ctr, kv, records, reads, writes, responseHeaders };
}

async function check(name, request, auth, options, expectedId) {
    const f = fixture(request);
    assert.equal(await f.ctr._startSession(f.kv, auth, options), true, name);
    const session = f.ctr.getPrototype('_sess');
    if (expectedId) {
        assert.equal(session.getToken(), expectedId, name);
        assert.deepEqual(f.ctr.getPrototype('_session'), { identity: expectedId }, name);
    }
    else {
        assert.match(session.getToken(), /^[A-Za-z0-9]{32}$/, name);
        assert.deepEqual(f.ctr.getPrototype('_session'), {}, name);
        assert.ok(!f.reads.includes('sid_cookie-id'), `${name}: must not read cookie session`);
    }
    const cookies = f.responseHeaders.get('set-cookie');
    if (options.cookie === false) {
        assert.equal(cookies, undefined, name);
    }
    else {
        assert.equal(cookies.length, 1, name);
        assert.ok(cookies[0].startsWith(`sid=${session.getToken()};`), name);
        assert.match(cookies[0], /HttpOnly; SameSite=Lax/, name);
    }
    f.ctr.getPrototype('_session').saved = true;
    await session.update();
    assert.equal(f.records.get(`sid_${session.getToken()}`).saved, true, name);
    assert.equal(f.writes.at(-1).ttl, 600, name);
    ++checks;
    return f;
}

try {
    await check('default cookie mode', {}, false, {}, 'cookie-id');
    await check('auth disabled ignores header options', { headers: { 'x-session': 'header-id' } }, false,
        { header: 'x-session' }, 'cookie-id');
    await check('legacy absent credentials use cookie', {}, true, {}, 'cookie-id');
    for (const value of ['Bearer header-id', basic('header-id')]) {
        await check('legacy Authorization', { headers: { authorization: value } }, true, {}, 'header-id');
        await check('legacy GET _auth', { get: { _auth: value } }, true, {}, 'header-id');
        await check('legacy POST _auth', { post: { _auth: value } }, true, {}, 'header-id');
    }
    for (const value of ['', 'abc', 'Bearer ', basic(''), 'Bearer missing-id',
        `Basic ${Buffer.from('other:header-id').toString('base64')}`,
        `Unknown ${Buffer.from('token:header-id').toString('base64')}`]) {
        await check('invalid legacy header cannot use cookie or POST', {
            headers: { authorization: value }, post: { _auth: basic('header-id') },
        }, true, {}, null);
        await check('invalid legacy GET cannot use cookie or POST', {
            get: { _auth: value }, post: { _auth: basic('header-id') },
        }, true, {}, null);
        await check('invalid legacy POST cannot use cookie', { post: { _auth: value } }, true, {}, null);
    }
    const conflicting = { authorization: 'Bearer explicit-id', 'x-session': 'header-id' };
    await check('dedicated header ignores API token and _auth', {
        headers: conflicting, get: { _auth: basic('cookie-id') },
    }, true, { header: 'X-Session', cookie: false }, 'header-id');
    await check('dedicated header can synchronize cookie', { headers: conflicting }, true,
        { header: 'x-session' }, 'header-id');
    await check('dedicated header absent can fall back to cookie', {
        headers: { authorization: 'Bearer explicit-id' },
    }, true, { header: 'x-session' }, 'cookie-id');
    for (const value of [undefined, '', '   ', 'missing-id', ['header-id', 'cookie-id']]) {
        await check('header-only invalid or missing credential remains anonymous', {
            headers: { 'x-session': value, authorization: 'Bearer explicit-id' },
            post: { _auth: basic('header-id') },
        }, true, { header: 'x-session', cookie: false }, null);
        if (value !== undefined) {
            await check('invalid dedicated header cannot fall back to cookie', {
                headers: { 'x-session': value },
            }, true, { header: 'x-session' }, null);
        }
    }
    await check('cookie disabled in default mode', {}, false, { cookie: false }, null);
    await check('cookie disabled in legacy mode', {}, true, { cookie: false }, null);
    await check('explicit token overrides headers and cookie', { headers: conflicting }, true,
        { token: 'explicit-id', header: 'x-session', cookie: false }, 'explicit-id');
    await check('explicit empty token creates anonymous session', { headers: conflicting }, true,
        { token: '' }, null);

    const repeated = fixture();
    const session = new Session();
    assert.equal(await session.init(repeated.ctr, repeated.kv), true);
    assert.equal(repeated.ctr.getPrototype('_session').identity, 'cookie-id');
    assert.equal(await session.init(repeated.ctr, repeated.kv, true, { header: 'x-session', cookie: false }), true);
    assert.deepEqual(repeated.ctr.getPrototype('_session'), {});
    assert.notEqual(session.getToken(), 'cookie-id');
    ++checks;

    for (const failure of ['read', 'insert']) {
        const f = fixture();
        if (failure === 'read') f.kv.getJson = async () => false;
        else f.kv.set = async () => false;
        assert.equal(await new Session().init(f.ctr, f.kv, false,
            failure === 'insert' ? { token: '', cookie: false } : {}), false);
        assert.equal(f.responseHeaders.get('set-cookie'), undefined);
        ++checks;
    }
    console.log(`Session: ${checks} regression cases passed.`);
    process.exit(0);
}
catch (error) {
    console.error(error);
    process.exit(1);
}

import assert from 'node:assert/strict';
import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { argon2 } from 'node:crypto';
import { promisify } from 'node:util';
import { passwordHash, passwordVerify } from '../../lib/crypto.js';

const fixture = '$argon2id$v=19$m=65536,t=3,p=1$c29tZXNhbHQxMjM0NTY3OA$VGt0xwURFGFBIiQgQWSqTQNzmCXz0LkKkGG7zDrwT/k';
const derive = promisify(argon2);

test('default hashes use random salts and verify existing TMS PHC strings', async () => {
    assert.equal(await passwordVerify('password', fixture), true);
    assert.equal(await passwordVerify('wrong', fixture), false);
    const first = await passwordHash('Example-123');
    const second = await passwordHash('Example-123');
    assert.match(first, /^\$argon2id\$v=19\$m=65536,t=3,p=1\$[A-Za-z0-9+/]{22}\$[A-Za-z0-9+/]{43}$/);
    assert.notEqual(first, second);
    assert.equal(await passwordVerify('Example-123', first), true);
    assert.equal(await passwordVerify('wrong', first), false);
});

test('custom costs are embedded and independently reproduce the native Argon2 result', async () => {
    const options = Object.freeze({ memory: 8192, passes: 2, parallelism: 2 });
    const encoded = await passwordHash('密码\0 😀 ', options);
    assert.match(encoded, /\$m=8192,t=2,p=2\$/);
    const parts = encoded.split('$');
    const native = await derive('argon2id', {
        message: '密码\0 😀 ', nonce: Buffer.from(parts[4], 'base64'),
        tagLength: 32, ...options,
    });
    assert.deepEqual(Buffer.from(parts[5], 'base64'), native);
    assert.equal(await passwordVerify('密码\0 😀 ', encoded), true);
    assert.equal(await passwordVerify('密码', encoded), false);
    assert.equal(await passwordVerify('密码\0 😀', encoded), false);
    const partial = await passwordHash('x', { memory: 8192 });
    assert.match(partial, /\$m=8192,t=3,p=1\$/);
    const empty = await passwordHash('', { memory: 8, passes: 1 });
    assert.equal(await passwordVerify('', empty), true);
});

test('supported external salt and tag lengths can be verified', async () => {
    for (const length of [16, 64]) {
        const salt = Buffer.alloc(length === 16 ? 8 : 64, 7);
        const tag = await derive('argon2id', {
            message: 'external', nonce: salt, tagLength: length,
            memory: 64, passes: 1, parallelism: 8,
        });
        const encoded = `$argon2id$v=19$m=64,t=1,p=8$${salt.toString('base64').replace(/=+$/, '')}$${tag.toString('base64').replace(/=+$/, '')}`;
        assert.equal(await passwordVerify('external', encoded), true);
    }
});

test('invalid options return false before expensive work', async () => {
    for (const options of [
        { memory: 0 }, { memory: 7 }, { memory: 262145 }, { memory: 1.5 },
        { memory: NaN }, { memory: Infinity }, { memory: '65536' },
        { passes: 0 }, { passes: 11 }, { passes: 1.5 },
        { parallelism: 0 }, { parallelism: 9 }, { parallelism: 1.5 },
        { memory: 63, parallelism: 8 },
    ]) {
        assert.equal(await passwordHash('password', options), false);
    }
});

test('malformed, unsupported and excessive PHC inputs fail closed', async () => {
    for (const encoded of [
        '', null, 1, 'x'.repeat(257), fixture + '\n', fixture + '\r\n', fixture + '=',
        fixture.replace('argon2id', 'argon2i'), fixture.replace('v=19', 'v=16'),
        fixture.replace('m=65536', 'm=262145'), fixture.replace('m=65536', 'm=065536'),
        fixture.replace('m=65536', 'm=7'), fixture.replace('t=3', 't=11'),
        fixture.replace('p=1', 'p=9'), fixture.replace('t=3', 't=0'),
        fixture.replace('c29tZXNhbHQxMjM0NTY3OA', 'c29tZXNhbHQxMjM0NTY3OB'),
        fixture.replace('c29tZXNhbHQxMjM0NTY3OA', 'YQ'),
        fixture.replace(/\$[^$]+$/, '$YQ'),
        fixture.replace('c29tZXNhbHQxMjM0NTY3OA', Buffer.alloc(65).toString('base64').replace(/=+$/, '')),
    ]) {
        assert.equal(await passwordVerify('password', encoded), false);
    }
});

test('unsupported runtimes and computation faults return explicit failure values', () => {
    for (const mode of ['missing', 'failure', 'sync', 'random']) {
        execFileSync(process.execPath, ['--input-type=module', '-e', `
            import assert from 'node:assert/strict';
            import crypto from 'node:crypto';
            import { syncBuiltinESMExports } from 'node:module';
            ${mode === 'random' ? "crypto.randomBytes = () => { throw new Error('random failed'); };" :
                `crypto.argon2 = ${mode === 'missing' ? 'undefined' : mode === 'sync' ?
                    "() => { throw new Error('derive failed'); }" :
                    "(_algorithm, _options, callback) => callback(new Error('derive failed'))"};`}

            syncBuiltinESMExports();
            const lib = await import(${JSON.stringify(new URL('../../lib/crypto.js', import.meta.url).href)});
            assert.equal(lib.base64Encode('ok'), 'b2s=');
            assert.equal(await lib.passwordHash('password'), false);
            assert.equal(await lib.passwordVerify('password', ${JSON.stringify(fixture)}), ${mode === 'random' ? 'true' : 'null'});
            assert.equal(await lib.passwordVerify('password', 'invalid'), false);
        `], { stdio: 'pipe' });
    }
});

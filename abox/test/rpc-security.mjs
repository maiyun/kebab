import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import test from 'node:test';

const moduleUrl = new URL('../rpc.js', import.meta.url).href;
const rpc = await import(moduleUrl);
const secret = 'c63f09ad6ddbbd239ba311bd390fec57';
function request(token, method = 'GET', body = '') {
    const req = Readable.from(body ? [Buffer.from(body)] : []);
    req.url = '/' + token;
    req.method = method;
    req.socket = { remoteAddress: 'test-' + Math.random() };
    return req;
}

test('secrets, encrypted metadata, methods and replay are checked', () => {
    for (const value of ['', ' ', 'MUSTCHANGE', 'a'.repeat(32), 'abcd'.repeat(8), 'short']) assert.equal(rpc.validSecret(value), false);
    assert.equal(rpc.validSecret(secret), true);
    const token = rpc.sign({ action: 'reload', parameter: 'private' }, secret);
    assert.equal(token.includes('private'), false);
    assert.equal(rpc.authenticate(request(token, 'POST'), secret), false);
    const msg = rpc.authenticate(request(token), secret);
    assert.equal(msg.action, 'reload');
    assert.equal(msg.parameter, 'private');
    assert.equal(rpc.authenticate(request(token), secret), false);
    assert.equal(rpc.authenticate(request((token[0] === 'A' ? 'B' : 'A') + token.slice(1)), secret), false);
    assert.equal(rpc.authenticate(request(token), 'wrong-secret-1234567890123456789012'), false);
    assert.equal(rpc.authenticate(request(Buffer.from(JSON.stringify({ action: 'reload' })).toString('base64url')), secret), false);
});

test('body digest and upload limits reject changes and remove temporary files', async t => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-rpc-test-'));
    t.after(() => fs.rm(directory, { recursive: true, force: true }));
    const digest = rpc.hash('valid');
    const token = rpc.sign({ action: 'code', path: '/app' }, secret, 'POST', digest);
    const req = request(token, 'POST', 'valid');
    const msg = rpc.authenticate(req, secret);
    const result = await rpc.readBody(req, msg.bodyHash, directory, true, 10);
    assert.equal(await fs.readFile(result.file, 'utf8'), 'valid');
    await fs.unlink(result.file);
    assert.equal(await rpc.readBody(request('', 'POST', 'altered'), digest, directory, true, 20), false);
    assert.equal(await rpc.readBody(request('', 'POST', 'valid'), digest, directory, true, 3), false);
    const broken = Readable.from((async function* () { yield Buffer.from('valid'); throw new Error('aborted'); })());
    assert.equal(await rpc.readBody(broken, digest, directory, true, 20), false);
    assert.deepEqual(await fs.readdir(directory), []);
    assert.equal(await rpc.readBody(request('', 'GET', 'x'), rpc.hash(''), directory, false, 0), false);
});


test('five second boundary and unexpired nonce saturation fail closed', async () => {
    const rpc = await import(moduleUrl + '#saturation');
    const original = Date.now;
    let now = 1_000_000;
    Date.now = () => now;
    try {
        const boundary = rpc.sign({ action: 'reload' }, secret);
        now += 5000;
        assert.ok(rpc.authenticate(request(boundary), secret));
        assert.equal(rpc.authenticate(request(boundary), secret), false);
        const expired = rpc.sign({ action: 'reload' }, secret);
        now += 5001;
        assert.equal(rpc.authenticate(request(expired), secret), false);
        const first = rpc.sign({ action: 'reload' }, secret);
        assert.ok(rpc.authenticate(request(first), secret));
        for (let i = 1; i < 10000; ++i) {
            assert.ok(rpc.authenticate(request(rpc.sign({ action: 'reload' }, secret)), secret));
        }
        const next = rpc.sign({ action: 'reload' }, secret);
        assert.equal(rpc.authenticate(request(next), secret), false);
        assert.equal(rpc.authenticate(request(first), secret), false);
        now += 5001;
        assert.ok(rpc.authenticate(request(rpc.sign({ action: 'reload' }, secret)), secret));
    }
    finally { Date.now = original; }
});

test('successful requests do not consume the failed-attempt budget', async () => {
    const rpc = await import(moduleUrl + '#rate');
    const original = Date.now;
    let now = 2_000_000;
    Date.now = () => now;
    try {
        function fromIp(token) {
            const req = request(token);
            req.socket.remoteAddress = 'one-client';
            return req;
        }
        for (let i = 0; i < 200; i++) assert.ok(rpc.authenticate(fromIp(rpc.sign({ action: 'reload' }, secret)), secret));
        for (let i = 0; i < 120; i++) {
            const bad = fromIp('invalid');
            assert.equal(rpc.authenticate(bad, secret), false);
            assert.equal(rpc.reject(bad), i === 0);
        }
        assert.equal(rpc.authenticate(fromIp(rpc.sign({ action: 'reload' }, secret)), secret), false);
        assert.equal(rpc.reject(fromIp('invalid')), false);
        now += 60_000;
        assert.ok(rpc.authenticate(fromIp(rpc.sign({ action: 'reload' }, secret)), secret));
        assert.equal(rpc.reject(fromIp('invalid')), true);
    }
    finally { Date.now = original; }
});

test('file hash processes multiple chunks and reports read failures', async t => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-rpc-hash-'));
    t.after(() => fs.rm(directory, { recursive: true, force: true }));
    const file = path.join(directory, 'fixture.zip');
    const content = Buffer.alloc(200_000, 42);
    await fs.writeFile(file, content);
    assert.equal(await rpc.hashFile(file), rpc.hash(content));
    assert.equal(await rpc.hashFile(path.join(directory, 'missing')), false);
});

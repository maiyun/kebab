import assert from 'node:assert/strict';
import test from 'node:test';
import { redact } from '../../lib/text.js';

const marker = '[REDACTED]';

test('raw secrets are literal, case-sensitive, deduplicated and do not mutate input', () => {
    const secrets = Object.freeze(['', 'a.b*?', 'a.b*?', 'Token']);
    assert.equal(redact('a.b*? Token token aXb', secrets), `${marker} ${marker} token aXb`);
    assert.deepEqual(secrets, ['', 'a.b*?', 'a.b*?', 'Token']);
    assert.equal(redact('unchanged', []), 'unchanged');
    assert.equal(redact('', ['secret']), '');
    const special = '^$.*+?()[]{}|\\-/';
    assert.equal(redact(`before ${special} after`, [special], { encoded: false }), `before ${marker} after`);
    assert.equal(redact('unchanged', ['']), 'unchanged');
});

test('uses leftmost, longest at the same position, non-overlapping matches', () => {
    assert.equal(redact('abcd abc abc', ['ab', 'abc', 'bcd'], { encoded: false }), `${marker}d ${marker} ${marker}`);
    assert.equal(redact('zabc', ['bc', 'abc'], { encoded: false }), `z${marker}`);
});

test('replacement is literal and is not rescanned', () => {
    assert.equal(redact('secret secret', ['secret', 'other'], { replacement: '$&secret' }), '$&secret $&secret');
    assert.equal(redact('secret', ['secret'], { replacement: '' }), '');
});

test('encoded forms include URI hex case variants and JSON string content', () => {
    const secret = 'A/é "\\\n';
    const uri = encodeURIComponent(secret);
    const lowerHex = uri.replace(/%[0-9A-F]{2}/g, value => value.toLowerCase());
    const json = JSON.stringify(secret).slice(1, -1);
    assert.equal(redact([secret, uri, lowerHex, json].join('|'), [secret]), Array(4).fill(marker).join('|'));
    assert.equal(redact('a%2fb A%2fb A%2Fb', ['A/b']), `a%2fb ${marker} ${marker}`);
    assert.equal(redact('A%252Fb A+b', ['A/b']), 'A%252Fb A+b');
    assert.equal(redact('A%2Fb', ['A/b'], { encoded: false }), 'A%2Fb');
    assert.equal(redact('x\\ny', ['x\ny'], { encoded: false }), 'x\\ny');
});

test('encoded variants compete with raw secrets by longest match', () => {
    assert.equal(redact('A%2Fb', ['A', 'A/b']), marker);
    assert.equal(redact('A%2Fb', ['A%2', 'A/b']), marker);
    assert.equal(redact('😀|%F0%9F%98%80|%f0%9f%98%80', ['😀']), `${marker}|${marker}|${marker}`);
});

test('isolated surrogates keep raw and JSON forms without URI failure', () => {
    const secret = `x\ud800y`;
    const json = JSON.stringify(secret).slice(1, -1);
    assert.equal(redact(`${secret}|${json}|ok%2F`, [secret, 'ok/']), `${marker}|${marker}|${marker}`);
});

function reference(value, secrets, replacement) {
    let result = '';
    for (let i = 0; i < value.length;) {
        let longest = '';
        for (const secret of secrets) {
            if (secret.length > longest.length && value.startsWith(secret, i)) longest = secret;
        }
        if (longest) {
            result += replacement;
            i += longest.length;
        }
        else result += value[i++];
    }
    return result;
}

test('raw matching agrees with independent fixed-seed reference', () => {
    let seed = 0x64a9e21;
    const next = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0);
    const chars = 'ab.$[]\\';
    const string = length => Array.from({ length }, () => chars[next() % chars.length]).join('');
    for (let trial = 0; trial < 500; trial++) {
        const value = string(next() % 100);
        const secrets = Array.from({ length: next() % 12 }, () => string(next() % 8));
        assert.equal(redact(value, secrets, { encoded: false, replacement: '$&a' }), reference(value, secrets, '$&a'), `trial ${trial}`);
    }
});

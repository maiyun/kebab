import assert from 'node:assert/strict';
import { isIP } from 'node:net';
import test from 'node:test';
import * as text from '../../lib/text.js';

test('JSON integers retain precision in objects, arrays and root values', () => {
    const large = 9007199254740993n;
    assert.deepEqual(text.parseJson('{"id":9007199254740993,"negative":-9007199254740993}'), {
        id: large, negative: -large,
    });
    assert.deepEqual(text.parseJson('[9007199254740993,{"编号":9007199254740993,"":9007199254740993}]'), [
        large, { '编号': large, '': large },
    ]);
    assert.equal(text.parseJson('9007199254740993'), large);
    assert.equal(text.parseJson('-9007199254740993'), -large);
    assert.equal(text.parseJson('9'.repeat(400)), BigInt('9'.repeat(400)));
    assert.equal(text.parseJson('{"escaped\\u006bey":9007199254740993}').escapedkey, large);
});

test('safe integers, decimals, exponents and other JSON values keep native types', () => {
    for (const source of [
        '9007199254740991', '-9007199254740991', '0', '-0', '1.25', '1e3',
        '9007199254740993.0', '9.007199254740993e15', '1e400', 'true', 'false', 'null',
        '"ordinary"', '[]', '{}',
    ]) {
        assert.deepEqual(text.parseJson(source), JSON.parse(source));
    }
});

test('ordinary strings and keys never collide with the old BigInt marker', () => {
    const value = {
        '-mybigint-123': '-mybigint-9007199254740993',
        text: '-mybigint-invalid',
        embedded: '{"id":9007199254740993}',
        escaped: '"\\\n',
    };
    assert.equal(text.stringifyJson(value), JSON.stringify(value));
    assert.deepEqual(text.parseJson(JSON.stringify(value)), value);
});

test('invalid JSON returns false without accepting non-JSON number syntax', () => {
    for (const source of ['', '{', '[1,]', '{"id":+1}', '{"id":01}', '{"id":--1}', 'undefined']) {
        assert.equal(text.parseJson(source), false);
    }
});

test('BigInt serialization emits exact unquoted integers and preserves formatting', () => {
    const value = { id: 9007199254740993n, nested: [-9007199254740993n, 0n, 12n] };
    const expected = '{"id":9007199254740993,"nested":[-9007199254740993,0,12]}';
    assert.equal(text.stringifyJson(value), expected);
    assert.deepEqual(text.parseJson(text.stringifyJson(value)), {
        id: 9007199254740993n, nested: [-9007199254740993n, 0, 12],
    });
    assert.equal(text.stringifyJson(9007199254740993n), '9007199254740993');
    for (const space of [undefined, 2, '\t']) {
        const formatted = JSON.stringify({ id: 'BIGINT' }, null, space).replace('"BIGINT"', '9007199254740993');
        assert.equal(text.stringifyJson({ id: 9007199254740993n }, space), formatted);
    }
});

test('serialization keeps native omission, toJSON and circular-reference behavior', () => {
    const value = { missing: undefined, number: NaN, array: [undefined, Infinity], toJSON: undefined };
    assert.equal(text.stringifyJson(value), JSON.stringify(value));
    assert.equal(text.stringifyJson(undefined), undefined);
    assert.equal(text.stringifyJson({ toJSON: () => 9007199254740993n }), '9007199254740993');
    const circular = {};
    circular.self = circular;
    assert.throws(() => text.stringifyJson(circular), TypeError);
});

test('IP helpers keep strict IPv4 and IPv6 validation', () => {
    for (const ip of ['127.0.0.1', '::1', '::ffff:127.0.0.1', 'fe80::1%eth0', '01.2.3.4', '256.0.0.1', '', '[::1]']) {
        assert.equal(text.isIPv4(ip), isIP(ip) === 4);
        assert.equal(text.isIPv6(ip), isIP(ip) === 6);
    }
});

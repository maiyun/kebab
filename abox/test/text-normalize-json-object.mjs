import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeJsonObject } from '#kebab/lib/text.js';

test('normalizes plain and null-prototype objects into a detached tree with stable keys', () => {
    const nested = Object.assign(Object.create(null), { z: false, a: 1.5 });
    const input = { z: [nested, 'second', null, true], a: nested };
    const result = normalizeJsonObject(input);

    assert.ok(result);
    assert.equal(Object.getPrototypeOf(result), null);
    assert.equal(Object.getPrototypeOf(result.a), null);
    assert.equal(Object.getPrototypeOf(result.z[0]), null);
    assert.notEqual(result, input);
    assert.notEqual(result.a, nested);
    assert.notEqual(result.z, input.z);
    assert.notEqual(result.z[0], nested);
    assert.ok(Array.isArray(result.z));
    assert.equal(JSON.stringify(result), '{"a":{"a":1.5,"z":false},"z":[{"a":1.5,"z":false},"second",null,true]}');
    assert.deepEqual(Object.keys(input), ['z', 'a']);
    assert.deepEqual(Object.keys(nested), ['z', 'a']);
    assert.equal(JSON.stringify(normalizeJsonObject(result)), JSON.stringify(result));
    assert.equal(Object.getPrototypeOf(normalizeJsonObject({})), null);
});

test('preserves __proto__ as an ordinary own data property', () => {
    const result = normalizeJsonObject(JSON.parse('{"nested":{"__proto__":{"flag":true}}}'));

    assert.ok(result);
    assert.equal(Object.getPrototypeOf(result.nested), null);
    assert.ok(Object.hasOwn(result.nested, '__proto__'));
    assert.equal(result.nested.__proto__.flag, true);
    assert.equal(result.nested.flag, undefined);
});

test('rejects invalid roots and values instead of silently dropping or coercing them', () => {
    for (const input of [null, 'name', 1, true, undefined, [], new Date()]) {
        assert.equal(normalizeJsonObject(input), false);
    }
    for (const input of [
        undefined, NaN, Infinity, -Infinity, 1n, Symbol('value'), () => 1,
        new Date(), Object.create({ inherited: true }),
        Object.defineProperty({}, 'hidden', { value: true }),
        { [Symbol('key')]: true },
        Array(1),
        Object.assign([1], { extra: true }),
        Object.defineProperty([], '0', { value: 1 }),
        Object.assign([], { [Symbol('key')]: true }),
    ]) {
        assert.equal(normalizeJsonObject({ nested: [input] }), false);
    }
});

test('rejects accessors without calling them', () => {
    let calls = 0;
    function read() {
        calls += 1;
        return 1;
    }
    const object = { get value() { return read(); } };
    const array = Object.defineProperty([], '0', { enumerable: true, get: read });

    assert.equal(normalizeJsonObject(object), false);
    assert.equal(normalizeJsonObject({ array }), false);
    assert.equal(calls, 0);
});

test('rejects cycles through either objects or arrays', () => {
    const object = {};
    object.self = object;
    const array = [];
    array.push({ array });

    assert.equal(normalizeJsonObject(object), false);
    assert.equal(normalizeJsonObject({ array }), false);
});

import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { queryParse, queryStringify, urlAtom, urlResolve } from '../../lib/text.js';

test('normalizes path segments without changing other URL components', () => {
    const cases = [
        ['../alpha/../../beta', '../../beta'],
        ['a/../b', 'b'],
        ['/a/../b', '/b'],
        ['/a/..', '/'],
        ['/a//../b', '/b'],
        ['/../../b', '/b'],
        ['/x/name../file', '/x/name../file'],
        ['https://example.com/a/../b?q=../x#../y', 'https://example.com/b?q=../x#../y'],
        ['https://example.com/../b', 'https://example.com/b'],
        ['C:/a/../b', 'C:/b'],
    ];
    for (const [input, expected] of cases) assert.equal(urlAtom(input), expected, input);
});

test('limits results to the base directory', () => {
    for (const base of ['/safe/base', '/safe/base/']) {
        assert.equal(urlResolve(base, 'child', true), '/safe/base/child');
        assert.equal(urlResolve(base, '../escape', true), '/safe/base/');
        assert.equal(urlResolve(base, '..', true), '/safe/base/');
        assert.equal(urlResolve(base, 'sub/..', true), '/safe/base/');
        assert.equal(urlResolve(base, './', true), '/safe/base/');
        assert.equal(urlResolve(base, 'sub/../..', true), '/safe/base/');
        assert.equal(urlResolve(base, 'sub//../../escape', true), '/safe/base/');
        assert.equal(urlResolve(base, '/child', true), '/safe/base/child');
        assert.equal(urlResolve(base, '/safe/base-other', true), '/safe/base/safe/base-other');
    }
    assert.equal(urlResolve('https://example.com/a/b', '../c'), 'https://example.com/c');
    assert.equal(urlResolve('/safe/base/', 'child?q=../x', true), '/safe/base/child?q=../x');
});

test('limits HTTP URLs using browser path semantics', () => {
    for (const dot of ['%2e%2e', '%2E%2e', '.%2e', '%2e.']) {
        assert.equal(urlResolve('https://example.com/base/', `${dot}/escape`, true), 'https://example.com/base/');
        assert.equal(urlResolve('http://example.com/base/', `sub/${dot}/${dot}`, true), 'http://example.com/base/');
    }
    assert.equal(urlResolve('https://example.com/base/', '%2e/child', true), 'https://example.com/base/%2e/child');
    assert.equal(urlResolve('https://example.com/base/', 'a%2Fb', true), 'https://example.com/base/a%2Fb');
    assert.equal(urlResolve('/safe/base/', '%2e%2e/file', true), '/safe/base/%2e%2e/file');
});

test('handles query and fragment references and strips base query from fallback', () => {
    assert.equal(urlResolve('https://example.com/base?old=1#old', '?new=2', true), 'https://example.com/base?new=2');
    assert.equal(urlResolve('https://example.com/base#old', '?new=2', true), 'https://example.com/base?new=2');
    assert.equal(urlResolve('https://example.com/base?old=1#old', '#new', true), 'https://example.com/base?old=1#new');
    assert.equal(urlResolve('https://example.com/base?old=1#old', '..', true), 'https://example.com/base/');
    assert.equal(urlResolve('https://example.com/base?old=1#old', '', true), 'https://example.com/base?old=1#old');
});

test('parses form plus signs while preserving encoded plus and malformed escapes', () => {
    assert.deepEqual(queryParse('a+b=x+y&plus=%2B&bad=%zz+value&a+b=two'), {
        'a b': ['x y', 'two'], 'plus': '+', 'bad': '%zz value'
    });
    assert.deepEqual(queryParse(queryStringify({ 'a b': 'x+y', 'k': ['a b', '+'] })), {
        'a b': 'x+y', 'k': ['a b', '+']
    });
    const result = queryParse('__proto__=one&__proto__=two&constructor=ok');
    assert.deepEqual(result.__proto__, ['one', 'two']);
    assert.equal(result.constructor, 'ok');
    assert.equal(Object.getPrototypeOf(result), Object.prototype);
});

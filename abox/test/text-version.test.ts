import * as assert from 'node:assert/strict';
import * as nodeTest from 'node:test';

import * as lText from '#kebab/lib/text.js';

await nodeTest.test('parseVersion parses stable X.Y.Z versions as safe integers', () => {
    assert.deepStrictEqual(lText.parseVersion('0.0.0'), [0, 0, 0]);
    assert.deepStrictEqual(lText.parseVersion('2.10.1'), [2, 10, 1]);
    assert.deepStrictEqual(lText.parseVersion('9007199254740991.0.0'), [Number.MAX_SAFE_INTEGER, 0, 0]);
});

await nodeTest.test('compareVersion orders each numeric segment and returns -1, 0 or 1', () => {
    for (const [lower, higher] of [
        ['0.0.0', '0.0.1'],
        ['2.0.0', '2.0.1'],
        ['2.9.99', '2.10.0'],
        ['2.99.99', '3.0.0'],
        ['2.10.9', '2.10.10'],
        ['9007199254740990.0.0', '9007199254740991.0.0'],
    ]) {
        assert.strictEqual(lText.compareVersion(lower, higher), -1);
        assert.strictEqual(lText.compareVersion(higher, lower), 1);
        assert.strictEqual(lText.compareVersion(lower, lower), 0);
    }
});

await nodeTest.test('invalid versions return null in parsing and either comparison operand', () => {
    for (const version of [
        undefined, null, '', 2, [], {}, '2.0', '2.0.0.1', '02.0.1', '2.00.1', '2.0.01',
        'v2.0.1', '2.0.1-beta', '2.0.1+build', ' 2.0.1', '2.0.1 ', '2.0.1\n', '2.0.1\r',
        '2.0.1\r\n', '2.0.1\u2028', '2.0.1\u2029', '-2.0.1', '2.0.1<script>',
        '9007199254740992.0.0', '0.9007199254740992.0', '0.0.9007199254740992', '1'.repeat(65),
    ]) {
        assert.strictEqual(lText.parseVersion(version), null);
        assert.strictEqual(lText.compareVersion(version, '2.0.1'), null);
        assert.strictEqual(lText.compareVersion('2.0.1', version), null);
    }
});

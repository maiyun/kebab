import assert from 'node:assert/strict';
import { test } from 'node:test';
import { get, column, json } from '../../lib/sql.js';
import { ESERVICE } from '../../lib/db.js';

for (const service of [ESERVICE.PGSQL, ESERVICE.MYSQL]) {
    const quote = name => service === ESERVICE.PGSQL ? `"${name}"` : `\`${name}\``;
    const param = n => service === ESERVICE.PGSQL ? `$${n}` : '?';
    const build = where => get({ service }).select('*', 'records').where(where);
    const prefix = `SELECT * FROM ${quote('records')} WHERE `;
    for (const [name, value] of Object.entries({
        string: 'hello', number: 12, zero: 0, empty: '', true: true, false: false,
        bigint: 9007199254740993n, date: new Date('2026-11-01T00:00:00Z'),
        buffer: Buffer.from([1, 2]), emptyBuffer: Buffer.alloc(0),
    })) {
        test(`${service}: object WHERE binds ${name} as one equality value`, () => {
            const sql = build({ value });
            assert.equal(sql.getSql(), `${prefix}${quote('value')} = ${param(1)}`);
            assert.deepEqual(sql.getData(), [value]);
        });
    }
    for (const [name, value, suffix, data] of [
        ['null', null, 'IS NULL', []],
        ['list', [1, 2], `IN (${param(1)}, ${param(2)})`, [1, 2]],
        ['empty list', [], 'IN (NULL)', []],
        ['tuple list', [[1, 2], [3, 4]], `IN ((${param(1)}, ${param(2)}), (${param(3)}, ${param(4)}))`, [1, 2, 3, 4]],
        ['column', column('other'), `= ${quote('other')}`, []],
        ['json', json({ enabled: true }), `= ${param(1)}${service === ESERVICE.PGSQL ? '::jsonb' : ''}`, ['{"enabled":true}']],
    ]) {
        test(`${service}: object WHERE preserves ${name} conditions`, () => {
            const sql = build({ value });
            assert.equal(sql.getSql(), `${prefix}${quote('value')} ${suffix}`);
            assert.deepEqual(sql.getData(), data);
        });
    }
    test(`${service}: grouped conditions keep parameter order`, () => {
        const date = new Date('2026-11-01T00:00:00Z');
        const sql = build({ '$or': [{ enabled: false }, { created: date }], id: [1, 2] });
        assert.equal(sql.getSql(), `${prefix}(${quote('enabled')} = ${param(1)} OR ${quote('created')} = ${param(2)}) AND ${quote('id')} IN (${param(3)}, ${param(4)})`);
        assert.deepEqual(sql.getData(), [false, date, 1, 2]);
    });
}

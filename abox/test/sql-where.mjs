import assert from 'node:assert/strict';
import { test } from 'node:test';
import { EJSON, get, column, json, op } from '../../lib/sql.js';
import { ESERVICE } from '../../lib/db.js';
import Mod from '../../sys/mod.js';

class RecordMod extends Mod {
    static _$table = 'records';
}

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
        ['string list', ['ready', 'done'], `IN (${param(1)}, ${param(2)})`, ['ready', 'done']],
        ['list starting with an operator', ['LIKE', 'ready', 'done'], `IN (${param(1)}, ${param(2)}, ${param(3)})`, ['LIKE', 'ready', 'done']],
        ['empty list', [], 'IN (NULL)', []],
        ['set', new Set(['a.pdf', 'b.pdf', 'a.pdf']), `IN (${param(1)}, ${param(2)})`, ['a.pdf', 'b.pdf']],
        ['set starting with an operator', new Set(['LIKE', 'ready']), `IN (${param(1)}, ${param(2)})`, ['LIKE', 'ready']],
        ['empty set', new Set(), 'IN (NULL)', []],
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
    const valueField = quote('value');
    for (const [operator, value, predicate, data] of [
        ['<', 0, `${valueField} < ${param(1)}`, [0]],
        ['>=', 7, `${valueField} >= ${param(1)}`, [7]],
        ['like', '%demo%', `${valueField} LIKE ${param(1)}`, ['%demo%']],
        ['in', ['LIKE', 'ready'], `${valueField} IN (${param(1)}, ${param(2)})`, ['LIKE', 'ready']],
        [' not  in ', new Set([7, 8]), `${valueField} NOT IN (${param(1)}, ${param(2)})`, [7, 8]],
        ['NOT IN', [], '1 = 1', []],
        ['!==', null, `${valueField} IS NOT NULL`, []],
        ['>', column('other'), `${valueField} > ${quote('other')}`, []],
        [EJSON.CONTAINS, { enabled: true }, service === ESERVICE.PGSQL
            ? `${valueField} @> ${param(1)}`
            : `JSON_CONTAINS(${valueField}, ${param(1)})`, ['{"enabled":true}']],
        [' json ', { enabled: true }, service === ESERVICE.PGSQL
            ? `${valueField} @> ${param(1)}`
            : `JSON_CONTAINS(${valueField}, ${param(1)})`, ['{"enabled":true}']],
        [EJSON.HAS_ANY_KEYS, ['first', 'second'], service === ESERVICE.PGSQL
            ? `${valueField} ?| ${param(1)}`
            : `JSON_CONTAINS_PATH(${valueField}, 'one', ${param(1)}, ${param(2)})`, service === ESERVICE.PGSQL
            ? [['first', 'second']]
            : ['$.first', '$.second']],
    ]) {
        test(`${service}: ${operator.trim()} works in object shorthand, helpers and explicit tuples`, () => {
            for (const where of [
                { value: [operator, value] },
                { value: op(operator, value) },
                { value: RecordMod.op(operator, value) },
                [['value', operator, value]],
            ]) {
                const sql = build(where);
                assert.equal(sql.getSql(), `${prefix}${predicate}`);
                assert.deepEqual(sql.getData(), data);
            }
        });
    }
    for (const [operator, values, condition, data] of [
        ['in', new Set([7]), `${quote('value')} IN (${param(1)})`, [7]],
        ['not in', new Set([7, 8]), `${quote('value')} NOT IN (${param(1)}, ${param(2)})`, [7, 8]],
        ['IN', new Set(), `${quote('value')} IN (NULL)`, []],
        ['NOT IN', new Set(), '1 = 1', []],
        ['NOT IN', [], '1 = 1', []],
    ]) {
        test(`${service}: explicit ${operator} with ${values.size ?? values.length} ${values.constructor.name} values`, () => {
            const sql = build([['value', operator, values], { state: 2 }]);
            assert.equal(sql.getSql(), `${prefix}${condition} AND ${quote('state')} = ${param(data.length + 1)}`);
            assert.deepEqual(sql.getData(), [...data, 2]);
        });
    }
    test(`${service}: grouped conditions keep parameter order`, () => {
        const date = new Date('2026-11-01T00:00:00Z');
        const sql = build({ '$or': [{ enabled: false }, { created: date }], id: new Set([1, 2]) });
        assert.equal(sql.getSql(), `${prefix}(${quote('enabled')} = ${param(1)} OR ${quote('created')} = ${param(2)}) AND ${quote('id')} IN (${param(3)}, ${param(4)})`);
        assert.deepEqual(sql.getData(), [false, date, 1, 2]);
    });
    test(`${service}: grouped shorthand keeps predicates and parameter order`, () => {
        const sql = build({
            '$or': [{ score: ['>=', 7], state: 'ready' }, { name: op('LIKE', 'demo%') }],
            id: [1, 2],
        });
        assert.equal(sql.getSql(), `${prefix}((${quote('score')} >= ${param(1)} AND ${quote('state')} = ${param(2)}) OR ${quote('name')} LIKE ${param(3)}) AND ${quote('id')} IN (${param(4)}, ${param(5)})`);
        assert.deepEqual(sql.getData(), [7, 'ready', 'demo%', 1, 2]);
    });
    test(`${service}: legacy raw condition still binds its parameter`, () => {
        const sql = build([[`${valueField} = ${param(1)}`, [7]]]);
        assert.equal(sql.getSql(), `${prefix}${valueField} = ${param(1)}`);
        assert.deepEqual(sql.getData(), [7]);
    });
    test(`${service}: invalid operator conditions fail closed`, () => {
        for (const where of [
            { value: ['>=', undefined] },
            { value: ['==', 7] },
            { value: op('>=', undefined) },
            { value: op('unsupported', 7) },
            [['value', '>=', undefined]],
        ]) {
            const sql = build(where);
            assert.ok(sql.getError());
            assert.equal(sql.getSql(), '');
            assert.deepEqual(sql.getData(), []);
        }
    });
    test(`${service}: Mod.one and update builder accept shorthand and both helpers`, async () => {
        const db = {
            getService: () => service,
            query: async (sql, data) => {
                assert.equal(sql, `${prefix}${valueField} >= ${param(1)} LIMIT 1`);
                assert.deepEqual(data, [7]);
                return { rows: [{ value: 7 }] };
            },
        };
        for (const value of [['>=', 7], op('>=', 7), RecordMod.op('>=', 7)]) {
            const record = await RecordMod.one(db, { value });
            assert.ok(record instanceof RecordMod);
            assert.equal(record.value, 7);
            const matching = await RecordMod.where(db, { value }).first();
            assert.equal(matching.value, 7);
            const update = RecordMod.updateByWhereSql(db, { state: 'done' }, { value });
            assert.equal(update.getSql(), `UPDATE ${quote('records')} SET ${quote('state')} = ${param(1)} WHERE ${valueField} >= ${param(2)}`);
            assert.deepEqual(update.getData(), ['done', 7]);
        }
        const invalid = { value: ['>=', undefined] };
        assert.equal(await RecordMod.one(db, invalid), false);
        const update = RecordMod.updateByWhereSql(db, { state: 'done' }, invalid);
        assert.ok(update.getError());
        assert.equal(update.getSql(), '');
        assert.deepEqual(update.getData(), []);
    });
}

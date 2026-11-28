import * as assert from 'node:assert/strict';
import * as nodeTest from 'node:test';

import * as lDb from '#kebab/lib/db.js';
import * as lSql from '#kebab/lib/sql.js';
import sMod from '#kebab/sys/mod.js';

class UpdateTestMod extends sMod {

    protected static _$table = 'update_test';

}

class FakeDb {

    public readonly calls: Array<{
        'sql': string;
        'data': unknown[];
    }> = [];

    public getService(): lDb.ESERVICE {
        return lDb.ESERVICE.PGSQL;
    }

    public execute(sql: string, data: unknown[] = []): Promise<lDb.IPacket> {
        this.calls.push({ 'sql': sql, 'data': data });
        return Promise.resolve({
            'packet': {
                'affected': 1,
                'insert': 0,
            },
            'fields': [],
            'error': null,
            'result': 1,
        });
    }

}

await nodeTest.test('PostgreSQL batch update derives VALUES types from the target table', () => {
    const sql = lSql.get({
        'service': lSql.ESERVICE.PGSQL,
        'pre': 'm',
    });
    sql.updateByValues('update_test', 'uid', ['day'], [
        [null, null],
        ['019-test', '2026-08-09'],
    ]);

    assert.match(
        sql.getSql(),
        /VALUES \(\(NULL::"m"\."update_test"\)\."uid", \(NULL::"m"\."update_test"\)\."day"\)/
    );
    assert.match(sql.getSql(), /, \(NULL, NULL\), \(\$1, \$2\)/);
    assert.deepStrictEqual(sql.getData(), ['019-test', '2026-08-09']);
});

await nodeTest.test('MySQL batch update keeps the bounded UNION ALL derived table plan', () => {
    const sql = lSql.get({
        'service': lSql.ESERVICE.MYSQL,
        'pre': 'm',
    });
    sql.updateByValues('update_test', 'id', ['name'], [
        [1, 'A'],
        [2, 'B'],
    ]);

    assert.strictEqual(
        sql.getSql(),
        'UPDATE (SELECT ? AS `id`, ? AS `name` UNION ALL SELECT ?, ?) AS tmp STRAIGHT_JOIN `m_update_test` t ON t.`id` = tmp.`id` SET t.`name` = tmp.`name`'
    );
    assert.deepStrictEqual(sql.getData(), [1, 'A', 2, 'B']);
});

await nodeTest.test('Mod.updateList merges duplicate keys and normalizes invalid batch sizes', async () => {
    const db = new FakeDb();
    const result = await UpdateTestMod.updateList(db as unknown as lDb.Pool, [
        { 'uid': 'A', 'name': 'first' },
        { 'uid': 'A', 'state': 1 },
        { 'uid': 'A', 'name': 'last' },
        { 'name': 'missing-key' },
        { 'uid': 'B', 'name': 'second', 'state': 2 },
    ], 'uid', {
        'batchSize': 1.5,
    });

    assert.strictEqual(result, true);
    assert.strictEqual(db.calls.length, 1);
    assert.deepStrictEqual(db.calls[0].data, ['A', 'last', 1, 'B', 'second', 2]);
});

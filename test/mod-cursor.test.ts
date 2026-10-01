import * as assert from 'node:assert/strict';
import * as nodeTest from 'node:test';

import * as lDb from '#kebab/lib/db.js';
import * as lSql from '#kebab/lib/sql.js';
import sMod from '#kebab/sys/mod.js';

class CursorTestMod extends sMod {

    protected static _$table = 'message';

    protected static _$pre = 'test';

}

class FakeDb {

    public calls: Array<{ 'sql': string; 'data': unknown[] }> = [];

    public rows: Array<Record<string, unknown>> | null = [];

    public service = lDb.ESERVICE.PGSQL;

    public getService(): lDb.ESERVICE {
        return this.service;
    }

    public query(sql: string, data: unknown[] = []): Promise<lDb.IData> {
        this.calls.push({ 'sql': sql, 'data': data });
        return Promise.resolve({ 'rows': this.rows, 'fields': [], 'error': null, 'result': 1 });
    }

}

await nodeTest.test('Sql.seek uses bound row comparisons after existing predicates and copy keeps parameter numbering', () => {
    const base = lSql.get({ 'service': lSql.ESERVICE.PGSQL, 'pre': 'test' });
    base.select(['m.id', 'm.time_add'], 'message m').where([
        ['m.time_add', '>=', 100],
        { '$or': [{ 'm.no': 'A' }, { 'm.no': 'B' }] },
    ]).by('m.time_add').limit(20);
    const original = base.getSql();
    const query = base.copy(undefined, { 'order': false, 'limit': false });
    query.seek(['m.time_add', 'm.id'], [200, '9223372036854775806']).limit(21);
    assert.match(query.getSql(), /WHERE \(.+\) AND \("m"\."time_add", "m"\."id"\) < \(\$4, \$5\)/);
    assert.match(query.getSql(), /ORDER BY "m"\."time_add" DESC, "m"\."id" DESC LIMIT 21$/);
    assert.match(query.getSql(), /AND "m"\."time_add" <= \$6/);
    assert.deepStrictEqual(query.getData(), [100, 'A', 'B', 200, '9223372036854775806', 200]);
    assert.strictEqual(base.getSql(), original);
});

await nodeTest.test('Sql.seek supports MySQL, ASC and a single ordering field', () => {
    const query = lSql.get({ 'service': lSql.ESERVICE.MYSQL });
    query.select('*', 'message').seek('id', [42], 'ASC').limit(11);
    assert.strictEqual(query.getSql(), 'SELECT * FROM `message` WHERE `id` > ? ORDER BY `id` ASC LIMIT 11');
    assert.deepStrictEqual(query.getData(), [42]);
    const multi = lSql.get({ 'service': lSql.ESERVICE.MYSQL }).select('*', 'message').where({ 'parse': 1 }).copy();
    multi.seek(['time_add', 'id'], [200, '9223372036854775806']);
    assert.match(multi.getSql(), /\(`time_add`, `id`\) < \(\?, \?\) AND `time_add` <= \?/);
    assert.deepStrictEqual(multi.getData(), [1, 200, '9223372036854775806', 200]);
});

await nodeTest.test('Sql.seek rejects null, unsafe integers, expression injection, non-unique fields and grouped queries', () => {
    const make = (): lSql.Sql => lSql.get({ 'service': lSql.ESERVICE.PGSQL }).select('*', 'message');
    assert.throws(() => make().seek('id', [null as unknown as number]));
    assert.throws(() => make().seek('id', [Number.MAX_SAFE_INTEGER + 1]));
    assert.throws(() => make().seek('id', [NaN]));
    assert.throws(() => make().seek('id; DROP TABLE message', [1]));
    assert.throws(() => make().seek(['id', 'id'], [1, 1]));
    assert.throws(() => make().seek(['time_add', 'id'], [1]));
    assert.throws(() => make().group('id').seek('id', [1]));
    assert.throws(() => make().by('id').seek('id', [1]));
});

await nodeTest.test('Mod.allCursor trims the probe row and preserves timestamp ties and large IDs', async () => {
    const db = new FakeDb();
    db.rows = [
        { 'time_add': 200, 'id': '9223372036854775806' },
        { 'time_add': 200, 'id': '9223372036854775805' },
        { 'time_add': 199, 'id': '9223372036854775804' },
    ];
    const query = CursorTestMod.select(db as unknown as lDb.Pool, ['time_add', 'id']).filter({ 'parse': 1 });
    const original = query.getSql();
    const page = await query.allCursor(2, { 'by': ['time_add', 'id'] });
    assert.notStrictEqual(page, false);
    if (page === false) {
        return;
    }
    assert.strictEqual(page.list.length, 2);
    assert.strictEqual(page.hasMore, true);
    assert.deepStrictEqual(page.previous, [200, '9223372036854775806']);
    assert.deepStrictEqual(page.next, [200, '9223372036854775805']);
    assert.match(db.calls[0].sql, /LIMIT 3$/);
    assert.doesNotMatch(db.calls[0].sql, /OFFSET|COUNT/i);
    assert.strictEqual(query.getSql(), original);
});

await nodeTest.test('Mod.allCursor previous batch excludes the boundary and restores display order', async () => {
    const db = new FakeDb();
    db.rows = [{ 't': 200, 'key': '5' }, { 't': 201, 'key': '6' }, { 't': 202, 'key': '7' }];
    const query = CursorTestMod.select(db as unknown as lDb.Pool, ['time_add t', 'id key'], { 'alias': 'm' });
    const page = await query.allCursor(2, {
        'by': ['m.time_add', 'm.id'], 'keys': ['t', 'key'], 'cursor': [199, '4'], 'before': true,
    });
    assert.notStrictEqual(page, false);
    if (page === false) {
        return;
    }
    assert.deepStrictEqual(page.list.map(item => item.key), ['6', '5']);
    assert.deepStrictEqual(page.previous, [201, '6']);
    assert.deepStrictEqual(page.next, [200, '5']);
    assert.strictEqual(page.hasMore, true);
    assert.match(db.calls[0].sql, /\("m"\."time_add", "m"\."id"\) > \(\$1, \$2\)/);
    assert.match(db.calls[0].sql, /ORDER BY "m"\."time_add" ASC, "m"\."id" ASC/);
    assert.match(db.calls[0].sql, /AND "m"\."time_add" >= \$3/);
    assert.deepStrictEqual(db.calls[0].data, [199, '4', 199]);
});

await nodeTest.test('Mod.allCursor handles empty, terminal and failed queries without fabricated totals', async () => {
    const db = new FakeDb();
    const query = CursorTestMod.select(db as unknown as lDb.Pool, '*');
    assert.deepStrictEqual(await query.allCursor(2, { 'by': 'id' }), {
        'list': [], 'hasMore': false, 'previous': null, 'next': null,
    });
    db.rows = [{ 'id': 1 }];
    const page = await query.allCursor(2, { 'by': 'id' });
    assert.notStrictEqual(page, false);
    assert.strictEqual(page && page.hasMore, false);
    db.rows = null;
    assert.strictEqual(await query.allCursor(2, { 'by': 'id' }), false);
});

await nodeTest.test('Mod.allCursor rejects unsupported query modes and invalid result boundaries', async () => {
    const db = new FakeDb();
    const query = CursorTestMod.select(db as unknown as lDb.Pool, '*');
    await assert.rejects(query.allCursor(0, { 'by': 'id' }));
    await assert.rejects(query.allCursor(1, { 'by': 'id', 'before': true }));
    await assert.rejects(query.allCursor(1, { 'by': ['id', 'time_add'], 'keys': ['id'] }));
    await assert.rejects(CursorTestMod.select(db as unknown as lDb.Pool, '*', { 'index': ['a', 'b'] }).allCursor(1, { 'by': 'id' }));
    db.rows = [{ 'id': null }];
    await assert.rejects(query.allCursor(1, { 'by': 'id' }));
    db.rows = [{ 'id': Number.MAX_SAFE_INTEGER + 1 }];
    await assert.rejects(query.allCursor(1, { 'by': 'id' }));
});

await nodeTest.test('Mod.totalEstimate uses top-level cardinality, not partial worker rows, and never executes COUNT', async () => {
    const db = new FakeDb();
    db.rows = [{ 'QUERY PLAN': [{ 'Plan': { 'Node Type': 'Gather', 'Plan Rows': 12345, 'Plans': [{ 'Plan Rows': 5144 }] } }] }];
    const query = CursorTestMod.select(db as unknown as lDb.Pool, ['id']).filter({ 'parse': 1 }).by('id').page(20, 9);
    const original = query.getSql();
    assert.strictEqual(await query.totalEstimate(), 12345);
    assert.match(db.calls[0].sql, /^EXPLAIN \(FORMAT JSON\) SELECT/);
    assert.doesNotMatch(db.calls[0].sql, /ANALYZE|COUNT|ORDER BY|LIMIT|OFFSET/i);
    assert.deepStrictEqual(db.calls[0].data, [1]);
    assert.strictEqual(query.getSql(), original);
});

await nodeTest.test('Mod.totalEstimate parses string JSON and returns false for errors or unsupported backends', async () => {
    const db = new FakeDb();
    const query = CursorTestMod.select(db as unknown as lDb.Pool, '*');
    db.rows = [{ 'QUERY PLAN': '[{"Plan":{"Plan Rows":0}}]' }];
    assert.strictEqual(await query.totalEstimate(), 0);
    db.rows = [{ 'QUERY PLAN': 'not json' }];
    assert.strictEqual(await query.totalEstimate(), false);
    db.rows = null;
    assert.strictEqual(await query.totalEstimate(), false);
    const calls = db.calls.length;
    db.service = lDb.ESERVICE.MYSQL;
    assert.strictEqual(await query.totalEstimate(), false);
    assert.strictEqual(db.calls.length, calls);
});

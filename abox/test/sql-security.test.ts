import * as assert from 'node:assert/strict';
import * as nodeTest from 'node:test';

import * as lDb from '#kebab/lib/db.js';
import * as lSql from '#kebab/lib/sql.js';
import * as lText from '#kebab/lib/text.js';
import sMod from '#kebab/sys/mod.js';

class SecurityTestMod extends sMod {

    protected static _$table = 'security_test';

    protected static _$primary = 'id';

    declare public id: number;

    declare public loc: string;

    declare public tags: string[];

}

class FakeDb {

    public readonly calls: Array<{
        'sql': string;
        'data': unknown[];
    }> = [];

    private readonly _service: lDb.ESERVICE;

    public constructor(service: lDb.ESERVICE = lDb.ESERVICE.PGSQL) {
        this._service = service;
    }

    public getService(): lDb.ESERVICE {
        return this._service;
    }

    public query(sql: string, data: unknown[] = []): Promise<lDb.IData> {
        this.calls.push({ 'sql': sql, 'data': data });
        return Promise.resolve({
            'rows': [],
            'fields': [],
            'error': null,
            'result': 1,
        });
    }

    public execute(sql: string, data: unknown[] = []): Promise<lDb.IPacket> {
        this.calls.push({ 'sql': sql, 'data': data });
        return Promise.resolve({
            'packet': {
                'affected': 1,
                'insert': 1,
            },
            'fields': [],
            'error': null,
            'result': 1,
        });
    }

}

function assertSqlFailed(sql: lSql.Sql | sMod, pattern: RegExp): void {
    assert.match(sql.getError(), pattern);
    assert.strictEqual(sql.getSql(), '');
    assert.deepStrictEqual(sql.getData(), []);
}

await nodeTest.test('Sql.limit and Mod.page allow safe integers and numeric strings while failing closed without throw', async () => {
    const sql = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    sql.select('*', 'users').limit('10' as unknown as number, '20' as unknown as number);
    assert.strictEqual(sql.getError(), '');
    assert.strictEqual(sql.getSql(), 'SELECT * FROM "users" LIMIT 20 OFFSET 10');

    const db = new FakeDb(lDb.ESERVICE.MYSQL);
    const query = SecurityTestMod.select<SecurityTestMod>(db as unknown as lDb.Pool, ['id'])
        .page('20' as unknown as number, '3' as unknown as number);
    assert.strictEqual(query.getError(), '');
    assert.strictEqual(query.getSql(), 'SELECT `id` FROM `security_test` LIMIT 20 OFFSET 40');

    for (const bad of ['20; DROP TABLE users', '1 UNION SELECT 1', '-1', '1.5', -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, {}]) {
        const s1 = lSql.get({ 'service': lSql.ESERVICE.MYSQL }).select('*', 'users').limit(bad as number);
        assertSqlFailed(s1, /Invalid SQL limit/);

        const s2 = lSql.get({ 'service': lSql.ESERVICE.MYSQL }).select('*', 'users').limit(0, bad as number);
        assertSqlFailed(s2, /Invalid SQL limit/);

        const m = SecurityTestMod.select<SecurityTestMod>(db as unknown as lDb.Pool, ['id']).page(bad as number, 1);
        assertSqlFailed(m, /Invalid SQL limit/);
        assert.strictEqual(await m.allArray(), false);
    }

    const zeroPage = SecurityTestMod.select<SecurityTestMod>(db as unknown as lDb.Pool, ['id']).page(20, 0);
    assertSqlFailed(zeroPage, /Invalid SQL limit/);
    assert.strictEqual(await zeroPage.allArray(), false);

    const overflowPage = SecurityTestMod.select<SecurityTestMod>(db as unknown as lDb.Pool, ['id']).page(1_000_000_000, 1_000_000_000);
    assertSqlFailed(overflowPage, /Invalid SQL limit/);
    assert.strictEqual(await overflowPage.first(), false);

    assert.strictEqual(db.calls.length, 0);
});

await nodeTest.test('Plain arrays in writes are never treated as SQL expressions; lSql.raw and Mod.raw work explicitly without throw', async () => {
    const pgSql = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    pgSql.insert('security_test').values({
        'tags': ['(SELECT version())'],
        'loc': ['POINT(?)', ['20']],
    });
    assert.strictEqual(pgSql.getError(), '');
    assert.strictEqual(pgSql.getSql(), 'INSERT INTO "security_test" ("tags", "loc") VALUES ($1, $2)');
    assert.deepStrictEqual(pgSql.getData(), [['(SELECT version())'], ['POINT(?)', ['20']]]);

    const mysqlSql = lSql.get({ 'service': lSql.ESERVICE.MYSQL });
    mysqlSql.update('security_test', {
        'tags': ['Item (1)'],
        'loc': { 'sql': 'NOW()', 'params': [] },
    }).where({ 'id': 1 });
    assert.strictEqual(mysqlSql.getError(), '');
    assert.strictEqual(mysqlSql.getSql(), 'UPDATE `security_test` SET `tags` = ?, `loc` = ? WHERE `id` = ?');
    assert.deepStrictEqual(mysqlSql.getData(), ['["Item (1)"]', '{"sql":"NOW()","params":[]}', 1]);

    const db = new FakeDb(lDb.ESERVICE.MYSQL);
    const mod = SecurityTestMod.getCreate<SecurityTestMod>(db as unknown as lDb.Pool);
    mod.set({
        'loc': SecurityTestMod.raw('POINT(?)', ['20']),
        'tags': ['(SELECT 1)'],
    });
    assert.strictEqual(await mod.create(), true);
    assert.strictEqual(db.calls[0].sql, 'INSERT INTO `security_test` (`loc`, `tags`) VALUES (POINT(?), ?)');
    assert.deepStrictEqual(db.calls[0].data, ['20', '["(SELECT 1)"]']);

    const pgRaw = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    pgRaw.update('security_test', {
        'loc': lSql.raw('(CASE "id" WHEN 1 THEN ? WHEN 2 THEN ? END)', ['a', 'b']),
    }).where({ 'id': 1 });
    assert.strictEqual(pgRaw.getError(), '');
    assert.strictEqual(pgRaw.getSql(), 'UPDATE "security_test" SET "loc" = (CASE "id" WHEN 1 THEN $1 WHEN 2 THEN $2 END) WHERE "id" = $3');
    assert.deepStrictEqual(pgRaw.getData(), ['a', 'b', 1]);

    const rawTooFew = lSql.get({ 'service': lSql.ESERVICE.PGSQL }).update('security_test', {
        'loc': lSql.raw('POINT(?, ?)', ['20']),
    });
    assertSqlFailed(rawTooFew, /placeholder count/);

    const rawTooMany = lSql.get({ 'service': lSql.ESERVICE.PGSQL }).update('security_test', {
        'loc': lSql.raw('POINT(?)', ['20', '30']),
    });
    assertSqlFailed(rawTooMany, /parameter count/);

    const rawEmpty = SecurityTestMod.getCreate<SecurityTestMod>(db as unknown as lDb.Pool);
    rawEmpty.set('loc', SecurityTestMod.raw('   '));
    assert.strictEqual(await rawEmpty.create(), false);
    assert.strictEqual(db.calls.length, 1);
});

await nodeTest.test('Sql.by, logical keys, operators, join, union, and hint fail closed without throw', () => {
    const okBy = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    okBy.select('*', 'users').by([['id', 'asc'], 'time_add'], 'desc' as 'DESC');
    assert.strictEqual(okBy.getError(), '');
    assert.strictEqual(okBy.getSql(), 'SELECT * FROM "users" ORDER BY "id" ASC, "time_add" DESC');

    const badBy1 = lSql.get({ 'service': lSql.ESERVICE.PGSQL }).select('*', 'users').by('id', 'DESC; DROP TABLE users' as 'DESC');
    assertSqlFailed(badBy1, /Invalid SQL ORDER BY direction/);

    const badBy2 = lSql.get({ 'service': lSql.ESERVICE.PGSQL }).select('*', 'users').by([['id', 'ASC, (SELECT 1)']]);
    assertSqlFailed(badBy2, /Invalid SQL ORDER BY direction/);

    const okOr = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    okOr.select('*', 'users').where({
        '$or-1': [
            { 'city': 'bj', 'age': 18 },
            [['score', '>=', 60]],
        ],
    });
    assert.strictEqual(okOr.getError(), '');
    assert.strictEqual(okOr.getSql(), 'SELECT * FROM "users" WHERE (("city" = $1 AND "age" = $2) OR "score" >= $3)');
    assert.deepStrictEqual(okOr.getData(), ['bj', 18, 60]);

    const badLogic = lSql.get({ 'service': lSql.ESERVICE.PGSQL }).select('*', 'users').where({
        '$or 1=1 --': [{ 'id': 1 }],
    });
    assertSqlFailed(badLogic, /Invalid SQL logical operator/);

    const badWhereOp = lSql.get({ 'service': lSql.ESERVICE.PGSQL }).select('*', 'users').where([
        ['id', '= 1 OR 1=1 --', 1],
    ]);
    assertSqlFailed(badWhereOp, /Invalid SQL WHERE operator/);

    const badUpdateOp = lSql.get({ 'service': lSql.ESERVICE.PGSQL }).update('users', [
        ['score', '+ 1, role = 9 --', 1],
    ]);
    assertSqlFailed(badUpdateOp, /Invalid SQL UPDATE operator/);

    // --- 普通对象中的数字键不得被当作原始 SQL 条件或运算式 ---
    const numericKeyWhere = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    numericKeyWhere.select('*', 'users').where({
        '0': ['1=1 OR 2=2'],
    });
    assert.strictEqual(numericKeyWhere.getError(), '');
    assert.strictEqual(numericKeyWhere.getSql(), 'SELECT * FROM "users" WHERE 0 IN ($1)');
    assert.deepStrictEqual(numericKeyWhere.getData(), ['1=1 OR 2=2']);

    const numericKeyUpdate = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    numericKeyUpdate.update('users', {
        '0': ['score', '+', 1],
    }).where({ 'id': 1 });
    assert.strictEqual(numericKeyUpdate.getError(), '');
    assert.strictEqual(numericKeyUpdate.getSql(), 'UPDATE "users" SET 0 = $1 WHERE "id" = $2');
    assert.deepStrictEqual(numericKeyUpdate.getData(), [['score', '+', 1], 1]);

    const badJoin = lSql.get({ 'service': lSql.ESERVICE.MYSQL }).select('*', 'users').join('orders', [], 'INNER JOIN x --');
    assertSqlFailed(badJoin, /Invalid SQL JOIN type/);

    const u1 = lSql.get({ 'service': lSql.ESERVICE.MYSQL }).select('*', 'users');
    const u2 = lSql.get({ 'service': lSql.ESERVICE.MYSQL }).select('*', 'users');
    u1.union(u2, 'ALL SELECT 1 --');
    assertSqlFailed(u1, /Invalid SQL UNION type/);

    const badHint = lSql.get({ 'service': lSql.ESERVICE.MYSQL })
        .hint('INDEX(t idx) */ UNION SELECT 1 /*')
        .select('*', 'users');
    assertSqlFailed(badHint, /Invalid SQL optimizer hint/);
    assertSqlFailed(badHint.copy(), /Invalid SQL optimizer hint/);
});

await nodeTest.test('Connection rejects empty SQL without calling the driver', async () => {
    let called = false;
    const fakeLink = {
        'query': () => {
            called = true;
            return Promise.resolve([[], []]);
        },
    };
    const conn = new lDb.Connection({
        'host': '127.0.0.1',
        'port': 3306,
        'user': 'root',
        'pwd': '',
        'name': 'test',
    }, fakeLink as never);
    const q = await conn.query('');
    assert.strictEqual(q.result, -500);
    assert.strictEqual(q.rows, null);
    const e = await conn.execute('   ');
    assert.strictEqual(e.result, -500);
    assert.strictEqual(e.packet, null);
    assert.strictEqual(called, false);
});

await nodeTest.test('lText.parseSafeInt parses safe integers with optional bounds and rejects invalid values', () => {
    assert.strictEqual(lText.parseSafeInt(0), 0);
    assert.strictEqual(lText.parseSafeInt(-0), 0);
    assert.strictEqual(Object.is(lText.parseSafeInt('-0'), 0), true);
    assert.strictEqual(lText.parseSafeInt(' 42 '), 42);
    assert.strictEqual(lText.parseSafeInt('-7'), -7);
    assert.strictEqual(lText.parseSafeInt('10', { 'min': 1, 'max': 20 }), 10);
    assert.strictEqual(lText.parseSafeInt('0', { 'min': 1 }), null);
    assert.strictEqual(lText.parseSafeInt('21', { 'max': 20 }), null);
    assert.strictEqual(lText.parseSafeInt('1.5'), null);
    assert.strictEqual(lText.parseSafeInt('1e2'), null);
    assert.strictEqual(lText.parseSafeInt('10; DROP TABLE x'), null);
    assert.strictEqual(lText.parseSafeInt(Number.MAX_SAFE_INTEGER + 1), null);
    assert.strictEqual(lText.parseSafeInt(null), null);
});

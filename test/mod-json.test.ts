import * as assert from 'node:assert/strict';
import * as nodeTest from 'node:test';

import * as lDb from '#kebab/lib/db.js';
import * as lSql from '#kebab/lib/sql.js';
import * as lText from '#kebab/lib/text.js';
import sMod from '#kebab/sys/mod.js';

class JsonTestMod extends sMod {

    protected static _$table = 'json_test';

    protected static _$primary = 'id';

    declare public id: number;

    declare public data: Record<string, unknown> | unknown[];

    declare public state: number;

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
                'insert': 7,
            },
            'fields': [],
            'error': null,
            'result': 1,
        });
    }

}

await nodeTest.test('Mod.json keeps model values typed and serializes only at the SQL boundary', async () => {
    const fakeDb = new FakeDb();
    const jsonTest = new JsonTestMod({
        'db': fakeDb as unknown as lDb.Pool,
    });
    const objectValue = {
        'source': 'source/test.png',
        'options': ['removeBg'],
    };

    jsonTest.set({
        'data': JsonTestMod.json(objectValue),
        'state': 1,
    });
    assert.strictEqual(jsonTest.data, objectValue);
    assert.strictEqual(await jsonTest.create(), true);
    assert.strictEqual(jsonTest.data, objectValue);
    assert.match(fakeDb.calls[0].sql, /VALUES \(\$1::jsonb, \$2\)/);
    assert.deepStrictEqual(lText.parseJson(fakeDb.calls[0].data[0] as string), objectValue);

    const arrayValue = [{ 'color': 'A01' }, { 'color': 'B02' }];
    jsonTest.set('data', JsonTestMod.json(arrayValue));
    assert.strictEqual(jsonTest.data, arrayValue);
    assert.strictEqual(await jsonTest.save(), true);
    assert.strictEqual(jsonTest.data, arrayValue);
    assert.match(fakeDb.calls[1].sql, /"data" = \$1::jsonb/);
    assert.deepStrictEqual(lText.parseJson(fakeDb.calls[1].data[0] as string), arrayValue);
});

await nodeTest.test('Sql.json keeps JSON equality and direct formatting compatible', () => {
    const jsonValue = { 'source': 'source/test.png' };
    const sql = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    sql.select('*', 'json_test').where({
        'data': lSql.json(jsonValue),
    });

    assert.match(sql.getSql(), /"data" = \$1::jsonb/);
    assert.deepStrictEqual(lText.parseJson(sql.getData()[0] as string), jsonValue);
    assert.strictEqual(
        lSql.format('SELECT ?', [lSql.json(['A01', 'B02'])], lSql.ESERVICE.MYSQL),
        'SELECT \'[\\\"A01\\\",\\\"B02\\\"]\''
    );
});

await nodeTest.test('Sql.json serializes JSON values in insert and update data', () => {
    const insert = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    insert.insert('json_test').values(['data', 'state'], [
        [lSql.json({ 'source': 'source/a.png' }), 1],
        [lSql.json([{ 'color': 'A01' }]), 2],
    ]);

    assert.match(insert.getSql(), /VALUES \(\$1::jsonb, \$2\), \(\$3::jsonb, \$4\)/);
    assert.deepStrictEqual(lText.parseJson(insert.getData()[0] as string), { 'source': 'source/a.png' });
    assert.deepStrictEqual(lText.parseJson(insert.getData()[2] as string), [{ 'color': 'A01' }]);

    const update = lSql.get({ 'service': lSql.ESERVICE.PGSQL });
    update.update('json_test', {
        'data': lSql.json([]),
    }).where({
        'id': 7,
    });

    assert.match(update.getSql(), /"data" = \$1::jsonb/);
    assert.strictEqual(update.getData()[0], '[]');
});

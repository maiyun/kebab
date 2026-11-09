import assert from 'node:assert/strict';
import { test } from 'node:test';
import Mod from '../../sys/mod.js';
import { ESERVICE, Transaction } from '../../lib/db.js';
import { Connection } from '../../lib/db/conn.js';
import pg from 'pg';

const packet = (affected = 1, insert = 7) => ({ packet: { affected, insert }, fields: [], error: null, result: 1 });
const failure = (errno = 1062, message = 'duplicate key') => ({ packet: null, rows: null, fields: [], error: { errno, message }, result: -500 });
const rows = (data = [{ id: 7, uid: 'existing' }]) => ({ rows: data, fields: [], error: null, result: 1 });
class Database {
    constructor(replies = [], service = ESERVICE.PGSQL) { this.replies = [...replies]; this.service = service; this.calls = []; }
    getService() { return this.service; }
    async execute(sql, data = []) { this.calls.push({ method: 'execute', sql, data }); assert.ok(this.replies.length, 'unexpected SQL'); return this.replies.shift(); }
    async query(sql, data = []) { this.calls.push({ method: 'query', sql, data }); assert.ok(this.replies.length, 'unexpected SQL'); return this.replies.shift(); }
    async rollback() { return true; }
    async commit() { return true; }
}
class Generated extends Mod {
    static _$table = 'uid_test';
    static _$key = 'uid';
    sequence = [];
    generated = 0;
    _keyGenerator() { ++this.generated; return this.sequence.shift() ?? 'fresh'; }
}
class Named extends Generated { static _$index = 'uid'; }
class Composite extends Generated { static _$index = ['tenant_uid', 'uid']; }
class MysqlNamed extends Generated { static _$index = 'uid_unique'; }
class Invalid extends Generated { static _$index = ['email']; }
class Plain extends Generated { static _$key = ''; }
const model = (db, sequence = [], Ctor = Generated) => {
    const value = new Ctor({ db });
    value.sequence = [...sequence];
    value.set({ name: 'example', state: 1 });
    return value;
};

for (const transactional of [false, true]) {
    test(`PG auto key retries affected=0 with a targeted conflict clause (${transactional ? 'transaction' : 'pool'})`, async () => {
        const db = new Database([packet(0), packet(0), packet(), rows([{ ok: true }])]);
        const tx = transactional ? new Transaction(null, db) : null;
        try {
            const value = model(tx ?? db, ['taken', 'taken2', 'fresh']);
            assert.equal(await value.create(), true);
            assert.equal(value.generated, 3);
            assert.equal(value.uid, 'fresh');
            assert.equal(value.id, 7);
            assert.deepEqual(value._updates, {});
            assert.deepEqual(db.calls.map(c => c.data.at(-1)), ['taken', 'taken2', 'fresh']);
            assert.ok(db.calls.every(c => /ON CONFLICT \("uid"\) DO NOTHING$/.test(c.sql)));
            assert.equal((await (tx ?? db).query('SELECT 1')).error, null);
        } finally { await tx?.rollback(); }
    });
}

test('PG retries at most three times, leaves pending values and executes no recovery statements', async () => {
    const db = new Database([packet(0), packet(0), packet(0)]);
    const value = model(db, ['a', 'b', 'c', 'unused']);
    assert.equal(await value.create(), false);
    assert.equal(value.generated, 3);
    assert.equal(db.calls.length, 3);
    assert.equal(value._updates.name, true);
    assert.ok(db.calls.every(c => c.sql.startsWith('INSERT ')));
});

for (const [Ctor, target] of [[Named, '("uid")'], [Composite, '("tenant_uid", "uid")']]) {
    test(`PG field configuration emits ${target}`, async () => {
        const db = new Database([packet()]);
        const value = model(db, [], Ctor);
        value.set('tenant_uid', 'tenant-a');
        assert.equal(await value.create(), true);
        assert.ok(db.calls[0].sql.endsWith(`ON CONFLICT ${target} DO NOTHING`));
    });
}

test('PG rejects a retry target that excludes the generated field before executing SQL', async () => {
    const db = new Database();
    const value = model(db, [], Invalid);
    assert.equal(await value.create(), false);
    assert.equal(value.generated, 0);
    assert.equal(db.calls.length, 0);
});

test('PG unrelated unique violation returns null immediately instead of retrying an aborted transaction', async () => {
    const db = new Database([failure()]);
    const value = model(db, ['fresh', 'unused']);
    assert.equal(await value.create(), null);
    assert.equal(value.generated, 1);
    assert.equal(db.calls.length, 1);
});

test('explicit UID uses ordinary INSERT and never regenerates it', async () => {
    const db = new Database([failure()]);
    const value = model(db);
    value.set('uid', 'supplied');
    assert.equal(await value.create(), null);
    assert.equal(value.generated, 0);
    assert.doesNotMatch(db.calls[0].sql, /ON CONFLICT/);
});

test('MySQL uses index names to retry only the generated-key conflict', async () => {
    const db = new Database([failure(1062, "Duplicate entry for key 'uid_test.uid_unique'"), packet()], ESERVICE.MYSQL);
    const value = model(db, ['taken', 'fresh'], MysqlNamed);
    assert.equal(await value.create(), true);
    assert.equal(value.generated, 2);
    assert.ok(db.calls.every(c => !c.sql.includes('ON CONFLICT')));
    const other = new Database([failure(1062, "Duplicate entry for key 'email_unique'")], ESERVICE.MYSQL);
    assert.equal(await model(other, [], MysqlNamed).create(), null);
    assert.equal(other.calls.length, 1);
});

test('MySQL retains unnamed-index retry behavior and rejects field arrays', async () => {
    const db = new Database([failure(), packet()], ESERVICE.MYSQL);
    assert.equal(await model(db).create(), true);
    const invalid = new Database([], ESERVICE.MYSQL);
    assert.equal(await model(invalid, [], Composite).create(), false);
    assert.equal(invalid.calls.length, 0);
});

test('PG upsert preserves the returned existing primary key and UID and updates only mutable fields', async () => {
    const db = new Database([rows()]);
    const value = model(db, ['discarded']);
    value.set('id', 99);
    assert.equal(await value.upsert('name'), true);
    assert.equal(value.generated, 1);
    assert.equal(value.id, 7);
    assert.equal(value.uid, 'existing');
    assert.equal(value.get('uid'), 'existing');
    assert.deepEqual(value._updates, {});
    assert.equal(db.calls[0].method, 'query');
    assert.match(db.calls[0].sql, /ON CONFLICT \("name"\) DO UPDATE SET "state" = \$5 RETURNING "id", "uid"$/);
    assert.deepEqual(db.calls[0].data, ['example', 1, 99, 'discarded', 1]);
});

test('PG upsert uses composite business keys and serializes JSON on both insert and update', async () => {
    const db = new Database([rows([{ id: 8, uid: 'fresh' }])]);
    const value = model(db);
    const payload = { list: [1, 2], enabled: true };
    value.set({ tenant_uid: 'tenant-a', payload: Generated.json(payload) });
    assert.equal(await value.upsert(['tenant_uid', 'name']), true);
    assert.equal(value.uid, 'fresh');
    assert.strictEqual(value.payload, payload);
    assert.match(db.calls[0].sql, /ON CONFLICT \("tenant_uid", "name"\) DO UPDATE SET "state" = \$6, "payload" = \$7::jsonb RETURNING/);
    assert.deepEqual(JSON.parse(db.calls[0].data[3]), payload);
    assert.deepEqual(JSON.parse(db.calls[0].data[6]), payload);
});

for (const [Ctor, supplied] of [[Generated, true], [Plain, false]]) {
    test(`PG upsert handles ${supplied ? 'supplied UID' : 'models without automatic keys'}`, async () => {
        const db = new Database([rows([{ id: 9, uid: 'supplied' }])]);
        const value = model(db, [], Ctor);
        if (supplied) value.set('uid', 'supplied');
        assert.equal(await value.upsert('name'), true);
        assert.equal(value.generated, 0);
        assert.equal(value.id, 9);
        assert.ok(db.calls[0].sql.endsWith(supplied ? 'RETURNING "id", "uid"' : 'RETURNING "id"'));
    });
}

test('PG upsert returns false on a database error or zero returned rows without a second statement', async () => {
    for (const reply of [failure(23505), failure(23503), rows([])]) {
        const db = new Database([reply]);
        const value = model(db);
        assert.equal(await value.upsert('name'), false);
        assert.equal(value.generated, 1);
        assert.equal(db.calls.length, 1);
        assert.equal(value._updates.name, true);
    }
});

test('PG upsert validates business conflict fields and requires a mutable field before executing SQL', async () => {
    for (const conflict of [[], '', 'missing', 'uid', 'id']) {
        const db = new Database();
        const value = model(db);
        value.set({ id: 1, uid: 'explicit' });
        assert.equal(await value.upsert(conflict), false);
        assert.equal(db.calls.length, 0);
    }
    const db = new Database();
    const value = new Generated({ db });
    value.set('name', 'example');
    assert.equal(await value.upsert('name'), false);
    assert.equal(db.calls.length, 0);
});

test('MySQL upsert updates an existing business row without a primary key and returns its real identity', async () => {
    const db = new Database([failure(1062, "Duplicate entry for key 'name_unique'"), rows(), packet()], ESERVICE.MYSQL);
    const value = model(db, ['discarded'], MysqlNamed);
    assert.equal(value.id, undefined);
    assert.equal(await value.upsert('name'), true);
    assert.equal(value.id, 7);
    assert.equal(value.uid, 'existing');
    assert.equal(value.get('uid'), 'existing');
    assert.deepEqual(value._updates, {});
    assert.match(db.calls[1].sql, /^SELECT `id`, `uid` FROM .* WHERE `name` = \? LIMIT 1 FOR UPDATE$/);
    assert.match(db.calls[2].sql, /^UPDATE .* SET `state` = \? WHERE `name` = \? AND `id` = \? AND `uid` = \?$/);
    assert.deepEqual(db.calls[2].data, [1, 'example', 7, 'existing']);
});

test('MySQL upsert inserts a new row without a lookup or update', async () => {
    const db = new Database([packet()], ESERVICE.MYSQL);
    const value = model(db, ['new'], MysqlNamed);
    assert.equal(await value.upsert('name'), true);
    assert.equal(value.uid, 'new');
    assert.equal(value.id, 7);
    assert.equal(db.calls.length, 1);
});

test('MySQL upsert retries UID collisions before handling the business collision', async () => {
    const db = new Database([
        failure(1062, "Duplicate entry for key 'uid_unique'"),
        failure(1062, "Duplicate entry for key 'name_unique'"), rows(), packet()
    ], ESERVICE.MYSQL);
    const value = model(db, ['taken', 'discarded'], MysqlNamed);
    assert.equal(await value.upsert('name'), true);
    assert.equal(value.generated, 2);
    assert.equal(value.uid, 'existing');
    assert.equal(db.calls.length, 4);
});

test('MySQL upsert does not overwrite primary/UID/conflict fields and retains JSON serialization', async () => {
    const db = new Database([failure(), rows(), packet()], ESERVICE.MYSQL);
    const value = model(db, [], MysqlNamed);
    const payload = { values: ['a', 'b'] };
    value.set({ id: 99, uid: 'explicit', tenant_uid: 'tenant-a', payload: Mod.json(payload) });
    assert.equal(await value.upsert(['tenant_uid', 'name']), true);
    assert.equal(value.generated, 0);
    assert.equal(value.id, 7);
    assert.equal(value.uid, 'existing');
    assert.strictEqual(value.payload, payload);
    assert.match(db.calls[2].sql, /SET `state` = \?, `payload` = \? WHERE `tenant_uid` = \? AND `name` = \? AND `id` = \? AND `uid` = \?$/);
    assert.deepEqual(JSON.parse(db.calls[2].data[1]), payload);
    assert.deepEqual(value._jsonUpdates, {});
});

test('MySQL upsert leaves all pending fields intact on failed lookup, missing business row or failed update', async () => {
    for (const replies of [
        [failure(), rows([])],
        [failure(), failure(999)],
        [failure(), rows(), failure()],
        [failure(), rows(), packet(0)],
    ]) {
        const db = new Database(replies, ESERVICE.MYSQL);
        const value = model(db, [], MysqlNamed);
        value.set({ id: 99, uid: 'supplied', payload: Mod.json({ pending: true }) });
        const pending = { ...value._updates };
        assert.equal(await value.upsert('name'), false);
        assert.deepEqual(value._updates, pending);
        assert.equal(value._jsonUpdates.payload, true);
        assert.equal(value.id, 99);
        assert.equal(value.uid, 'supplied');
        assert.equal(db.calls.length, replies.length);
    }
});

test('MySQL upsert preserves the retry limit and never falls through to update after exhaustion', async () => {
    const duplicate = failure(1062, "Duplicate entry for key 'uid_unique'");
    const db = new Database([duplicate, duplicate, duplicate], ESERVICE.MYSQL);
    const value = model(db, ['a', 'b', 'c'], MysqlNamed);
    assert.equal(await value.upsert('name'), false);
    assert.equal(value.generated, 3);
    assert.equal(db.calls.length, 3);
    assert.ok(db.calls.every(call => call.method === 'execute' && call.sql.startsWith('INSERT ')));
});

for (const service of [ESERVICE.MYSQL, ESERVICE.PGSQL]) {
    test(`save with an explicit business predicate needs no primary key (${service})`, async () => {
        const db = new Database([packet()], service);
        const value = new Plain({ db });
        const payload = { saved: true };
        value.set({ state: 2, payload: Mod.json(payload) });
        assert.equal(await value.save({ name: 'example' }), true);
        assert.deepEqual(db.calls[0].data.slice(-1), ['example']);
        assert.deepEqual(JSON.parse(db.calls[0].data[1]), payload);
        assert.strictEqual(value.payload, payload);
        assert.equal(value.id, undefined);
        assert.deepEqual(value._updates, {});
    });

    test(`save still rejects missing primary and omitted or empty predicates (${service})`, async () => {
        for (const where of [undefined, null, '', {}, []]) {
            const db = new Database([], service);
            const value = model(db);
            assert.equal(await value.save(where), false);
            assert.equal(db.calls.length, 0);
            assert.equal(value._updates.state, true);
        }
    });

    test(`save retains pending JSON on failure and uses primary by default (${service})`, async () => {
        const db = new Database([failure()], service);
        const value = new Plain({ db, row: { id: 5 } });
        value.set('payload', Mod.json({ retry: true }));
        assert.equal(await value.save(), false);
        assert.equal(db.calls[0].data.at(-1), 5);
        assert.equal(value._updates.payload, true);
        assert.equal(value._jsonUpdates.payload, true);
    });

    test(`upsert validates business keys before SQL on both backends (${service})`, async () => {
        for (const conflict of [[], '', 'id', 'uid', 'missing', ['name', 'missing']]) {
            const db = new Database([], service);
            const value = model(db, [], MysqlNamed);
            value.set({ id: 2, uid: 'supplied' });
            assert.equal(await value.upsert(conflict), false);
            assert.equal(db.calls.length, 0);
            assert.equal(value._updates.name, true);
        }
    });
}

test('real Connection query returns explicit PG RETURNING rows without changing the SQL', async () => {
    const client = new pg.Client();
    const calls = [];
    client.query = async (sql, values) => { calls.push({ sql, values }); return { rows: [{ id: 11, uid: 'old' }], fields: [], rowCount: 1 }; };
    const connection = new Connection({}, client);
    const value = model(connection);
    assert.equal(await value.upsert('name'), true);
    assert.equal(value.uid, 'old');
    assert.equal(value.id, 11);
    assert.equal(calls.length, 1);
    assert.ok(calls[0].sql.endsWith('RETURNING "id", "uid"'));
});

for (const service of [ESERVICE.MYSQL, ESERVICE.PGSQL]) {
    test(`save rejects explicit empty predicates even when the model has a primary key (${service})`, async () => {
        for (const where of ['', {}, []]) {
            const db = new Database([], service);
            const value = new Plain({ db, row: { id: 7 } });
            value.set('state', 2);
            assert.equal(await value.save(where), false);
            assert.equal(db.calls.length, 0);
            assert.equal(value._updates.state, true);
        }
    });
    test(`upsert rejects NULL update keys but accepts empty string and zero (${service})`, async () => {
        const invalid = new Database([], service);
        const value = model(invalid, [], MysqlNamed);
        value.set('name', null);
        assert.equal(await value.upsert('name'), false);
        assert.equal(invalid.calls.length, 0);
        for (const key of ['', 0]) {
            const db = new Database([service === ESERVICE.MYSQL ? packet() : rows()], service);
            const valid = model(db, [], MysqlNamed);
            valid.set('name', key);
            assert.equal(await valid.upsert('name'), true);
        }
    });
}

for (const service of [ESERVICE.MYSQL, ESERVICE.PGSQL]) {
    test(`upsert requires explicit business keys and mutable fields before SQL (${service})`, async () => {
        for (const fields of [{ name: 'only-key' }, { name: null, state: 1 }, { state: 1 }]) {
            const db = new Database([], service);
            const value = new MysqlNamed({ db });
            value.set(fields);
            assert.equal(await value.upsert('name'), false);
            assert.equal(value.generated, 0);
            assert.equal(db.calls.length, 0);
            assert.deepEqual(value._updates, Object.fromEntries(Object.keys(fields).map(key => [key, true])));
        }
    });
}

import assert from 'node:assert/strict';
import { test } from 'node:test';
import Mod from '../../sys/mod.js';
import { ESERVICE } from '../../lib/db.js';

const packet = (affected = 1, insert = 7) => ({ packet: { affected, insert }, error: null });
const rows = (...values) => ({ rows: values, error: null });
const failure = () => ({ rows: null, packet: null, error: { message: 'test failure', errno: 1 } });
class Database {
    constructor(replies = [], service = ESERVICE.PGSQL) { this.replies = replies; this.service = service; this.calls = []; }
    getService() { return this.service; }
    async execute(sql, data) { return this.query(sql, data); }
    async query(sql, data) {
        this.calls.push({ sql, data: [...data] });
        assert.ok(this.replies.length, `Unexpected SQL: ${sql}`);
        return this.replies.shift();
    }
}
class Plain extends Mod { static _$table = 'orders'; }
class Range extends Plain { static _$partition = ['time_push']; }
class Hash extends Plain { static _$partition = ['tenant', 'bucket']; }
const whereValues = call => call.data.slice((call.sql.split(' WHERE ')[0].match(/\?|\$\d+/g) ?? []).length);

for (const service of [ESERVICE.PGSQL, ESERVICE.MYSQL]) {
    for (const [Ctor, row, expected] of [
        [Range, { id: 7, time_push: 100 }, [7, 100]],
        [Hash, { id: 7, tenant: 'a', bucket: 0 }, [7, 'a', 0]],
        [Plain, { id: 7 }, [7]],
    ]) {
        test(`${service} ${Ctor.name}: save/remove/refresh use complete default identity`, async () => {
            const db = new Database([packet(), rows(row), packet()], service);
            const value = new Ctor({ db, row });
            value.set('name', 'updated');
            assert.equal(await value.save(), true);
            assert.equal(await value.refresh(true), true);
            assert.equal(await value.remove(), true);
            for (const call of db.calls) assert.deepEqual(whereValues(call), expected);
            assert.match(db.calls[1].sql, /FOR UPDATE/);
        });
    }
    test(`${service}: failed writes preserve original routing and pending data`, async () => {
        for (const fail of [failure(), packet(0)]) {
            const db = new Database([fail, packet()], service);
            const value = new Range({ db, row: { id: 7, time_push: 100 } });
            value.set('name', 'updated');
            assert.equal(await value.save(), false);
            assert.equal(value.get('name'), 'updated');
            assert.equal(await value.save(), true);
            assert.deepEqual(db.calls.map(whereValues), [[7, 100], [7, 100]]);
        }
    });
    test(`${service}: missing partition refuses SQL`, async () => {
        for (const operation of ['save', 'remove', 'refresh']) {
            const db = new Database([], service);
            const value = new Range({ db, row: { id: 7 } });
            value.set('name', 'pending');
            assert.equal(await value[operation](), false);
            assert.equal(db.calls.length, 0);
        }
    });
    test(`${service}: explicit save predicates retain caller semantics`, async () => {
        const db = new Database([packet()], service);
        const value = new Range({ db, row: { id: 7 } });
        value.set('name', 'pending');
        assert.equal(await value.save({ id: 7, time_push: 123, tenant: 'a' }), true);
        assert.deepEqual(whereValues(db.calls[0]), [7, 123, 'a']);
        for (const where of ['', {}, []]) {
            value.set('name', 'again');
            assert.equal(await value.save(where), false);
        }
        assert.equal(db.calls.length, 1);
    });
    test(`${service}: create records partition values for following operations`, async () => {
        const db = new Database([packet(), packet()], service);
        const value = new Range({ db });
        value.set({ name: 'new', time_push: 100 });
        assert.equal(await value.create(), true);
        value.set('name', 'updated');
        assert.equal(await value.save(), true);
        assert.deepEqual(whereValues(db.calls[1]), [7, 100]);
    });
    test(`${service}: first and all load fields for default operations`, async () => {
        const db = new Database([rows({ id: 7, time_push: 100 }), packet(), rows({ id: 8, time_push: 200 }), packet()], service);
        const first = await Range.where(db, { id: 7 }).first();
        first.set('name', 'updated');
        assert.equal(await first.save(), true);
        const all = await Range.where(db, {}).all();
        assert.equal(await all.item(0).remove(), true);
        assert.deepEqual(whereValues(db.calls[1]), [7, 100]);
        assert.deepEqual(whereValues(db.calls[3]), [8, 200]);
    });
}

test('refresh keeps the complete WHERE on failure and success', async () => {
    const db = new Database([failure(), rows(), rows({ id: 7, time_push: 100 }), packet()]);
    const value = new Range({ db, row: { id: 7, time_push: 100 } });
    value.set('name', 'updated');
    assert.equal(await value.refresh(), false);
    assert.equal(await value.refresh(), null);
    assert.equal(await value.refresh(), true);
    assert.equal(value.get('time_push'), 100);
    assert.equal(await value.remove(), true);
    assert.ok(db.calls.every(call => JSON.stringify(whereValues(call)) === '[7,100]'));
});

test('upsert reads actual PostgreSQL partition value then supports default save', async () => {
    const db = new Database([rows({ id: 7, time_push: 123 }), packet()]);
    const value = new Range({ db });
    value.set({ name: 'unique', state: 1 });
    assert.equal(await value.upsert('name'), true);
    assert.match(db.calls[0].sql, /RETURNING "id", "time_push"/);
    value.set('state', 2);
    assert.equal(await value.save(), true);
    assert.deepEqual(whereValues(db.calls[1]), [7, 123]);
});

test('MySQL upsert retains partition fields for subsequent operations', async () => {
    const duplicate = failure(); duplicate.error.errno = 1062;
    const db = new Database([duplicate, rows({ id: 7, time_push: 100 }), packet(), packet()], ESERVICE.MYSQL);
    const value = new Range({ db });
    value.set({ name: 'unique', state: 2 });
    assert.equal(await value.upsert('name'), true);
    assert.equal(value.get('time_push'), 100);
    assert.deepEqual(whereValues(db.calls[2]), ['unique', 7, 100]);
    assert.equal(await value.remove(), true);
    assert.deepEqual(whereValues(db.calls[3]), [7, 100]);
});


test('NULL partition values are retained as IS NULL predicates', async () => {
    const db = new Database([packet()]);
    const value = new Range({ db, row: { id: 7, time_push: null } });
    assert.equal(await value.remove(), true);
    assert.match(db.calls[0].sql, /"time_push" IS NULL/);
});


for (const value of [new Date('2026-11-01T00:00:00Z'), Buffer.from('abc'), true, 10n]) {
    test(`partition value ${typeof value} uses parameter equality rather than an IN expression`, async () => {
        const db = new Database([packet()]);
        const record = new Range({ db, row: { id: 7, time_push: value } });
        assert.equal(await record.remove(), true);
        assert.match(db.calls[0].sql, /"time_push" = \$2/);
        assert.deepEqual(db.calls[0].data[1], value);
    });
}






for (const part of [new Date('2026-11-01T00:00:00Z'), Buffer.from('ab'), true, 10n]) {
    test(`MySQL upsert with ${typeof part} partition business key uses equality in lookup`, async () => {
        const duplicate = failure(); duplicate.error.errno = 1062;
        const db = new Database([duplicate, rows({ id: 7, time_push: part }), packet(), packet()], ESERVICE.MYSQL);
        const value = new Range({ db });
        value.set({ time_push: part, name: 'updated' });
        assert.equal(await value.upsert('time_push'), true);
        assert.match(db.calls[1].sql, /WHERE `time_push` = \? LIMIT 1 FOR UPDATE/);
        assert.deepEqual(db.calls[1].data, [part]);
        assert.equal(await value.remove(), true);
        assert.deepEqual(whereValues(db.calls[3]), [7, part]);
    });
}

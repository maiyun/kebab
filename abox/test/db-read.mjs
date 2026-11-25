import assert from 'node:assert/strict';
import test from 'node:test';
import * as lDb from '#kebab/lib/db.js';
import * as sCtr from '#kebab/sys/ctr.js';
import Mod from '#kebab/sys/mod.js';

function createMockCtr(dbConfig) {
    const ctr = Object.create(sCtr.Ctr.prototype);
    ctr.getPrototype = (key) => {
        if (key === '_config') {
            return {
                'db': dbConfig,
                'sql': {
                    'pre': '',
                },
            };
        }
        return undefined;
    };
    return ctr;
}

class TestMod extends Mod {
    static _$table = 'items';
    static _$primary = 'id';
}

test('lDb.get fixes ESERVICE.MYSQL (0) falsy bug when default service is PGSQL', () => {
    const ctr = createMockCtr({
        'default': 'PGSQL',
        'MYSQL': {
            'default': {
                'host': '10.0.1.1',
                'port': 3306,
                'charset': 'utf8mb4',
                'name': 'mysql_db',
                'user': 'muser',
                'pwd': 'mpwd',
            },
        },
        'PGSQL': {
            'default': {
                'host': '10.0.2.1',
                'port': 5432,
                'name': 'pg_db',
                'user': 'puser',
                'pwd': 'ppwd',
            },
        },
    });

    const poolMysql = lDb.get(ctr, { 'service': lDb.ESERVICE.MYSQL });
    assert.equal(poolMysql.getService(), lDb.ESERVICE.MYSQL);
    assert.equal(poolMysql.getName(), 'mysql_db');

    const poolDefault = lDb.get(ctr);
    assert.equal(poolDefault.getService(), lDb.ESERVICE.PGSQL);
    assert.equal(poolDefault.getName(), 'pg_db');
});

test('Pool routes conservatively: default primary, opt.read to replica(s), inherits primary fields, ignores empty host', async () => {
    const ctr = createMockCtr({
        'default': 'PGSQL',
        'PGSQL': {
            'default': {
                'host': '10.0.0.1',
                'port': 5432,
                'name': 'app',
                'user': 'app_user',
                'pwd': 'secret',
            },
            'read': [
                { 'host': '10.0.0.2' },
                { 'host': '10.0.0.3', 'port': 5433, 'user': 'ro_user' },
                { 'host': '' },
            ],
        },
    });

    const pool = lDb.get(ctr);
    const seen = [];
    pool._getConnection = async (targetEtc = pool._etc) => {
        seen.push(targetEtc);
        return {
            query: async () => ({ 'rows': [{ 'ok': 1 }], 'fields': [], 'error': null, 'result': 1 }),
            execute: async () => ({ 'packet': { 'affected': 1, 'insert': 0 }, 'fields': [], 'error': null, 'result': 1 }),
            beginTransaction: async () => true,
        };
    };

    // 默认查询走主库
    await pool.query('SELECT 1');
    assert.equal(seen.at(-1).host, '10.0.0.1');

    // 显式 read: false 走主库
    await pool.query('SELECT 1', [], { 'read': false });
    assert.equal(seen.at(-1).host, '10.0.0.1');

    // execute 和 beginTransaction 永远走主库
    await pool.execute('UPDATE items SET name = $1', ['a']);
    assert.equal(seen.at(-1).host, '10.0.0.1');
    const tran = await pool.beginTransaction(null);
    assert.ok(tran);
    assert.equal(seen.at(-1).host, '10.0.0.1');
    // 清理事务计时器
    tran._conn = { rollback: async () => true };
    await tran.rollback();

    // 显式 read: true 走从库并继承主库缺省字段
    const readHosts = new Set();
    for (let i = 0; i < 30; ++i) {
        await pool.query('SELECT 1', [], { 'read': true });
        const target = seen.at(-1);
        readHosts.add(target.host);
        if (target.host === '10.0.0.2') {
            assert.equal(target.port, 5432);
            assert.equal(target.name, 'app');
            assert.equal(target.user, 'app_user');
            assert.equal(target.pwd, 'secret');
        }
        else if (target.host === '10.0.0.3') {
            assert.equal(target.port, 5433);
            assert.equal(target.name, 'app');
            assert.equal(target.user, 'ro_user');
            assert.equal(target.pwd, 'secret');
        }
        else {
            assert.fail(`unexpected read host: ${target.host}`);
        }
    }
    assert.ok(readHosts.has('10.0.0.2'));
    assert.ok(readHosts.has('10.0.0.3'));
});

test('Pool falls back to primary when read config is omitted or has empty host', async () => {
    const ctr = createMockCtr({
        'default': 'PGSQL',
        'PGSQL': {
            'default': {
                'host': '10.0.0.1',
                'port': 5432,
                'name': 'app',
                'user': 'app_user',
                'pwd': 'secret',
            },
        },
    });

    const pool = lDb.get(ctr);
    let lastTarget = null;
    pool._getConnection = async (targetEtc = pool._etc) => {
        lastTarget = targetEtc;
        return {
            query: async () => ({ 'rows': [], 'fields': [], 'error': null, 'result': 1 }),
        };
    };

    await pool.query('SELECT 1', [], { 'read': true });
    assert.equal(lastTarget.host, '10.0.0.1');
});

test('Transaction.query ignores opt.read and stays on transaction connection', async () => {
    let calledSql = '';
    const fakeConn = {
        getService: () => lDb.ESERVICE.PGSQL,
        query: async (sql) => {
            calledSql = sql;
            return { 'rows': [{ 'id': 1 }], 'fields': [], 'error': null, 'result': 1 };
        },
        rollback: async () => true,
    };
    const tran = new lDb.Transaction(null, fakeConn);
    const res = await tran.query('SELECT 1', [], { 'read': true });
    assert.equal(calledSql, 'SELECT 1');
    assert.equal(res.result, 1);
    await tran.rollback();
});

test('Mod supports explicit read via .read() and opt.read, enforces primary on lock/refresh/save', async () => {
    const calls = [];
    const fakeDb = {
        getService: () => lDb.ESERVICE.PGSQL,
        query: async (sql, _values, opt) => {
            calls.push({ 'kind': 'query', 'sql': sql, 'read': Boolean(opt?.read) });
            if (sql.includes('COUNT(')) {
                return { 'rows': [{ 'count': 1 }], 'fields': [], 'error': null, 'result': 1 };
            }
            return { 'rows': [{ 'id': 1, 'name': 'demo' }], 'fields': [], 'error': null, 'result': 1 };
        },
        execute: async (sql) => {
            calls.push({ 'kind': 'execute', 'sql': sql });
            return { 'packet': { 'affected': 1, 'insert': 0 }, 'fields': [], 'error': null, 'result': 1 };
        },
    };

    // 默认查询走主库
    await TestMod.find(fakeDb, 1);
    assert.equal(calls.at(-1).read, false);

    // 显式 read: true 走从库
    const found = await TestMod.find(fakeDb, 1, { 'read': true });
    assert.equal(calls.at(-1).read, true);

    // 返回的实体 refresh 和 save 走主库
    await found.refresh();
    assert.equal(calls.at(-1).kind, 'query');
    assert.equal(calls.at(-1).read, false);
    found.set('name', 'updated');
    await found.save();
    assert.equal(calls.at(-1).kind, 'execute');

    // 加锁查询即使带 read: true 也强制走主库
    await TestMod.find(fakeDb, 1, { 'read': true, 'lock': true });
    assert.equal(calls.at(-1).read, false);

    await TestMod.one(fakeDb, { 'id': 1 }, { 'read': true, 'lock': true });
    assert.equal(calls.at(-1).read, false);

    await TestMod.oneArray(fakeDb, { 'id': 1 }, { 'read': true });
    assert.equal(calls.at(-1).read, true);

    await TestMod.primarys(fakeDb, { 'id': 1 }, { 'read': true });
    assert.equal(calls.at(-1).read, true);

    // 链式 .read() 覆盖 all / allArray / count / total
    const rows = await TestMod.where(fakeDb, { 'id': 1 }).read().all();
    assert.equal(calls.at(-1).read, true);
    assert.equal(rows.length, 1);
    // all() 返回的子模型实例不继承只读标记
    await rows.item(0).refresh();
    assert.equal(calls.at(-1).read, false);

    await TestMod.where(fakeDb, { 'id': 1 }).read().allArray();
    assert.equal(calls.at(-1).read, true);

    await TestMod.where(fakeDb, { 'id': 1 }).read().count();
    assert.equal(calls.at(-1).read, true);

    await TestMod.where(fakeDb, { 'id': 1 }).read().total();
    assert.equal(calls.at(-1).read, true);
});

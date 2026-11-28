import * as assert from 'node:assert/strict';
import * as nodeTest from 'node:test';

import * as lDb from '#kebab/lib/db.js';
import { Connection } from '#kebab/lib/db/conn.js';
import { Pool } from '#kebab/lib/db/pool.js';

interface IFakeConnection {
    beginTransaction(logError?: boolean): Promise<boolean>;
    rollback(): Promise<boolean>;
}

interface ITestPool {
    _getConnection(): Promise<IFakeConnection | null>;
}

interface ITestConnection {
    '_last': number;
}

await nodeTest.test('Connection can be reserved for maintenance without refreshing its last use time', () => {
    const connection = new Connection({
        'host': 'test',
        'port': 5432,
        'name': 'test',
        'user': 'test',
        'pwd': 'test',
    }, {} as ConstructorParameters<typeof Connection>[1]);
    (connection as unknown as ITestConnection)._last = 1;

    assert.strictEqual(connection.using({ 'refreshLast': false }), true);
    assert.strictEqual(connection.getLast(), 1);
    assert.strictEqual(connection.using(), false);
});

await nodeTest.test('Connection cannot be acquired while it is closing', async () => {
    let finishEnd: (() => void) | undefined;
    const link = {
        'end': (): Promise<void> => new Promise(resolve => {
            finishEnd = resolve;
        }),
    } as unknown as ConstructorParameters<typeof Connection>[1];
    const connection = new Connection({
        'host': 'test',
        'port': 5432,
        'name': 'test',
        'user': 'test',
        'pwd': 'test',
    }, link);

    const ending = connection.end();
    assert.strictEqual(connection.isLost(), true);
    assert.strictEqual(connection.using(), false);
    finishEnd?.();
    assert.strictEqual(await ending, true);
});

await nodeTest.test('Pool retries BEGIN once with another connection', async () => {
    const pool = new Pool({
        'host': 'test',
        'port': 5432,
        'name': 'test',
        'user': 'test',
        'pwd': 'test',
    }, {
        'service': lDb.ESERVICE.PGSQL,
    });
    let attempts = 0;
    const logErrors: boolean[] = [];
    (pool as unknown as ITestPool)._getConnection = (): Promise<IFakeConnection> => {
        ++attempts;
        return Promise.resolve({
            'beginTransaction': (logError = true) => {
                logErrors.push(logError);
                return Promise.resolve(attempts === 2);
            },
            'rollback': () => Promise.resolve(true),
        });
    };

    const transaction = await pool.beginTransaction(null);
    assert.notStrictEqual(transaction, null);
    assert.strictEqual(attempts, 2);
    assert.deepStrictEqual(logErrors, [false, true]);
    assert.strictEqual(await transaction?.rollback(), true);
});

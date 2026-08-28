import * as assert from 'node:assert/strict';
import * as nodeTest from 'node:test';

import * as lDb from '#kebab/lib/db.js';
import { Pool } from '#kebab/lib/db/pool.js';

interface IFakeConnection {
    beginTransaction(): Promise<boolean>;
    rollback(): Promise<boolean>;
}

interface ITestPool {
    _getConnection(): Promise<IFakeConnection | null>;
}

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
    (pool as unknown as ITestPool)._getConnection = (): Promise<IFakeConnection> => {
        ++attempts;
        return Promise.resolve({
            'beginTransaction': () => Promise.resolve(attempts === 2),
            'rollback': () => Promise.resolve(true),
        });
    };

    const transaction = await pool.beginTransaction(null);
    assert.notStrictEqual(transaction, null);
    assert.strictEqual(attempts, 2);
    assert.strictEqual(await transaction?.rollback(), true);
});

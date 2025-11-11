import * as lCore from '#kebab/lib/core.js';
import * as sCtr from '#kebab/sys/ctr.js';
import * as lDb from '#kebab/lib/db.js';
import * as kebab from '#kebab/index.js';

import * as conn from './conn.js';

/** --- 事务连接对象，commit 和 rollback 后将无法使用 --- */
export class Transaction {

    /** --- SQL 执行次数 --- */
    private _queries: number = 0;

    /** --- 连接对象 --- */
    private _conn: conn.Connection | null;

    private readonly _ctr: sCtr.Ctr | null;

    // --- 事务时长监听 timer ---
    private readonly _timer: {
        'warning'?: NodeJS.Timeout;
        'danger'?: NodeJS.Timeout;
    } = {
            'warning': undefined,
            'danger': undefined
        };

    public constructor(ctr: sCtr.Ctr | null, conn: conn.Connection, opts: {
        'warning'?: number;
        'danger'?: number;
    } = {}) {
        // --- 进来的连接对象直接是事务独占模式 ---
        this._ctr = ctr;
        if (ctr) {
            ++ctr.getPrototype('_waitInfo').transaction;
        }
        this._conn = conn;
        // --- 事务时长监听 ---
        const warning = opts.warning ?? 1_500;
        this._timer.warning = setTimeout(() => {
            this._timer.warning = undefined;
            lCore.display('[WARNING][DB][Transaction] time too long, ms: ' + warning + ' ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr'));
        }, warning);
        const danger = opts.danger ?? 5_000;
        this._timer.danger = setTimeout(() => {
            this._timer.danger = undefined;
            lCore.display('[DANGER][DB][Transaction] time too long, ms:', danger, this._ctr?.getPrototype('_config').const.path ?? 'no ctr');
        }, danger);
    }

    /** --- 获取当前连接的服务商 --- */
    public getService(): lDb.ESERVICE | null {
        return this._conn?.getService() ?? null;
    }

    /**
     * --- 在事务连接中执行一条 SQL ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async query(sql: string, values?: kebab.DbValue[]): Promise<lDb.IData> {
        if (!this._conn) {
            // --- 当前连接已不可用 ---
            lCore.display('[DB][Transaction][query] has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr') + ': ' + sql);
            lCore.log({}, '[DB][Transaction][query] has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr') + ': ' + sql, '-error');
            return {
                'rows': null,
                'fields': [],
                'error': {
                    'message': 'false',
                    'errno': 0,
                },
                'result': -500,
            };
        }
        ++this._queries;
        return this._conn.query(sql, values);
    }

    /**
     * --- 执行一条 SQL 并获得影响行数对象 packet，连接失败抛出错误 ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async execute(sql: string, values?: kebab.DbValue[]): Promise<lDb.IPacket> {
        if (!this._conn) {
            // --- 当前连接已不可用 ---
            lCore.display('[DB][Transaction][execute] has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr') + ': ' + sql);
            lCore.log({}, '(db.Transaction.execute) has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr') + ': ' + sql, '-error');
            return {
                'packet': null,
                'fields': [],
                'error': {
                    'message': 'null',
                    'errno': 0,
                },
                'result': -500,
            };
        }
        ++this._queries;
        return this._conn.execute(sql, values);
    }

    public async commit(): Promise<boolean> {
        if (!this._conn) {
            // --- 当前连接已不可用 ---
            lCore.display('[DB][Transaction][commit] has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr'));
            lCore.log({}, '[DB][Transaction][commit] has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr'), '-error');
            return false;
        }
        const r = await this._conn.commit();
        if (!r) {
            return false;
        }
        this._conn = null;
        if (this._ctr) {
            --this._ctr.getPrototype('_waitInfo').transaction;
        }
        clearTimeout(this._timer.warning);
        this._timer.warning = undefined;
        clearTimeout(this._timer.danger);
        this._timer.danger = undefined;
        return true;
    }

    public async rollback(): Promise<boolean> {
        if (!this._conn) {
            // --- 当前连接已不可用 ---
            lCore.display('[DB][Transaction][rollback] has been closed: ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr'));
            lCore.log({}, '[DB][Transaction][rollback] has been closed: ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr'), '-error');
            return false;
        }
        const r = await this._conn.rollback();
        if (!r) {
            return false;
        }
        this._conn = null;
        if (this._ctr) {
            --this._ctr.getPrototype('_waitInfo').transaction;
        }
        clearTimeout(this._timer.warning);
        this._timer.warning = undefined;
        clearTimeout(this._timer.danger);
        this._timer.danger = undefined;
        return true;
    }

}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-4-15 13:40
 * Last: 2020-4-13 15:34:45, 2022-09-12 13:10:34, 2023-5-24 18:29:38, 2024-7-11 14:37:54, 2024-8-25 00:32:53, 2024-9-22 17:30:47, 2025-8-3 20:24:03
 */

// --- Pool 是使用时必须要一个用户创建一份的，Connection 是池子里获取的 ---

// --- 第三方 ---
import * as mysql2 from 'mysql2/promise';
// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as lTime from '#kebab/lib/time.js';
import * as lSql from '#kebab/lib/sql.js';
import * as lCore from '#kebab/lib/core.js';
import * as sCtr from '#kebab/sys/ctr.js';

/** --- query 返回的数据 --- */
export interface IData {
    'rows': any[] | null;
    'fields': mysql2.FieldPacket[];
    'error': {
        'message': string;
        'errno': number;
        [key: string]: any;
    } | null;
    /** --- 1-正常,-500-服务器错误 --- */
    'result': number;
}

/** --- exec 返回对象 --- */
export interface IPacket {
    'packet': mysql2.ResultSetHeader | null;
    'fields': mysql2.FieldPacket[];
    'error': {
        'message': string;
        'errno': number;
        [key: string]: any;
    } | null;
}

/** --- 连接信息 --- */
export interface IConnectionInfo {
    'id': number;
    'last': number;
    'host': string;
    'port': number;
    'name': string;
    'user': string;

    'lost': boolean;
    'using': boolean;
    'transaction': boolean;
}

/** --- 连接列表池 --- */
const connections: Connection[] = [];

/**
 * --- 计划任务 10 秒一次，关闭超过 30 秒不活动的连接，回滚独占时间过长的连接 ---
 */
async function checkConnection(): Promise<void> {
    const now: number = lTime.stamp();
    for (let i = 0; i < connections.length; ++i) {
        const connection = connections[i];
        if (connection.isLost()) {
            // --- 连接已经丢失，移除 ---
            await connection.end();
            connections.splice(i, 1);
            --i;
            continue;
        }
        if (connection.isUsing()) {
            // --- 连接正在被使用，看看是否空闲了超过 30 秒，超过则不是正常状态 ---
            if (connection.getLast() <= now - 30) {
                // --- 30 秒之前开始的 ---
                const ls = connection.getLastSql();
                const newarr = ls.map(item => {
                    if (!item.values) {
                        return item.sql;
                    }
                    return lSql.format(item.sql, item.values);
                });
                const msg = `[DB][checkConnection] There is a transactional connection[${i}] that is not closed, last sql: ${newarr.join(', ')}.`;
                lCore.display(msg);
                lCore.log({}, msg, '-error');
                await connection.rollback();
            }
            continue;
        }
        if (connection.getLast() <= now - 30) {
            // --- 超 30 秒未被使用，则关闭 ---
            await connection.end();
            connections.splice(i, 1);
            --i;
            continue;
        }
        // --- 30 秒内使用过，看看连接是否正常 ---
        if (await connection.isAvailable(false)) {
            // --- 正常 ---
            continue;
        }
        // --- 连接有问题，直接关闭 ---
        await connection.end();
        connections.splice(i, 1);
        --i;
    }
    setTimeout(function() {
        checkConnection().catch(e => { lCore.display('[DB][checkConnection]', e); });
    }, 10_000);
}
setTimeout(function() {
    checkConnection().catch(e => { lCore.display('[DB][checkConnection]', e); });
}, 10_000);

/** --- 数据库连接池对象 --- */
export class Pool {

    /** --- SQL 执行次数 --- */
    private _queries: number = 0;

    /** --- 当前 Pool 对象的数据库连接信息 --- */
    private readonly _etc: kebab.IConfigDb;

    public constructor(etc: kebab.IConfigDb) {
        this._etc = etc;
    }

    /**
     * --- 执行一条 SQL，无视顺序和相同连接，随用随取 ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     * @returns error.errno = -500 表示系统错误
     */
    public async query(sql: string, values?: kebab.DbValue[]): Promise<IData> {
        ++this._queries;
        // --- 获取并自动 using  ---
        const conn = await this._getConnection();
        if (!conn) {
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
        // --- 执行一次后自动解除 using ---
        return conn.query(sql, values);
    }

    /**
     * --- 执行一条 SQL 并获得影响行数对象 packet，连接失败抛出错误 ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async execute(sql: string, values?: kebab.DbValue[]): Promise<IPacket> {
        ++this._queries;
        const conn = await this._getConnection();
        if (!conn) {
            return {
                'packet': null,
                'fields': [],
                'error': {
                    'message': 'null',
                    'errno': 0
                }
            };
        }
        return conn.execute(sql, values);
    }

    /**
     * --- 开启事务，返回事务对象并锁定连接，别人任何人不可用，有 ctr 的话必传 this，独立执行时可传 null ---
     */
    public async beginTransaction(ctr: sCtr.Ctr | null): Promise<Transaction | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        if (!await conn.beginTransaction()) {
            return null;
        }
        return new Transaction(ctr, conn);
    }

    /**
     * --- 获取一个连接，自动变为 using 状态，；连接失败会返回 null ---
     */
    private async _getConnection(): Promise<Connection | null> {
        let conn: Connection | null = null;
        for (const connection of connections) {
            const etc = connection.getEtc();
            if (
                (etc.host !== this._etc.host) ||
                (etc.port !== this._etc.port) ||
                (etc.name !== this._etc.name) ||
                (etc.user !== this._etc.user)
            ) {
                // --- 配置项连接项不匹配 ---
                continue;
            }
            if (!connection.using()) {
                // --- 正在被使用，或者已经 lost ---
                continue;
            }
            // --- 匹配且可用 ---
            conn = connection;
            break;
        }
        if (!conn) {
            // --- 没有找到合适的连接，创建一个 ---
            for (let i = 0; i < 3; ++i) {
                try {
                    const link = await mysql2.createConnection({
                        'host': this._etc.host,
                        'port': this._etc.port,
                        'charset': this._etc.charset,
                        'database': this._etc.name,
                        'user': this._etc.user,
                        'password': this._etc.pwd,
                        'connectTimeout': 3_000,
                    });
                    const c = new Connection(this._etc, link);
                    c.using();
                    link.on('error', function(err: mysql2.QueryError): void {
                        c.setLost();
                        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
                            lCore.debug('[DB][_getConnection][error]', err.message);
                            lCore.log({}, '[DB][_getConnection][error] ' + err.message, '-error');
                        }
                    }).on('end', () => {
                        // lCore.debug('[DB][_getConnection] connection end.');
                        c.setLost();
                    }).on('close', () => {
                        c.setLost();
                    });
                    conn = c;
                    connections.push(conn);
                }
                catch (err: any) {
                    if (err.message === 'ETIMEOUT') {
                        lCore.debug('[DB][_getConnection][ETIMEOUT]', err);
                        continue;
                    }
                    const msg = `[DB][_getConnection] ${err.message}(${this._etc.host}:${this._etc.port})`;
                    lCore.debug(msg);
                    lCore.log({}, msg, '-error');
                    break;
                }
            }
        }
        return conn;
    }

    /**
     * --- 获取 SQL 执行次数 ---
     */
    public getQueries(): number {
        return this._queries;
    }

}

/** --- 事务连接对象，commit 和 rollback 后将无法使用 --- */
export class Transaction {

    /** --- SQL 执行次数 --- */
    private _queries: number = 0;

    /** --- 连接对象 --- */
    private _conn: Connection | null;

    private readonly _ctr: sCtr.Ctr | null;

    // --- 事务时长监听 timer ---
    private readonly _timer: {
        'warning'?: NodeJS.Timeout;
        'danger'?: NodeJS.Timeout;
    } = {
            'warning': undefined,
            'danger': undefined
        };

    public constructor(ctr: sCtr.Ctr | null, conn: Connection, opts: {
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

    /**
     * --- 在事务连接中执行一条 SQL ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async query(sql: string, values?: kebab.DbValue[]): Promise<IData> {
        if (!this._conn) {
            // --- 当前连接已不可用 ---
            lCore.display('[DB][Transaction][query] has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr') + ': ' + sql);
            lCore.log({}, '[DB][Transaction][query] has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr') + ': ' + sql, '-error');
            return {
                'rows': null,
                'fields': [],
                'error': {
                    'message': 'false',
                    'errno': 0
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
    public async execute(sql: string, values?: kebab.DbValue[]): Promise<IPacket> {
        if (!this._conn) {
            // --- 当前连接已不可用 ---
            lCore.display('[DB][Transaction][execute] has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr') + ': ' + sql);
            lCore.log({}, '(db.Transaction.execute) has been closed ' + (this._ctr?.getPrototype('_config').const.path ?? 'no ctr') + ': ' + sql, '-error');
            return {
                'packet': null,
                'fields': [],
                'error': {
                    'message': 'null',
                    'errno': 0
                }
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

/** --- 数据库连接对象 --- */
export class Connection {
    /** --- 本连接最后一次使用时间 --- */
    private _last: number = 0;

    /** --- 最后两次执行的 sql 完整串 --- */
    private readonly _lastSql: Array<{
        'sql': string;
        'values'?: kebab.DbValue[];
    }> = [];

    /** --- 数据库连接对象 --- */
    private readonly _link: mysql2.Connection;

    /** --- 当前连接是否正在被独占使用 --- */
    private _using: boolean = false;

    /** --- 当发生断开，则需从连接池移除连接 --- */
    private _lost: boolean = false;

    /** --- 当前正在处理事务 --- */
    private _transaction: boolean = false;

    /** --- 当前的连接配置信息 --- */
    private readonly _etc: kebab.IConfigDb;

    public constructor(etc: kebab.IConfigDb, link: mysql2.Connection) {
        this._etc = etc;
        this._link = link;
        this.refreshLast();
    }

    /**
     * --- 获取连接 etc 信息 ---
     */
    public getEtc(): kebab.IConfigDb {
        return this._etc;
    }

    /**
     * --- 获取最后一次获取连接的时间 ---
     */
    public getLast(): number {
        return this._last;
    }

    /**
     * --- 获取最后两次执行的 sql 字符串 ---
     */
    public getLastSql(): Array<{
        'sql': string;
        'values'?: kebab.DbValue[];
    }> {
        return this._lastSql;
    }

    /**
     * --- 将本条连接设置为不可用 ---
     */
    public setLost(): void {
        this._lost = true;
    }

    /**
     * --- 是否已经丢失 ---
     */
    public isLost(): boolean {
        return this._lost;
    }

    /**
     * --- 是否是开启事务状态 ---
     */
    public isTransaction(): boolean {
        return this._transaction;
    }

    /**
     * --- 获取当前状态是否正在被使用中 ---
     */
    public isUsing(): boolean {
        return this._using;
    }

    /**
     * --- 判断是否可用（丢失的也算不可用），返回 true 代表获取成功并自动刷新最后时间 ---
     */
    public using(): boolean {
        if (this._lost || this._using) {
            return false;
        }
        else {
            this.refreshLast();
            this._using = true;
            return true;
        }
    }

    /**
     * --- 取消占用 ---
     */
    public used(): void {
        this._using = false;
    }

    /**
     * --- 设定最后使用时间 ---
     */
    public refreshLast(): void {
        this._last = lTime.stamp();
    }

    /**
     * --- 通过执行一条语句判断当前连接是否可用 ---
     * @param last 是否刷新最后使用时间（默认刷新）
     */
    public async isAvailable(last = true): Promise<boolean> {
        if (last) {
            this.refreshLast();
        }
        try {
            await this._link.query('SELECT 1');
            return true;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 执行一条 SQL 并获得返回数据 ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async query(sql: string, values?: kebab.DbValue[]): Promise<IData> {
        let res: [any[], mysql2.FieldPacket[]];
        try {
            this.refreshLast();
            if (this._lastSql.length === 2) {
                this._lastSql.splice(0, 1);
            }
            this._lastSql.push({
                'sql': sql,
                'values': values
            });
            const time = Date.now();
            res = await this._link.query(sql, values);
            if (Date.now() - time > 200) {
                lCore.log({}, '[WARNING][DB][Connection][query] slow sql 200ms: ' + sql, '-warning');
            }
        }
        catch (e: any) {
            if (!this._transaction) {
                this._using = false;
            }
            return {
                'rows': null,
                'fields': [],
                'error': e,
                'result': -500,
            };
        }
        if (!this._transaction) {
            this._using = false;
        }
        // --- 返回数据 ---
        return {
            'rows': res[0],
            'fields': res[1],
            'error': null,
            'result': 1,
        };
    }

    /**
     * --- 执行一条 SQL 并获得影响行数对象 packet ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async execute(sql: string, values?: kebab.DbValue[]): Promise<IPacket> {
        let res: [mysql2.ResultSetHeader, mysql2.FieldPacket[]];
        try {
            this.refreshLast();
            if (this._lastSql.length === 2) {
                this._lastSql.splice(0, 1);
            }
            this._lastSql.push({
                'sql': sql,
                'values': values,
            });
            const time = Date.now();
            res = await this._link.execute(sql, values);
            if (Date.now() - time > 200) {
                lCore.log({}, '[WARNING][DB][Connection][execute] slow sql 200ms: ' + sql, '-warning');
            }
        }
        catch (e: any) {
            if (!this._transaction) {
                this._using = false;
            }
            // --- e.errno 可能为 1062 ---
            return {
                'packet': null,
                'fields': [],
                'error': e
            };
        }
        if (!this._transaction) {
            this._using = false;
        }
        return {
            'packet': res[0],
            'fields': res[1],
            'error': null
        };
    }

    /**
     * --- 关闭连接，一般情况下不使用 ---
     */
    public async end(): Promise<boolean> {
        try {
            await this._link.end();
            return true;
        }
        catch {
            return false;
        }
    }

    // --- 事务，只能在独占连接中使用，pool 创建事务返回独占连接，commit 或 rollback 释放连接回池 ---
    public async beginTransaction(): Promise<boolean> {
        if (this._using) {
            try {
                this._transaction = true;
                await this._link.beginTransaction();
                return true;
            }
            catch {
                return false;
            }
        }
        else {
            return false;
        }
    }

    public async commit(): Promise<boolean> {
        try {
            await this._link.commit();
            this.refreshLast();
            this._transaction = false;
            this._using = false;
            return true;
        }
        catch {
            return false;
        }
    }

    public async rollback(): Promise<boolean> {
        try {
            await this._link.rollback();
            this.refreshLast();
            this._transaction = false;
            this._using = false;
            return true;
        }
        catch {
            return false;
        }
    }
}

/**
 * --- 获取 Db Pool 对象 ---
 * @param etc 配置信息可留空
 */
export function get(ctrEtc: sCtr.Ctr | kebab.IConfigDb): Pool {
    const etc = ctrEtc instanceof sCtr.Ctr ? ctrEtc.getPrototype('_config').db : ctrEtc;
    return new Pool(etc);
}

/**
 * --- 获取当前连接池中所有连接的信息 ---
 */
export function getConnectionList(): IConnectionInfo[] {
    const list = [];
    for (let i = 0; i < connections.length; ++i) {
        const connection = connections[i];
        const etc = connection.getEtc();
        list.push({
            'id': i,
            'last': connection.getLast(),
            'host': etc.host,
            'port': etc.port,
            'name': etc.name,
            'user': etc.user,

            'lost': connection.isLost(),
            'using': connection.isUsing(),
            'transaction': connection.isTransaction()
        });
    }
    return list;
}

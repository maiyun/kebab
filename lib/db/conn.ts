import * as mysql2 from 'mysql2/promise';
import * as pg from 'pg';
import * as lCore from '#kebab/lib/core.js';
import * as lTime from '#kebab/lib/time.js';
import * as lDb from '#kebab/lib/db.js';
import * as kebab from '#kebab/index.js';

// --- 注册解析器 ---
pg.types.setTypeParser(pg.types.builtins.POLYGON, val => {
    if (val === null) {
        return null;
    }
    // --- val 如 ((1,1),(2,2),(3,3),(1,1)) ---
    // --- 去除两端括号，然后按分隔解析坐标 ---
    const matches = val
        .replace(/^\(\(/, '')
        .replace(/\)\)$/, '')
        .split('),(');
    const points = matches.map(pair => {
        const [xStr, yStr] = pair.split(',');
        return { 'x': parseFloat(xStr), 'y': parseFloat(yStr) };
    });
    // --- 返回 [{x: 1, y: 1}, {x :2, y: 2}, ... ] ---
    return points;
});
pg.types.setTypeParser(pg.types.builtins.INT8, val => {
    if (val === null) {
        return null;
    }
    return parseInt(val);
});

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
    private readonly _link: mysql2.Connection | pg.Client;

    /** --- 当前连接是否正在被独占使用 --- */
    private _using: boolean = false;

    /** --- 当发生断开，则需从连接池移除连接 --- */
    private _lost: boolean = false;

    /** --- 当前正在处理事务 --- */
    private _transaction: boolean = false;

    /** --- 当前的连接配置信息 --- */
    private readonly _etc: kebab.IConfigDb;

    public constructor(etc: kebab.IConfigDb, link: mysql2.Connection | pg.Client) {
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

    /** --- 获取数据库服务类型 --- */
    public getService(): lDb.ESERVICE {
        return this._link instanceof pg.Client ? lDb.ESERVICE.PGSQL : lDb.ESERVICE.MYSQL;
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
            if (this._link instanceof pg.Client) {
                await this._link.query('SELECT 1');
            }
            else {
                await this._link.query('SELECT 1');
            }
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
    public async query(sql: string, values?: kebab.DbValue[]): Promise<lDb.IData> {
        const rtn: lDb.IData = {
            'rows': null,
            'fields': [],
            'error': null,
            'result': 1,
        };
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
            if (this._link instanceof pg.Client) {
                const res = await this._link.query(sql, values);
                rtn.rows = res.rows;
                rtn.fields = res.fields.map(item => ({
                    'name': item.name,
                    'length': item.dataTypeSize,
                }));
            }
            else {
                const res = await this._link.execute(sql, values);
                rtn.rows = res[0] as any[];
                rtn.fields = res[1].map(item => ({
                    'name': item.orgName || item.name,
                    'length': item.length ?? -1,
                }));
            }
            if (Date.now() - time > 200) {
                lCore.log({}, '[WARNING][DB][Connection][query] slow sql 200ms: ' + sql, '-warning');
            }
        }
        catch (e: any) {
            rtn.error = {
                'message': e.message,
                'errno': e.errno ?? Number(e.code.replace(/[a-zA-Z]/g, '')),
            };
            rtn.result = -500;
        }
        if (!this._transaction) {
            this._using = false;
        }
        // --- 返回数据 ---
        return rtn;
    }

    /**
     * --- 执行一条 SQL 并获得影响行数对象 packet ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async execute(sql: string, values?: kebab.DbValue[]): Promise<lDb.IPacket> {
        const rtn: lDb.IPacket = {
            'packet': null,
            'fields': [],
            'error': null,
            'result': 1,
        };
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
            if (this._link instanceof pg.Client) {
                if (sql.startsWith('INSERT ') && !sql.includes('RETURNING ')) {
                    if (sql.endsWith(';')) {
                        sql = sql.slice(0, -1);
                    }
                    sql += ' RETURNING "id"';
                }
                const res = await this._link.query(sql, values);
                rtn.packet = {
                    'affected': res.rowCount ?? 0,
                    'insert': res.rows[0]?.id ?? 0,
                };
                rtn.fields = res.fields.map(item => ({
                    'name': item.name,
                    'length': item.dataTypeSize,
                }));
            }
            else {
                const res = await this._link.execute<mysql2.ResultSetHeader>(sql, values);
                rtn.packet = {
                    'affected': res[0].affectedRows,
                    'insert': res[0].insertId,
                };
                if (res[1]) {
                    rtn.fields = res[1].map(item => ({
                        'name': item.orgName,
                        'length': item.length ?? -1,
                    }));
                }
            }
            if (Date.now() - time > 200) {
                lCore.log({}, '[WARNING][DB][Connection][execute] slow sql 200ms: ' + sql, '-warning');
            }
        }
        catch (e: any) {
            let errno = e.errno ?? Number(e.code.replace(/[a-zA-Z]/g, ''));
            if (errno === 23505) {
                errno = 1062;
            }
            // --- e.errno 可能为 1062 ---
            rtn.error = {
                'message': e.message,
                'errno': errno,
            };
            rtn.result = -500;
        }
        if (!this._transaction) {
            this._using = false;
        }
        // --- 返回数据 ---
        return rtn;
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
                if (this._link instanceof pg.Client) {
                    await this._link.query('BEGIN');
                }
                else {
                    await this._link.beginTransaction();
                }
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
            if (this._link instanceof pg.Client) {
                await this._link.query('COMMIT');
            }
            else {
                await this._link.commit();
            }
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
            if (this._link instanceof pg.Client) {
                await this._link.query('ROLLBACK');
            }
            else {
                await this._link.rollback();
            }
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

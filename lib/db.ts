/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-4-15 13:40
 * Last: 2020-4-13 15:34:45, 2022-09-12 13:10:34, 2023-5-24 18:29:38
 */

// --- Pool 是使用时必须要一个用户创建一份的，Connection 是池子里获取的 ---

// --- 第三方 ---
import * as mysql2 from 'mysql2/promise';
// --- 库和定义 ---
import * as time from '~/lib/time';
import * as core from '~/lib/core';
import * as ctr from '~/sys/ctr';
import * as types from '~/types';

/** --- query 返回的数据 --- */
export interface IData {
    'rows': any[] | null;
    'fields': mysql2.FieldPacket[];
    'error': {
        'message': string;
        'errno': number;
        [key: string]: any;
    } | null;
}

/** --- exec 返回对象 --- */
export interface IPacket {
    'packet': mysql2.OkPacket | null;
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
 * --- 计划任务 30 秒一次，关闭超过 3 分钟不活动的连接，回滚独占时间过长的连接 ---
 */
async function checkConnection(): Promise<void> {
    const now: number = time.stamp();
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
            // --- 连接正在被使用，看看是否使用超过 10 分钟，超过则不是正常状态 ---
            if (connection.getLast() <= now - 600) {
                // --- 10 分钟之前开始的 ---
                console.log(`[child] [db] [error] There is a transactional connection[${i}] that is not closed.`);
                await connection.rollback();
            }
            continue;
        }
        // --- 目前未被使用中的连接 ---
        if (connection.getLast() > now - 180) {
            // --- 3 分钟内使用过，不管 ---
            continue;
        }
        // --- 超 3 分钟未被使用，则关闭 ---
        await connection.end();
        connections.splice(i, 1);
        --i;
    }
    setTimeout(function() {
        checkConnection().catch(e => { console.log('[DB]', e); });
    }, 30000);
}
setTimeout(function() {
    checkConnection().catch(e => { console.log('[DB]', e); });
}, 30000);

/** --- 数据库连接池对象 --- */
export class Pool {

    /** --- SQL 执行次数 --- */
    private _queries: number = 0;

    /** --- 当前 Pool 对象的数据库连接信息 --- */
    private readonly _etc: types.IConfigDb;

    public constructor(etc: types.IConfigDb) {
        this._etc = etc;
    }

    /**
     * --- 执行一条 SQL，无视顺序和相同连接，随用随取 ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async query(sql: string, values?: any[] | Record<string, any>): Promise<IData> {
        ++this._queries;
        // --- 获取并自动 using  ---
        try {
            const conn = await this._getConnection();
            // --- 执行一次后自动解除 using ---
            return await conn.query(sql, values);
        }
        catch (e: any) {
            return {
                'rows': null,
                'fields': [],
                'error': {
                    'message': e.toString(),
                    'errno': e.errno
                }
            };
        }
    }

    /**
     * --- 执行一条 SQL 并获得影响行数对象 packet，连接失败抛出错误 ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async execute(sql: string, values?: any[] | Record<string, any>): Promise<IPacket> {
        ++this._queries;
        try {
            const conn = await this._getConnection();
            return await conn.execute(sql, values);
        }
        catch (e: any) {
            return {
                'packet': null,
                'fields': [],
                'error': {
                    'message': e.toString(),
                    'errno': e.errno
                }
            };
        }
    }

    /**
     * --- 开启事务，返回连接对象并锁定连接，别人任何人不可用 ---
     */
    public async beginTransaction(): Promise<Connection | null> {
        try {
            const conn = await this._getConnection();
            if (!await conn.beginTransaction()) {
                return null;
            }
            return conn;
        }
        catch {
            return null;
        }
    }

    /**
     * --- 获取一个连接，自动变为 using 状态，；连接失败会抛出错误 ---
     * @throw e
     */
    private async _getConnection(): Promise<Connection> {
        let conn!: Connection;
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
            try {
                const link = await mysql2.createConnection({
                    'host': this._etc.host,
                    'port': this._etc.port,
                    'charset': this._etc.charset,
                    'database': this._etc.name,
                    'user': this._etc.user,
                    'password': this._etc.pwd,
                    'connectTimeout': 5000
                });
                conn = new Connection(this._etc, link);
                conn.using();
                link.on('error', function(err: mysql2.QueryError): void {
                    conn.setLost();
                    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
                        console.log(err);
                    }
                });
                connections.push(conn);
            }
            catch (e: any) {
                await core.log({
                    'path': '',
                    'urlFull': '',
                    'hostname': '',
                    'req': null,
                    'get': {},
                    'post': {},
                    'cookie': {},
                    'headers': {},
                    'input': ''
                }, '(db._getConnection)' + JSON.stringify(e.stack).slice(1, -1), '-error');
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

/** --- 数据库连接对象 --- */
export class Connection {
    /** --- 本连接最后一次使用时间 --- */
    private _last: number = 0;

    /** --- 数据库连接对象 --- */
    private readonly _link: mysql2.Connection;

    /** --- 当前连接是否正在被独占使用 --- */
    private _using: boolean = false;

    /** --- 当发生断开，则需从连接池移除连接 --- */
    private _lost: boolean = false;

    /** --- 当前正在处理事务 --- */
    private _transaction: boolean = false;

    /** --- 当前的连接配置信息 --- */
    private readonly _etc: types.IConfigDb;

    public constructor(etc: types.IConfigDb, link: mysql2.Connection) {
        this._etc = etc;
        this._link = link;
        this.refreshLast();
    }

    /**
     * --- 获取连接 etc 信息 ---
     */
    public getEtc(): types.IConfigDb {
        return this._etc;
    }

    /**
     * --- 获取最后一次获取连接的时间 ---
     */
    public getLast(): number {
        return this._last;
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
        this._last = time.stamp();
    }

    /**
     * --- 通过执行一条语句判断当前连接是否可用 ---
     */
    public async isAvailable(): Promise<boolean> {
        this.refreshLast();
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
    public async query(sql: string, values?: any[] | Record<string, any>): Promise<IData> {
        let res;
        try {
            this.refreshLast();
            res = await this._link.query(sql, values) as [any[], mysql2.FieldPacket[]];
        }
        catch (e: any) {
            if (!this._transaction) {
                this._using = false;
            }
            return {
                'rows': null,
                'fields': [],
                'error': e
            };
        }
        if (!this._transaction) {
            this._using = false;
        }
        // --- 返回数据 ---
        return {
            'rows': res[0],
            'fields': res[1],
            'error': null
        };
    }

    /**
     * --- 执行一条 SQL 并获得影响行数对象 packet ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     */
    public async execute(sql: string, values?: any[] | Record<string, any>): Promise<IPacket> {
        let res;
        try {
            this.refreshLast();
            res = await this._link.execute(sql, values) as [mysql2.OkPacket, mysql2.FieldPacket[]];
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
export function get(ctrEtc: ctr.Ctr | types.IConfigDb): Pool {
    const etc = ctrEtc instanceof ctr.Ctr ? ctrEtc.getPrototype('_config').db : ctrEtc;
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

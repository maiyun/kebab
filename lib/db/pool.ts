import * as mysql2 from 'mysql2/promise';
import * as pg from 'pg';

import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lTime from '#kebab/lib/time.js';
import * as lSql from '#kebab/lib/sql.js';
import * as lDb from '#kebab/lib/db.js';
import * as sCtr from '#kebab/sys/ctr.js';

import { Connection } from './conn.js';
import { Transaction } from './tran.js';

/** --- 连接列表池 --- */
const connections: Connection[] = [];

/** --- 连接信息 --- */
export interface IConnectionInfo {
    'id': number;
    'service': lDb.ESERVICE;
    'last': number;
    'host': string;
    'port': number;
    'name': string;
    'user': string;

    'lost': boolean;
    'using': boolean;
    'transaction': boolean;
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
            'service': connection.getService(),
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

    /** --- 当前服务商 --- */
    private readonly _service: lDb.ESERVICE;

    /** --- 当前 Pool 对象的数据库连接信息 --- */
    private readonly _etc: kebab.IConfigDb;

    public constructor(etc: kebab.IConfigDb, opt: {
        /** --- 服务商 --- */
        'service': lDb.ESERVICE;
    }) {
        this._etc = etc;
        this._service = opt.service;
    }

    /** --- 获取当前连接的服务商 --- */
    public getService(): lDb.ESERVICE {
        return this._service;
    }

    /**
     * --- 执行一条 SQL，无视顺序和相同连接，随用随取 ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数据
     * @returns error.errno = -500 表示系统错误
     */
    public async query(sql: string, values?: kebab.DbValue[]): Promise<lDb.IData> {
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
    public async execute(sql: string, values?: kebab.DbValue[]): Promise<lDb.IPacket> {
        ++this._queries;
        const conn = await this._getConnection();
        if (!conn) {
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
            const service = connection.getService();
            if (
                (etc.host !== this._etc.host) ||
                (etc.port !== this._etc.port) ||
                (etc.name !== this._etc.name) ||
                (etc.user !== this._etc.user) ||
                (service !== this._service)
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
            loop: for (let i = 0; i < 3; ++i) {
                try {
                    switch (this._service) {
                        case lDb.ESERVICE.MYSQL: {
                            // --- MYSQL ---
                            const link = await mysql2.createConnection({
                                'host': this._etc.host,
                                'port': this._etc.port,
                                'charset': this._etc.charset,
                                'database': this._etc.name,
                                'user': this._etc.user,
                                'password': this._etc.pwd,
                                'connectTimeout': 3_000,
                                typeCast: (field, next) => {
                                    if (field.type !== 'GEOMETRY') {
                                        return next();
                                    }
                                    const geo = field.geometry();
                                    if (!geo) {
                                        return null;
                                    }
                                    if (!Array.isArray(geo)) {
                                        return geo;
                                    }
                                    if (geo[0].x && geo[0].y) {
                                        return geo;
                                    }
                                    return geo[0];
                                },
                            });
                            const c = new Connection(this._etc, link);
                            c.using();
                            link.on('error', function(err: mysql2.QueryError): void {
                                c.setLost();
                                if (err.code !== 'PROTOCOL_CONNECTION_LOST' && err.code !== 'ECONNRESET') {
                                    lCore.debug('[DB][_getConnection][MYSQL][error]', err);
                                    lCore.log({}, '[DB][_getConnection][MYSQL][error] ' + err.message, '-error');
                                }
                            }).on('end', () => {
                                // lCore.debug('[DB][_getConnection] connection end.');
                                c.setLost();
                            }).on('close', () => {
                                c.setLost();
                            });
                            conn = c;
                            connections.push(conn);
                            break loop;
                        }
                        case lDb.ESERVICE.PGSQL: {
                            // --- PGSQL ---
                            const link = new pg.Client({
                                'host': this._etc.host,
                                'port': this._etc.port,
                                'database': this._etc.name,
                                'user': this._etc.user,
                                'password': this._etc.pwd,
                                'connectionTimeoutMillis': 3_000,
                            });
                            await link.connect();
                            const c = new Connection(this._etc, link);
                            c.using();
                            link.on('error', err => {
                                c.setLost();
                                lCore.debug('[DB][_getConnection][PGSQL][error]', err);
                                lCore.log({}, '[DB][_getConnection][PGSQL][error] ' + err.message, '-error');
                            }).on('end', () => {
                                c.setLost();
                            });
                            conn = c;
                            connections.push(conn);
                            break loop;
                        }
                    }
                }
                catch (err: any) {
                    if (err.message.includes('ETIMEOUT') || err.message.includes('EHOSTUNREACH') || err.message.includes('ECONNREFUSED')) {
                        // lCore.debug(`[DB][_getConnection][${lDb.ESERVICE[this._service]}]`, err);
                        await lCore.sleep(300);
                        continue;
                    }
                    const msg = `[DB][_getConnection][${lDb.ESERVICE[this._service]}] ${err.message}(${this._etc.host}:${this._etc.port})`;
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

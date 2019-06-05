// --- 第三方 ---
import * as mysql2 from "mysql2/promise";
// --- 库和定义 ---
import * as Sys from "~/lib/Sys";
import * as abs from "~/abstract";

/** --- 连接池列表 --- */
let _poolList: Pool[] = [];

// --- 计划任务 ---
// --- 关闭超过1分钟不活动的连接，但至少保持一条连接可用 ---
async function _clearConnection() {
    let poolLen: number = _poolList.length;
    for (let i = 0; i < poolLen; ++i) {
        await _poolList[i].clearConnection();
    }
    await Sys.sleep(30000);
    _clearConnection();
}
_clearConnection();
// --- 每隔 1 小时检查一次连接是否正常活动 ---
// --- 一般情况下连接异常会触发 error 事件，所以这个检查不用太频繁，主要为了发送个 SELECT 来保持连接而已 ---
// --- 是否有忘记关闭的事务（连接一直在占用，却超过 10 分钟没有任何活动） ---
async function _checkConnection() {
    await Sys.sleep(3600000);
    let poolLen: number = _poolList.length;
    for (let i = 0; i < poolLen; ++i) {
        await _poolList[i].checkConnection();
    }
    _checkConnection();
}
_checkConnection();

/** --- 数据库连接池对象 --- */
export class Pool {
    /** 数据库配置信息 */
    public readonly etc: abs.ConfigEtcMysql;
    /** 连接池 */
    private _connections: Connection[] = [];

    constructor(etc: abs.ConfigEtcMysql) {
        this.etc = Object.assign({}, etc);
    }

    /**
     * --- 执行一条 SQL，无视顺序和连接，可用就用 ---
     * @param sql 要执行的 SQL
     * @param values 要替换的 data 数据
     */
    public async query(sql: string, values?: any | any[] | {[param: string]: any}): Promise<[any[], mysql2.FieldPacket[]]> {
        let conn = await this._getConnection();
        // --- 一条连接同时只能执行一条 SQL ---
        let res = await conn.query(sql, values);
        // --- 返回数据 ---
        return res;
    }

    /**
     * --- 执行一条 SQL，无视顺序和连接，返回影响条数等（INSERT、UPDATE 等方法） ---
     * @param sql 要执行的 SQL
     * @param values 要替换的 data 数据
     */
    public async execute(sql: string, values?: any | any[] | {[param: string]: any}): Promise<mysql2.OkPacket> {
        let conn = await this._getConnection();
        let res = await conn.execute(sql, values);
        return res;
    }

    /**
     * --- 开启事务，返回连接对象并锁定连接，别人任何人不可用 ---
     */
    public async beginTransaction(): Promise<Connection> {
        let conn = await this._getConnection();
        await conn.beginTransaction();
        return conn;
    }

    /**
     * --- 获取当前连接池连接数 ---
     */
    public getLength() {
        return this._connections.length;
    }

    /**
     * --- 清除多余连接 ---
     * --- 用以 30 秒执行一次，已经添加到计划任务了 ---
     */
    public async clearConnection() {
        let nowTime = Date.now();
        let connLen: number = this._connections.length;
        for (let i = 0; i < connLen; ++i) {
            if (!this._connections[i]) {
                continue;
            }
            if (this._connections[i].using || this._connections[i].time > nowTime - 60000 * 3) {
                continue;
            }
            if (this._connections.length > 1) {
                // --- 超过 3 分钟没用到的连接，结束之 ---
                try {
                    this._connections[i].end();
                } catch {
                    // --- 不需要处理任何问题，反正要结束了 ---
                }
                this._connections.splice(i, 1);
                --i;
            } else {
                // --- 在此不进行连接是否可用的检测 ---
                // --- 因为这个一般执行频率较高，没必要检测可用性这么频繁 ---
            }
        }
    }

    /**
     * --- 每隔一小时自动检测连接是否活动，有死连接则移除 ---
     * --- 是否有忘记关闭的事务（连接一直在占用，却超过 10 分钟没有任何活动） ---
     */
    public async checkConnection() {
        let nowTime = Date.now();
        let connLen: number = this._connections.length;
        for (let i = 0; i < connLen; ++i) {
            if (!this._connections[i]) {
                continue;
            }
            if (this._connections[i].using) {
                // --- 被占用，要判断，如果 10 分钟没有活动，代表可能是忘了 commit 或者 rollback，则自动 rollback 并联系管理人员 ---
                if (this._connections[i].time <= nowTime - 60000 * 10) {
                    console.log(`[ Child][Error] There is a transactional connection that is not closed.`);
                    this._connections[i].rollback();
                }
            } else if (this._connections[i].time > nowTime - 60000 * 3) {
                // --- 没被占用，而且距上次执行时间不超 3 分钟 ---
                continue;
            }
            if (!this._connections[i].isAvailable()) {
                // --- 超 3 分钟没有用到的连接，而且还不在线，嗝屁了，就直接删掉（一般就是一个数据库池的主连接） ---
                // --- 这种情况不太多见，主要为了用 isAvailable 发 noop 的 ---
                this._connections.splice(i, 1);
                --i;
            }
        }
    }

    /**
     * --- 获取一个连接 ---
     */
    private async _getConnection(): Promise<Connection> {
        let conn!: Connection;
        let connLen: number = this._connections.length;
        for (let i = 0; i < connLen; ++i) {
            if (this._connections[i].using) {
                continue;
            }
            conn = this._connections[i];
            conn.time = Date.now();
            break;
        }
        if (conn === undefined) {
            // --- 没有找到合适的连接，创建一个 ---
            let mc = await mysql2.createConnection({
                host: this.etc.host,
                port: this.etc.port,
                user: this.etc.username,
                password: this.etc.password,
                database: this.etc.name,
                charset: this.etc.charset
            });
            conn = new Connection(mc);
            this._connections.push(conn);
            mc.on("error", (err) => {
                if (err.code === "PROTOCOL_CONNECTION_LOST") {
                    // --- 连接丢失 ---
                    conn.__disconnected = true;
                    this._clearDisconnected();
                }
            });
        }
        return conn;
    }

    /**
     * --- 清除已经断开的异常连接 ---
     */
    private _clearDisconnected() {
        let connLen: number = this._connections.length;
        for (let i = 0; i < connLen; ++i) {
            if (!this._connections[i]) {
                continue;
            }
            if (this._connections[i].__disconnected === true) {
                this._connections.splice(i, 1);
                --i;
            }
        }
    }

}

/** --- 数据库连接对象 --- */
export class Connection {
    private _conn!: mysql2.Connection;
    public using: boolean = false;
    public time: number = Date.now();
    /** 内部用的，当发生闪断，则从连接池移除连接 */
    public __disconnected: boolean = false;
    /** 当前正在处理事务 */
    private _transaction: boolean = false;

    constructor(conn: mysql2.Connection) {
        this._conn = conn;
    }

    /**
     * --- 判断当前连接是否可用 ---
     */
    public async isAvailable(): Promise<boolean> {
        try {
            await this._conn.query("SELECT 1");
            return true;
        } catch {
            return false;
        }
    }

    /**
     * --- 执行一条 SQL 并获得返回数据 ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数组
     */
    public async query(sql: string, values?: any | any[] | {[param: string]: any}): Promise<[any[], mysql2.FieldPacket[]]> {
        // --- 一条连接同时只能执行一条 SQL ---
        if (!this._transaction) {
            this.using = true;
        }
        let res;
        try {
            res = <[any[], mysql2.FieldPacket[]]>(await this._conn.query(sql, values));
        } catch (e) {
            this.time = Date.now();
            if (!this._transaction) {
                this.using = false;
            }
            throw e;
        }
        this.time = Date.now();
        if (!this._transaction) {
            this.using = false;
        }
        // --- 返回数据 ---
        return res;
    }

    /**
     * --- 执行一条 SQL 并获得影响行数 ---
     * @param sql 执行的 SQL 字符串
     * @param values 要替换的 data 数组
     */
    public async execute(sql: string, values?: any | any[] | {[param: string]: any}): Promise<mysql2.OkPacket> {
        if (!this._transaction) {
            this.using = true;
        }
        let res;
        try {
            res = <[mysql2.OkPacket, mysql2.FieldPacket[]]>(await this._conn.execute(sql, values));
        } catch (e) {
            this.time = Date.now();
            if (!this._transaction) {
                this.using = false;
            }
            throw e;
        }
        this.time = Date.now();
        if (!this._transaction) {
            this.using = false;
        }
        return res[0];
    }

    /**
     * --- 关闭连接，一般情况下不使用 ---
     */
    public async end(): Promise<void> {
        await this._conn.end();
    }

    // --- 事务，只能在专线当中使用，pool 创建事务，开始专线，commit 或 rollback 释放专线 ---
    public async beginTransaction(): Promise<void> {
        this._transaction = true;
        this.using = true;
        await this._conn.beginTransaction();
    }
    public async commit() {
        await this._conn.commit();
        this._transaction = false;
        this.using = false;
    }
    public async rollback() {
        await this._conn.rollback();
        this._transaction = false;
        this.using = false;
    }
}

/**
 * --- 根据配置信息获取连接池对象 ---
 * @param etc 配置信息
 */
export function getPool(etc: abs.Nu | abs.ConfigEtcMysql): Pool {
    let etcMysql: abs.ConfigEtcMysql = Sys.isNu(etc) ? etc.config.etc.mysql : etc;
    for (let pool of _poolList) {
        if ((pool.etc.host === etcMysql.host) && (pool.etc.port === etcMysql.port) && (pool.etc.charset === etcMysql.charset) && (pool.etc.name === etcMysql.name) && (pool.etc.username === etcMysql.username) && (pool.etc.password === etcMysql.password)) {
            return pool;
        }
    }
    // --- 要新建连接池了 ---
    let poolObject = new Pool(etcMysql);
    _poolList.push(poolObject);
    return poolObject;
}
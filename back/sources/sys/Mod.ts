// --- 第三方 ---
import * as mysql2 from "mysql2/promise";
// --- 库和定义 ---
import * as Sql from "~/lib/Sql";
import * as Mysql from "~/lib/Mysql";
import * as Sys from "~/lib/Sys";
import * as Time from "~/lib/Time";
import * as abs from "~/abstract";

/** 获取列表的选项对象 */
interface GetListOptions {
    where?: any[];
    limit?: number[];
    by?: any[];
    groupBy?: string | string[];
    key?: string;
    lock?: boolean;
    select?: string;
    raw?: boolean;
}

/** 列表对象以 key 为 key */
interface GetListObject {
    [key: string]: Mod;
}

/** getList 的返回值 */
interface GetListReturn {
    total: number;
    list: Mod[] | GetListObject;
}

/** count 方法参数 */
interface CountOptions {
    where?: any[] | string;
    lock?: boolean;
    select?: string;
    raw?: boolean;
}

export default class Mod {
    protected static _table = "";
    protected static _primary = "id";
    protected static _key = "";
    protected static _soft = false;

    /** 要 update 的内容 */
    protected _updates: any = {};
    /** 模型获取的属性 */
    protected _data: any = {};

    /** 数据库连接对象 */
    protected _conn!: Mysql.Pool | Mysql.Connection;
    protected _etc: abs.ConfigEtcSql | undefined;

    // --- 最后一次执行的 SQL 内容 ---
    protected _lastSqlString = "";
    protected _lastSqlData: any = {};

    /** 构造函数，etc 选项可选 */
    constructor(pc: Mysql.Pool | Mysql.Connection, etc?: abs.Nu | abs.Nus | abs.ConfigEtcSql, row?: any) {
        // --- sql 对象配置 ---
        if (etc !== undefined) {
            this._etc = Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.sql : etc;
        }
        // ---- 导入数据库连接 ---
        this._conn = pc;
        // --- 第三个参数用于内部数据导入，将 data 数据合并到本实例化类 ---
        if (row) {
            for (let k in row) {
                this._data[k] = row[k];
                (<any>this)[k] = row[k];
            }
        }
    }

    /**
     * --- 获取创建对象，通常用于新建数据库条目 ---
     */
    public static getCreate(pc: Mysql.Pool | Mysql.Connection, etc?: abs.Nu | abs.Nus | abs.ConfigEtcSql) {
        return new this(pc, etc);
    }

    /**
     * --- 设置一个/多个属性 ---
     * @param n 字符串或 {} 键/值
     * @param v 留空或值内容
     */
    public set(n: any, v: string | number | boolean = ""): void {
        if (typeof n !== "string") {
            for (let k in n) {
                let v = n[k];
                // --- 强制更新，因为有的可能就是要强制更新既然设置了 ---
                this._updates[k] = true;
                this._data[k] = v;
                (<any>this)[k] = v;
            }
        } else {
            this._updates[n] = true;
            this._data[n] = v;
            (<any>this)[n] = v;
        }
    }

    /** --- 获取一个属性 --- */
    public get(n: string): any {
        return this._data[n];
    }

    /**
     * --- 更新 set 的数据到数据库 ---
     */
    public async update(): Promise<boolean> {
        let updates: any = {};
        for (let k in this._updates) {
            updates[k] = this._data[k];
        }
        if (Object.keys(updates).length > 0) {
            let sql = Sql.get(this._etc);
            sql.update((<any>this.constructor)._table, [updates]).where([{
                [(<any>this.constructor)._primary]: this._data[(<any>this.constructor)._primary]
            }]);

            this._lastSqlString = sql.getSql();
            this._lastSqlData = sql.getData();
            sql.release();

            let rtn = await this._conn.execute(this._lastSqlString, this._lastSqlData);
            if (rtn && (rtn.affectedRows > 0)) {
                this._updates = {};
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    /**
     * --- 移除本条目 ---
     */
    public async remove(): Promise<boolean> {
        let sql = Sql.get(this._etc);
        if ((<any>this.constructor)._soft) {
            sql.update((<any>this.constructor)._table, [
                {"time_remove": Time.stamp()}
            ]);
        } else {
            sql.delete((<any>this.constructor)._table).where([{
                [(<any>this.constructor)._primary]: this._data[(<any>this.constructor)._primary]
            }]);
        }

        this._lastSqlString = sql.getSql();
        this._lastSqlData = sql.getData();
        sql.release();

        let rtn = await this._conn.execute(this._lastSqlString, this._lastSqlData);
        if (rtn && (rtn.affectedRows > 0)) {
            return true;
        } else {
            return false;
        }
    }

    /** 创建后不重新获取 */
    public static NORMAL = 0;
    /** 创建后重新获取并锁定（针对事务） */
    public static LOCK = 1;
    /** 创建后仅重新获取不锁定 */
    public static RELOAD = 2;

    /**
     * --- 创建条目 ---
     * @param type 创建的类型，表示创建后是否重新获取值，默认不获取
     */
    public async create(type: number = 0): Promise<boolean> {
        let updates: any = {};
        for (let k in this._updates) {
            updates[k] = this._data[k];
        }

        let sql = Sql.get(this._etc);
        sql.insert((<any>this.constructor)._table, updates);

        try {
            let rtn: mysql2.OkPacket;
            if ((<any>this.constructor)._key !== "") {
                while (true) {
                    updates[(<any>this.constructor)._key] = this._keyGenerator();
                    sql.insert((<any>this.constructor)._table, updates);

                    this._lastSqlString = sql.getSql();
                    this._lastSqlData = sql.getData();

                    try {
                        let rtnt = await this._conn.execute(this._lastSqlString, this._lastSqlData);
                        if (rtnt) {
                            rtn = rtnt;
                            break;
                        } else {
                            // --- 接着循环 ---
                            continue;
                        }
                    } catch (e) {
                        sql.release();
                        console.log(e);
                        return false;
                    }
                }
            } else {
                this._lastSqlString = sql.getSql();
                this._lastSqlData = sql.getData();

                let rtnt = await this._conn.execute(this._lastSqlString, this._lastSqlData);
                if (rtnt) {
                    rtn = rtnt;
                } else {
                    throw {errno: 1062};
                }
            }
            if (rtn.affectedRows > 0) {
                this._updates = {};
                this._data[(<any>this.constructor)._primary] = rtn.insertId;
                (<any>this)[(<any>this.constructor)._primary] = rtn.insertId;
                if (type === 1 || type === 2) {
                    sql.select("*", (<any>this.constructor)._table).where([{
                        [(<any>this.constructor)._primary]: this._data[(<any>this.constructor)._primary]
                    }]);
                    if (type === 1) {
                        sql.append(" FOR UPDATE");
                    }
                    let [rows] = await this._conn.query(sql.getSql(), sql.getData());
                    sql.release();
                    for (let k in rows[0]) {
                        this._data[k] = rows[0][k];
                        (<any>this)[k] = rows[0][k];
                    }
                } else {
                    sql.release();
                }
                return true;
            } else {
                sql.release();
                return false;
            }
        } catch (e) {
            sql.release();
            if (e.errno !== 1062) {
                console.log(e);
            }
            return false;
        }
    }

    /**
     * --- 获取最后执行的 SQL 字串 ---
     */
    public getLastSqlString(): string {
        return this._lastSqlString;
    }

    /**
     * --- 获取最后执行的 Data 数据 ---
     */
    public getLastSqlData(): any {
        return this._lastSqlData;
    }

    /**
     * --- 获取最后一次完整的 SQL 字符串 ---
     */
    public getLastSqlFormat(): string {
        return Sql.format(this._lastSqlString, this._lastSqlData);
    }

    /**
     * --- 当 _key 不为空时，则依据继承此方法的方法自动生成填充 key ---
     */
    protected _keyGenerator(): string {
        return "";
    }

    /**
     * --- 获取值对象 ---
     */
    public toObject() {
        let o: any = {};
        for (let k in this._data) {
            o[k] = this._data[k];
        }
        return o;
    }

    // --- 以下为静态方法 ---

    /**
     * --- 获取一个条目 ---
     * @param pc 数据库连接/连接池
     * @param where 筛选参数
     * @param opt 选项
     */
    public static async get(pc: Mysql.Pool | Mysql.Connection, where: any[] | string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcSql, opt: {
        lock?: boolean;
        raw?: boolean;
    } = {}) {
        let sql = Sql.get(etc);
        sql.select("*", this._table);
        // --- 判断是否筛掉已删除的 ---
        if ((<any>this.constructor)._soft && (opt.raw !== true)) {
            sql.where([
                {"time_remove": "0"}
            ]);
        }
        if (typeof where === "string") {
            sql.append(where);
        } else {
            sql.where(where);
        }
        if (opt.lock === true) {
            sql.append(" FOR UPDATE");
        }
        try {
            let [rows] = await pc.query(sql.getSql(), sql.getData());
            sql.release();
            if (rows.length > 0) {
                return new this(pc, etc, rows[0]);
            } else {
                return undefined;
            }
        } catch {
            sql.release();
            return undefined;
        }
    }

    /**
     * --- 添加一个序列 ---
     * @param pc 数据库连接/连接池
     * @param cs 字段列表 [] or {}
     * @param vs 参数列表
     * @param etc sql 参数
     */
    public static async insert(pc: Mysql.Pool | Mysql.Connection, cs: any = [], vs?: any[] | any[][], etc?: abs.Nu | abs.Nus | abs.ConfigEtcSql) {
        let sql = Sql.get(etc);
        sql.insert(this._table, cs, vs);
        let rtn = await pc.execute(sql.getSql(), sql.getData());
        sql.release();
        if (rtn && rtn.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * --- 获取添加一个序列的模拟 SQL ---
     * @param cs 字段列表 [] or {}
     * @param vs 参数列表
     * @param etc sql 参数
     */
    public static insertSql(cs: any = [], vs?: any[] | any[][], etc?: abs.Nu | abs.Nus | abs.ConfigEtcSql) {
        let sql = Sql.get(etc);
        sql.insert(this._table, cs, vs);
        return sql.format();
    }

    /**
     * --- 获取列表 ---
     * @param pc 数据库连接/连接池
     * @param opt 选项
     * @param etc etc 对象
     */
    public static async getList(pc: Mysql.Pool | Mysql.Connection, opt: GetListOptions = {}, etc?: abs.Nu | abs.Nus | abs.ConfigEtcSql): Promise<GetListReturn> {
        let sql = Sql.get(etc);
        sql.select(opt.select || "*", this._table);
        if (opt.where !== undefined) {
            if (typeof opt.where === "string") {
                sql.append(" WHERE (" + opt.where + ")");
                if ((<any>this.constructor)._soft && (opt.raw !== true)) {
                    sql.append(" AND `time_remove` = 0");
                }
            } else {
                if ((<any>this.constructor)._soft && (opt.raw !== true)) {
                    opt.where.push({
                        "time_remove": "0"
                    });
                }
                sql.where(opt.where);
            }
        } else {
            if ((<any>this.constructor)._soft && (opt.raw !== true)) {
                sql.where([{
                    "time_remove": "0"
                }]);
            }
        }
        if (opt.groupBy !== undefined) {
            sql.groupBy(opt.groupBy);
        }
        if (opt.by !== undefined) {
            sql.by(opt.by[0], opt.by[1] || "DESC");
        }
        let total: number = 0;
        if (opt.limit !== undefined) {
            if (opt.limit[2] !== undefined) {
                // --- 分页 ---
                let sstr = sql.getSql();
                sstr = sstr.replace(/SELECT .+? FROM/, "SELECT COUNT(0) AS count FROM");
                let [rows] = await pc.query(sstr, sql.getData());
                total = rows[0].count;
                // --- 计算完整 ---
                sql.limit(opt.limit[1] * (opt.limit[2] - 1), opt.limit[1]);
            } else {
                sql.limit(opt.limit[0], opt.limit[1]);
            }
        }
        if (opt.lock === true) {
            sql.append(" FOR UPDATE");
        }

        // --- 执行查询 ---
        let [rows] = await pc.query(sql.getSql(), sql.getData());
        sql.release();

        if (opt.key !== undefined) {
            let list: GetListObject = {};
            for (let row of rows) {
                list[row[opt.key]] = new this(pc, etc, row);
            }
            // --- 返回 ---
            return {
                "total": total,
                "list": list
            };
        } else {
            let list: Mod[] = [];
            for (let row of rows) {
                list.push(new this(pc, etc, row));
            }
            // --- 返回 ---
            return {
                "total": total,
                "list": list
            };
        }
    }

    /**
     * --- 根据条件计算条数 ---
     * @param pc 数据库连接/连接池
     * @param opt 选项
     * @param etc etc 对象
     */
    public static async count(pc: Mysql.Pool | Mysql.Connection, opt: CountOptions = {}, etc?: abs.Nu | abs.Nus | abs.ConfigEtcSql): Promise<any> {
        let sql = Sql.get(etc);
        sql.select(opt.select || "COUNT(0) AS count", this._table);
        if (opt.where !== undefined) {
            if (typeof opt.where === "string") {
                sql.append(" WHERE (" + opt.where + ")");
                if ((<any>this.constructor)._soft && (opt.raw !== true)) {
                    sql.append(" AND `time_remove` = 0");
                }
            } else {
                if ((<any>this.constructor)._soft && (opt.raw !== true)) {
                    opt.where.push({
                        "time_remove": "0"
                    });
                }
                sql.where(opt.where);
            }
        } else {
            if ((<any>this.constructor)._soft && (opt.raw !== true)) {
                sql.where([{
                    "time_remove": "0"
                }]);
            }
        }
        // --- 是否锁定 ---
        if (opt.lock === true) {
            sql.append(" FOR UPDATE");
        }
        // --- 开始 ---
        let [rows] = await pc.query(sql.getSql(), sql.getData());
        sql.release();
        return rows[0];
    }

    /**
     * --- 根据条件移除条目 ---
     * @param pc 数据库连接/连接池
     * @param where 筛选条件
     * @param etc etc 对象
     */
    public static async removeByWhere(pc: Mysql.Pool | Mysql.Connection, where: any[] | string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcSql, raw?: boolean): Promise<boolean> {
        let sql = Sql.get(etc);
        if ((<any>this.constructor)._soft && (raw !== true)) {
            // --- 软删除 ---
            sql.update(this._table, [{
                "time_remove": Time.stamp()
            }]);
            if (typeof where === "string") {
                sql.append(" WHERE (" + where + ") AND `time_remove` = 0");
            } else {
                where.push({
                    "time_remove": "0"
                });
                sql.where(where);
            }
        } else {
            // --- 真删除 ---
            sql.delete(this._table);
            if (typeof where === "string") {
                sql.append(" WHERE " + where);
            } else {
                sql.where(where);
            }
        }
        let rtn = await pc.execute(sql.getSql(), sql.getData());
        if (rtn && rtn.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * --- 根据条件更新数据 ---
     * @param pc 数据库连接/连接池
     * @param data 要更新的数据
     * @param where 筛选条件
     * @param etc etc 对象
     */
    public static async updateByWhere(pc: Mysql.Pool | Mysql.Connection, data: any[], where: any[] | string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcSql, raw?: boolean): Promise<boolean> {
        let sql = Sql.get(etc);
        sql.update(this._table, data);
        if (typeof where === "string") {
            sql.append(" WHERE (" + where + ")");
            if ((<any>this.constructor)._soft && (raw !== true)) {
                sql.append(" AND `time_remove` = 0");
            }
        } else {
            if ((<any>this.constructor)._soft && (raw !== true)) {
                where.push({
                    "time_remove": "0"
                });
            }
            sql.where(where);
        }
        let rtn = await pc.execute(sql.getSql(), sql.getData());
        if (rtn && rtn.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

}
/**
 * Project: Mutton, User: JianSuoQiYue
 * Date: 2019-6-4 21:35
 * Last: 2020-4-14 13:33:51, 2022-07-23 16:01:34, 2022-09-06 22:59:26, 2023-5-24 19:11:37
 */
import * as lSql from '~/lib/sql';
import * as lDb from '~/lib/db';
import * as lTime from '~/lib/time';
import * as lCore from '~/lib/core';
import * as sCtr from '~/sys/ctr';

/**
 * --- 开启软更需要在表添加字段：ALTER TABLE `table_name` ADD `time_remove` bigint NOT NULL DEFAULT '0' AFTER `xxx`; ---
 */
export default class Mod {

    /** --- 表名 --- */
    protected static _$table: string = '';

    /** --- 主键字段名 --- */
    protected static _$primary: string = 'id';

    /** --- 设置后将由 _keyGenerator 函数生成唯一字段 --- */
    protected static _$key: string = '';

    /** ---- 可开启软删软更新软新增 --- */
    protected static _$soft: boolean = false;

    /** --- 要 update 的内容 --- */
    protected _updates: Record<string, boolean> = {};

    /** --- 模型获取的属性 --- */
    protected _data: Record<string, any> = {};

    /** --- 当前选择的分表 _ 后缀 --- */
    protected _index: string | null = null;

    /** --- 数据库连接对象 --- */
    protected _db!: lDb.Pool | lDb.Connection;

    /** --- Sql 对象 --- */
    protected _sql!: lSql.Sql;

    /** --- ctr 对象, Mutton: false, Kebab: true --- */
    protected _ctr?: sCtr.Ctr = undefined;

    /**
     * --- 构造函数 ---
     * @param ctr Ctr 对象
     * @param opt 选项
     */
    public constructor(opt: {
        'db': lDb.Pool | lDb.Connection;
        'ctr'?: sCtr.Ctr;
        'index'?: string;
        'row'?: Record<string, any>;
        'select'?: string | string[];
        'where'?: string | any[] | Record<string, any>;
        'raw'?: boolean;
        'pre'?: string;
    }) {
        /** --- 导入 ctr 对象 --- */
        this._ctr = opt.ctr;
        /** --- 导入数据库连接 --- */
        this._db = opt.db;
        /** --- 新建 sql 对象 --- */
        this._sql = lSql.get(opt.pre ?? opt.ctr);
        if (opt.index) {
            this._index = opt.index;
        }
        // --- 第三个参数用于内部数据导入，将 data 数据合并到本实例化类 ---
        if (opt.row) {
            for (const k in opt.row) {
                const v = opt.row[k];
                this._data[k] = v;
                (this as any)[k] = v;
            }
        }
        if (opt.select) {
            this._sql.select(opt.select, ((this.constructor as any)._$table as string) + (this._index !== null ? ('_' + this._index) : ''));
        }
        if (opt.where) {
            this._sql.select('*', ((this.constructor as any)._$table as string) + (this._index !== null ? ('_' + this._index) : ''));
            if ((this.constructor as any)._soft && !opt.raw) {
                if (typeof opt.where === 'string') {
                    opt.where = '(' + opt.where + ') AND `time_remove` = 0';
                }
                else if (Array.isArray(opt.where)) {
                    opt.where.push({
                        'time_remove': 0
                    });
                }
                else {
                    opt.where['time_remove'] = 0;
                }
            }
            this._sql.where(opt.where);
        }
    }

    // --- 静态方法 ---

    /**
     * --- 添加一个序列 ---
     * @param db 数据库对象
     * @param cs 字段列表
     * @param vs 数据列表
     * @param opt 选项
     */
    public static async insert(
        db: lDb.Pool | lDb.Connection,
        cs: any[] | Record<string, any>,
        vs?: any[] | any[][],
        opt: { 'pre'?: sCtr.Ctr | string; 'index'?: string; } = {}
    ): Promise<boolean | null | false> {
        const sq = lSql.get(opt.pre);
        sq.insert(this._$table + (opt.index ? ('_' + opt.index) : '')).values(cs, vs);
        const r = await db.execute(sq.getSql(), sq.getData());
        if (r.packet === null) {
            return false;
        }
        if (r.packet.affectedRows > 0) {
            return true;
        }
        else {
            return null;
        }
    }

    /**
     * --- 获取添加一个序列的模拟 SQL ---
     * @param cs 字段列表
     * @param vs 数据列表
     * @param opt 选项
     */
    public static insertSql(
        cs: any[] | Record<string, any>,
        vs?: any[] | any[][],
        opt: { 'pre'?: sCtr.Ctr | string; 'index'?: string; } = {}
    ): string {
        const sq = lSql.get(opt.pre);
        sq.insert(this._$table + (opt.index ? ('_' + opt.index) : '')).values(cs, vs);
        return sq.format();
    }

    /**
     * --- 插入数据如果唯一键冲突则更新 ---
     * @param db 数据库对象
     * @param data 要插入的数据
     * @param update 要更新的数据
     * @param opt 选项
     */
    public static async insertDuplicate(
        db: lDb.Pool | lDb.Connection,
        data: any[] | Record<string, any>,
        update: any[],
        opt: { 'pre'?: sCtr.Ctr | string; 'index'?: string; } = {}
    ): Promise<boolean | null> {
        const sq = lSql.get(opt.pre);
        sq.insert(this._$table + (opt.index ? ('_' + opt.index) : '')).values(data).duplicate(update);
        const r = await db.execute(sq.getSql(), sq.getData());
        if (r.packet === null) {
            return false;
        }
        if (r.packet.affectedRows > 0) {
            return true;
        }
        else {
            return null;
        }
    }

    /**
     * --- 根据条件移除条目 ---
     * @param db 数据库对象
     * @param where 筛选条件
     * @param opt 选项
     */
    public static async removeByWhere(
        db: lDb.Pool | lDb.Connection,
        where: string | any[] | Record<string, any>,
        opt: { 'raw'?: boolean; 'pre'?: sCtr.Ctr | string; 'index'?: string; } = {}
    ): Promise<boolean | null> {
        const tim = lTime.stamp();
        const sq = lSql.get(opt.pre);
        if (this._$soft && !opt.raw) {
            // --- 软删除 ---
            sq.update(this._$table + (opt.index ? ('_' + opt.index) : ''), [{
                'time_remove': tim
            }]);
            if (typeof where === 'string') {
                where = '(' + where + ') AND `time_remove` = 0';
            }
            else if (Array.isArray(where)) {
                where.push({
                    'time_remove': 0
                });
            }
            else {
                where['time_remove'] = 0;
            }
        }
        else {
            // --- 真删除 ---
            sq.delete(this._$table + (opt.index ? ('_' + opt.index) : ''));
        }
        sq.where(where);
        const r = await db.execute(sq.getSql(), sq.getData());
        if (r.packet === null) {
            return false;
        }
        if (r.packet.affectedRows > 0) {
            return true;
        }
        else {
            return null;
        }
    }

    /**
     * --- 根据条件更新数据 ---
     * @param db 数据库对象
     * @param data 要更新的数据
     * @param where 筛选条件
     * @param opt 选项
     */
    public static async updateByWhere(
        db: lDb.Pool | lDb.Connection,
        data: any[] | Record<string, any>,
        where: string | any[] | Record<string, any>,
        opt: { 'raw'?: boolean; 'pre'?: sCtr.Ctr | string; 'index'?: string; } = {}
    ): Promise<boolean | null> {
        const sq = lSql.get(opt.pre);
        sq.update(this._$table + (opt.index ? ('_' + opt.index) : ''), data);
        if (this._$soft && !opt.raw) {
            if (typeof where === 'string') {
                where = '(' + where + ') AND `time_remove` = 0';
            }
            else if (Array.isArray(where)) {
                where.push({
                    'time_remove': 0
                });
            }
            else {
                where['time_remove'] = 0;
            }
        }
        sq.where(where);
        const r = await db.execute(sq.getSql(), sq.getData());
        if (r.packet === null) {
            return false;
        }
        if (r.packet.affectedRows > 0) {
            return true;
        }
        else {
            return null;
        }
    }

    /**
     * --- 根据条件更新数据（仅获取 SQL 对象） ---
     * @param data 要更新的数据
     * @param where 筛选条件
     * @param opt 选项
     * @return LSql
     */
    public static updateByWhereSql(
        data: any[],
        where: string | any[] | Record<string, any>,
        opt: { 'raw'?: boolean; 'pre'?: sCtr.Ctr | string; 'index'?: string; } = {}
    ): lSql.Sql {
        const sq = lSql.get(opt.pre);
        sq.update(this._$table + (opt.index ? ('_' + opt.index) : ''), data);
        if (this._$soft && !opt.raw) {
            if (typeof where === 'string') {
                where = '(' + where + ') AND `time_remove` = 0';
            }
            else if (Array.isArray(where)) {
                where.push({
                    'time_remove': 0
                });
            }
            else {
                where['time_remove'] = 0;
            }
        }
        sq.where(where);
        return sq;
    }

    /**
     * --- select 自定字段 ---
     * @param db 数据库对象
     * @param c 字段字符串或字段数组
     * @param opt 选项
     */
    public static select<T extends Mod>(
        db: lDb.Pool | lDb.Connection,
        c: string | string[],
        opt: { 'ctr'?: sCtr.Ctr; 'pre'?: string; 'index'?: string; } = {}
    ): T & Record<string, any> {
        return new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'select': c,
            'index': opt.index
        }) as T;
    }

    /**
     * --- 通过 where 条件获取模型 ---
     * @param db 数据库对象
     * @param s 筛选条件数组或字符串
     * @param opt 选项
     */
    public static where<T extends Mod>(
        db: lDb.Pool | lDb.Connection,
        s: string | any[] | Record<string, any> = '',
        opt: { 'ctr'?: sCtr.Ctr; 'raw'?: boolean; 'pre'?: string; 'index'?: string; } = {}
    ): T & Record<string, any> {
        return new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'where': s,
            'raw': opt.raw,
            'index': opt.index
        }) as T;
    }

    /**
     * --- 获取创建对象，通常用于新建数据库条目 ---
     * @param db 数据库对象
     * @param opt 选项
     */
    public static getCreate<T extends Mod>(
        db: lDb.Pool | lDb.Connection,
        opt: { 'ctr'?: sCtr.Ctr; 'pre'?: string; 'index'?: string; } = {}
    ): T {
        return new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'index': opt.index
        }) as T;
    }

    /**
     * --- 根据主键获取对象 ---
     * @param db 数据库对象
     * @param val 主键值
     * @param lock 是否加锁
     * @param opt 选项
     */
    public static find<T extends Mod>(
        db: lDb.Pool | lDb.Connection,
        val: string | number | null,
        lock: boolean = false,
        opt: { 'ctr'?: sCtr.Ctr; 'raw'?: boolean; 'pre'?: string; 'index'?: string; } = {}
    ): Promise<false | null | (T & Record<string, any>)> {
        return (new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'where': [{
                [this._$primary]: val
            }],
            'raw': opt.raw,
            'index': opt.index
        }) as T).first(lock);
    }

    /**
     * --- 通过 where 条件筛选单条数据 ---
     * @param db 数据库对象
     * @param s 筛选条件数组或字符串
     * @param opt 选项
     */
    public static one<T extends Mod>(
        db: lDb.Pool | lDb.Connection,
        s: string | any[] | Record<string, any>,
        opt: { 'ctr'?: sCtr.Ctr; 'raw'?: boolean; 'pre'?: string; 'index'?: string; } = {}
    ): Promise<false | null | (T & Record<string, any>)> {
        return (new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'where': s,
            'raw': opt.raw,
            'index': opt.index
        }) as T).first();
    }

    /**
     * --- 根据 where 条件获取主键值列表 ---
     * @param db 数据库对象
     * @param where where 条件
     * @param opt 选项
     */
    public static async primarys(
        db: lDb.Pool | lDb.Connection,
        where: string | any[] | Record<string, any> = '',
        opt: { 'ctr'?: sCtr.Ctr; 'raw'?: boolean; 'pre'?: string; 'index'?: string; } = {}
    ): Promise<any[] | false> {
        const sq = lSql.get(opt.pre ?? opt.ctr);
        if (this._$soft && !opt.raw) {
            // --- 不包含已删除 ---
            if (typeof where === 'string') {
                if (where !== '') {
                    where = '(' + where + ') AND `time_remove` = 0';
                }
            }
            else if (Array.isArray(where)) {
                where.push({
                    'time_remove': 0
                });
            }
            else {
                where['time_remove'] = 0;
            }
        }
        sq.select(this._$primary, this._$table + (opt.index ? ('_' + opt.index) : '')).where(where);
        const r = await db.query(sq.getSql(), sq.getData());
        if (r.rows === null) {
            return false;
        }
        const primarys: any[] = [];
        for (const row of r.rows) {
            primarys.push(row[this._$primary]);
        }
        return primarys;
    }

    // --- 动态方法 ---

    public set<T extends this, TK extends keyof T>(n: Record<TK, T[TK]>): void;
    public set<T extends this, TK extends keyof T>(n: TK, v: T[TK]): void;
    /**
     * --- 设置一个/多个属性 ---
     * @param n 字符串或键/值
     * @param v 可能是数字
     */
    public set<T extends this, TK extends keyof T>(n: TK | Record<TK, any>, v?: T[TK]): void {
        if (typeof n === 'object') {
            for (const k in n) {
                const v = n[k];
                // --- 强制更新，因为有的可能就是要强制更新既然设置了 ---
                this._updates[k] = true;
                this._data[k] = v;
                (this as any)[k] = v;
            }
        }
        else {
            if (typeof n !== 'string') {
                return;
            }
            this._updates[n] = true;
            this._data[n] = v;
            (this as any)[n] = v;
        }
    }

    /**
     * --- 获取一个字段值
     * @param n 字段名
     */
    public get(n: string): any {
        return this._data[n];
    }

    /**
     * --- 创建数据 ---
     * @param notWhere 若要不存在才成功，则要传入限定条件
     * @param table 可对限定条件传入适当的表
     */
    public async create(notWhere?: any[], table?: string): Promise<boolean> {
        const cstr: any = this.constructor as any;
        const updates: Record<string, any> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
        }
        if (!table) {
            table = (cstr._$table as string) + (this._index ? ('_' + this._index) : '');
        }

        let r: lDb.IPacket | null = null;
        if ((cstr._$key !== '') && (updates[cstr._$key] === undefined)) {
            let count: number = 0;
            while (true) {
                if (count === 3) {
                    return false;
                }
                updates[cstr._$key] = this._keyGenerator();
                this._data[cstr._$key] = updates[cstr._$key];
                (this as any)[cstr._$key] = updates[cstr._$key];
                this._sql.insert((cstr._$table as string) + (this._index ? ('_' + this._index) : ''));
                if (notWhere) {
                    this._sql.notExists(table, updates, notWhere);
                }
                else {
                    this._sql.values(updates);
                }
                r = await this._db.execute(this._sql.getSql(), this._sql.getData());
                ++count;
                if (!r.error) {
                    break;
                }
                if (r.error.errno !== 1062) {
                    return false;
                }
            }
        }
        else {
            this._sql.insert((cstr._$table as string) + (this._index ? ('_' + this._index) : ''));
            if (notWhere) {
                this._sql.notExists(table, updates, notWhere);
            }
            else {
                this._sql.values(updates);
            }
            r = await this._db.execute(this._sql.getSql(), this._sql.getData());
            if (r.error) {
                return false;
            }
        }
        if (r?.packet?.affectedRows && r?.packet?.affectedRows > 0) {
            this._updates = {};
            this._data[cstr._$primary] = r.packet.insertId;
            (this as any)[cstr._$primary] = this._data[cstr._$primary];
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * --- 唯一键冲突则替换，不冲突则创建数据 ---
     */
    public async replace(): Promise<boolean> {
        const cstr = this.constructor as any;
        const updates: Record<string, any> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
        }

        this._sql.replace((cstr._$table as string) + (this._index ? ('_' + this._index) : '')).values(updates);
        const r = await this._db.execute(this._sql.getSql(), this._sql.getData());
        if (r.packet && r.packet.affectedRows > 0) {
            this._updates = {};
            this._data[cstr._$primary] = r.packet.insertId;
            (this as any)[cstr._$primary] = this._data[cstr._$primary];
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * --- 刷新当前模型获取最新数据 ---
     * @param lock 是否加锁
     */
    public async refresh(lock = false): Promise<boolean | null> {
        const cstr = this.constructor as any;
        this._sql.select('*', (cstr._$table as string) + (this._index ? ('_' + this._index) : '')).where([{
            [cstr._$primary]: this._data[cstr._$primary]
        }]);
        if (lock) {
            this._sql.lock();
        }
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            return false;
        }
        if (r.rows.length === 0) {
            return null;
        }
        for (const k in r.rows[0]) {
            const v = r.rows[0][k];
            this._data[k] = v;
            (this as any)[k] = v;
        }
        return true;
    }

    /**
     * --- 更新 set 的数据到数据库 ---
     */
    public async save(): Promise<boolean> {
        const cstr = this.constructor as any;
        const updates: Record<string, any> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
        }
        if (Object.keys(updates).length === 0) {
            return true;
        }
        this._sql.update((cstr._$table as string) + (this._index ? ('_' + this._index) : ''), [updates]).where([{
            [cstr._$primary]: this._data[cstr._$primary]
        }]);
        const r = await this._db.execute(this._sql.getSql(), this._sql.getData());
        if (r.packet && r.packet.affectedRows > 0) {
            this._updates = {};
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * --- 移除本条目 ---
     * @param raw 是否真实移除
     */
    public async remove(raw: boolean = false): Promise<boolean> {
        const tim = lTime.stamp();
        const cstr = this.constructor as any;
        if (cstr._$soft && !raw) {
            this._sql.update((cstr._$table as string) + (this._index ? ('_' + this._index) : ''), [{
                'time_remove': tim
            }]).where([{
                [cstr._$primary]: this._data[cstr._$primary],
                'time_remove': 0
            }]);
        }
        else {
            this._sql.delete((cstr._$table as string) + (this._index ? ('_' + this._index) : '')).where([{
                [cstr._$primary]: this._data[cstr._$primary]
            }]);
        }
        const r = await this._db.execute(this._sql.getSql(), this._sql.getData());
        if (r.packet && r.packet.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * --- 获取数据库第一个对象 ---
     * @param lock 是否加锁
     */
    public async first(lock: boolean = false): Promise<this | false | null> {
        this._sql.limit(1);
        if (lock) {
            this._sql.lock();
        }
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            return false;
        }
        if (r.rows.length === 0) {
            return null;
        }
        for (const k in r.rows[0]) {
            const v = r.rows[0][k];
            this._data[k] = v;
            (this as any)[k] = v;
        }
        return this;
    }

    public async all(): Promise<false | this[]>;
    public async all(key: string): Promise<false | Record<string, this>>;
    /**
     * --- 获取列表 ---
     * @param key 是否以某个字段为主键
     */
    public async all(key?: string): Promise<false | this[] | Record<string, this>> {
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            if (this._ctr) {
                await lCore.log(this._ctr, '[all, mod] ' + JSON.stringify(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            }
            return false;
        }
        if (key) {
            const list: Record<string, this> = {};
            for (const row of r.rows) {
                const obj = new (this.constructor as any)({
                    'db': this._db,
                    'ctr': this._ctr,
                    'pre': this._sql.getPre(),
                    'row': row,
                    'index': this._index
                });
                list[row[key]] = obj;
            }
            return list;
        }
        else {
            const list: this[] = [];
            for (const row of r.rows) {
                const obj = new (this.constructor as any)({
                    'db': this._db,
                    'ctr': this._ctr,
                    'pre': this._sql.getPre(),
                    'row': row,
                    'index': this._index
                });
                list.push(obj);
            }
            return list;
        }
    }

    public async explain(all?: false): Promise<false | string>;
    public async explain(all: true): Promise<false | Record<string, any>>;
    /**
     * --- 获取数查询（SELECT）扫描情况，获取字符串或kv数组 ---
     * @param all 是否获取完全的情况，默认不获取，只返回扫描情况
     */
    public async explain(all = false): Promise<false | string | Record<string, any>> {
        const r = await this._db.query('EXPLAIN ' + this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            return false;
        }
        if (!r.rows[0]) {
            return false;
        }
        if (!all) {
            return r.rows[0].type;
        }
        return r.rows[0];
    }

    /**
     * --- 获取总条数，自动抛弃 LIMIT，仅用于获取数据的情况（select） ---
     */
    public async total(): Promise<number> {
        const sql: string = this._sql.getSql().replace(/SELECT .+? FROM/, 'SELECT COUNT(*) AS `count` FROM').replace(/ LIMIT [0-9 ,]+/, '');
        const r = await this._db.query(sql, this._sql.getData());
        if (r.rows === null) {
            return 0;
        }
        if (r.rows[0]) {
            return r.rows[0].count;
        }
        return 0;
    }

    /**
     * --- 根据当前条件，筛选出当前条目该有的数据条数 ---
     */
    public async count(): Promise<number> {
        const sql: string = this._sql.getSql().replace(/SELECT .+? FROM/, 'SELECT COUNT(*) AS `count` FROM');
        const r = await this._db.query(sql, this._sql.getData());
        if (r.rows === null) {
            return 0;
        }
        if (r.rows[0]) {
            return r.rows[0].count;
        }
        return 0;
    }

    /**
     * @param f 表名
     * @param s ON 信息
     * @param type 类型
     */
    public join(f: string, s: any[] = [], type: string = 'INNER'): this {
        this._sql.join(f, s, type);
        return this;
    }

    /**
     * --- left join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public leftJoin(f: string, s: any[] = []): this {
        this._sql.leftJoin(f, s);
        return this;
    }

    /**
     * --- right join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public rightJoin(f: string, s: any[] = []): this {
        this._sql.rightJoin(f, s);
        return this;
    }

    /**
     * --- inner join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public innerJoin(f: string, s: any[] = []): this {
        this._sql.innerJoin(f, s);
        return this;
    }

    /**
     * --- full join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public fullJoin(f: string, s: any[] = []): this {
        this._sql.fullJoin(f, s);
        return this;
    }

    /**
     * --- cross join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public crossJoin(f: string, s: any[] = []): this {
        this._sql.crossJoin(f, s);
        return this;
    }

    /**
     * --- 筛选器 ---
     * @param s 筛选条件数组或字符串
     */
    public having(s: string | any[] | Record<string, any>): this {
        this._sql.having(s);
        return this;
    }

    /**
     * --- 筛选器 ---
     * @param s 筛选条件数组或字符串
     * @param raw 是否包含已被软删除的数据
     */
    public filter(s: string | any[] | Record<string, any>, raw: boolean = false): this {
        const cstr = this.constructor as any;
        if (cstr._soft && !raw) {
            if (typeof s === 'string') {
                s = '(' + s + ') AND `time_remove` = 0';
            }
            else {
                s.push({
                    'time_remove': 0
                });
            }
        }
        this._sql.where(s);
        return this;
    }

    /**
     * --- 是 filter 的别名 ---
     * @param s 筛选条件数组或字符串
     * @param raw 是否包含已被软删除的数据
     */
    public where(s: string | any[], raw: boolean = false): this {
        return this.filter(s, raw);
    }

    /**
     * --- ORDER BY ---
     * @param c 字段字符串或数组
     * @param d 排序规则
     */
    public by(c: string | string[], d: 'DESC' | 'ASC' = 'DESC'): this {
        this._sql.by(c, d);
        return this;
    }

    /**
     * --- GROUP BY ---
     * @param c 字段字符串或数组
     */
    public group(c: string | string[]): this {
        this._sql.group(c);
        return this;
    }

    /**
     * --- LIMIT ---
     * @param a 起始
     * @param b 长度
     */
    public limit(a: number, b: number = 0): this {
        this._sql.limit(a, b);
        return this;
    }

    /**
     * --- 分页 ---
     * @param count 每页条数
     * @param page 当前页数
     */
    public page(count: number, page: number = 1): this {
        this._sql.limit(count * (page - 1), count);
        return this;
    }

    /**
     * --- 在 sql 最后追加字符串 ---
     * @param sql
     */
    public append(sql: string): this {
        this._sql.append(sql);
        return this;
    }

    /**
     * --- 获取 sql 语句 ---
     */
    public getSql(): string {
        return this._sql.getSql();
    }

    /**
     * --- 获取全部 data ---
     */
    public getData(): any[] {
        return this._sql.getData();
    }

    /**
     * --- 获取带 data 的 sql 语句 ---
     * @param sql sql 语句
     * @param data 数据
     */
    public format(sql?: string, data?: any[]): string {
        return this._sql.format(sql, data);
    }

    /**
     * --- 获取值对象 ---
     */
    public toArray(): Record<string, any> {
        return this._data;
    }

    /**
     * --- 当 _key 不为空时，则依据继承此方法的方法自动生成填充 key ---
     */
    protected _keyGenerator(): string {
        return '';
    }

}

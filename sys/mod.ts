/**
 * Project: Mutton, User: JianSuoQiYue
 * Date: 2019-6-4 21:35
 * Last: 2020-4-14 13:33:51, 2022-07-23 16:01:34, 2022-09-06 22:59:26, 2023-5-24 19:11:37, 2023-6-13 21:47:58, 2023-7-10 18:54:03, 2023-8-23 17:03:16, 2023-12-11 15:21:22, 2023-12-20 23:12:03
 */
import * as lSql from '~/lib/sql';
import * as lDb from '~/lib/db';
import * as lTime from '~/lib/time';
import * as lCore from '~/lib/core';
import * as sCtr from '~/sys/ctr';
import * as types from '~/types';

/** --- 条数列表 --- */
class Rows<T extends Mod> implements types.Rows<T> {

    private readonly _items: T[] = [];

    public constructor(initialItems: T[] = []) {
        this._items = initialItems;
    }

    /** --- 总行数 --- */
    public get length(): number {
        return this._items.length;
    }

    /** --- 通过索引获取一个对象 --- */
    public item(index: number): T {
        return this._items[index];
    }

    /** --- 转换为数组对象 --- */
    public toArray(): Array<Record<string, types.DbValue>> {
        const arr: Array<Record<string, types.DbValue>> = [];
        for (const item of this._items) {
            arr.push(item.toArray());
        }
        return arr;
    }

    public [Symbol.iterator](): Iterator<T> {
        let index = 0;
        return {
            next: (): IteratorResult<T> => {
                if (index < this._items.length) {
                    return {
                        value: this._items[index++],
                        done: false
                    };
                }
                else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            }
        };
    }
}

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
    protected _data: Record<string, types.DbValue> = {};

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
        'alias'?: string;
        'row'?: Record<string, types.DbValue>;
        'select'?: string | string[];
        'where'?: string | types.Json;
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
                (this as Record<string, types.Json>)[k] = v;
            }
        }
        if (opt.select) {
            this._sql.select(
                opt.select,
                ((this.constructor as Record<string, types.Json>)._$table as string) +
                (this._index !== null ? ('_' + this._index) : '') +
                (opt.alias ? ' ' + opt.alias : '')
            );
        }
        if (opt.where !== undefined) {
            this._sql.select('*', ((this.constructor as Record<string, types.Json>)._$table as string) + (this._index !== null ? ('_' + this._index) : ''));
            if ((this.constructor as Record<string, types.Json>)._soft && !opt.raw) {
                if (typeof opt.where === 'string') {
                    opt.where = opt.where ? ('(' + opt.where + ') AND ') : '`time_remove` = 0';
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
        cs: string[] | Record<string, types.DbValue>,
        vs?: types.DbValue[] | types.DbValue[][],
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
        cs: string[] | Record<string, types.DbValue>,
        vs?: types.DbValue[] | types.DbValue[][],
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
        data: Record<string, types.DbValue>,
        update: types.Json,
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
        where: string | types.Json,
        opt: {
            'raw'?: boolean;
            'pre'?: sCtr.Ctr | string;
            'index'?: string;
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'limit'?: [number, number?];
        } = {}
    ): Promise<number | false | null> {
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
        if (opt.by) {
            sq.by(opt.by[0], opt.by[1]);
        }
        if (opt.limit) {
            sq.limit(opt.limit[0], opt.limit[1]);
        }
        const r = await db.execute(sq.getSql(), sq.getData());
        if (r.packet === null) {
            return false;
        }
        if (r.packet.affectedRows > 0) {
            return r.packet.affectedRows;
        }
        return null;
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
        data: types.Json,
        where: string | types.Json,
        opt: {
            'raw'?: boolean;
            'pre'?: sCtr.Ctr | string;
            'index'?: string;
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'limit'?: [number, number?];
        } = {}
    ): Promise<number | false | null> {
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
        if (opt.by) {
            sq.by(opt.by[0], opt.by[1]);
        }
        if (opt.limit) {
            sq.limit(opt.limit[0], opt.limit[1]);
        }
        const r = await db.execute(sq.getSql(), sq.getData());
        if (r.packet === null) {
            return false;
        }
        if (r.packet.affectedRows > 0) {
            return r.packet.affectedRows;
        }
        return null;
    }

    /**
     * --- 根据条件更新数据（仅获取 SQL 对象） ---
     * @param data 要更新的数据
     * @param where 筛选条件
     * @param opt 选项
     * @return LSql
     */
    public static updateByWhereSql(
        data: types.Json,
        where: string | types.Json,
        opt: {
            'raw'?: boolean;
            'pre'?: sCtr.Ctr | string;
            'index'?: string;
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'limit'?: [number, number?];
        } = {}
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
        if (opt.by) {
            sq.by(opt.by[0], opt.by[1]);
        }
        if (opt.limit) {
            sq.limit(opt.limit[0], opt.limit[1]);
        }
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
        opt: { 'ctr'?: sCtr.Ctr; 'pre'?: string; 'index'?: string; 'alias'?: string; } = {}
    ): T & Record<string, types.DbValue> {
        return new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'select': c,
            'index': opt.index,
            'alias': opt.alias
        }) as T & Record<string, types.DbValue>;
    }

    /**
     * --- 通过 where 条件获取模型 ---
     * @param db 数据库对象
     * @param s 筛选条件数组或字符串
     * @param opt 选项
     */
    public static where<T extends Mod>(
        db: lDb.Pool | lDb.Connection,
        s: string | types.Json = '',
        opt: { 'ctr'?: sCtr.Ctr; 'raw'?: boolean; 'pre'?: string; 'index'?: string; } = {}
    ): T & Record<string, types.DbValue> {
        return new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'where': s,
            'raw': opt.raw,
            'index': opt.index
        }) as T & Record<string, types.DbValue>;
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
        opt: { 'ctr'?: sCtr.Ctr; 'lock'?: boolean; 'raw'?: boolean; 'pre'?: string; 'index'?: string; } = {}
    ): Promise<false | null | (T & Record<string, types.DbValue>)> {
        return (new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'where': [{
                [this._$primary]: val
            }],
            'raw': opt.raw,
            'index': opt.index
        }) as T & Record<string, types.DbValue>).first(opt.lock);
    }

    public static async one(
        db: lDb.Pool | lDb.Connection,
        s: string | types.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'raw'?: boolean;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
            'array': true;
        }
    ): Promise<false | null | Record<string, types.DbValue>>;
    public static async one<T extends Mod>(
        db: lDb.Pool | lDb.Connection,
        s: string | types.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'raw'?: boolean;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
            'array'?: false;
        }
    ): Promise<false | null | (T & Record<string, types.DbValue>)>;
    /**
     * --- 通过 where 条件筛选单条数据 ---
     * @param db 数据库对象
     * @param s 筛选条件数组或字符串
     * @param opt 选项
     */
    public static async one<T extends Mod>(
        db: lDb.Pool | lDb.Connection,
        s: string | types.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'raw'?: boolean;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
            'array'?: boolean;
        } = {}
    ): Promise<false | null | (T & Record<string, types.DbValue>) | Record<string, types.DbValue>> {
        if (!opt.index) {
            const o = new this({
                'select': opt.select,
                'db': db,
                'ctr': opt.ctr,
                'pre': opt.pre,
                'where': s,
                'raw': opt.raw
            }) as T;
            return opt.array ? o.firstArray() : o.first();
        }
        if (typeof opt.index === 'string') {
            opt.index = [opt.index];
        }
        for (const item of opt.index) {
            const row = new this({
                'select': opt.select,
                'db': db,
                'ctr': opt.ctr,
                'pre': opt.pre,
                'where': s,
                'raw': opt.raw,
                'index': item
            }) as T;
            const rowr = await (opt.array ? row.firstArray() : row.first());
            if (rowr) {
                return rowr;
            }
            if (rowr === false) {
                return false;
            }
            // --- 如果是 null 再去下个 index 找一下 ---
        }
        return null;
    }

    /**
     * --- 通过 where 条件筛选单条数据返回原生对象 ---
     * @param db 数据库对象
     * @param s 筛选条件数组或字符串
     * @param opt 选项
     */
    public static async oneArray(
        db: lDb.Pool | lDb.Connection,
        s: string | types.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'raw'?: boolean;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
        } = {}
    ): Promise<false | null | Record<string, types.DbValue>> {
        (opt as types.Json).array = true;
        return this.one(db, s, opt);
    }

    /**
     * --- 根据 where 条件获取主键值列表 ---
     * @param db 数据库对象
     * @param where where 条件
     * @param opt 选项
     */
    public static async primarys(
        db: lDb.Pool | lDb.Connection,
        where: string | types.Json = '',
        opt: { 'ctr'?: sCtr.Ctr; 'raw'?: boolean; 'pre'?: string; 'index'?: string; } = {}
    ): Promise<types.DbValue[] | false> {
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
        const primarys: types.DbValue[] = [];
        for (const row of r.rows) {
            primarys.push(row[this._$primary]);
        }
        return primarys;
    }

    /**
     * --- 将 key val 组成的数据列表转换为原生对象模式 ---
     * @param obj 要转换的 kv 数据列表
     */
    public static toArrayByRecord<T extends Mod>(
        obj: Record<string, T>
    ): Record<string, Record<string, types.DbValue>> {
        const rtn: Record<string, Record<string, types.DbValue>> = {};
        for (const key in obj) {
            rtn[key] = obj[key].toArray();
        }
        return rtn;
    }

    // --- 动态方法 ---

    public set<T extends this, TK extends keyof T>(n: Record<TK, T[TK]>): void;
    public set<T extends this, TK extends keyof T>(n: TK, v: T[TK]): void;
    /**
     * --- 设置一个/多个属性 ---
     * @param n 字符串或键/值
     * @param v 可能是数字
     */
    public set<T extends this, TK extends keyof T>(n: TK | Record<TK, types.DbValue>, v?: T[TK]): void {
        if (typeof n === 'object') {
            // --- { x: y } ---
            for (const k in n) {
                const v = n[k];
                // --- 强制更新，因为有的可能就是要强制更新既然设置了 ---
                this._updates[k] = true;
                this._data[k] = v;
                (this as types.Json)[k] = v;
            }
        }
        else {
            // --- x, y ---
            if (v === undefined) {
                return;
            }
            if (typeof n !== 'string') {
                return;
            }
            this._updates[n] = true;
            this._data[n] = v;
            (this as types.Json)[n] = v;
        }
    }

    /**
     * --- 获取一个字段值
     * @param n 字段名
     */
    public get(n: string): types.DbValue {
        return this._data[n];
    }

    /**
     * --- 创建数据 ---
     * @param notWhere 若要不存在才成功，则要传入限定条件
     * @param table 可对限定条件传入适当的表
     */
    public async create(notWhere?: string | types.Json, table?: string): Promise<boolean> {
        const cstr = this.constructor as Record<string, types.Json>;
        const updates: Record<string, types.DbValue> = {};
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
                (this as types.Json)[cstr._$key] = updates[cstr._$key];
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
            (this as types.Json)[cstr._$primary] = this._data[cstr._$primary];
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
        const cstr = this.constructor as Record<string, types.Json>;
        const updates: Record<string, types.DbValue> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
        }

        this._sql.replace((cstr._$table as string) + (this._index ? ('_' + this._index) : '')).values(updates);
        const r = await this._db.execute(this._sql.getSql(), this._sql.getData());
        if (r.packet && r.packet.affectedRows > 0) {
            this._updates = {};
            this._data[cstr._$primary] = r.packet.insertId;
            (this as types.Json)[cstr._$primary] = this._data[cstr._$primary];
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
        const cstr = this.constructor as Record<string, types.Json>;
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
            (this as types.Json)[k] = v;
        }
        return true;
    }

    /**
     * --- 更新 set 的数据到数据库 ---
     */
    public async save(): Promise<boolean> {
        const cstr = this.constructor as Record<string, types.Json>;
        const updates: Record<string, types.DbValue> = {};
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
        const cstr = this.constructor as Record<string, types.Json>;
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

    public async first(
        lock: boolean,
        array: true
    ): Promise<false | null | Record<string, types.DbValue>>;
    public async first(
        lock?: boolean,
        array?: false
    ): Promise<false | null | (this & Record<string, types.DbValue>)>;
    /**
     * --- 获取数据库第一个对象 ---
     * @param lock 是否加锁
     * @param array 是否返回原生对象
     */
    public async first(
        lock: boolean = false,
        array: boolean = false
    ): Promise<false | null | (this & Record<string, types.DbValue>) | Record<string, types.DbValue>> {
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
        if (array) {
            return r.rows[0];
        }
        for (const k in r.rows[0]) {
            const v = r.rows[0][k];
            this._data[k] = v;
            (this as unknown as Record<string, types.DbValue>)[k] = v;
        }
        return this as this & Record<string, types.DbValue>;
    }

    /**
     * --- 获取数据库第一个原生对象 ---
     * @param lock 是否加锁
     */
    public async firstArray(
        lock: boolean = false
    ): Promise<Record<string, types.DbValue> | false | null> {
        return this.first(lock, true);
    }

    public async all(): Promise<false | Rows<this>>;
    public async all(key: string): Promise<false | Record<string, this>>;
    /**
     * --- 获取列表 ---
     * @param key 是否以某个字段为主键
     */
    public async all(key?: string): Promise<false | Rows<this> | Record<string, this>> {
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
                const obj = new (this.constructor as new (
                    o: Record<string, types.Json>
                ) => this)({
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
        const list: this[] = [];
        for (const row of r.rows) {
            const obj = new (this.constructor as new (
                o: Record<string, types.Json>
            ) => this)({
                'db': this._db,
                'ctr': this._ctr,
                'pre': this._sql.getPre(),
                'row': row,
                'index': this._index
            });
            list.push(obj);
        }
        return new Rows<this>(list);
    }

    public async allArray(): Promise<false | Array<Record<string, types.DbValue>>>;
    public async allArray(key: string): Promise<false | Record<string, Record<string, types.DbValue>>>;
    /**
     * --- 获取列表（得到的为原生对象或数组，不是模型） ---
     * @param key 是否以某个字段为主键
     */
    public async allArray(key?: string): Promise<
        false |
        Array<Record<string, types.DbValue>> |
        Record<string, Record<string, types.DbValue>>
    > {
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            if (this._ctr) {
                await lCore.log(this._ctr, '[allArray, mod] ' + JSON.stringify(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            }
            return false;
        }
        if (key) {
            const list: Record<string, Record<string, types.DbValue>> = {};
            for (const row of r.rows) {
                list[row[key]] = row;
            }
            return list;
        }
        return r.rows;
    }

    public async explain(all?: false): Promise<false | string>;
    public async explain(all: true): Promise<false | Record<string, types.DbValue>>;
    /**
     * --- 获取数查询（SELECT）扫描情况，获取字符串或kv数组 ---
     * @param all 是否获取完全的情况，默认不获取，只返回扫描情况
     */
    public async explain(all = false): Promise<false | string | Record<string, types.DbValue>> {
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
    public join(f: string, s: types.Json = [], type: string = 'INNER'): this {
        this._sql.join(f, s, type);
        return this;
    }

    /**
     * --- left join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public leftJoin(f: string, s: types.Json): this {
        this._sql.leftJoin(f, s);
        return this;
    }

    /**
     * --- right join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public rightJoin(f: string, s: types.Json): this {
        this._sql.rightJoin(f, s);
        return this;
    }

    /**
     * --- inner join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public innerJoin(f: string, s: types.Json): this {
        this._sql.innerJoin(f, s);
        return this;
    }

    /**
     * --- full join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public fullJoin(f: string, s: types.Json): this {
        this._sql.fullJoin(f, s);
        return this;
    }

    /**
     * --- cross join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public crossJoin(f: string, s: types.Json): this {
        this._sql.crossJoin(f, s);
        return this;
    }

    /**
     * --- 筛选器 ---
     * @param s 筛选条件数组或字符串
     */
    public having(s: types.Json): this {
        this._sql.having(s);
        return this;
    }

    /**
     * --- 筛选器 ---
     * @param s 筛选条件数组或字符串
     * @param raw 是否包含已被软删除的数据
     */
    public filter(
        s: types.Json,
        raw: boolean = false
    ): this {
        const cstr = this.constructor as Record<string, types.Json>;
        if (cstr._soft && !raw) {
            if (typeof s === 'string') {
                s = '(' + s + ') AND `time_remove` = 0';
            }
            else if (Array.isArray(s)) {
                s.push({
                    'time_remove': 0
                });
            }
            else {
                s['time_remove'] = 0;
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
    public where(
        s: types.Json,
        raw: boolean = false
    ): this {
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
    public getData(): types.DbValue[] {
        return this._sql.getData();
    }

    /**
     * --- 获取带 data 的 sql 语句 ---
     * @param sql sql 语句
     * @param data 数据
     */
    public format(sql?: string, data?: types.DbValue[]): string {
        return this._sql.format(sql, data);
    }

    /**
     * --- 获取值对象 ---
     */
    public toArray(): Record<string, types.DbValue> {
        return this._data;
    }

    /**
     * --- 当 _key 不为空时，则依据继承此方法的方法自动生成填充 key ---
     */
    protected _keyGenerator(): string {
        return '';
    }

}

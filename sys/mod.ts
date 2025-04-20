/**
 * Project: Mutton, User: JianSuoQiYue
 * Date: 2019-6-4 21:35
 * Last: 2020-4-14 13:33:51, 2022-07-23 16:01:34, 2022-09-06 22:59:26, 2023-5-24 19:11:37, 2023-6-13 21:47:58, 2023-7-10 18:54:03, 2023-8-23 17:03:16, 2023-12-11 15:21:22, 2023-12-20 23:12:03, 2024-3-8 16:05:29, 2024-3-20 19:58:15, 2024-8-11 21:14:54, 2024-10-5 14:00:22, 2024-12-14 19:58:34
 */
import * as lSql from '~/lib/sql';
import * as lDb from '~/lib/db';
import * as lTime from '~/lib/time';
import * as lCore from '~/lib/core';
import * as lText from '~/lib/text';
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
    public toArray(): Array<Record<string, any>> {
        const arr: Array<Record<string, any>> = [];
        for (const item of this._items) {
            arr.push(item.toArray());
        }
        return arr;
    }

    /** --- 根据规则筛掉项，predicate 返回 true 代表保留 --- */
    public filter(predicate: (value: T, index: number) => boolean): Rows<T> {
        const items: T[] = [];
        for (let i = 0; i < this._items.length; ++i) {
            if (!predicate(this._items[i], i)) {
                continue;
            }
            items.push(this._items[i]);
        }
        return new Rows<T>(items);
    }

    /** --- 重塑对象内容 --- */
    public map<TU>(allbackfn: (value: T, index: number) => TU): TU[] {
        const items: TU[] = [];
        for (let i = 0; i < this._items.length; ++i) {
            items.push(allbackfn(this._items[i], i));
        }
        return items;
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
    protected _data: Record<string, any> = {};

    /** --- 当前选择的分表 _ 后缀，多个代表联查 --- */
    protected _index: string[] | null = null;

    /** --- 必须追加的数据筛选 key 与 values，仅单表模式有效 --- */
    protected _contain: {
        'key': string;
        'list': string[];
    } | null = null;

    /** --- 已算出的 total --- */
    protected _total: number[] = [];

    /** --- 数据库连接对象 --- */
    protected _db!: lDb.Pool | lDb.Transaction;

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
        'db': lDb.Pool | lDb.Transaction;
        'ctr'?: sCtr.Ctr;
        'index'?: string | string[];
        'alias'?: string;
        'row'?: Record<string, any>;
        'select'?: string | string[];
        'where'?: string | types.Json;
        'contain'?: {
            'key': string;
            'list': string[];
        };
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
            this._index = typeof opt.index === 'string' ? [opt.index] : [...new Set(opt.index)];
        }
        if (opt.contain) {
            this._contain = opt.contain;
        }
        // --- 第三个参数用于内部数据导入，将 data 数据合并到本实例化类 ---
        if (opt.row) {
            for (const k in opt.row) {
                const v = opt.row[k];
                this._data[k] = v;
                (this as Record<string, types.Json>)[k] = v;
            }
        }
        /** --- 是否有 select --- */
        const select = opt.select ? opt.select : (opt.where ? '*' : '');
        if (select) {
            this._sql.select(
                select,
                ((this.constructor as Record<string, types.Json>)._$table as string) +
                (this._index !== null ? ('_' + this._index[0]) : '') +
                (opt.alias ? ' ' + opt.alias : '')
            );
        }
        if (opt.where !== undefined) {
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

    /** --- 创建字段对象 --- */
    public static column(field: string): {
        'type': 'column';
        'token': string;
        'value': string;
    } {
        return lSql.column(field);
    }

    /**
     * --- 添加一个序列 ---
     * @param db 数据库对象
     * @param cs 字段列表
     * @param vs 数据列表
     * @param opt 选项
     */
    public static async insert(
        db: lDb.Pool | lDb.Transaction,
        cs: string[] | Record<string, any>,
        vs?: any[] | any[][],
        opt: { 'pre'?: sCtr.Ctr | string; 'index'?: string; } = {}
    ): Promise<boolean | null | false> {
        const sq = lSql.get(opt.pre);
        sq.insert(this._$table + (opt.index ? ('_' + opt.index) : '')).values(cs, vs);
        const r = await db.execute(sq.getSql(), sq.getData());
        if (r.packet === null) {
            await lCore.log(opt.pre instanceof sCtr.Ctr ? opt.pre : {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[insert, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1), '-error');
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
        cs: string[] | Record<string, any>,
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
        db: lDb.Pool | lDb.Transaction,
        data: Record<string, any>,
        update: types.Json,
        opt: { 'pre'?: sCtr.Ctr | string; 'index'?: string; } = {}
    ): Promise<boolean | null> {
        const sq = lSql.get(opt.pre);
        sq.insert(this._$table + (opt.index ? ('_' + opt.index) : '')).values(data).duplicate(update);
        const r = await db.execute(sq.getSql(), sq.getData());
        if (r.packet === null) {
            await lCore.log(opt.pre instanceof sCtr.Ctr ? opt.pre : {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[insertDuplicate, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
        db: lDb.Pool | lDb.Transaction,
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
            await lCore.log(opt.pre instanceof sCtr.Ctr ? opt.pre : {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[removeByWhere, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        if (r.packet.affectedRows > 0) {
            return r.packet.affectedRows;
        }
        return null;
    }

    /**
     * --- 根据条件移除条目（仅获取 SQL 对象） ---
     * @param db 数据库对象
     * @param where 筛选条件
     * @param opt 选项
     */
    public static removeByWhereSql(
        db: lDb.Pool | lDb.Transaction,
        where: string | types.Json,
        opt: {
            'raw'?: boolean;
            'pre'?: sCtr.Ctr | string;
            'index'?: string;
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'limit'?: [number, number?];
        } = {}
    ): lSql.Sql {
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
        return sq;
    }

    /**
     * --- 根据条件更新数据 ---
     * @param db 数据库对象
     * @param data 要更新的数据
     * @param where 筛选条件
     * @param opt 选项
     */
    public static async updateByWhere(
        db: lDb.Pool | lDb.Transaction,
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
            await lCore.log(opt.pre instanceof sCtr.Ctr ? opt.pre : {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[updateByWhere, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
        db: lDb.Pool | lDb.Transaction,
        c: string | string[],
        opt: {
            'ctr'?: sCtr.Ctr; 'pre'?: string;
            'index'?: string | string[]; 'alias'?: string;
            'contain'?: {
                'key': string;
                'list': string[];
            };
        } = {}
    ): T & Record<string, any> {
        return new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'select': c,
            'index': opt.index,
            'alias': opt.alias,
            'contain': opt.contain
        }) as T & Record<string, any>;
    }

    /**
     * --- 通过 where 条件获取模型 ---
     * @param db 数据库对象
     * @param s 筛选条件数组或字符串
     * @param opt 选项
     */
    public static where<T extends Mod>(
        db: lDb.Pool | lDb.Transaction,
        s: string | types.Json = '',
        opt: {
            'ctr'?: sCtr.Ctr; 'raw'?: boolean; 'pre'?: string; 'index'?: string | string[];
            'contain'?: {
                'key': string;
                'list': string[];
            };
        } = {}
    ): T & Record<string, any> {
        return new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'where': s,
            'raw': opt.raw,
            'index': opt.index,
            'contain': opt.contain
        }) as T & Record<string, any>;
    }

    /**
     * --- 获取创建对象，通常用于新建数据库条目 ---
     * @param db 数据库对象
     * @param opt 选项
     */
    public static getCreate<T extends Mod>(
        db: lDb.Pool | lDb.Transaction,
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
        db: lDb.Pool | lDb.Transaction,
        val: string | number | null,
        opt: { 'ctr'?: sCtr.Ctr; 'lock'?: boolean; 'raw'?: boolean; 'pre'?: string; 'index'?: string; } = {}
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
        }) as T & Record<string, any>).first(opt.lock);
    }

    public static async one(
        db: lDb.Pool | lDb.Transaction,
        s: string | types.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'raw'?: boolean;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'array': true;
        }
    ): Promise<false | null | Record<string, any>>;
    public static async one<T extends Mod>(
        db: lDb.Pool | lDb.Transaction,
        s: string | types.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'raw'?: boolean;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'array'?: false;
        }
    ): Promise<false | null | (T & Record<string, any>)>;
    /**
     * --- 通过 where 条件筛选单条数据 ---
     * @param db 数据库对象
     * @param s 筛选条件数组或字符串
     * @param opt 选项
     */
    public static async one<T extends Mod>(
        db: lDb.Pool | lDb.Transaction,
        s: string | types.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'raw'?: boolean;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'array'?: boolean;
        } = {}
    ): Promise<false | null | (T & Record<string, any>) | Record<string, any>> {
        if (!opt.index) {
            const o = new this({
                'select': opt.select,
                'db': db,
                'ctr': opt.ctr,
                'pre': opt.pre,
                'where': s,
                'raw': opt.raw
            }) as T;
            if (opt.by) {
                o.by(opt.by[0], opt.by[1]);
            }
            return opt.array ? o.firstArray() : o.first();
        }
        opt.index = typeof opt.index === 'string' ? [opt.index] : [...new Set(opt.index)];
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
            if (opt.by) {
                row.by(opt.by[0], opt.by[1]);
            }
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
        db: lDb.Pool | lDb.Transaction,
        s: string | types.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'raw'?: boolean;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
        } = {}
    ): Promise<false | null | Record<string, any>> {
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
        db: lDb.Pool | lDb.Transaction,
        where: string | types.Json = '',
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
            await lCore.log(opt.ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[primarys, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        const primarys: any[] = [];
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
    ): Record<string, Record<string, any>> {
        const rtn: Record<string, Record<string, any>> = {};
        for (const key in obj) {
            rtn[key] = obj[key].toArray();
        }
        return rtn;
    }

    // --- 动态方法 ---

    public set<T extends this, TK extends keyof T>(n: Record<TK, T[TK] | undefined>): void;
    public set<T extends this, TK extends keyof T>(n: TK, v: T[TK]): void;
    /**
     * --- 设置一个/多个属性 ---
     * @param n 字符串或键/值
     * @param v 可能是数字
     */
    public set<T extends this, TK extends keyof T>(n: TK | Record<TK, T[TK] | undefined>, v?: T[TK]): void {
        if (typeof n === 'object') {
            // --- { x: y } ---
            for (const k in n) {
                const v = n[k];
                if (v === undefined) {
                    continue;
                }
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
    public get(n: string): any {
        return this._data[n];
    }

    /**
     * --- 创建数据 ---
     * @param notWhere 若要不存在才成功，则要传入限定条件
     * @param table 可对限定条件传入适当的表
     */
    public async create(notWhere?: string | types.Json, table?: string): Promise<boolean> {
        const cstr = this.constructor as Record<string, types.Json>;
        const updates: Record<string, any> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
        }
        if (!table) {
            table = (cstr._$table as string) + (this._index ? ('_' + this._index[0]) : '');
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
                this._sql.insert((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : ''));
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
                    await lCore.log(this._ctr ?? {
                        'path': '',
                        'urlFull': '',
                        'hostname': '',
                        'req': null,
                        'get': {},
                        'cookie': {},
                        'headers': {}
                    }, '[create0, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                    return false;
                }
            }
        }
        else {
            this._sql.insert((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : ''));
            if (notWhere) {
                this._sql.notExists(table, updates, notWhere);
            }
            else {
                this._sql.values(updates);
            }
            r = await this._db.execute(this._sql.getSql(), this._sql.getData());
            if (r.error) {
                if (r.error.errno !== 1062) {
                    await lCore.log(this._ctr ?? {
                        'path': '',
                        'urlFull': '',
                        'hostname': '',
                        'req': null,
                        'get': {},
                        'cookie': {},
                        'headers': {}
                    }, '[create1, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                }
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
        const updates: Record<string, any> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
        }

        this._sql.replace((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : '')).values(updates);
        const r = await this._db.execute(this._sql.getSql(), this._sql.getData());
        if (r.packet === null) {
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[replace, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        if (r.packet.affectedRows > 0) {
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
        this._sql.select('*', (cstr._$table as string) + (this._index ? ('_' + this._index[0]) : '')).where([{
            [cstr._$primary]: this._data[cstr._$primary]
        }]);
        if (lock) {
            this._sql.lock();
        }
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[refresh, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
     * --- 更新 set 的数据到数据库，有未保存数据时才保存 ---
     */
    public async save(): Promise<boolean> {
        if (Object.keys(this._updates).length === 0) {
            return true;
        }
        const cstr = this.constructor as Record<string, types.Json>;
        const updates: Record<string, any> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
        }
        this._sql.update((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : ''), [updates]).where([{
            [cstr._$primary]: this._data[cstr._$primary]
        }]);
        const r = await this._db.execute(this._sql.getSql(), this._sql.getData());
        if (r.packet === null) {
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[save, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        if (r.packet.affectedRows > 0) {
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
            this._sql.update((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : ''), [{
                'time_remove': tim
            }]).where([{
                [cstr._$primary]: this._data[cstr._$primary],
                'time_remove': 0
            }]);
        }
        else {
            this._sql.delete((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : '')).where([{
                [cstr._$primary]: this._data[cstr._$primary]
            }]);
        }
        const r = await this._db.execute(this._sql.getSql(), this._sql.getData());
        if (r.packet === null) {
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[remove, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        if (r.packet.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    public async first(
        lock: boolean,
        array: true
    ): Promise<false | null | Record<string, any>>;
    public async first(
        lock?: boolean,
        array?: false
    ): Promise<false | null | (this & Record<string, any>)>;
    /**
     * --- 获取数据库第一个对象 ---
     * @param lock 是否加锁
     * @param array 是否返回原生对象
     */
    public async first(
        lock: boolean = false,
        array: boolean = false
    ): Promise<false | null | (this & Record<string, any>) | Record<string, any>> {
        this._sql.limit(1);
        if (lock) {
            this._sql.lock();
        }
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[first, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
            (this as unknown as Record<string, any>)[k] = v;
        }
        return this as this & Record<string, any>;
    }

    /**
     * --- 获取数据库第一个原生对象 ---
     * @param lock 是否加锁
     */
    public async firstArray(
        lock: boolean = false
    ): Promise<Record<string, any> | false | null> {
        return this.first(lock, true);
    }

    /**
     * --- 联合查询表数据 ---
     * @param f 要联合查询的表列表、单个表、sql 对象
     * @param type 类型
     */
    public union(f: lSql.Sql | string | types.IModUnionItem | string[] | types.IModUnionItem[], type: string = ''): this {
        if (f instanceof lSql.Sql) {
            this._sql.union(f, type);
            return this;
        }
        if (typeof f === 'string') {
            f = {
                'field': f
            };
        }
        if (!Array.isArray(f)) {
            f = [f];
        }
        for (let item of f) {
            if (typeof item === 'string') {
                item = {
                    'field': item
                };
            }
            this._sql.union(this._sql.copy(item.field, {
                'where': item.where
            }), type);
        }
        return this;
    }

    /**
     * --- 所有联合查询表数据 ---
     * @param f 要联合查询的表列表、单个表、sql 对象
     */
    public unionAll(f: lSql.Sql | string | types.IModUnionItem | string[] | types.IModUnionItem[]): this {
        if (f instanceof lSql.Sql) {
            this._sql.unionAll(f);
            return this;
        }
        if (typeof f === 'string') {
            f = {
                'field': f
            };
        }
        if (!Array.isArray(f)) {
            f = [f];
        }
        for (let item of f) {
            if (typeof item === 'string') {
                item = {
                    'field': item
                };
            }
            this._sql.unionAll(this._sql.copy(item.field, {
                'where': item.where
            }));
        }
        return this;
    }

    public async all(): Promise<false | Rows<this>>;
    public async all(key: string): Promise<false | Record<string, this>>;
    /**
     * --- 获取列表 ---
     * @param key 是否以某个字段为主键
     */
    public async all(key?: string): Promise<false | Rows<this> | Record<string, this>> {
        this._total.length = 0;
        if (this._index && this._index.length > 1) {
            // --- 多表 ---
            let sql = this._sql.getSql();
            /** --- 返回的最终 list --- */
            const list: Record<string, this> | this[] = key ? {} : [];
            /** --- 用户传输的起始值 --- */
            const limit = [this._limit[0] ?? 0, this._limit[1] ?? 200];
            /** --- 已过的 offset，-1 代表不再计算 offset 了 --- */
            let offset = 0;
            /** --- 剩余条数 --- */
            let remain = limit[1];
            for (let i = 0; i < this._index.length; ++i) {
                // --- 先计算 total ---
                if (i > 0) {
                    sql = sql.replace(/(FROM [a-zA-Z0-9`_.]+?_)[0-9_]+/, '$1' + this._index[i]);
                }
                const tsql = this._formatTotal(sql);
                const tr = await this._db.query(tsql, this._sql.getData());
                if (tr.rows === null) {
                    return false;
                }
                let count = 0;
                for (const item of tr.rows) {
                    count += item.count;
                }
                this._total.push(count);
                if (remain === 0) {
                    // --- 下一个表需要接着执行 total 计算，所以不能 break ---
                    continue;
                }
                // --- 开始查数据 ---
                /** --- 差值 --- */
                let cz = 0;
                if (offset > -1) {
                    cz = limit[0] - offset;
                    if (cz >= count) {
                        offset += count;
                        continue;
                    }
                }
                const lsql = sql.replace(/ LIMIT [0-9 ,]/g, ` LIMIT ${cz}, ${remain}`);
                const r = await this._db.query(lsql, this._sql.getData());
                if (r.rows === null) {
                    await lCore.log(this._ctr ?? {
                        'path': '',
                        'urlFull': '',
                        'hostname': '',
                        'req': null,
                        'get': {},
                        'cookie': {},
                        'headers': {}
                    }, '[all, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                    return false;
                }
                if (key) {
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
                        (list as Record<string, this>)[row[key]] = obj;
                        --remain;
                    }
                    continue;
                }
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
                    (list as this[]).push(obj);
                    --remain;
                }
                continue;
            }
            return Array.isArray(list) ? new Rows<this>(list) : list;
        }
        // --- 单表 ---
        const contain = this._contain ? lCore.clone(this._contain.list) : null;
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[all, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        // --- 检查没被查到的必包含项 ---
        for (const row of r.rows) {
            if (this._contain && contain) {
                const io = contain.indexOf(row[this._contain.key]);
                if (io !== -1) {
                    contain.splice(io, 1);
                }
            }
        }
        let cr: lDb.IData | null = null;
        if (this._contain && contain?.length) {
            const csql = this._sql.copy(undefined, {
                'where': {
                    [this._contain.key]: this._contain.list
                }
            });
            cr = await this._db.query(csql.getSql(), csql.getData());
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
            // --- 有没有必须包含的项 ---
            if (cr?.rows) {
                for (const crow of cr.rows) {
                    const obj = new (this.constructor as new (
                        o: Record<string, types.Json>
                    ) => this)({
                        'db': this._db,
                        'ctr': this._ctr,
                        'pre': this._sql.getPre(),
                        'row': crow,
                        'index': this._index
                    });
                    list[crow[key]] = obj;
                }
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
        // --- 有没有必须包含的项 ---
        if (cr?.rows) {
            for (const crow of cr.rows) {
                const obj = new (this.constructor as new (
                    o: Record<string, types.Json>
                ) => this)({
                    'db': this._db,
                    'ctr': this._ctr,
                    'pre': this._sql.getPre(),
                    'row': crow,
                    'index': this._index
                });
                list.push(obj);
            }
        }
        return new Rows<this>(list);
    }

    public async allArray(): Promise<false | Array<Record<string, any>>>;
    public async allArray(key: string): Promise<false | Record<string, Record<string, any>>>;
    /**
     * --- 获取列表（得到的为原生对象或数组，不是模型） ---
     * @param key 是否以某个字段为主键
     */
    public async allArray(key?: string): Promise<
        false |
        Array<Record<string, any>> |
        Record<string, Record<string, any>>
    > {
        this._total.length = 0;
        if (this._index && this._index.length > 1) {
            // --- 多表 ---
            let sql = this._sql.getSql();
            /** --- 返回的最终 list --- */
            const list: Record<string, Record<string, any>> | any[] = key ? {} : [];
            /** --- 用户传输的起始值 --- */
            const limit = [this._limit[0] ?? 0, this._limit[1] ?? 200];
            /** --- 已过的 offset，-1 代表不再计算 offset 了 --- */
            let offset = 0;
            /** --- 剩余条数 --- */
            let remain = limit[1];
            for (let i = 0; i < this._index.length; ++i) {
                // --- 先计算 total ---
                if (i > 0) {
                    sql = sql.replace(/(FROM [a-zA-Z0-9`_.]+?_)[0-9_]+/, '$1' + this._index[i]);
                }
                const tsql = this._formatTotal(sql);
                const tr = await this._db.query(tsql, this._sql.getData());
                if (tr.rows === null) {
                    return false;
                }
                let count = 0;
                for (const item of tr.rows) {
                    count += item.count;
                }
                this._total.push(count);
                if (remain === 0) {
                    // --- 下一个表需要接着执行 total 计算，所以不能 break ---
                    continue;
                }
                // --- 开始查数据 ---
                /** --- 差值 --- */
                let cz = 0;
                if (offset > -1) {
                    cz = limit[0] - offset;
                    if (cz >= count) {
                        offset += count;
                        continue;
                    }
                    // --- 在本表开始找之后，后面表无需再跳过 ---
                    offset = -1;
                }
                const lsql = sql.replace(/ LIMIT [0-9 ,]+/g, ` LIMIT ${cz}, ${remain}`);
                const r = await this._db.query(lsql, this._sql.getData());
                if (r.rows === null) {
                    await lCore.log(this._ctr ?? {
                        'path': '',
                        'urlFull': '',
                        'hostname': '',
                        'req': null,
                        'get': {},
                        'cookie': {},
                        'headers': {}
                    }, '[allArray, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                    return false;
                }
                if (key) {
                    for (const row of r.rows) {
                        (list as Record<string, Record<string, any>>)[row[key]] = row;
                        --remain;
                    }
                    continue;
                }
                for (const row of r.rows) {
                    (list as any[]).push(row);
                    --remain;
                }
                continue;
            }
            return list;
        }
        // --- 单表 ---
        const contain = this._contain ? lCore.clone(this._contain.list) : null;
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[allArray, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        // --- 检查没被查到的必包含项 ---
        for (const row of r.rows) {
            if (this._contain && contain) {
                const io = contain.indexOf(row[this._contain.key]);
                if (io !== -1) {
                    contain.splice(io, 1);
                }
            }
        }
        let cr: lDb.IData | null = null;
        if (this._contain && contain?.length) {
            const csql = this._sql.copy(undefined, {
                'where': {
                    [this._contain.key]: this._contain.list
                }
            });
            cr = await this._db.query(csql.getSql(), csql.getData());
        }
        if (key) {
            const list: Record<string, Record<string, any>> = {};
            for (const row of r.rows) {
                list[row[key]] = row;
            }
            // --- 有没有必须包含的项 ---
            if (cr?.rows) {
                for (const crow of cr.rows) {
                    list[crow[key]] = crow;
                }
            }
            return list;
        }
        // --- 有没有必须包含的项 ---
        if (cr?.rows) {
            for (const crow of cr.rows) {
                r.rows.push(crow);
            }
        }
        return r.rows;
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
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[explain, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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

    private _formatTotal(sql: string, f: string = '*'): string {
        sql = sql
            .replace(/ LIMIT [0-9 ,]+/g, '')
            .replace(/ ORDER BY [\w`,. ]+(DESC|ASC)?/g, '');
        if (sql.includes(' GROUP BY ')) {
            return 'SELECT COUNT(0) AS `count` FROM(' + sql + ') AS `f`';
        }
        return sql
            .replace(/SELECT .+? FROM/g, 'SELECT COUNT(' + this._sql.field(f) + ') AS `count` FROM');
    }

    /**
     * --- 获取总条数，自动抛弃 LIMIT，仅用于获取数据的情况（select） ---
     */
    public async total(f: string = '*'): Promise<number> {
        if (this._total.length) {
            let count = 0;
            for (const item of this._total) {
                count += item;
            }
            return count;
        }
        const sql: string = this._formatTotal(this._sql.getSql(), f);
        const r = await this._db.query(sql, this._sql.getData());
        if (r.rows === null) {
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[total, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return 0;
        }
        let count = 0;
        for (const item of r.rows) {
            count += item.count;
        }
        return count;
    }

    /**
     * --- 根据当前条件，筛选出当前条目该有的数据条数 ---
     */
    public async count(): Promise<number> {
        const sql: string = this._sql.getSql().replace(/SELECT .+? FROM/, 'SELECT COUNT(*) AS `count` FROM');
        const r = await this._db.query(sql, this._sql.getData());
        if (r.rows === null) {
            await lCore.log(this._ctr ?? {
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': null,
                'get': {},
                'cookie': {},
                'headers': {}
            }, '[count, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return 0;
        }
        let count = 0;
        for (const item of r.rows) {
            count += item.count;
        }
        return count;
    }

    /**
     * @param f 表名
     * @param s ON 信息
     * @param type 类型
     * @param index 给本表增加 index 分表项
     * @param pre 前缀
     */
    public join(f: string, s: types.Json = [], type: string = 'INNER', index: string = '', pre: string = ''): this {
        this._sql.join(f, s, type, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- left join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     */
    public leftJoin(f: string, s: types.Json, index: string = '', pre: string = ''): this {
        this._sql.leftJoin(f, s, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- right join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     */
    public rightJoin(f: string, s: types.Json, index: string = '', pre: string = ''): this {
        this._sql.rightJoin(f, s, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- inner join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     */
    public innerJoin(f: string, s: types.Json, index: string = '', pre: string = ''): this {
        this._sql.innerJoin(f, s, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- full join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     */
    public fullJoin(f: string, s: types.Json, index: string = '', pre: string = ''): this {
        this._sql.fullJoin(f, s, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- cross join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     */
    public crossJoin(f: string, s: types.Json, index: string = '', pre: string = ''): this {
        this._sql.crossJoin(f, s, index ? '_' + index : '', pre);
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
    public by(c: string | Array<string | string[]>, d: 'DESC' | 'ASC' = 'DESC'): this {
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

    /** --- 设置的 limit --- */
    private _limit: number[] = [0, 0];

    /**
     * --- LIMIT ---
     * @param a 起始
     * @param b 长度
     */
    public limit(a: number, b: number = 0): this {
        this._sql.limit(a, b);
        this._limit = [a, b];
        return this;
    }

    /**
     * --- 分页 ---
     * @param count 每页条数
     * @param page 当前页数
     */
    public page(count: number, page: number = 1): this {
        const a = count * (page - 1);
        this._sql.limit(a, count);
        this._limit = [a, count];
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
     * --- 设置闭包含数据 ---
     * @param contain 设置项
     */
    public contain(contain: {
        'key': string;
        'list': string[];
    } ): this {
        this._contain = contain;
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
     * --- 获取当前设置要提交的数据 ---
     */
    public updates(): Record<string, any> {
        const updates: Record<string, any> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
        }
        return updates;
    }

    /**
     * --- 当前是否设置了未保存 --=
     */
    public unsaved(): boolean {
        return Object.keys(this._updates).length ? true : false;
    }

    /**
     * --- 获取字段的可用语种文本 ---
     * @param col 字段名
     * @param lang 当前请求语种，如 sc
     */
    public langText(col: string, lang: string): string {
        const key = `${col}_${lang}`;
        if (this._data[key]) {
            return this._data[key];
        }
        if (lang !== 'en' && this._data[`${col}_en`]) {
            return this._data[`${col}_en`];
        }
        for (const k in this._data) {
            if (k.startsWith(`${col}_`) && this._data[k]) {
                // --- 符合要求的字段并且字段有值（不为空） ---
                return this._data[k];
            }
        }
        return '';
    }

    /**
     * --- 当 _key 不为空时，则依据继承此方法的方法自动生成填充 key ---
     */
    protected _keyGenerator(): string {
        return '';
    }

}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-4 21:35
 * Last: 2020-4-14 13:33:51, 2022-07-23 16:01:34, 2022-09-06 22:59:26, 2023-5-24 19:11:37, 2023-6-13 21:47:58, 2023-7-10 18:54:03, 2023-8-23 17:03:16, 2023-12-11 15:21:22, 2023-12-20 23:12:03, 2024-3-8 16:05:29, 2024-3-20 19:58:15, 2024-8-11 21:14:54, 2024-10-5 14:00:22, 2024-12-14 19:58:34, 2025-9-23 11:01:36, 2025-11-5 16:34:31
 */
import * as lSql from '#kebab/lib/sql.js';
import * as lDb from '#kebab/lib/db.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';
import * as sCtr from '#kebab/sys/ctr.js';
import * as kebab from '#kebab/index.js';

/** --- 只获取变量 --- */
export type TOnlyProperties<T> = {
    [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K]
};

/** --- 条数列表 --- */
export class Rows<T extends Mod> implements IRows<T> {

    private readonly _items: T[];

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

    /** --- 转换为数组对象，获取的是新创建的数组 --- */
    public toArray(): Array<Record<string, any>> {
        return this._items.map(i => i.toArray());
    }

    /** --- 根据规则筛掉项，predicate 返回 true 代表保留 --- */
    public filter(predicate: (value: T, index: number) => boolean): Rows<T> {
        return new Rows<T>(this._items.filter(predicate));
    }

    /** --- 重塑对象内容为数组 --- */
    public map<TU>(allbackfn: (value: T, index: number) => TU): TU[] {
        const items: TU[] = [];
        for (let i = 0; i < this._items.length; ++i) {
            items.push(allbackfn(this._items[i], i));
        }
        return items;
    }

    /** --- for of --- */
    public [Symbol.iterator](): IterableIterator<T> {
        return this._items[Symbol.iterator]();
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

    /** --- 若使用 _$key 并且有多个 unique 索引，这里指定 _$key 的索引名 --- */
    protected static _$index: string = '';

    /** --- 前缀，顺序：选项前缀 -> 本前缀 -> 配置文件前缀 --- */
    protected static _$pre?: string;

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

    /** --- ctr 对象 --- */
    protected _ctr?: sCtr.Ctr = undefined;

    /**
     * --- 构造函数 ---
     * @param opt 选项
     */
    public constructor(opt: {
        'db': lDb.Pool | lDb.Transaction;
        'ctr'?: sCtr.Ctr;
        /** --- 框架会自动去重 --- */
        'index'?: string | string[];
        'alias'?: string;
        'row'?: Record<string, any>;
        'select'?: string | string[];
        'where'?: string | kebab.Json;
        'contain'?: {
            'key': string;
            'list': string[];
        };
        'pre'?: string;
    }) {
        /** --- 导入 ctr 对象 --- */
        this._ctr = opt.ctr;
        /** --- 导入数据库连接 --- */
        this._db = opt.db;
        /** --- 新建 sql 对象 --- */
        this._sql = lSql.get({
            'service': this._db.getService() ?? lDb.ESERVICE.PGSQL,
            'ctr': opt.ctr,
            'pre': opt.pre ?? (this.constructor as any)._$pre,
        });
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
                (this as any)[k] = v;
            }
        }
        /** --- 是否有 select --- */
        const select = opt.select ?? (opt.where ? '*' : '');
        this._sql.select(
            select,
            ((this.constructor as any)._$table as string) +
            (this._index !== null ? ('_' + this._index[0]) : '') +
            (opt.alias ? ' ' + opt.alias : '')
        );
        if (opt.where !== undefined) {
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
     * --- 添加一个序列（允许超过 65536 的占位符会被拆分多次执行） ---
     * @param db 数据库对象
     * @param cs 字段列表
     * @param vs 数据列表
     * @param opt 选项
     */
    public static async insert(
        db: lDb.Pool | lDb.Transaction,
        cs: string[] | Record<string, any>,
        vs?: any[] | any[][],
        opt: {
            'pre'?: string;
            'ctr'?: sCtr.Ctr;
            'index'?: string;
            'ignore'?: boolean;
        } = {}
    ): Promise<boolean | null | false> {
        const sq = lSql.get({
            'service': db.getService() ?? lDb.ESERVICE.PGSQL,
            'ctr': opt.ctr,
            'pre': opt.pre ?? this._$pre,
        });
        if (!vs) {
            // --- 单行 ---
            sq.insert(this._$table + (opt.index ? ('_' + opt.index) : ''), opt.ignore);
            sq.values(cs);
            const r = await db.execute(sq.getSql(), sq.getData());
            if (r.packet === null) {
                lCore.log(opt.ctr ?? {}, '[MOD][insert] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1), '-error');
                return false;
            }
            return r.packet.affected ? true : null;
        }
        // --- 可能是多行 ---
        if (vs.some(item => !Array.isArray(item))) {
            vs = [vs];
        }
        /** --- 每条数据的列数 --- */
        const len = vs[0].length;
        /** --- 每批次最多能容纳的行数 --- */
        const line = Math.floor(65535 / len);
        /** --- 总批次数量 --- */
        const batch = Math.ceil(vs.length / line);
        for (let i = 0; i < batch; ++i) {
            sq.insert(this._$table + (opt.index ? ('_' + opt.index) : ''), opt.ignore);
            sq.values(cs, vs.slice(i * line, (i + 1) * line));
            const r = await db.execute(sq.getSql(), sq.getData());
            if (r.packet === null) {
                lCore.log(opt.ctr ?? {}, '[MOD][insert] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1), '-error');
                return false;
            }
            if (r.packet.affected) {
                continue;
            }
            return null;
        }
        return true;
    }

    /**
     * --- 获取添加一个序列的模拟 SQL ---
     * @param db 数据库对象
     * @param cs 字段列表
     * @param vs 数据列表
     * @param opt 选项
     */
    public static insertSql(
        db: lDb.Pool | lDb.Transaction,
        cs: string[] | Record<string, any>,
        vs?: any[] | any[][],
        opt: {
            'pre'?: string;
            'ctr'?: sCtr.Ctr;
            'index'?: string;
            'ignore'?: boolean;
        } = {}
    ): string {
        const sq = lSql.get({
            'service': db.getService() ?? lDb.ESERVICE.PGSQL,
            'ctr': opt.ctr,
            'pre': opt.pre ?? this._$pre,
        });
        sq.insert(this._$table + (opt.index ? ('_' + opt.index) : ''), opt.ignore).values(cs, vs);
        return sq.format();
    }

    /**
     * --- 根据条件移除条目 ---
     * @param db 数据库对象
     * @param where 筛选条件
     * @param opt 选项
     */
    public static async removeByWhere(
        db: lDb.Pool | lDb.Transaction,
        where: string | kebab.Json,
        opt: {
            'pre'?: string;
            'ctr'?: sCtr.Ctr;
            'index'?: string | string[];
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'limit'?: [number, number?];
        } = {}
    ): Promise<number | false | null> {
        const indexs = opt.index ? (typeof opt.index === 'string' ? [opt.index] : [...new Set(opt.index)]) : [''];
        let ar = 0;
        for (const index of indexs) {
            const sq = lSql.get({
                'service': db.getService() ?? lDb.ESERVICE.PGSQL,
                'ctr': opt.ctr,
                'pre': opt.pre ?? this._$pre,
            });
            sq.delete(this._$table + (index ? ('_' + index) : '')).where(where);
            if (opt.by) {
                sq.by(opt.by[0], opt.by[1]);
            }
            if (opt.limit) {
                sq.limit(opt.limit[0], opt.limit[1]);
            }
            const r = await db.execute(sq.getSql(), sq.getData());
            if (r.packet === null) {
                lCore.log(opt.ctr ?? {}, '[MOD][removeByWhere] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                return false;
            }
            if (r.packet.affected) {
                ar += r.packet.affected;
            }
        }
        return ar ? ar : null;
    }

    /**
     * --- 根据条件移除条目（仅获取 SQL 对象） ---
     * @param db 数据库对象
     * @param where 筛选条件
     * @param opt 选项
     */
    public static removeByWhereSql(
        db: lDb.Pool | lDb.Transaction,
        where: string | kebab.Json,
        opt: {
            'pre'?: string;
            'ctr'?: sCtr.Ctr;
            'index'?: string;
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'limit'?: [number, number?];
        } = {}
    ): lSql.Sql {
        const sq = lSql.get({
            'service': db.getService() ?? lDb.ESERVICE.PGSQL,
            'ctr': opt.ctr,
            'pre': opt.pre ?? this._$pre,
        });
        sq.delete(this._$table + (opt.index ? ('_' + opt.index) : '')).where(where);
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
        data: kebab.Json,
        where: string | kebab.Json,
        opt: {
            'pre'?: string;
            'ctr'?: sCtr.Ctr;
            'index'?: string | string[];
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'limit'?: [number, number?];
        } = {}
    ): Promise<number | false | null> {
        const indexs = opt.index ? (typeof opt.index === 'string' ? [opt.index] : [...new Set(opt.index)]) : [''];
        let ar = 0;
        for (const index of indexs) {
            const sq = lSql.get({
                'service': db.getService() ?? lDb.ESERVICE.PGSQL,
                'ctr': opt.ctr,
                'pre': opt.pre ?? this._$pre,
            });
            sq.update(this._$table + (index ? ('_' + index) : ''), data).where(where);
            if (opt.by) {
                sq.by(opt.by[0], opt.by[1]);
            }
            if (opt.limit) {
                sq.limit(opt.limit[0], opt.limit[1]);
            }
            const r = await db.execute(sq.getSql(), sq.getData());
            if (r.packet === null) {
                lCore.log(opt.ctr ?? {}, '[MOD][updateByWhere] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                return false;
            }
            if (r.packet.affected) {
                ar += r.packet.affected;
            }
        }
        return ar ? ar : null;
    }

    /**
     * --- 根据条件更新数据（仅获取 SQL 对象） ---
     * @param db 数据库对象
     * @param data 要更新的数据
     * @param where 筛选条件
     * @param opt 选项
     */
    public static updateByWhereSql(
        db: lDb.Pool | lDb.Transaction,
        data: kebab.Json,
        where: string | kebab.Json,
        opt: {
            'pre'?: string;
            'ctr'?: sCtr.Ctr;
            'index'?: string;
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'limit'?: [number, number?];
        } = {}
    ): lSql.Sql {
        const sq = lSql.get({
            'service': db.getService() ?? lDb.ESERVICE.PGSQL,
            'ctr': opt.ctr,
            'pre': opt.pre ?? this._$pre,
        });
        sq.update(this._$table + (opt.index ? ('_' + opt.index) : ''), data).where(where);
        if (opt.by) {
            sq.by(opt.by[0], opt.by[1]);
        }
        if (opt.limit) {
            sq.limit(opt.limit[0], opt.limit[1]);
        }
        return sq;
    }

    /**
     * --- 批量更新数据 ---
     * @param db 数据库对象
     * @param data 数据列表
     * @param key 用于定位的主键或唯一键字段名
     * @param opt 选项
     */
    public static async updateList(
        db: lDb.Pool | lDb.Transaction,
        data: Array<Record<string, any>>,
        key: string,
        opt: {
            'ctr'?: sCtr.Ctr;
            'pre'?: string;
            'index'?: string;
        } = {}
    ): Promise<boolean | null> {
        if (!data.length) {
            return true;
        }

        // --- 获取所有涉及的字段（除了 key） ---
        const columns = new Set<string>();
        for (const item of data) {
            for (const k in item) {
                if (k !== key) {
                    columns.add(k);
                }
            }
        }
        if (columns.size === 0) {
            return true;
        }
        const cols = Array.from(columns);

        // --- 计算分批大小 ---
        // --- 每个字段需要 2 个占位符 (WHEN ? THEN ?)，加上 WHERE IN (?) 的 1 个 ---
        // --- Total params per row = cols.length * 2 + 1 ---
        const paramCountPerRow = cols.length * 2 + 1;
        const batchSize = Math.floor(60000 / paramCountPerRow);

        const batches = [];
        for (let i = 0; i < data.length; i += batchSize) {
            batches.push(data.slice(i, i + batchSize));
        }

        for (const batch of batches) {
            const sq = lSql.get({
                'service': db.getService() ?? lDb.ESERVICE.PGSQL,
                'ctr': opt.ctr,
                'pre': opt.pre ?? this._$pre,
            });

            const updates: Record<string, any> = {};
            const keys: any[] = [];

            for (const col of cols) {
                let caseSql = `(CASE ${sq.field(key)}`;
                const params: any[] = [];
                let hasUpdate = false;

                for (const item of batch) {
                    if (item[col] !== undefined) {
                        caseSql += ` WHEN ? THEN ?`;
                        params.push(item[key], item[col]);
                        hasUpdate = true;
                    }
                }

                if (hasUpdate) {
                    caseSql += ` ELSE ${sq.field(col)} END)`;
                    updates[col] = [caseSql, params];
                }
            }

            // --- 收集 keys ---
            for (const item of batch) {
                keys.push(item[key]);
            }

            if (Object.keys(updates).length === 0) {
                continue;
            }

            sq.update(((this as any)._$table as string) + (opt.index ? ('_' + opt.index) : ''), updates)
                .where({ [key]: keys });

            const r = await db.execute(sq.getSql(), sq.getData());
            if (r.packet === null) {
                lCore.log(opt.ctr ?? {}, '[MOD][updateList] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                return false;
            }
        }

        return true;
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
            'ctr'?: sCtr.Ctr;
            'pre'?: string;
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
        s: string | kebab.Json = '',
        opt: {
            'ctr'?: sCtr.Ctr;
            'pre'?: string; 'index'?: string | string[];
            'alias'?: string;
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
            'index': opt.index,
            'contain': opt.contain,
            'alias': opt.alias,
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
     * --- 根据主键（或 key 字段）获取对象 ---
     * @param db 数据库对象
     * @param val 主键值
     * @param opt 选项
     */
    public static async find<T extends Mod>(
        db: lDb.Pool | lDb.Transaction,
        val: string | number | null,
        opt: {
            'ctr'?: sCtr.Ctr;
            'lock'?: boolean;
            'pre'?: string;
            'index'?: string | string[];
            /** --- 通过 key 字段获取，默认为 false，即从主键获取 --- */
            'key'?: boolean;
        } = {}
    ): Promise<false | null | (T & Record<string, any>)> {
        if (opt.key && !this._$key) {
            lCore.debug('[MOD][find] key not found');
            return false;
        }
        return (new this({
            'db': db,
            'ctr': opt.ctr,
            'pre': opt.pre,
            'where': [{
                [opt.key ? this._$key : this._$primary]: val,
            }],
            'index': opt.index,
        }) as T & Record<string, any>).first(opt.lock);
    }

    public static async one(
        db: lDb.Pool | lDb.Transaction,
        s: string | kebab.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'array': true;
        }
    ): Promise<false | null | Record<string, any>>;
    public static async one<T extends Mod>(
        db: lDb.Pool | lDb.Transaction,
        s: string | kebab.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
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
        s: string | kebab.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
            'by'?: [string | string[], 'DESC' | 'ASC'];
            'array'?: boolean;
        } = {}
    ): Promise<false | null | (T & Record<string, any>) | Record<string, any>> {
        if (!opt.index) {
            // --- 无 index ---
            const o = new this({
                'select': opt.select,
                'db': db,
                'ctr': opt.ctr,
                'pre': opt.pre,
                'where': s,
            }) as T;
            if (opt.by) {
                o.by(opt.by[0], opt.by[1]);
            }
            return opt.array ? o.firstArray() : o.first();
        }
        const indexs = (typeof opt.index === 'string') ? [opt.index] : [...new Set(opt.index)];
        for (const item of indexs) {
            const row = new this({
                'select': opt.select,
                'db': db,
                'ctr': opt.ctr,
                'pre': opt.pre,
                'where': s,
                'index': item,
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
        s: string | kebab.Json,
        opt: {
            'ctr'?: sCtr.Ctr;
            'pre'?: string;
            'index'?: string | string[];
            'select'?: string | string[];
        } = {}
    ): Promise<false | null | Record<string, any>> {
        (opt as kebab.Json).array = true;
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
        where: string | kebab.Json = '',
        opt: { 'ctr'?: sCtr.Ctr; 'pre'?: string; 'index'?: string; } = {}
    ): Promise<any[] | false> {
        const sq = lSql.get({
            'service': db.getService() ?? lDb.ESERVICE.PGSQL,
            'ctr': opt.ctr,
            'pre': opt.pre ?? this._$pre,
        });
        sq.select(this._$primary, this._$table + (opt.index ? ('_' + opt.index) : '')).where(where);
        const r = await db.query(sq.getSql(), sq.getData());
        if (r.rows === null) {
            lCore.log(opt.ctr ?? {}, '[primarys, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        const primarys: any[] = [];
        for (const row of r.rows) {
            primarys.push(row[this._$primary]);
        }
        return primarys;
    }

    /**
     * --- 将 key val 组成的数据列表转换为原生对象模式，获取的是新创建的数组 ---
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
     * --- 设置一个/多个属性，值为 undefined 则不会被更新 ---
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
                (this as kebab.Json)[k] = v;
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
            (this as kebab.Json)[n] = v;
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
     * @return true-成功,false-报错,null-唯一键非 _$key 键冲突
     */
    public async create(): Promise<boolean | null> {
        const cstr = this.constructor as any;
        const updates: Record<string, any> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
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
                (this as kebab.Json)[cstr._$key] = updates[cstr._$key];
                this._sql.insert((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : ''));
                this._sql.values(updates);
                r = await this._db.execute(this._sql.getSql(), this._sql.getData());
                ++count;
                if (!r.error) {
                    break;
                }
                if (r.error.errno === 1062) {
                    // --- 与唯一键冲突 ---
                    if (!cstr._$index) {
                        // --- 没设置 index，那就当做是本次生成的 key 重复了 ---
                        continue;
                    }
                    if (this._db.getService() === lDb.ESERVICE.MYSQL) {
                        // --- MYSQL ---
                        const match = /for key '([\w.]+)'/.exec(r.error.message);
                        if (match?.[1].includes(cstr._$index)) {
                            // --- key 索引重复，继续生成 key ---
                            continue;
                        }
                    }
                    else {
                        // --- PGSQL ---
                        const match = /constraint "([\w.]+)"/.exec(r.error.message);
                        if (match?.[1].includes(cstr._$index)) {
                            // --- key 索引重复，继续生成 key ---
                            continue;
                        }
                    }
                    // --- 1062 非 index 冲突，那需要用户自行处理（可能不允许重复的邮箱） ---
                    return null;
                }
                // --- 未处理的错误 ---
                const service = this._db.getService();
                lCore.log(this._ctr ?? {}, '[MOD][create0][' + cstr._$table + '] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                if (lCore.globalConfig.debug) {
                    lCore.debug('[MOD][create0][' + cstr._$table + ']', service !== null ? lDb.ESERVICE[service] : 'NONE', r);
                    lCore.debug(this._sql.format());
                }
                return false;
            }
        }
        else {
            this._sql.insert((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : ''));
            this._sql.values(updates);
            r = await this._db.execute(this._sql.getSql(), this._sql.getData());
            if (r.error) {
                if (r.error.errno !== 1062) {
                    lCore.log(this._ctr ?? {}, '[MOD][create1][' + cstr._$table + '] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                    if (lCore.globalConfig.debug) {
                        lCore.debug('[MOD][create1][' + cstr._$table + ']', r);
                        lCore.debug(this._sql.format());
                    }
                    return false;
                }
                return null;
            }
        }
        if (r.packet?.affected) {
            this._updates = {};
            this._data[cstr._$primary] = r.packet.insert;
            (this as kebab.Json)[cstr._$primary] = this._data[cstr._$primary];
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * --- 插入数据，如果存在则更新（UPSERT） ---
     * @param conflict 冲突字段，不能为 _$key 或 _$primary，应该是你要判断的唯一索引字段
     */
    public async upsert(conflict: string | string[]): Promise<boolean> {
        // --- 这里没用 mysql 的 INSERT ... ON DUPLICATE KEY UPDATE 或 pgsql 的 ON CONFLICT DO UPDATE ---
        // --- 因为还要处理 _$key 的自动生成 ---
        const res = await this.create();
        if (res) {
            // --- 创建成功 ---
            return true;
        }
        if (res === false) {
            // --- 系统错误 ---
            return false;
        }
        // --- res === null，唯一键冲突，执行更新 ---
        /** --- 冲突字段列表 --- */
        const conflicts = typeof conflict === 'string' ? [conflict] : conflict;
        const where: Record<string, any> = {};
        for (const field of conflicts) {
            if (!this._updates[field]) {
                return false;
            }
            where[field] = this._data[field];
            delete this._updates[field];
        }
        return this.save(where);
    }

    /**
     * --- 刷新当前模型获取最新数据 ---
     * @param lock 是否加锁
     */
    public async refresh(lock = false): Promise<boolean | null> {
        const cstr = this.constructor as any;
        this._sql.select('*', (cstr._$table as string) + (this._index ? ('_' + this._index[0]) : '')).where([{
            [cstr._$primary]: this._data[cstr._$primary]
        }]);
        if (lock) {
            this._sql.lock();
        }
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            lCore.log(this._ctr ?? {}, '[MOD][refresh] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        if (r.rows.length === 0) {
            return null;
        }
        for (const k in r.rows[0]) {
            const v = r.rows[0][k];
            this._data[k] = v;
            (this as kebab.Json)[k] = v;
        }
        return true;
    }

    /**
     * --- 更新 set 的数据到数据库，有未保存数据时才保存 ---
     * @param where 自定义筛选条件，默认根据主键筛选
     */
    public async save(where?: any): Promise<boolean> {
        if (Object.keys(this._updates).length === 0) {
            return true;
        }
        const cstr = this.constructor as any;
        const updates: Record<string, any> = {};
        for (const k in this._updates) {
            updates[k] = this._data[k];
        }
        this._sql.update((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : ''), [updates]).where(where ?? {
            [cstr._$primary]: this._data[cstr._$primary]
        });
        const r = await this._db.execute(this._sql.getSql(), this._sql.getData());
        if (r.packet === null) {
            lCore.log(this._ctr ?? {}, '[MOD][save] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        if (r.packet.affected) {
            this._updates = {};
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * --- 移除本条目 ---
     */
    public async remove(): Promise<boolean> {
        const cstr = this.constructor as any;
        this._sql.delete((cstr._$table as string) + (this._index ? ('_' + this._index[0]) : '')).where([{
            [cstr._$primary]: this._data[cstr._$primary]
        }]);
        const r = await this._db.execute(this._sql.getSql(), this._sql.getData());
        if (r.packet === null) {
            lCore.log(this._ctr ?? {}, '[remove, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        if (r.packet.affected) {
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
            lCore.log(this._ctr ?? {}, '[first, mod] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
    public union(f: lSql.Sql | string | IModUnionItem | string[] | IModUnionItem[], type: string = ''): this {
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
    public unionAll(f: lSql.Sql | string | IModUnionItem | string[] | IModUnionItem[]): this {
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
                    sql = sql.replace(/(FROM [a-zA-Z0-9`"_.]+?_)[0-9_]+/, '$1' + this._index[i]);
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
                const lsql = sql.replace(/ LIMIT [0-9 ,]+(OFFSET [0-9]+)?/g, ` LIMIT ${remain} OFFSET ${cz}`);
                const r = await this._db.query(lsql, this._sql.getData());
                if (r.rows === null) {
                    lCore.log(this._ctr ?? {}, '[MOD][all] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
                    return false;
                }
                if (key) {
                    for (const row of r.rows) {
                        const obj = new (this.constructor as new (
                            o: Record<string, kebab.Json>
                        ) => this)({
                            'db': this._db,
                            'ctr': this._ctr,
                            'pre': this._sql.getPre(),
                            'row': row,
                            'index': this._index,
                        });
                        (list as Record<string, this>)[row[key]] = obj;
                        --remain;
                    }
                    continue;
                }
                for (const row of r.rows) {
                    const obj = new (this.constructor as new (
                        o: Record<string, kebab.Json>
                    ) => this)({
                        'db': this._db,
                        'ctr': this._ctr,
                        'pre': this._sql.getPre(),
                        'row': row,
                        'index': this._index,
                    });
                    (list as this[]).push(obj);
                    --remain;
                }
                continue;
            }
            return Array.isArray(list) ? new Rows<this>(list) : list;
        }
        // --- 单表 ---
        /** --- 要追加的 values --- */
        const contain = this._contain ? lCore.clone(this._contain.list) : null;
        const r = await this._db.query(this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            lCore.log(this._ctr ?? {}, '[MOD][all] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
                    [this._contain.key]: contain,
                }
            });
            cr = await this._db.query(csql.getSql(), csql.getData());
        }
        if (key) {
            const list: Record<string, this> = {};
            for (const row of r.rows) {
                const obj = new (this.constructor as new (
                    o: Record<string, kebab.Json>
                ) => this)({
                    'db': this._db,
                    'ctr': this._ctr,
                    'pre': this._sql.getPre(),
                    'row': row,
                    'index': this._index,
                });
                list[row[key]] = obj;
            }
            // --- 有没有必须包含的项 ---
            if (cr?.rows) {
                for (const crow of cr.rows) {
                    const obj = new (this.constructor as new (
                        o: Record<string, kebab.Json>
                    ) => this)({
                        'db': this._db,
                        'ctr': this._ctr,
                        'pre': this._sql.getPre(),
                        'row': crow,
                        'index': this._index,
                    });
                    list[crow[key]] = obj;
                }
            }
            return list;
        }
        const list: this[] = [];
        for (const row of r.rows) {
            const obj = new (this.constructor as new (
                o: Record<string, kebab.Json>
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
                    o: Record<string, kebab.Json>
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
                    sql = sql.replace(/(FROM [a-zA-Z0-9`"_.]+?_)[0-9_]+/, '$1' + this._index[i]);
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
                const lsql = sql.replace(/ LIMIT [0-9 ,]+(OFFSET [0-9]+)?/g, ` LIMIT ${remain} OFFSET ${cz}`);
                const r = await this._db.query(lsql, this._sql.getData());
                if (r.rows === null) {
                    lCore.log(this._ctr ?? {}, '[MOD][allArray] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
            lCore.log(this._ctr ?? {}, '[MOD][allArray] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
                    [this._contain.key]: contain,
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
     * --- 获取数查询（SELECT）扫描情况，获取字符串或对象 ---
     * @param all 是否获取完全的情况，默认不获取，只返回扫描情况
     */
    public async explain(all = false): Promise<false | string | Record<string, any>> {
        const r = await this._db.query('EXPLAIN ' + this._sql.getSql(), this._sql.getData());
        if (r.rows === null) {
            lCore.log(this._ctr ?? {}, '[MOD][explain] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
        if (!r.rows[0]) {
            return false;
        }
        if (!all) {
            return this._db.getService() === lDb.ESERVICE.MYSQL ?
                r.rows[0].type :
                r.rows[0]['QUERY PLAN'];
        }
        return this._db.getService() === lDb.ESERVICE.MYSQL ?
            r.rows[0] :
            {
                'scan': r.rows[0]['QUERY PLAN'],
                'filter': r.rows[1]['QUERY PLAN'],
            };
    }

    private _formatTotal(sql: string, f: string = '*'): string {
        const q = this._db.getService() === lDb.ESERVICE.MYSQL ? '`' : '"';
        sql = sql
            .replace(/ LIMIT [0-9 ,]+(OFFSET [0-9]+)?/g, '')
            .replace(/ ORDER BY [\w`",. ]+(DESC|ASC)?/g, '');
        if (sql.includes(' GROUP BY ')) {
            return 'SELECT COUNT(0) AS `count` FROM(' + sql + ') AS `f`';
        }
        return sql
            .replace(/SELECT .+? FROM/g, `SELECT COUNT(${this._sql.field(f)}) AS ${q}count${q} FROM`);
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
            lCore.log(this._ctr ?? {}, '[MOD][total] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
        const sql: string = this._sql.getSql().replace(/SELECT .+? FROM/, this._db.getService() === lDb.ESERVICE.MYSQL ?
            'SELECT COUNT(0) AS `count` FROM' :
            'SELECT COUNT(0) AS "count" FROM'
        );
        const r = await this._db.query(sql, this._sql.getData());
        if (r.rows === null) {
            lCore.log(this._ctr ?? {}, '[MOD][count] ' + lText.stringifyJson(r.error?.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return 0;
        }
        let count = 0;
        for (const item of r.rows) {
            count += item.count;
        }
        return count;
    }

    /**
     * --- 获取当前条件下的 count 的 SQL 语句 ---
     */
    public countSql(): string {
        const sql: string = this._sql.getSql().replace(/SELECT .+? FROM/, this._db.getService() === lDb.ESERVICE.MYSQL ?
            'SELECT COUNT(0) AS `count` FROM' : 'SELECT COUNT(0) AS "count" FROM'
        );
        return this._sql.format(sql, this._sql.getData());
    }

    /**
     * @param f 表名
     * @param s ON 信息
     * @param type 类型
     * @param index 给本表增加 index 分表项
     * @param pre 前缀，仅与主表的 pre 不同时传入
     */
    public join(f: string, s: kebab.Json = [], type: string = 'INNER', index: string = '', pre: string = ''): this {
        this._sql.join(f, s, type, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- left join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     * @param pre 前缀，仅与主表的 pre 不同时传入
     */
    public leftJoin(f: string, s: kebab.Json, index: string = '', pre: string = ''): this {
        this._sql.leftJoin(f, s, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- right join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     * @param pre 前缀，仅与主表的 pre 不同时传入
     */
    public rightJoin(f: string, s: kebab.Json, index: string = '', pre: string = ''): this {
        this._sql.rightJoin(f, s, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- inner join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     * @param pre 前缀，仅与主表的 pre 不同时传入
     */
    public innerJoin(f: string, s: kebab.Json, index: string = '', pre: string = ''): this {
        this._sql.innerJoin(f, s, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- full join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     * @param pre 前缀，仅与主表的 pre 不同时传入
     */
    public fullJoin(f: string, s: kebab.Json, index: string = '', pre: string = ''): this {
        this._sql.fullJoin(f, s, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- cross join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param index 给本表增加 index 分表项
     * @param pre 前缀，仅与主表的 pre 不同时传入
     */
    public crossJoin(f: string, s: kebab.Json, index: string = '', pre: string = ''): this {
        this._sql.crossJoin(f, s, index ? '_' + index : '', pre);
        return this;
    }

    /**
     * --- 筛选器 ---
     * @param s 筛选条件数组或字符串
     */
    public having(s: kebab.Json): this {
        this._sql.having(s);
        return this;
    }

    /**
     * --- 筛选器 ---
     * @param s 筛选条件数组或字符串
     */
    public filter(
        s: kebab.Json,
    ): this {
        this._sql.where(s);
        return this;
    }

    /**
     * --- 是 filter 的别名 ---
     * @param s 筛选条件数组或字符串
     */
    public where(
        s: kebab.Json,
    ): this {
        return this.filter(s);
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
     * --- 获取值对象，获取的是新创建的数组 ---
     */
    public toArray<TC extends abstract new (...args: any) => any>():
        TOnlyProperties<InstanceType<TC>> & Record<string, any> {
        return { ...this._data } as any;
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

// --- 类型 ---

export interface IRows<T> extends Iterable<T> {
    readonly length: number;
    item(index: number): T;
    toArray(): Array<Record<string, any>>;
}

export interface IModUnionItem {
    'field': string;
    'where'?: any;
}

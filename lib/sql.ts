/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-27 20:18:50
 * Last: 2020-3-29 19:37:25, 2022-07-24 22:38:11, 2023-5-24 18:49:18, 2023-6-13 22:20:21, 2023-12-11 13:58:54, 2023-12-14 13:14:40, 2023-12-21 00:04:40, 2024-4-11 19:29:29, 2024-9-2 17:15:28, 2025-8-3 21:28:18, 2025-11-9 16:20:23, 2026-4-30 13:49:44, 2026-6-1 11:30:00
 */
// --- 第三方 ---
import * as mysql2 from 'mysql2/promise';
// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as lText from '#kebab/lib/text.js';
import * as lCore from '#kebab/lib/core.js';
import * as lSqlValue from '#kebab/lib/sql/value.js';
import * as ctr from '#kebab/sys/ctr.js';

/** --- 服务商定义 --- */
export enum ESERVICE {
    'MYSQL',
    'PGSQL',
}

/** --- 非空游标值；大整数和日期请使用数据库可比较的字符串 --- */
export type TCursorValue = string | number;

/** --- JSON 查询操作符 --- */
export enum EJSON {
    /** --- 包含值 (MySQL: JSON_CONTAINS, PG: @>) --- */
    'CONTAINS' = 'json',
    /** --- 被包含值 (MySQL: JSON_CONTAINS, PG: <@) --- */
    'CONTAINED_BY' = 'json_in',
    /** --- 存在 Key 不含值 (MySQL: JSON_CONTAINS_PATH one, PG: ?) --- */
    'HAS_KEY' = 'json_key',
    /** --- 存在任意 Key 不含值 (MySQL: JSON_CONTAINS_PATH one, PG: ?|) --- */
    'HAS_ANY_KEYS' = 'json_any',
    /** --- 存在所有 Key 不含值 (MySQL: JSON_CONTAINS_PATH all, PG: ?&) --- */
    'HAS_ALL_KEYS' = 'json_all',
    /** --- 简单数组重叠 (MySQL: JSON_OVERLAPS, PG: &&) --- */
    'OVERLAPS' = 'json_overlaps',
}

/** --- column() 内部私有标记，防止通过外部 JSON 伪造字段对象注入 SQL --- */
const columnSymbol: unique symbol = Symbol('kebab.sql.column');

/** --- value() 内部私有标记，防止通过外部 JSON 伪造值对象 --- */
const valueSymbol: unique symbol = Symbol('kebab.sql.value');

/** --- raw() 内部私有标记，防止通过外部 JSON 伪造原始 SQL 表达式 --- */
const rawSymbol: unique symbol = Symbol('kebab.sql.raw');

/** --- op() 内部私有标记，用于区分显式条件和普通值 --- */
const whereSymbol: unique symbol = Symbol('kebab.sql.where');

/** --- 对象条件中显式指定的操作符和右值 --- */
export interface IWhereValue {
    readonly [whereSymbol]: true;
    readonly 'operator': TWhereOperator;
    readonly 'value': unknown;
}

/** --- 显式标记的原始 SQL 表达式及其绑定参数 --- */
export interface IRawValue {
    readonly [rawSymbol]: true;
    readonly 'sql': string;
    readonly 'params': kebab.DbValue[];
    readonly 'invalid'?: string;
}

/** --- WHERE 条件支持的操作符（SQL 运算符、JSON 操作符及 NULL 比较别名） --- */
export type TWhereOperator =
    | '=' | '!=' | '<>' | '>' | '>=' | '<' | '<=' | '<=>'
    | 'LIKE' | 'NOT LIKE' | 'ILIKE' | 'NOT ILIKE'
    | 'IN' | 'NOT IN' | 'IS' | 'IS NOT' | 'IS DISTINCT FROM' | 'IS NOT DISTINCT FROM'
    | 'REGEXP' | 'NOT REGEXP' | 'RLIKE' | 'NOT RLIKE'
    | '~' | '~*' | '!~' | '!~*'
    | '@>' | '<@' | '&&' | '?' | '?|' | '?&'
    | '&' | '|' | '^' | '<<' | '>>'
    | 'like' | 'not like' | 'ilike' | 'not ilike'
    | 'in' | 'not in' | 'is' | 'is not' | 'is distinct from' | 'is not distinct from'
    | 'regexp' | 'not regexp' | 'rlike' | 'not rlike'
    | `${EJSON}` | Uppercase<`${EJSON}`>
    | '==' | '===' | '!==';

/** --- 允许的 WHERE 运算符白名单 --- */
const WHERE_OPERATORS: ReadonlySet<string> = new Set<TWhereOperator>([
    '=', '!=', '<>', '>', '>=', '<', '<=', '<=>',
    'LIKE', 'NOT LIKE', 'ILIKE', 'NOT ILIKE',
    'IN', 'NOT IN', 'IS', 'IS NOT', 'IS DISTINCT FROM', 'IS NOT DISTINCT FROM',
    'REGEXP', 'NOT REGEXP', 'RLIKE', 'NOT RLIKE',
    '~', '~*', '!~', '!~*',
    '@>', '<@', '&&', '?', '?|', '?&',
    '&', '|', '^', '<<', '>>',
]);

/** --- NULL 比较时的运算符映射，兼容 == / === / !== 别名 --- */
const WHERE_NULL_OPERATORS: ReadonlyMap<string, string> = new Map([
    ['=', 'IS'],
    ['==', 'IS'],
    ['===', 'IS'],
    ['!=', 'IS NOT'],
    ['!==', 'IS NOT'],
    ['<>', 'IS NOT'],
]);

/** --- 允许的 JSON 查询操作符白名单 --- */
const WHERE_JSON_OPERATORS: ReadonlySet<string> = new Set(Object.values(EJSON));

/** --- 允许的 UPDATE 赋值运算符白名单 --- */
const UPDATE_OPERATORS = new Set([
    '=', '+', '-', '*', '/', '%', '||', '&', '|', '^', '<<', '>>',
]);

/** --- 允许的 JOIN 类型白名单 --- */
const JOIN_TYPES = new Set([
    'INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS',
    'LEFT OUTER', 'RIGHT OUTER', 'FULL OUTER',
    'NATURAL', 'NATURAL LEFT', 'NATURAL RIGHT',
]);

/** --- 允许的 UNION 类型白名单 --- */
const UNION_TYPES = new Set(['', 'ALL', 'DISTINCT']);

/**
 * --- 校验并规范化 ORDER BY 排序方向 ---
 * @param dir 排序方向
 * @returns 大写的 ASC 或 DESC，不合法返回 null
 */
function parseOrderDir(dir: unknown): 'ASC' | 'DESC' | null {
    if (typeof dir === 'string') {
        const upper = dir.trim().toUpperCase();
        if (upper === 'ASC' || upper === 'DESC') {
            return upper;
        }
    }
    return null;
}

/**
 * --- 校验并规范化 WHERE 运算符 ---
 * @param op 运算符
 * @returns 规范化后的大写运算符，不合法返回 null
 */
function parseWhereOp(op: unknown): string | null {
    if (typeof op !== 'string') {
        return null;
    }
    const val = op.trim().replace(/\s+/g, ' ').toUpperCase();
    return WHERE_OPERATORS.has(val) || WHERE_NULL_OPERATORS.has(val) ? val : null;
}

/**
 * --- 校验并规范化 JSON 查询操作符 ---
 * @param op 运算符
 * @returns 小写 JSON 操作符，不合法返回 null
 */
function parseWhereJsonOp(op: unknown): string | null {
    if (typeof op !== 'string') {
        return null;
    }
    const val = op.trim().toLowerCase();
    return WHERE_JSON_OPERATORS.has(val) ? val : null;
}

/**
 * --- 校验并规范化 UPDATE 运算符 ---
 * @param op 运算符
 * @returns 规范化后的运算符，不合法返回 null
 */
function parseUpdateOp(op: unknown): string | null {
    if (typeof op !== 'string') {
        return null;
    }
    const val = op.trim();
    return UPDATE_OPERATORS.has(val) ? val : null;
}

/** --- field 用 token --- */
let columnToken = '';

/** --- value 用 token --- */
let valueToken = '';

export class Sql {

    /** --- ctr 对象 --- */
    private readonly _ctr?: ctr.Ctr;

    /** --- 前置：MySQL 时为表前缀（如 prefix_），PostgreSQL 时为 Schema 名 --- */
    private readonly _pre: string = '';

    /** --- 服务商 --- */
    private readonly _service: ESERVICE;

    /** --- 预拼装 Sql 数组 --- */
    private _sql: string[] = [];

    /** --- 所有 data 数据 --- */
    private _data: kebab.DbValue[] = [];

    /** --- 表别名列表 --- */
    private readonly _alias: string[] = [];

    /** --- PostgreSQL 占位符计数器 --- */
    private _placeholderCounter: number = 1;

    /** --- 是否忽略错误 --- */
    private _ignore: boolean = false;

    /** --- MySQL 优化器 Hint，如 INDEX(table idx) --- */
    private _hint: string = '';

    /** --- 当前构建器的粘性错误；非空时 getSql() 返回空串、getData() 返回空数组 --- */
    private _error: string = '';

    /** --- hint() 独立错误，避免先 hint() 再 select() 时被重置覆盖 --- */
    private _hintError: string = '';

    // --- 实例化 ---
    public constructor(opt: {
        'service': ESERVICE;
        'ctr'?: ctr.Ctr;
        /** --- 表前缀/Schema 名：MySQL 中作为表前缀（如 prefix_），PostgreSQL 中作为 Schema 名 --- */
        'pre'?: string;
        'data'?: kebab.DbValue[];
        'sql'?: string[];
        'alias'?: string[];
    }) {
        this._ctr = opt.ctr;
        this._pre = opt.pre ?? '';
        this._service = opt.service ?? ESERVICE.MYSQL;
        if (opt.data) {
            this._data = opt.data;
            this._placeholderCounter = opt.data.length + 1;
        }
        if (opt.sql) {
            this._sql = opt.sql;
        }
        if (opt.alias) {
            this._alias = opt.alias;
        }
    }

    /** --- 记录构建错误并写入错误日志，保持首个错误不被覆盖 --- */
    private _setError(msg: string): void {
        if (!this._error) {
            this._error = msg;
        }
        lCore.log(this._ctr ?? {}, `[SQL] ${msg}`, '-error');
    }

    /** --- 获取当前构建错误，正常时为空字符串 --- */
    public getError(): string {
        return this._error;
    }

    /**
     * --- 设置 MySQL 优化器 Hint ---
     * --- 会以 Optimizer Hint 注释语法注入到 SELECT 关键字后 ---
     * --- 传入 hint 内容即可，无需包裹注释符号 ---
     * @param h Hint 内容
     * @example
     * // --- 强制走指定索引（最常用） ---
     * INDEX(`supply_date_0_0` `idx_supply_date_query`)
     *
     * // --- 指定某表不用某索引 ---
     * NO_INDEX(`supply_date_0_0` `idx_old`)
     *
     * // --- 指定 JOIN 顺序和索引 ---
     * JOIN_ORDER(`a` `b`) INDEX(`a` `idx_a`) INDEX(`b` `idx_b`)
     *
     * // --- 指定 JOIN 中某表使用的索引 ---
     * JOIN_INDEX(`supply_date_0_0` `idx_supply_date_query`)
     *
     * // --- 多表多索引组合 ---
     * INDEX(`t1` `idx_a`) JOIN_INDEX(`t2` `idx_b`)
     *
     * // --- 官方文档: https://dev.mysql.com/doc/refman/8.0/en/optimizer-hints.html ---
     */
    public hint(h: string): this {
        if (typeof h !== 'string' || h.includes('/*') || h.includes('*/')) {
            this._hint = '';
            this._hintError = 'Invalid SQL optimizer hint';
            this._setError(this._hintError);
            return this;
        }
        this._hintError = '';
        this._hint = h;
        return this;
    }

    // --- 前导 ---

    /**
     * --- 插入数据前导 ---
     * @param table 表名
     * @param ignore 是否忽略错误（MySQL: INSERT IGNORE, PGSQL: ON CONFLICT DO NOTHING）
     */
    public insert(table: string, ignore: boolean = false): this {
        this._error = this._hintError;
        this._data = [];
        this._placeholderCounter = 1;
        this._alias.length = 0;
        this._ignore = ignore;
        let sql = 'INSERT ';
        if (ignore && this._service === ESERVICE.MYSQL) {
            sql += 'IGNORE ';
        }
        sql += 'INTO ' + this.field(table, this._pre);
        this._sql = [sql];
        return this;
    }

    /**
     * --- 实际插入数据的数据 ---
     * @param cs [] 数据列或字段列
     * @param vs [] | [][] 数据
     */
    public values(
        cs: string[] | Record<string, kebab.DbValue>,
        vs: kebab.DbValue[] | kebab.DbValue[][] = []
    ): this {
        let sql = ' (';
        if (Array.isArray(cs)) {
            // --- ['id', 'name'], [['1', 'wow'], ['2', 'oh']] ---
            // --- ['id', 'name'], ['1', 'wow'] ---
            for (const i of cs) {
                sql += this.field(i) + ', ';
            }
            sql = sql.slice(0, -2) + ') VALUES ';
            if (!Array.isArray(vs[0])) {
                vs = [vs];
            }
            // --- INSERT INTO xx (id, name) VALUES (?, ?) ---
            // --- INSERT INTO xx (id, name) VALUES (?, ?), (?, ?) ---
            let row = 0;
            for (const v of vs as kebab.DbValue[][]) {
                ++row;
                sql += '(';
                let ci = 0;
                for (const value of v) {
                    const result = this._processValue(value, cs[ci++], row);
                    sql += result.sql + ', ';
                    if (result.data !== undefined) {
                        this._data.push(...result.data);
                    }
                }
                sql = sql.slice(0, -2) + '), ';
            }
            sql = sql.slice(0, -2);
        }
        else {
            // --- {'id': '1', 'name': 'wow'} ---
            // --- INSERT INTO xx (id, name) VALUES (?, ?) ---
            let values = '';
            for (const k in cs) {
                const v = cs[k];
                sql += this.field(k) + ', ';
                const result = this._processValue(v, k);
                values += result.sql + ', ';
                if (result.data !== undefined) {
                    this._data.push(...result.data);
                }
            }
            sql = sql.slice(0, -2) + ') VALUES (' + values.slice(0, -2) + ')';
        }
        this._sql.push(sql);
        if (this._ignore && this._service === ESERVICE.PGSQL) {
            this._sql.push(' ON CONFLICT DO NOTHING');
        }
        return this;
    }

    /**
     * --- 如果存在则更新不存在则插入（UPSERT）---
     * @param data 更新的数据
     * @param conflict 冲突字段，PostgreSQL 用于指定 ON CONFLICT 字段；MySQL 时忽略，因为会对所有唯一键冲突执行更新
     */
    public upsert(data: kebab.Json, conflict?: string | string[]): this {
        if (this._service === ESERVICE.MYSQL) {
            // --- MySQL: 使用 ON DUPLICATE KEY UPDATE ---
            // --- 注意：MySQL 会对任何唯一键冲突都执行更新，无法像 PostgreSQL 那样指定具体冲突字段 ---
            // --- 如果需要精确控制冲突字段，建议在应用层先查询再决定插入或更新 ---
            this._sql.push(' ON DUPLICATE KEY UPDATE ' + this._updateSub(data));
        }
        else {
            // --- PostgreSQL: 使用 ON CONFLICT ---
            let clause = ' ON CONFLICT ';
            if (conflict) {
                // --- 指定冲突字段 ---
                if (typeof conflict === 'string') {
                    clause += '(' + this.field(conflict) + ') ';
                }
                else {
                    clause += '(';
                    for (const f of conflict) {
                        clause += this.field(f) + ', ';
                    }
                    clause = clause.slice(0, -2) + ') ';
                }
            }
            // --- DO UPDATE SET ---
            this._sql.push(clause + 'DO UPDATE SET ' + this._updateSub(data));
        }
        return this;
    }

    /**
     * --- 批量 UPDATE，以子查询作为数据源，纯更新语义（不会插入新行）---
     * --- MySQL: UPDATE t INNER JOIN (SELECT col AS alias ... UNION ALL SELECT ...) AS tmp ON t.key=tmp.key SET t.c=tmp.c ---
     * --- PostgreSQL: UPDATE t SET c=tmp.c FROM (VALUES (typed nulls), ($1,...)) AS tmp(cols) WHERE t.key=tmp.key ---
     * @param table 表名
     * @param key 用于定位待更新记录的字段名，通常为主键或唯一键，至少必须建立索引；
     *         该参数是字段名而不是索引名，仅参与 ON / WHERE 匹配，不会被更新
     * @param cols 要更新的列名数组（不含 key）
     * @param rows 数据行数组，每行顺序为 [keyVal, col1Val, col2Val, ...]（与 [key, ...cols] 对应）
     */
    public updateByValues(table: string, key: string, cols: string[], rows: any[][]): this {
        this._error = this._hintError;
        this._data = [];
        this._placeholderCounter = 1;
        const allCols = [key, ...cols];
        const quotedTable = this.field(table, this._pre);
        const quotedKey = this.field(key);
        if (this._service === ESERVICE.MYSQL) {
            // --- MySQL UNION ALL SELECT 派生表语法 ---
            // --- 必须把 tmp 放在 UPDATE 的 table_references 最前面，并使用 STRAIGHT_JOIN：
            //     1. tmp 是小数据集，作为驱动表逐行查找目标表
            //     2. STRAIGHT_JOIN 强制目标表按 key 条件被查找，避免优化器反向全表扫描
            //     3. 相比 VALUES ROW()，UNION ALL SELECT 不会将派生表列强制转换为目标表类型，
            //        避免 "Data too long for column" 错误 ---
            const selectParts: string[] = [];
            for (let ri = 0; ri < rows.length; ri++) {
                const row = rows[ri];
                const parts = row.map((v, ci) => {
                    const result = this._processValue(v, allCols[ci], ri + 1, quotedTable);
                    if (result.data.length > 0) {
                        this._data.push(...result.data);
                    }
                    return ri === 0 ? `${result.sql} AS ${this.field(allCols[ci])}` : result.sql;
                });
                selectParts.push(`SELECT ${parts.join(', ')}`);
            }
            const setClauses = cols.map(c => `t.${this.field(c)} = tmp.${this.field(c)}`).join(', ');
            this._sql = [`UPDATE (${selectParts.join(' UNION ALL ')}) AS tmp STRAIGHT_JOIN ${quotedTable} t ON t.${quotedKey} = tmp.${quotedKey} SET ${setClauses}`];
        }
        else {
            // --- PostgreSQL 使用 UPDATE FROM (VALUES ...)；首行从目标表复合类型取得真实列类型，
            //     避免按 JS 值猜测类型时 uuid、日期、枚举、数组或 NULL 列无法匹配 ---
            const valueParts: string[] = [];
            const typeParts = allCols.map(c => `(NULL::${quotedTable}).${this.field(c)}`);
            valueParts.push(`(${typeParts.join(', ')})`);
            let ri = 0;
            for (const row of rows) {
                ++ri;
                const parts = row.map((v, ci) => {
                    const result = this._processValue(v, allCols[ci], ri, quotedTable);
                    if (result.data.length > 0) {
                        this._data.push(...result.data);
                    }
                    return result.sql;
                });
                valueParts.push(`(${parts.join(', ')})`);
            }
            const tmpCols = allCols.map(c => this.field(c)).join(', ');
            const setClauses = cols.map(c => `${this.field(c)} = tmp.${this.field(c)}`).join(', ');
            this._sql = [`UPDATE ${quotedTable} t SET ${setClauses} FROM (VALUES ${valueParts.join(', ')}) AS tmp(${tmpCols}) WHERE t.${quotedKey} = tmp.${quotedKey}`];
        }
        return this;
    }

    /**
     * --- '*', 'xx' ---
     * @param c 字段字符串或字段数组
     * @param f 表，允许多张表
     */
    public select(c: string | Array<string | any[]>, f: string | string[]): this {
        this._error = this._hintError;
        this._data = [];
        this._placeholderCounter = 1;
        let sql = 'SELECT ';
        if (typeof c === 'string') {
            sql += this.field(c);
        }
        else {
            // --- c: ['id', 'name'] ---
            for (const i of c) {
                if (Array.isArray(i)) {
                    // --- i: ['xx', ['x']] ---
                    sql += this.field(i[0].replace(/\?/g, () => this._placeholder())) + ', ';
                    this._data.push(...i[1]);
                }
                else {
                    sql += this.field(i) + ', ';
                }
            }
            sql = sql.slice(0, -2);
        }
        sql += ' FROM ';
        if (typeof f === 'string') {
            sql += this.field(f, this._pre);
        }
        else {
            // --- f: ['user', 'order'] ---
            for (const i of f) {
                sql += this.field(i, this._pre) + ', ';
            }
            sql = sql.slice(0, -2);
        }
        this._sql = [sql];
        return this;
    }

    /**
     * --- UPDATE SQL 方法 ---
     * @param f 表名
     * @param s 设定 update 的值
     */
    public update(f: string, s: kebab.Json): this {
        this._error = this._hintError;
        this._data = [];
        this._placeholderCounter = 1;
        const table = this.field(f, this._pre);
        const sql = `UPDATE ${table} SET ${this._updateSub(s, table)}`;
        this._sql = [sql];
        return this;
    }

    /**
     * --- 生成更新字段列表及其绑定参数 ---
     * @param s 更新值
     * @param table 已格式化的目标表名，UPSERT 从 INSERT 前导取表名
     * @returns SET 子句中的赋值列表
     */
    private _updateSub(s: kebab.Json, table?: string): string {
        /*
        [
            ['total', '+', '1'],
            {
                'type': '6',
                'type': column('type2'),
                'type': raw('(CASE `id` WHEN 1 THEN ? WHEN 2 THEN ? END)', ['val1', 'val2']),
                'point': { 'x': 0, 'y': 0 },
                'polygon': [ [ { 'x': 0, 'y': 0 }, { ... } ], [ ... ] ],
                'json': json({ 'a': 1, 'b': { 'c': 2 }, 'c': [ { 'c': 2 } ] }),
                'json2': json(['abc'])
            }
        ]
        */
        let sql = '';
        const items: unknown[] = Array.isArray(s) ? s : [s];
        for (const item of items) {
            if (Array.isArray(item)) {
                // --- 数组运算式：[字段, 运算符, 值]，仅在外层为数组时识别 ---
                const op = parseUpdateOp(item[1]);
                if (op === null) {
                    this._setError(`Invalid SQL UPDATE operator: ${String(item[1])}`);
                    return '';
                }
                const val = item[2];
                if (this._isField(val)) {
                    const col = this.field(item[0]);
                    const target = this.field(val.value);
                    sql += op === '=' ? `${col} = ${target}, ` : `${col} = ${col} ${op} ${target}, `;
                }
                else {
                    // --- JSON 标记值需要生成 ::jsonb；普通运算值保持原占位符行为 ---
                    const res = lSqlValue.isJson(val) ? this._processValue(val) : {
                        'sql': this._placeholder(),
                        'data': [val],
                    };
                    const col = this.field(item[0]);
                    sql += op === '=' ? `${col} = ${res.sql}, ` : `${col} = ${col} ${op} ${res.sql}, `;
                    this._data.push(...res.data);
                }
            }
            else if (item && typeof item === 'object') {
                // --- 对象赋值式：{字段: 值}；数字键同样按列名处理，避免 JSON 伪造运算式 ---
                const obj = item as Record<string, kebab.Json>;
                for (const key in obj) {
                    const res = this._processValue(obj[key], key, undefined, table);
                    sql += `${this.field(key)} = ${res.sql}, `;
                    if (res.data !== undefined) {
                        this._data.push(...res.data);
                    }
                }
            }
        }
        sql = sql.slice(0, -2);
        return sql;
    }

    /**
     * --- 'xx' ---
     * @param f 表名
     */
    public delete(f: string): this {
        this._error = this._hintError;
        this._data = [];
        this._placeholderCounter = 1;
        this._sql = ['DELETE FROM ' + this.field(f, this._pre)];
        return this;
    }

    /**
     * --- 联查另一个 sql 对象 ---
     * @param lsql sql 对象
     * @param type 类型
     */
    public union(lsql: Sql, type: string = ''): this {
        if (lsql.getError()) {
            this._setError(lsql.getError());
            return this;
        }
        if (typeof type !== 'string') {
            this._setError('Invalid SQL UNION type');
            return this;
        }
        const kind = type.trim().toUpperCase();
        if (!UNION_TYPES.has(kind)) {
            this._setError(`Invalid SQL UNION type: ${type}`);
            return this;
        }
        const offset = this._data.length;
        this._data = this._data.concat(lsql.getData());
        this._sql.push(kind ? ` UNION ${kind} ` : ' UNION ');
        let unionSql = lsql.getSql();
        // --- PGSQL: 偏移 $N 占位符编号 ---
        if (this._service === ESERVICE.PGSQL && offset > 0) {
            unionSql = unionSql.replace(/\$(\d+)/g, (_, n) => `$${parseInt(n) + offset}`);
        }
        this._sql.push(unionSql);
        this._placeholderCounter = this._data.length + 1;
        return this;
    }

    /**
     * --- 所有联查另一个 sql 对象 ---
     * @param lsql sql 对象
     */
    public unionAll(lsql: Sql): this {
        return this.union(lsql, 'ALL');
    }

    /**
     * --- join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param type 类型
     * @param suf 表后缀
     * @param pre MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写
     */
    public join(f: string, s: kebab.Json = [], type: string = 'INNER', suf: string = '', pre: string = ''): this {
        if (typeof type !== 'string') {
            this._setError('Invalid SQL JOIN type');
            return this;
        }
        const kind = type.trim().replace(/\s+/g, ' ').toUpperCase();
        if (!JOIN_TYPES.has(kind)) {
            this._setError(`Invalid SQL JOIN type: ${type}`);
            return this;
        }
        let field = this.field(f, pre || this._pre, suf ? `#${suf}` : '');
        if (pre) {
            // --- 处理不同 pre 的 as 前缀问题 ---
            if (this._service === ESERVICE.MYSQL) {
                field = field.replace(new RegExp(`AS \`${pre}(.+?)\``), `AS \`${this._pre}$1\``);
            }
            else {
                field = field.replace(new RegExp(`AS "${pre}"."(.+?)"`), `AS "${this._pre}"."$1"`);
            }
        }
        let sql = ` ${kind} JOIN ${field}`;
        if (Array.isArray(s) ? s.length : Object.keys(s).length) {
            sql += ' ON ' + this._whereSub(s);
        }
        this._sql.push(sql);
        return this;
    }

    /**
     * --- left join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param suf 表后缀
     * @param pre MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写
     */
    public leftJoin(f: string, s: kebab.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'LEFT', suf, pre);
    }

    /**
     * --- right join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param suf 表后缀
     * @param pre MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写
     */
    public rightJoin(f: string, s: kebab.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'RIGHT', suf, pre);
    }

    /**
     * --- inner join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param suf 表后缀
     * @param pre MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写
     */
    public innerJoin(f: string, s: kebab.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'INNER', suf, pre);
    }

    /**
     * --- full join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param suf 表后缀
     * @param pre MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写
     */
    public fullJoin(f: string, s: kebab.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'FULL', suf, pre);
    }

    /**
     * --- cross join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param suf 表后缀
     * @param pre MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写
     */
    public crossJoin(f: string, s: kebab.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'CROSS', suf, pre);
    }

    /**
     * --- having 后置筛选器，用法类似 where ---
     */
    public having(s: string | kebab.Json = ''): this {
        if (typeof s === 'string') {
            // --- string ---
            if (s !== '') {
                this._sql.push(' HAVING ' + s);
            }
        }
        else if (s && typeof s === 'object') {
            // --- 数组或条件对象 ---
            const hasCondition = Array.isArray(s) ? s.length > 0 : Object.keys(s).length > 0;
            if (hasCondition) {
                const whereSub = this._whereSub(s);
                if (whereSub !== '') {
                    this._sql.push(' HAVING ' + whereSub);
                }
            }
        }
        return this;
    }

    /** --- where 的 data 的开始处和结束处 --- */
    private _whereDataPosition = [0, 0];

    /**
     * --- 筛选器 ---
     * --- 等值条件：'city': 'bj'；字符串、数字、布尔值、bigint、Date 和 Buffer 均作为单个参数 ---
     * --- null 生成 IS NULL。数组和 Set 生成 IN 条件 ---
     * --- 对象条件使用显式操作符：{ 'price': op('<', 0) }，与 [['price', '<', 0]] 等效 ---
     * --- 集合条件：{ 'type': op('not in', ['1', '2']) } 或 { 'type': new Set(['1', '2']) } ---
     * --- IN 和 NOT IN 均接受数组和 Set。空集合的 IN 不匹配任何行，NOT IN 匹配所有行。 ---
     * --- 逻辑分组：'$or': [{'city': 'bj'}, {'city': 'sh'}, [['age', '>', '10']]] ---
     * --- 字段比较：'city_in': column('city_out') ---
     * --- 原始条件：['JSON_CONTAINS(`uid`, ?)', ['hello']] ---
     * --- JSON 条件：['info', 'json', {'a': 1}] ---
     * @param s 筛选数据
     */
    public where(s: string | kebab.Json): this {
        this._whereDataPosition[0] = this._data.length;
        if (typeof s === 'string') {
            // --- string ---
            if (s !== '') {
                this._sql.push(' WHERE ' + s);
                this._whereDataPosition[1] = this._data.length;
            }
        }
        else {
            // --- array ---
            let go: boolean = false;
            if (Array.isArray(s)) {
                if (s.length) {
                    go = true;
                }
            }
            else {
                if (Object.keys(s).length) {
                    go = true;
                }
            }
            if (go) {
                const whereSub = this._whereSub(s);
                if (whereSub !== '') {
                    this._sql.push(' WHERE ' + whereSub);
                }
            }
            this._whereDataPosition[1] = this._data.length;
        }
        return this;
    }

    /**
     * --- 统计条件项数量，决定逻辑分组内是否需要外层括号 ---
     * @param cond 条件对象或数组
     * @returns 条件条数
     */
    private _countConditions(cond: kebab.Json): number {
        if (Array.isArray(cond)) {
            let count = 0;
            for (const item of cond) {
                if (Array.isArray(item)) {
                    ++count;
                }
                else if (item && typeof item === 'object') {
                    count += Object.keys(item).length;
                }
            }
            return count;
        }
        if (cond && typeof cond === 'object') {
            return Object.keys(cond).length;
        }
        return 0;
    }

    /**
     * --- 生成单条数组条件 SQL 片段 ---
     * @param item 数组条件项
     * @param data 绑定参数列表
     * @returns 带尾随 AND 的 SQL 片段，校验失败返回空字符串
     */
    private _whereArrayItem(item: kebab.Json[], data: kebab.DbValue[]): string {
        // --- 原始 SQL 条件及参数 ---
        if (item.length < 3) {
            if (item[1] !== undefined) {
                data.push(...item[1]);
            }
            return `${this.field(item[0])} AND `;
        }
        if (item[2] === undefined) {
            this._setError('Missing SQL WHERE operand');
            return '';
        }
        // --- JSON 操作符条件 ---
        const jsonOp = parseWhereJsonOp(item[1]);
        if (jsonOp !== null) {
            const val = lSqlValue.unwrapJson(item[2]);
            if (jsonOp === EJSON.CONTAINS) {
                data.push(lText.stringifyJson(val));
                return this._service === ESERVICE.MYSQL ?
                    `JSON_CONTAINS(${this.field(item[0])}, ${this._placeholder()}) AND ` :
                    `${this.field(item[0])} @> ${this._placeholder()} AND `;
            }
            if (jsonOp === EJSON.CONTAINED_BY) {
                data.push(lText.stringifyJson(val));
                return this._service === ESERVICE.MYSQL ?
                    `JSON_CONTAINS(${this._placeholder()}, ${this.field(item[0])}) AND ` :
                    `${this.field(item[0])} <@ ${this._placeholder()} AND `;
            }
            if (jsonOp === EJSON.OVERLAPS) {
                if (this._service === ESERVICE.MYSQL) {
                    data.push(lText.stringifyJson(val));
                    return `JSON_OVERLAPS(${this.field(item[0])}, ${this._placeholder()}) AND `;
                }
                data.push(val);
                return `${this.field(item[0])} && ${this._placeholder()} AND `;
            }
            // --- json_key, json_any, json_all ---
            const keys: string[] = Array.isArray(val) ? val : [val];
            if (this._service === ESERVICE.MYSQL) {
                const mode = jsonOp === EJSON.HAS_ALL_KEYS ? 'all' : 'one';
                let pathSql = '';
                for (const key of keys) {
                    pathSql += `, ${this._placeholder()}`;
                    data.push(key.startsWith('$') ? key : `$.${key}`);
                }
                return `JSON_CONTAINS_PATH(${this.field(item[0])}, '${mode}'${pathSql}) AND `;
            }
            if (jsonOp === EJSON.HAS_KEY && keys.length === 1) {
                data.push(keys[0]);
                return `${this.field(item[0])} ? ${this._placeholder()} AND `;
            }
            const pgOp = jsonOp === EJSON.HAS_ALL_KEYS ? '?&' : '?|';
            data.push(keys);
            return `${this.field(item[0])} ${pgOp} ${this._placeholder()} AND `;
        }
        const val = item[2];
        const op = parseWhereOp(item[1]);
        if (op === null || (val !== null && !WHERE_OPERATORS.has(op))) {
            this._setError(`Invalid SQL WHERE operator: ${String(item[1])}`);
            return '';
        }
        if (val === null) {
            return `${this.field(item[0])} ${WHERE_NULL_OPERATORS.get(op) ?? op} NULL AND `;
        }
        if (Array.isArray(val) || (val instanceof Set && (op === 'IN' || op === 'NOT IN'))) {
            return `${this._whereList(item[0], op, val, data)} AND `;
        }
        // --- 普通运算符或字段比较 ---
        // --- item[0] 也可以是 value() 包裹的字面量值 ---
        const isVal0 = this._isValue(item[0]);
        const leftSql = isVal0 ? this._placeholder() : this.field(item[0]);
        if (isVal0) {
            data.push(item[0].value);
        }
        if (this._isField(val)) {
            return `${leftSql} ${op} ${this.field(val.value)} AND `;
        }
        const res = lSqlValue.isJson(val) ? this._processValue(val) : {
            'sql': this._placeholder(),
            'data': [val],
        };
        data.push(...res.data);
        return `${leftSql} ${op} ${res.sql} AND `;
    }

    /**
     * --- 生成单个对象键的条件 SQL 片段 ---
     * @param key 字段名或 $or/$and 逻辑分组键
     * @param val 条件值
     * @param data 绑定参数列表
     * @returns 带尾随 AND 的 SQL 片段，校验失败或空分组返回空字符串
     */
    private _whereObjectEntry(key: string, val: kebab.Json, data: kebab.DbValue[]): string {
        if (key.startsWith('$')) {
            // --- 逻辑条件分组，仅允许 $or / $and（可带 - 后缀区分多组） ---
            if (!Array.isArray(val) || val.length === 0) {
                return '';
            }
            const logic = key.slice(1).split('-')[0].toUpperCase();
            if (logic !== 'OR' && logic !== 'AND') {
                this._setError(`Invalid SQL logical operator: ${key}`);
                return '';
            }
            const sep = ` ${logic} `;
            let sql = '(';
            for (const sub of val) {
                const subSql = this._whereSub(sub, data);
                sql += this._countConditions(sub) > 1 ? `(${subSql})${sep}` : `${subSql}${sep}`;
            }
            return `${sql.slice(0, -sep.length)}) AND `;
        }
        // --- 单字段条件 ---
        if (val === null) {
            return `${this.field(key)} IS NULL AND `;
        }
        if (lSqlValue.isJson(val)) {
            const res = this._processValue(val);
            data.push(...res.data);
            return `${this.field(key)} = ${res.sql} AND `;
        }
        if (this._isField(val)) {
            return `${this.field(key)} = ${this.field(val.value)} AND `;
        }
        if (val && typeof val === 'object' && val[whereSymbol] === true) {
            return this._whereArrayItem([key, val.operator, val.value], data);
        }
        if (Array.isArray(val) || val instanceof Set) {
            return `${this._whereList(key, 'IN', val, data)} AND `;
        }
        data.push(val);
        return `${this.field(key)} = ${this._placeholder()} AND `;
    }

    /**
     * --- 生成 WHERE / HAVING / ON 条件子句 ---
     * @param s 条件对象或条件数组
     * @param data 接收绑定参数的数组，默认使用当前实例的 _data
     * @returns 条件 SQL 片段，无有效条件时返回空字符串
     */
    private _whereSub(s: kebab.Json, data?: kebab.DbValue[]): string {
        data ??= this._data;
        let sql = '';
        const items: unknown[] = Array.isArray(s) ? s : [s];
        for (const item of items) {
            if (Array.isArray(item)) {
                sql += this._whereArrayItem(item, data);
            }
            else if (item && typeof item === 'object') {
                const obj = item as Record<string, kebab.Json>;
                for (const key in obj) {
                    sql += this._whereObjectEntry(key, obj[key], data);
                }
            }
        }
        if (sql === '') {
            return '';
        }
        return sql.slice(0, -5);
    }

    /**
     * --- 生成集合比较条件，按迭代顺序追加参数 ---
     * @param field 参与比较的字段
     * @param operator 大写 SQL 运算符
     * @param values 集合成员，每个成员是单值或一行组合值
     * @param data 接收绑定参数的数组
     * @returns 集合比较 SQL 片段
     */
    private _whereList(
        field: string | number | [string, string[]], operator: string,
        values: Array<kebab.DbValue | kebab.DbValue[]> | ReadonlySet<kebab.DbValue | kebab.DbValue[]>,
        data: kebab.DbValue[],
    ): string {
        if (Array.isArray(values) ? values.length === 0 : values.size === 0) {
            if (operator === 'IN') {
                return `${this.field(field)} IN (NULL)`;
            }
            if (operator === 'NOT IN') {
                return '1 = 1';
            }
        }

        let sql = `${this.field(field)} ${operator} (`;
        for (const value of values) {
            if (Array.isArray(value)) {
                sql += '(';
                for (const item of value) {
                    sql += this._placeholder() + ', ';
                    data.push(item);
                }
                sql = sql.slice(0, -2) + '), ';
            }
            else {
                sql += this._placeholder() + ', ';
                data.push(value);
            }
        }
        return sql.slice(0, -2) + ')';
    }

    /**
     * --- ORDER BY ---
     * @param c 字段字符串或数组
     * @param d 排序规则
     */
    public by(c: string | Array<string | string[]>, d: 'DESC' | 'ASC' = 'DESC'): this {
        const dir = parseOrderDir(d);
        if (dir === null) {
            this._setError('Invalid SQL ORDER BY direction');
            return this;
        }
        let sql = ' ORDER BY ';
        if (typeof c === 'string') {
            sql += `${this.field(c)} ${dir}`;
        }
        else {
            for (const item of c) {
                if (typeof item === 'string' || typeof item === 'number') {
                    sql += `${this.field(item)} ${dir}, `;
                }
                else {
                    const subDir = parseOrderDir(item[1]);
                    if (subDir === null) {
                        this._setError('Invalid SQL ORDER BY direction');
                        return this;
                    }
                    sql += `${this.field(item[0])} ${subDir}, `;
                }
            }
            sql = sql.slice(0, -2);
        }
        this._sql.push(sql);
        return this;
    }

    /**
     * --- 按非空、同向排序字段定位游标并设置排序；字段组合须唯一且有匹配索引 ---
     * --- 使用行比较，让 PostgreSQL 可以从复合索引边界开始扫描 ---
     * @param c 排序字段，支持表别名；不支持表达式、GROUP BY 或 UNION
     * @param values 上一页末行的字段值，省略时读取首批
     * @param d 扫描方向；读取前一批时反转方向并在取回后反转列表
     * @returns 当前 SQL 对象；参数非法时记录构建错误并失败关闭
     */
    public seek(c: string | string[], values?: TCursorValue[], d: 'DESC' | 'ASC' = 'DESC'): this {
        // --- 校验排序字段与现有 SQL 结构 ---
        const fields = typeof c === 'string' ? [c] : c;
        const dir = parseOrderDir(d);
        if (!fields.length || new Set(fields).size !== fields.length ||
            fields.some(field => !/^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)?$/.test(field)) ||
            dir === null) {
            this._setError('Invalid cursor ordering');
            return this;
        }
        if (this._sql.some(part => /^ (ORDER BY|LIMIT|GROUP BY|HAVING|UNION|FOR UPDATE)\b/i.test(part))) {
            this._setError('seek requires an ungrouped query without ordering or pagination');
            return this;
        }

        // --- 传入边界值时追加行比较 WHERE 条件 ---
        if (values !== undefined) {
            if (values.length !== fields.length || values.some(val =>
                (typeof val !== 'string' && typeof val !== 'number') ||
                (typeof val === 'number' && (!Number.isFinite(val) || (Number.isInteger(val) && !Number.isSafeInteger(val))))
            )) {
                this._setError('Invalid cursor values; use strings for large integers');
                return this;
            }
            const cols = fields.map(field => this.field(field));
            const holders = values.map(() => this._placeholder());
            const left = cols.length === 1 ? cols[0] : `(${cols.join(', ')})`;
            const right = holders.length === 1 ? holders[0] : `(${holders.join(', ')})`;
            let cond = `${left} ${dir === 'DESC' ? '<' : '>'} ${right}`;
            if (cols.length > 1) {
                // --- 显式收紧首列边界，避免已有较宽范围条件让 PG 在索引内遍历到行比较边界 ---
                cond += ` AND ${cols[0]} ${dir === 'DESC' ? '<=' : '>='} ${this._placeholder()}`;
            }
            const idx = this._sql.findIndex(part => part.startsWith(' WHERE '));
            if (idx === -1) {
                this._whereDataPosition[0] = this._data.length;
                this._sql.push(` WHERE ${cond}`);
            }
            else {
                this._sql[idx] = ` WHERE (${this._sql[idx].slice(7)}) AND ${cond}`;
            }
            this._data.push(...values);
            if (cols.length > 1) {
                this._data.push(values[0]);
            }
            this._whereDataPosition[1] = this._data.length;
        }
        return this.by(fields, dir);
    }

    /**
     * --- GROUP BY ---
     * @param c 字段字符串或数组
     */
    public group(c: string | string[]): this {
        let sql = ' GROUP BY ';
        if (typeof c === 'string') {
            sql += this.field(c);
        }
        else {
            for (const v of c) {
                sql += this.field(v) + ', ';
            }
            sql = sql.slice(0, -2);
        }
        this._sql.push(sql);
        return this;
    }

    /**
     * --- LIMIT（limit、offset, limit） ---
     * @param a 起始（offset）或仅传单参时的长度（limit）
     * @param b 长度（limit）
     */
    public limit(a: number, b: number = 0): this {
        const first = lText.parseSafeInt(a, { 'min': 0 });
        const second = lText.parseSafeInt(b, { 'min': 0 });
        if (first === null || second === null) {
            this._setError('Invalid SQL limit: must be an integer >= 0');
            return this;
        }
        if (second) {
            // --- offset, limit ---
            this._sql.push(` LIMIT ${second} OFFSET ${first}`);
        }
        else {
            // --- limit ---
            this._sql.push(` LIMIT ${first}`);
        }
        return this;
    }

    /**
     * --- 追加消极锁，通常不建议使用 ---
     */
    public lock(): this {
        this._sql.push(' FOR UPDATE');
        return this;
    }

    /**
     * --- 创建一个本对象的一个新的 sql 对象拷贝 ---
     * @param f 可为空，可设置新对象的 table 名变化
     */
    public copy(f?: string | string[], opt: {
        'where'?: string | kebab.Json;
        /** --- false 时移除本查询的排序，不修改子查询 --- */
        'order'?: false;
        /** --- false 时移除本查询的 LIMIT/OFFSET，不修改子查询 --- */
        'limit'?: false;
    } = {}): Sql {
        const sql: string[] = lCore.clone(this._sql);
        const data: any[] = lCore.clone(this._data);
        if (opt.where !== undefined) {
            let found = false;
            if (typeof opt.where === 'string') {
                // --- string ---
                for (let i = 0; i < sql.length; ++i) {
                    if (!sql[i].startsWith(' WHERE ')) {
                        continue;
                    }
                    found = true;
                    sql[i] = opt.where ? (' WHERE ' + opt.where) : '';
                    data.splice(
                        this._whereDataPosition[0],
                        this._whereDataPosition[1] - this._whereDataPosition[0]
                    );
                    break;
                }
                if (!found && opt.where) {
                    // --- 没找到原来的且现在要加（有可能 opt.where 是空字符串，所以这里必须判断一次） ---
                    let index = sql.length;
                    for (let i = 0; i < sql.length; ++i) {
                        if (
                            sql[i].startsWith(' ORDER BY ') ||
                            sql[i].startsWith(' GROUP BY ') ||
                            sql[i].startsWith(' LIMIT ') ||
                            sql[i].startsWith(' FOR UPDATE')
                        ) {
                            index = i;
                            break;
                        }
                    }
                    sql.splice(index, 0, ' WHERE ' + opt.where);
                }
            }
            else {
                // --- array ---
                let go: boolean = false;
                if (Array.isArray(opt.where)) {
                    if (opt.where.length) {
                        go = true;
                    }
                }
                else {
                    if (Object.keys(opt.where).length) {
                        go = true;
                    }
                }
                // --- 找到原来的 where ---
                for (let i = 0; i < sql.length; ++i) {
                    if (!sql[i].startsWith(' WHERE ')) {
                        continue;
                    }
                    found = true;
                    if (go) {
                        // --- 修改 where ---
                        const d: any[] = [];
                        sql[i] = ' WHERE ' + this._whereSub(opt.where, d);
                        data.splice(
                            this._whereDataPosition[0],
                            this._whereDataPosition[1] - this._whereDataPosition[0],
                            ...d
                        );
                    }
                    else {
                        // --- 清除 where ---
                        sql.splice(i, 1);
                        data.splice(
                            this._whereDataPosition[0],
                            this._whereDataPosition[1] - this._whereDataPosition[0]
                        );
                    }
                    break;
                }
                if (!found && go) {
                    // --- 没找到原来的且现在要加 ---
                    let index = sql.length;
                    for (let i = 0; i < sql.length; ++i) {
                        if (
                            sql[i].startsWith(' ORDER BY ') ||
                            sql[i].startsWith(' GROUP BY ') ||
                            sql[i].startsWith(' LIMIT ') ||
                            sql[i].startsWith(' FOR UPDATE')
                        ) {
                            index = i;
                            break;
                        }
                    }
                    const d: any[] = [];
                    sql.splice(index, 0, ' WHERE ' + this._whereSub(opt.where, d));
                    data.push(...d);
                }
            }
        }
        // --- 替换表名 ---
        if (f && sql[0]) {
            let table = '';
            if (typeof f === 'string') {
                table = this.field(f, this._pre);
            }
            else {
                // --- f: ['user', 'order'] ---
                for (const i of f) {
                    table += this.field(i, this._pre) + ', ';
                }
                table = table.slice(0, -2);
            }
            sql[0] = sql[0].replace(/FROM [`"\w., ]+/, 'FROM ' + table);
        }
        // --- PGSQL: 修改 where 后重新编号 $N 占位符 ---
        if (this._service === ESERVICE.PGSQL && opt.where !== undefined) {
            let counter = 1;
            for (let i = 0; i < sql.length; ++i) {
                sql[i] = sql[i].replace(/\$\d+/g, () => `$${counter++}`);
            }
        }
        for (let i = sql.length - 1; i >= 0; --i) {
            if ((opt.order === false && sql[i].startsWith(' ORDER BY ')) ||
                (opt.limit === false && sql[i].startsWith(' LIMIT '))) {
                sql.splice(i, 1);
            }
        }
        const result = get({
            'service': this._service,
            'ctr': this._ctr,
            'pre': this._pre,
            'data': data,
            'sql': sql,
            'alias': lCore.clone(this._alias),
        });
        if (this._hint) {
            result.hint(this._hint);
        }
        if (this._hintError) {
            result._hintError = this._hintError;
        }
        if (this._error) {
            result._error = this._error;
        }
        if (opt.where === undefined) {
            result._whereDataPosition = [...this._whereDataPosition];
        }
        return result;
    }

    // --- 操作 ---

    /**
     * --- 获取 sql 语句；存在构建错误时返回空字符串 ---
     */
    public getSql(): string {
        if (this._error) {
            return '';
        }
        let sql = this._sql.join('');
        // --- 注入优化器 Hint 到 SELECT 关键字后 ---
        if (this._hint && !sql.includes('/*+')) {
            sql = sql.replace(/^SELECT /i, `SELECT /*+ ${this._hint} */ `);
        }
        if (this._pre) {
            return this._alias.reduce((result, item) => {
                if (this._service === ESERVICE.MYSQL) {
                    return result.replace(new RegExp('`' + this._pre + item + '`', 'g'), '`' + item + '`');
                }
                return result.replace(new RegExp(`"${this._pre}"\\."${item}"`, 'g'), '"' + item + '"');
            }, sql);
        }
        return sql;
    }

    /**
     * --- 获取全部 data；存在构建错误时返回空数组 ---
     */
    public getData(): kebab.DbValue[] {
        if (this._error) {
            return [];
        }
        return lSqlValue.serializeList(this._data) ?? [];
    }

    /**
     * --- 获取定义的 pre ---
     */
    public getPre(): string {
        return this._pre;
    }

    /**
     * --- 获取带 data 的 sql 语句 ---
     * @param sql
     * @param data
     */
    public format(sql?: string, data?: kebab.DbValue[]): string {
        return format(sql ?? this.getSql(), data ?? this.getData(), this._service);
    }

    // --- 特殊方法 ---

    /**
     * --- 在 sql 最后追加字符串 ---
     * @param sql
     */
    public append(sql: string): this {
        this._sql.push(sql);
        return this;
    }

    /**
     * --- 对字段进行包裹 ---
     * @param str
     * @param pre MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅请在 field 表名时倒入前缀/Schema
     * @param suf 表后缀，仅请在 field 表名时倒入后缀，前面加 # 代表要强制 AS，可能是分表查询时用
     */
    public field(str: string | number | [string, string[]], pre: string = '', suf: string = ''): string {
        const q = this._service === ESERVICE.MYSQL ? '`' : '"';
        if (Array.isArray(str)) {
            this._data.push(...str[1]);
            // --- PGSQL: 将 ? 占位符转换为 $N ---
            if (this._service === ESERVICE.PGSQL) {
                return this.field(str[0].replace(/\?/g, () => this._placeholder()));
            }
            return this.field(str[0]);
        }
        if (typeof str === 'number') {
            str = str.toString();
        }
        str = str.trim()                    // --- 去除前导尾随 ---
            .replace(/ {2,}/g, ' ')         // --- 去除多余的空格 ---
            .replace(/ +([),])/g, ' $1')
            .replace(/([(,]) +/g, '$1 ')
            .replace(/(\W)(JOIN|WHERE|UNION)(\W)/ig, '$1$3');
        // --- 先判断 suf 强制性 AS ---
        const sufAs = suf.startsWith('#');
        if (sufAs) {
            // --- 强制 AS ---
            suf = suf.slice(1);
        }
        // --- 先判断有没有别名（也就是 as） ---
        const asPos = str.toLowerCase().indexOf(' as ');
        let left = '';
        let right = '';
        if (asPos === -1) {
            // --- 没有 as ---
            let spacePos = str.lastIndexOf(' ');
            // --- 有可能有 aa + bb + cc + 10 这种情况 ---
            if (!/^[a-zA-Z_)]$/.test(str[spacePos - 1])) {
                // --- 连接符 ---
                spacePos = -1;
            }
            if (spacePos !== -1 && /^[a-zA-Z_`"][\w`"]*$/.test(str.slice(spacePos + 1))) {
                left = str.slice(0, spacePos);
                right = str.slice(spacePos + 1);
            }
            else {
                left = str;
            }
        }
        else {
            // --- 有 as ---
            left = str.slice(0, asPos);
            right = str.slice(asPos + 4);
        }
        if (right) {
            // --- 处理右侧 ---
            const hasQuote = right.startsWith(q);
            if (!left.includes('.')) {
                // --- 存储表别名 ---
                this._alias.push(hasQuote ? right.slice(1, -1) : right);
            }
            if (this._service === ESERVICE.MYSQL) {
                right = ' AS `' + pre + (hasQuote ? right.slice(1) : right + '`');
            }
            else {
                right = ' AS ' + (pre ? `"${pre}".` : '') + (hasQuote ? right : `"${right}"`);
            }
        }
        else if (sufAs) {
            // --- 没有右侧 ---
            // --- 强制 AS ---
            if (!left.includes('.')) {
                // --- 存储表别名 ---
                this._alias.push(left.startsWith(q) ? left.slice(1, -1) : left);
            }
            right = ' AS ' + this.field(left, pre);
        }
        // --- 处理 left ---
        if (/^[\w`"_.*]+$/.test(left)) {
            // --- 简单字段或表名 ---
            /** --- 分左右 --- */
            const l = left.split('.');
            if (l[0] === '*') {
                return '*' + right;
            }
            l[0] = l[0].replace(this._service === ESERVICE.MYSQL ? /`/g : /"/g, '');
            if (l[1] === undefined) {
                // --- xxx，代表无 . 右侧 ---
                if (
                    (this._service === ESERVICE.MYSQL && l[0].startsWith('"')) ||
                    (this._service === ESERVICE.PGSQL && l[0].startsWith(`'`))
                ) {
                    // --- 字符串，无需包裹 ---
                    return l[0] + right;
                }
                if (/^[A-Z0-9_]+$/.test(l[0])) {
                    // --- 纯大写是内置函数，不能加 `" ---
                    return l[0] + right;
                }
                return this._service === ESERVICE.MYSQL ?
                    `\`${pre}${l[0]}${suf}\`${right}` :
                    (pre ? `"${pre}".` : '') + `"${l[0]}${suf}"${right}`;
            }
            // --- x.xxx ---
            // --- 只有在此模式才知道 . 前面的一定是表名，因此自动加 sql 级的 _pre ---
            const w = l[1] === '*' ? '*' : q + (l[1].startsWith(q) ? l[1].slice(1, -1) : l[1]) + q;
            return this._service === ESERVICE.MYSQL ?
                `\`${this._pre}${l[0]}${suf}\`.${w}${right}` :
                (this._pre ? `"${this._pre}".` : '') + `"${l[0]}${suf}".${w}${right}`;
        }
        // --- 复杂字段或表达式 ---
        return left.replace(
            /(^|[(, ])([a-zA-Z`"_][\w`"_.]*)(?=[), ]|$)/g,
            (t: string, t1: string, t2: string): string => t1 + this.field(t2, pre, suf)
        ) + right;
    }

    /**
     * --- 判断传入值是否是 field，还是别的对象 ---
     * @param str
     */
    private _isField(arg: any): arg is {
        'type': 'column';
        'token': string;
        'value': string;
    } {
        if (
            arg === null ||
            typeof arg !== 'object' ||
            arg[columnSymbol] !== true ||
            arg.type !== 'column' ||
            !columnToken ||
            arg.token !== columnToken ||
            arg.value === undefined
        ) {
            return false;
        }
        return true;
    }

    /**
     * --- 判断传入值是否是 value 对象（由 value() 函数创建） ---
     * @param arg
     */
    private _isValue(arg: any): arg is {
        'type': 'value';
        'token': string;
        'value': kebab.DbValue;
    } {
        if (
            arg === null ||
            typeof arg !== 'object' ||
            arg[valueSymbol] !== true ||
            arg.type !== 'value' ||
            !valueToken ||
            arg.token !== valueToken ||
            arg.value === undefined
        ) {
            return false;
        }
        return true;
    }

    /**
     * --- 判断传入值是否是 raw 表达式对象（由 raw() 函数创建） ---
     * @param arg 待判断的值
     */
    private _isRaw(arg: unknown): arg is IRawValue {
        return arg !== null &&
            typeof arg === 'object' &&
            (arg as Record<symbol, unknown>)[rawSymbol] === true &&
            typeof (arg as IRawValue).sql === 'string' &&
            Array.isArray((arg as IRawValue).params);
    }

    /** --- 获取占位符 --- */
    private _placeholder(): string {
        return this._service === ESERVICE.MYSQL ? '?' : `$${this._placeholderCounter++}`;
    }

    /**
     * --- 生成单个值的 SQL 片段和绑定参数 ---
     * @param v 要处理的值
     * @param field 写入字段名
     * @param row 批量写入行号，从 1 开始
     * @param table 已格式化的 UPDATE 目标表名，INSERT 从前导取表名
     * @param parameter SQL 表达式内的参数位置，从 1 开始，嵌套时逐级记录
     * @returns SQL 片段和绑定参数，异常值沿用空字符串
     */
    private _processValue(v: kebab.Json, field?: string, row?: number, table?: string, parameter?: string): {
        'sql': string;
        'data': any[];
    } {
        if (v === undefined || Number.isNaN(v)) {
            // --- INSERT 的第一段只有写入前导，后续片段可能包含业务值 ---
            table ??= /^INSERT (?:IGNORE )?INTO ([\w`".]+)(?: AS [\w`".]+)?$/.exec(this._sql[0] ?? '')?.[1];
            const route = this._ctr?.getPrototype('_config')?.const;
            const stack = new Error().stack;
            const detail = lText.stringifyJson({
                'value': v === undefined ? 'undefined' : 'NaN',
                'table': table,
                'field': field,
                'row': row,
                'parameter': parameter,
                'stack': typeof stack === 'string' ? stack.split('\n').slice(1, 11) : undefined,
            });
            lCore.log({
                'urlFull': route?.urlFull,
                'path': route?.path,
            }, `[SQL][_processValue] value error ${detail}`, '-error');
            return { 'sql': "''", 'data': [] };
        }
        else if (v === null) {
            return { 'sql': 'NULL', 'data': [] };
        }
        else if (lSqlValue.isJson(v)) {
            return {
                'sql': this._placeholder() + (this._service === ESERVICE.PGSQL ? '::jsonb' : ''),
                'data': [lSqlValue.serialize(v)]
            };
        }
        else if (typeof v === 'string' || typeof v === 'number') {
            return { 'sql': this._placeholder(), 'data': [v] };
        }
        else if (this._isRaw(v)) {
            // --- 显式原始 SQL 表达式，对参数按位置分别处理 ---
            // --- v: raw('POINT(?)', ['20']) ---
            // --- v: raw('(CASE `id` WHEN 1 THEN ? WHEN 2 THEN ? END)', ['val1', 'val2']) ---
            if (v.invalid) {
                this._setError(v.invalid);
                return { 'sql': 'NULL', 'data': [] };
            }
            const sqls: string[] = [];
            const ds: kebab.DbValue[] = [];
            for (const p of v.params) {
                const res = this._processValue(p, field, row, table, `${parameter ?? ''}[${sqls.length + 1}]`);
                sqls.push(res.sql);
                ds.push(...res.data);
            }
            let i = 0;
            let overflow = false;
            const replacedSql = v.sql.replace(/\?/g, () => {
                if (i >= sqls.length) {
                    overflow = true;
                    return 'NULL';
                }
                return sqls[i++];
            });
            if (overflow) {
                this._setError('Raw SQL placeholder count exceeds parameter count');
                return { 'sql': 'NULL', 'data': [] };
            }
            if (i !== sqls.length) {
                this._setError('Raw SQL parameter count does not match placeholders');
                return { 'sql': 'NULL', 'data': [] };
            }
            return {
                'sql': this.field(replacedSql),
                'data': ds,
            };
        }
        else if (Array.isArray(v)) {
            if (v[0]?.y !== undefined) {
                // --- v: [{'x': 1, 'y': 2}, { ... }, { ... }, ... ]---
                if (this._service === ESERVICE.MYSQL) {
                    // --- MYSQL ---
                    return {
                        'sql': `ST_POLYGONFROMTEXT(${this._placeholder()})`,
                        'data': [`POLYGON((${v.map(item => {
                            return `${item.x} ${item.y}`;
                        }).join(', ')}))`]
                    };
                }
                else {
                    // --- PGSQL ---
                    return {
                        'sql': this._placeholder(),
                        'data': [`(${v.map(item => {
                            return `(${item.x}, ${item.y})`;
                        }).join(', ')})`]
                    };
                }
            }
            else {
                // --- v: json ---
                return {
                    'sql': this._placeholder(),
                    'data': [this._service === ESERVICE.MYSQL ? lText.stringifyJson(v) : v]
                };
            }
        }
        else if (v.x !== undefined) {
            if (v.y !== undefined) {
                // --- v: {'x': 1, 'y': 2} ---
                if (this._service === ESERVICE.MYSQL) {
                    // --- MYSQL ---
                    return {
                        'sql': `ST_POINTFROMTEXT(${this._placeholder()})`,
                        'data': [`POINT(${v.x} ${v.y})`]
                    };
                }
                else {
                    // --- PGSQL ---
                    return {
                        'sql': this._placeholder(),
                        'data': [`(${v.x}, ${v.y})`]
                    };
                }
            }
            else {
                // --- v: json ---
                return {
                    'sql': this._placeholder(),
                    'data': [this._service === ESERVICE.MYSQL ? lText.stringifyJson(v) : v]
                };
            }
        }
        else if (v instanceof Buffer) {
            // --- Buffer ---
            return { 'sql': this._placeholder(), 'data': [v] };
        }
        else if (this._isField(v)) {
            // --- field ---
            return { 'sql': this.field(v.value), 'data': [] };
        }
        else {
            // --- json ---
            return {
                'sql': this._placeholder(),
                'data': [this._service === ESERVICE.MYSQL ? lText.stringifyJson(v) : v]
            };
        }
    }

}

/**
 * --- 创建 sql 对象 ---
 * @param opt 参数
 * @param opt.pre MySQL 时作为表前缀（如 prefix_），PostgreSQL 时作为 Schema 名。MySQL 会自动补充末尾下划线
 */
export function get(opt: {
    'service': ESERVICE;
    'ctr'?: ctr.Ctr;
    'pre'?: string;
    'data'?: kebab.DbValue[];
    'sql'?: string[];
    'alias'?: string[];
}): Sql {
    let pre = opt.pre ?? opt.ctr?.getPrototype('_config').sql.pre;
    if (pre) {
        if (opt.service === ESERVICE.MYSQL) {
            if (!pre.endsWith('_')) {
                pre += '_';
            }
        }
    }
    return new Sql({
        ...opt,
        'pre': pre,
    });
}

/**
 * --- 返回代入后的完整 SQL 字符串，这并不安全不能直接执行，只是用来调试打印 sql 语句 ---
 * @param sql SQL 字符串
 * @param data DATA 数据
 * @param service 服务商，默认 MySQL
 */
export function format(sql: string, data: kebab.DbValue[], service: ESERVICE = ESERVICE.MYSQL): string {
    data = lSqlValue.serializeList(data) ?? [];
    if (service === ESERVICE.MYSQL) {
        return mysql2.format(sql, data);
    }
    // --- PGSQL ---
    // --- PostgreSQL 手动替换占位符 ---
    let index = 0;
    return sql.replace(/\$\d+/g, () => {
        const val = data[index++];
        if (val === null) {
            return 'NULL';
        }
        if (typeof val === 'string') {
            return `'${lText.stringifyJson(val).slice(1, -1).replace(/'/g, "''").replace(/\\"/g, '"')}'`;
        }
        if (typeof val === 'number') {
            return val.toString();
        }
        if (val instanceof Buffer) {
            return `'\\x${val.toString('hex')}'`;
        }
        if (Array.isArray(val)) {
            // --- PGSQL Array ---
            return `ARRAY[${val.map(v => {
                if (typeof v === 'string') {
                    return `'${v.replace(/'/g, "''")}'`;
                }
                return v;
            }).join(', ')}]`;
        }
        if (val === undefined) {
            return 'NULL';
        }
        return `'${lText.stringifyJson(val).replace(/'/g, "''")}'`;
    });
}

/**
 * --- 将数组兑换为组合的对象（Array/Object mix） ---
 * @param arr 要转换的数组
 */
export function aoMix(arr: kebab.Json): Record<string, string | number | kebab.Json> {
    if (!Array.isArray(arr)) {
        return arr;
    }
    const mix: Record<string, string | number | kebab.Json> = {};
    let i: number = 0;
    for (const v of arr) {
        if (Array.isArray(v)) {
            mix[i] = v;
            ++i;
        }
        else {
            for (const k in v) {
                mix[k] = v[k];
            }
        }
    }
    return mix;
}

/** --- 创建字段对象 --- */
export function column(field: string): {
    'type': 'column';
    'token': string;
    'value': string;
} {
    if (!columnToken) {
        columnToken = lCore.random(8, lCore.RANDOM_LUNS);
    }
    return {
        [columnSymbol]: true,
        'token': columnToken,
        'type': 'column',
        'value': field,
    } as {
        'type': 'column';
        'token': string;
        'value': string;
    };
}

/**
 * --- 创建字面量值对象，用于 where 条件中 v[0] 需要是值而非字段名的场景 ---
 * --- 例：[value('hello'), 'IN', column('tags')] ---
 */
export function value(val: kebab.DbValue): {
    'type': 'value';
    'token': string;
    'value': kebab.DbValue;
} {
    if (!valueToken) {
        valueToken = lCore.random(8, lCore.RANDOM_LUNS);
    }
    return {
        [valueSymbol]: true,
        'token': valueToken,
        'type': 'value',
        'value': val,
    } as {
        'type': 'value';
        'token': string;
        'value': kebab.DbValue;
    };
}

/**
 * --- 标记需要写入 JSON/jsonb 字段的值；实际序列化延迟到数据库边界 ---
 * @param obj 原始 JSON 值
 * @returns 类型保持不变的 JSON 包装值
 */
export function json<T>(obj: T): T {
    return lSqlValue.json(obj) as T;
}

/**
 * --- 创建对象筛选条件的显式操作符值，如 { 'price': op('<', 0) } ---
 * @param operator SQL 或 JSON 查询操作符
 * @param value 比较右值，必须提供，可传 null
 * @returns 条件值。构建 SQL 时，操作符无效或缺少右值会记录构建错误
 */
export function op(operator: TWhereOperator, value: unknown): IWhereValue {
    return {
        [whereSymbol]: true,
        'operator': operator,
        'value': value,
    };
}

/**
 * --- 创建显式 SQL 表达式值，用于 INSERT / UPDATE 写入原生 SQL 函数或 CASE 表达式 ---
 * --- 使用内部私有 Symbol 标记，外部 JSON 无法伪造；普通数组不再自动识别为 SQL 表达式 ---
 * @param sql 原生 SQL 表达式，参数位置使用 ? 占位
 * @param params 绑定参数列表
 * @returns SQL 表达式包装对象
 */
export function raw(sql: string, params: kebab.DbValue[] = []): IRawValue {
    if (typeof sql !== 'string' || !sql.trim()) {
        return {
            [rawSymbol]: true,
            'sql': '',
            'params': [],
            'invalid': 'Invalid raw SQL expression',
        };
    }
    if (!Array.isArray(params)) {
        return {
            [rawSymbol]: true,
            'sql': '',
            'params': [],
            'invalid': 'Invalid raw SQL parameters',
        };
    }
    return {
        [rawSymbol]: true,
        'sql': sql,
        'params': params,
    };
}

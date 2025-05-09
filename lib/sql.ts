/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-27 20:18:50
 * Last: 2020-3-29 19:37:25, 2022-07-24 22:38:11, 2023-5-24 18:49:18, 2023-6-13 22:20:21, 2023-12-11 13:58:54, 2023-12-14 13:14:40, 2023-12-21 00:04:40, 2024-4-11 19:29:29, 2024-9-2 17:15:28
 */

import * as lText from '~/lib/text';
import * as lCore from '~/lib/core';
// --- 第三方 ---
import * as mysql2 from 'mysql2/promise';
// --- 库和定义 ---
import * as ctr from '~/sys/ctr';
import * as types from '~/types';

/** --- filed 用 token --- */
let columnToken = '';

export class Sql {

    /** --- 前置 --- */
    private readonly _pre: string = '';

    /** --- 预拼装 Sql 数组 --- */
    private _sql: string[] = [];

    /** --- 所有 data 数据 --- */
    private _data: types.DbValue[] = [];

    // --- 实例化 ---
    public constructor(pre?: string, opt: {
        'data'?: types.DbValue[];
        'sql'?: string[];
    } = {}) {
        this._pre = pre ?? '';
        if (opt.data) {
            this._data = opt.data;
        }
        if (opt.sql) {
            this._sql = opt.sql;
        }
    }

    // --- 前导 ---

    /**
     * --- 插入数据前导 ---
     * @param table 表名
     */
    public insert(table: string): this {
        this._data = [];
        const sql = 'INSERT INTO ' + this.field(table, this._pre);
        this._sql = [sql];
        return this;
    }

    /**
     * --- 替换已经存在的唯一索引数据，不存在则插入 ---
     * @param table 表名
     */
    public replace(table: string): this {
        this._data = [];
        const sql = 'REPLACE INTO ' + this.field(table, this._pre);
        this._sql = [sql];
        return this;
    }

    /**
     * --- 实际插入数据的数据 ---
     * @param cs [] 数据列或字段列
     * @param vs [] | [][] 数据
     */
    public values(
        cs: string[] | Record<string, types.DbValue>,
        vs: types.DbValue[] | types.DbValue[][] = []
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
            for (const v of vs as types.DbValue[][]) {
                sql += '(';
                for (const v1 of v) {
                    // --- v1 是项目值，如 {'x': 1, 'y': 2}, 'string', 0 ---
                    if (v1 === undefined || Number.isNaN(v1)) {
                        // --- 异常情况 ---
                        lCore.log({
                            'path': '',
                            'urlFull': '',
                            'hostname': '',
                            'req': null,
                            'get': {},
                            'cookie': {},
                            'headers': {}
                        }, '(sql.values) value error', '-error').catch(() => {
                            //
                        });
                        sql += `'', `;
                    }
                    else if (v1 === null) {
                        sql += 'NULL, ';
                    }
                    else if (typeof v1 === 'string' || typeof v1 === 'number') {
                        sql += '?, ';
                        this._data.push(v1);
                    }
                    else if (Array.isArray(v1)) {
                        if (
                            v1[0]?.[0]?.x === undefined && typeof v1[0] === 'string' &&
                            v1[0].includes('(') && v1[0].includes(')')
                        ) {
                            // --- v1: ['POINT(?)', ['20']] ---
                            sql += this.field(v1[0]) + ', ';
                            if (v1[1]) {
                                this._data.push(...v1[1]);
                            }
                        }
                        else if (v1[0]?.[0]?.y !== undefined) {
                            // --- v1: [[{'x': 1, 'y': 2}, { ... }], [{ ... }, { ... }]] ---
                            sql += 'ST_POLYGONFROMTEXT(?), ';
                            this._data.push(`POLYGON(${v1.map((item) => {
                                return `(${item.map((it: Record<string, string | number>) => {
                                    return `${it.x} ${it.y}`;
                                }).join(', ')})`;
                            }).join(', ')})`);
                        }
                        else {
                            // --- v1: json ---
                            sql += '?, ';
                            this._data.push(lText.stringifyJson(v1));
                        }
                    }
                    else if (v1.x !== undefined) {
                        if (v1.y !== undefined) {
                            // --- v1: {'x': 1, 'y': 2} ---
                            sql += 'ST_POINTFROMTEXT(?), ';
                            this._data.push(`POINT(${v1.x} ${v1.y})`);
                        }
                        else {
                            // --- v1: json ---
                            sql += '?, ';
                            this._data.push(lText.stringifyJson(v1));
                        }
                    }
                    else if (v1 instanceof Buffer) {
                        // --- Buffer ---
                        sql += '?, ';
                        this._data.push(v);
                    }
                    else if (this._isField(v1)) {
                        // --- 3 ---
                        sql += this.field(v1.value) + ', ';
                    }
                    else {
                        // --- json ---
                        sql += '?, ';
                        this._data.push(lText.stringifyJson(v1));
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
                if (v === undefined || Number.isNaN(v)) {
                    // --- 异常情况 ---
                    lCore.log({
                        'path': '',
                        'urlFull': '',
                        'hostname': '',
                        'req': null,
                        'get': {},
                        'cookie': {},
                        'headers': {}
                    }, '(sql.values) value error', '-error').catch(() => {
                        //
                    });
                    values += `'', `;
                }
                else if (v === null) {
                    values += 'NULL, ';
                }
                else if (typeof v === 'string' || typeof v === 'number') {
                    values += '?, ';
                    this._data.push(v);
                }
                else if (Array.isArray(v)) {
                    if (
                        v[0]?.[0]?.x === undefined && typeof v[0] === 'string' &&
                        v[0].includes('(') && v[0].includes(')')
                    ) {
                        // --- v: ['POINT(?)', ['20']] ---
                        values += this.field(v[0]) + ', ';
                        if (v[1] !== undefined) {
                            this._data.push(...v[1]);
                        }
                    }
                    else if (v[0]?.[0]?.y !== undefined) {
                        // --- v: [[{'x': 1, 'y': 2}, { ... }], [{ ... }, { ... }]] ---
                        values += 'ST_POLYGONFROMTEXT(?), ';
                        this._data.push(`POLYGON(${v.map((item) => {
                            return `(${item.map((it: Record<string, string | number>) => {
                                return `${it.x} ${it.y}`;
                            }).join(', ')})`;
                        }).join(', ')})`);
                    }
                    else {
                        // --- v: json ---
                        values += '?, ';
                        this._data.push(lText.stringifyJson(v));
                    }
                }
                else if (v.x !== undefined) {
                    if (v.y !== undefined) {
                        // --- v: {'x': 1, 'y': 2} ---
                        values += 'ST_POINTFROMTEXT(?), ';
                        this._data.push(`POINT(${v.x} ${v.y})`);
                    }
                    else {
                        // --- v: json ---
                        values += '?, ';
                        this._data.push(lText.stringifyJson(v));
                    }
                }
                else if (v instanceof Buffer) {
                    // --- Buffer ---
                    values += '?, ';
                    this._data.push(v);
                }
                else if (this._isField(v)) {
                    // --- 3 ---
                    values += this.field(v.value) + ', ';
                }
                else {
                    // --- json ---
                    values += '?, ';
                    this._data.push(lText.stringifyJson(v));
                }
            }
            sql = sql.slice(0, -2) + ') VALUES (' + values.slice(0, -2) + ')';
        }
        this._sql.push(sql);
        return this;
    }

    /**
     * --- 不存在则插入，衔接在 insert 之后 ---
     * @param table 表名
     * @param insert {'xx': 'xx', 'xx': 'xx'}
     * @param where [{'xx': 'xx', 'xx': 'xx'}], {'xx': 'xx'}
     */
    public notExists(
        table: string, insert: Record<string, types.DbValue>,
        where: string | types.Json
    ): this {
        let sql = '(';
        const values = [];
        for (const field in insert) {
            const val = insert[field];
            sql += this.field(field) + ', ';
            values.push(val);
        }
        sql = sql.slice(0, -2) + ') SELECT ';
        for (const value of values) {
            if (Array.isArray(value)) {
                sql += value[0] + ', ';
                this._data.push(...value[1]);
            }
            else {
                sql += '?, ';
                this._data.push(value);
            }
        }
        sql = sql.slice(0, -2) + ' FROM DUAL WHERE NOT EXISTS (SELECT `id` FROM ' + this.field(table, this._pre) + ' WHERE ' + this._whereSub(where) + ')';
        this._sql.push(sql);
        return this;
    }

    /**
     * --- 当不能 insert 时，update（仅能配合 insert 方法用） ---
     * @param s 更新数据
     */
    public duplicate(s: types.Json): this {
        if (Array.isArray(s) ? s.length : Object.keys(s).length) {
            const sql = ' ON DUPLICATE KEY UPDATE ' + this._updateSub(s);
            this._sql.push(sql);
        }
        return this;
    }

    /**
     * --- '*', 'xx' ---
     * @param c 字段字符串或字段数组
     * @param f 表，允许多张表
     */
    public select(c: string | Array<string | Array<string | string[]>>, f: string | string[]): this {
        this._data = [];
        let sql = 'SELECT ';
        if (typeof c === 'string') {
            sql += this.field(c);
        }
        else {
            // --- c: ['id', 'name'] ---
            for (const i of c) {
                if (Array.isArray(i)) {
                    // --- i: ['xx', ['x']] ---
                    sql += this.field(i[0]) + ', ';
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
    public update(f: string, s: types.Json): this {
        this._data = [];
        const sql = `UPDATE ${this.field(f, this._pre)} SET ${this._updateSub(s)}`;
        this._sql = [sql];
        return this;
    }

    private _updateSub(s: types.Json): string {
        /*
        [
            ['total', '+', '1'],    // 1, '1' 可能也是 1 数字类型
            {
                'type': '6',        // 2
                'type': column('type2'),   // 3
                // 'type': ['type3'],  // 4 - 此写法已被禁止，请用 (3) 代替
                'type': ['(CASE `id` WHEN 1 THEN ? WHEN 2 THEN ? END)', ['val1', 'val2']],     // 5
                'point': { 'x': 0, 'y': 0 },  // 6
                'polygon': [ [ { 'x': 0, 'y': 0 }, { ... } ], [ ... ] ],          // 7
                'json': { 'a': 1, 'b': { 'c': 2 }, 'c': [ { 'c': 2 } ] },         // 8 - 对象类 json，可能为空对象
                'json2': ['abc']    // 9 - 数组类 json，可能为空数组
            }
        ]
        */
        s = aoMix(s);
        let sql = '';
        for (const k in s) {
            const v = s[k];
            if (/^[0-9]+$/.test(k)) {
                // --- 1 ---
                const nv = v[2];
                const isf = this._isField(nv);
                if (isf) {
                    if (v[1] === '=') {
                        sql += this.field(v[0]) + ' = ' + this.field(nv.value) + ', ';
                    }
                    else {
                        sql += this.field(v[0]) + ' = ' + this.field(v[0]) + ' ' + v[1] + ' ' + this.field(nv.value) + ', ';
                    }
                }
                else {
                    if (v[1] === '=') {
                        sql += this.field(v[0]) + ' = ?, ';
                    }
                    else {
                        sql += this.field(v[0]) + ' = ' + this.field(v[0]) + ' ' + v[1] + ' ?, ';
                    }
                    this._data.push(nv);
                }
            }
            else {
                // --- 2, 3, 4, 5, 6, 7, 8 ---
                sql += this.field(k) + ' = ';
                if (v === undefined || Number.isNaN(v)) {
                    // --- 异常情况 ---
                    lCore.log({
                        'path': '',
                        'urlFull': '',
                        'hostname': '',
                        'req': null,
                        'get': {},
                        'cookie': {},
                        'headers': {}
                    }, '(sql._updateSub) value error, key: ' + k, '-error').catch(() => {
                        //
                    });
                    sql += '"", ';
                }
                else if (v === null) {
                    sql += 'NULL, ';
                }
                else if (typeof v === 'string' || typeof v === 'number') {
                    // --- 2 ---
                    sql += '?, ';
                    this._data.push(v);
                }
                else if (Array.isArray(v)) {
                    if (
                        v[0]?.[0]?.x === undefined && typeof v[0] === 'string' &&
                        v[0].includes('(') && v[0].includes(')')
                    ) {
                        // --- 4, 5: ['(CASE `id` WHEN 1 THEN ? WHEN 2 THEN ? END)', ['val1', 'val2']] ---
                        sql += this.field(v[0]) + ', ';
                        if (v[1] !== undefined) {
                            this._data.push(...v[1]);
                        }
                    }
                    else if (v[0]?.[0]?.y !== undefined) {
                        // --- 7 ---
                        sql += 'ST_POLYGONFROMTEXT(?), ';
                        this._data.push(`POLYGON(${v.map((item) => {
                            return `(${item.map((it: Record<string, string | number>) => {
                                return `${it.x} ${it.y}`;
                            }).join(', ')})`;
                        }).join(', ')})`);
                    }
                    else {
                        // --- v: json ---
                        sql += '?, ';
                        this._data.push(lText.stringifyJson(v));
                    }
                }
                else if (v.x !== undefined) {
                    if (v.y !== undefined) {
                        // --- 6: v: {'x': 1, 'y': 2} ---
                        sql += 'ST_POINTFROMTEXT(?), ';
                        this._data.push(`POINT(${v.x} ${v.y})`);
                    }
                    else {
                        // --- v: json ---
                        if (this._isField(v)) {
                            // --- 3 ---
                            sql += this.field(v.value) + ', ';
                        }
                        else {
                            // --- 8 ---
                            sql += '?, ';
                            this._data.push(lText.stringifyJson(v));
                        }
                    }
                }
                else if (v instanceof Buffer) {
                    // --- Buffer ---
                    sql += '?, ';
                    this._data.push(v);
                }
                else if (this._isField(v)) {
                    // --- 3 ---
                    sql += this.field(v.value) + ', ';
                }
                else {
                    // --- json ---
                    sql += '?, ';
                    this._data.push(lText.stringifyJson(v));
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
        this._data = [];
        this._sql = ['DELETE FROM ' + this.field(f, this._pre)];
        return this;
    }

    /**
     * --- 联查另一个 sql 对象 ---
     * @param sql sql 对象
     * @param type 类型
     */
    public union(lsql: Sql, type: string = ''): this {
        this._data = this._data.concat(lsql.getData());
        this._sql.push(' UNION ' + (type ? type + ' ' : ''));
        this._sql.push(lsql.getSql());
        return this;
    }

    /**
     * --- 所有联查另一个 sql 对象 ---
     * @param sql sql 对象
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
     * @param pre 表前缀，仅在 join 非默认表前缀时填写
     */
    public join(f: string, s: types.Json = [], type: string = 'INNER', suf: string = '', pre: string = ''): this {
        let field = this.field(f, pre || this._pre, suf ? ('#' + suf) : '');
        if (pre) {
            // --- 处理不同 pre 的 as 前缀问题 ---
            field = field.replace(new RegExp(`AS \`${pre}(.+?)\``), `AS \`${this._pre}$1\``);
        }
        let sql = ' ' + type + ' JOIN ' + field;
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
     * @param pre 表前缀，仅在 join 非默认表前缀时填写
     */
    public leftJoin(f: string, s: types.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'LEFT', suf, pre);
    }

    /**
     * --- right join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param suf 表后缀
     * @param pre 表前缀，仅在 join 非默认表前缀时填写
     */
    public rightJoin(f: string, s: types.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'RIGHT', suf, pre);
    }

    /**
     * --- inner join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param suf 表后缀
     * @param pre 表前缀，仅在 join 非默认表前缀时填写
     */
    public innerJoin(f: string, s: types.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'INNER', suf, pre);
    }

    /**
     * --- full join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param suf 表后缀
     * @param pre 表前缀，仅在 join 非默认表前缀时填写
     */
    public fullJoin(f: string, s: types.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'FULL', suf, pre);
    }

    /**
     * --- cross join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param suf 表后缀
     * @param pre 表前缀，仅在 join 非默认表前缀时填写
     */
    public crossJoin(f: string, s: types.Json = [], suf: string = '', pre: string = ''): this {
        return this.join(f, s, 'CROSS', suf, pre);
    }

    /**
     * --- having 后置筛选器，用法类似 where ---
     */
    public having(s: string | types.Json = ''): this {
        if (typeof s === 'string') {
            // --- string ---
            if (s !== '') {
                this._sql.push(' HAVING ' + s);
            }
        }
        else {
            // --- array ---
            if (s.length) {
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
     * --- 1. 'city': 'bj', 'type': '2' ---
     * --- 2. ['type', '>', '1'] ---
     * --- 3. ['type', 'in', ['1', '2']] ---
     * --- 4. 'type': ['1', '2'] ---
     * --- 5. '$or': [{'city': 'bj'}, {'city': 'sh'}, [['age', '>', '10']]], 'type': '2' ---
     * --- 6. 'city_in': column('city_out') ---
     * --- 7. ['JSON_CONTAINS(`uid`, ?)', ['hello']] ---
     * @param s 筛选数据
     */
    public where(s: string | types.Json): this {
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

    private _whereSub(s: types.Json, data?: any[]): string {
        if (!data) {
            data = this._data;
        }
        s = aoMix(s);
        let sql = '';
        for (const k in s) {
            const v = s[k];
            if (/^[0-9]+$/.test(k)) {
                // --- 2, 3, 7 ---
                if (v[2] === undefined) {
                    // --- 7 ---
                    sql += this.field(v[0]) + ' AND ';
                    if (v[1] !== undefined) {
                        data.push(...v[1]);
                    }
                }
                else if (v[2] === null) {
                    // --- 3: null ---
                    let opera = v[1];
                    if (opera === '!=' || opera === '!==' || opera === '<>') {
                        opera = 'IS NOT';
                    }
                    else if (opera === '=' || opera === '==' || opera === '===') {
                        opera = 'IS';
                    }
                    else {
                        opera = opera.toUpperCase();
                    }
                    sql += this.field(v[0]) + ' ' + opera + ' NULL AND ';
                }
                else if (Array.isArray(v[2])) {
                    // --- 3 ---
                    sql += this.field(v[0]) + ' ' + v[1].toUpperCase() + ' (';
                    for (const v1 of v[2]) {
                        sql += '?, ';
                        data.push(v1);
                    }
                    sql = sql.slice(0, -2) + ') AND ';
                }
                else {
                    // --- 2, 6 ---
                    const nv = v[2];
                    const isf = this._isField(nv);
                    if (isf) {
                        // --- 6. field ---
                        sql += this.field(v[0]) + ' ' + v[1] + ' ' + this.field(nv.value) + ' AND ';
                    }
                    else {
                        sql += this.field(v[0]) + ' ' + v[1] + ' ? AND ';
                        data.push(nv);
                    }
                }
            }
            else {
                // --- 1, 4, 5, 6 ---
                if (k.startsWith('$')) {
                    // --- 5 - '$or': [{'city': 'bj'}, {'city': 'sh'}] ---
                    const sp = ' ' + k.slice(1).split('-')[0].toUpperCase() + ' ';
                    sql += '(';
                    for (let v1 of v) {
                        // --- v1 是 {'city': 'bj'} ---
                        v1 = aoMix(v1);
                        if (Object.keys(v1).length > 1) {
                            sql += '(' + this._whereSub(v1, data) + ')' + sp;
                        }
                        else {
                            sql += this._whereSub(v1, data) + sp;
                        }
                    }
                    sql = sql.slice(0, -sp.length) + ') AND ';
                }
                else {
                    // --- 1, 4, 6 ---
                    if (v === null) {
                        sql += this.field(k) + ' IS NULL AND ';
                    }
                    else if (typeof v === 'string' || typeof v === 'number') {
                        // --- 1 ---
                        sql += this.field(k) + ' = ? AND ';
                        data.push(v);
                    }
                    else if (this._isField(v)) {
                        // --- 6 ---
                        sql += this.field(k) + ' = ' + this.field(v.value) + ' AND ';
                    }
                    else {
                        // --- 4 - 'type': ['1', '2'] ---
                        if (v.length > 0) {
                            sql += this.field(k) + ' IN (';
                            for (const v1 of v) {
                                sql += '?, ';
                                data.push(v1);
                            }
                            sql = sql.slice(0, -2) + ') AND ';
                        }
                        else {
                            sql += this.field(k) + ' IN (NULL) AND ';
                        }
                    }
                }
            }
        }
        if (sql === '') {
            return '';
        }
        return sql.slice(0, -5);
    }

    /**
     * --- ORDER BY ---
     * @param c 字段字符串或数组
     * @param d 排序规则
     */
    public by(c: string | Array<string | string[]>, d: 'DESC' | 'ASC' = 'DESC'): this {
        let sql: string = ' ORDER BY ';
        if (typeof c === 'string') {
            sql += this.field(c) + ' ' + d;
        }
        else {
            for (const v of c) {
                if (typeof v === 'string' || typeof v === 'number') {
                    sql += this.field(v) + ' ' + d + ', ';
                }
                else {
                    sql += this.field(v[0]) + ' ' + v[1] + ', ';
                }
            }
            sql = sql.slice(0, -2);
        }
        this._sql.push(sql);
        return this;
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
     * --- LIMIT ---
     * @param a 起始
     * @param b 长度
     */
    public limit(a: number, b: number = 0): this {
        this._sql.push(' LIMIT ' + a.toString() + (b > 0 ? ', ' + b.toString() : ''));
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
        'where'?: string | types.Json;
    } = {}): Sql {
        const sql: string[] = lCore.clone(this._sql);
        const data: any[] = lCore.clone(this._data);
        if (opt.where !== undefined) {
            if (typeof opt.where === 'string') {
                // --- string ---
                for (let i = 0; i < sql.length; ++i) {
                    if (!sql[i].startsWith(' WHERE ')) {
                        continue;
                    }
                    sql[i] = opt.where ? (' WHERE ' + opt.where) : '';
                    data.splice(
                        this._whereDataPosition[0],
                        this._whereDataPosition[1] - this._whereDataPosition[0]
                    );
                    break;
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
            sql[0] = sql[0].replace(/FROM [`\w, ]+/, 'FROM ' + table);
        }
        return get(this.getPre(), {
            'data': data,
            'sql': sql
        });
    }

    // --- 操作 ---

    /**
     * --- 获取 sql 语句 ---
     */
    public getSql(): string  {
        return this._sql.join('');
    }

    /**
     * --- 获取全部 data ---
     */
    public getData(): types.DbValue[] {
        return this._data;
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
    public format(sql?: string, data?: types.DbValue[]): string {
        return mysql2.format(sql ?? this.getSql(), data ?? this.getData());
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
     * @param pre 表前缀，仅请在 field 表名时倒入前缀
     * @param suf 表后缀，仅请在 field 表名时倒入后缀，前面加 # 代表要强制 AS
     */
    public field(str: string | number | Array<string | string[]>, pre: string = '', suf: string = ''): string {
        let left: string = '';
        let right: string = '';
        if (Array.isArray(str)) {
            this._data.push(...str[1]);
            return this.field(str[0]);
        }
        if (typeof str === 'number') {
            str = str.toString();
        }
        str = str.trim();                   // --- 去除前导尾随 ---
        str = str.replace(/ {2,}/g, ' ');   // --- 去除多余的空格 ---
        str = str.replace(/ +([),])/g, ' $1');
        str = str.replace(/([(,]) +/g, '$1 ');
        str = str.replace(/(\W)(JOIN|WHERE|UNION)(\W)/ig, '$1$3');
        // --- 先判断 suf 强制性 AS ---
        let sufAs = false;
        if (suf.startsWith('#')) {
            // --- 强制 AS ---
            suf = suf.slice(1);
            sufAs = true;
        }
        // --- 先判断有没有别名（也就是 as） ---
        const loStr = str.toLowerCase();
        const asPos = loStr.indexOf(' as ');
        if (asPos === -1) {
            // --- 没有 as ---
            let spacePos = str.lastIndexOf(' ');
            // --- 有可能有 aa + bb + cc + 10 这种情况 ---
            if (!/^[a-zA-Z_)]$/.test(str[spacePos - 1])) {
                // --- 连接符 ---
                spacePos = -1;
            }
            if (spacePos !== -1) {
                const spaceRight = str.slice(spacePos + 1);
                if (/^[a-zA-Z_`][\w`]*$/.test(spaceRight)) {
                    // --- OK ---
                    left = str.slice(0, spacePos);
                    right = spaceRight;
                }
                else {
                    left = str;
                    right = '';
                }
            }
            else {
                left = str;
                right = '';
            }
        }
        else {
            // --- 有 as ---
            left = str.slice(0, asPos);
            right = str.slice(asPos + 4);
        }
        if (right) {
            // --- 处理右侧 ---
            if (right.startsWith('`')) {
                right = '`' + pre + right.slice(1);
            }
            else {
                right = '`' + pre + right + '`';
            }
            right = ' AS ' + right;
        }
        else {
            // --- 没有右侧 ---
            if (sufAs) {
                // --- 强制 AS ---
                right = ' AS ' + this.field(left, pre);
            }
        }
        // --- 处理 left ---
        if (/^[\w`_.*]+$/.test(left)) {
            const l = left.split('.');
            if (l[0] === '*') {
                return '*' + right;
            }
            if (l[0].startsWith('`')) {
                l[0] = l[0].replace(/`/g, '');
            }
            if (l[1] === undefined) {
                // --- xxx ---
                if (/^[A-Z0-9_]+$/.test(l[0])) {
                    // --- 纯大写是内置函数，不能加 ` ---
                    return l[0] + right;
                }
                return '`' + pre + l[0] + suf + '`' + right;
            }
            // --- x.xxx ---
            // --- 只有在此模式才知道 . 前面的一定是表名，因此自动加 sql 级的 _pre ---
            const w = l[1] === '*' ? '*' : (l[1].startsWith('`') ? l[1] : ('`' + l[1] + '`'));
            return '`' + this._pre + l[0] + suf + '`.' + w + right;
        }
        else {
            // return left.replace(/([(, ])([a-zA-Z`_][\w`_.]*)(?=[), ])/g, (
            return left.replace(/(^|[(, ])([a-zA-Z`_][\w`_.]*)(?=[), ]|$)/g, (
                t: string, t1: string, t2: string
            ): string => {
                return t1 + this.field(t2, pre, suf);
            }) + right;
        }
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
        if (arg.type !== 'column' || arg.token !== columnToken || arg.value === undefined) {
            return false;
        }
        return true;
    }

}

/**
 * --- 创建 sql 对象 ---
 * @param ctrPre ctr 对象或 pre 表前缀
 * @param opt 参数
 */
export function get(ctrPre?: ctr.Ctr | string, opt: {
    'data'?: types.DbValue[];
    'sql'?: string[];
} = {}): Sql {
    return new Sql(ctrPre instanceof ctr.Ctr ? ctrPre.getPrototype('_config').sql.pre : ctrPre, opt);
}

/**
 * --- 返回代入后的完整 SQL 字符串 ---
 * @param sql SQL 字符串
 * @param data DATA 数据
 */
export function format(sql: string, data: types.DbValue[]): string {
    return mysql2.format(sql, data);
}

/**
 * --- 将数组兑换为组合的对象（Array/Object mix） ---
 * @param arr 要转换的数组
 */
export function aoMix(arr: types.Json): Record<string, string | number | types.Json> {
    if (!Array.isArray(arr)) {
        return arr;
    }
    const mix: Record<string, string | number | types.Json> = {};
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
        'token': columnToken,
        'type': 'column',
        'value': field
    };
}

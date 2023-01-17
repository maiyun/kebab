/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-27 20:18:50
 * Last: 2020-3-29 19:37:25, 2022-07-24 22:38:11
 */

// --- 第三方 ---
import * as mysql2 from 'mysql2/promise';
// --- 库和定义 ---
import * as ctr from '~/sys/ctr';

export class Sql {

    /** --- 前置 --- */
    private readonly _pre: string = '';

    /** --- 预拼装 Sql 数组 --- */
    private _sql: string[] = [];

    /** --- 所有 data 数据 --- */
    private _data: any[] = [];

    // --- 实例化 ---
    public constructor(pre?: string) {
        this._pre = pre !== undefined ? pre : '';
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
    public values(cs: any[] | Record<string, any>, vs: any[] | any[][] = []): this {
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
            for (const v of vs) {
                sql += '(';
                for (const v1 of v) {
                    sql += '?, ';
                    this._data.push(v1);
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
                this._data.push(v);
                values += '?, ';
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
    public notExists(table: string, insert: Record<string, any>, where: any[] | Record<string, any>): this {
        let sql = '(';
        const values = [];
        for (const field in insert) {
            const val = insert[field];
            sql += this.field(field) + ', ';
            values.push(val);
        }
        sql = sql.slice(0, -2) + ') SELECT ';
        for (const value of values) {
            sql += '?, ';
            this._data.push(value);
        }
        sql = sql.slice(0, -2) + ' FROM DUAL WHERE NOT EXISTS (SELECT `id` FROM ' + this.field(table, this._pre) + ' WHERE ' + this._whereSub(where) + ')';
        this._sql.push(sql);
        return this;
    }

    /**
     * --- 当不能 insert 时，update（仅能配合 insert 方法用） ---
     * @param s 更新数据
     */
    public duplicate(s: any[] | Record<string, any>): this {
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
    public select(c: string | string[], f: string | string[]): this {
        this._data = [];
        let sql = 'SELECT ';
        if (typeof c === 'string') {
            sql += this.field(c);
        }
        else {
            // --- c: ['id', 'name'] ---
            for (const i of c) {
                sql += this.field(i) + ', ';
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
    public update(f: string, s: any[] | Record<string, any>): this {
        this._data = [];
        const sql = `UPDATE ${this.field(f, this._pre)} SET ${this._updateSub(s)}`;
        this._sql = [sql];
        return this;
    }

    private _updateSub(s: any[] | Record<string, any>): string {
        /*
        [
            ['total', '+', '1'],    // 1, '1' 可能也是 1 数字类型
            {
                'type': '6',        // 2
                'type': '#type2',   // 3
                'type': ['type3'],  // 4
                'type' => ['(CASE `id` WHEN 1 THEN ? WHEN 2 THEN ? END)', ['val1', 'val2']]     // 5
            }
        ]
        */
        s = aoMix(s);
        let sql = '';
        for (const k in s) {
            const v = s[k];
            if (/^[0-9]+$/.test(k)) {
                // --- 1 ---
                const isf = this._isField(v[2]);
                if (isf[0]) {
                    sql += this.field(v[0]) + ' = ' + this.field(v[0]) + ' ' + (v[1] as string) + ' ' + this.field(isf[1]) + ', ';
                }
                else {
                    sql += this.field(v[0]) + ' = ' + this.field(v[0]) + ' ' + (v[1] as string) + ' ?, ';
                    this._data.push(isf[1]);
                }
            }
            else {
                // --- 2, 3, 4, 5 ---
                if (typeof v !== 'string' && typeof v !== 'number') {
                    // --- 4, 5 ---
                    sql += this.field(k) + ' = ' + this.field(v[0]) + ', ';
                    if (v[1] !== undefined && Array.isArray(v[1])) {
                        // --- 5 ---
                        this._data.push(...v[1]);
                    }
                }
                else {
                    // --- 2, 3 ---
                    const isf = this._isField(v);
                    if (isf[0]) {
                        // --- field ---
                        sql += this.field(k) + ' = ' + this.field(isf[1]) + ', ';
                    }
                    else {
                        sql += this.field(k) + ' = ?, ';
                        this._data.push(isf[1]);
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
        this._data = [];
        this._sql = ['DELETE FROM ' + this.field(f, this._pre)];
        return this;
    }

    /**
     * --- join 方法 ---
     * @param f 表名
     * @param s ON 信息
     * @param type 类型
     */
    public join(f: string, s: any[] | Record<string, any> = [], type: string = 'INNER'): this {
        let sql = ' ' + type + ' JOIN ' + this.field(f, this._pre);
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
     */
    public leftJoin(f: string, s: any[] | Record<string, any> = []): this {
        return this.join(f, s, 'LEFT');
    }

    /**
     * --- right join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public rightJoin(f: string, s: any[] | Record<string, any> = []): this {
        return this.join(f, s, 'RIGHT');
    }

    /**
     * --- inner join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public innerJoin(f: string, s: any[] | Record<string, any> = []): this {
        return this.join(f, s);
    }

    /**
     * --- full join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public fullJoin(f: string, s: any[] | Record<string, any> = []): this {
        return this.join(f, s, 'FULL');
    }

    /**
     * --- cross join 方法 ---
     * @param f 表名
     * @param s ON 信息
     */
    public crossJoin(f: string, s: any[] | Record<string, any> = []): this {
        return this.join(f, s, 'CROSS');
    }

    /**
     * --- having 后置筛选器，用法类似 where ---
     */
    public having(s: string | any[] | Record<string, any> = ''): this {
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

    /**
     * --- 筛选器 ---
     * --- 1. 'city': 'bj', 'type': '2' ---
     * --- 2. ['type', '>', '1'] ---
     * --- 3. ['type', 'in', ['1', '2']] ---
     * --- 4. 'type': ['1', '2'] ---
     * --- 5. '$or': [{'city': 'bj'}, {'city': 'sh'}, [['age', '>', '10']]], 'type': '2' ---
     * --- 6. 'city_in' => '#city_out' ---
     * @param s 筛选数据
     */
    public where(s: string | any[] | Record<string, any>): this {
        if (typeof s === 'string') {
            // --- string ---
            if (s !== '') {
                this._sql.push(' WHERE ' + s);
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
        }
        return this;
    }

    private _whereSub(s: any[] | Record<string, any>): string {
        s = aoMix(s);
        let sql = '';
        for (const k in s) {
            const v = s[k];
            if (/^[0-9]+$/.test(k)) {
                // --- 2, 3 ---
                if (Array.isArray(v[2])) {
                    // --- 3 ---
                    sql += this.field(v[0]) + ' ' + v[1].toUpperCase() + ' (';
                    for (const v1 of v[2]) {
                        sql += '?, ';
                        this._data.push(v1);
                    }
                    sql = sql.slice(0, -2) + ') AND ';
                }
                else {
                    // --- 2 ---
                    const isf = this._isField(v[2]);
                    if (isf[0]) {
                        // --- field ---
                        sql += this.field(v[0]) + ' ' + v[1] + ' ' + this.field(isf[1]) + ' AND ';
                    }
                    else {
                        sql += this.field(v[0]) + ' ' + v[1] + ' ? AND ';
                        this._data.push(v[2]);
                    }
                }
            }
            else {
                // --- 1, 4, 5, 6 ---
                if (k.startsWith('$')) {
                    // --- 5 - '$or': [{'city': 'bj'}, {'city': 'sh'}] ---
                    const sp = ' ' + k.slice(1).toUpperCase() + ' ';
                    sql += '(';
                    for (let v1 of v) {
                        // --- v1 是 {'city': 'bj'} ---
                        v1 = aoMix(v1);
                        if (Object.keys(v1).length > 1) {
                            sql += '(' + this._whereSub(v1) + ')' + sp;
                        }
                        else {
                            sql += this._whereSub(v1) + sp;
                        }
                    }
                    sql = sql.slice(0, -sp.length) + ') AND ';
                }
                else {
                    // --- 1, 4, 6 ---
                    if (typeof v === 'string' || typeof v === 'number') {
                        // --- 1, 6 ---
                        // --- 'city': 'bj', 'city_in': '#city_out' ---
                        const isf = this._isField(v);
                        if (isf[0]) {
                            // --- 6 ---
                            sql += this.field(k) + ' = ' + this.field(isf[1]) + ' AND ';
                        }
                        else {
                            sql += this.field(k) + ' = ? AND ';
                            this._data.push(isf[1]);
                        }
                    }
                    else {
                        // --- 4 - 'type': ['1', '2'] ---
                        if (v.length > 0) {
                            sql += this.field(k) + ' IN (';
                            for (const v1 of v) {
                                sql += '?, ';
                                this._data.push(v1);
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
    public getData(): any[] {
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
    public format(sql?: string, data?: any[]): string {
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
     */
    public field(str: string, pre: string = ''): string {
        let left: string = '';
        let right: string = '';
        str = str.trim();                   // --- 去除前导尾随 ---
        str = str.replace(/ {2,}/g, ' ');   // --- 去除多余的空格 ---
        str = str.replace(/ +([),])/g, ' $1');
        str = str.replace(/([(,]) +/g, '$1 ');
        // --- 先判断有没有别名（也就是 as） ---
        const loStr = str.toLowerCase();
        const asPos = loStr.indexOf(' as ');
        if (asPos === -1) {
            const spacePos = str.lastIndexOf(' ');
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
        if (right !== '') {
            // --- 处理右侧 ---
            if (right.startsWith('`')) {
                right = '`' + pre + right.slice(1);
            }
            else {
                right = '`' + pre + right + '`';
            }
            right = ' AS ' + right;
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
                return '`' + pre + l[0] + '`' + right;
            }
            // --- x.xxx ---
            const w = l[1] === '*' ? '*' : (l[1].startsWith('`') ? l[1] : ('`' + l[1] + '`'));
            return '`' + this._pre + l[0] + '`.' + w + right;
        }
        else {
            return left.replace(/([(,])([a-zA-Z`_][\w`_.]*)([),])/g, (
                t: string, t1: string, t2: string, t3: string
            ): string => {
                return t1 + this.field(t2, pre) + t3;
            }) + right;
        }
    }

    /**
     * --- 判断用户输入值是否是 field 还是普通字符串 ---
     * @param str
     */
    private _isField(str: string | number): any[] {
        if ((typeof str === 'string') && str[0] && (str[0].startsWith('#')) && str[1]) {
            if (str[1] === '#') {
                // --- 不是 field ---
                return [false, str.slice(1)];
            }
            else {
                // --- 是 field ---
                str = str.slice(1);
                return [true, str];
            }
        }
        else {
            // --- 肯定不是 field ---
            return [false, str];
        }
    }

}

export function get(ctr: ctr.Ctr, pre?: string): Sql {
    return new Sql(pre ?? ctr.getPrototype('_config').sql.pre);
}

/**
 * --- 返回代入后的完整 SQL 字符串 ---
 * @param sql SQL 字符串
 * @param data DATA 数据
 */
export function format(sql: string, data: any[]): string {
    return mysql2.format(sql, data);
}

/**
 * --- 将数组兑换为组合的对象（Array/Object mix） ---
 * @param arr 要转换的数组
 */
export function aoMix(arr: any[] | Record<string, any>): Record<string, string | number | any[]> {
    if (!Array.isArray(arr)) {
        return arr;
    }
    const mix: Record<string, string | number | any[]> = {};
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
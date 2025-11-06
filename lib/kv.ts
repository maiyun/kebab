/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-30 19:25:22
 * Last: 2020-3-28 18:54:04, 2022-09-12 23:24:45, 2022-09-22 01:06:22, 2024-2-21 13:32:56, 2024-8-21 16:59:57, 2025-11-6 14:56:45
 */

// --- 第三方 ---
import * as redis from '@litert/redis';
// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as lText from '#kebab/lib/text.js';
import * as lCore from '#kebab/lib/core.js';
import * as sCtr from '#kebab/sys/ctr.js';

/** --- 连接列表（同一个 host、port、index 只有一个连接） --- */
const connections: IConnectionInfo[] = [];

export class Kv {

    /** --- 当前的 kv 连接信息 --- */
    private readonly _etc: kebab.IConfigKv;

    public constructor(etc: kebab.IConfigKv) {
        this._etc = etc;
    }

    /**
     * --- 设定一个值 ---
     * @param key
     * @param val
     * @param ttl 秒，0 为不限制
     * @param mod 设置模式: 空,nx（key不存在才建立）,xx（key存在才修改）
     */
    public async set(key: string, val: object | string | number, ttl: number = 0, mod: '' | 'nx' | 'xx' = ''): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        if (typeof val !== 'string') {
            val = lText.stringifyJson(val);
        }
        try {
            switch (mod) {
                case '': {
                    return await conn.set(this._etc.pre + key, val, ttl === 0 ? undefined : ttl);
                }
                case 'nx': {
                    return await conn.setNX(this._etc.pre + key, val, ttl === 0 ? undefined : ttl);
                }
                case 'xx': {
                    return await conn.replace(this._etc.pre + key, val, ttl === 0 ? undefined : ttl);
                }
            }
        }
        catch {
            return false;
        }
    }

    /**
     * --- 添加一个值，存在则不变 ---
     * @param key
     * @param val
     * @param ttl 秒，0 为不限制
     */
    public async add(
        key: string,
        val: object | string | number,
        ttl: number = 0
    ): Promise<boolean> {
        return this.set(key, val, ttl, 'nx');
    }

    /**
     * --- 替换一个存在的值 ---
     * @param key
     * @param val
     * @param ttl 秒，0 为不限制
     * @param etc
     */
    public async replace(
        key: string,
        val: object | string | number,
        ttl: number = 0
    ): Promise<boolean> {
        return this.set(key, val, ttl, 'xx');
    }

    /**
     * --- 向已存在的值后追加数据 ---
     * @param key
     * @param val
     */
    public async append(key: string, val: string): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.append(this._etc.pre + key, val) > 0 ? true : false;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 向已存在的值之前追加数据 ---
     * @param key
     * @param val
     */
    public async prepend(key: string, val: string): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const script: string = `local val = redis.call('GET', KEYS[1])
if (val == false) then
    return 0
end
local r = redis.call('SET', KEYS[1], ARGV[1]..val)
if (r) then
    return 1
else
    return 0
end`;
            let r = await conn.evalSHA('ea360f3f6508a243824ecda6be15db56df217873', [this._etc.pre + key], [val]);
            r = parseInt(r);
            if (r <= 0) {
                await conn.scriptLoad(script);
                r = await conn.evalSHA('ea360f3f6508a243824ecda6be15db56df217873', [this._etc.pre + key], [val]);
                r = parseInt(r);
            }
            return r > 0 ? true : false;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 检测 key 是否存在 ---
     * @param keys 单个或序列
     */
    public async exists(keys: string | string[]): Promise<number> {
        const conn = await this._getConnection();
        if (!conn) {
            return 0;
        }
        try {
            if (typeof keys === 'string') {
                keys = [keys];
            }
            for (let k = 0; k < keys.length; ++k) {
                keys[k] = this._etc.pre + keys[k];
            }
            return await conn.mExists(keys);
        }
        catch {
            return 0;
        }
    }

    /**
     * --- 获取字符串 ---
     * @param key
     * @returns 字符串 / false / null（即使存入时是 number，这个方法也只会返回字符串）
     */
    public async get(key: string): Promise<string | false | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        try {
            return await conn.get(this._etc.pre + key);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取相应的剩余有效期秒数 ---
     * @param key
     */
    public async ttl(key: string): Promise<number | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        try {
            return await conn.ttl(this._etc.pre + key);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 获取相应的剩余有效期毫秒数 ---
     * @param key
     */
    public async pttl(key: string): Promise<number | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        try {
            return await conn.pTTL(this._etc.pre + key);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 批量获取值 ---
     * @param keys key 序列
     */
    public async mGet(keys: string[]): Promise<Record<string, string | null> | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        for (let k = 0; k < keys.length; ++k) {
            keys[k] = this._etc.pre + keys[k];
        }
        const rtn: Record<string, string | null> = {};
        try {
            const pl: number = this._etc.pre.length;
            const r = await conn.mGet(keys);
            if (pl === 0) {
                return r;
            }
            for (const k in r) {
                rtn[k.slice(pl)] = r[k];
            }
        }
        catch {
            return false;
        }
        return rtn;
    }

    /**
     * --- 批量设置哈希值 ---
     * @param rows key / val 数组
     */
    public async mSet(
        rows: Record<string, string | Buffer>
    ): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const rtn: Record<string, string | Buffer> = {};
            for (const key in rows) {
                rtn[this._etc.pre + key] = rows[key];
            }
            await conn.mSet(rtn);
            return true;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取 json 对象 ---
     * @param key
     */
    public async getJson(key: string): Promise<any | false | null> {
        const v = await this.get(key);
        if (v === null || v === false) {
            return v;
        }
        const r = lText.parseJson(v);
        return r;
    }

    /**
     * --- 删除已存在的值 ---
     * @param keys
     */
    public async del(keys: string | string[]): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        if (typeof keys === 'string') {
            keys = [keys];
        }
        for (let k = 0; k < keys.length; ++k) {
            keys[k] = this._etc.pre + keys[k];
        }
        try {
            return await conn.del(keys) > 0 ? true : false;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 自增 ---
     * @param key
     * @param num 整数或浮点正数
     */
    public async incr(key: string, num: number = 1): Promise<number | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            if (Number.isInteger(num)) {
                if (num === 1) {
                    return await conn.incr(this._etc.pre + key);
                }
                else {
                    return await conn.incr(this._etc.pre + key, num);
                }
            }
            else {
                return await conn.incrByFloat(this._etc.pre + key, num);
            }
        }
        catch {
            return false;
        }
    }

    /**
     * --- 自减 ---
     * @param key
     * @param num 整数或浮点正数
     */
    public async decr(key: string, num: number = 1): Promise<number | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            if (Number.isInteger(num)) {
                if (num === 1) {
                    return await conn.decr(this._etc.pre + key);
                }
                else {
                    return await conn.decr(this._etc.pre + key, num);
                }
            }
            else {
                return await conn.incrByFloat(this._etc.pre + key, -num);
            }
        }
        catch {
            return false;
        }
    }

    /**
     * --- 仅修改过期时间不修改值 ---
     * @param key
     * @param ttl
     */
    public async expire(key: string, ttl: number): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.expire(this._etc.pre + key, ttl);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取服务器上的所有 key 列表 ---
     * @param pattern
     */
    public async keys(pattern: string): Promise<string[] | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const r = await conn.keys(this._etc.pre + pattern);
            const pl = this._etc.pre.length;
            if (pl > 0) {
                for (let k = 0; k < r.length; ++k) {
                    r[k] = r[k].slice(pl);
                }
            }
            return r;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 根据条件获取服务器上的 keys ---
     * @param cursor
     * @param pattern 例如 *
     * @param count 获取的条数
     */
    public async scan(
        cursor: number = 0,
        pattern: string = '*',
        count: number = 10
    ): Promise<redis.IScanResult<string> | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const r = await conn.scan(cursor, this._etc.pre + pattern, count);
            for (let i = 0; i < r.items.length; ++i) {
                r.items[i] = r.items[i].slice(this._etc.pre.length);
            }
            return r;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 清除当前所选数据库的所有内容 ---
     */
    public async flushDb(): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            await conn.flushDb();
            return true;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 发送 ping ---
     * @param last 是否刷新最后使用时间（默认刷新）
     */
    public async ping(): Promise<false | string> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return (await conn.ping()) === 'PONG' ? 'PONG' : false;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 设置哈希表值 ---
     * @param key key 名
     * @param field 字段名
     * @param val 值
     * @param mod 空,nx(key不存在才建立)
     */
    public async hSet(key: string, field: string, val: object | string | number, mod: '' | 'nx' = ''): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            if (typeof val !== 'string') {
                val = lText.stringifyJson(val);
            }
            if (mod === 'nx') {
                return await conn.hSetNX(this._etc.pre + key, field, val);
            }
            else {
                return await conn.hSet(this._etc.pre + key, field, val);
            }
        }
        catch {
            return false;
        }
    }

    /**
     * --- 批量设置哈希值 ---
     * @param key key 名
     * @param rows key / val 数组
     */
    public async hMSet(
        key: string,
        rows: Record<string, object | string | number>
    ): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            for (const i in rows) {
                const val = rows[i];
                if (typeof val === 'object') {
                    rows[i] = lText.stringifyJson(val);
                }
            }
            await conn.hMSet(this._etc.pre + key, rows as Record<string, string | number>);
            return true;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取哈希值 ---
     * @param key
     * @param field
     */
    public async hGet(key: string, field: string): Promise<string | false | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.hGet(this._etc.pre + key, field);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取哈希 json 对象 ---
     * @param key
     * @param field
     */
    public async hGetJson(key: string, field: string): Promise<any | false | null> {
        const v = await this.hGet(key, field);
        if (v === false) {
            return false;
        }
        if (v === null) {
            return null;
        }
        const r = lText.parseJson(v);
        return r === false ? null : v;
    }

    /**
     * --- 批量获取哈希值 ---
     * @param key
     * @param fields
     */
    public async hMGet(key: string, fields: string[]): Promise<Record<string, string | null> | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.hMGet(this._etc.pre + key, fields);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 批量获取哈希键值对 ---
     * @param key
     */
    public async hGetAll(key: string): Promise<Record<string, string | null> | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.hGetAll(this._etc.pre + key);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 删除哈希键 ---
     * @param key
     * @param fields 值序列
     */
    public async hDel(key: string, fields: string | string[]): Promise<number | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.hDel(this._etc.pre + key, fields);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 判断哈希字段是否存在 ---
     * @param key
     * @param field
     */
    public async hExists(key: string, field: string): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.hExists(this._etc.pre + key, field);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 设置哈希自增自减 ---
     * @param key key
     * @param field 字段
     * @param increment 正数或负数，整数或浮点
     */
    public async hIncr(key: string, field: string, increment: number): Promise<number | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            if (Number.isInteger(increment)) {
                return await conn.hIncr(this._etc.pre + key, field, increment);
            }
            else {
                return await conn.hIncrByFloat(this._etc.pre + key, field, increment);
            }
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取哈希所有字段 ---
     * @param key
     */
    public async hKeys(key: string): Promise<string[] | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.hKeys(this._etc.pre + key);
        }
        catch {
            return false;
        }
    }

    public async lPush(key: string, values: Array<string | Buffer>): Promise<number | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.lPush(this._etc.pre + key, values);
        }
        catch {
            return false;
        }
    }

    public async rPush(key: string, values: Array<string | Buffer>): Promise<number | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.rPush(this._etc.pre + key, values);
        }
        catch {
            return false;
        }
    }

    public async bLMove(sourceKey: string, destKey: string, soo: 'LEFT' | 'RIGHT', deo: 'LEFT' | 'RIGHT', timeout: number): Promise<string | null | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.bLMove(this._etc.pre + sourceKey, this._etc.pre + destKey, soo, deo, timeout);
        }
        catch {
            return false;
        }
    }

    public async lPop(key: string): Promise<string | null | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.lPop(this._etc.pre + key);
        }
        catch {
            return false;
        }
    }

    public async rPop(key: string): Promise<string | null | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.rPop(this._etc.pre + key);
        }
        catch {
            return false;
        }
    }

    public async bRPop(key: string | string[], timeout: number): Promise<Record<string, string> | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            if (typeof key === 'string') {
                key = [key];
            }
            return await conn.bRPop(key.map(item => this._etc.pre + item), timeout);
        }
        catch {
            return false;
        }
    }

    public async lRange(key: string, start: number, stop: number): Promise<string[] | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.lRange(this._etc.pre + key, start, stop);
        }
        catch {
            return false;
        }
    }

    public async lLen(key: string): Promise<number | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.lLen(this._etc.pre + key);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 从连接池中获取一个符合要求的连接 ---
     */
    private async _getConnection(): Promise<redis.ICommandClient | null> {
        const item = connections.find(item =>
            (item.host === this._etc.host) && (item.port === this._etc.port) && (item.index === this._etc.index)
        );
        if (item) {
            return item.conn;
        }
        // --- 没有找到合适的连接，创建一个 ---
        try {
            const conn = redis.createCommandClient({
                'host': this._etc.host,
                'port': this._etc.port,
            });
            // --- 认证 ---
            if (this._etc.pwd) {
                await conn.auth(this._etc.pwd, this._etc.user || undefined);
            }
            await conn.select(this._etc.index);
            conn.on('error', function(err: Error): void {
                lCore.debug('[KV][_getConnection][error]', err);
            }).on('end', () => {
                // --- 断线，不重要，会自动重连 ---
            }).on('close', () => {
                // --- 断线，不重要，会自动重连 ---
            });
            connections.push({
                'host': this._etc.host,
                'port': this._etc.port,
                'index': this._etc.index,
                'conn': conn,
            });
            return conn;
        }
        catch {
            return null;
        }
    }

}

/**
 * --- 获取 Kv 对象 ---
 * @param etc 配置信息可留空
 */
export function get(ctrEtc: sCtr.Ctr | kebab.IConfigKv): Kv {
    const etc = ctrEtc instanceof sCtr.Ctr ? ctrEtc.getPrototype('_config').kv : ctrEtc;
    return new Kv(etc);

}

// --- 类型 ---

/** --- 连接信息 --- */
export interface IConnectionInfo {
    'host': string;
    'port': number;
    'index': number;
    'conn': redis.ICommandClient;
}

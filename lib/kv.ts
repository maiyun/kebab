/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-30 19:25:22
 * Last: 2020-3-28 18:54:04, 2022-09-12 23:24:45, 2022-09-22 01:06:22, 2024-2-21 13:32:56, 2024-8-21 16:59:57, 2025-11-6 14:56:45
 */

// --- 第三方 ---
import * as redis from '@litert/redis';
// --- 库和定义 ---
import * as lText from '#kebab/lib/text.js';
import * as lCore from '#kebab/lib/core.js';
import * as sCtr from '#kebab/sys/ctr.js';

/** --- 连接列表（同一个 host、port、index 只有一个连接） --- */
const connections: IConnectionInfo[] = [];

export class Kv {

    /** --- pre --- */
    private readonly _pre: string;

    /** --- 当前连接的 db index --- */
    private readonly _index: number;

    /** --- kv 连接对象 --- */
    private readonly _link: redis.ICommandClient;

    /** --- 获取之时是新 redis 链接还是老链接 --- */
    private readonly _new: boolean;

    public constructor(ctr: sCtr.Ctr, etc?: IOptions) {
        const configKv = ctr.getPrototype('_config').kv;
        const host = etc?.host ?? configKv.host;
        const port = etc?.port ?? configKv.port;
        this._index = etc?.index ?? configKv.index;
        this._pre = etc?.pre ?? configKv.pre;
        const item = connections.find(item =>
            (item.host === host) && (item.port === port) && (item.index === this._index)
        );
        if (item) {
            this._new = false;
            this._link = item.link;
            return;
        }
        this._new = true;
        this._link = redis.createCommandClient({
            'host': host,
            'port': port,
        });
        this._link.on('error', err => {
            lCore.debug('[KV][constructor][error]', err);
        }).on('end', () => {
            // --- 连接断开，不过没关系，执行命令时会自动重连 ---
        }).on('close', () => {
            // --- 连接断开，不过没关系，执行命令时会自动重连 ---
        });
        connections.push({
            'host': host,
            'port': port,
            'index': this._index,
            'link': this._link,
        });
    }

    /** --- 初始化连接 --- */
    public async init(ctr: sCtr.Ctr, etc?: IOptions): Promise<boolean> {
        try {
            if (!this._new) {
                // --- 不是新连接，不需要初始化 ---
                return true;
            }
            const configKv = ctr.getPrototype('_config').kv;
            const user = etc?.user ?? configKv.user;
            const pwd = etc?.pwd ?? configKv.pwd;
            if (pwd) {
                await this._link.auth(pwd, user || undefined);
            }
            await this._link.select(this._index);
            return true;
        }
        catch (e: any) {
            // --- 初始化失败，移除 ---
            lCore.debug('[KV][init][error]', e);
            const item = connections.findIndex(item => item.link === this._link);
            if (item !== -1) {
                connections.splice(item, 1);
            }
            return false;
        }
    }

    /**
     * --- 设定一个值 ---
     * @param key
     * @param val
     * @param ttl 秒，0 为不限制
     * @param mod 设置模式: 空,nx（key不存在才建立）,xx（key存在才修改）
     */
    public async set(key: string, val: object | string | number, ttl: number = 0, mod: '' | 'nx' | 'xx' = ''): Promise<boolean> {
        if (typeof val !== 'string') {
            val = lText.stringifyJson(val);
        }
        try {
            switch (mod) {
                case '': {
                    return await this._link.set(this._pre + key, val, ttl === 0 ? undefined : ttl);
                }
                case 'nx': {
                    return await this._link.setNX(this._pre + key, val, ttl === 0 ? undefined : ttl);
                }
                case 'xx': {
                    return await this._link.replace(this._pre + key, val, ttl === 0 ? undefined : ttl);
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
        try {
            return await this._link.append(this._pre + key, val) > 0 ? true : false;
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
            let r = await this._link.evalSHA('ea360f3f6508a243824ecda6be15db56df217873', [this._pre + key], [val]);
            r = parseInt(r);
            if (r <= 0) {
                await this._link.scriptLoad(script);
                r = await this._link.evalSHA('ea360f3f6508a243824ecda6be15db56df217873', [this._pre + key], [val]);
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
        try {
            if (typeof keys === 'string') {
                keys = [keys];
            }
            for (let k = 0; k < keys.length; ++k) {
                keys[k] = this._pre + keys[k];
            }
            return await this._link.mExists(keys);
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
        try {
            return await this._link.get(this._pre + key);
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
        try {
            return await this._link.ttl(this._pre + key);
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
        try {
            return await this._link.pTTL(this._pre + key);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 批量获取值 ---
     * @param keys key 序列
     */
    public async mGet(keys: string[]): Promise<Record<string, string | null>> {
        for (let k = 0; k < keys.length; ++k) {
            keys[k] = this._pre + keys[k];
        }
        const rtn: Record<string, string | null> = {};
        try {
            const pl: number = this._pre.length;
            const r = await this._link.mGet(keys);
            if (pl === 0) {
                return r;
            }
            for (const k in r) {
                rtn[k.slice(pl)] = r[k];
            }
        }
        catch {
            for (const key of keys) {
                rtn[key] = null;
            }
        }
        return rtn;
    }

    /**
     * --- 批量设置哈希值 ---
     * @param key key 名
     * @param rows key / val 数组
     * @param etc
     */
    public async mSet(
        rows: Record<string, string | Buffer>
    ): Promise<boolean> {
        try {
            const rtn: Record<string, string | Buffer> = {};
            for (const key in rows) {
                rtn[this._pre + key] = rows[key];
            }
            await this._link.mSet(rtn);
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
        if (typeof keys === 'string') {
            keys = [keys];
        }
        for (let k = 0; k < keys.length; ++k) {
            keys[k] = this._pre + keys[k];
        }
        try {
            return await this._link.del(keys) > 0 ? true : false;
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
        try {
            if (Number.isInteger(num)) {
                if (num === 1) {
                    return await this._link.incr(this._pre + key);
                }
                else {
                    return await this._link.incr(this._pre + key, num);
                }
            }
            else {
                return await this._link.incrByFloat(this._pre + key, num);
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
        try {
            if (Number.isInteger(num)) {
                if (num === 1) {
                    return await this._link.decr(this._pre + key);
                }
                else {
                    return await this._link.decr(this._pre + key, num);
                }
            }
            else {
                return await this._link.incrByFloat(this._pre + key, -num);
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
        try {
            return await this._link.expire(this._pre + key, ttl);
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
        try {
            const r = await this._link.keys(this._pre + pattern);
            const pl = this._pre.length;
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
        try {
            const r = await this._link.scan(cursor, this._pre + pattern, count);
            for (let i = 0; i < r.items.length; ++i) {
                r.items[i] = r.items[i].slice(this._pre.length);
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
        try {
            await this._link.flushDb();
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
        try {
            return (await this._link.ping()) === 'PONG' ? 'PONG' : false;
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
        try {
            if (typeof val !== 'string') {
                val = lText.stringifyJson(val);
            }
            if (mod === 'nx') {
                return await this._link.hSetNX(this._pre + key, field, val);
            }
            else {
                return await this._link.hSet(this._pre + key, field, val);
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
        try {
            for (const i in rows) {
                const val = rows[i];
                if (typeof val === 'object') {
                    rows[i] = lText.stringifyJson(val);
                }
            }
            await this._link.hMSet(this._pre + key, rows as Record<string, string | number>);
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
    public async hGet(key: string, field: string): Promise<string | null> {
        try {
            return await this._link.hGet(this._pre + key, field);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 获取哈希 json 对象 ---
     * @param key
     * @param field
     */
    public async hGetJson(key: string, field: string): Promise<any | null> {
        const v = await this.hGet(key, field);
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
    public async hMGet(key: string, fields: string[]): Promise<Record<string, string | null>> {
        try {
            return await this._link.hMGet(this._pre + key, fields);
        }
        catch {
            const rtn: Record<string, string | null> = {};
            for (const field of fields) {
                rtn[field] = null;
            }
            return rtn;
        }
    }

    /**
     * --- 批量获取哈希键值对 ---
     * @param key
     */
    public async hGetAll(key: string): Promise<Record<string, string | null> | null> {
        try {
            return await this._link.hGetAll(this._pre + key);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 删除哈希键 ---
     * @param key
     * @param fields 值序列
     */
    public async hDel(key: string, fields: string | string[]): Promise<number> {
        try {
            return await this._link.hDel(this._pre + key, fields);
        }
        catch {
            return 0;
        }
    }

    /**
     * --- 判断哈希字段是否存在 ---
     * @param key
     * @param field
     */
    public async hExists(key: string, field: string): Promise<boolean> {
        try {
            return await this._link.hExists(this._pre + key, field);
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
    public async hIncr(key: string, field: string, increment: number): Promise<number> {
        try {
            if (Number.isInteger(increment)) {
                return await this._link.hIncr(this._pre + key, field, increment);
            }
            else {
                return await this._link.hIncrByFloat(this._pre + key, field, increment);
            }
        }
        catch {
            return 0;
        }
    }

    /**
     * --- 获取哈希所有字段 ---
     * @param key
     */
    public async hKeys(key: string): Promise<string[]> {
        try {
            return await this._link.hKeys(this._pre + key);
        }
        catch {
            return [];
        }
    }

    public async lPush(key: string, values: Array<string | Buffer>): Promise<number> {
        try {
            return await this._link.lPush(this._pre + key, values);
        }
        catch {
            return 0;
        }
    }

    public async rPush(key: string, values: Array<string | Buffer>): Promise<number> {
        try {
            return await this._link.rPush(this._pre + key, values);
        }
        catch {
            return 0;
        }
    }

    public async bLMove(sourceKey: string, destKey: string, soo: 'LEFT' | 'RIGHT', deo: 'LEFT' | 'RIGHT', timeout: number): Promise<string | null> {
        try {
            return await this._link.bLMove(this._pre + sourceKey, this._pre + destKey, soo, deo, timeout);
        }
        catch {
            return null;
        }
    }

    public async lPop(key: string): Promise<string | null> {
        try {
            return await this._link.lPop(this._pre + key);
        }
        catch {
            return null;
        }
    }

    public async rPop(key: string): Promise<string | null> {
        try {
            return await this._link.rPop(this._pre + key);
        }
        catch {
            return null;
        }
    }

    public async bRPop(key: string | string[], timeout: number): Promise<Record<string, string>> {
        try {
            if (typeof key === 'string') {
                key = [key];
            }
            return await this._link.bRPop(key.map(item => this._pre + item), timeout);
        }
        catch {
            return {};
        }
    }

    public async lRange(key: string, start: number, stop: number): Promise<string[]> {
        try {
            return await this._link.lRange(this._pre + key, start, stop);
        }
        catch {
            return [];
        }
    }

    public async lLen(key: string): Promise<number> {
        try {
            return await this._link.lLen(this._pre + key);
        }
        catch {
            return 0;
        }
    }

}

/**
 * --- 获取 Kv 对象 ---
 * @param etc 配置信息可留空
 */
export async function get(ctr: sCtr.Ctr, etc?: IOptions): Promise<Kv | false> {
    etc ??= ctr.getPrototype('_config').kv;
    const kv = new Kv(ctr, etc);
    const r = await kv.init(ctr, etc);
    return r ? kv : false;

}

// --- 类型 ---

/** --- 连接信息 --- */
export interface IConnectionInfo {
    'host': string;
    'port': number;
    'index': number;
    'link': redis.ICommandClient;
}

/** --- 选项 --- */
export interface IOptions {
    'host'?: string;
    'port'?: number;
    'index'?: number;
    'pre'?: string;

    'user'?: string;
    'pwd'?: string;
}

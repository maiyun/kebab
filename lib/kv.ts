/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-30 19:25:22
 * Last: 2020-3-28 18:54:04, 2022-09-12 23:24:45, 2022-09-22 01:06:22, 2024-2-21 13:32:56
 */

// --- Pool 是使用时必须要一个用户创建一份的，Connection 是池子里获取的 ---

// --- 为啥 Pool 要独立，因为有些配置项目不能存在 Connection 是用户单独使用的，例如 pre ---

// --- 第三方 ---
import * as redis from '@litert/redis';
// --- 库和定义 ---
import * as time from '~/lib/time';
import * as ctr from '~/sys/ctr';
import * as types from '~/types';

/** --- 连接信息 --- */
export interface IConnectionInfo {
    'id': number;
    'last': number;
    'host': string;
    'port': number;
    'index': number;

    'lost': boolean;
}

/** --- 连接列表（同一个 host、port、index、auth 只有一个连接） --- */
const connections: Connection[] = [];

/**
 * --- 计划任务 30 秒一次，关闭超过 3 分钟不活动的连接 ---
 */
async function checkConnection(): Promise<void> {
    const now: number = time.stamp();
    for (let i = 0; i < connections.length; ++i) {
        const connection = connections[i];
        if (connection.isLost()) {
            // --- 连接已经丢失，移除 ---
            await connection.end();
            connections.splice(i, 1);
            --i;
            continue;
        }
        if (connection.isUsing()) {
            // --- 连接正在被使用，看看是否使用超过 5 分钟，超过则不是正常状态 ---
            if (connection.getLast() <= now - 300) {
                // --- 10 分钟之前开始的 ---
                console.log(`[kv] [error] There is a transactional connection[${i}] that is not closed.`);
                await connection.end();
                connections.splice(i, 1);
                --i;
            }
            continue;
        }
        // --- 检测 3 分钟内是否使用过 ---
        if (connection.getLast() > now - 180) {
            // --- 3 分钟内使用过，不管 ---
            continue;
        }
        // --- 超 3 分钟未被使用，则关闭 ---
        await connection.end();
        connections.splice(i, 1);
        --i;
        continue;
    }
    setTimeout(function () {
        checkConnection().catch(e => { console.log('[KV]', e); });
    }, 30000);
}
setTimeout(function () {
    checkConnection().catch(e => { console.log('[KV]', e); });
}, 30000);

export class Pool {

    /** --- 当前 Pool 对象的 kv 连接信息 --- */
    private readonly _etc: types.IConfigKv;

    public constructor(ctr: ctr.Ctr, etc?: types.IConfigKv) {
        if (etc) {
            this._etc = etc;
        }
        else {
            this._etc = ctr.getPrototype('_config').kv;
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
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const r = await conn.set(key, val, ttl, mod, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 添加一个值，存在则不变 ---
     * @param key
     * @param val
     * @param ttl 秒，0 为不限制
     */
    public async add(key: string, val: object | string | number, ttl: number = 0): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const r = await conn.add(key, val, ttl, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 替换一个存在的值 ---
     * @param key
     * @param val
     * @param ttl 秒，0 为不限制
     */
    public async replace(key: string, val: object | string | number, ttl: number = 0): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const r = await conn.replace(key, val, ttl, this._etc);
        conn.used();
        return r;
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
        const r = await conn.append(key, val, this._etc);
        conn.used();
        return r;
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
        const r = await conn.prepend(key, val, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 检测 key 是否存在 ---
     * @param keys
     */
    public async exists(keys: string | string[]): Promise<number> {
        const conn = await this._getConnection();
        if (!conn) {
            return 0;
        }
        const r = await conn.exists(keys, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 获取字符串 ---
     * @param key
     */
    public async get(key: string): Promise<string | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        const r = await conn.get(key, this._etc);
        conn.used();
        return r;
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
        const r = await conn.ttl(key, this._etc);
        conn.used();
        return r;
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
        const r = await conn.pttl(key, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 批量获取值 ---
     * @param keys key 序列
     */
    public async mGet(keys: string[]): Promise<Record<string, string | null>> {
        const conn = await this._getConnection();
        if (conn) {
            const r = await conn.mGet(keys, this._etc);
            conn.used();
            return r;
        }
        else {
            const rtn: Record<string, string | null> = {};
            for (const key of keys) {
                rtn[key] = null;
            }
            return rtn;
        }
    }

    /**
     * --- 获取 json 对象 ---
     * @param key
     */
    public async getJson(key: string): Promise<any | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        const r = await conn.getJson(key, this._etc);
        conn.used();
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
        const r = await conn.del(keys, this._etc);
        conn.used();
        return r;
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
        const r = await conn.incr(key, num, this._etc);
        conn.used();
        return r;
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
        const r = await conn.decr(key, num, this._etc);
        conn.used();
        return r;
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
        const r = await conn.expire(key, ttl, this._etc);
        conn.used();
        return r;
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
        const r = await conn.keys(pattern, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 根据条件获取服务器上的 keys ---
     * @param cursor
     * @param pattern 例如 *
     * @param count 获取的条数
     */
    public async scan(cursor: number = 0, pattern: string = '*', count: number = 10): Promise<redis.IScanResult<string> | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const r = await conn.scan(cursor, pattern, count, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 清除当前所选数据库的所有内容 ---
     */
    public async flushDb(): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const r = await conn.flushDb();
        conn.used();
        return r;
    }

    /**
     * --- 发送 ping ---
     */
    public async ping(): Promise<string | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const r = await conn.ping();
        conn.used();
        return r;
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
        const r = await conn.hSet(key, field, val, mod, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 批量设置哈希值 ---
     * @param key key 名
     * @param rows key / val 数组
     */
    public async hMSet(key: string, rows: Record<string, object | string | number>): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const r = await conn.hMSet(key, rows, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 获取哈希值 ---
     * @param key
     * @param field
     */
    public async hGet(key: string, field: string): Promise<string | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        const r = await conn.hGet(key, field, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 获取哈希 json 对象 ---
     * @param key
     * @param field
     */
    public async hGetJson(key: string, field: string): Promise<any | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        const r = await conn.hGetJson(key, field, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 批量获取哈希值 ---
     * @param key
     * @param fields
     */
    public async hMGet(key: string, fields: string[]): Promise<Record<string, string | null>> {
        const conn = await this._getConnection();
        if (conn) {
            const r = await conn.hMGet(key, fields, this._etc);
            conn.used();
            return r;
        }
        else {
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
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        const r = await conn.hGetAll(key, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 删除哈希键 ---
     * @param key
     * @param fields 值序列
     */
    public async hDel(key: string, fields: string | string[]): Promise<number> {
        const conn = await this._getConnection();
        if (!conn) {
            return 0;
        }
        const r = await conn.hDel(key, fields, this._etc);
        conn.used();
        return r;
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
        const r = await conn.hExists(key, field, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 设置哈希自增自减 ---
     * @param key key
     * @param field 字段
     * @param increment 正数或负数，整数或浮点
     */
    public async hIncr(key: string, field: string, increment: number): Promise<number> {
        const conn = await this._getConnection();
        if (!conn) {
            return 0;
        }
        const r = await conn.hIncr(key, field, increment, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 获取哈希所有字段 ---
     * @param key
     */
    public async hKeys(key: string): Promise<string[]> {
        const conn = await this._getConnection();
        if (!conn) {
            return [];
        }
        const r = await conn.hKeys(key, this._etc);
        conn.used();
        return r;
    }

    public async lPush(key: string, values: Array<string | Buffer>): Promise<number> {
        const conn = await this._getConnection();
        if (!conn) {
            return 0;
        }
        const r = await conn.lPush(key, values, this._etc);
        conn.used();
        return r;
    }

    public async rPush(key: string, values: Array<string | Buffer>): Promise<number> {
        const conn = await this._getConnection();
        if (!conn) {
            return 0;
        }
        const r = await conn.rPush(key, values, this._etc);
        conn.used();
        return r;
    }

    public async bLMove(sourceKey: string, destKey: string, soo: 'LEFT' | 'RIGHT', deo: 'LEFT' | 'RIGHT', timeout: number): Promise<string | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        const r = await conn.bLMove(sourceKey, destKey, soo, deo, timeout, this._etc);
        conn.used();
        return r;
    }

    public async lPop(key: string): Promise<string | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        const r = await conn.lPop(key, this._etc);
        conn.used();
        return r;
    }

    public async rPop(key: string): Promise<string | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        const r = await conn.rPop(key, this._etc);
        conn.used();
        return r;
    }

    public async bRPop(key: string | string[], timeout: number): Promise<Record<string, string>> {
        const conn = await this._getConnection();
        if (!conn) {
            return {};
        }
        const r = await conn.bRPop(key, timeout, this._etc);
        conn.used();
        return r;
    }

    public async lRange(key: string, start: number, stop: number): Promise<string[]> {
        const conn = await this._getConnection();
        if (!conn) {
            return [];
        }
        const r = await conn.lRange(key, start, stop, this._etc);
        conn.used();
        return r;
    }

    public async lLen(key: string): Promise<number> {
        const conn = await this._getConnection();
        if (!conn) {
            return 0;
        }
        const r = await conn.lLen(key, this._etc);
        conn.used();
        return r;
    }

    /**
     * --- 从连接池获取一个连接，会被自动设置为使用中，需要在执行命令后解除占用 ---
     */
    private async _getConnection(): Promise<Connection | null> {
        let conn!: Connection;
        for (const connection of connections) {
            const etc = connection.getEtc();
            if (
                connection.isLost() ||
                connection.isUsing() ||
                (etc.host !== this._etc.host) ||
                (etc.port !== this._etc.port) ||
                (etc.index !== this._etc.index)
            ) {
                // --- 配置项连接项不匹配 ---
                continue;
            }
            connection.refreshLast();
            connection.setUsing();
            conn = connection;
            break;
        }
        if (!conn) {
            // --- 没有找到合适的连接，创建一个 ---
            const link = redis.createCommandClient({
                'host': this._etc.host,
                'port': this._etc.port
            });
            // --- 开始连接 ---
            try {
                await link.connect();
            }
            catch {
                return null;
            }
            // --- 认证 ---
            if (this._etc.user || this._etc.pwd) {
                try {
                    await link.auth(this._etc.user + this._etc.pwd);
                }
                catch {
                    return null;
                }
            }
            await link.select(this._etc.index);
            conn = new Connection(this._etc, link);
            conn.refreshLast();
            conn.setUsing();
            link.on('error', function (err): void {
                conn.setLost();
                // console.log(`--- redis [${conn._etc.host}:${conn._etc.port}] error ---`);
                console.log('[KV] [ERROR]', err);
            });
            connections.push(conn);
        }
        return conn;
    }

}

export class Connection {
    /** --- 本连接最后一次使用时间 --- */
    private _last: number = 0;

    /** --- kv 缓存连接对象 --- */
    private readonly _link: redis.ICommandClient;

    /** --- 当前连接是否正在被独占使用 --- */
    private _using: boolean = false;

    /** --- 当发生断开，则需从连接池移除连接 --- */
    private _lost: boolean = false;

    /** --- 当前的连接配置信息 --- */
    private readonly _etc: types.IConfigKv;

    public constructor(etc: types.IConfigKv, link: redis.ICommandClient) {
        this._etc = etc;
        this._link = link;
        this.refreshLast();
    }

    /**
     * --- 获取连接 etc 信息 ---
     */
    public getEtc(): types.IConfigKv {
        return this._etc;
    }

    /**
     * --- 获取最后一次获取连接的时间 ---
     */
    public getLast(): number {
        return this._last;
    }

    /**
     * --- 将本条连接设置为不可用 ---
     */
    public setLost(): void {
        this._lost = true;
    }

    /**
     * --- 是否已经丢失 ---
     */
    public isLost(): boolean {
        return this._lost;
    }

    /**
     * --- 将本条连接设置占用中 ---
     */
    public setUsing(): void {
        this._using = true;
    }

    /**
     * --- 获取当前状态是否正在被使用中 ---
     */
    public isUsing(): boolean {
        return this._using;
    }

    /**
     * --- 取消占用 ---
     */
    public used(): void {
        this._using = false;
    }

    /**
     * --- 设定最后使用时间 ---
     */
    public refreshLast(): void {
        this._last = time.stamp();
    }

    /**
     * --- 断开此连接，一般情况下不使用 ---
     */
    public async end(): Promise<void> {
        try {
            await this._link.close();
        }
        catch {
            return;
        }
    }

    /**
     * --- 设定一个值 ---
     * @param key
     * @param val
     * @param ttl 秒，0 为不限制
     * @param mod 设置模式: 空,nx（key不存在才建立）,xx（key存在才修改）
     * @param etc 配置项，主要用 etc.pre
     */
    public async set(key: string, val: object | string | number, ttl: number, mod: '' | 'nx' | 'xx', etc: types.IConfigKv): Promise<boolean> {
        this.refreshLast();
        if (typeof val !== 'string') {
            val = JSON.stringify(val);
        }
        try {
            switch (mod) {
                case '': {
                    return await this._link.set(etc.pre + key, val, ttl === 0 ? undefined : ttl);
                }
                case 'nx': {
                    return await this._link.setNX(etc.pre + key, val, ttl === 0 ? undefined : ttl);
                }
                case 'xx': {
                    return await this._link.replace(etc.pre + key, val, ttl === 0 ? undefined : ttl);
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
     * @param etc
     */
    public async add(
        key: string,
        val: object | string | number,
        ttl: number,
        etc: types.IConfigKv
    ): Promise<boolean> {
        return this.set(key, val, ttl, 'nx', etc);
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
        ttl: number,
        etc: types.IConfigKv
    ): Promise<boolean> {
        return this.set(key, val, ttl, 'xx', etc);
    }

    /**
     * --- 向已存在的值后追加数据 ---
     * @param key
     * @param val
     * @param etc
     */
    public async append(key: string, val: string, etc: types.IConfigKv): Promise<boolean> {
        this.refreshLast();
        try {
            return await this._link.append(etc.pre + key, val) > 0 ? true : false;
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
    public async prepend(key: string, val: string, etc: types.IConfigKv): Promise<boolean> {
        this.refreshLast();
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
            let r = await this._link.evalSHA('ea360f3f6508a243824ecda6be15db56df217873', [etc.pre + key], [val]);
            r = parseInt(r);
            if (r <= 0) {
                await this._link.scriptLoad(script);
                r = this._link.evalSHA('ea360f3f6508a243824ecda6be15db56df217873', [etc.pre + key], [val]);
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
     * @param etc
     */
    public async exists(keys: string | string[], etc: types.IConfigKv): Promise<number> {
        this.refreshLast();
        try {
            if (typeof keys === 'string') {
                keys = [keys];
            }
            for (let k = 0; k < keys.length; ++k) {
                keys[k] = etc.pre + keys[k];
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
     * @param etc
     */
    public async get(key: string, etc: types.IConfigKv): Promise<string | null> {
        this.refreshLast();
        try {
            return await this._link.get(etc.pre + key);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 获取相应的剩余有效期秒数 ---
     * @param key
     * @param etc
     */
    public async ttl(key: string, etc: types.IConfigKv): Promise<number | null> {
        this.refreshLast();
        try {
            return await this._link.ttl(etc.pre + key);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 获取相应的剩余有效期毫秒数 ---
     * @param key
     * @param etc
     */
    public async pttl(key: string, etc: types.IConfigKv): Promise<number | null> {
        this.refreshLast();
        try {
            return await this._link.pTTL(etc.pre + key);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 批量获取值 ---
     * @param keys key 序列
     * @param etc 顺序数组
     */
    public async mGet(keys: string[], etc: types.IConfigKv): Promise<Record<string, string | null>> {
        this.refreshLast();
        for (let k = 0; k < keys.length; ++k) {
            keys[k] = etc.pre + keys[k];
        }
        const rtn: Record<string, string | null> = {};
        try {
            const pl: number = etc.pre.length;
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
     * --- 获取 json 对象 ---
     * @param key
     * @param etc
     */
    public async getJson(key: string, etc: types.IConfigKv): Promise<any | null> {
        const v = await this.get(key, etc);
        if (v === null) {
            return null;
        }
        try {
            return JSON.parse(v);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 删除已存在的值 ---
     * @param keys
     * @param etc
     */
    public async del(keys: string | string[], etc: types.IConfigKv): Promise<boolean> {
        this.refreshLast();
        if (typeof keys === 'string') {
            keys = [keys];
        }
        for (let k = 0; k < keys.length; ++k) {
            keys[k] = etc.pre + keys[k];
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
     * @param etc
     */
    public async incr(key: string, num: number, etc: types.IConfigKv): Promise<number | false> {
        this.refreshLast();
        try {
            if (Number.isInteger(num)) {
                if (num === 1) {
                    return await this._link.incr(etc.pre + key);
                }
                else {
                    return await this._link.incr(etc.pre + key, num);
                }
            }
            else {
                return await this._link.incrByFloat(etc.pre + key, num);
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
     * @param etc
     */
    public async decr(key: string, num: number, etc: types.IConfigKv): Promise<number | false> {
        this.refreshLast();
        try {
            if (Number.isInteger(num)) {
                if (num === 1) {
                    return await this._link.decr(etc.pre + key);
                }
                else {
                    return await this._link.decr(etc.pre + key, num);
                }
            }
            else {
                return await this._link.incrByFloat(etc.pre + key, -num);
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
     * @param etc
     */
    public async expire(key: string, ttl: number, etc: types.IConfigKv): Promise<boolean> {
        this.refreshLast();
        try {
            return await this._link.expire(etc.pre + key, ttl);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取服务器上的所有 key 列表 ---
     * @param pattern
     */
    public async keys(pattern: string, etc: types.IConfigKv): Promise<string[] | false> {
        this.refreshLast();
        try {
            const r = await this._link.keys(etc.pre + pattern);
            const pl = etc.pre.length;
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
     * @param etc
     */
    public async scan(
        cursor: number,
        pattern: string,
        count: number,
        etc: types.IConfigKv
    ): Promise<redis.IScanResult<string> | false> {
        this.refreshLast();
        try {
            const r = await this._link.scan(cursor, etc.pre + pattern, count);
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
        this.refreshLast();
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
     */
    public async ping(): Promise<false | string> {
        this.refreshLast();
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
     * @param etc
     */
    public async hSet(key: string, field: string, val: object | string | number, mod: '' | 'nx', etc: types.IConfigKv): Promise<boolean> {
        this.refreshLast();
        try {
            if (typeof val !== 'string') {
                val = JSON.stringify(val);
            }
            if (mod === 'nx') {
                return await this._link.hSetNX(etc.pre + key, field, val);
            }
            else {
                return await this._link.hSet(etc.pre + key, field, val);
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
     * @param etc
     */
    public async hMSet(
        key: string,
        rows: Record<string, object | string | number>,
        etc: types.IConfigKv
    ): Promise<boolean> {
        this.refreshLast();
        try {
            for (const i in rows) {
                const val = rows[i];
                if (typeof val === 'object') {
                    rows[i] = JSON.stringify(val);
                }
            }
            await this._link.hMSet(etc.pre + key, rows as Record<string, string | number>);
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
     * @param etc
     */
    public async hGet(key: string, field: string, etc: types.IConfigKv): Promise<string | null> {
        this.refreshLast();
        try {
            return await this._link.hGet(etc.pre + key, field);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 获取哈希 json 对象 ---
     * @param key
     * @param field
     * @param etc
     */
    public async hGetJson(key: string, field: string, etc: types.IConfigKv): Promise<any | null> {
        const v = await this.hGet(key, field, etc);
        if (v === null) {
            return null;
        }
        try {
            return JSON.parse(v);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 批量获取哈希值 ---
     * @param key
     * @param fields
     * @param etc
     */
    public async hMGet(key: string, fields: string[], etc: types.IConfigKv): Promise<Record<string, string | null>> {
        this.refreshLast();
        try {
            return await this._link.hMGet(etc.pre + key, fields);
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
     * @param etc
     */
    public async hGetAll(key: string, etc: types.IConfigKv): Promise<Record<string, string | null> | null> {
        this.refreshLast();
        try {
            return await this._link.hGetAll(etc.pre + key);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 删除哈希键 ---
     * @param key
     * @param fields 值序列
     * @param etc
     */
    public async hDel(key: string, fields: string | string[], etc: types.IConfigKv): Promise<number> {
        this.refreshLast();
        try {
            return await this._link.hDel(etc.pre + key, fields);
        }
        catch {
            return 0;
        }
    }

    /**
     * --- 判断哈希字段是否存在 ---
     * @param key
     * @param field
     * @param etc
     */
    public async hExists(key: string, field: string, etc: types.IConfigKv): Promise<boolean> {
        this.refreshLast();
        try {
            return await this._link.hExists(etc.pre + key, field);
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
     * @param etc
     */
    public async hIncr(key: string, field: string, increment: number, etc: types.IConfigKv): Promise<number> {
        this.refreshLast();
        try {
            if (Number.isInteger(increment)) {
                return await this._link.hIncr(etc.pre + key, field, increment);
            }
            else {
                return await this._link.hIncrByFloat(etc.pre + key, field, increment);
            }
        }
        catch {
            return 0;
        }
    }

    /**
     * --- 获取哈希所有字段 ---
     * @param key
     * @param etc
     */
    public async hKeys(key: string, etc: types.IConfigKv): Promise<string[]> {
        this.refreshLast();
        try {
            return await this._link.hKeys(etc.pre + key);
        }
        catch {
            return [];
        }
    }

    public async lPush(key: string, values: Array<string | Buffer>, etc: types.IConfigKv): Promise<number> {
        this.refreshLast();
        try {
            return await this._link.lPush(etc.pre + key, values);
        }
        catch {
            return 0;
        }
    }

    public async rPush(key: string, values: Array<string | Buffer>, etc: types.IConfigKv): Promise<number> {
        this.refreshLast();
        try {
            return await this._link.rPush(etc.pre + key, values);
        }
        catch {
            return 0;
        }
    }

    public async bLMove(sourceKey: string, destKey: string, soo: 'LEFT' | 'RIGHT', deo: 'LEFT' | 'RIGHT', timeout: number, etc: types.IConfigKv): Promise<string | null> {
        this.refreshLast();
        try {
            const r = await this._link.command('BLMOVE', [etc.pre + sourceKey, etc.pre + destKey, soo, deo, timeout.toString()]);
            if (r instanceof Buffer) {
                return r.toString();
            }
            return null;
        }
        catch {
            return null;
        }
    }

    public async lPop(key: string, etc: types.IConfigKv): Promise<string | null> {
        this.refreshLast();
        try {
            return await this._link.lPop(etc.pre + key);
        }
        catch {
            return null;
        }
    }

    public async rPop(key: string, etc: types.IConfigKv): Promise<string | null> {
        this.refreshLast();
        try {
            return await this._link.rPop(etc.pre + key);
        }
        catch {
            return null;
        }
    }

    public async bRPop(key: string | string[], timeout: number, etc: types.IConfigKv): Promise<Record<string, string>> {
        this.refreshLast();
        try {
            if (typeof key === 'string') {
                key = [key];
            }
            return await this._link.bRPop(key.map(item => etc.pre + item), timeout);
        }
        catch {
            return {};
        }
    }

    public async lRange(key: string, start: number, stop: number, etc: types.IConfigKv): Promise<string[]> {
        this.refreshLast();
        try {
            return await this._link.lRange(etc.pre + key, start, stop);
        }
        catch {
            return [];
        }
    }

    public async lLen(key: string, etc: types.IConfigKv): Promise<number> {
        this.refreshLast();
        try {
            return await this._link.lLen(etc.pre + key);
        }
        catch {
            return 0;
        }
    }

}

/**
 * --- 获取 Kv Pool 对象 ---
 * @param etc 配置信息可留空
 */
export function get(ctr: ctr.Ctr, etc?: types.IConfigKv): Pool {
    if (!etc) {
        etc = ctr.getPrototype('_config').kv;
    }
    return new Pool(ctr, etc);
}

/**
 * --- 获取当前连接池中所有连接的信息 ---
 */
export function getConnectionList(): IConnectionInfo[] {
    const list = [];
    for (let i = 0; i < connections.length; ++i) {
        const connection = connections[i];
        const etc = connection.getEtc();
        list.push({
            'id': i,
            'last': connection.getLast(),
            'host': etc.host,
            'port': etc.port,
            'index': etc.index,

            'lost': connection.isLost(),
            'using': connection.isUsing()
        });
    }
    return list;
}

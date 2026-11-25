/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-30 19:25:22
 */

// --- 原生 ---
import * as crypto from 'node:crypto';
import type * as tls from 'node:tls';
// --- 第三方 ---
import * as redis from 'redis';
// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as lText from '#kebab/lib/text.js';
import * as lCore from '#kebab/lib/core.js';
import * as sCtr from '#kebab/sys/ctr.js';

/** --- 相同地址、数据库和凭据共用一次连接初始化 --- */
const connections: IConnectionInfo[] = [];

/** --- 缓存已加载的 Lua 源码与其 SHA-1（LRU 上限 256 条），后续直接走 EVALSHA --- */
const evalShaCache = new Map<string, string>();

/**
 * --- 读取并刷新 Lua 源码的缓存 SHA-1（LRU） ---
 * @param script Lua 源码
 * @returns 已缓存的 40 位 SHA-1，未缓存返回 null
 */
function getCachedScriptSha(script: string): string | null {
    const cached = evalShaCache.get(script);
    if (!cached) {
        return null;
    }
    evalShaCache.delete(script);
    evalShaCache.set(script, cached);
    return cached;
}

/**
 * --- 计算并记录 Lua 源码的 SHA-1 到定长 LRU 缓存 ---
 * @param script Lua 源码
 */
function cacheScriptSha(script: string): void {
    const sha = crypto.createHash('sha1').update(script).digest('hex');
    evalShaCache.delete(script);
    if (evalShaCache.size >= 256) {
        const oldest = evalShaCache.keys().next().value;
        if (oldest !== undefined) {
            evalShaCache.delete(oldest);
        }
    }
    evalShaCache.set(script, sha);
}

/**
 * --- 生成 TLS 配置的缓存区分键，避免不同证书或 servername 误用同一连接 ---
 * @param tlsOpt TLS 配置
 */
function getTlsKey(tlsOpt?: boolean | tls.ConnectionOptions): string {
    if (!tlsOpt) {
        return '';
    }
    if (tlsOpt === true) {
        return '1';
    }
    const keys = Object.keys(tlsOpt).sort();
    const normalized: Record<string, unknown> = {};
    for (const key of keys) {
        const val = (tlsOpt as Record<string, unknown>)[key];
        normalized[key] = Buffer.isBuffer(val) ? val.toString('base64') : val;
    }
    return lText.stringifyJson(normalized);
}

/**
 * --- 解析 CONFIG GET 返回值中的目标配置项 ---
 * @param reply RESP2 数组或键值对象
 * @param key 配置项名
 */
function readConfigValue(reply: unknown, key: string): string | null {
    if (Array.isArray(reply)) {
        for (let i = 0; i + 1 < reply.length; i += 2) {
            if (String(reply[i]).toLowerCase() === key) {
                return String(reply[i + 1]);
            }
        }
        return null;
    }
    if (reply && typeof reply === 'object') {
        const record = reply as Record<string, unknown>;
        if (Object.hasOwn(record, key)) {
            return String(record[key]);
        }
    }
    return null;
}

/**
 * --- 校验非 0 库在 Kvrocks 上是否真实支持多库隔离，防止静默串库 ---
 * @param conn 已建连客户端
 * @param dbIndex 目标数据库编号（> 0）
 */
async function verifyMultiDbSupport(conn: TRedisClient, dbIndex: number): Promise<boolean> {
    let info: unknown;
    try {
        info = await conn.sendCommand(['INFO', 'server']);
    }
    catch {
        // --- 部分受限 Redis 环境禁用了 INFO，按常规 Redis 放行 ---
        return true;
    }
    if (typeof info !== 'string' || !info.includes('kvrocks_version:')) {
        return true;
    }
    // --- 确认是 Kvrocks 后，校验 redis-databases 配置 ---
    try {
        const reply = await conn.sendCommand(['CONFIG', 'GET', 'redis-databases']);
        const raw = readConfigValue(reply, 'redis-databases');
        const count = raw === null ? NaN : Number.parseInt(raw, 10);
        if (Number.isInteger(count)) {
            if (count <= 0 || dbIndex >= count) {
                lCore.display(
                    `[KV] Kvrocks redis-databases=${count} does not support index=${dbIndex}; ` +
                    'enable redis-databases in Kvrocks or set kv.dbPre=true.'
                );
                return false;
            }
            return true;
        }
    }
    catch {
        // --- CONFIG 被禁用时，退化检查 CLIENT INFO 中的 namespace ---
    }
    try {
        const clientInfo = await conn.sendCommand(['CLIENT', 'INFO']);
        if (typeof clientInfo === 'string' && new RegExp(`(?:^|\\s)namespace=db${dbIndex}(?:\\s|$)`).test(clientInfo)) {
            return true;
        }
    }
    catch {
        // --- 忽略，进入安全拒绝 ---
    }
    lCore.display(
        `[KV] Unable to confirm Kvrocks multi-db isolation for index=${dbIndex}; ` +
        'enable redis-databases in Kvrocks or set kv.dbPre=true.'
    );
    return false;
}

/**
 * --- 键值存储操作类（兼容 Redis 与 Kvrocks） ---
 *
 * @example
 * ```ts
 * import * as lKv from '@maiyunnet/kebab/lib/kv.js';
 * const kv = lKv.get(this);
 * await kv.ping();
 * const v = await kv.get('test');
 * const res = await kv.replace('test', 111);
 * ```
 */
export class Kv {

    /** --- 当前的 kv 连接信息 --- */
    private readonly _etc: kebab.IConfigKv;

    /** --- 实际向服务端选择的数据库编号 --- */
    private readonly _db: number;

    /** --- 实际生效的键名前缀（启用 dbPre 且 index > 0 时自动附带 db{index}:） --- */
    private readonly _pre: string;

    public constructor(etc: kebab.IConfigKv) {
        this._etc = etc;
        const index = etc.index || 0;
        const useDbPre = Boolean(etc.dbPre && index > 0);
        this._db = useDbPre ? 0 : index;
        this._pre = useDbPre ? `db${index}:${etc.pre ?? ''}` : (etc.pre ?? '');
    }

    /**
     * --- 获取当前 Kv 实际生效的键名前缀 ---
     * @returns 原生 pipeline / eval 不会自动添加的项目前缀
     */
    public getPre(): string {
        return this._pre;
    }

    /**
     * --- 获取底层官方 redis 客户端实例（用于执行原生扩展命令） ---
     * @returns 连接失败返回 null
     */
    public async getClient(): Promise<TRedisClient | null> {
        return this._getConnection();
    }

    /**
     * --- 获取一个绑定在共享连接上的原生 multi / pipeline 对象（通过 execAsPipeline() 或 exec() 执行，无需关闭） ---
     * @returns 失败则返回 false
     */
    public async pipeline(): Promise<TRedisMulti | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return conn.multi();
        }
        catch {
            return false;
        }
    }

    /**
     * --- 在共享连接上执行一个 Redis Lua 脚本，首次走 EVAL 加载，后续走 EVALSHA 并在 NOSCRIPT 时自动回退 ---
     * @param script Lua 源码
     * @param keys 传给 KEYS 的完整键名，调用方需自行添加项目前缀
     * @param args 传给 ARGV 的参数
     * @returns Redis 原始结果，nil 返回 null，连接或执行失败返回 false
     */
    public async eval(script: string, keys: string[], args: Array<string | Buffer>): Promise<unknown> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const options = {
            'keys': keys,
            'arguments': args,
        };
        const sha = getCachedScriptSha(script);
        if (!sha) {
            try {
                const res = await conn.eval(script, options);
                cacheScriptSha(script);
                return res;
            }
            catch {
                return false;
            }
        }
        try {
            return await conn.evalSha(sha, options);
        }
        catch (err) {
            // --- 服务端重启或清理脚本缓存后返回 NOSCRIPT，回退 EVAL 重新加载 ---
            if (err instanceof Error && err.message.startsWith('NOSCRIPT')) {
                try {
                    return await conn.eval(script, options);
                }
                catch {
                    return false;
                }
            }
            return false;
        }
    }

    /**
     * --- 设定一个值 ---
     * @param key 键
     * @param val 值
     * @param ttl 秒，0 为不限制
     * @param mod 设置模式: 空,nx（key不存在才建立）,xx（key存在才修改）
     */
    public async set(
        key: string,
        val: object | string | number,
        ttl: number = 0,
        mod: '' | 'nx' | 'xx' = ''
    ): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const payload = typeof val === 'string' ? val : lText.stringifyJson(val);
        const options: {
            'expiration'?: { 'type': 'EX'; 'value': number; };
            'condition'?: 'NX' | 'XX';
        } = {};
        if (ttl > 0) {
            options.expiration = {
                'type': 'EX',
                'value': ttl,
            };
        }
        if (mod === 'nx') {
            options.condition = 'NX';
        }
        else if (mod === 'xx') {
            options.condition = 'XX';
        }
        try {
            const res = await conn.set(this._pre + key, payload, options);
            return res === 'OK';
        }
        catch {
            return false;
        }
    }

    /**
     * --- 添加一个值，存在则不变 ---
     * @param key 键
     * @param val 值
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
     * @param key 键
     * @param val 值
     * @param ttl 秒，0 为不限制
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
     * @param key 键
     * @param val 值
     */
    public async append(key: string, val: string): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return (await conn.append(this._pre + key, val)) > 0;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 向已存在的值之前追加数据 ---
     * @param key 键
     * @param val 值
     */
    public async prepend(key: string, val: string): Promise<boolean> {
        const script = `local value = redis.call('GET', KEYS[1])
if not value then
    return 0
end
redis.call('SET', KEYS[1], ARGV[1] .. value, 'KEEPTTL')
return 1`;
        return await this.eval(script, [this._pre + key], [val]) === 1;
    }

    /**
     * --- 检测 key 是否存在 ---
     * @param keys 单个或序列
     */
    public async exists(keys: string | string[]): Promise<number> {
        const list = (typeof keys === 'string' ? [keys] : keys).map(k => this._pre + k);
        if (list.length === 0) {
            return 0;
        }
        const conn = await this._getConnection();
        if (!conn) {
            return 0;
        }
        try {
            return await conn.exists(list);
        }
        catch {
            return 0;
        }
    }

    /**
     * --- 获取字符串 ---
     * @param key 键
     * @returns 字符串 / false / null（即使存入时是 number，这个方法也只会返回字符串）
     */
    public async get(key: string): Promise<string | false | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        try {
            return await conn.get(this._pre + key);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取相应的剩余有效期秒数 ---
     * @param key 键
     */
    public async ttl(key: string): Promise<number | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        try {
            return await conn.ttl(this._pre + key);
        }
        catch {
            return null;
        }
    }

    /**
     * --- 获取相应的剩余有效期毫秒数 ---
     * @param key 键
     */
    public async pttl(key: string): Promise<number | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return null;
        }
        try {
            return await conn.pTTL(this._pre + key);
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
        if (keys.length === 0) {
            return {};
        }
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const list = keys.map(k => this._pre + k);
        const rtn: Record<string, string | null> = {};
        try {
            const values = await conn.mGet(list);
            for (let i = 0; i < keys.length; ++i) {
                rtn[keys[i]] = values[i] ?? null;
            }
        }
        catch {
            return false;
        }
        return rtn;
    }

    /**
     * --- 批量设置键值 ---
     * @param rows key / val 对象
     */
    public async mSet(
        rows: Record<string, string | Buffer>
    ): Promise<boolean> {
        const entries = Object.entries(rows);
        if (entries.length === 0) {
            return true;
        }
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const payload: Array<[string, string | Buffer]> = entries.map(([k, v]) => [this._pre + k, v]);
            await conn.mSet(payload);
            return true;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 读取并解析键中的 JSON ---
     * @param key 键
     * @returns 解析结果，键不存在或未取得连接返回 null，读取异常或解析失败返回 false
     */
    public getJson(key: string): Promise<kebab.Json | false | null>;
    /**
     * --- 读取并解析键中的 JSON ---
     * @typeParam T 预期的结果类型，解析时只检查 JSON 语法
     * @param key 键
     * @returns 解析结果，键不存在或未取得连接返回 null，读取异常或解析失败返回 false
     */
    public getJson<T>(key: string): Promise<T | false | null>;
    public async getJson<T>(key: string): Promise<T | false | null> {
        const v = await this.get(key);
        if (v === null || v === false) {
            return v;
        }
        return lText.parseJson<T>(v);
    }

    /**
     * --- 原子读取并删除键，再解析 JSON ---
     * @param key 键
     * @returns 解析结果，键不存在返回 null，Redis 操作或解析失败返回 false
     */
    public getDelJson(key: string): Promise<kebab.Json | false | null>;
    /**
     * --- 原子读取并删除键，再解析 JSON ---
     * @typeParam T 预期的结果类型，解析时只检查 JSON 语法
     * @param key 键
     * @returns 解析结果，键不存在返回 null，Redis 操作或解析失败返回 false
     */
    public getDelJson<T>(key: string): Promise<T | false | null>;
    public async getDelJson<T>(key: string): Promise<T | false | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const value = await conn.getDel(this._pre + key);
            if (value === null) {
                return null;
            }
            return lText.parseJson<T>(value);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 删除已存在的值 ---
     * @param keys 单个或序列
     */
    public async del(keys: string | string[]): Promise<boolean> {
        const list = (typeof keys === 'string' ? [keys] : keys).map(k => this._pre + k);
        if (list.length === 0) {
            return false;
        }
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return (await conn.del(list)) > 0;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 自增 ---
     * @param key 键
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
                    return await conn.incr(this._pre + key);
                }
                else {
                    return await conn.incrBy(this._pre + key, num);
                }
            }
            else {
                return Number(await conn.incrByFloat(this._pre + key, num));
            }
        }
        catch {
            return false;
        }
    }

    /**
     * --- 自减 ---
     * @param key 键
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
                    return await conn.decr(this._pre + key);
                }
                else {
                    return await conn.decrBy(this._pre + key, num);
                }
            }
            else {
                return Number(await conn.incrByFloat(this._pre + key, -num));
            }
        }
        catch {
            return false;
        }
    }

    /**
     * --- 仅修改过期时间不修改值 ---
     * @param key 键
     * @param ttl 秒
     */
    public async expire(key: string, ttl: number): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return (await conn.expire(this._pre + key, ttl)) === 1;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取服务器上的所有 key 列表 ---
     * @param pattern 匹配模式
     */
    public async keys(pattern: string): Promise<string[] | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const r = await conn.keys(this._pre + pattern);
            const pl = this._pre.length;
            if (pl > 0) {
                return r.map(k => k.slice(pl));
            }
            return r;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 根据条件获取服务器上的 keys（兼容 Redis 数字串游标与 Kvrocks 字符串游标） ---
     * @param cursor 游标，首次传 '0'（或 0）
     * @param pattern 例如 *
     * @param count 获取的条数
     */
    public async scan(
        cursor: string | number = '0',
        pattern: string = '*',
        count: number = 10
    ): Promise<IScanResult | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const r = await conn.scan(String(cursor), {
                'MATCH': this._pre + pattern,
                'COUNT': count,
            });
            const pl = this._pre.length;
            const items = pl > 0 ? r.keys.map(k => k.slice(pl)) : r.keys;
            return {
                'cursor': r.cursor,
                'items': items,
            };
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
     * @param mod 空,nx(field不存在才建立)
     */
    public async hSet(
        key: string,
        field: string,
        val: object | string | number,
        mod: '' | 'nx' = ''
    ): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const payload = typeof val === 'string' ? val : lText.stringifyJson(val);
            if (mod === 'nx') {
                return (await conn.hSetNX(this._pre + key, field, payload)) === 1;
            }
            else {
                await conn.hSet(this._pre + key, field, payload);
                return true;
            }
        }
        catch {
            return false;
        }
    }

    /**
     * --- 批量设置哈希值 ---
     * @param key key 名
     * @param rows field / val 对象
     */
    public async hMSet(
        key: string,
        rows: Record<string, object | string | number>
    ): Promise<boolean> {
        const entries = Object.entries(rows);
        if (entries.length === 0) {
            return true;
        }
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const payload: Record<string, string | number> = {};
            for (const [k, val] of entries) {
                payload[k] = typeof val === 'object' ? lText.stringifyJson(val) : val;
            }
            await conn.hSet(this._pre + key, payload);
            return true;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取哈希值 ---
     * @param key 键
     * @param field 字段
     */
    public async hGet(key: string, field: string): Promise<string | false | null> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const v = await conn.hGet(this._pre + key, field);
            return v ?? null;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 读取并解析哈希字段中的 JSON ---
     * @param key 键
     * @param field 哈希字段
     * @returns 解析结果，字段不存在、JSON 无效或值为 JSON false 时返回 null；读取失败返回 false
     */
    public hGetJson(key: string, field: string): Promise<kebab.Json | false | null>;
    /**
     * --- 读取并解析哈希字段中的 JSON ---
     * @typeParam T 预期的结果类型，解析时只检查 JSON 语法
     * @param key 键
     * @param field 哈希字段
     * @returns 解析结果，字段不存在、JSON 无效或值为 JSON false 时返回 null；读取失败返回 false
     */
    public hGetJson<T>(key: string, field: string): Promise<T | false | null>;
    public async hGetJson<T>(key: string, field: string): Promise<T | false | null> {
        const v = await this.hGet(key, field);
        if (v === false) {
            return false;
        }
        if (v === null) {
            return null;
        }
        const r = lText.parseJson<T>(v);
        return r === false ? null : r;
    }

    /**
     * --- 批量获取哈希值 ---
     * @param key 键
     * @param fields 字段列表
     */
    public async hMGet(key: string, fields: string[]): Promise<Record<string, string | null> | false> {
        if (fields.length === 0) {
            return {};
        }
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const values = await conn.hmGet(this._pre + key, fields);
            const rtn: Record<string, string | null> = {};
            for (let i = 0; i < fields.length; ++i) {
                rtn[fields[i]] = values[i] ?? null;
            }
            return rtn;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 批量获取哈希键值对 ---
     * @param key 键
     */
    public async hGetAll(key: string): Promise<Record<string, string | null> | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.hGetAll(this._pre + key);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 删除哈希键 ---
     * @param key 键
     * @param fields 字段序列
     */
    public async hDel(key: string, fields: string | string[]): Promise<number | false> {
        if (Array.isArray(fields) && fields.length === 0) {
            return 0;
        }
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.hDel(this._pre + key, fields);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 判断哈希字段是否存在 ---
     * @param key 键
     * @param field 字段
     */
    public async hExists(key: string, field: string): Promise<boolean> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return (await conn.hExists(this._pre + key, field)) === 1;
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
                return await conn.hIncrBy(this._pre + key, field, increment);
            }
            else {
                return Number(await conn.hIncrByFloat(this._pre + key, field, increment));
            }
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取哈希所有字段 ---
     * @param key 键
     */
    public async hKeys(key: string): Promise<string[] | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.hKeys(this._pre + key);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 从列表左侧推入元素 ---
     * @param key 键
     * @param values 元素数组
     */
    public async lPush(key: string, values: Array<string | Buffer>): Promise<number | false> {
        if (values.length === 0) {
            return 0;
        }
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.lPush(this._pre + key, values);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 从列表右侧推入元素 ---
     * @param key 键
     * @param values 元素数组
     */
    public async rPush(key: string, values: Array<string | Buffer>): Promise<number | false> {
        if (values.length === 0) {
            return 0;
        }
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.rPush(this._pre + key, values);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 阻塞式在两个列表间移动元素（使用独立连接，避免阻塞共享连接） ---
     * @param sourceKey 源列表键
     * @param destKey 目标列表键
     * @param soo 源端方向
     * @param deo 目标端方向
     * @param timeout 超时秒数，0 为无限等待
     */
    public async bLMove(
        sourceKey: string,
        destKey: string,
        soo: 'LEFT' | 'RIGHT',
        deo: 'LEFT' | 'RIGHT',
        timeout: number
    ): Promise<string | null | false> {
        return this._runBlocking(timeout, async (blocking) => {
            return blocking.blMove(this._pre + sourceKey, this._pre + destKey, soo, deo, timeout);
        });
    }

    /**
     * --- 从列表左侧弹出元素 ---
     * @param key 键
     */
    public async lPop(key: string): Promise<string | null | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.lPop(this._pre + key);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 从列表右侧弹出元素 ---
     * @param key 键
     */
    public async rPop(key: string): Promise<string | null | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.rPop(this._pre + key);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 阻塞式从列表右侧弹出元素（使用独立连接，避免阻塞共享连接） ---
     * @param key 单个或序列键
     * @param timeout 超时秒数，0 为无限等待
     */
    public async bRPop(key: string | string[], timeout: number): Promise<Record<string, string> | false> {
        const list = (typeof key === 'string' ? [key] : key).map(item => this._pre + item);
        if (list.length === 0) {
            return {};
        }
        return this._runBlocking(timeout, async (blocking) => {
            const res = await blocking.brPop(list, timeout);
            if (!res) {
                return {};
            }
            const pl = this._pre.length;
            const outKey = pl > 0 && res.key.startsWith(this._pre) ? res.key.slice(pl) : res.key;
            return {
                [outKey]: res.element,
            };
        });
    }

    /**
     * --- 获取列表指定区间元素 ---
     * @param key 键
     * @param start 起始位置
     * @param stop 结束位置
     */
    public async lRange(key: string, start: number, stop: number): Promise<string[] | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.lRange(this._pre + key, start, stop);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 获取列表长度 ---
     * @param key 键
     */
    public async lLen(key: string): Promise<number | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.lLen(this._pre + key);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 添加有序集合元素（单个元素） ---
     * @param key key 名
     * @param score 分数
     * @param member 成员
     */
    public async zAdd(key: string, score: number, member: string | Buffer): Promise<boolean>;
    /**
     * --- 添加有序集合元素（多个元素，含 INCR 选项） ---
     * @param key key 名
     * @param elements 元素数组
     * @param options 选项（INCR 为 true 时返回新分数，条件未满足时返回 null）
     */
    public async zAdd(
        key: string,
        elements: Array<{ 'score': number; 'member': string | Buffer; }>,
        options: IZAddOptions & { 'INCR': true; }
    ): Promise<number | null | false>;
    /**
     * --- 添加有序集合元素（多个元素） ---
     * @param key key 名
     * @param elements 元素数组
     * @param options 选项
     */
    public async zAdd(
        key: string,
        elements: Array<{ 'score': number; 'member': string | Buffer; }>,
        options?: IZAddOptions
    ): Promise<number | false>;
    /**
     * --- 添加有序集合元素 ---
     */
    public async zAdd(
        key: string,
        scoreOrItems: number | Array<{ 'score': number; 'member': string | Buffer; }>,
        memberOrOptions?: string | Buffer | IZAddOptions
    ): Promise<boolean | number | null | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            if (typeof scoreOrItems === 'number') {
                const count = await conn.zAdd(this._pre + key, {
                    'score': scoreOrItems,
                    'value': memberOrOptions as string | Buffer,
                });
                return count > 0;
            }
            if (scoreOrItems.length === 0) {
                return 0;
            }
            const items = scoreOrItems.map(item => ({
                'score': item.score,
                'value': item.member,
            }));
            const rawOpt = memberOrOptions as IZAddOptions | undefined;
            const opts: {
                'condition'?: 'NX' | 'XX';
                'comparison'?: 'GT' | 'LT';
                'CH'?: boolean;
            } = {};
            if (rawOpt?.condition) {
                opts.condition = rawOpt.condition;
            }
            if (rawOpt?.comparison) {
                opts.comparison = rawOpt.comparison;
            }
            if (rawOpt?.CH) {
                opts.CH = true;
            }
            if (rawOpt?.INCR) {
                return await conn.zAddIncr(this._pre + key, items, opts);
            }
            return await conn.zAdd(this._pre + key, items, opts);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 查询有序集合成员及分数 ---
     * @param key 键
     * @param start 起点
     * @param stop 终点
     * @param options 范围与分页选项
     */
    public async zRangeWithScores(
        key: string,
        start: number | string,
        stop: number | string,
        options?: IZRangeOptions
    ): Promise<Array<{
        'member': string;
        'score': number;
    }> | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            const opts: {
                'BY'?: 'SCORE' | 'LEX';
                'REV'?: boolean;
                'LIMIT'?: { 'offset': number; 'count': number; };
            } = {};
            if (options?.by) {
                opts.BY = options.by;
            }
            if (options?.rev) {
                opts.REV = true;
            }
            if (options?.offset !== undefined && options?.count !== undefined) {
                opts.LIMIT = {
                    'offset': options.offset,
                    'count': options.count,
                };
            }
            const rows = await conn.zRangeWithScores(this._pre + key, start, stop, opts);
            return rows.map(row => ({
                'member': row.value,
                'score': row.score,
            }));
        }
        catch {
            return false;
        }
    }

    /**
     * --- 移除有序集合成员 ---
     * @param key 键
     * @param members 成员列表
     */
    public async zRem(key: string, members: Array<string | Buffer>): Promise<number | false> {
        if (members.length === 0) {
            return 0;
        }
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        try {
            return await conn.zRem(this._pre + key, members);
        }
        catch {
            return false;
        }
    }

    /**
     * --- 在独立副本连接上执行阻塞命令，避免阻塞共享连接和触发默认 5 秒命令超时 ---
     * @param timeout 阻塞超时秒数，0 为无限等待
     * @param fn 实际执行函数
     */
    private async _runBlocking<T>(
        timeout: number,
        fn: (blocking: TRedisClient) => Promise<T>
    ): Promise<T | false> {
        const conn = await this._getConnection();
        if (!conn) {
            return false;
        }
        const blocking = conn.duplicate({
            'commandOptions': {
                'timeout': timeout > 0 ? timeout * 1000 + 5_000 : undefined,
            },
            'socket': {
                ...conn.options?.socket,
                'reconnectStrategy': false,
            },
        });
        blocking.on('error', function(err: Error): void {
            lCore.debug('[KV][_runBlocking][error]', err);
        });
        try {
            await blocking.connect();
            return await fn(blocking);
        }
        catch {
            return false;
        }
        finally {
            blocking.destroy();
        }
    }

    /**
     * --- 从连接池中获取一个符合要求的共享连接 ---
     */
    private async _getConnection(): Promise<TRedisClient | null> {
        const { host, port, user, pwd, tls: tlsOpt } = this._etc;
        const db = this._db;
        const tlsKey = getTlsKey(tlsOpt);
        const cached = connections.find(item =>
            item.host === host && item.port === port && item.index === db &&
            item.user === user && item.pwd === pwd && item.tls === tlsKey
        );
        if (cached) {
            const conn = await cached.ready;
            if (conn?.isOpen) {
                return conn;
            }
            const idx = connections.indexOf(cached);
            if (idx !== -1) {
                connections.splice(idx, 1);
            }
            if (!conn) {
                return null;
            }
        }
        // --- 并发首次建连共用同一次初始化 ---
        const ready = this._connect(host, port, db, user, pwd, tlsOpt).catch(() => null);
        const item: IConnectionInfo = {
            'host': host,
            'port': port,
            'index': db,
            'user': user,
            'pwd': pwd,
            'tls': tlsKey,
            'ready': ready,
        };
        connections.push(item);
        const conn = await ready;
        if (!conn) {
            const idx = connections.indexOf(item);
            if (idx !== -1) {
                connections.splice(idx, 1);
            }
        }
        return conn;
    }

    /**
     * --- 建立共享连接，统一走 RESP2 兼容 Redis 与 Kvrocks，并在非 0 库时校验 Kvrocks 多库隔离 ---
     */
    private async _connect(
        host: string,
        port: number,
        index: number,
        user: string,
        pwd: string,
        tlsOpt?: boolean | tls.ConnectionOptions
    ): Promise<TRedisClient | null> {
        let initialized = false;
        const reconnectStrategy = (retries: number): number | false => {
            // --- 首次建连（含 AUTH / SELECT）失败立即返回，由上层按需重试，避免请求无限挂起 ---
            if (!initialized) {
                return false;
            }
            // --- 已就绪连接断线后自动退避重连，node-redis 会自动重发 AUTH / SELECT ---
            return Math.min(retries * 100, 3_000);
        };
        const conn: TRedisClient = redis.createClient({
            'RESP': 2,
            'disableClientInfo': true,
            'maintNotifications': 'disabled',
            'database': index,
            'username': user || undefined,
            'password': pwd || undefined,
            'socket': tlsOpt
                ? {
                    ...(typeof tlsOpt === 'object' ? tlsOpt : {}),
                    'host': host,
                    'port': port,
                    'tls': true,
                    'reconnectStrategy': reconnectStrategy,
                }
                : {
                    'host': host,
                    'port': port,
                    'reconnectStrategy': reconnectStrategy,
                },
        });
        conn.on('error', function(err: Error): void {
            lCore.debug('[KV][_getConnection][error]', err);
        });
        try {
            await conn.connect();
            if (index > 0 && !await verifyMultiDbSupport(conn, index)) {
                conn.destroy();
                return null;
            }
            initialized = true;
            return conn;
        }
        catch {
            conn.destroy();
            return null;
        }
    }

}

/**
 * --- 获取 Kv 对象 ---
 * @param ctrEtc 控制器或配置信息
 * @param oetc 可用来覆盖 ctr 的部分连接选项
 */
export function get(ctrEtc: sCtr.Ctr | kebab.IConfigKv, oetc?: {
    /** --- 数据库编号（0 起） --- */
    'index'?: number;
    /** --- ACL 用户名（留空则走传统单密码认证） --- */
    'user'?: string;
    /** --- 认证密码或 Kvrocks namespace token --- */
    'pwd'?: string;
    /** --- 业务键名前缀 --- */
    'pre'?: string;
    /** --- 为 true 时将非 0 的 index 折算为键名前缀（如 db1:），不再发 SELECT --- */
    'dbPre'?: boolean;
    /** --- 启用 TLS；传对象时自动开启 TLS 并透传 servername、ca 等参数 --- */
    'tls'?: boolean | tls.ConnectionOptions;
}): Kv {
    const etc = ctrEtc instanceof sCtr.Ctr ? ctrEtc.getPrototype('_config').kv : ctrEtc;
    return new Kv(oetc ? { ...etc, ...oetc } : etc);
}

// --- 类型 ---

/** --- 底层官方 redis 客户端类型（固定 RESP2） --- */
export type TRedisClient = redis.RedisClientType<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    2
>;

/** --- 底层原生 multi / pipeline 类型 --- */
export type TRedisMulti = ReturnType<TRedisClient['multi']>;

/** --- SCAN 分页结果 --- */
export interface IScanResult<T = string> {
    /** --- 下一页游标（'0' 表示结束；兼容 Redis 数字串与 Kvrocks 原生字符串游标） --- */
    'cursor': string;
    /** --- 当前页匹配到的键名列表（已去除项目前缀） --- */
    'items': T[];
}

/** --- ZRANGE 查询选项 --- */
export interface IZRangeOptions {
    /** --- 查询方式：SCORE 按分数范围，LEX 按字典序 --- */
    'by'?: 'SCORE' | 'LEX';
    /** --- 是否倒序返回 --- */
    'rev'?: boolean;
    /** --- 分页偏移量，需与 count 同用 --- */
    'offset'?: number;
    /** --- 分页条数，需与 offset 同用 --- */
    'count'?: number;
}

/** --- ZADD 选项 --- */
export interface IZAddOptions {
    /** --- 写入条件：NX 仅添加不存在的成员，XX 仅更新已存在的成员 --- */
    'condition'?: 'NX' | 'XX';
    /** --- 分数比较条件：GT 仅新分数大于旧分数时更新，LT 仅新分数小于旧分数时更新（不影响新增成员） --- */
    'comparison'?: 'GT' | 'LT';
    /** --- 返回值改为受影响总数（新增 + 分数变化的成员数），默认仅返回新增成员数 --- */
    'CH'?: boolean;
    /** --- 改为在原分数上累加（类似 ZINCRBY，仅支持单个成员），返回更新后的新分数 --- */
    'INCR'?: boolean;
}

/** --- Redis 连接缓存项 --- */
export interface IConnectionInfo {
    /** --- 服务端地址（IP 或域名） --- */
    'host': string;
    /** --- 服务端端口 --- */
    'port': number;
    /** --- 实际选择的数据库编号 --- */
    'index': number;
    /** --- ACL 用户名 --- */
    'user': string;
    /** --- 认证密码或 Kvrocks namespace token --- */
    'pwd': string;
    /** --- TLS 配置区分键（空串表示明文，'1' 表示默认 TLS，其余为对象序列化键） --- */
    'tls': string;
    /** --- 并发请求等待同一次建连，成功返回客户端，失败返回 null --- */
    'ready': Promise<TRedisClient | null>;
}

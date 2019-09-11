// --- 第三方 ---
import * as redis from "@litert/redis";
// --- 库和定义 ---
import * as Sys from "~/lib/Sys";
import * as Time from "~/lib/Time";
import * as abs from "~/abstract";

/** Set 设置项 */
export interface Options {
    /** NX: 不存在才设置，XX：已存在才设置 */
    flag?: "" | "NX" | "XX";
    ex?: number;
    px?: number;
}

/** HSet 设置项 */
export interface HOptions {
    /** NX: 不存在才设置 */
    flag?: "" | "NX";
}

/** --- 连接列表（同一个 host、port、index、auth 只有一个连接） --- */
let _connectionList: Connection[] = [];

// --- 每隔 30 分钟检查一次连接是否正常活动 ---
// --- 连接持续 30 分钟以上没有活跃了，则断开 ---
async function _checkConnection() {
    await Sys.sleep(1800000);
    let stamp = Time.stamp();
    let connLen: number = _connectionList.length;
    for (let i = 0; i < connLen; ++i) {
        if (_connectionList[i].__lastTime < stamp - 1800) {
            _connectionList[i].disconnect();
            _connectionList.splice(i, 1);
            --i;
            continue;
        }
        if (!await _connectionList[i].ping()) {
            _connectionList[i].disconnect();
            _connectionList.splice(i, 1);
            --i;
            continue;
        }
    }
    _checkConnection();
}
_checkConnection();

export class Connection {
    /** 配置信息 */
    public readonly etc: abs.ConfigEtcRedis;
    /** Redis 对象 */
    private _client!: redis.ICommandClient;
    /** 连接最后活跃时间 */
    public __lastTime!: number;

    constructor(etc: abs.ConfigEtcRedis, client: redis.ICommandClient) {
        this.etc = Object.assign({}, etc);
        this._client = client;
        this.__lastTime = Time.stamp();
    }

    /**
     * --- 发送 ping 测试连接是否通畅 ---
     */
    public async ping() {
        this.__lastTime = Time.stamp();
        try {
            let str = await this._client.ping();
            if (str === "PONG") {
                return true;
            } else {
                return false;
            }
        } catch {
            return false;
        }
    }

    /**
     * --- 获取 Redis 的字符串值 ---
     * @param key 要获取的 key
     * @param etc 配置
     */
    public async getString(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            let str = await this._client.get(pre + key);
            if (str === null) {
                return undefined;
            } else {
                return str;
            }
        } catch {
            return undefined;
        }
    }

    /**
     * --- 设置一个字符串 ---
     * @param key 设置的 key
     * @param value 设置的值
     * @param etc 配置
     * @param opt 选项
     */
    public async setString(key: string, value: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, opt: Options = {}) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";

        let ttl = opt.ex !== undefined ? opt.ex : opt.px;
        let rtn: boolean;
        try {
            if (opt.flag === undefined || opt.flag === "") {
                rtn = await this._client.set(pre + key, value, ttl);
            } else {
                if (opt.flag === "NX") {
                    rtn = await this._client.setNX(pre + key, value, ttl);
                } else {
                    rtn = await this._client.replace(pre + key, value, ttl);
                }
            }
            return rtn;
        } catch {
            return false;
        }
    }

    /**
     * --- 获取 JSON 对象值 ---
     * @param key 要获取的 key
     * @param etc 配置
     */
    public async getJson(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis): Promise<{
        [key: string]: any;
    } | undefined> {
        let str = await this.getString(key, etc);
        if (str === undefined) {
            return undefined;
        }
        try {
            let json = JSON.parse(str);
            return json;
        } catch {
            return undefined;
        }
    }

    /**
     * --- 设置 JSON ---
     * @param key 要设置的 key
     * @param value JSON 对象
     * @param etc 配置
     * @param opt 选项
     */
    public async setJson(key: string, value: any, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, opt: Options = {}): Promise<boolean> {
        let json = JSON.stringify(value);
        return await this.setString(key, json, etc, opt);
    }

    /**
     * --- 设置自增 ---
     * @param key 要设置的 key
     * @param etc 配置
     * @param num 要自增的数
     */
    public async incr(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, num: number = 1) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            if (num === 1) {
                return await this._client.incr(pre + key);
            } else {
                return await this._client.incrByFloat(pre + key, num);
            }
        } catch {
            return 0;
        }
    }

    /**
     * --- 设置自减 ---
     * @param key 要设置的 key
     * @param etc 配置
     * @param num 要自增的数
     */
    public async decr(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, num: number = 1) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            if (num === 1) {
                return await this._client.decr(pre + key);
            } else {
                return await this._client.decrByFloat(pre + key, num);
            }
        } catch {
            return 0;
        }
    }

    /**
     * --- 删除一个或多个 key ---
     * @param keys 要删的 key 或 key 数组
     * @param etc 配置
     */
    public async del(keys: string | string[], etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        if (pre !== "") {
            if (typeof keys === "string") {
                keys = pre + keys;
            } else {
                let len = keys.length;
                for (let i = 0; i < len; ++i) {
                    keys[i] = pre + keys[i];
                }
            }
        }
        try {
            return await this._client.del(keys);
        } catch {
            return 0;
        }
    }

    /**
     * --- 检测一个 key 是否存在 ---
     * @param key 要检测的 key
     * @param etc 配置
     */
    public async exists(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis): Promise<boolean> {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            return await this._client.exists(pre + key);
        } catch {
            return false;
        }
    }

    /**
     * --- 设置哈希表 ---
     * @param key 要设置的 key
     * @param field 字段名
     * @param value 字段值
     * @param etc 配置
     */
    public async hset(key: string, field: string, value: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, opt: HOptions = {}) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            if (opt.flag === "NX") {
                return await this._client.hSetNX(pre + key, field, value);
            } else {
                return await this._client.hSet(pre + key, field, value);
            }
        } catch {
            return false;
        }
    }

    /**
     * --- 批量哈希表 ---
     * @param key 要设置的 key
     * @param data 键值对 {}
     * @param etc 配置
     */
    public async hmset(key: string, data: {[key: string]: string | number}, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            await this._client.hMSet(pre + key, data);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * --- 获取哈希字段值 ---
     * @param key 要获取的 key
     * @param field 要获取的字段名
     * @param etc 配置
     */
    public async hget(key: string, field: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis): Promise<string | undefined> {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            let str = await this._client.hGet(pre + key, field);
            if (str === null) {
                return undefined;
            } else {
                return str;
            }
        } catch {
            return undefined;
        }
    }

    /**
     * --- 批量获取哈希表字段 ---
     * @param key 哈希 key
     * @param fields 字段数组
     * @param etc 配置
     */
    public async hmget(key: string, fields: string[], etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            return await this._client.hMGet(pre + key, fields);
        } catch {
            return undefined;
        }
    }

    /**
     * --- 获取一个哈希表的所有数据 ---
     * @param key 哈希 key
     * @param etc 配置
     */
    public async hgetall(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            return await this._client.hGetAll(pre + key);
        } catch {
            return undefined;
        }
    }

    /**
     * --- 删除哈希表的一个或多个字段 ---
     * @param key 哈希 key
     * @param fields 字段或字段数组
     * @param etc 配置
     */
    public async hdel(key: string, fields: string | string[], etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            return await this._client.hDel(pre + key, fields);
        } catch {
            return 0;
        }
    }

    /**
     * --- 检查给定 field 是否存在于哈希表当中 ---
     * @param key 哈希 key
     * @param field 字段
     * @param etc 配置
     */
    public async hexists(key: string, field: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            return await this._client.hExists(pre + key, field);
        } catch {
            return false;
        }
    }

    /**
     * --- 设置哈希自增 ---
     * @param key 哈希 key
     * @param field 字段
     * @param etc 配置
     * @param increment 要自增的数字（可为负）
     */
    public async hincr(key: string, field: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, increment: number = 1) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            return await this._client.hIncrByFloat(pre + key, field, increment);
        } catch {
            return 0;
        }
    }

    /**
     * --- 获取一个哈希的所有字段列表 ---
     * @param key 哈希 key
     * @param etc 配置
     */
    public async hkeys(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis) {
        this.__lastTime = Time.stamp();
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        try {
            return await this._client.hKeys(pre + key);
        } catch {
            return undefined;
        }
    }

    /**
     * --- 断开此连接 ---
     */
    public async disconnect() {
        await this._client.close();
    }
}

/**
 * --- 根据配置信息获取连接对象 ---
 * @param etc 配置信息
 */
export async function getConnection(etc: abs.Nu | abs.Nus | abs.ConfigEtcRedis): Promise<Connection | undefined> {
        let etcRedis: abs.ConfigEtcRedis = Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis : etc;
        for (let conn of _connectionList) {
            if ((conn.etc.host === etcRedis.host) && (conn.etc.port === etcRedis.port) && (conn.etc.index === etcRedis.index) && (conn.etc.auth === etcRedis.auth)) {
                conn.__lastTime = Time.stamp();
                return conn;
            }
        }
        // --- 要新建连接了 ---
        let client = redis.createCommandClient({
            "host": etcRedis.host,
            "port": etcRedis.port
        });
        // --- 开始连接 ---
        try {
            await client.connect();
        } catch {
            return undefined;
        }
        // --- 认证 ---
        if (etcRedis.auth) {
            try {
                await client.auth(etcRedis.auth);
            } catch {
                return undefined;
            }
        }
        await client.select(etcRedis.index);

        // --- 连接成功，加入序列 ---
        let connObject = new Connection(etcRedis, client);
        _connectionList.push(connObject);
        return connObject;
}
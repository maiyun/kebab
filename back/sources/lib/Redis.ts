// --- 第三方 ---
import * as redis from "redis";
// --- 库和定义 ---
import * as Sys from "~/lib/Sys";
import * as abs from "~/abstract";

/** Set 设置项 */
export interface Options {
    /** NX: 不存在才设置，XX：已存在才设置 */
    flag?: "" | "NX" | "XX";
    ex?: number;
    px?: number;
}

/** --- 连接列表（同一个 host、port 只有一个连接） --- */
let _connectionList: Connection[] = [];

// --- 每隔 1 小时检查一次连接是否正常活动 ---
// --- 一般情况下连接异常会触发 error 事件，所以这个检查不用太频繁，主要为了发送个 PING 来保持连接而已 ---
async function _checkConnection() {
    await Sys.sleep(3600000);
    let connLen: number = _connectionList.length;
    for (let i = 0; i < connLen; ++i) {
        if (!_connectionList[i]) {
            continue;
        }
        if (!_connectionList[i].ping()) {
            _connectionList.splice(i, 1);
            --i;
        }
    }
    _checkConnection();
}
_checkConnection();

export class Connection {
    /** 配置信息 */
    public readonly etc: abs.ConfigEtcRedis;
    /** Redis 对象 */
    private _client!: redis.RedisClient;
    /** 内部用的，当发生闪断，则从连接池移除连接 */
    public __disconnected: boolean = false;

    constructor(etc: abs.ConfigEtcRedis, client: redis.RedisClient) {
        this.etc = Object.assign({}, etc);
        this._client = client;
    }

    /**
     * --- 发送 ping 测试连接是否通畅 ---
     */
    public ping(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._client.ping(function(err, str) {
                if (err) {
                    resolve(false);
                } else {
                    if (str === "PONG") {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

    /**
     * --- 获取 Redis 的字符串值 ---
     * @param key 要获取的 key
     */
    public getString(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis): Promise<string | undefined> {
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        return new Promise((resolve, reject) => {
            this._client.get(pre + key, function(err, str) {
                if (err) {
                    resolve(undefined);
                } else {
                    if (str === null) {
                        resolve(undefined);
                    } else {
                        resolve(str);
                    }
                }
            });
        });
    }

    /**
     * --- 设置一个字符串 ---
     * @param key 设置的 key
     * @param value 设置的值
     * @param opt 选项
     */
    public setString(key: string, value: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, opt: Options = {}): Promise<boolean> {
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        return new Promise((resolve, reject) => {
            let callback = function(err: Error | null, str: "OK" | undefined) {
                if (err) {
                    resolve(false);
                } else {
                    if (str === "OK") {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            };
            if (opt.ex !== undefined || opt.px !== undefined) {
                let num: number = opt.ex !== undefined ? opt.ex : <number>opt.px;
                if (opt.flag === undefined || opt.flag === "") {
                    this._client.set(pre + key, value, opt.ex !== undefined ? "EX" : "PX", num, callback);
                } else {
                    this._client.set(pre + key, value, opt.ex !== undefined ? "EX" : "PX", num, opt.flag, callback);
                }
            } else {
                if (opt.flag === undefined || opt.flag === "") {
                    this._client.set(pre + key, value, callback);
                } else {
                    this._client.set(pre + key, value, opt.flag, callback);
                }
            }
        });
    }

    /**
     * --- 获取 JSON 对象值 ---
     * @param key 要获取的 key
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
     * --- 设置 JSON
     * @param key 要设置的 key
     * @param value JSON 对象
     * @param opt 选项
     */
    public async setJson(key: string, value: any, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, opt: Options = {}): Promise<boolean> {
        let json = JSON.stringify(value);
        return await this.setString(key, json, etc, opt);
    }

    /**
     * --- 设置自增 ---
     * @param key 要设置的 key
     * @param num 要自增的数
     */
    public incr(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, num: number = 1): Promise<number> {
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        return new Promise((resolve, reject) => {
            let cb = function(err: Error | null, num: number) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(num);
                }
            };
            if (num === 1) {
                this._client.incr(pre + key, cb);
            } else {
                this._client.incrby(pre + key, num, cb);
            }
        });
    }

    /**
     * --- 设置自减 ---
     * @param key 要设置的 key
     * @param num 要自增的数
     */
    public decr(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis, num: number = 1): Promise<number> {
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        return new Promise((resolve, reject) => {
            let cb = function(err: Error | null, num: number) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(num);
                }
            };
            if (num === 1) {
                this._client.decr(pre + key, cb);
            } else {
                this._client.decrby(pre + key, num, cb);
            }
        });
    }

    /**
     * --- 删除一个或多个 key ---
     * @param keys 要删的 key 或 key 数组
     */
    public del(keys: string | string[], etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis): Promise<number> {
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
        return new Promise((resolve, reject) => {
            this._client.del(keys, function(err, num) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(num);
                }
            });
        });
    }

    /**
     * --- 检测一个 key 是否存在 ---
     * @param key 要检测的 key
     */
    public exists(key: string, etc?: abs.Nu | abs.Nus | abs.ConfigEtcRedis): Promise<boolean> {
        let pre = etc ? (Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis.pre : etc.pre) : "";
        return new Promise((resolve, reject) => {
            this._client.exists(pre + key, function(err, num) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(num === 1 ? true : false);
                }
            });
        });
    }
}

/**
 * --- 根据配置信息获取连接对象 ---
 * @param etc 配置信息
 */
export async function getConnection(etc: abs.Nu | abs.Nus | abs.ConfigEtcRedis): Promise<Connection | undefined> {
    return new Promise(async function(resolve, reject) {
        let etcRedis: abs.ConfigEtcRedis = Sys.isNu(etc) || Sys.isNus(etc) ? etc.config.etc.redis : etc;
        for (let conn of _connectionList) {
            if ((conn.etc.host === etcRedis.host) && (conn.etc.port === etcRedis.port) && (conn.etc.index === etcRedis.index) && (conn.etc.auth === etcRedis.auth)) {
                resolve(conn);
                return;
            }
        }
        // --- 要新建连接了 ---
        let client = redis.createClient({
            host: etcRedis.host,
            port: etcRedis.port,
            auth_pass: etcRedis.auth || undefined,
            db: etcRedis.index
        });
        // --- 连接失败的回调 ---
        let connectFailed = function(err: any) {
            resolve(undefined);
            return;
        };
        client.on("connect", function() {
            // --- 连接成功，加入序列 ---
            let connObject = new Connection(etcRedis, client);
            _connectionList.push(connObject);
            client.off("error", connectFailed);
            // --- 绑定闪断回调 ---
            client.on("error", function() {
                connObject.__disconnected = true;
                _clearDisconnected();
            });
            resolve(connObject);
        }).on("error", connectFailed);
    });
}

/**
 * --- 清除异常连接 ---
 */
function _clearDisconnected() {
    let connLen: number = _connectionList.length;
    for (let i = 0; i < connLen; ++i) {
        if (!_connectionList[i]) {
            continue;
        }
        if (_connectionList[i].__disconnected === true) {
            _connectionList.splice(i, 1);
            --i;
        }
    }
}
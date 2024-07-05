/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2022-09-24 15:23:25
 * Last: 2022-09-24 15:23:25, 2022-9-26 12:37:01, 2022-12-29 00:11:16
 */

/*
CREATE TABLE IF NOT EXISTS `scan` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `token` char (32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    `data` text NOT NULL,
    `time_update` bigint NOT NULL,
    `time_add` bigint NOT NULL,
    `time_exp` bigint NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `token` (`token`) USING btree
    KEY `time_update` (`time_update`),
    KEY `time_exp` (`time_exp`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
*/
import * as lCore from '~/lib/core';
import * as lDb from '~/lib/db';
import * as lKv from '~/lib/kv';
import * as lSql from '~/lib/sql';
import * as lTime from '~/lib/time';
import * as lText from '~/lib/text';
import * as sCtr from '~/sys/ctr';

/** --- Scan 设置的选项 --- */
export interface IOptions {
    'ttl'?: number;
    'sqlPre'?: sCtr.Ctr | string;
    'name'?: string;
}

/** --- scanned 函数的选项 --- */
export interface IStaticOptions {
    'sqlPre'?: sCtr.Ctr | string;
    'name'?: string;
}

export class Scan {

    private readonly _link: lDb.Pool | lKv.Pool;

    private readonly _sql: lSql.Sql | null = null;

    /** --- 表名或者 kv 里 key 的前缀 --- */
    private readonly _name: string = 'scan';

    private _token: string | null = null;

    /** --- 有效期，默认 5 分钟 --- */
    private _ttl = 60 * 5;

    public constructor(link: lDb.Pool | lKv.Pool, token?: string, opt: IOptions = {}) {
        if (opt.ttl !== undefined) {
            this._ttl = opt.ttl;
        }
        if (opt.name) {
            this._name = opt.name;
        }
        this._link = link;
        if (link instanceof lDb.Pool) {
            this._sql = lSql.get(opt.sqlPre);
        }
        if (token) {
            this._token = token;
        }
    }

    /** --- 二维码剩余有效时间 --- */
    private _timeLeft: number | null = null;

    /**
     * --- 生成二维码处的轮询，检查是否被扫码、被录入数据 ---
     * @returns -3 系统错误 -2 token 不存在或已过期 -1 无操作, 0 已扫码, 其他返回为存的数据并结束轮询
     */
    public async poll(): Promise<any> {
        if (!this._token) {
            return -3;
        }
        const time = lTime.stamp();
        if (this._link instanceof lDb.Pool) {
            // --- Db ---
            this._sql!.select('*', this._name).where([
                { 'token': this._token },
                ['time_exp', '>', time]
            ]);
            const r = await this._link.query(this._sql!.getSql(), this._sql!.getData());
            if (r.error) {
                // --- 出错 ---
                return -3;
            }
            const data = r.rows?.[0];
            if (!data) {
                // --- 不存在或过期 ---
                return -2;
            }
            // --- 存在，判断是否被扫码，以及是否被写入数据 ---
            this._timeLeft = data['time_exp'] - time;
            if (data['data'] !== '') {
                // --- 已经写入数据了，删除数据库条目并返回写入的数据内容 ---
                this._sql!.delete(this._name).where({
                    'id': data['id']
                });
                const r = lText.parseJson(data['data']);
                return r === false ? -3 : r;
            }
            else if (data['time_update'] > 0) {
                // --- 已被扫描 ---
                return 0;
            }
            else {
                // --- 未扫描 ---
                return -1;
            }
        }
        else {
            // --- Kv ---
            const data = await this._link.getJson('scan-' + this._name + '_' + this._token);
            if (data === null) {
                // --- 不存在或过期 ---
                return -2;
            }
            const ttl = await this._link.ttl('scan-' + this._name + '_' + this._token);
            if (ttl === null) {
                return -3;
            }
            this._timeLeft = ttl;
            if (data['data'] !== null) {
                // --- 已经写入数据了，删除数据库条目并返回写入的数据内容 ---
                await this._link.del('scan-' + this._name + '_' + this._token);
                return data;
            }
            else if (data['time_update'] > 0) {
                // --- 已被扫描 ---
                return 0;
            }
            else {
                // --- 未扫描 ---
                return -1;
            }
        }
    }

    /**
     * --- 创建 token，直接应用到本类 ---
     */
    public async createToken(): Promise<boolean> {
        await this._gc();
        const time = lTime.stamp();
        let count = 0;
        while (true) {
            if (count === 5) {
                return false;
            }
            this._token = lCore.random(32, lCore.RANDOM_LUN);
            if (this._link instanceof lDb.Pool) {
                // --- Db ---
                this._sql!.insert(this._name).values({
                    'token': this._token,
                    'data': '',
                    'time_update': '0',
                    'time_add': time,
                    'time_exp': time + this._ttl
                });
                const r = await this._link.execute(this._sql!.getSql(), this._sql!.getData());
                if (r.error) {
                    if (r.error.errno !== 1062) {
                        return false;
                    }
                }
                else {
                    break;
                }
            }
            else {
                // --- Kv ---
                if (await this._link.set('scan-' + this._name + '_' + this._token, {
                    'time_update': 0,
                    'data': null
                }, this._ttl, 'nx')) {
                    break;
                }
            }
            ++count;
        }
        return true;
    }

    /**
     * --- 获取当前 token ---
     */
    public getToken(): string | null {
        return this._token;
    }

    /**
     * --- 设置有效期，设置后的新 token 被创建有效 ---
     * @param ttl
     */
    public setTTL(ttl: number): void {
        this._ttl = ttl;
    }

    /**
     * --- 获取设置的有效期 ---
     */
    public getTTL(): number {
        return this._ttl;
    }

    /**
     * --- 获取当前 token 可扫剩余有效期 ---
     */
    public getTimeLeft(): number | null {
        return this._timeLeft;
    }

    /**
     * --- 根据情况清空 Db 状态下的 scan 表垃圾数据 ---
     */
    private async _gc(): Promise<void> {
        if (this._link instanceof lKv.Pool) {
            return;
        }
        if (lCore.rand(0, 10) !== 5) {
            return;
        }
        this._sql!.delete(this._name).where([
            ['time_exp', '<', lTime.stamp()]
        ]);
        await this._link.execute(this._sql!.getSql(), this._sql!.getData());
    }

}

/**
 * -- 创建 Scan 对象 ---
 * @param link
 * @param token Token
 * @param opt
 */
export async function get(link: lDb.Pool | lKv.Pool, token?: string, opt: IOptions = {}): Promise<Scan> {
    const scan = new Scan(link, token, opt);
    if (!token) {
        await scan.createToken();
    }
    return scan;
}

/**
 * --- 对 token 执行访问操作，通常用户扫码后展示的网页所调用，代表已扫码 ---
 * @param link
 * @patam token 必填
 * @param opt
 */
export async function scanned(
    link: lDb.Pool | lKv.Pool,
    token: string,
    opt: IStaticOptions = {}
): Promise<boolean> {
    const time = lTime.stamp();
    const name = opt.name ?? 'scan';
    if (link instanceof lDb.Pool) {
        // --- Db ---
        const sql = lSql.get(opt.sqlPre);
        sql.update(name, {
            'time_update': time
        }).where([
            {
                'token': token,
                'time_update': '0'
            },
            ['time_exp', '>', time]
        ]);
        const r = await link.execute(sql.getSql(), sql.getData());
        if (r.error) {
            return false;
        }
        if (r.packet?.affectedRows && r.packet.affectedRows > 0) {
            return true;
        }
    }
    else {
        // --- Kv ---
        const ldata = await link.getJson('scan-' + name + '_' + token);
        if (ldata === null) {
            return false;
        }
        if (ldata['time_update'] > 0) {
            // --- 已经被扫码过了 ---
            return false;
        }
        ldata['time_update'] = time;
        const ttl = await link.ttl('scan-' + name + '_' + token);
        if (ttl === null) {
            return false;
        }
        return link.set('scan-' + name + '_' + token, ldata, ttl + 1, 'xx');
    }
    return false;
}

/**
 * --- 将数据写入 token，通常在客户的逻辑下去写，服务器会 poll 到 ---
 * @param link
 * @param token
 * @param data
 * @param opt
 */
export async function setData(
    link: lDb.Pool | lKv.Pool,
    token: string,
    data: Record<string, any> | string | number,
    opt: IStaticOptions = {}
): Promise<boolean> {
    if (typeof data === 'number' && Number.isInteger(data)) {
        if (data >= -3 && data <= 1) {
            return false;
        }
    }
    const time = lTime.stamp();
    const name = opt.name ?? 'scan';
    if (link instanceof lDb.Pool) {
        // --- Db ---
        const sql = lSql.get(opt.sqlPre);
        sql.update(name, {
            'data': lText.stringifyJson(data)
        }).where([
            {
                'token': token,
            },
            ['time_update', '>', '0'],
            ['time_exp', '>', time]
        ]);
        const r = await link.execute(sql.getSql(), sql.getData());
        if (r.error) {
            return false;
        }
        if (r.packet?.affectedRows && r.packet?.affectedRows > 0) {
            return true;
        }
    }
    else {
        // --- Kv ---
        const ldata = await link.getJson('scan-' + name + '_' + token);
        if (ldata === null) {
            return false;
        }
        if (ldata['time_update'] === 0) {
            // --- 还未被扫码，无法操作 ---
            return false;
        }
        const ttl = await link.ttl('scan-' + name + '_' + token);
        if (ttl === null) {
            return false;
        }
        ldata['data'] = data;
        return link.set('scan-' + name + '_' + token, ldata, ttl + 1, 'xx');
    }
    return false;
}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-5 22:01:40
 * Last: 2020-3-30 00:11:15, 2022-12-29 00:10:28
 */

/*
 * --- Mysql ---
CREATE TABLE `session` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` char(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `data` text NOT NULL,
  `time_update` bigint NOT NULL,
  `time_add` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `time_update` (`time_update`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
*/

// --- 库和定义 ---
import * as core from '~/lib/core';
import * as time from '~/lib/time';
import * as db from '~/lib/db';
import * as kv from '~/lib/kv';
import * as sql from '~/lib/sql';
import * as ctr from '~/sys/ctr';

export interface IOptions {
    'name'?: string;
    'ttl'?: number;
    'ssl'?: boolean;
    'sqlPre'?: string;
}

export class Session {

    /** --- 数据库操作对象 --- */
    private _link!: db.Pool | kv.Pool;

    /** --- Sql 对象 ---  */
    private _sql!: sql.Sql;

    /** --- session 在前端或 Kv 中储存的名前缀 --- */
    private _name!: string;

    /** --- 当前 Session 的 token --- */
    private _token: string = '';

    /** --- Session 有效期 --- */
    private _ttl: number = 0;

    /** --- ctr 对象 --- */
    private _ctr!: ctr.Ctr;

    /**
     * --- 初始化函数，相当于 construct ---
     * @param ctr 模型实例
     * @param link Kv 或 Db 实例
     * @param auth 设为 true 则优先从头 Authorization 或 post _auth 值读取 token
     * @param opt 选项
     */
    public async init(
        ctr: ctr.Ctr,
        link: db.Pool | kv.Pool,
        auth: boolean = false,
        opt: IOptions = {}
    ): Promise<boolean> {
        const config = ctr.getPrototype('_config');
        const ssl = opt.ssl ?? config.session.ssl;
        const pre = opt.sqlPre ?? null;
        this._name = opt.name ?? config.session.name;
        this._ttl = opt.ttl ?? config.session.ttl;
        const tim: number = time.stamp();
        this._ctr = ctr;

        if (auth) {
            const a = ctr.getAuthorization();
            if (a && typeof a !== 'string' && (a.user === 'token')) {
                this._token = a.pwd;
            }
        }
        const cookie = ctr.getPrototype('_cookie');
        if ((this._token === '') && cookie[this._name]) {
            this._token = cookie[this._name];
        }

        this._link = link;
        if (link instanceof db.Pool) {
            this._sql = sql.get(ctr, pre ? pre : undefined);
            await this._gc();    // --- 执行 gc ---
        }

        // --- 初始化 Session 数组 ---
        let session: Record<string, any> = {};
        let needInsert: boolean = false;
        // --- 有 token 则查看 token 的信息是否存在
        if (this._token !== '') {
            // --- 如果启用了内存加速则在内存找 ---
            if (this._link instanceof kv.Pool) {
                // --- Kv ---
                let data;
                if ((data = await this._link.getJson(this._name + '_' + this._token)) === null) {
                    needInsert = true;
                }
                else {
                    session = data;
                }
            }
            else {
                // --- 数据库 ---
                this._sql.select('*', 'session').where([
                    ['time_update', '>=', tim - this._ttl],
                    { 'token': this._token }
                ]);
                const data = await this._link.query(this._sql.getSql(), this._sql.getData());
                if (data.rows?.[0]) {
                    session = JSON.parse(data.rows[0].data);
                }
                else {
                    needInsert = true;
                }
            }
            ctr.setPrototype('_session', session);
        }
        else {
            // --- 全新的机子 ---
            needInsert = true;
        }
        // --- 本来就该添加个新 Session ---
        // --- 内存和数据库里没找到的也该添加个新 Session ---
        // --- 数据库的 Session 已经过期加新 Session ---
        // --- 如果不存在不允许加新则返回错误 ---
        if (needInsert) {
            if (this._link instanceof kv.Pool) {
                let count = 0;
                do {
                    if (count === 5) {
                        return false;
                    }
                    this._token = core.random(16, core.RANDOM_LUN);
                    ++count;
                } while (!await this._link.set(this._name + '_' + this._token, [], this._ttl, 'nx'));
            }
            else {
                let count = 0;
                while (true) {
                    if (count === 5) {
                        return false;
                    }
                    this._token = core.random(16, core.RANDOM_LUN);
                    this._sql.insert('session').values({
                        'token': this._token,
                        'data': JSON.stringify([]),
                        'time_update': tim,
                        'time_add': tim
                    });
                    ++count;
                    const r = await this._link.execute(this._sql.getSql(), this._sql.getData());
                    if (r.error) {
                        if (r.error.errno !== 1062) {
                            return false;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }

        core.setCookie(ctr, this._name, this._token, {
            'ttl': this._ttl,
            'ssl': ssl
        });

        return true;
    }

    /**
     * --- 获取当前的 token 值 ---
     */
    public getToken(): string {
        return this._token;
    }

    /**
     * --- 获取当前的 cookie 的 name 值 ---
     */
    public getName(): string {
        return this._name;
    }

    /**
     * --- 页面整体结束时，要写入到 Kv 或 数据库 ---
     */
    public async update(): Promise<void> {
        if (this._link instanceof kv.Pool) {
            await this._link.set(this._name + '_' + this._token, this._ctr.getPrototype('_session'), this._ttl);
        }
        else {
            this._sql.update('session', [{
                'data': JSON.stringify(this._ctr.getPrototype('_session')),
                'time_update': time.stamp()
            }]).where([{
                'token': this._token
            }]);
            await this._link.execute(this._sql.getSql(), this._sql.getData());
        }
    }

    /**
     * --- 根据情况清空 Db 状态下的 session 表垃圾数据 ---
     * --- 仅能在 Db 模式执行，非 Db 模式则等于没运行 ---
     */
    private async _gc(): Promise<void> {
        if (!(this._link instanceof db.Pool)) {
            return;
        }
        if (core.rand(0, 20) !== 10) {
            return;
        }
        this._sql.delete('session').where([
            ['time_update', '<', time.stamp() - this._ttl]
        ]);
        await this._link.execute(this._sql.getSql(), this._sql.getData());
    }

}

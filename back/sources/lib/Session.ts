// --- 库和定义 ---
import * as Mysql from "~/lib/Mysql";
import * as Redis from "~/lib/Redis";
import * as Time from "~/lib/Time";
import * as Text from "~/lib/Text";
import * as Sql from "~/lib/Sql";
import * as Sys from "~/lib/Sys";
import * as abs from "~/abstract";

/**
 * --- GC ---
 * @param nu Nu 对象
 * @param conn 数据库对象
 */
async function _gc(nu: abs.Nu | abs.Nus, conn: Mysql.Pool | Mysql.Connection, etc?: SessionEtc) {
    if (Text.rand(0, 20) === 10) {
        let exp = etc && etc.exp ? etc.exp : nu.config.etc.session.exp;
        let sql = Sql.get(nu);
        sql.delete("session").where([
            ["time_update", "<", Time.stamp() - exp]
        ]);
        await conn.execute(sql.getSql(), sql.getData());
        sql.release();
    }
}

/**
 * --- [内部方法] 页面执行结束后执行的（由 Router 执行） ---
 * @param nu Nu 对象
 */
export async function __update(nu: abs.Nu) {
    // --- 写入内存或数据库 ---
    if (nu.sessionConfig.conn instanceof Redis.Connection) {
        await nu.sessionConfig.conn.setJson("se_" + nu.sessionConfig.token, nu.session, {
            ex: nu.sessionConfig.etc && nu.sessionConfig.etc.exp ? nu.sessionConfig.etc.exp : nu.config.etc.session.exp
        });
    } else {
        let sql = Sql.get(nu);
        sql.update("session", [{
            "data": JSON.stringify(nu.session),
            "time_update": Time.stamp()
        }]).where([{
            "token": nu.sessionConfig.token
        }]);
        await nu.sessionConfig.conn.execute(sql.getSql(), sql.getData());
        sql.release();
    }
}

export interface SessionEtc {
    "name"?: string;
    "exp"?: number;
}

/**
 * --- 开启 Session ---
 * @param nu Nu 对象
 * @param conn 数据库连接池/连接/Redis连接
 */
export async function start(nu: abs.Nu | abs.Nus, conn: Mysql.Pool | Mysql.Connection | Redis.Connection, etc?: SessionEtc) {
    let exp = etc && etc.exp ? etc.exp : nu.config.etc.session.exp;
    let name = etc && etc.name ? etc.name : nu.config.etc.session.name;

    let token = nu.cookie[name];

    // --- 初始化 Session 数组 ---
    nu.session = {};
    let needInsert = false;

    // --- 执行 GC ---
    if (!(conn instanceof Redis.Connection)) {
        await _gc(nu, conn, etc);
    }

    if (token !== undefined) {
        // --- 如果启用了内存加速则在内存找 ---
        if (conn instanceof Redis.Connection) {
            // --- Redis ---
            let data = await conn.getJson("se_" + token);
            if (data === undefined) {
                needInsert = true;
            } else {
                nu.session = data;
            }
        } else {
            // --- Mysql ---
            let sql = Sql.get(nu);
            sql.select("*", "session").where([
                ["time_update", ">=", Time.stamp() - exp],
                {
                    "token": token
                }
            ]);
            let [rows] = await conn.query(sql.getSql(), sql.getData());
            sql.release();
            if (rows[0]) {
                nu.session = JSON.parse(rows[0].data);
            } else {
                needInsert = true;
            }
        }
    } else {
        needInsert = true;
    }

    if (needInsert) {
        if (conn instanceof Redis.Connection) {
            do {
                token = Text.random(16, Text.RANDOM_LUN);
            } while (!await conn.setJson("se_" + token, {}, {flag: "NX", ex: exp}));
        } else {
            let sql = Sql.get(nu);
            let stamp = Time.stamp();
            do {
                token = Text.random(16, Text.RANDOM_LUN);
                sql.insert("session", {
                    "token": token,
                    "data": JSON.stringify({}),
                    "time_update": stamp,
                    "time_add": stamp
                }); // --- 不用使用 onDuplicate，因为 token 已经重新随机了 ---
            } while (!await conn.execute(sql.getSql(), sql.getData()));
            sql.release();
        }
    }

    if (Sys.isNu(nu)) {
        Sys.cookie(nu, name, token, {
            maxAge: exp,
            path: "/"
        });
    }

    nu.sessionConfig.token = token;
    nu.sessionConfig.conn = conn;
    nu.sessionConfig.etc = etc;
}
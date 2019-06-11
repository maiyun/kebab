// --- 库和定义 ---
import * as Net from "~/lib/Net";
import * as Sys from "~/lib/Sys";
import * as Mysql from "~/lib/Mysql";
import * as Sql from "~/lib/Sql";
import * as Text from "~/lib/Text";
import * as Crypto from "~/lib/Crypto";
import * as Redis from "~/lib/Redis";
import * as Session from "~/lib/Session";
import * as Captcha from "~/lib/Captcha";
import * as Ssh from "~/lib/Ssh";
import * as Time from "~/lib/Time";
import * as abs from "~/abstract";
import * as Const from "~/const";
// --- 模型 ---
import Mod from "~/sys/Mod";
import MSession from "../mod/Session";


export function index(nu: abs.Nu) {
    let echo: string[] = [
        "Hello world! Welcome to use Nuttom " + nu.const.VER,

        "<br><br>URI: " + nu.const.URI + ".",
        "<br>HTTPS: true.",
        "<br>HTTP_BASE: " + nu.const.HTTP_BASE,
        "<br>Node Verison: " + process.version,

        `<br><br><b style="color: red;">Tips: The file can be deleted.</b>`,

        "<br><br><b>Route (config.ts):</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}article/123">View "article/123"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}article/456">View "article/456"</a>`,

        "<br><br><b>Automatic route:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}__Nuttom__">View "__Nuttom__"</a>`,

        "<br><br><b>Query string:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/qs?a=1&b=2">View "test/qs?a=1&b=2"</a>`,

        "<br><br><b>Return json:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/json?type=1">View "test/json?type=1"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/json?type=2">View "test/json?type=2"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/json?type=3">View "test/json?type=3"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/json?type=4">View "test/json?type=4"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/json?type=5">View "test/json?type=5"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/json?type=6">View "test/json?type=6"</a>`,

        "<br><br><b>Library test:</b>",

        "<br><br><b>Net:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/net">View "test/net"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/netPost">View "test/netPost"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/netUpload">View "test/netUpload"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/netCookie">View "test/netCookie"</a>`,

        `<br><br><b>Mysql:</b>`,
        `<br><br><a href="${nu.const.HTTP_BASE}test/mysql">View "test/mysql"</a>`,

        `<br><br><b>Mod:</b>`,
        `<br><br><a href="${nu.const.HTTP_BASE}test/mod">View "test/mod"</a>`,

        "<br><br><b>Sql:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/sql?type=insert">View "test/sql?type=insert"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/sql?type=select">View "test/sql?type=select"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/sql?type=update">View "test/sql?type=update"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/sql?type=delete">View "test/sql?type=delete"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/sql?type=where">View "test/sql?type=where"</a>`,

        "<br><br><b>Text:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/text">View "test/text"</a>`,

        "<br><br><b>Crypto:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/crypto">View "test/crypto"</a>`,

        "<br><br><b>Redis:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/redis">View "test/redis"</a>`,

        "<br><br><b>Session:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/session_mysql">View "test/session_mysql"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/session_redis">View "test/session_redis"</a>`,

        "<br><br><b>Captcha:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/captcha_fastbuild">View "test/captcha_fastbuild"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/captcha_base64">View "test/captcha_base64"</a>`,

        "<br><br><b>Ssh:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/ssh_sftp">View "test/ssh_sftp"</a>`,

        "<br><br><b>System:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/reload">View "reload"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/restart">View "restart"</a>`
    ];
    echo.push("<br><br>" + _getEnd(nu));

    return echo.join("");
}

export function article(nu: abs.Nu) {
    return "Article ID: " + nu.param[0] + "<br><br>" + _getEnd(nu);
}

export function qs(nu: abs.Nu) {
    let echo: string[] = [
        `nu.get: <br><br>`,
        JSON.stringify(nu.get)
    ];
    return echo.join("") + "<br><br>" + _getEnd(nu);
}

export function json(nu: abs.Nu) {
    switch (nu.get.type) {
        case "1":
            return [0];
        case "2":
            return [0, "Error message."];
        case "3":
            return [0, {"line": "2"}];
        case "4":
            return [1, "Successful!"];
        case "5":
            return [1, {"list": [{"id": "0"}, {"id": "1"}, {"id": "2"}], "total": "3"}];
        case "6":
            return {"oh": "yeah", "sb": "is me"};
        default:
            return [];
    }
}

export async function net(nu: abs.Nu) {
    let res = await Net.get("https://cdn.jsdelivr.net/npm/deskrt/package.json");
    let echo: string[] = [
        `Net.get("https://cdn.jsdelivr.net/npm/deskrt/package.json");<br><br>`
    ];
    if (res) {
        echo = echo.concat([
            "httpVersion: " + res.httpVersion + "<br><br>",
            "headers:",
            "<pre>",
            JSON.stringify(res.headers, null, 2),
            "</pre>",
            "content:" +
            "<pre>",
            (await res.readContent()).toString(),
            "</pre>"
        ]);
    } else {
        echo.push("Error.");
    }

    return echo.join("") + _getEnd(nu);
}

export async function netPost(nu: abs.Nu) {
    let res = await Net.post(nu.const.HTTP_PATH + "test/netPost1", {a: "1", b: "2", c: ["1", "2", "3"]});
    let echo: string[] = [
        `Remote Upload:<br><br>`,
        `await Net.post(nu.const.HTTP_PATH + "test/netPost1", {a: "1", b: "2", c: ["1", "2", "3"]})`,
        "<pre>"
    ];
    if (res) {
        echo.push((await res.readContent()).toString());
        res.release();
    } else {
        echo.push("Error.");
    }

    return echo.join("") + "</pre>" + _getEnd(nu);
}
export async function netPost1(nu: abs.Nu) {
    return JSON.stringify(nu.post);
}

export async function netUpload(nu: abs.Nu) {
    let res = await Net.post(nu.const.HTTP_PATH + "test/netUpload1", {a: "1", "file": "@" + Const.LIB_PATH + "Net/cacert.pem", "multiple": ["1", "@" + Const.LIB_PATH + "Zlib.js"]});
    let echo: string[] = [
        `Remote Upload:<br><br>`,
        `await Net.post(nu.const.HTTP_PATH + "test/netUpload1", {a: "1", "file": "@${Const.LIB_PATH}Net/cacert.pem", "multiple": ["1", "@${Const.LIB_PATH}Zlib.js"]})`,
        "<pre>"
    ];
    if (res) {
        echo.push((await res.readContent()).toString());
        res.release();
    } else {
        echo.push("Error.");
    }

    return echo.join("") + "</pre>" + _getEnd(nu);
}
export async function netUpload1(nu: abs.Nu) {
    return JSON.stringify(nu.post);
}

export async function netCookie(nu: abs.Nu) {
    let cookie: Net.NetCookie = {};
    let res = await Net.get(nu.const.HTTP_PATH + "test/netCookie1", {cookie: cookie});
    let echo: string[] = [
        `let cookie: Net.NetCookie = {};<br>`,
        `let res = await Net.get("${nu.const.HTTP_PATH}test/netCookie1", {cookie: cookie});`
    ];
    if (!res) {
        echo.push("<pre>Error.</pre>");
        return echo.join("") + _getEnd(nu);
    }

    echo = echo.concat([
        `<br>JSON.stringify(res.headers, null, 2):`,
        `<pre>${JSON.stringify(res.headers, null, 2)}</pre>`,
        `await res.readContent():`,
        `<pre>${await res.readContent()}</pre>`,

        `JSON.stringify(cookie, null, 2):`,
        `<pre>${JSON.stringify(cookie, null, 2)}</pre>`
    ]);
    res.release();

    res = await Net.get(nu.const.HTTP_PATH + "test/netCookie2", {cookie: cookie});
    echo.push(`res = await Net.get("${nu.const.HTTP_PATH}test/netCookie2", {cookie: cookie});`);
    if (!res) {
        echo.push("<pre>Error.</pre>");
        return echo.join("") + _getEnd(nu);
    }

    echo = echo.concat([
        `<br>await res.readContent():`,
        `<pre>${await res.readContent()}</pre>`
    ]);
    res.release();

    return echo.join("") + _getEnd(nu);
}
export async function netCookie1(nu: abs.Nu) {
    Sys.cookie(nu, "test1", "123", {maxAge: 10, secure: false});
    Sys.cookie(nu, "test2", "456", {maxAge: 20, path: "/", domain: "baidu.com", secure: false});
    Sys.cookie(nu, "test3", "789", {maxAge: 30, path: "/", domain: nu.const.HTTP_HOST, secure: false});
    Sys.cookie(nu, "test4", "012", {maxAge: 40, path: "/ok/", secure: false});
    Sys.cookie(nu, "test5", "345", {maxAge: 10, secure: true});

    return [
        `Sys.cookie(nu, "test1", "123", {maxAge: 10, secure: false});<br>`,
        `Sys.cookie(nu, "test2", "456", {maxAge: 20, path: "/", domain: "baidu.com", secure: false});<br>`,
        `Sys.cookie(nu, "test3", "789", {maxAge: 30, path: "/", domain: "${nu.const.HTTP_HOST}", secure: false});<br>`,
        `Sys.cookie(nu, "test4", "012", {maxAge: 40, path: "/ok/", secure: false});<br>`,
        `Sys.cookie(nu, "test5", "345", {maxAge: 10, secure: true});<br>`,
    ].join("") + _getEnd(nu);
}
export async function netCookie2(nu: abs.Nu) {
    return `JSON.stringify(nu.cookie, null, 2):<br><br>${JSON.stringify(nu.cookie, null, 2)}`;
}

export async function mysql(nu: abs.Nu) {
    let pool = Mysql.getPool(nu);
    let [rows, fields] = await pool.query(`SELECT * FROM \`mu_session\`;`);
    let echo: string[] = [
        `<style>td,th{padding:5px;border:solid 1px #000;}</style>`,
        `<table width="100%"><tr>`
    ];
    for (let field of fields) {
        echo.push(`<th>${field.name}</th>`);
    }
    echo.push(`</tr>`);
    for (let row of rows) {
        echo.push(`<tr>`);
        for (let key in row) {
            echo.push(`<td>${row[key]}</td>`);
        }
        echo.push(`</tr>`);
    }
    echo.push(`</table><br>`);
    return echo.join("") + _getEnd(nu);
}

export async function mod(nu: abs.Nu) {
    let pool = Mysql.getPool(nu);
    let sess = MSession.getCreate(pool, nu);
    sess.set({
        "token": "1112",
        "data": "{}",
        "time_update": Math.round(Date.now() / 1000),
        "time_add": Math.round(Date.now() / 1000)
    });
    await sess.create(Mod.RELOAD);
    let json = JSON.stringify(sess.toObject(), null, 4);

    let echo: string[] = [
        `<b style="color: red;">Tips: File "back/sources/www/default/mod/Session.ts" can be deleted.</b>`,
        `<pre>` +
        `let pool = Mysql.getPool(nu);\n`,
        `let sess = MSession.getCreate(pool, nu);\n`,
        `sess.set({\n`,
        `    "token": "1112",\n`,
        `    "data": "{}",\n`,
        `    "time_update": Math.round(Date.now() / 1000),\n`,
        `    "time_add": Math.round(Date.now() / 1000)\n`,
        `});`,
        `await sess.create(Mod.RELOAD);`,
        `</pre>`,
        `JSON.stringify(sess.toObject(), null, 4):`,
        `<pre>`,
        json,
        `</pre>`,
        pool.getLength().toString()
    ];

    return echo.join("") + _getEnd(nu);
}

export async function sql(nu: abs.Nu) {
    let echo: string[] = [`<pre>`];
    let sql = Sql.get(nu);
    switch (nu.get.type) {
        case "insert": {
            let s = sql.insert("user", ["name", "age"], [
                ["Ah", "16"],
                ["Bob", "24"]
            ]).getSql();
            let sd = sql.getData();
            echo.push(
                `sql.insert("user", ["name", "age"], [\n` +
                `    ["Ah", "16"],\n` +
                `    ["Bob", "24"]\n` +
                `]);\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}\n\n` +
                `------------------------------\n\n`
            );

            s = sql.insert("user", ["name", "age"], ["Ah", "16"]).getSql();
            sd = sql.getData();
            echo.push(
                `sql.insert("user", ["name", "age"], ["Ah", "16"]);\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}\n\n` +
                `------------------------------\n\n`
            );

            s = sql.insert("user", {"name": "Bob", "age": "24"}).getSql();
            sd = sql.getData();
            echo.push(
                `sql.insert("user", {"name": "Bob", "age": "24"});\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}\n\n` +
                `------------------------------\n\n`
            );

            s = sql.insert("verify", {"token": "abc", "time_update": "10", x: ["a"]}).onDuplicate([{"time_update": "20"}]).getSql();
            sd = sql.getData();
            echo.push(
                `sql.insert("verify", {"token": "abc", "time_update": "10"}).onDuplicate({"time_update": "20"});\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}`
            );
            break;
        }
        case "select": {
            let s = sql.select("*", "user").getSql();
            let sd = sql.getData();
            echo.push(
                `sql.select("*", "user");\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}`
            );
            break;
        }
        case "update": {
            // --- 1, 2 ---

            let s = sql.update("user", [["age", "+", "1"], {"name": "Serene"}]).where([{"name": "Ah"}]).getSql();
            let sd = sql.getData();
            echo.push(
                `sql.update("user", [["age", "+", "1"], {"name": "Serene"}]).where([{"name": "Ah"}]);\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}\n\n` +
                `------------------------------\n\n`
            );

            // --- 3 ---

            s = sql.update("user", [{"name": "Serene", "type": ["(CASE `id` WHEN '1' THEN ? ELSE ? END)", ["a", "b"]]}]).where([{"name": "Ah"}]).getSql();
            sd = sql.getData();
            echo.push(
                `sql.update("user", [{"name": "Serene", "type": ["(CASE \`id\` WHEN '1' THEN ? ELSE ? END)", ["a", "b"]]}]).where([{"name": "Ah"}]);\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}`
            );
            break;
        }
        case "delete": {
            let s = sql.delete("user").where([{"id": "1"}]).getSql();
            let sd = sql.getData();
            echo.push(
                `sql.delete("user").where([{"id": "1"}]);\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}`
            );
            break;
        }
        case "where": {
            let s = sql.select("*", "user").where([{"city": "la"}, ["age", ">", "10"], ["level", "in", ["1", "2", "3"]]]).getSql();
            let sd = sql.getData();
            echo.push(
                `sql.select("*", "user").where([{"city": "la"}, ["age", ">", "10"], ["level", "in", ["1", "2", "3"]]]);\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}\n\n` +
                `------------------------------\n\n`
            );

            s = sql.update("order", [{"state": "1"}]).where([{
                "$or": [{
                    "type": "1"
                }, {
                    "type": "2"
                }]
            }]).getSql();
            sd = sql.getData();
            echo.push(
                `sql.update("order", [{"state": "1"}]).where([{\n` +
                `    "$or": [{\n` +
                `        "type": "1"\n` +
                `    }, {\n` +
                `        "type": "2"\n` +
                `    }]\n` +
                `}]);\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}\n\n` +
                `------------------------------\n\n`
            );

            s = sql.update("order", [{"state": "1"}]).where([{
                "user_id": "2",
                "state": ["1", "2", "3"],
                "$or": [{"type": "1"}, {"type": "2"}]
            }]).getSql();
            sd = sql.getData();
            echo.push(
                `sql.update("order", [{"state": "1"}]).where([{\n` +
                `    "user_id": "2",\n` +
                `    "state": ["1", "2", "3"],\n` +
                `    "$or": [{"type": "1"}, {"type": "2"}]\n` +
                `}]);\n\n` +
                `<b>getSql() :</b> ${s}\n` +
                `<b>getData():</b> ${JSON.stringify(sd, null, 4)}\n` +
                `<b>format() :</b> ${sql.format(s, sd)}`
            );
            break;
        }
    }
    sql.release();
    return echo.join("") + `</pre>` + _getEnd(nu);
}

export async function text(nu: abs.Nu) {
    let r = Text.random(16, Text.RANDOM_LUNS);
    let echo: string[] = [
        `Text.random(16, Text.RANDOM_LUNS):<br><br>`,
        Text.htmlescape(r)
    ];
    return echo.join("") + `<br><br>` + _getEnd(nu);
}

export async function crypto(nu: abs.Nu) {
    let echo: string[] = ["<b>AES-256-ECB:</b>"];

    let key = "testkeyatestkeyatestkeyatestkeya";
    let text = Crypto.aesEncrypt("Original text", key);
    echo.push(
        `<pre>` +
        `key = "testkeyatestkeyatestkeyatestkeya";\n` +
        `Crypto.aesEncrypt("Original text", key);` +
        `</pre>` +
        JSON.stringify(text)
    );

    let orig = Crypto.aesDecrypt(text, key);
    echo.push(
        `<pre>` +
        `Crypto.aesDecrypt(text, key);` +
        `</pre>` +
        JSON.stringify(orig)
    );

    orig = Crypto.aesDecrypt(text, "otherKey");
    echo.push(
        `<pre>` +
        `Crypto.aesDecrypt(text, "otherKey");` +
        `</pre>` +
        JSON.stringify(orig)
    );

    // ----------

    echo.push("<br><br><b>AES-256-CFB:</b>");

    let iv = "iloveuiloveuilov";
    text = Crypto.aesEncrypt("Original text", key, iv);
    echo.push(
        `<pre>` +
        `key = "testkeyatestkeyatestkeyatestkeya";\n` +
        `iv = "iloveuiloveuilov";\n` +
        `Crypto.aesEncrypt("Original text", key, iv);` +
        `</pre>` +
        JSON.stringify(text)
    );

    orig = Crypto.aesDecrypt(text, key, iv);
    echo.push(
        `<pre>` +
        `Crypto.aesDecrypt(text, key, iv);` +
        `</pre>` +
        JSON.stringify(orig)
    );

    orig = Crypto.aesDecrypt(text, key, "otherIv");
    echo.push(
        `<pre>` +
        `Crypto.aesDecrypt(text, key, "otherIv");` +
        `</pre>` +
        JSON.stringify(orig)
    );

    // ----------

    echo.push("<br><br><b>AES-256-CBC:</b>");

    text = Crypto.aesEncrypt("Original text", key, iv, Crypto.AES_256_CBC);
    echo.push(
        `<pre>` +
        `key = "testkeyatestkeyatestkeyatestkeya";\n` +
        `iv = "iloveuiloveuilov";\n` +
        `Crypto.aesEncrypt("Original text", key, iv, Crypto.AES_256_CBC);` +
        `</pre>` +
        JSON.stringify(text)
    );

    orig = Crypto.aesDecrypt(text, key, iv, Crypto.AES_256_CBC);
    echo.push(
        `<pre>` +
        `Crypto.aesDecrypt(text, key, iv, Crypto.AES_256_CBC);` +
        `</pre>` +
        JSON.stringify(orig)
    );

    orig = Crypto.aesDecrypt(text, key, "otherIvotherIv11", Crypto.AES_256_CBC);
    echo.push(
        `<pre>` +
        `Crypto.aesDecrypt(text, key, "otherIvotherIv11", Crypto.AES_256_CBC);` +
        `</pre>` +
        JSON.stringify(orig)
    );

    return echo.join("") + `<br><br>` + _getEnd(nu);
}

export async function redis(nu: abs.Nu) {
    let conn = await Redis.getConnection(nu);
    if (!conn) {
        return `Redis Connection Failed.<br><br>` + _getEnd(nu);
    }
    let echo: string[] = [];

    let r = await conn.getString("test");
    echo.push(
        `<pre>` +
        `await conn.getString("test");` +
        `</pre>` +
        JSON.stringify(r)
    );

    let rb = await conn.setString("test", "abc");
    echo.push(
        `<pre>` +
        `await conn.setString("test", "abc");` +
        `</pre>` +
        JSON.stringify(rb)
    );

    r = await conn.getString("test");
    echo.push(
        `<pre>` +
        `await conn.getString("test");` +
        `</pre>` +
        JSON.stringify(r)
    );

    rb = await conn.setString("test", "abcm", {flag: "NX"});
    echo.push(
        `<pre>` +
        `await conn.setString("test", "abcm", {flag: "NX"});` +
        `</pre>` +
        JSON.stringify(rb)
    );

    rb = await conn.setString("test", "abcm", {flag: "XX"});
    echo.push(
        `<pre>` +
        `await conn.setString("test", "abcm", {flag: "XX"});` +
        `</pre>` +
        JSON.stringify(rb)
    );

    rb = await conn.setString("test", "hhh", {flag: "XX", ex: 10});
    echo.push(
        `<pre>` +
        `await conn.setString("test", "hhh", {flag: "XX", ex: 10});` +
        `</pre>` +
        JSON.stringify(rb)
    );

    r = await conn.getString("test");
    echo.push(
        `<pre>` +
        `await conn.getString("test");` +
        `</pre>` +
        JSON.stringify(r)
    );

    let rbn = await conn.del("test");
    echo.push(
        `<pre>` +
        `await conn.del("test");` +
        `</pre>` +
        JSON.stringify(rbn)
    );

    r = await conn.getString("test");
    echo.push(
        `<pre>` +
        `await conn.getString("test");` +
        `</pre>` +
        JSON.stringify(r)
    );

    return echo.join("") + `<br><br>` + _getEnd(nu);
}

export async function session_mysql(nu: abs.Nu) {
    let pool = Mysql.getPool(nu);
    await Session.start(nu, pool, {
        exp: 60
    });

    let echo: string[] = [
        `<pre>`,
        `let pool = Mysql.getPool(nu);\n`,
        `await Session.start(nu, pool, {\n`,
        `    exp: 60\n`,
        `});`,
        `</pre>`,
        `JSON.stringify(nu.session, null, 4):`,
        `<pre>`,
        JSON.stringify(nu.session, null, 4),
        `</pre>`
    ];

    nu.session.value = nu.get.value ? nu.get.value : "ok";

    echo.push(
        `nu.session.value = nu.get.value ? nu.get.value : "ok";<br>` +
        `JSON.stringify(nu.session, null, 4):` +
        `<pre>` +
        JSON.stringify(nu.session, null, 4) +
        `</pre>`
    );

    return `<a href="${nu.const.HTTP_BASE}test/session_mysql">Default</a> | <a href="${nu.const.HTTP_BASE}test/session_mysql?value=aaa">Set "aaa"</a> | <a href="${nu.const.HTTP_BASE}test/session_mysql?value=bbb">Set "bbb"</a> | <a href="${nu.const.HTTP_BASE}test">Return</a>` + echo.join("") + _getEnd(nu);
}

export async function session_redis(nu: abs.Nu) {
    let redis = await Redis.getConnection(nu);
    await Session.start(nu, redis, {
        exp: 60
    });

    let echo: string[] = [
        `<pre>`,
        `let redis = await Redis.getConnection(nu);\n`,
        `await Session.start(nu, redis, {\n`,
        `    exp: 60\n`,
        `});`,
        `</pre>`,
        `JSON.stringify(nu.session, null, 4):`,
        `<pre>`,
        JSON.stringify(nu.session, null, 4),
        `</pre>`
    ];

    nu.session.value = nu.get.value ? nu.get.value : "ok";

    echo.push(
        `nu.session.value = nu.get.value ? nu.get.value : "ok";<br>` +
        `JSON.stringify(nu.session, null, 4):` +
        `<pre>` +
        JSON.stringify(nu.session, null, 4) +
        `</pre>`
    );

    return `<a href="${nu.const.HTTP_BASE}test/session_redis">Default</a> | <a href="${nu.const.HTTP_BASE}test/session_redis?value=aaa">Set "aaa"</a> | <a href="${nu.const.HTTP_BASE}test/session_redis?value=bbb">Set "bbb"</a> | <a href="${nu.const.HTTP_BASE}test">Return</a>` + echo.join("") + _getEnd(nu);
}

export async function captcha_fastbuild(nu: abs.Nu) {
    Captcha.get(400, 100).output(nu);
    return true;
}

export async function captcha_base64(nu: abs.Nu) {
    let cap = Captcha.get(400, 100);
    let phrase = cap.getPhrase();
    let base64 = cap.getBase64();

    let echo: string[] = [
        `let cap = Captcha.get(400, 100);<br>`,
        `let phrase = cap.getPhrase();<br>`,
        `let base64 = cap.getBase64();<br>`,
        `phrase:`,
        `<pre>${phrase}</pre>`,
        `base64:`,
        `<pre style="white-space: pre-wrap; word-wrap: break-word; overflow-y: auto; max-height: 200px;">${base64}</pre>`,
        `&lt;img src="\${base64}" style="width: 200px; height: 50px;"&gt;`,
        `<pre><img src="${base64}" style="width: 200px; height: 50px;"></pre>`
    ];

    return echo.join("") + _getEnd(nu);
}

export async function ssh_sftp(nu: abs.Nu) {
    let host = "xxx";
    let user = "xxx";
    let pwd = "xxx";

    let echo: string[] = [
        `<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.13.1/build/highlight.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/androidstudio.min.css">
<script>hljs.initHighlightingOnLoad();</script>
<style>
table {border: solid 1px #e1e4e8; border-bottom: none; border-right: none;}
table td, table th {border: solid 1px #e1e4e8; border-top: none; border-left: none; padding: 5px;}
table td {font-size: 12px;}
table th {background-color: #24292e; color: #FFF; font-size: 14px;}
table tr:hover td {background-color: #fafbfc;}

.list {margin-top: 10px;}
.list > div {display: inline-block; border: solid 1px #e1e4e8; margin: 2px 2px 0 0; padding: 10px; font-size: 12px; line-height: 1;}
.list > div:hover {background-color: #fafbfc;}

.hljs {line-height: 1.7; font-size: 14px; white-space: pre-wrap; border-radius: 5px;}
</style>`
    ];

    // --- 创建 ssh 对象 ---
    echo.push(`<pre><code class="typescript">let ssh = await Ssh.get({
    host: "xxx",
    username: "xxx",
    password: "xxx"
});</code></pre>`);
    let ssh = await Ssh.get({
        host: host,
        username: user,
        password: pwd
    });
    if (!ssh) {
        echo.push(`Connection failed.<br><br>`);
        return echo.join("") + _getEnd(nu);
    }

    // --- 执行一个命令 ---
    let rtn = await ssh.exec("ls");
    if (!rtn) {
        echo.push(`Execution failed.<br><br>`);
        return echo.join("") + _getEnd(nu);
    }

    echo.push(
        `<pre><code class="typescript">let rtn = await ssh.exec("ls");</code></pre>`,
        "rtn.toString():",
        `<pre><code class="shell">${rtn.toString()}</code></pre>`
    );

    // --- 在 shell 里执行多条命令 ---
    echo.push(`Get shell:<pre><code class="typescript">let shell = await ssh.getShell();</code></pre>`);
    let shell = await ssh.getShell();
    if (!shell) {
        echo.push(`Get failed.<br><br>`);
        return echo.join("") + _getEnd(nu);
    }

    echo.push(`Shell:<pre><code class="shell">${await shell.read()}</code></pre>`);

    await shell.writeLine("cd ..");
    echo.push(`Code:<pre><code class="typescript">await shell.writeLine("cd ..");</code></pre>`);
    echo.push(`Shell:<pre><code class="shell">${await shell.read()}</code></pre>`);

    await shell.writeLine("ls");
    echo.push(`Code:<pre><code class="typescript">await shell.writeLine("ls");</code></pre>`);
    echo.push(`Shell:<pre><code class="shell">${await shell.read()}</code></pre>`);

    await shell.end();

    // --- SFTP ---

    echo.push(`Get sftp:<pre><code class="typescript">let sftp = await ssh.getSftp();</code></pre>`);
    let sftp = await ssh.getSftp();
    if (!sftp) {
        echo.push(`Get failed.<br><br>`);
        return echo.join("") + _getEnd(nu);
    }

    // --- 获取详细列表 ---

    let list = await sftp.readDir();
    echo.push(`<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr><th>Name</th><th>Size</th><th>Uid</th><th>Gid</th><th>PMSN</th><th>Mode</th><th>Atime</th><th>Mtime</th></tr>`);
    for (let item of list) {
        echo.push(`<tr><td>${item.filename}</td><td>${Text.sizeFormat(item.attrs.size)}</td><td>${item.attrs.uid}</td><td>${item.attrs.gid}</td><td>${item.attrs.mode}</td><td>${item.attrs.mode.toString(8).slice(-4)}</td><td>${Time.format("Y-m-d H:i:s", new Date(item.attrs.atime * 1000))}</td><td>${Time.format("Y-m-d H:i:s", new Date(item.attrs.mtime * 1000))}</td></tr>`);
    }
    echo.push(`</table>`);

    // --- 新建一个 __mutton.txt，并创建一个 __mulink 到 txt 后再获取列表 ---

    let rtnb = await sftp.writeFile("__nuttom.txt", "ok");
    let rtnb2 = await sftp.symlink("__nuttom.txt", "__nulink");
    echo.push(`<pre><code class="typescript">let rtnb = await sftp.writeFile("__nuttom.txt", "ok");  // ${JSON.stringify(rtnb)}
let rtnb2 = await sftp.symlink("__nuttom.txt", "__nulink");  // ${JSON.stringify(rtnb2)}</code></pre>`);

    list = await sftp.readDir();
    echo.push(`<div class="list">`);
    for (let item of list) {
        echo.push(`<div>${item.filename}</div>`);
    }
    echo.push(`</div>`);

    // --- 更改权限为 777 ---

    rtnb = await sftp.chmod("__nuttom.txt", "0777");
    echo.push(`<pre><code class="typescript">rtnb = await sftp.chmod("__nuttom.txt", "0777");  // ${JSON.stringify(rtnb)}</code></pre>`);

    // --- 创建文件夹，并进入，在里面创在文件 ---

    rtnb = await sftp.mkdir("__nuttom", {mode: "0777"});
    sftp.cd("__nuttom");
    let rtns = sftp.pwd();
    await sftp.writeFile("1.txt", "hello");
    echo.push(`<pre><code class="typescript">rtnb = await sftp.mkdir("__nuttom", {mode: "0777"});
sftp.cd("__nuttom");
let rtns = sftp.pwd();  // ${rtns}
await sftp.writeFile("1.txt", "hello");</code></pre>`);

    list = await sftp.readDir();
    echo.push(`<div class="list">`);
    for (let item of list) {
        echo.push(`<div>${item.filename}</div>`);
    }
    echo.push(`</div>`);

    // --- 退回到上级，删除目录，删除 link，删除 txt ---

    sftp.cd("..");
    rtns = sftp.pwd();
    rtnb = await sftp.rmdirDeep("__nuttom");
    rtnb2 = await sftp.unlinkFile("__nulink");
    let rtnb3 = await sftp.unlinkFile("__nuttom.txt");
    echo.push(`<pre><code class="typescript">sftp.cd("..");
rtns = sftp.pwd();  // ${rtns}
rtnb = await sftp.rmdirDeep("__nuttom");  // ${rtnb}
rtnb2 = await sftp.unlinkFile("__nulink");  // ${rtnb2}
let rtnb3 = await sftp.unlinkFile("__nuttom.txt"); // ${rtnb3}</code></pre>`);

    list = await sftp.readDir();
    echo.push(`<div class="list">`);
    for (let item of list) {
        echo.push(`<div>${item.filename}</div>`);
    }
    echo.push(`</div>`);

    sftp.end();

    ssh.disconnect();

    return echo.join("") + "<br>" + _getEnd(nu);
}

export async function reload(nu: abs.Nu) {
    Sys.reload();
    return "The reload request has been sent, please review the console.<br><br>" + _getEnd(nu);
}

export async function restart(nu: abs.Nu) {
    Sys.restart();
    return "The restart request has been sent, please review the console.<br><br>" + _getEnd(nu);
}

// --- END ---
function _getEnd(nu: abs.Nu): string {
    let rt = Number(process.hrtime.bigint() - nu.const.START_TIME);
    return "Processed in " + (rt / 1000000000).toString() + " second(s), " + (rt / 1000000).toString() + "ms, " + (process.memoryUsage().rss / 1024).toFixed(2) + " K.";
}
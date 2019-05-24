// --- 库和定义 ---
import * as Net from "../../../lib/Net";
import * as Sys from "../../../lib/Sys";
import * as abs from "../../../abstract";
import * as C from "../../../const";

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

        "<br><br><b>Sql:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/sql?type=insert">View "test/sql?type=insert"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/sql?type=select">View "test/sql?type=select"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/sql?type=update">View "test/sql?type=update"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/sql?type=delete">View "test/sql?type=delete"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/sql?type=where">View "test/sql?type=where"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/sql?type=single-mode">View "test/sql?type=single-mode"</a>`,

        "<br><br><b>Redis:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/redis_simulator">View "test/redis_simulator"</a>`,

        "<br><br><b>Session:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/session_db">View "test/session_db"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/session_redis">View "test/session_redis"</a>`,

        "<br><br><b>Captcha:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/captcha_fastbuild">View "test/captcha_fastbuild"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/captcha_base64">View "test/captcha_base64"</a>`,

        "<br><br><b>Storage:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/storage_oss">View "test/storage_oss"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/storage_oss_direct">View "test/storage_oss_direct"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/storage_cos">View "test/storage_cos"</a>`,

        "<br><br><b>Text:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/text">View "test/text"</a>`,

        "<br><br><b>Aes:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/aes">View "test/aes"</a>`,

        "<br><br><b>Ssh:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/ssh_sftp">View "test/ssh_sftp"</a>`,

        "<br><br><b>Dns:</b>",
        `<br><br><a href="${nu.const.HTTP_BASE}test/dns_aliyun">View "test/dns_aliyun"</a>`,
        `<br><a href="${nu.const.HTTP_BASE}test/dns_tencent_cloud">View "test/dns_tencent_cloud"</a>`,

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
            await res.readContent(),
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
        echo.push(await res.readContent());
    } else {
        echo.push("Error.");
    }

    return echo.join("") + "</pre>" + _getEnd(nu);
}
export async function netPost1(nu: abs.Nu) {
    return JSON.stringify(nu.post);
}

export async function netUpload(nu: abs.Nu) {
    let res = await Net.post(nu.const.HTTP_PATH + "test/netUpload1", {a: "1", "file": "@" + C.LIB_PATH + "Net/cacert.pem", "multiple": ["1", "@" + C.LIB_PATH + "Zlib.js"]});
    let echo: string[] = [
        `Remote Upload:<br><br>`,
        `await Net.post(nu.const.HTTP_PATH + "test/netUpload1", {a: "1", "file": "@${C.LIB_PATH}Net/cacert.pem", "multiple": ["1", "@${C.LIB_PATH}Zlib.js"]})`,
        "<pre>"
    ];
    if (res) {
        echo.push(await res.readContent());
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
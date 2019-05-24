import * as http2 from "http2";
import * as url from "url";
import * as querystring from "querystring";
// --- 第三方 ---
import * as sni from "@litert/tls-sni";
// --- 库和定义 ---
import * as Fs from "../lib/Fs";
import * as View from "../lib/View";
import * as Sys from "../lib/Sys";
import * as Const from "../const";
import * as abs from "../abstract";
// --- 初始化 ---
import * as Router from "../sys/Route";

/** 当前连接数 */
let _linkCount: number = 0;

// --- 10 秒往主线程发送一次心跳 ---
setInterval(function() {
    if (!process.connected) {
        return;
    }
    if (!process.send) {
        return;
    }
    process.send({
        action: "hbtime",
        pid: process.pid
    });
}, 10000);

export async function run() {
    // --- [子线程]，主程序内容 ---

    // --- 接收进程信号，主要用来 reload ---
    process.on("message", async function(msg) {
        switch (msg.action) {
            case "reload":
                await Sys.realReload(VHOSTS, SNI_MANAGER);
                break;
            case "restart":
                // --- 需要停止监听，等待已有连接全部断开，然后销毁线程 ---
                server.close();
                process.disconnect();
                // --- 等待连接全部断开 ---
                while (true) {
                    if (_linkCount === 0) {
                        break;
                    }
                    // --- 有长连接，等待中 ---
                    console.log("[ Child] Worker " + process.pid + " busy.");
                    await Sys.sleep(10000);
                }
                // --- 链接全部断开 ---
                console.log("[ Child] Worker " + process.pid + " has exited.");
                process.exit(1);
                break;
        }
    });

    /** 当前的虚拟主机配置列表 - 读取于 conf/vhost/*.json */
    let VHOSTS: abs.Vhost[] = [];
    // --- 证书 SNI 管理器 ---
    const SNI_MANAGER = sni.certs.createManager();

    // --- 线程启动时加载 VHOST 和证书管理器 ---
    await Sys.realReload(VHOSTS, SNI_MANAGER);

    // --- 启动 HTTP 服务器 ---
    let server = http2.createSecureServer({
        SNICallback: SNI_MANAGER.getSNICallback(),
        ciphers: "ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS",
        allowHTTP1: true
    }, async (req, res) => {
        ++_linkCount;
        const START_TIME = process.hrtime.bigint();
        res.setHeader("Server", "Nuttom/" + Const.VER);

        /**
         * --- 用以检测 host 是否与 vhost 配置域名相匹配 ---
         * @param host 要检验的域名
         * @param vhost 虚拟机配置对象
         */
        let checkVhost = function(host: string, vhost: abs.Vhost): number {
            for (let domain of vhost.domains) {
                if (domain.indexOf("*") !== -1) {
                    if (domain === "*") {
                        return 0;
                    } else {
                        domain = domain.replace(/\*/, "^((?!\\.).)+").replace(/\./, "\\.");
                        if (new RegExp(domain).test(host)) {
                            return 1;
                        }
                    }
                } else if (domain === host) {
                    return 2;
                }
            }
            return -1;
        };

        // --- 开始 ---
        let [host, port] = (req.headers[":authority"] || "").split(":");
        let len = VHOSTS.length;
        let vhostMatch: abs.Vhost[] = [];
        /** 当前最佳匹配的虚拟机配置 */
        let vhost!: abs.Vhost;
        for (let i = 0; i < len; ++i) {
            let rn = checkVhost(host, VHOSTS[i]);
            if (rn === 2) {
                vhost = VHOSTS[i];
                break;
            } else if (rn !== -1) {
                vhostMatch[rn] = VHOSTS[i];
            }
        }
        if (vhost === undefined) {
            if (vhostMatch.length === 0) {
                res.writeHead(403);
                res.end("Nuttom: No permissions.");
                --_linkCount;
                return;
            } else {
                if (vhostMatch[1]) {
                    vhost = vhostMatch[1];
                } else {
                    vhost = vhostMatch[0];
                }
            }
        }
        /** 网站实际根目录，末尾不带 / */
        let vhostRoot = vhost.root.replace(/\\/g, "/");
        vhostRoot = Fs.isRealPath(vhostRoot) ? vhostRoot : Const.WWW_PATH + vhostRoot;
        vhostRoot = vhostRoot.slice(-1) !== "/" ? vhostRoot : vhostRoot.slice(0, -1);
        /** 请求的 URI 对象 */
        let uri = url.parse(req.url);
        let get = uri.query ? querystring.parse(uri.query) : {};
        /** 请求的路径部分 */
        let path = uri.pathname || "/";

        /** 请求路径的数组分割 */
        let pathArr = path.split("/");
        pathArr.splice(0, 1);
        let pathArrLen = pathArr.length;
        /** 当面检测路径 */
        let pathNow = "/";
        /** --- Nu 对象 --- */
        let nu: abs.Nu = {
            const: {
                VER: Const.VER,
                START_TIME: START_TIME,
                URI: "",
                ROOT_PATH: "",
                VIEW_PATH: "",
                DATA_PATH: "",
                HTTP_BASE: "",
                HTTP_HOST: host,
                HTTP_PATH: "https://" + req.authority
            },
            req: req,
            res: res,
            uri: uri,
            get: get,
            post: {},
            cookie: {},
            param: [],
            locale: "en",
            config: {route: {}, etc: {}}
        };
        // --- 循环从顶层路径开始，一层层判断 ---
        for (let index = 0; index < pathArrLen; ++index) {
            let item = pathArr[index];
            if (item === "" || item === ".") {
                continue;
            }
            if (item === "..") {
                if (pathNow === "/") {
                    // --- 最次返回到网站主目录，做限定，不可能读取网站主目录之上的文件，那不就呵呵哒了么 ---
                    continue;
                } else {
                    // --- 返回上一层 ---
                    pathNow = pathNow.slice(0, -1);
                    pathNow = pathNow.slice(0, pathNow.lastIndexOf("/") + 1);
                    continue;
                }
            }
            // --- 判断目录是否是 Nuttom 目录 ---
            // --- pathNow 代表的是上一层路径，不是 item ---
            nu.const.HTTP_BASE = pathNow;
            nu.const.ROOT_PATH = vhostRoot + pathNow;
            nu.const.VIEW_PATH = nu.const.ROOT_PATH + "view/";
            nu.const.DATA_PATH = nu.const.ROOT_PATH + "data/";
            if (await Router.run(nu, pathArr, index)) {
                --_linkCount;
                return;
            }
            // --- 判断当前是否存在对象，不存在返回 404 ---
            let stats = await Fs.getStats(vhostRoot + pathNow + item);
            if (stats === undefined) {
                // --- 404 ---
                res.writeHead(404);
                res.end("404 Not Found(1).");
                --_linkCount;
                return;
            }
            if (stats.isDirectory()) {
                // --- 当前是目录，增加 pathNow 定义 ---
                pathNow += item + "/";
            } else if (stats.isFile()) {
                // --- 当前是文件，则输出文件 ---
                await View.toResponse(nu, vhostRoot + pathNow + item);
                --_linkCount;
                return;
            } else {
                // --- 当前有异常，禁止输出 ---
                res.writeHead(403);
                res.end("403 Forbidden(1).");
                --_linkCount;
                return;
            }
        }
        // --- 一直是目录，会到这里，例如 /test/，/ 根 ---
        // --- 先判断是不是 Nuttom 目录，若不是，则是静态目录 ---
        nu.const.HTTP_BASE = pathNow;
        nu.const.ROOT_PATH = vhostRoot + pathNow;
        nu.const.VIEW_PATH = nu.const.ROOT_PATH + "view/";
        nu.const.DATA_PATH = nu.const.ROOT_PATH + "data/";
        if (await Router.run(nu)) {
            --_linkCount;
            return;
        }
        // --- 静态目录，读 index ---
        let item = "index.html";
        let stats = await Fs.getStats(vhostRoot + pathNow + "index.html");
        if (stats === undefined) {
            item = "index.htm";
            stats = await Fs.getStats(vhostRoot + pathNow + "index.htm");
            if (stats === undefined) {
                res.writeHead(403);
                res.end("403 Forbidden(2).");
                --_linkCount;
                return;
            }
        }
        // --- 读取并输出文件 ---
        await View.toResponse(nu, vhostRoot + pathNow + item);
        --_linkCount;
    });
    server.listen(4333);
}
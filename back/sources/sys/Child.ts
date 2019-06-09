import * as http2 from "http2";
import * as url from "url";
import * as tls from "tls";
import * as querystring from "querystring";
import * as http from "http";
// --- 第三方 ---
import * as sni from "@litert/tls-sni";
// --- 库和定义 ---
import * as Fs from "~/lib/Fs";
import * as View from "~/lib/View";
import * as Sys from "~/lib/Sys";
import * as Crypto from "~/lib/Crypto";
import * as Const from "~/const";
import * as abs from "~/abstract";
// --- 初始化 ---
import * as Router from "~/sys/Route";

/** --- 当前持续中的连接数 --- */
let _LINK_COUNT: number = 0;

// --- 10 秒往主线程发送一次心跳 ---
let _hbTimer = setInterval(function() {
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

/** --- 当前的虚拟主机配置列表 - 读取于 conf/vhost/*.json --- */
let _VHOSTS: abs.Vhost[] = [];
/** --- 证书 SNI 管理器 --- */
const _SNI_MANAGER = sni.certs.createManager();

// --- 以下为 [子进程] 正戏 ---
(async function() {
    // --- 子进程启动时先加载 VHOST 和证书管理器 ---
    await Sys.realReload(_VHOSTS, _SNI_MANAGER);

    // --- 加载 config.json ---
    let configContent = await Fs.readFile(Const.CONF_PATH + "config.json");
    let config = JSON.parse(configContent ? configContent.toString() : "{}");
    configContent = undefined;

    // --- 创建服务器并启动特（支持 http2/https/http/websocket） ---
    let server = http2.createSecureServer({
        SNICallback: _SNI_MANAGER.getSNICallback(),
        ciphers: "ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS",
        allowHTTP1: true
    }, async (req, res) => {
        // --- 普通 HTTP 类请求开始 ---
        ++_LINK_COUNT;
        /** --- 本次请求开始时间 --- */
        const START_TIME = process.hrtime.bigint();
        // --- 设置标准头部 ---
        res.setHeader("Server", "Nuttom/" + Const.VER);
        /** --- 格式化的请求 uri 对象 --- */
        const uri = url.parse((req.headers[":scheme"] || "") + "://" + req.headers[":authority"] + req.headers[":path"]);
        /** --- 当前匹配的虚拟主机对象 --- */
        let vhost = _getVhost(uri.hostname || "");
        if (!vhost) {
            res.writeHead(403);
            res.end("Nuttom: No permissions.");
            --_LINK_COUNT;
            return;
        }
        /** 网站实绝对根目录，末尾不带 / */
        let vhostRoot = Fs.isRealPath(vhost.root) ? vhost.root : Const.WWW_PATH + vhost.root;
        vhostRoot = vhostRoot.slice(-1) !== "/" ? vhostRoot : vhostRoot.slice(0, -1);
        /** --- 请求的路径部分 --- */
        let path = uri.pathname || "/";
        path = url.resolve("/", path).replace(/\/\//g, "");
        /** --- 请求路径的数组分割 --- */
        let pathArr = path.split("/");
        pathArr.splice(0, 1);
        let pathArrLen = pathArr.length;
        /** --- 当前已检测到的路径 --- */
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
                HTTP_HOST: uri.hostname || "",
                HTTP_PATH: "https://" + req.authority,
                WS_PATH: "wss://" + req.authority
            },
            req: req,
            res: res,
            uri: uri,
            get: uri.query ? querystring.parse(uri.query) : {},
            post: {},
            cookie: {},
            sessionConfig: {
                token: "",
                conn: undefined as any
            },
            session: {},
            param: [],
            locale: "en",
            config: {route: {}, etc: {} as any},
            isNu: true
        };
        // --- 循环从顶层路径开始，一层层判断 ---
        for (let index = 0; index < pathArrLen; ++index) {
            let item = pathArr[index];
            // --- 判断目录是否是 Nuttom 目录 ---
            if (await Router.run(nu, {
                leftPathArr: pathArr.slice(index),
                vhostRoot: vhostRoot,
                pathNow: pathNow
            })) {
                --_LINK_COUNT;
                return;
            }
            // --- 判断当前是否存在对象，不存在返回 404 ---
            let stats = await Fs.getStats(vhostRoot + pathNow + item);
            if (stats === undefined) {
                // --- 404 ---
                res.writeHead(404);
                res.end("404 Not Found(1).");
                --_LINK_COUNT;
                return;
            }
            if (stats.isDirectory()) {
                // --- 当前是目录，增加 pathNow 定义 ---
                pathNow += item + "/";
            } else if (stats.isFile()) {
                // --- 当前是文件，则输出文件 ---
                await View.toResponse(nu, vhostRoot + pathNow + item);
                --_LINK_COUNT;
                return;
            } else {
                // --- 当前有异常，禁止输出 ---
                res.writeHead(403);
                res.end("403 Forbidden(1).");
                --_LINK_COUNT;
                return;
            }
        }
        // --- 一直是目录，会到这里，例如 /test/，/ 根 ---
        // --- 先判断是不是 Nuttom 目录，若不是，则是静态目录 ---
        if (await Router.run(nu, {
            leftPathArr: [],
            vhostRoot: vhostRoot,
            pathNow: pathNow
        })) {
            --_LINK_COUNT;
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
                --_LINK_COUNT;
                return;
            }
        }
        // --- 读取并输出文件 ---
        await View.toResponse(nu, vhostRoot + pathNow + item);
        --_LINK_COUNT;
    }).on("upgrade", async function(req: http.IncomingMessage, socket: tls.TLSSocket) {
          // ----------------------------------------- //
         // ---------- WebSocket(wss) 连接 ---------- //
        // ----------------------------------------- //
        ++_LINK_COUNT;
        socket.on("error", function(e) {
            // console.log(e);
            // --- 无视 ---
        }).on("close", function() {
            --_LINK_COUNT;
        });
        /** --- 获取解析后的 uri 对象 --- */
        const uri = url.parse("wss://" + req.headers["host"] + req.url);
        /** --- 当前匹配的虚拟主机对象 --- */
        let vhost = _getVhost(uri.hostname || "");
        if (!vhost) {
            socket.end(`HTTP/${req.httpVersion} 403 No permissions(0)\r\n\r\n`);
            --_LINK_COUNT;
            return;
        }
        /** 网站实绝对根目录，末尾不带 / */
        let vhostRoot = Fs.isRealPath(vhost.root) ? vhost.root : Const.WWW_PATH + vhost.root;
        vhostRoot = vhostRoot.slice(-1) !== "/" ? vhostRoot : vhostRoot.slice(0, -1);
        /** --- 请求的路径部分 --- */
        let path = uri.pathname || "/";
        path = url.resolve("/", path).replace(/\/\//g, "");
        /** --- 请求路径的数组分割 --- */
        let pathArr = path.split("/");
        pathArr.splice(0, 1);
        let pathArrLen = pathArr.length;
        /** --- 当前已检测到的路径 --- */
        let pathNow = "/";
        // --- 循环从顶层路径开始，一层层判断 ---
        for (let index = 0; index < pathArrLen; ++index) {
            let item = pathArr[index];
            let stat = await Fs.getStats(vhostRoot + pathNow + "config.js");
            if (stat) {
                // --- 是动态目录 ---
                // --- 开始处理 ---

                // --- 正戏开始 ---

                let leftPathArr = pathArr.slice(index);
                let leftPath = leftPathArr.join("/");
                // --- 获取 action 部分 ---
                let pathLeft: string = "", pathRight: string = "";
                [pathLeft, pathRight] = Router.getPathLeftRight(leftPath);
                // --- 加载 ws 控制器 ---
                let ctr: any;
                try {
                    ctr = require(vhostRoot + pathNow + "ws/" + pathLeft);
                } catch (e) {
                    socket.end(`HTTP/${req.httpVersion} 403 Forbidden(4)\r\n\r\n`);
                    --_LINK_COUNT;
                    return;
                }
                // --- 判断 action 是否存在 ---
                if (!ctr[pathRight]) {
                    socket.end(`HTTP/${req.httpVersion} 403 Forbidden(5)\r\n\r\n`);
                    --_LINK_COUNT;
                    return;
                }
                // --- action 存在，可以握手 ---
                const swa = Crypto.sha1(req.headers["sec-websocket-key"] + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11", {format: "base64"});
                const resHeaders: string[] = [
                    `HTTP/${req.httpVersion} 101 Switching Protocols`,
                    `Upgrade: websocket`,
                    `Connection: Upgrade`,
                    `Sec-WebSocket-Version: 13`,
                    `Sec-WebSocket-Accept: ${swa}`,
                    `Sec-WebSocket-Location: wss://${req.headers["host"]}/`
                ];
                socket.write(resHeaders.join(`\r\n`) + "\r\n\r\n");
                /** --- Nus 对象 --- */
                let nus: abs.Nus = {
                    const: {
                        VER: Const.VER,
                        START_TIME: process.hrtime.bigint(),
                        ROOT_PATH: vhostRoot + pathNow,
                        VIEW_PATH: vhostRoot + pathNow + "view/",
                        DATA_PATH: vhostRoot + pathNow + "data/"
                    },
                    req: req,
                    socket: socket,
                    uri: uri,
                    get: uri.query ? querystring.parse(uri.query) : {},
                    cookie: {},
                    locale: "en",
                    config: require(vhostRoot + pathNow + "config"),
                    isNus: true
                };
                // --- 进入连接执行方法 ---
                await ctr[pathRight](nus);

                // --- 正戏结束 ---

                return;
            }
            // --- 判断当前是否存在对象，不存在返回 404 ---
            let stats = await Fs.getStats(vhostRoot + pathNow + item);
            if (stats === undefined) {
                socket.end(`HTTP/${req.httpVersion} 404 Not Found\r\n\r\n`);
                --_LINK_COUNT;
                return;
            }
            if (stats.isDirectory()) {
                // --- 当前是目录，增加 pathNow 定义 ---
                pathNow += item + "/";
            } else {
                socket.end(`HTTP/${req.httpVersion} 403 No permissions(0)\r\n\r\n`);
                --_LINK_COUNT;
                return;
            }
        }
        socket.end(`HTTP/${req.httpVersion} 403 No permissions(1)\r\n\r\n`);
        --_LINK_COUNT;
        return;
    });
    server.listen(config.httpsPort);

    // --- http: 80 ---
    http.createServer(function(req: http.IncomingMessage, res: http.ServerResponse) {
        let [host, port] = (req.headers["host"] || "").split(":");
        if (config.httpsPort !== 443) {
            port = ":" + config.httpsPort;
        } else {
            port = "";
        }
        res.writeHead(301, {
            "Server": "Nuttom/" + Const.VER,
            "Cache-Control": "no-cache, must-revalidate",
            "Location": "https://" + host + port + req.url
        });
        res.end();
    }).listen(config.httpPort);

    // --- 接收主进程回传信号，主要用来 reload，restart ---
    process.on("message", async function(msg) {
        switch (msg.action) {
            case "reload": {
                await Sys.realReload(_VHOSTS, _SNI_MANAGER);
                break;
            }
            case "clearDataCache": {
                Sys.realClearDataCache();
                break;
            }
            case "restart": {
                // --- 需要停止监听，等待已有连接全部断开，然后关闭线程 ---
                server.close();
                clearInterval(_hbTimer);
                // --- 等待连接全部断开 ---
                while (true) {
                    if (_LINK_COUNT === 0) {
                        break;
                    }
                    // --- 有长连接，等待中 ---
                    console.log(`[ Child] Worker ${process.pid} busy, there are ${_LINK_COUNT} connections.`);
                    await Sys.sleep(5000);
                }
                // --- 链接全部断开 ---
                // console.log("[ Child] Worker " + process.pid + " has exited.");
                process.disconnect();
                break;
            }
        }
    });
})();

/**
 * --- 获取匹配的 vhost 对象 ---
 * --- 如果有精准匹配，以精准匹配为准，否则为 2 级泛匹配(v2)，最后全局泛匹配(vg) ---
 * @param hostname 当前的 hostname，不带端口
 */
function _getVhost(hostname: string): abs.Vhost | undefined {
    let vg!: abs.Vhost, v2!: abs.Vhost;
    for (let vhost of _VHOSTS) {
        for (let domain of vhost.domains) {
            if (domain === "*") {
                // --- 全局泛匹配 ---
                vg = vhost;
            } else if (domain.indexOf("*") !== -1) {
                // --- 2 级泛匹配 ---
                domain = domain.replace(/\*/, "^[a-z-]+?").replace(/\./, "\\.");
                if (new RegExp(domain).test(hostname)) {
                    v2 = vhost;
                }
            } else if (domain === hostname) {
                // --- 完全匹配 ---
                return vhost;
            }
        }
    }
    if (v2) {
        return v2;
    }
    if (vg) {
        return vg;
    }
    return undefined;
}
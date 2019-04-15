import * as http2 from "http2";
import * as cluster from "cluster";
import * as os from "os";
import * as url from "url";
// --- 第三方 ---
import * as sni from "@litert/tls-sni";
import * as mime from "@litert/mime-types";
// --- 库和定义 ---
import * as Fs from "./lib/Fs";
import * as Const from "./const";
import * as abs from "./abstract";
// --- 初始化 ---
import * as Boot from "./sys/Boot";
import * as Router from "./sys/Route";

// --- 初始化 ---
(async () => {
    try {
        if (cluster.isMaster) {
            // --- [主线程]，启动和 CPU 数量一致的线程 ---
            let cpuLen = os.cpus().length;
            let workerList: cluster.Worker[] = [];
            console.log("Master start...");
            for (let i = 0; i < cpuLen; ++i) {
                let worker = cluster.fork();
                worker.on("message", (msg) => {
                    switch (msg.action) {
                        case "reload":
                            // --- 为所有子线程发送 reload 信息 ---
                            for (let k = 0; k < workerList.length; ++k) {
                                workerList[k].send({
                                    action: "reload"
                                });
                            }
                            break;
                    }
                });
                workerList.push(worker);
            }
            cluster.on("listening", (worker, address) => {
                console.log("Listening: worker " + worker.process.pid + ", Address: " + address.address + ":" + address.port + ".");
            });
            cluster.on("exit", (worker, code, signal) => {
                console.log("Worker " + worker.process.pid + " died.");
            });
        } else {
            // --- [子线程]，主程序内容 ---

            // --- 接收进程信号，主要用来 reload ---
            process.on("message", async (msg) => {
                switch (msg.action) {
                    case "reload":
                        await Boot.reload(VHOSTS, SNI_MANAGER);
                        break;
                }
            });

            /** 当前的虚拟主机配置列表 - 读取于 conf/vhost/*.json */
            let VHOSTS: abs.Vhost[] = [];
            // --- 证书 SNI 管理器 ---
            const SNI_MANAGER = sni.certs.createManager();

            // --- 线程启动时加载 VHOST 和证书管理器 ---
            await Boot.reload(VHOSTS, SNI_MANAGER);

            // --- 启动 HTTP 服务器 ---
            let server = http2.createSecureServer({
                SNICallback: SNI_MANAGER.getSNICallback(),
                ciphers: "ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS"
            }, async (req, res) => {
                const START_TIME = (new Date()).getTime();
                res.setHeader("Server", "Nuttom/" + Const.VER);

                /**
                 * --- 用以检测 host 是否与 vhost 配置域名相匹配 ---
                 * @param host 要检验的域名
                 * @param vhost 虚拟机配置对象
                 */
                let checkVhost = (host: string, vhost: abs.Vhost): number => {
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
                /** 请求的路径部分 */
                let path = uri.pathname || "/";

                /** 请求路径的数组分割 */
                let pathArr = path.split("/");
                pathArr.splice(0, 1);
                let pathArrLen = pathArr.length;
                /** 当面检测路径 */
                let pathNow = "/";
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
                    if (await Router.run(req, res, vhostRoot, pathNow, pathArr, index)) {
                        return;
                    }
                    // --- 判断当前是否存在对象，不存在返回 404 ---
                    let stats = await Fs.getStats(vhostRoot + pathNow + item);
                    if (stats === undefined) {
                        // --- 404 ---
                        res.writeHead(404);
                        res.end("404 Not Found(1).");
                        return;
                    }
                    if (stats.isDirectory()) {
                        // --- 当前是目录，增加 pathNow 定义 ---
                        pathNow += item + "/";
                    } else if (stats.isFile()) {
                        // --- 当前是文件，则输出文件 ---
                        res.setHeader("Content-Type", mime.get(item));
                        res.setHeader("Content-Length", stats.size);
                        res.writeHead(200);
                        Fs.readStream(vhostRoot + pathNow + item).pipe(res.stream);
                        return;
                    } else {
                        // --- 当前有异常，禁止输出 ---
                        res.writeHead(403);
                        res.end("403 Forbidden(1).");
                        return;
                    }
                }
                // --- 一直是目录，会到这里，例如 /test/，/ 根 ---
                // --- 先判断是不是 Nuttom 目录，若不是，则是静态目录 ---
                if (await Router.run(req, res, vhostRoot, pathNow)) {
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
                        return;
                    }
                }
                // --- 读取文件 ---
                res.setHeader("Content-Type", mime.get(item));
                res.setHeader("Content-Length", stats.size);
                res.writeHead(200);
                Fs.readStream(vhostRoot + pathNow + item).pipe(res.stream);
            });
            server.listen(4333);
        }
    } catch (e) {
        console.log(e);
    }
})();


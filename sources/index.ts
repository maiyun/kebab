import * as http2 from "http2";
import * as cluster from "cluster";
import * as os from "os";
import * as url from "url";
import * as sni from "@litert/tls-sni";

import * as Fs from "./lib/Fs";
import * as c from "./const";
import * as abs from "./abstract";

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
                        await reload();
                        break;
                }
            });

            /** 当前的虚拟主机配置列表 - 读取于 conf/vhost/*.json */
            let VHOSTS: abs.Vhost[] = [];
            // --- 证书 SNI 管理器 ---
            const SNI_MANAGER = sni.certs.createManager();

            /**
             * --- 重新加载 vhost 以及证书 ---
             * --- 需要所有线程同时重新加载 ---
             */
            async function reload() {
                let files = await Fs.readDir(c.VHOST_PATH);
                VHOSTS = [];
                for (let file of files) {
                    let list: abs.Vhost[] = JSON.parse(await Fs.readFile(c.VHOST_PATH + file));
                    if (!Array.isArray(list)) {
                        list = [list];
                    }
                    for (let vhost of list) {
                        VHOSTS.push(vhost);
                    }
                }
                // --- 重新加载证书 ---
                for (let vhost of VHOSTS) {
                    let cert = await Fs.readFile(c.CERT_PATH + vhost.cert);
                    let key = await Fs.readFile(c.CERT_PATH + vhost.key);
                    try {
                        SNI_MANAGER.use(vhost.name, cert, key);
                    } catch (e) {
                        console.log("SNI:" + e);
                    }
                }
            }
            await reload();

            // --- 启动 HTTP 服务器 ---
            let server = http2.createSecureServer({
                SNICallback: SNI_MANAGER.getSNICallback(),
                ciphers: "ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS"
            }, (req, res) => {
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
                let uri = url.parse(req.url);
                res.end("test: " + JSON.stringify(uri));
            });
            server.listen(4333);
        }
    } catch (e) {
        console.log(e);
    }
})();


import * as os from "os";
import * as cluster from "cluster";
import * as http from "http";
// --- 库和定义 ---
import * as Sys from "../lib/Sys";
import * as CopyFiles from "../sys/CopyFiles";

// --- 判断是执行命令的进程，还是正了八经的执行 Master 进程 ---
if (process.argv.length > 2) {
    // --- 执行命令 ---

    let cmds = process.argv.slice(2).join(",");
    http.request({
        hostname: "127.0.0.1",
        port: 10631,
        path: "/?" + cmds
    }, function(res: http.IncomingMessage) {
        res.on("data", function(chunk: Buffer) {
            if (chunk.toString() === "Done.") {
                console.log(`Command ${cmds} has been sent.`);
            } else {
                console.log(`Returns an information exception: ` + chunk);
            }
        });
    }).on("error", function() {
        console.log(`RPC Server Error.`);
    }).end();
} else {
    // --- 正了八经 ---

    // --- 创建 RPC 监听 - START ---

    http.createServer(async function(req: http.IncomingMessage, res: http.ServerResponse) {
        let cmds = (req.url || "").slice(2).split(",");
        if (cmds.indexOf("reload") !== -1) {
            // --- 为所有子线程发送 reload 信息 ---
            for (let pid in _WORKER_LIST) {
                _WORKER_LIST[pid].worker.send({
                    action: "reload"
                });
            }
        }
        if (cmds.indexOf("restart") !== -1) {
            // --- 为所有子线程发送 restart 信息 ---
            for (let pid in _WORKER_LIST) {
                _WORKER_LIST[pid].worker.send({
                    action: "restart"
                });
                // --- 开启新线程 ---
                await _fork(_WORKER_LIST[pid].cpu);
                // --- 删除记录 ---
                delete(_WORKER_LIST[pid]);
            }
        }
        if (cmds.indexOf("clearDataCache") !== -1) {
            // --- 为所有子线程发送 clearDataCache 信息 ---
            for (let pid in _WORKER_LIST) {
                _WORKER_LIST[pid].worker.send({
                    action: "clearDataCache"
                });
            }
        }
        res.end("Done.");
    }).listen(10631, "127.0.0.1");

    // --- 结束创建 RPC 监听 - END ---

    /** 当前运行中的子进程列表 */
    let _WORKER_LIST: {
        [key: number]: {
            worker: cluster.Worker,
            cpu: number,
            hbtime: number
        }
    } = {};
    const _CPU_LENGTH = os.cpus().length;
    // let _cpuLen = 1;

    // --- 检测是否有死掉的子进程，复活之 ---
    setInterval(function() {
        let now = Date.now();
        for (let pid in _WORKER_LIST) {
            if (now - _WORKER_LIST[pid].hbtime < 30000) {
                // --- 距离上次心跳，小于 30 秒，正常 ---
                // --- 子线程 10 秒发送一次心跳 ---
                continue;
            }
            // --- 异常 ---
            console.log("[Master] Worker " + pid + " lost.");
            let cpu = _WORKER_LIST[pid].cpu;
            delete(_WORKER_LIST[pid]);
            _fork(cpu);
        }
    }, 30000);  // 30 秒检测一次

    // --- 以下为 [主进程] 正戏 ---
    (async function() {
        // --- 将 front 的编译后的代码以及相关配套文件（css 等）复制到 dist ---
        await CopyFiles.run();
        // --- 启动和 CPU 数量一致的进程 ---
        console.log("[Master] Master start...");
        for (let i = 0; i < _CPU_LENGTH; ++i) {
            await _fork(i);
        }
        cluster.on("listening", function(worker, address) {
            // --- 子进程开始监听 ---
            console.log("[Master] Listening: worker " + worker.process.pid + ", Address: " + address.address + ":" + address.port + ".");
        }).on("exit", async function(worker, code, signal) {
            // --- 有子线程退出 ---
            if (code === 0) {
                // --- 正常关闭（子进程 disconnect） ---
                // --- 正常关闭，证明关闭前主进程以及重启新进程了，这里无需在 fork ---
                console.log("[Master] Worker " + worker.process.pid + " has been disconnected.");
            } else {
                // --- 中断，致命错误，需要重新启动一个新线程 ---
                console.log("[Master] Worker " + worker.process.pid + " has collapsed.");
                let cpu = _WORKER_LIST[worker.process.pid].cpu;
                delete(_WORKER_LIST[worker.process.pid]);
                await _fork(cpu);
            }
        });
    })();

    /**
     * --- 创建一个新的线程 ---
     * @param cpu CPU ID
     */
    async function _fork(cpu: number) {
        let worker = cluster.fork();
        _WORKER_LIST[worker.process.pid] = {
            worker: worker,
            cpu: cpu,
            hbtime: Date.now()
        };
        // --- 如果是支持将线程放到对应的 CPU，则执行相关操作 ---
        if (os.type().toLowerCase().indexOf("windows") === -1) {
            // --- 非 Windows ---
            let cpr = await Sys.exec("taskset -cp " + cpu + " " + worker.process.pid);
            console.log(cpr);
            console.log("[Master] Worker " + worker.process.pid + " start on cpu #" + cpu + ".");
        }
        // --- 监听子进程发来的讯息 ---
        worker.on("message", async function(msg) {
            switch (msg.action) {
                case "reload":
                case "clearDataCache": {
                    // --- 为所有子线程发送 reload, clearDataCache 信息 ---
                    for (let pid in _WORKER_LIST) {
                        _WORKER_LIST[pid].worker.send({
                            action: msg.action
                        });
                    }
                    break;
                }
                case "restart": {
                    // --- 为所有子线程发送 restart 信息 ---
                    for (let pid in _WORKER_LIST) {
                        _WORKER_LIST[pid].worker.send({
                            action: "restart"
                        });
                        // --- 开启新线程 ---
                        await _fork(_WORKER_LIST[pid].cpu);
                        // --- 删除记录 ---
                        delete(_WORKER_LIST[pid]);
                    }
                    break;
                }
                case "hbtime": {
                    // --- 获得子进程发来的 10 秒一次的心跳 ---
                    if (!_WORKER_LIST[msg.pid]) {
                        // --- 线程存在，主进程没找到 ---
                        console.log("[Master] Worker " + msg.pid + " not found.");
                        break;
                    }
                    _WORKER_LIST[msg.pid].hbtime = Date.now();
                    break;
                }
            }
        });
    }
}
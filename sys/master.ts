/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-2 21:03:42
 * Last: 2020-3-7 10:33:17, 2022-07-22 13:40:10, 2022-09-06 22:40:58
 */
import * as os from 'os';
import * as cluster from 'cluster';
import * as http from 'http';
// --- 库和定义 ---
import * as core from '~/lib/core';

/** --- 当前运行中的子进程列表 --- */
const workerList: Record<string, {
    /** --- worker 对象 --- */
    'worker': cluster.Worker;
    /** --- worker 对应的 CPU 编号 --- */
    'cpu': number;
    /** --- 此 worker 上次心跳时间 --- */
    'hbtime': number;
}> = {};

/**
 * --- 最终调用执行的函数块 ---
 */
async function run(): Promise<void> {
    // --- 监听 CMD 命令 ---
    createRpcListener();
    // --- 30 秒检测一次是否有丢失的子进程 ---
    setInterval(function() {
        checkWorkerLost().catch(function(e) {
            console.log('[master] [run] [checkWorkerLost]', e);
        });
    }, 30000);
    // --- 启动进程 ---
    const cpuLength = os.cpus().length;
    console.log('[master] [run] CPU LENGTH: ' + cpuLength.toString());
    for (let i = 0; i < cpuLength; ++i) {
        await createChildProcess(i);
    }
    cluster.default.on('listening', function(worker, address) {
        // --- 子进程开始监听 ---
        console.log(`[master] Listening: worker ${worker.process.pid}, Address: ${address.address}:${address.port}.`);
    }).on('exit', function(worker, code) {
        (async function() {
            if (!worker.process.pid) {
                return;
            }
            // --- 有子线程退出 ---
            if (code === 0) {
                // --- 正常关闭（子进程 disconnect） ---
                // --- 正常关闭，证明关闭前主进程已经重启新进程了，这里无需在 fork ---
                console.log(`[master] Worker ${worker.process.pid} has been disconnected.`);
            }
            else {
                // --- 中断，致命错误，需要重新启动一个新线程 ---
                console.log(`[master] Worker ${worker.process.pid} has collapsed.`);
                const cpu = workerList[worker.process.pid].cpu;
                delete workerList[worker.process.pid];
                await createChildProcess(cpu);
            }
        })().catch(function(e) {
            console.log('[master] [cluster] [exit]', e);
        });
    });
}

/**
 * --- 创建 RPC 监听，用来监听 cmd 传递过来的数据，并广播给所有子进程 ---
 */
function createRpcListener(): void {
    http.createServer(function(req: http.IncomingMessage, res: http.ServerResponse) {
        (async function() {
            /** --- cmds 结果例如 ["reload"] --- */
            const cmds = (req.url ?? '').slice(2).split(',');
            if (cmds.includes('reload')) {
                // --- 为所有子线程发送 reload 信息 ---
                for (const pid in workerList) {
                    workerList[pid].worker.send({
                        'action': 'reload'
                    });
                }
            }
            if (cmds.includes('restart')) {
                // --- 为所有子线程发送 stop 信息 ---
                for (const pid in workerList) {
                    workerList[pid].worker.send({
                        'action': 'stop'
                    });
                    // --- 开启新线程 ---
                    await createChildProcess(workerList[pid].cpu);
                    // --- 删除记录 ---
                    delete workerList[pid];
                }
            }
            res.end('Done.');
        })().catch(function(e) {
            console.log('[master] [createRpcListener]', e);
        });
    }).listen(10631, '127.0.0.1');
}

/**
 * --- 检测是否有死掉丢失的子进程，复活之 ---
 */
async function checkWorkerLost(): Promise<void> {
    const now = Date.now();
    for (const pid in workerList) {
        if (now - workerList[pid].hbtime < 30000) {
            // --- 距离上次心跳，小于 30 秒，正常 ---
            // --- 子线程 10 秒发送一次心跳 ---
            continue;
        }
        // --- 异常，也可能主线程因为各种原因休眠，不过无论如何都要将原线程关闭，要不然原线程又发心跳包，就捕获不到了 ---
        console.log(`[master] Worker ${pid} lost.`);
        workerList[pid].worker.send({
            'action': 'stop'
        });
        await createChildProcess(workerList[pid].cpu);
        delete workerList[pid];
    }
}

/**
 * --- 创建一个新的子进程 ---
 * @param cpu CPU ID
 */
async function createChildProcess(cpu: number): Promise<void> {
    const worker = cluster.default.fork();
    if (!worker.process.pid) {
        return;
    }
    workerList[worker.process.pid] = {
        'worker': worker,
        'cpu': cpu,
        'hbtime': Date.now()
    };
    // --- 如果是支持将线程放到对应的 CPU，则执行相关操作 ---
    if (!os.type().toLowerCase().includes('windows')) {
        // --- 非 Windows ---
        const cpr = await core.exec(`taskset -cp ${cpu} ${worker.process.pid}`);
        console.log(cpr);
        console.log(`[master] Worker ${worker.process.pid} start on cpu #${cpu}.`);
    }
    // --- 监听子进程发来的讯息，并扩散给所有子进程 ---
    worker.on('message', function(msg) {
        (async function() {
            switch (msg.action) {
                case 'reload': {
                    // --- 为所有子线程发送 reload 信息 ---
                    for (const pid in workerList) {
                        workerList[pid].worker.send({
                            'action': msg.action
                        });
                    }
                    break;
                }
                case 'restart': {
                    // --- 为所有子进程发送 restart 信息 ---
                    for (const pid in workerList) {
                        workerList[pid].worker.send({
                            'action': 'stop'
                        });
                        // --- 开启新线程 ---
                        await createChildProcess(workerList[pid].cpu);
                        // --- 删除记录 ---
                        delete workerList[pid];
                    }
                    break;
                }
                case 'hbtime': {
                    // --- 获得子进程发来的 10 秒一次的心跳 ---
                    if (!workerList[msg.pid]) {
                        // --- 线程存在，主进程记录里没找到 ---
                        console.log(`[master] Worker ${msg.pid} not found.`);
                        break;
                    }
                    workerList[msg.pid].hbtime = Date.now();
                    break;
                }
            }
        })().catch(function(e) {
            console.log('[createChildProcess] [message]', e);
        });
    });
}

run().catch(function(e): void {
    console.log('[master] ------ [Process fatal Error] ------');
    console.error(e);
});

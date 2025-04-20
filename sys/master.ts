/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-2 21:03:42
 * Last: 2020-3-7 10:33:17, 2022-07-22 13:40:10, 2022-09-06 22:40:58, 2024-2-7 01:44:59, 2024-7-2 15:17:09
 */
import * as os from 'os';
import * as cluster from 'cluster';
import * as http from 'http';
import * as net from 'net';
// --- 第三方 ---
import * as ws from '@litert/websocket';
// --- 库和定义 ---
import * as def from '~/sys/def';
import * as sRoute from '~/sys/route';
import * as lCore from '~/lib/core';
import * as lFs from '~/lib/fs';
import * as lText from '~/lib/text';
import * as lCrypto from '~/lib/crypto';
import * as lTime from '~/lib/time';
import * as lZip from '~/lib/zip';
import * as lWs from '~/lib/ws';

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
    // --- 读取配置文件 ---
    const configContent = await lFs.getContent(def.CONF_PATH + 'config.json', 'utf8');
    if (!configContent) {
        throw `File '${def.CONF_PATH}config.json' not found.`;
    }
    /** --- 系统 config.json --- */
    const config = lText.parseJson(configContent);
    for (const key in config) {
        lCore.globalConfig[key] = config[key];
    }
    // --- 监听 RPC 命令 ---
    createRpcListener();
    // --- 监听 IRP 中转 ---
    createIrpListener();
    // --- 30 秒检测一次是否有丢失的子进程 ---
    setInterval(function() {
        checkWorkerLost().catch(function(e) {
            console.log('[master] [run] [checkWorkerLost]', e);
        });
    }, 30000);
    // --- 启动进程 ---
    const cpuLength = os.cpus().length;
    console.log('[master] [run] CPU LENGTH: ' + cpuLength.toString());
    const cpuLengthMax = cpuLength > lCore.globalConfig.max ? lCore.globalConfig.max : cpuLength;
    for (let i = 0; i < cpuLengthMax; ++i) {
        await createChildProcess(i);
    }
    cluster.default.on('listening', function(worker, address) {
        // --- 子进程开始监听 ---
        console.log(`[master] Listening: worker ${worker.process.pid ?? 'undefined'}, Address: ${address.address}:${address.port}.`);
    }).on('exit', function(worker, code) {
        (async function() {
            if (!worker.process.pid) {
                return;
            }
            // --- 有子线程退出 ---
            if (code === 0) {
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
 * --- 创建 RPC 监听，用来监听 cmd 或局域网传递过来的数据，并广播给所有子进程，cmd 部分代码在 cmd 中实现 ---
 */
function createRpcListener(): void {
    http.createServer(function(req: http.IncomingMessage, res: http.ServerResponse) {
        (async function() {
            /** --- 当前时间戳 --- */
            const time = lTime.stamp();
            /** --- cmd 数据对象 --- */
            const cmd = lCrypto.aesDecrypt((req.url ?? '').slice(1), lCore.globalConfig.rpcSecret);
            if (!cmd) {
                res.end('Error');
                return;
            }
            const msg = lText.parseJson(cmd);
            if (!msg) {
                res.end('Failed');
                return;
            }
            if (msg.time < time - 5) {
                res.end('Timeout');
                return;
            }
            if (lCore.globalConfig.rpcSecret === 'MUSTCHANGE') {
                res.end('rpcSecret need be "' + lCore.random(32, lCore.RANDOM_LUN) + '"');
                return;
            }
            switch (msg.action) {
                case 'reload': {
                    // --- 为所有子线程发送 reload 信息 ---
                    for (const pid in workerList) {
                        workerList[pid].worker.send({
                            'action': 'reload'
                        });
                    }
                    break;
                }
                case 'restart': {
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
                    break;
                }
                case 'global': {
                    // --- 为所有子进程更新 global 变量 ---
                    for (const pid in workerList) {
                        workerList[pid].worker.send({
                            'action': 'global',
                            'key': msg.key,
                            'data': msg.data
                        });
                    }
                    // --- 更新 master 的数据 ---
                    if (msg.data === undefined || msg.data === null) {
                        delete lCore.global[msg.key];
                        break;
                    }
                    lCore.global[msg.key] = msg.data;
                    break;
                }
                case 'code': {
                    // --- 更新 code 代码包 ---
                    const rtn = await sRoute.getFormData(req);
                    if (!rtn) {
                        res.end('Abnormal');
                        return;
                    }
                    const file = rtn.files['file'];
                    if (!file || Array.isArray(file)) {
                        res.end('Abnormal');
                        await sRoute.unlinkUploadFiles(rtn.files);
                        return;
                    }
                    let path = rtn.post['path'];
                    if (path.startsWith('/')) {
                        path = path.slice(1);
                    }
                    if (path.endsWith('/')) {
                        path = path.slice(0, -1);
                    }
                    /** --- 最终更新的根目录，以 / 结尾，但用户传入的无所谓 --- */
                    let to = def.ROOT_PATH + path;
                    if (!to.endsWith('/')) {
                        to += '/';
                    }
                    if (!await lFs.isDir(to)) {
                        res.end('Path not found: ' + to);
                        await sRoute.unlinkUploadFiles(rtn.files);
                        return;
                    }
                    const buf = await lFs.getContent(file.path);
                    if (!buf) {
                        res.end('System error');
                        await sRoute.unlinkUploadFiles(rtn.files);
                        return;
                    }
                    const zip = await lZip.get(buf);
                    if (!zip) {
                        res.end('Zip error');
                        await sRoute.unlinkUploadFiles(rtn.files);
                        return;
                    }
                    const ls = await zip.getList();
                    for (const path in ls) {
                        /** --- 带 / 开头的 zip 中文件完整路径 --- */
                        const fpath = path.startsWith('/') ? path : '/' + path;
                        /** --- 最后一个 / 的所在位置 --- */
                        const lio = fpath.lastIndexOf('/');
                        /** --- 纯路径，不以 / 开头，以 / 结尾，若是根路径就是空字符串 --- */
                        const pat = fpath.slice(1, lio + 1);
                        /** --- 纯文件名 --- */
                        const fname = fpath.slice(lio + 1);
                        if ((pat === 'conf/' && fname === 'config.json') || fname === 'kebab.json') {
                            // --- 特殊文件不能覆盖 ---
                            continue;
                        }
                        if (fname.endsWith('.js.map') || fname.endsWith('.ts') || fname.endsWith('.gitignore')) {
                            // --- 测试或开发文件不覆盖 ---
                            continue;
                        }
                        // --- 看文件夹是否存在 ---
                        if (pat && !await lFs.isDir(to + pat)) {
                            await lFs.mkdir(to + pat);
                        }
                        // --- 覆盖或创建文件 ---
                        await lFs.putContent(to + pat + fname, ls[path]);
                    }
                    await sRoute.unlinkUploadFiles(rtn.files);
                    // --- 检查是否更新 config ---
                    if (rtn.post['config'] === '1') {
                        const configContent = await lFs.getContent(def.CONF_PATH + 'config.json', 'utf8');
                        if (configContent) {
                            await lFs.putContent(def.CONF_PATH + 'config.json', configContent.replace(/"staticVer": ".+?"/, `"staticVer": "${lTime.format(null, 'YmdHis')}"`), {
                                'encoding': 'utf8'
                            });
                        }
                    }
                    break;
                }
                default: {
                    res.end('Not command: ' + msg.action);
                    return;
                }
            }
            res.end('Done');
        })().catch(function(e) {
            console.log('[master] [createRpcListener]', e);
        });
    }).listen(lCore.globalConfig.rpcPort);
}

// --- IRP - TODO ---

/** --- 当前连接中的 irp 连接（客户端 -> 服务端） --- */
const irpConnection: Record<string, Record<string, {
    'id': number;
    'last': number;
    'using': boolean;
    'link': lWs.Socket;
}>> = {};

/** --- 当前的 irp 连接自增 id --- */
let irpId = 0;

/**
 * --- 创建 IRP 局域网中转，用来监听 IRP 客户端接入后再中转给本连接，真正客户访问时再反代给这个连接，实现桥接 ---
 */
function createIrpListener(): void {
    http.createServer(function(req: http.IncomingMessage, res: http.ServerResponse) {
        // --- Server 进入的 ---
        /** --- 当前时间戳 --- */
        const time = lTime.stamp();
        /** --- cmd 数据对象 --- */
        const cmd = lCrypto.aesDecrypt((req.url ?? '').slice(1), lCore.globalConfig.rpcSecret);
        if (!cmd) {
            res.end('---IRP-MSG---Error');
            return;
        }
        const msg = lText.parseJson(cmd);
        if (!msg) {
            res.end('---IRP-MSG---Failed');
            return;
        }
        if (msg.time < time - 5) {
            res.end('---IRP-MSG---Timeout');
            return;
        }
        if (lCore.globalConfig.rpcSecret === 'MUSTCHANGE') {
            res.end('---IRP-MSG---irpSecret need be "' + lCore.random(32, lCore.RANDOM_LUN) + '"');
            return;
        }
        switch (msg.action) {
            case 'server': {

                break;
            }
            default: {
                res.end('---IRP-MSG---Not command: ' + msg.action);
                return;
            }
        }
        res.end('---IRP-MSG---Done');
    }).on('upgrade', function(req: http.IncomingMessage, socket: net.Socket): void {
        // --- 只接收 WebSocket 连接 ---
        const wsSocket = lWs.createServer(req, socket);
        /** --- 当前时间戳 --- */
        const time = lTime.stamp();
        /** --- cmd 数据对象 --- */
        const cmd = lCrypto.aesDecrypt((req.url ?? '').slice(1), lCore.globalConfig.rpcSecret);
        if (!cmd) {
            wsSocket.end();
            return;
        }
        const msg = lText.parseJson(cmd);
        if (!msg) {
            wsSocket.end();
            return;
        }
        if (msg.time < time - 5) {
            wsSocket.end();
            return;
        }
        if (lCore.globalConfig.irpSecret === 'MUSTCHANGE') {
            wsSocket.writeText('irpSecret need be "' + lCore.random(32, lCore.RANDOM_LUN) + '"');
            wsSocket.end();
            return;
        }
        // --- 鉴权通过 ---
        if (irpConnection[msg.name] === undefined) {
            irpConnection[msg.name] = {};
        }
        const id = ++irpId;
        irpConnection[msg.name][id.toString()] = {
            'id': id,
            'last': time,
            'using': false,
            'link': wsSocket
        };
        wsSocket.on('message', function(msg): void {
            switch (msg.opcode) {
                case ws.EOpcode.CLOSE: {
                    wsSocket.end();
                    break;
                }
                case ws.EOpcode.PING: {
                    wsSocket.pong();
                    break;
                }
                case ws.EOpcode.BINARY:
                case ws.EOpcode.TEXT: {
                    wsSocket.end();
                    break;
                }
                default: {
                    // --- nothing ---
                }
            }
        }).on('error', () => {
            wsSocket.end();
            if (irpConnection[msg.name][id.toString()]) {
                delete irpConnection[msg.name][id.toString()];
            }
        }).on('close', () => {
            // --- CLOSE ---
            if (!wsSocket.ended) {
                wsSocket.end();
            }
            if (irpConnection[msg.name][id.toString()]) {
                delete irpConnection[msg.name][id.toString()];
            }
        });
    }).listen(lCore.globalConfig.irpPort);
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
        const cpr = await lCore.exec(`taskset -cp ${cpu} ${worker.process.pid}`);
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
                case 'global': {
                    // --- 为所有子进程更新 global 变量 ---
                    for (const pid in workerList) {
                        workerList[pid].worker.send({
                            'action': 'global',
                            'key': msg.key,
                            'data': msg.data
                        });
                    }
                    // --- 更新 master 的数据 ---
                    if (msg.data === undefined || msg.data === null) {
                        delete lCore.global[msg.key];
                        break;
                    }
                    lCore.global[msg.key] = msg.data;
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
    // --- 将主线程的全局变量传给这个新建的子线程 ---
    if (Object.keys(lCore.global).length) {
        worker.send({
            'action': 'global',
            'key': '__init__',
            'data': lCore.global
        });
    }
}

run().catch(function(e): void {
    console.log('[master] ------ [Process fatal Error] ------');
    console.error(e);
});

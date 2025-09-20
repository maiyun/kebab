/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-2 21:03:42
 * Last: 2020-3-7 10:33:17, 2022-07-22 13:40:10, 2022-09-06 22:40:58, 2024-2-7 01:44:59, 2024-7-2 15:17:09, 2025-6-13 13:06:43
 */
import * as os from 'os';
import * as cluster from 'cluster';
import * as http from 'http';
// --- 库和定义 ---
import * as kebab from '#index.js';
import * as sRoute from '#sys/route.js';
import * as lCore from '#lib/core.js';
import * as lFs from '#lib/fs.js';
import * as lText from '#lib/text.js';
import * as lCrypto from '#lib/crypto.js';
import * as lTime from '#lib/time.js';
import * as lZip from '#lib/zip.js';

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
    const configContent = await lFs.getContent(kebab.CONF_CWD + 'config.json', 'utf8');
    if (!configContent) {
        throw `File '${kebab.CONF_CWD}config.json' not found.`;
    }
    /** --- 系统 config.json --- */
    const config = lText.parseJson(configContent);
    for (const key in config) {
        lCore.globalConfig[key] = config[key];
    }
    // --- 监听 RPC 命令 ---
    createRpcListener();
    // --- 30 秒检测一次是否有丢失的子进程 ---
    setInterval(function() {
        checkWorkerLost().catch(function(e) {
            lCore.display('[master] [run] [checkWorkerLost]', e);
        });
    }, 30000);
    // --- 启动进程 ---
    const cpuLength = os.cpus().length;
    lCore.display('[master] [run] CPU LENGTH: ' + cpuLength.toString());
    const cpuLengthMax = cpuLength > lCore.globalConfig.max ? lCore.globalConfig.max : cpuLength;
    for (let i = 0; i < cpuLengthMax; ++i) {
        await createChildProcess(i);
    }
    cluster.default.on('listening', function(worker, address) {
        // --- 子进程开始监听 ---
        lCore.display(`[master] Listening: worker ${worker.process.pid ?? 'undefined'}, Address: ${address.address}:${address.port}.`);
    }).on('exit', function(worker, code) {
        (async function() {
            if (!worker.process.pid) {
                return;
            }
            // --- 有子线程退出 ---
            if (code === 0) {
                // --- 正常关闭，证明关闭前主进程已经重启新进程了，这里无需在 fork ---
                lCore.display(`[master] Worker ${worker.process.pid} has been disconnected.`);
            }
            else {
                // --- 中断，致命错误，需要重新启动一个新线程 ---
                lCore.display(`[master] Worker ${worker.process.pid} has collapsed.`);
                const cpu = workerList[worker.process.pid].cpu;
                delete workerList[worker.process.pid];
                await createChildProcess(cpu);
            }
        })().catch(function(e) {
            lCore.display('[master] [cluster] [exit]', e);
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
                res.end(`The rpcSecret is not set. It's recommended to set it to: ${lCore.random(32, lCore.RANDOM_LUN)}`);
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
                    let to = kebab.ROOT_CWD + path;
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
                            if (rtn.post['strict'] === '1') {
                                res.end('Path not found: ' + to + pat);
                                await sRoute.unlinkUploadFiles(rtn.files);
                                return;
                            }
                            await lFs.mkdir(to + pat);
                        }
                        // --- 覆盖或创建文件 ---
                        if ((rtn.post['strict'] === '1') && !await lFs.isFile(to + pat + fname)) {
                            res.end('Path not found: ' + to + pat + fname);
                            await sRoute.unlinkUploadFiles(rtn.files);
                            return;
                        }
                        await lFs.putContent(to + pat + fname, ls[path]);
                    }
                    await sRoute.unlinkUploadFiles(rtn.files);
                    // --- 检查是否更新 config ---
                    if (rtn.post['config'] === '1') {
                        const configContent = await lFs.getContent(kebab.CONF_CWD + 'config.json', 'utf8');
                        if (configContent) {
                            await lFs.putContent(kebab.CONF_CWD + 'config.json', configContent.replace(/"staticVer": ".+?"/, `"staticVer": "${lTime.format(null, 'YmdHis')}"`), {
                                'encoding': 'utf8'
                            });
                        }
                    }
                    break;
                }
                case 'log': {
                    // --- 获取日志信息 ---
                    const path = kebab.LOG_CWD + msg.hostname + (msg.fend ?? '') + '/' + msg.path + '.csv';
                    if (!await lFs.isFile(path)) {
                        res.end(lText.stringifyJson({
                            'result': 1,
                            'data': false,
                        }));
                        return;
                    }
                    /** --- 剩余 limit --- */
                    let limit = msg.limit ?? 100;
                    /** --- 剩余 offset --- */
                    let offset = msg.offset ?? 0;
                    const rtn = await new Promise<string[][] | null | false>((resolve) => {
                        const list: string[][] = [];
                        /** --- 当前行号 --- */
                        let line = 0;
                        /** --- 当前行数据 --- */
                        let packet = '';
                        lFs.createReadStream(path, {
                            'encoding': 'utf8',
                            'start': msg.start,
                        }).on('data', (buf) => {
                            if (typeof buf !== 'string') {
                                return;
                            }
                            while (true) {
                                // --- 分包 ---
                                const index = buf.indexOf('\n');
                                if (index === -1) {
                                    // --- 本次包还没有结束 ---
                                    packet += buf;
                                    break;
                                }
                                // --- 本次行结束了 ---
                                if (limit === 0) {
                                    break;
                                }
                                packet += buf.slice(0, index);
                                buf = buf.slice(index + 1);
                                ++line;
                                // --- 先执行下本次完成的 ---
                                if (line > 1) {
                                    if (offset === 0) {
                                        if (!msg.search || packet.includes(msg.search)) {
                                            const result: string[] = [];
                                            let currentField = '';
                                            let inQuotes = false;
                                            for (let i = 0; i < packet.length; ++i) {
                                                const char = packet[i];
                                                if (char === '"') {
                                                    if (inQuotes && packet[i + 1] === '"') {
                                                        currentField += '"';
                                                        ++i;
                                                    }
                                                    else {
                                                        inQuotes = !inQuotes;
                                                    }
                                                }
                                                else if (char === ',' && !inQuotes) {
                                                    result.push(currentField);
                                                    currentField = '';
                                                }
                                                else {
                                                    currentField += char;
                                                }
                                            }
                                            result.push(currentField);
                                            list.push(result);
                                            --limit;
                                        }
                                    }
                                    else {
                                        --offset;
                                    }
                                }
                                // --- 处理结束 ---
                                packet = '';
                                // --- 看看还有没有后面的粘连包 ---
                                if (!buf.length) {
                                    // --- 没粘连包 ---
                                    break;
                                }
                                // --- 有粘连包 ---
                            }
                        }).on('end', () => {
                            resolve(list);
                        }).on('error', () => {
                            resolve(false);
                        });
                    });
                    res.end(lText.stringifyJson({
                        'result': 1,
                        'data': rtn,
                    }));
                    return;
                }
                case 'ls': {
                    // --- 获取目录内文件/文件夹列表 ---
                    const path = lText.urlResolve(kebab.ROOT_CWD, msg.path);
                    res.end(lText.stringifyJson({
                        'result': 1,
                        'data': (await lFs.readDir(path, msg.encoding)).map(item => ({
                            'isFile': item.isFile(),
                            'isDirectory': item.isDirectory(),
                            'isSymbolicLink': item.isSymbolicLink(),
                            'name': item.name,
                        })),
                    }));
                    return;
                }
                default: {
                    res.end('Not command: ' + msg.action);
                    return;
                }
            }
            res.end('Done');
        })().catch(function(e) {
            lCore.display('[master] [createRpcListener]', e);
        });
    }).listen(lCore.globalConfig.rpcPort);
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
        lCore.display(`[master] Worker ${pid} lost.`);
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
        lCore.display(cpr);
        lCore.display(`[master] Worker ${worker.process.pid} start on cpu #${cpu}.`);
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
                        lCore.display(`[master] Worker ${msg.pid} not found.`);
                        break;
                    }
                    workerList[msg.pid].hbtime = Date.now();
                    break;
                }
            }
        })().catch(function(e) {
            lCore.display('[createChildProcess] [message]', e);
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
    lCore.display('[master] ------ [Process fatal Error] ------');
    lCore.display(e);
});

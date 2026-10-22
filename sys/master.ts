/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-2 21:03:42
 * Last: 2020-3-7 10:33:17, 2022-07-22 13:40:10, 2022-09-06 22:40:58, 2024-2-7 01:44:59, 2024-7-2 15:17:09, 2025-6-13 13:06:43, 2025-12-5 13:15:03, 2026-3-22 00:00:00, 2026-4-30 13:49:44
 */
import cluster from 'cluster';
import * as os from 'os';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as stream from 'stream/promises';
// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as sRoute from '#kebab/sys/route.js';
import * as sMonitorFiles from '#kebab/sys/monitor/files.js';
import * as lCore from '#kebab/lib/core.js';
import * as lFs from '#kebab/lib/fs.js';
import * as lText from '#kebab/lib/text.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as lTime from '#kebab/lib/time.js';
import * as lZip from '#kebab/lib/zip.js';
import * as masterLog from '#kebab/abox/master-log.js';
import * as masterVhost from '#kebab/abox/master-vhost.js';

/**
 * --- 解析一行 CSV，保留空字段，并处理字段里的逗号和引号 ---
 * @param line 不含换行符的 CSV 行
 * @returns 按原顺序排列的字段
 */
const parseCsvLine: (line: string) => string[] = masterLog.parseCsvLine;

/**
 * --- 串行替换 vhost 目录；先写临时目录，切换失败时恢复旧目录 ---
 * @param directory 固定的 vhost 目录
 * @param files 已通过校验的文件名与 JSON 原文
 * @param report 记录替换、恢复或临时目录清理失败
 * @returns 成功返回 Done；失败返回错误信息，恢复失败时包含备份目录
 */
const replaceVhost: (
    directory: string, files: Record<string, string>, report: (message: string, error: unknown) => void
) => Promise<string> = masterVhost.replace;

/**
 * --- 校验非空 vhost 文件集合：仅直接 .json 文件名，不允许路径或大小写重名 ---
 * --- 每份 JSON 为 IVhost 或其数组：domains 为字符串数组，root 为字符串，name/remark 可选字符串 ---
 * @param files POST 中的文件集合
 * @returns true 表示所有文件可写入；false 表示整批拒绝，不修改旧配置
 */
const isVhostFiles: (files: unknown) => files is Record<string, string> = masterVhost.isFiles;

/** --- 当前运行中的子进程列表 --- */
const workerList: Record<string, {
    /** --- worker 对象 --- */
    'worker': cluster.Worker;
    /** --- worker 对应的 CPU 编号 --- */
    'cpu': number;
    /** --- 此 worker 上次心跳时间 --- */
    'hbtime': number;
}> = {};

/** --- 是否已开始停止整个服务 --- */
let stopping = false;

/** --- 正在执行的停止任务，重复 stop 时继续等这个任务 --- */
let stopPromise: Promise<void> | null = null;

/** --- 正在执行的重启任务，重复请求不再另起一轮 --- */
let restartPromise: Promise<void> | null = null;

/** --- 正在替换失联 worker 的任务，重启时先等它结束 --- */
let workerCheckPromise: Promise<void> | null = null;

/**
 * --- 判断路径是否在指定目录内 ---
 * @param rootPath 已解析的真实根目录
 * @param candidate 候选绝对路径
 */
function isPathInside(rootPath: string, candidate: string): boolean {
    const relative = path.relative(rootPath, candidate);
    return (relative === '') || (!relative.startsWith(`..${path.sep}`) && (relative !== '..') && !path.isAbsolute(relative));
}

/**
 * --- 把输入路径转成完整路径，防止通过 .. 或软链接访问根目录外的文件 ---
 * @param rootPath 限定的根目录
 * @param inputPath 用户输入的相对路径
 */
async function resolvePathInside(rootPath: string, inputPath: string): Promise<string | null> {
    if ((typeof inputPath !== 'string') || inputPath.includes('\0')) {
        return null;
    }
    const rootReal = await fs.promises.realpath(rootPath);
    const normalizedInput = inputPath.replace(/\\/g, '/').replace(/^\/+/, '');
    if (/^[a-zA-Z]:/.test(normalizedInput)) {
        return null;
    }
    const candidate = path.resolve(rootReal, normalizedInput);
    if (!isPathInside(rootReal, candidate)) {
        return null;
    }

    /** --- 路径还不存在时，往上找已有的部分，检查软链接是否指向根目录外 --- */
    let existingPath = candidate;
    const missingParts: string[] = [];
    while (true) {
        try {
            const existingReal = await fs.promises.realpath(existingPath);
            const resolved = path.resolve(existingReal, ...missingParts);
            return isPathInside(rootReal, resolved) ? resolved : null;
        }
        catch (e: unknown) {
            if ((e as NodeJS.ErrnoException).code !== 'ENOENT') {
                lCore.display('[master] [resolvePathInside]', e);
                return null;
            }
            const parent = path.dirname(existingPath);
            if (parent === existingPath) {
                return null;
            }
            missingParts.unshift(path.basename(existingPath));
            existingPath = parent;
        }
    }
}

/**
 * --- 统一 ZIP 文件路径中的斜杠，并拒绝 .. 等不安全写法 ---
 * @param archivePath ZIP 内的原始路径
 * @returns 以 / 开头的 ZIP 内路径；路径不允许时返回 null
 */
function normalizeArchivePath(archivePath: string): string | null {
    const normalizedSlashes = archivePath.replace(/\\/g, '/').replace(/^\/+/, '');
    if (
        !normalizedSlashes ||
        normalizedSlashes.includes('\0') ||
        /^[a-zA-Z]:/.test(normalizedSlashes) ||
        normalizedSlashes.split('/').some(part => !part || (part === '.') || (part === '..'))
    ) {
        return null;
    }
    return `/${normalizedSlashes}`;
}

/**
 * --- 检查 JSON 中有没有 pwd 或 skey，嵌套对象也要检查 ---
 * @param value 待检查的 JSON 值
 * @returns 是否包含 pwd 或 skey 参数
 */
function hasSensitiveConfigKey(value: unknown): boolean {
    if (Array.isArray(value)) {
        return value.some(item => hasSensitiveConfigKey(item));
    }
    if ((value === null) || (typeof value !== 'object')) {
        return false;
    }
    for (const key of Object.keys(value)) {
        if ((key === 'pwd') || (key === 'skey')) {
            return true;
        }
        if (hasSensitiveConfigKey((value as Record<string, unknown>)[key])) {
            return true;
        }
    }
    return false;
}

/**
 * --- 检查 ZIP 中的 kebab.json 有没有 pwd 或 skey ---
 * @param content ZIP 文件内容
 * @returns 是否包含 pwd 或 skey 参数
 */
function hasSensitiveConfig(content: Buffer | string): boolean {
    const json = lText.parseJson<unknown>(typeof content === 'string' ? content : content.toString('utf8'));
    return (json !== false) && hasSensitiveConfigKey(json);
}

/**
 * --- 等待 worker 开始监听端口，超时后继续执行 ---
 * @param worker 要等待的 worker 对象
 * @param timeout 超时时间（毫秒），默认 30 秒
 */
function waitForWorkerListening(worker: cluster.Worker, timeout: number = 30_000): Promise<void> {
    return new Promise((resolve) => {
        let timer: NodeJS.Timeout;
        const onListening = (w: cluster.Worker) => {
            if (w.id === worker.id) {
                clearTimeout(timer);
                cluster.removeListener('listening', onListening);
                resolve();
            }
        };
        timer = setTimeout(() => {
            lCore.display(`[master] Worker ${worker.process.pid ?? 'undefined'} timed out waiting for listening, proceeding anyway.`);
            cluster.removeListener('listening', onListening);
            resolve();
        }, timeout);
        cluster.on('listening', onListening);
    });
}

/**
 * --- 最终调用执行的函数块 ---
 */
async function run(): Promise<void> {
    // --- 设置 cluster 调度策略为 round-robin（在支持的平台上启用负载均衡） ---
    cluster.schedulingPolicy = cluster.SCHED_RR;
    // --- 设置 worker 进程的 Node 启动参数 ---
    cluster.setupPrimary({
        'execArgv': [
            ...process.execArgv,
            // --- 堆接近上限时自动生成堆快照（最多 3 次），用于定位内存泄漏 ---
            '--heapsnapshot-near-heap-limit=3',
        ],
    });
    // --- 读取配置文件 ---
    await lCore.loadEnv(kebab.ROOT_CWD);
    const configContent = await lFs.getContent(kebab.CONF_CWD + 'config.json', 'utf8');
    if (!configContent) {
        throw `File '${kebab.CONF_CWD}config.json' not found.`;
    }
    /** --- 系统 config.json --- */
    const config = lText.parseJson<any>(configContent);
    lCore.resolveEnvVars(config);
    for (const key in config) {
        lCore.globalConfig[key] = config[key];
    }
    // --- 监听 RPC 命令 ---
    createRpcListener();
    // --- 开发模式下启用文件监听自动重载 ---
    startFileWatcher();
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
    cluster.on('listening', function(worker: cluster.Worker, address: { 'address': string; 'port': number; 'addressType': number | string; }) {
        // --- 子进程开始监听 ---
        lCore.display(`[master] Listening: worker ${worker.process.pid ?? 'undefined'}, Address: ${address.address}:${address.port}.`);
    }).on('exit', function(worker: cluster.Worker, code: number) {
        (async function() {
            if (!worker.process.pid) {
                return;
            }
            const entry = workerList[worker.process.pid];
            delete workerList[worker.process.pid];
            // --- 有子线程退出 ---
            if (code === 0) {
                // --- 正常退出，无需再启动替代进程 ---
                lCore.display(`[master] Worker ${worker.process.pid} has been disconnected.`);
            }
            else {
                // --- 异常退出，检查是否需要补一个 worker ---
                lCore.display(`[master] Worker ${worker.process.pid} has collapsed.`);
                if (!entry) {
                    return;
                }
                // --- 先等正在进行的重启或失联检查结束，免得重复启动 worker ---
                await Promise.allSettled([restartPromise, workerCheckPromise]);
                if (stopping) {
                    return;
                }
                for (const current of Object.values(workerList)) {
                    if (current.cpu === entry.cpu && current.worker.isConnected() && !current.worker.isDead()) {
                        return;
                    }
                }
                await createChildProcess(entry.cpu);
            }
        })().catch(function(e) {
            lCore.display('[master] [cluster] [exit]', e);
        });
    });
}

/**
 * --- 接收并执行本机命令行或其他服务器发来的 RPC 命令 ---
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
            const msg = lText.parseJson<any>(cmd);
            if (!msg) {
                res.end('Failed');
                return;
            }
            if ((typeof msg.time !== 'number') || (Math.abs(msg.time - time) > 5)) {
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
                    await restartWorkers();
                    break;
                }
                case 'stop': {
                    gracefulStop().catch((e: unknown) => {
                        lCore.display('[master] [gracefulStop]', e);
                    });
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
                case 'pm2': {
                    // --- 接收 PM2 操作 ---
                    if (!msg.name || typeof msg.name !== 'string') {
                        res.end('Invalid name');
                        return;
                    }
                    // --- 安全过滤，只允许字母、数字、下划线、短横线 ---
                    if (!/^[a-zA-Z0-9_-]+$/.test(msg.name)) {
                        res.end('Invalid name format');
                        return;
                    }
                    // --- 校验 pm2Action ---
                    if (msg.pm2Action !== 'start' && msg.pm2Action !== 'stop' && msg.pm2Action !== 'restart') {
                        res.end('Invalid pm2Action');
                        return;
                    }
                    // --- 先回复 Done 再执行 PM2，避免进程先退出，调用方收不到回复 ---
                    res.end('Done');
                    setTimeout(() => {
                        lCore.exec(`pm2 ${msg.pm2Action} ${msg.name}`).then((rtn) => {
                            if (rtn === false) {
                                lCore.display(`[master] PM2 ${msg.pm2Action} ${msg.name} failed.`);
                            }
                        }).catch((e: unknown) => {
                            lCore.display(`[master] PM2 ${msg.pm2Action} ${msg.name} failed.`, e);
                        });
                    }, 1_000);
                    return;
                }
                case 'npm': {
                    // --- 执行 npm install 操作 ---
                    if (!msg.path || typeof msg.path !== 'string') {
                        res.end('Invalid path');
                        return;
                    }
                    if (!await lFs.isDir(msg.path)) {
                        res.end('Path not found');
                        return;
                    }
                    // --- 安装和重试合计最多 5 分钟，给 sendNpm 留 30 秒接收结果 ---
                    const npmTimeout = 300_000;
                    const npmDeadline = Date.now() + npmTimeout;
                    let rtn = await lCore.exec('npm i --omit=dev', {
                        'cwd': msg.path,
                        'timeout': npmTimeout,
                    });
                    if (rtn === false) {
                        // --- 部分项目可能存在 peerDependencies 冲突，失败后降级为 legacy-peer-deps 再试一次 ---
                        const remaining = npmDeadline - Date.now();
                        if (remaining > 0) {
                            rtn = await lCore.exec('npm i --omit=dev --legacy-peer-deps', {
                                'cwd': msg.path,
                                'timeout': remaining,
                            });
                        }
                    }
                    if (rtn === false) {
                        res.end('Exec failed');
                        return;
                    }
                    break;
                }
                case 'project': {
                    // --- 更新项目 kebab.json ---
                    if (!msg.path || typeof msg.path !== 'string') {
                        res.end('Invalid path');
                        return;
                    }
                    // --- 参数校验前置，避免无效 IO ---
                    if (!msg.staticVer || typeof msg.staticVer !== 'string') {
                        res.end('Invalid staticVer');
                        return;
                    }
                    const to = await resolvePathInside(kebab.ROOT_CWD, msg.path);
                    if (!to) {
                        res.end('Invalid path');
                        return;
                    }
                    if (!await lFs.isDir(to)) {
                        res.end('[project] Path not found: ' + to);
                        return;
                    }
                    const projectFile = path.join(to, 'kebab.json');
                    if (!await lFs.isFile(projectFile)) {
                        res.end('kebab.json not found in project path');
                        return;
                    }
                    const projectContent = await lFs.getContent(projectFile, 'utf8');
                    if (!projectContent) {
                        res.end('Failed to read kebab.json');
                        return;
                    }
                    const projectJson = lText.parseJson<any>(projectContent);
                    if (!projectJson) {
                        res.end('Invalid kebab.json');
                        return;
                    }
                    // --- 只允许更新 set.staticVer 字段 ---
                    projectJson.set ??= {};
                    projectJson.set.staticVer = msg.staticVer;
                    const wrtn = await lFs.putContent(projectFile, lText.stringifyJson(projectJson, 4));
                    if (!wrtn) {
                        res.end('Failed to write kebab.json');
                        return;
                    }
                    break;
                }
                case 'package': {
                    // --- 将用户的 package.json 的内容替换掉项目根的 package.json ---
                    if (!msg.content || typeof msg.content !== 'string') {
                        res.end('Invalid content');
                        return;
                    }
                    const packageFile = kebab.ROOT_CWD + 'package.json';
                    if (!await lFs.isFile(packageFile)) {
                        res.end('package.json not found');
                        return;
                    }
                    const wrtn = await lFs.putContent(packageFile, msg.content);
                    if (!wrtn) {
                        res.end('Failed to write package.json');
                        return;
                    }
                    break;
                }
                case 'vhost': {
                    if (req.method !== 'POST') {
                        res.end('Invalid method');
                        return;
                    }
                    const body = await sRoute.getPost(req);
                    if (body === false || !isVhostFiles(body.raw)) {
                        res.end('Invalid vhost files');
                        return;
                    }
                    // --- 仅更新磁盘配置，是否 reload 由调用方决定 ---
                    const result = await replaceVhost(kebab.VHOST_CWD, body.raw, (message, error) => {
                        lCore.display(`[master] [vhost] ${message}`, error);
                    });
                    res.end(result);
                    return;
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
                    const inputPath = rtn.post['path'];
                    if (typeof inputPath !== 'string') {
                        res.end('Invalid path');
                        await sRoute.unlinkUploadFiles(rtn.files);
                        return;
                    }
                    /** --- 最终更新的根目录 --- */
                    const targetPath = await resolvePathInside(kebab.ROOT_CWD, inputPath);
                    if (!targetPath) {
                        res.end('Invalid path');
                        await sRoute.unlinkUploadFiles(rtn.files);
                        return;
                    }
                    const to = targetPath + path.sep;
                    if (!await lFs.isDir(to)) {
                        if (rtn.post['strict'] === '1') {
                            res.end(`[code][0] [${rtn.post['strict']}] Path not found: ${to}`);
                            await sRoute.unlinkUploadFiles(rtn.files);
                            return;
                        }
                        await lFs.mkdir(to);
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
                    const archiveEntries = zip.readDir('/', {
                        'hasChildren': true,
                        'hasDir': false,
                    });
                    const archiveSize = archiveEntries.reduce((total, item) => total + item.uncompressedSize, 0);
                    if ((archiveEntries.length > 10_000) || (archiveSize > 512 * 1024 * 1024)) {
                        res.end('Archive limit exceeded');
                        await sRoute.unlinkUploadFiles(rtn.files);
                        return;
                    }
                    const rawList = await zip.getList();
                    /** --- 通过路径检查的 ZIP 文件，路径都以 / 开头 --- */
                    const ls: Record<string, Buffer | string> = {};
                    for (const archivePath in rawList) {
                        const normalizedPath = normalizeArchivePath(archivePath);
                        if (!normalizedPath || (ls[normalizedPath] !== undefined)) {
                            res.end('Invalid archive path');
                            await sRoute.unlinkUploadFiles(rtn.files);
                            return;
                        }
                        ls[normalizedPath] = rawList[archivePath];
                    }
                    // --- 预扫描：收集 .cga 锁定目录和 kebab 子项目目录 ---
                    /** --- .cga 锁定的目录集合，key 格式为"父路径/目录名/"（不含开头/，含尾部/），例如 "www/pika/" --- */
                    const cgaLockedDirs = new Set<string>();
                    /** --- 含有 kebab.json 的目录路径集合（不含开头/，含尾部/，根目录为空字符串） --- */
                    const kebabProjectDirs = new Set<string>();
                    /** --- 本次部署涉及到的目录路径集合（不含开头/，含尾部/，根目录为空字符串） --- */
                    const touchedDirs = new Set<string>();
                    for (const scanPath in ls) {
                        /** --- 纯路径中最后一个 / 的位置索引 --- */
                        const scanLio = scanPath.lastIndexOf('/');
                        /** --- 纯路径，不以 / 开头，以 / 结尾，若是根路径就是空字符串，例如 "www/pika/" --- */
                        const scanPat = scanPath.slice(1, scanLio + 1);
                        /** --- 纯文件名，例如 "index.ts" 或 "pika.cga" --- */
                        const scanFname = scanPath.slice(scanLio + 1);
                        touchedDirs.add(scanPat);
                        if (scanFname.endsWith('.cga')) {
                            // --- 记录 .cga 锁定的同级目录（去掉 .cga 后缀的名字即为被锁定的目录名）---
                            cgaLockedDirs.add(scanPat + scanFname.slice(0, -4) + '/');
                        }
                        if (scanFname === 'kebab.json') {
                            // --- 记录含有 kebab.json 的目录（即 kebab 子项目根目录）---
                            kebabProjectDirs.add(scanPat);
                        }
                    }
                    // --- 补充扫描目标目录中现存的 kebab.json，兼容压缩包未携带 kebab.json 的情况 ---
                    for (const dir of touchedDirs) {
                        /** --- 把目录拆成各级目录名，先检查当前目录，再一层层往上找 --- */
                        const dirs = dir ? dir.split('/').filter(Boolean) : [];
                        for (let i = dirs.length; i >= 0; --i) {
                            /** --- 当前要检查的目录路径，不含开头/，含尾部/，根目录为空字符串 --- */
                            const currentDir = i ? dirs.slice(0, i).join('/') + '/' : '';
                            if (kebabProjectDirs.has(currentDir)) {
                                break;
                            }
                            if (await lFs.isFile(`${to}${currentDir}kebab.json`)) {
                                kebabProjectDirs.add(currentDir);
                                break;
                            }
                        }
                    }
                    /** --- kebab 子项目中仅允许部署的子文件夹名集合 --- */
                    const KEBAB_ALLOWED_DIRS = new Set(['ctr', 'data', 'stc', 'view', 'lib', 'abox']);
                    /** --- 常见开发、依赖、缓存、构建产物目录不参与部署 --- */
                    const DEPLOY_EXCLUDE_DIRS = new Set([
                        '.git',
                        '.svn',
                        '.hg',
                        '.vscode',
                        '.idea',
                        '.history',
                        'node_modules',
                        'bower_components',
                        '.cache',
                        '.parcel-cache',
                        '.turbo',
                        '.next',
                        '.nuxt',
                        '.vite',
                        'coverage',
                        '.nyc_output',
                        'tmp',
                        'temp',
                    ]);
                    for (const archivePath in ls) {
                        /** --- 纯路径中最后一个 / 的位置索引 --- */
                        const lio = archivePath.lastIndexOf('/');
                        /** --- 纯路径，不以 / 开头，以 / 结尾，若是根路径就是空字符串，例如 "www/pika/ctr/" --- */
                        const pat = archivePath.slice(1, lio + 1);
                        /** --- 纯文件名，例如 "api.js" --- */
                        const fname = archivePath.slice(lio + 1);
                        const dirs = archivePath.slice(1).split('/').slice(0, -1);
                        if (dirs.some(seg => DEPLOY_EXCLUDE_DIRS.has(seg))) {
                            // --- 开发、依赖、缓存、构建产物目录不覆盖 ---
                            continue;
                        }
                        if (dirs.some((seg, index) => seg === 'abox' && ['test', 'tests'].includes(dirs[index + 1]))) {
                            // --- abox 运行代码参与部署，测试目录不进入线上目录 ---
                            continue;
                        }
                        if (fname === 'kebab.json' && hasSensitiveConfig(ls[archivePath])) {
                            // --- 包含密码或密钥的 kebab.json 不覆盖，避免部署包覆盖现有敏感配置 ---
                            continue;
                        }
                        if (pat === 'conf/' && fname === 'config.json') {
                            // --- 全局配置文件不能覆盖 ---
                            continue;
                        }
                        if (fname.endsWith('.js.map') || fname.endsWith('.ts') || fname.endsWith('.tsx') || fname.endsWith('.scss') || fname.endsWith('.gitignore') || fname.endsWith('.DS_Store')) {
                            // --- 测试或开发文件不覆盖 ---
                            continue;
                        }
                        if (fname === 'AGENTS.md') {
                            // --- 排除文件不部署 ---
                            continue;
                        }
                        // --- 规则 1：若同级目录存在 xxx.cga，则 xxx 目录下所有内容不部署 ---
                        if (pat) {
                            /** --- 当前目录或上级目录是否有同名 .cga 文件 --- */
                            let cgaBlocked = false;
                            /** --- 逐层拼出的目录路径，如 a/、a/b/，检查是否有同名 .cga 文件 --- */
                            let accumulated = '';
                            for (const seg of pat.split('/').filter(Boolean)) {
                                accumulated += seg + '/';
                                if (cgaLockedDirs.has(accumulated)) {
                                    cgaBlocked = true;
                                    break;
                                }
                            }
                            if (cgaBlocked) {
                                continue;
                            }
                        }
                        // --- 规则 2：kebab 子项目目录中，仅允许部署 ctr/data/stc/view/lib/abox 子文件夹内的内容 ---
                        if (kebabProjectDirs.size > 0) {
                            // --- 同时属于多个 Kebab 项目时，按最外层项目的部署规则检查 ---
                            // --- 例如根项目不允许 backup/，backup/ 自带 kebab.json 也不能绕过 ---
                            /** --- 当前文件所属的最外层 Kebab 项目目录，找不到时为 null --- */
                            let shortestMatch: string | null = null;
                            for (const kdir of kebabProjectDirs) {
                                /** --- kdir 是否比已选的项目目录更靠外（路径更短）--- */
                                const isShallower = shortestMatch === null || kdir.length < shortestMatch.length;
                                if (pat.startsWith(kdir) && isShallower) {
                                    shortestMatch = kdir;
                                }
                            }
                            if (shortestMatch !== null) {
                                // --- 取相对于 kebab 项目目录的路径，检查第一级子目录 ---
                                /** --- 相对路径，例如若 pat 为 "www/pika/ctr/" 且 shortestMatch 为 "www/pika/"，则 relPath 为 "ctr/" --- */
                                const relPath = pat.slice(shortestMatch.length);
                                if (relPath) {
                                    /** --- 路径的第一级子目录名，例如 "ctr" 或 "data"，用于判断是否在允许列表中 --- */
                                    const firstSeg = relPath.split('/')[0];
                                    if (!KEBAB_ALLOWED_DIRS.has(firstSeg)) {
                                        continue;
                                    }
                                }
                            }
                        }
                        // --- 看文件夹是否存在 ---
                        const targetDir = await resolvePathInside(to, pat);
                        if (!targetDir) {
                            res.end('Invalid archive directory');
                            await sRoute.unlinkUploadFiles(rtn.files);
                            return;
                        }
                        if (pat && !await lFs.isDir(targetDir)) {
                            if (rtn.post['strict'] === '1') {
                                res.end(`[code][1] [${rtn.post['strict']}] Path not found: ${targetDir}`);
                                await sRoute.unlinkUploadFiles(rtn.files);
                                return;
                            }
                            await lFs.mkdir(targetDir);
                        }
                        const targetFile = await resolvePathInside(to, pat + fname);
                        if (!targetFile) {
                            res.end('Invalid archive file');
                            await sRoute.unlinkUploadFiles(rtn.files);
                            return;
                        }
                        // --- 覆盖或创建文件 ---
                        if ((rtn.post['strict'] === '1') && !await lFs.isFile(targetFile)) {
                            res.end(`[code][2] [${rtn.post['strict']}] Path not found: ${targetFile}`);
                            await sRoute.unlinkUploadFiles(rtn.files);
                            return;
                        }
                        await lFs.putContent(targetFile, ls[archivePath]);
                    }
                    await sRoute.unlinkUploadFiles(rtn.files);
                    // --- 检查是否更新 config ---
                    const configType = rtn.post['config'];
                    if (configType === '1') {
                        /** --- 本次部署要更新的静态版本号 --- */
                        const staticVer = lTime.format(null, 'YmdHis');
                        for (const kdir of kebabProjectDirs) {
                            const projectFile = `${to}${kdir}kebab.json`;
                            if (!await lFs.isFile(projectFile)) {
                                continue;
                            }
                            const projectContent = await lFs.getContent(projectFile, 'utf8');
                            if (!projectContent) {
                                continue;
                            }
                            const projectJson = lText.parseJson<any>(projectContent);
                            if (!projectJson) {
                                continue;
                            }
                            projectJson.set ??= {};
                            projectJson.set.staticVer = staticVer;
                            await lFs.putContent(projectFile, lText.stringifyJson(projectJson, 4), {
                                'encoding': 'utf8'
                            });
                        }
                    }
                    else if (configType === '2') {
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
                    const format = lCore.globalConfig.logFormat ?? 'jsonl';
                    const ext = format === 'jsonl' ? '.jsonl' : '.csv';
                    const fend = msg.fend ?? '';
                    if (
                        (typeof msg.hostname !== 'string') ||
                        (typeof msg.path !== 'string') ||
                        !/^[\w.-]+$/.test(msg.hostname) ||
                        !/^(?:|-[\w-]+)$/.test(fend) ||
                        !/^[\w./-]+$/.test(msg.path)
                    ) {
                        res.end('Invalid log path');
                        return;
                    }
                    const logPath = await resolvePathInside(
                        kebab.LOG_CWD,
                        `${msg.hostname}${fend}/${msg.path}${ext}`
                    );
                    if (!logPath) {
                        res.end('Invalid log path');
                        return;
                    }
                    if (!await lFs.isFile(logPath)) {
                        res.end(lText.stringifyJson({
                            'result': 1,
                            'data': null,
                        }));
                        return;
                    }
                    let limit = Number.isSafeInteger(msg.limit) ? msg.limit as number : 100;
                    const offset = Number.isSafeInteger(msg.offset) ? msg.offset as number : 0;
                    limit = Math.min(Math.max(limit, 1), 1000);
                    if (offset < 0) {
                        res.end('Invalid offset');
                        return;
                    }
                    if (msg.search && ((typeof msg.search !== 'string') || (msg.search.length > 500) || msg.search.includes('\0'))) {
                        res.end('Invalid search');
                        return;
                    }
                    /** --- 搜索词用换行分隔，命中其中一个就算匹配 --- */
                    const search = msg.search ? (msg.search as string).split('\n') : null;
                    /** --- CSV 返回字段数组，JSONL 返回解析后的对象 --- */
                    const list: string[][] | kebab.Json[] = [];
                    let total = 0;
                    let skipHeader = format === 'csv';
                    /**
                     * --- 统计匹配行数并取出当前页，跳过 CSV 表头 ---
                     * @param line 不含换行符的日志行
                     * @returns 无返回值
                     */
                    const consumeLine = (line: string): void => {
                        if (skipHeader) {
                            skipHeader = false;
                            return;
                        }
                        if (search && !search.some(pattern => line.includes(pattern))) {
                            return;
                        }
                        const index = total++;
                        // --- 搜索时按匹配行数分页，解析失败也占一行 ---
                        // --- 不搜索时跳过无效 JSON，继续读到当前页填满 ---
                        if (index < offset || list.length >= limit || search && index >= offset + limit) {
                            return;
                        }
                        if (format === 'jsonl') {
                            const item = lText.parseJson<kebab.Json>(line);
                            if (item) {
                                (list as kebab.Json[]).push(item);
                            }
                        }
                        else if (!search || line) {
                            (list as string[][]).push(parseCsvLine(line));
                        }
                    };
                    // --- 文件只读一遍，同时统计行数并取出当前页；读失败时返回 500 ---
                    await new Promise<void>((resolve, reject) => {
                        let packet = '';
                        lFs.createReadStream(logPath, { 'encoding': 'utf8' }).on('data', (chunk: string) => {
                            let start = 0;
                            let end = chunk.indexOf('\n');
                            while (end !== -1) {
                                consumeLine(packet + chunk.slice(start, end));
                                packet = '';
                                start = end + 1;
                                end = chunk.indexOf('\n', start);
                            }
                            packet += chunk.slice(start);
                        }).on('end', () => {
                            if (packet) {
                                consumeLine(packet);
                            }
                            resolve();
                        }).on('error', reject);
                    });
                    res.end(lText.stringifyJson({
                        'result': 1,
                        'list': list,
                        'total': total,
                    }));
                    return;
                }
                case 'monitor-events': {
                    const result = await sMonitorFiles.getEvents(
                        path.join(kebab.LOG_CWD, 'monitor'), msg.path ?? lTime.format(null, 'Y/m/d'),
                        msg.offset ?? 0, msg.limit ?? 20,
                    );
                    res.setHeader('cache-control', 'no-store');
                    res.end(lText.stringifyJson(result === false ? { 'result': 0 } : { 'result': 1, ...result }));
                    return;
                }
                case 'monitor-event': {
                    const data = await sMonitorFiles.getEvent(path.join(kebab.LOG_CWD, 'monitor'), msg.path);
                    res.setHeader('cache-control', 'no-store');
                    res.end(lText.stringifyJson(data === false ? { 'result': 0 } : { 'result': 1, data }));
                    return;
                }
                case 'monitor-file': {
                    const file = await sMonitorFiles.getFile(path.join(kebab.LOG_CWD, 'monitor'), msg.path);
                    res.setHeader('cache-control', 'no-store');
                    if (file === false || msg.preview !== undefined && typeof msg.preview !== 'boolean') {
                        res.writeHead(400);
                        res.end();
                        return;
                    }
                    if (file === null) {
                        res.writeHead(404);
                        res.end();
                        return;
                    }
                    if (msg.preview && file.info.preview === null) {
                        res.writeHead(file.stat.size > sMonitorFiles.PREVIEW_LIMIT ? 413 : 415);
                        res.end();
                        return;
                    }
                    let contentType = 'application/octet-stream';
                    if (msg.preview) {
                        contentType = file.info.preview === 'json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8';
                    }
                    res.setHeader('content-type', contentType);
                    res.setHeader('x-content-type-options', 'nosniff');
                    res.setHeader('x-kebab-monitor-file', '1');
                    res.setHeader('content-disposition', `attachment; filename="${file.info.name}"`);
                    res.setHeader('content-length', file.stat.size);
                    if (file.stat.size === 0) {
                        res.end();
                        return;
                    }
                    // --- 直接发送文件流，不把整个文件读入内存或压缩；客户端断开时 pipeline 会关闭文件流 ---
                    try {
                        await stream.pipeline(fs.createReadStream(file.path, { 'start': 0, 'end': file.stat.size - 1 }), res);
                    }
                    catch {
                        res.destroy();
                    }
                    return;
                }
                case 'ls': {
                    // --- 获取目录内文件/文件夹列表 ---
                    if (typeof msg.path !== 'string') {
                        res.end('Invalid path');
                        return;
                    }
                    const targetPath = lText.urlResolve(kebab.ROOT_CWD, msg.path, true);
                    res.end(lText.stringifyJson({
                        'result': 1,
                        'data': (await lFs.readDir(targetPath, msg.encoding)).map(item => ({
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
            if (res.headersSent) {
                res.destroy();
                return;
            }
            res.writeHead(500);
            res.end('Failed');
        });
    }).listen(lCore.globalConfig.rpcPort);
}

/**
 * --- 通知 worker 停止接收新连接，等它退出 ---
 * @param worker 要停止的 worker
 * @param waitForever 是否一直等现有连接结束；stop 为 true，restart 或替换失联 worker 时为 false（最多等一小时）
 * @returns worker 退出后完成
 */
function stopWorker(worker: cluster.Worker, waitForever = true): Promise<void> {
    if (worker.isDead()) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        worker.once('exit', () => { resolve(); });
        try {
            if (worker.isConnected()) {
                worker.send({
                    'action': 'stop',
                    'waitForever': waitForever,
                }, (e: Error | null) => {
                    if (e) {
                        lCore.display(`[master] Failed to notify worker ${worker.process.pid ?? 'undefined'} to stop, using SIGTERM.`, e);
                        if (!worker.isDead()) {
                            worker.process.kill('SIGTERM');
                        }
                    }
                });
                return;
            }
            worker.process.kill('SIGTERM');
        }
        catch (e: unknown) {
            lCore.display(`[master] Failed to notify worker ${worker.process.pid ?? 'undefined'} to stop, using SIGTERM.`, e);
            worker.process.kill('SIGTERM');
        }
    });
}

/**
 * --- 通知所有 worker 停止，等它们退出后再退出 master ---
 * @returns 全部 worker 退出后完成
 */
async function gracefulStop(): Promise<void> {
    if (stopPromise) {
        return stopPromise;
    }
    stopping = true;
    stopPromise = (async (): Promise<void> => {
        lCore.display('[master] Graceful stop started.');
        // --- 旧 worker 可能已从 workerList 移除，但还有请求没结束，也要等它退出 ---
        const workers = Object.values(cluster.workers ?? {}).filter(
            (worker): worker is cluster.Worker => worker !== undefined
        );
        await Promise.all(workers.map(worker => stopWorker(worker)));
        lCore.display('[master] Graceful stop completed.');
        process.exit(0);
    })();
    return stopPromise;
}

/**
 * --- 同时收到多次重启请求时，只执行一次重启 ---
 * @returns 本次重启完成后结束，旧 worker 可能还在处理请求
 */
function restartWorkers(): Promise<void> {
    restartPromise ??= restartWorkerList().finally(() => {
        restartPromise = null;
    });
    return restartPromise;
}

/**
 * --- 重启所有 worker：先启动新进程，等它监听端口后再停止旧进程 ---
 * @returns 本次重启完成后结束，旧 worker 可能还在处理请求
 */
async function restartWorkerList(): Promise<void> {
    await workerCheckPromise;
    if (stopping) {
        return;
    }
    // --- 先把旧 worker 记下来，后面创建新 worker 会改动 workerList ---
    const oldEntries: Array<{
        'pid': string;
        'cpu': number;
        'worker': cluster.Worker;
    }> = [];
    for (const pid in workerList) {
        oldEntries.push({
            'pid': pid,
            'cpu': workerList[pid].cpu,
            'worker': workerList[pid].worker
        });
    }
    // --- 阶段 1：创建新进程并等待其监听端口就绪 ---
    for (const entry of oldEntries) {
        if (stopping) {
            return;
        }
        const newWorker = await createChildProcess(entry.cpu);
        if (newWorker) {
            await waitForWorkerListening(newWorker);
        }
    }
    // --- 阶段 2：停止旧进程 ---
    for (const entry of oldEntries) {
        if (stopping) {
            return;
        }
        delete workerList[entry.pid];
        stopWorker(entry.worker, false).catch((e: unknown) => {
            lCore.display('[master] [restartWorkerList] [stopWorker]', e);
        });
    }
}

/**
 * --- 检查失联 worker，同一时间只检查一次；重启或停止时跳过 ---
 * @returns 本次失联检查结束后完成
 */
function checkWorkerLost(): Promise<void> {
    if (stopping || restartPromise) {
        return Promise.resolve();
    }
    workerCheckPromise ??= recoverLostWorkers().finally(() => {
        workerCheckPromise = null;
    });
    return workerCheckPromise;
}

/**
 * --- 替换超过 30 秒没发心跳的 worker ---
 * @returns 完成失联 worker 的替换
 */
async function recoverLostWorkers(): Promise<void> {
    const now = Date.now();
    for (const pid in workerList) {
        const entry = workerList[pid];
        if (now - entry.hbtime < 30000) {
            // --- 距离上次心跳，小于 30 秒，正常 ---
            // --- 子线程 10 秒发送一次心跳 ---
            continue;
        }
        // --- 超过 30 秒没收到心跳，停止旧 worker 并启动一个新的，避免旧进程恢复后继续发心跳 ---
        lCore.display(`[master] Worker ${pid} lost.`);
        delete workerList[pid];
        stopWorker(entry.worker, false).catch((e: unknown) => {
            lCore.display('[master] [recoverLostWorkers] [stopWorker]', e);
        });
        await createChildProcess(entry.cpu);
    }
}

/**
 * --- 创建一个新的子进程 ---
 * @param cpu CPU ID
 */
async function createChildProcess(cpu: number): Promise<cluster.Worker | null> {
    if (stopping) {
        return null;
    }
    const worker = cluster.fork();
    // --- 先监听 error 再做异步操作，避免 IPC 发送失败时导致 master 退出 ---
    worker.on('error', (e: Error) => {
        lCore.display(`[master] Worker ${worker.process.pid ?? 'undefined'} error.`, e);
    });
    if (!worker.process.pid) {
        return null;
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
    worker.on('message', function(msg: kebab.Json) {
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
                    await restartWorkers();
                    break;
                }
                case 'stop': {
                    gracefulStop().catch((e: unknown) => {
                        lCore.display('[master] [gracefulStop]', e);
                    });
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
                case 'ws-broadcast': {
                    // --- 将 WebSocket 广播消息转发给所有其他子进程 ---
                    for (const pid in workerList) {
                        if (workerList[pid].worker === worker) {
                            continue;
                        }
                        workerList[pid].worker.send({
                            'action': 'ws-broadcast',
                            'channel': msg.channel,
                            'data': msg.data,
                        });
                    }
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
    return worker;
}

/**
 * --- 开发模式下的文件监听自动重载（HMR），仅在 debug: true 时启用 ---
 */
function startFileWatcher(): void {
    if (!lCore.globalConfig.debug) {
        return;
    }
    /** --- 防抖定时器 --- */
    let debounceTimer: NodeJS.Timeout | null = null;
    /** --- 是否正在重启中 --- */
    let restarting = false;
    /**
     * --- 跳过依赖、日志和临时目录，避免监听太多文件而用完系统额度（ENOSPC）---
     */
    const SKIP_DIRS = new Set(['node_modules', 'log', 'ftmp']);

    /** --- 触发 worker 重载 --- */
    const triggerReload = (formatName: string): void => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        // --- 防抖：500ms 内多次变化只触发一次 ---
        debounceTimer = setTimeout(() => {
            debounceTimer = null;
            if (restarting) {
                return;
            }
            restarting = true;
            lCore.display(`[HMR] File changed: ${formatName}, reloading workers...`);
            restartWorkers().then(() => {
                restarting = false;
                lCore.display('[HMR] All workers reloaded.');
            }).catch((e) => {
                restarting = false;
                lCore.display('[HMR] Reload error:', e);
            });
        }, 500);
    };

    /**
     * --- 逐层找出要监听的子目录，跳过 SKIP_DIRS 中的目录和隐藏目录 ---
     * @param dir 当前目录路径
     * @param result 收集结果数组
     */
    const collectDirs = async (dir: string, result: string[]): Promise<void> => {
        let entries: fs.Dirent[];
        try {
            entries = await fs.promises.readdir(dir, { 'withFileTypes': true });
        }
        catch (e: unknown) {
            lCore.display(`[HMR] Cannot scan directory: ${dir}`, e);
            return;
        }
        for (const entry of entries) {
            if (!entry.isDirectory()) {
                continue;
            }
            // --- 跳过隐藏目录（以 . 开头）及无需监听的目录 ---
            if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) {
                continue;
            }
            const subDir = `${dir}/${entry.name}`;
            result.push(subDir);
            await collectDirs(subDir, result);
        }
    };

    /**
     * --- 逐个监听筛选后的目录，避免连 .git 等已跳过的目录也一起监听 ---
     * @param dir 要监听的根目录路径
     */
    const watchDir = async (dir: string): Promise<void> => {
        // --- 去除末尾的路径分隔符，防止拼接时产生双斜杠 ---
        dir = dir.replace(/\/+$/, '');
        if (!await lFs.isDir(dir)) {
            return;
        }
        // --- 收集所有需要监听的目录（含根目录本身）---
        const dirs = [dir];
        await collectDirs(dir, dirs);
        for (const d of dirs) {
            try {
                const watcher = fs.watch(d, (eventType, filename) => {
                    if (!filename) {
                        return;
                    }
                    const formatName = filename.replace(/\\/g, '/');
                    // --- 仅关注 .js 文件和 .json 配置文件的变更 ---
                    if (!formatName.endsWith('.js') && !formatName.endsWith('.json')) {
                        return;
                    }
                    triggerReload(formatName);
                });
                watcher.on('error', (err) => {
                    lCore.display(`[HMR] Watcher error on ${d}:`, err);
                });
            }
            catch (err) {
                lCore.display(`[HMR] Cannot watch directory: ${d}`, err);
            }
        }
        lCore.display(`[HMR] Watching directory: ${dir} (${dirs.length} dirs)`);
    };

    // --- 监听用户项目、独立任务、自定义库及模型目录 ---
    for (const dir of [kebab.WWW_CWD, kebab.IND_CWD, kebab.LIB_CWD, kebab.MOD_CWD]) {
        watchDir(dir).catch((e: unknown) => {
            lCore.display(`[HMR] Cannot watch directory: ${dir}`, e);
        });
    }
}

run().catch(function(e): void {
    lCore.display('[master] ------ [Process fatal Error] ------');
    lCore.display(e);
});

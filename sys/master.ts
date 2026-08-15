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
// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as sRoute from '#kebab/sys/route.js';
import * as lCore from '#kebab/lib/core.js';
import * as lFs from '#kebab/lib/fs.js';
import * as lText from '#kebab/lib/text.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as lTime from '#kebab/lib/time.js';
import * as lZip from '#kebab/lib/zip.js';

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
 * --- 判断候选路径是否位于指定根目录内 ---
 * @param rootPath 已解析的真实根目录
 * @param candidate 候选绝对路径
 */
function isPathInside(rootPath: string, candidate: string): boolean {
    const relative = path.relative(rootPath, candidate);
    return (relative === '') || (!relative.startsWith(`..${path.sep}`) && (relative !== '..') && !path.isAbsolute(relative));
}

/**
 * --- 解析根目录内的路径，并阻止通过绝对路径、.. 或符号链接逃逸 ---
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

    /** --- 向上找到已存在的最近父路径，用 realpath 校验其中的符号链接 --- */
    let existingPath = candidate;
    const missingParts: string[] = [];
    while (true) {
        try {
            const existingReal = await fs.promises.realpath(existingPath);
            const resolved = path.resolve(existingReal, ...missingParts);
            return isPathInside(rootReal, resolved) ? resolved : null;
        }
        catch {
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
 * --- 规范化 ZIP 条目路径，返回带前导斜杠的安全相对路径 ---
 * @param archivePath ZIP 内的原始路径
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
    const normalized = path.posix.normalize(normalizedSlashes);
    if (normalized.startsWith('../') || (normalized === '..') || path.posix.isAbsolute(normalized)) {
        return null;
    }
    return `/${normalized}`;
}

/**
 * --- 等待指定 worker 开始监听端口就绪 ---
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
                    // --- 执行 PM2 操作 ---
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
                    const rtn = await lCore.exec(`pm2 ${msg.pm2Action} ${msg.name}`);
                    if (rtn === false) {
                        res.end('Exec failed');
                        return;
                    }
                    break;
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
                    // --- npm install 上限与 sendNpm 客户端超时一致，超时后终止，避免无限期运行 ---
                    const npmTimeout = 300_000;
                    let rtn = await lCore.exec('npm i --omit=dev', {
                        'cwd': msg.path,
                        'timeout': npmTimeout,
                    });
                    if (rtn === false) {
                        // --- 部分项目可能存在 peerDependencies 冲突，失败后降级为 legacy-peer-deps 再试一次 ---
                        rtn = await lCore.exec('npm i --omit=dev --legacy-peer-deps', {
                            'cwd': msg.path,
                            'timeout': npmTimeout,
                        });
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
                    /** --- 经过路径校验并统一为带前导斜杠的 ZIP 文件列表 --- */
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
                        /** --- 带 / 开头的 zip 中文件完整路径，例如 "/www/pika/stc/index.ts" --- */
                        const scanFpath = scanPath.startsWith('/') ? scanPath : '/' + scanPath;
                        /** --- 纯路径中最后一个 / 的位置索引 --- */
                        const scanLio = scanFpath.lastIndexOf('/');
                        /** --- 纯路径，不以 / 开头，以 / 结尾，若是根路径就是空字符串，例如 "www/pika/" --- */
                        const scanPat = scanFpath.slice(1, scanLio + 1);
                        /** --- 纯文件名，例如 "index.ts" 或 "pika.cga" --- */
                        const scanFname = scanFpath.slice(scanLio + 1);
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
                        /** --- 目录逐级向上回溯时的累积路径列表，优先检查当前目录，再检查父级目录 --- */
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
                    const KEBAB_ALLOWED_DIRS = new Set(['ctr', 'data', 'stc', 'view', 'lib']);
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
                        /** --- 带 / 开头的 zip 中文件完整路径，例如 "/www/pika/ctr/api.js" --- */
                        const fpath = archivePath.startsWith('/') ? archivePath : '/' + archivePath;
                        /** --- 纯路径中最后一个 / 的位置索引 --- */
                        const lio = fpath.lastIndexOf('/');
                        /** --- 纯路径，不以 / 开头，以 / 结尾，若是根路径就是空字符串，例如 "www/pika/ctr/" --- */
                        const pat = fpath.slice(1, lio + 1);
                        /** --- 纯文件名，例如 "api.js" --- */
                        const fname = fpath.slice(lio + 1);
                        if (fpath.slice(1).split('/').slice(0, -1).some(seg => DEPLOY_EXCLUDE_DIRS.has(seg))) {
                            // --- 开发、依赖、缓存、构建产物目录不覆盖 ---
                            continue;
                        }
                        if ((pat === 'conf/' && fname === 'config.json') || fname === 'kebab.json') {
                            // --- 特殊文件不能覆盖 ---
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
                            /** --- 是否被 .cga 文件锁定阻止 --- */
                            let cgaBlocked = false;
                            /** --- 累积路径，逐级拼接，用于逐级检查是否命中 cgaLockedDirs，例如 "a/" -> "a/b/" -> "a/b/c/" --- */
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
                        // --- 规则 2：kebab 子项目目录中，仅允许部署 ctr/data/stc/view/lib 子文件夹内的内容 ---
                        // --- 快速跳过：zip 中没有 kebab.json 时整个规则无需执行 ---
                        if (kebabProjectDirs.size > 0) {
                            // --- 找最浅（最外层）匹配的 kebab 项目目录 ---
                            // --- 以最浅匹配为准，确保根层 kebab 规则优先于嵌套项目 ---
                            // --- 例如 backup/ 自身也有 kebab.json，longestMatch 会选 backup/，使其根文件通过 ---
                            // --- 改用 shortestMatch 则选根 ""，backup 的第一段不在白名单中，正确排除 ---
                            /** --- 当前文件所属的最浅 kebab 子项目目录；无匹配则为 null --- */
                            let shortestMatch: string | null = null;
                            for (const kdir of kebabProjectDirs) {
                                /** --- 当前 kdir 是否比已有的 shortestMatch 更浅（路径更短）--- */
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
                    let total = 0;
                    if (msg.search) {
                        if ((typeof msg.search !== 'string') || (msg.search.length > 500) || msg.search.includes('\0')) {
                            res.end('Invalid search');
                            return;
                        }
                        // === 搜索模式：total 为匹配行数，offset/limit 均基于匹配行 ===
                        // --- shell 单引号安全转义（防止特殊字符破坏命令）---
                        const escaped: string = (msg.search as string).replace(/'/g, "'\\''");
                        // --- 获取匹配行总数（grep -c 无匹配时退出码 1，|| echo 0 兜底）---
                        const countCmd = format === 'csv'
                            ? `tail -n +2 "${logPath}" | grep -F -c '${escaped}' || echo 0`
                            : `grep -F -c '${escaped}' "${logPath}" || echo 0`;
                        const countRtn = await lCore.exec(countCmd);
                        if (countRtn !== false) {
                            total = parseInt(countRtn.trim()) || 0;
                        }
                        // --- 获取分页数据：第 offset+1 到 offset+limit 条匹配行（1-indexed）---
                        const from = offset + 1;
                        const to = offset + limit;
                        const dataCmd = format === 'csv'
                            ? `tail -n +2 "${logPath}" | grep -F '${escaped}' | sed -n '${from},${to}p'`
                            : `grep -F '${escaped}' "${logPath}" | sed -n '${from},${to}p'`;
                        const dataRtn = await lCore.exec(dataCmd);
                        if (dataRtn === false) {
                            res.end(lText.stringifyJson({
                                'result': 1,
                                'list': [],
                                'total': total,
                            }));
                            return;
                        }
                        /**
                         * --- csv 格式：string[][] 每行是字段数组，顺序与表头一致 ---
                         * --- [['H:i:s', unix, url, cookie, session, userAgent, realIp, cfIp, xIp, osMem, procMem, message], ...] ---
                         * --- jsonl 格式：object[] 每行是解析后的 JSON 对象 ---
                         * --- [{ time, unix, url, cookie, session, userAgent, realIp, cfIp, xIp, osMem, procMem, message }, ...] ---
                         */
                        const sList: string[][] | kebab.Json[] = [];
                        for (const rawLine of dataRtn.split('\n')) {
                            if (!rawLine) {
                                continue;
                            }
                            if (format === 'jsonl') {
                                const obj = lText.parseJson<kebab.Json>(rawLine);
                                if (obj) {
                                    (sList as kebab.Json[]).push(obj);
                                }
                            }
                            else {
                                const result: string[] = [];
                                let currentField = '';
                                let inQuotes = false;
                                for (let i = 0; i < rawLine.length; ++i) {
                                    const char = rawLine[i];
                                    if (char === '"') {
                                        if (inQuotes && rawLine[i + 1] === '"') {
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
                                (sList as string[][]).push(result);
                            }
                        }
                        res.end(lText.stringifyJson({
                            'result': 1,
                            'list': sList,
                            'total': total,
                        }));
                        return;
                    }
                    // === 无搜索模式：wc -l 获取总行数，grep -b '^' 定位字节偏移直接跳至 offset ===
                    const wclRtn = await lCore.exec(`wc -l "${logPath}"`);
                    if (wclRtn !== false) {
                        const wclMatch = /^\s*(\d+)/.exec(wclRtn);
                        if (wclMatch) {
                            total = parseInt(wclMatch[1]);
                            if (format === 'csv') {
                                // --- csv 有表头，数据行数减 1 ---
                                total = Math.max(0, total - 1);
                            }
                        }
                    }
                    /**
                     * --- 用 grep -b '^' 获取目标行的字节偏移，直接传给 createReadStream start 跳过 offset ---
                     * --- jsonl 无表头：跳过 offset 行，从第 offset+1 行开始读 ---
                     * --- csv  有表头：跳过表头+offset 行，从第 offset+2 行开始读 ---
                     */
                    let startByte = 0;
                    /** --- offset 定位是否成功（offset=0 直接成功；offset>0 需 grep 定位）--- */
                    let offsetLocated = offset === 0;
                    if (offset > 0) {
                        const skipLines = format === 'jsonl' ? offset : offset + 1;
                        // --- sed -n '${N}{p;q}' 找到第 N 行后立即退出，使 grep 收到 SIGPIPE 提前终止 ---
                        const grepRtn = await lCore.exec(`grep -b '^' "${logPath}" | sed -n '${skipLines + 1}{p;q}'`);
                        if (grepRtn !== false) {
                            const grepMatch = /^(\d+):/.exec(grepRtn.trim());
                            if (grepMatch) {
                                startByte = parseInt(grepMatch[1]);
                                offsetLocated = true;
                            }
                        }
                    }
                    if (!offsetLocated) {
                        // --- offset 超出文件范围，返回空列表 ---
                        res.end(lText.stringifyJson({
                            'result': 1,
                            'list': [],
                            'total': total,
                        }));
                        return;
                    }
                    /**
                     * --- csv 格式：string[][] 每行是字段数组，顺序与表头一致 ---
                     * --- [['H:i:s', unix, url, cookie, session, userAgent, realIp, cfIp, xIp, osMem, procMem, message], ...] ---
                     * --- jsonl 格式：object[] 每行是解析后的 JSON 对象 ---
                     * --- [{ time, unix, url, cookie, session, userAgent, realIp, cfIp, xIp, osMem, procMem, message }, ...] ---
                     */
                    const rtn = await new Promise<string[][] | kebab.Json[] | null | false>(resolve => {
                        const list: string[][] | kebab.Json[] = [];
                        /** --- 当前行号 --- */
                        let line = 0;
                        /** --- 当前行数据 --- */
                        let packet = '';
                        lFs.createReadStream(logPath, {
                            'encoding': 'utf8',
                            'start': startByte,
                        }).on('data', buf => {
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
                                // --- startByte > 0 时已跳过 offset（及 csv 表头），从第一行起均为数据行 ---
                                // --- startByte === 0 且 csv 时仍需跳过表头（line > 1）---
                                if (format === 'csv' && startByte === 0 ? line > 1 : line >= 1) {
                                    if (format === 'jsonl') {
                                        const obj = lText.parseJson<kebab.Json>(packet);
                                        if (obj) {
                                            (list as kebab.Json[]).push(obj);
                                            --limit;
                                        }
                                    }
                                    else {
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
                                        (list as string[][]).push(result);
                                        --limit;
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
                        'list': rtn,
                        'total': total,
                    }));
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
        });
    }).listen(lCore.globalConfig.rpcPort);
}

/**
 * --- 零宕机重启所有 worker 进程：先创建新进程并等待监听就绪，再停止旧进程 ---
 */
async function restartWorkers(): Promise<void> {
    // --- 收集旧进程信息（先快照，避免迭代过程中修改 workerList） ---
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
        const newWorker = await createChildProcess(entry.cpu);
        if (newWorker) {
            await waitForWorkerListening(newWorker);
        }
    }
    // --- 阶段 2：停止旧进程 ---
    for (const entry of oldEntries) {
        entry.worker.send({
            'action': 'stop'
        });
        delete workerList[entry.pid];
    }
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
async function createChildProcess(cpu: number): Promise<cluster.Worker | null> {
    const worker = cluster.fork();
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
     * --- 不需要监听的目录名集合，在 Linux 上 fs.watch recursive 会为每个子目录注册 inotify ---
     * --- 这些目录若被监听会大量消耗系统 file watcher 配额（ENOSPC），必须跳过 ---
     */
    const SKIP_DIRS = new Set(['.git', '.svn', '.hg', 'node_modules', 'log', 'ftmp']);

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
     * --- 递归收集指定根目录下所有需要监听的子目录（跳过 SKIP_DIRS 和隐藏目录）---
     * @param dir 当前目录路径
     * @param result 收集结果数组
     */
    const collectDirs = async (dir: string, result: string[]): Promise<void> => {
        let entries: fs.Dirent[];
        try {
            entries = await fs.promises.readdir(dir, { 'withFileTypes': true });
        }
        catch {
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
     * --- 监听指定目录下所有需要监听的目录（非递归逐个注册，避免 OS 级别监听到 .git 等目录）---
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

    // --- 监听 www/ 目录（用户项目代码）---
    watchDir(kebab.WWW_CWD).catch(() => {});
    // --- 监听 ind/ 目录（独立任务代码）---
    watchDir(kebab.IND_CWD).catch(() => {});
    // --- 监听 lib/ 目录（用户自定义库）---
    watchDir(kebab.LIB_CWD).catch(() => {});
    // --- 监听 mod/ 目录（用户模型）---
    watchDir(kebab.MOD_CWD).catch(() => {});
}

run().catch(function(e): void {
    lCore.display('[master] ------ [Process fatal Error] ------');
    lCore.display(e);
});

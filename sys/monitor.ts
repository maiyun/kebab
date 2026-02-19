/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2026-02-07
 * Last: 2026-02-08
 * --- 性能监控库，用于检测 CPU/内存骤升并记录可疑请求、堆栈、CPU Profile、堆快照 ---
 * --- 包含 Worker 看门狗线程，用于在事件循环完全阻塞时实时检测并记录 ---
 */
import * as os from 'os';
import * as v8 from 'v8';
import * as inspector from 'inspector';
import * as perfHooks from 'perf_hooks';
import * as workerThreads from 'worker_threads';
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';
import * as lFs from '#kebab/lib/fs.js';

// --- 阈值配置 ---

/** --- CPU 使用率阈值，0-100 --- */
let cpuThreshold: number = 80;

/** --- 内存使用率阈值，单位 MB --- */
let memThreshold: number = 0;

/** --- 事件循环延迟阈值，单位 ms --- */
let eloopThreshold: number = 500;

/** --- 监控间隔，单位 ms --- */
const INTERVAL: number = 5_000;

/** --- 连续超阈值次数达到此值才记录日志，防止瞬间波动 --- */
const SPIKE_COUNT: number = 2;

/** --- CPU Profile 采集时长，单位 ms --- */
const PROFILE_DURATION: number = 5_000;

/** --- 两次诊断采集的最小间隔，防止频繁写磁盘，单位 ms --- */
const DIAGNOSTIC_COOLDOWN: number = 60_000;

// --- 内部状态 ---

/** --- 定时器 --- */
let timer: NodeJS.Timeout | null = null;

/** --- 上次 CPU 累计用量 --- */
let lastCpuUsage: NodeJS.CpuUsage | null = null;

/** --- 上次 CPU 采样的时间戳 --- */
let lastCpuTime: number = 0;

/** --- 上次系统各核 CPU 时间快照 --- */
let lastOsCpus: os.CpuInfo[] | null = null;

/** --- 事件循环延迟直方图 --- */
let eloopHistogram: perfHooks.IntervalHistogram | null = null;

/** --- 连续超阈值计数 --- */
let spikeCounter: number = 0;

/** --- 请求自增计数器 --- */
let requestCounter: number = 0;

/** --- 上次诊断采集时间 --- */
let lastDiagnosticTime: number = 0;

/** --- 是否正在进行 CPU Profile 采集 --- */
let profiling: boolean = false;

/**
 * --- 检测当前是否处于调试模式（以 --inspect 启动或 IDE 调试器已连接） ---
 */
function isDebugMode(): boolean {
    return !!inspector.url();
}

// --- 看门狗相关 ---

/** --- 看门狗 Worker 实例 --- */
let watchdog: workerThreads.Worker | null = null;

/** --- 心跳共享内存（Int32: 秒级时间戳） --- */
let heartbeatBuffer: SharedArrayBuffer | null = null;

/** --- 心跳共享内存视图 --- */
let heartbeatView: Int32Array | null = null;

/** --- 看门狗检测阈值，主线程超过此秒数未更新心跳则认为阻塞，单位秒 --- */
const WATCHDOG_THRESHOLD: number = 15;

/** --- 看门狗检测间隔，单位 ms --- */
const WATCHDOG_INTERVAL: number = 5_000;

/** --- 看门狗告警冷却时间，持续阻塞时不会每次都写日志，单位秒 --- */
const WATCHDOG_COOLDOWN: number = 30;

// --- 活跃请求追踪 ---

/** --- 活跃请求的描述 --- */
interface IActiveRequest {
    'url': string;
    'method': string;
    /** --- 请求开始的时间戳（ms） --- */
    'start': number;
    /** --- 请求开始时的 CPU 累计用量基准 --- */
    'startCpu': NodeJS.CpuUsage;
    /** --- 请求开始时的内存 RSS 基准（bytes） --- */
    'startMem': number;
}

/** --- 活跃请求池 --- */
const activeRequests: Map<string, IActiveRequest> = new Map();

// --- 快照相关类型 ---

/** --- 单个请求快照 --- */
interface ISnapshotRequest {
    'url': string;
    'method': string;
    'duration': number;
    'cpuUser': number;
    'cpuSystem': number;
    'memDelta': number;
}

/** --- 整体资源快照 --- */
export interface ISnapshot {
    'pid': number;
    'time': number;
    /** --- 本进程 CPU 占用（单核基准，0-100） --- */
    'cpuProcess': number;
    /** --- 系统总 CPU 占用（所有核心合计，0-100，与任务管理器一致） --- */
    'cpuOs': number;
    'mem': {
        'rss': number;
        'heapTotal': number;
        'heapUsed': number;
        'external': number;
        'arrayBuffers': number;
    };
    'heap': {
        'totalSize': number;
        'usedSize': number;
        'sizeLimit': number;
    };
    'osMem': {
        'total': number;
        'free': number;
    };
    'eloopLag': number;
    'activeRequests': ISnapshotRequest[];
    'activeCount': number;
}

/**
 * --- 启动性能监控 ---
 * @param opt 可选的阈值配置
 */
export function start(opt?: {
    /** --- CPU 使用率阈值百分比，默认 80 --- */
    'cpu'?: number;
    /** --- 内存阈值 MB，默认自动分配 --- */
    'mem'?: number;
    /** --- 事件循环延迟阈值 ms，默认 500 --- */
    'eloop'?: number;
}): void {
    if (timer) {
        return;
    }
    cpuThreshold = opt?.cpu ?? 80;
    memThreshold = opt?.mem ?? 0;
    eloopThreshold = opt?.eloop ?? 500;
    if (memThreshold === 0) {
        // --- 自动计算：系统总内存的 80% ---
        memThreshold = Math.floor((os.totalmem() * 0.8) / 1024 / 1024);
    }
    lastCpuUsage = process.cpuUsage();
    lastCpuTime = Date.now();
    lastOsCpus = os.cpus();
    spikeCounter = 0;
    lastDiagnosticTime = 0;
    // --- 初始化心跳共享内存（索引 0: 秒级时间戳, 索引 1: 调试模式标志） ---
    heartbeatBuffer = new SharedArrayBuffer(8);
    heartbeatView = new Int32Array(heartbeatBuffer);
    Atomics.store(heartbeatView, 0, Math.floor(Date.now() / 1000));
    Atomics.store(heartbeatView, 1, isDebugMode() ? 1 : 0);
    // --- 启用事件循环延迟直方图 ---
    eloopHistogram = perfHooks.monitorEventLoopDelay({ 'resolution': 20 });
    eloopHistogram.enable();
    timer = setInterval(check, INTERVAL);
    // --- 启动看门狗线程 ---
    startWatchdog();
    lCore.debug(`[MONITOR] [PARENT] [${process.pid}] Started, CPU Threshold: ${cpuThreshold}%, MEM Threshold: ${memThreshold}MB, ELOOP Threshold: ${eloopThreshold}ms`);
}

/**
 * --- 停止性能监控 ---
 */
export function stop(): void {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    if (eloopHistogram) {
        eloopHistogram.disable();
        eloopHistogram = null;
    }
    if (watchdog) {
        watchdog.terminate().catch(() => {
            // --- 忽略终止错误 ---
        });
        watchdog = null;
    }
    activeRequests.clear();
    heartbeatBuffer = null;
    heartbeatView = null;
}

/**
 * --- 启动看门狗 Worker 线程，独立事件循环监控主线程心跳 ---
 * --- 实现代码见 monitor/watchdog.ts ---
 */
function startWatchdog(): void {
    if (!heartbeatBuffer) {
        return;
    }
    const workerUrl = new URL(
        './monitor/watchdog.js', import.meta.url,
    );
    try {
        const worker = new workerThreads.Worker(workerUrl, {
            'workerData': {
                'buffer': heartbeatBuffer,
                'logDir': kebab.LOG_CWD,
                'pid': process.pid,
                'threshold': WATCHDOG_THRESHOLD,
                'cooldown': WATCHDOG_COOLDOWN,
                'interval': WATCHDOG_INTERVAL,
                'profileDuration': PROFILE_DURATION,
            },
        });
        watchdog = worker;
        // --- 不阻止进程退出 ---
        worker.unref();
        worker.on('error', (err) => {
            lCore.debug('[MONITOR] Watchdog error', err);
        });
        worker.on('exit', (exitCode) => {
            if (exitCode !== 0 && timer) {
                lCore.debug(
                    `[MONITOR] Watchdog exited: ${exitCode}`,
                );
            }
            // --- 仅当当前 watchdog 仍是本实例时才置空，避免 stop→start 重启时竞态 ---
            if (watchdog === worker) {
                watchdog = null;
            }
        });
        lCore.debug(`[MONITOR] [THREAD] [${process.pid}] Watchdog started`);
    }
    catch (e) {
        lCore.debug('[MONITOR] Failed to start watchdog', e);
    }
}

/**
 * --- 注册一个活跃请求，返回追踪 ID ---
 * @param url 请求 URL
 * @param method 请求方法
 */
export function track(url: string, method: string): string {
    const now = Date.now();
    const id = `${++requestCounter}-${now}`;
    activeRequests.set(id, {
        'url': url,
        'method': method,
        'start': now,
        'startCpu': process.cpuUsage(),
        'startMem': process.memoryUsage().rss,
    });
    return id;
}

/**
 * --- 移除已完成的请求追踪 ---
 * @param id 追踪 ID
 */
export function untrack(id: string): void {
    activeRequests.delete(id);
}

/**
 * --- 获取当前资源快照 ---
 */
export function getSnapshot(): ISnapshot {
    const mem = process.memoryUsage();
    const heapStats = v8.getHeapStatistics();
    const cpuUsage = process.cpuUsage();
    const now = Date.now();
    // --- 计算进程 CPU 使用率（单核基准） ---
    let cpuProcess = 0;
    if (lastCpuUsage && lastCpuTime) {
        /** --- 经过的时间（微秒） --- */
        const elapsed = (now - lastCpuTime) * 1_000;
        const userDiff = cpuUsage.user - lastCpuUsage.user;
        const sysDiff = cpuUsage.system - lastCpuUsage.system;
        cpuProcess = Math.min(100, ((userDiff + sysDiff) / elapsed) * 100);
    }
    // --- 计算系统总 CPU 使用率 ---
    const cpuOs = getOsCpuPercent();
    // --- 计算事件循环延迟（P99，纳秒转毫秒） ---
    let eloopLag = 0;
    if (eloopHistogram) {
        eloopLag = Math.round(eloopHistogram.percentile(99) / 1_000_000);
    }
    // --- 收集活跃请求 ---
    const requests: ISnapshotRequest[] = [];
    for (const [, req] of activeRequests) {
        const reqCpu = process.cpuUsage(req.startCpu);
        requests.push({
            'url': req.url,
            'method': req.method,
            'duration': now - req.start,
            'cpuUser': reqCpu.user,
            'cpuSystem': reqCpu.system,
            'memDelta': mem.rss - req.startMem,
        });
    }
    // --- 按持续时间降序排序 ---
    requests.sort((a, b) => b.duration - a.duration);
    return {
        'pid': process.pid,
        'time': now,
        'cpuProcess': Math.round(cpuProcess * 100) / 100,
        'cpuOs': cpuOs,
        'mem': {
            'rss': mem.rss,
            'heapTotal': mem.heapTotal,
            'heapUsed': mem.heapUsed,
            'external': mem.external,
            'arrayBuffers': mem.arrayBuffers,
        },
        'heap': {
            'totalSize': heapStats.total_heap_size,
            'usedSize': heapStats.used_heap_size,
            'sizeLimit': heapStats.heap_size_limit,
        },
        'osMem': {
            'total': os.totalmem(),
            'free': os.freemem(),
        },
        'eloopLag': eloopLag,
        'activeRequests': requests,
        'activeCount': activeRequests.size,
    };
}

/**
 * --- 周期性检查，在超阈值时记录日志 ---
 */
function check(): void {
    const cpuUsage = process.cpuUsage();
    const now = Date.now();
    // --- 更新心跳时间戳，让看门狗线程知道主线程还活着 ---
    if (heartbeatView) {
        Atomics.store(heartbeatView, 0, Math.floor(now / 1000));
        // --- 更新调试模式标志，让看门狗线程知道当前是否在调试 ---
        Atomics.store(heartbeatView, 1, isDebugMode() ? 1 : 0);
    }
    /** --- 计算本周期进程 CPU 使用率（单核基准） --- */
    let cpuPercent = 0;
    /** --- 实际经过的时间（ms），用于检测事件循环阻塞 --- */
    let actualElapsed = INTERVAL;
    if (lastCpuUsage && lastCpuTime) {
        actualElapsed = now - lastCpuTime;
        const elapsedUs = actualElapsed * 1_000;
        const userDiff = cpuUsage.user - lastCpuUsage.user;
        const sysDiff = cpuUsage.system - lastCpuUsage.system;
        cpuPercent = Math.min(100, ((userDiff + sysDiff) / elapsedUs) * 100);
    }
    lastCpuUsage = cpuUsage;
    lastCpuTime = now;
    // --- 计算系统总 CPU 使用率 ---
    const cpuOs = getOsCpuPercent();
    const memMB = process.memoryUsage().rss / 1024 / 1024;
    let eloopLag = 0;
    if (eloopHistogram) {
        eloopLag = Math.round(eloopHistogram.percentile(99) / 1_000_000);
        // --- 重置直方图，避免历史数据影响 ---
        eloopHistogram.reset();
    }
    // --- 检测事件循环阻塞：实际间隔远大于预期说明事件循环曾被阻塞 ---
    if (actualElapsed > INTERVAL * 3) {
        // --- 调试模式下断点暂停会导致计时差异，跳过阻塞检测 ---
        if (isDebugMode()) {
            spikeCounter = 0;
            return;
        }
        const blockMs = actualElapsed - INTERVAL;
        const alerts: string[] = [
            `ELOOP_BLOCKED ${Math.round(blockMs)}ms`
        ];
        // --- 事件循环阻塞是严重事件，跳过 spikeCounter 直接记录 ---
        logSpike(alerts, cpuPercent, cpuOs, eloopLag, true);
        spikeCounter = 0;
        return;
    }
    // --- 判断是否超阈值 ---
    const alerts: string[] = [];
    if (cpuPercent >= cpuThreshold) {
        alerts.push(`PROC_CPU ${Math.round(cpuPercent * 100) / 100}% >= ${cpuThreshold}%`);
    }
    if (memMB >= memThreshold) {
        alerts.push(`MEM ${Math.round(memMB)}MB >= ${memThreshold}MB`);
    }
    if (eloopLag >= eloopThreshold) {
        alerts.push(`ELOOP_LAG ${eloopLag}ms >= ${eloopThreshold}ms`);
    }
    if (alerts.length) {
        ++spikeCounter;
        if (spikeCounter >= SPIKE_COUNT) {
            // --- 超阈值持续达标，记录日志 ---
            logSpike(alerts, cpuPercent, cpuOs, eloopLag);
            // --- 重置计数，防止持续刷日志 ---
            spikeCounter = 0;
        }
    }
    else {
        spikeCounter = 0;
    }
}

/**
 * --- 将骤升信息写入日志，并采集诊断数据 ---
 * @param alerts 告警描述
 * @param cpuPercent 当前 CPU 百分比
 * @param cpuOs 系统 CPU 百分比
 * @param eloopLag 当前事件循环延迟
 * @param blocked 是否为事件循环阻塞后触发（watchdog 已在阻塞期间远程采集诊断）
 */
function logSpike(
    alerts: string[], cpuPercent: number, cpuOs: number,
    eloopLag: number, blocked: boolean = false,
): void {
    const mem = process.memoryUsage();
    const heapStats = v8.getHeapStatistics();
    // --- 收集活跃请求详情 ---
    const now = Date.now();
    const requestDetails: string[] = [];
    for (const [, req] of activeRequests) {
        const reqCpu = process.cpuUsage(req.startCpu);
        const duration = now - req.start;
        const cpuTotal = reqCpu.user + reqCpu.system;
        const memDelta = mem.rss - req.startMem;
        requestDetails.push(
            `[${req.method}] ${req.url} (${duration}ms, CPU: ${cpuTotal}us, MEM_DELTA: ${memDelta >= 0 ? '+' : '-'}${lText.sizeFormat(Math.abs(memDelta), '')})`
        );
    }
    // --- 诊断采集策略 ---
    // --- blocked=true：阻塞期间 watchdog 已通过 connectToMainThread() 远程采集了精确堆栈和 Profile ---
    // --- blocked=false：持续性骤升，此处由主线程自行采集 Report/Profile/HeapSnapshot ---
    if (!blocked && now - lastDiagnosticTime >= DIAGNOSTIC_COOLDOWN) {
        lastDiagnosticTime = now;
        const hasCpuSpike = cpuPercent >= cpuThreshold;
        const hasMemSpike = (mem.rss / 1024 / 1024) >= memThreshold;
        const ts = lTime.format(null, 'YmdHis');
        const diagDir = `${kebab.LOG_CWD}monitor/${process.pid}/`;
        lFs.mkdir(diagDir, 0o777).then(() => {
            // --- 1. Diagnostic Report（包含 JS 堆栈、libuv handles、系统信息） ---
            try {
                process.report.directory = diagDir;
                const reportName = `report-${ts}.json`;
                process.report.writeReport(reportName);
                lCore.display(`[MONITOR] Diagnostic report: ${diagDir}${reportName}`);
            }
            catch (e) {
                lCore.debug('[MONITOR] Diagnostic report failed', e);
            }
            // --- 2. CPU Profile（精确到函数+行号的 CPU 消耗定位） ---
            if (hasCpuSpike) {
                collectCpuProfile(diagDir, ts).catch((e) => {
                    lCore.debug('[MONITOR] CPU profile failed', e);
                });
            }
            // --- 3. Heap Snapshot（内存泄漏定位到对象分配源） ---
            if (hasMemSpike) {
                try {
                    const heapFile = v8.writeHeapSnapshot(`${diagDir}heap-${ts}.heapsnapshot`);
                    lCore.display(`[MONITOR] Heap snapshot: ${heapFile}`);
                }
                catch (e) {
                    lCore.debug('[MONITOR] Heap snapshot failed', e);
                }
            }
        }).catch((e) => {
            lCore.debug('[MONITOR] Failed to create diagnostic directory', e);
        });
    }
    const msg = `SPIKE [${alerts.join(', ')}] ` +
        `PID:${process.pid} ` +
        `PROC_CPU:${Math.round(cpuPercent * 100) / 100}% ` +
        `OS_CPU:${cpuOs}% ` +
        `RSS:${lText.sizeFormat(mem.rss, '')} ` +
        `HEAP:${lText.sizeFormat(mem.heapUsed, '')}/${lText.sizeFormat(mem.heapTotal, '')} ` +
        `HEAP_LIMIT:${lText.sizeFormat(heapStats.heap_size_limit, '')} ` +
        `OS_MEM:${lText.sizeFormat(os.totalmem() - os.freemem(), '')}/${lText.sizeFormat(os.totalmem(), '')} ` +
        `ELOOP_LAG:${eloopLag}ms ` +
        `ACTIVE_REQ:${activeRequests.size} ` +
        `REQUESTS:[${requestDetails.join(' | ')}]`;
    lCore.log({}, msg, '-monitor');
    lCore.display('[MONITOR]', msg);
}

/**
 * --- 通过 os.cpus() 两次采样的 Delta 计算系统总 CPU 使用率 ---
 * @returns 0-100 的百分比值，和任务管理器/top 命令一致
 */
function getOsCpuPercent(): number {
    const cpus = os.cpus();
    if (!lastOsCpus || lastOsCpus.length !== cpus.length) {
        lastOsCpus = cpus;
        return 0;
    }
    let totalIdle = 0;
    let totalTick = 0;
    for (let i = 0; i < cpus.length; ++i) {
        const cur = cpus[i].times;
        const prev = lastOsCpus[i].times;
        const idleDiff = cur.idle - prev.idle;
        const totalDiff = (cur.user - prev.user) +
            (cur.nice - prev.nice) +
            (cur.sys - prev.sys) +
            (cur.irq - prev.irq) +
            idleDiff;
        totalIdle += idleDiff;
        totalTick += totalDiff;
    }
    lastOsCpus = cpus;
    if (totalTick === 0) {
        return 0;
    }
    return Math.round((1 - totalIdle / totalTick) * 10000) / 100;
}

/**
 * --- 通过 Inspector 协议采集 CPU Profile ---
 * @param dir 诊断文件输出目录
 * @param ts 时间戳字符串
 */
async function collectCpuProfile(dir: string, ts: string): Promise<void> {
    if (profiling) {
        return;
    }
    profiling = true;
    const session = new inspector.Session();
    try {
        session.connect();
        await new Promise<void>((resolve, reject) => {
            session.post('Profiler.enable', (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
        await new Promise<void>((resolve, reject) => {
            session.post('Profiler.start', (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
        // --- 采集指定时长 ---
        await lCore.sleep(PROFILE_DURATION);
        const profile = await new Promise<inspector.Profiler.Profile>((resolve, reject) => {
            session.post('Profiler.stop', (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result.profile);
            });
        });
        const filePath = `${dir}cpu-${ts}.cpuprofile`;
        await lFs.putContent(filePath, lText.stringifyJson(profile), {
            'encoding': 'utf8',
        });
        lCore.display(`[MONITOR] CPU profile: ${filePath}`);
    }
    finally {
        session.disconnect();
        profiling = false;
    }
}

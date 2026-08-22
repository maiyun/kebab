/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2026-02-07
 * Last: 2026-08-22
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

/** --- CPU 使用率阈值，100 代表占满一个逻辑核心 --- */
let cpuThreshold: number = 80;

/** --- 内存使用率阈值，单位 MB --- */
let memThreshold: number = 0;

/** --- 事件循环延迟阈值，单位 ms --- */
let eloopThreshold: number = 500;

/** --- 是否在内存超阈值时自动采集堆快照 --- */
let heapSnapshotEnabled: boolean = false;

/** --- 监控间隔，单位 ms --- */
const INTERVAL: number = 5_000;

/** --- 连续超阈值次数达到此值才记录日志，防止瞬间波动 --- */
const SPIKE_COUNT: number = 2;

/** --- CPU Profile 采集时长，单位 ms --- */
const PROFILE_DURATION: number = 5_000;

/** --- 两次诊断采集的最小间隔，防止频繁写磁盘，单位 ms --- */
const DIAGNOSTIC_COOLDOWN: number = 60_000;

/** --- 单次快照或日志最多输出的活跃请求详情数 --- */
const MAX_ACTIVE_REQUEST_DETAILS: number = 100;

// --- 内部状态 ---

/** --- 定时器 --- */
let timer: NodeJS.Timeout | null = null;

/** --- 周期检查的上次 CPU 累计用量 --- */
let lastCheckCpuUsage: NodeJS.CpuUsage | null = null;

/** --- 周期检查的上次 CPU 采样时间戳 --- */
let lastCheckCpuTime: number = 0;

/** --- 周期检查的上次系统各核 CPU 时间快照 --- */
let lastCheckOsCpus: os.CpuInfo[] | null = null;

/** --- 对外快照的上次 CPU 累计用量 --- */
let lastSnapshotCpuUsage: NodeJS.CpuUsage | null = null;

/** --- 对外快照的上次 CPU 采样时间戳 --- */
let lastSnapshotCpuTime: number = 0;

/** --- 对外快照的上次系统各核 CPU 时间快照 --- */
let lastSnapshotOsCpus: os.CpuInfo[] | null = null;

/** --- 事件循环延迟直方图 --- */
let eloopHistogram: perfHooks.IntervalHistogram | null = null;

/** --- 连续超阈值计数 --- */
let spikeCounter: number = 0;

/** --- 请求自增计数器 --- */
let requestCounter: number = 0;

/** --- 上次诊断采集时间 --- */
let lastDiagnosticTime: number = 0;

/** --- 是否正在采集诊断数据 --- */
let diagnosing: boolean = false;

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

/** --- 心跳共享内存（Uint32: 秒级时间戳） --- */
let heartbeatBuffer: SharedArrayBuffer | null = null;

/** --- 心跳共享内存视图 --- */
let heartbeatView: Uint32Array | null = null;

/** --- 看门狗检测阈值，主线程超过此秒数未更新心跳则认为阻塞，单位秒 --- */
const WATCHDOG_THRESHOLD: number = 15;

/** --- 看门狗检测间隔，单位 ms --- */
const WATCHDOG_INTERVAL: number = 5_000;

/** --- 看门狗告警冷却时间，持续阻塞时不会每次都写日志，单位秒 --- */
const WATCHDOG_COOLDOWN: number = 30;

/** --- 看门狗异常退出后的重启延迟，单位 ms --- */
const WATCHDOG_RESTART_DELAY: number = 5_000;

/** --- 看门狗重启定时器 --- */
let watchdogRestartTimer: NodeJS.Timeout | null = null;

// --- 活跃请求追踪 ---

/** --- 活跃请求的描述 --- */
interface IActiveRequest {
    'url': string;
    'method': string;
    /** --- 请求开始的时间戳（ms） --- */
    'start': number;
    /** --- 请求开始时的 CPU 累计用量基准 --- */
    'startCpu': NodeJS.CpuUsage;
    /** --- 请求开始时的进程整体内存 RSS 基准（bytes） --- */
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
    /** --- 请求存续期间的进程整体用户态 CPU 增量（微秒），不代表请求独占 --- */
    'cpuUser': number;
    /** --- 请求存续期间的进程整体系统态 CPU 增量（微秒），不代表请求独占 --- */
    'cpuSystem': number;
    /** --- 请求存续期间的进程整体 RSS 增量（bytes），不代表请求独占 --- */
    'memDelta': number;
}

/** --- 经脱敏后写入磁盘的 Node.js 诊断报告 --- */
interface IDiagnosticReport {
    'header'?: {
        'commandLine'?: string[];
        'networkInterfaces'?: unknown;
    };
    'environmentVariables'?: unknown;
    'libuv'?: Array<{
        'localEndpoint'?: unknown;
        'remoteEndpoint'?: unknown;
    }>;
}

/** --- 整体资源快照 --- */
export interface ISnapshot {
    'pid': number;
    'time': number;
    /** --- 本进程 CPU 占用，100 代表占满一个逻辑核心，多线程时可超过 100 --- */
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
    /** --- 最早开始的活跃请求，最多 100 条 --- */
    'activeRequests': ISnapshotRequest[];
    /** --- 全部活跃请求数量，可能大于 activeRequests.length --- */
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
    /** --- 内存超阈值时是否采集堆快照，默认 false --- */
    'heapSnapshot'?: boolean;
}): void {
    if (timer) {
        return;
    }
    const nextCpuThreshold = opt?.cpu ?? 80;
    const nextMemThreshold = opt?.mem ?? 0;
    const nextEloopThreshold = opt?.eloop ?? 500;
    if (!Number.isFinite(nextCpuThreshold) || nextCpuThreshold <= 0) {
        throw new RangeError('Monitor CPU threshold must be greater than 0.');
    }
    if (!Number.isFinite(nextMemThreshold) || nextMemThreshold < 0) {
        throw new RangeError('Monitor memory threshold cannot be negative.');
    }
    if (!Number.isFinite(nextEloopThreshold) || nextEloopThreshold <= 0) {
        throw new RangeError('Monitor event loop threshold must be greater than 0.');
    }
    cpuThreshold = nextCpuThreshold;
    memThreshold = nextMemThreshold;
    eloopThreshold = nextEloopThreshold;
    heapSnapshotEnabled = opt?.heapSnapshot ?? false;
    if (memThreshold === 0) {
        // --- 同时考虑容器/系统约束和 V8 堆上限，避免默认阈值高于进程实际可用范围 ---
        const constrainedMemory = process.constrainedMemory();
        const systemLimit = constrainedMemory > 0
            ? Math.min(constrainedMemory, os.totalmem())
            : os.totalmem();
        const heapLimit = v8.getHeapStatistics().heap_size_limit;
        memThreshold = Math.floor(
            Math.min(systemLimit * 0.8, heapLimit * 0.9) / 1024 / 1024,
        );
    }
    const cpuUsage = process.cpuUsage();
    const cpuTime = Date.now();
    const osCpus = os.cpus();
    lastCheckCpuUsage = cpuUsage;
    lastCheckCpuTime = cpuTime;
    lastCheckOsCpus = osCpus;
    lastSnapshotCpuUsage = cpuUsage;
    lastSnapshotCpuTime = cpuTime;
    lastSnapshotOsCpus = osCpus;
    spikeCounter = 0;
    lastDiagnosticTime = 0;
    // --- 初始化心跳共享内存（索引 0: 秒级时间戳, 索引 1: 调试模式标志） ---
    heartbeatBuffer = new SharedArrayBuffer(8);
    heartbeatView = new Uint32Array(heartbeatBuffer);
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
    if (watchdogRestartTimer) {
        clearTimeout(watchdogRestartTimer);
        watchdogRestartTimer = null;
    }
    activeRequests.clear();
    lastCheckCpuUsage = null;
    lastCheckCpuTime = 0;
    lastCheckOsCpus = null;
    lastSnapshotCpuUsage = null;
    lastSnapshotCpuTime = 0;
    lastSnapshotOsCpus = null;
    spikeCounter = 0;
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
            scheduleWatchdogRestart();
        });
        lCore.debug(`[MONITOR] [THREAD] [${process.pid}] Watchdog started`);
    }
    catch (e) {
        lCore.debug('[MONITOR] Failed to start watchdog', e);
        scheduleWatchdogRestart();
    }
}

/**
 * --- 看门狗异常退出后延迟重启，避免失去阻塞检测能力 ---
 */
function scheduleWatchdogRestart(): void {
    if (!timer || watchdog || watchdogRestartTimer) {
        return;
    }
    watchdogRestartTimer = setTimeout(() => {
        watchdogRestartTimer = null;
        startWatchdog();
    }, WATCHDOG_RESTART_DELAY);
    watchdogRestartTimer.unref();
}

/**
 * --- 注册一个活跃请求，返回追踪 ID ---
 * @param url 请求 URL
 * @param method 请求方法
 */
export function track(url: string, method: string): string {
    const now = Date.now();
    const id = `${++requestCounter}-${now}`;
    const queryIndex = url.search(/[?#]/u);
    activeRequests.set(id, {
        // --- 查询参数可能含凭据或个人信息，诊断中只保留请求路径 ---
        'url': queryIndex === -1 ? url : url.slice(0, queryIndex),
        'method': method,
        'start': now,
        'startCpu': process.cpuUsage(),
        'startMem': process.memoryUsage.rss(),
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
    if (lastSnapshotCpuUsage && lastSnapshotCpuTime) {
        /** --- 经过的时间（微秒） --- */
        const elapsed = (now - lastSnapshotCpuTime) * 1_000;
        const userDiff = cpuUsage.user - lastSnapshotCpuUsage.user;
        const sysDiff = cpuUsage.system - lastSnapshotCpuUsage.system;
        if (elapsed > 0) {
            cpuProcess = ((userDiff + sysDiff) / elapsed) * 100;
        }
    }
    lastSnapshotCpuUsage = cpuUsage;
    lastSnapshotCpuTime = now;
    // --- 计算系统总 CPU 使用率 ---
    const osCpus = os.cpus();
    const cpuOs = getOsCpuPercent(lastSnapshotOsCpus, osCpus);
    lastSnapshotOsCpus = osCpus;
    // --- 计算事件循环延迟（P99，纳秒转毫秒） ---
    let eloopLag = 0;
    if (eloopHistogram) {
        eloopLag = Math.round(eloopHistogram.percentile(99) / 1_000_000);
    }
    // --- 收集活跃请求 ---
    const requests: ISnapshotRequest[] = [];
    for (const [, req] of activeRequests) {
        if (requests.length >= MAX_ACTIVE_REQUEST_DETAILS) {
            break;
        }
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
    if (lastCheckCpuUsage && lastCheckCpuTime) {
        actualElapsed = now - lastCheckCpuTime;
        const elapsedUs = actualElapsed * 1_000;
        const userDiff = cpuUsage.user - lastCheckCpuUsage.user;
        const sysDiff = cpuUsage.system - lastCheckCpuUsage.system;
        if (elapsedUs > 0) {
            cpuPercent = ((userDiff + sysDiff) / elapsedUs) * 100;
        }
    }
    lastCheckCpuUsage = cpuUsage;
    lastCheckCpuTime = now;
    // --- 计算系统总 CPU 使用率 ---
    const osCpus = os.cpus();
    const cpuOs = getOsCpuPercent(lastCheckOsCpus, osCpus);
    lastCheckOsCpus = osCpus;
    const memMB = process.memoryUsage.rss() / 1024 / 1024;
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
        if (requestDetails.length >= MAX_ACTIVE_REQUEST_DETAILS) {
            break;
        }
        const reqCpu = process.cpuUsage(req.startCpu);
        const duration = now - req.start;
        const cpuTotal = reqCpu.user + reqCpu.system;
        const memDelta = mem.rss - req.startMem;
        requestDetails.push(
            `[${req.method}] ${req.url} (${duration}ms, PROC_CPU_DELTA: ${cpuTotal}us, PROC_RSS_DELTA: ${memDelta >= 0 ? '+' : '-'}${lText.sizeFormat(Math.abs(memDelta), '')})`
        );
    }
    const omittedRequests = activeRequests.size - requestDetails.length;
    if (omittedRequests > 0) {
        requestDetails.push(`... ${omittedRequests} more`);
    }
    // --- 诊断采集策略 ---
    // --- blocked=true：阻塞期间 watchdog 已通过 connectToMainThread() 远程采集了精确堆栈和 Profile ---
    // --- blocked=false：持续性骤升，此处由主线程自行采集 Report/Profile/HeapSnapshot ---
    if (!blocked && !diagnosing && now - lastDiagnosticTime >= DIAGNOSTIC_COOLDOWN) {
        lastDiagnosticTime = now;
        diagnosing = true;
        const hasCpuSpike = cpuPercent >= cpuThreshold;
        const hasMemSpike = (mem.rss / 1024 / 1024) >= memThreshold;
        const diagnosticTime = new Date();
        const ts = lTime.format(null, 'YmdHis', diagnosticTime);
        const diagDir = `${kebab.LOG_CWD}monitor/${lTime.format(null, 'Y/m/d/His', diagnosticTime)}-pid-${process.pid}/`;
        collectDiagnostics(
            diagDir, ts, hasCpuSpike, hasMemSpike && heapSnapshotEnabled,
        ).catch((e) => {
            lCore.debug('[MONITOR] Diagnostic collection failed', e);
        }).finally(() => {
            diagnosing = false;
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
 * @param previous 上次系统各核 CPU 时间快照
 * @param current 当前系统各核 CPU 时间快照
 * @returns 0-100 的百分比值，和任务管理器/top 命令一致
 */
function getOsCpuPercent(previous: os.CpuInfo[] | null, current: os.CpuInfo[]): number {
    if (previous?.length !== current.length) {
        return 0;
    }
    let totalIdle = 0;
    let totalTick = 0;
    for (let i = 0; i < current.length; ++i) {
        const cur = current[i].times;
        const prev = previous[i].times;
        const idleDiff = cur.idle - prev.idle;
        const totalDiff = (cur.user - prev.user) +
            (cur.nice - prev.nice) +
            (cur.sys - prev.sys) +
            (cur.irq - prev.irq) +
            idleDiff;
        totalIdle += idleDiff;
        totalTick += totalDiff;
    }
    if (totalTick <= 0) {
        return 0;
    }
    const percent = (1 - totalIdle / totalTick) * 100;
    return Math.round(Math.max(0, Math.min(100, percent)) * 100) / 100;
}

/**
 * --- 采集诊断报告及按需 Profile，避免并行采集互相污染数据 ---
 * @param dir 诊断文件输出目录
 * @param ts 时间戳字符串
 * @param hasCpuSpike 是否发生 CPU 骤升
 * @param collectHeapSnapshot 是否采集堆快照
 */
async function collectDiagnostics(
    dir: string, ts: string, hasCpuSpike: boolean, collectHeapSnapshot: boolean,
): Promise<void> {
    if (!await lFs.mkdir(dir, 0o700)) {
        throw new Error(`Failed to create diagnostic directory: ${dir}`);
    }
    if (!await lFs.chmod(dir, 0o700)) {
        throw new Error(`Failed to secure diagnostic directory: ${dir}`);
    }
    // --- Diagnostic Report 默认会包含命令行、环境变量和网络端点，落盘前显式脱敏 ---
    const reportName = `report-${ts}.json`;
    const report = process.report.getReport() as IDiagnosticReport;
    if (report.header) {
        report.header.commandLine = [];
        delete report.header.networkInterfaces;
    }
    delete report.environmentVariables;
    for (const handle of report.libuv ?? []) {
        delete handle.localEndpoint;
        delete handle.remoteEndpoint;
    }
    const reportPath = `${dir}${reportName}`;
    const written = await lFs.putContent(
        reportPath, lText.stringifyJson(report, 2),
        { 'encoding': 'utf8', 'mode': 0o600 },
    );
    if (!written) {
        throw new Error(`Failed to write diagnostic report: ${reportPath}`);
    }
    if (!await lFs.chmod(reportPath, 0o600)) {
        throw new Error(`Failed to secure diagnostic report: ${reportPath}`);
    }
    lCore.display(`[MONITOR] Diagnostic report: ${reportPath}`);
    if (hasCpuSpike) {
        await collectCpuProfile(dir, ts);
    }
    // --- 堆快照会同步阻塞并额外占用大量内存，仅在调用方明确开启时采集 ---
    if (collectHeapSnapshot) {
        const heapFile = v8.writeHeapSnapshot(`${dir}heap-${ts}.heapsnapshot`);
        if (!await lFs.chmod(heapFile, 0o600)) {
            throw new Error(`Failed to secure heap snapshot: ${heapFile}`);
        }
        lCore.display(`[MONITOR] Heap snapshot: ${heapFile}`);
    }
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
        const written = await lFs.putContent(filePath, lText.stringifyJson(profile), {
            'encoding': 'utf8',
            'mode': 0o600,
        });
        if (!written) {
            throw new Error(`Failed to write CPU profile: ${filePath}`);
        }
        if (!await lFs.chmod(filePath, 0o600)) {
            throw new Error(`Failed to secure CPU profile: ${filePath}`);
        }
        lCore.display(`[MONITOR] CPU profile: ${filePath}`);
    }
    finally {
        session.disconnect();
        profiling = false;
    }
}

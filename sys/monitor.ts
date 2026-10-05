/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2026-02-07
 * Last: 2026-10-05
 * --- 性能监控库，用于确认 CPU/内存持续超阈值，保存相关请求、资源采样和诊断文件 ---
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

/** --- 监控间隔，单位 ms；主线程被阻塞时由 Worker 独立采样 --- */
const INTERVAL: number = 1_000;

/** --- 同一指标持续超阈值的确认时间，单位 ms --- */
let spikeDuration: number = 10_000;

/** --- CPU Profile 采集时长，单位 ms --- */
const PROFILE_DURATION: number = 5_000;

/** --- 同一持续异常重复采集的间隔，单位 ms；新事件或指标复发不受此限制 --- */
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

/** --- 各指标首次超阈值的单调时钟时间，不能跨指标累计 --- */
let spikeSince: { 'cpu': number | null; 'mem': number | null; 'eloop': number | null; } = {
    'cpu': null, 'mem': null, 'eloop': null,
};

/** --- 请求自增计数器 --- */
let requestCounter: number = 0;

/** --- 是否正在采集诊断数据 --- */
let diagnosing: boolean = false;

/** --- 是否正在进行 CPU Profile 采集 --- */
let profiling: boolean = false;

/** --- 同步 Report/HeapSnapshot 会影响本采样窗口，完成后重新建立检测基准 --- */
let diagnosticOverhead: boolean = false;

/**
 * --- 检测当前是否处于调试模式（以 --inspect 启动或 IDE 调试器已连接） ---
 * @returns 是否处于调试模式
 */
function isDebugMode(): boolean {
    return !!inspector.url();
}

/**
 * --- 获取单调时钟毫秒数，避免系统校时影响 CPU 比例和心跳 ---
 * @returns 单调时钟毫秒数
 */
function clockMs(): number {
    return Number(process.hrtime.bigint() / 1_000_000n);
}

// --- 看门狗相关 ---

/** --- 看门狗 Worker 实例 --- */
let watchdog: workerThreads.Worker | null = null;

/** --- 心跳共享内存，协议见 monitor/watchdog.ts --- */
let heartbeatBuffer: SharedArrayBuffer | null = null;

/** --- 心跳共享内存视图 --- */
let heartbeatView: BigInt64Array | null = null;

/** --- 主线程持续未更新心跳的确认时间，单位 ms --- */
let watchdogThreshold: number = 5_000;

/** --- 看门狗检测间隔，单位 ms --- */
const WATCHDOG_INTERVAL: number = 1_000;

/** --- 看门狗告警冷却时间，持续阻塞时不会每次都写日志，单位秒 --- */
const WATCHDOG_COOLDOWN: number = 30;

/** --- 看门狗异常退出后的重启延迟，单位 ms --- */
const WATCHDOG_RESTART_DELAY: number = 5_000;

/** --- 看门狗重启定时器 --- */
let watchdogRestartTimer: NodeJS.Timeout | null = null;

// --- 活跃请求追踪 ---

/** --- 活跃请求的描述 --- */
export interface IActiveRequest {
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
export interface ISnapshotRequest {
    'url': string;
    'method': string;
    'duration': number;
    /** --- 请求存续期间的进程整体用户态 CPU 增量（微秒），不代表请求独占 --- */
    'cpuUser': number;
    /** --- 请求存续期间的进程整体系统态 CPU 增量（微秒），不代表请求独占 --- */
    'cpuSystem': number;
    /** --- 请求存续期间的进程整体 RSS 增量（bytes），不代表请求独占 --- */
    'memDelta': number;
    /** --- 已完成请求的结束时间，活跃请求不含此字段 --- */
    'completedAt'?: number;
}

/** --- 有界保存最近完成的请求，避免采集时请求已经移出活跃池 --- */
const recentRequests: ISnapshotRequest[] = [];

/** --- 最近一分钟的资源采样，不包含请求参数或请求体 --- */
const sampleHistory: IResourceSample[] = [];

/** --- 单次资源采样 --- */
interface IResourceSample {
    'time': number;
    'elapsed': number;
    'cpu': number;
    'cpuOs': number;
    'rss': number;
    'heapUsed': number;
    'external': number;
    'arrayBuffers': number;
    'eloop': number;
    'eloopMax': number;
}

/** --- 一次异常事件；摘要始终落盘，重型诊断的结果另行记录 --- */
interface IIncident {
    'dir': string;
    'startedAt': number;
    'confirmedAt': number;
    'endedAt': number | null;
    'endReason': 'recovered' | 'stopped' | null;
    'reasons': string[];
    'activeReasons': string[];
    'impact': 'resource-high' | 'event-loop-delayed';
    'thresholds': { 'cpu': number; 'mem': number; 'eloop': number; 'duration': number; 'blocked': number; };
    'before': IResourceSample[];
    'samples': IResourceSample[];
    'peaks': { 'cpu': number; 'rss': number; 'heapUsed': number; 'eloop': number; };
    'snapshot': ISnapshot;
    'recoveredSnapshot'?: ISnapshot;
    'diagnostics': Array<{ 'time': number; 'status': string; 'files': string[]; 'errors': string[]; 'snapshot': ISnapshot; }>;
}

/** --- 看门狗提供的实际采集结果，用心跳标识关联主线程恢复后的事件 --- */
interface IWatchdogDiagnostic {
    'type': 'diagnostic';
    'heartbeat': number;
    'dir': string;
    'status': string;
    'files': string[];
    'errors': string[];
}

let lastWatchdogDiagnostic: IWatchdogDiagnostic | null = null;
const watchdogIncidents = new Map<number, { 'event': IIncident; 'result': IIncident['diagnostics'][number]; }>();

/** --- 当前持续异常及其上次重型诊断时间 --- */
let incident: IIncident | null = null;
let lastDiagnosticTime: number = 0;
let lastEventSaveTime: number = 0;

/** --- 串行写入事件摘要，避免初次保存覆盖恢复或采集结果 --- */
let eventWrites: Promise<void> = Promise.resolve();

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
    /** --- 本采样窗口最大延迟，用于复盘单次卡顿；持续告警仍按 P99 判断 --- */
    'eloopMax': number;
    /** --- 最早开始的活跃请求，最多 100 条 --- */
    'activeRequests': ISnapshotRequest[];
    /** --- 全部活跃请求数量，可能大于 activeRequests.length --- */
    'activeCount': number;
    /** --- 最近一分钟完成的请求，最多 100 条；资源增量均为整个进程的增量 --- */
    'recentRequests': ISnapshotRequest[];
}

/**
 * --- 启动性能监控 ---
 * @param opt 可选的阈值配置
 * @returns 是否成功启动，配置无效时返回 false
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
    /** --- 同一指标持续超阈值的确认时间 ms，默认 10000 --- */
    'duration'?: number;
    /** --- 主线程心跳中断的确认时间 ms，默认 5000，最小 1000 --- */
    'blocked'?: number;
}): boolean {
    if (timer) {
        return true;
    }
    const nextCpuThreshold = opt?.cpu ?? 80;
    const nextMemThreshold = opt?.mem ?? 0;
    const nextEloopThreshold = opt?.eloop ?? 500;
    const nextDuration = opt?.duration ?? 10_000;
    const nextBlocked = opt?.blocked ?? 5_000;
    if (!Number.isFinite(nextCpuThreshold) || nextCpuThreshold <= 0) {
        return false;
    }
    if (!Number.isFinite(nextMemThreshold) || nextMemThreshold < 0) {
        return false;
    }
    if (!Number.isFinite(nextEloopThreshold) || nextEloopThreshold <= 0) {
        return false;
    }
    if (!Number.isFinite(nextDuration) || nextDuration < INTERVAL) {
        return false;
    }
    if (!Number.isFinite(nextBlocked) || nextBlocked < INTERVAL) {
        return false;
    }
    cpuThreshold = nextCpuThreshold;
    memThreshold = nextMemThreshold;
    eloopThreshold = nextEloopThreshold;
    spikeDuration = nextDuration;
    watchdogThreshold = nextBlocked;
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
    const cpuTime = clockMs();
    const osCpus = os.cpus();
    lastCheckCpuUsage = cpuUsage;
    lastCheckCpuTime = cpuTime;
    lastCheckOsCpus = osCpus;
    lastSnapshotCpuUsage = cpuUsage;
    lastSnapshotCpuTime = cpuTime;
    lastSnapshotOsCpus = osCpus;
    spikeSince = { 'cpu': null, 'mem': null, 'eloop': null };
    sampleHistory.length = 0;
    recentRequests.length = 0;
    incident = null;
    lastWatchdogDiagnostic = null;
    watchdogIncidents.clear();
    diagnosticOverhead = false;
    lastDiagnosticTime = 0;
    // --- 0: 单调时钟心跳, 1: 调试标志, 2: Inspector 占用, 3: 主线程诊断开销, 4: 已采集阻塞的心跳 ---
    heartbeatBuffer = new SharedArrayBuffer(40);
    heartbeatView = new BigInt64Array(heartbeatBuffer);
    Atomics.store(heartbeatView, 0, BigInt(cpuTime));
    Atomics.store(heartbeatView, 1, isDebugMode() ? 1n : 0n);
    // --- 启用事件循环延迟直方图 ---
    eloopHistogram = perfHooks.monitorEventLoopDelay({ 'resolution': 20 });
    eloopHistogram.enable();
    timer = setInterval(check, INTERVAL);
    // --- 启动看门狗线程 ---
    startWatchdog();
    lCore.debug(`[MONITOR] [PARENT] [${process.pid}] Started, CPU Threshold: ${cpuThreshold}%, MEM Threshold: ${memThreshold}MB, ELOOP Threshold: ${eloopThreshold}ms`);
    return true;
}

/**
 * --- 停止性能监控 ---
 * @returns 无返回值
 */
export function stop(): void {
    watchdogIncidents.clear();
    if (incident) {
        incident.endedAt = Date.now();
        incident.endReason = 'stopped';
        saveIncident(incident);
        incident = null;
    }
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
    recentRequests.length = 0;
    sampleHistory.length = 0;
    lastCheckCpuUsage = null;
    lastCheckCpuTime = 0;
    lastCheckOsCpus = null;
    lastSnapshotCpuUsage = null;
    lastSnapshotCpuTime = 0;
    lastSnapshotOsCpus = null;
    spikeSince = { 'cpu': null, 'mem': null, 'eloop': null };
    heartbeatBuffer = null;
    heartbeatView = null;
}

/**
 * --- 启动看门狗 Worker 线程，独立事件循环监控主线程心跳 ---
 * --- 实现代码见 monitor/watchdog.ts ---
 * @returns 无返回值
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
                'logFormat': lCore.globalConfig.logFormat ?? 'jsonl',
                'pid': process.pid,
                'threshold': watchdogThreshold,
                'cooldown': WATCHDOG_COOLDOWN,
                'interval': WATCHDOG_INTERVAL,
                'profileDuration': PROFILE_DURATION,
                'requests': Array.from(activeRequests.entries()),
            },
        });
        watchdog = worker;
        // --- 不阻止进程退出 ---
        worker.unref();
        worker.on('message', (message: IWatchdogDiagnostic) => {
            if (watchdog !== worker || message.type !== 'diagnostic') {
                return;
            }
            lastWatchdogDiagnostic = message;
            const pending = watchdogIncidents.get(message.heartbeat);
            if (pending) {
                pending.result.status = `watchdog-${message.status}`;
                pending.result.files = [`${message.dir}/blocked-event.json`, ...message.files];
                pending.result.errors.push(...message.errors);
                watchdogIncidents.delete(message.heartbeat);
                saveIncident(pending.event);
            }
        });
        worker.on('error', (err) => {
            lCore.log({}, `WATCHDOG_ERROR ${lText.stringifyError(err)}`, '-monitor');
            lCore.display('[MONITOR] Watchdog error', err);
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
        lCore.log({}, `WATCHDOG_START_FAILED ${lText.stringifyError(e)}`, '-monitor');
        lCore.display('[MONITOR] Failed to start watchdog', e);
        scheduleWatchdogRestart();
    }
}

/**
 * --- 看门狗异常退出后延迟重启，避免失去阻塞检测能力 ---
 * @returns 无返回值
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
 * @returns 追踪 ID
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
    watchdog?.postMessage({ 'type': 'request', id, 'request': activeRequests.get(id) });
    return id;
}

/**
 * --- 移除已完成的请求追踪 ---
 * @param id 追踪 ID
 * @returns 无返回值
 */
export function untrack(id: string): void {
    const req = activeRequests.get(id);
    if (req) {
        const now = Date.now();
        const completed = snapshotRequest(req, now, process.cpuUsage(), process.memoryUsage.rss());
        completed.completedAt = now;
        recentRequests.push(completed);
        trimRecentRequests(now);
        watchdog?.postMessage({ 'type': 'complete', id, 'request': completed });
    }
    activeRequests.delete(id);
}

/**
 * --- 获取请求存续期间的进程资源增量，不能据此认定请求独占资源 ---
 * @param req 追踪中的请求
 * @param now 当前时间戳 ms
 * @param cpu 当前进程 CPU 累计用量
 * @param rss 当前进程 RSS
 * @returns 请求快照
 */
function snapshotRequest(req: IActiveRequest, now: number, cpu: NodeJS.CpuUsage, rss: number): ISnapshotRequest {
    return {
        'url': req.url, 'method': req.method, 'duration': now - req.start,
        'cpuUser': cpu.user - req.startCpu.user, 'cpuSystem': cpu.system - req.startCpu.system,
        'memDelta': rss - req.startMem,
    };
}

/**
 * --- 限制最近请求的保留时长及条数 ---
 * @param now 当前时间戳 ms
 * @returns 无返回值
 */
function trimRecentRequests(now: number): void {
    while (recentRequests.length > MAX_ACTIVE_REQUEST_DETAILS ||
        recentRequests.length && now - (recentRequests[0].completedAt ?? 0) > 60_000) {
        recentRequests.shift();
    }
}

/**
 * --- 获取当前资源快照 ---
 * @returns 资源与请求快照
 */
export function getSnapshot(): ISnapshot {
    const cpuUsage = process.cpuUsage();
    const cpuTime = clockMs();
    // --- 计算进程 CPU 使用率（单核基准） ---
    let cpuProcess = 0;
    if (lastSnapshotCpuUsage && lastSnapshotCpuTime) {
        /** --- 经过的时间（微秒） --- */
        const elapsed = (cpuTime - lastSnapshotCpuTime) * 1_000;
        const userDiff = cpuUsage.user - lastSnapshotCpuUsage.user;
        const sysDiff = cpuUsage.system - lastSnapshotCpuUsage.system;
        if (elapsed > 0) {
            cpuProcess = ((userDiff + sysDiff) / elapsed) * 100;
        }
    }
    lastSnapshotCpuUsage = cpuUsage;
    lastSnapshotCpuTime = cpuTime;
    // --- 计算系统总 CPU 使用率 ---
    const osCpus = os.cpus();
    const cpuOs = getOsCpuPercent(lastSnapshotOsCpus, osCpus);
    lastSnapshotOsCpus = osCpus;
    return createSnapshot(Math.round(cpuProcess * 100) / 100, cpuOs);
}

/**
 * --- 组装资源与请求快照，不推进对外查询的 CPU 采样基准 ---
 * @param cpuProcess 当前采样窗口进程 CPU 百分比
 * @param cpuOs 当前采样窗口系统 CPU 百分比
 * @returns 资源快照
 */
function createSnapshot(cpuProcess: number, cpuOs: number): ISnapshot {
    const mem = process.memoryUsage();
    const heapStats = v8.getHeapStatistics();
    const cpuUsage = process.cpuUsage();
    const now = Date.now();
    // --- 计算事件循环延迟（P99，纳秒转毫秒） ---
    let eloopLag = 0;
    let eloopMax = 0;
    if (eloopHistogram) {
        eloopLag = Math.round(eloopHistogram.percentile(99) / 1_000_000);
        eloopMax = Math.round(eloopHistogram.max / 1_000_000);
    }
    // --- 收集活跃请求 ---
    const requests: ISnapshotRequest[] = [];
    for (const [, req] of activeRequests) {
        if (requests.length >= MAX_ACTIVE_REQUEST_DETAILS) {
            break;
        }
        requests.push(snapshotRequest(req, now, cpuUsage, mem.rss));
    }
    trimRecentRequests(now);
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
        'eloopMax': eloopMax,
        'activeRequests': requests,
        'activeCount': activeRequests.size,
        'recentRequests': [...recentRequests],
    };
}

/**
 * --- 周期检查：独立确认各指标，按一次持续异常记录开始、现场及恢复 ---
 * @returns 无返回值
 */
function check(): void {
    const cpuUsage = process.cpuUsage();
    const now = Date.now();
    const cpuTime = clockMs();
    const previousTime = lastCheckCpuTime;
    const actualElapsed = cpuTime - previousTime;
    let cpuPercent = 0;
    if (lastCheckCpuUsage && actualElapsed > 0) {
        cpuPercent = (cpuUsage.user - lastCheckCpuUsage.user + cpuUsage.system - lastCheckCpuUsage.system)
            / (actualElapsed * 1_000) * 100;
    }
    lastCheckCpuUsage = cpuUsage;
    lastCheckCpuTime = cpuTime;
    const osCpus = os.cpus();
    const cpuOs = getOsCpuPercent(lastCheckOsCpus, osCpus);
    lastCheckOsCpus = osCpus;
    if (heartbeatView) {
        Atomics.store(heartbeatView, 0, BigInt(cpuTime));
        Atomics.store(heartbeatView, 1, isDebugMode() ? 1n : 0n);
    }

    const snapshot = createSnapshot(Math.round(cpuPercent * 100) / 100, cpuOs);
    // --- 采样时同步配置，框架 reload 后看门狗也使用当前日志格式 ---
    watchdog?.postMessage({ 'type': 'snapshot', snapshot, 'logFormat': lCore.globalConfig.logFormat ?? 'jsonl' });
    eloopHistogram?.reset();
    // --- 调试暂停和同步诊断不能冒充业务阻塞，也不能连接暂停前后的异常计数 ---
    if (isDebugMode()) {
        spikeSince = { 'cpu': null, 'mem': null, 'eloop': null };
        return;
    }
    if (diagnosticOverhead) {
        diagnosticOverhead = false;
        // --- 已确认事件继续等待正常采样恢复，未确认的连续性重新计时 ---
        if (!incident?.reasons.includes('PROC_CPU')) {
            spikeSince.cpu = null;
        }
        if (!incident?.reasons.includes('MEM')) {
            spikeSince.mem = null;
        }
        if (!incident?.reasons.includes('ELOOP_LAG')) {
            spikeSince.eloop = null;
        }
        return;
    }
    const sample: IResourceSample = {
        'time': now, 'elapsed': actualElapsed, 'cpu': snapshot.cpuProcess, 'cpuOs': cpuOs,
        'rss': snapshot.mem.rss, 'heapUsed': snapshot.mem.heapUsed,
        'external': snapshot.mem.external, 'arrayBuffers': snapshot.mem.arrayBuffers,
        'eloop': snapshot.eloopLag, 'eloopMax': snapshot.eloopMax,
    };
    sampleHistory.push(sample);
    while (sampleHistory.length > 60) {
        sampleHistory.shift();
    }

    const alerts: string[] = [];
    const blocked = actualElapsed - INTERVAL >= watchdogThreshold;
    if (blocked) {
        alerts.push('ELOOP_BLOCKED');
        // --- 延迟检查只能证明这一窗口发生过阻塞，不能证明资源持续超阈值 ---
        spikeSince = { 'cpu': null, 'mem': null, 'eloop': null };
    }
    else {
        if (snapshot.cpuProcess >= cpuThreshold) {
            spikeSince.cpu ??= previousTime;
            if (cpuTime - spikeSince.cpu >= spikeDuration) {
                alerts.push('PROC_CPU');
            }
        }
        else {
            spikeSince.cpu = null;
        }
        if (snapshot.mem.rss / 1024 / 1024 >= memThreshold) {
            // --- 内存是时点值，首次超阈值之前的一个采样周期不能计入持续时间 ---
            spikeSince.mem ??= cpuTime;
            if (cpuTime - spikeSince.mem >= spikeDuration) {
                alerts.push('MEM');
            }
        }
        else {
            spikeSince.mem = null;
        }
        if (snapshot.eloopLag >= eloopThreshold) {
            spikeSince.eloop ??= previousTime;
            if (cpuTime - spikeSince.eloop >= spikeDuration) {
                alerts.push('ELOOP_LAG');
            }
        }
        else {
            spikeSince.eloop = null;
        }
    }

    if (!alerts.length) {
        if (incident) {
            incident.endedAt = now;
            incident.endReason = 'recovered';
            incident.activeReasons = [];
            incident.recoveredSnapshot = snapshot;
            saveIncident(incident);
            lCore.log({}, `RECOVERED PID:${process.pid} EVENT:${incident.dir}`, '-monitor');
            incident = null;
        }
        return;
    }
    recordIncident(alerts, snapshot, sample, blocked, previousTime);
}

/**
 * --- 串行保存事件摘要，重型诊断失败不影响基础现场保存 ---
 * @param event 要保存的事件
 * @returns 无返回值
 */
function saveIncident(event: IIncident): void {
    const content = lText.stringifyJson(event, 2);
    eventWrites = eventWrites.then(async () => {
        if (!await lFs.mkdir(event.dir, 0o700) || !await lFs.chmod(event.dir, 0o700) ||
            !await lFs.putContent(`${event.dir}event.json`, content, { 'mode': 0o600 }) ||
            !await lFs.chmod(`${event.dir}event.json`, 0o600)) {
            lCore.display('[MONITOR] Failed to save event:', event.dir);
        }
    }).catch((error: unknown) => {
        lCore.display('[MONITOR] Failed to save event:', error);
    });
}

/**
 * --- 记录一次已确认异常；同一事件定期更新，新事件不受上一事件冷却限制 ---
 * @param alerts 已确认的指标
 * @param snapshot 检测现场快照
 * @param sample 当前采样
 * @param blocked 是否刚从主线程阻塞恢复
 * @param previousTime 本采样窗口起点的单调时钟毫秒数
 * @returns 无返回值
 */
function recordIncident(
    alerts: string[], snapshot: ISnapshot, sample: IResourceSample, blocked: boolean, previousTime: number,
): void {
    const now = snapshot.time;
    const first = incident === null;
    if (!incident) {
        const date = new Date(now);
        const dir = `${kebab.LOG_CWD}monitor/${lTime.format(null, 'Y/m/d/His', date)}-pid-${process.pid}-${now}/`;
        incident = {
            dir, 'startedAt': now - Math.max(0, clockMs() - Math.min(
                spikeSince.cpu ?? Infinity, spikeSince.mem ?? Infinity, spikeSince.eloop ?? Infinity,
                blocked ? previousTime : Infinity)),
            'confirmedAt': now, 'endedAt': null, 'endReason': null, 'reasons': [], 'activeReasons': [], 'impact': 'resource-high',
            'thresholds': {
                'cpu': cpuThreshold, 'mem': memThreshold, 'eloop': eloopThreshold,
                'duration': spikeDuration, 'blocked': watchdogThreshold,
            },
            'before': [...sampleHistory], 'samples': [],
            'peaks': { 'cpu': 0, 'rss': 0, 'heapUsed': 0, 'eloop': 0 },
            snapshot, 'diagnostics': [],
        };
        lastDiagnosticTime = 0;
        lastEventSaveTime = 0;
    }
    const event = incident;
    // --- 内存事件尚未恢复时，CPU 恢复后再次升高仍是新的采集时机 ---
    const newReason = alerts.some(alert => !event.activeReasons.includes(alert));
    event.activeReasons = [...alerts];
    for (const alert of alerts) {
        if (!event.reasons.includes(alert)) {
            event.reasons.push(alert);
        }
    }
    if (alerts.includes('ELOOP_BLOCKED') || alerts.includes('ELOOP_LAG')) {
        event.impact = 'event-loop-delayed';
    }
    event.samples.push(sample);
    if (event.samples.length > 300) {
        event.samples.shift();
    }
    event.peaks.cpu = Math.max(event.peaks.cpu, sample.cpu);
    event.peaks.rss = Math.max(event.peaks.rss, sample.rss);
    event.peaks.heapUsed = Math.max(event.peaks.heapUsed, sample.heapUsed);
    event.peaks.eloop = Math.max(event.peaks.eloop, sample.eloopMax, sample.elapsed - INTERVAL);
    if (first || newReason) {
        const msg = `RESOURCE_HIGH [${alerts.join(', ')}] PID:${process.pid} ` +
            `PROC_CPU:${snapshot.cpuProcess}% RSS:${lText.sizeFormat(snapshot.mem.rss, '')} ` +
            `ELOOP_LAG:${snapshot.eloopLag}ms ACTIVE_REQ:${snapshot.activeCount} EVENT:${event.dir}`;
        lCore.log({}, msg, '-monitor');
        lCore.display('[MONITOR]', msg);
    }

    if (first || newReason || clockMs() - lastDiagnosticTime >= DIAGNOSTIC_COOLDOWN) {
        lastDiagnosticTime = clockMs();
        const result = { 'time': now, 'status': 'pending', 'files': [] as string[], 'errors': [] as string[], snapshot };
        event.diagnostics.push(result);
        if (event.diagnostics.length > 60) {
            event.diagnostics.shift();
        }
        const view = heartbeatView;
        // --- 只有看门狗确实保存过这一窗口的现场时，才省略恢复后的重复 Profile ---
        const watchdogCaptured = blocked && view !== null && Atomics.load(view, 4) >= BigInt(previousTime);
        if (watchdogCaptured) {
            const heartbeat = Number(Atomics.load(view, 4));
            if (lastWatchdogDiagnostic?.heartbeat === heartbeat) {
                result.status = `watchdog-${lastWatchdogDiagnostic.status}`;
                result.files = [`${lastWatchdogDiagnostic.dir}/blocked-event.json`, ...lastWatchdogDiagnostic.files];
                result.errors.push(...lastWatchdogDiagnostic.errors);
            }
            else {
                result.status = 'watchdog-captured';
                watchdogIncidents.set(heartbeat, { event, result });
            }
        }
        else if (diagnosing || view && Atomics.load(view, 2) !== 0n) {
            result.status = 'skipped-busy';
            lastDiagnosticTime = clockMs() - DIAGNOSTIC_COOLDOWN + 5_000;
        }
        else {
            diagnosing = true;
            const ts = `${lTime.format(null, 'YmdHis', new Date(now))}-${now}`;
            // --- 阻塞恢复后的 Profile 只能记录后续执行，摘要保留这个采集时机限制 ---
            if (blocked) {
                result.errors.push('The blocking stack was not captured; this profile starts after recovery.');
            }
            void collectDiagnostics(event.dir, ts, alerts.includes('PROC_CPU') || blocked,
                alerts.includes('MEM') && heapSnapshotEnabled, result, view).catch((error: unknown) => {
                result.status = 'failed';
                result.errors.push(lText.stringifyError(error));
            }).finally(() => {
                diagnosing = false;
                saveIncident(event);
            });
        }
    }
    if (first || newReason || now - lastEventSaveTime >= 5_000) {
        lastEventSaveTime = now;
        saveIncident(event);
    }
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
 * --- 独立保存 Report/Profile/HeapSnapshot，单项失败不阻止其他采集 ---
 * @param dir 诊断目录
 * @param ts 唯一采集时间标识
 * @param hasCpuSpike 是否需要 CPU Profile
 * @param collectHeapSnapshot 是否采集堆快照
 * @param result 写入事件摘要的采集结果
 * @param view 本次监控实例的共享内存
 * @returns 无返回值，失败原因保留在 result 中
 */
async function collectDiagnostics(
    dir: string, ts: string, hasCpuSpike: boolean, collectHeapSnapshot: boolean,
    result: { 'status': string; 'files': string[]; 'errors': string[]; }, view: BigInt64Array | null,
): Promise<void> {
    try {
        if (!await lFs.mkdir(dir, 0o700) || !await lFs.chmod(dir, 0o700)) {
            result.status = 'failed';
            result.errors.push('Failed to create or secure diagnostic directory.');
            return;
        }
        if (view !== heartbeatView) {
            result.status = 'cancelled';
            return;
        }
        const reportPath = `${dir}report-${ts}.json`;
        try {
            // --- 同步诊断本身的阻塞不作为业务异常；Worker 在这段时间只保留采样 ---
            diagnosticOverhead = true;
            if (view) {
                Atomics.store(view, 3, 1n);
            }
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
            if (view) {
                Atomics.store(view, 0, BigInt(clockMs()));
                Atomics.store(view, 3, 0n);
            }
            if (await lFs.putContent(reportPath, lText.stringifyJson(report, 2), { 'mode': 0o600 }) &&
                await lFs.chmod(reportPath, 0o600)) {
                result.files.push(reportPath);
            }
            else {
                result.errors.push('Failed to write or secure diagnostic report.');
            }
        }
        catch (error: unknown) {
            result.errors.push(`Report: ${lText.stringifyError(error)}`);
        }
        finally {
            if (view) {
                Atomics.store(view, 0, BigInt(clockMs()));
                Atomics.store(view, 3, 0n);
            }
        }

        if (hasCpuSpike) {
            if (await collectCpuProfile(dir, ts, result)) {
                result.files.push(`${dir}cpu-${ts}.cpuprofile`);
            }
            else {
                result.errors.push('CPU profile collection failed.');
            }
        }
        if (view !== heartbeatView) {
            result.status = 'cancelled';
            return;
        }
        if (collectHeapSnapshot) {
            // --- 堆快照会额外使用约两倍堆内存，不在剩余内存明显不足时尝试 ---
            const constrained = process.constrainedMemory();
            const available = constrained > 0
                ? Math.min(os.freemem(), Math.max(0, constrained - process.memoryUsage.rss()))
                : os.freemem();
            if (available < v8.getHeapStatistics().total_heap_size * 2) {
                result.errors.push('Heap snapshot skipped: insufficient available memory.');
            }
            else {
                try {
                    diagnosticOverhead = true;
                    if (view) {
                        Atomics.store(view, 3, 1n);
                    }
                    const heapFile = v8.writeHeapSnapshot(`${dir}heap-${ts}.heapsnapshot`);
                    if (view) {
                        Atomics.store(view, 0, BigInt(clockMs()));
                        Atomics.store(view, 3, 0n);
                    }
                    if (await lFs.chmod(heapFile, 0o600)) {
                        result.files.push(heapFile);
                    }
                    else {
                        result.errors.push('Failed to secure heap snapshot.');
                    }
                }
                catch (error: unknown) {
                    result.errors.push(`Heap snapshot: ${lText.stringifyError(error)}`);
                }
                finally {
                    if (view) {
                        Atomics.store(view, 0, BigInt(clockMs()));
                        Atomics.store(view, 3, 0n);
                    }
                }
            }
        }
        result.status = result.errors.length ? 'partial' : 'complete';
    }
    catch (error: unknown) {
        result.status = 'failed';
        result.errors.push(lText.stringifyError(error));
    }
}

/**
 * --- 由 Worker 定时采集主线程 Profile，主线程再次阻塞也能按时停止并落盘 ---
 * @param dir 诊断目录
 * @param ts 唯一采集时间标识
 * @param result 接收 Worker 的文件和失败原因
 * @returns 是否保存成功；无可用 Worker、超时或监控停止时返回 false
 */
function collectCpuProfile(
    dir: string, ts: string, result: { 'files': string[]; 'errors': string[]; },
): Promise<boolean> {
    if (profiling || !watchdog) {
        return Promise.resolve(false);
    }
    const worker = watchdog;
    profiling = true;
    const file = `cpu-${ts}.cpuprofile`;
    return new Promise<boolean>((resolve) => {
        let finished = false;
        const onMessage = (message: {
            'type': string; 'file': string; 'saved': boolean; 'recorded': boolean; 'errors': string[];
        }): void => {
            if (message.type === 'profile' && message.file === file) {
                result.errors.push(...message.errors);
                if (message.recorded) {
                    result.files.push(`${dir}profile-${ts}.json`);
                }
                finish(message.saved);
            }
        };
        const onExit = (): void => {
            result.errors.push('Profile aborted because the watchdog exited.');
            finish(false);
        };
        const timeout = setTimeout(() => {
            result.errors.push('Profile Worker response timed out.');
            finish(false);
        }, PROFILE_DURATION + 15_000);
        /**
         * --- 正常响应、退出和超时共享清理，旧 Worker 不会继续持有监听器 ---
         * @param saved 是否保存成功
         * @returns 无返回值
         */
        function finish(saved: boolean): void {
            if (finished) {
                return;
            }
            finished = true;
            clearTimeout(timeout);
            worker.off('message', onMessage);
            worker.off('exit', onExit);
            profiling = false;
            resolve(saved);
        }
        worker.on('message', onMessage);
        worker.once('exit', onExit);
        try {
            worker.postMessage({ 'type': 'profile', dir, ts });
        }
        catch (error: unknown) {
            lCore.display('[MONITOR] Failed to request CPU profile:', error);
            finish(false);
        }
    });
}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2026-02-07
 * Last: 2026-11-24
 * --- 性能监控库，持续监测 CPU/内存/事件循环延迟，保存现场快照和诊断文件 ---
 * --- 配套看门狗 Worker 线程，在主线程完全阻塞时独立采样并抓栈 ---
 */

// --- 系统 ---
import * as os from 'os';
import * as v8 from 'v8';
import * as inspector from 'inspector';
import * as perfHooks from 'perf_hooks';
import * as workerThreads from 'worker_threads';
// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';
import * as lFs from '#kebab/lib/fs.js';

// --- 固定参数与共享内存槽位 ---

/** --- 主线程采样间隔（ms） --- */
const INTERVAL = 1_000;

/** --- CPU Profile 采集时长（ms） --- */
const PROFILE_MS = 5_000;

/** --- 同一持续异常重复采集重型诊断的冷却时间（ms） --- */
const DIAG_COOLDOWN = 60_000;

/** --- 单次快照最多保留的活跃/近期请求条数 --- */
const MAX_REQS = 100;

/** --- 看门狗轮询间隔（ms） --- */
const WD_INTERVAL = 1_000;

/** --- 看门狗同一阻塞的重复告警冷却（秒） --- */
const WD_COOLDOWN = 30;

/** --- 看门狗异常退出后的重启延迟（ms） --- */
const WD_RETRY_MS = 5_000;

/** --- 共享内存槽位：0-心跳 ms, 1-调试标志, 2-Inspector 锁, 3-同步诊断中, 4-已保存阻塞现场的心跳 --- */
const SLOT_HB = 0;
const SLOT_DEBUG = 1;
const SLOT_LOCK = 2;
const SLOT_DIAG = 3;
const SLOT_SAVED = 4;

// --- 阈值配置 ---

/** --- CPU 使用率阈值，100 代表占满一个逻辑核心 --- */
let cpuLimit = 80;

/** --- 内存 RSS 阈值（MB），0 表示自动推算 --- */
let memLimit = 0;

/** --- 事件循环 P99 延迟阈值（ms） --- */
let eloopLimit = 500;

/** --- 同一指标持续超阈值的确认时长（ms） --- */
let spikeMs = 10_000;

/** --- 主线程心跳中断的阻塞确认时长（ms） --- */
let blockMs = 5_000;

/** --- 内存超阈值时是否自动采集堆快照 --- */
let heapSnap = false;

// --- 内部状态 ---

/** --- 周期检查定时器 --- */
let timer: NodeJS.Timeout | null = null;

/** --- 周期检查的 CPU 采样基准 --- */
let checkMark: ICpuMark | null = null;

/** --- 对外 getSnapshot 的 CPU 采样基准 --- */
let snapMark: ICpuMark | null = null;

/** --- 事件循环延迟直方图 --- */
let eloop: ReturnType<typeof perfHooks.monitorEventLoopDelay> | null = null;

/** --- 各指标首次超阈值的单调时钟时间（ms），不能跨指标累计 --- */
let spikeAt: { 'cpu': number | null; 'mem': number | null; 'eloop': number | null; } = {
    'cpu': null,
    'mem': null,
    'eloop': null,
};

/** --- 请求追踪自增序号 --- */
let reqSeq = 0;

/** --- 是否正在执行重型诊断采集 --- */
let diagBusy = false;

/** --- 是否正在通过看门狗采集 CPU Profile --- */
let profBusy = false;

/** --- 同步 Report/HeapSnapshot 产生的阻塞标记，下一采样周期据此跳过误判 --- */
let diagSkip = false;

/** --- 看门狗 Worker 实例 --- */
let wd: workerThreads.Worker | null = null;

/** --- 心跳共享内存 --- */
let shmBuf: SharedArrayBuffer | null = null;

/** --- 心跳共享内存视图 --- */
let shm: BigInt64Array | null = null;

/** --- 看门狗重启定时器 --- */
let wdRetryTimer: NodeJS.Timeout | null = null;

/** --- 活跃请求池 --- */
const reqs = new Map<string, IActiveRequest>();

/** --- 最近一分钟完成的请求（最多 MAX_REQS 条） --- */
const recent: ISnapshotRequest[] = [];

/** --- 最近 60 秒的资源采样历史 --- */
const history: IResourceSample[] = [];

/** --- 当前进行中的持续异常事件 --- */
let incident: IIncident | null = null;

/** --- 上次触发重型诊断的单调时钟（ms） --- */
let lastDiagMs = 0;

/** --- 上次落盘事件摘要的时间戳（ms） --- */
let lastSaveMs = 0;

/** --- 最近一次收到的看门狗诊断结果 --- */
let lastWdDiag: IWdDiag | null = null;

/** --- 等待看门狗回传结果的事件表，按心跳值索引 --- */
const wdPending = new Map<number, {
    'event': IIncident;
    'result': IIncident['diagnostics'][number];
}>();

/** --- 事件摘要串行写入链，避免并发落盘互相覆盖 --- */
let saveChain: Promise<void> = Promise.resolve();

// ================
// --- 公开 API ---
// ================

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

    // --- 校验配置参数 ---
    const cpu = opt?.cpu ?? 80;
    const mem = opt?.mem ?? 0;
    const lag = opt?.eloop ?? 500;
    const dur = opt?.duration ?? 10_000;
    const blk = opt?.blocked ?? 5_000;
    if (!Number.isFinite(cpu) || cpu <= 0) {
        return false;
    }
    if (!Number.isFinite(mem) || mem < 0) {
        return false;
    }
    if (!Number.isFinite(lag) || lag <= 0) {
        return false;
    }
    if (!Number.isFinite(dur) || dur < INTERVAL) {
        return false;
    }
    if (!Number.isFinite(blk) || blk < INTERVAL) {
        return false;
    }

    // --- 应用阈值，内存为 0 时按容器上限和 V8 堆上限推算默认值 ---
    cpuLimit = cpu;
    memLimit = mem;
    eloopLimit = lag;
    spikeMs = dur;
    blockMs = blk;
    heapSnap = opt?.heapSnapshot ?? false;
    if (memLimit === 0) {
        const cgroup = process.constrainedMemory();
        const sysMem = cgroup > 0 ? Math.min(cgroup, os.totalmem()) : os.totalmem();
        const heapMax = v8.getHeapStatistics().heap_size_limit;
        memLimit = Math.floor(Math.min(sysMem * 0.8, heapMax * 0.9) / 1024 / 1024);
    }

    // --- 重置采样基准与运行状态 ---
    const t = nowMs();
    const mark: ICpuMark = {
        'usage': process.cpuUsage(),
        'time': t,
        'cpus': os.cpus(),
    };
    checkMark = mark;
    snapMark = { ...mark };
    spikeAt = { 'cpu': null, 'mem': null, 'eloop': null };
    history.length = 0;
    recent.length = 0;
    incident = null;
    lastWdDiag = null;
    wdPending.clear();
    diagSkip = false;
    lastDiagMs = 0;

    // --- 初始化心跳共享内存、延迟直方图、定时器和看门狗 ---
    shmBuf = new SharedArrayBuffer(40);
    shm = new BigInt64Array(shmBuf);
    Atomics.store(shm, SLOT_HB, BigInt(t));
    Atomics.store(shm, SLOT_DEBUG, isDebug() ? 1n : 0n);

    eloop = perfHooks.monitorEventLoopDelay({ 'resolution': 20 });
    eloop.enable();
    timer = setInterval(check, INTERVAL);
    startWd();

    lCore.debug(`[MONITOR] [PARENT] [${process.pid}] Started, CPU Threshold: ${cpuLimit}%, MEM Threshold: ${memLimit}MB, ELOOP Threshold: ${eloopLimit}ms`);
    return true;
}

/**
 * --- 停止性能监控 ---
 */
export function stop(): void {
    wdPending.clear();
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
    if (eloop) {
        eloop.disable();
        eloop = null;
    }
    if (wd) {
        wd.terminate().catch(() => {});
        wd = null;
    }
    if (wdRetryTimer) {
        clearTimeout(wdRetryTimer);
        wdRetryTimer = null;
    }
    reqs.clear();
    recent.length = 0;
    history.length = 0;
    checkMark = null;
    snapMark = null;
    spikeAt = { 'cpu': null, 'mem': null, 'eloop': null };
    shmBuf = null;
    shm = null;
}

/**
 * --- 注册一个活跃请求，返回追踪 ID ---
 * @param url 请求 URL
 * @param method 请求方法
 * @returns 追踪 ID
 */
export function track(url: string, method: string): string {
    const now = Date.now();
    const id = `${++reqSeq}-${now}`;
    const qIdx = url.search(/[?#]/u);
    const item: IActiveRequest = {
        // --- 去掉查询参数，避免把凭据或隐私写入诊断文件 ---
        'url': qIdx === -1 ? url : url.slice(0, qIdx),
        'method': method,
        'start': now,
        'startCpu': process.cpuUsage(),
        'startMem': process.memoryUsage.rss(),
    };
    reqs.set(id, item);
    wd?.postMessage({
        'type': 'request',
        'id': id,
        'request': item,
    });
    return id;
}

/**
 * --- 移除已完成的请求追踪 ---
 * @param id 追踪 ID
 */
export function untrack(id: string): void {
    const req = reqs.get(id);
    if (req) {
        const now = Date.now();
        const done = snapReq(req, now, process.cpuUsage(), process.memoryUsage.rss());
        done.completedAt = now;
        recent.push(done);
        trimRecent(now);
        wd?.postMessage({
            'type': 'complete',
            'id': id,
            'request': done,
        });
    }
    reqs.delete(id);
}

/**
 * --- 获取当前资源快照 ---
 * @returns 资源与请求快照
 */
export function getSnapshot(): ISnapshot {
    const usage = process.cpuUsage();
    const t = nowMs();
    const cpus = os.cpus();
    let cpuProc = 0;
    if (snapMark && t > snapMark.time) {
        const dtUs = (t - snapMark.time) * 1_000;
        const diff = (usage.user - snapMark.usage.user) + (usage.system - snapMark.usage.system);
        cpuProc = (diff / dtUs) * 100;
    }
    const cpuOs = calcOsCpu(snapMark?.cpus ?? null, cpus);
    snapMark = { 'usage': usage, 'time': t, 'cpus': cpus };
    return buildSnap(Math.round(cpuProc * 100) / 100, cpuOs);
}

// ==========================
// --- 周期检查与异常记录 ---
// ==========================

/**
 * --- 每秒周期检查：采样资源、更新心跳、判定持续异常与恢复 ---
 */
function check(): void {
    // --- 计算本周期 CPU 占比并刷新共享心跳 ---
    const usage = process.cpuUsage();
    const now = Date.now();
    const t = nowMs();
    const prevT = checkMark?.time ?? 0;
    const dt = t - prevT;
    let cpuPct = 0;
    if (checkMark && dt > 0) {
        const diff = (usage.user - checkMark.usage.user) + (usage.system - checkMark.usage.system);
        cpuPct = (diff / (dt * 1_000)) * 100;
    }
    const cpus = os.cpus();
    const cpuOs = calcOsCpu(checkMark?.cpus ?? null, cpus);
    checkMark = { 'usage': usage, 'time': t, 'cpus': cpus };
    if (shm) {
        Atomics.store(shm, SLOT_HB, BigInt(t));
        Atomics.store(shm, SLOT_DEBUG, isDebug() ? 1n : 0n);
    }

    // --- 生成快照并同步给看门狗 ---
    const snap = buildSnap(Math.round(cpuPct * 100) / 100, cpuOs);
    wd?.postMessage({
        'type': 'snapshot',
        'snapshot': snap,
        'logFormat': lCore.globalConfig.logFormat ?? 'jsonl',
    });
    eloop?.reset();

    // --- 调试或同步诊断窗口跳过告警判定 ---
    if (isDebug()) {
        spikeAt = { 'cpu': null, 'mem': null, 'eloop': null };
        return;
    }
    if (diagSkip) {
        diagSkip = false;
        if (!incident?.reasons.includes('PROC_CPU')) {
            spikeAt.cpu = null;
        }
        if (!incident?.reasons.includes('MEM')) {
            spikeAt.mem = null;
        }
        if (!incident?.reasons.includes('ELOOP_LAG')) {
            spikeAt.eloop = null;
        }
        return;
    }

    // --- 记录最近 60 秒采样历史 ---
    const sample: IResourceSample = {
        'time': now,
        'elapsed': dt,
        'cpu': snap.cpuProcess,
        'cpuOs': cpuOs,
        'rss': snap.mem.rss,
        'heapUsed': snap.mem.heapUsed,
        'external': snap.mem.external,
        'arrayBuffers': snap.mem.arrayBuffers,
        'eloop': snap.eloopLag,
        'eloopMax': snap.eloopMax,
    };
    history.push(sample);
    while (history.length > 60) {
        history.shift();
    }

    // --- 判定阻塞及各项资源是否持续超阈值 ---
    const blocked = dt - INTERVAL >= blockMs;
    const alerts = detectAlerts(snap, blocked, prevT, t);
    if (!alerts.length) {
        if (incident) {
            incident.endedAt = now;
            incident.endReason = 'recovered';
            incident.activeReasons = [];
            incident.recoveredSnapshot = snap;
            saveIncident(incident);
            lCore.log({}, `RECOVERED PID:${process.pid} EVENT:${incident.dir}`, '-monitor');
            incident = null;
        }
        return;
    }
    recordIncident(alerts, snap, sample, blocked, prevT);
}

/**
 * --- 根据当前快照和持续时长判定触发的告警项 ---
 * @param snap 当前快照
 * @param blocked 本周期是否发生事件循环阻塞
 * @param prevT 本周期起点单调时钟（ms）
 * @param t 当前单调时钟（ms）
 * @returns 已确认的告警项列表
 */
function detectAlerts(snap: ISnapshot, blocked: boolean, prevT: number, t: number): string[] {
    if (blocked) {
        // --- 阻塞窗口只能确认阻塞本身，不能顺带证明其他资源持续超标 ---
        spikeAt = { 'cpu': null, 'mem': null, 'eloop': null };
        return ['ELOOP_BLOCKED'];
    }
    const alerts: string[] = [];
    if (snap.cpuProcess >= cpuLimit) {
        spikeAt.cpu ??= prevT;
        if (t - spikeAt.cpu >= spikeMs) {
            alerts.push('PROC_CPU');
        }
    }
    else {
        spikeAt.cpu = null;
    }
    if (snap.mem.rss / 1024 / 1024 >= memLimit) {
        // --- 内存是时点值，不把超阈值前的一个周期算入持续时间 ---
        spikeAt.mem ??= t;
        if (t - spikeAt.mem >= spikeMs) {
            alerts.push('MEM');
        }
    }
    else {
        spikeAt.mem = null;
    }
    if (snap.eloopLag >= eloopLimit) {
        spikeAt.eloop ??= prevT;
        if (t - spikeAt.eloop >= spikeMs) {
            alerts.push('ELOOP_LAG');
        }
    }
    else {
        spikeAt.eloop = null;
    }
    return alerts;
}

/**
 * --- 记录或更新持续异常事件，并按冷却条件触发重型诊断 ---
 * @param alerts 已确认的告警项
 * @param snap 当前快照
 * @param sample 当前采样
 * @param blocked 是否刚从阻塞恢复
 * @param prevT 本周期起点单调时钟（ms）
 */
function recordIncident(
    alerts: string[], snap: ISnapshot, sample: IResourceSample, blocked: boolean, prevT: number
): void {
    const now = snap.time;
    const isNew = incident === null;

    // --- 首次触发时创建异常事件对象 ---
    if (!incident) {
        const dir = `${kebab.LOG_CWD}monitor/${lTime.format(null, 'Y/m/d/His', new Date(now))}-pid-${process.pid}-${now}/`;
        const earliest = Math.min(
            spikeAt.cpu ?? Infinity,
            spikeAt.mem ?? Infinity,
            spikeAt.eloop ?? Infinity,
            blocked ? prevT : Infinity
        );
        incident = {
            'dir': dir,
            'startedAt': now - Math.max(0, nowMs() - earliest),
            'confirmedAt': now,
            'endedAt': null,
            'endReason': null,
            'reasons': [],
            'activeReasons': [],
            'impact': 'resource-high',
            'thresholds': {
                'cpu': cpuLimit,
                'mem': memLimit,
                'eloop': eloopLimit,
                'duration': spikeMs,
                'blocked': blockMs,
            },
            'before': [...history],
            'samples': [],
            'peaks': { 'cpu': 0, 'rss': 0, 'heapUsed': 0, 'eloop': 0 },
            'snapshot': snap,
            'diagnostics': [],
        };
        lastDiagMs = 0;
        lastSaveMs = 0;
    }

    // --- 更新告警原因、采样序列与峰值 ---
    const ev = incident;
    const hasNewReason = alerts.some(a => !ev.activeReasons.includes(a));
    ev.activeReasons = [...alerts];
    for (const a of alerts) {
        if (!ev.reasons.includes(a)) {
            ev.reasons.push(a);
        }
    }
    if (alerts.includes('ELOOP_BLOCKED') || alerts.includes('ELOOP_LAG')) {
        ev.impact = 'event-loop-delayed';
    }
    ev.samples.push(sample);
    if (ev.samples.length > 300) {
        ev.samples.shift();
    }
    ev.peaks.cpu = Math.max(ev.peaks.cpu, sample.cpu);
    ev.peaks.rss = Math.max(ev.peaks.rss, sample.rss);
    ev.peaks.heapUsed = Math.max(ev.peaks.heapUsed, sample.heapUsed);
    ev.peaks.eloop = Math.max(ev.peaks.eloop, sample.eloopMax, sample.elapsed - INTERVAL);
    if (isNew || hasNewReason) {
        const msg = `RESOURCE_HIGH [${alerts.join(', ')}] PID:${process.pid} ` +
            `PROC_CPU:${snap.cpuProcess}% RSS:${lText.sizeFormat(snap.mem.rss, '')} ` +
            `ELOOP_LAG:${snap.eloopLag}ms ACTIVE_REQ:${snap.activeCount} EVENT:${ev.dir}`;
        lCore.log({}, msg, '-monitor');
        lCore.display('[MONITOR]', msg);
    }

    // --- 按冷却周期触发重型诊断，或复用看门狗已采集的阻塞现场 ---
    if (isNew || hasNewReason || nowMs() - lastDiagMs >= DIAG_COOLDOWN) {
        triggerDiag(ev, alerts, snap, blocked, prevT);
    }

    // --- 定期将事件摘要落盘 ---
    if (isNew || hasNewReason || now - lastSaveMs >= 5_000) {
        lastSaveMs = now;
        saveIncident(ev);
    }
}

/**
 * --- 触发一次重型诊断，或在看门狗已保存阻塞现场时直接关联 ---
 * @param ev 当前事件
 * @param alerts 告警项
 * @param snap 当前快照
 * @param blocked 是否阻塞恢复
 * @param prevT 本周期起点单调时钟（ms）
 */
function triggerDiag(
    ev: IIncident, alerts: string[], snap: ISnapshot, blocked: boolean, prevT: number
): void {
    const now = snap.time;
    lastDiagMs = nowMs();
    const res = {
        'time': now,
        'status': 'pending',
        'files': [] as string[],
        'errors': [] as string[],
        'snapshot': snap,
    };
    ev.diagnostics.push(res);
    if (ev.diagnostics.length > 60) {
        ev.diagnostics.shift();
    }

    const view = shm;
    const wdSaved = blocked && view !== null && Atomics.load(view, SLOT_SAVED) >= BigInt(prevT);
    if (wdSaved) {
        // --- 看门狗已经保存了本次阻塞现场，直接关联而不再重复采 Profile ---
        const hb = Number(Atomics.load(view, SLOT_SAVED));
        if (lastWdDiag?.heartbeat === hb) {
            res.status = `watchdog-${lastWdDiag.status}`;
            res.files = [`${lastWdDiag.dir}/blocked-event.json`, ...lastWdDiag.files];
            res.errors.push(...lastWdDiag.errors);
        }
        else {
            res.status = 'watchdog-captured';
            wdPending.set(hb, { 'event': ev, 'result': res });
        }
        return;
    }

    if (diagBusy || (view && Atomics.load(view, SLOT_LOCK) !== 0n)) {
        res.status = 'skipped-busy';
        lastDiagMs = nowMs() - DIAG_COOLDOWN + 5_000;
        return;
    }

    diagBusy = true;
    const ts = `${lTime.format(null, 'YmdHis', new Date(now))}-${now}`;
    if (blocked) {
        res.errors.push('The blocking stack was not captured; this profile starts after recovery.');
    }
    void runDiag(
        ev.dir, ts, alerts.includes('PROC_CPU') || blocked,
        alerts.includes('MEM') && heapSnap, res, view
    ).catch((err: unknown) => {
        res.status = 'failed';
        res.errors.push(lText.stringifyError(err));
    }).finally(() => {
        diagBusy = false;
        saveIncident(ev);
    });
}

/**
 * --- 串行落盘事件摘要，避免多次保存互相覆盖 ---
 * @param ev 事件对象
 */
function saveIncident(ev: IIncident): void {
    const text = lText.stringifyJson(ev, 2);
    saveChain = saveChain.then(async () => {
        if (
            !await lFs.mkdir(ev.dir, 0o700) ||
            !await lFs.chmod(ev.dir, 0o700) ||
            !await lFs.putContent(`${ev.dir}event.json`, text, { 'mode': 0o600 }) ||
            !await lFs.chmod(`${ev.dir}event.json`, 0o600)
        ) {
            lCore.display('[MONITOR] Failed to save event:', ev.dir);
        }
    }).catch((err: unknown) => {
        lCore.display('[MONITOR] Failed to save event:', err);
    });
}

// ============================
// --- 诊断采集与看门狗线程 ---
// ============================

/**
 * --- 启动看门狗 Worker 线程 ---
 */
function startWd(): void {
    if (!shmBuf) {
        return;
    }
    const workerUrl = new URL('./monitor/watchdog.js', import.meta.url);
    try {
        const worker = new workerThreads.Worker(workerUrl, {
            'workerData': {
                'buffer': shmBuf,
                'logDir': kebab.LOG_CWD,
                'logFormat': lCore.globalConfig.logFormat ?? 'jsonl',
                'pid': process.pid,
                'threshold': blockMs,
                'cooldown': WD_COOLDOWN,
                'interval': WD_INTERVAL,
                'profileDuration': PROFILE_MS,
                'requests': Array.from(reqs.entries()),
            },
        });
        wd = worker;
        worker.unref();
        worker.on('message', (msg: IWdDiag) => {
            if (wd !== worker || msg.type !== 'diagnostic') {
                return;
            }
            lastWdDiag = msg;
            const item = wdPending.get(msg.heartbeat);
            if (item) {
                item.result.status = `watchdog-${msg.status}`;
                item.result.files = [`${msg.dir}/blocked-event.json`, ...msg.files];
                item.result.errors.push(...msg.errors);
                wdPending.delete(msg.heartbeat);
                saveIncident(item.event);
            }
        });
        worker.on('error', (err) => {
            lCore.log({}, `WATCHDOG_ERROR ${lText.stringifyError(err)}`, '-monitor');
            lCore.display('[MONITOR] Watchdog error', err);
        });
        worker.on('exit', (code) => {
            if (code !== 0 && timer) {
                lCore.debug(`[MONITOR] Watchdog exited: ${code}`);
            }
            if (wd === worker) {
                wd = null;
            }
            retryWd();
        });
        lCore.debug(`[MONITOR] [THREAD] [${process.pid}] Watchdog started`);
    }
    catch (err) {
        lCore.log({}, `WATCHDOG_START_FAILED ${lText.stringifyError(err)}`, '-monitor');
        lCore.display('[MONITOR] Failed to start watchdog', err);
        retryWd();
    }
}

/**
 * --- 看门狗异常退出后延迟重启 ---
 */
function retryWd(): void {
    if (!timer || wd || wdRetryTimer) {
        return;
    }
    wdRetryTimer = setTimeout(() => {
        wdRetryTimer = null;
        startWd();
    }, WD_RETRY_MS);
    wdRetryTimer.unref();
}

/**
 * --- 依次执行 Report、CPU Profile 与堆快照采集，单项失败不阻塞后续项 ---
 * @param dir 诊断目录
 * @param ts 唯一时间标识
 * @param needCpu 是否采集 CPU Profile
 * @param needHeap 是否采集堆快照
 * @param res 采集结果对象
 * @param view 本次监控实例的共享内存
 */
async function runDiag(
    dir: string, ts: string, needCpu: boolean, needHeap: boolean,
    res: { 'status': string; 'files': string[]; 'errors': string[]; }, view: BigInt64Array | null
): Promise<void> {
    try {
        if (!await lFs.mkdir(dir, 0o700) || !await lFs.chmod(dir, 0o700)) {
            res.status = 'failed';
            res.errors.push('Failed to create or secure diagnostic directory.');
            return;
        }
        if (view !== shm) {
            res.status = 'cancelled';
            return;
        }

        // --- 1. 采集脱敏后的诊断报告 ---
        await writeReport(dir, ts, res, view);

        // --- 2. 采集 CPU Profile ---
        if (needCpu) {
            if (await runProfile(dir, ts, res)) {
                res.files.push(`${dir}cpu-${ts}.cpuprofile`);
            }
            else {
                res.errors.push('CPU profile collection failed.');
            }
        }
        if (view !== shm) {
            res.status = 'cancelled';
            return;
        }

        // --- 3. 按可用内存条件采集堆快照 ---
        if (needHeap) {
            await writeHeap(dir, ts, res, view);
        }
        res.status = res.errors.length ? 'partial' : 'complete';
    }
    catch (err: unknown) {
        res.status = 'failed';
        res.errors.push(lText.stringifyError(err));
    }
}

/**
 * --- 采集脱敏后的 Node.js 诊断报告 ---
 * @param dir 诊断目录
 * @param ts 时间标识
 * @param res 采集结果
 * @param view 共享内存视图
 */
async function writeReport(
    dir: string, ts: string, res: { 'files': string[]; 'errors': string[]; }, view: BigInt64Array | null
): Promise<void> {
    const file = `${dir}report-${ts}.json`;
    try {
        diagSkip = true;
        if (view) {
            Atomics.store(view, SLOT_DIAG, 1n);
        }
        const report = process.report.getReport() as IDiagReport;
        if (report.header) {
            report.header.commandLine = [];
            delete report.header.networkInterfaces;
        }
        delete report.environmentVariables;
        for (const h of report.libuv ?? []) {
            delete h.localEndpoint;
            delete h.remoteEndpoint;
        }
        if (view) {
            Atomics.store(view, SLOT_HB, BigInt(nowMs()));
            Atomics.store(view, SLOT_DIAG, 0n);
        }
        if (await lFs.putContent(file, lText.stringifyJson(report, 2), { 'mode': 0o600 }) &&
            await lFs.chmod(file, 0o600)) {
            res.files.push(file);
        }
        else {
            res.errors.push('Failed to write or secure diagnostic report.');
        }
    }
    catch (err: unknown) {
        res.errors.push(`Report: ${lText.stringifyError(err)}`);
    }
    finally {
        if (view) {
            Atomics.store(view, SLOT_HB, BigInt(nowMs()));
            Atomics.store(view, SLOT_DIAG, 0n);
        }
    }
}

/**
 * --- 剩余内存充足时采集 V8 堆快照 ---
 * @param dir 诊断目录
 * @param ts 时间标识
 * @param res 采集结果
 * @param view 共享内存视图
 */
async function writeHeap(
    dir: string, ts: string, res: { 'files': string[]; 'errors': string[]; }, view: BigInt64Array | null
): Promise<void> {
    // --- 堆快照约需额外两倍堆内存，剩余内存不足时跳过 ---
    const cgroup = process.constrainedMemory();
    const free = cgroup > 0
        ? Math.min(os.freemem(), Math.max(0, cgroup - process.memoryUsage.rss()))
        : os.freemem();
    if (free < v8.getHeapStatistics().total_heap_size * 2) {
        res.errors.push('Heap snapshot skipped: insufficient available memory.');
        return;
    }
    try {
        diagSkip = true;
        if (view) {
            Atomics.store(view, SLOT_DIAG, 1n);
        }
        const file = v8.writeHeapSnapshot(`${dir}heap-${ts}.heapsnapshot`);
        if (view) {
            Atomics.store(view, SLOT_HB, BigInt(nowMs()));
            Atomics.store(view, SLOT_DIAG, 0n);
        }
        if (await lFs.chmod(file, 0o600)) {
            res.files.push(file);
        }
        else {
            res.errors.push('Failed to secure heap snapshot.');
        }
    }
    catch (err: unknown) {
        res.errors.push(`Heap snapshot: ${lText.stringifyError(err)}`);
    }
    finally {
        if (view) {
            Atomics.store(view, SLOT_HB, BigInt(nowMs()));
            Atomics.store(view, SLOT_DIAG, 0n);
        }
    }
}

/**
 * --- 通知看门狗采集主线程 CPU Profile 并等待完成 ---
 * @param dir 诊断目录
 * @param ts 时间标识
 * @param res 采集结果
 * @returns 是否保存成功
 */
function runProfile(
    dir: string, ts: string, res: { 'files': string[]; 'errors': string[]; }
): Promise<boolean> {
    if (profBusy || !wd) {
        return Promise.resolve(false);
    }
    const worker = wd;
    profBusy = true;
    const file = `cpu-${ts}.cpuprofile`;
    return new Promise<boolean>((resolve) => {
        let done = false;
        const onMsg = (msg: {
            'type': string; 'file': string; 'saved': boolean; 'recorded': boolean; 'errors': string[];
        }): void => {
            if (msg.type === 'profile' && msg.file === file) {
                res.errors.push(...msg.errors);
                if (msg.recorded) {
                    res.files.push(`${dir}profile-${ts}.json`);
                }
                finish(msg.saved);
            }
        };
        const onExit = (): void => {
            res.errors.push('Profile aborted because the watchdog exited.');
            finish(false);
        };
        const t = setTimeout(() => {
            res.errors.push('Profile Worker response timed out.');
            finish(false);
        }, PROFILE_MS + 15_000);
        /** --- 正常响应、退出与超时共用清理入口 --- */
        function finish(saved: boolean): void {
            if (done) {
                return;
            }
            done = true;
            clearTimeout(t);
            worker.off('message', onMsg);
            worker.off('exit', onExit);
            profBusy = false;
            resolve(saved);
        }

        worker.on('message', onMsg);
        worker.once('exit', onExit);
        try {
            worker.postMessage({
                'type': 'profile',
                'dir': dir,
                'ts': ts,
            });
        }
        catch (err: unknown) {
            lCore.display('[MONITOR] Failed to request CPU profile:', err);
            finish(false);
        }
    });
}

// ====================
// --- 内部工具函数 ---
// ====================

/**
 * --- 检测当前是否处于调试模式 ---
 */
function isDebug(): boolean {
    return !!inspector.url();
}

/**
 * --- 获取单调时钟毫秒数 ---
 */
function nowMs(): number {
    return Number(process.hrtime.bigint() / 1_000_000n);
}

/**
 * --- 计算单个请求存续期间的进程资源增量 ---
 * @param req 活跃请求
 * @param now 当前时间戳（ms）
 * @param cpu 当前进程 CPU 累计用量
 * @param rss 当前进程 RSS
 */
function snapReq(req: IActiveRequest, now: number, cpu: NodeJS.CpuUsage, rss: number): ISnapshotRequest {
    return {
        'url': req.url,
        'method': req.method,
        'duration': now - req.start,
        'cpuUser': cpu.user - req.startCpu.user,
        'cpuSystem': cpu.system - req.startCpu.system,
        'memDelta': rss - req.startMem,
    };
}

/**
 * --- 裁剪最近完成请求列表（最多保留 60 秒且不超过 MAX_REQS 条） ---
 * @param now 当前时间戳（ms）
 */
function trimRecent(now: number): void {
    while (recent.length > MAX_REQS || (recent.length && now - (recent[0].completedAt ?? 0) > 60_000)) {
        recent.shift();
    }
}

/**
 * --- 组装当前完整资源快照 ---
 * @param cpuProc 本周期进程 CPU 占比
 * @param cpuOs 本周期系统 CPU 占比
 */
function buildSnap(cpuProc: number, cpuOs: number): ISnapshot {
    const mem = process.memoryUsage();
    const heap = v8.getHeapStatistics();
    const cpu = process.cpuUsage();
    const now = Date.now();

    let eloopLag = 0;
    let eloopMax = 0;
    if (eloop) {
        eloopLag = Math.round(eloop.percentile(99) / 1_000_000);
        eloopMax = Math.round(eloop.max / 1_000_000);
    }

    const active: ISnapshotRequest[] = [];
    for (const req of reqs.values()) {
        if (active.length >= MAX_REQS) {
            break;
        }
        active.push(snapReq(req, now, cpu, mem.rss));
    }
    trimRecent(now);

    return {
        'pid': process.pid,
        'time': now,
        'cpuProcess': Math.round(cpuProc * 100) / 100,
        'cpuOs': cpuOs,
        'mem': {
            'rss': mem.rss,
            'heapTotal': mem.heapTotal,
            'heapUsed': mem.heapUsed,
            'external': mem.external,
            'arrayBuffers': mem.arrayBuffers,
        },
        'heap': {
            'totalSize': heap.total_heap_size,
            'usedSize': heap.used_heap_size,
            'sizeLimit': heap.heap_size_limit,
        },
        'osMem': {
            'total': os.totalmem(),
            'free': os.freemem(),
        },
        'eloopLag': eloopLag,
        'eloopMax': eloopMax,
        'activeRequests': active,
        'activeCount': reqs.size,
        'recentRequests': [...recent],
    };
}

/**
 * --- 通过两次 os.cpus() 采样差值计算系统总 CPU 使用率（0-100） ---
 * @param prev 上次采样
 * @param cur 本次采样
 */
function calcOsCpu(prev: os.CpuInfo[] | null, cur: os.CpuInfo[]): number {
    if (prev?.length !== cur.length) {
        return 0;
    }
    let idle = 0;
    let total = 0;
    for (let i = 0; i < cur.length; ++i) {
        const c = cur[i].times;
        const p = prev[i].times;
        const dIdle = c.idle - p.idle;
        idle += dIdle;
        total += (c.user - p.user) + (c.nice - p.nice) + (c.sys - p.sys) + (c.irq - p.irq) + dIdle;
    }
    if (total <= 0) {
        return 0;
    }
    const pct = (1 - idle / total) * 100;
    return Math.round(Math.max(0, Math.min(100, pct)) * 100) / 100;
}

// ================
// --- 类型声明 ---
// ================

/** --- 活跃请求的描述 --- */
export interface IActiveRequest {
    'url': string;
    'method': string;
    /** --- 请求开始时间戳（ms） --- */
    'start': number;
    /** --- 请求开始时的进程 CPU 累计用量基准 --- */
    'startCpu': NodeJS.CpuUsage;
    /** --- 请求开始时的进程 RSS 基准（bytes） --- */
    'startMem': number;
}

/** --- 单个请求快照 --- */
export interface ISnapshotRequest {
    'url': string;
    'method': string;
    'duration': number;
    /** --- 请求存续期间进程用户态 CPU 增量（微秒） --- */
    'cpuUser': number;
    /** --- 请求存续期间进程系统态 CPU 增量（微秒） --- */
    'cpuSystem': number;
    /** --- 请求存续期间进程 RSS 增量（bytes） --- */
    'memDelta': number;
    /** --- 已完成请求的结束时间戳（ms），活跃请求不含此字段 --- */
    'completedAt'?: number;
}

/** --- 整体资源快照 --- */
export interface ISnapshot {
    'pid': number;
    'time': number;
    /** --- 本进程 CPU 占用，100 代表占满一个逻辑核心 --- */
    'cpuProcess': number;
    /** --- 系统总 CPU 占用（0-100） --- */
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
    /** --- 本采样窗口最大事件循环延迟（ms） --- */
    'eloopMax': number;
    /** --- 最早开始的活跃请求，最多 100 条 --- */
    'activeRequests': ISnapshotRequest[];
    /** --- 全部活跃请求总数 --- */
    'activeCount': number;
    /** --- 最近一分钟完成的请求，最多 100 条 --- */
    'recentRequests': ISnapshotRequest[];
}

/** --- CPU 采样基准 --- */
interface ICpuMark {
    'usage': NodeJS.CpuUsage;
    'time': number;
    'cpus': os.CpuInfo[];
}

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

/** --- 一次持续异常事件 --- */
interface IIncident {
    'dir': string;
    'startedAt': number;
    'confirmedAt': number;
    'endedAt': number | null;
    'endReason': 'recovered' | 'stopped' | null;
    'reasons': string[];
    'activeReasons': string[];
    'impact': 'resource-high' | 'event-loop-delayed';
    'thresholds': {
        'cpu': number;
        'mem': number;
        'eloop': number;
        'duration': number;
        'blocked': number;
    };
    'before': IResourceSample[];
    'samples': IResourceSample[];
    'peaks': { 'cpu': number; 'rss': number; 'heapUsed': number; 'eloop': number; };
    'snapshot': ISnapshot;
    'recoveredSnapshot'?: ISnapshot;
    'diagnostics': Array<{
        'time': number;
        'status': string;
        'files': string[];
        'errors': string[];
        'snapshot': ISnapshot;
    }>;
}

/** --- 看门狗回传的阻塞诊断结果 --- */
interface IWdDiag {
    'type': 'diagnostic';
    'heartbeat': number;
    'dir': string;
    'status': string;
    'files': string[];
    'errors': string[];
}

/** --- 脱敏前后的 Node.js 诊断报告结构 --- */
interface IDiagReport {
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

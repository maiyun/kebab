/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2026-02-08
 * Last: 2026-11-24
 * --- 独立线程监测主线程心跳，阻塞期间保存资源采样、请求、调用栈和 CPU Profile ---
 * --- 只依赖 Node.js；主线程无法运行时，日志与 Inspector 超时仍可独立处理 ---
 */

// --- 系统 ---
import * as workerThreads from 'worker_threads';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as inspector from 'inspector/promises';
// --- 库和定义 ---
import type { IActiveRequest, ISnapshot, ISnapshotRequest } from '#kebab/sys/monitor.js';

// --- 共享内存槽位定义（与 sys/monitor.ts 保持一致） ---

/** --- 槽位 0：主线程单调时钟心跳（ms） --- */
const SLOT_HB = 0;

/** --- 槽位 1：调试标志（1 表示调试中） --- */
const SLOT_DEBUG = 1;

/** --- 槽位 2：Inspector 锁（0-空闲, 1-常规 Profile, 2-阻塞采集） --- */
const SLOT_LOCK = 2;

/** --- 槽位 3：主线程同步诊断标志（1 表示正在同步采集，不判定为阻塞） --- */
const SLOT_DIAG = 3;

/** --- 槽位 4：已保存阻塞现场的心跳值 --- */
const SLOT_SAVED = 4;

// --- 内部状态 ---

/** --- 启动时传入的 Worker 配置 --- */
const cfg = workerThreads.workerData as IWatchdogData;

/** --- 共享心跳内存视图 --- */
const shm = new BigInt64Array(cfg.buffer);

/** --- 主线程同步过来的活跃请求池 --- */
const reqs = new Map(cfg.requests);

/** --- 主线程同步过来的最近完成请求，最多保留 100 条 --- */
const recent: ISnapshotRequest[] = [];

/** --- 最近 60 秒的独立资源采样 --- */
const samples: Array<{
    'time': number;
    'elapsed': number;
    'cpu': number;
    'rss': number;
    'heartbeatLag': number;
}> = [];

/** --- 主线程最近一次推送的完整快照 --- */
let lastSnap: ISnapshot | null = null;

/** --- 上次告警对应的心跳值 --- */
let lastAlertHb = 0n;

/** --- 上次告警的单调时钟（ms） --- */
let lastAlertMs = 0;

/** --- 是否正在采集阻塞现场 --- */
let busy = false;

/** --- 上次采样的进程 CPU 累计用量 --- */
let lastCpu = process.cpuUsage();

/** --- 上次采样的单调时钟（ms） --- */
let lastMs = nowMs();

// --- 接收主线程消息 ---
workerThreads.parentPort?.on('message', (msg: TWatchdogMsg) => {
    if (msg.type === 'snapshot') {
        lastSnap = msg.snapshot;
        cfg.logFormat = msg.logFormat;
    }
    else if (msg.type === 'request') {
        reqs.set(msg.id, msg.request);
    }
    else if (msg.type === 'complete') {
        reqs.delete(msg.id);
        recent.push(msg.request);
        if (recent.length > 100) {
            recent.shift();
        }
    }
    else {
        runProfile(msg.dir, msg.ts).catch((err: unknown) => {
            writeLog(`WATCHDOG: Unexpected profile failure: ${String(err)}`);
        });
    }
});

// --- 启动定时采样与阻塞检测 ---
setInterval(tick, cfg.interval);

/**
 * --- 获取单调时钟毫秒数 ---
 */
function nowMs(): number {
    return Number(process.hrtime.bigint() / 1_000_000n);
}

/**
 * --- 格式化本地时间为 YmdHis，用于目录和文件名 ---
 * @param d 日期对象
 */
function fmtTs(d: Date): string {
    return String(d.getFullYear()) +
        String(d.getMonth() + 1).padStart(2, '0') +
        String(d.getDate()).padStart(2, '0') +
        String(d.getHours()).padStart(2, '0') +
        String(d.getMinutes()).padStart(2, '0') +
        String(d.getSeconds()).padStart(2, '0');
}

/**
 * --- 独立写入看门狗日志，格式与 Core.log 一致 ---
 * @param msg 日志内容
 */
function writeLog(msg: string): void {
    const now = new Date();
    const ts = fmtTs(now);
    const dir = path.join(cfg.logDir, 'system-monitor', ts.slice(0, 4), ts.slice(4, 6), ts.slice(6, 8));
    try {
        fs.mkdirSync(dir, { 'recursive': true, 'mode': 0o700 });
        const fmt = cfg.logFormat ?? 'jsonl';
        const file = path.join(dir, `${ts.slice(8, 10)}.${fmt}`);

        // --- 组装日志条目（内存用 MB 方便直接阅读） ---
        const entry = {
            'time': `${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12, 14)}`,
            'unix': Math.floor(now.getTime() / 1000),
            'url': '',
            'userAgent': '',
            'realIp': '',
            'cfIp': '',
            'xIp': '',
            'osMem': `${Math.round((os.totalmem() - os.freemem()) / 1024 / 1024 * 100) / 100}MB`,
            'procMem': `${Math.round(process.memoryUsage.rss() / 1024 / 1024 * 100) / 100}MB`,
            'message': msg,
        };

        // --- 按格式写入日志文件 ---
        let line: string;
        if (fmt === 'jsonl') {
            line = JSON.stringify(entry) + '\n';
        }
        else {
            if (!fs.existsSync(file)) {
                fs.writeFileSync(
                    file,
                    'TIME,UNIX,URL,USER_AGENT,REALIP,CFIP,XIP,OS,PROCESS,MESSAGE\n',
                    { 'mode': 0o600 }
                );
            }
            const cols = [
                entry.time, String(entry.unix), entry.url, 'No HTTP_USER_AGENT',
                entry.realIp, entry.cfIp, entry.xIp, entry.osMem, entry.procMem, entry.message,
            ];
            line = cols.map(v => `"${v.replace(/"/g, '""')}"`).join(',') + '\n';
        }
        fs.appendFileSync(file, line, { 'mode': 0o600 });
    }
    catch (err: unknown) {
        process.stderr.write(`[MONITOR] Watchdog log failed: ${String(err)}\n`);
    }
}

/**
 * --- 写入 0600 权限的诊断文件 ---
 * @param dir 诊断目录
 * @param name 文件名
 * @param text 文件内容
 * @returns 是否保存成功
 */
function saveFile(dir: string, name: string, text: string): boolean {
    const file = path.join(dir, name);
    try {
        fs.writeFileSync(file, text, { 'mode': 0o600 });
        fs.chmodSync(file, 0o600);
        return true;
    }
    catch (err: unknown) {
        process.stderr.write(`[MONITOR] Watchdog diagnostic write failed: ${String(err)}\n`);
        return false;
    }
}

/**
 * --- 每秒采样资源并检测主线程心跳是否阻塞 ---
 */
function tick(): void {
    // --- 记录本周期资源占用和心跳延迟 ---
    const t = nowMs();
    const cpu = process.cpuUsage();
    const dt = t - lastMs;
    const hb = Atomics.load(shm, SLOT_HB);
    const lag = t - Number(hb);
    const cpuPct = dt > 0
        ? (cpu.user - lastCpu.user + cpu.system - lastCpu.system) / (dt * 1_000) * 100
        : 0;
    lastCpu = cpu;
    lastMs = t;
    samples.push({
        'time': Date.now(),
        'elapsed': dt,
        'cpu': Math.round(cpuPct * 100) / 100,
        'rss': process.memoryUsage.rss(),
        'heartbeatLag': lag,
    });
    if (samples.length > 60) {
        samples.shift();
    }

    // --- 调试、同步诊断中、未超阈值或处于同一心跳冷却期时跳过 ---
    if (
        hb <= 0n ||
        lag < cfg.threshold ||
        Atomics.load(shm, SLOT_DEBUG) === 1n ||
        Atomics.load(shm, SLOT_DIAG) === 1n
    ) {
        return;
    }
    if (busy || (hb === lastAlertHb && t - lastAlertMs < cfg.cooldown * 1_000)) {
        return;
    }
    lastAlertHb = hb;
    lastAlertMs = t;
    captureBlocked(lag, hb).catch((err: unknown) => {
        writeLog(`WATCHDOG: Unexpected collection failure: ${String(err)}`);
    });
}

/**
 * --- 响应主线程请求采集常规 CPU Profile ---
 * @param dir 主线程已创建的诊断目录
 * @param ts 唯一采集时间标识
 */
async function runProfile(dir: string, ts: string): Promise<void> {
    const file = `cpu-${ts}.cpuprofile`;
    const res = {
        'file': file,
        'saved': false,
        'errors': [] as string[],
    };

    // --- 尝试占用 Inspector 锁 ---
    if (Atomics.compareExchange(shm, SLOT_LOCK, 0n, 1n) !== 0n) {
        res.errors.push('Inspector is already collecting a profile.');
        const recorded = saveFile(dir, `profile-${ts}.json`, JSON.stringify(res, null, 2));
        workerThreads.parentPort?.postMessage({
            'type': 'profile',
            ...res,
            'recorded': recorded,
        });
        return;
    }

    // --- 连接主线程并定时采集 ---
    const session = new inspector.Session();
    let timedOut = false;
    const timer = setTimeout(() => {
        timedOut = true;
        session.disconnect();
    }, cfg.profileDuration + 10_000);
    try {
        session.connectToMainThread();
        await session.post('Profiler.enable');
        await session.post('Profiler.start');
        await new Promise<void>(resolve => setTimeout(resolve, cfg.profileDuration));
        const { profile } = await session.post('Profiler.stop');
        res.saved = saveFile(dir, file, JSON.stringify(profile));
        if (!res.saved) {
            res.errors.push('Failed to save CPU profile.');
        }
    }
    catch (err: unknown) {
        res.errors.push(timedOut ? 'Inspector profile collection timed out.' : String(err));
    }
    finally {
        // --- 释放锁并回传结果 ---
        clearTimeout(timer);
        session.disconnect();
        Atomics.compareExchange(shm, SLOT_LOCK, 1n, 0n);
        const recorded = saveFile(dir, `profile-${ts}.json`, JSON.stringify(res, null, 2));
        if (!recorded) {
            writeLog('WATCHDOG: Failed to save CPU profile result.');
        }
        workerThreads.parentPort?.postMessage({
            'type': 'profile',
            ...res,
            'recorded': recorded,
        });
    }
}

/**
 * --- 暂停主线程抓取调用栈并立即恢复，再写入栈文件 ---
 * @param session 已连接主线程的 Inspector 会话
 * @param urls 脚本 ID 到 URL 的映射
 * @param dir 诊断目录
 * @param id 事件标识
 * @param lag 阻塞时长（ms）
 * @param now 发生时间
 * @param hb 阻塞前心跳
 * @param rec 事件记录对象
 * @param isTimedOut 检查整体是否已超时
 * @param setPause 注册暂停取消回调
 */
async function captureStack(
    session: inspector.Session,
    urls: Record<string, string>,
    dir: string,
    id: string,
    lag: number,
    now: Date,
    hb: bigint,
    rec: { 'files': string[]; 'errors': string[]; },
    isTimedOut: () => boolean,
    setPause: (fn: (frames: inspector.Debugger.CallFrame[] | false) => void) => void
): Promise<void> {
    try {
        await session.post('Debugger.enable');
        const frames = await new Promise<inspector.Debugger.CallFrame[] | false>((resolve) => {
            setPause(resolve);
            session.once('Debugger.paused', (msg) => {
                resolve(msg.params.callFrames);
            });
            void session.post('Debugger.pause').catch(() => {
                resolve(false);
            });
        });
        if (frames !== false && !isTimedOut()) {
            const lines = frames.map((f, i) => {
                const url = f.url || urls[f.location.scriptId] || '';
                return `#${i} ${f.functionName || '(anonymous)'} (${url}:${f.location.lineNumber + 1}:${(f.location.columnNumber ?? 0) + 1})`;
            });
            await session.post('Debugger.resume');
            const name = `blocked-stack-${id}.txt`;
            const body = `Heartbeat delayed: ${lag}ms\nPID: ${cfg.pid}\nCaptured: ${now.toISOString()}\n\n${lines.join('\n')}\n`;
            if (saveFile(dir, name, body)) {
                rec.files.push(name);
                Atomics.store(shm, SLOT_SAVED, hb);
            }
            else {
                rec.errors.push('Failed to save blocking stack.');
            }
        }
        else {
            rec.errors.push('No blocking stack received before timeout.');
        }
        if (!isTimedOut()) {
            await session.post('Debugger.disable');
        }
    }
    catch (err: unknown) {
        rec.errors.push(`Stack: ${String(err)}`);
        // --- 栈采集失败仍恢复主线程，让 CPU Profile 继续完成 ---
        if (!isTimedOut()) {
            await session.post('Debugger.resume').catch(() => undefined);
            await session.post('Debugger.disable').catch(() => undefined);
        }
    }
}

/**
 * --- 保存主线程阻塞现场（摘要、调用栈、CPU Profile） ---
 * @param lag 心跳中断时长（ms）
 * @param hb 阻塞前的心跳值
 */
async function captureBlocked(lag: number, hb: bigint): Promise<void> {
    if (busy) {
        return;
    }
    busy = true;

    // --- 组装当前活跃请求与阻塞事件初始摘要 ---
    const now = new Date();
    const ts = fmtTs(now);
    const id = `${ts}-${now.getTime()}`;
    const dir = path.join(
        cfg.logDir, 'monitor', ts.slice(0, 4), ts.slice(4, 6), ts.slice(6, 8),
        `${ts.slice(8)}-pid-${cfg.pid}-${now.getTime()}-blocked`
    );
    const cpu = process.cpuUsage();
    const rss = process.memoryUsage.rss();
    const active: ISnapshotRequest[] = [];
    for (const r of reqs.values()) {
        if (active.length >= 100) {
            break;
        }
        active.push({
            'url': r.url,
            'method': r.method,
            'duration': now.getTime() - r.start,
            'cpuUser': cpu.user - r.startCpu.user,
            'cpuSystem': cpu.system - r.startCpu.system,
            'memDelta': rss - r.startMem,
        });
    }
    const rec = {
        'pid': cfg.pid,
        'time': now.getTime(),
        'heartbeat': Number(hb),
        'blockMs': lag,
        'samples': [...samples],
        'lastMainSnapshot': lastSnap,
        'activeRequests': active,
        'activeCount': reqs.size,
        'recentRequests': recent.filter(r => now.getTime() - (r.completedAt ?? 0) <= 60_000),
        'status': 'pending',
        'files': [] as string[],
        'errors': [] as string[],
    };

    // --- 创建目录并先保存初始事件摘要 ---
    try {
        fs.mkdirSync(dir, { 'recursive': true, 'mode': 0o700 });
        fs.chmodSync(dir, 0o700);
    }
    catch (err: unknown) {
        writeLog(`WATCHDOG: Failed to create diagnostic directory: ${String(err)}`);
        busy = false;
        return;
    }
    if (!saveFile(dir, 'blocked-event.json', JSON.stringify(rec, null, 2))) {
        busy = false;
        return;
    }
    writeLog(`WATCHDOG: Main thread heartbeat delayed ${lag}ms, PID:${cfg.pid}, EVENT:${dir}`);

    // --- 抢占 Inspector 锁，若已有采集在跑则跳过 ---
    if (Atomics.compareExchange(shm, SLOT_LOCK, 0n, 2n) !== 0n) {
        rec.status = 'skipped-busy';
        lastAlertMs = nowMs() - cfg.cooldown * 1_000 + 5_000;
        rec.errors.push('Inspector is already collecting a profile.');
        if (!saveFile(dir, 'blocked-event.json', JSON.stringify(rec, null, 2))) {
            writeLog('WATCHDOG: Failed to save Inspector busy result.');
        }
        busy = false;
        return;
    }

    // --- 建立 Inspector 会话并设置整体超时 ---
    const session = new inspector.Session();
    const urls: Record<string, string> = {};
    let timedOut = false;
    let cancelPause: ((frames: inspector.Debugger.CallFrame[] | false) => void) | null = null;
    const timer = setTimeout(() => {
        timedOut = true;
        cancelPause?.(false);
        session.disconnect();
    }, cfg.profileDuration + 10_000);
    session.on('Debugger.scriptParsed', (msg) => {
        urls[msg.params.scriptId] = msg.params.url;
    });

    try {
        session.connectToMainThread();

        // --- 先启动 Profile，避免等调用栈期间错过正在执行的热点 ---
        await session.post('Profiler.enable');
        await session.post('Profiler.start');
        const started = nowMs();

        // --- 抓取阻塞调用栈 ---
        await captureStack(
            session, urls, dir, id, lag, now, hb, rec,
            () => timedOut,
            (fn) => {
                cancelPause = fn;
            }
        );

        // --- 补足剩余 Profile 采集时长并落盘 ---
        const left = cfg.profileDuration - (nowMs() - started);
        if (left > 0) {
            await new Promise<void>(resolve => setTimeout(resolve, left));
        }
        const { profile } = await session.post('Profiler.stop');
        const name = `blocked-cpu-${id}.cpuprofile`;
        if (saveFile(dir, name, JSON.stringify(profile))) {
            rec.files.push(name);
            Atomics.store(shm, SLOT_SAVED, hb);
        }
        else {
            rec.errors.push('Failed to save CPU profile.');
        }
        rec.status = rec.errors.length ? 'partial' : 'complete';
    }
    catch (err: unknown) {
        rec.status = rec.files.length ? 'partial' : 'failed';
        rec.errors.push(timedOut ? 'Inspector collection timed out.' : String(err));
    }
    finally {
        // --- 释放锁、回写最终摘要并通知主线程 ---
        clearTimeout(timer);
        session.disconnect();
        Atomics.compareExchange(shm, SLOT_LOCK, 2n, 0n);
        busy = false;
        if (!saveFile(dir, 'blocked-event.json', JSON.stringify(rec, null, 2))) {
            rec.errors.push('Failed to update event summary.');
            rec.status = 'partial';
        }
        writeLog(`WATCHDOG: Diagnostic ${rec.status}, PID:${cfg.pid}, EVENT:${dir}`);
        workerThreads.parentPort?.postMessage({
            'type': 'diagnostic',
            'heartbeat': Number(hb),
            'dir': dir,
            'files': rec.files.map(name => path.join(dir, name)),
            'errors': rec.errors,
            'status': rec.status,
        });
    }
}

// --- 类型 ---

/** --- Worker 启动配置，threshold/interval/profileDuration 单位 ms，cooldown 单位秒 --- */
interface IWatchdogData {
    /** --- 主线程与看门狗共享的心跳状态内存 --- */
    'buffer': SharedArrayBuffer;
    /** --- 日志根目录 --- */
    'logDir': string;
    /** --- 日志格式，默认 jsonl --- */
    'logFormat'?: 'csv' | 'jsonl';
    /** --- 主进程 PID --- */
    'pid': number;
    /** --- 阻塞判定阈值（ms） --- */
    'threshold': number;
    /** --- 同一阻塞重复告警冷却时间（秒） --- */
    'cooldown': number;
    /** --- 看门狗轮询间隔（ms） --- */
    'interval': number;
    /** --- CPU Profile 采集时长（ms） --- */
    'profileDuration': number;
    /** --- 启动时主线程已有的活跃请求 --- */
    'requests': Array<[string, IActiveRequest]>;
}

/** --- 主线程发往看门狗的消息 --- */
type TWatchdogMsg =
    | { 'type': 'snapshot'; 'snapshot': ISnapshot; 'logFormat': 'csv' | 'jsonl'; }
    | { 'type': 'request'; 'id': string; 'request': IActiveRequest; }
    | { 'type': 'complete'; 'id': string; 'request': ISnapshotRequest; }
    | { 'type': 'profile'; 'dir': string; 'ts': string; };

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2026-02-08
 * Last: 2026-10-05
 * --- 独立线程监测主线程心跳，阻塞期间保存资源采样、请求、调用栈和 CPU Profile ---
 * --- 只依赖 Node.js；主线程无法运行时，日志与 Inspector 超时仍可独立处理 ---
 */
import * as workerThreads from 'worker_threads';
import * as fs from 'fs';
import * as path from 'path';
import * as inspector from 'inspector/promises';
import type { IActiveRequest, ISnapshot, ISnapshotRequest } from '#kebab/sys/monitor.js';

/** --- Worker 配置，threshold/interval/profileDuration 单位 ms，cooldown 单位秒 --- */
interface IWatchdogData {
    'buffer': SharedArrayBuffer;
    'logDir': string;
    'pid': number;
    'threshold': number;
    'cooldown': number;
    'interval': number;
    'profileDuration': number;
    'requests': Array<[string, IActiveRequest]>;
}

/** --- 主线程提供的上下文；CPU/RSS 和心跳仍由 Worker 独立采样 --- */
type TWatchdogMessage = { 'type': 'snapshot'; 'snapshot': ISnapshot; } |
    { 'type': 'request'; 'id': string; 'request': IActiveRequest; } |
    { 'type': 'complete'; 'id': string; 'request': ISnapshotRequest; } |
    { 'type': 'profile'; 'dir': string; 'ts': string; };

const data = workerThreads.workerData as IWatchdogData;
/** --- 0: 心跳 ms, 1: 调试, 2: Inspector 所有者（0-空闲,1-常规 Profile,2-阻塞 Profile）, 3: 同步诊断, 4: 已保存现场的心跳 --- */
const view = new BigInt64Array(data.buffer);
const activeRequests = new Map(data.requests);
const recentRequests: ISnapshotRequest[] = [];
const samples: Array<{ 'time': number; 'elapsed': number; 'cpu': number; 'rss': number; 'heartbeatLag': number; }> = [];
let snapshot: ISnapshot | null = null;
let lastAlertHeartbeat = 0n;
let lastAlertTime = 0;
let capturing = false;
let lastCpu = process.cpuUsage();
let lastTime = Number(process.hrtime.bigint() / 1_000_000n);

workerThreads.parentPort?.on('message', (message: TWatchdogMessage) => {
    if (message.type === 'snapshot') {
        snapshot = message.snapshot;
    }
    else if (message.type === 'request') {
        activeRequests.set(message.id, message.request);
    }
    else if (message.type === 'complete') {
        activeRequests.delete(message.id);
        recentRequests.push(message.request);
        if (recentRequests.length > 100) {
            recentRequests.shift();
        }
    }
    else {
        collectProfile(message.dir, message.ts).catch((error: unknown) => {
            writeLog(`WATCHDOG: Unexpected profile failure: ${String(error)}`);
        });
    }
});

/**
 * --- 格式化本地时间，用于日志目录和文件名 ---
 * @param date 要格式化的时间
 * @returns YmdHis 字符串
 */
function fmtTs(date: Date): string {
    return String(date.getFullYear()) + String(date.getMonth() + 1).padStart(2, '0') +
        String(date.getDate()).padStart(2, '0') + String(date.getHours()).padStart(2, '0') +
        String(date.getMinutes()).padStart(2, '0') + String(date.getSeconds()).padStart(2, '0');
}

/**
 * --- 写入看门狗日志，文件系统失败时保留标准错误输出 ---
 * @param msg 日志内容
 * @returns 无返回值
 */
function writeLog(msg: string): void {
    const now = new Date();
    const ts = fmtTs(now);
    const dir = path.join(data.logDir, 'system-monitor', ts.slice(0, 4), ts.slice(4, 6), ts.slice(6, 8));
    try {
        fs.mkdirSync(dir, { 'recursive': true, 'mode': 0o700 });
        const file = path.join(dir, `${ts.slice(8, 10)}.csv`);
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, 'TIME,UNIX,MESSAGE\n', { 'mode': 0o600 });
        }
        const time = `${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12, 14)}`;
        fs.appendFileSync(file, `"${time}","${Math.floor(now.getTime() / 1000)}","${msg.replace(/"/g, '""')}"\n`);
    }
    catch (error: unknown) {
        process.stderr.write(`[MONITOR] Watchdog log failed: ${String(error)}\n`);
    }
}

/**
 * --- 写入权限受限的诊断文件 ---
 * @param dir 诊断目录
 * @param name 文件名
 * @param content 文件内容
 * @returns 是否保存成功
 */
function writeFile(dir: string, name: string, content: string): boolean {
    try {
        fs.writeFileSync(path.join(dir, name), content, { 'mode': 0o600 });
        fs.chmodSync(path.join(dir, name), 0o600);
        return true;
    }
    catch (error: unknown) {
        process.stderr.write(`[MONITOR] Watchdog diagnostic write failed: ${String(error)}\n`);
        return false;
    }
}

/**
 * --- 按主线程请求采集 Profile，开始、停止、超时和文件写入都不依赖主线程事件循环 ---
 * @param dir 主线程已创建的诊断目录
 * @param ts 唯一采集时间标识
 * @returns 无返回值，独立保存结果并通知主线程
 */
async function collectProfile(dir: string, ts: string): Promise<void> {
    const file = `cpu-${ts}.cpuprofile`;
    const result = { 'file': file, 'saved': false, 'errors': [] as string[] };
    if (Atomics.compareExchange(view, 2, 0n, 1n) !== 0n) {
        result.errors.push('Inspector is already collecting a profile.');
        const recorded = writeFile(dir, `profile-${ts}.json`, JSON.stringify(result, null, 2));
        workerThreads.parentPort?.postMessage({ 'type': 'profile', ...result, recorded });
        return;
    }
    const session = new inspector.Session();
    let timedOut = false;
    const timeout = setTimeout(() => {
        timedOut = true;
        session.disconnect();
    }, data.profileDuration + 10_000);
    try {
        session.connectToMainThread();
        await session.post('Profiler.enable');
        await session.post('Profiler.start');
        await new Promise<void>(resolve => setTimeout(resolve, data.profileDuration));
        const { profile } = await session.post('Profiler.stop');
        result.saved = writeFile(dir, file, JSON.stringify(profile));
        if (!result.saved) {
            result.errors.push('Failed to save CPU profile.');
        }
    }
    catch (error: unknown) {
        result.errors.push(timedOut ? 'Inspector profile collection timed out.' : String(error));
    }
    finally {
        clearTimeout(timeout);
        session.disconnect();
        Atomics.compareExchange(view, 2, 1n, 0n);
        const recorded = writeFile(dir, `profile-${ts}.json`, JSON.stringify(result, null, 2));
        if (!recorded) {
            writeLog('WATCHDOG: Failed to save CPU profile result.');
        }
        workerThreads.parentPort?.postMessage({ 'type': 'profile', ...result, recorded });
    }
}

/**
 * --- 保存阻塞现场；暂停后立即恢复，再写磁盘，整个会话有统一超时和释放出口 ---
 * @param blockMs 心跳中断时间 ms
 * @param heartbeat 这次阻塞前的心跳，用于区分连续阻塞和新事件
 * @returns 无返回值，采集结果保留在 blocked-event.json
 */
async function captureDiag(blockMs: number, heartbeat: bigint): Promise<void> {
    if (capturing) {
        return;
    }
    capturing = true;
    const now = new Date();
    const ts = fmtTs(now);
    const id = `${ts}-${now.getTime()}`;
    const dir = path.join(data.logDir, 'monitor', ts.slice(0, 4), ts.slice(4, 6), ts.slice(6, 8),
        `${ts.slice(8)}-pid-${data.pid}-${now.getTime()}-blocked`);
    const cpu = process.cpuUsage();
    const rss = process.memoryUsage.rss();
    const requests: ISnapshotRequest[] = [];
    for (const req of activeRequests.values()) {
        if (requests.length >= 100) {
            break;
        }
        requests.push({
            'url': req.url, 'method': req.method, 'duration': now.getTime() - req.start,
            'cpuUser': cpu.user - req.startCpu.user, 'cpuSystem': cpu.system - req.startCpu.system,
            'memDelta': rss - req.startMem,
        });
    }
    const record = {
        'pid': data.pid, 'time': now.getTime(), 'heartbeat': Number(heartbeat), 'blockMs': blockMs,
        'samples': [...samples], 'lastMainSnapshot': snapshot, 'activeRequests': requests, 'activeCount': activeRequests.size,
        'recentRequests': recentRequests.filter(req => now.getTime() - (req.completedAt ?? 0) <= 60_000),
        'status': 'pending', 'files': [] as string[], 'errors': [] as string[],
    };
    try {
        fs.mkdirSync(dir, { 'recursive': true, 'mode': 0o700 });
        fs.chmodSync(dir, 0o700);
    }
    catch (error: unknown) {
        writeLog(`WATCHDOG: Failed to create diagnostic directory: ${String(error)}`);
        capturing = false;
        return;
    }
    if (!writeFile(dir, 'blocked-event.json', JSON.stringify(record, null, 2))) {
        capturing = false;
        return;
    }
    writeLog(`WATCHDOG: Main thread heartbeat delayed ${blockMs}ms, PID:${data.pid}, EVENT:${dir}`);
    if (Atomics.compareExchange(view, 2, 0n, 2n) !== 0n) {
        record.status = 'skipped-busy';
        lastAlertTime = Number(process.hrtime.bigint() / 1_000_000n) - data.cooldown * 1_000 + 5_000;
        record.errors.push('Inspector is already collecting a profile.');
        if (!writeFile(dir, 'blocked-event.json', JSON.stringify(record, null, 2))) {
            writeLog('WATCHDOG: Failed to save Inspector busy result.');
        }
        capturing = false;
        return;
    }

    const session = new inspector.Session();
    const scriptUrls: Record<string, string> = {};
    let timedOut = false;
    let finishPause: ((frames: inspector.Debugger.CallFrame[] | false) => void) | null = null;
    const timeout = setTimeout(() => {
        timedOut = true;
        finishPause?.(false);
        // --- 断开会话会使挂起的 post 失败，并释放我们设置的暂停状态 ---
        session.disconnect();
    }, data.profileDuration + 10_000);
    session.on('Debugger.scriptParsed', (message) => {
        scriptUrls[message.params.scriptId] = message.params.url;
    });
    try {
        session.connectToMainThread();
        // --- 先启动 Profile，避免等待调用栈时错过仍在执行的热点 ---
        await session.post('Profiler.enable');
        await session.post('Profiler.start');
        const profileStarted = Number(process.hrtime.bigint() / 1_000_000n);
        try {
            await session.post('Debugger.enable');
            const frames = await new Promise<inspector.Debugger.CallFrame[] | false>((resolve) => {
                finishPause = resolve;
                session.once('Debugger.paused', (message) => { resolve(message.params.callFrames); });
                void session.post('Debugger.pause').catch(() => { resolve(false); });
            });
            if (frames !== false && !timedOut) {
                const lines = frames.map((frame, i) => {
                    const url = frame.url || scriptUrls[frame.location.scriptId] || '';
                    return `#${i} ${frame.functionName || '(anonymous)'} ` +
                        `(${url}:${frame.location.lineNumber + 1}:${(frame.location.columnNumber ?? 0) + 1})`;
                });
                await session.post('Debugger.resume');
                const name = `blocked-stack-${id}.txt`;
                if (writeFile(dir, name, `Heartbeat delayed: ${blockMs}ms\nPID: ${data.pid}\nCaptured: ${now.toISOString()}\n\n${lines.join('\n')}\n`)) {
                    record.files.push(name);
                    Atomics.store(view, 4, heartbeat);
                }
                else {
                    record.errors.push('Failed to save blocking stack.');
                }
            }
            else {
                record.errors.push('No blocking stack received before timeout.');
            }
            if (!timedOut) {
                await session.post('Debugger.disable');
            }
        }
        catch (error: unknown) {
            record.errors.push(`Stack: ${String(error)}`);
            // --- 栈采集失败仍尝试恢复主线程，CPU Profile 可以独立完成 ---
            if (!timedOut) {
                await session.post('Debugger.resume').catch(() => undefined);
                await session.post('Debugger.disable').catch(() => undefined);
            }
        }
        const remaining = data.profileDuration - (Number(process.hrtime.bigint() / 1_000_000n) - profileStarted);
        if (remaining > 0) {
            await new Promise<void>(resolve => setTimeout(resolve, remaining));
        }
        const { profile } = await session.post('Profiler.stop');
        const name = `blocked-cpu-${id}.cpuprofile`;
        if (writeFile(dir, name, JSON.stringify(profile))) {
            record.files.push(name);
            Atomics.store(view, 4, heartbeat);
        }
        else {
            record.errors.push('Failed to save CPU profile.');
        }
        record.status = record.errors.length ? 'partial' : 'complete';
    }
    catch (error: unknown) {
        record.status = record.files.length ? 'partial' : 'failed';
        record.errors.push(timedOut ? 'Inspector collection timed out.' : String(error));
    }
    finally {
        clearTimeout(timeout);
        session.disconnect();
        Atomics.compareExchange(view, 2, 2n, 0n);
        capturing = false;
        if (!writeFile(dir, 'blocked-event.json', JSON.stringify(record, null, 2))) {
            record.errors.push('Failed to update event summary.');
            record.status = 'partial';
        }
        writeLog(`WATCHDOG: Diagnostic ${record.status}, PID:${data.pid}, EVENT:${dir}`);
        workerThreads.parentPort?.postMessage({ 'type': 'diagnostic', 'heartbeat': Number(heartbeat), dir,
            'files': record.files.map(name => path.join(dir, name)), 'errors': record.errors, 'status': record.status });
    }
}

// --- 每秒独立采样；新心跳代表新事件，不让上一事件的冷却吞掉下一次阻塞 ---
setInterval(() => {
    const time = Number(process.hrtime.bigint() / 1_000_000n);
    const cpu = process.cpuUsage();
    const elapsed = time - lastTime;
    const heartbeat = Atomics.load(view, 0);
    const blockMs = time - Number(heartbeat);
    const cpuPercent = elapsed > 0
        ? (cpu.user - lastCpu.user + cpu.system - lastCpu.system) / (elapsed * 1_000) * 100 : 0;
    lastCpu = cpu;
    lastTime = time;
    samples.push({ 'time': Date.now(), elapsed, 'cpu': Math.round(cpuPercent * 100) / 100,
        'rss': process.memoryUsage.rss(), 'heartbeatLag': blockMs });
    if (samples.length > 60) {
        samples.shift();
    }
    if (heartbeat <= 0n || blockMs < data.threshold || Atomics.load(view, 1) === 1n || Atomics.load(view, 3) === 1n) {
        return;
    }
    if (capturing || heartbeat === lastAlertHeartbeat && time - lastAlertTime < data.cooldown * 1_000) {
        return;
    }
    lastAlertHeartbeat = heartbeat;
    lastAlertTime = time;
    captureDiag(blockMs, heartbeat).catch((error: unknown) => {
        writeLog(`WATCHDOG: Unexpected collection failure: ${String(error)}`);
    });
}, data.interval);

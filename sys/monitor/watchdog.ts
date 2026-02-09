/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2026-02-08
 * --- 看门狗 Worker 线程，独立事件循环监控主线程心跳 ---
 * --- 阻塞时通过 inspector.connectToMainThread() 远程抓取主线程 JS 调用栈和 CPU Profile ---
 * --- 看门狗必须最小依赖、最大自治，不引入项目库，确保主线程异常时仍能可靠运行 ---
 */
import * as workerThreads from 'worker_threads';
import * as fs from 'fs';
import * as path from 'path';
import * as inspector from 'inspector';

/** --- Worker 线程接收的配置数据 --- */
interface IWatchdogData {
    'buffer': SharedArrayBuffer;
    'logDir': string;
    'pid': number;
    'threshold': number;
    'cooldown': number;
    'interval': number;
    'profileDuration': number;
}

const data = workerThreads.workerData as IWatchdogData;
const view = new Int32Array(data.buffer);

/** --- 上次告警时间（秒级时间戳） --- */
let lastAlertTime: number = 0;

/** --- 是否正在诊断采集 --- */
let capturing: boolean = false;

/**
 * --- 格式化时间戳为 YmdHis 字符串 ---
 */
function fmtTs(): string {
    const d = new Date();
    return String(d.getFullYear()) +
        String(d.getMonth() + 1).padStart(2, '0') +
        String(d.getDate()).padStart(2, '0') +
        String(d.getHours()).padStart(2, '0') +
        String(d.getMinutes()).padStart(2, '0') +
        String(d.getSeconds()).padStart(2, '0');
}

/**
 * --- 格式化当前时间为 HH:mm:ss ---
 */
function fmtTime(): string {
    const d = new Date();
    return String(d.getHours()).padStart(2, '0') + ':' +
        String(d.getMinutes()).padStart(2, '0') + ':' +
        String(d.getSeconds()).padStart(2, '0');
}

/**
 * --- 写入日志到 CSV 文件 ---
 * @param msg 日志消息
 */
function writeLog(msg: string): void {
    const d = new Date();
    const dir = path.join(
        data.logDir, 'system-monitor',
        String(d.getFullYear()),
        String(d.getMonth() + 1).padStart(2, '0'),
        String(d.getDate()).padStart(2, '0'),
    );
    try {
        fs.mkdirSync(dir, { 'recursive': true, 'mode': 0o777 });
        const h = String(d.getHours()).padStart(2, '0');
        const file = path.join(dir, h + '.csv');
        if (!fs.existsSync(file)) {
            fs.writeFileSync(
                file, 'TIME,UNIX,MESSAGE\n', { 'mode': 0o777 },
            );
        }
        const now = Math.floor(Date.now() / 1000);
        fs.appendFileSync(
            file,
            `"${fmtTime()}","${now}","${msg}"\n`,
        );
    }
    catch {
        // --- 文件系统不可用时无法做更多处理 ---
    }
}

/**
 * --- 通过 Inspector 远程抓取主线程调用栈和 CPU Profile ---
 * @param blockSec 阻塞秒数
 */
function captureDiag(blockSec: number): void {
    if (capturing) {
        return;
    }
    capturing = true;
    const diagDir = path.join(
        data.logDir, 'monitor', String(data.pid),
    );
    const ts = fmtTs();
    const session = new inspector.Session();
    try {
        session.connectToMainThread();
    }
    catch {
        capturing = false;
        return;
    }
    let didPause = false;
    /** --- 10s 超时与 Debugger.enable 回调存在竞态，超时后 session 已断开，回调仍在断开的 session 上操作 --- */
    let timedOut = false;
    /** --- scriptId → URL 映射表 --- */
    const scriptUrls: Record<string, string> = {};
    const pauseTimeout = setTimeout(() => {
        if (!didPause) {
            timedOut = true;
            try {
                session.post('Debugger.disable');
            }
            catch {
                // --- 忽略 ---
            }
            try {
                session.disconnect();
            }
            catch {
                // --- 忽略 ---
            }
            capturing = false;
        }
    }, 10_000);
    session.on('Debugger.scriptParsed', (msg) => {
        scriptUrls[msg.params.scriptId] = msg.params.url ?? '';
    });
    session.on('Debugger.paused', (msg) => {
        if (timedOut) {
            return;
        }
        didPause = true;
        clearTimeout(pauseTimeout);
        let stackLines: string[] = [];
        try {
            const frames = msg.params.callFrames;
            stackLines = frames.map((f, i) => {
                const url = f.url
                    || scriptUrls[f.location.scriptId]
                    || '';
                const line = f.location.lineNumber + 1;
                const col = (f.location.columnNumber ?? 0) + 1;
                const name = f.functionName || '(anonymous)';
                return `#${i} ${name} (${url}:${line}:${col})`;
            });
        }
        catch {
            // --- 忽略堆栈解析错误 ---
        }
        session.post('Debugger.resume', (resumeErr) => {
            if (resumeErr) {
                // --- resume 失败仍尝试 disable 并断开，防止主线程卡死 ---
                try {
                    session.post('Debugger.disable');
                }
                catch {
                    // --- 忽略 ---
                }
                try {
                    session.disconnect();
                }
                catch {
                    // --- 忽略 ---
                }
                capturing = false;
                return;
            }
            session.post('Debugger.disable', () => {
                // --- 写入堆栈文件 ---
                try {
                    fs.mkdirSync(diagDir, {
                        'recursive': true, 'mode': 0o777,
                    });
                    const content =
                        `Event Loop Blocked: ${blockSec}s\n` +
                        `Captured: ${new Date().toISOString()}\n` +
                        `PID: ${data.pid}\n\n` +
                        `Call Stack:\n${stackLines.join('\n')}\n`;
                    fs.writeFileSync(
                        path.join(
                            diagDir,
                            `blocked-stack-${ts}.txt`,
                        ),
                        content,
                        { 'mode': 0o777 },
                    );
                }
                catch {
                    // --- 忽略 ---
                }
                // --- 采集 CPU Profile ---
                collectProfile(session, diagDir, ts);
            });
        });
    });
    session.post('Debugger.enable', (err) => {
        if (err || timedOut) {
            clearTimeout(pauseTimeout);
            if (!timedOut) {
                session.disconnect();
                capturing = false;
            }
            return;
        }
        if (timedOut) {
            clearTimeout(pauseTimeout);
            return;
        }
        try {
            session.post('Debugger.pause', (err2) => {
                if (err2 || timedOut) {
                    clearTimeout(pauseTimeout);
                    if (!timedOut) {
                        try {
                            session.post('Debugger.disable');
                        }
                        catch {
                            // --- 忽略 ---
                        }
                        session.disconnect();
                        capturing = false;
                    }
                }
            });
        }
        catch {
            clearTimeout(pauseTimeout);
            try {
                session.disconnect();
            }
            catch {
                // --- 忽略 ---
            }
            capturing = false;
        }
    });
}

/**
 * --- 采集 CPU Profile ---
 * @param session Inspector 会话
 * @param diagDir 诊断输出目录
 * @param ts 时间戳字符串
 */
function collectProfile(
    session: inspector.Session, diagDir: string, ts: string,
): void {
    session.post('Profiler.enable', (err) => {
        if (err) {
            session.disconnect();
            capturing = false;
            return;
        }
        session.post('Profiler.start', (err2) => {
            if (err2) {
                session.post('Profiler.disable');
                session.disconnect();
                capturing = false;
                return;
            }
            setTimeout(() => {
                session.post('Profiler.stop', (err3, r) => {
                    if (!err3 && r?.profile) {
                        try {
                            fs.writeFileSync(
                                path.join(
                                    diagDir,
                                    `blocked-cpu-${ts}.cpuprofile`,
                                ),
                                JSON.stringify(r.profile),
                                { 'mode': 0o777 },
                            );
                        }
                        catch {
                            // --- 忽略 ---
                        }
                    }
                    session.post('Profiler.disable');
                    session.disconnect();
                    capturing = false;
                });
            }, data.profileDuration);
        });
    });
}

// --- 主循环：检测心跳 ---

setInterval(() => {
    const lastHb = Atomics.load(view, 0);
    const now = Math.floor(Date.now() / 1000);
    if (lastHb <= 0 || now - lastHb < data.threshold) {
        return;
    }
    if (now - lastAlertTime < data.cooldown) {
        return;
    }
    lastAlertTime = now;
    const blockSec = now - lastHb;
    writeLog(
        'WATCHDOG: Main thread event loop blocked for ' +
        blockSec + 's, PID: ' + data.pid,
    );
    captureDiag(blockSec);
}, data.interval);

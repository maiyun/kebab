import * as assert from 'node:assert/strict';
import * as events from 'node:events';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import * as nodeTest from 'node:test';
import * as timers from 'node:timers/promises';
import * as workerThreads from 'node:worker_threads';
import type { ISnapshot } from '#kebab/sys/monitor.js';

/** --- Worker 返回的实际诊断结果 --- */
interface IDiagnostic {
    'heartbeat': number;
    'dir': string;
    'status': string;
    'files': string[];
    'errors': string[];
}

/**
 * --- 制造真实主线程 JS 阻塞，函数名应出现在调用栈和 CPU Profile 中 ---
 * @param duration 阻塞毫秒数
 * @returns 无返回值
 */
function burnCpu(duration: number): void {
    const end = process.hrtime.bigint() + BigInt(duration) * 1_000_000n;
    while (process.hrtime.bigint() < end) {
        Math.sqrt(Number(process.hrtime.bigint() % 10_000n));
    }
}

for (const format of [undefined, 'jsonl', 'csv'] as const) {
    await nodeTest.test(`watchdog independently writes compatible ${format ?? 'default JSONL'} logs`, async () => {
        // --- 目录进入日志消息，逗号和双引号用于验证真实写盘的转义 ---
        const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-watchdog-log,"-'));
        const buffer = new SharedArrayBuffer(40);
        const view = new BigInt64Array(buffer);
        Atomics.store(view, 0, process.hrtime.bigint() / 1_000_000n);
        // --- 跳过 Inspector；只验证主线程阻塞时 Worker 独立写日志 ---
        Atomics.store(view, 2, 1n);
        const worker = new workerThreads.Worker(new URL('../sys/monitor/watchdog.js', import.meta.url), {
            'workerData': {
                buffer, 'logDir': directory, 'logFormat': format, 'pid': process.pid,
                'threshold': 100, 'interval': 20, 'cooldown': 30, 'profileDuration': 100, 'requests': [],
            },
        });
        const heartbeatTimer = setInterval(() => {
            Atomics.store(view, 0, process.hrtime.bigint() / 1_000_000n);
        }, 20);
        try {
            await events.once(worker, 'online');
            await timers.setTimeout(100);
            Atomics.store(view, 0, process.hrtime.bigint() / 1_000_000n);
            const blockStart = Date.now();
            burnCpu(600);
            const blockEnd = Date.now();
            const root = path.join(directory, 'system-monitor');
            const files = await fs.readdir(root, { 'recursive': true });
            const logFiles = files.filter(file => /\.(jsonl|csv)$/.test(file));
            assert.equal(logFiles.length, 1);
            const file = path.join(root, logFiles[0]);
            assert.ok(file.endsWith(`.${format ?? 'jsonl'}`));
            const stat = await fs.stat(file);
            assert.ok(stat.mtimeMs >= blockStart && stat.mtimeMs < blockEnd,
                'the log must be saved before the main-thread block ends');
            assert.equal(stat.mode & 0o777, 0o600);
            const lines = (await fs.readFile(file, 'utf8')).trimEnd().split('\n');
            const fields = [
                'time', 'unix', 'url', 'cookie', 'session', 'userAgent', 'realIp', 'cfIp', 'xIp',
                'osMem', 'procMem', 'message',
            ];
            if (format === 'csv') {
                assert.equal(lines[0], 'TIME,UNIX,URL,COOKIE,SESSION,USER_AGENT,REALIP,CFIP,XIP,OS,PROCESS,MESSAGE');
                assert.ok(lines.length > 1);
                for (const line of lines.slice(1)) {
                    const values = [...line.matchAll(/"((?:[^"]|"")*)"(?:,|$)/g)]
                        .map(match => match[1].replace(/""/g, '"'));
                    assert.equal(values.length, 12);
                    assert.equal(values[3], '');
                    assert.equal(values[4], '{}');
                    assert.ok(values[11].includes(`EVENT:${directory}`));
                }
            }
            else {
                assert.ok(lines.length > 0);
                for (const line of lines) {
                    const entry = JSON.parse(line) as Record<string, unknown>;
                    assert.deepEqual(Object.keys(entry), fields);
                    assert.deepEqual(entry.cookie, {});
                    assert.deepEqual(entry.session, {});
                    assert.equal(typeof entry.unix, 'number');
                    assert.ok(String(entry.message).includes(`EVENT:${directory}`));
                }
            }
            if (format === 'csv') {
                // --- 模拟新采样携带重载后的格式；不重启 Worker，下次阻塞应写 JSONL ---
                const snapshot: ISnapshot = {
                    'pid': process.pid, 'time': Date.now(), 'cpuProcess': 0, 'cpuOs': 0,
                    'mem': process.memoryUsage(), 'heap': { 'totalSize': 0, 'usedSize': 0, 'sizeLimit': 0 },
                    'osMem': { 'total': os.totalmem(), 'free': os.freemem() },
                    'eloopLag': 0, 'eloopMax': 0, 'activeRequests': [], 'activeCount': 0, 'recentRequests': [],
                };
                worker.postMessage({ 'type': 'snapshot', snapshot, 'logFormat': 'jsonl' });
                await timers.setTimeout(100);
                Atomics.store(view, 0, process.hrtime.bigint() / 1_000_000n);
                burnCpu(600);
                const updatedFiles = await fs.readdir(root, { 'recursive': true });
                const jsonlFile = updatedFiles.find(name => name.endsWith('.jsonl'));
                assert.ok(jsonlFile, 'the existing Worker must apply a reloaded log format');
                const entries = (await fs.readFile(path.join(root, jsonlFile), 'utf8')).trimEnd().split('\n');
                assert.ok(entries.length > 0);
                const entry = JSON.parse(entries[0]) as Record<string, unknown>;
                assert.deepEqual(Object.keys(entry), fields);
                assert.ok(String(entry.message).includes(`EVENT:${directory}`));
            }
        }
        finally {
            clearInterval(heartbeatTimer);
            await worker.terminate();
            await fs.rm(directory, { 'recursive': true, 'force': true });
        }
    });
}

await nodeTest.test('watchdog captures real blocking work and a second event within cooldown', async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-watchdog-'));
    const buffer = new SharedArrayBuffer(40);
    const view = new BigInt64Array(buffer);
    Atomics.store(view, 0, process.hrtime.bigint() / 1_000_000n);
    const diagnostics: IDiagnostic[] = [];
    const worker = new workerThreads.Worker(new URL('../sys/monitor/watchdog.js', import.meta.url), {
        'workerData': {
            buffer, 'logDir': directory, 'pid': process.pid, 'threshold': 150, 'interval': 25,
            'cooldown': 30, 'profileDuration': 200, 'requests': [[
                'blocking-request', {
                    'url': '/blocking-work', 'method': 'POST', 'start': Date.now(),
                    'startCpu': process.cpuUsage(), 'startMem': process.memoryUsage.rss(),
                },
            ]],
        },
    });
    worker.on('message', (message: IDiagnostic) => diagnostics.push(message));
    const heartbeatTimer = setInterval(() => {
        Atomics.store(view, 0, process.hrtime.bigint() / 1_000_000n);
    }, 25);

    /**
     * --- 等待独立线程完成采集，超时通过断言报告 ---
     * @param count 预期结果数量
     * @returns 无返回值
     */
    async function waitDiagnostics(count: number): Promise<void> {
        for (let i = 0; i < 250 && diagnostics.length < count; ++i) {
            await timers.setTimeout(50);
        }
        assert.ok(diagnostics.length >= count, 'watchdog did not finish or release its capture session');
    }

    try {
        await events.once(worker, 'online');
        await timers.setTimeout(150);
        burnCpu(50);
        await timers.setTimeout(150);
        assert.equal(diagnostics.length, 0, 'short spike should not be diagnosed');
        burnCpu(700);
        await waitDiagnostics(1);
        assert.equal(diagnostics[0].status, 'complete', diagnostics[0].errors.join('\n'));
        const stackFile = diagnostics[0].files.find(file => file.endsWith('.txt'));
        const profileFile = diagnostics[0].files.find(file => file.endsWith('.cpuprofile'));
        assert.ok(stackFile);
        assert.ok(profileFile);
        assert.match(await fs.readFile(stackFile, 'utf8'), /burnCpu/);
        const profile = JSON.parse(await fs.readFile(profileFile, 'utf8')) as {
            'nodes': Array<{ 'callFrame': { 'functionName': string; }; }>;
        };
        assert.ok(profile.nodes.some(node => node.callFrame.functionName === 'burnCpu'));
        const record = JSON.parse(await fs.readFile(path.join(diagnostics[0].dir, 'blocked-event.json'), 'utf8')) as {
            'activeRequests': Array<{ 'url': string; }>;
            'samples': Array<{ 'cpu': number; 'rss': number; }>;
        };
        assert.equal(record.activeRequests[0].url, '/blocking-work');
        assert.ok(record.samples.some(sample => sample.cpu > 50));
        assert.equal((await fs.stat(stackFile)).mode & 0o777, 0o600);
        assert.equal((await fs.stat(diagnostics[0].dir)).mode & 0o777, 0o700);
        await timers.setTimeout(150);
        burnCpu(700);
        await waitDiagnostics(2);
        assert.notEqual(diagnostics[0].heartbeat, diagnostics[1].heartbeat);
        assert.equal(diagnostics[1].status, 'complete', diagnostics[1].errors.join('\n'));
        assert.equal(Atomics.load(view, 2), 0n);
    }
    finally {
        clearInterval(heartbeatTimer);
        await worker.terminate();
        await fs.rm(directory, { 'recursive': true, 'force': true });
    }
});

await nodeTest.test('Inspector timeout releases the watchdog and preserves a failed capture', async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-watchdog-timeout-'));
    const buffer = new SharedArrayBuffer(40);
    const view = new BigInt64Array(buffer);
    Atomics.store(view, 0, process.hrtime.bigint() / 1_000_000n);
    const diagnostics: IDiagnostic[] = [];
    const url = new URL('../sys/monitor/watchdog.js', import.meta.url).href;
    // --- 首个 Inspector 会话永久等待 SDK 回应，后续会话恢复；执行的是实际 Worker 源码 ---
    const code = `
        const events = require('node:events');
        const inspector = require('node:inspector/promises');
        const module = require('node:module');
        let sessions = 0;
        inspector.Session = class extends events.EventEmitter {
            constructor() { super(); this.number = ++sessions; }
            connectToMainThread() {}
            post(method) {
                if (this.number === 1) {
                    return new Promise((resolve, reject) => { this.reject = reject; });
                }
                if (method === 'Debugger.pause') {
                    this.emit('Debugger.paused', { params: { callFrames: [] } });
                }
                return Promise.resolve({ profile: { nodes: [], startTime: 0, endTime: 1 } });
            }
            disconnect() { this.reject?.(new Error('Session disconnected')); }
        };
        module.syncBuiltinESMExports();
        import(${JSON.stringify(url)});
    `;
    const worker = new workerThreads.Worker(code, {
        'eval': true,
        'workerData': {
            buffer, 'logDir': directory, 'pid': process.pid, 'threshold': 150, 'interval': 25,
            'cooldown': 30, 'profileDuration': 100, 'requests': [],
        },
    });
    worker.on('message', (message: IDiagnostic) => diagnostics.push(message));
    try {
        await events.once(worker, 'online');
        for (let i = 0; i < 300 && !diagnostics.length; ++i) {
            await timers.setTimeout(50);
        }
        assert.ok(diagnostics.length >= 1);
        assert.ok(diagnostics[0].errors.some(error => error.includes('timed out')));
        assert.equal(diagnostics[0].status, 'failed');
        assert.equal(Atomics.load(view, 2), 0n);
        const record = JSON.parse(await fs.readFile(path.join(diagnostics[0].dir, 'blocked-event.json'), 'utf8')) as {
            'status': string;
            'errors': string[];
        };
        assert.equal(record.status, 'failed');
        assert.ok(record.errors.length > 0);
        Atomics.store(view, 0, process.hrtime.bigint() / 1_000_000n - 200n);
        for (let i = 0; i < 100 && diagnostics.length < 2; ++i) {
            await timers.setTimeout(50);
        }
        assert.equal(diagnostics.length, 2, 'timeout must not leave the watchdog stuck in capturing state');
        assert.equal(diagnostics[1].status, 'complete', diagnostics[1].errors.join('\n'));
    }
    finally {
        await worker.terminate();
        await fs.rm(directory, { 'recursive': true, 'force': true });
    }
});

await nodeTest.test('requested CPU profile stops and saves while the main thread is still blocked', async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-watchdog-profile-'));
    const buffer = new SharedArrayBuffer(40);
    const view = new BigInt64Array(buffer);
    Atomics.store(view, 0, process.hrtime.bigint() / 1_000_000n);
    const results: Array<{ 'type': string; 'saved': boolean; 'recorded': boolean; 'errors': string[]; }> = [];
    const worker = new workerThreads.Worker(new URL('../sys/monitor/watchdog.js', import.meta.url), {
        'workerData': {
            buffer, 'logDir': directory, 'pid': process.pid, 'threshold': 5_000, 'interval': 25,
            'cooldown': 30, 'profileDuration': 200, 'requests': [],
        },
    });
    worker.on('message', (message: typeof results[number]) => results.push(message));
    try {
        await events.once(worker, 'online');
        await timers.setTimeout(100);
        worker.postMessage({ 'type': 'profile', 'dir': directory, 'ts': 'test' });
        await timers.setTimeout(50);
        burnCpu(1_200);
        for (let i = 0; i < 100 && !results.length; ++i) {
            await timers.setTimeout(50);
        }
        assert.equal(results[0]?.type, 'profile');
        assert.equal(results[0].saved, true, results[0].errors.join('\n'));
        assert.equal(results[0].recorded, true);
        const profile = JSON.parse(await fs.readFile(path.join(directory, 'cpu-test.cpuprofile'), 'utf8')) as {
            'startTime': number;
            'endTime': number;
            'nodes': Array<{ 'callFrame': { 'functionName': string; }; }>;
        };
        assert.ok(profile.endTime - profile.startTime < 800_000,
            'a 200ms profile must finish before the 1200ms main-thread block ends');
        assert.ok(profile.nodes.some(node => node.callFrame.functionName === 'burnCpu'));
        const recorded = JSON.parse(await fs.readFile(path.join(directory, 'profile-test.json'), 'utf8')) as {
            'saved': boolean;
        };
        assert.equal(recorded.saved, true);
        assert.equal(Atomics.load(view, 2), 0n);
    }
    finally {
        await worker.terminate();
        await fs.rm(directory, { 'recursive': true, 'force': true });
    }
});

await nodeTest.test('monitor report and Worker profile results remain linked after resource recovery', async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-monitor-real-'));
    const originalCwd = process.cwd();
    process.chdir(directory);
    const monitor = await import('#kebab/sys/monitor.js');
    try {
        assert.equal(monitor.start({ 'cpu': 80, 'mem': 100_000, 'duration': 1_000 }), true);
        const id = monitor.track('/profile-link?secret=value', 'POST');
        const end = process.hrtime.bigint() + 1_500_000_000n;
        while (process.hrtime.bigint() < end) {
            burnCpu(10);
            await timers.setImmediate();
        }
        monitor.untrack(id);
        await timers.setTimeout(5_500);
        const root = path.join(directory, 'log', 'monitor');
        const files = await fs.readdir(root, { 'recursive': true });
        const eventFiles = files.filter(file => file.endsWith('event.json'));
        assert.ok(eventFiles.length >= 1);
        const record = JSON.parse(await fs.readFile(path.join(root, eventFiles[0]), 'utf8')) as {
            'endReason': string;
            'snapshot': { 'activeRequests': Array<{ 'url': string; }>; };
            'diagnostics': Array<{ 'status': string; 'files': string[]; 'errors': string[]; }>;
        };
        assert.equal(record.endReason, 'recovered');
        assert.equal(record.snapshot.activeRequests[0].url, '/profile-link');
        assert.equal(record.diagnostics[0].status, 'complete', record.diagnostics[0].errors.join('\n'));
        assert.ok(record.diagnostics[0].files.some(file => file.endsWith('.cpuprofile')));
        assert.ok(record.diagnostics[0].files.some(file => file.includes('profile-') && file.endsWith('.json')));
        assert.ok(record.diagnostics[0].files.some(file => file.includes('report-')));
    }
    finally {
        monitor.stop();
        await timers.setTimeout(100);
        process.chdir(originalCwd);
        await fs.rm(directory, { 'recursive': true, 'force': true });
    }
});

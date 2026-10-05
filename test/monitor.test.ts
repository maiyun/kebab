import * as assert from 'node:assert/strict';
import * as events from 'node:events';
import * as fs from 'node:fs/promises';
import * as module from 'node:module';
import * as os from 'node:os';
import * as path from 'node:path';
import * as nodeTest from 'node:test';
import type * as workerThreads from 'node:worker_threads';
import type { ISnapshot } from '#kebab/sys/monitor.js';

/** --- 测试读取的事件摘要 --- */
interface IEvent {
    'reasons': string[];
    'endReason': string | null;
    'snapshot': ISnapshot;
    'before': Array<{ 'time': number; }>;
    'diagnostics': Array<{ 'status': string; 'files': string[]; 'errors': string[]; 'snapshot': ISnapshot; }>;
}

/** --- 隔离线程和 Inspector，检测算法仍执行实际 monitor 模块 --- */
class WatchdogMock extends events.EventEmitter {

    public static view: BigInt64Array;

    public static logFormat: 'csv' | 'jsonl';

    public static snapshotLogFormat: 'csv' | 'jsonl' | undefined;

    public constructor(_url: URL, opt: workerThreads.WorkerOptions) {
        super();
        const data = opt.workerData as { 'buffer': SharedArrayBuffer; 'logFormat': 'csv' | 'jsonl'; };
        WatchdogMock.view = new BigInt64Array(data.buffer);
        WatchdogMock.logFormat = data.logFormat;
        // --- 让重型诊断走显式 busy 分支，测试只控制资源采样及事件生命周期 ---
        Atomics.store(WatchdogMock.view, 2, 2n);
    }

    /** @returns 无返回值 */
    public unref(): void {
        return;
    }

    /**
     * @param message 主线程发送的消息
     * @returns 无返回值
     */
    public postMessage(message: { 'type': string; 'logFormat'?: 'csv' | 'jsonl'; }): void {
        if (message.type === 'snapshot') {
            WatchdogMock.snapshotLogFormat = message.logFormat;
        }
    }

    /** @returns 退出码 */
    public terminate(): Promise<number> {
        return Promise.resolve(0);
    }
}

await nodeTest.test('monitor independently confirms resources and preserves review evidence', async (test) => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-monitor-'));
    const originalCwd = process.cwd();
    const require = module.createRequire(import.meta.url);
    const workerModule = require('node:worker_threads') as typeof workerThreads;
    const originalMemory = process.memoryUsage();
    let clock = 100_000;
    let cpuUser = 0;
    let rss = 50 * 1024 * 1024;
    test.mock.timers.enable({ 'apis': ['setInterval', 'Date'], 'now': 1_800_000_000_000 });
    test.mock.method(process.hrtime, 'bigint', () => BigInt(clock) * 1_000_000n);
    test.mock.method(process, 'cpuUsage', (previous?: NodeJS.CpuUsage) => ({
        'user': cpuUser - (previous?.user ?? 0), 'system': 0,
    }));
    const memoryUsage = Object.assign(() => ({ ...originalMemory, rss }), { 'rss': () => rss });
    test.mock.method(process, 'memoryUsage', memoryUsage);
    test.mock.method(workerModule, 'Worker', (function(url: URL, opt: workerThreads.WorkerOptions) {
        return new WatchdogMock(url, opt);
    }) as unknown as typeof workerThreads.Worker);
    module.syncBuiltinESMExports();
    process.chdir(directory);
    const monitor = await import('#kebab/sys/monitor.js');
    const core = await import('#kebab/lib/core.js');
    const originalLogFormat = core.globalConfig.logFormat;

    /**
     * --- 输入一段真实采样窗口，单调时钟与系统时钟分别可控 ---
     * @param seconds 持续秒数
     * @param cpu 每窗口进程 CPU 百分比
     * @param memory RSS MB
     * @returns 无返回值
     */
    function advance(seconds: number, cpu: number = 0, memory: number = 50): void {
        rss = memory * 1024 * 1024;
        for (let i = 0; i < seconds; ++i) {
            clock += 1_000;
            cpuUser += cpu * 10_000;
            test.mock.timers.tick(1_000);
        }
    }

    /**
     * --- 等待异步文件写入并读取事件，失败通过断言报告 ---
     * @returns 已保存的事件
     */
    async function readEvents(): Promise<IEvent[]> {
        await new Promise<void>(resolve => setTimeout(resolve, 80));
        const root = path.join(directory, 'log', 'monitor');
        const files = await fs.readdir(root, { 'recursive': true }).catch(() => [] as string[]);
        const result: IEvent[] = [];
        for (const file of files.filter(file => file.endsWith('event.json'))) {
            result.push(JSON.parse(await fs.readFile(path.join(root, file), 'utf8')) as IEvent);
        }
        return result;
    }

    try {
        await test.test('watchdog receives the configured framework log format', () => {
            for (const format of ['jsonl', 'csv'] as const) {
                core.globalConfig.logFormat = format;
                assert.equal(monitor.start(), true);
                assert.equal(WatchdogMock.logFormat, format);
                const nextFormat = format === 'jsonl' ? 'csv' : 'jsonl';
                core.globalConfig.logFormat = nextFormat;
                advance(1);
                assert.equal(WatchdogMock.snapshotLogFormat, nextFormat);
                monitor.stop();
            }
            core.globalConfig.logFormat = originalLogFormat;
        });
        await test.test('invalid options return false without starting monitoring', () => {
            for (const opt of [{ 'cpu': 0 }, { 'cpu': NaN }, { 'mem': -1 }, { 'eloop': 0 },
                { 'duration': 0 }, { 'blocked': 0 }]) {
                assert.equal(monitor.start(opt), false);
            }
        });
        await test.test('short CPU/memory bursts and alternating metrics do not confirm an incident', async () => {
            assert.equal(monitor.start({ 'mem': 100 }), true);
            advance(6, 100, 50);
            advance(6, 0, 150);
            advance(1);
            assert.equal((await readEvents()).length, 0);
            monitor.stop();
        });
        await test.test('periodic checks and wall-clock changes do not corrupt public CPU snapshots', () => {
            assert.equal(monitor.start({ 'mem': 100 }), true);
            monitor.getSnapshot();
            advance(2, 100);
            test.mock.timers.setTime(Date.now() + 3_600_000);
            advance(2, 0);
            assert.equal(monitor.getSnapshot().cpuProcess, 50);
            monitor.stop();
        });
        await test.test('sustained CPU creates evidence and includes a completed request without query credentials', async () => {
            assert.equal(monitor.start({ 'mem': 100 }), true);
            const id = monitor.track('/expensive?token=secret#fragment', 'POST');
            advance(4, 100);
            monitor.untrack(id);
            advance(6, 100);
            const recorded = await readEvents();
            assert.equal(recorded.length, 1);
            assert.deepEqual(recorded[0].reasons, ['PROC_CPU']);
            assert.equal(recorded[0].before.length, 10);
            assert.equal(recorded[0].diagnostics[0].status, 'skipped-busy');
            assert.equal(recorded[0].snapshot.recentRequests[0].url, '/expensive');
            advance(1);
            assert.equal((await readEvents())[0].endReason, 'recovered');
            monitor.stop();
        });
        await test.test('a second event inside the previous cooldown still gets its own record', async () => {
            assert.equal(monitor.start({ 'mem': 100, 'duration': 1_000 }), true);
            advance(1, 100);
            advance(1);
            advance(1, 100);
            advance(1);
            const recorded = await readEvents();
            assert.equal(recorded.length, 3);
            assert.equal(recorded.filter(event => event.endReason === 'recovered').length, 3);
            monitor.stop();
        });
        await test.test('a blocking window without watchdog proof retains a fallback diagnostic attempt', async () => {
            assert.equal(monitor.start({ 'mem': 100 }), true);
            clock += 8_000;
            cpuUser += 8_000_000;
            test.mock.timers.tick(1_000);
            const recorded = await readEvents();
            const blocked = recorded.find(event => event.reasons.includes('ELOOP_BLOCKED'));
            assert.ok(blocked);
            assert.equal(blocked.diagnostics[0].status, 'skipped-busy');
            assert.notEqual(blocked.diagnostics[0].status, 'watchdog-captured');
            monitor.stop();
            await readEvents();
        });
        await test.test('sustained memory survives diagnostic overhead and saves a redacted report', async () => {
            assert.equal(monitor.start({ 'mem': 100, 'duration': 1_000 }), true);
            Atomics.store(WatchdogMock.view, 2, 0n);
            advance(2, 0, 150);
            let recorded = await readEvents();
            let memory = recorded.find(event => event.reasons.includes('MEM'));
            assert.ok(memory);
            assert.equal(memory.diagnostics[0].status, 'complete');
            const reportFile = memory.diagnostics[0].files.find(file => file.includes('report-'));
            assert.ok(reportFile);
            const report = JSON.parse(await fs.readFile(reportFile, 'utf8')) as {
                'environmentVariables'?: unknown;
                'header': { 'commandLine': string[]; 'networkInterfaces'?: unknown; };
            };
            assert.equal(report.environmentVariables, undefined);
            assert.deepEqual(report.header.commandLine, []);
            assert.equal(report.header.networkInterfaces, undefined);
            advance(6, 0, 150);
            recorded = await readEvents();
            memory = recorded.find(event => event.reasons.includes('MEM'));
            assert.ok(memory);
            assert.equal(memory.endReason, null, 'diagnostic overhead must not close an ongoing memory event');
            advance(1);
            assert.equal((await readEvents()).find(event => event.reasons.includes('MEM'))?.endReason, 'recovered');
            monitor.stop();
        });
        await test.test('CPU recurrence during an ongoing memory event requests another diagnostic', async () => {
            assert.equal(monitor.start({ 'mem': 100, 'duration': 1_000 }), true);
            advance(2, 0, 150);
            advance(1, 100, 150);
            advance(1, 0, 150);
            const id = monitor.track('/second-cpu-phase', 'GET');
            advance(1, 100, 150);
            monitor.untrack(id);
            const recorded = await readEvents();
            const memory = recorded.filter(event => event.reasons.includes('MEM')).at(-1);
            assert.ok(memory);
            assert.equal(memory.diagnostics.length, 3);
            assert.equal(memory.endReason, null);
            assert.equal(memory.diagnostics[2].snapshot.activeRequests[0].url, '/second-cpu-phase');
            monitor.stop();
            await readEvents();
        });
        await test.test('recent request retention is bounded and stop clears request state', () => {
            assert.equal(monitor.start({ 'mem': 100 }), true);
            for (let i = 0; i < 120; ++i) {
                monitor.untrack(monitor.track(`/request/${i}`, 'GET'));
            }
            assert.equal(monitor.getSnapshot().recentRequests.length, 100);
            advance(61);
            assert.equal(monitor.getSnapshot().recentRequests.length, 0);
            monitor.stop();
            assert.equal(monitor.getSnapshot().activeCount, 0);
        });
    }
    finally {
        monitor.stop();
        core.globalConfig.logFormat = originalLogFormat;
        await readEvents();
        process.chdir(originalCwd);
        test.mock.restoreAll();
        test.mock.timers.reset();
        module.syncBuiltinESMExports();
        await fs.rm(directory, { 'recursive': true, 'force': true });
    }
});

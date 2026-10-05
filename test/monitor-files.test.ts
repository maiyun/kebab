import * as assert from 'node:assert/strict';
import * as cp from 'node:child_process';
import * as crypto from 'node:crypto';
import * as events from 'node:events';
import * as fs from 'node:fs/promises';
import * as http from 'node:http';
import * as os from 'node:os';
import * as path from 'node:path';
import * as nodeTest from 'node:test';
import * as timers from 'node:timers/promises';
import type { AddressInfo } from 'node:net';
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';
import * as lUndici from '#kebab/lib/undici.js';
import ExampleCtr from '#kebab/www/example/ctr/test.js';

/**
 * --- 启动使用临时配置的真实 master，max=0 不启动业务子进程，RPC 端口由系统分配 ---
 * @param directory 隔离的工作目录
 * @returns master 及端口；启动失败返回 false
 */
async function startMaster(directory: string): Promise<{ 'child': cp.ChildProcess; 'port': number; } | false> {
    const master = new URL('../sys/master.js', import.meta.url).href;
    const code = `
        const http = await import('node:http');
        const listen = http.Server.prototype.listen;
        http.Server.prototype.listen = function(...args) {
            this.on('request', (req, res) => res.once('close', () => {
                if (res.getHeader('x-kebab-monitor-file')) {
                    process.send({ type: 'file-close', name: res.getHeader('content-disposition'), finished: res.writableFinished });
                }
            }));
            this.once('listening', () => process.send({ port: this.address().port }));
            return listen.call(this, args[0], '127.0.0.1');
        };
        await import(${lText.stringifyJson(master)});
    `;
    const child = cp.spawn(process.execPath, ['--input-type=module', '-e', code], {
        'cwd': directory, 'stdio': ['ignore', 'ignore', 'pipe', 'ipc'],
    });
    let stderr = '';
    child.stderr?.on('data', (buffer: Buffer) => { stderr += buffer.toString(); });
    const port = await new Promise<number | false>((resolve) => {
        const timeout = setTimeout(() => { finish(false); }, 10_000);
        const onMessage = (message: { 'port'?: number; }): void => {
            if (typeof message.port === 'number') {
                finish(message.port);
            }
        };
        const onExit = (): void => { finish(false); };
        /**
         * @param result 启动结果
         * @returns 无返回值
         */
        function finish(result: number | false): void {
            clearTimeout(timeout);
            child.off('message', onMessage);
            child.off('exit', onExit);
            child.off('error', onExit);
            resolve(result);
        }
        child.on('message', onMessage);
        child.once('exit', onExit);
        child.once('error', onExit);
    });
    if (port === false) {
        child.kill();
        assert.fail(`temporary master did not start: ${stderr}`);
        return false;
    }
    return { child, port };
}

await nodeTest.test('monitor APIs read real master RPC data and serve previews and downloads', async (test) => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-monitor-rpc-'));
    const root = path.join(directory, 'log', 'monitor');
    const day = lTime.format(null, 'Y/m/d');
    const now = Date.now();
    const mainPath = `${day}/101500-pid-42-${now}`;
    const blockedPath = `${day}/101501-pid-42-${now + 1}-blocked`;
    const legacyPath = `${day}/100000-pid-42`;
    const stackPath = `${blockedPath}/blocked-stack-test.txt`;
    const profilePath = `${blockedPath}/blocked-cpu-test.cpuprofile`;
    const reportPath = `${mainPath}/report-test.json`;
    const heapPath = `${mainPath}/heap-large.heapsnapshot`;
    const abortPath = `${mainPath}/heap-abort.heapsnapshot`;
    const stack = 'blockingFunction (<script>alert("example")</script>:12:3)\n调用栈\n';
    const profile = '{"nodes":[],"startTime":0,"endTime":100}';
    const heap = Buffer.alloc(2 * 1024 * 1024, 65);
    const originalConfig = { ...lCore.globalConfig };
    let child: cp.ChildProcess | null = null;
    const demoServers: http.Server[] = [];
    try {
        for (const relative of [mainPath, blockedPath, legacyPath]) {
            await fs.mkdir(path.join(root, relative), { 'recursive': true });
        }
        const record = {
            'pid': 42, 'confirmedAt': now, 'endReason': 'recovered', 'reasons': ['PROC_CPU'],
            'samples': [{ 'cpu': 95, 'rss': 123_456 }],
            'diagnostics': [{ 'files': [path.join(root, stackPath), path.join(root, profilePath),
                path.join(directory, 'report-outside.json')] }],
        };
        await fs.writeFile(path.join(root, mainPath, 'event.json'), lText.stringifyJson(record));
        await fs.writeFile(path.join(root, blockedPath, 'blocked-event.json'), lText.stringifyJson({
            'pid': 42, 'time': now + 1, 'status': 'complete', 'samples': [],
        }));
        await fs.writeFile(path.join(root, reportPath), lText.stringifyJson({ 'memory': 123, 'note': '<script>example</script>' }));
        await fs.writeFile(path.join(root, stackPath), stack);
        await fs.writeFile(path.join(root, profilePath), profile);
        await fs.writeFile(path.join(root, heapPath), heap);
        await fs.writeFile(path.join(root, abortPath), '');
        await fs.truncate(path.join(root, abortPath), 64 * 1024 * 1024);
        await fs.writeFile(path.join(root, mainPath, 'private.json'), 'not a diagnostic file');
        await fs.writeFile(path.join(directory, 'report-outside.json'), 'outside monitor root');
        await fs.mkdir(path.join(directory, 'conf'));
        const secret = 'm'.repeat(32);
        await fs.writeFile(path.join(directory, 'conf', 'config.json'), lText.stringifyJson({
            'rpcPort': 0, 'rpcSecret': secret, 'max': 0, 'debug': false,
        }));
        const master = await startMaster(directory);
        assert.ok(master);
        child = master.child;
        lCore.globalConfig.rpcPort = master.port;
        lCore.globalConfig.rpcSecret = secret;
        lCore.globalConfig.hosts = ['localhost'];
        const closedFiles: Array<{ 'name': string; 'finished': boolean; }> = [];
        child.on('message', (message: { 'type'?: string; 'name': string; 'finished': boolean; }) => {
            if (message.type === 'file-close') {
                closedFiles.push(message);
            }
        });

        await test.test('default date, explicit host, descending pagination and invalid inputs', async () => {
            const result = await lCore.getMonitorEvents();
            assert.ok(result);
            assert.equal(result.total, 3);
            assert.equal(result.list[0].path, blockedPath);
            assert.equal(result.list[0].source, 'watchdog');
            assert.deepEqual(result.list[0].reasons, ['ELOOP_BLOCKED']);
            const page = await lCore.getMonitorEvents({ 'path': day, 'host': 'localhost', 'offset': 1, 'limit': 1 });
            assert.ok(page);
            assert.equal(page.total, 3);
            assert.equal(page.list[0].path, mainPath);
            assert.equal(page.list[0].status, 'recovered');
            assert.equal('samples' in page.list[0], false);
            assert.deepEqual(await lCore.getMonitorEvents({ 'path': '2000/01/01' }), { 'list': [], 'total': 0 });
            for (const opt of [{ 'path': '../conf' }, { 'offset': -1 }, { 'limit': 101 }, { 'limit': 0 }]) {
                assert.equal(await lCore.getMonitorEvents(opt), false);
            }
        });
        await test.test('event detail includes linked watchdog files and distinguishes missing events', async () => {
            const event = await lCore.getMonitorEvent({ 'path': mainPath, 'host': 'localhost' });
            assert.ok(event);
            assert.deepEqual(event.data, record);
            assert.equal(event.recordStatus, 'loaded');
            assert.ok(event.files.some(file => file.path === stackPath && file.preview === 'text'));
            assert.ok(event.files.some(file => file.path === reportPath && file.preview === 'json'));
            assert.ok(event.files.some(file => file.path === profilePath && file.preview === null));
            assert.ok(event.files.some(file => file.path === heapPath && file.preview === null));
            assert.equal(event.files.some(file => file.name === 'private.json' || file.name === 'report-outside.json'), false);
            assert.equal(await lCore.getMonitorEvent({ 'path': `${day}/235959-pid-99` }), null);
            assert.equal(await lCore.getMonitorEvent({ 'path': '/absolute/path' }), false);
        });
        await test.test('bounded previews preserve bytes and complex formats remain download-only', async () => {
            const report = await lCore.getMonitorFile({ 'path': reportPath, 'preview': true, 'host': 'localhost' });
            assert.ok(report);
            assert.deepEqual(await report.getJson(), { 'memory': 123, 'note': '<script>example</script>' });
            assert.equal(report.headers?.['cache-control'], 'no-store');
            const text = await lCore.getMonitorFile({ 'path': stackPath, 'preview': true });
            assert.ok(text);
            assert.equal(await text.getText(), stack);
            for (const relative of [profilePath, heapPath]) {
                assert.equal(await lCore.getMonitorFile({ 'path': relative, 'preview': true }), false);
            }
            const raw = await lCore.getMonitorFile({ 'path': profilePath });
            assert.ok(raw);
            assert.equal(raw.headers?.['content-type'], 'application/octet-stream');
            assert.equal(await raw.getText(), profile);
            assert.equal(await lCore.getMonitorFile({ 'path': `${mainPath}/report-missing.json` }), null);
        });
        await test.test('large raw downloads stream correctly and disconnects cancel file reads', async () => {
            const response = await lCore.getMonitorFile({ 'path': heapPath, 'host': 'localhost' });
            assert.ok(response);
            const body = response.getStream();
            assert.ok(body);
            const hash = crypto.createHash('sha256');
            let size = 0;
            for await (const buffer of body) {
                const bytes = buffer as Buffer;
                size += bytes.length;
                hash.update(bytes);
            }
            assert.equal(size, heap.length);
            assert.equal(hash.digest('hex'), crypto.createHash('sha256').update(heap).digest('hex'));
            const aborted = await lCore.getMonitorFile({ 'path': abortPath });
            assert.ok(aborted);
            const abortBody = aborted.getStream();
            assert.ok(abortBody);
            await events.once(abortBody, 'data');
            abortBody.destroy();
            for (let i = 0; i < 50 && !closedFiles.some(file => file.name.includes('heap-abort')); ++i) {
                await timers.setTimeout(20);
            }
            assert.ok(closedFiles.some(file => file.name.includes('heap-abort') && !file.finished));
            assert.ok(await lCore.getMonitorEvents());
        });
        await test.test('traversal, unknown files and symlinks cannot expose files outside the monitor root', async () => {
            const linked = `${day}/130000-pid-99`;
            await fs.symlink(directory, path.join(root, linked), 'dir');
            await fs.symlink(path.join(directory, 'report-outside.json'), path.join(root, mainPath, 'report-link.json'));
            for (const relative of [`${mainPath}/../../../report-outside.json`, `${mainPath}/private.json`,
                `${mainPath}/report-link.json`, `${linked}/report-outside.json`, `${mainPath}\\report-test.json`]) {
                assert.equal(await lCore.getMonitorFile({ 'path': relative }), false);
            }
            assert.equal(await lCore.getMonitorEvent({ 'path': linked }), false);
            const list = await lCore.getMonitorEvents();
            assert.ok(list);
            assert.equal(list.total, 3);
            await fs.rename(root, root + '-original');
            await fs.symlink(directory, root, 'dir');
            try {
                assert.equal(await lCore.getMonitorEvents(), false);
                assert.equal(await lCore.getMonitorFile({ 'path': reportPath }), false);
            }
            finally {
                await fs.unlink(root);
                await fs.rename(root + '-original', root);
            }
        });
        await test.test('legacy, corrupt and oversized records retain a file download path', async () => {
            const legacy = await lCore.getMonitorEvent({ 'path': legacyPath });
            assert.ok(legacy);
            assert.equal(legacy.recordStatus, 'missing');
            const file = path.join(root, legacyPath, 'event.json');
            await fs.writeFile(file, '{incomplete');
            const invalid = await lCore.getMonitorEvent({ 'path': legacyPath });
            assert.ok(invalid);
            assert.equal(invalid.recordStatus, 'invalid');
            assert.equal(invalid.data, null);
            await fs.truncate(file, 5 * 1024 * 1024);
            const large = await lCore.getMonitorEvent({ 'path': legacyPath });
            assert.ok(large);
            assert.equal(large.recordStatus, 'too-large');
            assert.equal(large.files[0].preview, null);
        });
        await test.test('RPC authentication failures are not mistaken for successful file downloads', async () => {
            lCore.globalConfig.rpcSecret = 'n'.repeat(32);
            assert.equal(await lCore.getMonitorFile({ 'path': reportPath }), false);
            assert.equal(await lCore.getMonitorEvents(), false);
            lCore.globalConfig.rpcSecret = secret;
        });
        await test.test('test.ts demonstrates usable preview/download links and rejects unconfigured hosts', async () => {
            const demo = http.createServer((req, res) => {
                (async () => {
                    const url = new URL(req.url ?? '/', 'http://localhost');
                    const ctr = new ExampleCtr({
                        'set': { 'cacheTtl': 0 }, 'const': {
                            'urlBase': '/example/', 'startTime': process.hrtime.bigint(), 'startMemory': process.memoryUsage.rss(),
                        },
                    } as unknown as kebab.IConfig, req, res);
                    ctr.setPrototype('_get', Object.fromEntries(url.searchParams));
                    let result: string | kebab.Json[] | false;
                    if (url.pathname.endsWith('/monitor-events')) {
                        result = await ctr.monitorEvents();
                    }
                    else if (url.pathname.endsWith('/monitor-event')) {
                        result = await ctr.monitorEvent();
                    }
                    else {
                        result = await ctr.monitorFile();
                    }
                    if (result !== false) {
                        res.end(Array.isArray(result) ? lText.stringifyResult(result) : result);
                    }
                })().catch(() => { res.destroy(); });
            });
            demoServers.push(demo);
            await new Promise<void>(resolve => { demo.listen(0, '127.0.0.1', resolve); });
            const address = demo.address() as AddressInfo;
            const url = `http://127.0.0.1:${address.port}`;
            const list = await lUndici.get(url + '/example/test/monitor-events?host=localhost');
            assert.match(await list.getText() ?? '', /monitor-event\?path=.*host=localhost/);
            const detail = await lUndici.get(url + '/example/test/monitor-event?' + lText.queryStringify({ 'path': mainPath }));
            const html = await detail.getText();
            assert.ok(html);
            assert.ok(html.includes('monitor-file?path='));
            const preview = await lUndici.get(url + '/example/test/monitor-file?' + lText.queryStringify({ 'path': stackPath, 'preview': '1' }));
            const previewHtml = await preview.getText();
            assert.ok(previewHtml);
            assert.ok(previewHtml.includes('&lt;script&gt;'));
            assert.equal(previewHtml.includes('<script>'), false);
            const download = await lUndici.get(url + '/example/test/monitor-file?' + lText.queryStringify({ 'path': profilePath }));
            assert.match(String(download.headers?.['content-disposition']), /attachment; filename="blocked-cpu-test.cpuprofile"/);
            assert.equal(await download.getText(), profile);
            const denied = await lUndici.getResponseJson(url + '/example/test/monitor-events?host=unconfigured.invalid');
            assert.equal(denied.result, 0);
        });
    }
    finally {
        for (const demo of demoServers) {
            demo.closeAllConnections();
            await new Promise<void>(resolve => { demo.close(() => { resolve(); }); });
        }
        if (child?.exitCode === null) {
            const exited = events.once(child, 'exit');
            child.kill();
            await exited;
        }
        for (const key of Object.keys(lCore.globalConfig)) {
            delete lCore.globalConfig[key];
        }
        Object.assign(lCore.globalConfig, originalConfig);
        await fs.rm(directory, { 'recursive': true, 'force': true });
    }
});

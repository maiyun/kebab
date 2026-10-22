import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import cluster from 'node:cluster';
import { EventEmitter, once } from 'node:events';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { Readable } from 'node:stream';
import * as masterLog from '../master-log.js';
import ts from 'typescript';

// Exercise the actual master functions without opening the application's RPC/listening ports.
const source = fs.readFileSync(new URL('../../sys/master.ts', import.meta.url), 'utf8');
const ast = ts.createSourceFile('master.ts', source, ts.ScriptTarget.Latest, true);
const program = ts.transpileModule(ast.statements
    .filter(node => !ts.isImportDeclaration(node) && !ts.isExpressionStatement(node))
    .map(node => node.getText(ast)).join('\n'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
}).outputText;
let exitHandler;
const run = ast.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'run');
function findExit(node) {
    if (ts.isCallExpression(node) && node.arguments[0]?.text === 'exit') exitHandler = node.arguments[1];
    ts.forEachChild(node, findExit);
}
findExit(run);
assert.ok(exitHandler, 'master exit recovery must be registered');
const exitRegistration = ts.transpileModule(`
    const onWorkerExit = ${exitHandler.getText(ast)};
    cluster.on('exit', onWorkerExit);
`, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
const tick = () => new Promise(resolve => setImmediate(resolve));
const deferred = () => {
    let resolve;
    const promise = new Promise(done => { resolve = done; });
    return { promise, resolve };
};
const vhostSource = fs.readFileSync(new URL('../master-vhost.ts', import.meta.url), 'utf8');
const vhostAst = ts.createSourceFile('master-vhost.ts', vhostSource, ts.ScriptTarget.Latest, true);
const vhostProgram = ts.transpileModule(vhostAst.statements
    .filter(node => !ts.isImportDeclaration(node))
    .map(node => node.getText(vhostAst).replace(/^export /, '')).join('\n'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
}).outputText;
function vhostStorage(overrides = {}) {
    const context = vm.createContext({ fs: { ...fs.promises, ...overrides }, path, lText: text });
    vm.runInContext(vhostProgram, context);
    return { replace: context.replace, isFiles: context.isFiles };
}
const routeSource = fs.readFileSync(new URL('../../sys/route.ts', import.meta.url), 'utf8');
const routeAst = ts.createSourceFile('route.ts', routeSource, ts.ScriptTarget.Latest, true);
const getPostSource = routeAst.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'getPost');
const text = {
    parseJson(value) { try { return JSON.parse(value); } catch { return false; } },
    stringifyJson: JSON.stringify,
    trimJson: value => value,
};
const postContext = vm.createContext({ Buffer, lText: text });
vm.runInContext(ts.transpileModule(getPostSource.getText(routeAst).replace(/^export /, ''), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
}).outputText, postContext);
let nextPid = 100;

class Worker extends EventEmitter {
    constructor(pid = ++nextPid) {
        super();
        this.id = pid ?? 0;
        this.connected = true;
        this.dead = false;
        this.sent = [];
        this.signals = [];
        this.process = {
            pid,
            kill: signal => {
                this.signals.push(signal);
                queueMicrotask(() => this.exit(null));
                return true;
            },
        };
    }
    isConnected() { return this.connected; }
    isDead() { return this.dead; }
    send(msg, callback) {
        this.sent.push(msg);
        if (this.failure) {
            this.connected = false;
            const error = Object.assign(new Error('Channel closed'), { code: 'ERR_IPC_CHANNEL_CLOSED' });
            if (this.failure === 'sync') throw error;
            process.nextTick(() => callback ? callback(error) : this.emit('error', error));
            return false;
        }
        process.nextTick(() => callback?.(null));
        return !this.backpressure;
    }
    listen() { this.emit('listening', {}); }
    exit(code = 0) {
        if (this.dead) return;
        this.dead = true;
        this.connected = false;
        this.emit('exit', code, null);
    }
}

function subject(runtimeCluster, globals = {}) {
    const planned = [];
    const created = [];
    const logs = [];
    const exitCodes = [];
    const fakeCluster = Object.assign(new EventEmitter(), {
        workers: {},
        fork() {
            const worker = planned.shift();
            assert.ok(worker, 'unexpected worker fork');
            created.push(worker);
            if (worker.process.pid) this.workers[worker.id] = worker;
            worker.on('listening', address => this.emit('listening', worker, address));
            worker.once('exit', (code, signal) => {
                delete this.workers[worker.id];
                this.emit('exit', worker, code, signal);
            });
            return worker;
        },
    });
    const core = {
        global: {},
        display: (...args) => logs.push(args),
        exec: async () => 'bound',
    };
    const fakeOs = { type: () => 'Windows_NT' };
    const context = vm.createContext({
        cluster: runtimeCluster ?? fakeCluster,
        os: fakeOs,
        lCore: core,
        masterLog, masterVhost: vhostStorage(), fs, path,
        ...globals,
        process: { exit: code => exitCodes.push(code) },
        setTimeout, clearTimeout,
    });
    vm.runInContext(program + exitRegistration, context, { filename: 'master.js' });
    const api = vm.runInContext(`({
        createChildProcess, createRpcListener, resolvePathInside, normalizeArchivePath, startFileWatcher,
        restartWorkers, checkWorkerLost, stopWorker, gracefulStop,
        dispose: () => cluster.removeListener('exit', onWorkerExit),
        get workers() { return workerList; }
    })`, context);
    return {
        ...api,
        workers: api.workers,
        created, logs, core, fakeOs, exitCodes,
        plan: worker => planned.push(worker),
        async create(cpu = 0, worker = new Worker()) {
            planned.push(worker);
            return api.createChildProcess(cpu);
        },
    };
}

function rpcSubject({ format = 'jsonl', chunks = [], readError } = {}) {
    let listener;
    const target = subject(undefined, {
        fs: { promises: { realpath: async value => value } },
        kebab: { LOG_CWD: '/fixture/log' },
        http: { createServer(callback) { listener = callback; return { listen() {} }; } },
        lCrypto: { aesDecrypt: value => value },
        lTime: { stamp: () => 100 },
        lText: {
            parseJson(value) { try { return JSON.parse(value); } catch { return false; } },
            stringifyJson: JSON.stringify,
        },
        lFs: {
            isFile: async () => true,
            createReadStream: () => Readable.from((async function* () {
                yield* chunks;
                if (readError) throw readError;
            })()),
        },
    });
    target.core.globalConfig = { rpcSecret: 'fixture', logFormat: format };
    target.core.exec = async () => assert.fail('log queries must not invoke shell commands');
    target.createRpcListener();
    target.rpc = async (msg = {}, overrides = {}) => {
        const done = deferred();
        const response = {
            statusCode: 200, headersSent: false, destroyed: false,
            writeHead(status) { this.statusCode = status; this.headersSent = true; },
            end(body) { this.body = body; done.resolve(); },
            destroy() { this.destroyed = true; done.resolve(); },
            ...overrides,
        };
        listener({ url: '/' + JSON.stringify({
            action: 'log', time: 100, hostname: 'fixture', path: '2026/10/21', ...msg,
        }) }, response);
        await done.promise;
        await tick();
        return response;
    };
    return target;
}

async function vhostSubject(t, overrides = {}) {
    const root = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'kebab-vhost-'));
    const directory = path.join(root, 'vhost');
    await fs.promises.mkdir(directory);
    const old = '{"domains":["old.example"],"root":"old/"}';
    await fs.promises.writeFile(path.join(directory, 'old.json'), old);
    let listener;
    const target = subject(undefined, {
        kebab: { VHOST_CWD: directory + '/' },
        masterVhost: vhostStorage(overrides),
        http: { createServer(callback) { listener = callback; return { listen() {} }; } },
        lCrypto: { aesDecrypt: value => value },
        lTime: { stamp: () => 100 },
        lText: text,
        sRoute: { getPost: postContext.getPost },
    });
    target.core.globalConfig = { rpcSecret: 'fixture' };
    const worker = new Worker();
    await target.create(0, worker);
    target.createRpcListener();
    t.after(async () => {
        target.dispose();
        await fs.promises.rm(root, { recursive: true, force: true });
    });
    return {
        ...target, root, directory, old, worker,
        async rpc(files, options = {}) {
            const request = Readable.from([Buffer.from(options.body ?? JSON.stringify(files))]);
            request.url = '/' + JSON.stringify({ action: 'vhost', time: options.time ?? 100 });
            request.method = options.method ?? 'POST';
            request.headers = { 'content-type': 'application/json' };
            const done = deferred();
            const response = {
                headersSent: false,
                writeHead() { this.headersSent = true; },
                end(body) { this.body = body; done.resolve(); },
                destroy() { done.resolve(); },
            };
            listener(request, response);
            await done.promise;
            request.destroy();
            assert.deepEqual(worker.sent, [], 'vhost updates must not reload or restart workers');
            return response.body;
        },
    };
}

const vhostContent = '{"domains":["new.example"],"root":"new/"}';

test('vhost RPC replaces all old files/subdirectories and preserves submitted JSON bytes', async t => {
    const target = await vhostSubject(t);
    await fs.promises.mkdir(path.join(target.directory, 'stale'));
    await fs.promises.writeFile(path.join(target.directory, 'stale', 'ignored.txt'), 'old');
    const files = {
        'new.json': ' \n' + vhostContent + '\n ',
        '站点.json': JSON.stringify([{ domains: ['*.example.com'], root: '${example}', name: '站点', remark: '测试' }]),
    };
    assert.equal(await target.rpc(files), 'Done');
    assert.deepEqual((await fs.promises.readdir(target.directory)).sort(), Object.keys(files).sort());
    for (const [name, content] of Object.entries(files)) {
        assert.equal(await fs.promises.readFile(path.join(target.directory, name), 'utf8'), content);
    }
    assert.deepEqual(await fs.promises.readdir(target.root), ['vhost']);
    assert.equal(await target.rpc(files), 'Done', 'repeating a full update is safe');
});

test('vhost RPC rejects invalid batches before touching the old directory', async t => {
    const target = await vhostSubject(t);
    const invalid = [
        {}, [], null, false, 'not a mapping',
        { '../escape.json': vhostContent },
        { '/absolute.json': vhostContent },
        { 'nested/file.json': vhostContent },
        { 'nested\\file.json': vhostContent },
        { 'drive:file.json': vhostContent },
        { 'null\0.json': vhostContent },
        { 'file.json\n': vhostContent },
        { 'file.txt': vhostContent },
        { 'a.json': vhostContent, 'A.json': vhostContent },
        { 'first.json': vhostContent, 'bad.json': 'not json' },
        { 'bad.json': {} },
        ...['null', 'true', '1', '"text"', '{}', '[null]', '[[{}]]',
            '{"domains":"*","root":"site/"}', '{"domains":[1],"root":"site/"}',
            '{"domains":[],"root":1}', '{"domains":[],"root":"site/","name":1}',
            '{"domains":[],"root":"site/","remark":false}']
            .map(value => ({ 'bad.json': value })),
    ];
    for (const files of invalid) {
        assert.equal(await target.rpc(files), 'Invalid vhost files', JSON.stringify(files));
        assert.equal(await fs.promises.readFile(path.join(target.directory, 'old.json'), 'utf8'), target.old);
        assert.deepEqual(await fs.promises.readdir(target.root), ['vhost']);
    }
    assert.equal(await target.rpc({}, { body: '{broken' }), 'Invalid vhost files');
    assert.equal(await target.rpc({ 'new.json': vhostContent }, { method: 'GET' }), 'Invalid method');
    assert.equal(await target.rpc({ 'new.json': vhostContent }, { time: 90 }), 'Timeout');
});

test('vhost RPC can create a missing directory', async t => {
    const target = await vhostSubject(t);
    await fs.promises.rm(target.directory, { recursive: true });
    assert.equal(await target.rpc({ 'new.json': vhostContent }), 'Done');
    assert.equal(await fs.promises.readFile(path.join(target.directory, 'new.json'), 'utf8'), vhostContent);
});

test('vhost RPC rejects a symlink or ordinary file as its target', async t => {
    const target = await vhostSubject(t);
    const outside = path.join(target.root, 'outside');
    await fs.promises.mkdir(outside);
    await fs.promises.writeFile(path.join(outside, 'keep.json'), target.old);
    await fs.promises.rm(target.directory, { recursive: true });
    await fs.promises.symlink(outside, target.directory, 'dir');
    assert.equal(await target.rpc({ 'new.json': vhostContent }), 'Invalid vhost directory');
    assert.deepEqual(await fs.promises.readdir(outside), ['keep.json']);
    await fs.promises.unlink(target.directory);
    await fs.promises.writeFile(target.directory, 'keep');
    assert.equal(await target.rpc({ 'new.json': vhostContent }), 'Invalid vhost directory');
    assert.equal(await fs.promises.readFile(target.directory, 'utf8'), 'keep');
});

test('vhost RPC preserves old files if staging a later file fails', async t => {
    let writes = 0;
    const target = await vhostSubject(t, {
        async writeFile(...args) {
            if (++writes === 2) throw new Error('disk full');
            return fs.promises.writeFile(...args);
        },
    });
    assert.equal(await target.rpc({ 'first.json': vhostContent, 'second.json': vhostContent }), 'Failed to replace vhost directory');
    assert.equal(await fs.promises.readFile(path.join(target.directory, 'old.json'), 'utf8'), target.old);
    assert.deepEqual(await fs.promises.readdir(target.root), ['vhost']);
});

test('vhost RPC restores the old directory after a failed switch and accepts a retry', async t => {
    let renames = 0;
    const target = await vhostSubject(t, {
        async rename(...args) {
            if (++renames === 2) throw new Error('rename failed');
            return fs.promises.rename(...args);
        },
    });
    assert.equal(await target.rpc({ 'new.json': vhostContent }), 'Failed to replace vhost directory');
    assert.equal(await fs.promises.readFile(path.join(target.directory, 'old.json'), 'utf8'), target.old);
    assert.deepEqual(await fs.promises.readdir(target.root), ['vhost']);
    assert.equal(await target.rpc({ 'new.json': vhostContent }), 'Done');
});

test('vhost RPC retains and identifies the backup if restoring the old directory also fails', async t => {
    let renames = 0;
    const target = await vhostSubject(t, {
        async rename(...args) {
            if (++renames > 1) throw new Error('rename failed');
            return fs.promises.rename(...args);
        },
    });
    const response = await target.rpc({ 'new.json': vhostContent });
    assert.ok(response.startsWith('Failed to restore vhost directory; backup: '));
    const backup = response.slice(response.indexOf('; backup: ') + '; backup: '.length);
    assert.equal(await fs.promises.readFile(path.join(backup, 'old.json'), 'utf8'), target.old);
});

test('vhost RPC serializes concurrent updates without mixing batches', async t => {
    const entered = deferred();
    const release = deferred();
    const writes = [];
    const target = await vhostSubject(t, {
        async writeFile(...args) {
            writes.push(path.basename(args[0]));
            if (writes.length === 1) {
                entered.resolve();
                await release.promise;
            }
            return fs.promises.writeFile(...args);
        },
    });
    const first = target.rpc({ 'first.json': vhostContent });
    await entered.promise;
    const second = target.rpc({ 'second.json': vhostContent });
    await tick();
    assert.deepEqual(writes, ['first.json']);
    release.resolve();
    assert.deepEqual(await Promise.all([first, second]), ['Done', 'Done']);
    assert.deepEqual(await fs.promises.readdir(target.directory), ['second.json']);
    assert.deepEqual(await fs.promises.readdir(target.root), ['vhost']);
});

test('CSV parsing preserves commas, escaped quotes, Unicode and empty fields', () => {
    assert.deepEqual(masterLog.parseCsvLine('"a,b","say ""你好""",,tail,'), ['a,b', 'say "你好"', '', 'tail', '']);
    assert.deepEqual(masterLog.parseCsvLine(''), ['']);
});

for (const format of ['jsonl', 'csv']) {
    test(`${format} log pagination and literal search share a chunk-safe scan`, async () => {
        const rows = format === 'jsonl'
            ? ['{"id":1,"text":"needle"}', '{"id":2,"text":"needle, quoted"}', '{"id":3,"text":"other"}']
            : ['1,needle', '2,"needle, quoted"', '3,other'];
        const content = (format === 'csv' ? 'id,needle\n' : '') + rows.join('\n') + '\n';
        const target = rpcSubject({ format, chunks: [content.slice(0, 5), content.slice(5, 22), content.slice(22)] });
        const expected = format === 'jsonl'
            ? [{ id: 1, text: 'needle' }, { id: 2, text: 'needle, quoted' }]
            : [['1', 'needle'], ['2', 'needle, quoted']];
        for (const [msg, list, total] of [
            [{ offset: 1, limit: 1 }, [expected[1]], 3],
            [{ search: 'needle', offset: 1, limit: 1 }, [expected[1]], 2],
            [{ search: 'missing' }, [], 0],
            [{ offset: 10 }, [], 3],
            [{ search: 'needle\nother', limit: 0 }, [expected[0]], 3],
            [{ search: 'needle\n', limit: 1 }, [expected[0]], 3],
        ]) {
            const response = await target.rpc(msg);
            assert.equal(response.statusCode, 200);
            assert.deepEqual(JSON.parse(response.body), { result: 1, list, total });
        }
    });

    test(`${format} log includes a final line without a newline`, async () => {
        const target = rpcSubject({ format, chunks: [format === 'csv' ? 'id,text\n1,last' : '{"id":1}'] });
        const response = await target.rpc();
        assert.deepEqual(JSON.parse(response.body), {
            result: 1, list: format === 'csv' ? [['1', 'last']] : [{ id: 1 }], total: 1,
        });
    });
}

test('malformed JSON preserves the existing searched and unsearched page boundaries', async () => {
    const target = rpcSubject({ chunks: ['broken\n{"id":1}\n{"id":2}\n'] });
    assert.deepEqual(JSON.parse((await target.rpc({ limit: 1 })).body), { result: 1, list: [{ id: 1 }], total: 3 });
    assert.deepEqual(JSON.parse((await target.rpc({ search: 'broken\nid', limit: 1 })).body), { result: 1, list: [], total: 3 });
});

test('log validation rejects invalid pagination/search and enforces the result limit', async () => {
    const target = rpcSubject({ chunks: ['{"id":1}\n'.repeat(1002)] });
    assert.equal((await target.rpc({ offset: -1 })).body, 'Invalid offset');
    assert.equal((await target.rpc({ search: 'x'.repeat(501) })).body, 'Invalid search');
    assert.equal((await target.rpc({ search: '\0' })).body, 'Invalid search');
    assert.equal(JSON.parse((await target.rpc()).body).list.length, 100);
    assert.equal(JSON.parse((await target.rpc({ limit: 2000 })).body).list.length, 1000);
});

test('log read failures terminate RPC with 500 instead of reporting an empty success', async () => {
    for (const search of [undefined, 'id']) {
        const error = Object.assign(new Error('disk failure'), { code: 'EIO' });
        const target = rpcSubject({ chunks: ['{"id":1}\n'], readError: error });
        const response = await target.rpc({ search });
        assert.equal(response.statusCode, 500);
        assert.equal(response.body, 'Failed');
        assert.equal(target.logs[0][1], error);
    }
});

test('RPC failure after headers destroys the response without writing another header', async () => {
    const target = rpcSubject({ readError: new Error('disk failure') });
    const response = await target.rpc({}, { headersSent: true, writeHead() { assert.fail('headers already sent'); } });
    assert.equal(response.destroyed, true);
    assert.equal(response.body, undefined);
});

test('path resolution allows missing descendants but rejects traversal and symlink escape', async t => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kebab-master-path-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    fs.mkdirSync(path.join(root, 'safe'));
    fs.symlinkSync(os.tmpdir(), path.join(root, 'outside'));
    const target = subject();
    assert.equal(await target.resolvePathInside(root, 'safe/new/file'), path.join(root, 'safe/new/file'));
    assert.equal(await target.resolvePathInside(root, '../escape'), null);
    assert.equal(await target.resolvePathInside(root, 'outside/new/file'), null);
});

test('path resolution only treats ENOENT as a missing path', async () => {
    for (const code of ['ENOENT', 'EACCES', 'EIO', 'ENOTDIR']) {
        const error = Object.assign(new Error(code), { code });
        const target = subject(undefined, { fs: { promises: { realpath: async value => {
            if (value === '/fixture') return value;
            throw error;
        } } } });
        assert.equal(await target.resolvePathInside('/fixture', 'new/file'), code === 'ENOENT' ? '/fixture/new/file' : null);
        assert.equal(target.logs.length, code === 'ENOENT' ? 0 : 1);
    }
});

test('archive normalization has one validation boundary for safe relative paths', () => {
    const target = subject();
    for (const value of ['foo/bar.txt', '/foo/bar.txt', '\\foo\\bar.txt']) {
        assert.equal(target.normalizeArchivePath(value), '/foo/bar.txt');
    }
    for (const value of ['', '/', 'a//b', 'a/', './a', 'a/../b', '../a', 'C:/a', 'a\0b']) {
        assert.equal(target.normalizeArchivePath(value), null, value);
    }
});

test('HMR reports directory scan and outer setup failures', async () => {
    const dirs = { WWW_CWD: '/www', IND_CWD: '/ind', LIB_CWD: '/lib', MOD_CWD: '/mod' };
    const error = Object.assign(new Error('disk failure'), { code: 'EIO' });
    const target = subject(undefined, {
        kebab: dirs,
        lFs: { isDir: async () => true },
        fs: { promises: { readdir: async () => { throw error; } }, watch: () => new EventEmitter() },
    });
    target.core.globalConfig = { debug: true };
    target.startFileWatcher();
    await tick();
    assert.equal(target.logs.filter(([message]) => message.startsWith('[HMR] Cannot scan directory:')).length, 4);
    const failed = subject(undefined, {
        kebab: dirs,
        lFs: { isDir: async () => { throw error; } },
    });
    failed.core.globalConfig = { debug: true };
    failed.startFileWatcher();
    await tick();
    assert.equal(failed.logs.filter(([message]) => message.startsWith('[HMR] Cannot watch directory:')).length, 4);
});

test('concurrent restart requests share one replacement and stop the old worker only after readiness', async () => {
    const target = subject();
    const old = await target.create();
    const replacement = new Worker();
    target.plan(replacement);
    const first = target.restartWorkers();
    const second = target.restartWorkers();
    assert.equal(first, second);
    await tick();
    assert.equal(target.created.length, 2);
    assert.equal(old.sent.length, 0);
    replacement.listen();
    await Promise.all([first, second]);
    assert.equal(old.sent.filter(msg => msg.action === 'stop').length, 1);
    assert.deepEqual(Object.keys(target.workers), [String(replacement.process.pid)]);
    old.exit(1);
    await tick();
    assert.equal(target.created.length, 2, 'retired-worker exit must not fork an extra replacement');
});

test('an old worker exiting during replacement neither crashes nor duplicates its CPU slot', async () => {
    const target = subject();
    const old = await target.create();
    const replacement = new Worker();
    target.plan(replacement);
    const pending = target.restartWorkers();
    await tick();
    old.exit(1);
    replacement.listen();
    await pending;
    await tick();
    assert.equal(target.created.length, 2);
    assert.equal(old.sent.length, 0, 'closed IPC must not be used');
    assert.deepEqual(Object.keys(target.workers), [String(replacement.process.pid)]);
});

test('heartbeat checks skip a running restart', async () => {
    const target = subject();
    const old = await target.create();
    target.workers[old.process.pid].hbtime -= 60_000;
    const replacement = new Worker();
    target.plan(replacement);
    const pending = target.restartWorkers();
    await tick();
    await target.checkWorkerLost();
    assert.equal(target.created.length, 2);
    assert.equal(old.sent.length, 0);
    replacement.listen();
    await pending;
});

test('restart waits for an in-flight heartbeat recovery and snapshots its replacement', async () => {
    const target = subject();
    const old = await target.create();
    target.workers[old.process.pid].hbtime -= 60_000;
    const recovered = new Worker();
    const replacement = new Worker();
    const gate = deferred();
    target.fakeOs.type = () => 'Linux';
    target.core.exec = () => gate.promise;
    target.plan(recovered);
    target.plan(replacement);
    const recovery = target.checkWorkerLost();
    const repeatedRecovery = target.checkWorkerLost();
    const restart = target.restartWorkers();
    await tick();
    assert.equal(target.created.length, 2);
    old.exit(1);
    recovered.listen();
    gate.resolve('bound');
    await Promise.all([recovery, repeatedRecovery]);
    await tick();
    assert.equal(target.created.length, 3);
    replacement.listen();
    await restart;
    await tick();
    assert.equal(old.sent.length, 1);
    assert.equal(recovered.sent.length, 1);
    assert.deepEqual(Object.keys(target.workers), [String(replacement.process.pid)]);
});

test('worker error listener is installed before CPU binding finishes', async () => {
    const target = subject();
    const gate = deferred();
    target.fakeOs.type = () => 'Linux';
    target.core.exec = () => gate.promise;
    const worker = new Worker();
    const pending = target.create(0, worker);
    assert.doesNotThrow(() => worker.emit('error', new Error('fixture IPC error')));
    gate.resolve('bound');
    await pending;
    assert.equal(target.logs.filter(args => String(args[0]).endsWith('error.')).length, 1);
});

test('full stop also waits for retired workers that are still draining', async () => {
    const target = subject();
    const old = await target.create();
    const replacement = new Worker();
    target.plan(replacement);
    const restart = target.restartWorkers();
    await tick();
    replacement.listen();
    await restart;
    assert.equal(target.workers[old.process.pid], undefined);
    let stopped = false;
    const stop = target.gracefulStop().then(() => { stopped = true; });
    assert.equal(old.sent.at(-1).waitForever, true);
    replacement.exit(0);
    await tick();
    assert.equal(stopped, false, 'master must wait for the retired worker too');
    old.exit(0);
    await stop;
    assert.deepEqual(target.exitCodes, [0]);
});

for (const failure of ['async', 'sync']) {
    test(`IPC ${failure} failure during stop is contained and falls back to SIGTERM`, async () => {
        const target = subject();
        const worker = new Worker();
        worker.failure = failure;
        await target.stopWorker(worker);
        assert.deepEqual(worker.signals, ['SIGTERM']);
        assert.equal(target.logs.length, 1);
    });
}

test('disconnected and dead workers are skipped; backpressure is not mistaken for send failure', async () => {
    const target = subject();
    const disconnected = new Worker();
    disconnected.connected = false;
    await target.stopWorker(disconnected);
    assert.equal(disconnected.sent.length, 0);
    assert.deepEqual(disconnected.signals, ['SIGTERM']);
    const dead = new Worker();
    dead.exit(0);
    await target.stopWorker(dead);
    assert.equal(dead.sent.length, 0);
    assert.equal(dead.signals.length, 0);
    const buffered = new Worker();
    buffered.backpressure = true;
    const stop = target.stopWorker(buffered);
    await tick();
    assert.equal(buffered.sent.length, 1);
    assert.equal(buffered.signals.length, 0);
    buffered.exit(0);
    await stop;
});

for (const msg of [
    { action: 'reload' },
    { action: 'global', key: 'fixture', data: 1 },
    { action: 'ws-broadcast', channel: 'fixture', data: 1 },
]) {
    test(`${msg.action} forwarding contains asynchronous recipient IPC failures`, async () => {
        const target = subject();
        const sender = await target.create(0);
        const recipient = await target.create(1);
        recipient.failure = 'async';
        sender.emit('message', msg);
        await tick();
        assert.equal(recipient.sent.length, 1);
        assert.equal(target.logs.length, 1);
        assert.equal(recipient.signals.length, 0);
    });
}

test('real Node IPC closing between connection check and send does not crash the master', async t => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kebab-master-ipc-'));
    const filename = path.join(dir, 'worker.cjs');
    fs.writeFileSync(filename, "setInterval(() => {}, 1000); process.send('ready');");
    const cp = fork(filename, [], { execArgv: [], stdio: ['ignore', 'ignore', 'ignore', 'ipc'] });
    t.after(() => {
        if (cp.exitCode === null && cp.signalCode === null) cp.kill();
        fs.rmSync(dir, { recursive: true, force: true });
    });
    await once(cp, 'message');
    const worker = new cluster.Worker({ id: 1, process: cp });
    cp.once('exit', (code, signal) => worker.emit('exit', code, signal));
    const send = worker.send.bind(worker);
    worker.send = (message, callback) => {
        cp.disconnect();
        return send(message, callback);
    };
    const exited = once(cp, 'exit');
    const target = subject();
    await target.stopWorker(worker);
    assert.deepEqual(await exited, [null, 'SIGTERM']);
    assert.equal(target.logs.length, 1);
    assert.equal(target.logs[0][1].code, 'ERR_IPC_CHANNEL_CLOSED');
});

test('real cluster coalesces restarts and drains an active HTTP request before retiring its worker', { timeout: 5000 }, async t => {
    // Fail before starting supervised workers when the sandbox forbids listening.
    await new Promise((resolve, reject) => {
        const probe = http.createServer();
        probe.once('error', reject);
        probe.listen(0, '127.0.0.1', () => probe.close(resolve));
    });
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kebab-master-cluster-'));
    const filename = path.join(dir, 'worker.cjs');
    fs.writeFileSync(filename, `
        const http = require('node:http');
        const server = http.createServer((req, res) => {
            if (req.url === '/slow') {
                process.send({ action: 'request-started' });
                setTimeout(() => res.end(String(process.pid)), 150);
                return;
            }
            res.end(String(process.pid));
        });
        process.on('message', msg => {
            if (msg.action === 'stop') server.close(() => process.exit(0));
        });
        server.listen(0, '127.0.0.1');
    `);
    const previous = { ...cluster.settings };
    const forked = [];
    const onFork = worker => forked.push(worker);
    cluster.on('fork', onFork);
    cluster.setupPrimary({ exec: filename, execArgv: [], args: [] });
    const target = subject(cluster);
    t.after(async () => {
        const stop = target.gracefulStop();
        for (const worker of Object.values(cluster.workers)) {
            if (worker && !worker.isDead()) worker.process.kill('SIGKILL');
        }
        await stop;
        target.dispose();
        cluster.removeListener('fork', onFork);
        cluster.setupPrimary({ ...previous, exec: previous.exec ?? process.argv[1] });
        fs.rmSync(dir, { recursive: true, force: true });
    });
    const listening = once(cluster, 'listening');
    const old = await target.createChildProcess(0);
    const [, address] = await listening;
    const request = route => new Promise((resolve, reject) => {
        http.get({ host: '127.0.0.1', port: address.port, path: route, agent: false }, res => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', chunk => { body += chunk; });
            res.on('end', () => resolve(body));
            res.on('error', reject);
        }).on('error', reject);
    });
    const started = once(old, 'message');
    const inFlight = request('/slow');
    await started;
    const retired = once(old, 'exit');
    await Promise.all([target.restartWorkers(), target.restartWorkers()]);
    assert.equal(forked.length, 2);
    const [entry] = Object.values(target.workers);
    assert.notEqual(entry.worker.process.pid, old.process.pid);
    assert.equal(await inFlight, String(old.process.pid));
    assert.deepEqual(await retired, [0, null]);
    assert.equal(await request('/'), String(entry.worker.process.pid));
    await target.gracefulStop();
    assert.equal(Object.keys(cluster.workers).length, 0);
    assert.deepEqual(target.exitCodes, [0]);
});

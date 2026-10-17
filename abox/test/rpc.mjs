import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = fs.readFileSync(process.env.RPC_SOURCE ?? new URL('../../lib/core.ts', import.meta.url), 'utf8');
const ast = ts.createSourceFile('core.ts', source, ts.ScriptTarget.Latest, true);
const cases = [
    ['sendReload', [], 'reload', 5],
    ['sendRestart', [], 'restart', 5],
    ['sendStop', [], 'stop', 5],
    ['sendPm2', ['service', 'restart'], 'pm2', 5],
    ['sendNpm', ['/fixture/'], 'npm', 330],
    ['setGlobal', ['fixture', { value: 1 }], 'global', 5],
    ['updateCode', ['/fixture.zip', '/app/'], 'code', 180],
    ['sendProject', ['/app/', 'staticVer', 'fixture'], 'project', 5],
    ['sendPackage', ['{"name":"fixture"}'], 'package', 5],
];
const hosts = ['node-a', 'node-b', 'node-c'];
const master = fs.readFileSync(new URL('../../sys/master.ts', import.meta.url), 'utf8');
const guard = master.match(/if \(\(typeof msg\.time !== 'number'\) \|\| \(Math\.abs\(msg\.time - time\) > 5\)\) \{\s*res\.end\('Timeout'\);\s*return;\s*\}/)?.[0];
assert.ok(guard, 'RPC replay window must remain enforced');

function subject(name) {
    const fn = ast.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === name);
    assert.ok(fn, name);
    const calls = [];
    const forms = [];
    const ipc = [];
    let now = 1000;
    function request(url, body, options) {
        const parsed = new URL(url);
        const msg = JSON.parse(Buffer.from(parsed.pathname.slice(1), 'base64url').toString());
        let rejected;
        vm.runInNewContext(`(() => { ${guard} })()`, {
            msg, time: now, Math, res: { end: value => { rejected = value; } },
        });
        let finish;
        const pending = new Promise(resolve => { finish = resolve; });
        calls.push({ host: parsed.hostname, msg, body, options, finish, rejected });
        // Simulate a delayed dispatch without waiting in real time.
        now += 6;
        return pending;
    }
    const context = vm.createContext({
        globalConfig: { hosts, rpcPort: 1234, rpcSecret: 'test-only' },
        lTime: { stamp: () => now },
        lText: { stringifyJson: JSON.stringify },
        lCrypto: { aesEncrypt: value => Buffer.from(value).toString('base64url') },
        lUndici: {
            get: (url, options) => request(url, undefined, options),
            post: request,
            getFormData: () => {
                const form = {
                    fields: {},
                    async putFile(key, path) { this.fields[key] = path; return true; },
                    putString(key, value) { this.fields[key] = value; },
                };
                forms.push(form);
                return form;
            },
        },
        process: { send: value => ipc.push(value) },
        console: { log() {} },
        debug() {},
    });
    vm.runInContext(ts.transpileModule(fn.getText(ast).replace('export ', ''), {
        compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
    }).outputText, context);
    return { run: (...args) => context[name](...args), calls, forms, ipc };
}

for (const [name, args, action, timeout] of cases) {
    test(`${name}: concurrent hosts, fresh signatures, isolated results and stable order`, async () => {
        const target = subject(name);
        const pending = target.run(...args, 'config');
        // updateCode prepares one independent upload stream per host first.
        for (let i = 0; i < 5; ++i) await Promise.resolve();
        assert.deepEqual(target.calls.map(call => call.host), hosts,
            'every host must start while the first request is still pending');
        assert.deepEqual(target.calls.map(call => call.msg.time), [1000, 1006, 1012]);
        for (const call of target.calls) {
            assert.equal(call.msg.action, action);
            assert.equal(call.options.timeout, timeout);
            assert.equal(call.rejected, undefined, 'each signature must pass the real master timestamp guard');
        }
        assert.notEqual(target.calls[0].options, target.calls[1].options);
        if (name === 'setGlobal') {
            for (const call of target.calls) {
                assert.equal(call.msg.key, 'fixture');
                assert.deepEqual(call.msg.data, { value: 1 });
            }
        }
        if (name === 'updateCode') {
            assert.equal(new Set(target.forms).size, hosts.length);
            for (const call of target.calls) assert.equal(call.body.fields.file, '/fixture.zip');
        }
        target.calls[2].finish({ getContent: async () => Buffer.from('Done') });
        target.calls[1].finish({ getContent: async () => null });
        target.calls[0].finish({ getContent: async () => Buffer.from('Done') });
        const result = await pending;
        assert.deepEqual(Object.keys(result), hosts);
        assert.equal(result['node-a'].result, true);
        assert.equal(result['node-b'].result, false);
        assert.equal(result['node-c'].result, true);
        assert.equal(target.calls.length, hosts.length, 'failed commands must not retry');
    });
}

for (const name of ['sendReload', 'sendRestart', 'sendStop']) {
    test(`${name}: omitted hosts still use local IPC`, async () => {
        const target = subject(name);
        const result = await target.run();
        assert.equal(result['127.0.0.1'].result, true);
        assert.equal(target.ipc.length, 1);
        assert.equal(target.calls.length, 0);
    });
}

const npmBegin = master.indexOf("case 'npm': {");
const npmEnd = master.indexOf("case 'project': {", npmBegin);
assert.ok(npmBegin > 0 && npmEnd > npmBegin);
const npmCase = ts.transpileModule(`async function run() {
    switch (msg.action) { ${master.slice(npmBegin, npmEnd)} }
}`, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;

for (const [label, duration, success, expected] of [
    ['success', 1000, true, [300000]],
    ['peer dependency fallback', 120000, false, [300000, 180000]],
    ['exhausted budget', 300000, false, [300000]],
]) {
    test(`npm execution budget: ${label}`, async () => {
        let now = 0;
        const calls = [];
        const context = vm.createContext({
            msg: { action: 'npm', path: '/fixture/' },
            Date: { now: () => now },
            lFs: { isDir: async () => true },
            lCore: { exec: async (command, options) => {
                calls.push({ command, options });
                if (calls.length === 1) {
                    now += duration;
                    return success ? 'Done' : false;
                }
                return 'Done';
            } },
            res: { end() {} },
        });
        vm.runInContext(npmCase, context);
        await context.run();
        assert.deepEqual(calls.map(call => call.options.timeout), expected);
    });
}

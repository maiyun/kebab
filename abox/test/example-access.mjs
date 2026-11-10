import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import ts from '../../node_modules/typescript/lib/typescript.js';
import * as text from '../../lib/text.js';
import * as frameworkFs from '../../lib/fs.js';
import { createPathGuard } from '../example.js';

const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-example-access-'));
try {
    const framework = path.join(root, 'framework');
    const example = path.join(framework, 'www/example');
    const sibling = path.join(framework, 'www/example-other');
    const business = path.join(root, 'business');
    for (const dir of [example, sibling, business]) {
        await fs.mkdir(path.join(dir, 'stc'), { recursive: true });
        await fs.writeFile(path.join(dir, 'kebab.json'), '{}');
        await fs.writeFile(path.join(dir, 'stc/file.txt'), 'fixture');
    }
    await fs.symlink(example, path.join(root, 'example-link'), 'dir');
    await fs.symlink(path.join(example, 'stc/file.txt'), path.join(business, 'example-file.txt'));
    const child = ts.createSourceFile('child.js', await fs.readFile(new URL('../../sys/child.js', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true);
    const functions = ['requestHandler', 'upgradeHandler', 'getVhostReal', 'getVhostByHostname', 'rejectExample'].map(name => {
        const declaration = child.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === name);
        assert.ok(declaration, `Missing ${name}`);
        return declaration.getText(child);
    }).join('\n');
    const state = { globalConfig: {}, calls: [], vhosts: [] };
    const lCore = {
        globalConfig: state.globalConfig,
        writeHead(res, status) { res.status = status; },
        log(...args) { if (args[2] !== '-visit') throw new Error(JSON.stringify(args)); },
    };
    const lFs = {
        ...frameworkFs,
        async readToResponse(candidate, req, res) { state.calls.push(['static', candidate]); res.end('static'); },
    };
    const kebab = { ROOT_PATH: `${framework}/`, WWW_CWD: `${root}/`, VER: 'test' };
    const handlers = new Function('lText', 'lCore', 'sCtr', 'lFs', 'sRoute', 'kebab', 'http', 'stopping', 'isExamplePath', 'vhosts', 'setTimeout',
        `${functions}\nreturn { requestHandler, upgradeHandler };`)(
        text, lCore, { isHttpRequestAvailable: () => false }, lFs,
        { async run(data) {
            state.calls.push(['route', data.rootPath, data.path]);
            return !data.path.endsWith('stc/file.txt') && !data.path.endsWith('example-file.txt');
        } },
        kebab, { ServerResponse: class {} }, false, createPathGuard(example), state.vhosts, () => ({}),
    );
    async function request({ vhost, url, debug, ws = false, authority = false }) {
        state.globalConfig.debug = debug;
        state.calls.length = 0;
        state.vhosts.splice(0, state.vhosts.length, { domains: ['example.test'], root: vhost });
        const req = { headers: authority ? { ':authority': 'example.test', host: 'ignored.test' } : { host: 'example.test' }, url };
        if (ws) {
            const socket = { ended: false, removeAllListeners() {}, end() { this.ended = true; } };
            await handlers.upgradeHandler(req, socket, false, Buffer.alloc(0));
            return { socket, calls: [...state.calls] };
        }
        const res = { setHeader() {}, end(body) { this.body = body; } };
        await handlers.requestHandler(req, res, false);
        return { res, calls: [...state.calls] };
    }
    const assertBlocked = result => {
        assert.equal(result.res?.status ?? (result.socket?.ended ? 403 : undefined), 403);
        assert.deepEqual(result.calls, []);
    };
    for (const debug of [false, undefined, 'true']) {
        for (const [vhost, url] of [['${example}', '/mproxy'], [example, '/stc/file.txt'], [framework, '/www/example/rproxy'], [root, '/example-link/test']]) {
            for (const ws of [false, true]) {
                await test(`closed: ${String(debug)} ${vhost} ${url} ${ws ? 'WS' : 'HTTP'}`, async () => {
                    assertBlocked(await request({ vhost, url, debug, ws, authority: !ws }));
                });
            }
        }
    }
    for (const [vhost, url, ws, call] of [
        ['${example}', '/mproxy', false, 'route'],
        [example, '/test', true, 'route'],
        [framework, '/www/example/stc/file.txt', false, 'static'],
        [example, '/stc/file.txt', false, 'static'],
        [path.join(root, 'example-link'), '/test', true, 'route'],
        [business, '/test', false, 'route'],
        [sibling, '/test', true, 'route'],
    ]) {
        const debug = vhost === business || vhost === sibling ? false : true;
        await test(`allowed: ${vhost} ${url} ${ws ? 'WS' : 'HTTP'}`, async () => {
            const result = await request({ vhost, url, debug, ws });
            assert.equal(result.calls.at(-1)?.[0], call);
            assert.equal(result.res?.status, undefined);
            assert.notEqual(result.socket?.ended, true);
        });
    }
    await test('debug changes take effect without recreating handlers', async () => {
        assertBlocked(await request({ vhost: '${example}', url: '/test', debug: false }));
        assert.equal((await request({ vhost: '${example}', url: '/test', debug: true })).calls[0]?.[0], 'route');
        assertBlocked(await request({ vhost: '${example}', url: '/test', debug: undefined }));
    });
    await test('HTTP Host also rejects the example', async () => {
        assertBlocked(await request({ vhost: '${example}', url: '/test', debug: false }));
    });
    await test('a business file symlink to an example file is rejected', async () => {
        const result = await request({ vhost: business, url: '/example-file.txt', debug: false });
        assert.equal(result.res.status, 403);
        assert.deepEqual(result.calls.map(call => call[0]), ['route']);
    });
}
finally {
    await fs.rm(root, { recursive: true, force: true });
}

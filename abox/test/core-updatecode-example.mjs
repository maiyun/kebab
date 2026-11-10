import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import JSZip from 'jszip';
import * as fixture from '../../www/example/abox/core-updatecode.js';
import * as text from '../../lib/text.js';

const source = await fs.readFile(new URL('../../www/example/ctr/test.js', import.meta.url), 'utf8');
const ast = ts.createSourceFile('test.js', source, ts.ScriptTarget.Latest, true);
const ctr = ast.statements.find(ts.isClassDeclaration);
const methods = ['index', 'coreUpdatecode'].map(name => {
    const method = ctr.members.find(member => member.name?.text === name);
    assert.ok(method);
    return method.getText(ast);
}).join('\n');

test('example overwrites isolated fixtures, renders clear links and never changes host files', async t => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-updatecode-example-'));
    t.after(() => fs.rm(root, { recursive: true, force: true }));
    await fs.mkdir(path.join(root, 'www'));
    await fs.mkdir(path.join(root, 'conf'));
    await fs.writeFile(path.join(root, 'www/lock.txt'), 'original');
    await fs.writeFile(path.join(root, 'conf/config.json'), '{"staticVer":"original"}');
    const dataPath = new URL('../../www/example/data/', import.meta.url).pathname;
    const calls = [];
    const context = vm.createContext({
        process: { version: 'test', execArgv: [] },
        kebab: { ROOT_CWD: root + '/' },
        prepareUpdatecodeTest: fixture.prepare,
        clearUpdatecodeTest: fixture.clear,
        lText: text,
        lCore: { ip: () => 'test', realIP: () => 'test', updateCode: async (zip, to, hosts, config, strict) => {
            calls.push(to);
            assert.equal(hosts, undefined);
            assert.equal(config, false);
            assert.equal(strict, true);
            assert.match(to, /^ftmp\/core-updatecode-[a-zA-Z0-9]{6}\/$/);
            const destination = path.join(root, to, 'www/lock.txt');
            assert.equal(await fs.readFile(destination, 'utf8'), 'Before updateCode test\n');
            const archive = await JSZip.loadAsync(await fs.readFile(zip));
            const payload = await archive.file('www/lock.txt').async('nodebuffer');
            await fs.writeFile(destination, payload);
            assert.deepEqual(await fs.readFile(destination), payload);
            return { local: { result: true, return: 'Done' } };
        } },
    });
    const Test = vm.runInContext(`(class { ${methods} })`, context);
    const controller = new Test();
    controller._config = { const: { dataPath, urlBase: '/', hostport: 0 }, set: {} };
    controller._headers = {};
    controller._get = {};
    controller._getEnd = () => 'end';
    assert.match(controller.index(), /test\/core-updatecode[^<]*<\/a> <a href="\/test\/core-updatecode\?action=clear">clear<\/a>/);
    for (let i = 0; i < 2; ++i) {
        const html = await controller.coreUpdatecode();
        assert.match(html, /Done/);
        assert.match(html, /test\/core-updatecode\?action=clear/);
    }
    assert.notEqual(calls[0], calls[1]);
    await fs.writeFile(path.join(root, 'ftmp/unrelated.txt'), 'keep');
    await fs.symlink(path.join(root, 'www'), path.join(root, 'ftmp/core-updatecode-ABCDEF'), 'dir');
    await fs.symlink(path.join(root, 'www'), path.join(root, calls[0], 'outside'), 'dir');
    controller._get = { action: 'clear' };
    assert.match(await controller.coreUpdatecode(), /Test files cleared/);
    assert.equal(calls.length, 2, 'clear must not call RPC');
    for (const directory of calls) await assert.rejects(fs.stat(path.join(root, directory)), { code: 'ENOENT' });
    assert.equal(await fs.readFile(path.join(root, 'www/lock.txt'), 'utf8'), 'original');
    assert.equal(await fs.readFile(path.join(root, 'conf/config.json'), 'utf8'), '{"staticVer":"original"}');
    assert.equal(await fs.readFile(path.join(root, 'ftmp/unrelated.txt'), 'utf8'), 'keep');
    assert.equal((await fs.lstat(path.join(root, 'ftmp/core-updatecode-ABCDEF'))).isSymbolicLink(), true);
    assert.match(await controller.coreUpdatecode(), /Test files cleared/);
});

test('preparation and cleanup report failures without sending RPC', async t => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-updatecode-failure-'));
    t.after(() => fs.rm(root, { recursive: true, force: true }));
    assert.equal(await fixture.clear(root), true);
    await fs.writeFile(path.join(root, 'ftmp'), 'not a directory');
    assert.equal(await fixture.prepare(root), false);
    assert.equal(await fixture.clear(root), false);
});

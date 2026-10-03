import * as assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as stream from 'node:stream/promises';
import * as nodeTest from 'node:test';

import * as lFs from '#kebab/lib/fs.js';

await nodeTest.describe('file helpers', async () => {
    let directory = '';
    const content = Buffer.from('Kebab 文件内容\n');

    nodeTest.before(async () => {
        directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'kebab-fs-'));
        await fs.promises.writeFile(path.join(directory, 'content.bin'), content);
    });

    nodeTest.after(async () => {
        if (directory !== '') {
            await fs.promises.rm(directory, { 'recursive': true, 'force': true });
        }
    });

    await nodeTest.test('full and partial reads honor encoding and return null for read failures', async () => {
        const file = path.join(directory, 'content.bin');
        assert.deepStrictEqual(await lFs.getContent(file), content);
        assert.strictEqual(await lFs.getContent(file, 'utf8'), content.toString('utf8'));
        assert.strictEqual(await lFs.getContent(file, { 'encoding': 'hex' }), content.toString('hex'));
        assert.deepStrictEqual(await lFs.getContent(file, { 'start': 0, 'end': 0 }), content.subarray(0, 1));
        assert.deepStrictEqual(await lFs.getContent(file, { 'start': 6 }), content.subarray(6));
        assert.deepStrictEqual(await lFs.getContent(file, { 'end': 4 }), content.subarray(0, 5));
        for (const encoding of ['utf8', 'hex', 'base64'] as const) {
            assert.strictEqual(await lFs.getContent(file, { encoding, 'start': 6, 'end': 11 }), content.subarray(6, 12).toString(encoding));
        }
        assert.strictEqual(await lFs.getContent(path.join(directory, 'missing')), null);
        assert.strictEqual(await lFs.getContent(path.join(directory, 'missing'), { 'start': 0 }), null);
        assert.strictEqual(await lFs.getContent(file, { 'start': -1 }), null);
        assert.strictEqual(await lFs.getContent(file, { 'start': 2, 'end': 1 }), null);
    });

    await nodeTest.test('stream options and directory listing retain their public behavior', async () => {
        const folder = path.join(directory, 'streams');
        assert.strictEqual(await lFs.mkdir(path.join(folder, 'z-dir')), true);
        assert.strictEqual(await lFs.mkdir(path.join(folder, 'z-dir')), true);
        const file = path.join(folder, 'a-file');
        const writer = lFs.createWriteStream(file, 'utf16le');
        writer.end('文件');
        await stream.finished(writer);
        assert.strictEqual(await lFs.getContent(file, 'utf16le'), '文件');
        const source = lFs.createReadStream(file, { 'start': 0, 'end': 1 });
        const chunks: Buffer[] = [];
        for await (const chunk of source as AsyncIterable<Buffer>) {
            chunks.push(chunk);
        }
        assert.deepStrictEqual(Buffer.concat(chunks), Buffer.from('文', 'utf16le'));
        assert.deepStrictEqual((await lFs.readDir(folder)).map((item) => item.name), ['z-dir', 'a-file']);
        assert.deepStrictEqual(await lFs.readDir(path.join(folder, 'missing')), []);
        assert.strictEqual(await lFs.isDir(file), false);
        assert.strictEqual(await lFs.isFile(folder), false);
    });

    await nodeTest.test('recursive deletion resolves child paths and leaves symlink targets intact', async () => {
        const external = path.join(directory, 'external');
        const tree = path.join(directory, 'delete-tree');
        await fs.promises.mkdir(external);
        await fs.promises.mkdir(path.join(tree, 'nested'), { 'recursive': true });
        await fs.promises.writeFile(path.join(external, 'keep.txt'), 'keep');
        await fs.promises.writeFile(path.join(tree, 'nested', 'child.txt'), 'delete');
        await fs.promises.symlink(external, path.join(tree, 'linked'));
        const rootLink = path.join(directory, 'root-link');
        await fs.promises.symlink(external, rootLink);
        assert.strictEqual(await lFs.rmdirDeep(rootLink), true);
        assert.strictEqual(await lFs.rmdirDeep(rootLink + '/'), true);
        assert.strictEqual((await fs.promises.lstat(rootLink)).isSymbolicLink(), true);
        assert.strictEqual(await lFs.rmdirDeep(tree), true);
        assert.strictEqual(await lFs.stats(tree), null);
        assert.strictEqual(await fs.promises.readFile(path.join(external, 'keep.txt'), 'utf8'), 'keep');
        assert.strictEqual(await lFs.rmdirDeep(tree), true);
    });

    await nodeTest.test('unlink retains four attempts and succeeds when a transient failure clears', async (test) => {
        let failures = 4;
        const error = new Error('Simulated file busy');
        const unlink = test.mock.method(fs.promises, 'unlink', () => {
            return failures-- > 0 ? Promise.reject(error) : Promise.resolve();
        });
        assert.strictEqual(await lFs.unlink('unused-test-path'), false);
        assert.strictEqual(unlink.mock.callCount(), 4);
        failures = 2;
        assert.strictEqual(await lFs.unlink('unused-test-path'), true);
        assert.strictEqual(unlink.mock.callCount(), 7);
    });
});

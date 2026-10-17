import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { Readable, PassThrough, Writable } from 'node:stream';
import ts from 'typescript';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kebab-formdata-'));
const source = fs.readFileSync(process.env.FORMDATA_SOURCE ?? new URL('../../sys/route.ts', import.meta.url), 'utf8');
const ast = ts.createSourceFile('route.ts', source, ts.ScriptTarget.Latest, true);
const functions = ast.statements.filter(node => ts.isFunctionDeclaration(node) &&
    ['getFormData', 'setInputValue'].includes(node.name?.text));
assert.equal(functions.length, 2);
const code = ts.transpileModule(functions.map(node => node.getText(ast).replace(/^export /, '')).join('\n'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
}).outputText;
let sequence = 0;
let checks = 0;
const boundary = 'kebab-test-boundary';

function body(content, filename = 'deploy.zip') {
    return Buffer.concat([
        Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: application/zip\r\n\r\n`),
        content,
        Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);
}

async function parse(data, limits = {}, options = {}) {
    const errors = [];
    const logs = [];
    const context = vm.createContext({
        Buffer, setTimeout, clearTimeout,
        kebab: { FTMP_CWD: root + '/' },
        lCore: { random: () => `test${++sequence}`, debug() {}, log(_ctx, message) { logs.push(message); } },
        lText: { stringifyError: error => String(error) },
        lFs: {
            unlink: name => fs.promises.unlink(name),
            createWriteStream: options.writeFailure ? () => new Writable({
                write(_chunk, _encoding, callback) {
                    setImmediate(() => callback(new Error('private filesystem error')));
                },
            }) : name => fs.createWriteStream(name),
        },
    });
    vm.runInContext(code, context);
    let req;
    if (options.pending || options.abort || options.requestError) {
        req = new PassThrough();
    }
    else {
        const chunks = [];
        const size = options.chunkSize ?? 137;
        for (let offset = 0; offset < data.length; offset += size) chunks.push(data.subarray(offset, offset + size));
        req = Readable.from(chunks, { objectMode: false });
    }
    req.headers = { 'content-type': options.contentType ?? `multipart/form-data; boundary=${boundary}` };
    const result = context.getFormData(req, { onerror(error) { errors.push(error); } }, limits);
    if (options.abort || options.requestError) {
        req.write(data.subarray(0, 250));
        setImmediate(() => req.destroy(options.requestError ? new Error('connection reset') : undefined));
    }
    let timer;
    const value = await Promise.race([
        result,
        new Promise((_resolve, reject) => { timer = setTimeout(() => reject(new Error('parser did not finish')), 1500); }),
    ]).finally(() => clearTimeout(timer));
    req.destroy();
    return { value, errors, logs };
}

async function failure(data, limits, code, options) {
    const result = await parse(data, limits, options);
    assert.equal(result.value, false);
    assert.equal(result.errors.length, 1);
    assert.equal(result.errors[0].code, code);
    assert.doesNotMatch(JSON.stringify(result.errors), /private filesystem|\.ftmp|stack/);
    ++checks;
    return result;
}

try {
    for (const chunkSize of [137, 65536]) {
        const tooLarge = await failure(body(Buffer.alloc(8192)), { maxFileSize: 1024 }, 'FILE_TOO_LARGE', { chunkSize });
        assert.equal(tooLarge.errors[0].limit, 1024);
        await new Promise(resolve => setTimeout(resolve, 20));
        assert.ok(!tooLarge.logs.some(message => message.includes('temporary file error')), 'intentional teardown must not produce a filesystem error');
    }
    const exact = await parse(body(Buffer.alloc(1024, 7)), { maxFileSize: 1024, allowedExts: ['.zip'] });
    assert.equal(exact.errors.length, 0);
    assert.equal(exact.value.files.file.size, 1024);
    assert.deepEqual(fs.readFileSync(exact.value.files.file.path), Buffer.alloc(1024, 7));
    fs.unlinkSync(exact.value.files.file.path);
    ++checks;
    await failure(body(Buffer.alloc(512), 'bad.txt'), { allowedExts: ['.zip'] }, 'FILE_TYPE');
    await failure(body(Buffer.alloc(8192)), { maxTotalSize: 1024 }, 'TOTAL_TOO_LARGE');
    await failure(body(Buffer.alloc(1)), { maxHeaderSize: 10 }, 'HEADER_TOO_LARGE', { chunkSize: 20 });
    await failure(body(Buffer.alloc(1)), { maxParts: 0 }, 'TOO_MANY_PARTS');
    const field = Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="value"\r\n\r\n${'x'.repeat(8192)}\r\n--${boundary}--\r\n`);
    await failure(field, { maxFieldSize: 100 }, 'FIELD_TOO_LARGE', { chunkSize: 137 });
    await failure(Buffer.alloc(0), { timeout: 10 }, 'TIMEOUT', { pending: true });
    await failure(body(Buffer.alloc(8192)), {}, 'REQUEST_ABORTED', { abort: true });
    await failure(body(Buffer.alloc(8192)), {}, 'REQUEST_ERROR', { requestError: true });
    await failure(body(Buffer.alloc(128)), {}, 'TEMP_FILE_ERROR', { writeFailure: true, chunkSize: 65536 });
    await failure(Buffer.alloc(0), {}, 'INVALID_BOUNDARY', { contentType: `multipart/form-data; boundary=${'a'.repeat(201)}` });
    await new Promise(resolve => setTimeout(resolve, 30));
    assert.deepEqual(fs.readdirSync(root), [], 'rejected uploads must leave no temporary files');
    console.log(`PASS: ${checks} multipart cases, first-error reporting, intentional teardown, backpressure, late write failure and cleanup`);
    fs.rmSync(root, { recursive: true, force: true });
    process.exit(0);
}
catch (error) {
    console.error(error);
    fs.rmSync(root, { recursive: true, force: true });
    process.exit(1);
}

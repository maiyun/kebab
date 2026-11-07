import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';

const previousCwd = process.cwd();
const root = await fs.mkdtemp(path.join(os.tmpdir(), 'kebab-request-security-'));
let checks = 0;
let exitCode = 0;

try {
    process.chdir(root);
    const [{ Ctr }, route, text] = await Promise.all([
        import('../../sys/ctr.js'),
        import('../../sys/route.js'),
        import('../../lib/text.js'),
    ]);
    const ctrUrl = new URL('../../sys/ctr.js', import.meta.url).href;
    await fs.mkdir(path.join(root, 'ctr'));
    await fs.mkdir(path.join(root, 'ftmp'));
    await fs.writeFile(path.join(root, 'package.json'), '{"type":"module"}');
    await fs.writeFile(path.join(root, 'kebab.json'), JSON.stringify({
        set: { cacheTtl: 0 }, session: { name: 'sid' }, route: {},
    }));
    await fs.writeFile(path.join(root, 'ctr/middle.js'), `
        import { Ctr } from ${JSON.stringify(ctrUrl)};
        export default class extends Ctr {}
    `);
    await fs.writeFile(path.join(root, 'ctr/demo.js'), `
        import { Ctr } from ${JSON.stringify(ctrUrl)};
        class BusinessController extends Ctr {
            inheritedAction() { return 'inherited action'; }
        }
        export default class extends BusinessController {
            onLoad() { this._res.hooks.push('load'); return true; }
            onReady() { this._res.hooks.push('ready'); return true; }
            onUnload(value) { this._res.hooks.push('unload'); return value; }
            index() { return 'index'; }
            normalAction() { return 'normal action'; }
            _privateAction() { return 'private'; }
        }
    `);

    async function request(action) {
        const requestPath = `demo/${action}`;
        const req = Readable.from([]);
        req.method = 'GET';
        req.headers = {};
        req.url = `/${requestPath}`;
        req.socket = { remoteAddress: '127.0.0.1' };
        const headers = new Map();
        const res = {
            statusCode: 200, headersSent: false, writableEnded: false, hooks: [],
            getHeader(name) { return headers.get(name.toLowerCase()); },
            setHeader(name, value) { headers.set(name.toLowerCase(), value); },
            writeHead(status) { this.statusCode = status; this.headersSent = true; },
            end(body) { this.body = body; this.writableEnded = true; },
        };
        await route.run({
            req, res, uri: text.parseUrl(`http://example.test/${requestPath}`),
            rootPath: root + '/', urlBase: '/', path: requestPath,
        });
        return res;
    }

    const internal = [
        'onLoad', 'onReady', 'onUnload', 'onReqStart', 'onUpgrade', 'onMessage',
        'onData', 'onDrain', 'onEnd', 'onClose', 'getPrototype', 'setPrototype',
        'getAuthorization', 'constructor', 'toString', 'valueOf', 'hasOwnProperty',
        '_privateAction',
    ];
    for (const action of new Set(internal.flatMap(name => [name, name.replace(/[A-Z]/g, c => '-' + c.toLowerCase())]))) {
        const response = await request(action);
        assert.equal(response.statusCode, 404, action);
        assert.deepEqual(response.hooks, [], `${action}: no target lifecycle side effects`);
        ++checks;
    }
    for (const [action, expected] of [
        ['index', 'index'], ['normalAction', 'normal action'],
        ['normal-action', 'normal action'], ['inherited-action', 'inherited action'],
    ]) {
        const response = await request(action);
        assert.equal(response.statusCode, 200, action);
        assert.equal(response.body, expected);
        assert.deepEqual(response.hooks, ['load', 'ready', 'unload']);
        ++checks;
    }

    const boundary = 'kebab-regression-boundary';
    for (const name of ['file', '__proto__', 'constructor', 'toString']) {
        const body = Buffer.from([
            `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\nfield-value\r\n`,
            ...['first', 'second'].map(value =>
                `--${boundary}\r\nContent-Disposition: form-data; name="${name}"; filename="${value}.txt"\r\n\r\n${value}\r\n`),
            `--${boundary}--\r\n`,
        ].join(''));
        const req = Readable.from([body]);
        req.headers = { 'content-type': `multipart/form-data; boundary=${boundary}` };
        const controller = new Ctr({ set: { cacheTtl: 0 } }, req);
        const files = controller.getPrototype('_files');
        const post = controller.getPrototype('_post');
        files.keep = [];
        post.keep = 'existing';
        assert.equal(await controller._handleFormData(), true);
        assert.equal(controller.getPrototype('_files'), files, 'preserve shared files reference');
        assert.equal(controller.getPrototype('_post'), post, 'preserve shared post reference');
        assert.equal(Object.getPrototypeOf(files), Object.prototype);
        assert.equal(Object.getPrototypeOf(post), Object.prototype);
        assert.equal(Object.hasOwn(files, name), true);
        assert.equal(Object.hasOwn(post, name), true);
        assert.equal(post[name], 'field-value');
        assert.equal(post.keep, 'existing');
        assert.equal(files[name].length, 2);
        assert.equal((await fs.readdir(path.join(root, 'ftmp'))).length, 2);
        await route.unlinkUploadFiles(controller);
        assert.deepEqual(await fs.readdir(path.join(root, 'ftmp')), []);
        ++checks;
    }

    const inheritedPath = path.join(root, 'ftmp', 'inherited.txt');
    await fs.writeFile(inheritedPath, 'not owned by this request');
    const files = Object.create({ unrelated: { path: inheritedPath } });
    await route.unlinkUploadFiles(files);
    assert.equal(await fs.readFile(inheritedPath, 'utf8'), 'not owned by this request');
    ++checks;
    console.log(`PASS: ${checks} request regressions; reserved actions, business actions, field preservation and upload cleanup`);
}
catch (error) {
    console.error(error);
    exitCode = 1;
}
finally {
    process.chdir(previousCwd);
    await fs.rm(root, { recursive: true, force: true });
}
process.exit(exitCode);

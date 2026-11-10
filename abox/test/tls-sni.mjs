import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const text = await fs.readFile(new URL('../../sys/child.js', import.meta.url), 'utf8');
const source = ts.createSourceFile('child.js', text, ts.ScriptTarget.Latest, true);
let callback;
ts.forEachChild(source, function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name.text === 'SNICallback') callback = node.initializer;
    ts.forEachChild(node, visit);
});
assert.ok(callback);
const cache = source.statements.find(node => ts.isVariableStatement(node) &&
    node.declarationList.declarations.some(item => item.name.getText(source) === 'certHostIndex'));
const reload = source.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'reloadCert');
assert.ok(cache && reload);

function subject() {
    const certificates = new Map();
    const create = new Function('certList', 'lCore', 'lFs', 'lText', 'kebab',
        cache.getText(source) + '\nlet certLastLoad = Date.now();\n' + reload.getText(source) +
        '\nreturn { callback: ' + callback.getText(source) + ', reloadCert };');
    const api = create(certificates, { display() {} }, { async getContent() { return '[]'; } },
        { parseJson: JSON.parse }, { CONF_CWD: '/fixture/' });
    return { ...api, certificates };
}

test('unknown SNI names including Object prototype keys return the normal certificate error', () => {
    const api = subject();
    for (const name of ['missing.example', 'constructor', '__proto__', 'toString', 'hasOwnProperty']) {
        let calls = 0;
        assert.doesNotThrow(() => api.callback(name, (error, context) => {
            calls++;
            assert.equal(error.message, 'CERT NOT FOUND');
            assert.equal(context, undefined);
        }));
        assert.equal(calls, 1);
    }
});

test('matching names are cached without colliding with prototype properties', () => {
    const api = subject();
    for (const name of ['site.example', 'constructor', '__proto__']) {
        const context = { name };
        let checked = 0;
        api.certificates.set(name, { sc: context, cert: { checkHost(host) { checked++; return host === name; } } });
        for (let i = 0; i < 2; i++) {
            api.callback(name, (error, value) => {
                assert.equal(error, null);
                assert.equal(value, context);
            });
        }
        assert.equal(checked, 1);
    }
});

test('certificate reload discards cached names for removed certificates', async () => {
    const api = subject();
    api.certificates.set('old', { sc: {}, cert: { checkHost: () => true } });
    api.callback('site.example', error => assert.equal(error, null));
    await api.reloadCert();
    assert.equal(api.certificates.size, 0);
    assert.doesNotThrow(() => api.callback('site.example', error => assert.equal(error.message, 'CERT NOT FOUND')));
});

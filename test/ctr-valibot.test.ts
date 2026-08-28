import * as assert from 'node:assert/strict';
import * as http from 'node:http';
import * as nodeTest from 'node:test';

import type * as v from 'valibot';
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as sCtr from '#kebab/sys/ctr.js';

const valibot = lCore.v;

class ValibotTestCtr extends sCtr.Ctr {

    public constructor() {
        super({
            'set': {
                'cacheTtl': 0,
            },
        } as unknown as kebab.IConfig, {} as http.IncomingMessage);
    }

    public valibot<const TSchema extends v.GenericSchema>(
        schema: TSchema,
        input: unknown,
        options?: sCtr.IValibotOptions<v.InferIssue<TSchema>>
    ): sCtr.TValibotResult<TSchema> {
        return this._valibot(schema, input, options);
    }

    public valibotx<const TSchema extends v.GenericSchema>(
        schema: TSchema,
        input: unknown,
        options?: sCtr.IValibotXOptions<v.InferIssue<TSchema>>
    ): sCtr.TValibotResult<TSchema, v.InferIssue<TSchema> | sCtr.IValibotXsrfIssue> {
        return this._valibotx(schema, input, options);
    }

    public setXsrf(token: string): void {
        this.setPrototype('_cookie', {
            'XSRF-TOKEN': token,
        });
    }

}

const inputSchema = valibot.strictObject({
    'title': valibot.pipe(valibot.string(), valibot.nonEmpty('Title is required.')),
    'count': valibot.pipe(valibot.string(), valibot.toNumber(), valibot.integer('Count must be an integer.')),
});

await nodeTest.test('_valibot returns schema-inferred output after successful parsing', () => {
    const ctr = new ValibotTestCtr();
    const result = ctr.valibot(inputSchema, {
        'title': 'Kebab',
        'count': '2',
    });

    assert.strictEqual(result.success, true);
    if (!result.success) {
        assert.fail('Expected Valibot parsing to succeed.');
    }

    /** --- 编译期同时验证 Valibot transform 后的 output 类型为 number --- */
    const count: number = result.output.count;
    assert.strictEqual(count, 2);
    assert.deepStrictEqual(result.output, {
        'title': 'Kebab',
        'count': 2,
    });
    assert.strictEqual(result.response, undefined);
});

await nodeTest.test('_valibot translates issues after the complete object path is available', () => {
    const ctr = new ValibotTestCtr();
    const result = ctr.valibot(inputSchema, {
        'title': '',
        'count': '2',
    }, {
        'translate': key => key,
        'response': issues => [422, 'Invalid input.', valibot.flatten(issues)],
    });

    assert.strictEqual(result.success, false);
    if (result.success) {
        assert.fail('Expected Valibot parsing to fail.');
    }

    assert.strictEqual(result.output, undefined);
    assert.strictEqual(result.issues[0].message, 'validation.title.non_empty');
    assert.strictEqual(result.response[0], 422);
    assert.strictEqual(result.response[1], 'Invalid input.');
    assert.deepStrictEqual(result.response[2], {
        'nested': {
            'title': ['validation.title.non_empty'],
        },
    });
});

await nodeTest.test('_valibot falls back to the locale key and original reason when translation is missing', () => {
    const ctr = new ValibotTestCtr();
    const result = ctr.valibot(inputSchema, {
        'title': '',
        'count': '2',
    }, {
        'translate': key => `[LocaleError]${key}`,
    });

    assert.strictEqual(result.success, false);
    if (result.success) {
        assert.fail('Expected Valibot parsing to fail.');
    }
    assert.strictEqual(result.issues[0].message, '[validation.title.non_empty] Title is required.');
    assert.deepStrictEqual(result.response, [0, '[validation.title.non_empty] Title is required.']);
});

await nodeTest.test('_valibot uses the first issue message as the default response', () => {
    const ctr = new ValibotTestCtr();
    const result = ctr.valibot(inputSchema, {
        'title': '',
        'count': '2',
    });

    assert.strictEqual(result.success, false);
    if (result.success) {
        assert.fail('Expected Valibot parsing to fail.');
    }
    assert.deepStrictEqual(result.response, [0, 'Title is required.']);
});

await nodeTest.test('_valibotx rejects XSRF before schema parsing and returns an XSRF issue', () => {
    const ctr = new ValibotTestCtr();
    ctr.setXsrf('expected-token');
    const result = ctr.valibotx(inputSchema, {
        'title': 'Kebab',
        'count': '2',
        '_xsrf': 'wrong-token',
    }, {
        'translate': key => key,
        'response': issues => [403, issues[0].message],
    });

    assert.strictEqual(result.success, false);
    if (result.success) {
        assert.fail('Expected XSRF parsing to fail.');
    }
    assert.strictEqual(result.issues[0].type, 'xsrf');
    assert.strictEqual(result.issues[0].message, 'validation._xsrf.xsrf');
    assert.deepStrictEqual(result.response, [403, 'validation._xsrf.xsrf']);
});

await nodeTest.test('_valibotx returns parsed output without the XSRF transport field', () => {
    const ctr = new ValibotTestCtr();
    ctr.setXsrf('expected-token');
    const result = ctr.valibotx(inputSchema, {
        'title': 'Kebab',
        'count': '2',
        '_xsrf': 'expected-token',
    });

    assert.strictEqual(result.success, true);
    if (!result.success) {
        assert.fail('Expected XSRF and Valibot parsing to succeed.');
    }
    assert.deepStrictEqual(result.output, {
        'title': 'Kebab',
        'count': 2,
    });
});

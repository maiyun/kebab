import * as assert from 'node:assert/strict';
import { getEventListeners } from 'node:events';
import { PassThrough, Readable } from 'node:stream';
import * as nodeTest from 'node:test';
import * as sdk from '@aws-sdk/client-s3';

import { S3, ESERVICE } from '#kebab/lib/s3.js';
import type { Ctr } from '#kebab/sys/ctr.js';

type Command = Parameters<sdk.S3Client['send']>[0];
interface ICall {
    'command': Command;
    'signal'?: AbortSignal;
}
type Handler = (call: ICall) => Promise<sdk.ServiceOutputTypes>;
const metadata = { 'httpStatusCode': 200 };

function success(command: Command): sdk.ServiceOutputTypes {
    if (command instanceof sdk.CreateMultipartUploadCommand) {
        return { '$metadata': metadata, 'UploadId': 'upload-1' };
    }
    if (command instanceof sdk.CompleteMultipartUploadCommand) {
        return { '$metadata': metadata, 'Bucket': command.input.Bucket,
            'Key': command.input.Key, 'Location': 'https://bucket.example/file' };
    }
    return { '$metadata': metadata, 'ETag': 'part-etag' };
}

/** --- 使用真实 Upload 分片实现，只替换 SDK 网络发送，禁止访问对象存储 --- */
function fixture(handler?: Handler) {
    const ctr = { 'getPrototype': () => ({}) } as unknown as Ctr;
    const storage = new S3(ctr, { 'service': ESERVICE.TENCENT, 'region': 'ap-test',
        'secretId': 'test', 'secretKey': 'test', 'bucket': 'default-bucket' });
    const client = (storage as unknown as Record<string, sdk.S3Client>)['_link'];
    const calls: ICall[] = [];
    const send = (async (command: Command, opt?: { 'abortSignal'?: AbortSignal; }) => {
        const call = { command, 'signal': opt?.abortSignal };
        calls.push(call);
        if (call.signal?.aborted) {
            return Promise.reject(new Error('request already cancelled'));
        }
        return handler ? handler(call) : success(command);
    }) as sdk.S3Client['send'];
    client.send = send;
    return { storage, client, calls, send };
}

await nodeTest.test('putObject preserves legacy calls, metadata and result shape', async () => {
    const { storage, client, calls } = fixture();
    try {
        const numeric = await storage.putObject('one.txt', Buffer.from('one'), 3, 'override-bucket');
        assert.notStrictEqual(numeric, false);
        assert.strictEqual(numeric && numeric.Bucket, 'override-bucket');
        assert.strictEqual(calls[0].signal, undefined);
        assert.strictEqual((calls[0].command as sdk.PutObjectCommand).input.ContentLength, 3);
        const options = await storage.putObject('two.txt', 'two', {
            'type': 'text/plain', 'disposition': 'attachment', 'bucket': 'option-bucket',
        });
        assert.notStrictEqual(options, false);
        assert.strictEqual(options && options.Bucket, 'option-bucket');
        assert.strictEqual((calls[1].command as sdk.PutObjectCommand).input.ContentType, 'text/plain');
        assert.strictEqual((calls[1].command as sdk.PutObjectCommand).input.ContentDisposition, 'attachment');
    }
    finally { client.destroy(); }
});

for (const size of [0, 1024, 6 * 1024 * 1024]) {
    await nodeTest.test('cancellable upload succeeds with ' + size + ' bytes', async () => {
        const { storage, client, calls, send } = fixture();
        const controller = new AbortController();
        try {
            const result = await storage.putObject('file', Readable.from([Buffer.alloc(size)]), {
                'signal': controller.signal, 'type': 'application/octet-stream', 'bucket': 'bucket',
            });
            assert.notStrictEqual(result, false);
            assert.strictEqual(result && result.Key, 'file');
            assert.ok(calls.every(call => call.signal === controller.signal));
            assert.strictEqual(client.send, send, 'do not mutate the shared S3 client');
            assert.strictEqual(getEventListeners(controller.signal, 'abort').length, 0);
            if (size > 5 * 1024 * 1024) {
                const parts = calls.filter(call => call.command instanceof sdk.UploadPartCommand);
                assert.strictEqual(parts.length, 2);
                const complete = calls.at(-1)?.command as sdk.CompleteMultipartUploadCommand;
                assert.deepStrictEqual(complete.input.MultipartUpload?.Parts?.map(part => part.PartNumber), [1, 2]);
            }
        }
        finally { client.destroy(); }
    });
}

await nodeTest.test('already aborted upload destroys the stream without sending any request', async () => {
    const { storage, client, calls } = fixture();
    const controller = new AbortController();
    const source = new PassThrough();
    controller.abort();
    try {
        assert.strictEqual(await storage.putObject('file', source, { 'signal': controller.signal }), false);
        assert.strictEqual(source.destroyed, true);
        assert.strictEqual(calls.length, 0);
    }
    finally { client.destroy(); }
});

await nodeTest.test('abort interrupts a stream that has not produced a chunk', { 'timeout': 2000 }, async () => {
    const { storage, client, calls } = fixture();
    const controller = new AbortController();
    const source = new PassThrough();
    try {
        const pending = storage.putObject('file', source, { 'signal': controller.signal });
        controller.abort();
        assert.strictEqual(await pending, false);
        assert.strictEqual(source.destroyed, true);
        assert.strictEqual(calls.length, 0);
        assert.strictEqual(getEventListeners(controller.signal, 'abort').length, 0);
    }
    finally { client.destroy(); }
});

for (const stage of ['PutObjectCommand', 'CreateMultipartUploadCommand', 'UploadPartCommand', 'CompleteMultipartUploadCommand']) {
    await nodeTest.test('abort reaches in-flight ' + stage + ' and finishes cleanup before returning',
        { 'timeout': 2000 }, async () => {
            const controller = new AbortController();
            let reached: () => void = () => undefined;
            const started = new Promise<void>(resolve => { reached = resolve; });
            let cleaned = false;
            const { storage, client, calls } = fixture(async call => {
                if (call.command.constructor.name === stage) {
                    assert.strictEqual(call.signal, controller.signal);
                    reached();
                    return new Promise((_resolve, reject) => {
                        call.signal?.addEventListener('abort', () => {
                            reject(new Error('cancelled'));
                        }, { 'once': true });
                    });
                }
                if (call.command instanceof sdk.AbortMultipartUploadCommand) {
                    assert.notStrictEqual(call.signal, controller.signal);
                    assert.strictEqual(call.signal?.aborted, false);
                    await new Promise<void>(resolve => setImmediate(resolve));
                    cleaned = true;
                }
                return success(call.command);
            });
            const source = Readable.from([Buffer.alloc(stage === 'PutObjectCommand' ? 1024 : 6 * 1024 * 1024)]);
            try {
                const pending = storage.putObject('file', source, { 'signal': controller.signal });
                await started;
                controller.abort();
                assert.strictEqual(await pending, false);
                assert.strictEqual(source.destroyed, true);
                assert.strictEqual(cleaned, ['UploadPartCommand', 'CompleteMultipartUploadCommand'].includes(stage));
                assert.ok(!calls.some(call => call.command instanceof sdk.DeleteObjectCommand));
                assert.strictEqual(getEventListeners(controller.signal, 'abort').length, 0);
            }
            finally { client.destroy(); }
        });
}

await nodeTest.test('complete failure cleans unfinished parts and returns false', async () => {
    const controller = new AbortController();
    const { storage, client, calls } = fixture(call =>
        call.command instanceof sdk.CompleteMultipartUploadCommand ?
            Promise.reject(new Error('complete failed')) : Promise.resolve(success(call.command)));
    try {
        const result = await storage.putObject('file', Buffer.alloc(6 * 1024 * 1024), { 'signal': controller.signal });
        assert.strictEqual(result, false);
        assert.ok(calls.at(-1)?.command instanceof sdk.AbortMultipartUploadCommand);
        assert.strictEqual(calls.at(-1)?.signal?.aborted, false);
        assert.ok(!calls.some(call => call.command instanceof sdk.DeleteObjectCommand));
    }
    finally { client.destroy(); }
});

await nodeTest.test('cancelling one upload leaves another upload on the same client unaffected', async () => {
    const { storage, client } = fixture();
    const controller = new AbortController();
    const stalled = new PassThrough();
    try {
        const pending = storage.putObject('cancelled', stalled, { 'signal': controller.signal });
        const other = storage.putObject('other', 'data');
        controller.abort();
        assert.strictEqual(await pending, false);
        assert.notStrictEqual(await other, false);
    }
    finally { client.destroy(); }
});

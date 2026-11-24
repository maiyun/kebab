/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2024-2-18 18:32:45
 * Last: 2024-2-18 18:32:47, 2024-3-16 16:42:27, 2024-5-31 21:36:26, 2024-7-8 00:28:42, 2024-7-19 11:32:43, 2025-6-10 21:45:34, 2025-12-5 23:42:59
 */

// --- 系统 ---
import * as stream from 'stream';
// --- 第三方 ---
import * as s3 from '@aws-sdk/client-s3';
import * as ls from '@aws-sdk/lib-storage';
// --- 库和定义 ---
import * as sCtr from '#kebab/sys/ctr.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';

/**
 * --- s3 文档：https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/ ---
 */

/** --- 服务商定义 --- */
export enum ESERVICE {
    'AMAZON',
    'TENCENT',
    'ALIBABA',
    'CF',
}

/** --- 选项 --- */
export interface IOptions {
    /** --- 服务商 ---- */
    'service': ESERVICE;
    /** --- cf r2 使用 --- */
    'account'?: string;
    /** --- 密钥键 --- */
    'secretId'?: string;
    /** --- 密钥值 --- */
    'secretKey'?: string;
    /** --- 区域 --- */
    'region'?: string;
    /** --- 预定义 bucket --- */
    'bucket'?: string;
}

/** --- 批量上传单项 --- */
export interface IPutObjectItem {
    /** --- 对象路径 --- */
    'key': string;
    /** --- 内容 --- */
    'content': string | Buffer | stream.Readable;
    /** --- contentLength，流模式需要设置 --- */
    'length'?: number;
    /** --- content-type，如 application/javascript --- */
    'type'?: string;
    /** --- content-disposition --- */
    'disposition'?: string;
    /** --- bucket 名，优先级高于 options.bucket --- */
    'bucket'?: string;
}

/** --- 批量上传选项 --- */
export interface IPutObjectsOptions {
    /** --- 并发数，默认 5 --- */
    'concurrency'?: number;
    /** --- bucket 名 --- */
    'bucket'?: string;
}

/** --- 批量上传单项结果 --- */
export interface IPutObjectsItemResult {
    /** --- 对象路径 --- */
    'key': string;
    /** --- 是否成功 --- */
    'success': boolean;
    /** --- 对象访问地址，成功时返回 --- */
    'location'?: string;
    /** --- 错误信息，失败时返回 --- */
    'error'?: string;
}

export class S3 {

    /** --- S3 客户端实例 --- */
    private readonly _link: s3.S3Client;

    /** --- bucket 名 --- */
    private _bucket: string = '';

    /** --- 所属控制器 --- */
    private readonly _ctr: sCtr.Ctr;

    public constructor(ctr: sCtr.Ctr, opt: IOptions) {
        this._ctr = ctr;
        const config = ctr.getPrototype('_config');
        const account = opt.account ?? config.s3?.[ESERVICE[opt.service]]?.account ?? '';
        const secretId = opt.secretId ?? config.s3?.[ESERVICE[opt.service]]?.sid ?? '';
        const secretKey = opt.secretKey ?? config.s3?.[ESERVICE[opt.service]]?.skey ?? '';
        const region = opt.region ?? config.s3?.[ESERVICE[opt.service]]?.region ?? '';
        this._bucket = opt.bucket ?? config.s3?.[ESERVICE[opt.service]]?.bucket ?? '';
        let endpoint: string | undefined;
        switch (opt.service) {
            case ESERVICE.TENCENT: {
                endpoint = `https://cos.${region}.myqcloud.com`;
                break;
            }
            case ESERVICE.ALIBABA: {
                endpoint = `https://oss-${region}.aliyuncs.com`;
                break;
            }
            case ESERVICE.CF: {
                endpoint = `https://${account}.r2.cloudflarestorage.com`;
                break;
            }
            default: {
                endpoint = undefined;
            }
        }
        this._link = new s3.S3Client({
            'region': region,
            'credentials': {
                'accessKeyId': secretId,
                'secretAccessKey': secretKey,
            },
            'endpoint': endpoint,
        });
    }

    /**
     * --- 修改预定义 bucket ---
     * @param bucket bucket 名
     */
    public setBucket(bucket: string): void {
        this._bucket = bucket;
    }

    /**
     * --- 上传对象，流内容可省略 length ---
     * @param key 对象路径
     * @param content 内容
     * @param length contentLength 或上传选项
     * @param bucket bucket 名
     * @returns 上传结果，失败或取消返回 false；传入 signal 时，返回前会尝试清理已知的未完成分片
     */
    public async putObject(
        key: string, content: string | Buffer | stream.Readable, length?: number | {
            /** --- contentLength，流内容可省略 --- */
            'length'?: number;
            /** --- content-type，如 application/javascript --- */
            'type'?: string;
            /** --- content-disposition，如 attachment --- */
            'disposition'?: string;
            /** --- bucket 名，省略时使用预定义 bucket --- */
            'bucket'?: string;
            /**
             * --- 取消上传请求并销毁输入流，等待已知的未完成分片清理后返回 false ---
             * --- 清理使用独立的 30 秒超时信号，失败时记录错误；不传则沿用原上传流程 ---
             * --- 不删除同名对象，上传完成与取消同时发生时，由调用方清理独立任务文件 ---
             */
            'signal'?: AbortSignal;
        }, bucket?: string
    ): Promise<s3.CompleteMultipartUploadCommandOutput | false> {
        // --- 解析上传参数 ---
        let type: string | undefined;
        let disposition: string | undefined;
        let signal: AbortSignal | undefined;
        if (typeof length !== 'number') {
            type = length?.type;
            disposition = length?.disposition;
            bucket = length?.bucket;
            signal = length?.signal;
            length = length?.length;
        }
        bucket ??= this._bucket;

        // --- 准备取消信号与未完成分片跟踪 ---
        const source = content instanceof stream.Readable ? content : undefined;
        const onAbort = (): void => {
            source?.destroy();
        };
        /** --- 尚未确认合并或清理完成的分片上传 ID，用于失败后的兜底清理 --- */
        let uploadId: string | undefined;
        let success = false;
        /** --- 分片清理请求的超时毫秒数 --- */
        const cleanupTimeout = 30_000;

        try {
            if (signal?.aborted) {
                return false;
            }
            signal?.addEventListener('abort', onAbort, { 'once': true });

            // --- 传入 signal 时创建独立客户端壳，避免修改共享实例的 send ---
            const client = signal ? Object.create(this._link) as s3.S3Client : this._link;
            if (signal) {
                // --- Upload.abort() 不会取消在途请求，这里逐条注入信号并跟踪分片 ID ---
                client.send = (async (command: Parameters<s3.S3Client['send']>[0]) => {
                    const isCleanup = command instanceof s3.AbortMultipartUploadCommand;
                    const res = await this._link.send(command, {
                        'abortSignal': isCleanup ? AbortSignal.timeout(cleanupTimeout) : signal,
                    });
                    if (command instanceof s3.CreateMultipartUploadCommand) {
                        uploadId = (res as s3.CreateMultipartUploadCommandOutput).UploadId;
                    }
                    else if (isCleanup || (command instanceof s3.CompleteMultipartUploadCommand)) {
                        uploadId = undefined;
                    }
                    return res;
                }) as s3.S3Client['send'];
            }

            // --- 执行分片上传 ---
            const upload = new ls.Upload({
                'client': client,
                'params': {
                    'Bucket': bucket,
                    'Key': key,
                    'Body': content,
                    'ContentLength': length,
                    'ContentType': type,
                    'ContentDisposition': disposition,
                },
            });
            const res = await upload.done();
            if (signal?.aborted || !res.Location || !res.Bucket || !res.Key) {
                return false;
            }
            success = true;
            return res;
        }
        catch (e: unknown) {
            if (!signal?.aborted) {
                lCore.log(this._ctr, `[LIB][S3][putObject] ${lText.stringifyError(e)}`, '-error');
            }
            return false;
        }
        finally {
            // --- 释放监听，并在失败或取消时兜底清理未完成分片 ---
            signal?.removeEventListener('abort', onAbort);
            if (signal && !success) {
                source?.destroy();
            }
            if (uploadId) {
                try {
                    await this._link.send(new s3.AbortMultipartUploadCommand({
                        'Bucket': bucket,
                        'Key': key,
                        'UploadId': uploadId,
                    }), { 'abortSignal': AbortSignal.timeout(cleanupTimeout) });
                }
                catch (e: unknown) {
                    lCore.log(this._ctr, `[LIB][S3][putObject][cleanup] ${lText.stringifyError(e)}`, '-error');
                }
            }
        }
    }

    /**
     * --- 批量上传对象，并发控制，单次失败不影响其他项 ---
     * @param items 上传项列表
     * @param options 批量上传选项
     */
    public async putObjects(
        items: IPutObjectItem[], options?: IPutObjectsOptions
    ): Promise<IPutObjectsItemResult[]> {
        const concurrency = options?.concurrency ?? 5;
        const sharedBucket = options?.bucket;
        const results: IPutObjectsItemResult[] = new Array(items.length);
        let cursor = 0;
        const worker = async (): Promise<void> => {
            while (cursor < items.length) {
                const i = cursor++;
                const item = items[i];
                const bucket = item.bucket ?? sharedBucket;
                const res = await this.putObject(
                    item.key,
                    item.content,
                    {
                        'length': item.length,
                        'type': item.type,
                        'disposition': item.disposition,
                    },
                    bucket
                );
                if (res) {
                    results[i] = {
                        'key': item.key,
                        'success': true,
                        'location': res.Location,
                    };
                }
                else {
                    results[i] = {
                        'key': item.key,
                        'success': false,
                        'error': 'upload failed',
                    };
                }
            }
        };
        // --- 按并发上限启动 worker 逐项上传 ---
        const workers = Array.from(
            { 'length': Math.min(concurrency, items.length) },
            () => worker()
        );
        await Promise.all(workers);
        return results;
    }

    /**
     * --- 获取对象流，可通过流获取 buffer 或 text ---
     * @param key 对象路径
     * @param bucket bucket 名
     */
    public async getObject(key: string, bucket?: string) {
        try {
            const go = new s3.GetObjectCommand({
                'Bucket': bucket ?? this._bucket,
                'Key': key
            });
            const r = await this._link.send(go);
            return r.Body;
        }
        catch (e: any) {
            lCore.log(this._ctr, '[LIB][S3][getObject] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
    }

    /**
     * --- 获取对象 Buffer ---
     * @param key 对象路径
     * @param bucket bucket 名
     * @returns 对象内容，获取失败或对象无内容时返回 false
     */
    public async getObjectBuffer(key: string, bucket?: string): Promise<Buffer | false> {
        try {
            const go = new s3.GetObjectCommand({
                'Bucket': bucket ?? this._bucket,
                'Key': key
            });
            const r = await this._link.send(go);
            if (!r.Body) {
                return false;
            }
            return Buffer.from(await r.Body.transformToByteArray());
        }
        catch (e: any) {
            lCore.log(this._ctr, '[LIB][S3][getObjectBuffer] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
    }

    /**
     * --- 删除对象 ---
     * @param key 对象路径
     * @param bucket bucket 名
     */
    public async deleteObject(key: string, bucket?: string): Promise<boolean> {
        try {
            const doc = new s3.DeleteObjectCommand({
                'Bucket': bucket ?? this._bucket,
                'Key': key
            });
            await this._link.send(doc);
            return true;
        }
        catch (e: any) {
            lCore.log(this._ctr, '[LIB][S3][deleteObject] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
    }

    /**
     * --- 批量删除对象 ---
     * @param keys 批量对象路径
     * @param bucket bucket 名
     */
    public async deleteObjects(keys: string[], bucket?: string): Promise<boolean> {
        try {
            const doc = new s3.DeleteObjectsCommand({
                'Bucket': bucket ?? this._bucket,
                'Delete': {
                    'Objects': keys.map((key) => ({ 'Key': key }))
                }
            });
            await this._link.send(doc);
            return true;
        }
        catch (e: any) {
            lCore.log(this._ctr, '[LIB][S3][deleteObjects] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
    }

    /**
     * --- 检测对象是否存在 ---
     * @param key 对象路径
     * @param bucket bucket 名
     */
    public async headObject(key: string, bucket?: string): Promise<s3.HeadObjectCommandOutput | false> {
        try {
            const ho = new s3.HeadObjectCommand({
                'Bucket': bucket ?? this._bucket,
                'Key': key
            });
            return await this._link.send(ho);
        }
        catch (e: any) {
            if (e.$metadata?.httpStatusCode !== 404) {
                lCore.log(this._ctr, '[LIB][S3][headObject] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            }
            return false;
        }
    }

    /**
     * --- 销毁连接，释放资源 ---
     * --- 一般会自动垃圾回收，但高频接口也可主动调用 ---
     */
    public destroy(): void {
        this._link.destroy();
    }

}

/**
 * --- 创建一个对象存储对象 ---
 * @param opt 选项
 */
export function get(ctr: sCtr.Ctr, opt: IOptions): S3 {
    return new S3(ctr, opt);
}

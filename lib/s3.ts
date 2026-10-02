/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2024-2-18 18:32:45
 * Last: 2024-2-18 18:32:47, 2024-3-16 16:42:27, 2024-5-31 21:36:26, 2024-7-8 00:28:42, 2024-7-19 11:32:43, 2025-6-10 21:45:34, 2025-12-5 23:42:59
 */

// --- 库和定义 ---
import * as stream from 'stream';
import * as s3 from '@aws-sdk/client-s3';
import * as ls from '@aws-sdk/lib-storage';
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

    private readonly _link: s3.S3Client;

    /** --- bucket 名 --- */
    private _bucket: string = '';

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
        /** --- 对象内容类型 --- */
        let type: string | undefined;
        /** --- 对象下载方式 --- */
        let disposition: string | undefined;
        /** --- 调用方传入的取消信号，仅作用于本次上传 --- */
        let signal: AbortSignal | undefined;
        if (typeof length !== 'number') {
            type = length?.type;
            disposition = length?.disposition;
            bucket = length?.bucket;
            signal = length?.signal;
            length = length?.length;
        }
        bucket ??= this._bucket;

        /** --- 输入流，传入 signal 时在取消或失败后停止读取；字符串与 Buffer 无需释放 --- */
        const source = content instanceof stream.Readable ? content : undefined;
        /**
         * --- 停止流读取，避免取消时仍阻塞在等待下一块数据的阶段 ---
         * @returns 无返回值
         */
        const onAbort = (): void => {
            source?.destroy();
        };
        /** --- 尚未确认合并或清理完成的分片上传 ID，用于失败后的兜底清理 --- */
        let uploadId: string | undefined;
        /** --- 是否取得有效上传结果，失败时需要释放输入流 --- */
        let success = false;
        /** --- 分片清理请求的超时毫秒数，避免清理阶段无限等待 --- */
        const cleanupTimeout = 30000;
        try {
            if (signal?.aborted) {
                return false;
            }
            signal?.addEventListener('abort', onAbort, { 'once': true });
            /** --- 本次上传的客户端入口，共享连接配置但不修改共享客户端的 send --- */
            const client = signal ? Object.create(this._link) as s3.S3Client : this._link;
            if (signal) {
                /**
                 * --- 为上传命令传递取消信号，并跟踪未完成的分片上传 ---
                 * --- Upload.abort() 会提前结束 done()，且不会取消正在发送的请求 ---
                 * --- 逐条命令传入信号，让 done() 等待分片任务和清理结束 ---
                 * @param command SDK 上传或分片清理命令；Upload 仅使用 send 的 Promise 调用形式
                 * @returns SDK 命令结果
                 */
                client.send = (async (command: Parameters<s3.S3Client['send']>[0]) => {
                    /** --- 清理请求必须使用独立信号，避免随上传请求一起取消 --- */
                    const isCleanup = command instanceof s3.AbortMultipartUploadCommand;
                    /** --- 命令成功后再更新分片 ID，失败时保留 ID 供 finally 重试清理 --- */
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
            /** --- SDK 上传任务，继续由 SDK 管理分片和并发 --- */
            const upload = new ls.Upload({
                'client': client,
                'params': {
                    'Bucket': bucket,
                    'Key': key,
                    'Body': content,
                    'ContentLength': length,
                    'ContentType': type,
                    'ContentDisposition': disposition,
                }
            });
            /** --- 上传结果；取消与上传完成同时发生时仍向调用方返回 false --- */
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
            signal?.removeEventListener('abort', onAbort);
            if (signal && !success) {
                source?.destroy();
            }
            // --- SDK 的合并失败分支不会清理分片；SDK 清理失败时也保留 ID，在这里兜底 ---
            // --- 只清理本次未完成的分片，不删除可能已存在的同名对象 ---
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

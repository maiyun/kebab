/**
 * Project: Kebab, User: Tang Rukun, JianSuoQiYue
 * Date: 2024-2-18 18:32:45
 * Last: 2024-2-18 18:32:47, 2024-3-16 16:42:27, 2024-5-31 21:36:26, 2024-7-8 00:28:42, 2024-7-19 11:32:43, 2025-6-10 21:45:34
 */

// --- 库和定义 ---
import * as s3 from '@aws-sdk/client-s3';
import * as ls from '@aws-sdk/lib-storage';
import * as stream from 'stream';
import * as sCtr from '#kebab/sys/ctr.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';

/** --- s3 的连接对象 --- */
const links: Array<{
    'token': string;
    'link': s3.S3Client;
}> = [];

/**
 * s3 文档：https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/
 */

/** --- 服务商定义 --- */
export enum ESERVICE {
    'AMAZON',
    'TENCENT',
    'ALIBABA',
    'CF'
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

export class S3 {

    private readonly _link;

    /** --- bucket 名 --- */
    private _bucket: string = '';

    private readonly _ctr: sCtr.Ctr;

    public constructor(ctr: sCtr.Ctr, opt: IOptions) {
        this._ctr = ctr;
        const config = ctr.getPrototype('_config');
        const account = config.s3?.[ESERVICE[opt.service]]?.account ?? '';
        const secretId = config.s3?.[ESERVICE[opt.service]]?.sid ?? '';
        const secretKey = config.s3?.[ESERVICE[opt.service]]?.skey ?? '';
        const region = config.s3?.[ESERVICE[opt.service]]?.region ?? '';
        this._bucket = config.s3?.[ESERVICE[opt.service]]?.bucket ?? '';
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
        const token = `${opt.service}-${account}-${secretId}-${region}`;
        const link = links.find((item) => item.token === token);
        if (link) {
            this._link = link.link;
            return;
        }
        this._link = new s3.S3Client({
            'region': region,
            'credentials': {
                'accessKeyId': secretId,
                'secretAccessKey': secretKey,
            },
            'endpoint': endpoint,
        });
        links.push({
            'token': token,
            'link': this._link,
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
     * --- 上传对象（可传流且也可无需设置 length） --
     * @param key 对象路径
     * @param content 内容
     * @param length 设置 contentLength，如果是流模式则需要设置此项，也可以设置为对象参数
     * @param bucket bucket 名
     */
    public async putObject(
        key: string, content: string | Buffer | stream.Readable, length?: number | {
            'length'?: number;
            'type'?: string;
            'disposition'?: string;
            'bucket'?: string;
        }, bucket?: string
    ): Promise<s3.CompleteMultipartUploadCommandOutput | false> {
        try {
            /** --- content type --- */
            let type: string | undefined = undefined;
            /** --- content disposition --- */
            let disposition: string | undefined = undefined;
            if (typeof length !== 'number') {
                type = length?.type;
                disposition = length?.disposition;
                bucket = length?.bucket;
                length = length?.length;
            }
            const upload = new ls.Upload({
                'client': this._link,
                'params': {
                    'Bucket': bucket ?? this._bucket,
                    'Key': key,
                    'Body': content,
                    'ContentLength': length,
                    'ContentType': type,
                    'ContentDisposition': disposition
                }
            });
            const res = await upload.done();
            return (res.Location && res.Bucket && res.Key) ? res : false;
        }
        catch (e: any) {
            lCore.log(this._ctr, '[S3][putObject] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            return false;
        }
    }

    /**
     * --- 获取对象流，可通过流获取 buffer 或 text ---
     * @param key 对象路径
     * @param bucket bucket 名
     */
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async getObject(key: string, bucket?: string) {
        try {
            const go = new s3.GetObjectCommand({
                'Bucket': bucket ?? this._bucket,
                'Key': key
            });
            const r = await this._link.send(go);
            return r.Body;
        }
        catch {
            // await lCore.log(this._ctr, '[getObject, s3] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
        catch {
            // await lCore.log(this._ctr, '[deleteObject, s3] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
            lCore.log(this._ctr, '[S3][deleteObjects] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
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
                lCore.log(this._ctr, '[S3][headObject] ' + lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""'), '-error');
            }
            return false;
        }
    }

}

/**
 * --- 创建一个对象存储对象 ---
 * @param opt 选项
 */
export function get(ctr: sCtr.Ctr, opt: IOptions): S3 {
    return new S3(ctr, opt);
}

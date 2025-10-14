/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-4-9 15:33:06
 * Last: 2020-4-12 11:12:03, 2022-09-10 12:43:23, 2022-12-25 15:12:57, 2023-9-26 14:20:41
 */
import * as hc from '@litert/http-client';
import * as stream from 'stream';
import * as lNet from '#kebab/lib/net.js';

export class Response {

    /** --- httpClient 请求对象 --- */
    private readonly _req: hc.IResponse | null = null;

    /** --- 返回的 headers --- */
    public headers: lNet.THttpHeaders | null = null;

    public error: Error | null = null;

    /** --- 用户自定义的 content 内容 --- */
    private _content: Buffer | null = null;

    public constructor(req: hc.IResponse | null) {
        this._req = req;
    }

    /**
     * --- 读取所有内容到内存 ---
     */
    public async getContent(): Promise<Buffer | null> {
        if (this._content) {
            return this._content;
        }
        return this._req ? this._req.getBuffer() : null;
    }

    /**
     * --- 用户自定义的 content 内容 ---
     * @param v 内容值
     */
    public setContent(v: string | Buffer): void {
        this._content = typeof v === 'string' ? Buffer.from(v) : v;
    }

    /**
     * --- 获取响应读取流对象 ---
     */
    public getStream(): stream.Readable | null {
        return this._req ? this._req.getStream() : null;
    }

    /**
     * --- 获取原生响应读取流对象 ---
     */
    public getRawStream(): stream.Readable | null {
        return this._req ? this._req.getRawStream() : null;
    }

}

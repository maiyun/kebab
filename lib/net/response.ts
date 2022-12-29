/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-4-9 15:33:06
 * Last: 2020-4-12 11:12:03, 2022-09-10 12:43:23, 2022-12-25 15:12:57
 */
import * as stream from 'stream';
import * as hc from '@litert/http-client';
import * as types from '~/types';

export class Response extends stream.Readable {

    /** --- httpClient 请求对象 --- */
    private readonly _req: hc.IResponse | null = null;

    /** --- readable 对象 --- */
    private _red: stream.Readable | null = null;

    /** --- 返回的 headers --- */
    public headers!: types.THttpHeaders;

    public error: Error | null = null;

    /** --- 用户自定义的 content 内容 --- */
    private _content: Buffer | null = null;

    public constructor(req: hc.IResponse | null) {
        super();
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
     * --- 间隔读取（on data 或 pipe 触发）---
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public _read(): void {
        if (this._req === null) {
            this.push(null);
            return;
        }
        if (this._red === null) {
            this._red = this._req.getStream();
        }
        this.push(this._red.read());
    }

}

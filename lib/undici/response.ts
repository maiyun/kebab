/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-4-9 15:33:06
 * Last: 2020-4-12 11:12:03, 2022-09-10 12:43:23, 2022-12-25 15:12:57, 2023-9-26 14:20:41
 */
import * as undici from 'undici';
import * as zlib from 'zlib';
import * as lUndici from '#kebab/lib/undici.js';
import * as lBuffer from '#kebab/lib/buffer.js';
import * as lText from '#kebab/lib/text.js';

export class Response {

    /** --- httpClient 请求对象 --- */
    private readonly _req: undici.Dispatcher.ResponseData | null = null;

    /** --- 返回的 headers --- */
    public headers: lUndici.THttpHeaders | null = null;

    public error: Error | null = null;

    /** --- 用户自定义的 content 内容 --- */
    private _content: Buffer | null = null;

    public constructor(req: undici.Dispatcher.ResponseData | null) {
        this._req = req;
    }

    /**
     * --- 读取所有内容到内存 ---
     */
    public async getContent(): Promise<Buffer | null> {
        if (this._content) {
            return this._content;
        }
        try {
            const stream = this.getStream();
            if (!stream) {
                return null;
            }
            return this._req ? await lBuffer.getFull(stream) : null;
        }
        catch {
            return null;
        }
    }

    /** --- 读取所有内容为文本 --- */
    public async getText(): Promise<string | null> {
        try {
            const buf = await this.getContent();
            if (!buf) {
                return null;
            }
            return buf.toString('utf-8');
        }
        catch {
            return null;
        }
    }

    /** --- 读取所有内容为 JSON --- */
    public async getJson(): Promise<any> {
        try {
            const text = await this.getText();
            if (!text) {
                return null;
            }
            return lText.parseJson(text);
        }
        catch {
            return null;
        }
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
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getStream() {
        try {
            // --- 要解压 ---
            if (!this._req || !this.headers) {
                return null;
            }
            const enc = this.headers['content-encoding'];
            if ((enc !== 'gzip') && (enc !== 'deflate') && (enc !== 'br')) {
                return this._req.body;
            }
            // --- gzip ---
            if (this.headers['content-encoding'] === 'gzip') {
                return this._req.body.pipe(zlib.createGunzip());
            }

            // --- deflate ---
            if (this.headers['content-encoding'] === 'deflate') {
                return this._req.body.pipe(zlib.createInflate());
            }

            // --- br ---
            if (this.headers['content-encoding'] === 'br') {
                return this._req.body.pipe(zlib.createBrotliDecompress());
            }
            // --- 不知道 ---
            return this._req.body;
        }
        catch {
            return null;
        }
    }

    /**
     * --- 获取原生响应读取流对象 ---
     */
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getRawStream() {
        return this._req ? this._req.body : null;
    }

}

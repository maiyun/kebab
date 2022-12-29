/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-04-07 23:45:03
 * Last: 2020-04-07 23:45:07, 2022-09-10 01:35:25
 */
import * as stream from 'stream';
import * as mime from '@litert/mime';
import * as core from '~/lib/core';
import * as fs from '~/lib/fs';

/** --- Item 对象 --- */
export interface IItem {
    /** --- key 键 --- */
    'key': string;
    'isFile': boolean;
    'isString': boolean;
    /** --- 值或者文件名 --- */
    'value': string;
    'path': string;
}

export class FormData extends stream.Readable {

    /** --- read 调用次数 --- */
    private _num: number = 0;

    /** --- 要编译的数据 --- */
    private readonly _data: IItem[] = [];

    /** --- 分隔符 --- */
    private readonly _boundary: string = '----Kebab' + core.random(29, core.RANDOM_LUN);

    /** --- 正在读取文件吗 --- */
    private _fileReading: boolean = false;

    /** --- 是否已经结束 --- */
    private _close: boolean = false;

    /** --- 总字节长度 --- */
    private _length: number = 4 + this._boundary.length;

    /** --- 已发送字节长度 --- */
    private _sent: number = 0;

    /**
     * --- 添加字符串 ---
     * @param key 键
     * @param val 值
     */
    public putString(key: string, val: string): void {
        this._data.push({
            'key': key,
            'isFile': false,
            'isString': true,
            'value': val,
            'path': ''
        });
        this._length += this._boundary.length + 49 + Buffer.byteLength(key) + Buffer.byteLength(val);
    }

    /**
     * --- 添加文件 ---
     * @param key 键
     * @param path 路径
     * @param fname 可选，文件名
     */
    public async putFile(key: string, path: string, fname?: string): Promise<boolean> {
        path = path.replace(/\\/g, '/');
        const stat = await fs.stats(path);
        if (!stat) {
            return false;
        }
        if (!fname) {
            const lio = path.lastIndexOf('/');
            fname = lio === -1 ? path : path.slice(lio + 1);
        }
        this._data.push({
            'key': key,
            'isFile': true,
            'isString': false,
            'value': fname,
            'path': path
        });
        this._length += this._boundary.length +
            76 + Buffer.byteLength(key) + Buffer.byteLength(fname) +
            mime.getMime(fname).length + stat.size + 2;
        return true;
    }

    /**
     * --- 获取 boundary ---
     */
    public getBoundary(): string {
        return this._boundary;
    }

    /**
     * --- 获取总字节长度 ---
     */
    public getLength(): number {
        return this._length;
    }

    /**
     * --- 获取已发送的字节长度 ---
     */
    public getSent(): number {
        return this._sent;
    }

    /**
     * --- 间隔读取（on data 或 pipe 触发）---
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public _read(): void {
        if (this._close) {
            // --- 结束了 ---
            this.push(null);
            return;
        }
        // --- 文件读取中 ---
        if (this._fileReading) {
            // --- 等待下面 fileReadable 的 on data 或 end 事件 ---
            return;
        }
        // --- 获取当前 item ---
        const item = this._data[this._num];
        if (!item) {
            this._close = true;
            const push = `--${this._boundary}--`;
            this._sent += Buffer.byteLength(push);
            this.push(push);
            return;
        }
        if (item.isString) {
            // --- 字段 ---
            const push = `--${this._boundary}\r\nContent-Disposition: form-data; name="${item.key}"\r\n\r\n${item.value}\r\n`;
            this._sent += Buffer.byteLength(push);
            this.push(push);
        }
        else {
            // --- 文件 ---
            const push = `--${this._boundary}\r\nContent-Disposition: form-data; name="${item.key}"; filename="${item.value}"\r\nContent-Type: ${mime.getMime(item.value)}\r\n\r\n`;
            this._sent += Buffer.byteLength(push);
            this.push(push);
            // --- 创建流 ---
            this._fileReading = true;
            const fileReadable = fs.createReadStream(item.path);
            fileReadable.on('data', (chunk: Buffer): void => {
                this._sent += Buffer.byteLength(chunk);
                this.push(chunk);
            });
            fileReadable.on('end', () => {
                this._fileReading = false;
                const push = '\r\n';
                this._sent += Buffer.byteLength(push);
                this.push(push);
            });
        }
        ++this._num;
    }

}

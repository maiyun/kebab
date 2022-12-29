/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-8 22:13
 * Last: 2020-4-10 16:08:32
 */
import * as ssh2 from 'ssh2';
import * as stream from 'stream';
import * as lSys from '~/lib/core';

export class Connection extends stream.Duplex {

    /** --- 连接对象 --- */
    private readonly _client: ssh2.ClientChannel;

    public constructor(stream: ssh2.ClientChannel) {
        super();
        this._client = stream;
    }

    /**
     * --- 发送指令 ---
     * @param cmd 指令
     * @param encoding 编码
     */
    public send(cmd: string | Buffer, encoding?: BufferEncoding): Promise<boolean> {
        return new Promise((resolve) => {
            this.write(cmd, encoding, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 发送带换行的内容（发送并执行） ---
     * @param cmd 指令
     * @param encoding 编码
     */
    public async sendLine(cmd: string, encoding?: BufferEncoding): Promise<boolean> {
        return this.send(cmd + '\n', encoding);
    }

    /**
     * --- 发送中断 ---
     */
    public async sendCtrlC(): Promise<boolean> {
        return this.send('\x03');
    }

    /**
     * --- 关闭 shell ---
     * @param cmd 命令
     * @param encoding 编码
     */
    public close(cmd?: string | Buffer, encoding?: BufferEncoding): Promise<void> {
        return new Promise((resolve) => {
            this.end(cmd, encoding, function() {
                resolve();
            });
        });
    }

    /**
     * --- 获取返回值 ---
     * @param tryCount 如果无知重试次数，1 次为 100 毫秒 ---
     */
    public async getContent(tryCount: number = 10): Promise<Buffer> {
        let nowCount: number = 0;
        let data: Buffer = Buffer.from('');
        while (true) {
            const r: Buffer | null = this._client.read();
            if (r !== null) {
                data = Buffer.concat([data, r], data.byteLength + r.byteLength);
                nowCount = 0;
            }
            else {
                ++nowCount;
                if (nowCount === tryCount) {
                    break;
                }
                await lSys.sleep(100);
            }
        }
        return data;
    }

    /**
     * --- 重写的 write 方法 ---
     * @param chunk 要发送的数据
     * @param encoding 编码
     * @param callback 回调
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public _write(chunk: string | Buffer, encoding?: BufferEncoding, callback?: (error?: Error | null) => void): void {
        this._client.write(chunk, encoding, callback);
    }

    /**
     * --- 重写的 read 方法 ---
     * @param size 读取长度
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public _read(size?: number): void {
        if (this._client.read() !== null) {
            this.push(this._client.read(size));
        }
    }

    /**
     * --- 用户调用 end 后触发的事件 ---
     * @param chunk 命令
     * @param encoding 编码
     * @param cb 回调
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public _final(chunk?: any, encoding?: BufferEncoding, cb?: () => void): void {
        console.log('[ABCABC]', chunk, encoding, cb);
        // --- TODO 检查参数 ---
        this._client.end(chunk, encoding, cb);
    }

}

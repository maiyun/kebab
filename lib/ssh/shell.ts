/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-8 22:13
 * Last: 2020-4-10 16:08:32, 2022-12-30 00:03:40, 2023-4-22 21:06:57
 */
import * as ssh2 from 'ssh2';
import * as lCore from '#kebab/lib/core.js';

export class Connection {

    /** --- 连接对象 --- */
    private readonly _client: ssh2.ClientChannel;

    public constructor(stream: ssh2.ClientChannel) {
        this._client = stream;
    }

    /**
     * --- 发送指令 ---
     * @param cmd 指令
     * @param encoding 编码
     */
    public send(cmd: string | Buffer, encoding?: BufferEncoding): Promise<boolean> {
        return new Promise((resolve) => {
            const cb = (e: any): void => {
                if (e) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            };
            if (encoding) {
                this._client.write(cmd, encoding, cb);
            }
            else {
                this._client.write(cmd, cb);
            }
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
     * --- 发送 Enter 键 ---
     */
    public async sendEnter(): Promise<boolean> {
        return this.send('\n');
    }

    /**
     * --- 发送 Tab 键 ---
     */
    public async sendTab(): Promise<boolean> {
        return this.send('\t');
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
            if (encoding) {
                this._client.end(cmd, encoding, () => {
                    resolve();
                });
            }
            else {
                this._client.end(cmd, () => {
                    resolve();
                });
            }
        });
    }

    /**
     * --- 获取返回值 ---
     * @param tryCount 如果无知重试次数，1 次为 10 毫秒 ---
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
                await lCore.sleep(10);
            }
        }
        return data;
    }

    /**
     * --- 获取响应读取流对象 ---
     */
    public getStream(): ssh2.ClientChannel {
        return this._client;
    }

}

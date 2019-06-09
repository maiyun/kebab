// --- 第三方 ---
import * as ssh2 from "ssh2";
// --- 库和定义 ---
import * as Sys from "~/lib/Sys";

export class Connection {

    /** --- 连接对象 --- */
    private _client!: ssh2.ClientChannel;

    /** --- 已读取数据 --- */
    private _data: Buffer = Buffer.from("");

    constructor(stream: ssh2.ClientChannel) {
        this._client = stream;
        this._client.on("data", (chunk: Buffer) => {
            this._data = Buffer.concat([this._data, chunk], this._data.length + chunk.length);
        });
    }

    /**
     * --- 发送一段内容 ---
     * @param chunk 要发送的内容
     */
    public write(chunk: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._client.write(chunk, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 发送带换行的内容（发送并执行） ---
     * @param chunk 要发送的内容
     */
    public writeLine(chunk: any): Promise<boolean> {
        return this.write(chunk + "\n");
    }

    /**
     * --- 读取返回的内容 ---
     */
    public async read(): Promise<Buffer> {
        let i = 0;
        while (this._data.length === 0 && i < 6) {
            await Sys.sleep(50);
            ++i;
        }
        if (this._data.length > 0) {
            let data = this._data;
            this._data = Buffer.from("");
            return data;
        }
        return this._data;
    }

    /**
     * --- 结束管道流 ---
     */
    public async end(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._client.end(function() {
                resolve();
            });
        });
    }

    /**
     * --- 发送中断 ---
     */
    public async sendCtrlC(): Promise<boolean> {
        return await this.write("\x03");
    }

}
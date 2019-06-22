import * as net from "net";
// --- 库和定义 ---
import * as Sys from "~/lib/Sys";

type Options = {
    host: string;
    port: number;
};

export class Socket {

    /** Socket 对象 */
    private _client: net.Socket;
    /** 获取到的数据 */
    private _data: Buffer = Buffer.from("");

    constructor(s: net.Socket) {
        this._client = s;
        this._client.on("data", (chunk: Buffer) => {
            this._data = Buffer.concat([this._data, chunk], this._data.length + chunk.length);
        });
    }

    /**
     * --- 发送数据 ---
     * @param buffer 要发送的数据
     */
    public write(buffer: Buffer | Uint8Array | string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._client.write(buffer, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
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
     * --- 断开此连接 ---
     */
    public disconnect() {
        return new Promise((resolve, reject) => {
            this._client.end(function() {
                resolve();
            });
        });
    }

}

/**
 * --- 创建 Socket 对象 ---
 * @param opt 选项
 */
export function get(opt: Options): Promise<Socket | undefined> {
    return new Promise(function(resolve, reject) {
        let s = new net.Socket();
        s.on("error", function() {
            resolve(undefined);
        }).connect(opt.port, opt.host, function() {
            resolve(new Socket(s));
        });
    });
}
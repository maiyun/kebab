import * as http from "http";
// --- 库和定义 ---
import * as Zlib from "../Zlib";
// --- 自己 ---
import * as A from "./Abstract";

/** 对象池 */
let _resList: A.NetResponse[] = [];

class NetHttp1Response implements A.NetResponse {

    private _res!: http.IncomingMessage;
    private _opt!: A.Options;
    private _config!: A.Config;

    public headers!: http.IncomingHttpHeaders;
    public httpVersion!: string;

    constructor(opt: A.Options, config: A.Config, res: http.IncomingMessage) {
        this.reset(opt, config, res);
    }

    /**
     * --- 释放连接到池子 ---
     */
    public release() {
        _resList.push(this);
    }

    /**
     * --- 重置配置信息 ---
     */
    public reset(opt: A.Options, config: A.Config, res: http.IncomingMessage) {
        this._res = res;
        this._opt = opt;
        this._config = config;
        this.headers = res.headers;
        this.httpVersion = res.httpVersion;
    }

    /**
     * --- 读取所有内容到内存 ---
     */
    public readContent(): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            let data: Buffer = Buffer.from("");
            if (this._opt.encoding) {
                this._res.setEncoding(this._opt.encoding);
            }
            this._res.on("data", function(chunk: Buffer) {
                data = Buffer.concat([data, chunk], data.length + chunk.length);
            });
            this._res.on("end", async () => {
                let encoding = this.headers["content-encoding"] || "";
                if (encoding !== "") {
                    let buf = (await Zlib.decompress(encoding, data)).buf;
                    if (buf) {
                        resolve(buf);
                    } else {
                        resolve(Buffer.from(""));
                    }
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * --- 绑定到输入流 ---
     * @param destination 输入流
     */
    public pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T {
        let encoding = this.headers["content-encoding"] || "";
        if (encoding !== "") {
            let decompress = Zlib.createDecompress(encoding);
            if (decompress) {
                return this._res.pipe(decompress.obj).pipe(destination, options);
            } else {
                return this._res.pipe(destination, options);
            }
        } else {
            return this._res.pipe(destination, options);
        }
    }
}

/** new 或从对象池获取对象 */
export function get(opt: A.Options, config: A.Config, res: http.IncomingMessage): A.NetResponse {
    if (_resList[0]) {
        let ress = _resList[0];
        _resList.splice(0, 1);
        ress.reset(opt, config, res);
        return ress;
    }
    return new NetHttp1Response(opt, config, res);
}
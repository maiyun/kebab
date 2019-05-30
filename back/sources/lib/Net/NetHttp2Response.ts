import * as http2 from "http2";
// --- 库和定义 ---
import * as Zlib from "../Zlib";
// --- 自己 ---
import * as A from "./Abstract";

/** --- 对象池 --- */
let _resList: A.NetResponse[] = [];

class NetHttp2Response implements A.NetResponse {

    private _req!: http2.ClientHttp2Stream;
    private _opt!: A.Options;
    private _config!: A.Config;

    public headers!: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader;
    public httpVersion: string = "2.0";

    constructor(opt: A.Options, config: A.Config, req: http2.ClientHttp2Stream) {
        this._req = req;
        this._opt = opt;
        this._config = config;
        this.headers = config.headers || {};
        this.httpVersion = "2.0";
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
    public reset(opt: A.Options, config: A.Config, req: http2.ClientHttp2Stream) {
        this._req = req;
        this._opt = opt;
        this._config = config;
        this.headers = config.headers || {};
        this.httpVersion = "2.0";
    }

    /**
     * --- 读取所有内容到内存 ---
     */
    public readContent(): Promise<string> {
        return new Promise((resolve, reject) => {
            let data: Buffer = Buffer.from("");
            if (this._opt.encoding) {
                this._req.setEncoding(this._opt.encoding);
            }
            this._req.on("data", function(chunk: Buffer) {
                data = Buffer.concat([data, chunk], data.length + chunk.length);
            });
            this._req.on("end", async () => {
                let encoding = this.headers["content-encoding"] || "";
                if (encoding !== "") {
                    let buf = (await Zlib.decompress(encoding, data)).buf;
                    if (buf) {
                        resolve(buf.toString());
                    } else {
                        resolve("");
                    }
                } else {
                    resolve(data.toString());
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
                return this._req.pipe(decompress.obj).pipe(destination, options);
            } else {
                return this._req.pipe(destination, options);
            }
        } else {
            return this._req.pipe(destination, options);
        }
    }
}

export function get(opt: A.Options, config: A.Config, req: http2.ClientHttp2Stream): A.NetResponse {
    if (_resList[0]) {
        let ress = _resList[0];
        _resList.splice(0, 1);
        ress.reset(opt, config, req);
        return ress;
    }
    return new NetHttp2Response(opt, config, req);
}
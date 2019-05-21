import * as http from "http";
// --- 库和定义 ---
import * as Zlib from "../Zlib";
// --- 自己 ---
import * as A from "./Abstract";

export default class NetHttp1Response implements A.NetResponse {

    private _res!: http.IncomingMessage;
    private _opt!: A.Options;
    private _config!: A.Config;

    public readonly headers!: http.IncomingHttpHeaders;
    public readonly httpVersion!: string;

    constructor(opt: A.Options, config: A.Config, res: http.IncomingMessage) {
        this._res = res;
        this._opt = opt;
        this._config = config;
        this.headers = res.headers;
        this.httpVersion = res.httpVersion;
    }

    /**
     * --- 读取所有内容到内存 ---
     */
    public readContent(): Promise<string> {
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
                return this._res.pipe(decompress.obj).pipe(destination, options);
            } else {
                return this._res.pipe(destination, options);
            }
        } else {
            return this._res.pipe(destination, options);
        }
    }

}
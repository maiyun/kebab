import * as http from "http";
import * as https from "https";
import * as url from "url";
// --- 库和定义 ---
import * as Fs from "../lib/Fs";
import * as Const from "../const";

let _ca: string = "";

export interface Options {
    url: string;
    method?: "GET" | "POST";
    encoding?: string;
    timeout?: number;
}

class Response {

    private _res!: http.IncomingMessage;
    private _opt!: Options;
    constructor(opt: Options, res: http.IncomingMessage) {
        this._res = res;
        this._opt = opt;
        this.headers = res.headers;
        this.httpVersion = res.httpVersion;
    }

    public readonly headers!: http.IncomingHttpHeaders;
    public readonly httpVersion!: string;

    /**
     * --- 读取所有内容到内存 ---
     */
    public readContent(): Promise<string> {
        return new Promise((resolve, reject) => {
            let data: any[] = [];
            if (this._opt.encoding) {
                this._res.setEncoding(this._opt.encoding);
            }
            this._res.on("data", function(chunk) {
                data.push(chunk);
            });
            this._res.on("end", function() {
                resolve(data.join(""));
            });
        });
    }

    /**
     * --- 绑定到输入流 ---
     * @param destination 输入流
     */
    public pipe<T extends NodeJS.WritableStream>(destination: T): T {
        return this._res.pipe(destination);
    }

}

/**
 * --- 发起一个 get 请求 ---
 * @param url 请求的 URL
 * @param opt 参数
 */
export async function get(url: string, opt?: Options): Promise<Response> {
    let opt2 = {
        url: url
    };
    if (opt) {
        Object.assign(opt2, opt);
    }
    return await request(opt2);
}

/**
 * --- 发起一个请求 ---
 * @param opt 配置项
 */
export async function request(opt: Options): Promise<Response> {
    return new Promise(async function(resolve, reject) {
        if (_ca === "") {
            _ca = await Fs.readFile(Const.LIB_PATH + "Net/cacert.pem") || "";
        }
        let uri = url.parse(opt.url);
        let isSecure = uri.protocol === "http:" ? false : true;
        let protocol = isSecure ? https : http;
        let client = protocol.request({
            hostname: uri.hostname,
            port: uri.port || (isSecure ? 443 : 80),
            path: uri.path,
            method: opt.method || "GET",
            ca: isSecure ? _ca : undefined
        }, function(res: http.IncomingMessage): void {
            resolve(new Response(opt, res));
        });
        client.end();
    });
}
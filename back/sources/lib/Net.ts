import * as http from "http";
import * as https from "https";
import * as http2 from "http2";
import * as url from "url";
import * as querystring from "querystring";
// --- 第三方 ---
import * as mime from "@litert/mime-types";
// --- 库和定义 ---
import * as Fs from "../lib/Fs";
import * as Text from "../lib/Text";
import * as Const from "../const";
// --- 自己 ---
import NetHttp1Response from "./Net/NetHttp1Response";
import NetHttp2Response from "./Net/NetHttp2Response";
import * as A from "./Net/Abstract";

/** ca 根证书内容 */
let _ca: string = "";

/**
 * --- 发起一个 get 请求 ---
 * @param url 请求的 URL
 * @param opt 参数
 */
export async function get(url: string, opt?: A.Options): Promise<A.NetResponse | undefined> {
    let opt2: A.Options = {
        url: url
    };
    if (opt) {
        Object.assign(opt2, opt);
    }
    return await request(opt2);
}

/**
 * --- 发起一个 post 请求 ---
 * @param url 请求的 RUL
 * @param data 要发送的数据（值由 @ 开头则是上传文件）
 * @param opt 参数
 */
export async function post(url: string, data: any, opt?: A.Options): Promise<A.NetResponse | undefined> {
    let opt2: A.Options = {
        url: url,
        method: "POST",
        data: data
    };
    if (opt) {
        Object.assign(opt2, opt);
    }
    return await request(opt2);
}

/** host 对应的 HTTP level 版本缓存 */
let _HTTP_LEVEL: any = {};
/**
 * --- 发起一个请求 ---
 * @param opt 配置项
 */
export async function request(opt: A.Options): Promise<A.NetResponse | undefined> {
    if (_ca === "") {
        _ca = await Fs.readFile(Const.LIB_PATH + "Net/cacert.pem") || "";
    }
    // --- 定义基础头部 ---
    opt.headers = opt.headers || {};
    opt.headers["Accept-Encoding"] = "gzip, deflate, br";
    opt.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36";
    // --- 开始正文 ---
    let uri = url.parse(opt.url);
    let isSecure = uri.protocol === "http:" ? false : true;
    let host = uri.host || "";
    let levelItem = _HTTP_LEVEL[host];
    if (levelItem) {
        let nowTime = (new Date()).getTime();
        if (nowTime - levelItem.time > 1000 * 60 * 60 * 24) { // --- 缓存 1 天 ---
            delete(_HTTP_LEVEL[host]);
            _HTTP_LEVEL[host] = {
                time: (new Date()).getTime(),
                level: "2"
            };
            return await _request2(opt, {
                uri: uri,
                isSecure: isSecure,
                level: "2"
            });
        } else {
            if (levelItem.level === "1") {
                return await _request1(opt, {
                    uri: uri,
                    isSecure: isSecure,
                    level: "1"
                });
            } else {
                return await _request2(opt, {
                    uri: uri,
                    isSecure: isSecure,
                    level: "2"
                });
            }
        }
    } else {
        _HTTP_LEVEL[host] = {
            time: (new Date()).getTime(),
            level: "2"
        };
        return await _request2(opt, {
            uri: uri,
            isSecure: isSecure,
            level: "2"
        });
    }
}

/**
 * --- 发起 Http1 请求 ---
 * @param opt 选项
 * @param config 配置项
 */
async function _request1(opt: A.Options, config: A.Config): Promise<A.NetResponse | undefined> {
    return new Promise(async function(resolve, reject) {
        let protocol = config.isSecure ? https : http;
        opt.hostname = config.uri.hostname;
        opt.port = config.uri.port || (config.isSecure ? 443 : 80);
        opt.path = config.uri.path;
        opt.method = opt.method || "GET";
        if (config.isSecure) {
            opt.ca = _ca;
        }
        // --- 是不是 POST ---
        let pdata!: A.BeforePostResult;
        if (opt.method === "POST") {
            pdata = await _getPostHeaders(opt.data);
            Object.assign(opt.headers, pdata.headers);
        }
        let client = protocol.request(opt, function(res: http.IncomingMessage): void {
            resolve(new NetHttp1Response(opt, config, res));
        });
        client.on("error", function() {
            resolve(undefined);
        });
        // --- POST 还要 write 或 pipe ---
        if (opt.method === "POST") {
            await _writePost(client, pdata);
        }
        client.end();
    });
}

/**
 * --- 发起 Http2 请求 ---
 * @param opt 选项
 * @param config 配置项
 */
async function _request2(opt: A.Options, config: A.Config): Promise<A.NetResponse | undefined> {
    return new Promise(async function(resolve, reject) {
        let client = http2.connect(config.uri.protocol + "//" + config.uri.host, {
            ca: config.isSecure ? _ca : undefined
        });
        client.on("error", async function() {
            // --- 在 req error 返回了，这里不处理 ---
        });
        opt.headers = opt.headers || {};
        opt.headers[":method"] = opt.method || "GET";
        opt.headers[":path"] = config.uri.path;
        // --- 是不是 POST ---
        let pdata!: A.BeforePostResult;
        if (opt.method === "POST") {
            pdata = await _getPostHeaders(opt.data);
            Object.assign(opt.headers, pdata.headers);
        }
        let req = client.request(opt.headers);
        req.on("error", async function(err) {
            _HTTP_LEVEL[config.uri.host || ""] = {
                time: (new Date()).getTime(),
                level: "1"
            };
            resolve(await _request1(opt, config));
        });
        req.on("response", function(headers: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader, flags: number) {
            config.headers = headers;
            resolve(new NetHttp2Response(opt, config, req));
        });
        req.on("end", function() {
            client.close();
        });
        // --- POST 还要 write 或 pipe ---
        if (opt.method === "POST") {
            await _writePost(req, pdata);
        }
        req.end();
    });
}

/**
 * --- 预先获取 POST header 以及 POST 值 ---
 * @param data 要 POST 的数据
 */
async function _getPostHeaders(data: any): Promise<A.BeforePostResult> {
    let upload = false;
    for (let key in data) {
        let val = data[key];
        if (typeof val === "string") {
            if (val[0] === "@") {
                // --- 要传文件 ---
                upload = true;
                break;
            }
        } else {
            // --- 数组 ---
            for (let val2 of val) {
                if (val2[0] === "@") {
                    // --- 要传文件 ---
                    upload = true;
                    break;
                }
            }
        }
    }
    if (upload) {
        /** 总上传大小 */
        let cl = 0;
        /** 文件分隔符 */
        let boundary = "----Nuttom" + Text.random(28, Text.RANDOM_LUN);
        /** 待组成的非文件的 POST 的文本部分 */
        let content: string[] = [];
        /** 文件上传文本部分 */
        let fcontent: string[] = [];
        /** 文件信息内容部分 */
        let flist: string[] = [];
        for (let key in data) {
            let val = data[key];
            if (typeof val === "string") {
                if (val[0] === "@") {
                    // --- 上传文件 ---
                    let fpath = val.slice(1);
                    let stat = await Fs.getStats(fpath);
                    if (!stat) {
                        continue;
                    }
                    fcontent.push(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"; filename="${Fs.getFilename(fpath)}"\r\nContent-Type: ${mime.get(fpath)}\r\n\r\n\r\n`);
                    flist.push(fpath);
                    cl += stat.size;
                } else {
                    // --- 普通字符串 ---
                    content.push(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n`);
                }
            } else {
                // --- 数组 ---
                for (let val2 of val) {
                    if (val2[0] === "@") {
                        // --- 上传文件 ---
                        let fpath = val2.slice(1);
                        let stat = await Fs.getStats(fpath);
                        if (!stat) {
                            continue;
                        }
                        fcontent.push(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"; filename="${Fs.getFilename(fpath)}"\r\nContent-Type: ${mime.get(fpath)}\r\n\r\n\r\n`);
                        flist.push(fpath);
                        cl += stat.size;
                    } else {
                        // --- 普通字符串 ---
                        content.push(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val2}\r\n`);
                    }
                }
            }
        }
        return {
            "headers": {
                "Content-Type": "multipart/form-data; boundary=" + boundary,
                "Content-Length": cl + Buffer.byteLength(content.join("") + fcontent.join("") + "--" + boundary + "--")
            },
            "content": content.join(""),
            "upload": upload,
            "boundary": boundary,
            "fcontent": fcontent,
            "flist": flist
        };
    } else {
        let content = querystring.stringify(data);
        return {
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(content)
            },
            "content": content,
            "upload": upload,
            "boundary": "",
            "fcontent": [],
            "flist": []
        };
    }
}

/**
 * --- 将 POST 数据发送出去 ---
 * @param req HTTP 对象
 * @param pdata BPR 对象
 */
async function _writePost(req: http2.ClientHttp2Stream | http.ClientRequest, pdata: A.BeforePostResult) {
    req.write(pdata.content);
    if (pdata.upload) {
        for (let key in pdata.flist) {
            let fpath = pdata.flist[key];
            req.write(pdata.fcontent[key].slice(0, -2));
            await Fs.pipe(fpath, req);
            req.write("\r\n");
        }
        req.write("--" + pdata.boundary + "--");
    }
}
import * as http from "http";
import * as https from "https";
import * as http2 from "http2";
import * as url from "url";
import * as querystring from "querystring";
// --- 第三方 ---
import * as mime from "@litert/mime-types";
// --- 库和定义 ---
import * as Fs from "~/lib/Fs";
import * as Text from "~/lib/Text";
import * as Const from "~/const";
// --- 自己 ---
import * as NetHttp1Response from "./Net/NetHttp1Response";
import * as NetHttp2Response from "./Net/NetHttp2Response";
import * as A from "./Net/Abstract";

export type NetCookie = A.NetCookie;

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
 * --- 发起一个请求，从 http2 开始试自动选择 ---
 * @param opt 配置项
 */
export async function request(opt: A.Options): Promise<A.NetResponse | undefined> {
    // --- 加载 ca 证书内容 ---
    if (_ca === "") {
        _ca = await Fs.readFile(Const.LIB_PATH + "Net/cacert.pem") || "";
    }
    // --- 定义是否自动追踪（较危险，有可能导致无限追踪，默认关闭） ---
    if (opt.followLocation === undefined) {
        opt.followLocation = false;
    }
    // --- 定义基础头部 ---
    opt.headers = opt.headers || {};
    opt.headers["Accept-Encoding"] = "gzip, deflate, br";
    opt.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36";
    // --- 开始正文 ---
    let uri = url.parse(opt.url || "");
    let isSecure = uri.protocol === "http:" ? false : true;
    let host = uri.host || "";
    // --- 是否要管 cookie ---
    if (opt.cookie) {
        opt.headers["Cookie"] = _buildCookieQuery(opt.cookie, uri);
    }
    // --- 超时时间 ---
    if (opt.timeout === undefined) {
        opt.timeout = 10;
    }
    // --- 是否获取头部 ---
    let pdata!: A.BeforePostResult;
    if (opt.method === "POST") {
        pdata = await _getPostHeaders(opt.data);
        opt.headers = <http.OutgoingHttpHeaders>Object.assign(opt.headers, pdata.headers);
    }
    // --- 根据协议判断用 http2 还是 http1 ---
    let levelItem = _HTTP_LEVEL[host];
    if (levelItem) {
        let nowTime = Date.now();
        if (nowTime - levelItem.time > 1000 * 60 * 60 * 24) { // --- 缓存 1 天 ---
            delete(_HTTP_LEVEL[host]);
            _HTTP_LEVEL[host] = {
                time: Date.now(),
                level: "2"
            };
            return await _request2(opt, {
                uri: uri,
                isSecure: isSecure,
                pdata: pdata,
                level: "2"
            });
        } else {
            if (levelItem.level === "1") {
                return await _request1(opt, {
                    uri: uri,
                    isSecure: isSecure,
                    pdata: pdata,
                    level: "1"
                });
            } else {
                return await _request2(opt, {
                    uri: uri,
                    isSecure: isSecure,
                    pdata: pdata,
                    level: "2"
                });
            }
        }
    } else {
        _HTTP_LEVEL[host] = {
            time: Date.now(),
            level: "2"
        };
        return await _request2(opt, {
            uri: uri,
            isSecure: isSecure,
            pdata: pdata,
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
        // --- https 要导入证书 ---
        if (config.isSecure) {
            opt.ca = _ca;
        }
        // --- 发起请求 ---
        let client = protocol.request(opt, async function(res: http.IncomingMessage) {
            // --- 处理 cookie ---
            if (opt.cookie) {
                _buildCookieObject(opt.cookie, res.headers["set-cookie"] || [], config.uri);
            }
            // --- 判断跳转 ---
            if (opt.followLocation === true) {
                if (res.headers.location) {
                    resolve(await request({
                        url: url.resolve(config.uri.href || "", res.headers.location),
                        cookie: opt.cookie,
                        encoding: opt.encoding,
                        followLocation: opt.followLocation,
                        timeout: opt.timeout,
                        headers: {
                            "Referer": config.uri.href
                        }
                    }));
                    return;
                }
            }
            resolve(NetHttp1Response.get(opt, config, res));
        });
        client.on("error", function() {
            resolve(undefined);
        });
        // --- POST 还要 write 或 pipe ---
        if (opt.method === "POST") {
            await _writePost(client, config.pdata);
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
        (<http.OutgoingHttpHeaders>opt.headers)[":method"] = opt.method || "GET";
        (<http.OutgoingHttpHeaders>opt.headers)[":path"] = config.uri.path;
        // --- 发起请求 ---
        let req = client.request(opt.headers);
        req.on("error", async function(err) {
            _HTTP_LEVEL[config.uri.host || ""] = {
                time: Date.now(),
                level: "1"
            };
            delete((<http.OutgoingHttpHeaders>opt.headers)[":method"]);
            delete((<http.OutgoingHttpHeaders>opt.headers)[":path"]);
            resolve(await _request1(opt, config));
        });
        req.on("response", async function(headers: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader, flags: number) {
            config.headers = headers;
            // --- 处理 cookie ---
            if (opt.cookie) {
                _buildCookieObject(opt.cookie, headers["set-cookie"] || [], config.uri);
            }
            // --- 判断跳转 ---
            if (opt.followLocation === true) {
                if (headers.location) {
                    resolve(await request({
                        url: url.resolve(config.uri.href || "", headers.location),
                        cookie: opt.cookie,
                        encoding: opt.encoding,
                        followLocation: opt.followLocation,
                        timeout: opt.timeout,
                        headers: {
                            "Referer": config.uri.href
                        }
                    }));
                    return;
                }
            }
            resolve(NetHttp2Response.get(opt, config, req));
        });
        req.on("end", function() {
            client.close();
        });
        // --- POST 还要 write 或 pipe ---
        if (opt.method === "POST") {
            await _writePost(req, config.pdata);
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
    // --- 先提交上传或普通 POST 的 content 内容 ---
    req.write(pdata.content);
    // --- 如果是上传，还需要追加关于上传的部分 ---
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

/**
 * --- 根据 Set-Cookie 头部转换到 cookie 对象 ---
 * @param cookie cookie 对象
 * @param setCookies 返回头的 set-cookie 数组
 * @param uri 请求的 URI 对象
 */
function _buildCookieObject(cookie: A.NetCookie, setCookies: string[], uri: url.UrlWithStringQuery) {
    uri.hostname = uri.hostname || "";
    uri.pathname = uri.pathname || "/";
    for (let setCookie of setCookies) {
        let cookieTmp: any = {};
        let list = setCookie.split(";");
        let listLength = list.length;
        // --- 提取 set-cookie 中的定义信息 ---
        for (let index = 0; index < listLength; ++index) {
            let item = list[index];
            let arr = item.split("=");
            let key = arr[0];
            let val = arr[1] !== undefined ? arr[1] : "";
            if (index === 0) {
                cookieTmp["name"] = key.trim();
                cookieTmp["value"] = decodeURIComponent(val);
            } else {
                cookieTmp[key.trim().toLowerCase()] = val;
            }
        }
        // --- 获取定义的 domain ---
        let domain = "", domainN = "";
        if (cookieTmp["domain"] !== undefined) {
            cookieTmp["domain"] = cookieTmp["domain"].split(":")[0];
            if (cookieTmp["domain"][0] !== ".") {
                domain = "." + cookieTmp["domain"];
                domainN = cookieTmp["domain"];
            } else {
                domain = cookieTmp["domain"];
                domainN = cookieTmp["domain"].slice(1);
            }
        } else {
            domain = "." + uri.hostname;
            domainN = uri.hostname;
        }
        // --- 判断有没有设置 domain 的权限 ---
        // --- uri.hostname vs  domain(domainN) ---
        // --- ok.xxx.com   vs  .ok.xxx.com: true ---
        // --- ok.xxx.com   vs  .xxx.com: true ---
        // --- z.ok.xxx.com vs  .xxx.com: true ---
        // --- ok.xxx.com   vs  .zz.ok.xxx.com: false ---
        if (uri.hostname !== domainN) {
            let domainSc = domain.split(".").length - 1;
            if (domainSc <= 1) {
                // --- .com ---
                continue;
            }
            // --- 判断访问路径 (uri.hostname) 是不是设置域名 (domain) 的孩子，domain 必须是 uriHost 的同级或者父辈 ---
            if (uri.hostname.split(".").length - 1 < domainSc) {
                // --- ok.xxx.com (2) < .pp.xxx.com (2): false ---
                // --- ok.xxx.com < .z.xxx.com: false ---
                continue;
            }
            if (uri.hostname.slice(-domain.length) !== domain) {
                // --- ok.xxx.com, .ppp.com: false ---
                continue;
            }
        }
        let cookieKey = cookieTmp["name"] + "-" + domainN;
        if ((cookieTmp["max-age"] !== undefined) && (cookieTmp["max-age"] <= 0)) {
            if (cookie[cookieKey] !== undefined) {
                delete(cookie[cookieKey]);
                continue;
            }
        }
        let exp = -1992199400000;
        if (cookieTmp["max-age"] !== undefined) {
            exp = Date.now() + cookieTmp["max-age"] * 1000;
        }
        // --- path ---
        let path = cookieTmp["path"] !== undefined ? cookieTmp["path"] : "";
        if (path === "") {
            let srp = uri.pathname.lastIndexOf("/");
            path = uri.pathname.slice(0, srp + 1);
        } else if (path[0] !== "/") {
            path = "/" + path;
        }
        cookie[cookieKey] = {
            "name": cookieTmp["name"],
            "value": cookieTmp["value"],
            "exp": exp,
            "path": path,
            "domain": domainN,
            "secure": cookieTmp["secure"] !== undefined ? true : false
        };
    }
}

/**
 * --- 数组转换为 Cookie ---
 * @param cookie cookie 对象
 * @param uri 请求的 URI 对象
 */
function _buildCookieQuery(cookie: A.NetCookie, uri: url.UrlWithStringQuery): string {
    uri.hostname = uri.hostname || "";
    uri.pathname = uri.pathname || "/";
    uri.protocol = uri.protocol || "http:";
    let cookieStr = "";
    let nowTime = Date.now();
    for (let key in cookie) {
        let item = cookie[key];
        if ((item.exp < nowTime) && (item.exp !== -1992199400000)) {
            delete(cookie[key]);
            continue;
        }
        if (item.secure && (uri.protocol === "http:")) {
            continue;
        }
        // --- 判断 path 是否匹配 ---
        if (uri.pathname.slice(0, item.path.length) !== item.path) {
            continue;
        }
        let domain = "." + item.domain;
        // --- 判断 uri.hostname 必须是 domain 的同级或子级 ---
        // --- uri.hostname     vs      domain ---
        // --- ok.xxx.com       vs      .ok.xxx.com: true ---
        // --- ok.xxx.com       vs      .xxx.com: true ---
        // --- z.ok.xxx.com     vs      .xxx.com: true ---
        // --- ok.xxx.com       vs      .zz.ok.xxx.com: false ---
        if ("." + uri.hostname !== domain) {
            // --- 判断自己是不是孩子 ---
            if (uri.hostname.split(".").length - 1 < domain.split(".").length - 1) {
                // --- ok.xxx.com, .zz.ok.xxx.com: false ---
                // --- pp.ok.xxx.com, .zz.ok.xxx.com: false ---
                // --- q.b.ok.xx.com, .zz.ok.xxx.com: true ---
                continue;
            }
            if (uri.hostname.slice(-domain.length) !== domain) {
                // --- q.b.ok.xx.com, .zz.ok.xxx.com: false ---
                // --- z.ok.xxx.com, .xxx.com: true ---
                continue;
            }
        }
        cookieStr += item.name + "=" + encodeURIComponent(item.value) + ";";
    }
    if (cookieStr !== "") {
        return cookieStr.slice(0, -1);
    } else {
        return "";
    }
}

/**
 * --- 模拟重启浏览器后的状态 ---
 * @param cookie cookie 对象
 */
export function resetCookieSession(cookie: A.NetCookie): void {
    for (let key in cookie) {
        let item = cookie[key];
        if (item.exp === -1992199400000) {
            delete(cookie[key]);
        }
    }
}
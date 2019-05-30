import * as http2 from "http2";
import * as querystring from "querystring";
import * as fs from "fs";
// --- 库和定义 ---
import * as Fs from "~/lib/Fs";
import * as Text from "~/lib/Text";
import * as View from "~/lib/View";
import * as abs from "~/abstract";
import * as c from "~/const";

// --- 处理路由 ---
export async function run(nu: abs.Nu, pathArr?: string[], index?: number): Promise<boolean> {
    // --- 判断是否是动态目录 ---
    let stat = await Fs.getStats(nu.const.ROOT_PATH + "config.js");
    if (!stat) {
        return false;
    }
    // --- 判断是动态目录，但当前目录是否不进行动态化 ---
    if (pathArr && index !== undefined && pathArr[index] === "stc") {
        return false;
    }
    // --- 设置 nu 常量 ---
    nu.const.HTTP_PATH += nu.const.HTTP_BASE;
    // --- 获取 json 定义文件 ---
    let config: abs.Config = require(nu.const.ROOT_PATH + "config");
    nu.config = config;
    /** --- 余下的相对路径 --- */
    let path = "";
    if (pathArr && (index !== undefined)) {
        let pathArrLen = pathArr.length;
        for (let i = index; i < pathArrLen; ++i) {
            if (pathArr[i] === "") {
                continue;
            }
            path += pathArr[i] + "/";
        }
        if (path.length > 1 && path.slice(-1) === "/") {
            path = path.slice(0, -1);
        }
    }
    // --- 检测 path 是否是静态文件 ---
    if (/favicon.\w+?\??.*|[\w-]+?\.doc\??.*|[\w-]+?\.txt\??.*/.test(path)) {
        await View.toResponse(nu, nu.const.ROOT_PATH + path);
        return true;
    }
    // --- 将虚拟路径放置在 URI 里 ---
    nu.const.URI = path;
    // --- 如果为空则定义为 @ ---
    if (path === "") {
        path = "@";
    }
    // --- 检查路由表 ---
    let param: string[] = [];
    let match: RegExpExecArray | null = null;
    let pathLeft: string = "", pathRight: string = "";
    for (let rule in config.route) {
        let ruleVal = config.route[rule];
        rule = rule.replace("/", "\\/");
        let reg = new RegExp("^" + rule + "$");
        if (match = reg.exec(path)) {
            [pathLeft, pathRight] = _getPathLeftRight(ruleVal);
            for (let i = 1; i < match.length; ++i) {
                param.push(match[i]);
            }
            nu.param = param;
            break;
        }
    }
    if (!match) {
        [pathLeft, pathRight] = _getPathLeftRight(path);
    }
    // --- 加载客户端提交的 cookie ---
    if (nu.req.headers.cookie) {
        let cookies = nu.req.headers.cookie.split(";");
        for (let cookie of cookies) {
            let co = cookie.split("=");
            nu.cookie[co[0].trim()] = decodeURIComponent(co[1]);
        }
    }
    // --- 加载控制器 ---
    let ctr: any;
    try {
        ctr = require(nu.const.ROOT_PATH + "ctr/" + pathLeft);
    } catch {
        nu.res.writeHead(403);
        nu.res.end("403 Forbidden(4).");
        return true;
    }
    // --- 判断 action 是否存在 ---
    if (!ctr[pathRight]) {
        nu.res.writeHead(403);
        nu.res.end("403 Forbidden(5).");
        return true;
    }
    // --- 获取 POST 以及文件 ---
    nu.post = await _getPost(nu.req);
    // --- 执行 action ---
    let rtn;
    try {
        rtn = await ctr[pathRight](nu);
    } catch (e) {
        console.log(e);
        nu.res.writeHead(500);
        nu.res.end(`500 Internal Server Error(Customer code error).`);
        await _clearUploadFiles(nu);
        return true;
    }
    if (!rtn) {
        // --- 没有返回值，需要在函数体内部处理 end 或者 pipe，处理了要返回 true，以防止忘了，否则报错 ---
        if (!nu.res.finished) {
            // --- 有可能是 pipe 或者忘了输出忘了 end，必须错 ---
            nu.res.writeHead(500);
            nu.res.end("500 Internal Server Error(Must have a return value, if processed please return true).");
        }
        await _clearUploadFiles(nu);
        return true;
    }
    if (typeof rtn === "string") {
        await View.toResponseByData(nu, rtn, "html");
        await _clearUploadFiles(nu);
        return true;
    } else if (typeof rtn === "boolean") {
        // --- 返回了 true，无需处理 ---
    } else if (typeof rtn === "object") {
        let jsonStr: string = "";
        let json: any = {};
        if ((rtn[0] !== undefined) && (typeof rtn[0] === "number")) {
            json = {"result": rtn[0]};
            if (rtn[1] !== undefined) {
                if (typeof rtn[1] === "object") {
                    Object.assign(json, rtn[1]);
                    jsonStr = JSON.stringify(json);
                } else {
                    if (rtn.length === 2) {
                        json.msg = rtn[1];
                        jsonStr = JSON.stringify(json);
                    } else {
                        nu.res.writeHead(500);
                        nu.res.end("500 Internal Server Error(Return value is wrong).");
                        await _clearUploadFiles(nu);
                        return true;
                    }
                }
            } else {
                jsonStr = JSON.stringify(json);
            }
        } else {
            jsonStr = JSON.stringify(rtn);
        }
        await View.toResponseByData(nu, jsonStr, "json");
        await _clearUploadFiles(nu);
        return true;
    } else {
        // --- 以下可能有异常 ---
        if (!nu.res.finished) {
            nu.res.writeHead(500);
            nu.res.end("500 Internal Server Error(Return type is wrong).");
        }
    }
    await _clearUploadFiles(nu);
    return true;
}

/**
 * --- 获取控制器 left 和 action ---
 * @param path 相对路径
 */
function _getPathLeftRight(path: string): string[] {
    let pathLio = path.lastIndexOf("/");
    if (pathLio === -1) {
        return [path, "index"];
    } else {
        return [path.slice(0, pathLio), path.slice(pathLio + 1)];
    }
}

/**
 * --- 删除本次请求所有已上传的文件 ---
 * @param nu Nu 对象
 */
async function _clearUploadFiles(nu: abs.Nu) {
    for (let key in nu.post) {
        let item = nu.post[key];
        if (typeof item !== "string") {
            if (Array.isArray(item)) {
                for (let item2 of item) {
                    if (typeof item2 !== "string") {
                        await Fs.unlinkFile(item2.path);
                    }
                }
            } else {
                await Fs.unlinkFile(item.path);
            }
        }
    }
}

/**
 * --- 获取 post 对象 ---
 * @param req 请求对象
 */
function _getPost(req: http2.Http2ServerRequest): Promise<querystring.ParsedUrlQuery> {
    return new Promise(function(resolve, reject) {
        let ct = <string>req.headers["content-type"];
        if (!ct) {
            resolve({});
            return;
        }
        let ctlio = ct.lastIndexOf("boundary=");
        if (ctlio !== -1) {
            // --- 可能有文件上传，用流的形式 ---
            let boundary = ct.slice(ctlio + 9);
            /** 最终 POST 组合 */
            let post: any = {};
            /** 当前 name */
            let name: string = "";
            /** 当前 filename */
            let filename: string = "";
            let ftmpname: string = "";
            /** 当前 ftmp 的写入流 */
            let ftmpStream: fs.WriteStream;
            /** 当前 ftmp 已写入流大小 */
            let ftmpSize: number = 0;
            /** 临时字符串 */
            let tmp: Buffer = Buffer.from("");
            // --- 简易状态机 ---
            enum ESTATE {
                WAIT, FILE, POST
            }
            let state = ESTATE.WAIT;
            req.on("data", function(chunk: Buffer) {
                switch (state) {
                    case ESTATE.WAIT: {
                        // --- 正常模式 ---
                        tmp = Buffer.concat([tmp, chunk], tmp.length + chunk.length);
                        let io = tmp.indexOf("\r\n\r\n");
                        if (io === -1) {
                            return;
                        }
                        // --- 头部已经读取完毕 ---
                        let head = tmp.slice(0, io).toString();
                        // --- 获取 name ---
                        let match = head.match(/name="(.+?)"/);
                        name = match ? match[1] : "";
                        // --- 判断是 post 还是文件 ---
                        tmp = tmp.slice(io + 4);
                        match = head.match(/filename="(.+?)"/);
                        if (!match) {
                            // --- post ---
                            state = ESTATE.POST;
                        } else {
                            // --- 文件 ---
                            state = ESTATE.FILE;
                            filename = match[1];
                            // --- 创建文件流 ---
                            let date = new Date();
                            ftmpname = date.getFullYear().toString() + Text.pad(date.getMonth() + 1) + Text.pad(date.getDate()) + Text.pad(date.getHours()) + Text.pad(date.getMinutes()) + "_" + Text.random() + ".ftmp";
                            ftmpStream = Fs.writeStream(c.FTMP_PATH + ftmpname);
                            ftmpSize = 0;
                        }
                        break;
                    }
                    case ESTATE.POST: {
                        // --- POST 模式 ---
                        tmp = Buffer.concat([tmp, chunk], tmp.length + chunk.length);
                        let io = tmp.indexOf(`\r\n--` + boundary);
                        if (io === -1) {
                            return;
                        }
                        // --- 找到结束标语，写入 POST ---
                        let val = tmp.slice(0, io).toString();
                        if (post[name] !== undefined) {
                            if ((typeof post[name] === "string") || !Array.isArray(post[name])) {
                                post[name] = [post[name], val];
                            } else {
                                post[name].push(val);
                            }
                        } else {
                            post[name] = val;
                        }
                        // --- 重置状态机 ---
                        state = ESTATE.WAIT;
                        tmp = tmp.slice(io + 4 + boundary.length);
                        break;
                    }
                    case ESTATE.FILE: {
                        // --- FILE 模式 ---
                        tmp = Buffer.concat([tmp, chunk], tmp.length + chunk.length);
                        let io = tmp.indexOf(`\r\n--` + boundary);
                        if (io === -1) {
                            // --- 没找到结束标语，将预留 boundary 长度之前的写入到文件 ---
                            let writeBuffer = tmp.slice(0, -boundary.length - 4);
                            ftmpStream.write(writeBuffer);
                            ftmpSize += Buffer.byteLength(writeBuffer);
                            tmp = tmp.slice(-boundary.length - 4);
                            return;
                        }
                        // --- 找到结束标语，结束标语之前的写入文件，之后的重新放回 tmp ---
                        let writeBuffer = tmp.slice(0, io);
                        ftmpStream.write(writeBuffer);
                        ftmpSize += Buffer.byteLength(writeBuffer);
                        ftmpStream.end();
                        // --- POST 部分 ---
                        let fval = {
                            name: filename,
                            size: ftmpSize,
                            path: c.FTMP_PATH + ftmpname
                        };
                        if (post[name] !== undefined) {
                            if ((typeof post[name] === "string") || !Array.isArray(post[name])) {
                                post[name] = [post[name], fval];
                            } else {
                                post[name].push(fval);
                            }
                        } else {
                            post[name] = fval;
                        }
                        // --- 重置状态机 ---
                        state = ESTATE.WAIT;
                        tmp = tmp.slice(io + 4 + boundary.length);
                        break;
                    }
                }
            });
            req.on("end", function() {
                resolve(post);
            });
        } else {
            // --- 普通 post ---
            let str: string[] = [];
            req.on("data", function(chunk) {
                str.push(chunk.toString());
            });
            req.on("end", function() {
                let s = str.join("");
                if (s) {
                    resolve(querystring.parse(s));
                } else {
                    resolve({});
                }
            });
        }
    });
}
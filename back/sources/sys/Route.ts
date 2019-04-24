import * as http2 from "http2";
import * as querystring from "querystring";
// --- 库和定义 ---
import * as Fs from "../lib/Fs";
import * as View from "../lib/View";
import * as abs from "../abstract";

// --- 处理路由 ---
export async function run(nu: abs.Nu, pathArr?: string[], index?: number): Promise<boolean> {
    // --- 判断是否是动态目录 ---
    let stat = await Fs.getStats(nu.const.ROOT_PATH + "config.json.js");
    if (!stat) {
        return false;
    }
    // --- 判断是动态目录，但当前目录是否不进行动态化 ---
    if (pathArr && index !== undefined && pathArr[index] === "stc") {
        return false;
    }
    // --- 获取 json 定义文件 ---
    let json: abs.Config = require(nu.const.ROOT_PATH + "config.json").default;
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
    // --- 如果为空则定义为 @ ---
    if (path === "") {
        path = "@";
    }
    // --- 检查路由表 ---
    let param: string[] = [];
    let match: RegExpExecArray | null = null;
    let pathLeft: string = "", pathRight: string = "";
    for (let rule in json.route) {
        rule = rule.replace("/", "\\/");
        let reg = new RegExp("^" + rule + "$");
        if (match = reg.exec(path)) {
            [pathLeft, pathRight] = _getPathLeftRight(json.route[rule]);
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
    // --- 执行 action ---
    nu.post = await _getPost(nu.req);
    let rtn = ctr[pathRight](nu);
    if (!rtn) {
        return true;
    }
    if (typeof rtn === "string") {
        await View.toResponseByData(nu, rtn, "html");
        return true;
    } else if (typeof rtn === "object") {
        let jsonStr: string = "";
        let json: any = {};
        if (rtn[0] && (typeof rtn[0] === "number")) {
            json = {"result": rtn[0]};
            if (rtn[1]) {
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
        return true;
    }
    // --- 以下可能有异常 ---
    if (!nu.res.finished) {
        nu.res.writeHead(500);
        nu.res.end("500 Internal Server Error(Return type is wrong).");
    }
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
 * --- 获取 post 对象 ---
 * @param req 请求对象
 */
function _getPost(req: http2.Http2ServerRequest): Promise<querystring.ParsedUrlQuery> {
    return new Promise((resolve, reject) => {
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
    });
}
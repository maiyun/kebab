import * as http2 from "http2";
// --- 第三方 ---
import * as mime from "@litert/mime-types";
// --- 库和定义 ---
import * as Fs from "../lib/Fs";
import * as abs from "../abstract";

export async function run(req: http2.Http2ServerRequest, res: http2.Http2ServerResponse, vhostRoot: string, pathNow: string, pathArr?: string[], index?: number): Promise<boolean> {
    // --- 判断是否是动态目录 ---
    let stat = await Fs.getStats(vhostRoot + pathNow + "config.json.js");
    if (!stat) {
        return false;
    }
    // --- 获取 json 定义文件 ---
    let json: abs.Config = require(vhostRoot + pathNow + "config.json").default;
    // --- 查看余下的路径 ---
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
    // --- 判断路径是否合法 ---
    let pathLio = path.lastIndexOf("/");
    if (pathLio === -1) {
        res.writeHead(403);
        res.end("403 Forbidden(3).");
        return true;
    }
    // --- 加载控制器 ---
    let pathLeft = path.slice(0, pathLio);
    let pathRight = path.slice(pathLio + 1);
    let ctr: any;
    try {
        ctr = require(vhostRoot + pathNow + "ctr/" + pathLeft);
    } catch {
        res.writeHead(403);
        res.end("403 Forbidden(4).");
        return true;
    }
    if (!await ctr.__onOpen({
        HTTP_BASE: pathNow
    }) === false) {
        res.writeHead(403);
        res.end("403 Forbidden(5).");
        return true;
    }
    let rtn = ctr[pathRight]();
    if (typeof rtn === "string") {
        res.setHeader("Content-Type", mime.get("html"));
        res.setHeader("Content-Length", Buffer.byteLength(rtn));
        res.end(rtn);
        return true;
    } else if (typeof rtn === "object") {
        let jsonStr = JSON.stringify(rtn);
        res.setHeader("Content-Type", mime.get("json"));
        res.setHeader("Content-Length", Buffer.byteLength(jsonStr));
        res.end(jsonStr);
        return true;
    }
    if (!res.finished) {
        res.end();
    }
    return true;
}
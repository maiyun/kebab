import * as http2 from "http2";

import * as Fs from "../lib/Fs";
import * as abs from "../abstract";

export async function run(vhostRoot: string, path: string, req: http2.Http2ServerRequest, res: http2.Http2ServerResponse, pathArr?: string[], index?: number): Promise<boolean> {
    // --- 判断是否是动态目录 ---
    let stat = await Fs.getStats(vhostRoot + path + "config.json");
    if (!stat) {
        return false;
    }
    // --- 获取 json 定义文件 ---
    let json: abs.Config = JSON.parse(await Fs.readFile(vhostRoot + path + "config.json"));
    // --- 查看余下的路径 ---
    if (pathArr && index) {
        let pathArrLen = pathArr.length;
        for (let i = index + 1; i < pathArrLen; ++i) {
            path += pathArr[i] + "/";
        }
    }
    res.end("path: " + path);
    return true;
}
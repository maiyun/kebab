import * as http2 from "http2";
// --- 第三方 ---
import * as ejs from "ejs";
import * as mime from "@litert/mime-types";
// --- 库和定义 ---
import * as Fs from "./Fs";
import * as Zlib from "./Zlib";

/**
 * --- 加载 HTML 文件 ---
 * @param path 文件绝对路径
 * @param data 传入的参数
 */
export async function load(path: string, data: any = {}): Promise<string> {
    try {
        let content = await Fs.readFile(path);
        return ejs.render(content, data);
    } catch {
        return "";
    }
}

/**
 * --- 读取文件输出到前台 ---
 * @param req Request
 * @param res Response
 * @param path 文件路径
 * @param data 是否要模板介入，传入参数
 */
export async function toResponse(req: http2.Http2ServerRequest, res: http2.Http2ServerResponse, path: string, data?: any): Promise<void> {
    let stats = await Fs.getStats(path);
    if (!stats) {
        res.writeHead(404);
        res.end("404 Not Found.");
        return;
    }
    // --- 设置头部 ---
    res.setHeader("Content-Length", stats.size);
    let charset = "";
    let ext = path.indexOf(".") === -1 ? "" : path.slice(path.lastIndexOf(".") + 1).toLowerCase();
    if (["htm", "html", "css", "js", "txt", "xml"].indexOf(ext) !== -1) {
        charset = "; charset=utf-8";
    }
    res.setHeader("Content-Type", mime.get(path) + charset);
    // --- 判断客户端支持的压缩模式 ---
    let encoding = <string>req.headers["accept-encoding"] || "";
    if (data) {
        // --- 模板文本模式 ---
        let content = await load(path, data);
        if (encoding && (charset !== "") && (stats.size >= 1024)) {
            let comp = await Zlib.compress(encoding, content);
            if (comp.buf) {
                res.setHeader("Content-Encoding", comp.type);
                res.end(comp.buf);
                return;
            }
            res.end(content);
        } else {
            // --- 不压缩 ---
            res.end(content);
        }
    } else {
        if (encoding && (charset !== "") && (stats.size >= 1024)) {
            // --- 压缩 ---
            let compress = Zlib.create(encoding);
            if (compress) {
                res.setHeader("Content-Encoding", compress.type);
                res.writeHead(200);
                Fs.readStream(path).pipe(compress.obj).pipe(res.stream);
                return;
            }
            res.writeHead(200);
            Fs.readStream(path).pipe(res.stream);
        } else {
            // --- 不压缩 ---
            res.writeHead(200);
            Fs.readStream(path).pipe(res.stream);
        }
    }
}
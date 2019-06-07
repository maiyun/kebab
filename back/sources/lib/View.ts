// --- 第三方 ---
import * as ejs from "ejs";
import * as mime from "@litert/mime-types";
// --- 库和定义 ---
import * as Fs from "./Fs";
import * as Zlib from "./Zlib";
import * as abs from "../abstract";

let _LOCALE_OBJ: any = {
    "en": {}
};
let _LOCALE_PKG: string[] = [];

/**
 * --- 设置当前语言 ---
 * @param nu Nu 对象
 * @param locale 语言
 * @param pkg 包
 */
export async function setLocale(nu: abs.Nu, locale: string, pkg: string = "default"): Promise<boolean> {
    let lName = locale + "." + pkg;
    if (_LOCALE_PKG.indexOf(lName) === -1) {
        let fstr = await Fs.readFile(nu.const.ROOT_PATH + "locale/" + lName + ".json");
        if (fstr === undefined) {
            return false;
        }
        let loc = JSON.parse(fstr);
        if (!_LOCALE_OBJ[locale]) {
            _LOCALE_OBJ[locale] = {};
        }
        Object.assign(_LOCALE_OBJ[locale], _setLocaleDeep(loc));
        _LOCALE_PKG.push(lName);
    }
    nu.locale = locale;
    return true;
}
function _setLocaleDeep(loc: any, pre: string = "") {
    let arr: any = {};
    for (let k in loc) {
        let v = loc[k];
        if (typeof v === "object") {
            Object.assign(arr, _setLocaleDeep(v, pre + k + "."));
        } else {
            arr[pre + k] = v;
        }
    }
    return arr;
}

/**
 * --- 加载 HTML 文件 ---
 * @param Nu 对象
 * @param path 模板文件相对/绝对路径
 * @param data 传入的参数
 */
export async function load(nu: abs.Nu, path: string, data: any = {}): Promise<string> {
    if (!Fs.isRealPath(path)) {
        path = nu.const.VIEW_PATH + path + ".ejs";
    }
    let content: string = await Fs.readFile(path) || "";
    if (content === "") {
        return "";
    }
    data.HTTP_BASE = nu.const.HTTP_BASE;
    data.HTTP_STC = nu.const.HTTP_BASE + "stc/";
    data.WS_PATH = nu.const.WS_PATH;
    data.STATIC_PATH = nu.config.etc.const.STATIC_PATH && nu.config.etc.const.STATIC_PATH !== "" ? nu.config.etc.const.STATIC_PATH : data.HTTP_STC;
    data.STATIC_VER = nu.config.etc.const.STATIC_VER;
    // --- 语言包 ---
    data.l = function(key: string): string {
        if (!_LOCALE_OBJ[nu.locale]) {
            return "LocaleError";
        }
        if (!_LOCALE_OBJ[nu.locale][key]) {
            return "LocaleError";
        }
        return _LOCALE_OBJ[nu.locale][key];
    };
    return ejs.render(content, data);
}

/**
 * --- 输出 HTML 模板文件 ---
 * @param nu Nu 对象
 * @param path 模板文件相对路径
 * @param data 传入的参数
 */
export async function write(nu: abs.Nu, path: string, data?: any): Promise<void> {
    await toResponse(nu, nu.const.VIEW_PATH + path + ".ejs", data);
}

/**
 * --- 读取任意文件输出到前台（除模板外都是流式输出） ---
 * @param nu Nu 对象
 * @param path 文件绝对路径
 * @param data 是否要模板介入，传入参数，此参数存在，文件不在浏览器端缓存
 */
export async function toResponse(nu: abs.Nu, path: string, data?: any): Promise<void> {
    let ext = path.indexOf(".") === -1 ? "" : path.slice(path.lastIndexOf(".") + 1).toLowerCase();
    if (ext === "ejs") {
        // --- 模板文本模式 ---
        nu.res.setHeader("Cache-Control", "no-cache, must-revalidate");
        let content = await load(nu, path, data);
        if (content === "") {
            nu.res.writeHead(404);
            nu.res.end("404 Not Found.");
            return;
        }
        await toResponseByData(nu, content, path);
    } else {
        let stats = await Fs.getStats(path);
        if (!stats) {
            nu.res.writeHead(404);
            nu.res.end("404 Not Found.");
            return;
        }
        // --- 判断缓存以及 MIME 和编码 ---
        let charset = "";
        if (["htm", "html", "css", "js", "txt", "xml", "ejs"].indexOf(ext) !== -1) {
            charset = "; charset=utf-8";
            // --- 这些文件将进行缓存 ---
            let lastModified = stats.mtime.toUTCString();
            let hash = `W/"${stats.size.toString(16)}-${stats.mtime.getTime().toString(16)}"`;
            nu.res.setHeader("ETag", hash);
            nu.res.setHeader("Cache-Control", "public, max-age=600");
            // --- 判断返回 304 吗 ---
            let noneMatch = nu.req.headers["if-none-match"];
            let modiSince = nu.req.headers["if-modified-since"];
            if ((hash === noneMatch) && (lastModified === modiSince)) {
                nu.res.writeHead(304);
                nu.res.end();
                return;
            }
            nu.res.setHeader("Last-Modified", lastModified);
        } else {
            nu.res.setHeader("Cache-Control", "no-cache, must-revalidate");
        }
        // --- 设置头部 ---
        nu.res.setHeader("Content-Type", mime.get(ext === "ejs" ? "html" : path) + charset);
        nu.res.setHeader("Content-Length", stats.size);
        // --- 判断客户端支持的压缩模式 ---
        let encoding = <string>nu.req.headers["accept-encoding"] || "";
        // --- charset 不为空代表是文本，可以压缩 ---
        if (encoding && (charset !== "") && (stats.size >= 1024)) {
            // --- 压缩 ---
            let compress = Zlib.createCompress(encoding);
            if (compress) {
                nu.res.setHeader("Content-Encoding", compress.type);
                nu.res.writeHead(200);
                Fs.readStream(path).pipe(compress.obj).pipe(nu.res.stream);
                return;
            }
            nu.res.writeHead(200);
            Fs.readStream(path).pipe(nu.res.stream);
        } else {
            // --- 不压缩 ---
            nu.res.writeHead(200);
            Fs.readStream(path).pipe(nu.res.stream);
        }
    }
}

/**
 * --- 输出文本，自动 GZIP ---
 * @param nu Nu 对象
 * @param data 文本内容
 * @param ext 文本的路径或要输出的 MIME 后缀扩展名
 * @param size 文本大小，可留空
 */
export async function toResponseByData(nu: abs.Nu, data: string | Buffer | Uint8Array, ext: string, size?: number): Promise<void> {
    if (size === undefined) {
        size = Buffer.byteLength(data);
    }
    nu.res.setHeader("Content-Length", size);
    let ct = mime.get(ext.slice(-4) === ".ejs" ? "html" : ext) + "; charset=utf-8";
    nu.res.setHeader("Content-Type", ct);
    // --- 判断客户端支持的压缩模式 ---
    let encoding = <string>nu.req.headers["accept-encoding"] || "";
    if (encoding && (size >= 1024)) {
        let comp = await Zlib.compress(encoding, data);
        if (comp.buf) {
            nu.res.setHeader("Content-Encoding", comp.type);
            nu.res.end(comp.buf);
            return;
        }
        nu.res.end(data);
    } else {
        nu.res.end(data);
    }
}
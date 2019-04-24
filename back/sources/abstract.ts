import * as http2 from "http2";
import * as url from "url";
import * as querystring from "querystring";
// --- 库和定义 ---
import * as abs from "./abstract";

// --- 虚拟机配置对象 ---
export interface Vhost {
    readonly name: string;
    readonly domains: string[];
    readonly root: string;
    readonly cert: string;
    readonly key: string;
}

/** --- 控制器使用的常量 --- */
export interface NuConst {
    HTTP_BASE?: string;
    ROOT_PATH?: string;
    VIEW_PATH?: string;
}

/** --- 动态目录配置文件 --- */
export interface Config {
    readonly route: any;
    readonly etc: any;
}

/** --- Nu 核心常对象 --- */
export interface Nu {
    const: abs.NuConst;
    readonly req: http2.Http2ServerRequest;
    readonly res: http2.Http2ServerResponse;
    readonly uri: url.UrlWithStringQuery;
    get: querystring.ParsedUrlQuery;
    post: querystring.ParsedUrlQuery;
    param: string[];
}
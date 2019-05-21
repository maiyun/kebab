import * as http2 from "http2";
import * as url from "url";
import * as querystring from "querystring";

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
    VER: string;
    START_TIME: bigint;
    URI: string;

    ROOT_PATH: string;
    VIEW_PATH: string;
    DATA_PATH: string;

    HTTP_BASE: string;
    HTTP_HOST: string;
    HTTP_PATH: string;
}

/** --- 动态目录配置文件 --- */
export interface Config {
    readonly route: any;
    readonly etc: any;
}

/** --- Nu 核心对象 --- */
export interface Nu {
    const: NuConst;
    readonly req: http2.Http2ServerRequest;
    readonly res: http2.Http2ServerResponse;
    readonly uri: url.UrlWithStringQuery;
    get: querystring.ParsedUrlQuery;
    post: NuPost;
    param: string[];
    locale: string;
    config: Config;
}

/** --- Nu Post 对象 --- */
export interface NuPost {
    [key: string]: NuPostItem | NuPostItem[];
}
export type NuPostItem = string | NuPostFile;

/** --- Nu Post File 对象 --- */
export interface NuPostFile {
    name: string;
    size: number;
    path: string;
}
import * as http2 from "http2";
import * as http from "http";
import * as url from "url";
import * as querystring from "querystring";
import * as tls from "tls";
// --- 库和定义 ---
import * as Mysql from "~/lib/Mysql";
import * as Redis from "~/lib/Redis";
import * as Session from "~/lib/Session";

// --- 虚拟机配置对象 ---
export interface Vhost {
    readonly name: string;
    readonly domains: string[];
    readonly root: string;
    readonly cert: string;
    readonly key: string;
    readonly remark: string;
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

    WS_PATH: string;
}
export interface NusConst {
    VER: string;
    START_TIME: bigint;

    ROOT_PATH: string;
    VIEW_PATH: string;
    DATA_PATH: string;
}

/** --- 动态目录配置文件 --- */
export interface Config {
    readonly route: {
        [key: string]: string;
    };
    readonly etc: {
        [key: string]: string;
    } & ConfigEtc;
}

/** --- ETC 配置 --- */
export interface ConfigEtc {
    "const": {
        "STATIC_PATH": string;
        "STATIC_VER": string;
    };
    "__Nuttom__": {
        "pwd": string;
    };
    "mysql": ConfigEtcMysql;
    "sql": ConfigEtcSql;
    "redis": ConfigEtcRedis;
    "session": ConfigEtcSession;
}
export interface ConfigEtcMysql {
    "host": string;
    "port": number;
    "charset": string;
    "name": string;
    "username": string;
    "password": string;
}
export interface ConfigEtcSql {
    "pre": string;
}
export interface ConfigEtcRedis {
    "host": string;
    "port": number;
    "index": number;
    "auth": string;
    "pre": string;
}
export interface ConfigEtcSession {
    "name": string;
    "exp": number;
}

/** --- Nu 核心对象 --- */
export interface Nu {
    const: NuConst;
    readonly req: http2.Http2ServerRequest;
    readonly res: http2.Http2ServerResponse;
    readonly uri: url.UrlWithStringQuery;
    get: querystring.ParsedUrlQuery;
    post: NuPost;
    sessionConfig: NuSessionConfig;
    session: NuSession;
    cookie: NuCookie;
    param: string[];
    locale: string;
    config: Config;
    readonly isNu: boolean;
}
export interface Nus {
    const: NusConst;
    readonly req: http.IncomingMessage;
    readonly socket: tls.TLSSocket;
    readonly uri: url.UrlWithStringQuery;
    get: querystring.ParsedUrlQuery;
    sessionConfig: NuSessionConfig;
    session: NuSession;
    cookie: NuCookie;
    locale: string;
    config: Config;
    readonly isNus: boolean;
}

/** --- Session 对象 --- */
export interface NuSessionConfig {
    token: string;
    conn: Mysql.Pool | Mysql.Connection | Redis.Connection;
    etc?: Session.SessionEtc;
}

/** Nu Cookie 对象 */
export interface NuCookie {
    [key: string]: string;
}

/** --- Nu Post 对象 --- */
export interface NuPost {
    [key: string]: NuPostItem | NuPostItem[];
}
export type NuPostItem = string | NuPostFile;

/** --- Nu Session 对象 --- */
export interface NuSession {
    [key: string]: any;
}

/** --- Nu Post File 对象 --- */
export interface NuPostFile {
    name: string;
    rawName: string;
    size: number;
    path: string;
}
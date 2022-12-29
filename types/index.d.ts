/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2022-07-22 13:44:12
 * Last: 2022-07-22 13:44:12
 */
import * as url from 'url';
import * as http from 'http';

/** --- 虚拟机配置对象 --- */
export interface IVhost {
    readonly 'name': string;
    readonly 'domains': string[];
    readonly 'root': string;
    readonly 'cert': string;
    readonly 'key': string;
    readonly 'remark': string;
}

/** --- 上传的文件信息对象 --- */
export interface IPostFile {
    readonly 'name': string;
    readonly 'origin': string;
    readonly 'size': number;
    readonly 'path': string;
}

/** --- 动态目录配置文件 --- */
export interface IConfig {
    readonly 'const': IConfigConst;
    readonly 'db': IConfigDb;
    readonly 'kv': IConfigKv;
    readonly 'route': Record<string, string>;
    readonly 'session': {
        'name': string;
        'ttl': number;
        'ssl': boolean;
    };
    readonly 'set': {
        'timezone': number;
        'mustHttps': boolean;
        'cacheTtl': number;

        'staticVer': string;
        'staticPath': string;
    };
    readonly 'sql': IConfigSql;
    readonly 'dns': IConfigDns;
    [key: string]: Record<string, any>;
}

/** --- 动配数据库 --- */
export interface IConfigDb {
    'host': string;
    'port': number;
    'charset': string;
    'name': string;

    'user': string;
    'pwd': string;
}

/** --- DNS --- */
export interface IConfigDns {
    'sid': string;
    'skey': string;
}

/** --- 动配 kv --- */
export interface IConfigKv  {
    'host': string;
    'port': number;
    'index': number;
    'pre': string;

    'user': string;
    'pwd': string;
}

/** --- 动配 sql --- */
export interface IConfigSql {
    'pre': string;
}

/** --- 动配常量 --- */
export interface IConfigConst {
    'path': string;
    'startTime': bigint;
    'startMemory': number;

    // --- 环境判断 ---

    'mobile': boolean;
    'wechat': boolean;
    'https': boolean;
    'host': string;
    'hostname': string;
    'uri': url.UrlWithStringQuery;

    // --- 服务端用的路径 ---

    'rootPath': string;
    'modPath': string;
    'ctrPath': string;
    'viewPath': string;
    'dataPath': string;
    'wsPath': string;

    // --- 前端用的路径 ---

    'urlBase': string;
    'urlStc': string;
    'urlFull': string;
}

/** --- http headers --- */
export type THttpHeaders = http.IncomingHttpHeaders & {
    'httpVersion'?: string;
    'httpCode'?: number;
    'httpUrl'?: string;
};

/** --- Net Cookie 对象 --- */
export interface INetCookie {
    'name': string;
    'value': string;
    /** --- 有效期秒级时间戳 --- */
    'exp': number;
    'path': string;
    'domain': string;
    'secure': boolean;
}

/** --- 请求的传入参数选项 --- */
export interface INetOptions {
    'method'?: 'GET' | 'POST';
    'type'?: 'form' | 'json';
    'timeout'?: number;
    'follow'?: number;
    'hosts'?: Record<string, string>;
    'save'?: string;
    'local'?: string;
    'headers'?: THttpHeaders;
    /** --- cookie 托管对象 --- */
    'cookie'?: Record<string, INetCookie>;
}

export interface IUrlParse {
    'protocol': string | null;
    'auth': string | null;
    'user': string | null;
    'pass': string | null;
    'host': string | null;
    'hostname': string | null;
    'port': string | null;
    'pathname': string;
    'path': string | null;
    'query': string | null;
    'hash': string | null;
}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2022-07-22 13:44:12
 * Last: 2022-07-22 13:44:12, 2023-5-2 21:12:32, 2023-12-14 11:43:09
 */
import * as http from 'http';

/* eslint-disable @typescript-eslint/no-explicit-any */

/** --- 除非确定是不可知的 Json，否则不能使用 --- */
export type Json = any;

/* eslint-enable */

/** --- 数据库值的类型 --- */
export type DbValue = string | number | null | Record<string, Json>;

/** --- mod ls 对象 --- */
export declare class Rows<T> implements Iterable<T> {

    /** --- 总行数 --- */
    public get length(): number;

    /** --- 通过索引获取一个对象 --- */
    public item(index: number): T;

    /** --- 转换为数组对象 --- */
    public toArray(): Array<Record<string, DbValue>>;

    public [Symbol.iterator](): Iterator<T>;

}

/** --- 虚拟机配置对象 --- */
export interface IVhost {
    readonly 'name': string;
    readonly 'domains': string[];
    readonly 'root': string;
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
    'set': {
        'timezone': number;
        'mustHttps': boolean;
        'cacheTtl': number;

        'staticVer': string;
        'staticPath': string;
        'staticPathFull': string;

        [key: string]: Json;
    };
    'const': IConfigConst;
    'db': IConfigDb;
    'jwt': IConfigJwt;
    'kv': IConfigKv;
    'route': Record<string, string>;
    'session': {
        'name': string;
        'ttl': number;
        'ssl': boolean;
    };
    'sql': IConfigSql;
    'dns': IConfigDns;
    'lang': IConfigLang;

    [key: string]: Record<string, Json>;
}

/** --- 动配数据库 --- */
export interface IConfigLang {
    'list': string[];
    'direct': string[];
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

/** --- Jwt 信息 --- */
export interface IConfigJwt {
    'name': string;
    'ttl': number;
    'ssl': boolean;
    'secret': string;
    'auth': boolean;
}

/** --- DNS --- */
export interface IConfigDns {
    'sid': string;
    'skey': string;
}

/** --- 动配 kv --- */
export interface IConfigKv {
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
    'qs': string;
    'startTime': bigint;
    'startMemory': number;

    // --- 环境判断 ---

    'mobile': boolean;
    'wechat': boolean;
    'https': boolean;
    'host': string;
    'hostname': string;
    'hostport': number;
    'uri': IUrlParse;

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
    'urlStcFull': string;
}

/** --- http headers --- */
/* eslint-disable @typescript-eslint/naming-convention */
export type THttpHeaders = http.IncomingHttpHeaders & {
    'http-version'?: '1.1' | '2.0';
    'http-code'?: number;
    'http-url'?: string;
};
/* eslint-enable */

/** --- Net Cookie 对象 --- */
export interface ICookie {
    'name': string;
    'value': string;
    /** --- 有效期秒级时间戳 --- */
    'exp': number;
    'path': string;
    'domain': string;
    'secure': boolean;
    'httponly': boolean;
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

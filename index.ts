/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-3-30 12:46:41
 * Last: 2020-3-8 21:04:24, 2022-07-22 14:20:34, 2023-5-24 01:34:57, 2025-6-13 14:49:27, 2025-10-1 10:11:54
 * --- 本文件用来定义每个目录实体地址的常量 ---
 */

/** --- 当前系统版本号 --- */
export const VER = '7.3.1';

// --- 服务端用的路径 ---

const imu = decodeURIComponent(import.meta.url).replace('file://', '').replace(/^\/(\w:)/, '$1');
/** --- /xxx/xxx --- */
const dirname = imu.slice(0, imu.lastIndexOf('/'));

/** --- 框架根目录，以 / 结尾  --- */
export const ROOT_PATH = dirname + '/';
export const LIB_PATH = ROOT_PATH + 'lib/';
export const SYS_PATH = ROOT_PATH + 'sys/';

let cwd = process.cwd().replace(/\\/g, '/');
if (cwd.endsWith('source')) {
    // --- 开发环境下，cwd 在 source 的上级目录 ---
    cwd = cwd.slice(0, -7);
}

/** --- 执行根目录，以 / 结尾 --- */
export const ROOT_CWD = cwd + '/';
export const CONF_CWD = ROOT_CWD + 'conf/';
export const CERT_CWD = CONF_CWD + 'cert/';
export const VHOST_CWD = CONF_CWD + 'vhost/';
export const LIB_CWD = ROOT_CWD + 'lib/';
export const LOG_CWD = ROOT_CWD + 'log/';
export const WWW_CWD = ROOT_CWD + 'www/';
export const IND_CWD = ROOT_CWD + 'ind/';
export const FTMP_CWD = ROOT_CWD + 'ftmp/';
export const MOD_CWD = ROOT_CWD + 'mod/';

// --- 类型 ---

/** --- 除非确定是不可知的 Json，否则不能使用 --- */
export type Json = any;

/** --- 数据库值的类型 --- */
export type DbValue = string | number | null | Record<string, Json>;

/** --- 目录配置文件 --- */
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
    'db': Record<string, {
        'default': IConfigDb;
        'read': IConfigDb;
    }> & {
        'default': 'MYSQL' | 'PGSQL';
    };
    'kv': IConfigKv;
    'route': Record<string, string>;
    'session': {
        'name': string;
        'ttl': number;
        'ssl': boolean;
    };
    'sql': IConfigSql;
    'dns': Record<string, IConfigDns>;
    'lang': IConfigLang;
    's3': Record<string, IConfigS3>;
    'turnstile': IConfigTurnstile;
    'ai': Record<string, IConfigAi>;
    'vector': IConfigVector;

    [key: string]: Record<string, Json>;
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

/** --- 语言 --- */
export interface IConfigLang {
    'list': string[];
    'direct': string[];
}

/** --- 对象存储 --- */
export interface IConfigS3 {
    /** --- cf r2 要用 --- */
    'account'?: string;
    'sid': string;
    'skey': string;
    'region': string;
    'bucket': string;
}

/** --- AI --- */
export interface IConfigAi {
    /** --- 目前只有微软 Azure 有 --- */
    'endpoint'?: string;
    'skey': string;
}

/** --- 向量数据库 --- */
export interface IConfigVector {
    'host': string;
    'port': number;
    'name': string;
    'user': string;
    'pwd': string;
}

/** --- 人机码信息 --- */
export interface IConfigTurnstile {
    'CF': {
        'sid': string;
        'skey': string;
    };
    'TENCENT': {
        'sid': string;
        'skey': string;
        'aid': string;
        'akey': string;
    };
}

/** --- 数据库 --- */
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

/** --- kv --- */
export interface IConfigKv {
    'host': string;
    'port': number;
    'index': number;
    'pre': string;

    'user': string;
    'pwd': string;
}

/** --- sql --- */
export interface IConfigSql {
    'pre': string;
}

/** --- 常量 --- */
export interface IConfigConst {
    /** --- 不以 / 开头，不含 qs --- */
    'path': string;
    /** --- 不含 ? 开头 --- */
    'qs': string;
    /** --- 含 ? 开头 --- */
    'qss': string;
    'startTime': bigint;
    'startMemory': number;

    // --- 环境判断 ---

    'mobile': boolean;
    'wechat': boolean;
    'miniprogram': '' | 'wechat';
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

/** --- 虚拟机配置对象 --- */
export interface IVhost {
    readonly 'name'?: string;
    readonly 'domains': string[];
    readonly 'root': string;
    readonly 'remark'?: string;
}

/** --- 上传的文件信息对象 --- */
export interface IPostFile {
    readonly 'name': string;
    readonly 'origin': string;
    readonly 'size': number;
    readonly 'path': string;
}

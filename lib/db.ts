/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-4-15 13:40
 * Last: 2020-4-13 15:34:45, 2022-09-12 13:10:34, 2023-5-24 18:29:38, 2024-7-11 14:37:54, 2024-8-25 00:32:53, 2024-9-22 17:30:47, 2025-8-3 20:24:03, 2025-11-8 19:13:03
 */

// --- Pool 是使用时必须要一个用户创建一份的，Connection 是池子里获取的 ---

// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as sCtr from '#kebab/sys/ctr.js';
import { Connection } from './db/conn.js';
import { Pool, IConnectionInfo, getConnectionList } from './db/pool.js';
import { Transaction } from './db/tran.js';

/** --- 服务商定义 --- */
export enum ESERVICE {
    'MYSQL',
    'PGSQL',
}

/** --- query 返回的数据，未指定行类型时保留动态列访问 --- */
export interface IData<TRow extends object = Record<string, any>> {
    'rows': TRow[] | null;
    'fields': Array<{
        /** --- 字段名 --- */
        'name': string;
        /** --- 字段格式长度 --- */
        'length': number;
    }>;
    'error': {
        'message': string;
        'errno': number;
    } | null;
    /** --- 1-正常,-500-服务器错误 --- */
    'result': number;
}

/** --- exec 返回对象 --- */
export interface IPacket {
    'packet': {
        /** --- 受影响的行数 --- */
        'affected': number;
        /** --- 插入的 id --- */
        'insert': number;
    } | null;
    'fields': Array<{
        /** --- 字段名 --- */
        'name': string;
        /** --- 字段格式长度 --- */
        'length': number;
    }>;
    'error': {
        'message': string;
        'errno': number;
        [key: string]: any;
    } | null;
    /** --- 1-正常,-500-服务器错误 --- */
    'result': number;
}

/** --- query 查询选项 --- */
export interface IQueryOptions {
    /** --- 是否优先使用只读从库，默认 false（走主库）；未配置从库时自动走主库 --- */
    'read'?: boolean;
}

/**
 * --- 将只读从库配置规范化为完整连接列表，省略字段自动继承主库 ---
 * @param primary 主库连接配置
 * @param read 只读从库配置（单对象或数组）
 * @returns 有效的只读从库连接列表
 */
function normalizeReadConfigs(
    primary: kebab.IConfigDb,
    read?: Partial<kebab.IConfigDb> | Array<Partial<kebab.IConfigDb>>
): kebab.IConfigDb[] {
    if (!read) {
        return [];
    }
    const items = Array.isArray(read) ? read : [read];
    const list: kebab.IConfigDb[] = [];
    for (const item of items) {
        if (!item?.host) {
            continue;
        }
        list.push({
            'host': item.host,
            'port': item.port ?? primary.port,
            'charset': item.charset ?? primary.charset,
            'name': item.name ?? primary.name,
            'user': item.user ?? primary.user,
            'pwd': item.pwd ?? primary.pwd,
        });
    }
    return list;
}

/**
 * --- 获取 Db Pool 对象（单 Pool 内同时管理主库和可选只读从库） ---
 * @param ctrEtc 控制器对象或主库连接配置
 * @param opt 选项
 * @returns Db Pool 对象
 */
export function get(ctrEtc: sCtr.Ctr | kebab.IConfigDb, opt: {
    /** --- 服务商，未传时从控制器配置读取，直接传配置时默认 PGSQL --- */
    'service'?: ESERVICE;
    /** --- 可选只读从库配置，传入时覆盖控制器配置中的 read --- */
    'read'?: Partial<kebab.IConfigDb> | Array<Partial<kebab.IConfigDb>>;
} = {}): Pool {
    if (ctrEtc instanceof sCtr.Ctr) {
        // --- 从 ctr 中读取连接信息 ---
        const config = ctrEtc.getPrototype('_config');
        const service = opt.service !== undefined ? ESERVICE[opt.service] : config.db.default;
        const primary = config.db[service].default;
        const read = normalizeReadConfigs(primary, opt.read ?? config.db[service].read);
        return new Pool(primary, {
            'service': service === 'MYSQL' ? ESERVICE.MYSQL : ESERVICE.PGSQL,
            'read': read,
        });
    }
    const read = normalizeReadConfigs(ctrEtc, opt.read);
    return new Pool(ctrEtc, {
        'service': opt.service ?? ESERVICE.PGSQL,
        'read': read,
    });
}

export { Connection, Pool, IConnectionInfo, getConnectionList, Transaction };

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
import { Pool } from './db/pool.js';
import { Transaction } from './db/tran.js';

/** --- 服务商定义 --- */
export enum ESERVICE {
    'MYSQL',
    'PGSQL',
}

/** --- query 返回的数据 --- */
export interface IData {
    'rows': Array<Record<string, any>> | null;
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

/**
 * --- 获取 Db Pool 对象 ---
 * @param etc 配置信息可留空
 */
export function get(ctrEtc: sCtr.Ctr | kebab.IConfigDb, opt: {
    /** --- 服务商，默认 PGSQL --- */
    'service'?: ESERVICE;
} = {}): Pool {
    if (ctrEtc instanceof sCtr.Ctr) {
        // --- 从 ctr 中读取连接信息 ---
        const config = ctrEtc.getPrototype('_config');
        const service = opt.service ? ESERVICE[opt.service] : config.db.default;
        return new Pool(config.db[service].default, {
            'service': service === 'MYSQL' ? ESERVICE.MYSQL : ESERVICE.PGSQL,
        });
    }
    return new Pool(ctrEtc, {
        'service': opt.service ?? ESERVICE.PGSQL,
    });
}

export { Connection, Pool, Transaction };

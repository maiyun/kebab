/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-10-28 15:18:41
 * Last: 2025-10-28 15:18:44, 2026-5-20 23:31:45
 */
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lUndici from '#kebab/lib/undici.js';
import * as sCtr from '#kebab/sys/ctr.js';

/** --- 选项 --- */
export interface IOptions {
    /** --- 主机地址 --- */
    'host'?: string;
    /** --- 端口号 --- */
    'port'?: number;
    /** --- 数据库名称 --- */
    'name'?: string;
    /** --- 用户名 --- */
    'user'?: string;
    /** --- 密码 --- */
    'pwd'?: string;
}

export class Vector {

    /** --- 当前的 vector 连接信息 --- */
    private readonly _etc: kebab.IConfigVector;

    public constructor(etc: kebab.IConfigVector) {
        this._etc = etc;
    }

    /** --- 搜索 --- */
    public async search(data: {
        /** --- 表名 --- */
        'collection': string;
        /** --- 查询的向量 --- */
        'data': number[];
        /** --- 过滤器，如 word_count > 0 and book_id in [1, 2, 3] --- */
        'filter'?: string;
        /** --- 返回的结果数量，默认为 3 --- */
        'limit'?: number;
        /** --- 计算两个向量相似度的度量，默认 L2 --- */
        'metric'?: 'L2' | 'IP' | 'COSINE';
        /** --- 输出的字段，如 ['book_id', 'word_count']，默认全部 --- */
        'fields'?: string[];
    }): Promise<Array<{ 'id': string | number; 'distance': number; 'entity': Record<string, kebab.Json>; }> | false> {
        const body: Record<string, kebab.Json> = {
            'dbName': this._etc.name,
            'collectionName': data.collection,
            'data': [data.data],
            'limit': data.limit ?? 3,
            'searchParams': {
                'metricType': data.metric ?? 'L2',
            },
        };
        if (data.filter) {
            body['filter'] = data.filter;
        }
        if (data.fields) {
            body['outputFields'] = data.fields;
        }
        try {
            const res = await lUndici.postJsonResponseJson(
                `http://${this._etc.host}:${this._etc.port}/v2/vectordb/entities/search`,
                body,
                { 'headers': { 'Authorization': `Bearer ${this._etc.user}:${this._etc.pwd}` } }
            );
            if (res?.code !== 0) {
                lCore.log({}, '[VECTOR][search][error] ' + (res?.message ?? ''), '-error');
                lCore.debug('[VECTOR][search]', res);
                return false;
            }
            return res.data;
        }
        catch (e: any) {
            lCore.log({}, '[VECTOR][search][error] ' + e.message, '-error');
            lCore.debug('[VECTOR][search]', e);
            return false;
        }
    }

    /** --- 插入数据 --- */
    public async insert(data: {
        /** --- 表名 --- */
        'collection': string;
        /** --- 要插入的数据 --- */
        'data': Array<Record<string, kebab.Json>>;
    }): Promise<{ 'insertCount': number; 'insertIds': Array<string | number>; } | false> {
        try {
            const res = await lUndici.postJsonResponseJson(
                `http://${this._etc.host}:${this._etc.port}/v2/vectordb/entities/insert`,
                {
                    'dbName': this._etc.name,
                    'collectionName': data.collection,
                    'data': data.data,
                },
                { 'headers': { 'Authorization': `Bearer ${this._etc.user}:${this._etc.pwd}` } }
            );
            if (res?.code !== 0) {
                lCore.log({}, '[VECTOR][insert][error] ' + (res?.message ?? ''), '-error');
                lCore.debug('[VECTOR][insert]', res);
                return false;
            }
            return res.data;
        }
        catch (e: any) {
            lCore.log({}, '[VECTOR][insert][error] ' + e.message, '-error');
            lCore.debug('[VECTOR][insert]', e);
            return false;
        }
    }

    /** --- 删除数据 --- */
    public async delete(data: {
        /** --- 表名 --- */
        'collection': string;
        /** --- 过滤器，如 word_count > 0 and book_id in [1, 2, 3] --- */
        'filter': string;
    }): Promise<{ 'deletedCount': number; } | false> {
        try {
            const res = await lUndici.postJson(
                `http://${this._etc.host}:${this._etc.port}/v2/vectordb/entities/delete`,
                {
                    'dbName': this._etc.name,
                    'collectionName': data.collection,
                    'filter': data.filter,
                },
                { 'headers': { 'Authorization': `Bearer ${this._etc.user}:${this._etc.pwd}` } }
            );
            const json = await res.getJson();
            if (json?.code !== 0) {
                lCore.log({}, '[VECTOR][delete][error] ' + (json?.message ?? ''), '-error');
                return false;
            }
            return json.data;
        }
        catch (e: any) {
            lCore.log({}, '[VECTOR][delete][error] ' + e.message, '-error');
            lCore.debug('[VECTOR][delete]', e);
            return false;
        }
    }

}

/**
 * --- 创建一个 Vector 对象 ---
 * @param ctrEtc 控制器或配置信息
 */
export function get(ctrEtc: sCtr.Ctr | kebab.IConfigVector): Vector {
    if (ctrEtc instanceof sCtr.Ctr) {
        const config = ctrEtc.getPrototype('_config');
        return new Vector(config.vector);
    }
    return new Vector(ctrEtc);
}

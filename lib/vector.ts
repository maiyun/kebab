/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-10-28 15:18:41
 * Last: 2025-10-28 15:18:44
 */
import * as milvus from '@zilliz/milvus2-sdk-node';
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as sCtr from '#kebab/sys/ctr.js';

/** --- milvus 的连接对象 --- */
const links: Array<{
    'token': string;
    'link': milvus.MilvusClient;
}> = [];

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
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async seach(data: {
        /** --- 表名 --- */
        'collection': string;
        /** --- 查询的向量 --- */
        'data': number[];
        /** --- 过滤器，如 word_count > 0 and book_id in [1, 2, 3] --- */
        'filter'?: string;
        /** --- 返回的结果数量，默认为 2 --- */
        'limit'?: number;
        /** --- 计算两个向量相似度的度量，默认 L2 --- */
        'metric'?: 'L2' | 'IP' | 'COSINE';
        /** --- 输出的字段，如 ['book_id', 'word_count']，默认全部 --- */
        'fields'?: string[];
    }) {
        const link = await this._getConnection();
        if (!link) {
            return false;
        }
        try {
            const res = await link.search({
                'collection_name': data.collection,
                'data': data.data,
                'filter': data.filter,
                'limit': data.limit ?? 2,
                'metric_type': data.metric ?? 'L2',
                'output_fields': data.fields,
            });
            return res;
        }
        catch {
            return false;
        }
    }

    /** --- 插入数据 --- */
    public async insert(data: {
        /** --- 表名 --- */
        'collection': string;
        /** --- 要插入的数据 --- */
        'data': milvus.RowData[];
    }): Promise<milvus.MutationResult | false> {
        const link = await this._getConnection();
        if (!link) {
            return false;
        }
        try {
            const res = await link.insert({
                'collection_name': data.collection,
                'data': data.data,
            });
            return res;
        }
        catch {
            return false;
        }
    }

    /** --- 删除数据 --- */
    public async delete(data: {
        /** --- 表名 --- */
        'collection': string;
        /** --- 过滤器，如 word_count > 0 and book_id in [1, 2, 3] --- */
        'filter': string;
    }): Promise<milvus.MutationResult | false> {
        const link = await this._getConnection();
        if (!link) {
            return false;
        }
        try {
            const res = await link.delete({
                'collection_name': data.collection,
                'filter': data.filter,
            });
            return res;
        }
        catch {
            return false;
        }
    }

    /**
     * --- 从连接池中获取一个符合要求的连接 ---
     */
    private async _getConnection(): Promise<milvus.MilvusClient | null> {
        const token = `${this._etc.host}-${this._etc.port}-${this._etc.name}-${this._etc.user}`;
        const item = links.find(item => item.token === token);
        if (item) {
            return item.link;
        }
        // --- 没有找到合适的连接，创建一个 ---
        try {
            const link = new milvus.MilvusClient({
                'address': `${this._etc.host}:${this._etc.port}`,
                'ssl': false,
                'database': this._etc.name,
                'username': this._etc.user,
                'password': this._etc.pwd,
            });
            await link.connectPromise;
            links.push({
                'token': token,
                link,
            });
            return link;
        }
        catch (e: any) {
            lCore.debug('[VECTOR][_getConnection]', e.code, e.message);
            return null;
        }
    }

}

/**
 * --- 创建一个 Vector 对象 ---
 * @param opt 选项
 */
export function get(ctrEtc: sCtr.Ctr | kebab.IConfigVector): Vector {
    if (ctrEtc instanceof sCtr.Ctr) {
        const config = ctrEtc.getPrototype('_config');
        return new Vector(config.vector);
    }
    return new Vector(ctrEtc);
}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-10-28 15:18:41
 * Last: 2025-10-28 15:18:44
 */
import * as milvus from '@zilliz/milvus2-sdk-node';
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

    /** --- milvus 原生对象，建议只读 --- */
    public readonly link: milvus.MilvusClient;

    public constructor(ctr: sCtr.Ctr, opt?: IOptions) {
        const config = ctr.getPrototype('_config');
        const host = opt?.host ?? config.vector?.host ?? '127.0.0.1';
        const port = opt?.port ?? config.vector?.port ?? 19530;
        const name = opt?.name ?? config.vector?.name ?? 'default';
        const user = opt?.user ?? config.vector?.user ?? 'root';
        const pwd = opt?.pwd ?? config.vector?.pwd ?? 'Milvue';
        const token = `${host}-${port}-${name}-${user}`;
        const link = links.find((item) => item.token === token);
        if (link) {
            this.link = link.link;
            return;
        }
        this.link = new milvus.MilvusClient({
            'address': `${host}:${port}`,
            'ssl': false,
            'database': name,
            'username': user,
            'password': pwd,
        });
        links.push({
            'token': token,
            'link': this.link,
        });
    }

    /** --- 搜索 --- */
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async seach(data: {
        /** --- 表名 --- */
        'collection': string;
        /** --- 查询的向量 --- */
        'data': number[];
        /** --- 过滤器，如 word_count > 0 --- */
        'filter'?: string;
        /** --- 返回的结果数量，默认为 20 --- */
        'limit'?: number;
        /** --- 计算两个向量相似度的度量，默认 L2 --- */
        'metric'?: 'L2' | 'IP' | 'COSINE';
        /** --- 输出的字段，如 ['book_id', 'word_count']，默认全部 --- */
        'fields'?: string[];
    }) {
        try {
            return await this.link.search({
                'collection_name': data.collection,
                'data': data.data,
                'filter': data.filter,
                'limit': data.limit ?? 20,
                'metric_type': data.metric ?? 'L2',
                'output_fields': data.fields,
            });
        }
        catch {
            return false;
        }
    }

}

/**
 * --- 创建一个 Vector 对象 ---
 * @param opt 选项
 */
export function get(ctr: sCtr.Ctr, opt?: IOptions): Vector {
    return new Vector(ctr, opt);
}

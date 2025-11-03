/**
 * Project: Kebab, User: Tang Rukun, JianSuoQiYue
 * Date: 2025-10-27 21:31:06
 * Last: 2025-10-27 21:31:08
 */
import * as openai from 'openai';
import * as sCtr from '#kebab/sys/ctr.js';

/**
 * --- 参考：https://help.aliyun.com/zh/model-studio/what-is-model-studio ---
 * --- 阿里模型：https://help.aliyun.com/zh/model-studio/getting-started/models ---
 */

/** --- 服务商定义 --- */
export enum ESERVICE {
    /** --- 阿里中国大陆区 --- */
    'ALICN',
    /** --- 阿里国际区 --- */
    'ALIAS',
    /** --- 微软 Azure --- */
    'AZURE',
    /** --- 微软 Azure 2 --- */
    'AZURE2',
    /** --- 微软 Azure 3 --- */
    'AZURE3',
}

/** --- 选项 --- */
export interface IOptions {
    /** --- 服务商 ---- */
    'service': ESERVICE;
    /** --- 接入点 --- */
    'endpoint'?: string;
    /** --- 密钥 --- */
    'secretKey'?: string;
    /** --- 自定义 fetch 函数 --- */
    'fetch'?: (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
}

/** --- openai 的连接对象 --- */
const links: Array<{
    'token': string;
    'link': openai.OpenAI;
}> = [];

export class Ai {

    /** --- openai 原生对象，建议只读 --- */
    public readonly link: openai.OpenAI;

    public constructor(ctr: sCtr.Ctr, opt: IOptions) {
        const config = ctr.getPrototype('_config');
        const secretKey = opt.secretKey ?? config.ai?.[ESERVICE[opt.service]]?.skey ?? '';
        let endpoint: string | undefined;
        switch (opt.service) {
            case ESERVICE.ALICN: {
                endpoint = opt.endpoint ?? `https://dashscope.aliyuncs.com/compatible-mode/v1`;
                break;
            }
            case ESERVICE.ALIAS: {
                endpoint = opt.endpoint ?? `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`;
                break;
            }
            case ESERVICE.AZURE: {
                endpoint = opt.endpoint ?? config.ai?.[ESERVICE[opt.service]]?.endpoint ?? '';
                break;
            }
            case ESERVICE.AZURE2: {
                endpoint = opt.endpoint ?? config.ai?.[ESERVICE[opt.service]]?.endpoint ?? '';
                break;
            }
            case ESERVICE.AZURE3: {
                endpoint = opt.endpoint ?? config.ai?.[ESERVICE[opt.service]]?.endpoint ?? '';
                break;
            }
            default: {
                endpoint = undefined;
            }
        }
        const token = `${opt.service}-${secretKey}`;
        const link = links.find((item) => item.token === token);
        if (link) {
            this.link = link.link;
            return;
        }
        this.link = new openai.OpenAI({
            'apiKey': secretKey,
            'baseURL': endpoint,
            'fetch': opt.fetch,
        });
        links.push({
            'token': token,
            'link': this.link,
        });
    }

}

/**
 * --- 创建一个 AI 对象 ---
 * @param opt 选项
 */
export function get(ctr: sCtr.Ctr, opt: IOptions): Ai {
    return new Ai(ctr, opt);
}

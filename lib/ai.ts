/**
 * Project: Kebab, User: Tang Rukun, JianSuoQiYue
 * Date: 2025-10-27 21:31:06
 * Last: 2025-10-27 21:31:08
 */
import * as openai from 'openai';
import * as streaming from 'openai/streaming';
import * as lCore from '#kebab/lib/core.js';
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

    private readonly _ctr: sCtr.Ctr;

    public constructor(ctr: sCtr.Ctr, opt: IOptions) {
        this._ctr = ctr;
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

    /** --- 创建非流式对话 --- */
    public async chat(
        body: openai.default.Chat.Completions.ChatCompletionCreateParamsNonStreaming
    ): Promise<openai.APIPromise<openai.default.Chat.ChatCompletion> | false>;
    /** --- 创建流式对话 --- */
    public async chat(
        body: openai.default.Chat.Completions.ChatCompletionCreateParamsStreaming
    ): Promise<openai.APIPromise<streaming.Stream<openai.default.Chat.ChatCompletionChunk>> | false>;
    /** --- 创建对话 --- */
    public async chat(
        body: openai.default.Chat.Completions.ChatCompletionCreateParams
    ): Promise<openai.APIPromise<openai.default.Chat.ChatCompletion> |
        openai.APIPromise<streaming.Stream<openai.default.Chat.ChatCompletionChunk>> |
        false> {
        try {
            return await this.link.chat.completions.create(body);
        }
        catch (e: any) {
            lCore.debug('[AI][CHAT]', e);
            lCore.log(this._ctr, `[AI][CHAT] ${e.message}`, '-error');
            return false;
        }
    }

    /** --- 创建向量 --- */
    public async embedding(
        body: openai.default.EmbeddingCreateParams
    ): Promise<openai.APIPromise<openai.default.CreateEmbeddingResponse> | false> {
        try {
            return await this.link.embeddings.create(body);
        }
        catch (e: any) {
            lCore.debug('[AI][EMBEDDING]', e);
            lCore.log(this._ctr, `[AI][EMBEDDING] ${e.message}`, '-error');
            return false;
        }
    }

}

/**
 * --- 创建一个 AI 对象 ---
 * @param opt 选项
 */
export function get(ctr: sCtr.Ctr, opt: IOptions): Ai {
    return new Ai(ctr, opt);
}

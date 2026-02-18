/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-10-27 21:31:06
 * Last: 2025-10-27 21:31:08
 */
import * as openai from 'openai';
import * as streaming from 'openai/streaming';
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';
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
    /** --- Gemini --- */
    'GEMINI',
    /** --- Grok --- */
    'GROK',
    /** --- 火山引擎中国大陆区 --- */
    'VOLCN',
    /** --- 火山引擎国际区 --- */
    'VOLAS',
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

    /** --- openai 原生对象 --- */
    public readonly link: openai.OpenAI;

    private readonly _fetch: (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

    private readonly _service: ESERVICE;

    private readonly _endpoint: string;

    private readonly _ctr?: sCtr.Ctr;

    public constructor(ctrEtc: sCtr.Ctr | kebab.IConfigAi, opt: IOptions) {
        let configAi: kebab.IConfigAi | null = null;
        if (ctrEtc instanceof sCtr.Ctr) {
            this._ctr = ctrEtc;
            const config = ctrEtc.getPrototype('_config');
            configAi = config.ai[ESERVICE[opt.service]];
        }
        else {
            configAi = ctrEtc;
        }
        const secretKey = opt.secretKey ?? configAi.skey ?? '';
        const token = `${opt.service}-${secretKey}`;
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
                endpoint = opt.endpoint ?? configAi.endpoint ?? '';
                break;
            }
            case ESERVICE.AZURE2: {
                endpoint = opt.endpoint ?? configAi.endpoint ?? '';
                break;
            }
            case ESERVICE.GEMINI: {
                endpoint = opt.endpoint ?? `https://generativelanguage.googleapis.com/v1beta/openai/`;
                break;
            }
            case ESERVICE.GROK: {
                endpoint = opt.endpoint ?? `https://api.x.ai/v1`;
                break;
            }
            case ESERVICE.VOLCN: {
                endpoint = opt.endpoint ?? `https://ark.cn-beijing.volces.com/api/v3`;
                break;
            }
            case ESERVICE.VOLAS: {
                endpoint = opt.endpoint ?? `https://ark.ap-southeast.bytepluses.com/api/v3`;
                break;
            }
            default: {
                // --- ESERVICE.AZURE3 ---
                endpoint = opt.endpoint ?? configAi.endpoint ?? '';
            }
        }
        this._fetch = opt.fetch ?? fetch;
        this._service = opt.service;
        this._endpoint = endpoint;
        // --- 处理连接 ---
        const link = links.find(item => item.token === token);
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

    /** --- 获取当前服务商 --- */
    public get service(): ESERVICE {
        return this._service;
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
            lCore.log(this._ctr ?? {}, `[AI][CHAT] ${e.message}`, '-error');
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
            lCore.log(this._ctr ?? {}, `[AI][EMBEDDING] ${e.message}`, '-error');
            return false;
        }
    }

    /** --- 生成图像，不支持 GEMINI、GROK 服务商 --- */
    public async image(opt: {
        'model': string;
        /** --- 提示词 --- */
        'prompt': string;
        /** --- 参考图，请注意模型是否支持，以及是否支持多张，仅支持 ALICN、ALIAS、VOLCN、VOLAS 服务商 --- */
        'imgs'?: string[];
        /** --- 模型是否自动优化提示词，默认为 false，但有些服务商可能无效 --- */
        'extend'?: boolean;
        /** --- 负面提示词，用于引导模型避免生成某些内容 --- */
        'negative'?: string;
        /** --- 长 x 宽，不同模型要求不同，如 [1664, 928] --- */
        'size': number[];
        /* --- 生成图片的数量，默认为 1 --- */
        'n'?: number;
        /** --- 随机种子，默认为随机 --- */
        'seed'?: number;
    }): Promise<{
        /** --- 图像列表 --- */
        'list': Array<{
            'url': string;
            /** --- 优化后的提示词 --- */
            'text': string;
        }>;
        /** --- 随机种子 --- */
        'seed': number;
        /** --- 请求编号 --- */
        'request': string;
    } | false> {
        const seed = opt.seed ?? lCore.rand(0, 2147483647);
        switch (this._service) {
            case ESERVICE.ALICN:
            case ESERVICE.ALIAS: {
                try {
                    const res = await this._fetch(`https://dashscope${this._service === ESERVICE.ALIAS ? '-intl' : ''}.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation`, {
                        'method': 'POST',
                        'headers': {
                            'authorization': `Bearer ${this.link.apiKey}`,
                            'content-type': 'application/json',
                        },
                        'body': lText.stringifyJson({
                            'model': opt.model,
                            'input': {
                                'messages': [
                                    {
                                        'role': 'user',
                                        'content': [
                                            ...(opt.imgs?.map(url => ({
                                                'image': url,
                                            })) ?? []),
                                            {
                                                'text': opt.prompt,
                                            }
                                        ]
                                    }
                                ]
                            },
                            'parameters': {
                                'negative_prompt': opt.negative ?? ' ',
                                'prompt_extend': opt.extend ?? false,
                                'watermark': false,
                                'size': `${opt.size[0]}*${opt.size[1]}`,
                                'n': opt.n ?? 1,
                                'seed': seed,
                            },
                        }),
                    });
                    const json = await res.json();
                    if (!json.output?.choices?.[0]) {
                        lCore.debug('[AI][IMAGE]', json);
                        lCore.log(this._ctr ?? {}, `[AI][IMAGE] ${lText.stringifyJson(json)}`, '-error');
                        return false;
                    }
                    return {
                        'list': json.output.choices[0].message.content.filter((item: any) => item.image).map((item: any) => {
                            const content = json.output.choices[0].message.content;
                            const itemIndex = content.indexOf(item);
                            return {
                                'url': item.image,
                                'text': content[itemIndex + 1]?.text ?? '',
                            };
                        }),
                        'seed': seed,
                        'request': json.request_id,
                    };
                }
                catch (e: any) {
                    lCore.debug('[AI][IMAGE]', e);
                    lCore.log(this._ctr ?? {}, `[AI][IMAGE] ${e.message}`, '-error');
                    return false;
                }
            }
            case ESERVICE.AZURE:
            case ESERVICE.AZURE2:
            case ESERVICE.AZURE3: {
                try {
                    const json = await this.link.images.generate({
                        'model': opt.model,
                        'prompt': opt.prompt,
                        'size': `${opt.size[0]}x${opt.size[1]}` as any,
                        'n': opt.n ?? 1,
                    });
                    if (!json.data?.[0]) {
                        lCore.debug('[AI][IMAGE]', json);
                        lCore.log(this._ctr ?? {}, `[AI][IMAGE] ${lText.stringifyJson(json)}`, '-error');
                        return false;
                    }
                    return {
                        'list': json.data.map((item: any) => ({
                            'url': item.url ?? item.b64_json,
                            'text': item.revised_prompt ?? opt.prompt,
                        })),
                        'seed': seed,
                        'request': json.created.toString(),
                    };
                }
                catch (e: any) {
                    lCore.debug('[AI][IMAGE]', e);
                    lCore.log(this._ctr ?? {}, `[AI][IMAGE] ${e.message}`, '-error');
                    return false;
                }
            }
            case ESERVICE.GEMINI: {
                return false;
            }
            case ESERVICE.GROK: {
                return false;
            }
            case ESERVICE.VOLCN:
            case ESERVICE.VOLAS: {
                try {
                    const res = await this._fetch(`${this._endpoint}/images/generations`, {
                        'method': 'POST',
                        'headers': {
                            'authorization': `Bearer ${this.link.apiKey}`,
                            'content-type': 'application/json',
                        },
                        'body': lText.stringifyJson({
                            'model': opt.model,
                            'prompt': opt.prompt,
                            'watermark': false,
                            'size': `${opt.size[0]}x${opt.size[1]}`,
                            'seed': seed,
                            ...(opt.n && opt.n > 1 ? {
                                'sequential_image_generation': 'auto',
                                'sequential_image_generation_options': {
                                    'max_images': 4,
                                },
                            } : {
                                'sequential_image_generation': 'disabled',
                            }),
                            ...(opt.imgs?.length ? {
                                'image': opt.imgs.length === 1 ? opt.imgs[0] : opt.imgs,
                            } : {}),
                        }),
                    });
                    const json = await res.json();
                    if (!json.data?.[0]) {
                        lCore.debug('[AI][IMAGE]', json);
                        lCore.log(this._ctr ?? {}, `[AI][IMAGE] ${lText.stringifyJson(json)}`, '-error');
                        return false;
                    }
                    return {
                        'list': json.data.map((item: any) => ({
                            'url': item.url,
                            'text': opt.prompt,
                        })),
                        'seed': seed,
                        'request': json.created.toString(),
                    };
                }
                catch (e: any) {
                    lCore.debug('[AI][IMAGE]', e);
                    lCore.log(this._ctr ?? {}, `[AI][IMAGE] ${e.message}`, '-error');
                    return false;
                }
            }
        }
    }

    /** --- 异步生成视频，仅支持 ALICN、ALIAS --- */
    public async video(opt: {
        'model': string;
        /** --- 提示词，参考类可用 [I1] 指代图片，如 `[I1] 看向 [I2]` --- */
        'prompt': string;
        /** --- 文本(默认)、首尾帧、参考图 --- */
        'mode'?: 'text' | 'frame' | 'ref';
        // --- 参考图，1 张为首帧，2 张为首尾帧
        'imgs'?: string[];
        /** --- 负面提示词，用于引导模型避免生成某些内容 --- */
        'negative'?: string;
        /** --- 模型是否自动优化提示词，默认为 false，但有些服务商可能无效 --- */
        'extend'?: boolean;
        /** --- 分辨率，默认 720p --- */
        'resolution'?: '480p' | '720p' | '1080p';
        /** --- 比例，默认 16:9 --- */
        'ratio'?: '16:9' | '9:16' | '4:3' | '3:4' | '1:1' | '21:9';
        /** --- 视频时长，默认 2 秒 --- */
        'duration'?: number;
        /** --- 镜头，默认单镜头 single --- */
        'shot'?: 'single' | 'multi';
        /** --- 视频声音，默认 false，true 代表自动配音，字符串代表自定义音频网址 --- */
        'audio'?: boolean | string;
        /** --- 随机种子，默认为随机，范围 0 - 2147483647 --- */
        'seed'?: number;
    }): Promise<{
        'task': string;
        'status': 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'CANCELED' | 'UNKNOWN';
        'seed': number;
        'request': string;
    } | false> {
        if (this._service !== ESERVICE.ALICN && this._service !== ESERVICE.ALIAS) {
            return false;
        }
        const mode = opt.mode ?? 'text';
        const imgs = opt.imgs ?? [];
        const resolution = opt.resolution ?? '720p';
        const ratio = opt.ratio ?? '16:9';
        const duration = opt.duration ?? 2;
        const shot = opt.shot ?? 'single';
        const audio = opt.audio ?? false;
        const seed = opt.seed ?? lCore.rand(0, 2147483647);
        const extend = opt.extend ?? false;

        /** --- x*x --- */
        let size = '';
        if (resolution === '480p') {
            // --- 不支持 ---
            return false;
        }
        else if (resolution === '720p') {
            switch (ratio) {
                case '21:9': {
                    // --- 不支持 ---
                    return false;
                }
                case '16:9': {
                    size = '1280*720';
                    break;
                }
                case '9:16': {
                    size = '720*1280';
                    break;
                }
                case '4:3': {
                    size = '1088*832';
                    break;
                }
                case '3:4': {
                    size = '832*1088';
                    break;
                }
                default: {
                    // --- 1:1 ---
                    size = '960*960';
                }
            }
        }
        else {
            // --- 1080p ---
            switch (ratio) {
                case '21:9': {
                    // --- 不支持 ---
                    return false;
                }
                case '16:9': {
                    size = '1920*1080';
                    break;
                }
                case '9:16': {
                    size = '1080*1920';
                    break;
                }
                case '4:3': {
                    size = '1632*1248';
                    break;
                }
                case '3:4': {
                    size = '1248*1632';
                    break;
                }
                default: {
                    // --- 1:1 ---
                    size = '1440*1440';
                }
            }
        }
        try {
            const res = await this._fetch(`https://dashscope${this._service === ESERVICE.ALIAS ? '-intl' : ''}.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis`, {
                'method': 'POST',
                'headers': {
                    'authorization': `Bearer ${this.link.apiKey}`,
                    'content-type': 'application/json',
                    'X-DashScope-Async': 'enable',
                },
                'body': lText.stringifyJson({
                    'model': opt.model,
                    'input': {
                        'prompt': opt.prompt.replace(/\[I(\d+)\]/g, 'Character$1'),
                        ...(typeof audio === 'string' ? {
                            'audio_url': audio,
                        } : {})
                    },
                    'parameters': {
                        'negative_prompt': opt.negative ?? ' ',
                        'watermark': false,
                        'size': size,
                        'seed': seed,
                        'audio': audio ? true : false,
                        'duration': duration,
                        'shot_type': shot,
                        'prompt_extend': extend,
                        ...((mode !== 'text') && (mode === 'frame' ? (
                            imgs.length > 1 ? {
                                // --- 首尾帧 ---
                                'first_frame_url': imgs[0],
                                'last_frame_url': imgs[1],
                            } : {
                                // --- 首帧 ---
                                'img_url': imgs[0],
                            }
                        ) : {
                            'reference_urls': imgs,
                        })),
                    },
                }),
            });
            const json = await res.json();
            if (!json.output?.task_id) {
                lCore.debug('[AI][VIDEO]', json);
                lCore.log(this._ctr ?? {}, `[AI][VIDEO] ${lText.stringifyJson(json)}`, '-error');
                return false;
            }
            const task = json.output.task_id;
            return {
                'task': task,
                'status': json.output.task_status,
                'seed': seed,
                'request': json.request_id,
            };
        }
        catch (e: any) {
            lCore.debug('[AI][VIDEO]', e);
            lCore.log(this._ctr ?? {}, `[AI][VIDEO] ${e.message}`, '-error');
            return false;
        }
    }

    /** --- 轮询任务 --- */
    public async poll(opt: {
        'type': 'video';
        'task': string;
    }): Promise<{
        'task': string;
        'status': 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'CANCELED' | 'UNKNOWN';
        /** --- 任务提交时间 --- */
        'add'?: number;
        /** --- 任务开始时间 --- */
        'start'?: number;
        /** --- 任务结束时间 --- */
        'end'?: number;
        /** --- 文件地址 --- */
        'url'?: string;
        /** --- 错误信息，成功时不返回 --- */
        'error'?: string;
    } | false> {
        if (this._service !== ESERVICE.ALICN && this._service !== ESERVICE.ALIAS) {
            return false;
        }
        try {
            const res = await this._fetch(`https://dashscope${this._service === ESERVICE.ALIAS ? '-intl' : ''}.aliyuncs.com/api/v1/tasks/${opt.task}`, {
                'method': 'GET',
                'headers': {
                    'authorization': `Bearer ${this.link.apiKey}`,
                },
            });
            const json = await res.json();
            if (!json.output?.task_status) {
                lCore.debug('[AI][POLL]', json);
                lCore.log(this._ctr ?? {}, `[AI][POLL] ${lText.stringifyJson(json)}`, '-error');
                return false;
            }
            return {
                'task': json.output.task_id,
                'status': json.output.task_status,
                'add': json.output.submit_time,
                'start': json.output.scheduled_time,
                'end': json.output.end_time,
                'url': json.output.video_url,
                'error': json.output.message ? `(${json.output.code})${json.output.message}` : undefined,
            };
        }
        catch (e: any) {
            lCore.debug('[AI][POLL]', e);
            lCore.log(this._ctr ?? {}, `[AI][POLL] ${e.message}`, '-error');
            return false;
        }
    }
}

/**
 * --- 创建一个 AI 对象 ---
 * @param opt 选项
 */
export function get(ctrEtc: sCtr.Ctr | kebab.IConfigAi, opt: IOptions): Ai {
    return new Ai(ctrEtc, opt);
}

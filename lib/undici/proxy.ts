import type * as http from 'http';
import type * as http2 from 'http2';
import type { THttpHeaders } from '#kebab/lib/undici.js';
import { buildProxyHeaders, filterProxyHeaders as filterProxyHeadersImpl } from '#kebab/abox/proxy.js';

/** --- undici 和 ws 共用请求头模式，mproxy 仅支持 passthrough 和 request --- */
export interface IProxyHeaderOptions {
    /**
     * --- 默认 passthrough 透传；request 使用目标 Host 并清理代理来源头；reverse 保留外部 Host 并生成来源头 ---
     * passthrough 使用目标 Host，保留通过基础过滤的来路头，不自动生成来源头。
     * request/reverse 均清理传入的 Forwarded、X-Forwarded-*、Via、X-Real-IP 及 CDN 来源头。
     * reverse 的协议和 IP 仅取实际连接，不信任来路代理头；可信代理信息由业务验证后通过 headers 覆盖。
     */
    'proxyMode'?: 'passthrough' | 'request' | 'reverse';
}

/**
 * --- 过滤代理请求或响应的基础头部，不处理来源信息 ---
 * @param headers 待过滤的头部
 * @param res 传入时直接设置响应头并返回空对象，响应头已发送时不再写入
 * @param filter 业务过滤，返回 true 则保留
 * @returns 过滤后的头部，不修改输入
 */
export const filterProxyHeaders: (
    headers: http.IncomingHttpHeaders | http2.IncomingHttpHeaders | THttpHeaders,
    res?: http2.Http2ServerResponse | http.ServerResponse,
    filter?: (h: string) => boolean
) => Record<string, string | string[]> = filterProxyHeadersImpl;

/**
 * --- 构造上游请求头，依次执行基础过滤、业务 filter、模式处理及 headers 覆盖 ---
 * 保留 Cookie、Authorization、Origin、Referer 的业务语义，不保证请求无法被识别为代理。
 * 来源头包括 Forwarded、Via、X-Real-IP、X-Forwarded-*、CF-*、EO-*、True-Client-IP、Client-IP、
 * X-Client-IP、Fastly-Client-IP、X-Cluster-Client-IP、X-Envoy-External-Address、X-Original-Forwarded-For、
 * X-Original-Host、X-Original-URL、X-Rewrite-URL；业务可通过 filter 补充过滤，headers 覆盖优先级最高。
 * reverse 输出 Host、X-Forwarded-Host、X-Forwarded-Proto、X-Forwarded-For、X-Real-IP。
 * @param req 原始 HTTP 或 WebSocket 握手请求
 * @param opt 模式、业务过滤及显式覆盖的头部
 * @returns 独立的上游请求头对象，不修改输入
 */
export const getProxyHeaders: (
    req: http.IncomingMessage | http2.Http2ServerRequest,
    opt?: IProxyHeaderOptions & {
        'headers'?: http.IncomingHttpHeaders;
        filter?: (h: string) => boolean;
    }
) => http.IncomingHttpHeaders = buildProxyHeaders;

import type * as http from 'node:http';
import type * as kebab from '#kebab/index.js';
import * as implementation from '#kebab/abox/rpc.js';

/** --- 经认证的 RPC 命令及请求体摘要 --- */
export interface IMessage {
    'action': string;
    'bodyHash': string;
    [key: string]: kebab.Json;
}

/**
 * --- 校验密钥：至少 32 个字符，去除首尾空白后拒绝占位值及短重复模式 ---
 * @param secret 待校验密钥
 * @returns 密钥是否合格
 */
export const validSecret: (secret: unknown) => secret is string = implementation.validSecret;

/**
 * --- 计算内容的 SHA-256 ---
 * @param data 请求体内容
 * @returns 小写十六进制摘要
 */
export const hash: (data: string | Buffer) => string = implementation.hash;

/**
 * --- 流式计算文件的 SHA-256 ---
 * @param file 文件路径
 * @returns 小写十六进制摘要；读取失败返回 false
 */
export const hashFile: (file: string) => Promise<string | false> = implementation.hashFile;

/**
 * --- 加密认证命令、HTTP 方法和请求体摘要；自动生成时间与 nonce ---
 * @param message 动作及参数
 * @param secret RPC 密钥
 * @param method HTTP 方法，默认 GET
 * @param bodyHash 请求体的 SHA-256，默认空内容摘要
 * @returns URL 中的命令；密钥不合格时返回不可认证标记
 */
export const sign: (
    message: Record<string, unknown>, secret: string, method?: string, bodyHash?: string
) => string = implementation.sign;

/**
 * --- 校验密钥、方法及距当前时间不超过 5 秒的命令，并登记未使用的 nonce ---
 * @param req 请求，使用 URL、方法和 socket IP
 * @param secret RPC 密钥
 * @returns 认证命令；无效或已用 nonce、限速及缓存满时返回 false
 */
export const authenticate: (
    req: http.IncomingMessage, secret: unknown
) => IMessage | false = implementation.authenticate;

/**
 * --- 记录 socket IP 的失败次数 ---
 * @param req 被拒绝的请求
 * @returns 每个限速窗口仅首次失败返回 true，供审计
 */
export const reject: (req: http.IncomingMessage) => boolean = implementation.reject;

/**
 * --- 按字节上限读取并校验请求体；上传的临时文件由调用方删除 ---
 * @param req 请求流
 * @param expected 已认证的 SHA-256 摘要
 * @param directory 临时文件目录
 * @param upload 是否将请求体写入临时文件
 * @param limit 允许的最大字节数
 * @returns 内存内容或临时文件；失败返回 false 并清理临时文件
 */
export const readBody: (
    req: http.IncomingMessage, expected: string, directory: string, upload: boolean, limit: number
) => Promise<{ 'body'?: Buffer; 'file'?: string; } | false> = implementation.readBody;

/**
 * Project: Kebab
 * Date: 2026-3-22 00:00:00
 * --- 基于 Redis 的固定窗口和近似滑动窗口限速 ---
 */
import { checkRate } from '#kebab/abox/ratelimit.js';
import type * as lKv from '#kebab/lib/kv.js';

/**
 * --- 检查指定 key 是否超出近似滑动窗口限额，超限请求同样计入次数 ---
 * @param kv KV 实例
 * @param key 限速标识（如 IP、用户 UID 等）
 * @param opt 限速选项
 * @returns 检查结果；窗口开头最多多计一个时间段，Redis 无法检查时默认放行并标记 unavailable，failClosed 为 true 时拒绝
 */
export function check(kv: lKv.Kv, key: string, opt: ICheckOptions = {}): Promise<ICheckResult> {
    return checkRate(kv, key, opt, 'sliding');
}

/**
 * --- 检查指定 key 是否超出固定窗口限额，窗口从首次请求开始且超限请求同样计入次数 ---
 * @param kv KV 实例
 * @param key 限速标识
 * @param opt 限速选项
 * @returns 检查结果；后续请求沿用首次请求设置的过期时间，Redis 无法检查时默认放行并标记 unavailable，failClosed 为 true 时拒绝
 */
export function checkFixed(kv: lKv.Kv, key: string, opt: ICheckOptions = {}): Promise<ICheckResult> {
    return checkRate(kv, key, opt, 'fixed');
}

// --- 类型 ---

/** --- 限速检查选项 --- */
export interface ICheckOptions {
    /** --- 窗口时间（秒），默认 60 --- */
    'window'?: number;
    /** --- 窗口内最大请求数，默认 60 --- */
    'max'?: number;
    /** --- key 前缀，默认 rl: --- */
    'pre'?: string;
    /** --- Redis 无法检查时是否拒绝请求，默认 false（放行） --- */
    'failClosed'?: boolean;
}

/** --- 限速检查结果 --- */
export interface ICheckResult {
    /** --- 是否允许通过 --- */
    'allowed': boolean;
    /** --- 当前剩余可用次数 --- */
    'remaining': number;
    /** --- 总限额 --- */
    'limit': number;
    /** --- 预计恢复额度的 Unix 秒，滑动窗口按此后没有新请求估算 --- */
    'reset': number;
    /** --- Redis 无法检查限额时为 true --- */
    'unavailable'?: true;
}

/**
 * Project: Kebab
 * Date: 2026-3-22 00:00:00
 * --- Rate Limiting 限速库，支持令牌桶和滑动窗口两种策略 ---
 * --- 基于 KV（Redis）实现，天然支持多进程和多机部署 ---
 */
import * as lKv from '#kebab/lib/kv.js';
import * as lTime from '#kebab/lib/time.js';
import * as lCore from '#kebab/lib/core.js';

/**
 * --- 检查指定 key 是否超速，使用多段近似滑动窗口算法 ---
 * @param kv KV 实例
 * @param key 限速标识（如 IP、用户 UID 等）
 * @param opt 限速选项
 * @returns 返回结果对象
 */
export async function check(kv: lKv.Kv, key: string, opt: {
    /** --- 窗口时间（秒），默认 60 --- */
    'window'?: number;
    /** --- 窗口内最大请求数，默认 60 --- */
    'max'?: number;
    /** --- key 前缀，默认 rl: --- */
    'pre'?: string;
} = {}): Promise<ICheckResult> {
    const window = opt.window ?? 60;
    const max = opt.max ?? 60;
    const pre = opt.pre ?? 'rl:';
    const now = lTime.stamp();
    /** --- 将窗口分为 6 个子段 --- */
    const segSize = Math.max(Math.floor(window / 6), 1);
    /** --- 当前段标识 --- */
    const segId = Math.floor(now / segSize);
    /** --- 需要统计的段数 --- */
    const segCount = Math.ceil(window / segSize);
    /** --- 统计各段请求数总和 --- */
    let total = 0;
    for (let i = 0; i < segCount; ++i) {
        const segKey = `${pre}${key}:${segId - i}`;
        const val = await kv.get(segKey);
        if (val) {
            total += parseInt(val) || 0;
        }
    }
    // --- 当前段 +1 ---
    const currentSegKey = `${pre}${key}:${segId}`;
    const count = await kv.incr(currentSegKey);
    if (count === false) {
        // --- KV 连接失败，放行 ---
        lCore.debug('[RATELIMIT] KV incr failed, allow by default');
        return {
            'allowed': true,
            'remaining': max,
            'limit': max,
            'reset': now + window,
        };
    }
    if (count === 1) {
        await kv.expire(currentSegKey, window + segSize);
    }
    total += 1;
    const allowed = total <= max;
    return {
        'allowed': allowed,
        'remaining': allowed ? max - total : 0,
        'limit': max,
        'reset': (segId + 1) * segSize,
    };
}

/**
 * --- 简易固定窗口限速检查（性能更高，精度较低） ---
 * @param kv KV 实例
 * @param key 限速标识
 * @param opt 限速选项
 */
export async function checkFixed(kv: lKv.Kv, key: string, opt: {
    /** --- 窗口时间（秒），默认 60 --- */
    'window'?: number;
    /** --- 窗口内最大请求数，默认 60 --- */
    'max'?: number;
    /** --- key 前缀，默认 rl: --- */
    'pre'?: string;
} = {}): Promise<ICheckResult> {
    const window = opt.window ?? 60;
    const max = opt.max ?? 60;
    const pre = opt.pre ?? 'rl:';
    const now = lTime.stamp();
    const rkey = pre + key;

    const count = await kv.incr(rkey);
    if (count === false) {
        // --- KV 连接失败，放行 ---
        return {
            'allowed': true,
            'remaining': max,
            'limit': max,
            'reset': now + window,
        };
    }
    if (count === 1) {
        // --- 首次请求，设置过期时间 ---
        await kv.expire(rkey, window);
    }
    const allowed = count <= max;
    return {
        'allowed': allowed,
        'remaining': allowed ? max - count : 0,
        'limit': max,
        'reset': now + window,
    };
}

// --- 类型 ---

/** --- 限速检查结果 --- */
export interface ICheckResult {
    /** --- 是否允许通过 --- */
    'allowed': boolean;
    /** --- 剩余可用次数 --- */
    'remaining': number;
    /** --- 总限额 --- */
    'limit': number;
    /** --- 窗口重置时间（Unix 时间戳秒） --- */
    'reset': number;
}

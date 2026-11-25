import type { Kv } from '#kebab/lib/kv.js';
import type { ICheckOptions, ICheckResult } from '#kebab/lib/ratelimit.js';

const FIXED = `
    local ttl = redis.call('PTTL', KEYS[1])
    local count = 1
    if ttl < 0 then
        if ttl == -1 and not string.match(redis.call('GET', KEYS[1]), '^%d+$') then
            return redis.error_reply('ERR invalid fixed rate limit counter')
        end
        redis.call('SET', KEYS[1], '1', 'PX', ARGV[1])
        ttl = tonumber(ARGV[1])
    else
        count = redis.call('INCR', KEYS[1])
    end
    local time = redis.call('TIME')
    local now = tonumber(time[1]) * 1000 + math.floor(tonumber(time[2]) / 1000)
    return { count, math.ceil((now + ttl) / 1000) }
`;

const SLIDING = `
    if redis.replicate_commands then
        redis.replicate_commands()
    end
    local window = tonumber(ARGV[1])
    local limit = tonumber(ARGV[2])
    local width = math.floor(window / 6)
    local time = redis.call('TIME')
    local now = tonumber(time[1]) * 1000 + math.floor(tonumber(time[2]) / 1000)
    local first = math.floor((now - window) / width)
    local current = math.floor(now / width)
    local stored = redis.call('GET', KEYS[1])
    local previous = {}
    if stored then
        local ok, decoded = pcall(cjson.decode, stored)
        if not ok or type(decoded) ~= 'table' then
            return redis.error_reply('ERR invalid sliding rate limit counter')
        end
        previous = decoded
    end
    local segments = {}
    local total = 0
    for id = first, current do
        local field = tostring(id)
        local count = previous[field] or 0
        if id == current then
            count = count + 1
        end
        if count > 0 then
            segments[field] = count
            total = total + count
        end
    end
    redis.call('SET', KEYS[1], cjson.encode(segments), 'PX', (current + 1) * width + window - now)

    local required = math.max(1, total - limit + 1)
    for id = first, current do
        required = required - (segments[tostring(id)] or 0)
        if required <= 0 then
            return { total, math.ceil(((id + 1) * width + window) / 1000) }
        end
    end
`;

function normalize(value: number | undefined, scale: number): number {
    const integer = Math.floor(value ?? 60);
    return Number.isSafeInteger(integer * scale) ? Math.max(1, integer) : 60;
}

export async function checkRate(kv: Kv, key: string, opt: ICheckOptions, mode: 'fixed' | 'sliding'): Promise<ICheckResult> {
    const window = normalize(opt.window, 1000);
    const limit = normalize(opt.max, 1);
    const subject = (opt.pre ?? 'rl:') + key;
    const prefix = kv.getPre();
    const milliseconds = String(window * 1000);
    let result: unknown;
    if (mode === 'fixed') {
        result = await kv.eval(FIXED, [prefix + subject], [milliseconds]);
    }
    else {
        result = await kv.eval(SLIDING, [`${prefix}${subject}:sliding:${window}`], [milliseconds, String(limit)]);
    }
    if (Array.isArray(result) && result.length === 2 &&
        Number.isSafeInteger(result[0]) && result[0] > 0 && Number.isSafeInteger(result[1]) && result[1] > 0) {
        const [count, reset] = result as [number, number];
        return { allowed: count <= limit, remaining: Math.max(0, limit - count), limit, reset };
    }

    const allowed = !opt.failClosed;
    return { allowed, remaining: allowed ? limit : 0, limit, reset: Math.ceil(Date.now() / 1000) + window, unavailable: true };
}

import { createHash, randomBytes } from 'node:crypto';
import type * as lKv from '#kebab/lib/kv.js';
import type { ILoginCreateOptions, ILoginIdentity, ILoginRecord, IListLogin, ILoginOptions } from '#kebab/lib/session/login.js';

const script = `
local base = KEYS[1]
local op = ARGV[1]
local function record(hash) return base .. 'record:' .. hash end
local function index(hash) return base .. 'index:' .. hash end
local function read(hash)
    local data = redis.call('GET', record(hash))
    if not data then return nil end
    return cjson.decode(data)
end
local function indexExpiry(idx)
    local last = redis.call('ZREVRANGE', idx, 0, 0, 'WITHSCORES')
    if #last == 0 then return end
    local score = tonumber(last[2])
    if score == 9007199254740991 then redis.call('PERSIST', idx)
    else redis.call('EXPIREAT', idx, score) end
end
local function erase(hash, r)
    redis.call('DEL', record(hash))
    redis.call('ZREM', index(r.index), hash)
end
local function expiry(hash, r, ttl)
    local idx = index(r.index)
    local score = 9007199254740991
    if ttl > 0 then
        score = tonumber(redis.call('TIME')[1]) + ttl + 1
        redis.call('EXPIRE', record(hash), ttl)
    else redis.call('PERSIST', record(hash)) end
    redis.call('ZREMRANGEBYSCORE', idx, '-inf', redis.call('TIME')[1])
    redis.call('ZADD', idx, score, hash)
    indexExpiry(idx)
end
if op == 'create' then
    local hash, uid, data, idx, ttl = ARGV[2], ARGV[3], ARGV[4], ARGV[5], tonumber(ARGV[6])
    local old = read(hash)
    if old and old.uid == uid then return nil end
    local members = redis.call('ZRANGE', index(idx), 0, -1)
    for _, member in ipairs(members) do
        local r = read(member)
        if r and r.index == idx and r.uid == uid then return nil end
    end
    if old then
        erase(hash, old)
        indexExpiry(index(old.index))
    end
    for _, member in ipairs(members) do
        local r = read(member)
        if not r or r.index ~= idx then redis.call('ZREM', index(idx), member)
        elseif ARGV[7] == '1' then erase(member, r) end
    end
    local r = cjson.decode(data)
    r.timeAdd = tonumber(redis.call('TIME')[1])
    r.index = idx
    redis.call('SET', record(hash), cjson.encode(r))
    expiry(hash, r, ttl)
    r.index = nil
    return cjson.encode(r)
end
local hash = ARGV[2]
local me = read(hash)
if not me then return nil end
if op == 'get' then
    me.index = nil
    return cjson.encode(me)
end
if me.uid ~= ARGV[3] then return nil end
if op == 'touch' then
    expiry(hash, me, tonumber(ARGV[4]))
    return 1
end
if op == 'remove' then
    erase(hash, me)
    indexExpiry(index(me.index))
    return 1
end
local idx = me.index
redis.call('ZREMRANGEBYSCORE', index(idx), '-inf', redis.call('TIME')[1])
local members = redis.call('ZRANGE', index(idx), 0, -1)
local result = {}
local removed = false
local target = ARGV[4]
for _, member in ipairs(members) do
    local r = read(member)
    if not r or r.index ~= idx then
        redis.call('ZREM', index(idx), member)
    elseif op == 'list' then
        if r.version == me.version then
            r.index = nil
            r.current = member == hash
            table.insert(result, r)
        end
    elseif (target == 'others' and member ~= hash) or r.uid == target then
        erase(member, r)
        removed = true
    end
end
indexExpiry(index(idx))
if op == 'list' then
    if #result == 0 then return '[]' end
    return cjson.encode(result)
end
if target == 'others' or removed then return 1 end
return nil
`;

function hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
}

function tokenValid(token: string): boolean {
    return typeof token === 'string' && token.length > 0 && token.length <= 4096;
}

function uidValid(uid: string): boolean {
    return typeof uid === 'string' && /^[a-f0-9]{32}$/.test(uid);
}

function record(value: unknown): ILoginRecord {
    const row = value as ILoginRecord & { data: string; };
    return { ...row, data: JSON.parse(row.data) as ILoginRecord['data'] };
}

function parse(value: unknown): ILoginRecord | IListLogin[] | null | false {
    if (value === null || value === false) return value;
    try {
        if (Buffer.isBuffer(value)) value = value.toString('utf8');
        if (typeof value !== 'string') return false;
        const data: unknown = JSON.parse(value);
        return Array.isArray(data) ? data.map(row => record(row) as IListLogin) : record(data);
    }
    catch {
        return false;
    }
}

export class Store {
    private readonly _pre: string;

    private readonly _ttl: number;

    private readonly _valid: boolean;

    public constructor(private readonly _kv: lKv.Kv, options: ILoginOptions) {
        this._pre = this._kv.getPre() + options.name + ':' + (options.pre ?? 'login:');
        this._ttl = options.ttl ?? 172800;
        this._valid = typeof options.name === 'string' && options.name.length > 0 &&
            Number.isInteger(this._ttl) && this._ttl >= 0 && this._ttl <= 2147483647 &&
            (options.pre === undefined || typeof options.pre === 'string') && this._pre.length <= 1024;
    }

    private async _run(args: string[]): Promise<unknown | false> {
        if (!this._valid) return false;
        try {
            const pipeline = await this._kv.pipeline();
            if (pipeline === false) return false;
            pipeline.eval(script, [this._pre], args);
            const result = await pipeline.exec<unknown[]>();
            if (result.length !== 1 || result[0] instanceof Error) return false;
            return result[0];
        }
        catch {
            return false;
        }
    }

    public async create(token: string, identity: ILoginIdentity, options: ILoginCreateOptions): Promise<ILoginRecord | false> {
        if (!this._valid || !tokenValid(token)) return false;
        try {
            if (!options || (options.single !== undefined && typeof options.single !== 'boolean')) return false;
            const { subject, scope = '', version = '', data = {} } = identity;
            if (typeof subject !== 'string' || !subject || subject.length > 256 ||
                typeof scope !== 'string' || scope.length > 256 || typeof version !== 'string' || version.length > 1024 ||
                !data || typeof data !== 'object' || Array.isArray(data)) return false;
            const encoded = JSON.stringify(data, (_key, value: unknown) => {
                if (value === undefined || typeof value === 'function' || typeof value === 'symbol' ||
                    typeof value === 'bigint' || (typeof value === 'number' && !Number.isFinite(value))) {
                    throw new Error('Invalid login data');
                }
                return value;
            });
            if (Buffer.byteLength(encoded) > 16384) return false;
            const decoded: unknown = JSON.parse(encoded);
            if (!decoded || typeof decoded !== 'object' || Array.isArray(decoded)) return false;
            const index = hash(JSON.stringify([scope, subject]));
            for (let attempt = 0; attempt < 3; ++attempt) {
                const uid = randomBytes(16).toString('hex');
                const input = JSON.stringify({ uid, subject, scope, version, data: encoded });
                const result = parse(await this._run(['create', hash(token), uid, input, index, String(this._ttl), options.single === true ? '1' : '0']));
                if (result !== null) return result as ILoginRecord | false;
            }
            return false;
        }
        catch {
            return false;
        }
    }

    public async get(token: string): Promise<ILoginRecord | null | false> {
        if (!tokenValid(token)) return false;
        return parse(await this._run(['get', hash(token)])) as ILoginRecord | null | false;
    }

    private async _change(op: string, token: string, uid: string, extra: string = ''): Promise<true | null | false> {
        if (!tokenValid(token) || !uidValid(uid)) return false;
        const result = await this._run([op, hash(token), uid, extra]);
        return result === 1 ? true : result === null ? null : false;
    }

    public touch(token: string, uid: string): Promise<true | null | false> {
        return this._change('touch', token, uid, String(this._ttl));
    }

    public remove(token: string, uid: string): Promise<true | null | false> {
        return this._change('remove', token, uid);
    }

    public async list(token: string, uid: string): Promise<IListLogin[] | null | false> {
        if (!tokenValid(token) || !uidValid(uid)) return false;
        return parse(await this._run(['list', hash(token), uid])) as IListLogin[] | null | false;
    }

    public revoke(token: string, uid: string, target: string): Promise<true | null | false> {
        if (target !== 'others' && !uidValid(target)) return Promise.resolve(false);
        return this._change('revoke', token, uid, target);
    }
}

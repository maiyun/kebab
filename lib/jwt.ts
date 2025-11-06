/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2023-1-31 20:34:47
 * Last: 2023-1-31 20:34:47, 2023-12-8 13:55:09, 2025-11-6 16:22:06
 */

// --- 库和定义 ---
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lTime from '#kebab/lib/time.js';
import * as lText from '#kebab/lib/text.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as lKv from '#kebab/lib/kv.js';
import * as sCtr from '#kebab/sys/ctr.js';

export interface IOptions {
    'name'?: string;
    'ttl'?: number;
    'ssl'?: boolean;
    'secret'?: string;
    'auth'?: boolean;
}

export class Jwt {

    /** --- Kv --- */
    private _link?: lKv.Kv;

    /** --- 在前端或 Kv 中储存的名前缀 --- */
    private _name!: string;

    /** --- 有效期 --- */
    private _ttl!: number;

    /** --- cookie 模式时是否仅支持 SSL --- */
    private _ssl!: boolean;

    /** --- 验证密钥 --- */
    private _secret!: string;

    /** --- 是否从头部读取 --- */
    private _auth!: boolean;

    /** --- ctr 对象 --- */
    private _ctr!: sCtr.Ctr;

    /**
     * --- 初始化函数，相当于 construct ---
     * @param ctr 模型实例
     * @param link Kv 或 Db 实例
     * @param auth 设为 true 则优先从头 Authorization 或 post _auth 值读取 token
     * @param opt 选项
     */
    public async init(
        ctr: sCtr.Ctr,
        opt: IOptions = {},
        link?: lKv.Kv
    ): Promise<boolean> {
        const config = ctr.getPrototype('_config');
        this._ctr = ctr;
        this._link = link;
        this._name = opt.name ?? config.jwt.name;
        this._ttl = opt.ttl ?? config.jwt.ttl;
        this._ssl = opt.ssl ?? config.jwt.ssl;
        this._secret = opt.secret ?? config.jwt.secret;
        this._auth = opt.auth ?? config.jwt.auth;

        let jwt = '';
        if (this._auth) {
            const a = this._ctr.getAuthorization();
            if (typeof a !== 'string') {
                return false;
            }
            jwt = a;
        }
        if (!jwt) {
            const cookie = this._ctr.getPrototype('_cookie');
            if (!cookie[this._name]) {
                return false;
            }
            jwt = cookie[this._name];
        }

        const data = await decode(this._ctr, jwt, this._link, this._name, this._secret);
        if (!data) {
            // --- 清除 cookie ---
            const cookie = this._ctr.getPrototype('_cookie');
            if (cookie[this._name]) {
                delete cookie[this._name];
            }
            return false;
        }
        this._ctr.setPrototype('_jwt', data);
        return true;
    }

    /**
     * --- 将 _jwt 数据封装并返回（创建新的或者续期老的 token），默认会同时设置一个 cookie（data 值会自动设置 token、exp） ---
     */
    public renew(): string {
        const time = lTime.stamp();
        const data = this._ctr.getPrototype('_jwt');
        const token = lText.isFalsy(data['token']) ? lCore.random(16, lCore.RANDOM_LUN) : data['token'];
        data['exp'] = time + this._ttl;
        data['token'] = token;
        // --- 拼装 ---
        const header = lCrypto.base64Encode(lText.stringifyJson({
            'alg': 'HS256',
            'typ': 'JWT'
        }));
        const payload = lCrypto.base64Encode(lText.stringifyJson(data));
        const signature = lCrypto.hashHmac('sha256', header + '.' + payload, this._secret, 'base64');
        const jwt = header + '.' + payload + '.' + signature;
        if (!this._auth) {
            lCore.setCookie(this._ctr, this._name, jwt, {
                'ttl': this._ttl,
                'ssl': this._ssl
            });
        }
        return jwt;
    }

    /**
     * --- 清除 cookie，仅仅清除 cookie，jwt 并不会失效 ---
     */
    public clearCookie(): void {
        if (this._auth) {
            return;
        }
        lCore.setCookie(this._ctr, this._name, '', {
            'ttl': 0,
            'ssl': this._ssl
        });
    }

    /**
     * --- 销毁 jwt，其实就是将 token block 信息写入 redis，如果没有 redis 则不能销毁，返回数组代表销毁成功的 token 和原 exp，否则失败返回 false ---
     */
    public async destory(): Promise<{ token: string; exp: number; } | boolean> {
        if (!this._link) {
            return false;
        }
        const jwt = this._ctr.getPrototype('_jwt');
        if (!jwt.token) {
            return false;
        }
        const time = lTime.stamp();
        const token = jwt.token;
        const exp = jwt.exp;
        const ttl = exp - time;
        if (ttl <= 0) {
            lCore.emptyObject(jwt);
            return {
                token,
                exp
            };
        }
        lCore.emptyObject(jwt);
        await this._link.set(`${this._name}_block_${token}`, '1', ttl + 1);
        return {
            token,
            exp
        };
    }

}

/**
 * --- 获取 jwt 原始字符串，不保证有效 ---
 */
export function getOrigin(ctr: sCtr.Ctr, name: string = '', auth: boolean = false): string {
    if (!name) {
        name = ctr.getPrototype('_config').jwt.name;
    }
    let jwt = '';
    if (auth) {
        const a = ctr.getAuthorization();
        if (typeof a !== 'string') {
            return jwt;
        }
        jwt = a;
    }
    if (!jwt) {
        const cookie = ctr.getPrototype('_cookie');
        if (!cookie[name]) {
            return jwt;
        }
        jwt = cookie[name];
    }
    return jwt;
}

/**
 * --- decode ---
 * 不传入 link 的话，将不做 block 有效校验，只做本身的 exp 有效校验
 */
export async function decode(ctr: sCtr.Ctr, val: string, link?: lKv.Kv, name: string = '', secret: string = ''): Promise<Record<string, kebab.DbValue> | false> {
    if (!val) {
        return false;
    }
    const config = ctr.getPrototype('_config');
    if (!secret) {
        secret = config.jwt.secret;
    }
    if (!name) {
        name = config.jwt.name;
    }
    const jwtArray = val.split('.');
    if (!jwtArray[2]) {
        return false;
    }
    // jwtArray[1]: payload, jwtArray[2]: signature
    // --- 判断是否合法 ---
    const nsignature = lCrypto.hashHmac('sha256', jwtArray[0] + '.' + jwtArray[1], secret, 'base64');
    if (nsignature !== jwtArray[2]) {
        return false;
    }
    try {
        const payload = lCrypto.base64Decode(jwtArray[1]);
        if (!payload) {
            return false;
        }
        const data = lText.parseJson(payload);
        if (!data) {
            return false;
        }
        // --- 检测 token ---
        if (!data['token']) {
            return false;
        }
        // --- 检测 exp ---
        if (!data['exp']) {
            return false;
        }
        const time = lTime.stamp();
        if (data['exp'] < time) {
            // --- 过期 ---
            return false;
        }
        // --- 检测 token 是否有效 ---
        if (!link || !await link.get(name + '_block_' + data['token'])) {
            return data;
        }
        return false;
    }
    catch {
        return false;
    }
}

/**
 * --- 仅往 redis 写禁止相关 token 的数据，一般用于异步通知时在异处的服务器来调用的 ---
 */
export async function block(ctr: sCtr.Ctr, token: string, exp: number, link: lKv.Kv, name: string = ''): Promise<boolean> {
    const time = lTime.stamp();
    if (!name) {
        name = ctr.getPrototype('_config').jwt.name;
    }
    const ttl = exp - time;
    if (ttl <= 0) {
        return true;
    }
    await link.set(name + '_block_' + token, '1', ttl + 1);
    return true;
}

/**
 * @param ctr 模型实例
 * @param opt name, ttl, ssl, secret, auth: false, true 则优先从头 Authorization 或 post _auth 值读取 token
 * @param link 实例
 */
export async function get(ctr: sCtr.Ctr, opt: IOptions = {}, link?: lKv.Kv): Promise<Jwt> {
    const jwt = new Jwt();
    await jwt.init(ctr, opt, link);
    return jwt;
}

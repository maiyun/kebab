import * as sCtr from '#kebab/sys/ctr.js';
import type * as lKv from '#kebab/lib/kv.js';
import * as aLogin from '#kebab/abox/session-login.js';

/** --- 登录附加信息支持的 JSON 值 --- */
export type LoginValue = string | number | boolean | null | LoginValue[] | { [key: string]: LoginValue; };

/** --- 业务验证通过后交给框架保存的登录身份 --- */
export interface ILoginIdentity {
    /** --- 账号标识，非空，最多 256 个字符 --- */
    'subject': string;
    /** --- 账号作用域，如租户或账号体系；默认空字符串，最多 256 个字符 --- */
    'scope'?: string;
    /** --- 授权版本，如密码指纹；默认空字符串，最多 1024 个字符，由业务与当前数据比较 --- */
    'version'?: string;
    /** --- 客户端等附加信息，默认空对象；JSON 编码最多 16 KiB，不保存密码或凭据 --- */
    'data'?: Record<string, LoginValue>;
}

/** --- 已保存的登录授权，不包含 Session 凭据 --- */
export interface ILoginRecord {
    /** --- 本次登录 UID，每次成功登录重新生成 --- */
    'uid': string;
    /** --- 账号标识 --- */
    'subject': string;
    /** --- 账号作用域 --- */
    'scope': string;
    /** --- 业务授权版本，框架不查询业务数据验证此值 --- */
    'version': string;
    /** --- 登录时间，Redis 服务端 UTC Unix 秒 --- */
    'timeAdd': number;
    /** --- 登录时保存的附加信息 --- */
    'data': Record<string, LoginValue>;
}

/** --- 登录列表中的记录 --- */
export interface IListLogin extends ILoginRecord {
    /** --- 是否为当前登录 --- */
    'current': boolean;
}

/** --- 创建登录时的选项 --- */
export interface ILoginCreateOptions {
    /** --- 清退同账号、同作用域的其他登录（包含旧版本），默认 false；与创建原子执行 --- */
    'single'?: boolean;
}

/** --- Redis 登录管理选项 --- */
export interface ILoginOptions {
    /** --- Session 名称；传 token 时必填，传控制器时使用已初始化 Session 的实际名称 --- */
    'name'?: string;
    /** --- Session 名称之后的键名前缀，默认 login:；可进一步隔离授权用途 --- */
    'pre'?: string;
    /** --- 有效期秒数，默认 172800；整数 0～2147483647，0 表示永久；与业务 Session 有效期一致 --- */
    'ttl'?: number;
}

/**
 * --- 管理一个账号在多个客户端的登录授权 ---
 * 基于单节点 Redis；不会修改 Session 数据或 Cookie。业务每次请求须验证账号、权限和授权版本。
 * 失败返回 false；通信失败不能证明写操作未执行，调用方应重新读取后判断。
 */
export class Login {

    /** --- 创建管理器时绑定的 Session 凭据，不随控制器后续变化切换 --- */
    private readonly _token: string;

    /** --- Redis 登录记录和原子操作 --- */
    private readonly _store: aLogin.Store;

    /**
     * --- 创建可复用的登录管理器 ---
     * @param kv 项目 Kv，自动使用其配置前缀
     * @param ctrToken 已初始化 Session 的控制器或服务端验证过的 Session token；未初始化时操作返回 false
     * @param options 命名空间和有效期；无效选项使操作返回 false
     */
    public constructor(kv: lKv.Kv, ctrToken: sCtr.Ctr | string, options: ILoginOptions = {}) {
        if (ctrToken instanceof sCtr.Ctr) {
            const session = ctrToken.getPrototype('_sess');
            this._token = session?.getToken() ?? '';
            this._store = new aLogin.Store(kv, { ...options, 'name': session?.getName() });
        }
        else {
            this._token = ctrToken;
            this._store = new aLogin.Store(kv, options);
        }
    }

    /**
     * --- 创建登录授权并替换同一凭据原来绑定的身份 ---
     * 每次创建生成新 UID，包括同一账号在同一 Session 重复登录；旧 UID 随即失效。
     * single 开启时，同账号同作用域以最后执行成功的创建为准；所有登录入口须采用同一策略。
     * @param identity 已由业务验证的账号和附加信息
     * @param options 是否仅保留本次登录
     * @returns 新授权；输入无效或存储失败返回 false
     */
    public create(identity: ILoginIdentity, options: ILoginCreateOptions = {}): Promise<ILoginRecord | false> {
        return this._store.create(this._token, identity, options);
    }

    /**
     * --- 读取凭据当前绑定的登录授权，不延长有效期 ---
     * @returns 登录记录；null 表示未登录或已失效，false 表示输入无效或存储失败
     */
    public get(): Promise<ILoginRecord | null | false> {
        return this._store.get(this._token);
    }

    /**
     * --- 延长仍与本次请求读取的登录 UID 匹配的授权 ---
     * @param uid get 返回的登录 UID
     * @returns true 成功，null 已失效或被替换，false 输入无效或存储失败
     */
    public touch(uid: string): Promise<true | null | false> {
        return this._store.touch(this._token, uid);
    }

    /**
     * --- 退出凭据仍绑定的指定登录，保留 Session 本身 ---
     * @param uid get 返回的登录 UID
     * @returns true 已退出，null 已失效或被替换，false 输入无效或存储失败
     */
    public remove(uid: string): Promise<true | null | false> {
        return this._store.remove(this._token, uid);
    }

    /**
     * --- 列出当前账号、作用域及授权版本一致的有效登录 ---
     * 返回登录附加信息，业务响应前须筛选可展示字段；适合交互式账号的登录列表，不用于全站会话统计。
     * @param uid get 返回的当前登录 UID
     * @returns 登录列表；null 当前登录失效或被替换，false 输入无效或存储失败
     */
    public list(uid: string): Promise<IListLogin[] | null | false> {
        return this._store.list(this._token, uid);
    }

    /**
     * --- 清退当前账号和作用域内的指定登录或其他全部登录 ---
     * 清退覆盖所有授权版本；可指定当前登录，不能撤销其他账号或作用域的登录。
     * @param uid get 返回的当前登录 UID
     * @param target 目标登录 UID，默认 others 表示除当前登录以外的全部登录
     * @returns true 已清退，null 当前或目标登录失效，false 输入无效或存储失败
     */
    public revoke(uid: string, target: string = 'others'): Promise<true | null | false> {
        return this._store.revoke(this._token, uid, target);
    }
}

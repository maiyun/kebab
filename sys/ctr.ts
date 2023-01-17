/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-3-14 17:24:38
 * Last: 2020-3-30 15:31:40, 2022-07-22 16:59:00, 2022-09-12 23:51:56, 2022-09-23 15:53:58, 2022-12-29 01:18:08
 */
import * as http from 'http';
import * as http2 from 'http2';
import * as ejs from 'ejs';
import * as stream from 'stream';
import * as core from '../lib/core';
import * as fs from '../lib/fs';
import * as crypto from '../lib/crypto';
import * as session from '../lib/session';
import * as db from '../lib/db';
import * as kv from '../lib/kv';
import * as ws from '../lib/ws';
import * as text from '../lib/text';
import * as sRoute from '../sys/route';
import * as types from '../types';

/** --- 已加载的 DATA 数据缓存-- */
let loadedData: any = {};

/** --- 已加载的语言文件列表 --- */
let localeFiles: string[] = [];

/** --- 已经加载的语言包（全局） ---  */
let localeData: Record<string, Record<string, any>> = {};

/**
 * --- 清除已经加载的 data 与语言包文件缓存 ---
 */
export function clearLocaleData(): void {
    loadedData = {};
    localeFiles = [];
    localeData = {};
}

export class Ctr {

    /** --- 路由参数序列数组 --- */
    protected _param: string[] = [];

    /** --- 当前的 action 名 --- */
    protected _action = '';

    /** --- 请求的 header 列表 --- */
    protected _headers: http.IncomingHttpHeaders = {};

    /** --- GET 数据 --- */
    protected _get!: Record<string, string>;

    /** --- 原始 POST 数据 --- */
    protected _rawPost: Record<string, any> = {};

    /** --- POST 数据 --- */
    protected _post: Record<string, any> = {};

    /** --- 原始 input 字符串 */
    protected _input: string = '';

    /** --- 上传的文件列表 --- */
    protected _files: Record<string, types.IPostFile | types.IPostFile[]> = {};

    /** --- Cookie 数组 --- */
    protected _cookie: Record<string, string> = {};

    /** --- Session 数组 --- */
    protected _session: Record<string, any> = {};

    /** --- Session --- 对象 */
    protected _sess: session.Session | null = null;

    /** --- 页面浏览器客户端缓存 --- */
    protected _cacheTTL!: number;

    /** --- XSRF TOKEN 值 --- */
    protected _xsrf: string = '';

    /** --- 自定义 http code --- */
    protected _httpCode: number = 0;

    // --- Kebab: true，Mutton: false，全局常量等对象 ---

    /** --- 当前语言名 --- */
    private _locale: string = 'en';

    /** --- vhost 的 kebab.json 以及全局常量 --- */
    protected readonly _config!: types.IConfig;

    protected readonly _req!: http2.Http2ServerRequest | http.IncomingMessage;

    protected readonly _res!: http2.Http2ServerResponse | http.ServerResponse;

    protected readonly _socket!: stream.Duplex;

    /** --- 本 ctr 已加载的语言文件列表 --- */
    protected _localeFiles: string[] = [];

    /** --- 本 ctr 的 locale data --- */
    protected _localeData: Record<string, Record<string, string>> = {};

    public constructor(
        config: types.IConfig,
        req: http2.Http2ServerRequest | http.IncomingMessage,
        res: http2.Http2ServerResponse | http.ServerResponse | stream.Duplex
    ) {
        this._config = config;
        this._req = req;
        if (res instanceof stream.Duplex) {
            this._socket = res;
        }
        else {
            this._res = res;
        }
        this._cacheTTL = config.set.cacheTtl;
    }

    // --- Kebab 结束 ---

    /** --- 获取类内部的 prototype --- */
    public getPrototype(name: '_config'): types.IConfig;
    public getPrototype(name: '_sess'): session.Session | null;
    public getPrototype(name: '_headers'): http.IncomingHttpHeaders;
    public getPrototype(name: '_req'): http2.Http2ServerRequest | http.IncomingMessage;
    public getPrototype(name: '_res'): http2.Http2ServerResponse | http.ServerResponse;
    public getPrototype(name: '_rawPost' | '_post' | '_get' | '_session'): Record<string, any>;
    public getPrototype(name: '_input'): string;
    public getPrototype(name: string): any;
    public getPrototype(name: string): any {
        return (this as any)[name];
    }

    /** --- 设置类内部的 prototype --- */
    public setPrototype(
        name: string,
        val: string | string[] |
        http.IncomingHttpHeaders | Record<string, any> | session.Session | null
    ): void {
        (this as any)[name] = val;
    }

    /**
     * --- 实例化后会执行的方法，可重写此方法 ---
     */
    public onLoad(): boolean | string | Promise<boolean | string> {
        return true;
    }

    public onData(val: string): string | Promise<string>;
    /**
     * --- WebSocket 下会自动被调用的事件，可重写此方法 ---
     */
    public onData(): string {
        return '';
    }

    /**
     * --- WebSocket 下连接被终止后会自动被调用的事件，可重写此方法 ---
     */
    public onClose(): void | Promise<void> {
        return;
    }

    /**
     * --- 获取截止当前时间的总运行时间 ---
     * @param ms 为 true 为毫秒，否则为秒
     */
    protected _getRunTime(ms: boolean = false): number {
        const t = process.hrtime.bigint() - this._config.const.startTime;
        return ms ? Number(t) / 1000000 : Number(t) / 1000000000;
    }

    /**
     * --- 获取截止当前内存的使用情况 ---
     */
    protected _getMemoryUsage(): number {
        return process.memoryUsage().rss - this._config.const.startMemory;
    }

    /**
     * --- 加载视图 ---
     * @param path
     * @param data
     */
    protected async _loadView(path: string, data: any = {}): Promise<string> {
        const content = await fs.getContent(this._config.const.viewPath + path + '.ejs', 'utf8');
        if (!content) {
            return '';
        }
        data._urlBase = this._config.const.urlBase;
        data._staticVer = this._config.set.staticVer;
        data._staticPath = this._config.set.staticPath;
        // --- 语言包 ---
        data.l = (key: string, data?: string[]): string => {
            return this._l(key, data);
        };
        return core.purify(ejs.render(content, data));
    }

    /**
     * --- 检测提交的数据类型 ---
     * @param input 要校验的输入项
     * @param rule 规则
     * @param rtn 返回值
     */
    protected _checkInput(input: Record<string, any>, rule: Record<string, any[]>, rtn: any[]): boolean {
        // --- 遍历规则 ---
        // --- input, {'xx': ['require', '> 6', [0, 'xx 必须大于 6']], 'yy': [], '_xsrf': []], rtn ---
        for (const key in rule) {
            const val = rule[key];
            // --- key 就是上面的 xx ---
            if (input[key] === undefined) {
                // --- 原值不存在则设定为 null ---
                input[key] = null;
            }
            // --- 判断是否需要遍历 val ---
            const c = val.length;
            if (c === 0) {
                continue;
            }
            // --- ['require', '> 6', [0, 'xx 必须大于 6']] ---
            const lastK = c - 1;
            if ((val[lastK][0] === undefined) || (val[lastK][1] === undefined) || !Number.isInteger(val[lastK][0]) || (typeof val[lastK][1] !== 'string')) {
                rtn[0] = 0;
                rtn[1] = 'Param error';
                return false;
            }
            for (let k = 0; k < lastK; ++k) {
                const v = val[k] ?? '';
                if (Array.isArray(v)) {
                    if (v.length === 0) {
                        rtn[0] = val[lastK][0];
                        rtn[1] = val[lastK][1];
                        return false;
                    }
                    // --- 判断提交的数据是否在此 array 之内，若没有提交数据，则自动设置为第一个项 ---
                    if (input[key] === null) {
                        input[key] = v[0];
                    }
                    else if (!v.includes(input[key])) {
                        // --- 不在 ---
                        rtn[0] = val[lastK][0];
                        rtn[1] = val[lastK][1];
                        return false;
                    }
                }
                else {
                    switch (v) {
                        case 'require': {
                            if ((input[key] === null) || (input[key] === '')) {
                                rtn[0] = val[lastK][0];
                                rtn[1] = val[lastK][1];
                                return false;
                            }
                            break;
                        }
                        case 'num':
                        case 'number': {
                            if (input[key] !== null && !/^[0-9]+\.?[0-9]*$/.test(input[key])) {
                                rtn[0] = val[lastK][0];
                                rtn[1] = val[lastK][1];
                                return false;
                            }
                            break;
                        }
                        default: {
                            let match: RegExpExecArray | null;
                            if (input[key] !== null) {
                                if (v[0] === '/') {
                                    // --- 正则 ---
                                    if (!(new RegExp(v.slice(1, -1))).test(input[key])) {
                                        rtn[0] = val[lastK][0];
                                        rtn[1] = val[lastK][1];
                                        return false;
                                    }
                                }
                                else if ((match = /^([><=]+) *([0-9]+)$/.exec(v))) {
                                    // --- 判断表达式 ---
                                    let needReturn = false;
                                    const inputNum = Number(input[key]);
                                    const num = Number(match[2]);
                                    switch (match[1]) {
                                        case '>': {
                                            if (inputNum <= num) {
                                                needReturn = true;
                                            }
                                            break;
                                        }
                                        case '<': {
                                            if (inputNum >= num) {
                                                needReturn = true;
                                            }
                                            break;
                                        }
                                        case '>=': {
                                            if (inputNum < num) {
                                                needReturn = true;
                                            }
                                            break;
                                        }
                                        case '<=': {
                                            if (inputNum > num) {
                                                needReturn = true;
                                            }
                                            break;
                                        }
                                        case '=':
                                        case '==':
                                        case '===': {
                                            if (inputNum !== num) {
                                                needReturn = true;
                                            }
                                            break;
                                        }
                                        case '!=':
                                        case '<>': {
                                            if (inputNum === num) {
                                                needReturn = true;
                                            }
                                            break;
                                        }
                                    }
                                    if (needReturn) {
                                        rtn[0] = val[lastK][0];
                                        rtn[1] = val[lastK][1];
                                        return false;
                                    }
                                }
                                else {
                                    if (input[key] !== v) {
                                        rtn[0] = val[lastK][0];
                                        rtn[1] = val[lastK][1];
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return true;
    }

    /**
     * --- 检测提交的数据类型（会检测 XSRF） ---
     * @param input 要校验的输入项
     * @param rule 规则
     * @param rtn 返回值
     */
    protected _checkXInput(input: Record<string, any>, rule: Record<string, any[]>, rtn: any[]): boolean {
        if (rule['_xsrf'] === undefined) {
            rule['_xsrf'] = ['require', this._cookie['XSRF-TOKEN'], [0, 'Bad request, no permission.']];
        }
        return this._checkInput(input, rule, rtn);
    }

    /**
     * --- 当前页面开启 XSRF 支持（主要检测 cookie 是否存在） ---
     * --- 如果当前页面有 CDN，请不要使用 ---
     */
    protected _enabledXsrf(): void {
        // --- 设置 XSRF 值 ---
        if (this._cookie['XSRF-TOKEN'] === undefined) {
            const xsrf = core.random(16, core.RANDOM_LUN);
            this._xsrf = xsrf;
            core.setCookie(this, 'XSRF-TOKEN', xsrf, {
                'path': '/',
                'httponly': true
            });
            this._cookie['XSRF-TOKEN'] = xsrf;
        }
        else {
            this._xsrf = this._cookie['XSRF-TOKEN'];
        }
    }

    /**
     * --- 获取 Auth 字符串，用于客户端提交 ---
     * @param user 用户名
     * @param pwd 密码
     */
    protected _getBasicAuth(user: string, pwd: string): string {
        return 'Basic ' + crypto.base64Encode(user + ':' + pwd);
    }

    /** --- auth 对象，user, pwd --- */
    private _authorization: { 'user': string; 'pwd': string; } | null = null;

    /**
     * --- 通过 header 或 _auth 获取鉴权信息 ---
     */
    public getAuthorization(): { 'user': string; 'pwd': string; } | false {
        if (this._authorization !== null) {
            return this._authorization;
        }
        let auth = '';
        if (this._headers['authorization']) {
            auth = this._headers['authorization'];
        }
        else if (this._get['_auth']) {
            auth = this._get['_auth'];
        }
        else if (this._post['_auth']) {
            auth = this._post['_auth'];
        }
        let authArr = auth.split(' ');
        if (authArr[1] === undefined) {
            return false;
        }
        if (!(auth = crypto.base64Decode(authArr[1]))) {
            return false;
        }
        authArr = auth.split(':');
        this._authorization = { 'user': authArr[0], 'pwd': authArr[1] ?? '' };
        return this._authorization;
    }

    /**
     * --- 获取 data 数据 ---
     * @param path 文件路径（不含扩展名）
     */
    protected async _loadData(path: string): Promise<Record<string, any> | null> {
        const realPath = this._config.const.dataPath + path + '.json';
        if (loadedData[realPath]) {
            return loadedData[realPath];
        }
        const content = await fs.getContent(realPath, 'utf8');
        if (!content) {
            return null;
        }
        const json = JSON.parse(content);
        loadedData[realPath] = json;
        return json;
    }

    /**
     * --- 跳转（302临时跳转），支持相对本项目根路径的路径或绝对路径 ---
     * @param location 相对或绝对网址
     */
    protected _location(location: string): false {
        if (this._res) {
            this._res.setHeader('location', text.urlResolve(this._config.const.urlBase, location));
            // this._res.writeHead(302); Kebab 中要在最后设置，否则会报错：ERR_HTTP_HEADERS_SENT
        }
        return false;
    }

    /**
     * --- 开启 Session ---
     * @param link Kv 或 Db 实例
     * @param auth 设为 true 则从头 Authorization 或 post _auth 值读取 token
     * @param opt name, ttl, ssl, sqlPre
     */
    protected async _startSession(
        link: db.Pool | kv.Pool,
        auth: boolean = false,
        opt: session.IOptions = {}
    ): Promise<void> {
        this._sess = new session.Session();
        await this._sess.init(this, link, auth, opt);
    }

    // --- 本地化 ---

    /**
     * --- 设定语言并加载语言包 ---
     * @param loc 要加载的目标语言
     * @param pkg 包名，为空自动填充为 default
     */
    protected async _loadLocale(loc: string, pkg: string = 'default'): Promise<boolean> {
        const lName = loc + '.' + pkg;
        this._locale = loc;
        if (!this._localeFiles.includes(lName)) {
            // --- 检测全局缓存是否加载 ---
            const lPath = this._config.const.dataPath + 'locale/' + lName;
            if (!localeFiles.includes(lPath)) {
                // --- 全局缓存没有，先加载全局缓存 ---
                const locData = await this._loadData('locale/' + lName);
                if (locData === null) {
                    return false;
                }
                this._locale = loc;
                if (localeData[lPath] === undefined) {
                    localeData[lPath] = {};
                }
                if (localeData[lPath][loc] === undefined) {
                    localeData[lPath][loc] = {};
                }
                this._loadLocaleDeep(lPath, locData);
                localeFiles.push(lPath);
            }
            else {
                this._locale = loc;
            }
            // --- 缓存中一定有文件 ---
            if (this._localeData[loc] === undefined) {
                this._localeData[loc] = {};
            }
            for (const key in localeData[lPath][loc]) {
                this._localeData[loc][key] = localeData[lPath][loc][key];
            }
            this._localeFiles.push(lName);
        }
        else {
            this._locale = loc;
        }
        return true;
    }

    private _loadLocaleDeep(lPath: string, locData: Record<string, any>, pre: string = ''): void {
        for (const k in locData) {
            const v = locData[k];
            if (typeof v === 'object') {
                this._loadLocaleDeep(lPath, v, pre + k + '.');
            }
            else {
                localeData[lPath][this._locale][pre + k] = v;
            }
        }
    }

    /**
     * --- 根据当前后台语言包设置情况获取 JSON 字符串传输到前台 ---
     * @return string
     */
    protected _getLocaleJsonString(): string {
        if (this._localeData[this._locale] !== undefined) {
            return JSON.stringify(this._localeData[this._locale]);
        }
        else {
            return '{}';
        }
    }

    /**
     * --- 获取当前语言名 ---
     */
    protected _getLocale(): string {
        return this._locale;
    }

    // --- 以下：Mutton: false, Kebab: true ---

    /**
     * --- 获取语言包值 ---
     * @param key
     * @param data 要替换的数据
     */
    protected _l(key: string, data?: string[]): string {
        if (!this._localeData[this._locale]) {
            return 'LocaleError';
        }
        if (!this._localeData[this._locale][key]) {
            return 'LocaleError';
        }
        if (data) {
            let i: number = -1;
            return this._localeData[this._locale][key].replace(/\?/g, function() {
                ++i;
                if (!data[i]) {
                    return '';
                }
                return data[i];
            });
        }
        else {
            return this._localeData[this._locale][key];
        }
    }

    /**
     * --- 发送 socket 信息 ---
     * @param data 要发送的信息
     */
    protected _send(data: boolean | object | string | null): void {
        ws.send(this._socket, data);
    }

    /**
     * --- 获取 formdata 的信息 ---
     * @param events 文件处理情况
     */
    protected async _handleFormData(
        events: {
            onfilestart?: (name: string) => boolean | undefined;
            onfiledata?: (chunk: Buffer) => void;
            onfileend?: () => void;
        } = {}
    ): Promise<void> {
        const rtn = await sRoute.getFormData(this._req, events);
        for (const key in rtn.post) {
            this._post[key] = rtn.post[key];
        }
        for (const key in rtn.files) {
            this._files[key] = rtn.files[key];
        }
    }

}

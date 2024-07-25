/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-3-14 17:24:38
 * Last: 2020-3-30 15:31:40, 2022-07-22 16:59:00, 2022-09-12 23:51:56, 2022-09-23 15:53:58, 2022-12-29 01:18:08, 2023-2-28 20:07:57, 2023-12-27 18:39:35, 2024-3-1 19:38:53, 2024-4-9 16:03:58
 */
import * as http from 'http';
import * as http2 from 'http2';
import * as ejs from 'ejs';
import * as core from '../lib/core';
import * as fs from '../lib/fs';
import * as crypto from '../lib/crypto';
import * as session from '../lib/session';
import * as db from '../lib/db';
import * as kv from '../lib/kv';
import * as lWs from '../lib/ws';
import * as text from '../lib/text';
import * as sRoute from '../sys/route';
import * as types from '../types';

/** --- 已加载的 DATA 数据缓存（不是语言包）-- */
let loadedData: Record<
    string, // 文件名
    Record<string, types.Json>
> = {};

/** --- 已加载的语言文件列表 --- */
let localeFiles: string[] = [];

/** --- 已经加载的语言包（全局） ---  */
let localeData: Record<
    string, // 文件名
    Record<string, string>
> = {};

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
    protected _rawPost: Record<string, types.Json> = {};

    /** --- POST 数据 --- */
    protected _post: Record<string, types.Json> = {};

    /** --- 原始 input 字符串 */
    protected _input: string = '';

    /** --- 上传的文件列表 --- */
    protected _files: Record<string, types.IPostFile | types.IPostFile[]> = {};

    /** --- Cookie 数组 --- */
    protected _cookie: Record<string, string> = {};

    /** --- Jwt 数组 --- */
    protected _jwt: Record<string, types.Json> = {};

    /** --- Session 数组 --- */
    protected _session: Record<string, types.Json> = {};

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

    protected readonly _socket!: lWs.Socket;

    /** --- 本 ctr 已加载的语言文件列表 --- */
    protected _localeFiles: string[] = [];

    /** --- 本 ctr 的 locale data --- */
    protected _localeData: Record<string, Record<string, string>> = {};

    public constructor(
        config: types.IConfig,
        req: http2.Http2ServerRequest | http.IncomingMessage,
        res: http2.Http2ServerResponse | http.ServerResponse | lWs.Socket
    ) {
        this._config = config;
        this._req = req;
        if (res instanceof http2.Http2ServerResponse || res instanceof http.ServerResponse) {
            this._res = res;
        }
        else {
            this._socket = res;
        }
        this._cacheTTL = config.set.cacheTtl;
    }

    /** --- 当前用户连接是否还在连接中 --- */
    public get isAvail(): boolean {
        return this._req.socket.writable;
    }

    /** --- timeout 的 timer --- */
    protected _timer?: {
        'timer': NodeJS.Timeout;
        'callback': () => void;
    };

    private _timeout: number = 30_000;

    /** --- 获取当前过期时间 --- */
    public get timeout(): number {
        return this._timeout;
    }

    /**
     * --- 设置当前过期时间 ---
     */
    public set timeout(num: number) {
        if (!this._timer) {
            return;
        }
        this._timeout = num;
        clearTimeout(this._timer.timer);
        this._timer.timer = setTimeout(this._timer.callback, num);
    }

    // --- Kebab 结束 ---

    /** --- 获取类内部的 prototype --- */
    public getPrototype(name: '_config'): types.IConfig;
    public getPrototype(name: '_sess'): session.Session | null;
    public getPrototype(name: '_headers'): http.IncomingHttpHeaders;
    public getPrototype(name: '_req'): http2.Http2ServerRequest | http.IncomingMessage;
    public getPrototype(name: '_res'): http2.Http2ServerResponse | http.ServerResponse;
    public getPrototype(name: '_socket'): lWs.Socket;
    public getPrototype(name: '_rawPost' | '_post' | '_get' | '_session'): Record<string, types.Json>;
    public getPrototype(name: '_input'): string;
    public getPrototype(name: string): types.Json;
    public getPrototype(name: string): types.Json {
        return (this as types.Json)[name];
    }

    /** --- 设置类内部的 prototype --- */
    public setPrototype(
        name: string,
        val: string | string[] |
        http.IncomingHttpHeaders | Record<string, types.Json> | session.Session | null
    ): void {
        (this as types.Json)[name] = val;
    }

    /**
     * --- 实例化后会执行的方法，可重写此方法 ---
     */
    public onLoad(): boolean | string | types.DbValue[] |
    Promise<boolean | string | types.DbValue[]> {
        return true;
    }

    /**
     * --- 整个结束前会执行本方法，可重写此方法对输出结果再处理一次（Websocket 模式无效） ---
     * @param rtn 之前用户的输出结果
     */
    public onUnload(rtn: boolean | string | types.DbValue[]): boolean | string | types.DbValue[] |
    Promise<boolean | string | types.DbValue[]> {
        return rtn;
    }

    /**
     * --- WebSocket 下当收到数据时会自动被调用的事件，即只文本和二进制数据，返回内容会被发送给 socket，但返回 false 连接会被中断 ---
     */
    public onData(data: Buffer | string, opcode: lWs.EOpcode): types.Json;
    public onData(): string {
        return '';
    }

    /**
     * --- 包含所有 opcode 的消息，若要发送数据需自行调用 write 方法，返回 false 则不会执行默认方法 ---
     * @param data 数据
     * @param opcode opcode
     */
    public onMessage(data: Buffer | string, opcode: lWs.EOpcode): undefined | boolean | Promise<undefined | boolean>;
    public onMessage(): undefined {
        return;

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
    protected async _loadView(path: string, data: types.Json = {}): Promise<string> {
        const content = await fs.getContent(this._config.const.viewPath + path + '.ejs', 'utf8');
        if (!content) {
            return '';
        }
        data._urlBase = this._config.const.urlBase;
        data._urlFull = this._config.const.urlFull;
        data._urlStcFill = this._config.const.urlStcFull;
        data._staticVer = this._config.set.staticVer;
        data._staticPath = this._config.set.staticPath;
        data._staticPathFull = this._config.set.staticPathFull;
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
    protected _checkInput(
        input: Record<string, types.Json>,
        rule: Record<string, types.Json[]>, rtn: types.Json[]
    ): boolean {
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
                rtn[1] = 'Param error(' + key + ')';
                return false;
            }
            for (let k = 0; k < lastK; ++k) {
                const v = val[k] ?? '';
                if (Array.isArray(v)) {
                    if (v.length === 0) {
                        rtn[0] = val[lastK][0];
                        rtn[1] = val[lastK][1];
                        if (val[lastK][2]) {
                            rtn[2] = val[lastK][2];
                        }
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
                        if (val[lastK][2]) {
                            rtn[2] = val[lastK][2];
                        }
                        return false;
                    }
                }
                else if (v instanceof RegExp) {
                    // --- 正则 ---
                    if (!v.test(input[key])) {
                        rtn[0] = val[lastK][0];
                        rtn[1] = val[lastK][1];
                        if (val[lastK][2]) {
                            rtn[2] = val[lastK][2];
                        }
                        return false;
                    }
                }
                else {
                    switch (v) {
                        case 'require': {
                            if ((input[key] === null) || (input[key] === '')) {
                                rtn[0] = val[lastK][0];
                                rtn[1] = val[lastK][1];
                                if (val[lastK][2]) {
                                    rtn[2] = val[lastK][2];
                                }
                                return false;
                            }
                            break;
                        }
                        case 'num':
                        case 'number': {
                            if (input[key] && (typeof input[key] !== 'number') && !/^[0-9]+\.?[0-9]*$/.test(input[key])) {
                                rtn[0] = val[lastK][0];
                                rtn[1] = val[lastK][1];
                                if (val[lastK][2]) {
                                    rtn[2] = val[lastK][2];
                                }
                                return false;
                            }
                            break;
                        }
                        case 'array': {
                            if (input[key] !== null && !Array.isArray(input[key])) {
                                rtn[0] = val[lastK][0];
                                rtn[1] = val[lastK][1];
                                if (val[lastK][2]) {
                                    rtn[2] = val[lastK][2];
                                }
                                return false;
                            }
                            break;
                        }
                        case 'bool':
                        case 'boolean': {
                            if (input[key] !== null && (typeof input[key] !== 'boolean')) {
                                // --- 如果不是 bool 直接失败，字符串的 true, false 也会失败 ---
                                rtn[0] = val[lastK][0];
                                rtn[1] = val[lastK][1];
                                if (val[lastK][2]) {
                                    rtn[2] = val[lastK][2];
                                }
                                return false;
                            }
                            break;
                        }
                        case 'string': {
                            if (input[key] !== null && (typeof input[key] !== 'string')) {
                                // --- 如果不是 string 直接失败 ---
                                rtn[0] = val[lastK][0];
                                rtn[1] = val[lastK][1];
                                if (val[lastK][2]) {
                                    rtn[2] = val[lastK][2];
                                }
                                return false;
                            }
                            break;
                        }
                        default: {
                            let match: RegExpExecArray | null;
                            if (input[key]) {
                                if (v[0] === '/') {
                                    // --- 正则 ---
                                    if (!(new RegExp(v.slice(1, -1))).test(input[key])) {
                                        rtn[0] = val[lastK][0];
                                        rtn[1] = val[lastK][1];
                                        if (val[lastK][2]) {
                                            rtn[2] = val[lastK][2];
                                        }
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
                                        if (val[lastK][2]) {
                                            rtn[2] = val[lastK][2];
                                        }
                                        return false;
                                    }
                                }
                                else {
                                    if (input[key] !== v) {
                                        rtn[0] = val[lastK][0];
                                        rtn[1] = val[lastK][1];
                                        if (val[lastK][2]) {
                                            rtn[2] = val[lastK][2];
                                        }
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
    protected _checkXInput(
        input: Record<string, types.Json>, rule: Record<string, types.Json[]>, rtn: types.Json[]
    ): boolean {
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

    /**
     * --- 根据用户 ua 获取当前用户的设备类型 ---
     */
    protected _device(): 'android' | 'windows' | 'linux' | 'macintosh' | 'ipad' | 'unknown' {
        const ua = this._req.headers['user-agent']?.toLowerCase();
        if (!ua) {
            return 'unknown';
        }
        const list = ['android', 'windows', 'linux', 'macintosh', 'ipad', 'unknown'];
        for (const item of list) {
            if (!ua.includes(item)) {
                continue;
            }
            return item as any;
        }
        return 'unknown';
    }

    /** --- auth 对象，user, pwd --- */
    private _authorization: { 'user': string; 'pwd': string; } | null = null;

    /**
     * --- 通过 header 或 _auth 获取鉴权信息或 JWT 信息（不解析） ---
     */
    public getAuthorization(): { 'user': string; 'pwd': string; } | false | string {
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
        if (typeof auth !== 'string') {
            return false;
        }
        let authArr = auth.split(' ');
        if (authArr[1] === undefined) {
            return false;
        }
        if (authArr[1].includes('.')) {
            // --- 不解析，解析使用 JWT 类解析 ---
            return authArr[1];
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
    protected async _loadData(path: string): Promise<Record<string, string> | null> {
        const realPath = this._config.const.dataPath + path + '.json';
        if (loadedData[realPath]) {
            return loadedData[realPath];
        }
        const content = await fs.getContent(realPath, 'utf8');
        if (!content) {
            return null;
        }
        const json = text.parseJson(content);
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
            for (const key in localeData[lPath]) {
                this._localeData[loc][key] = localeData[lPath][key];
            }
            this._localeFiles.push(lName);
        }
        else {
            this._locale = loc;
        }
        return true;
    }

    private _loadLocaleDeep(lPath: string, locData: Record<string, types.Json>, pre: string = ''): void {
        for (const k in locData) {
            const v = locData[k];
            if (typeof v === 'object') {
                this._loadLocaleDeep(lPath, v, pre + k + '.');
            }
            else {
                localeData[lPath][pre + k] = v;
            }
        }
    }

    /**
     * --- 根据当前后台语言包设置情况获取 JSON 字符串传输到前台 ---
     * @return string
     */
    protected _getLocaleJsonString(): string {
        if (this._localeData[this._locale] !== undefined) {
            return text.stringifyJson(this._localeData[this._locale]);
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

    /**
     * --- 开启跨域请求 ---
     * 返回 true 接续执行，返回 false 需要中断用户本次访问（options请求）
     */
    protected _cross(): boolean {
        this._res.setHeader('access-control-allow-origin', '*');
        this._res.setHeader('access-control-allow-headers', '*');
        this._res.setHeader('access-control-allow-methods', '*');
        if (this._req.method === 'OPTIONS') {
            this._res.setHeader('access-control-max-age', '3600');
            return false;
        }
        return true;
    }

    // --- 以下：Mutton: false, Kebab: true ---

    /**
     * --- 获取语言包值 ---
     * @param key
     * @param data 要替换的数据
     */
    protected _l(key: string, data?: string[]): string {
        if (!this._localeData[this._locale]) {
            return '[LocaleError]' + key;
        }
        if (!this._localeData[this._locale][key]) {
            return '[LocaleError]' + key;
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
     * --- 发送 socket 文本 ---
     * @param data 要发送的信息
     */
    protected _writeText(data: string): boolean {
        return this._socket.writeText(data);
    }

    /**
     * --- 发送结果对象文本 ---
     * @param data 要发送的结果对象，如 [0, 'Failed.']
     */
    protected _writeResult(data: types.Json): boolean {
        return this._socket.writeResult(data);
    }

    /**
     * --- 发送 socket 二进制 ---
     * @param data 要发送的信息
     */
    protected _writeBinary(data: Buffer | string | Array<Buffer | string>): boolean {
        return this._socket.writeBinary(data);
    }

    /**
     * --- 发送 socket ping ---
     * @param data 要发送的信息
     */
    protected _ping(): boolean {
        return this._socket.ping();
    }

    /**
     * --- 发送 socket pong ---
     * @param data 要发送的信息
     */
    protected _pong(): boolean {
        return this._socket.pong();
    }

    /**
     * --- 主动关闭当前 socket 连接 ---
     */
    protected _end(): void {
        this._socket.end();
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

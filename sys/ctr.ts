/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-3-14 17:24:38
 * Last: 2020-3-30 15:31:40, 2022-07-22 16:59:00, 2022-09-12 23:51:56, 2022-09-23 15:53:58, 2022-12-29 01:18:08, 2023-2-28 20:07:57, 2023-12-27 18:39:35, 2024-3-1 19:38:53, 2024-4-9 16:03:58, 2025-2-12 18:55:44, 2025-6-12 16:56:08
 */
import ejs from 'ejs';
import * as http from 'http';
import * as http2 from 'http2';
import * as kebab from '#kebab/index.js';
import * as lCore from '#kebab/lib/core.js';
import * as lFs from '#kebab/lib/fs.js';
import * as lCrypto from '#kebab/lib/crypto.js';
import * as lSession from '#kebab/lib/session.js';
import * as lDb from '#kebab/lib/db.js';
import * as lKv from '#kebab/lib/kv.js';
import * as lWs from '#kebab/lib/ws.js';
import * as lText from '#kebab/lib/text.js';
import * as sRoute from '#kebab/sys/route.js';

/** --- 已加载的 DATA 数据缓存（不是语言包）-- */
let loadedData: Record<
    string, // 文件名
    Record<string, kebab.Json>
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

    /** --- 请求的 header 列表，key 均为小写 --- */
    protected _headers: http.IncomingHttpHeaders = {};

    /** --- GET 数据 --- */
    protected _get!: Record<string, string>;

    /** --- 原始 POST 数据 --- */
    protected _rawPost: Record<string, kebab.Json> = {};

    /** --- POST 数据 --- */
    protected _post: Record<string, kebab.Json> = {};

    /** --- 原始 input 字符串 */
    protected _input: string = '';

    /** --- 上传的文件列表 --- */
    protected _files: Record<string, kebab.IPostFile | kebab.IPostFile[]> = {};

    /** --- Cookie 数组 --- */
    protected _cookie: Record<string, string> = {};

    /** --- Session 数组 --- */
    protected _session: Record<string, any> = {};

    /** --- Session --- 对象 */
    protected _sess: lSession.Session | null = null;

    /** --- 页面浏览器客户端缓存 --- */
    protected _cacheTTL!: number;

    /** --- XSRF TOKEN 值 --- */
    protected _xsrf: string = '';

    /** --- 自定义 http code --- */
    protected _httpCode: number = 0;

    /** --- 当前语言名 --- */
    protected _locale: string = 'en';

    /** --- vhost 的 kebab.json 以及全局常量 --- */
    protected readonly _config!: kebab.IConfig;

    protected readonly _req!: http2.Http2ServerRequest | http.IncomingMessage;

    protected readonly _res!: http2.Http2ServerResponse | http.ServerResponse;

    protected readonly _socket!: lWs.Socket;

    /** --- 本 ctr 已加载的语言文件列表 --- */
    protected _localeFiles: string[] = [];

    /** --- 本 ctr 的 locale data --- */
    protected _localeData: Record<string, Record<string, string>> = {};

    public constructor(
        config: kebab.IConfig,
        req: http2.Http2ServerRequest | http.IncomingMessage,
        res?: http2.Http2ServerResponse | http.ServerResponse
    ) {
        this._config = config;
        this._req = req;
        if (res) {
            this._res = res;
        }
        this._cacheTTL = config.set.cacheTtl;
    }

    /** --- 当前用户连接是否还在连接中 --- */
    protected get _isAvail(): boolean {
        return this._req.socket.writable;
    }

    /** --- timeout 的 timer --- */
    protected _timer?: {
        'timer': NodeJS.Timeout;
        'timeout': number;
        'callback': () => void;
    };

    /** --- 获取当前过期时间（毫秒） --- */
    public get timeout(): number {
        return this._timer?.timeout ?? 30_000;
    }

    /**
     * --- 设置当前过期时间（毫秒） ---
     */
    public set timeout(num: number) {
        if (!this._timer) {
            return;
        }
        if (this._res.headersSent) {
            // --- 已经开始输出的，不能设置 timeout ---
            lCore.debug('[CTR][TIMEOUT][SET] headersSent is true, can not set timeout');
            return;
        }
        this._timer.timeout = num;
        clearTimeout(this._timer.timer);
        this._timer.timer = setTimeout(this._timer.callback, num);
    }

    /** --- 一些需要等待的事项的记录（异步任务、事务） --- */
    private readonly _waitInfo = {
        'asyncTask': {
            'count': 0,
            'resolve': () => {
                // --- NOTHING ---
            },
            'callback': function() {
                return new Promise<void>((resolve) => {
                    this.resolve = resolve;
                });
            }
        },
        'transaction': 0
    };

    /**
     * --- 执行一段跳出堆栈的异步代码，代码执行完成前，热更新不会杀死当面进程 且 ftmp 临时文件不会被清除 ---
     * @param func 异步代码
     */
    protected _asyncTask(func: () => void | Promise<void>): void {
        ++this._waitInfo.asyncTask.count;
        setTimeout((): void => {
            (async () => {
                await func();
                --this._waitInfo.asyncTask.count;
                if (!this._waitInfo.asyncTask.count) {
                    this._waitInfo.asyncTask.resolve();
                }
            })().catch(e => {
                lCore.display('[ERROR][CTR][ASYNCTASK]', e);
                lCore.log(this, '[CTR][_asyncTask] ' + lText.stringifyJson(e.stack).slice(1, -1), '-error');
                --this._waitInfo.asyncTask.count;
                if (!this._waitInfo.asyncTask.count) {
                    this._waitInfo.asyncTask.resolve();
                }
            });
        }, 0);

    }

    // --- Kebab 结束 ---

    /** --- 获取类内部的 prototype --- */
    public getPrototype(name: '_config'): kebab.IConfig;
    public getPrototype(name: '_sess'): lSession.Session | null;
    public getPrototype(name: '_headers'): http.IncomingHttpHeaders;
    public getPrototype(name: '_req'): http2.Http2ServerRequest | http.IncomingMessage;
    public getPrototype(name: '_res'): http2.Http2ServerResponse | http.ServerResponse;
    public getPrototype(name: '_socket'): lWs.Socket;
    public getPrototype(name: '_rawPost' | '_post' | '_get' | '_session'): Record<string, kebab.Json>;
    public getPrototype(name: '_input'): string;
    public getPrototype(name: string): kebab.Json;
    public getPrototype(name: string): kebab.Json {
        return (this as kebab.Json)[name];
    }

    /** --- 设置类内部的 prototype --- */
    public setPrototype(
        name: string,
        val: string | string[] |
        http.IncomingHttpHeaders | Record<string, kebab.Json> | lSession.Session | lWs.Socket | null
    ): void {
        (this as kebab.Json)[name] = val;
    }

    /**
     * --- 实例化后会执行的方法，可重写此方法 ---
     * @returns 返回 true 或 undefined 则继续执行 onReady，否则中止且对应的返回值将作为输出结果（WebSocket 下中止将断开连接）
     */
    public onLoad(): boolean | string | kebab.DbValue[] |
    Promise<boolean | string | kebab.DbValue[]> {
        return true;
    }

    /**
     * --- onLoad 执行后会执行的方法，可重写此方法 ---
     * @returns 返回 true 或 undefined 则继续执行 action，否则中止且对应的返回值将作为输出结果（WebSocket 下中止将断开连接）
     */
    public onReady(): boolean | string | kebab.DbValue[] |
    Promise<boolean | string | kebab.DbValue[]> {
        return true;
    }

    /**
     * --- 整个结束前会执行本方法，可重写此方法对输出结果再处理一次（Websocket 模式无效） ---
     * @param rtn 之前用户的输出结果
     * @returns 处理后的输出结果，将作为最终发送给客户端的内容
     */
    public onUnload(rtn: boolean | string | kebab.DbValue[]): boolean | string | kebab.DbValue[] |
    Promise<boolean | string | kebab.DbValue[]> {
        return rtn;
    }

    /**
     * --- WebSocket 下在建立 Server 连接之前可对 WebSocket 的信息进行配置 ---
     * @returns WebSocket 配置参数，包含自定义 header 和超时时间
     */
    public onUpgrade(): {
        'headers'?: http.OutgoingHttpHeaders;
        'timeout'?: number;
    } {
        return {};
    }

    /**
     * --- WebSocket 下当收到数据时会自动被调用的事件，即只文本和二进制数据，返回内容会被发送给 socket ---
     * @param data 数据
     * @param opcode 操作码
     * @returns 返回内容会被发送给 socket；若返回 false 则连接会被中断；不返回则不发送任何内容
     */
    public onData(data: Buffer | string, opcode: lWs.EOpcode): kebab.Json;
    public onData(): string {
        return '';
    }

    /**
     * --- 包含所有 opcode 的消息，若要发送数据需自行调用 write 方法，data 恒定为原始 buffer ---
     * --- 返回 false 则不会执行默认方法，一般请什么都不要返回 ---
     * --- 返回 false 链接也不会中断 ---
     * @param data 数据
     * @param opcode opcode
     */
    public onMessage(data: Buffer, opcode: lWs.EOpcode): undefined | boolean | Promise<undefined | boolean>;
    public onMessage(): undefined {
        return;

    }

    /**
     * --- WebSocket 下连接恢复可写入状态后会调用此事件，可重写此方法 ---
     */
    public onDrain(): void | Promise<void> {
        return;
    }

    /**
     * --- WebSocket 下连接被 end 后会自动被调用的事件，可重写此方法 ---
     */
    public onEnd(): void | Promise<void> {
        return;
    }

    /**
     * --- WebSocket 下连接被终止后会自动被调用的事件，可重写此方法 ---
     */
    public onClose(): void | Promise<void> {
        return;
    }

    /**
     * --- 请求发送开始时调用（仅会在 middle 内触发） ---
     * @returns 1-自动处理 POST (默认)，0-框架不自动处理 POST，-1-流程中断 (通常用于代理/反代场景)
     */
    public onReqStart(): number | Promise<number> {
        return 1;
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
    protected async _loadView(path: string, data: kebab.Json = {}): Promise<string> {
        const content = await lFs.getContent(this._config.const.viewPath + path + '.ejs', 'utf8');
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
        return lCore.purify(ejs.render(content, data, {}));
    }

    /**
     * --- 加载 React 全页面进行 SSR 渲染，组件需渲染完整 HTML 文档（含 html/head/body），无需 EJS ---
     * --- 框架自动注入 props：_urlBase/_urlFull/_urlStc/_staticVer/_staticPath/_staticPathFull ---
     * --- 多语言：自动注入 _locale（当前语言名）和 _localeData（已载语言包的合并键值对） ---
     * --- 组件内创建：const l = (key: string, ...args: string[]): string => { let i = 0; return (_localeData[key] ?? key).replace(/\?/g, () => args[i++] ?? ''); }; ---
     * @param path 页面组件路径（相对于 stc/ 目录，不含扩展名，tsx 编译后的 .js）
     * @param props 传入组件的 props，框架常量自动合并，整体序列化为内联 JSON 供客户端水合复用
     * @param opt 可选配置
     */
    protected async _loadReactPage(
        path: string,
        props: Record<string, kebab.Json> = {},
        opt: {
            /** --- 是否注入客户端水合脚本（import map + hydrateRoot），默认 true --- */
            'hydrate'?: boolean;
            /** --- react/react-dom/react-router-dom 版本号，用于 esm.sh CDN，默认 19 --- */
            'reactVer'?: string;
            /**
             * --- 路由模式，不传则不注入任何 Router，组件自行管理路由（如 MemoryRouter）或无路由 ---
             * --- 'browser'：服务端用 StaticRouter，客户端用 BrowserRouter，地址栏与路由联动 ---
             * --- 组件本身只需使用 Routes/Route/Link 等，不要包含任何 Router 包裹层 ---
             */
            'router'?: 'browser';
            /**
             * --- BrowserRouter 的 basename，相对于 urlBase，默认空字符串 ---
             * --- 例如组件挂载在 /test/react-router-page，则填 'test/react-router-page' ---
             */
            'routerBase'?: string;
            /**
             * --- 静态资源基础路径，覆盖 config.set.staticPath，用于指定 CDN 或自定义路径 ---
             * --- 影响 _staticPath prop 以及水合脚本中 JS 文件的 URL 前缀 ---
             */
            'staticPath'?: string;
        } = {}
    ): Promise<string> {
        // --- 约定：传入路径不含 .page 后缀，框架自动补全（对应 build 命令的 *.page.tsx 约定）---
        // --- 组件 JS 从 stc 目录读取，浏览器同样通过 staticPath（支持 CDN）下载 ---
        const componentPath = this._config.const.rootPath + 'stc/' + path + '.page.js';
        if (!await lFs.isFile(componentPath)) {
            return '';
        }
        try {
            const reactDomServer = await import('react-dom/server');
            const importPath = componentPath.startsWith('/')
                ? componentPath
                : `file:///${componentPath.replace(/\\/g, '/')}`;
            const mod = await import(importPath);
            const component = mod.default;
            const react = await import('react');
            // --- 语言包数据：合并所有已加载包的键值，供组件使用 _localeData 实现多语言 ---
            const localeData: Record<string, string> = {};
            for (const pkg in this._localeData) {
                Object.assign(localeData, this._localeData[pkg]);
            }
            // --- 把框架常量合并进 props，与 _loadView 行为一致 ---
            const staticPath = opt.staticPath ?? this._config.set.staticPath;
            const fullProps: Record<string, kebab.Json> = {
                ...props,
                '_urlBase': this._config.const.urlBase,
                '_urlFull': this._config.const.urlFull,
                '_urlStc': this._config.const.urlStc,
                '_staticVer': this._config.set.staticVer,
                '_staticPath': staticPath,
                '_staticPathFull': this._config.set.staticPathFull,
                '_locale': this._locale,
                '_localeData': localeData,
            };
            // --- 框架自动注入的 HTML 片段，用户组件无需手动渲染 ---
            let headInject = '';
            let bodyInject = '';
            if (opt.hydrate !== false) {
                const reactVer = opt.reactVer ?? '19';
                const esm = 'https://esm.sh/';
                // --- 检查是否有 npx kebab build 生成的自包含预构建包 ---
                const bundlePath = this._config.const.rootPath + 'stc/' + path + '.page.bundle.js';
                const hasBundle = await lFs.isFile(bundlePath);
                if (opt.router === 'browser') {
                    // --- BrowserRouter 模式：_routerBase 注入 props，供水合脚本读取 ---
                    const base = opt.routerBase ?? '';
                    const routerBase = this._config.const.urlBase + base.replace(/^\//, '');
                    fullProps['_routerBase'] = routerBase.replace(/\/$/, '');
                }
                // --- propsJson 在渲染前序列化，框架直接注入 HTML，组件无需手动渲染 ---
                const propsJson = lText.stringifyJson(fullProps).replace(/<\/script>/gi, '<\\/script>');
                let hydrateScript: string;
                if (hasBundle) {
                    // --- bundle 模式：bundle 自包含 React + 水合逻辑，无需 import map ---
                    const clientUrl = `${staticPath}${path}.page.bundle.js?v=${this._config.set.staticVer}`;
                    hydrateScript = `import'${clientUrl}';`;
                }
                else {
                    // --- 开发模式（tsc 编译 .js）：通过 esm.sh import map 解析 bare import ---
                    const clientUrl = `${staticPath}${path}.page.js?v=${this._config.set.staticVer}`;
                    // --- 内置 import map 条目（React 生态核心包）---
                    const builtinImports: Record<string, string> = {
                        'react': `${esm}react@${reactVer}`,
                        'react-dom': `${esm}react-dom@${reactVer}`,
                        'react-dom/client': `${esm}react-dom@${reactVer}/client`,
                        'react/jsx-runtime': `${esm}react@${reactVer}/jsx-runtime`,
                        'react-router-dom': `${esm}react-router-dom@7?external=react,react-dom`,
                    };
                    // --- 自动扫描入口 JS 及其相对引用，收集所有第三方 bare specifier ---
                    const scannedFiles = new Set<string>();
                    const extraImports = new Set<string>();
                    await this._scanImports(componentPath, scannedFiles, extraImports, builtinImports);
                    // --- 第三方包统一通过 esm.sh 解析，external react/react-dom 避免重复加载 ---
                    for (const pkg of extraImports) {
                        builtinImports[pkg] = `${esm}${pkg}?external=react,react-dom`;
                    }
                    // --- import map 注入到 </head> 前 ---
                    headInject = `<script type="importmap">${lText.stringifyJson({ 'imports': builtinImports })}</script>`;
                    // --- BrowserRouter 模式多一段 Router 导入与包裹层 ---
                    const routerImport = opt.router === 'browser' ? `import{BrowserRouter}from'react-router-dom';` : '';
                    const routerCreate = opt.router === 'browser'
                        ? `createElement(BrowserRouter,{basename:p._routerBase},createElement(App,p))`
                        : `createElement(App,p)`;
                    hydrateScript =
                        `import{hydrateRoot}from'react-dom/client';` +
                        `import{createElement}from'react';` +
                        routerImport +
                        `import App from'${clientUrl}';` +
                        `const p=JSON.parse(document.getElementById('__kebab_props__').textContent);` +
                        `hydrateRoot(document,${routerCreate});`;
                }
                // --- props JSON + 水合脚本注入到 </body> 前 ---
                bodyInject =
                    `<script id="__kebab_props__" type="application/json">${propsJson}</script>` +
                    `<script type="module">${hydrateScript}</script>`;
            }
            // --- BrowserRouter 模式：服务端用 StaticRouter 渲染，与客户端的 BrowserRouter 等价 ---
            // --- component 来自动态 import，TypeScript 无法精确推断，需要明确限定 element 类型 ---
            let element: Parameters<typeof reactDomServer.renderToString>[0] =
                react.createElement(component as Parameters<typeof react.createElement>[0], fullProps);
            if (opt.router === 'browser') {
                // --- StaticRouter 在 react-router-dom v7 中从主包直接导出，无需 /server 子路径 ---
                const lReactRouter = await import('react-router-dom');
                const reqUrl = this._req.url ?? '/';
                element = react.createElement(
                    lReactRouter.StaticRouter,
                    {
                        'location': reqUrl,
                        'basename': fullProps['_routerBase'] as string,
                    },
                    react.createElement(component as Parameters<typeof react.createElement>[0], fullProps)
                );
            }
            // --- 框架将 import map 注入 </head> 前，props JSON + 水合脚本注入 </body> 前 ---
            let html = '<!DOCTYPE html>' + reactDomServer.renderToString(element);
            if (opt.hydrate !== false) {
                html = html.replace('</head>', headInject + '</head>');
                html = html.replace('</body>', bodyInject + '</body>');
            }
            return html;
        }
        catch (e: kebab.Json) {
            lCore.debug(`[CTR][_loadReactPage] ${e.message ?? ''}`);
            return '';
        }
    }

    /**
     * --- 递归扫描 JS 文件中的 import 语句，收集第三方 bare specifier ---
     * @param filePath 当前要扫描的文件绝对路径
     * @param scannedFiles 已扫描文件集（去重用）
     * @param extraImports 收集到的第三方包名集合
     * @param builtinImports 内置 import map，已有条目不重复添加
     */
    private async _scanImports(
        filePath: string,
        scannedFiles: Set<string>,
        extraImports: Set<string>,
        builtinImports: Record<string, string>
    ): Promise<void> {
        if (scannedFiles.has(filePath)) {
            return;
        }
        scannedFiles.add(filePath);
        const src = await lFs.getContent(filePath, 'utf8');
        if (!src) {
            return;
        }
        const re = /\bfrom\s*['"]([^'"]+)['"]/g;
        let m;
        while ((m = re.exec(src)) !== null) {
            const spec = m[1];
            if (spec.startsWith('./') || spec.startsWith('../')) {
                // --- 相对引用：解析为绝对路径后递归扫描 ---
                const dir = filePath.substring(0, filePath.lastIndexOf('/') + 1);
                const resolved = new URL(spec, 'file://' + dir).pathname;
                await this._scanImports(resolved, scannedFiles, extraImports, builtinImports);
            }
            else if (!spec.startsWith('/') && !spec.startsWith('http') && !(spec in builtinImports)) {
                // --- 第三方 bare specifier：加入 import map ---
                extraImports.add(spec);
            }
        }
    }

    /**
     * --- 设置校验错误返回值 ---
     * @param rtn 返回值数组
     * @param lastVal 规则最后一项
     * @param msgSuffix 可选的消息后缀
     */
    private _setCheckError(rtn: kebab.Json[], lastVal: kebab.Json, msgSuffix?: string): void {
        rtn[0] = lastVal[0];
        rtn[1] = msgSuffix ? lastVal[1] + msgSuffix : lastVal[1];
        if (lastVal[2]) {
            rtn[2] = lastVal[2];
        }
    }

    /**
     * --- 检测提交的数据类型 ---
     * @param input 要校验的输入项
     * @param rule 规则, int, double, num(可字符串), array, bool, string, ascii
     * @param rtn 返回值
     */
    protected _checkInput(
        input: Record<string, kebab.Json>,
        rule: Record<string, kebab.Json[]>, rtn: kebab.Json[]
    ): boolean {
        // --- 遍历规则 ---
        // --- input, {'xx': ['require', '> 6', [0, 'xx 必须大于 6']], 'yy': [], '_xsrf': []], rtn ---
        for (const key in rule) {
            const val = rule[key];
            // --- key 就是上面的 xx ---
            input[key] ??= null;
            // --- 判断是否需要遍历 val ---
            const c = val.length;
            if (c === 0) {
                continue;
            }
            // --- ['require', '> 6', [0, 'xx 必须大于 6']] ---
            const lastK = c - 1;
            const lastVal = val[lastK];
            if ((lastVal[0] === undefined) || (lastVal[1] === undefined) || !Number.isInteger(lastVal[0]) || (typeof lastVal[1] !== 'string')) {
                rtn[0] = 0;
                rtn[1] = `Param error(${key})`;
                return false;
            }
            for (let k = 0; k < lastK; ++k) {
                const v = val[k] ?? '';
                if (Array.isArray(v)) {
                    if (v.length === 0) {
                        this._setCheckError(rtn, lastVal);
                        return false;
                    }
                    // --- 判断提交的数据是否在此 array 之内，若没有提交数据，则自动设置为第一个项 ---
                    if (input[key] === null) {
                        input[key] = v[0];
                    }
                    else if (!v.includes(input[key])) {
                        this._setCheckError(rtn, lastVal);
                        return false;
                    }
                }
                else if (v instanceof RegExp) {
                    // --- 正则 ---
                    if (input[key] !== null && !v.test(input[key])) {
                        this._setCheckError(rtn, lastVal);
                        return false;
                    }
                }
                else if (typeof v === 'object' && v.type !== undefined) {
                    // --- core.checkType ---
                    if (input[key] !== null) {
                        const r = lCore.checkType(input[key], v.type);
                        if (r) {
                            this._setCheckError(rtn, lastVal, typeof lastVal[1] === 'string' ? `(${r})` : undefined);
                            return false;
                        }
                    }
                }
                else if (typeof v === 'object' && v.schema !== undefined) {
                    // --- core.checkSchema ---
                    if (input[key] !== null) {
                        const r = lCore.checkSchema(input[key], v.schema);
                        if (r) {
                            this._setCheckError(rtn, lastVal, typeof lastVal[1] === 'string' ? `(${r})` : undefined);
                            return false;
                        }
                    }
                }
                else {
                    /** --- 是否需要返回错误 --- */
                    let needReturn = false;
                    switch (v) {
                        case 'require': {
                            needReturn = (input[key] === null) || (input[key] === '');
                            break;
                        }
                        case 'int':
                        case 'integer': {
                            // --- 必须是数字型且是整数 ---
                            needReturn = input[key] && !Number.isSafeInteger(input[key]);
                            break;
                        }
                        case 'float':
                        case 'double': {
                            // --- 必须是数字型 ---
                            needReturn = input[key] && (typeof input[key] !== 'number');
                            break;
                        }
                        case 'num':
                        case 'number': {
                            // --- 可字符串数字 ---
                            needReturn = input[key] && (typeof input[key] !== 'number') && !/^[0-9]+\.?[0-9]*$/.test(input[key]);
                            break;
                        }
                        case 'array': {
                            needReturn = input[key] !== null && !Array.isArray(input[key]);
                            break;
                        }
                        case 'bool':
                        case 'boolean': {
                            // --- 如果不是 bool 直接失败，字符串的 true, false 也会失败 ---
                            needReturn = input[key] !== null && (typeof input[key] !== 'boolean');
                            break;
                        }
                        case 'string': {
                            // --- 如果不是 string 直接失败 ---
                            needReturn = input[key] !== null && (typeof input[key] !== 'string');
                            break;
                        }
                        case 'ascii': {
                            // --- 必须是 ASCII 字符 ---
                            needReturn = input[key] !== null && !lText.isAscii(input[key]);
                            break;
                        }
                        default: {
                            if (input[key] === null) {
                                break;
                            }
                            if (v[0] === '/') {
                                // --- 正则 ---
                                needReturn = !(new RegExp(v.slice(1, -1))).test(input[key]);
                            }
                            else {
                                const match = /^([><=]+) *([0-9]+)$/.exec(v);
                                if (match) {
                                    // --- 判断表达式 ---
                                    const inputNum = Number(input[key]);
                                    const num = Number(match[2]);
                                    switch (match[1]) {
                                        case '>': {
                                            needReturn = inputNum <= num;
                                            break;
                                        }
                                        case '<': {
                                            needReturn = inputNum >= num;
                                            break;
                                        }
                                        case '>=': {
                                            needReturn = inputNum < num;
                                            break;
                                        }
                                        case '<=': {
                                            needReturn = inputNum > num;
                                            break;
                                        }
                                        case '=':
                                        case '==':
                                        case '===': {
                                            needReturn = inputNum !== num;
                                            break;
                                        }
                                        case '!=':
                                        case '<>': {
                                            needReturn = inputNum === num;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    needReturn = input[key] !== v;
                                }
                            }
                        }
                    }
                    if (needReturn) {
                        this._setCheckError(rtn, lastVal);
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * --- 检测提交的数据类型（会检测 XSRF） ---
     * @param input 要校验的输入项
     * @param rule 规则, int, double, num(可字符串), array, bool, string, ascii
     * @param rtn 返回值
     */
    protected _checkXInput(
        input: Record<string, kebab.Json>, rule: Record<string, kebab.Json[]>, rtn: kebab.Json[]
    ): boolean {
        rule['_xsrf'] ??= ['require', this._cookie['XSRF-TOKEN'], [0, 'Bad request, no permission.']];
        return this._checkInput(input, rule, rtn);
    }

    /**
     * --- 当前页面开启 XSRF 支持（主要检测 cookie 是否存在） ---
     * --- 如果当前页面有 CDN，请不要使用 ---
     */
    protected _enabledXsrf(opt?: {
        'domain'?: string;
    }): void {
        // --- 设置 XSRF 值 ---
        if (this._cookie['XSRF-TOKEN'] === undefined) {
            const xsrf = lCore.random(16, lCore.RANDOM_LUN);
            this._xsrf = xsrf;
            lCore.setCookie(this, 'XSRF-TOKEN', xsrf, {
                'path': '/',
                'httponly': true,
                'domain': opt?.domain,
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
        return 'Basic ' + lCrypto.base64Encode(user + ':' + pwd);
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

    /** --- auth 对象 --- */
    private _authorization: { 'type': 'basic'; 'user': string; 'pwd': string; } | { 'type': 'bearer'; 'token': string; } | null = null;

    /**
     * --- 通过 header 或 _auth 获取鉴权信息，支持 Basic Auth 和 Bearer Token ---
     */
    public getAuthorization():
        { 'type': 'basic'; 'user': string; 'pwd': string; } |
        { 'type': 'bearer'; 'token': string; } | false {
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
        const spaceIdx = auth.indexOf(' ');
        if (spaceIdx === -1) {
            return false;
        }
        const scheme = auth.slice(0, spaceIdx).toLowerCase();
        const credential = auth.slice(spaceIdx + 1).trim();
        if (!credential) {
            return false;
        }
        if (scheme === 'bearer') {
            this._authorization = { 'type': 'bearer', 'token': credential };
            return this._authorization;
        }
        // --- Basic Auth: base64(user:pwd) ---
        const decoded = lCrypto.base64Decode(credential);
        if (!decoded) {
            return false;
        }
        const colonIdx = decoded.indexOf(':');
        const user = colonIdx === -1 ? decoded : decoded.slice(0, colonIdx);
        const pwd = colonIdx === -1 ? '' : decoded.slice(colonIdx + 1);
        this._authorization = { 'type': 'basic', 'user': user, 'pwd': pwd };
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
        const content = await lFs.getContent(realPath, 'utf8');
        if (!content) {
            return null;
        }
        const json = lText.parseJson<any>(content);
        loadedData[realPath] = json;
        return json;
    }

    /**
     * --- 跳转（302临时跳转），支持相对本项目根路径的路径或绝对路径 ---
     * @param location 相对或绝对网址
     */
    protected _location(location: string): false {
        if (this._res) {
            this._res.setHeader('location', lText.urlResolve(this._config.const.urlBase, location));
            // this._res.writeHead(302); Kebab 中要在最后设置，否则会报错：ERR_HTTP_HEADERS_SENT
        }
        return false;
    }

    /**
     * --- 开启 Session ---
     * @param link Kv 或 Db 实例
     * @param auth 设为 true 则从头 Authorization 或 post _auth 值读取 token
     * @param opt 选项
     */
    protected _startSession(
        link: lDb.Pool | lKv.Kv,
        auth: boolean = false,
        opt: lSession.IOptions = {}
    ): Promise<boolean> {
        this._sess = new lSession.Session();
        return this._sess.init(this, link, auth, opt);
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
                localeData[lPath] ??= {};
                this._loadLocaleDeep(lPath, locData);
                localeFiles.push(lPath);
            }
            else {
                this._locale = loc;
            }
            // --- 缓存中一定有文件 ---
            this._localeData[loc] ??= {};
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

    private _loadLocaleDeep(lPath: string, locData: Record<string, kebab.Json>, pre: string = ''): void {
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
            return lText.stringifyJson(this._localeData[this._locale]);
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
     * @param opt 可选 CORS 配置
     * 返回 true 接续执行，返回 false 需要中断用户本次访问（options 请求）
     */
    protected _cross(opt: {
        /** --- 允许的来源列表，留空为 '*' --- */
        'origins'?: string[];
        /** --- 允许的请求头 --- */
        'headers'?: string;
        /** --- 允许的方法 --- */
        'methods'?: string;
        /** --- 是否允许发送凭据（cookie），默认 false --- */
        'credentials'?: boolean;
    } = {}): boolean {
        if (opt.origins?.length) {
            const reqOrigin = this._headers['origin'] ?? '';
            if (opt.origins.includes(reqOrigin)) {
                this._res.setHeader('access-control-allow-origin', reqOrigin);
                this._res.setHeader('vary', 'Origin');
            }
            else {
                this._res.setHeader('access-control-allow-origin', opt.origins[0]);
                this._res.setHeader('vary', 'Origin');
            }
        }
        else {
            this._res.setHeader('access-control-allow-origin', '*');
        }
        this._res.setHeader('access-control-allow-headers', opt.headers ?? '*');
        this._res.setHeader('access-control-allow-methods', opt.methods ?? '*');
        if (opt.credentials) {
            this._res.setHeader('access-control-allow-credentials', 'true');
        }
        if (this._req.method === 'OPTIONS') {
            this._res.setHeader('access-control-max-age', '3600');
            this._httpCode = 204;
            return false;
        }
        return true;
    }

    /**
     * --- 获取语言包值 ---
     * @param key
     * @param data 要替换的数据
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public _l(key: string, data?: string[]): string {
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
    protected _writeText(data: Buffer | string | Array<Buffer | string>): boolean {
        return this._socket.writeText(data);
    }

    /**
     * --- 发送结果对象文本 ---
     * @param data 要发送的结果对象，如 [0, 'Failed.']
     */
    protected _writeResult(data: kebab.Json): boolean {
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
    protected _ping(data?: Buffer | string): boolean {
        return this._socket.ping(data);
    }

    /**
     * --- 发送 socket pong ---
     * @param data 要发送的信息
     */
    protected _pong(data?: Buffer | string): boolean {
        return this._socket.pong(data);
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
     * @param limits 上传限制
     */
    protected async _handleFormData(
        events: {
            onfilestart?: (name: string) => boolean | undefined;
            onfiledata?: (chunk: Buffer) => void;
            onfileend?: () => void;
        } = {},
        limits: {
            /** --- 单个文件最大字节数 --- */
            'maxFileSize'?: number;
            /** --- 允许的文件扩展名（含点号），如 ['.jpg', '.png', '.pdf'] --- */
            'allowedExts'?: string[];
        } = {}
    ): Promise<boolean> {
        const rtn = await sRoute.getFormData(this._req, events, limits);
        if (!rtn) {
            return false;
        }
        for (const key in rtn.post) {
            this._post[key] = rtn.post[key];
        }
        for (const key in rtn.files) {
            this._files[key] = rtn.files[key];
        }
        return true;
    }

}

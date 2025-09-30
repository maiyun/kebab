/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-4-15 13:40
 * Last: 2020-4-14 13:52:00, 2022-09-07 01:43:31, 2023-12-29 17:24:03, 2024-2-7 00:28:50, 2024-6-6 15:15:54, 2025-6-13 19:23:53, 2025-9-22 15:48:53, 2025-9-23 11:26:50
 */
import * as http from 'http';
import * as http2 from 'http2';
import * as net from 'net';
import * as fs from 'fs';
import * as stream from 'stream';
// --- 第三方 ---
import * as ws from '@litert/websocket';
// --- 库和定义 ---
import * as lFs from '#kebab/lib/fs.js';
import * as lZlib from '#kebab/lib/zlib.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';
import * as lResponse from '#kebab/lib/net/response.js';
import * as lWs from '#kebab/lib/ws.js';
import * as lLang from '#kebab/lib/lang.js';
import * as sCtr from './ctr.js';
import * as kebab from '#kebab/index.js';

/** --- 动态层 kebab.json 缓存（文件路径: 最终合并值） --- */
let kebabConfigs: Record<string, kebab.IConfig> = {};

/**
 * --- 清除已经加载的虚拟主机配置文件 ---
 */
export function clearKebabConfigs(): void {
    kebabConfigs = {};
}

/**
 * --- 若为动态路径则执行此函数，此函数不进行判断 kebab.json 是否存在 ---
 * @param data 传导的数据
 */
export async function run(data: {
    'req': http2.Http2ServerRequest | http.IncomingMessage;
    'res'?: http2.Http2ServerResponse | http.ServerResponse;
    'socket'?: net.Socket;
    'uri': kebab.IUrlParse;
    /** --- 虚拟主机当前动态目录的绝对根目录，末尾带 / --- */
    'rootPath': string;
    /** --- base url，如 /abc/vhost/，前后都带 / --- */
    'urlBase': string;
    /** --- 前面不带 /，末尾不一定，以用户请求为准 --- */
    'path': string;
    /** --- timeout timer --- */
    'timer'?: {
        'timer': NodeJS.Timeout;
        'timeout': number;
        'callback': () => void;
    };
}): Promise<boolean> {
    // --- 检测 path 是否是静态文件 ---
    if (/^(stc\/.*|favicon.\w+?\??.*|apple[\w-]+?\.png\??.*|[\w-]+?\.txt\??.*|[\w-]+?\.html\??.*)/.test(data.path)) {
        return false;
    }
    // --- 根据 res 还是 socket 进行初始化设置 ---
    if (data.res) {
        data.res.setHeader('expires', 'Mon, 26 Jul 1994 05:00:00 GMT');
        data.res.setHeader('cache-control', 'no-store');
    }
    // --- 判断 kebab config 是否已经读取过 ---
    if (!kebabConfigs[data.rootPath + 'kebab.json']) {
        const configContent = await lFs.getContent(data.rootPath + 'kebab.json', 'utf8');
        if (!configContent) {
            if (data.res) {
                data.res.setHeader('content-length', 53);
                data.res.writeHead(500);
                data.res.end('<h1>500 File kebab.json can not be read</h1><hr>Kebab');
            }
            else {
                data.socket?.destroy();
            }
            return true;
        }
        kebabConfigs[data.rootPath + 'kebab.json'] = lText.parseJson(configContent);
        const routeContent = await lFs.getContent(data.rootPath + 'route.json', 'utf8');
        if (routeContent) {
            kebabConfigs[data.rootPath + 'kebab.json'].route = lText.parseJson(routeContent);
        }
        // --- 将全局的项目应用到 vhostConfigs 里，但当 vhostConfigs 有项，则不应用 ---
        for (const name in lCore.globalConfig) {
            if (typeof lCore.globalConfig[name] !== 'object') {
                if (kebabConfigs[data.rootPath + 'kebab.json'][name] === undefined) {
                    kebabConfigs[data.rootPath + 'kebab.json'][name] = lCore.globalConfig[name];
                }
                continue;
            }
            for (const name2 in lCore.globalConfig[name]) {
                if (kebabConfigs[data.rootPath + 'kebab.json'][name] === undefined) {
                    kebabConfigs[data.rootPath + 'kebab.json'][name] = {};
                }
                if (kebabConfigs[data.rootPath + 'kebab.json'][name][name2] === undefined) {
                    kebabConfigs[data.rootPath + 'kebab.json'][name][name2] = lCore.globalConfig[name][name2];
                }
            }
        }
    }
    // --- 加载 kebab config ---
    const config: kebab.IConfig = {} as kebab.Json;
    const configData = kebabConfigs[data.rootPath + 'kebab.json'];
    for (const name in configData) {
        config[name] = configData[name];
    }
    config.const = {
        'path': data.path,
        'qs': data.uri.query ?? '',
        'startTime': process.hrtime.bigint(),
        'startMemory': process.memoryUsage().rss,

        // --- 环境判断 ---

        'mobile': data.req.headers['user-agent'] ? data.req.headers['user-agent'].toLowerCase().includes('mobile') : false,
        'wechat': data.req.headers['user-agent'] ? data.req.headers['user-agent'].toLowerCase().includes('micromessenger') : false,
        'miniprogram': data.req.headers['referer'] ? (data.req.headers['referer'].toLowerCase().startsWith('https://servicewechat.com/') ? 'wechat' : '') : '',
        'https': data.uri.protocol === 'https' ? true : false,
        'host': data.uri.host ?? '',
        'hostname': data.uri.hostname ?? '',
        'hostport': data.uri.port ? parseInt(data.uri.port) : (data.uri.protocol === 'https' ? 443 : 80),
        'uri': data.uri,

        // --- 服务端用的路径 ---

        'rootPath': data.rootPath,
        'ctrPath': data.rootPath + 'ctr/',
        'viewPath': data.rootPath + 'view/',
        'dataPath': data.rootPath + 'data/',
        'modPath': data.rootPath + 'mod/',
        'wsPath': data.rootPath + 'ws/',

        // --- 前端用的路径 ---

        'urlBase': data.urlBase,
        'urlStc': data.urlBase + 'stc/',
        'urlFull': (data.uri.protocol ?? '') + '//' + (data.uri.host ?? '') + data.urlBase,
        'urlStcFull': ''
    };
    config.const.urlStcFull = config.const.urlFull + 'stc/';
    if (lText.isFalsy(config.set.staticPath)) {
        config.set.staticPath = config.const.urlStc;
    }
    if (lText.isFalsy(config.set.staticPathFull)) {
        config.set.staticPathFull = config.const.urlStcFull;
    }
    /** --- data.path 是安全的，不会是 ../../ 来访问到了外层，已经做过处理 --- */
    let path = data.path;
    // --- 如果为空则定义为 @ ---
    if (path === '') {
        path = '@';
    }
    // --- 检测是否托管语言页面 ---
    const param: string[] = [];
    if (config.lang && data.res) {
        // --- 仅仅 res 模式支持 config.lang ---
        if (path[2] !== '/') {
            // --- 不管是首页还是 @ 页，都会到此处（已经有语言目录不会到这里） ---
            if (config.lang.direct.every(item => !path.startsWith(item))) {
                // --- 不放行 ---
                /** --- 浏览器语种 --- */
                const lang = lLang.getCodeByAccept(data.req.headers['accept-language']?.toLowerCase() ?? config.lang.list[0]);
                /** --- 组合要跳转的路径 --- */
                const apath = config.const.path + (config.const.qs ? '?' + config.const.qs : '');
                if (config.lang.list.includes(lang)) {
                    data.res.setHeader('location', config.const.urlBase + lang + '/' + apath);
                    data.res.writeHead(302);
                    data.res.end('');
                    return true;
                }
                data.res.setHeader('location', config.const.urlBase + config.lang.list[0] + '/' + apath);
                data.res.writeHead(302);
                data.res.end('');
                return true;
            }
        }
        else {
            // --- 已经是含语言的路径了 --
            param.push(path.slice(0, 2));
            path = path.slice(3);
            if (!path) {
                path = '@';
            }
        }
    }
    // --- 检查路由表 ---
    let match: RegExpExecArray | null = null;
    let pathLeft: string = '', pathRight: string = '';
    for (const rule in config.route) {
        const ruleVal = config.route[rule];
        if ((match = (new RegExp('^' + rule + '$')).exec(path))) {
            if (data.res) {
                [pathLeft, pathRight] = getPathLeftRight(ruleVal);
            }
            else {
                pathLeft = getWsCtrName(ruleVal);
            }
            for (let i = 1; i < match.length; ++i) {
                param.push(match[i]);
            }
            break;
        }
    }
    if (!match) {
        if (data.res) {
            [pathLeft, pathRight] = getPathLeftRight(path);
        }
        else {
            pathLeft = getWsCtrName(path);
        }
    }
    // --- 若文件名为保留的 middle 将不允许进行 ---
    if (pathLeft.startsWith('middle')) {
        const text = '[Error] Controller not found, path: ' + path + '.';
        if (data.res) {
            if (config.route['#404']) {
                data.res.setHeader('location', lText.urlResolve(config.const.urlBase, config.route['#404']));
                data.res.writeHead(302);
                data.res.end('');
                return true;
            }
            data.res.setHeader('content-type', 'text/html; charset=utf-8');
            data.res.setHeader('content-length', Buffer.byteLength(text));
            data.res.writeHead(404);
            data.res.end(text);
        }
        else {
            data.socket?.destroy();
        }
        return true;
    }

    // --- 原始 GET ---
    const get = data.uri.query ? lText.queryParse(data.uri.query) : {};
    // --- Cookie ---
    const cookies: Record<string, string> = {};
    if (data.req.headers['cookie']) {
        const hcookies: string[] = data.req.headers['cookie'].split(';');
        for (const cookie of hcookies) {
            const co: string[] = cookie.split('=');
            cookies[co[0].trim()] = decodeURIComponent(co[1]);
        }
    }
    // --- 处理 headers ---
    const headers: http.IncomingHttpHeaders = {};
    for (const key in data.req.headers) {
        headers[key.toLowerCase()] = data.req.headers[key];
    }
    headers['authorization'] ??= '';
    /** --- 开发者返回值 --- */
    let rtn: kebab.Json;

    if (data.socket && data.req instanceof http.IncomingMessage) {
        // --- socket 模式，判断真实控制器文件是否存在 ---
        const filePath = config.const.wsPath + pathLeft + '.js';
        if (!await lFs.isFile(filePath)) {
            // --- 指定的控制器不存在 ---
            data.socket?.destroy();
            return true;
        }
        // --- 加载控制器文件 ---
        const ctrCtr: typeof sCtr.Ctr = (await import((!filePath.startsWith('/') ? '/' : '') + filePath)).default;
        const cctr: sCtr.Ctr = new ctrCtr(config, data.req);
        // --- 先处理 web socket 的情况 ---
        let wsSocket: lWs.Socket;
        try {
            const options = await (cctr as kebab.Json).onUpgrade();
            // --- 默认无消息发送 3 分钟 ---
            options.timeout ??= 60_000 * 3;
            wsSocket = lWs.createServer(data.req, data.socket, options);
            cctr.setPrototype('_socket', wsSocket);
        }
        catch (e: kebab.Json) {
            lCore.log(cctr, lText.stringifyJson((e.stack as string)).slice(1, -1), '-error');
            data.socket.destroy();
            return true;
        }
        cctr.setPrototype('_param', param);
        cctr.setPrototype('_action', pathRight);
        cctr.setPrototype('_headers', headers);
        cctr.setPrototype('_get', get);
        cctr.setPrototype('_cookie', cookies);

        lCore.log(cctr, '', '-visit');

        try {
            rtn = await (cctr as kebab.Json).onLoad();
        }
        catch (e: kebab.Json) {
            lCore.log(cctr, lText.stringifyJson((e.stack as string)).slice(1, -1), '-error');
            data.socket.destroy();
            return true;
        }
        if (rtn === undefined || rtn === true) {
            try {
                rtn = await (cctr as kebab.Json).onReady();
            }
            catch (e: kebab.Json) {
                lCore.log(cctr, lText.stringifyJson((e.stack as string)).slice(1, -1), '-error');
                data.socket.destroy();
                return true;
            }
            if (rtn === undefined || rtn === true) {
                await new Promise<void>(function(resolve) {
                    wsSocket.on('message', async function(msg): Promise<void> {
                        switch (msg.opcode) {
                            case ws.EOpcode.CLOSE: {
                                const r = await (cctr as kebab.Json)['onMessage'](msg.data, msg.opcode);
                                if (r === false) {
                                    break;
                                }
                                wsSocket.end();
                                break;
                            }
                            case ws.EOpcode.PING: {
                                const r = await (cctr as kebab.Json)['onMessage'](msg.data, msg.opcode);
                                if (r === false) {
                                    break;
                                }
                                wsSocket.pong();
                                break;
                            }
                            case ws.EOpcode.BINARY:
                            case ws.EOpcode.TEXT: {
                                try {
                                    const r = await (cctr as kebab.Json)['onMessage'](msg.data, msg.opcode);
                                    if (r === false) {
                                        break;
                                    }
                                    const wrtn = await (cctr as kebab.Json)['onData'](msg.data, msg.opcode);
                                    if (wrtn === false) {
                                        wsSocket.end();
                                        return;
                                    }
                                    if (!wrtn) {
                                        return;
                                    }
                                    if (wrtn instanceof Buffer) {
                                        wsSocket.writeBinary(wrtn);
                                        return;
                                    }
                                    if (typeof wrtn === 'string') {
                                        if (!wrtn) {
                                            return;
                                        }
                                        wsSocket.writeText(wrtn);
                                        return;
                                    }
                                    if (typeof wrtn === 'object') {
                                        // --- 返回的是数组，那么代表可能是 JSON，可能是对象序列 ---
                                        wsSocket.writeResult(wrtn);
                                        return;
                                    }
                                }
                                catch (e: any) {
                                    lCore.log(cctr, lText.stringifyJson((e.stack as string)).slice(1, -1), '-error');
                                }
                                break;
                            }
                            default: {
                                // --- nothing ---
                            }
                        }
                    }).on('drain', async () => {
                        try {
                            await (cctr as kebab.Json)['onDrain']();
                        }
                        catch (e: any) {
                            lCore.log(cctr, lText.stringifyJson((e.stack as string)).slice(1, -1), '-error');
                        }
                    }).on('error', (e: any) => {
                        lCore.log(cctr, lText.stringifyJson((e.stack as string)).slice(1, -1), '-error');
                    }).on('close', async () => {
                        try {
                            await (cctr as kebab.Json)['onClose']();
                        }
                        catch (e: any) {
                            lCore.log(cctr, lText.stringifyJson((e.stack as string)).slice(1, -1), '-error');
                        }
                        resolve();
                    });
                });
                return true;
            }
        }
        if (!wsSocket.ended) {
            wsSocket.end();
        }
        return true;
    }
    if (!data.res) {
        return true;
    }
    // --- 加载中间控制器 ---
    const middleCtr = (await import((!config.const.ctrPath.startsWith('/') ? '/' : '') + config.const.ctrPath + 'middle.js')).default as typeof sCtr.Ctr;
    const middle: sCtr.Ctr = new middleCtr(config, data.req, data.res);
    /** --- 可能存在的最终控制器 --- */
    let cctr: sCtr.Ctr | null = null;
    // --- 对信息进行初始化 ---
    if (data.timer) {
        middle.setPrototype('_timer', data.timer);
    }
    // --- 路由定义的参数序列 ---
    middle.setPrototype('_param', param);
    // --- action 名 ---
    middle.setPrototype('_action', pathRight);
    middle.setPrototype('_headers', headers);

    middle.setPrototype('_get', get);

    /** --- 是否让框架自动获取 post，true 为自动（默认） --- */
    const reqStartRtn = await middle.onReqStart();
    if (reqStartRtn) {
        const rawPost = await getPost(data.req);
        // --- 原始 POST ---
        middle.setPrototype('_rawPost', rawPost.raw);
        // --- 原始 input ---
        middle.setPrototype('_input', rawPost.input);
        // --- 处理后的 post ---
        middle.setPrototype('_post', rawPost.post);
        // --- form data 格式交由用户自行获取，可以直接获取文件流，然后做他想做的事情 ---
    }

    // --- 执行中间控制器的 onLoad ---
    try {
        rtn = await (middle.onLoad() as kebab.Json);
    }
    catch (e: kebab.Json) {
        lCore.log(middle, '(E03)' + lText.stringifyJson((e.stack as string)).slice(1, -1), '-error');
        data.res.setHeader('content-type', 'text/html; charset=utf-8');
        data.res.setHeader('content-length', 25);
        data.res.writeHead(500);
        data.res.end('<h1>500 Server Error</h1><hr>Kebab');
        return true;
    }
    let cacheTTL: number = middle.getPrototype('_cacheTTL');
    let httpCode: number = middle.getPrototype('_httpCode');
    if (rtn === undefined || rtn === true) {
        // --- 只有不返回或返回 true 时才加载控制文件 ---
        try {
            rtn = await (middle.onReady() as kebab.Json);
        }
        catch (e: kebab.Json) {
            lCore.log(middle, '(E05)' + lText.stringifyJson((e.stack as string)).slice(1, -1), '-error');
            data.res.setHeader('content-type', 'text/html; charset=utf-8');
            data.res.setHeader('content-length', 25);
            data.res.writeHead(500);
            data.res.end('<h1>500 Server Error</h1><hr>Kebab');
            return true;
        }
        cacheTTL = middle.getPrototype('_cacheTTL');
        httpCode = middle.getPrototype('_httpCode');
        if (rtn === undefined || rtn === true) {
            // --- 判断真实控制器文件是否存在 ---
            const filePath = config.const.ctrPath + pathLeft + '.js';
            if (!await lFs.isFile(filePath)) {
                // --- 指定的控制器不存在 ---
                const text = '[Error] Controller not found, path: ' + path + '.';
                if (config.route['#404']) {
                    data.res.setHeader('location', lText.urlResolve(config.const.urlBase, config.route['#404']));
                    data.res.writeHead(302);
                    data.res.end('');
                    return true;
                }
                data.res.setHeader('content-type', 'text/html; charset=utf-8');
                data.res.setHeader('content-length', Buffer.byteLength(text));
                data.res.writeHead(404);
                data.res.end(text);
                return true;
            }
            // --- 加载控制器文件 ---
            const ctrCtr: typeof sCtr.Ctr = (await import((!filePath.startsWith('/') ? '/' : '') + filePath)).default;
            cctr = new ctrCtr(config, data.req, data.res ?? data.socket!);
            // --- 对信息进行初始化 ---
            cctr.setPrototype('_timer', middle.getPrototype('_timer'));
            cctr.setPrototype('_waitInfo', middle.getPrototype('_waitInfo'));
            // --- 路由定义的参数序列 ---
            cctr.setPrototype('_param', param);
            cctr.setPrototype('_action', middle.getPrototype('_action'));
            cctr.setPrototype('_headers', headers);

            cctr.setPrototype('_get', get);
            cctr.setPrototype('_rawPost', middle.getPrototype('_rawPost'));
            cctr.setPrototype('_input', middle.getPrototype('_input'));
            cctr.setPrototype('_files', middle.getPrototype('_files'));
            cctr.setPrototype('_post', middle.getPrototype('_post'));

            cctr.setPrototype('_cookie', cookies);
            cctr.setPrototype('_jwt', middle.getPrototype('_jwt'));
            if (!cctr.getPrototype('_sess') && middle.getPrototype('_sess')) {
                cctr.setPrototype('_session', middle.getPrototype('_session'));
                cctr.setPrototype('_sess', middle.getPrototype('_sess'));
            }

            cctr.setPrototype('_cacheTTL', middle.getPrototype('_cacheTTL'));
            cctr.setPrototype('_xsrf', middle.getPrototype('_xsrf'));
            cctr.setPrototype('_httpCode', middle.getPrototype('_httpCode'));

            lCore.log(cctr, '', '-visit');

            // --- 强制 HTTPS ---
            if (config.set.mustHttps && !config.const.https) {
                data.res.setHeader('location', data.req.url ?? '');
                data.res.writeHead(302);
                return true;
            }
            // --- 检测 action 是否存在，以及排除内部方法 ---
            if (pathRight.startsWith('_') || pathRight === 'onUpgrade' || pathRight === 'onLoad' || pathRight === 'onData' || pathRight === 'onDrain' || pathRight === 'onClose' || pathRight === 'setPrototype' || pathRight === 'getPrototype' || pathRight === 'getAuthorization') {
                // --- _ 开头的 action 是内部方法，不允许访问 ---
                if (config.route['#404']) {
                    data.res.setHeader('location', lText.urlResolve(config.const.urlBase, config.route['#404']));
                    data.res.writeHead(302);
                    data.res.end('');
                    return true;
                }
                const text = '[Error] Action not found, path: ' + path + '.';
                data.res.setHeader('content-type', 'text/html; charset=utf-8');
                data.res.setHeader('content-length', Buffer.byteLength(text));
                data.res.writeHead(404);
                data.res.end(text);
                return true;
            }
            pathRight = pathRight.replace(/-([a-zA-Z0-9])/g, function(t, t1: string): string {
                return t1.toUpperCase();
            });
            if ((cctr as kebab.Json)[pathRight] === undefined) {
                if (config.route['#404']) {
                    data.res.setHeader('location', lText.urlResolve(config.const.urlBase, config.route['#404']));
                    data.res.writeHead(302);
                    data.res.end('');
                    return true;
                }
                const text = '[Error] Action not found, path: ' + path + '.';
                data.res.setHeader('content-type', 'text/html; charset=utf-8');
                data.res.setHeader('content-length', Buffer.byteLength(text));
                data.res.writeHead(404);
                data.res.end(text);
                return true;
            }
            // --- 执行 onLoad 方法 ---
            try {
                rtn = await (cctr.onLoad() as kebab.Json);
                // --- 执行 action ---
                if (rtn === undefined || rtn === true) {
                    try {
                        rtn = await (cctr.onReady() as kebab.Json);
                        // --- 执行 action ---
                        if (rtn === undefined || rtn === true) {
                            rtn = await (cctr as kebab.Json)[pathRight]();
                            rtn = await (cctr.onUnload(rtn) as kebab.Json);
                            rtn = await (middle.onUnload(rtn) as kebab.Json);
                            const sess = cctr.getPrototype('_sess');
                            if (sess) {
                                await sess.update();
                            }
                        }
                    }
                    catch (e: kebab.Json) {
                        lCore.log(cctr, '(E05)' + lText.stringifyJson(e.stack).slice(1, -1), '-error');
                        data.res.setHeader('content-type', 'text/html; charset=utf-8');
                        data.res.setHeader('content-length', 25);
                        data.res.writeHead(500);
                        data.res.end('<h1>500 Server Error</h1><hr>Kebab');
                        await waitCtr(cctr);
                        return true;
                    }
                }
                // --- 获取 ctr 设置的 cache 和 hcode ---
                cacheTTL = cctr.getPrototype('_cacheTTL');
                httpCode = cctr.getPrototype('_httpCode');
            }
            catch (e: kebab.Json) {
                lCore.log(cctr, '(E04)' + lText.stringifyJson(e.stack).slice(1, -1), '-error');
                data.res.setHeader('content-type', 'text/html; charset=utf-8');
                data.res.setHeader('content-length', 25);
                data.res.writeHead(500);
                data.res.end('<h1>500 Server Error</h1><hr>Kebab');
                await waitCtr(cctr);
                return true;
            }
        }
    }
    // --- 设置缓存 ---
    if (!data.res.headersSent && (cacheTTL > 0)) {
        data.res.setHeader('expires', lTime.format(0, 'D, d M Y H:i:s', Date.now() + cacheTTL * 1000) + ' GMT');
        data.res.setHeader('cache-control', 'max-age=' + cacheTTL.toString());
    }
    // --- 设置自定义 hcode ---
    if (httpCode === 0) {
        httpCode = 200;
    }
    // --- 判断返回值 ---
    if (rtn === undefined || typeof rtn === 'boolean' || rtn === null) {
        if (data.res.headersSent) {
            // --- 已经自行输出过 writeHead，可能自行处理了内容，如 pipe，则不再 writeHead ---
        }
        else {
            if (data.res.getHeader('location')) {
                data.res.writeHead(302);
            }
            else {
                data.res.writeHead(httpCode);
            }
        }
        if (!data.res.writableEnded) {
            // --- 如果当前还没结束，则强制关闭连接，一切 pipe 请自行在方法中 await，否则会被中断 ---
            data.res.end('');
        }
        await waitCtr(cctr ?? middle);
        return true;
    }
    if (typeof rtn === 'string' || rtn instanceof Buffer) {
        // --- 返回的是纯字符串，直接输出 ---
        /** --- 当前的压缩对象 --- */
        let compress: lZlib.ICompress | null = null;
        if (!data.res.headersSent) {
            if (!data.res.getHeader('content-type')) {
                data.res.setHeader('content-type', 'text/html; charset=utf-8');
            }
            if (Buffer.byteLength(rtn) >= 1024) {
                compress = lZlib.createCompress(data.req.headers['accept-encoding'] ?? '');
                if (compress) {
                    data.res.setHeader('content-encoding', compress.type);
                }
            }
            data.res.writeHead(httpCode);
        }
        if (!data.res.writableEnded) {
            if (compress) {
                compress.compress.write(rtn);
                compress.compress.pipe(data.res);
                compress.compress.end();
            }
            else {
                data.res.end(rtn);
            }
        }
    }
    else if (rtn instanceof stream.Readable || rtn instanceof lResponse.Response) {
        // --- 返回的是流，那就以管道的形式输出 ---
        const stm = rtn instanceof stream.Readable ? rtn : rtn.getStream();
        /** --- 当前的压缩对象 --- */
        let compress: lZlib.ICompress | null = null;
        if (!data.res.headersSent) {
            if (!data.res.getHeader('content-type')) {
                data.res.setHeader('content-type', 'text/html; charset=utf-8');
            }
            compress = lZlib.createCompress(data.req.headers['accept-encoding'] ?? '');
            if (compress) {
                data.res.setHeader('content-encoding', compress.type);
            }
            data.res.writeHead(httpCode);
        }
        if (!data.res.writableEnded) {
            if (compress) {
                stm.pipe(compress.compress).pipe(data.res);
            }
            else {
                stm.pipe(data.res);
            }
        }
    }
    else if (typeof rtn === 'object') {
        // --- 返回的是数组，那么代表可能是 JSON，可能是对象序列 ---
        if (Array.isArray(rtn)) {
            // --- [0, 'xxx'] 模式，或 [string, Readable] 模式 ---
            if (rtn.length === 0) {
                // --- 异常 ---
                if (!data.res.headersSent) {
                    data.res.writeHead(500);
                }
                if (!data.res.writableEnded) {
                    data.res.end('<h1>500 Internal server error</h1><hr>Kebab');
                }
            }
            else {
                if (typeof rtn[0] === 'number') {
                    // --- 1. ---
                    const json: Record<string, kebab.Json> = { 'result': rtn[0] };
                    if (rtn[1] !== undefined) {
                        if (typeof rtn[1] === 'object') {
                            // --- [0, ...{'xx': 'xx'}] ---
                            for (let i = 1; i < rtn.length; ++i) {
                                Object.assign(json, rtn[i]);
                            }
                        }
                        else {
                            // --- [0, 'xxx'], [0, 'xxx', ...{'xx': 'xx'}] ---
                            json['msg'] = rtn[1];
                            for (let i = 2; i < rtn.length; ++i) {
                                Object.assign(json, rtn[i]);
                            }
                        }
                    }
                    const writeData = lText.stringifyJson(json);
                    /** --- 当前的压缩对象 --- */
                    let compress: lZlib.ICompress | null = null;
                    if (!data.res.headersSent) {
                        data.res.setHeader('content-type', 'application/json; charset=utf-8');
                        if (Buffer.byteLength(writeData) >= 1024) {
                            compress = lZlib.createCompress(data.req.headers['accept-encoding'] ?? '');
                            if (compress) {
                                data.res.setHeader('content-encoding', compress.type);
                            }
                        }
                        data.res.writeHead(httpCode);
                    }
                    if (!data.res.writableEnded) {
                        if (compress) {
                            compress.compress.write(writeData);
                            compress.compress.pipe(data.res);
                            compress.compress.end();
                        }
                        else {
                            data.res.end(writeData);
                        }
                    }
                }
                else {
                    // --- 2. 字符串与 Readable 的组合 ---
                    /** --- 当前的压缩对象 --- */
                    let compress: lZlib.ICompress | null = null;
                    if (!data.res.headersSent) {
                        if (!data.res.getHeader('content-type')) {
                            data.res.setHeader('content-type', 'text/html; charset=utf-8');
                        }
                        compress = lZlib.createCompress(data.req.headers['accept-encoding'] ?? '');
                        if (compress) {
                            data.res.setHeader('content-encoding', compress.type);
                        }
                        data.res.writeHead(httpCode);
                    }
                    if (!data.res.writableEnded) {
                        const passThrough = new stream.PassThrough();
                        // --- 先进行 pipe 绑定，之后 write 或 pipe 进 pass 的数据，直接就可以消费 ---
                        if (compress) {
                            passThrough.pipe(compress.compress).pipe(data.res);
                        }
                        else {
                            passThrough.pipe(data.res);
                        }
                        await lCore.passThroughAppend(passThrough, rtn);
                    }
                }
            }
        }
        else {
            // --- 直接是个 json 对象 ---
            const writeData = lText.stringifyJson(rtn);
            /** --- 当前的压缩对象 --- */
            let compress: lZlib.ICompress | null = null;
            if (!data.res.headersSent) {
                data.res.setHeader('content-type', 'application/json; charset=utf-8');
                if (Buffer.byteLength(writeData) >= 1024) {
                    compress = lZlib.createCompress(data.req.headers['accept-encoding'] ?? '');
                    if (compress) {
                        data.res.setHeader('content-encoding', compress.type);
                    }
                }
                data.res.writeHead(httpCode);
            }
            if (!data.res.writableEnded) {
                if (compress) {
                    compress.compress.write(writeData);
                    compress.compress.pipe(data.res);
                    compress.compress.end();
                }
                else {
                    data.res.end(writeData);
                }
            }
        }
    }
    else {
        // --- 异常 ---
        if (!data.res.headersSent) {
            data.res.writeHead(500);
        }
        if (!data.res.writableEnded) {
            data.res.end('<h1>500 Internal server error</h1><hr>Kebab');
        }
    }
    await waitCtr(cctr ?? middle);
    return true;
}

/**
 * --- 获取控制器 left 和 action ---
 * @param path 相对路径
 */
function getPathLeftRight(path: string): string[] {
    const pathLio = path.lastIndexOf('/');
    if (pathLio === -1) {
        return [path, 'index'];
    }
    const right = path.slice(pathLio + 1);
    return [path.slice(0, pathLio), right === '' ? 'index' : right];
}

/**
 * --- 根据 path 获取 ws 的控制器类名 ---
 * @param path 路径
 */
function getWsCtrName(path: string): string {
    const pathLio = path.lastIndexOf('/');
    if (pathLio === -1) {
        return path.toLowerCase();
    }
    return path.slice(pathLio + 1).toLowerCase();
}

/**
 * --- 删除本次请求所有已上传的临时文件 ---
 * @param cctr Ctr 对象 或 files
 */
export async function unlinkUploadFiles(
    cctr: sCtr.Ctr | Record<string, kebab.IPostFile | kebab.IPostFile[]>
): Promise<void> {
    const cfiles = cctr instanceof sCtr.Ctr ? cctr.getPrototype('_files') : cctr;
    for (const name in cfiles) {
        let files = cfiles[name];
        if (!Array.isArray(files)) {
            files = [files];
        }
        for (const file of files) {
            await lFs.unlink(file.path);
        }
    }
}

/**
 * --- 等待异步任务结束，并删除临时文件，如果结束后还有事务没关闭，则会在本函数中打印控制台并且写入 log 文件 ---
 * --- 此时其实已经给客户端返回了，此处等待不消耗客户端的等待时间 ---
 * @param cctr 要等待的控制器 ---
 */
export async function waitCtr(cctr: sCtr.Ctr): Promise<void> {
    // --- 先判断异步任务是否结束 ---
    const waitInfo = cctr.getPrototype('_waitInfo');
    if (waitInfo.asyncTask.count) {
        await waitInfo.asyncTask.callback();
    }
    // --- 判断事务 ---
    if (waitInfo.transaction) {
        // --- 有事务未关闭 ---
        const msg = 'transaction(' + waitInfo.transaction + ') not be closed';
        lCore.display('[ERROR][ROUTE][WAITCTR] ' + msg + ': ', cctr.getPrototype('_config').const.path);
        lCore.log(cctr, msg, '-error');
    }
    // --- 彻底结束，删除文件 ---
    await unlinkUploadFiles(cctr);
}

/**
 * --- 获取 post 对象（通常已自动获取），如果是文件上传（formdata）的情况则不获取 ---
 * @param req 请求对象
 */
export function getPost(
    req: http2.Http2ServerRequest | http.IncomingMessage
): Promise<{
        'input': string;
        'raw': Record<string, any>;
        'post': Record<string, any>;
    }> {
    return new Promise(function(resolve) {
        const ct = req.headers['content-type'] ?? '';
        if (ct.includes('form-data')) {
            resolve({
                'input': '',
                'raw': {},
                'post': {},
            });
            return;
        }
        // --- json 或普通 post ---
        let buffer: Buffer = Buffer.from('');
        req.on('data', function(chunk: Buffer) {
            buffer = Buffer.concat([buffer, chunk], buffer.length + chunk.length);
        });
        req.on('end', function() {
            const s = buffer.toString();
            if (!s) {
                resolve({
                    'input': '',
                    'raw': {},
                    'post': {},
                });
                return;
            }
            // --- 判断 json 还是普通 ---
            if (ct.includes('json')) {
                try {
                    const raw = lText.parseJson(s);
                    resolve({
                        'input': s,
                        'raw': raw,
                        'post': lText.trimJson(raw),
                    });
                }
                catch {
                    resolve({
                        'input': '',
                        'raw': {},
                        'post': {},
                    });
                }
                return;
            }
            const raw = lText.queryParse(s);
            resolve({
                'input': s,
                'raw': raw,
                'post': lText.trimJson(raw),
            });
        });
    });
}

/**
 * --- 获取 formdata 的 post ---
 * @param req 请求头
 * @param events 文件处理情况
 */
export function getFormData(
    req: http2.Http2ServerRequest | http.IncomingMessage,
    events: {
        onfilestart?: (name: string) => boolean | undefined;
        onfiledata?: (chunk: Buffer) => void;
        onfileend?: () => void;
    } = {}
): Promise<{
    'post': Record<string, kebab.Json>;
    'files': Record<string, kebab.IPostFile | kebab.IPostFile[]>;
} | false> {
    return new Promise(function(resolve) {
        const ct = req.headers['content-type'] ?? '';
        if (!ct) {
            resolve({ 'post': {}, 'files': {} });
            return;
        }
        /** --- boundary 位置 --- */
        const clio = ct.lastIndexOf('boundary=');
        if (clio === -1) {
            resolve({ 'post': {}, 'files': {} });
            return;
        }
        /** --- 最终返回 --- */
        const rtn: {
            'post': Record<string, kebab.Json>;
            'files': Record<string, kebab.IPostFile | kebab.IPostFile[]>;
        } = {
            'post': {},
            'files': {}
        };
        /** --- 获取的 boundary 文本 --- */
        const boundary = ct.slice(clio + 9);

        // 一下变量是相对于 data 事件的全局变量 ---

        /** --- 当前临时读入的还未处理的 buffer --- */
        let buffer: Buffer = Buffer.from('');
        /** --- 状态机 --- */
        enum EState {
            /** --- 判断头部是什么 --- */
            'WAIT',
            /** --- 当前是文件 --- */
            'FILE',
            /** --- 当前是 post 数据 --- */
            'POST'
        }
        /** --- 当前所处状态 --- */
        let state: EState = EState.WAIT;

        /** --- 当前处理中的 post 的 name --- */
        let name: string = '';

        /** --- 当前处理中的 file 的 name --- */
        let fileName: string = '';
        /** --- 当前处理中的临时文件名 --- */
        let ftmpName: string = '';
        /** --- 当前正在写入的临时文件流 --- */
        let ftmpStream: fs.WriteStream;
        /** --- 当前临时文件已写入的流大小 --- */
        let ftmpSize: number = 0;
        /** --- 当前正在写入的文件数量 --- */
        let writeFileLength: number = 0;
        /** --- 当前读取是否已经完全结束 --- */
        let readEnd: boolean = false;

        // --- 开始读取 ---
        req.on('data', function(chunk: Buffer) {
            buffer = Buffer.concat([buffer, chunk], buffer.length + chunk.length);
            while (true) {
                switch (state) {
                    case EState.WAIT: {
                        /** --- 中断符位置 --- */
                        const io = buffer.indexOf('\r\n\r\n');
                        if (io === -1) {
                            return;
                        }
                        // --- 头部已经读取完毕 ---
                        const head: string = buffer.subarray(0, io).toString();
                        // --- 除头部外剩下的 buffer ---
                        buffer = buffer.subarray(io + 4);
                        // --- 获取 name ---
                        let match = /name="(.+?)"/.exec(head);
                        name = match ? match[1] : '';
                        // --- 判断是 post 还是文件 ---
                        match = /filename="(.+?)"/.exec(head);
                        if (!match) {
                            // --- 普通 post ---
                            state = EState.POST;
                        }
                        else {
                            // --- 文件 ---
                            ++writeFileLength;
                            state = EState.FILE;
                            fileName = match[1];
                            const fr = events.onfilestart?.(name);
                            if (fr !== true) {
                                // --- 创建文件流 ---
                                const date = new Date();
                                ftmpName = date.getUTCFullYear().toString() +
                                    (date.getUTCMonth() + 1).toString().padStart(2, '0') +
                                    date.getUTCDate().toString().padStart(2, '0') +
                                    date.getUTCHours().toString().padStart(2, '0') +
                                    date.getUTCMinutes().toString().padStart(2, '0') + '_' + lCore.random() + '.ftmp';
                                ftmpStream = lFs.createWriteStream(kebab.FTMP_CWD + ftmpName);
                                ftmpSize = 0;
                            }
                            else {
                                ftmpName = '';
                            }
                        }
                        break;
                    }
                    case EState.POST: {
                        // --- POST 模式 ---
                        const io = buffer.indexOf('\r\n--' + boundary);
                        if (io === -1) {
                            return;
                        }
                        // --- 找到结束标语，写入 POST ---
                        const val = buffer.subarray(0, io).toString();
                        if (rtn.post[name]) {
                            if (Array.isArray(rtn.post[name])) {
                                (rtn.post[name] as string[]).push(val);
                            }
                            else {
                                rtn.post[name] = [rtn.post[name] as string, val];
                            }
                        }
                        else {
                            rtn.post[name] = val;
                        }
                        // --- 重置状态机 ---
                        state = EState.WAIT;
                        buffer = buffer.subarray(io + 4 + boundary.length);
                        break;
                    }
                    case EState.FILE: {
                        // --- FILE 模式 ---
                        const io = buffer.indexOf('\r\n--' + boundary);
                        if (io === -1) {
                            // --- 没找到结束标语，将预留 boundary 长度之前的写入到文件 ---
                            const writeBuffer = buffer.subarray(0, -boundary.length - 4);
                            if (ftmpName === '') {
                                events.onfiledata?.(writeBuffer);
                            }
                            else {
                                ftmpStream.write(writeBuffer);
                                ftmpSize += Buffer.byteLength(writeBuffer);
                            }
                            buffer = buffer.subarray(-boundary.length - 4);
                            return;
                        }
                        // --- 找到结束标语，结束标语之前的写入文件，之后的重新放回 buffer ---
                        const writeBuffer = buffer.subarray(0, io);
                        if (ftmpName === '') {
                            events.onfileend?.();
                        }
                        else {
                            ftmpStream.write(writeBuffer);
                            ftmpSize += Buffer.byteLength(writeBuffer);
                            ftmpStream.end(() => {
                                --writeFileLength;
                                if (!readEnd) {
                                    // --- request 没读完，不管 ---
                                    return;
                                }
                                if (writeFileLength) {
                                    // --- req 读完了但文件还没写完，不管 ---
                                    return;
                                }
                                // --- 文件也写完了 ---
                                resolve(rtn);
                            });
                            // --- POST 部分 ---
                            let fname = fileName.replace(/\\/g, '/');
                            const nlio = fname.lastIndexOf('/');
                            if (nlio !== -1) {
                                fname = fname.slice(nlio + 1);
                            }
                            const val: kebab.IPostFile = {
                                'name': fname,
                                'origin': fileName,
                                'size': ftmpSize,
                                'path': kebab.FTMP_CWD + ftmpName
                            };
                            if (rtn.files[name]) {
                                if (Array.isArray(rtn.files[name])) {
                                    (rtn.files[name] as kebab.IPostFile[]).push(val);
                                }
                                else {
                                    rtn.files[name] = [rtn.files[name] as kebab.IPostFile, val];
                                }
                            }
                            else {
                                rtn.files[name] = val;
                            }
                        }
                        // --- 重置状态机 ---
                        state = EState.WAIT;
                        buffer = buffer.subarray(io + 4 + boundary.length);
                        break;
                    }
                }
            }
        });
        req.on('error', function() {
            resolve(false);
        });
        req.on('end', function() {
            readEnd = true;
            if (writeFileLength) {
                // --- 文件没写完 ---
                return;
            }
            // --- 文件写完了 ----
            resolve(rtn);
        });
    });
}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-4-15 13:40
 * Last: 2020-4-14 13:52:00, 2022-09-07 01:43:31
 */
import * as http from 'http';
import * as http2 from 'http2';
import * as fs from 'fs';
import * as url from 'url';
import * as stream from 'stream';
// --- 库和定义 ---
import * as lFs from '~/lib/fs';
import * as lZlib from '~/lib/zlib';
import * as lCore from '~/lib/core';
import * as lCrypto from '~/lib/crypto';
import * as lText from '~/lib/text';
import * as lWs from '~/lib/ws';
import * as lTime from '~/lib/time';
import * as lResponse from '~/lib/net/response';
import * as sCtr from './ctr';
import * as def from '~/sys/def';
import * as types from '~/types';

/** --- 动态层 kebab.json 缓存（文件路径: 最终合并值） --- */
let kebabConfigs: Record<string, types.IConfig> = {};

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
    'socket'?: stream.Duplex;
    'uri': url.UrlWithStringQuery;
    /** --- 虚拟主机当前动态目录的绝对根目录，末尾带 / --- */
    'rootPath': string;
    /** --- base url，如 /abc/vhost/，前后都带 / --- */
    'urlBase': string;
    /** --- 前面不带 /，末尾不一定，以用户用户请求为准 --- */
    'path': string;
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
    else {
        // --- socket 要发送成功的消息(握手) ---
        const swa = lCrypto.hashHmac('sha1', (data.req.headers['sec-websocket-key'] ?? '') + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', undefined, 'base64');
        data.socket!.write([
            `HTTP/${data.req.httpVersion} 101 Switching Protocols`,
            `upgrade: websocket`,
            `connection: upgrade`,
            `sec-webSocket-accept: ${swa}`
        ].join('\r\n') + '\r\n\r\n');
    }
    // --- 判断全局 config 是否已经加载过读取过 ---
    if (lCore.globalConfig.httpPort === undefined) {
        const configContent = await lFs.getContent(def.CONF_PATH + 'config.json', 'utf8');
        if (configContent) {
            /** --- 系统 config.json --- */
            const config = JSON.parse(configContent);
            for (const name in config) {
                lCore.globalConfig[name] = config[name];
            }
        }
    }
    // --- 判断 kebab config 是否已经读取过 ---
    if (!kebabConfigs[data.rootPath + 'kebab.json']) {
        const configContent = await lFs.getContent(data.rootPath + 'kebab.json', 'utf8');
        if (!configContent) {
            if (data.res) {
                data.res.setHeader('content-length', 45);
                data.res.writeHead(500);
                data.res.end('<h1>500 File config.json can not be read</h1><hr>Kebab');
            }
            else {
                data.socket!.end('500 File config.json can not be read.');
            }
            return true;
        }
        kebabConfigs[data.rootPath + 'kebab.json'] = JSON.parse(configContent);
        const routeContent = await lFs.getContent(data.rootPath + 'route.json', 'utf8');
        if (routeContent) {
            kebabConfigs[data.rootPath + 'kebab.json'].route = JSON.parse(routeContent);
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
    const config: types.IConfig = {} as any;
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

        'mobile': data.req.headers['user-agent'] ? data.req.headers['user-agent'].includes('mobile') : false,
        'wechat': data.req.headers['user-agent'] ? data.req.headers['user-agent'].includes('micromessenger') : false,
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
    if (!config.set.staticPath) {
        config.set.staticPath = config.const.urlStc;
    }
    if (!config.set.staticPathFull) {
        config.set.staticPathFull = config.const.urlStcFull;
    }
    // --- data.path 是安全的，不会是 ../../ 来访问到了外层，已经做过处理 ---
    let path = data.path;
    // --- 如果为空则定义为 @ ---
    if (path === '') {
        path = '@';
    }
    // --- 检查路由表 ---
    const param: string[] = [];
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
        const text = '[Error] Controller not found, path: ' + data.path + '.';
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
            data.socket!.end(text);
        }
        return true;
    }
    // --- 加载中间控制器 ---
    const middleCtr = (await import((data.res ? config.const.ctrPath : config.const.wsPath) + 'middle')).default as typeof sCtr.Ctr;
    const middle: sCtr.Ctr = new middleCtr(config, data.req, data.res ?? data.socket!);
    // --- 对信息进行初始化 ---
    // --- 路由定义的参数序列 ---
    middle.setPrototype('_param', param);
    // --- action 名 ---
    middle.setPrototype('_action', pathRight);
    // --- 处理 headers ---
    const headers: http.IncomingHttpHeaders = {};
    for (const key in data.req.headers) {
        headers[key.toLowerCase()] = data.req.headers[key];
    }
    if (!headers['authorization']) {
        headers['authorization'] = '';
    }
    middle.setPrototype('_headers', headers);

    // --- 原始 GET ---
    const get = data.uri.query ? lText.queryParse(data.uri.query) : {};
    middle.setPrototype('_get', get);
    if (data.res) {
        const rawPost = await getPost(data.req);
        // --- 原始 POST ---
        middle.setPrototype('_rawPost', rawPost[1]);
        // --- 原始 input ---
        middle.setPrototype('_input', rawPost[0]);
        // --- 处理 POST 的值 JSON 上面就同时处理了 ---
        // --- 格式化 post 数据 ---
        // --- assign 是为了创建一份拷贝 ---
        const post = Object.assign({}, rawPost[1]);
        trimPost(post);
        middle.setPrototype('_post', post);
    }
    // --- form data 格式交由用户自行获取，可以直接获取文件流，然后做他想做的事情 ---

    // --- Cookie ---
    const cookies: Record<string, string> = {};
    if (data.req.headers['cookie']) {
        const hcookies: string[] = data.req.headers['cookie'].split(';');
        for (const cookie of hcookies) {
            const co: string[] = cookie.split('=');
            cookies[co[0].trim()] = decodeURIComponent(co[1]);
        }
        middle.setPrototype('_cookie', cookies);
    }

    // --- 执行中间控制器的 _load ---
    let rtn: any;
    try {
        rtn = await (middle.onLoad() as any);
    }
    catch (e: any) {
        await lCore.log(middle, '(E03)' + JSON.stringify((e.stack as string)).slice(1, -1), '-error');
        if (data.res) {
            data.res.setHeader('content-type', 'text/html; charset=utf-8');
            data.res.setHeader('content-length', 25);
            data.res.writeHead(500);
            data.res.end('<h1>500 Server Error</h1><hr>Kebab');
        }
        else {
            data.socket!.end('500 Server Error');
        }
        return true;
    }
    let cacheTTL: number = middle.getPrototype('_cacheTTL');
    let httpCode: number = middle.getPrototype('_httpCode');
    if (rtn === undefined || rtn === true) {
        // --- 只有不返回或返回 true 时才加载控制文件 ---
        // --- 判断真实控制器文件是否存在 ---
        const filePath = (data.res ? config.const.ctrPath : config.const.wsPath) + pathLeft + '.js';
        if (!await lFs.isFile(filePath)) {
            // --- 指定的控制器不存在 ---
            const text = '[Error] Controller not found, path: ' + data.path + '.';
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
                lWs.send(data.socket!, text);
                data.socket!.end();
            }
            return true;
        }
        // --- 加载控制器文件 ---
        const ctrCtr: typeof sCtr.Ctr = (await import(filePath)).default;
        const cctr: sCtr.Ctr = new ctrCtr(config, data.req, data.res ?? data.socket!);
        // --- 对信息进行初始化 ---
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

        await lCore.log(cctr, '', '-visit');

        if (data.res) {
            // --- 强制 HTTPS ---
            if (config.set.mustHttps && !config.const.https) {
                data.res.setHeader('location', data.req.url ?? '');
                data.res.writeHead(302);
                return true;
            }
            // --- 检测 action 是否存在，以及排除内部方法 ---
            if (pathRight.startsWith('_') || pathRight === 'onLoad' || pathRight === 'onData' || pathRight === 'onClose' || pathRight === 'setPrototype' || pathRight === 'getPrototype' || pathRight === 'getAuthorization') {
                // --- _ 开头的 action 是内部方法，不允许访问 ---
                if (config.route['#404']) {
                    data.res.setHeader('location', lText.urlResolve(config.const.urlBase, config.route['#404']));
                    data.res.writeHead(302);
                    data.res.end('');
                    return true;
                }
                const text = '[Error] Action not found, path: ' + data.path + '.';
                data.res.setHeader('content-type', 'text/html; charset=utf-8');
                data.res.setHeader('content-length', Buffer.byteLength(text));
                data.res.writeHead(404);
                data.res.end(text);
                return true;
            }
            pathRight = pathRight.replace(/-([a-zA-Z0-9])/g, function(t, t1: string): string {
                return t1.toUpperCase();
            });
            if ((cctr as any)[pathRight] === undefined) {
                if (config.route['#404']) {
                    data.res.setHeader('location', lText.urlResolve(config.const.urlBase, config.route['#404']));
                    data.res.writeHead(302);
                    data.res.end('');
                    return true;
                }
                const text = '[Error] Action not found, path: ' + data.path + '.';
                data.res.setHeader('content-type', 'text/html; charset=utf-8');
                data.res.setHeader('content-length', Buffer.byteLength(text));
                data.res.writeHead(404);
                data.res.end(text);
                return true;
            }
            // --- 执行 onLoad 方法 ---
            try {
                rtn = await (cctr.onLoad() as any);
                // --- 执行 action ---
                if (rtn === undefined || rtn === true) {
                    rtn = await (cctr as any)[pathRight]();
                    await unlinkUploadFiles(cctr);
                    const sess = cctr.getPrototype('_sess');
                    if (sess) {
                        await sess.update();
                    }
                }
                // --- 获取 ctr 设置的 cache 和 hcode ---
                cacheTTL = cctr.getPrototype('_cacheTTL');
                httpCode = cctr.getPrototype('_httpCode');
            }
            catch (e: any) {
                await lCore.log(cctr, '(E04)' + JSON.stringify(e.stack).slice(1, -1), '-error');
                data.res.setHeader('content-type', 'text/html; charset=utf-8');
                data.res.setHeader('content-length', 25);
                data.res.writeHead(500);
                data.res.end('<h1>500 Server Error</h1><hr>Kebab');
                return true;
            }
        }
        else {
            // --- web socket ---
            // --- 执行 onLoad 方法 ---
            try {
                rtn = await (cctr as any).onLoad();
            }
            catch (e: any) {
                await lCore.log(cctr, JSON.stringify((e.stack as string)).slice(1, -1), '-error');
                data.socket!.end('500 Internal server error.');
                return true;
            }
            if (rtn === undefined || rtn === true) {
                await new Promise<void>(function(resolve) {
                    data.socket!.on('data', function(chunk: Buffer): void {
                        (async function() {
                            const da = lWs.decodeDataFrame(chunk);
                            if (da.opcode === 8) {
                                // --- 关闭连接 ---
                                data.socket!.end();
                            }
                            else {
                                const wrtn = await (cctr as any)['onData'](da.payloadData);
                                if (wrtn) {
                                    lWs.send(data.socket!, wrtn);
                                }
                            }
                        })().catch(async (e) => {
                            await lCore.log(cctr, JSON.stringify((e.stack as string)).slice(1, -1), '-error');
                        });
                    }).on('close', function() {
                        (async function() {
                            await (cctr as any)['onClose']();
                            resolve();
                        })().catch(async (e) => {
                            await lCore.log(cctr, JSON.stringify((e.stack as string)).slice(1, -1), '-error');
                        });
                    });
                });
                return true;
            }
            // --- socket 断开后才会继续往下执行 ---
        }
    }
    // --- 设置缓存 ---
    if (data.res && !data.res.headersSent && (cacheTTL > 0)) {
        data.res.setHeader('expires', lTime.format(0, 'D, d M Y H:i:s', Date.now() + cacheTTL * 1000) + ' GMT');
        data.res.setHeader('cache-control', 'max-age=' + cacheTTL.toString());
    }
    // --- 设置自定义 hcode ---
    if (httpCode === 0) {
        httpCode = 200;
    }
    // --- 判断返回值 ---
    if (rtn === undefined || typeof rtn === 'boolean' || rtn === null) {
        if (data.res) {
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
                data.res.end('');
            }
        }
        else {
            data.socket!.end('');
        }
        return true;
    }
    if (typeof rtn === 'string' || rtn instanceof Buffer) {
        // --- 返回的是纯字符串，直接输出 ---
        if (data.res) {
            /** --- 当前的压缩对象 --- */
            let compress: lZlib.ICompress | null = null;
            if (!data.res.headersSent) {
                if (!data.res.getHeader('content-type')) {
                    data.res.setHeader('content-type', 'text/html; charset=utf-8');
                }
                if (Buffer.byteLength(rtn) >= 1024) {
                    compress = lZlib.createCompress(data.req.headers['accept-encoding'] as string ?? '');
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
        else {
            data.socket!.end(rtn);
        }
    }
    else if (rtn instanceof stream.Readable || rtn instanceof lResponse.Response) {
        // --- 返回的是流，那就以管道的形式输出 ---
        const stm = rtn instanceof stream.Readable ? rtn : rtn.getStream();
        if (data.res) {
            /** --- 当前的压缩对象 --- */
            let compress: lZlib.ICompress | null = null;
            if (!data.res.headersSent) {
                if (!data.res.getHeader('content-type')) {
                    data.res.setHeader('content-type', 'text/html; charset=utf-8');
                }
                compress = lZlib.createCompress(data.req.headers['accept-encoding'] as string ?? '');
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
        else {
            stm.pipe(data.socket!);
        }
    }
    else if (typeof rtn === 'object') {
        // --- 返回的是数组，那么代表可能是 JSON，可能是对象序列 ---
        if (Array.isArray(rtn)) {
            // --- [0, 'xxx'] 模式，或 [string, Readable] 模式 ---
            if (rtn.length === 0) {
                // --- 异常 ---
                if (data.res) {
                    if (!data.res.headersSent) {
                        data.res.writeHead(500);
                    }
                    if (!data.res.writableEnded) {
                        data.res.end('<h1>500 Internal server error</h1><hr>Kebab');
                    }
                }
                else {
                    data.socket!.end('500 Internal server error.');
                }
            }
            else {
                if (typeof rtn[0] === 'number') {
                    // --- 1. ---
                    const json: Record<string, any> = { 'result': rtn[0] };
                    if (rtn[1] !== undefined) {
                        if (typeof rtn[1] === 'object') {
                            // --- [0, {'xx': 'xx'}] ---
                            Object.assign(json, rtn[1]);
                        }
                        else {
                            // --- [0, 'xxx'], [0, 'xxx', {'xx': 'xx'}] ---
                            json['msg'] = rtn[1];
                            if (rtn[2] !== undefined) {
                                Object.assign(json, rtn[2]);
                            }
                        }
                    }
                    const writeData = JSON.stringify(json);
                    if (data.res) {
                        /** --- 当前的压缩对象 --- */
                        let compress: lZlib.ICompress | null = null;
                        if (!data.res.headersSent) {
                            data.res.setHeader('content-type', 'application/json; charset=utf-8');
                            if (Buffer.byteLength(writeData) >= 1024) {
                                compress = lZlib.createCompress(data.req.headers['accept-encoding'] as string ?? '');
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
                        data.socket!.end(writeData);
                    }
                }
                else {
                    // --- 2. 字符串与 Readable 的组合 ---
                    if (data.res) {
                        /** --- 当前的压缩对象 --- */
                        let compress: lZlib.ICompress | null = null;
                        if (!data.res.headersSent) {
                            if (!data.res.getHeader('content-type')) {
                                data.res.setHeader('content-type', 'text/html; charset=utf-8');
                            }
                            compress = lZlib.createCompress(data.req.headers['accept-encoding'] as string ?? '');
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
                    else {
                        // --- socket ---
                        const passThrough = new stream.PassThrough();
                        passThrough.pipe(data.socket!);
                        await lCore.passThroughAppend(passThrough, rtn);
                    }
                }
            }
        }
        else {
            // --- 直接是个 json 对象 ---
            const writeData = JSON.stringify(rtn);
            if (data.res) {
                /** --- 当前的压缩对象 --- */
                let compress: lZlib.ICompress | null = null;
                if (!data.res.headersSent) {
                    data.res.setHeader('content-type', 'application/json; charset=utf-8');
                    if (Buffer.byteLength(writeData) >= 1024) {
                        compress = lZlib.createCompress(data.req.headers['accept-encoding'] as string ?? '');
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
                data.socket!.end(JSON.stringify(rtn));
            }
        }
    }
    else {
        // --- 异常 ---
        if (data.res) {
            if (!data.res.headersSent) {
                data.res.writeHead(500);
            }
            if (!data.res.writableEnded) {
                data.res.end('<h1>500 Internal server error</h1><hr>Kebab');
            }
        }
        else {
            data.socket!.end('500 Internal server error.');
        }
    }
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
 * --- 根据 path 获取 ws 的控制器类名, Mutton: false, Kebab: true ---
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
 * --- 删除本次请求所有已上传的临时文件, Mutton: false, Kebab: true ---
 * @param cctr Ctr 对象
 */
export async function unlinkUploadFiles(cctr: sCtr.Ctr): Promise<void> {
    const cfiles = cctr.getPrototype('_files');
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
 * --- 将 POST 数据的值执行 trim ---
 * @param post
 */
export function trimPost(post: Record<string, any>): any {
    for (const key in post) {
        const val = post[key];
        if (typeof val === 'string') {
            post[key] = post[key].trim();
        }
        else if (typeof val === 'object') {
            trimPost(post[key]);
        }
    }
}

/**
 * --- 内部使用，获取 post 对象，如果是文件上传（formdata）的情况则不获取 ---
 * @param req 请求对象
 */
function getPost(req: http2.Http2ServerRequest | http.IncomingMessage): Promise<[string, Record<string, any>]> {
    return new Promise(function(resolve) {
        const ct = req.headers['content-type'] ?? '';
        if (ct.includes('form-data')) {
            resolve(['', {}]);
            return;
        }
        // --- json 或普通 post ---
        const str: string[] = [];
        req.on('data', function(chunk: Buffer) {
            str.push(chunk.toString());
        });
        req.on('end', function() {
            const s = str.join('');
            if (!s) {
                resolve(['', {}]);
                return;
            }
            // --- 判断 json 还是普通 ---
            if (ct.includes('json')) {
                try {
                    resolve([s, JSON.parse(s)]);
                }
                catch {
                    resolve(['', {}]);
                }
                return;
            }
            resolve([s, lText.queryParse(s)]);
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
    'post': Record<string, any>;
    'files': Record<string, types.IPostFile | types.IPostFile[]>;
}> {
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
            'post': Record<string, any>;
            'files': Record<string, types.IPostFile | types.IPostFile[]>;
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
                            state = EState.FILE;
                            fileName = match[1];
                            const fr = events.onfilestart?.(name);
                            if (fr !== true) {
                                // --- 创建文件流 ---
                                const date = new Date();
                                ftmpName = date.getUTCFullYear().toString() + lText.pad(date.getUTCMonth() + 1) + lText.pad(date.getUTCDate()) + lText.pad(date.getUTCHours()) + lText.pad(date.getUTCMinutes()) + '_' + lCore.random() + '.ftmp';
                                ftmpStream = lFs.createWriteStream(def.FTMP_PATH + ftmpName);
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
                            ftmpStream.end();
                            // --- POST 部分 ---
                            let fname = fileName.replace(/\\/g, '/');
                            const nlio = fname.lastIndexOf('/');
                            if (nlio !== -1) {
                                fname = fname.slice(nlio + 1);
                            }
                            const val: types.IPostFile = {
                                'name': fname,
                                'origin': fileName,
                                'size': ftmpSize,
                                'path': def.FTMP_PATH + ftmpName
                            };
                            if (rtn.files[name]) {
                                if (Array.isArray(rtn.files[name])) {
                                    (rtn.files[name] as types.IPostFile[]).push(val);
                                }
                                else {
                                    rtn.files[name] = [rtn.files[name] as types.IPostFile, val];
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
        req.on('end', function() {
            resolve(rtn);
        });
    });
}

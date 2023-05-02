/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-5-3 23:54
 * Last: 2020-3-31 15:01:07, 2020-4-9 22:28:50, 2022-07-22 14:19:46, 2022-9-29 22:11:07, 2023-5-1 18:26:57
 */
import * as http2 from 'http2';
import * as url from 'url';
import * as tls from 'tls';
import * as http from 'http';
import * as stream from 'stream';
import * as crypto from 'crypto';
// --- 库和定义 ---
import * as fs from '~/lib/fs';
import * as lCore from '~/lib/core';
import * as lText from '~/lib/text';
import * as def from '~/sys/def';
import * as ctr from '~/sys/ctr';
// --- 初始化 ---
import * as route from '~/sys/route';
import * as types from '~/types';

/** --- 10 秒往主线程发送一次心跳的 Timer --- */
const hbTimer = setInterval(function() {
    if (!process.connected || !process.send) {
        return;
    }
    process.send({
        action: 'hbtime',
        pid: process.pid
    });
}, 10000);

/** --- 加载的证书列表（path: { sc, cert }） --- */
const certList: Array<{
    'sc': tls.SecureContext;
    'cert': crypto.X509Certificate;
}> = [];

/** --- server: index --- */
let certHostIndex: Record<string, any> = {};

/** --- 当前的虚拟主机配置列表 - 读取于 conf/vhost/*.json --- */
let vhosts: types.IVhost[] = [];

/** --- http 服务器 --- */
let httpServer: http.Server;

/** --- http2 服务器 --- */
let http2Server: http2.Http2SecureServer;

/** --- 当前使用中的连接 --- */
const linkCount: Record<string, number> = {};

/**
 * --- 最终调用执行的函数块，创建 http 服务器等 ---
 */
async function run(): Promise<void> {
    // --- 加载 vhosts、sni 证书 ---
    await reload();

    // --- 加载系统全局 config.json ---
    const configContent = await fs.getContent(def.CONF_PATH + 'config.json', 'utf8');
    if (!configContent) {
        throw `File '${def.CONF_PATH}config.json' not found.`;
    }
    /** --- 系统 config.json --- */
    const config = JSON.parse(configContent);
    for (const key in config) {
        lCore.globalConfig[key] = config[key];
    }

    // --- 创建服务器并启动（支持 http2/https/http/websocket） ---
    http2Server = http2.createSecureServer({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'SNICallback': (servername, cb) => {
            const i = certHostIndex[servername];
            if (i !== undefined) {
                cb(null, certList[i].sc);
                return;
            }
            // --- 查找 servername ---
            for (let i = 0; i < certList.length; ++i) {
                if (!certList[i].cert.checkHost(servername)) {
                    continue;
                }
                // --- 找到 ---
                cb(null, certList[i].sc);
                certHostIndex[servername] = i;
                return;
            }
        },
        'ciphers': 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS',
        'allowHTTP1': true
    }, function(req: http2.Http2ServerRequest, res: http2.Http2ServerResponse): void {
        req.setTimeout(30 * 1000);
        (async function() {
            const key = (req.headers[':authority'] ?? '') + req.url;
            if (!linkCount[key]) {
                linkCount[key] = 0;
            }
            ++linkCount[key];
            await requestHandler(req, res, true);
            --linkCount[key];
            if (!linkCount[key]) {
                delete linkCount[key];
            }
        })().catch(async function(e) {
            await lCore.log({
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': req,
                'get': {},
                'post': {},
                'cookie': {},
                'headers': {},
                'input': ''
            }, '[child][http2][request]' + JSON.stringify((e.stack as string)).slice(1, -1), '-error');
        });
    }).on('upgrade', function(req: http.IncomingMessage, socket: tls.TLSSocket): void {
        (async function() {
            const key = (req.headers['host'] ?? '') + (req.url ?? '');
            if (!linkCount[key]) {
                linkCount[key] = 0;
            }
            ++linkCount[key];
            await upgradeHandler(req, socket, true);
            --linkCount[key];
            if (!linkCount[key]) {
                delete linkCount[key];
            }
        })().catch(function(e) {
            console.error('[child] [http2] [upgrade]', e);
        });
    }).listen(config.httpsPort);
    httpServer = http.createServer(function(req: http.IncomingMessage, res: http.ServerResponse): void {
        req.setTimeout(30 * 1000);
        (async function() {
            const key = (req.headers['host'] ?? '') + (req.url ?? '');
            if (!linkCount[key]) {
                linkCount[key] = 0;
            }
            ++linkCount[key];
            await requestHandler(req, res, false);
            --linkCount[key];
            if (!linkCount[key]) {
                delete linkCount[key];
            }
        })().catch(async function(e) {
            await lCore.log({
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': req,
                'get': {},
                'post': {},
                'cookie': {},
                'headers': {},
                'input': ''
            }, '[child][http][request]' + JSON.stringify((e.stack as string)).slice(1, -1), '-error');
        });
    }).on('upgrade', function(req: http.IncomingMessage, socket: stream.Duplex): void {
        (async function() {
            const key = (req.headers['host'] ?? '') + (req.url ?? '');
            if (!linkCount[key]) {
                linkCount[key] = 0;
            }
            ++linkCount[key];
            await upgradeHandler(req, socket, false);
            --linkCount[key];
            if (!linkCount[key]) {
                delete linkCount[key];
            }
        })().catch(async function(e) {
            await lCore.log({
                'path': '',
                'urlFull': '',
                'hostname': '',
                'req': req,
                'get': {},
                'post': {},
                'cookie': {},
                'headers': {},
                'input': ''
            }, '[child][http][upgrade]' + JSON.stringify((e.stack as string)).slice(1, -1), '-error');
        });
    }).listen(config.httpPort);
}

/**
 * --- http / https / http2 请求的回调函数 ---
 * @param req 请求对象
 * @param res 响应对象
 * @param https 是否是 ssl
 */
async function requestHandler(
    req: http2.Http2ServerRequest | http.IncomingMessage,
    res: http2.Http2ServerResponse | http.ServerResponse,
    https: boolean
): Promise<void> {
    // --- 设置服务器名版本 ---
    res.setHeader('Server', 'Kebab/' + def.VER);
    // --- 当前 uri ---
    const uri: url.UrlWithStringQuery = url.parse(`http${https ? 's' : ''}://${req.headers[':authority'] ?? req.headers['host']}${req.url}`);
    /** --- 当前的 vhost 配置文件 --- */
    const vhost = getVhostByHostname(uri.hostname ?? '');
    if (!vhost) {
        const text = '<h1>Kebab: No permissions</h1>host: ' + (req.headers[':authority'] as string | undefined ?? req.headers['host'] ?? '') + '<br>url: ' + (lText.htmlescape(req.url ?? ''));
        res.setHeader('content-length', Buffer.byteLength(text));
        res.writeHead(403);
        res.end(text);
        return;
    }
    /** --- 网站绝对根目录，末尾带 / --- */
    let rootPath = lText.isRealPath(vhost.root) ? vhost.root : def.WWW_PATH + vhost.root;
    if (!rootPath.endsWith('/')) {
        rootPath += '/';
    }
    /** --- 请求的路径部分，前导带 / 末尾不一定，用户怎么请求就是什么 --- */
    let path = uri.pathname ?? '/';
    if (path !== '/') {
        // --- 去除 ../ ./ 之类的 ---
        path = lText.urlResolve('/', path);
    }
    /** --- [''] / ['', 'abc', 'def'] ---  */
    const pathList = path.split('/');
    /** --- 当前处理的路径，前导不带 / 末尾带 /，例如 abc/ --- */
    let now = '';
    for (let i = 0; i < pathList.length; ++i) {
        const item = pathList[i];
        if (item !== '') {
            // --- 判断 item 是文件还是文件夹 ---
            /** --- 'abc' / 'def.json' ---  */
            let stat = await fs.stats(rootPath + now + item);
            if (!stat) {
                res.setHeader('content-type', 'text/html; charset=utf-8');
                res.setHeader('content-length', 22);
                res.writeHead(404);
                res.end('<h1>404 Not found</h1><hr>Kebab');
                return;
            }
            if (stat.isDirectory()) {
                now += item + '/';
                // --- 判断是不是动态层 ---
                stat = await fs.stats(rootPath + now + 'kebab.json');
                if (stat) {
                    // --- 动态层，交给 Route 处理器 ---
                    try {
                        if (await route.run({
                            'req': req,
                            'res': res,
                            'uri': uri,
                            'rootPath': rootPath + now,
                            'urlBase': '/' + now,
                            'path': path.slice(('/' + pathList.slice(0, i).join('/')).length + 1)
                        })) {
                            return;
                        }
                    }
                    catch (e: any) {
                        await lCore.log({
                            'path': path.slice(('/' + pathList.slice(0, i).join('/')).length + 1),
                            'urlFull': (uri.protocol ?? '') + '//' + (uri.host ?? '') + '/' + now,
                            'hostname': uri.hostname ?? '',
                            'req': req,
                            'get': uri.query ? lText.queryParse(uri.query) : {},
                            'post': {},
                            'cookie': {},
                            'headers': {},
                            'input': ''
                        }, '(E01)' + JSON.stringify((e.stack as string)).slice(1, -1), '-error');
                        res.setHeader('content-type', 'text/html; charset=utf-8');
                        res.setHeader('content-length', 25);
                        res.writeHead(500);
                        res.end('<h1>500 Server Error</h1><hr>Kebab');
                        return;
                    }
                }
            }
            else {
                // --- 文件，直接输出并结束 ---
                await fs.readToResponse(rootPath + now + item, req, res, stat);
                return;
            }
        }
        else {
            // --- item 为空，但是 i 不是 0，则是最后一个空，直接 break ---
            if (i > 0) {
                break;
            }
            // --- 本层是根，判断根是不是动态层 ---
            const stat = await fs.stats(rootPath + now + 'kebab.json');
            if (stat) {
                // --- 动态层，交给 Route 处理器 ---
                try {
                    if (await route.run({
                        'req': req,
                        'res': res,
                        'uri': uri,
                        'rootPath': rootPath + now,
                        'urlBase': '/' + now,
                        'path': path.slice(1)
                    })) {
                        return;
                    }
                }
                catch (e: any) {
                    await lCore.log({
                        'path': path.slice(1),
                        'urlFull': (uri.protocol ?? '') + '//' + (uri.host ?? '') + '/' + now,
                        'hostname': uri.hostname ?? '',
                        'req': req,
                        'get': uri.query ? lText.queryParse(uri.query) : {},
                        'post': {},
                        'cookie': {},
                        'headers': {},
                        'input': ''
                    }, '(E02)' + JSON.stringify((e.stack as string)).slice(1, -1), '-error');
                    res.setHeader('content-type', 'text/html; charset=utf-8');
                    res.setHeader('content-length', 25);
                    res.writeHead(500);
                    res.end('<h1>500 Server Error</h1><hr>Kebab');
                    return;
                }
            }
        }
    }
    // --- 最后一层是目录，且不是动态层，判断有没有主页，有则输出，没有则 403 出错 ---
    const indexFiles: string[] = ['index.html', 'index.htm'];
    for (const indexFile of indexFiles) {
        const stat = await fs.isFile(rootPath + now + indexFile);
        if (stat) {
            await fs.readToResponse(rootPath + now + indexFile, req, res, stat);
            return;
        }
    }
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.setHeader('content-length', 22);
    res.writeHead(403);
    res.end('<h1>403 Forbidden</h1><hr>Kebab');
}

/**
 * --- WebSocket 响应 handler ---
 * @param req 请求对象
 * @param socket socket 对象
 * @param https 是否是 https
 */
async function upgradeHandler(req: http.IncomingMessage, socket: stream.Duplex, https: boolean): Promise<void> {
    socket.removeAllListeners('error');
    // --- 当前 uri ---
    const uri: url.UrlWithStringQuery = url.parse(`ws${https ? 's' : ''}://${req.headers['host']}${req.url}`);
    /** --- 当前的 vhost 配置文件 --- */
    const vhost = getVhostByHostname(uri.hostname ?? '');
    if (!vhost) {
        socket.end(`HTTP/${req.httpVersion} 403 No permissions\r\n\r\n`);
        return;
    }
    /** --- 网站绝对根目录，末尾带 / --- */
    let rootPath = lText.isRealPath(vhost.root) ? vhost.root : def.WWW_PATH + vhost.root;
    if (!rootPath.endsWith('/')) {
        rootPath += '/';
    }
    /** --- 请求的路径部分，前导带 / 末尾不一定，用户怎么请求就是什么 --- */
    let path = uri.pathname ?? '/';
    if (path !== '/') {
        // --- 去除 ../ ./ 之类的 ---
        path = lText.urlResolve('/', path);
    }
    /** --- [''] / ['', 'abc', 'def'] ---  */
    const pathList = path.split('/');
    /** --- 当前处理的路径，前导不带 / 末尾带 /，例如 abc/ --- */
    let now = '';
    for (let i = 0; i < pathList.length; ++i) {
        const item = pathList[i];
        if (item !== '') {
            // --- 判断 item 是文件还是文件夹 ---
            /** --- 'abc' / 'def.json' ---  */
            let stat = await fs.stats(rootPath + now + item);
            if (!stat) {
                socket.end(`HTTP/${req.httpVersion} 404 Not found\r\n\r\n`);
                return;
            }
            if (stat.isDirectory()) {
                now += item + '/';
                // --- 判断是不是动态层 ---
                stat = await fs.stats(rootPath + now + 'kebab.json');
                if (stat) {
                    // --- 动态层，交给 Route 处理器 ---
                    if (await route.run({
                        'req': req,
                        'socket': socket,
                        'uri': uri,
                        'rootPath': rootPath + now,
                        'urlBase': '/' + now,
                        'path': path.slice(('/' + pathList.slice(0, i).join('/')).length + 1)
                    })) {
                        return;
                    }
                }
            }
            else {
                // --- 文件，报错 ---
                socket.end(`HTTP/${req.httpVersion} 403 No permissions\r\n\r\n`);
                return;
            }
        }
        else {
            // --- item 为空，但是 i 不是 0，则是最后一个空，直接 break ---
            if (i > 0) {
                break;
            }
            // --- 判断根是不是动态层 ---
            const stat = await fs.stats(rootPath + now + 'kebab.json');
            if (stat) {
                // --- 动态层，交给 Route 处理器 ---
                if (await route.run({
                    'req': req,
                    'socket': socket,
                    'uri': uri,
                    'rootPath': rootPath + now,
                    'urlBase': '/' + now,
                    'path': path.slice(1)
                })) {
                    return;
                }
            }
        }
    }
    // --- 最后一层，又不是动态层 ---
    socket.end(`HTTP/${req.httpVersion} 403 No permissions\r\n\r\n`);
}

/**
 * --- 加载/重载 vhosts 信息、清空证书信息、清空全局 config、重新加载证书。（清除动态 kebab.json 信息、data 信息、语言包信息） ---
 */
async function reload(): Promise<void> {
    // --- 清除全局 config，下次 run 时就会重新加载了（/conf/config.json） ---
    for (const key in lCore.globalConfig) {
        delete lCore.globalConfig[key];
    }
    // --- 重新加载 VHOST 信息（/conf/vhost/） ---
    const files = await fs.readDir(def.VHOST_PATH);
    vhosts = [];
    for (const file of files) {
        const fstr = await fs.getContent(def.VHOST_PATH + file.name, 'utf8');
        if (!fstr) {
            continue;
        }
        let list: any = JSON.parse(fstr);
        if (!Array.isArray(list)) {
            list = [list];
        }
        for (const item of list) {
            vhosts.push(item);
        }
    }
    // --- 重新加载证书对 ---
    certList.length = 0;
    try {
        const certConfig = await fs.getContent(def.CONF_PATH + 'cert.json', 'utf8');
        if (certConfig) {
            const certs = JSON.parse(certConfig);
            for (const item of certs) {
                const key = await fs.getContent(lText.isRealPath(item.key) ? item.key : def.CERT_PATH + item.key, 'utf8');
                const cert = await fs.getContent(lText.isRealPath(item.cert) ? item.cert : def.CERT_PATH + item.cert, 'utf8');
                if (!cert || !key) {
                    continue;
                }
                const certo = new crypto.X509Certificate(cert);
                const sc = tls.createSecureContext({
                    'key': key,
                    'cert': cert
                });
                certList.push({
                    'cert': certo,
                    'sc': sc
                });
            }
        }
    }
    catch {
        // --- NOTHING ---
    }
    certHostIndex = {};
    // --- 其他操作 ---
    route.clearKebabConfigs();
    ctr.clearLocaleData();
}

// --- 接收主进程回传信号，主要用来 reload，restart ---
process.on('message', function(msg: any) {
    (async function() {
        switch (msg.action) {
            case 'reload': {
                await reload();
                console.log(`[child] Worker ${process.pid} reload execution succeeded.`);
                break;
            }
            case 'stop': {
                // --- 需要停止监听，等待已有连接全部断开，然后关闭线程 ---
                httpServer.close();
                http2Server.close();
                clearInterval(hbTimer);
                // --- 等待连接全部断开 ---
                while (true) {
                    if (!Object.keys(linkCount).length) {
                        break;
                    }
                    // --- 有长连接，等待中 ---
                    const str: string[] = [];
                    for (const key in linkCount) {
                        str.push(key + ':' + linkCount[key].toString());
                    }
                    console.log(`[child] Worker ${process.pid} busy: ${str.join(',')}.`);
                    await lCore.log({
                        'path': '',
                        'urlFull': '',
                        'hostname': '',
                        'req': null,
                        'get': {},
                        'post': {},
                        'cookie': {},
                        'headers': {},
                        'input': ''
                    }, `[child] Worker ${process.pid} busy: ${str.join(',')}.`, '-error');
                    await lCore.sleep(5000);
                }
                // --- 链接全部断开 ---
                console.log(`[child] Worker ${process.pid} has run disconnect().`);
                process.disconnect();
                break;
            }
        }
    })().catch(function(e) {
        console.log('[child] [process] [message]', e);
    });
});

/**
 * --- 获取匹配的 vhost 对象 ---
 * --- 如果有精准匹配，以精准匹配为准，否则为 2 级泛匹配（vSub），最后全局泛匹配（vGlobal） ---
 * @param hostname 当前的 hostname，不带端口
 */
function getVhostByHostname(hostname: string): types.IVhost | null {
    let vGlobal!: types.IVhost, vSub!: types.IVhost;
    for (const vhost of vhosts) {
        for (let domain of vhost.domains) {
            if (domain === '*') {
                // --- 全局泛匹配 ---
                vGlobal = vhost;
            }
            else if (domain.includes('*')) {
                // --- 2 级泛匹配 ---
                domain = domain.replace(/\*/, '^.+?').replace(/\./, '\\.');
                if (new RegExp(domain + '$').test(hostname)) {
                    vSub = vhost;
                }
            }
            else if (domain === hostname) {
                // --- 完全匹配 ---
                return vhost;
            }
        }
    }
    if (vSub) {
        return vSub;
    }
    if (vGlobal) {
        return vGlobal;
    }
    return null;
}

run().catch(function(e): void {
    console.log('[child] ------ [Process fatal Error] ------');
    console.log(e);
});

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-3-29 23:03:07
 * Last: 2020-3-11 22:21:51, 2022-12-29 01:18:25, 2023-12-13 20:50:09
 */
import * as fs from 'fs';
import * as http from 'http';
import * as http2 from 'http2';
import * as mime from '@litert/mime';
import * as lText from './text.js';
import * as lCore from './core.js';
import * as lZlib from './zlib.js';

export function getContent(path: string, options?: {
    'start'?: number;
    'end'?: number;
}): Promise<Buffer | null>;
export function getContent(path: string, options: BufferEncoding | {
    'encoding': BufferEncoding;
    'start'?: number;
    'end'?: number;
}): Promise<string | null>;
/**
 * --- 读取完整文件或一段 ---
 * @param path 文件路径
 * @param options 编码或选项
 */
export async function getContent(path: string, options?: BufferEncoding | {
    'encoding'?: BufferEncoding;
    'start'?: number;
    'end'?: number;
}): Promise<Buffer | string | null> {
    if (typeof options === 'string') {
        options = {
            'encoding': options
        };
    }
    else {
        options ??= {};
    }
    const encoding = options.encoding;
    const start = options.start;
    const end = options.end;
    if (start ?? end) {
        return new Promise(function(resolve) {
            const rs = createReadStream(path, {
                'encoding': encoding,
                'start': start,
                'end': end
            });
            const data: Buffer[] = [];
            rs.on('data', (chunk) => {
                if (!(chunk instanceof Buffer)) {
                    return;
                }
                data.push(chunk);
            }).on('end', function() {
                const buf = Buffer.concat(data);
                if (encoding) {
                    resolve(buf.toString());
                }
                else {
                    resolve(buf);
                }
            }).on('error', function() {
                resolve(null);
            });
        });
    }
    else {
        try {
            if (encoding) {
                return await fs.promises.readFile(path, {
                    'encoding': encoding
                });
            }
            else {
                return await fs.promises.readFile(path);
            }
        }
        catch {
            return null;
        }
    }
}

/**
 * --- 写入文件内容 ---
 * @param path 文件路径
 * @param data 要写入的内容
 * @param options 选项
 */
export async function putContent(
    path: string,
    data: string | Buffer,
    options: {
        'encoding'?: BufferEncoding;
        'mode'?: number;
        'flag'?: string;
    } = {}): Promise<boolean> {
    try {
        await fs.promises.writeFile(path, data, options);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * --- 读取链接的 target ---
 * @param path 要读取的路径
 * @param encoding 编码
 */
export async function readLink(path: string, encoding?: BufferEncoding): Promise<string | null> {
    try {
        return await fs.promises.readlink(path, {
            'encoding': encoding
        });
    }
    catch {
        return null;
    }
}

/**
 * --- 把源文件创建一个 link ---
 * @param filePath 源文件
 * @param linkPath 连接路径
 * @param type 仅 Windows，类型，默认 file
 */
export async function symlink(filePath: string, linkPath: string, type?: 'dir' | 'file' | 'junction'): Promise<boolean> {
    try {
        await fs.promises.symlink(filePath, linkPath, type);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * --- 删除一个文件 ---
 * @param path 要删除的文件路径
 */
export async function unlink(path: string): Promise<boolean> {
    for (let i = 0; i <= 2; ++i) {
        try {
            await fs.promises.unlink(path);
            return true;
        }
        catch {
            await lCore.sleep(250);
        }
    }
    try {
        await fs.promises.unlink(path);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * --- 获取对象是否存在，存在则返回 stats 对象，否则返回 null ---
 * @param path 对象路径
 */
export async function stats(path: string): Promise<fs.Stats | null> {
    try {
        return await fs.promises.lstat(path);
    }
    catch {
        return null;
    }
}

/**
 * --- 判断是否是目录或目录是否存在，是的话返回 stats ---
 * @param path 判断路径
 */
export async function isDir(path: string): Promise<fs.Stats | false> {
    const pstats = await stats(path);
    if (!pstats?.isDirectory()) {
        return false;
    }
    return pstats;
}

/**
 * --- 判断是否是文件或文件是否存在，是的话返回 stats ---
 * @param path 判断路径
 */
export async function isFile(path: string): Promise<fs.Stats | false> {
    const pstats = await stats(path);
    if (!pstats?.isFile()) {
        return false;
    }
    return pstats;
}

/**
 * --- 深度创建目录，如果最末目录存在，则自动创建成功 ---
 * @param path 要创建的路径，如 /a/b/c/
 * @param mode 权限
 */
export async function mkdir(path: string, mode: number = 0o755): Promise<boolean> {
    if (await isDir(path)) {
        return true;
    }
    // --- 深度创建目录 ---
    try {
        await fs.promises.mkdir(path, {
            'recursive': true,
            'mode': mode
        });
        return true;
    }
    catch {
        return false;
    }
}

/**
 * --- 删除空目录 ---
 * @param path 要删除的目录
 */
export async function rmdir(path: string): Promise<boolean> {
    if (!(await isDir(path))) {
        return true;
    }
    try {
        await fs.promises.rmdir(path);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * --- Danger 危险：危险函数，尽量不要使用 ---
 * --- This is a danger function, please don't use it ---
 * --- 删除一个非空目录 ---
 */
export async function rmdirDeep(path: string): Promise<boolean> {
    if (!path.endsWith('/')) {
        path += '/';
    }
    const list = await readDir(path);
    for (const item of list) {
        const stat = await stats(item.name);
        if (!stat) {
            return false;
        }
        if (stat.isDirectory()) {
            // --- 目录 ---
            const rtn = await rmdirDeep(path + item.name);
            if (!rtn) {
                return false;
            }
        }
        else {
            const rtn = await unlink(path + item.name);
            if (!rtn) {
                return false;
            }
        }
    }
    return rmdir(path);
}

/**
 * --- 修改权限
 * @param path 要修改的路径
 * @param mod 权限
 */
export async function chmod(path: string, mod: string | number): Promise<boolean> {
    try {
        await fs.promises.chmod(path, mod);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * --- 重命名/移动文件文件夹 ---
 * @param oldPath 老名
 * @param newPath 新名
 */
export async function rename(oldPath: string, newPath: string): Promise<boolean> {
    try {
        await fs.promises.rename(oldPath, newPath);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * --- 获取文件夹下文件列表 ---
 * @param path 文件夹路径
 */
export async function readDir(path: string, encoding?: BufferEncoding): Promise<fs.Dirent[]> {
    try {
        const list: fs.Dirent[] = [];
        const dlist = await fs.promises.readdir(path, {
            'encoding': encoding,
            'withFileTypes': true
        });
        for (const item of dlist) {
            if (item.name === '.' || item.name === '..') {
                continue;
            }
            list.push(item);
        }
        // --- 将 list 根据先目录后文件排序，如果是同是目录或文件，则以名称排序 ---
        list.sort((a, b) => {
            // --- 目录排在文件前面 ---
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            // --- 同类型按名称排序 ---
            return a.name.localeCompare(b.name);
        });
        return list;
    }
    catch {
        return [];
    }
}

/**
 * --- 复制文件夹里的内容到另一个地方，失败不会回滚 ---
 * @param from 源，末尾加 /
 * @param to 目标，末尾加 /
 * @param ignore 忽略的文件
 */
export async function copyFolder(from: string, to: string, ignore: RegExp[] = []): Promise<number> {
    let num = 0;
    // --- 如果源目录不存在或不是目录，则直接成功 :) ---
    if (!await isDir(from)) {
        return 0;
    }
    // --- 遍历源目录文件和文件夹，准备复制 ---
    const flist = await readDir(from);
    /** --- to 目录是否检查是否存在，空目录不复制，所以确定有 item file 的时候才创建 --- */
    let checkTo = false;
    for (const item of flist) {
        if (item.isDirectory()) {
            const r = await copyFolder(from + item.name + '/', to + item.name + '/', ignore);
            if (r === -1) {
                return r;
            }
            else {
                num += r;
            }
        }
        else if (item.isFile()) {
            // --- 先判断本文件是否被排除 ---
            if (ignore.length > 0 && lText.match(item.name, ignore)) {
                continue;
            }
            if (!checkTo) {
                if (!await mkdir(to)) {
                    return -1;
                }
                checkTo = true;
            }
            if (!(await copyFile(from + item.name, to + item.name))) {
                continue;
            }
            ++num;
        }
    }
    return num;
}

/**
 * --- 复制文件 ---
 * @param src 源文件
 * @param dest 目标文件
 */
export async function copyFile(src: string, dest: string): Promise<boolean> {
    try {
        await fs.promises.copyFile(src, dest);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * --- 创建读取文件的流 ---
 * @param path 文件地址
 * @param options 编码或配置
 */
export function createReadStream(path: string, options?: BufferEncoding | {
    'flags'?: string;
    'encoding'?: BufferEncoding;
    'autoClose'?: boolean;
    'start'?: number;
    'end'?: number;
}): fs.ReadStream {
    if (typeof options === 'string') {
        options = {
            'encoding': options
        };
    }
    else {
        options ??= {};
    }
    return fs.createReadStream(path, {
        'flags': options.flags,
        'encoding': options.encoding,
        'autoClose': options.autoClose,
        'start': options.start,
        'end': options.end
    });
}

/**
 * --- 读取文件写入到流，并等待写入完成 ---
 * @param path 文件地址
 * @param destination 要写入的流
 * @param options 写入后是否终止写入流，默认终止
 */
export function pipe(path: string, destination: NodeJS.WritableStream, options?: {
    'end'?: boolean;
}): Promise<boolean> {
    return new Promise((resolve) => {
        createReadStream(path).on('error', function() {
            resolve(false);
        }).on('end', function() {
            resolve(true);
        }).pipe(destination, options);
    });
}

/**
 * --- 创建写入文件的流 ---
 * @param path 文件地址
 * @param options 编码或配置
 */
export function createWriteStream(path: string, options?: BufferEncoding | {
    'flags'?: string;
    'encoding'?: BufferEncoding;
    'mode'?: number;
    'autoClose'?: boolean;
    'start'?: number;
}): fs.WriteStream {
    if (typeof options === 'string') {
        options = {
            'encoding': options
        };
    }
    else {
        options ??= {};
    }
    return fs.createWriteStream(path, {
        'flags': options.flags,
        'encoding': options.encoding,
        'mode': options.mode,
        'autoClose': options.autoClose,
        'start': options.start
    });
}

/**
 * --- 读取文件并输出到 http 的 response ---
 * @param path 文件绝对路径
 * @param req http 请求对象
 * @param res http 响应对象
 * @param stat 文件的 stat（如果有）
 */
export async function readToResponse(path: string,
    req: http2.Http2ServerRequest | http.IncomingMessage,
    res: http2.Http2ServerResponse | http.ServerResponse,
    stat?: fs.Stats | null
): Promise<void> {
    stat ??= await stats(path);
    if (!stat) {
        const content = '<h1>404 Not found</h1><hr>Kebab';
        res.setHeader('content-length', Buffer.byteLength(content));
        lCore.writeHead(res, 404);
        res.end(content);
        return;
    }
    // --- 判断缓存以及 MIME 和编码 ---
    let charset = '';
    const mimeData = mime.getData(path);
    if (['htm', 'html', 'css', 'js', 'xml', 'jpg', 'jpeg', 'svg', 'gif', 'png', 'json'].includes(mimeData.extension)) {
        charset = '; charset=utf-8';
        // --- 这些文件可能需要缓存 ---
        const hash = `W/"${stat.size.toString(16)}-${stat.mtime.getTime().toString(16)}"`;
        const lastModified = stat.mtime.toUTCString();
        res.setHeader('etag', hash);
        res.setHeader('cache-control', 'public, max-age=600');
        // --- 判断返回 304 吗 ---
        const noneMatch = req.headers['if-none-match'];
        const modifiedSince = req.headers['if-modified-since'];
        if ((hash === noneMatch) && (lastModified === modifiedSince)) {
            lCore.writeHead(res, 304);
            res.end();
            return;
        }
        res.setHeader('last-modified', lastModified);
    }
    else {
        res.setHeader('cache-control', 'no-cache, must-revalidate');
    }
    // --- 设置 type ---
    res.setHeader('content-type', mimeData.mime + charset);
    // --- 判断客户端支持的压缩模式 ---
    const encoding = req.headers['accept-encoding'] ?? '';
    if (mimeData.compressible && (stat.size >= 1024)) {
        // --- 压缩 ---
        const compress = await lZlib.compress(encoding, await getContent(path));
        if (compress) {
            res.setHeader('content-encoding', compress.type);
            res.setHeader('content-length', Buffer.byteLength(compress.buffer));
            res.end(compress.buffer);
            return;
        }
    }
    // --- 不压缩 ---
    res.setHeader('content-length', stat.size);
    lCore.writeHead(res, 200);
    await pipe(path, res instanceof http2.Http2ServerResponse ? (res.stream ?? res) : res);
}

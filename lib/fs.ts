/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-3-29 23:03:07
 * Last: 2020-3-11 22:21:51, 2022-12-29 01:18:25, 2023-12-13 20:50:09
 */
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as http from 'http';
import * as http2 from 'http2';
import * as stream from 'stream';
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
 * --- 读取完整文件或一段，区间包含首尾字节 ---
 * @param path 文件路径
 * @param options 编码或选项
 * @returns 文件内容，读取失败返回 null
 */
export async function getContent(path: string, options?: BufferEncoding | {
    'encoding'?: BufferEncoding;
    'start'?: number;
    'end'?: number;
}): Promise<Buffer | string | null> {
    const { encoding, start, end } = typeof options === 'string' ? { 'encoding': options } : options ?? {};
    try {
        if (start === undefined && end === undefined) {
            return await fs.promises.readFile(path, { encoding });
        }
        const data: Buffer[] = [];
        for await (const chunk of createReadStream(path, { start, end }) as AsyncIterable<Buffer>) {
            data.push(chunk);
        }
        const content = Buffer.concat(data);
        return encoding ? content.toString(encoding) : content;
    }
    catch {
        return null;
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
    for (let i = 0; i < 4; ++i) {
        try {
            await fs.promises.unlink(path);
            return true;
        }
        catch {
            if (i < 3) {
                await lCore.sleep(250);
            }
        }
    }
    return false;
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
    return pstats?.isDirectory() ? pstats : false;
}

/**
 * --- 判断是否是文件或文件是否存在，是的话返回 stats ---
 * @param path 判断路径
 */
export async function isFile(path: string): Promise<fs.Stats | false> {
    const pstats = await stats(path);
    return pstats?.isFile() ? pstats : false;
}

/**
 * --- 深度创建目录，如果最末目录存在，则自动创建成功 ---
 * @param path 要创建的路径，如 /a/b/c/
 * @param mode 权限
 */
export async function mkdir(path: string, mode: number = 0o755): Promise<boolean> {
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
 * @param path 目录路径，不递归读取符号链接指向的目录
 * @returns 删除成功或根路径不是目录返回 true，删除失败返回 false
 */
export async function rmdirDeep(path: string): Promise<boolean> {
    // --- 去掉末尾斜线再用 lstat 检查，避免目录链接被跟随 ---
    if (await isDir(path.replace(/\/+$/, '') || path) === false) {
        return true;
    }
    if (!path.endsWith('/')) {
        path += '/';
    }
    const list = await readDir(path);
    for (const item of list) {
        const target = path + item.name;
        const result = item.isDirectory() ? await rmdirDeep(target) : await unlink(target);
        if (!result) {
            return false;
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
        const list = await fs.promises.readdir(path, {
            'encoding': encoding,
            'withFileTypes': true
        });
        // --- 目录优先，同类型按名称排序；readdir 本身不返回 . 和 .. ---
        return list.sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name));
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
            num += r;
        }
        else if (item.isFile()) {
            // --- 先判断本文件是否被排除 ---
            if (lText.match(item.name, ignore)) {
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
    return fs.createReadStream(path, typeof options === 'string' ? { 'encoding': options } : options);
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
    return fs.createWriteStream(path, typeof options === 'string' ? { 'encoding': options } : options);
}

/** --- 文件字节区间，包含首尾字节 --- */
interface IFileRange {
    'start': number;
    'end': number;
    'order': number;
}

/**
 * --- 解析并合并字节区间，限制多段请求的读取开销 ---
 * @param value Range 请求头
 * @param size 文件字节数
 * @returns 区间列表；false 表示全部越界或区间过多；null 表示忽略请求头
 */
function parseFileRanges(value: string, size: number): IFileRange[] | false | null {
    if (!/^bytes=/i.test(value) || size === 0 || !Number.isSafeInteger(size)) {
        return null;
    }
    const values = value.slice(6).split(',');
    // --- 防止客户端利用大量小区间放大文件读取与响应开销 ---
    if (value.length > 8192 || values.length > 16) {
        return false;
    }
    const total = BigInt(size);
    const ranges: IFileRange[] = [];
    let count = 0;
    for (const item of values) {
        const part = item.trim();
        if (part === '') {
            continue;
        }
        const match = /^(\d*)-(\d*)$/.exec(part);
        if (!match || match[1] === '' && match[2] === '') {
            return null;
        }
        ++count;
        // --- 先以 BigInt 解析，避免超大偏移被浮点取整后读错字节 ---
        const start = match[1] !== '' ? BigInt(match[1]) : total - BigInt(match[2]);
        const end = match[1] !== '' && match[2] !== '' ? BigInt(match[2]) : total - 1n;
        if (match[1] !== '' && match[2] !== '' && end < start) {
            return null;
        }
        if (start >= total) {
            continue;
        }
        ranges.push({
            'start': Number(start < 0n ? 0n : start),
            'end': Number(end >= total ? total - 1n : end),
            'order': count
        });
    }
    if (count === 0) {
        return null;
    }
    if (ranges.length === 0) {
        return false;
    }
    ranges.sort((a, b) => a.start - b.start);
    const merged: IFileRange[] = [];
    for (const range of ranges) {
        const previous = merged[merged.length - 1];
        if (previous && range.start <= previous.end + 1) {
            previous.end = Math.max(previous.end, range.end);
            previous.order = Math.min(previous.order, range.order);
        }
        else {
            merged.push(range);
        }
    }
    return merged.sort((a, b) => a.order - b.order);
}

/**
 * --- 逐段读取 multipart 响应，保持背压且在取消时关闭当前文件流 ---
 * @param path 文件路径
 * @param ranges 文件区间
 * @param headers 每段的 MIME 头
 * @param footer 结束边界
 * @returns multipart 数据流
 */
async function* readFileRanges(
    path: string, ranges: IFileRange[], headers: Buffer[], footer: Buffer
): AsyncGenerator<Buffer> {
    for (let i = 0; i < ranges.length; ++i) {
        yield headers[i];
        yield* createReadStream(path, ranges[i]) as AsyncIterable<Buffer>;
        yield Buffer.from('\r\n');
    }
    yield footer;
}

/**
 * --- 读取文件并输出到 http 的 response，支持 GET 字节范围与条件请求 ---
 *
 * Range 支持 start-end、start-、-length 及最多 16 段，请求头上限 8 KiB；相邻和重叠区间合并。
 * 有效区间返回 206，全部越界或区间过多返回 416；无效语法、未知单位和空文件忽略 Range。
 * 部分响应按原始文件字节流式输出，不进行动态压缩。If-Range 日期须匹配 Last-Modified，
 * 且文件不启用动态压缩、修改时间早于当前响应所在秒，否则退回完整响应；
 * 文件元数据生成的 ETag 为弱校验值，不接受其作为 If-Range 的强校验值。
 * HEAD 忽略 Range 且不输出响应体。
 *
 * @param path 文件绝对路径
 * @param req http 请求对象
 * @param res http 响应对象
 * @param stat 文件的 stat（如果有）
 * @returns 输出完成或连接终止后无返回值
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
        res.end(req.method === 'HEAD' ? '' : content);
        return;
    }
    // --- 判断缓存以及 MIME 和编码 ---
    let charset = '';
    const mimeData = mime.getData(path);
    // --- 文本类文件统一附加 charset，避免浏览器按本地默认编码解析导致乱码 ---
    if (mimeData.mime.startsWith('text/') || ['json', 'xml', 'svg', 'js', 'mjs', 'map', 'webmanifest'].includes(mimeData.extension)) {
        charset = '; charset=utf-8';
    }
    const hash = `W/"${stat.size.toString(16)}-${stat.mtime.getTime().toString(16)}"`;
    const lastModified = stat.mtime.toUTCString();
    const modifiedTime = Date.parse(lastModified);
    const canCompress = mimeData.compressible && stat.size >= 1024;
    res.setHeader('etag', hash);
    res.setHeader('last-modified', lastModified);
    res.setHeader('accept-ranges', 'bytes');
    if (canCompress) {
        const vary = res.getHeader('vary');
        const values = (Array.isArray(vary) ? vary.join(',') : String(vary ?? '')).split(',').map((item) => item.trim()).filter(Boolean);
        if (!values.some((item) => item === '*' || item.toLowerCase() === 'accept-encoding')) {
            values.push('Accept-Encoding');
            res.setHeader('vary', values.join(', '));
        }
    }
    // --- 这些文件可能需要缓存 ---
    if (['htm', 'html', 'css', 'js', 'mjs', 'xml', 'jpg', 'jpeg', 'svg', 'gif', 'png', 'json'].includes(mimeData.extension)) {
        /** --- 静态文件默认缓存秒数 --- */
        const cacheTTL = 600;
        res.setHeader('expires', new Date(Date.now() + cacheTTL * 1_000).toUTCString());
        res.setHeader('cache-control', 'public, max-age=' + cacheTTL.toString());
    }
    else {
        res.setHeader('cache-control', 'no-cache, must-revalidate');
    }
    // --- 条件请求优先于 Range；弱 ETag 只能用于缓存验证，不能用于 If-Match ---
    const match = req.headers['if-match'];
    const unmodifiedSince = req.headers['if-unmodified-since'];
    if (match !== undefined ? match.trim() !== '*' : unmodifiedSince !== undefined && modifiedTime > Date.parse(unmodifiedSince)) {
        res.setHeader('content-length', 0);
        lCore.writeHead(res, 412);
        res.end();
        return;
    }
    const noneMatch = req.headers['if-none-match'];
    const modifiedSince = req.headers['if-modified-since'];
    const isRead = req.method === 'GET' || req.method === 'HEAD';
    const unchanged = noneMatch !== undefined ? noneMatch.trim() === '*' || noneMatch.split(',').some((item) => item.trim().replace(/^W\//, '') === hash.slice(2)) :
        isRead && modifiedSince !== undefined && modifiedTime <= Date.parse(modifiedSince);
    if (unchanged) {
        if (!isRead) {
            res.setHeader('content-length', 0);
        }
        lCore.writeHead(res, isRead ? 304 : 412);
        res.end();
        return;
    }
    const contentType = mimeData.mime + charset;
    res.setHeader('content-type', contentType);
    const rangeHeader = req.headers['range'];
    const ifRange = req.headers['if-range'];
    // --- 日期必须精确匹配且至少早一秒；压缩与原始字节共享的日期不能作强校验，避免跨编码续传 ---
    const rangeMatches = ifRange === undefined || typeof ifRange === 'string' && !ifRange.includes('"') &&
        Date.parse(ifRange) === modifiedTime && modifiedTime <= Date.now() - 1_000 && !canCompress;
    const ranges = req.method === 'GET' && rangeHeader !== undefined &&
        rangeMatches ? parseFileRanges(rangeHeader, stat.size) : null;
    if (ranges === false) {
        res.setHeader('content-range', `bytes */${stat.size}`);
        res.setHeader('content-length', 0);
        lCore.writeHead(res, 416);
        res.end();
        return;
    }
    // --- 判断客户端支持的压缩模式 ---
    const encoding = req.headers['accept-encoding'] ?? '';
    if (ranges === null && canCompress && encoding !== '') {
        // --- 压缩 ---
        const compress = await lZlib.compress(encoding, await getContent(path));
        if (compress) {
            res.setHeader('content-encoding', compress.type);
            res.setHeader('content-length', Buffer.byteLength(compress.buffer));
            lCore.writeHead(res, 200);
            res.end(req.method === 'HEAD' ? '' : compress.buffer);
            return;
        }
    }
    let headers: Buffer[] = [];
    let footer = Buffer.alloc(0);
    if (ranges !== null && ranges.length > 1) {
        const boundary = `kebab-${crypto.randomBytes(16).toString('hex')}`;
        headers = ranges.map((range) => Buffer.from(`--${boundary}\r\nContent-Type: ${contentType}\r\nContent-Range: bytes ${range.start}-${range.end}/${stat.size}\r\n\r\n`));
        footer = Buffer.from(`--${boundary}--\r\n`);
        res.setHeader('content-type', `multipart/byteranges; boundary=${boundary}`);
        res.setHeader('content-length', ranges.reduce((length, range, i) => length + headers[i].length + (range.end - range.start + 1) + 2, footer.length));
    }
    else if (ranges !== null) {
        res.setHeader('content-range', `bytes ${ranges[0].start}-${ranges[0].end}/${stat.size}`);
        res.setHeader('content-length', ranges[0].end - ranges[0].start + 1);
    }
    else {
        res.setHeader('content-length', stat.size);
    }
    lCore.writeHead(res, ranges === null ? 200 : 206);
    if (req.method === 'HEAD') {
        res.end();
        return;
    }
    const source = ranges !== null && ranges.length > 1 ?
        stream.Readable.from(readFileRanges(path, ranges, headers, footer)) : createReadStream(path, ranges?.[0]);
    try {
        await stream.promises.pipeline(source, res instanceof http2.Http2ServerResponse ? (res.stream ?? res) : res);
    }
    catch {
        // --- 已提交响应头后不能再发送错误页；管道会关闭文件流及断开的响应 ---
        res.destroy();
    }
}

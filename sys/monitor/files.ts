/** --- master 读取落盘监控数据；只读取有界事件 JSON，Profile 和堆快照仅提供文件元数据 --- */
import * as fs from 'fs/promises';
import * as path from 'path';
import type { Stats } from 'fs';
import * as lText from '#kebab/lib/text.js';
import type { IMonitorEvent, IMonitorEventSummary, IMonitorFile } from '#kebab/lib/core.js';

/** --- 单个事件记录读取上限，避免损坏或异常大的文件占用 master 内存 --- */
const RECORD_LIMIT = 4 * 1024 * 1024;
/** --- 小型 JSON/文本预览上限，Profile 和堆快照不预览 --- */
export const PREVIEW_LIMIT = 1024 * 1024;
const DAY_PATTERN = /^\d{4}\/\d{2}\/\d{2}$/;
const EVENT_NAME_PATTERN = /^\d{6}-pid-\d+(?:-\d+)?(?:-blocked)?$/;
const FILE_NAME_PATTERNS = [
    /^(?:event\.json|blocked-event\.json|(?:report|profile)-[\w.-]+\.json)$/,
    /^(?:cpu|blocked-cpu)-[\w.-]+\.cpuprofile$/,
    /^blocked-stack-[\w.-]+\.txt$/,
    /^heap-[\w.-]+\.heapsnapshot$/,
];

/**
 * --- 仅开放框架生成的监控取证文件名 ---
 * @param name 文件名
 * @returns 是否为诊断文件
 */
function isFileName(name: string): boolean {
    return FILE_NAME_PATTERNS.some(pattern => pattern.test(name));
}

/**
 * --- 解析监控目录内已有路径，阻止目录穿越和符号链接逃逸 ---
 * @param root log/monitor 的绝对路径
 * @param relative 已校验格式的相对路径
 * @returns 真实路径；不存在时返回 null，越界或读取错误时返回 false
 */
async function resolveInside(root: string, relative: string): Promise<string | null | false> {
    try {
        if ((await fs.lstat(root)).isSymbolicLink()) {
            return false;
        }
        const rootReal = await fs.realpath(root);
        const target = await fs.realpath(path.join(rootReal, relative));
        const difference = path.relative(rootReal, target);
        if (difference === '..' || difference.startsWith(`..${path.sep}`) || path.isAbsolute(difference)) {
            return false;
        }
        return target;
    }
    catch (error: unknown) {
        return (error as NodeJS.ErrnoException).code === 'ENOENT' ? null : false;
    }
}

/**
 * --- 校验事件相对路径，不接受绝对路径、反斜杠或多余层级 ---
 * @param relative 事件路径
 * @returns 是否为日期下的事件目录
 */
function isEventPath(relative: unknown): relative is string {
    if (typeof relative !== 'string') {
        return false;
    }
    const parts = relative.split('/');
    return parts.length === 4 && DAY_PATTERN.test(parts.slice(0, 3).join('/')) && EVENT_NAME_PATTERN.test(parts[3]);
}

/**
 * --- 有界读取原始事件；没有记录的旧诊断目录仍可列出文件 ---
 * @param directory 事件真实目录
 * @returns 原始数据及读取状态
 */
async function readRecord(directory: string): Promise<{
    'data': Record<string, unknown> | null;
    'status': IMonitorEvent['recordStatus'];
}> {
    for (const name of ['event.json', 'blocked-event.json']) {
        let handle: fs.FileHandle | null = null;
        try {
            // --- 拒绝事件记录本身的符号链接；读取过程中即使文件增长也不会超过上限 ---
            const stat = await fs.lstat(path.join(directory, name));
            if (!stat.isFile() || stat.isSymbolicLink()) {
                return { 'data': null, 'status': 'unreadable' };
            }
            if (stat.size > RECORD_LIMIT) {
                return { 'data': null, 'status': 'too-large' };
            }
            handle = await fs.open(path.join(directory, name), fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
            const buffer = Buffer.alloc(stat.size + 1);
            const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
            if (bytesRead > RECORD_LIMIT) {
                return { 'data': null, 'status': 'too-large' };
            }
            const data = lText.parseJson<unknown>(buffer.subarray(0, bytesRead).toString('utf8'));
            if (data === null || typeof data !== 'object' || Array.isArray(data)) {
                return { 'data': null, 'status': 'invalid' };
            }
            return { 'data': data as Record<string, unknown>, 'status': 'loaded' };
        }
        catch (error: unknown) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
                return { 'data': null, 'status': 'unreadable' };
            }
        }
        finally {
            await handle?.close();
        }
    }
    return { 'data': null, 'status': 'missing' };
}

/**
 * --- 从目录名和事件记录生成简短摘要，不携带大段采样或调用栈 ---
 * @param relative 事件相对路径
 * @param record 原始事件读取结果
 * @returns 事件摘要
 */
function summarize(relative: string, record: Awaited<ReturnType<typeof readRecord>>): IMonitorEventSummary {
    const [year, month, day, name] = relative.split('/');
    const parts = name.split('-');
    const time = Number(parts[3]) || new Date(`${year}-${month}-${day}T${parts[0].slice(0, 2)}:${parts[0].slice(2, 4)}:${parts[0].slice(4, 6)}`).getTime();
    const data = record.data;
    const source = name.endsWith('-blocked') ? 'watchdog' : 'main';
    let status: string = record.status === 'loaded' ? 'active' : record.status;
    if (typeof data?.endReason === 'string') {
        status = data.endReason;
    }
    else if (typeof data?.status === 'string') {
        status = data.status;
    }
    let eventTime = time;
    if (typeof data?.confirmedAt === 'number') {
        eventTime = data.confirmedAt;
    }
    else if (typeof data?.time === 'number') {
        eventTime = data.time;
    }
    let reasons: string[] = [];
    if (Array.isArray(data?.reasons)) {
        reasons = data.reasons.filter((reason): reason is string => typeof reason === 'string');
    }
    else if (source === 'watchdog') {
        reasons = ['ELOOP_BLOCKED'];
    }
    return {
        'path': relative,
        'pid': typeof data?.pid === 'number' ? data.pid : Number(parts[2]),
        'time': eventTime,
        source, status, reasons,
    };
}

/**
 * --- 获取一天的事件摘要，先分页目录再读取记录 ---
 * @param root log/monitor 的绝对路径
 * @param day YYYY/MM/DD
 * @param offset 跳过目录数量
 * @param limit 返回数量，1-100
 * @returns 列表和总数；目录不存在返回空列表，输入或读取错误返回 false
 */
export async function getEvents(root: string, day: unknown, offset: unknown = 0, limit: unknown = 20): Promise<{
    'list': IMonitorEventSummary[];
    'total': number;
} | false> {
    if (typeof day !== 'string' || !DAY_PATTERN.test(day) || !Number.isSafeInteger(offset) ||
        typeof offset !== 'number' || offset < 0 || !Number.isSafeInteger(limit) || typeof limit !== 'number' || limit < 1 || limit > 100) {
        return false;
    }
    const directory = await resolveInside(root, day);
    if (directory === false) {
        return false;
    }
    if (directory === null) {
        return { 'list': [], 'total': 0 };
    }
    try {
        const entries = await fs.readdir(directory, { 'withFileTypes': true });
        const names = entries.filter(entry => entry.isDirectory() && EVENT_NAME_PATTERN.test(entry.name))
            .map(entry => entry.name).sort().reverse();
        const list: IMonitorEventSummary[] = [];
        for (const name of names.slice(offset, offset + limit)) {
            const relative = `${day}/${name}`;
            const record = await readRecord(path.join(directory, name));
            list.push(summarize(relative, record));
        }
        return { list, 'total': names.length };
    }
    catch {
        return false;
    }
}

/**
 * --- 获取允许读取的诊断文件及其元数据，文件路径限制在日期/事件目录下 ---
 * @param root log/monitor 的绝对路径
 * @param relative files 中返回的文件相对路径
 * @returns 真实路径、文件状态和元数据；不存在返回 null，非法路径或读取错误返回 false
 */
export async function getFile(root: string, relative: unknown): Promise<{
    'path': string;
    'stat': Stats;
    'info': IMonitorFile;
} | null | false> {
    if (typeof relative !== 'string' || !isEventPath(path.posix.dirname(relative)) || !isFileName(path.posix.basename(relative))) {
        return false;
    }
    const file = await resolveInside(root, relative);
    if (file === null || file === false) {
        return file;
    }
    try {
        const stat = await fs.stat(file);
        if (!stat.isFile()) {
            return false;
        }
        let preview: IMonitorFile['preview'] = null;
        if (stat.size <= PREVIEW_LIMIT) {
            if (relative.endsWith('.json')) {
                preview = 'json';
            }
            else if (relative.endsWith('.txt')) {
                preview = 'text';
            }
        }
        return { 'path': file, stat, 'info': {
            'path': relative, 'name': path.basename(relative), 'size': stat.size, 'mtime': stat.mtimeMs, preview,
        } };
    }
    catch (error: unknown) {
        return (error as NodeJS.ErrnoException).code === 'ENOENT' ? null : false;
    }
}

/**
 * --- 获取事件原始数据及文件清单，包含 diagnostics 引用的看门狗取证文件 ---
 * @param root log/monitor 的绝对路径
 * @param relative 事件相对路径
 * @returns 事件详情；不存在返回 null，非法路径或读取错误返回 false
 */
export async function getEvent(root: string, relative: unknown): Promise<IMonitorEvent | null | false> {
    if (!isEventPath(relative)) {
        return false;
    }
    const directory = await resolveInside(root, relative);
    if (directory === null || directory === false) {
        return directory;
    }
    try {
        const record = await readRecord(directory);
        const entries = await fs.readdir(directory, { 'withFileTypes': true });
        const candidates = new Set(entries.filter(entry => entry.isFile() && isFileName(entry.name))
            .map(entry => `${relative}/${entry.name}`));
        if (Array.isArray(record.data?.diagnostics)) {
            // --- 主线程事件会引用另一个阻塞目录；只将监控根目录内的文件加入下载清单 ---
            for (const diagnostic of record.data.diagnostics) {
                if (diagnostic === null || typeof diagnostic !== 'object') {
                    continue;
                }
                const files = (diagnostic as { 'files'?: unknown; }).files;
                if (!Array.isArray(files)) {
                    continue;
                }
                for (const file of files) {
                    if (typeof file === 'string' && path.isAbsolute(file)) {
                        candidates.add(path.relative(root, file).split(path.sep).join('/'));
                    }
                }
            }
        }
        const files: IMonitorFile[] = [];
        for (const candidate of [...candidates].sort()) {
            const file = await getFile(root, candidate);
            if (file !== false && file !== null) {
                files.push(file.info);
            }
        }
        return { 'summary': summarize(relative, record), 'data': record.data, 'recordStatus': record.status, files };
    }
    catch {
        return false;
    }
}

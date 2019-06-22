import * as fs from "fs";
import * as Crypto from "./Crypto";
import * as Sys from "./Sys";

/**
 * --- 读取文件内容 ---
 * @param path 文件路径
 * @param options 编码/选项
 */
export function readFile(path: fs.PathLike | number, options: { encoding?: string | null; flag?: string; } | string = "utf-8"): Promise<Buffer | undefined> {
    return new Promise((resolve, reject) => {
        if (path.toString().slice(-9) === "config.js") {
            resolve(undefined);
            return;
        }
        fs.readFile(path, options, function(err, data) {
            if (err) {
                resolve(undefined);
            } else {
                resolve(<Buffer>data);
            }
        });
    });
}

/**
 * --- 写入文件内容 ---
 * @param path 文件路径
 * @param data 要写入的内容
 * @param options 选项
 */
export function writeFile(path: fs.PathLike | number, data: any, options: fs.WriteFileOptions = {}): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, options, function(err) {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * --- 删除一个文件 ---
 * @param path 要删除的文件路径
 */
export async function unlinkFile(path: fs.PathLike): Promise<boolean> {
    if (path.toString().slice(-9) === "config.js") {
        return false;
    }
    for (let i = 0; i < 4; ++i) {
        let bol = await _unlinkFile(path);
        if (bol) {
            return true;
        }
        await Sys.sleep(250);
    }
    return await _unlinkFile(path);
}
function _unlinkFile(path: fs.PathLike): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.unlink(path, function(err) {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * --- 获取文件夹下文件列表 ---
 * @param path 文件夹路径
 */
export function readDir(path: fs.PathLike): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                resolve([]);
            } else {
                resolve(files);
            }
        });
    });
}

/**
 * --- 根据目录深度获取下面的所有文件列表 ---
 * @param path 目录
 * @param pre 前导
 */
export async function getFileListDeep(path: string, pre: string = ""): Promise<string[]> {
    if (path.slice(-1) !== "/") {
        path += "/";
    }
    return await _getFileListDeep(path, pre);
}
async function _getFileListDeep(path: fs.PathLike, pre: string): Promise<string[]> {
    let list = await readDir(path);
    let over: string[] = [];
    for (let item of list) {
        if (item === "." || item === "..") {
            continue;
        }
        let stat = await getStats(path + item);
        if (!stat) {
            continue;
        }
        if (stat.isDirectory()) {
            over = over.concat(await _getFileListDeep(path + item + "/", pre + item + "/"));
        } else {
            over.push(pre + item);
        }
    }
    return over;
}

/**
 * --- 获取对象是否存在，存在则返回 stats 对象，否则返回 undefined ---
 * @param path 对象路径
 */
export function getStats(path: fs.PathLike): Promise<fs.Stats | undefined> {
    return new Promise((resolve, reject) => {
        fs.lstat(path, (err, stats) => {
            if (err) {
                resolve(undefined);
            } else {
                resolve(stats);
            }
        });
    });
}

/**
 * --- 复制文件 ---
 * @param src 从文件
 * @param dest 到路径
 */
export function copyFile(src: fs.PathLike, dest: fs.PathLike): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (dest.toString().slice(-9) === "config.js") {
            resolve(false);
            return;
        }
        fs.copyFile(src, dest, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * --- 读取文件流 ---
 * @param path 文件地址
 */
export function readStream(path: fs.PathLike, options?: string | {
    flags?: string;
    encoding?: string;
    fd?: number;
    mode?: number;
    autoClose?: boolean;
    start?: number;
    end?: number;
    highWaterMark?: number;
}): fs.ReadStream {
    return fs.createReadStream(path, options);
}

/**
 * --- 读取文件写入到流，并等待写入完成 ---
 * @param path 文件地址
 * @param destination 要写入的流
 * @param options 写入后是否终止写入流，默认终止
 */
export function pipe<T extends NodeJS.WritableStream>(path: fs.PathLike, destination: T, options: {end?: boolean; } = {}): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (path.toString().slice(-9) === "config.js") {
            resolve();
            return;
        }
        fs.createReadStream(path).on("error", function() {
            resolve(false);
        }).on("end", function() {
            resolve(true);
        }).pipe(destination, {end: options.end === undefined ? true : options.end});
    });
}

/**
 * --- 写入文件流 ---
 * @param path 文件地址
 */
export function writeStream(path: fs.PathLike): fs.WriteStream {
    return fs.createWriteStream(path);
}

/**
 * --- 创建单层目录 ---
 * @param path 要创建的路径
 */
export function mkdir(path: fs.PathLike): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * --- 只读取一小段文件一次 ---
 * @param path 路径
 * @param start 开始时间
 */
export function readFileOnce(path: string, options: { encoding?: string; flag?: string; start?: number; end?: number } = {}): Promise<Buffer | undefined> {
    return new Promise(function (resolve, reject) {
        if (path.toString().slice(-9) === "config.js") {
            resolve(undefined);
            return;
        }
        let stream = fs.createReadStream(path, options);
        let data: Buffer = Buffer.from("");
        stream.on("data", function (chunk: Buffer) {
            data = Buffer.concat([data, chunk], data.length + chunk.length);
        }).on("close", function() {
            resolve(data);
        }).on("error", function() {
            resolve(undefined);
        });
    });
}

/**
 * --- 判断是否是绝对路径，是返回 true，相对路径返回 false ---
 * @param path 要判断的路径字符串
 */
export function isRealPath(path: string): boolean {
    path = path.replace(/\\/g, "/");
    if (path.slice(0, 1) === "/") {
        return true;
    }
    return path.split("/")[0].match(/[a-z]+:/i) ? true : false;
}

/**
 * --- 获取文件名 ---
 * @param path 文件路径
 */
export function getFilename(path: string): string {
    path = path.replace(/\\/g, "/");
    let lio = path.lastIndexOf("/");
    if (lio === -1) {
        return path;
    }
    return path.slice(lio + 1);
}

/**
 * --- 深度创建多层目录 ---
 * --- 如果最末目录存在，则自动创建成功 ---
 * @param path 要创建的路径
 */
export async function mkdirDeep(path: string): Promise<boolean> {
    path = path.replace("\\", "/");
    if (path.slice(-1) === "/") {
        path = path.slice(0, -1);
    }
    // --- 创建当前目录 ---
    return await _mkdirDeepSub(path);
}
async function _mkdirDeepSub(path: string): Promise<boolean> {
    if (path === "") {
        return true;
    }
    let stats = await getStats(path);
    if (stats !== undefined && stats.isDirectory()) {
        // --- 当前有目录，不用创建直接成功 ---
        return true;
    }
    // --- 需要创建当前目录前，先判断上级目录 ---
    let upPath = path.slice(0, path.lastIndexOf("/"));
    if (!await _mkdirDeepSub(upPath)) {
        return false;
    }
    // --- 创建当前目录 ---
    return await mkdir(path);
}

/** 同步选项 */
export interface SyncOptions {
    ignore?: string[];
}
type _SyncOptions = {
    ignore: string[];
};

/**
 * --- 从 from 路径同步到 to 路径，to 路径多出的文件不会被移除 ---
 * @param from 从
 * @param to 到
 * @param opt 选项
 */
export async function sync(from: string, to: string, opt: SyncOptions = {}): Promise<void> {
    opt.ignore = opt.ignore || ["*.ts", "*.scss", "tsconfig.json", "tslint.json", "types", ".*"];

    // --- 如果源目录不存在，则直接跳出 ---
    let fstats = await getStats(from);
    if (!fstats || !fstats.isDirectory()) {
        return;
    }

    // --- 创建去目录 ---
    let stats = await getStats(to);
    if (!stats || !stats.isDirectory()) {
        await mkdirDeep(to);
    }

    // --- 源/去目录 cut 掉最后的 / ---
    from = from.replace("\\", "/");
    to = to.replace("\\", "/");
    if (from.slice(-1) === "/") {
        from = from.slice(0, -1);
    }
    if (to.slice(-1) === "/") {
        to = to.slice(0, -1);
    }
    await _syncSub(from, to, "/", <_SyncOptions>opt);
}
async function _syncSub(from: string, to: string, path: string, opt: _SyncOptions) {
    // --- 读源路径下面的文件/文件夹 ---
    let list = await readDir(from + path);
    for (let item of list) {
        if (item === "." || item === "..") {
            continue;
        }
        // --- 判断当前是否要排除 ---
        if (_isIgnore(item, opt.ignore)) {
            continue;
        }

        // --- 当前 item 有异常 ---
        let stats = await getStats(from + path + item);
        if (!stats) {
            continue;
        }
        // --- 获取去对应的 item ---
        let tstats = await getStats(to + path + item);
        if (stats.isDirectory()) {
            // --- 源 item 是目录 ---
            if (!tstats || !tstats.isDirectory()) {
                // --- 去 item 不存在，或去 itme 存在了，但不是个目录 ---
                await mkdir(to + path + item);
            }
            // --- 同步去 ---
            await _syncSub(from, to, path + item + "/", opt);
        } else {
            let fmd5 = Crypto.md5File(from + path + item);
            let tmd5 = tstats ? Crypto.md5File(to + path + item) : "";
            if (fmd5 === tmd5) {
                continue;
            }
            await copyFile(from + path + item, to + path + item);
        }
    }
}
/**
 * --- 此名字是否需要被忽略 ---
 * @param name 名字
 * @param ignoreList 忽略数组
 */
function _isIgnore(name: string, ignoreList: string[]): boolean {
    for (let ignore of ignoreList) {
        let regtx = "^" + ignore.replace(/\./g, "\\.").replace(/\*/g, ".+?") + "$";
        let reg = new RegExp(regtx);
        if (reg.test(name)) {
            // --- 要排除的 ---
            return true;
        }
    }
    return false;
}
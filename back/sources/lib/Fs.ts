import * as fs from "fs";
import * as Crypto from "./Crypto";
import * as Sys from "./Sys";

/**
 * --- 读取文件内容 ---
 * @param path 文件路径
 * @param options 编码/选项
 */
export function readFile(path: fs.PathLike | number, options: { encoding: string; flag?: string; } | string = "utf-8"): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        if (path.toString().slice(-9) === "config.js") {
            resolve(undefined);
            return;
        }
        fs.readFile(path, options, function(err, data) {
            if (err) {
                resolve(undefined);
            } else {
                resolve(data);
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
export async function getFileListDeep(path: fs.PathLike, pre: string = ""): Promise<string[]> {
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
export function readStream(path: fs.PathLike): fs.ReadStream {
    return fs.createReadStream(path);
}

/**
 * --- 读取文件写入到流，并等待写入完成 ---
 * @param path 文件地址
 * @param destination 要写入的流
 */
export function pipe<T extends NodeJS.WritableStream>(path: fs.PathLike, destination: T): Promise<void> {
    return new Promise((resolve, reject) => {
        if (path.toString().slice(-9) === "config.js") {
            resolve();
            return;
        }
        let rs = fs.createReadStream(path);
        rs.on("end", function() {
            resolve();
        });
        rs.pipe(destination, {end: false});
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
export function readFileOnce(path: string, options: { encoding?: string; flag?: string; start?: number; end?: number } = {}): Promise<string> {
    return new Promise(function (resolve, reject) {
        if (path.toString().slice(-9) === "config.js") {
            resolve("");
            return;
        }
        try {
            let stream = fs.createReadStream(path, options);
            let data: string[] = [];
            stream.on("data", function (chunk: Buffer) {
                data.push(chunk.toString());
            });
            stream.on("close", function() {
                resolve(data.join(""));
            });
        } catch {
            resolve("");
        }
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
interface SyncOptions {
    ignoreExt?: string[];
}

/**
 * --- 从 from 路径同步到 to 路径，to 路径多出的文件不会被移除 ---
 * @param from 从
 * @param to 到
 * @param opt 选项
 */
export async function sync(from: string, to: string, opt: SyncOptions = {}): Promise<void> {
    opt.ignoreExt = opt.ignoreExt || ["ts", "scss"];

    let stats = await getStats(to);
    if (!stats || !stats.isDirectory()) {
        await mkdirDeep(to);
    }

    from = from.replace("\\", "/");
    to = to.replace("\\", "/");
    if (from.slice(0, -1) === "/") {
        from = from.slice(0, -1);
    }
    if (to.slice(0, -1) === "/") {
        to = to.slice(0, -1);
    }

    await _syncSub(from, to, "/", opt);
}
async function _syncSub(from: string, to: string, path: string, opt: SyncOptions) {
    let list = await readDir(from + path);
    for (let item of list) {
        if (item === "." || item === "..") {
            continue;
        }
        let stats = await getStats(from + path + item);
        if (!stats) {
            continue;
        }
        let tstats = await getStats(to + path + item);
        if (stats.isDirectory()) {
            if (!tstats || !tstats.isDirectory()) {
                await mkdir(to + path + item);
            }
            await _syncSub(from, to, path + item + "/", opt);
        } else {
            let lio = item.lastIndexOf(".");
            if (lio !== -1) {
                let ext = item.slice(lio + 1);
                if ((<string[]>opt.ignoreExt).indexOf(ext) !== -1) {
                    continue;
                }
            }
            let fmd5 = Crypto.md5(await readFile(from + path + item) || "");
            let tmd5 = tstats ? Crypto.md5(await readFile(to + path + item) || "") : "";
            if (fmd5 === tmd5) {
                continue;
            }
            await copyFile(from + path + item, to + path + item);
        }
    }
}
import * as zlib from "zlib";

export interface Compress {
    readonly type: string;
    readonly obj: zlib.Deflate | zlib.Gzip;
}

export interface CompressBuf {
    readonly type: string;
    readonly buf: Buffer | undefined;
}

/**
 * --- 创建 Gzip 对象 ---
 * @param options 选项
 */
export function createGzip(options: zlib.ZlibOptions = {}): zlib.Gzip {
    if (options.level === undefined) {
        options.level = 7;
    }
    return zlib.createGzip(options);
}

/**
 * --- 创建 Deflate 对象 ---
 * @param options 选项
 */
export function createDeflate(options: zlib.ZlibOptions = {}): zlib.Deflate {
    if (options.level === undefined) {
        options.level = 7;
    }
    return zlib.createDeflate(options);
}

/**
 * --- 根据字符串创建压缩类型 ---
 * @param types 用,间隔的字符串，如 gzip,deflate
 * @param options 选项
 */
export function create(types: string, options: zlib.ZlibOptions = {}): Compress | undefined {
    if (options.level === undefined) {
        options.level = 7;
    }
    if (/gzip/.test(types)) {
        return {
            type: "gzip",
            obj: zlib.createGzip(options)
        };
    } else if (/deflate/.test(types)) {
        return {
            type: "deflate",
            obj: zlib.createDeflate(options)
        };
    } else {
        return undefined;
    }
}

/**
 * Gzip 压缩一段
 * @param buf 段
 * @param options 选项
 */
export function gzip(buf: zlib.InputType, options: zlib.ZlibOptions = {}): Promise<Buffer | undefined> {
    if (options.level === undefined) {
        options.level = 7;
    }
    return new Promise((resolve, reject) => {
        zlib.gzip(buf, options, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(undefined);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Deflate 压缩一段
 * @param buf 段
 * @param options 选项
 */
export function deflate(buf: zlib.InputType, options: zlib.ZlibOptions = {}): Promise<Buffer | undefined> {
    if (options.level === undefined) {
        options.level = 7;
    }
    return new Promise((resolve, reject) => {
        zlib.deflate(buf, options, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(undefined);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * --- 根据 types 判断用什么加密的段 ---
 * @param types 用,间隔的字符串，如 gzip,deflate
 * @param buf 段
 * @param options 选项
 */
export async function compress(types: string, buf: zlib.InputType, options?: zlib.ZlibOptions): Promise<CompressBuf> {
    if (/gzip/.test(types)) {
        return {
            type: "gzip",
            buf: await gzip(buf, options)
        };
    } else if (/deflate/.test(types)) {
        return {
            type: "deflate",
            buf: await deflate(buf, options)
        };
    } else {
        return {
            type: "",
            buf: undefined
        };
    }
}
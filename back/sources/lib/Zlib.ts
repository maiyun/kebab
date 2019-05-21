import * as zlib from "zlib";

/** 某个压缩对象 */
export interface Compress {
    readonly type: string;
    readonly obj: zlib.Deflate | zlib.Gzip | zlib.BrotliCompress | zlib.Inflate | zlib.Gunzip | zlib.BrotliDecompress;
}

/** 某个压缩后的变量 */
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
 * --- 创建 Gzip 解压对象 ---
 */
export function createGunzip(): zlib.Gunzip {
    return zlib.createGunzip();
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
 * --- 创建 Deflate 解压对象 ---
 */
export function createInflate(): zlib.Inflate {
    return zlib.createInflate();
}

/**
 * --- 创建 Brotli 压缩对象 ---
 * @param options 选项
 */
export function createBrotliCompress(options: zlib.ZlibOptions = {}) {
    if (options.level === undefined) {
        options.level = 7;
    }
    return zlib.createBrotliCompress(options);
}

/**
 * --- 创建 Brotli 解压对象 ---
 */
export function createBrotliDecompress(): zlib.BrotliDecompress {
    return zlib.createBrotliDecompress();
}

/**
 * --- 根据字符串创建压缩类型 ---
 * @param types 用 , 间隔的字符串，如 gzip,deflate
 * @param options 选项
 */
export function createCompress(types: string, options: zlib.ZlibOptions = {}): Compress | undefined {
    if (options.level === undefined) {
        options.level = 7;
    }
    if (/gzip/i.test(types)) {
        return {
            type: "gzip",
            obj: zlib.createGzip(options)
        };
    } else if (/deflate/i.test(types)) {
        return {
            type: "deflate",
            obj: zlib.createDeflate(options)
        };
    } else if (/br/i.test(types)) {
        return {
            type: "br",
            obj: zlib.createBrotliCompress(options)
        };
    } else {
        return undefined;
    }
}

/**
 * --- 根据字符串创建解压类型 ---
 * @param types 用 , 间隔的字符串，如 gzip,deflate
 * @param options 选项
 */
export function createDecompress(types: string): Compress | undefined {
    if (/gzip/i.test(types)) {
        return {
            type: "gzip",
            obj: zlib.createGunzip()
        };
    } else if (/deflate/i.test(types)) {
        return {
            type: "deflate",
            obj: zlib.createInflate()
        };
    } else if (/br/i.test(types)) {
        return {
            type: "br",
            obj: zlib.createBrotliDecompress()
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
 * Gzip 解压一段
 * @param buf 段
 */
export function gunzip(buf: zlib.InputType): Promise<Buffer | undefined> {
    return new Promise((resolve, reject) => {
        zlib.gunzip(buf, function(error: Error | null, result: Buffer) {
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
 * Deflate 解压一段
 * @param buf 段
 */
export function inflate(buf: zlib.InputType): Promise<Buffer | undefined> {
    return new Promise((resolve, reject) => {
        zlib.inflate(buf, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(undefined);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Brotli 压缩一段
 * @param buf 段
 * @param options 选项
 */
export function brotliCompress(buf: zlib.InputType, options: zlib.ZlibOptions = {}): Promise<Buffer | undefined> {
    if (options.level === undefined) {
        options.level = 7;
    }
    return new Promise((resolve, reject) => {
        zlib.brotliCompress(buf, options, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(undefined);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Brotli 解压一段
 * @param buf 段
 */
export function brotliDecompress(buf: zlib.InputType): Promise<Buffer | undefined> {
    return new Promise((resolve, reject) => {
        zlib.brotliDecompress(buf, function(error: Error | null, result: Buffer) {
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
    if (/gzip/i.test(types)) {
        return {
            type: "gzip",
            buf: await gzip(buf, options)
        };
    } else if (/deflate/i.test(types)) {
        return {
            type: "deflate",
            buf: await deflate(buf, options)
        };
    } else if (/br/i.test(types)) {
        return {
            type: "br",
            buf: await brotliCompress(buf, options)
        };
    } else {
        return {
            type: "",
            buf: undefined
        };
    }
}

/**
 * --- 根据 types 判断用什么解密的段 ---
 * @param types 用,间隔的字符串，如 gzip,deflate
 * @param buf 段
 */
export async function decompress(types: string, buf: zlib.InputType): Promise<CompressBuf> {
    if (/gzip/i.test(types)) {
        return {
            type: "gzip",
            buf: await gunzip(buf)
        };
    } else if (/deflate/i.test(types)) {
        return {
            type: "deflate",
            buf: await inflate(buf)
        };
    } else if (/br/i.test(types)) {
        return {
            type: "br",
            buf: await brotliDecompress(buf)
        };
    } else {
        return {
            type: "",
            buf: undefined
        };
    }
}
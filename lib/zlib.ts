/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-4-9 16:00:55
 * Last: 2020-03-20 14:45:47, 2022-09-13 13:43:32
 */
import * as zlib from 'zlib';

/** 某个压缩对象 */
export interface ICompress {
    readonly type: string;
    readonly compress: zlib.Deflate |
    zlib.Gzip | zlib.BrotliCompress | zlib.Inflate | zlib.Gunzip | zlib.BrotliDecompress;
}

/** 某个压缩后的变量 */
export interface ICompressBuffer {
    readonly type: string;
    readonly buffer: Buffer;
}

/**
 * --- 创建 Gzip 对象 ---
 * @param options 选项
 */
export function createGzip(options: zlib.ZlibOptions = {}): zlib.Gzip {
    if (!options.level) {
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
    if (!options.level) {
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
export function createBrotliCompress(options: zlib.ZlibOptions = {}): zlib.BrotliCompress {
    if (!options.level) {
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
export function createCompress(types: string, options: zlib.ZlibOptions = {}): ICompress | null {
    if (!options.level) {
        options.level = 7;
    }
    const type = getTypeByTypes(types);
    if (!type) {
        return null;
    }
    switch (type) {
        case 'gzip': {
            return {
                'type': 'gzip',
                'compress': zlib.createGzip(options)
            };
        }
        case 'deflate': {
            return {
                'type': 'deflate',
                'compress': zlib.createDeflate(options)
            };
        }
        case 'br': {
            return {
                'type': 'br',
                'compress': zlib.createBrotliCompress(options)
            };
        }
    }
    return null;
}

/**
 * --- 根据字符串创建解压类型 ---
 * @param types 用 , 间隔的字符串，如 gzip,deflate
 * @param options 选项
 */
export function createDecompress(types: string): ICompress | null {
    const type = getTypeByTypes(types);
    if (!type) {
        return null;
    }
    switch (type) {
        case 'gzip': {
            return {
                'type': 'gzip',
                'compress': zlib.createGunzip()
            };
        }
        case 'deflate': {
            return {
                'type': 'deflate',
                'compress': zlib.createInflate()
            };
        }
        case 'br': {
            return {
                'type': 'br',
                'compress': zlib.createBrotliDecompress()
            };
        }
    }
    return null;
}

/**
 * Gzip 压缩一段
 * @param buffer 段
 * @param options 选项
 */
export function gzip(buffer: zlib.InputType, options: zlib.ZlibOptions = {}): Promise<Buffer | null> {
    if (!options.level) {
        options.level = 7;
    }
    return new Promise(function(resolve) {
        zlib.gzip(buffer, options, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(null);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * Gzip 解压一段
 * @param buffer 段
 */
export function gunzip(buffer: zlib.InputType): Promise<Buffer | null> {
    return new Promise(function(resolve) {
        zlib.gunzip(buffer, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(null);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * Deflate 压缩一段
 * @param buffer 段
 * @param options 选项
 */
export function deflate(buffer: zlib.InputType, options: zlib.ZlibOptions = {}): Promise<Buffer | null> {
    if (!options.level) {
        options.level = 7;
    }
    return new Promise(function(resolve) {
        zlib.deflate(buffer, options, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(null);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * Deflate 解压一段
 * @param buffer 段
 */
export function inflate(buffer: zlib.InputType): Promise<Buffer | null> {
    return new Promise(function(resolve) {
        zlib.inflate(buffer, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(null);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * Brotli 压缩一段
 * @param buffer 段
 * @param options 选项
 */
export function brotliCompress(buffer: zlib.InputType, options: zlib.ZlibOptions = {}): Promise<Buffer | null> {
    if (!options.level) {
        options.level = 7;
    }
    return new Promise(function(resolve) {
        zlib.brotliCompress(buffer, options, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(null);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * Brotli 解压一段
 * @param buffer 段
 */
export function brotliDecompress(buffer: zlib.InputType): Promise<Buffer | null> {
    return new Promise(function(resolve) {
        zlib.brotliDecompress(buffer, function(error: Error | null, result: Buffer) {
            if (error) {
                resolve(null);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * --- 根据 types 判断用什么加密的段 ---
 * @param types 用,间隔的字符串，如 gzip,deflate
 * @param buffer 段
 * @param options 选项
 */
export async function compress(
    types: string,
    buffer: zlib.InputType | null,
    options?: zlib.ZlibOptions
): Promise<ICompressBuffer | null> {
    if (!buffer) {
        return null;
    }
    const type = getTypeByTypes(types);
    if (!type) {
        return null;
    }
    let outBuffer: Buffer | null = null;
    switch (type) {
        case 'gzip': {
            outBuffer = await gzip(buffer, options);
            break;
        }
        case 'deflate': {
            outBuffer = await deflate(buffer, options);
            break;
        }
        case 'br': {
            outBuffer = await brotliCompress(buffer, options);
            break;
        }
    }
    if (!outBuffer) {
        return null;
    }
    return {
        'type': type,
        'buffer': outBuffer
    };
}

/**
 * --- 根据 types 判断用什么解密的段 ---
 * @param types 用,间隔的字符串，如 gzip,deflate
 * @param buffer 段
 */
export async function decompress(types: string, buffer: zlib.InputType | null): Promise<ICompressBuffer | null> {
    if (!buffer) {
        return null;
    }
    const type = getTypeByTypes(types);
    if (!type) {
        return null;
    }
    let outBuffer: Buffer | null = null;
    switch (type) {
        case 'gzip': {
            outBuffer = await gunzip(buffer);
            break;
        }
        case 'deflate': {
            outBuffer = await inflate(buffer);
            break;
        }
        case 'br': {
            outBuffer = await brotliDecompress(buffer);
            break;
        }
    }
    if (!outBuffer) {
        return null;
    }
    return {
        'type': type,
        'buffer': outBuffer
    };
}

/**
 * --- 根据 types 字符串获取优先 type
 * @param types types 字符串
 */
function getTypeByTypes(types: string): string| null {
    const typesArray = types.split(',');
    for (let type of typesArray) {
        type = type.trim().toLowerCase();
        if (['gzip', 'deflate', 'br'].includes(type)) {
            return type;
        }
    }
    return null;
}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-4-2 14:01:06
 * Last: 2020-3-12 14:05:24, 2022-09-12 11:52:35
 */
import * as crypto from 'crypto';
// --- 库和定义 ---
import * as fs from '~/lib/fs';

// --- AES 加/解密 ---

export const AES_256_ECB = 'AES-256-ECB';      // 如果未设置 iv，则默认这个
export const AES_256_CBC = 'AES-256-CBC';
export const AES_256_CFB = 'AES-256-CFB';      // 一般用这个，设置 $iv，自动就切换成了这个

export function aesEncrypt(original: string | Buffer, key: string, iv: string, method: string, output: 'buffer'): Buffer | false;
export function aesEncrypt(original: string | Buffer, key: string, iv?: string, method?: string, output?: 'base64'): string | false;
/**
 * --- AES 加密 ---
 * @param original 原始字符串
 * @param key 密钥 32 个英文字母和数字
 * @param iv 向量 16 个英文字母和数字
 * @param method 加密方法
 */
export function aesEncrypt(original: string | Buffer, key: string, iv: string = '', method: string = AES_256_ECB, output: 'base64' | 'buffer' = 'base64'): string | Buffer | false {
    try {
        if (iv !== '') {
            method = method === AES_256_ECB ? AES_256_CFB : method;
        }
        if (key.length < 32) {
            key = hashHmac('md5', key, 'MaiyunSalt');
        }
        const cip = crypto.createCipheriv(method, key, iv);
        let r: string | Buffer;
        if (output !== 'buffer') {
            if (typeof original === 'string') {
                r = cip.update(original, 'utf8', 'base64');
            }
            else {
                r = cip.update(original, undefined, 'base64');
            }
            r += cip.final('base64');
        }
        else {
            if (typeof original === 'string') {
                r = cip.update(original, 'utf8');
            }
            else {
                r = cip.update(original);
            }
            r = Buffer.concat([r, cip.final()]);
        }
        return r;
    }
    catch {
        return false;
    }
}
export function aesDecrypt(encrypt: string | Buffer, key: string, iv: string, method: string, output: 'buffer'): Buffer | false;
export function aesDecrypt(encrypt: string | Buffer, key: string, iv?: string, method?: string, output?: 'binary'): string | false;
/**
 * --- AES 解密 ---
 * @param encrypt 需解密的字符串
 * @param key 密钥 32 个英文字母和数字
 * @param iv 向量 16 个英文字母和数字
 * @param method 加密方法
 */
export function aesDecrypt(encrypt: string | Buffer, key: string, iv: string = '', method: string = AES_256_ECB, output: 'binary' | 'buffer' = 'binary'): string | Buffer | false {
    try {
        if (iv !== '') {
            method = method === AES_256_ECB ? AES_256_CFB : method;
        }
        if (key.length < 32) {
            key = hashHmac('md5', key, 'MaiyunSalt');
        }
        const cip = crypto.createDecipheriv(method, key, iv);
        let r: string | Buffer;
        if (output !== 'buffer') {
            if (typeof encrypt === 'string') {
                r = cip.update(encrypt, 'base64', 'binary');
            }
            else {
                r = cip.update(encrypt, undefined, 'binary');
            }
            r += cip.final('binary');
        }
        else {
            if (typeof encrypt === 'string') {
                r = cip.update(encrypt, 'base64');
            }
            else {
                r = cip.update(encrypt);
            }
            r = Buffer.concat([r, cip.final()]);
        }
        return r;
    }
    catch {
        return false;
    }
}

// --- 以下是 Mutton: false, Kebab: true ---

export function hashHmac(algorithm: string, data: Buffer | string, key?: string, format?: 'hex' | 'base64'): string;
export function hashHmac(algorithm: string, data: Buffer | string, key: string | undefined, format: 'buffer'): Buffer;
/**
 * --- hash 或 hmac 加密 ---
 * @param algorithm 加密方式
 * @param data 源数据
 * @param key 设置则采用 hmac 加密
 */
export function hashHmac(algorithm: string, data: Buffer | string, key?: string, format: 'hex' | 'base64' | 'buffer' = 'hex'): string | Buffer {
    let cry: crypto.Hash | crypto.Hmac;
    if (key) {
        cry = crypto.createHmac(algorithm, key);
    }
    else {
        cry = crypto.createHash(algorithm);
    }
    cry.update(data);
    if (format === 'buffer') {
        return cry.digest();
    }
    else {
        return cry.digest(format);
    }
}

export function hashHmacFile(algorithm: string, path: string, key?: string, encoding?: 'hex' | 'base64' | 'base64url'): Promise<string | false>;
export function hashHmacFile(algorithm: string, path: string, key: string, encoding: 'buffer'): Promise<Buffer | false>;
/**
 * --- hash 或 hmac 加密文件 ---
 * @param algorithm 加密方式
 * @param path 文件路径
 * @param key 设置则采用 hmac 加密
 */
export function hashHmacFile(algorithm: string, path: string, key?: string, encoding: 'hex' | 'base64' | 'base64url' | 'buffer' = 'hex'): Promise<string | Buffer | false> {
    return new Promise(function(resolve) {
        let cry: crypto.Hmac | crypto.Hash;
        if (key) {
            cry = crypto.createHmac(algorithm, key);
        }
        else {
            cry = crypto.createHash(algorithm);
        }
        const rs = fs.createReadStream(path);
        rs.on('data', function(chunk: Buffer) {
            cry.update(chunk);
        }).on('end', function() {
            if (encoding === 'buffer') {
                resolve(cry.digest());
            }
            else {
                resolve(cry.digest(encoding));
            }
        }).on('error', function() {
            resolve(false);
        });
    });
}

/**
 * --- base64 编码 ---
 * @param data 字符串或 Buffer
 */
export function base64Encode(data: string | Buffer): string {
    if (typeof data === 'string') {
        return Buffer.from(data, 'utf8').toString('base64');
    }
    else {
        return Buffer.from(data).toString('base64');
    }
}

/**
 * --- base64 解码 ---
 * @param data base64 编码的字符串
 * @param encoding 指定解出 Buffer 还是 string ---
 */
export function base64Decode(data: string, encoding: 'buffer'): Buffer;
export function base64Decode(data: string, encoding?: 'utf8'): string;
export function base64Decode(data: string, encoding: 'utf8' | 'buffer' = 'utf8'): Buffer | string {
    const buffer = Buffer.from(data, 'base64');
    if (encoding === 'buffer') {
        return buffer;
    }
    return buffer.toString('utf8');
}

/**
 * --- 生成 uuid ---
 * @param options 选项
 */
export function uuid(options?: crypto.RandomUUIDOptions): string {
    return crypto.randomUUID(options);
}

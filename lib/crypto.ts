/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-4-2 14:01:06
 * Last: 2020-3-12 14:05:24, 2022-09-12 11:52:35, 2024-9-8 17:09:39, 2024-11-11 00:21:58
 */
import * as crypto from 'crypto';
// --- 库和定义 ---
import * as fs from '~/lib/fs';

// --- 非对称加密 ---

/**
 * --- 创建非对称秘钥 ---
 * @param type 如 rsa/ec
 * @param options 参数
 */
export function generateKeyPair(type: string, options: {
    'modulusLength'?: number;
    'namedCurve'?: string;
    'publicKeyEncoding'?: {
        'type'?: 'pkcs1' | 'spki';
        'format'?: 'pem' | 'der';
    };
    'privateKeyEncoding'?: {
        'type'?: 'pkcs1' | 'pkcs8' | 'sec1';
        'format'?: 'pem' | 'der';
    };
} = {}): Promise<{
    'public': string | Buffer;
    'private': string | Buffer;
}> {
    return new Promise((resolve) => {
        if (options.modulusLength === undefined) {
            options.modulusLength = 2048;
        }
        if (options.namedCurve !== undefined) {
            options.namedCurve = options.namedCurve.toUpperCase();
        }
        if (options.publicKeyEncoding === undefined) {
            options.publicKeyEncoding = {
                'format': 'pem',
                'type': 'spki'
            };
        }
        if (options.publicKeyEncoding.type === undefined) {
            options.publicKeyEncoding.type = 'spki';
        }
        if (options.publicKeyEncoding.format === undefined) {
            options.publicKeyEncoding.format = 'pem';
        }
        if (options.privateKeyEncoding === undefined) {
            options.privateKeyEncoding = {
                'format': 'pem',
                'type': 'pkcs8'
            };
        }
        if (options.privateKeyEncoding.type === undefined) {
            options.privateKeyEncoding.type = 'pkcs8';
        }
        if (options.privateKeyEncoding.format === undefined) {
            options.privateKeyEncoding.format = 'pem';
        }
        crypto.generateKeyPair(type as any, options as any, (
            err: Error | null, publicKey: string | Buffer, privateKey: string | Buffer
        ) => {
            resolve({
                'private': privateKey,
                'public': publicKey
            });
        });
    });
}

export function sign(
    data: crypto.BinaryLike, privateKey: crypto.KeyLike | crypto.SignKeyObjectInput | crypto.SignPrivateKeyInput | crypto.SignJsonWebKeyInput, format: 'hex' | 'base64' | 'binary', algorithm?: string
): string;
export function sign(
    data: crypto.BinaryLike, privateKey: crypto.KeyLike | crypto.SignKeyObjectInput | crypto.SignPrivateKeyInput | crypto.SignJsonWebKeyInput, format?: 'buffer', algorithm?: string
): Buffer;
/**
 * --- 非对称加签 ---
 * @param data 数据
 * @param privateKey 私钥
 * @param format 输出格式
 * @param algorithm 哈希方式
 */
export function sign(
    data: crypto.BinaryLike, privateKey: crypto.KeyLike | crypto.SignKeyObjectInput | crypto.SignPrivateKeyInput | crypto.SignJsonWebKeyInput,  format: 'hex' | 'base64' | 'buffer' | 'binary' = 'buffer', algorithm: string = 'sha256'
): string | Buffer {
    const sign = crypto.createSign(algorithm);
    sign.update(data);
    return format === 'buffer' ? sign.sign(privateKey) : sign.sign(privateKey, format);
}

/**
 * --- 非对称验签 ---
 * @param data 数据
 * @param object 证书
 * @param signature 签名
 * @param algorithm 哈希方式
 */
export function verify(
    data: crypto.BinaryLike, object: crypto.KeyLike | crypto.VerifyKeyObjectInput | crypto.VerifyPublicKeyInput | crypto.VerifyJsonWebKeyInput, signature: NodeJS.ArrayBufferView, algorithm: string = 'sha256'
): boolean {
    const verify = crypto.createVerify(algorithm);
    verify.update(data);
    return verify.verify(object, signature);
}

/**
 * --- 非对称公钥加密 ---
 * @param key 公钥
 * @param buffer 数据
 */
export function publicEncrypt(
    key: crypto.RsaPublicKey | crypto.RsaPrivateKey | crypto.KeyLike, buffer: NodeJS.ArrayBufferView
): Buffer {
    return crypto.publicEncrypt(key, buffer);
}

/**
 * --- 非对称私钥加密 ---
 * @param key 私钥
 * @param buffer 数据
 */
export function privateEncrypt(key: crypto.RsaPrivateKey | crypto.KeyLike, buffer: NodeJS.ArrayBufferView): Buffer {
    return crypto.privateEncrypt(key, buffer);
}

/**
 * --- 非对称公钥解密 ---
 * @param key 公钥
 * @param buffer 数据
 */
export function publicDecrypt(
    key: crypto.RsaPublicKey | crypto.RsaPrivateKey | crypto.KeyLike, buffer: NodeJS.ArrayBufferView
): Buffer {
    return crypto.publicDecrypt(key, buffer);
}

/**
 * --- 非对称私钥解密 ---
 * @param key 私钥
 * @param buffer 数据
 */
export function privateDecrypt(key: crypto.RsaPrivateKey | crypto.KeyLike, buffer: NodeJS.ArrayBufferView): Buffer {
    return crypto.privateDecrypt(key, buffer);
}

// --- Cipher (AES/SM4...) 加/解密 ---

export const AES_256_ECB = 'AES-256-ECB';      // --- 如果未设置 iv，则默认这个 ---
export const AES_256_CBC = 'AES-256-CBC';
export const AES_256_CFB = 'AES-256-CFB';      // --- 一般用这个，设置 iv，自动就切换成了这个 ---

export const SM4_ECB = 'SM4-ECB';       // --- SM4 如果未设置 iv，则默认这个 ---
export const SM4_CBC = 'SM4-CBC';
export const SM4_CFB = 'SM4-CFB';       // --- SM4 一般用这个，设置 iv，自动就切换成了这个 ---

/**
 * --- cipher 加密 ---
 * @param original 原始字符串
 * @param key 密钥 32 个英文字母和数字
 * @param iv 向量 16 个英文字母和数字
 * @param method 加密方法
 */
export function cipherEncrypt(original: string | Buffer, key: crypto.CipherKey, iv: string = '', method: string = AES_256_ECB, output: 'base64' | 'buffer' = 'base64'): string | Buffer | false {
    try {
        if (typeof key === 'string' && key.length < 32) {
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

export function aesEncrypt(original: string | Buffer, key: crypto.CipherKey, iv: string, method: string, output: 'buffer'): Buffer | false;
export function aesEncrypt(original: string | Buffer, key: crypto.CipherKey, iv?: string, method?: string, output?: 'base64'): string | false;
/**
 * --- AES 加密 ---
 * @param original 原始字符串
 * @param key 密钥 32 个英文字母和数字
 * @param iv 向量 16 个英文字母和数字
 * @param method 加密方法
 */
export function aesEncrypt(original: string | Buffer, key: crypto.CipherKey, iv: string = '', method: string = AES_256_ECB, output: 'base64' | 'buffer' = 'base64'): string | Buffer | false {
    if (iv !== '') {
        method = method === AES_256_ECB ? AES_256_CFB : method;
    }
    return cipherEncrypt(original, key, iv, method, output);
}

export function sm4Encrypt(original: string | Buffer, key: crypto.CipherKey, iv: string, method: string, output: 'buffer'): Buffer | false;
export function sm4Encrypt(original: string | Buffer, key: crypto.CipherKey, iv?: string, method?: string, output?: 'base64'): string | false;
/**
 * --- SM4 加密 ---
 * @param original 原始字符串
 * @param key 密钥 32 个英文字母和数字
 * @param iv 向量 16 个英文字母和数字
 * @param method 加密方法
 */
export function sm4Encrypt(original: string | Buffer, key: crypto.CipherKey, iv: string = '', method: string = SM4_ECB, output: 'base64' | 'buffer' = 'base64'): string | Buffer | false {
    if (iv !== '') {
        method = method === SM4_ECB ? SM4_CFB : method;
    }
    return cipherEncrypt(original, key, iv, method, output);
}

/**
 * --- cipher 解密 ---
 * @param encrypt 需解密的字符串
 * @param key 密钥 32 个英文字母和数字
 * @param iv 向量 16 个英文字母和数字
 * @param method 加密方法
 */
export function cipherDecrypt(encrypt: string | Buffer, key: crypto.CipherKey, iv: string = '', method: string = AES_256_ECB, output: 'binary' | 'buffer' = 'binary'): string | Buffer | false {
    try {
        if (typeof key === 'string' && key.length < 32) {
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

export function aesDecrypt(encrypt: string | Buffer, key: crypto.CipherKey, iv: string, method: string, output: 'buffer'): Buffer | false;
export function aesDecrypt(encrypt: string | Buffer, key: crypto.CipherKey, iv?: string, method?: string, output?: 'binary'): string | false;
/**
 * --- AES 解密 ---
 * @param encrypt 需解密的字符串
 * @param key 密钥 32 个英文字母和数字
 * @param iv 向量 16 个英文字母和数字
 * @param method 加密方法
 */
export function aesDecrypt(encrypt: string | Buffer, key: crypto.CipherKey, iv: string = '', method: string = AES_256_ECB, output: 'binary' | 'buffer' = 'binary'): string | Buffer | false {
    if (iv !== '') {
        method = method === AES_256_ECB ? AES_256_CFB : method;
    }
    return cipherDecrypt(encrypt, key, iv, method, output);
}

export function sm4Decrypt(encrypt: string | Buffer, key: crypto.CipherKey, iv: string, method: string, output: 'buffer'): Buffer | false;
export function sm4Decrypt(encrypt: string | Buffer, key: crypto.CipherKey, iv?: string, method?: string, output?: 'binary'): string | false;
/**
 * --- SM4 解密 ---
 * @param encrypt 需解密的字符串
 * @param key 密钥 32 个英文字母和数字
 * @param iv 向量 16 个英文字母和数字
 * @param method 加密方法
 */
export function sm4Decrypt(encrypt: string | Buffer, key: crypto.CipherKey, iv: string = '', method: string = SM4_ECB, output: 'binary' | 'buffer' = 'binary'): string | Buffer | false {
    if (iv !== '') {
        method = method === SM4_ECB ? SM4_CFB : method;
    }
    return cipherDecrypt(encrypt, key, iv, method, output);
}

// --- 以下是 Mutton: false, Kebab: true ---

export function hashHmac(algorithm: string, data: Buffer | string, key?: crypto.CipherKey, format?: 'hex' | 'base64'): string;
export function hashHmac(algorithm: string, data: Buffer | string, key: crypto.CipherKey | undefined, format: 'buffer'): Buffer;
/**
 * --- hash 或 hmac 加密 ---
 * @param algorithm 哈希方式
 * @param data 源数据
 * @param key 设置则采用 hmac 加密
 */
export function hashHmac(algorithm: string, data: Buffer | string, key?: crypto.CipherKey, format: 'hex' | 'base64' | 'buffer' = 'hex'): string | Buffer {
    const cry = key ? crypto.createHmac(algorithm, key) : crypto.createHash(algorithm);
    cry.update(data);
    if (format === 'buffer') {
        return cry.digest();
    }
    else {
        return cry.digest(format);
    }
}

export function hashHmacFile(algorithm: string, path: string, key?: crypto.CipherKey, encoding?: 'hex' | 'base64' | 'base64url'): Promise<string | false>;
export function hashHmacFile(algorithm: string, path: string, key: crypto.CipherKey, encoding: 'buffer'): Promise<Buffer | false>;
/**
 * --- hash 或 hmac 加密文件 ---
 * @param algorithm 加密方式，如 md5、sha256、sm3 等
 * @param path 文件路径
 * @param key 设置则采用 hmac 加密
 */
export function hashHmacFile(algorithm: string, path: string, key?: crypto.CipherKey, encoding: 'hex' | 'base64' | 'base64url' | 'buffer' = 'hex'): Promise<string | Buffer | false> {
    return new Promise(function(resolve) {
        const cry = key ? crypto.createHmac(algorithm, key) : crypto.createHash(algorithm);
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

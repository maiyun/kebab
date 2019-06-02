import * as crypto from "crypto";
// --- 库和定义 ---
import * as Fs from "~/lib/Fs";

export interface Options {
    encoding?: crypto.Utf8AsciiLatin1Encoding;
    format?: crypto.HexBase64Latin1Encoding;
}

/**
 * --- md5 加密 ---
 * @param data 要加密的数据
 */
export function md5(data: string): string {
    return crypto.createHash("md5").update(data).digest("hex");
}

/**
 * --- md5 加密文件 ---
 * @param path 要加密的文件路径
 */
export function md5File(path: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        try {
            let s = Fs.readStream(path);
            let md5hash = crypto.createHash("md5");
            s.on("data", function (chunk: Buffer) {
                md5hash.update(chunk);
            }).on("close", function() {
                resolve(md5hash.digest("hex"));
            });
        } catch {
            resolve("");
        }
    });
}

/**
 * --- md5 加盐加密 ---
 * @param data 要加密的数据
 * @param salt 盐值
 */
export function md5WithSalt(data: string, salt: string): string {
    return md5(salt[0] + md5(data) + salt.slice(1));
}

/**
 * --- sha1 加密 ---
 * @param data 要加密的数据
 */
export function sha1(data: string, opt: Options = {}): string {
    opt.format = opt.format || "hex";
    if (opt.encoding) {
        return crypto.createHash("sha1").update(data, opt.encoding).digest(opt.format);
    } else {
        return crypto.createHash("sha1").update(data).digest(opt.format);
    }
}

// --- AES 加/解密 ---

export const AES_256_ECB = "AES-256-ECB";      // 如果未设置 iv，则默认这个
export const AES_256_CBC = "AES-256-CBC";
export const AES_256_CFB = "AES-256-CFB";      // 一般用这个，设置 $iv，自动就切换成了这个

/**
 * --- AES 加密 ---
 * @param original 原始字符串
 * @param key 密钥
 * @param iv 向量
 * @param method 加密方法
 */
export function aesEncrypt(original: string, key: string, iv: string = "", method: string = "AES-256-ECB"): string {
    try {
        if (iv !== "") {
            method = method === "AES-256-ECB" ? "AES-256-CFB" : method;
        }
        let cip = crypto.createCipheriv(method, key, iv);
        let r = cip.update(original, "utf8", "base64");
        return r + cip.final("base64");
    } catch {
        return "";
    }
}

export function aesDecrypt(encrypt: string, key: string, iv: string = "", method: string = "AES-256-ECB"): string {
    try {
        if (iv !== "") {
            method = method === "AES-256-ECB" ? "AES-256-CFB" : method;
        }
        let cip = crypto.createDecipheriv(method, key, iv);
        let r = cip.update(encrypt, "base64", "binary");
        return r + cip.final("binary");
    } catch {
        return "";
    }
}
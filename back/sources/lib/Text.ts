// --- 随机 ---
export const RANDOM_N = "0123456789";
export const RANDOM_U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const RANDOM_L = "abcdefghijklmnopqrstuvwxyz";

export const RANDOM_UN = RANDOM_U + RANDOM_N;
export const RANDOM_LN = RANDOM_L + RANDOM_N;
export const RANDOM_LU = RANDOM_L + RANDOM_U;
export const RANDOM_LUN = RANDOM_L + RANDOM_U + RANDOM_N;
export const RANDOM_V = "ACEFGHJKMNPRTWXYabcdefghkmnpqrtwxy3467";
export const RANDOM_LUNS = RANDOM_LUN + "()`~!@#$%^&*-+=_|{}[]:;\'<>,.?/]";

/**
 * --- 生成基础的范围随机数
 * @param min >= 最小值
 * @param max <= 最大值
 */
export function rand(min: number, max: number): number {
    return min + Math.round(Math.random() * (max - min));
}

// --- 字符串补足 ---
export const PAD_LEFT = 1;
export const PAD_RIGHT = 1 << 1;
export const PAD_BOTH = PAD_LEFT | PAD_RIGHT;
/**
 * --- 填充一个字符串 ---
 * @param input 被填充的字符串
 * @param length 填充后总长度
 * @param pad 要填充的字符
 * @param type 类型
 */
export function pad(input: string | number, length: number = 2, pad: string = "0", type: number = PAD_LEFT): string {
    if (typeof input !== "string") {
        input = input.toString();
    }
    let i, j;
    let n = length - input.length;
    if (n <= 0) {
        return input;
    }
    let offset = pad.length;
    let p = "";  // 要填充的字符串

    switch (type) {
        case PAD_BOTH: {
            let q = "";
            for (i = 0, j = 0; 0 < n; n--, i = (i + 1) % offset, j++) {
                // 先在右边添加 后再左边添加
                if (Math.floor(j / offset) % 2 === 0) {
                    q += pad[i];
                } else {
                    p += pad[i];
                }
            }
            input = p + input + q;
            break;
        }
        case PAD_LEFT: {
            for (i = 0; 0 < n; n--, i = (i + 1) % offset) {
                p += pad[i];
            }
            input = p + input;
            break;
        }
        case PAD_RIGHT: {
            for (i = 0; 0 < n; n--, i = (i + 1) % offset) {
                p += pad[i];
            }
            input = input + p;
            break;
        }
    }
    return input;
}

/**
 * --- 生成随机字符串 ---
 * @param length 长度
 * @param source 采样值
 */
export function random(length: number = 8, source: string = RANDOM_LN): string {
    let len = source.length;
    let temp = "";
    for (let i = 0; i < length; ++i) {
        temp += source[rand(0, len - 1)];
    }
    return temp;
}

/**
 * --- HTML 特殊字符转换为实体字符 ---
 * @param html 待转换的 HTML
 */
export function htmlescape(html: string): string {
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&/g, "&amp;");
}
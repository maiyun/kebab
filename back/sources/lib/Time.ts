// --- 库和定义 ---
import * as Text from "~/lib/Text";

/**
 * --- 格式化日期 ---
 * @param f 要格式的格式
 * @param date 日期对象（可选）
 */
export function format(f: string, date?: Date): string {
    if (!date) {
        date = new Date();
    }
    let l = f.length;
    let over: string[] = [];
    for (let i = 0; i < l; ++i) {
        switch (f[i]) {
            case "Y": {
                over.push(Text.pad(date.getFullYear()));
                break;
            }
            case "m": {
                over.push(Text.pad(date.getMonth() + 1));
                break;
            }
            case "d": {
                over.push(Text.pad(date.getDate()));
                break;
            }
            case "H": {
                over.push(Text.pad(date.getHours()));
                break;
            }
            case "i": {
                over.push(Text.pad(date.getMinutes()));
                break;
            }
            case "s": {
                over.push(Text.pad(date.getSeconds()));
                break;
            }
            default: {
                over.push(f[i]);
                break;
            }
        }
    }
    return over.join("");
}

/**
 * --- 获取秒级时间戳 ---
 * @param date Date 对象可选
 */
export function stamp(date?: Date): number {
    if (date) {
        return Math.round(date.getTime() / 1000);
    } else {
        return Math.round(Date.now() / 1000);
    }
}
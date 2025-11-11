/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-6 12:04:15
 * Last: 2020-3-29 23:41:21, 2024-1-18 17:16:50, 2024-8-5 10:55:21
 */
import * as sCtr from '#kebab/sys/ctr.js';

export interface IOptions {
    /** --- 时区 --- */
    'zone'?: number;
    /** --- 字符串、时间戳（秒或毫秒） --- */
    'data'?: string | number;
}

/** --- 一小时的秒数 --- */
export const HOUR = 3600;
/** --- 一天的秒数 --- */
export const DAY = 86400;
/** --- 一年（365 天） */
export const YEAR = 31536000;

/** --- 星期名 --- */
const dayNames: string[][] = [
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
];
/** --- 月份名 --- */
const monthNames: string[][] = [
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
];

export class Time {

    /** --- 当前 date --- */
    private readonly _date!: Date;

    /** --- 当前时区 --- */
    private _zone: number = 0;

    /**
     * --- 构造函数 ---
     * @param opt
     */
    public constructor(ctr: sCtr.Ctr, opt: IOptions) {
        this._zone = opt.zone ?? ctr.getPrototype('_config').set.timezone ?? 0;
        if (opt.data) {
            if (typeof opt.data === 'number') {
                let dataStr: string = opt.data.toString();
                if (dataStr.length < 13) {
                    dataStr += '000';
                    opt.data = Number(dataStr);
                }
                this._date = new Date(opt.data);
            }
            else if (typeof opt.data === 'string') {
                this._date = new Date(opt.data);
                /** --- 与当前设定时区的差小时 --- */
                const offset = this._date.getTimezoneOffset() / 60 + this._zone;
                if (offset !== 0) {
                    this._date.setUTCHours(this._date.getUTCHours() - offset);
                }
            }
        }
        else {
            this._date = new Date();
        }
    }

    /**
     * --- 设置时区 ---
     * @param zone 北京时间如 8
     */
    public setZone(zone: number): void {
        this._zone = zone;
    }

    /**
     * --- 获取时区 ---
     */
    public getZone(): number {
        return this._zone;
    }

    /**
     * --- 获取 UTC 字符串 ---
     */
    public toUTCString(): string {
        return this._date.toUTCString();
    }

    /**
     * --- 获取格式化的字符串 ---
     * @param f 格式化字符串
     * @param zone 时区小时，如 8
     */
    public format(f: string, zone?: number): string {
        return format(zone ?? 0, f, this._date);
    }

    /**
     * --- 获取秒级时间戳 ---
     */
    public stamp(): number {
        return stamp(this._date);
    }
}

/**
 * --- 创建获取一个时间对象 ---
 * @param opt
 */
export function get(ctr: sCtr.Ctr, opt: IOptions = {}): Time {
    return new Time(ctr, opt);
}

/**
 * --- 获取秒级时间戳 ---
 * @param date Date 对象可选
 * @param zone 时区小时或 ctr 对象，如 8，设置 null 则以系统时区为准
 */
export function stamp(date?: Date | string, zone?: number | sCtr.Ctr | null): number {
    if (date) {
        if (date instanceof Date) {
            return Math.floor(date.getTime() / 1000);
        }
        if (zone === null || zone === undefined) {
            zone = -(new Date()).getTimezoneOffset();
        }
        else if (zone instanceof sCtr.Ctr) {
            zone = zone.getPrototype('_config').set.timezone * 60;
        }
        else {
            zone *= 60;
        }
        /** --- 时区是否是负数 --- */
        const negative = zone < 0;
        /** --- 时区绝对值 --- */
        const zoneabs = Math.abs(zone);
        return Math.floor((new Date(`${date} ${negative ? '-' : '+'}${Math.floor(zoneabs / 60)}:${zoneabs % 60}`)).getTime() / 1000);
    }
    else {
        return Math.floor(Date.now() / 1000);
    }
}

/**
 * --- 是否是毫秒 ---
 * @param time 要判断的时间戳
 */
export function isMs(time: number): boolean {
    return time > 1000000000000 ? true : false;
}

/**
 * --- 将时间对象转换为时间字符串 ---
 * @param zone 时区小时或 ctr 对象，如 8，设置 null 则以系统时区为准
 * @param f 转换格式
 * @param date 时间对象秒/毫秒级数字均可
 */
export function format(zone: number | sCtr.Ctr | null, f: string, date?: Date | number): string {
    const over: string[] = [];
    if (date === undefined) {
        date = new Date();
    }
    else if (typeof date === 'number') {
        date = new Date(isMs(date) ? date : date * 1000);
    }
    if (zone === null) {
        zone = (-date.getTimezoneOffset()) / 60;
    }
    else if (zone instanceof sCtr.Ctr) {
        zone = zone.getPrototype('_config').set.timezone;
    }
    zone ??= (-date.getTimezoneOffset()) / 60;
    if (zone !== 0) {
        date = new Date(date.getTime() + zone * 60 * 60 * 1000);
    }
    for (const v of f) {
        switch (v) {
            case 'd': {
                over.push(date.getUTCDate().toString().padStart(2, '0'));
                break;
            }
            case 'D': {
                over.push(dayNames[0][date.getUTCDay()]);
                break;
            }
            case 'j': {
                over.push(date.getUTCDate().toString());
                break;
            }
            case 'l': {
                over.push(dayNames[1][date.getUTCDay()]);
                break;
            }
            case 'N': {
                const d = date.getUTCDay();
                over.push((d ? d : 7).toString());
                break;
            }
            case 'w': {
                over.push(date.getUTCDay().toString());
                break;
            }
            case 'Y': {
                over.push(date.getUTCFullYear().toString());
                break;
            }
            case 'y': {
                over.push(date.getUTCFullYear().toString().slice(-2));
                break;
            }
            case 'F': {
                over.push(monthNames[1][date.getUTCMonth()]);
                break;
            }
            case 'M': {
                over.push(monthNames[0][date.getUTCMonth()]);
                break;
            }
            case 'm': {
                over.push((date.getUTCMonth() + 1).toString().padStart(2, '0'));
                break;
            }
            case 'H': {
                over.push(date.getUTCHours().toString().padStart(2, '0'));
                break;
            }
            case 'h': {
                const h = date.getUTCHours();
                over.push((h > 12 ? h - 12 : h).toString().padStart(2, '0'));
                break;
            }
            case 'i': {
                over.push(date.getUTCMinutes().toString().padStart(2, '0'));
                break;
            }
            case 's': {
                over.push(date.getUTCSeconds().toString().padStart(2, '0'));
                break;
            }
            case 'T': {
                const t = -(date.getTimezoneOffset() / 60);
                over.push('UTC' + (t >= 0 ? '+' : '') + t.toString());
                break;
            }
            default: {
                over.push(v);
                break;
            }
        }
    }
    return over.join('');
}

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-6 12:04:15
 * Last: 2020-3-29 23:41:21
 */
import * as sCtr from '~/sys/ctr';
import * as text from '~/lib/text';

export interface IOptions {
    /** --- 时区 --- */
    'zone'?: number;
    /** --- 字符串、时间戳（秒或毫秒） --- */
    'data'?: string | number;
}

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
        return format(f, zone, this._date);
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
 */
export function stamp(date?: Date): number {
    if (date) {
        return Math.floor(date.getTime() / 1000);
    }
    else {
        return Math.floor(Date.now() / 1000);
    }
}

/**
 * --- 将时间对象转换为时间字符串 ---
 * @param f 转换格式
 * @param zone 时区小时或 ctr 对象，如 8
 * @param date 时间对象
 */
export function format(f: string, zone?: number | sCtr.Ctr, date?: Date): string {
    const over: string[] = [];
    if (!date) {
        date = new Date();
    }
    if (zone instanceof sCtr.Ctr) {
        zone = zone.getPrototype('_config').set.timezone;
    }
    if (zone === undefined) {
        zone = (-date.getTimezoneOffset()) / 60;
    }
    if (zone !== 0) {
        date = new Date(date.getTime() + zone * 60 * 60 * 1000);
    }
    for (const v of f) {
        switch (v) {
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
                over.push(text.pad(date.getUTCMonth() + 1));
                break;
            }
            case 'L':
            case 'l': {
                over.push(dayNames[1][date.getUTCDay()]);
                break;
            }
            case 'D': {
                over.push(dayNames[0][date.getUTCDay()]);
                break;
            }
            case 'd': {
                over.push(text.pad(date.getUTCDate()));
                break;
            }
            case 'H': {
                over.push(text.pad(date.getUTCHours()));
                break;
            }
            case 'h': {
                const h = date.getUTCHours();
                over.push(text.pad(h > 12 ? h - 12 : h));
                break;
            }
            case 'i': {
                over.push(text.pad(date.getUTCMinutes()));
                break;
            }
            case 's': {
                over.push(text.pad(date.getUTCSeconds()));
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

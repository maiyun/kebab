/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-9-20 19:46:30
 * Last: 2025-9-20 19:46:32
 */
import * as kebab from '#kebab/index.js';
import * as lFs from '#kebab/lib/fs.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';

/** --- 定时任务列表 --- */
const regulars: IRegularData[] = [];

/** --- 获取定时任务列表 --- */
export function getRegulars(): IRegularData[] {
    return regulars;
}

/**
 * --- 创建定时执行的计划任务 ---
 * @param task 计划任务对象
 * @param immediate 如果传入的时间小于当前时间且没有执行过则立即执行一次（格式：YmdHi）
 */
export async function regular(task: IRegular, immediate: string = ''): Promise<boolean> {
    if (!/^[a-z0-9-_]{1,32}$/.test(task.name)) {
        return false;
    }
    if (regulars.find(item => item.name === task.name)) {
        // --- 当前进程已经注册过了，不能再注册了 ---
        return false;
    }
    // --- 检查是否存在相同名称的计划任务 ---
    if (!await lFs.isDir(kebab.LOG_CWD + `cron/`)) {
        await lFs.mkdir(kebab.LOG_CWD + `cron/`);
        await lFs.putContent(kebab.LOG_CWD + `cron/lock.txt`, 'Kebab');
    }
    // --- 保存计划任务 ---
    const content = await lFs.getContent(kebab.LOG_CWD + `cron/${task.name}.json`, 'utf8');
    /** --- 任务对象 --- */
    const obj: IRegularData = {
        ...task,
        'last': '',
        'count': 0,
        'rcount': 0,
    };
    if (content) {
        const json = JSON.parse(content);
        obj.last = json.last;
        obj.count = json.count;
    }
    await lFs.putContent(kebab.LOG_CWD + `cron/${obj.name}.json`, JSON.stringify(obj));
    // --- 检查是否需要立即执行 ---
    /** --- 当前日期字符串 --- */
    const date = lTime.format(null, 'YmdHi');
    if (immediate && (immediate < date)) {
        try {
            obj.callback(date) as any;
        }
        catch (e: any) {
            const msg = `[CRON][${obj.name}] ${lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""')}`;
            lCore.debug(msg);
            lCore.log({}, msg, '-error');
        }
        // --- 设置执行后的数据 ---
        obj.last = date;
        ++obj.count;
        ++obj.rcount;
        await lFs.putContent(kebab.LOG_CWD + `cron/${obj.name}.json`, JSON.stringify(obj));
    }
    regulars.push(obj);
    return true;
}

/**
 * --- 执行定时任务 ---
 */
export function run(): void {
    /** --- 当前日期字符串 --- */
    const date = lTime.format(null, 'YmdHi');
    /** --- 当前时间 --- */
    const now = new Date();
    /** --- 当前月份 --- */
    const month = now.getMonth() + 1;
    /** --- 当前日期 --- */
    const day = now.getDate();
    /** --- 当前小时 --- */
    const hour = now.getHours();
    /** --- 当前分钟 --- */
    const minute = now.getMinutes();
    /** --- 当前星期几 --- */
    const week = now.getDay();
    // --- 检查定时任务是否需要执行 ---
    for (const task of regulars) {
        if ((task.date.minute !== -1) && (task.date.minute !== minute)) {
            continue;
        }
        if ((task.date.hour !== -1) && (task.date.hour !== hour)) {
            continue;
        }
        if ((task.date.week !== -1) && (task.date.week !== week)) {
            continue;
        }
        if ((task.date.day !== -1) && (task.date.day !== day)) {
            continue;
        }
        if ((task.date.month !== -1) && (task.date.month !== month)) {
            continue;
        }
        if (task.last === date) {
            continue;
        }
        // --- 执行回调 ---
        try {
            task.callback(date) as any;
        }
        catch (e: any) {
            const msg = `[CRON][${task.name}] ${lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""')}`;
            lCore.debug(msg);
            lCore.log({}, msg, '-error');
        }
        // --- 设置执行后的数据 ---
        task.last = date;
        ++task.count;
        ++task.rcount;
        lFs.putContent(kebab.LOG_CWD + `cron/${task.name}.json`, JSON.stringify(task)).catch(() => {});
    }
}
// --- 每15秒检查一次 ---
setInterval(run, 15_000);

// --- 类型 ---

/** --- 定时任务 --- */
export interface IRegular {
    /** --- 任务名称 --- */
    'name': string;
    /** --- 任务日期对象（系统时区） --- */
    'date': {
        /** --- -1, 1 - 12 --- */
        'month': number;
        /** --- -1, 1 - 31 --- */
        'day': number;
        /** --- -1, 0 - 23 --- */
        'hour': number;
        /** --- -1, 0 - 59 --- */
        'minute': number;
        /** --- -1, 0 - 6 --- */
        'week': number;
    };
    /** --- 任务函数 --- */
    callback: (date: string) => void | Promise<void>;
}

export interface IRegularData extends IRegular {
    /** --- 上次执行时间字符串，格式：YmdHi（系统时区） --- */
    'last': string;
    /** --- 总执行次数 --- */
    'count': number;
    /** --- 定时任务重启后的执行次数 --- */
    'rcount': number;
}

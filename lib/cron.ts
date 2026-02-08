/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-9-20 19:46:30
 * Last: 2025-9-20 19:46:32
 */
import * as kebab from '#kebab/index.js';
import * as nodeCron from 'node-cron';
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
 * @param immediate 如果传入的时间小于当前时间且[没有执行过]则立即执行一次（格式：YmdHi，系统时区）
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
        try {
            const json = JSON.parse(content);
            obj.last = json.last ?? obj.last;
            obj.count = json.count ?? obj.count;
        }
        catch {
            // --- 如果 JSON 解析失败，使用默认值 ---
        }
    }
    await lFs.putContent(kebab.LOG_CWD + `cron/${obj.name}.json`, JSON.stringify(obj));
    // --- 好，先注册 ---
    nodeCron.schedule(task.rule, () => {
        /** --- 当前日期字符串 --- */
        const date = lTime.format(null, 'YmdHi');
        try {
            obj.callback(date, false) as any;
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
        lFs.putContent(kebab.LOG_CWD + `cron/${obj.name}.json`, JSON.stringify(obj)).catch(() => {});
    });
    // --- 检查是否需要立即执行 ---
    /** --- 当前日期字符串 --- */
    const date = lTime.format(null, 'YmdHi');
    if (
        (immediate && (immediate <= date) && (obj.last < immediate))
    ) {
        // --- 理应执行的时间早于当前，或要执行的时间就是现在 ---
        try {
            obj.callback(date, true) as any;
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

// --- 类型 ---

/** --- 定时任务 --- */
export interface IRegular {
    /** --- 任务名称，只能小写字母、数字、短横线、下划线，长度 1-32 --- */
    'name': string;
    /** --- 规则，分、时、日、月、星期，与 linux 的 cron 相同（不支持秒） --- */
    'rule': string;
    /** --- 任务函数 --- */
    callback: (date: string, immediate: boolean) => void | Promise<void>;
}

export interface IRegularData extends IRegular {
    /** --- 上次执行时间字符串，格式：YmdHi（系统时区） --- */
    'last': string;
    /** --- 总执行次数 --- */
    'count': number;
    /** --- 定时任务重启后的执行次数 --- */
    'rcount': number;
}

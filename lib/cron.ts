/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-9-20 19:46:30
 * Last: 2025-9-20 19:46:32, 2026-3-22 00:00:00
 */
import * as kebab from '#kebab/index.js';
import * as nodeCron from 'node-cron';
import * as lFs from '#kebab/lib/fs.js';
import * as lCore from '#kebab/lib/core.js';
import * as lText from '#kebab/lib/text.js';
import * as lTime from '#kebab/lib/time.js';
import * as lKv from '#kebab/lib/kv.js';

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
    // --- 检查 cron 数据目录是否存在 ---
    const cronDataDir = kebab.LOG_CWD + 'cron/';
    if (!await lFs.isDir(cronDataDir)) {
        await lFs.mkdir(cronDataDir);
        await lFs.putContent(cronDataDir + 'lock.txt', 'Kebab');
    }
    // --- 加载已有的持久化数据 ---
    const content = await lFs.getContent(cronDataDir + `${task.name}.json`, 'utf8');
    /** --- 任务对象 --- */
    const obj: IRegularData = {
        ...task,
        'last': '',
        'count': 0,
        'rcount': 0,
    };
    if (content) {
        const json = lText.parseJson<any>(content);
        if (json) {
            obj.last = json.last ?? '';
            obj.count = json.count ?? 0;
        }
    }
    await saveCronData(obj);
    // --- 注册定时任务 ---
    nodeCron.schedule(task.rule, () => {
        executeWithLock(obj, false).catch((e: any) => {
            const msg = `[CRON][${obj.name}] ${lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""')}`;
            lCore.debug(msg);
            lCore.log({}, msg, '-error');
        });
    });
    // --- 检查是否需要立即执行 ---
    /** --- 当前日期字符串 --- */
    const date = lTime.format(null, 'YmdHi');
    if (
        (immediate && (immediate <= date) && (obj.last < immediate))
    ) {
        await executeWithLock(obj, true);
    }
    regulars.push(obj);
    return true;
}

/**
 * --- 带分布式锁执行定时任务（多进程/多机下只有一个 worker 会执行） ---
 * @param obj 任务数据对象
 * @param immediate 是否为立即执行模式
 */
async function executeWithLock(obj: IRegularData, immediate: boolean): Promise<void> {
    const date = lTime.format(null, 'YmdHi');
    const lockKey = `cron_lock:${obj.name}:${date}`;
    // --- 尝试通过 KV 获取分布式锁 ---
    if (lCore.globalConfig.kv?.host) {
        try {
            const kv = get();
            // --- 锁的 TTL 为 120 秒，防止任务异常退出后锁永远不释放 ---
            const acquired = await kv.add(lockKey, process.pid?.toString() ?? '1', 120);
            if (!acquired) {
                // --- 其他进程已经在执行此任务了 ---
                return;
            }
        }
        catch {
            // --- KV 不可用时降级为本地执行（不做锁控制） ---
            lCore.debug(`[CRON][${obj.name}] KV lock unavailable, fallback to local execution`);
        }
    }
    // --- 执行任务 ---
    try {
        await obj.callback(date, immediate);
    }
    catch (e: any) {
        const msg = `[CRON][${obj.name}] ${lText.stringifyJson(e.message ?? '').slice(1, -1).replace(/"/g, '""')}`;
        lCore.debug(msg);
        lCore.log({}, msg, '-error');
    }
    // --- 更新执行数据 ---
    obj.last = date;
    ++obj.count;
    ++obj.rcount;
    await saveCronData(obj);
}

/**
 * --- 保存定时任务持久化数据 ---
 * @param obj 任务数据对象
 */
async function saveCronData(obj: IRegularData): Promise<void> {
    await lFs.putContent(kebab.LOG_CWD + `cron/${obj.name}.json`, lText.stringifyJson({
        'name': obj.name,
        'last': obj.last,
        'count': obj.count,
    })).catch(() => {});
}

/**
 * --- 获取 Kv 实例（内部使用，用于分布式锁） ---
 */
function get(): lKv.Kv {
    return lKv.get({
        'host': lCore.globalConfig.kv.host,
        'port': lCore.globalConfig.kv.port,
        'index': lCore.globalConfig.kv.index,
        'pre': lCore.globalConfig.kv.pre,
        'user': lCore.globalConfig.kv.user,
        'pwd': lCore.globalConfig.kv.pwd,
    });
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

/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2022-09-12 10:51:16
 * Last: 2022-09-12 10:51:20, 2023-3-17 10:52:04, 2023-11-15 11:45:28
 */
import * as crypto from '~/lib/crypto';

export class Consistent {

    /** --- 虚拟节点数量 --- */
    private readonly _vcount: number = 300;

    /** --- hash 环 --- */
    private readonly _circle: Record<string, string> = {};

    /** --- circle 的 keys --- */
    private _keys: string[] = [];

    public constructor(vcount: number) {
        this._vcount = vcount;
    }

    /**
     * --- 获取当前的虚拟节点数量 ---
     */
    public getVcount(): number {
        return this._vcount;
    }

    /**
     * 添加节点
     * @param node node 节点名一个或多个
     */
    public add(node: string | string[]): void {
        addToCircle(this._circle, node, this._vcount);
        this._keys = [];
    }

    /**
     * 移除节点
     * @param node node 节点名
     */
    public remove(node: string | string[]): void {
        if (typeof node === 'string') {
            node = [node];
        }
        for (const v of node) {
            for (let i = 0; i < this._vcount; i++) {
                delete this._circle[hash(v + i.toString())];
            }
        }
        this._keys = [];
    }

    /**
     * 获得一个最近的顺时针节点
     * @param key 为给定键取 Hash，取得顺时针方向上最近的一个虚拟节点对应的实际节点
     */
    public find(key: string | number): string | null {
        if (this._keys.length === 0) {
            this._keys = Object.keys(this._circle);
            this._keys.sort((a, b) => {
                return parseFloat(a) - parseFloat(b);
            });
        }
        return findInCircle(this._circle, key, this._keys);
    }

    /**
     * --- 原数据迁移到新地址 ---
     * @param keys 原始数据 key 集
     * @param node 新增的节点一个或多个
     */
    public migration(keys: string | number | Array<string | number>, node: string | string[]): Record<string, {
        'old': string;
        'new': string;
    }> {
        const rtn: Record<string, {
            'old': string;
            'new': string;
        }> = {};
        if (!Array.isArray(keys)) {
            keys = [keys];
        }
        // --- 获取老的 key 对应的 node ---
        const mapOld: Record<string, string> = {};
        for (const key of keys) {
            const oldNode = this.find(key);
            if (!oldNode) {
                continue;
            }
            mapOld[key] = oldNode;
        }
        this.add(node);
        // --- 再逐一检测老的和新的的 node 是否一致 ---
        for (const key of keys) {
            const newNode = this.find(key);
            if (!newNode) {
                continue;
            }
            if (mapOld[key] === newNode) {
                continue;
            }
            rtn[key] = {
                'old': mapOld[key],
                'new': newNode
            };
        }
        return rtn;
    }

}

export function get(vcount = 300): Consistent {
    return new Consistent(vcount);
}

/**
 *--- 快速查找一个 key 属于哪个 node ---
 * @param key 要查找的key
 * @param nodes node 列表
 * @param vcount 虚拟节点数量
 */
export function fast(key: string | number, nodes: string | string[], vcount = 300): string | null {
    const circle: Record<string, string> = {};
    addToCircle(circle, nodes, vcount);
    return findInCircle(circle, key);
}

/**
 * --- hash 函数 ---
 * @param val 要 hash 的值
 */
export function hash(val: string | number): number {
    if (typeof val === 'number') {
        val = val.toString();
    }
    const bKey = crypto.hashHmac('md5', val);

    const res = ((bKey.charCodeAt(3) & 0xFF) << 24) |
        ((bKey.charCodeAt(2) & 0xFF) << 16) |
        ((bKey.charCodeAt(1) & 0xFF) << 8) |
        (bKey.charCodeAt(0) & 0xFF);
    return res & 0xffffffff;
}

/**
 * --- 获取区间节点系列 ---
 * @param min 最小值（含）
 * @param max 最大值（含）
 * @param pre 前导
 */
export function getRange(min: number, max: number, pre: string = ''): string[] {
    const ls: string[] = [];
    for (let i = min; i <= max; ++i) {
        ls.push(pre + i.toString());
    }
    return ls;
}

/**
 * --- 添加到圆环 ---
 * @param circle 圆环
 * @param node node 节点名一个或多个
 * @param vcount 虚拟节点数量
 */
export function addToCircle(
    circle: Record<string, string>,
    node: string | string[],
    vcount: number = 300
): void {
    if (typeof node === 'string') {
        node = [node];
    }
    for (const v of node) {
        for (let i = 0; i < vcount; i++) {
            circle[hash(v + i.toString())] = v;
        }
    }
}

/**
 * --- 获得一个最近的顺时针节点 ---
 * @param circle 圆环
 * @param key 为给定键取 Hash，取得顺时针方向上最近的一个虚拟节点对应的实际节点
 * @param keys keys，留空则自动从 circle 上取
 */
export function findInCircle(
    circle: Record<string, string>,
    key: string | number,
    keys: string[] = []
): string | null {
    let count = keys.length;
    if (keys.length === 0) {
        keys = Object.keys(circle);
        count = keys.length;
        keys.sort((a, b) => {
            return parseFloat(a) - parseFloat(b);
        });
    }
    if (count === 0) {
        return null;
    }
    if (count === 1) {
        return circle[keys[0]];
    }
    const hashv = hash(key);
    if (circle[hashv] !== undefined) {
        return circle[hashv];
    }
    for (const v of keys) {
        if (parseFloat(v) < hashv) {
            continue;
        }
        return circle[v];
    }
    // --- 没找到 ---
    return circle[keys[0]];
}

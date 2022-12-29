/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2022-09-12 10:51:16
 * Last: 2022-09-12 10:51:20
 */
import * as crypto from '~/lib/crypto';

export class Consistent {

    /** --- 虚拟节点数量 --- */
    private readonly _vcount: number = 300;

    /** --- hash 环 --- */
    private _circle: Record<string, string> = {};

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
        if (typeof node === 'string') {
            node = [node];
        }
        for (const v of node) {
            for (let i = 0; i < this._vcount; i++) {
                this._circle[hash(v + i.toString())] = v;
            }
        }
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
     * @param key 为给定键取Hash，取得顺时针方向上最近的一个虚拟节点对应的实际节点
     */
    public find(key: string | number): string | null {
        if (this._keys.length === 0) {
            this._keys = Object.keys(this._circle);
            this._keys.sort((a, b) => {
                return parseFloat(a) - parseFloat(b);
            });
        }
        const count = this._keys.length;
        if (count === 0) {
            return null;
        }
        if (count === 1) {
            return this._circle[this._keys[0]];
        }
        const hashv = hash(key);
        if (this._circle[hashv] !== undefined) {
            return this._circle[hashv];
        }
        for (const v of this._keys) {
            if (parseFloat(v) < hashv) {
                continue;
            }
            return this._circle[v];
        }
        // --- 没找到 ---
        return this._circle[this._keys[0]];
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
    const cons = new Consistent(vcount);
    cons.add(nodes);
    return cons.find(key);
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

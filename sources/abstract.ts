// --- 虚拟机配置对象 ---
export interface Vhost {
    readonly name: string;
    readonly domains: string[];
    readonly root: string;
    readonly cert: string;
    readonly key: string;
}

/** 控制器使用的变量 */
export interface CtrConst {
    readonly HTTP_BASE: string;
}
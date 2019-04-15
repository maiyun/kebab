// --- 虚拟机配置对象 ---
export interface Vhost {
    readonly name: string;
    readonly domains: string[];
    readonly root: string;
    readonly cert: string;
    readonly key: string;
}

/** 控制器使用的变量 */
export interface GlobalConst {
    readonly HTTP_BASE: string;
}

/** 动态目录配置文件 */
export interface Config {
    readonly route: any;
    readonly etc: any;
}
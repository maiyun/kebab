/* eslint-disable @typescript-eslint/no-floating-promises */
/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-3-29 18:55:35
 * Last: 2020-3-6 22:19:37, 2022-3-30 01:01:22, 2022-9-27 16:11:40, 2025-6-13 12:56:18
 */
// git config core.ignorecase false

import cluster from 'cluster';
// --- 虽然框架本身不用，但是业务侧会用到，所以这个库不能删 ---
import 'ts-alias-loader';

// --- 初始化 ---
// --- 一定要分别隔离加载 Master 和 Child 代码，防止执行串了 ---
if (cluster.isPrimary) {
    if (process.argv.length > 2) {
        // --- 传入的命令方式启动，则执行 RPC 相关命令 ---
        import('./sys/cmd.js');
    }
    else {
        // --- 正常启动 ---
        import('./sys/master.js');
    }
}
else {
    import('./sys/child.js');
}

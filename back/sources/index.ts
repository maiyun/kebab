import * as cluster from "cluster";
// --- 第三方 ---
import "ts-alias-loader";

// --- 初始化 ---
// --- 一定要分别隔离加载 Master 和 Child 代码，防止执行串了 ---
if (cluster.isMaster) {
    try {
        require("./sys/Master");
    } catch (e) {
        console.log("[Master] ------ [Process fatal Error] ------");
        console.log(e);
    }
} else {
    try {
        require("./sys/Child");
    } catch (e) {
        console.log("[Child ] ------ [Process fatal Error] ------");
        console.log(e);
    }
}


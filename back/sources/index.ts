import * as cluster from "cluster";
// --- 库和定义 ---
import * as Master from "./sys/Master";
import * as Child from "./sys/Child";

// --- 初始化 ---
(async () => {
    try {
        if (cluster.isMaster) {
            Master.run();
        } else {
            Child.run();
        }
    } catch (e) {
        console.log(e);
    }
})();


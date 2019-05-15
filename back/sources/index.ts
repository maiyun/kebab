import * as cluster from "cluster";
// --- 库和定义 ---
import * as Master from "./sys/Master";
import * as Child from "./sys/Child";

// --- 初始化 ---
(async () => {
    try {
        if (cluster.isMaster) {
            await Master.run();
        } else {
            await Child.run();
        }
    } catch (e) {
        console.log("--- [Process fatal Error] ---");
        console.log(e);
    }
})();


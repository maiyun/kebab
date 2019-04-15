import * as Fs from "../../back/dist/lib/Fs";
import * as c from "../../back/dist/const";

/**
 * --- 本文件用于复制静态文件到 dist 目录 ---
 */

(async () => {
    let from = c.TOP_PATH + "sources/";
    let to = c.DIST_PATH;

    console.log("Processing...");
    await Fs.sync(from, to);
    console.log("Done.");
})();
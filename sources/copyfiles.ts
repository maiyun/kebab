import * as Fs from "./lib/Fs";
import * as c from "./const";

/**
 * --- 本文件用于复制静态文件到 dist 目录 ---
 */

(async () => {
    let from = c.TOP_PATH + "sources/";
    let to = c.ROOT_PATH;

    console.log("Processing...");
    await Fs.sync(from, to);
    console.log("Done.");
})();
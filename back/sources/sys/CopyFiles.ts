import * as Fs from "../lib/Fs";
import * as c from "../const";

/**
 * --- 本文件用于复制 front 静态文件到 dist 目录，sources 里的静态文件到 dist 目录 ---
 */

export async function run() {
    let acList = [
        // --- back 里的系统级别的静态复制到 dist，如 Net 库的 pem 静态文件 ---
        {from: c.SOURCES_PATH, to: c.DIST_PATH}
    ];
    let list = await Fs.readDir(c.FRONT_PATH);
    for (let item of list) {
        if (item === "." || item === "..") {
            continue;
        }
        acList.push({
            from: c.FRONT_PATH + item + "/stc/", to: c.WWW_PATH + item + "/stc/"
        });
        acList.push({
            from: c.FRONT_PATH + item + "/view/", to: c.WWW_PATH + item + "/view/"
        });
        acList.push({
            from: c.FRONT_PATH + item + "/locale/", to: c.WWW_PATH + item + "/locale/"
        });
    }

    console.log("Processing...");
    for (let item of acList) {
        console.log(`From "${item.from}" to "${item.to}"...`);
        await Fs.sync(item.from, item.to);
    }

    await Fs.mkdir(c.FTMP_PATH);
    console.log("Done.");
}

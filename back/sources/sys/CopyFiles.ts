import * as Fs from "../lib/Fs";
import * as Const from "../const";
import * as abs from "../abstract";

/**
 * --- 本文件用于复制 front 静态文件到 dist 目录，sources 里的静态文件到 dist 目录 ---
 */

export async function run() {
    let acList = [
        // --- back 里的系统级别的静态复制到 dist，如 Net 库的 pem 静态文件 ---
        {from: Const.SOURCES_PATH, to: Const.DIST_PATH}
    ];
    // --- 加载 VHOST 信息 ---
    let vhosts: abs.Vhost[] = [];
    let files = await Fs.readDir(Const.VHOST_PATH);
    for (let file of files) {
        let fstr = await Fs.readFile(Const.VHOST_PATH + file);
        if (fstr === undefined) {
            continue;
        }
        let list: abs.Vhost[] = JSON.parse(fstr);
        if (!Array.isArray(list)) {
            list = [list];
        }
        for (let item of list) {
            vhosts.push(item);
        }
    }
    for (let vhost of vhosts) {
        acList.push({
            from: Const.FRONT_PATH + vhost.root + "stc/", to: Const.WWW_PATH + vhost.root + "stc/"
        });
        acList.push({
            from: Const.FRONT_PATH + vhost.root + "view/", to: Const.WWW_PATH + vhost.root + "view/"
        });
        acList.push({
            from: Const.FRONT_PATH + vhost.root + "locale/", to: Const.WWW_PATH + vhost.root + "locale/"
        });
    }

    console.log("Processing...");
    for (let item of acList) {
        console.log(`From "${item.from}" to "${item.to}"...`);
        await Fs.sync(item.from, item.to);
    }

    await Fs.mkdir(Const.FTMP_PATH);
    console.log("Done.");
}
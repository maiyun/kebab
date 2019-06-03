// --- 库和定义 ---
import * as View from "~/lib/View";
import * as Net from "~/lib/Net";
import * as Crypto from "~/lib/Crypto";
import * as Zlib from "~/lib/Zlib";
import * as Fs from "~/lib/Fs";
import * as Const from "~/const";
import * as abs from "~/abstract";

export async function index(nu: abs.Nu) {
    let l = <string>nu.get.l || "en";
    if (["en", "zh-CN", "zh-TW"].indexOf(l) === -1) {
        l = "en";
    }
    await View.setLocale(nu, l, "__Nuttom__");
    await View.write(nu, "__Nuttom__/index", {
        VER: Const.VER,
        hasConfig: nu.config.etc.__Nuttom__.pwd !== "123456" ? true : false
    });
}

export async function apiCheckRefresh(nu: abs.Nu) {
    if (nu.post.password !== nu.config.etc.__Nuttom__.pwd) {
        return [0, "Password is incorrect."];
    }
    if (nu.config.etc.__Nuttom__.pwd === "123456" && nu.uri.hostname !== "local-test.brc-app.com") {
        return [0, "Password cannot be 123456."];
    }
    let res = await Net.get("https://api.github.com/repos/MaiyunNET/Nuttom/releases");
    if (!res) {
        return [0, "Network error, please try again."];
    }
    let content = (await res.readContent()).toString();
    let json = JSON.parse(content);
    let list: any[] = [];
    for (let item of json) {
        let matches = item.tag_name.match(/[0-9\.]+/);
        list.push({
            "value": matches[0],
            "label": item.name
        });
    }
    return [1, {"list": list}];
}

export async function apiCheck(nu: abs.Nu) {
    if (nu.post.password !== nu.config.etc.__Nuttom__.pwd) {
        return [0, "Password is incorrect."];
    }
    if (nu.config.etc.__Nuttom__.pwd === "123456" && nu.uri.hostname !== "local-test.brc-app.com") {
        return [0, "Password cannot be 123456."];
    }
    let res = await Net.get("https://raw.githubusercontent.com/MaiyunNET/Nuttom/master/doc/nblob/" + nu.post.ver + ".nblob");
    if (!res) {
        return [0, "Network error, please try again."];
    }
    let content = await res.readContent();
    let str = await Zlib.gunzip(content);
    if (!str) {
        return [0, "Decryption failed(0)."];
    }
    let json = JSON.parse(str.toString());
    if (!json) {
        return [0, "Decryption failed(1)."];
    }
    /** 缺失/有差异的文件 */
    let files: string[] = [];
    /** 本地现状 */
    let nowJson = await _buildList();
    // --- 对现状做比对 ---
    for (let file in json.files) {
        let md5 = json.files[file];
        if (nowJson.files[file] === undefined) {
            files.push(file);
            continue;
        }
        if (md5 !== nowJson.files[file]) {
            files.push(file);
        }
    }
    return [1, {files: files}];
}

export async function apiBuild(nu: abs.Nu) {
    if (nu.post.password !== nu.config.etc.__Nuttom__.pwd) {
        return [0, "Password is incorrect."];
    }
    if (nu.config.etc.__Nuttom__.pwd === "123456" && nu.uri.hostname !== "local-test.brc-app.com") {
        return [0, "Password cannot be 123456."];
    }
    await Fs.writeFile(Const.ROOT_PATH + "doc/nblob/" + Const.VER + ".nblob", await Zlib.gzip(JSON.stringify(await _buildList()), {level: 9}));
    return [1];
}
async function _buildList(): Promise<any> {
    let endJson: any = {
        "files": {}
    };
    let list = await Fs.getFileListDeep(Const.SOURCES_PATH + "lib/", "back/sources/lib/");
    list = list.concat(await Fs.getFileListDeep(Const.SOURCES_PATH + "sys/", "back/sources/sys/"));
    list = list.concat([
        `back/sources/abstract.ts`,
        `back/sources/const.ts`,
        `back/sources/index.ts`,
        `back/sources/www/default/ctr/__Nuttom__.ts`,
        `back/sources/www/default/ws/__Nuttom__.ts`,
        `front/default/stc/__Nuttom__/index.ts`,
        `front/default/stc/__Nuttom__/index.css`,
        `front/default/view/__Nuttom__/index.ejs`
    ]);
    for (let item of list) {
        endJson.files[item] = await Crypto.md5File(Const.ROOT_PATH + item);
    }
    return endJson;
}

// --- 获取最新版本号 ---
export async function apiGetLatestVer(nu: abs.Nu) {
    if (nu.post.password !== nu.config.etc.__Nuttom__.pwd) {
        return [0, "Password is incorrect."];
    }
    if (nu.config.etc.__Nuttom__.pwd === "123456" && nu.uri.hostname !== "local-test.brc-app.com") {
        return [0, "Password cannot be 123456."];
    }
    let res = await Net.get("https://api.github.com/repos/MaiyunNET/Nuttom/releases");
    if (!res) {
        return [0, "Network error, please try again."];
    }
    let json = JSON.parse((await res.readContent()).toString());
    let matches = json[0].tag_name.match(/[0-9\.]+/);
    return [1, {"version": matches[0]}];
}
// --- 库和定义 ---
import * as View from "~/lib/View";
import * as Net from "~/lib/Net";
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
    let res = await Net.get("https://api.github.com/repos/MaiyunNET/Mutton/releases");
    // let content = res.readContent();
    // console.log(content);
    /*
    if (!$res->content) {
        return [0, 'Network error, please try again.'];
    }
    $json = json_decode($res->content);
    $list = [];
    foreach ($json as $item) {
        preg_match('/[0-9\\.]+/', $item->tag_name, $matches);
        $list[] = [
            'value' => $matches[0],
            'label' => $item->name
        ];
    }
    return [1, 'list' => $list];
    */
}

export async function apiBuild(nu: abs.Nu) {
    if (nu.post.password !== nu.config.etc.__Nuttom__.pwd) {
        return [0, "Password is incorrect."];
    }
    let list = await Fs.getFileListDeep(Const.SOURCES_PATH + "lib/", "back/sources/lib/");
    list = list.concat(await Fs.getFileListDeep(Const.SOURCES_PATH + "sys/", "back/sources/sys/"));
    list = list.concat([
        `back/sources/abstract.ts`,
        `back/sources/const.ts`,
        `back/sources/index.ts`,
        `back/sources/www/default/ctr/__Nuttom__.ts`,
        `front/default/stc/__Nuttom__/index.ts`,
        `front/default/stc/__Nuttom__/index.css`,
        `front/default/view/__Nuttom__/index.ejs`
    ]);
    console.log(list);
}
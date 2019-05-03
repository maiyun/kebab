// --- 库和定义 ---
import * as View from "../../../lib/View";
import * as Const from "../../../const";
import * as abs from "../../../abstract";

export function index(nu: abs.Nu) {
    let l = <string>nu.get.l || "en";
    if (["en", "zh-CN", "zh-TW"].indexOf(l) === -1) {
        l = "en";
    }
    View.setLocale(nu, l, "__Nuttom__");
    View.write(nu, "__Nuttom__/index", {
        VER: Const.VER,
        hasConfig: nu.config.etc.__Nuttom__.pwd !== "123456" ? true : false
    });
}
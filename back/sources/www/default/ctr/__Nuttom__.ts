// --- 库和定义 ---
import * as View from "../../../lib/View";
import * as Const from "../../../const";
import * as abs from "../../../abstract";

export function index(nu: abs.Nu) {
    View.write(nu, "__Nuttom__/index", {
        VER: Const.VER,
        hasConfig: "0"
    });
}
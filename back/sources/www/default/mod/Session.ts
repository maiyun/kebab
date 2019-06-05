// --- 库和定义 ---
import * as Text from "~/lib/Text";
// --- 模型 ---
import Mod from "~/sys/Mod";

export default class Session extends Mod {
    protected static _table = "session";
    protected static _primary = "id";
    protected static _key = "token";

    protected _keyGenerator() {
        return Text.random(16, Text.RANDOM_LUN);
    }
}
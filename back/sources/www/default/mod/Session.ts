// --- 库和定义 ---
import Mod from "~/sys/Mod";

export default class Session extends Mod {
    protected static _table = "session";
    protected static _primary = "id";
    protected static _key = "token";
}
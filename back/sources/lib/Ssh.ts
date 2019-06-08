// --- 第三方 ---
import * as ssh2 from "ssh2";
// --- 自己 ---
import * as Shell from "./Ssh/Shell";

export type Options = ssh2.ConnectConfig;

/** 主连接对象 */
export class Connection {

    private _client!: ssh2.Client;

    constructor() {
        this._client = new ssh2.Client();
    }

    /**
     * --- 发起连接 ---
     * @param opt 选项
     */
    public connect(opt: Options) {
        return new Promise((resolve, reject) => {
            this._client.on("error", function(err) {
                console.log("err");
                console.log(err);
            }).on("ready", function() {
                resolve();
            }).connect(opt);
        });
    }

}

/**
 * --- 创建一个 SSH 连接 ---
 * @param opt 选项
 */
export function get(opt: Options) {
    let conn = new Connection();
    conn.connect(opt);
}
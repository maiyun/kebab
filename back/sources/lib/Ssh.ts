// --- 第三方 ---
import * as ssh2 from "ssh2";
// --- 自己 ---
import * as Shell from "./Ssh/Shell";
import * as Sftp from "./Ssh/Sftp";

export type Options = ssh2.ConnectConfig;

/** 主连接对象 */
export class Connection {

    /** --- SSH 对象 --- */
    private _client!: ssh2.Client;

    constructor() {
        this._client = new ssh2.Client();
    }

    /**
     * --- 发起连接 ---
     * @param opt 选项
     */
    public connect(opt: Options): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._client.on("error", function(err) {
                resolve(false);
            }).on("ready", function() {
                resolve(true);
            }).connect(opt);
        });
    }

    /**
     * --- 断开此连接 socket ---
     */
    public disconnect() {
        this._client.end();
    }

    /**
     * --- 执行一个命令并获取返回值，请不要在此执行无尽命令，否则获取不到返回值 ---
     * @param command 命令内容
     */
    public exec(command: string): Promise<Buffer | undefined> {
        return new Promise((resolve, reject) => {
            this._client.exec(command, (err: Error, stream: ssh2.ClientChannel) => {
                if (err) {
                    resolve(undefined);
                }
                let data = Buffer.from("");
                stream.on("close", (code: any, signal: any) => {
                    resolve(data);
                }).on("data", function(chunk: Buffer) {
                    data = Buffer.concat([data, chunk], data.length + chunk.length);
                }).stderr.on("data", function(chunk: Buffer) {
                    data = Buffer.concat([data, chunk], data.length + chunk.length);
                });
            });
        });
    }

    /**
     * --- 获取 Shell 执行对象 ---
     */
    public getShell(): Promise<Shell.Connection | undefined> {
        return new Promise((resolve, reject) => {
            this._client.shell(function(err, stream) {
                if (err) {
                    resolve(undefined);
                }
                resolve(new Shell.Connection(stream));
            });
        });
    }

    /**
     * --- 获取 Sftp 执行对象 ---
     */
    public getSftp(): Promise<Sftp.Connection | undefined> {
        return new Promise((resolve, reject) => {
            this._client.sftp(async (err, sftp) => {
                if (err) {
                    resolve(undefined);
                }
                let pwdb = await this.exec("pwd");
                let pwd = "/";
                if (pwdb) {
                    pwd = pwdb.toString().trim();
                    if (pwd.slice(-1) !== "/") {
                        pwd = pwd + "/";
                    }
                }
                resolve(new Sftp.Connection(sftp, pwd));
            });
        });
    }

    /**
     * --- 直接获取原生 shell stream 对象 ---
     */
    public getStream() {
        return new Promise((resolve, reject) => {
            this._client.shell(function(err, stream) {
                if (err) {
                    resolve(undefined);
                }
                resolve(stream);
            });
        });
    }

}

/**
 * --- 创建一个 SSH 连接 ---
 * @param opt 选项
 */
export async function get(opt: Options) {
    let conn = new Connection();
    let rtn = await conn.connect(opt);
    if (rtn) {
        return conn;
    } else {
        return undefined;
    }
}
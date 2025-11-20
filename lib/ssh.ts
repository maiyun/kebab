/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-8 21:34:35
 * Last: 2020-04-06 21:22:46, 2022-09-12 00:19:05, 2024-3-4 14:46:11
 */

// --- 第三方 ---
import * as ssh2 from 'ssh2';
// --- 自己 ---
import * as shell from './ssh/shell.js';
import * as sftp from './ssh/sftp.js';

export interface IExtOptions {
    'mproxy'?: {
        'host': string;
        'port': number;
        'username': string;
        'password': string;
    };
}

/** 主连接对象 */
export class Connection {

    /** --- SSH 对象 --- */
    private readonly _client: ssh2.Client;

    /** --- 中转服务器 --- */
    private _mclient?: ssh2.Client;

    public constructor() {
        this._client = new ssh2.Client();
    }

    /**
     * --- 发起连接 ---
     * @param opt 选项
     */
    public connect(opt: ssh2.ConnectConfig & IExtOptions): Promise<boolean> {
        return new Promise((resolve) => {
            if (!opt.mproxy) {
                this._client.on('error', function() {
                    resolve(false);
                }).on('ready', () => {
                    resolve(true);
                }).connect(opt);
                return;
            }
            this._mclient = new ssh2.Client();
            const old = {
                'host': opt.host,
                'port': opt.port,
                'username': opt.username,
                'password': opt.password,
                'privateKey': opt.privateKey
            };
            opt.host = opt.mproxy.host;
            opt.port = opt.mproxy.port;
            opt.username = opt.mproxy.username;
            opt.password = opt.mproxy.password;
            if (opt.privateKey) {
                delete opt.privateKey;
            }
            this._mclient.on('error', function() {
                resolve(false);
            }).on('ready', () => {
                if (!old.host || !old.port || !this._mclient) {
                    resolve(false);
                    return;
                }
                this._mclient.forwardOut('0.0.0.0', 12345, old.host, old.port, (err, stream) => {
                    if (err) {
                        this._mclient?.end();
                        resolve(false);
                        return;
                    }
                    this._client.on('error', () => {
                        this._mclient?.end();
                        resolve(false);
                    }).on('ready', () => {
                        resolve(true);
                    }).on('close', () => {
                        this._mclient?.end();
                    }).connect({
                        'sock': stream,
                        'username': old.username,
                        'password': old.password,
                        'privateKey': old.privateKey
                    });
                });
            }).connect(opt);
        });
    }

    /**
     * --- 断开此连接 socket ---
     */
    public disconnect(): void {
        this._client.end();
    }

    /**
     * --- 执行一个命令并获取返回值，请不要在此执行无尽命令，否则获取不到返回值 ---
     * @param command 命令内容
     */
    public exec(command: string): Promise<Buffer | false> {
        return new Promise((resolve) => {
            this._client.exec(command, function(err?: Error, channel?: ssh2.ClientChannel): void {
                if (err ?? !channel) {
                    resolve(false);
                    return;
                }
                let data = Buffer.from('');
                channel.on('close', () => {
                    resolve(data);
                }).on('data', function(chunk: Buffer) {
                    data = Buffer.concat([data, chunk], data.length + chunk.length);
                }).stderr.on('data', function(chunk: Buffer) {
                    data = Buffer.concat([data, chunk], data.length + chunk.length);
                });
            });
        });
    }

    /**
     * --- 获取 Shell 执行对象 ---
     */
    public getShell(): Promise<shell.Connection | null> {
        return new Promise((resolve) => {
            this._client.shell(function(err, channel) {
                if (err ?? !channel) {
                    resolve(null);
                    return;
                }
                resolve(new shell.Connection(channel));
            });
        });
    }

    /**
     * --- 获取 Sftp 执行对象 ---
     */
    public getSftp(): Promise<sftp.Connection | null> {
        return new Promise((resolve) => {
            this._client.sftp((err, ssftp) => {
                if (err ?? !ssftp) {
                    resolve(null);
                    return;
                }
                (async () => {
                    const pwdb = await this.exec('pwd');
                    let pwd = '/';
                    if (pwdb) {
                        pwd = pwdb.toString().trim();
                        if (!pwd.endsWith('/')) {
                            pwd = pwd + '/';
                        }
                    }
                    resolve(new sftp.Connection(ssftp, pwd));
                })().catch(function() {
                    resolve(null);
                });
            });
        });
    }

    /**
     * --- 直接获取原生 shell stream 对象 ---
     */
    public getStream(): Promise<ssh2.ClientChannel | null> {
        return new Promise((resolve) => {
            this._client.shell(function(err, stream) {
                if (err) {
                    resolve(null);
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
export async function get(opt: ssh2.ConnectConfig & IExtOptions): Promise<Connection | null> {
    const conn = new Connection();
    const rtn = await conn.connect(opt);
    return rtn ? conn : null;
}

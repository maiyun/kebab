import * as url from "url";
// --- 第三方 ---
import * as ssh2 from "ssh2";
import {
    utils,
    Algorithms,
    Header,
    Prompt,
    SFTPStream,
    InputAttributes,
    Attributes,
    Stats,
    TransferOptions,
    ReadFileOptions,
    ReadStreamOptions,
    WriteStreamOptions,
    FileEntry
} from "ssh2-streams";
// --- 库和定义 ---
import * as Sys from "~/lib/Sys";

export class Connection {

    /** --- 连接对象 --- */
    private _client!: ssh2.SFTPWrapper;

    /** --- 当前路径，以 / 结尾 --- */
    private _path!: string;

    constructor(sftp: ssh2.SFTPWrapper, path: string) {
        this._client = sftp;
        this._path = path;
    }

    /**
     * --- 读取文件内容 ---
     * @param path 文件路径
     * @param options 编码/选项
     */
    public readFile(remotePath: string, options: ReadFileOptions | string = "utf-8"): Promise<Buffer | undefined> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            let opt!: ReadFileOptions;
            if (typeof options === "string") {
                opt = {
                    encoding: options
                };
            } else {
                opt = options;
            }
            this._client.readFile(remotePath, opt, function(err, data) {
                if (err) {
                    resolve(undefined);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * --- 写入文件内容 ---
     * @param path 文件路径
     * @param data 要写入的内容
     * @param options 选项
     */
    public writeFile(remotePath: string, data: any, options: WriteStreamOptions = {}): Promise<boolean> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            let stream = this.writeStream(remotePath, options);
            stream.on("error", function() {
                resolve(false);
            }).on("finish", function() {
                resolve(true);
            });
            stream.write(data);
            stream.end();
        });
    }

    /**
     * --- 删除一个文件 ---
     * @param path 要删除的文件路径
     */
    public async unlinkFile(remotePath: string): Promise<boolean> {
        remotePath = url.resolve(this._path, remotePath);
        for (let i = 0; i < 4; ++i) {
            let bol = await this._unlinkFile(remotePath);
            if (bol) {
                return true;
            }
            await Sys.sleep(250);
        }
        return await this._unlinkFile(remotePath);
    }
    private _unlinkFile(remotePath: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._client.unlink(remotePath, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 获取文件夹下文件列表 ---
     * @param path 文件夹路径
     */
    public readDir(remotePath: string = "."): Promise<FileEntry[]> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            this._client.readdir(remotePath, (err, files) => {
                if (err) {
                    resolve([]);
                } else {
                    resolve(files);
                }
            });
        });
    }

    /**
     * --- 根据目录深度获取下面的所有文件列表 ---
     * @param path 目录
     * @param pre 前导
     */
    public async getFileListDeep(remotePath: string, pre: string = ""): Promise<FileEntry[]> {
        remotePath = url.resolve(this._path, remotePath);
        if (remotePath.slice(-1) !== "/") {
            remotePath += "/";
        }
        return await this._getFileListDeep(remotePath, pre);
    }
    private async _getFileListDeep(remotePath: string, pre: string): Promise<FileEntry[]> {
        let list = await this.readDir(remotePath);
        let over: FileEntry[] = [];
        for (let item of list) {
            let stat = await this.getStats(remotePath + item);
            if (!stat) {
                continue;
            }
            if (stat.isDirectory()) {
                over = over.concat(await this._getFileListDeep(remotePath + item + "/", pre + item + "/"));
            } else {
                item.filename = pre + item.filename;
                over.push(item);
            }
        }
        return over;
    }

    /**
     * --- 获取对象是否存在，存在则返回 stats 对象，否则返回 undefined ---
     * @param path 对象路径
     */
    public getStats(remotePath: string): Promise<Stats | undefined> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            this._client.lstat(remotePath, function (err, stats) {
                if (err) {
                    resolve(undefined);
                } else {
                    resolve(stats);
                }
            });
        });
    }

    /**
     * --- 读取文件流 ---
     * @param path 文件地址
     */
    public readStream(remotePath: string, options?: ReadStreamOptions) {
        remotePath = url.resolve(this._path, remotePath);
        return this._client.createReadStream(remotePath, options);
    }

    /**
     * --- 读取文件写入到流，并等待写入完成 ---
     * @param path 文件地址
     * @param destination 要写入的流
     * @param options 写入后是否终止写入流，默认终止
     */
    public pipe<T extends NodeJS.WritableStream>(remotePath: string, destination: T, options: {end?: boolean; } = {}): Promise<boolean> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            this._client.createReadStream(remotePath).on("error", function() {
                resolve(false);
            }).on("end", function() {
                resolve(true);
            }).pipe(destination, {end: options.end === undefined ? true : options.end});
        });
    }

    /**
     * --- 写入文件流 ---
     * @param path 文件地址
     */
    public writeStream(remotePath: string, options: WriteStreamOptions = {}) {
        remotePath = url.resolve(this._path, remotePath);
        return this._client.createWriteStream(remotePath, options);
    }

    /**
     * --- 创建单层目录 ---
     * @param path 要创建的路径
     */
    public mkdir(remotePath: string, attributes: InputAttributes = {}): Promise<boolean> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            this._client.mkdir(remotePath, attributes, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 只读取一小段文件一次 ---
     * @param path 路径
     * @param start 开始时间
     */
    public readFileOnce(remotePath: string, options: ReadStreamOptions = {}): Promise<Buffer> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            let stream = this._client.createReadStream(remotePath, options);
            let data: Buffer = Buffer.from("");
            stream.on("data", function (chunk: Buffer) {
                data = Buffer.concat([data, chunk], data.length + chunk.length);
            }).on("close", function() {
                resolve(data);
            }).on("error", function() {
                resolve(undefined);
            });
        });
    }

    /**
     * --- 深度创建多层目录 ---
     * --- 如果最末目录存在，则自动创建成功 ---
     * @param path 要创建的路径
     */
    public async mkdirDeep(remotePath: string): Promise<boolean> {
        remotePath = url.resolve(this._path, remotePath);
        if (remotePath.slice(-1) === "/") {
            remotePath = remotePath.slice(0, -1);
        }
        // --- 创建当前目录 ---
        return await this._mkdirDeepSub(remotePath);
    }
    private async _mkdirDeepSub(remotePath: string): Promise<boolean> {
        if (remotePath === "") {
            return true;
        }
        let stats = await this.getStats(remotePath);
        if (stats !== undefined && stats.isDirectory()) {
            // --- 当前有目录，不用创建直接成功 ---
            return true;
        }
        // --- 需要创建当前目录前，先判断上级目录 ---
        let upPath = remotePath.slice(0, remotePath.lastIndexOf("/"));
        if (!await this._mkdirDeepSub(upPath)) {
            return false;
        }
        // --- 创建当前目录 ---
        return await this.mkdir(remotePath);
    }

    /**
     * --- 获取当前目录，末尾不带 / ---
     * @return string
     */
    public pwd(): string {
        return this._path.slice(0, -1);
    }

    /**
     * --- 下载文件到本地 ---
     * @param remoteFile 远程路径
     * @param localFile 本地路径
     * @param options 选项
     */
    public downloadFile(remoteFile: string, localFile: string, options: TransferOptions = {}): Promise<boolean> {
        remoteFile = url.resolve(this._path, remoteFile);
        return new Promise((resolve, reject) => {
            this._client.fastGet(remoteFile, localFile, options, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 上传本地文件到远程 ---
     * @param string $localFile 本地绝对路径
     * @param string $remoteFile
     * @return bool
     */
    public uploadFile(localFile: string, remoteFile: string, options: TransferOptions = {}): Promise<boolean> {
        remoteFile = url.resolve(this._path, remoteFile);
        return new Promise((resolve, reject) => {
            this._client.fastPut(localFile, remoteFile, options, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 进入一个目录（不存在也能进入，需要自行判断） ---
     * --- 返回进入后的路径值 ---
     * @param dir 相对路径或绝对路径
     */
    public cd(dir: string): string {
        this._path = url.resolve(this._path, dir);
        if (this._path.slice(-1) !== "/") {
            this._path += "/";
        }
        return this._path;
    }

    /**
     * --- 修改权限 ---
     * @param remotePath 要修改的路径
     * @param mode 权限
     */
    public chmod(remotePath: string, mode: string | number): Promise<boolean> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            this._client.chmod(remotePath, mode, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 删除一个空目录 ---
     * @param remotePath 要删除的目录路径
     */
    public rmdir(remotePath: string): Promise<boolean> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            this._client.rmdir(remotePath, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- Danger 危险：这特么是个危险函数，尽量不要使用 ---
     * --- This is a very weixian's function, dont to use ---
     * --- 删除一个非空目录 ---
     */
    public async rmdirDeep(remotePath: string) {
        if (this.cd(remotePath)) {
            let list = await this.readDir();
            for (let item of list) {
                if (item.filename === "." || item.filename === "..") {
                    continue;
                }
                let stat = await this.getStats(item.filename);
                if (!stat) {
                    return false;
                }
                if (stat.isDirectory()) {
                    // --- 目录 ---
                    let rtn = await this.rmdirDeep(item.filename);
                    if (rtn === false) {
                        return false;
                    }
                } else {
                    let rtn = await this.unlinkFile(item.filename);
                    if (rtn === false) {
                        return false;
                    }
                }
            }
            this.cd("..");
            return this.rmdir(remotePath);
        } else {
            return false;
        }
    }

    /**
     * --- 重命名/移动 文件文件夹 ---
     * @param oldPath 老名
     * @param newPath 新名
     */
    public rename(oldPath: string, newPath: string) {
        oldPath = url.resolve(this._path, oldPath);
        newPath = url.resolve(this._path, newPath);
        return new Promise((resolve, reject) => {
            this._client.rename(oldPath, newPath, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 读取链接的 target ---
     * @param remotePath 要读取的路径
     */
    public readLink(remotePath: string): Promise<string | undefined> {
        remotePath = url.resolve(this._path, remotePath);
        return new Promise((resolve, reject) => {
            this._client.readlink(remotePath, function(err, target) {
                if (err) {
                    resolve(undefined);
                } else {
                    resolve(target);
                }
            });
        });
    }

    /**
     * --- 把源文件创建一个 link ---
     * @param filePath 源文件
     * @param linkPath 连接路径
     */
    public symlink(filePath: string, linkPath: string): Promise<boolean> {
        filePath = url.resolve(this._path, filePath);
        linkPath = url.resolve(this._path, linkPath);
        return new Promise((resolve, reject) => {
            this._client.symlink(filePath, linkPath, function(err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 关闭连接 ---
     */
    public end() {
        this._client.end();
    }

}
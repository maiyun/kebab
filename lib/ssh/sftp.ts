/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-10 12:06
 * Last: 2020-4-11 09:28:11, 2022-09-11 17:15:38, 2023-4-24 21:43:42
 */
import * as stream from 'stream';
import * as ssh2 from 'ssh2';
// --- 库和定义 ---
import * as core from '~/lib/core';
import * as text from '~/lib/text';

export class Connection {

    /** --- 连接对象 --- */
    private readonly _client: ssh2.SFTPWrapper;

    /** --- 当前路径，以 / 结尾 --- */
    private _path: string;

    public constructor(sftp: ssh2.SFTPWrapper, path: string) {
        this._client = sftp;
        this._path = path;
    }

    public getContent(path: string, options?: {
        'start'?: number;
        'end'?: number;
    }): Promise<Buffer | null>;
    public getContent(path: string, options: BufferEncoding | {
        'encoding': BufferEncoding;
        'start'?: number;
        'end'?: number;
    }): Promise<string | null>;
    /**
     * --- 读取完整文件或一段 ---
     * @param path 文件路径
     * @param options 编码或选项
     */
    public getContent(path: string, options?: BufferEncoding | {
        'encoding'?: BufferEncoding;
        'start'?: number;
        'end'?: number;
    }): Promise<Buffer | string | null> {
        path = text.urlResolve(this._path, path);
        if (typeof options === 'string') {
            options = {
                'encoding': options
            };
        }
        else if (!options) {
            options = {};
        }
        const encoding = options.encoding;
        const start = options.start;
        const end = options.end;
        return new Promise((resolve) => {
            if (start || end) {
                const rs = this.createReadStream(path, {
                    'encoding': encoding,
                    'start': start,
                    'end': end
                });
                const data: Buffer[] = [];
                rs.on('data', function(chunk: Buffer) {
                    data.push(chunk);
                }).on('end', function() {
                    const buf = Buffer.concat(data);
                    if (encoding) {
                        resolve(buf.toString());
                    }
                    else {
                        resolve(buf);
                    }
                }).on('error', function() {
                    resolve(null);
                });
            }
            else {
                if (encoding) {
                    this._client.readFile(path, {
                        'encoding': encoding
                    }, function(err, data) {
                        if (err) {
                            resolve(null);
                        }
                        else {
                            resolve(data);
                        }
                    });
                }
                else {
                    this._client.readFile(path, function(err, data) {
                        if (err) {
                            resolve(null);
                        }
                        else {
                            resolve(data);
                        }
                    });
                }
            }
        });
    }

    /**
     * --- 写入文件内容 ---
     * @param path 文件路径
     * @param data 要写入的内容
     * @param options 选项
     */
    public putContent(
        path: string,
        data: string | Buffer,
        options: ssh2.WriteFileOptions = {}
    ): Promise<boolean> {
        path = text.urlResolve(this._path, path);
        return new Promise((resolve) => {
            this._client.writeFile(path, data, options, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 读取链接的 target ---
     * @param path 要读取的路径
     */
    public readLink(path: string): Promise<string | null> {
        path = text.urlResolve(this._path, path);
        return new Promise((resolve) => {
            this._client.readlink(path, function(err, target) {
                if (err) {
                    resolve(null);
                }
                else {
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
        filePath = text.urlResolve(this._path, filePath);
        linkPath = text.urlResolve(this._path, linkPath);
        return new Promise((resolve) => {
            this._client.symlink(filePath, linkPath, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 删除一个文件 ---
     * @param path 要删除的文件路径
     */
    public async unlink(path: string): Promise<boolean> {
        path = text.urlResolve(this._path, path);
        for (let i = 0; i < 2; ++i) {
            const bol = await this._unlink(path);
            if (bol) {
                return true;
            }
            await core.sleep(250);
        }
        return this._unlink(path);
    }

    /** --- unlink 的删除的 promise 实现 --- */
    private _unlink(path: string): Promise<boolean> {
        return new Promise((resolve) => {
            this._client.unlink(path, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 获取对象是否存在，存在则返回 stats 对象，否则返回 null ---
     * @param path 对象路径
     */
    public stats(path: string): Promise<ssh2.Stats | null> {
        path = text.urlResolve(this._path, path);
        return new Promise((resolve) => {
            this._client.lstat(path, function(err, stat) {
                if (err) {
                    resolve(null);
                }
                else {
                    resolve(stat);
                }
            });
        });
    }

    /**
     * --- 判断是否是目录或目录是否存在，是的话返回 stats ---
     * @param path 判断路径
     */
    public async isDir(path: string): Promise<ssh2.Stats | false> {
        const pstats = await this.stats(path);
        if (!pstats?.isDirectory()) {
            return false;
        }
        return pstats;
    }

    /**
     * --- 判断是否是文件或文件是否存在，是的话返回 stats ---
     * @param path 判断路径
     */
    public async isFile(path: string): Promise<ssh2.Stats | false> {
        const pstats = await this.stats(path);
        if (!pstats?.isFile()) {
            return false;
        }
        return pstats;
    }

    /**
     * --- 深度创建目录，如果最末目录存在，则自动创建成功 ---
     * @param path 要创建的路径，如 /a/b/c/
     * @param mode 权限
     */
    public async mkdir(path: string, mode: number = 0o755): Promise<boolean> {
        path = text.urlResolve(this._path, path);
        if (await this.isDir(path)) {
            return true;
        }
        if (path.endsWith('/')) {
            path.slice(0, -1);
        }
        const lio = path.lastIndexOf('/');
        if (!(await this.mkdir(path.slice(0, lio), mode))) {
            return false;
        }
        if (!(await new Promise((resolve) => {
            this._client.mkdir(path.slice(0, lio), {
                'mode': mode
            }, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        }))) {
            return false;
        }
        return true;
    }

    /**
     * --- 删除一个空目录 ---
     * @param path 要删除的目录路径
     */
    public async rmdir(path: string): Promise<boolean> {
        path = text.urlResolve(this._path, path);
        if (!(await this.isDir(path))) {
            return true;
        }
        return new Promise((resolve) => {
            this._client.rmdir(path, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- Danger 危险：危险函数，尽量不要使用 ---
     * --- This f**king is a dangerous function, please don't use it ---
     * --- 删除一个非空目录 ---
     */
    public async rmdirDeep(path: string): Promise<boolean> {
        path = text.urlResolve(this._path, path);
        if (!path.endsWith('/')) {
            path += '/';
        }
        const list = await this.readDir(path);
        for (const item of list) {
            if (item.filename === '.' || item.filename === '..') {
                continue;
            }
            const stat = await this.stats(item.filename);
            if (!stat) {
                return false;
            }
            if (stat.isDirectory()) {
                // --- 目录 ---
                const rtn = await this.rmdirDeep(path + item.filename);
                if (!rtn) {
                    return false;
                }
            }
            else {
                const rtn = await this.unlink(path + item.filename);
                if (!rtn) {
                    return false;
                }
            }
        }
        return this.rmdir(path);
    }

    /**
     * --- 修改权限 ---
     * @param path 要修改的路径
     * @param mode 权限
     */
    public chmod(path: string, mode: string | number): Promise<boolean> {
        path = text.urlResolve(this._path, path);
        return new Promise((resolve) => {
            this._client.chmod(path, mode, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 重命名/移动 文件文件夹 ---
     * @param oldPath 老名
     * @param newPath 新名
     */
    public rename(oldPath: string, newPath: string): Promise<boolean> {
        oldPath = text.urlResolve(this._path, oldPath);
        newPath = text.urlResolve(this._path, newPath);
        return new Promise((resolve) => {
            this._client.rename(oldPath, newPath, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 获取文件夹下文件列表 ---
     * @param path 文件夹路径
     */
    public readDir(path: string): Promise<ssh2.FileEntry[]> {
        path = text.urlResolve(this._path, path);
        return new Promise((resolve) => {
            this._client.readdir(path, function(err, files) {
                if (err) {
                    resolve([]);
                }
                else {
                    resolve(files);
                }
            });
        });
    }

    /**
     * --- 读取文件流 ---
     * @param path 文件地址
     */
    public createReadStream(path: string, options?: ssh2.ReadStreamOptions): stream.Readable {
        path = text.urlResolve(this._path, path);
        return this._client.createReadStream(path, options);
    }

    /**
     * --- 读取文件写入到流，并等待写入完成 ---
     * @param path 文件地址
     * @param destination 要写入的流
     * @param options 写入后是否终止写入流，默认终止
     */
    public pipe<T extends NodeJS.WritableStream>(path: string, destination: T, options: {
        'end'?: boolean;
    } = {}): Promise<boolean> {
        path = text.urlResolve(this._path, path);
        return new Promise((resolve) => {
            this._client.createReadStream(path).on('error', function() {
                resolve(false);
            }).on('end', function() {
                resolve(true);
            }).pipe(destination, options);
        });
    }

    /**
     * --- 创建写入文件的流 ---
     * @param path 文件地址
     * @param options 编码或配置
     */
    public createWriteStream(path: string, options?: BufferEncoding | ssh2.WriteStreamOptions): stream.Writable {
        if (typeof options === 'string') {
            options = {
                'encoding': options
            };
        }
        else if (!options) {
            options = {};
        }
        return this._client.createWriteStream(path, options);
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
    public downloadFile(
        remoteFile: string,
        localFile: string,
        options: ssh2.TransferOptions = {}
    ): Promise<boolean> {
        remoteFile = text.urlResolve(this._path, remoteFile);
        return new Promise((resolve) => {
            this._client.fastGet(remoteFile, localFile, options, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * --- 上传本地文件到远程 ---
     * @param localFile 本地绝对路径
     * @param remoteFile
     * @return bool
     */
    public uploadFile(
        localFile: string,
        remoteFile: string,
        options: ssh2.TransferOptions = {}
    ): Promise<boolean> {
        remoteFile = text.urlResolve(this._path, remoteFile);
        return new Promise((resolve) => {
            this._client.fastPut(localFile, remoteFile, options, function(err) {
                if (err) {
                    resolve(false);
                }
                else {
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
        this._path = text.urlResolve(this._path, dir);
        if (!this._path.endsWith('/')) {
            this._path += '/';
        }
        return this._path;
    }

    /**
     * --- 关闭当前频道 ---
     */
    public close(): void {
        this._client.end();
    }

}

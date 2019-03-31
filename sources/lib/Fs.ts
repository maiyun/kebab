import * as fs from "fs";

/**
 * --- 读取文件内容 ---
 * @param path 文件路径
 * @param options 编码/选项
 */
export function readFile(path: fs.PathLike | number, options: { encoding: string; flag?: string; } | string = "utf-8"): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export function readDir(path: fs.PathLike): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}
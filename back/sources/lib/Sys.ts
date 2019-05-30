import * as cp from "child_process";
// --- 第三方 ---
import * as sni from "@litert/tls-sni";
// --- 库和定义 ---
import * as Fs from "~/lib/Fs";
import * as c from "~/const";
import * as abs from "~/abstract";

/**
 * --- 间隔一段时间 ---
 * @param ms 间隔毫秒
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    });
}

/**
 * --- 执行命令行 ---
 * @param command 命令字符串
 */
export function exec(command: string): Promise<string> {
    return new Promise(function(resolve, reject) {
        let p = cp.exec(command);
        if (!p.stdout) {
            reject(p.stderr);
            return;
        }
        let data: any[] = [];
        p.stdout.on("data", function(chunk) {
            data.push(chunk);
        });
        p.stdout.on("end", function() {
            resolve(data.join(""));
        });
    });
}

/** 设置 cookie 的选项对象 */
export interface CookieOptions {
    /** 单位为秒 */
    maxAge?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    httponly?: boolean;
}

/**
 * --- 设置一个 cookie ---
 * @param nu Nu 对象
 * @param name cookie 名
 * @param value cookie 值
 * @param options 选项
 */
export function cookie(nu: abs.Nu, name: string, value: string = "", options: CookieOptions = {}) {
    options.maxAge = options.maxAge === undefined ? 0 : options.maxAge;
    options.path = options.path || "";
    options.domain = options.domain || "";
    options.secure = options.secure !== undefined ? options.secure : true;
    options.httponly = options.httponly !== undefined ? options.httponly : true;
    // --- 有效期 ---
    let expires = (new Date(Date.now() + options.maxAge * 1000)).toUTCString();
    let path = options.path !== "" ? `; path=${options.path}` : "";
    let domain = options.domain ? `; domain=${options.domain}` : "";
    let secure = options.secure ? "; secure" : "";
    let HttpOnly = options.httponly ? "; HttpOnly" : "";
    let cookies: string[] = <string[] | undefined><any>nu.res.getHeader("Set-Cookie") || [];
    cookies.push(`${name}=${encodeURIComponent(value)}; expires=${expires}; Max-Age=${options.maxAge}${path}${domain}${secure}${HttpOnly}`);
    nu.res.setHeader("Set-Cookie", cookies);
}

/**
 * --- 向所有进程广播将进行 reload 操作，这会有一定的延迟才能全部 reload 完成 ---
 */
export function reload(): void {
    process.send && process.send({
        action: "reload"
    });
}

/**
 * --- 向所有进程广播将进行 restart 操作，停止监听并启动新进程，老进程再连接全部断开后自行销毁 ---
 * --- 主要用作不间断的代码更新 ---
 */
export function restart(): void {
    console.log("[ Child] Sending restart request...");
    process.send && process.send({
        action: "restart"
    });
}

/**
* --- 仅在当前进程实质性的重新加载 vhost 以及证书 ---
* --- 需要所有线程同时执行这个函数以重新加载 ---
*/
export async function realReload(VHOSTS: abs.Vhost[], SNI_MANAGER: sni.certs.ICertificateManager): Promise<void> {
    // --- 重新加载 VHOST 信息 ---
    let files = await Fs.readDir(c.VHOST_PATH);
    VHOSTS.splice(0, VHOSTS.length);
    for (let file of files) {
        let fstr = await Fs.readFile(c.VHOST_PATH + file);
        if (fstr === undefined) {
            continue;
        }
        let list: abs.Vhost[] = JSON.parse(fstr);
        if (!Array.isArray(list)) {
            list = [list];
        }
        for (let vhost of list) {
            VHOSTS.push(vhost);
        }
    }
    // --- 重新加载证书 ---
    SNI_MANAGER.clear();
    for (let vhost of VHOSTS) {
        let cert = await Fs.readFile(Fs.isRealPath(vhost.cert) ? vhost.cert : c.CERT_PATH + vhost.cert);
        let key = await Fs.readFile(Fs.isRealPath(vhost.key) ? vhost.key : c.CERT_PATH + vhost.key);
        if (!cert || !key) {
            continue;
        }
        try {
            SNI_MANAGER.use(vhost.name, cert, key);
        } catch (e) {
            console.log("SNI: " + e);
        }
    }
}

/**
 * --- 判断是否是 Nu 对象 ---
 * @param obj 要判断的对象
 */
export function isNu(obj: any): obj is abs.Nu {
    if (obj.isNu) {
        return true;
    } else {
        return false;
    }
}
import * as cp from "child_process";

export function sleep(ms: number): Promise<void> {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    });
}

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